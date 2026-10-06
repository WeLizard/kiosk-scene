"""Command pipeline: text → interpret → validate → policy → execute → persist → reply.

Policy in one paragraph: read-only intents just run. A *write* is applied silently only when the deterministic
parser is confident (≥ `auto_apply_confidence`). Model-produced writes go to the review queue unless the owner
explicitly enabled AI auto-apply *and* the model is very sure. Anything between "unsure" and "sure" is queued for
review; anything below is a clarifying question. The database is never written from a guess.
"""
from __future__ import annotations

import logging
import re
import time
from typing import Any

from ..errors import DomovoyError, ProviderError, ValidationError
from ..nlu.datetimes import format_when
from ..nlu.intents import is_mutating, validate_intent
from ..nlu.numbers import ordinal_value, parse_number
from ..nlu.rules import InterpretContext, RuleInterpreter, fold
from ..services.context import Ctx
from .executor import Executor, Outcome
from .llm_interpreter import LlmInterpreter

LOG = logging.getLogger("domovoy.pipeline")
MAX_TEXT = 1000


class CommandPipeline:
    def __init__(self, app: Any) -> None:
        self.app = app
        self.rules = RuleInterpreter()
        self.executor = Executor(app)
        self.llm = LlmInterpreter(app.llm)

    # ---- public API ----------------------------------------------------------------------------

    def handle(self, text: str, *, frontend: str = "web", session_id: str | None = None, deadline_s: float | None = None,
               room: str | None = None) -> dict[str, Any]:
        started = time.monotonic()
        text = " ".join(str(text or "").split())[:MAX_TEXT]
        if not text:
            return {"status": "rejected", "reply": "Не расслышал. Повторите, пожалуйста.", "command_id": None, "results": []}
        command_id = self.app.commands.start(text=text, frontend=frontend, session_id=session_id)
        try:
            payload = self._handle(text, command_id, frontend, session_id, deadline_s, started, room)
        except Exception:  # last line of defence: a bug must produce a reply and a record, never a stack trace at the speaker
            LOG.exception("Command pipeline crashed for %r", text)
            payload = {"status": "failed", "reply": "Что-то пошло не так. Команда сохранена, ничего не потеряно.", "results": [],
                       "interpreter": None, "confidence": None, "intents": []}
            self.app.commands.finish(command_id, status="failed", interpreter=None, intents=None, confidence=None,
                                     reply=payload["reply"], error="internal error")
        payload["command_id"] = command_id
        return payload

    def approve_review(self, review_id: int, *, edited: list[dict[str, Any]] | None = None) -> dict[str, Any]:
        item = self.app.review.get(review_id)
        if item["status"] != "pending":
            raise ValidationError("Already resolved", code="already_resolved")
        proposal = edited if edited is not None else item["proposal"]
        if not proposal:
            raise ValidationError("Nothing to apply: this item carries no proposed action. Reject it and say the command again.",
                                  code="empty_proposal")
        intents = [validate_intent(i) for i in proposal]
        # Claim first: two people (or two taps) approving the same item must not both execute it.
        if not self.app.review.claim(review_id):
            raise ValidationError("Already resolved", code="already_resolved")
        ctx = Ctx(actor="user", source="review", command_id=item["command_id"])
        try:
            outcomes = [self.executor.run(i, ctx, {}) for i in intents]
        except Exception:
            self.app.review.release(review_id)
            raise
        results = [{"ok": o.ok, "message": o.message, "refs": o.refs} for o in outcomes]
        ok, any_ok = all(o.ok for o in outcomes), any(o.ok for o in outcomes)
        if not any_ok:
            # nothing was applied (ambiguous item, provider down, ...): it stays in the queue to fix or retry
            self.app.review.release(review_id)
            return {"ok": False, "still_pending": True, "results": results}
        self.app.review.resolve(review_id, "approved", "applied" if ok else "partly applied", expected="applying")
        if item["command_id"]:
            self.app.commands.finish(item["command_id"], status="applied" if ok else "partial", interpreter="review",
                                     intents=intents, confidence=1.0, reply=" ".join(o.message for o in outcomes), result=results)
        return {"ok": ok, "results": results}

    def reject_review(self, review_id: int) -> dict[str, Any]:
        return self.app.review.resolve(review_id, "rejected", "rejected by user")

    # ---- internals -----------------------------------------------------------------------------

    def _thresholds(self) -> tuple[float, float]:
        return float(self.app.settings.get("auto_apply_confidence")), float(self.app.settings.get("review_confidence"))

    def _handle(self, text: str, command_id: int, frontend: str, session_id: str | None, deadline_s: float | None,
                started: float, room: str | None) -> dict[str, Any]:
        app = self.app
        ctx = Ctx(actor="user", source=frontend, command_id=command_id)
        session = app.sessions.get(session_id)
        now = app.clock.local_now()
        auto_threshold, review_threshold = self._thresholds()
        interpreter = "rules"
        raw_intents: list[dict[str, Any]] | None = None
        deferred_reason = ""

        pending = session.get("pending")
        if pending:
            answered = self._resolve_pending(text, pending)
            session.pop("pending", None)
            if answered == []:
                reply = "Хорошо, не буду."
                app.sessions.save(session_id, session)
                app.commands.finish(command_id, status="answered", interpreter="clarification", intents=[], confidence=1.0, reply=reply)
                return {"status": "answered", "reply": reply, "results": [], "interpreter": "clarification", "confidence": 1.0, "intents": []}
            if answered is not None:
                raw_intents, interpreter = answered, "clarification"

        if raw_intents is None:
            interp_ctx = InterpretContext(
                now=now, session=session, default_reminder_hour=int(app.settings.get("default_reminder_hour")),
                contact_names=[n for c in app.contacts.list() for n in [c["name"], *c["aliases"]]],
            )
            raw_intents = self.rules.interpret(text, interp_ctx)
            confident = bool(raw_intents) and min(float(i.get("confidence", 0)) for i in raw_intents) >= review_threshold
            if not confident and self.llm.available():
                remaining = None if deadline_s is None else deadline_s - (time.monotonic() - started)
                if remaining is None or remaining >= 1.5:
                    app.avatar.thinking(True)
                    try:
                        raw_intents = self.llm.interpret(text, now=now, session=session, deadline=remaining)
                        interpreter = "llm"
                    except ProviderError as exc:
                        deferred_reason = f"Модель недоступна ({exc.code})"
                        raw_intents = raw_intents if raw_intents else None
                    finally:
                        app.avatar.thinking(False)
                else:
                    deferred_reason = "Не хватило времени на модель"
            elif not confident and app.llm.configured():
                deferred_reason = "Модель временно отключена"

        if not raw_intents:
            if deferred_reason:
                return self._defer_to_review(command_id, text, deferred_reason, session_id, session)
            reply = "Не понял. Скажите, например: «запомни, девять резисторов лежат в третьей коробке» или «что у меня завтра по календарю»."
            app.commands.finish(command_id, status="rejected", interpreter=interpreter, intents=None, confidence=0.0, reply=reply)
            return {"status": "rejected", "reply": reply, "results": [], "interpreter": interpreter, "confidence": 0.0, "intents": []}

        # -- validate: anything malformed is dropped; nothing valid left → ask again ---------------
        clean: list[dict[str, Any]] = []
        problems: list[str] = []
        for raw in raw_intents[:4]:
            try:
                clean.append(validate_intent(raw))
            except ValidationError as exc:
                problems.append(exc.message)
        if not clean:
            reply = "Не смог разобрать команду. Скажите иначе, пожалуйста."
            app.commands.finish(command_id, status="rejected", interpreter=interpreter, intents=raw_intents, confidence=0.0, reply=reply,
                                error="; ".join(problems)[:500])
            return {"status": "rejected", "reply": reply, "results": [], "interpreter": interpreter, "confidence": 0.0, "intents": raw_intents}

        overall = min(i["confidence"] for i in clean)
        clarifying = [i for i in clean if i["type"] == "clarify"]
        if clarifying:
            question = clarifying[0].get("question", "Уточните, пожалуйста.")
            app.sessions.save(session_id, {**session, "pending": None})
            app.commands.finish(command_id, status="clarify", interpreter=interpreter, intents=clean, confidence=overall, reply=question)
            return {"status": "clarify", "reply": question, "results": [], "questions": [question], "interpreter": interpreter,
                    "confidence": overall, "intents": clean}

        # A model may not undo things on its own either: "undo" is read-only for the rules (a person said it), but a
        # write when it was proposed by a model.
        writes = [i for i in clean if is_mutating(i["type"]) or (interpreter == "llm" and i["type"] == "undo")]
        ai_auto = bool(app.settings.get("ai").get("auto_apply"))
        needs_review = False
        review_reason = ""
        for intent in writes:
            if interpreter == "llm":
                if not (ai_auto and intent["confidence"] >= 0.9):
                    needs_review, review_reason = True, "Предложено моделью: нужна ваша проверка"
            elif intent["confidence"] < auto_threshold:
                needs_review, review_reason = True, f"Уверенность {int(intent['confidence'] * 100)}% — нужна проверка"
        reads_too_low = [i for i in clean if not is_mutating(i["type"]) and i["confidence"] < review_threshold]
        if reads_too_low or (writes and min(i["confidence"] for i in writes) < review_threshold and interpreter != "llm"):
            reply = "Не уверен, что понял. Скажите иначе, пожалуйста."
            app.commands.finish(command_id, status="rejected", interpreter=interpreter, intents=clean, confidence=overall, reply=reply)
            return {"status": "rejected", "reply": reply, "results": [], "interpreter": interpreter, "confidence": overall, "intents": clean}

        results: list[dict[str, Any]] = []
        replies: list[str] = []
        new_session = dict(session)
        clarification: dict[str, Any] | None = None
        queued_for_review = False
        if needs_review and writes:
            review_id = app.review.add(command_id=command_id, proposal=writes, reason=review_reason, confidence=overall)
            queued_for_review = True
            replies.append(self._review_reply(writes, review_id))
            results.append({"ok": True, "review_id": review_id, "message": replies[-1]})
        for intent in clean:
            if intent in writes and needs_review:
                continue
            outcome = self.executor.run(intent, ctx, new_session, room=room)
            results.append({"ok": outcome.ok, "message": outcome.message, "refs": outcome.refs, "type": intent["type"],
                            **({"data": _trim(outcome.data)} if outcome.data else {}), **({"retryable": True} if outcome.retryable else {})})
            replies.append(outcome.message)
            new_session.update(outcome.session)
            if outcome.clarify and clarification is None:
                clarification = {"intent": intent, **outcome.clarify}
            if outcome.ok and is_mutating(intent["type"]):
                new_session["last_command_id"] = command_id

        executed = [r for r in results if "review_id" not in r]
        all_ok = all(r["ok"] for r in executed)
        any_ok = any(r["ok"] for r in executed)
        if clarification:
            status = "clarify"
            new_session["pending"] = _pending_from(clarification)
        elif queued_for_review and not executed:
            status = "review"
        elif not executed:
            status = "answered"
        elif all_ok:
            status = "applied" if writes and not queued_for_review else "answered" if not writes else "review"
        elif any_ok:
            status = "partial"
        else:
            status = "failed"
        if queued_for_review and status == "applied":
            status = "review"
        reply = " ".join(r for r in replies if r).strip()
        app.sessions.save(session_id, new_session)
        app.commands.finish(command_id, status=status, interpreter=interpreter, intents=clean, confidence=overall, reply=reply,
                            result=[{k: v for k, v in r.items() if k != "data"} for r in results])
        payload: dict[str, Any] = {"status": status, "reply": reply, "results": results, "interpreter": interpreter, "confidence": overall,
                                   "intents": clean, "undoable": status in ("applied", "partial") and bool(new_session.get("last_command_id") == command_id)}
        if clarification:
            payload["questions"] = [clarification.get("question", "")]
            payload["options"] = clarification.get("options", [])
        return payload

    # ---- pieces --------------------------------------------------------------------------------

    def _defer_to_review(self, command_id: int, text: str, reason: str, session_id: str | None, session: dict[str, Any]) -> dict[str, Any]:
        """The model could not answer in time (or is down): keep the words, ask a human later, tell the speaker honestly."""
        review_id = self.app.review.add(command_id=command_id, proposal=[], reason=f"{reason}. Текст: {text}", confidence=None)
        reply = "Принял, но сейчас не смог разобрать. Положил в очередь проверки — разберу и уточню."
        self.app.commands.finish(command_id, status="review", interpreter="deferred", intents=None, confidence=None, reply=reply, error=reason)
        return {"status": "review", "reply": reply, "results": [{"ok": True, "review_id": review_id, "message": reply}],
                "interpreter": "deferred", "confidence": None, "intents": []}

    _REVIEW_WHAT = {
        "add_item": lambda i: f"запись «{i.get('name')}»", "place_item": lambda i: f"запись «{i.get('name')}»",
        "move_item": lambda i: f"перемещение «{i.get('name') or 'вещи'}»", "consume_item": lambda i: f"списание «{i.get('name') or 'вещи'}»",
        "set_quantity": lambda i: f"количество «{i.get('name') or 'вещи'}»", "remove_item": lambda i: f"удаление «{i.get('name') or 'вещи'}»",
        "create_reminder": lambda i: f"напоминание «{i.get('text')}»", "create_event": lambda i: f"событие «{i.get('title')}»",
        "update_event": lambda i: f"перенос события «{i.get('title')}»", "delete_event": lambda i: f"удаление события «{i.get('title')}»",
        "send_message": lambda i: f"сообщение для {i.get('recipient')}", "add_task": lambda i: f"задача «{i.get('title')}»",
        "add_shopping": lambda i: "покупки: " + ", ".join(i.get("items") or []), "complete_task": lambda i: f"отметка задачи «{i.get('title')}»",
        "add_note": lambda i: f"заметка «{str(i.get('text') or '')[:40]}»", "ha_control": lambda i: f"управление устройством «{i.get('entity_hint')}»", "undo": lambda i: "отмена последнего действия",
    }

    def _review_reply(self, writes: list[dict[str, Any]], review_id: int) -> str:
        first = writes[0]
        what = self._REVIEW_WHAT.get(first["type"], lambda i: "изменение")(first)
        return f"Не уверен, что правильно понял: {what}. Положил в очередь проверки, ничего пока не записано."

    def _resolve_pending(self, text: str, pending: dict[str, Any]) -> list[dict[str, Any]] | None:
        """The user answered a clarifying question («второй», «в шкафу», «нет»)."""
        folded = fold(text).strip(" .!?")
        if folded in ("нет", "отмена", "не надо", "неважно", "забудь", "стоп"):
            return []
        options = pending.get("options") or []
        item_ids = pending.get("item_ids") or []
        intent = dict(pending.get("intent") or {})
        if not intent or not options:
            return None
        index = None
        words = folded.split()
        number = parse_number(words, 0) if words else None
        if number and number[1] == len(words) and 1 <= number[0] <= len(options):
            index = int(number[0]) - 1
        elif len(words) <= 2 and words and (o := ordinal_value(words[-1])) and 1 <= o <= len(options):
            index = o - 1
        else:
            from ..text import norm_key, similarity

            scored = sorted(((similarity(folded, fold(o)), i) for i, o in enumerate(options)), reverse=True)
            key = norm_key(folded)
            contained = [i for i, o in enumerate(options) if key and key in norm_key(o)]
            if len(contained) == 1:
                index = contained[0]
            elif scored and scored[0][0] >= 0.6 and (len(scored) == 1 or scored[0][0] - scored[1][0] >= 0.15):
                index = scored[0][1]
        if index is None:
            return None
        chosen = options[index]
        if item_ids:
            intent["item_id"] = item_ids[index]
            intent.pop("name", None)
        elif intent["type"] in ("update_event", "delete_event", "complete_task"):
            intent["title"] = chosen.split(" — ")[0]
        elif intent["type"] in ("ha_control", "ha_query"):
            intent["entity_hint"] = chosen
        elif intent.get("location_path"):
            intent["location_path"] = chosen.split(" → ")
        else:
            return None
        intent["confidence"] = max(float(intent.get("confidence", 0.9)), 0.9)
        return [intent]


def _pending_from(clarification: dict[str, Any]) -> dict[str, Any] | None:
    if not clarification.get("options"):
        return None
    return {"intent": clarification["intent"], "options": clarification["options"], "item_ids": clarification.get("item_ids") or []}


def _trim(data: dict[str, Any]) -> dict[str, Any]:
    """Keep API payloads small: lists are capped, big blobs dropped."""
    trimmed: dict[str, Any] = {}
    for key, value in data.items():
        if isinstance(value, list):
            trimmed[key] = value[:50]
        elif isinstance(value, dict):
            trimmed[key] = {k: (v[:50] if isinstance(v, list) else v) for k, v in value.items()}
        else:
            trimmed[key] = value
    return trimmed
