"""Turns validated intents into changes and spoken/written replies.

Rules of the house:
  * Deterministic code decides and does; nothing here asks a model anything.
  * Every mutation goes through a service (audit + realtime + search index in one transaction).
  * Ambiguity is a question, not a coin flip: several candidate items/events/entities → `clarify` with options.
  * An external provider failing is reported as such ("Календарь недоступен…"), never as success.
  * Replies are short, gender-neutral and TTS-friendly (they are read aloud by Yandex Stations).
"""
from __future__ import annotations

import datetime as dt
from dataclasses import dataclass, field
from typing import Any

from ..clock import from_iso, to_iso
from ..errors import DomovoyError, ForbiddenError, ProviderError, ValidationError
from ..nlu.datetimes import format_when
from ..nlu.presence_words import DAY_WINDOWS
from ..services.context import Ctx
from ..services.items import format_quantity
from ..services.triggers import looks_active


@dataclass
class Outcome:
    ok: bool
    message: str
    refs: list[dict[str, Any]] = field(default_factory=list)
    clarify: dict[str, Any] | None = None
    data: dict[str, Any] = field(default_factory=dict)
    retryable: bool = False
    session: dict[str, Any] = field(default_factory=dict)   # updates merged into the conversation context


class Executor:
    def __init__(self, app: Any) -> None:
        self.app = app

    # ---- dispatch ------------------------------------------------------------------------------

    def run(self, intent: dict[str, Any], ctx: Ctx, session: dict[str, Any], *, room: str | None = None) -> Outcome:
        handler = getattr(self, f"do_{intent['type']}", None)
        if handler is None:
            return Outcome(False, "Пока не умею это делать.")
        try:
            return handler(intent, ctx, session, room=room)
        except ProviderError as exc:
            return Outcome(False, self._provider_message(exc), retryable=exc.retryable)
        except ForbiddenError as exc:
            return Outcome(False, exc.message)
        except DomovoyError as exc:
            return Outcome(False, exc.message)

    @staticmethod
    def _provider_message(exc: ProviderError) -> str:
        names = {"caldav": "Календарь CalDAV", "telegram": "Telegram", "home_assistant": "Home Assistant", "speak": "Колонка", "llm": "Локальная модель"}
        who = names.get(exc.provider, "Сервис")
        if exc.code == "provider_not_configured":
            return f"{who} не настроен: {exc.message}."
        return f"{who} сейчас недоступен ({exc.message}). Ничего не потеряно — можно повторить позже."

    # ---- helpers -------------------------------------------------------------------------------

    def _now(self) -> dt.datetime:
        return self.app.clock.local_now()

    def _locate(self, intent: dict[str, Any], ctx: Ctx, session: dict[str, Any], *, create: bool) -> tuple[int | None, list[str], str | Outcome]:
        """Resolve a spoken place. Returns `(location_id, created_paths, path_text)` or an `Outcome` to ask a question."""
        path = intent.get("location_path") or []
        kinds = intent.get("location_kinds") or []
        if not path:
            return None, [], ""
        locations = self.app.locations
        # 1) exact chain from the root
        leaf, _, ambiguous = locations.resolve_path(path, create=False)
        if leaf is not None:
            return leaf, [], locations.path_text(leaf)
        # 2) partially specified («коробка 4») – find it wherever it lives, near the last-used place first
        last_location = session.get("last_location_id")
        ids, texts = locations.find_partial(path, prefer_under=locations.get(last_location)["parent_id"] if last_location and self._exists(last_location) else None)
        if len(ids) == 1:
            return ids[0], [], texts[0]
        if len(ids) > 1:
            return None, [], Outcome(False, f"Уточните, какое место: {'; '.join(texts[:4])}",
                                     clarify={"question": f"Какое именно место: {'; '.join(texts[:4])}?", "options": texts[:4]})
        if ambiguous and not create:
            return None, [], Outcome(False, f"Похоже на {ambiguous[0]}. Скажите точнее.", clarify={"question": f"Вы имели в виду {ambiguous[0]}?"})
        if not create:
            return None, [], Outcome(False, f"Не нашёл место «{' → '.join(path)}».")
        # 3) new place: a lone spoken element («в четвёртую коробку») goes next to where the last item was
        parent_hint = None
        if len(path) == 1 and last_location and self._exists(last_location):
            parent_hint = locations.get(last_location)["parent_id"]
        if parent_hint is not None:
            parent_path = locations.path_names_for(parent_hint)
            path = parent_path + path
            kinds = [""] * len(parent_path) + list(kinds)
        leaf, created, _ = locations.resolve_path(path, create=True, ctx=ctx, kinds=[k or "place" for k in kinds] if kinds else None)
        return leaf, created, locations.path_text(leaf)

    def _exists(self, location_id: int) -> bool:
        try:
            self.app.locations.get(location_id)
            return True
        except DomovoyError:
            return False

    def _pick_item(self, intent: dict[str, Any], session: dict[str, Any], *, verb: str) -> dict[str, Any] | Outcome:
        items = self.app.items
        if intent.get("item_id") is not None:
            return items.get(int(intent["item_id"]))
        if intent.get("use_last"):
            last = session.get("last_item_id")
            if not last:
                return Outcome(False, "Не понял, о каком предмете речь. Назовите его.", clarify={"question": "О каком предмете речь?"})
            try:
                return items.get(int(last))
            except DomovoyError:
                return Outcome(False, "Предмет, о котором мы говорили, уже удалён. Назовите его ещё раз.")
        name = intent.get("name") or ""
        candidates = items.candidates(name)
        if not candidates:
            return Outcome(False, f"Не нашёл в памяти «{name}».")
        best = candidates[0]
        if len(candidates) == 1 or (best["match_score"] >= 0.95 and candidates[1]["match_score"] < 0.8):
            return best
        options = [f"{c['name']} — {c['location_text'] or 'без места'}" for c in candidates[:4]]
        question = f"Что {verb}: " + "; ".join(f"{i}) {o}" for i, o in enumerate(options, 1)) + "?"
        return Outcome(False, question, clarify={"question": question, "options": options, "item_ids": [c["id"] for c in candidates[:4]]})

    # ---- memory: items -------------------------------------------------------------------------

    def do_add_item(self, intent: dict[str, Any], ctx: Ctx, session: dict[str, Any], **_: Any) -> Outcome:
        location_id, created, path_text = self._locate(intent, ctx, session, create=True) if intent.get("location_path") else (None, [], "")
        if isinstance(path_text, Outcome):
            return path_text
        item, outcome = self.app.items.create(
            ctx, name=intent["name"], quantity=intent.get("quantity"), unit=intent.get("unit", ""), location_id=location_id,
            mode=intent.get("mode", "set"), confidence=intent.get("confidence"),
        )
        what = f"{format_quantity(item['quantity'], item['unit'])} «{item['name']}»".strip() if item["quantity"] is not None else f"«{item['name']}»"
        where = f" — {path_text}" if path_text else ""
        verb = "Добавлено" if outcome == "increased" else "Записано"
        total = f" Теперь {format_quantity(item['quantity'], item['unit'])}." if outcome == "increased" else ""
        new_places = f" Новые места: {', '.join(created_names(self.app, created))}." if created else ""
        return Outcome(True, f"{verb}: {what}{where}.{total}{new_places}", refs=[{"kind": "item", "id": item["id"]}],
                       session={"last_item_id": item["id"], "last_location_id": location_id or session.get("last_location_id")})

    def do_place_item(self, intent: dict[str, Any], ctx: Ctx, session: dict[str, Any], **_: Any) -> Outcome:
        location_id, created, path_text = self._locate(intent, ctx, session, create=True)
        if isinstance(path_text, Outcome):
            return path_text
        # Only a *confident* name match means "move that thing". "программатор stm32" is more specific than an
        # existing "программатор": it is a different item, so it gets its own record instead of hijacking the other.
        candidates = [c for c in self.app.items.candidates(intent["name"]) if c["match_score"] >= 0.9]
        if not candidates:
            item, _ = self.app.items.create(ctx, name=intent["name"], quantity=intent.get("quantity"), unit=intent.get("unit", ""),
                                            location_id=location_id, confidence=intent.get("confidence"))
            return Outcome(True, f"Записано: «{item['name']}» — {path_text}.", refs=[{"kind": "item", "id": item["id"]}],
                           session={"last_item_id": item["id"], "last_location_id": location_id})
        picked = self._pick_item({"name": intent["name"]}, session, verb="положили")
        if isinstance(picked, Outcome):
            return picked
        item = self.app.items.move(ctx, picked["id"], location_id)
        return Outcome(True, f"Перенесено: «{item['name']}» — {path_text}.", refs=[{"kind": "item", "id": item["id"]}],
                       session={"last_item_id": item["id"], "last_location_id": location_id})

    def do_move_item(self, intent: dict[str, Any], ctx: Ctx, session: dict[str, Any], **_: Any) -> Outcome:
        picked = self._pick_item(intent, session, verb="переносим")
        if isinstance(picked, Outcome):
            return picked
        location_id, created, path_text = self._locate(intent, ctx, session, create=True)
        if isinstance(path_text, Outcome):
            return path_text
        item = self.app.items.move(ctx, picked["id"], location_id)
        return Outcome(True, f"Перенесено: «{item['name']}» — {path_text}.", refs=[{"kind": "item", "id": item["id"]}],
                       session={"last_item_id": item["id"], "last_location_id": location_id})

    def do_consume_item(self, intent: dict[str, Any], ctx: Ctx, session: dict[str, Any], **_: Any) -> Outcome:
        picked = self._pick_item(intent, session, verb="списываем")
        if isinstance(picked, Outcome):
            return picked
        item = self.app.items.consume(ctx, picked["id"], intent["quantity"])
        left = format_quantity(item["quantity"], item["unit"])
        note = " Это последнее." if item["quantity"] == 0 else ""
        return Outcome(True, f"Списано {format_quantity(intent['quantity'], item['unit'])}. Осталось {left} «{item['name']}».{note}",
                       refs=[{"kind": "item", "id": item["id"]}], session={"last_item_id": item["id"]})

    def do_set_quantity(self, intent: dict[str, Any], ctx: Ctx, session: dict[str, Any], **_: Any) -> Outcome:
        picked = self._pick_item(intent, session, verb="исправляем")
        if isinstance(picked, Outcome):
            return picked
        patch: dict[str, Any] = {"quantity": intent["quantity"]}
        if intent.get("unit"):
            patch["unit"] = intent["unit"]
        item = self.app.items.update(ctx, picked["id"], patch, action="correct")
        return Outcome(True, f"Исправлено: {format_quantity(item['quantity'], item['unit'])} «{item['name']}».",
                       refs=[{"kind": "item", "id": item["id"]}], session={"last_item_id": item["id"]})

    def do_use_item(self, intent: dict[str, Any], ctx: Ctx, session: dict[str, Any], **_: Any) -> Outcome:
        picked = self._pick_item({"name": intent["name"]}, session, verb="использовали")
        if isinstance(picked, Outcome):
            return picked
        item = self.app.items.touch_used(ctx, picked["id"])
        where = f" Лежит: {item['location_text']}." if item["location_text"] else ""
        return Outcome(True, f"Отметил использование: «{item['name']}».{where}", refs=[{"kind": "item", "id": item["id"]}],
                       session={"last_item_id": item["id"]})

    def do_remove_item(self, intent: dict[str, Any], ctx: Ctx, session: dict[str, Any], **_: Any) -> Outcome:
        picked = self._pick_item(intent, session, verb="удаляем")
        if isinstance(picked, Outcome):
            return picked
        self.app.items.delete(ctx, picked["id"])
        return Outcome(True, f"Удалено: «{picked['name']}». Можно отменить.", refs=[{"kind": "item", "id": picked["id"]}])

    def do_find_item(self, intent: dict[str, Any], ctx: Ctx, session: dict[str, Any], **_: Any) -> Outcome:
        query = intent["query"]
        found = self.app.items.candidates(query, limit=8)
        if not found:
            hits = [h for h in self.app.search.search(query, kinds=["item"], limit=5)["hits"] if h["score"] >= 0.6]
            found = [self.app.items.get(h["id"]) for h in hits]
        if intent.get("location_path"):
            loc_ids, _ = self.app.locations.find_partial(intent["location_path"])
            if loc_ids:
                allowed = set()
                with self.app.db.read() as conn:
                    for lid in loc_ids:
                        allowed.update(self.app.locations.descendants(conn, lid))
                found = [i for i in found if i["location_id"] in allowed]
        recency_note = ""
        if intent.get("since") and intent.get("until") and found:
            active = self.app.items.used_between(intent["since"], intent["until"])
            in_window = [i for i in found if i["id"] in active]
            if in_window:
                found = in_window
            else:
                recency_note = " За этот период с ним ничего не делали, вот все подходящие."
        if not found:
            return Outcome(True, f"Ничего не нашёл по запросу «{query}».", data={"items": []})
        refs = [{"kind": "item", "id": i["id"]} for i in found]
        if intent.get("count"):
            total = sum(i["quantity"] or 0 for i in found)
            unit = found[0]["unit"]
            parts = [f"{i['quantity_text'] or 'есть'} — {i['location_text'] or 'место не указано'}" for i in found[:3]]
            return Outcome(True, f"Всего {format_quantity(total, unit)} «{found[0]['name']}»: " + "; ".join(parts) + ".",
                           refs=refs, data={"items": found}, session={"last_item_id": found[0]["id"]})
        first = found[0]
        if len(found) == 1 or first.get("match_score", 1) >= 0.95 > (found[1].get("match_score", 0)) or recency_note == "" and len(found) == 1:
            where = first["location_text"] or "место не указано"
            qty = f" ({first['quantity_text']})" if first["quantity_text"] else ""
            return Outcome(True, f"«{first['name']}»{qty}: {where}.{recency_note}", refs=refs[:1], data={"items": found},
                           session={"last_item_id": first["id"], "last_location_id": first["location_id"]})
        lines = [f"«{i['name']}» — {i['location_text'] or 'место не указано'}" for i in found[:4]]
        return Outcome(True, "Нашёл несколько: " + "; ".join(lines) + "." + recency_note, refs=refs, data={"items": found},
                       session={"last_item_id": first["id"], "last_location_id": first["location_id"]})

    def do_list_location(self, intent: dict[str, Any], ctx: Ctx, session: dict[str, Any], **_: Any) -> Outcome:
        location_id, _, path_text = self._locate(intent, ctx, session, create=False)
        if isinstance(path_text, Outcome):
            return path_text
        items = self.app.items.list(location_id=location_id, include_empty=False)
        if not items:
            return Outcome(True, f"В месте «{path_text}» ничего не записано.", data={"items": []}, session={"last_location_id": location_id})
        spoken = "; ".join(f"{i['quantity_text'] + ' ' if i['quantity_text'] else ''}{i['name']}".strip() for i in items[:6])
        more = f" И ещё {len(items) - 6}." if len(items) > 6 else ""
        return Outcome(True, f"{path_text}: {spoken}.{more}", refs=[{"kind": "item", "id": i["id"]} for i in items],
                       data={"items": items}, session={"last_location_id": location_id})

    def do_add_note(self, intent: dict[str, Any], ctx: Ctx, session: dict[str, Any], **_: Any) -> Outcome:
        note = self.app.notes.create(ctx, body=intent["text"], title=intent.get("title", ""))
        return Outcome(True, "Запомнил.", refs=[{"kind": "note", "id": note["id"]}])

    def do_query_memory(self, intent: dict[str, Any], ctx: Ctx, session: dict[str, Any], **_: Any) -> Outcome:
        result = self.app.search.search(intent["query"], limit=5)
        hits = [h for h in result["hits"] if h["score"] >= 0.5]
        if not hits:
            return Outcome(True, "Ничего похожего не нашёл в памяти.", data=result)
        lines = [f"{h['title']}" + (f" — {h['snippet']}" if h["kind"] in ("note",) else "") for h in hits[:3]]
        return Outcome(True, "Нашёл: " + "; ".join(lines) + ".", refs=[{"kind": h["kind"], "id": h["id"]} for h in hits], data=result)

    # ---- reminders, calendar, messages ---------------------------------------------------------

    def _default_channel(self) -> str:
        if self.app.settings.get("speakers") and self.app.settings.get("speak").get("enabled", True):
            return "speak"
        if self.app.telegram.configured():
            return "telegram"
        return "ui"

    def do_create_reminder(self, intent: dict[str, Any], ctx: Ctx, session: dict[str, Any], *, room: str | None = None, **_: Any) -> Outcome:
        channel = intent.get("channel") or self._default_channel()
        trigger = intent.get("trigger")
        due = from_iso(intent["when"]).astimezone(self.app.clock.tz) if intent.get("when") else None
        if trigger:
            resolved = self._resolve_trigger(dict(trigger))
            if isinstance(resolved, Outcome):
                return resolved
            trigger = resolved
        reminder = self.app.reminders.create(ctx, text=intent["text"], due_at=due, trigger=trigger, recurrence=intent.get("recurrence"),
                                             channel=channel, recipient=intent.get("recipient") or "self")
        via = {"speak": "голосом", "telegram": "в Telegram", "ui": "на экране", "ha_notify": "уведомлением"}[channel]
        if trigger:
            when_text = self._trigger_phrase(trigger)
            return Outcome(True, f"Напомню {via}, {when_text}: {intent['text'].lower()}.", refs=[{"kind": "reminder", "id": reminder["id"]}],
                           session={"last_reminder_id": reminder["id"]})
        when_text = format_when(due, self._now(), all_day=bool(intent.get("date_only") and not intent.get("recurrence")))
        rec = " Повторять буду по расписанию." if intent.get("recurrence") else ""
        return Outcome(True, f"Напомню {via} {when_text}: {intent['text'].lower()}.{rec}", refs=[{"kind": "reminder", "id": reminder["id"]}],
                       session={"last_reminder_id": reminder["id"]})

    def _resolve_trigger(self, trigger: dict[str, Any]) -> dict[str, Any] | Outcome:
        kind = trigger.get("type")
        settings = self.app.settings
        if kind == "presence":
            person = settings.get("ha").get("person_entity")
            if not person:
                return Outcome(False, "Чтобы напоминать по приходу домой, укажите в настройках, за каким человеком в Home Assistant следить.",
                               clarify={"question": "Не настроено отслеживание присутствия (Настройки → Дом → person).", "needs_setup": True})
            trigger["person"] = person
            return trigger
        if kind == "room":
            if self.app.presence.place_entry(trigger.get("place", "")) is None:
                return Outcome(False, f"Не знаю, как определить, что вы в месте «{trigger.get('place')}». Привяжите датчик в настройках (Места).",
                               clarify={"question": f"Нет датчика для «{trigger.get('place')}» (Настройки → Места).", "needs_setup": True})
            return trigger
        if kind == "state":
            if not self.app.ha.configured():
                return Outcome(False, "Чтобы следить за устройствами, нужен доступ к Home Assistant.", clarify={"question": "Home Assistant не подключён.", "needs_setup": True})
            hint = trigger.pop("entity_hint", "")
            matches = self.app.ha.search_entities(hint, limit=3)
            if not matches:
                return Outcome(False, f"Не нашёл в Home Assistant устройство «{hint}».")
            if len(matches) > 1 and matches[0]["score"] - matches[1]["score"] < 0.15:
                names = [m["name"] for m in matches]
                return Outcome(False, f"Какое устройство: {', '.join(names)}?", clarify={"question": f"Какое устройство: {', '.join(names)}?", "options": names})
            entity = matches[0]
            event = trigger.pop("event", "finish")
            state = str(entity["state"])
            if event == "finish":
                if not looks_active(state):
                    return Outcome(False, f"«{entity['name']}» сейчас в состоянии «{state}». Какое состояние считать работой? Скажите, когда оно активно.",
                                   clarify={"question": f"Сейчас «{entity['name']}»: {state}. Запустите работу и повторите.", "options": []})
                return {"type": "state", "entity_id": entity["entity_id"], "from": state, "require_transition": True}
            return {"type": "state", "entity_id": entity["entity_id"], "to": "on" if state in ("off", "idle") else state, "require_transition": True}
        return Outcome(False, "Не понял условие напоминания.")

    @staticmethod
    def _trigger_phrase(trigger: dict[str, Any]) -> str:
        window = trigger.get("window")
        part = ""
        if window:
            for name, span in DAY_WINDOWS.items():
                if (window["from"], window["to"]) == span:
                    part = {"morning": "утром", "day": "днём", "evening": "вечером", "night": "ночью"}[name] + " "
        if trigger["type"] == "presence":
            return f"когда {part}вы будете дома"
        if trigger["type"] == "room":
            return f"когда вы окажетесь в месте «{trigger['place']}»"
        return "когда устройство закончит"

    def do_create_event(self, intent: dict[str, Any], ctx: Ctx, session: dict[str, Any], **_: Any) -> Outcome:
        start = from_iso(intent["start"]).astimezone(self.app.clock.tz)
        end = from_iso(intent["end"]).astimezone(self.app.clock.tz) if intent.get("end") else None
        event = self.app.calendar.create(ctx, title=intent["title"], start=start, end=end, all_day=bool(intent.get("all_day")),
                                         location=intent.get("location", ""), notes=intent.get("notes", ""), calendar=intent.get("calendar"))
        when_text = format_when(event.start, self._now(), all_day=event.all_day)
        where = "в календарь" if event.calendar == "local" else f"в календарь ({event.calendar})"
        return Outcome(True, f"Добавлено {where}: «{event.title}» — {when_text}.", refs=[{"kind": "event", "ref": f"{event.calendar}:{event.id}"}],
                       data={"event": event.public()}, session={"last_event_ref": f"{event.calendar}:{event.id}"})

    def do_query_calendar(self, intent: dict[str, Any], ctx: Ctx, session: dict[str, Any], **_: Any) -> Outcome:
        start = from_iso(intent["start"]).astimezone(self.app.clock.tz)
        end = from_iso(intent["end"]).astimezone(self.app.clock.tz)
        result = self.app.calendar.list_events(start, end)
        events = result["events"]
        warning = ""
        if result["warnings"]:
            warning = f" Не удалось прочитать: {', '.join(w['source'] for w in result['warnings'])}."
        label = intent.get("label") or "в этот период"
        if not events:
            return Outcome(True, f"Событий {label} нет.{warning}", data=result)
        spoken = []
        for e in events[:5]:
            s = from_iso(e["start"]).astimezone(self.app.clock.tz) if "Z" in e["start"] or "+" in e["start"] else dt.datetime.fromisoformat(e["start"])
            spoken.append(f"{'весь день' if e['all_day'] else f'в {s.hour}:{s.minute:02d}'} — {e['title']}")
        more = f" И ещё {len(events) - 5}." if len(events) > 5 else ""
        return Outcome(True, f"{label.capitalize()}: " + "; ".join(spoken) + f".{more}{warning}", data=result)

    def _find_events(self, intent: dict[str, Any]) -> list[dict[str, Any]]:
        now = self._now()
        start = from_iso(intent["search_start"]) if intent.get("search_start") else now - dt.timedelta(days=1)
        end = from_iso(intent["search_end"]) if intent.get("search_end") else now + dt.timedelta(days=120)
        return self.app.calendar.find_by_title(intent["title"], start, end)

    def do_update_event(self, intent: dict[str, Any], ctx: Ctx, session: dict[str, Any], **_: Any) -> Outcome:
        matches = self._find_events(intent)
        if not matches:
            return Outcome(False, f"Не нашёл событие «{intent['title']}».")
        if len(matches) > 1:
            options = [f"{m['title']} — {format_when(from_iso(m['start']) if m['start'].endswith('Z') else dt.datetime.fromisoformat(m['start']), self._now(), all_day=m['all_day'])}" for m in matches[:4]]
            return Outcome(False, "Какое событие: " + "; ".join(options) + "?", clarify={"question": "Какое событие переносим?", "options": options})
        patch: dict[str, Any] = {}
        if intent.get("new_start"):
            patch["start"] = from_iso(intent["new_start"]).astimezone(self.app.clock.tz)
        if intent.get("new_end"):
            patch["end"] = from_iso(intent["new_end"]).astimezone(self.app.clock.tz)
        if intent.get("new_title"):
            patch["title"] = intent["new_title"]
        event = self.app.calendar.update(ctx, matches[0]["ref"], patch)
        return Outcome(True, f"Перенесено: «{event.title}» — {format_when(event.start, self._now(), all_day=event.all_day)}.",
                       refs=[{"kind": "event", "ref": f"{event.calendar}:{event.id}"}])

    def do_delete_event(self, intent: dict[str, Any], ctx: Ctx, session: dict[str, Any], **_: Any) -> Outcome:
        matches = self._find_events(intent)
        if not matches:
            return Outcome(False, f"Не нашёл событие «{intent['title']}».")
        if len(matches) > 1:
            options = [m["title"] for m in matches[:4]]
            return Outcome(False, "Какое событие удалить: " + "; ".join(options) + "?", clarify={"question": "Какое событие удалить?", "options": options})
        self.app.calendar.delete(ctx, matches[0]["ref"])
        return Outcome(True, f"Удалено событие «{matches[0]['title']}».", refs=[{"kind": "event", "ref": matches[0]["ref"]}])

    def do_send_message(self, intent: dict[str, Any], ctx: Ctx, session: dict[str, Any], **_: Any) -> Outcome:
        channel = intent.get("channel") or "telegram"
        not_before = from_iso(intent["when"]) if intent.get("when") else None
        recipient = intent["recipient"]
        entry = self.app.delivery.send(ctx, channel=channel, recipient=recipient, text=intent["text"], key=f"cmd:{ctx.command_id}:{recipient}:{channel}")
        who = entry.get("recipient") or recipient
        via = {"telegram": "в Telegram", "speak": "голосом", "ha_notify": "уведомлением", "ui": "на экран"}[channel]
        if not_before and not_before > self.app.clock.now():
            # scheduled: keep it queued until then
            with self.app.db.write() as conn:
                conn.execute("UPDATE outbox SET next_attempt_at = ? WHERE id = ? AND status = 'queued'", (to_iso(not_before), entry["id"]))
            return Outcome(True, f"Отправлю {who} {via} {format_when(not_before.astimezone(self.app.clock.tz), self._now())}.",
                           refs=[{"kind": "outbox", "id": entry["id"]}])
        if "id" in entry and channel != "ui":
            final = self.app.outbox.deliver_now(int(entry["id"]))
            if final.get("status") == "sent":
                return Outcome(True, f"Отправлено: {who}, {via}.", refs=[{"kind": "outbox", "id": entry["id"]}])
            reason = final.get("last_error") or "нет связи"
            return Outcome(True, f"Сообщение для {who} поставлено в очередь: {reason}. Повторю сам.", refs=[{"kind": "outbox", "id": entry["id"]}],
                           data={"delivery": final})
        return Outcome(True, f"Показал на экране для {who}.")

    # ---- tasks and shopping --------------------------------------------------------------------

    def do_add_task(self, intent: dict[str, Any], ctx: Ctx, session: dict[str, Any], **_: Any) -> Outcome:
        task, created = self.app.tasks.create(ctx, title=intent["title"], list_name=intent.get("list", "tasks"), due_date=intent.get("due_date"),
                                              recurrence=intent.get("recurrence"))
        label = {"chores": "в повторяющиеся дела", "shopping": "в список покупок", "tasks": "в задачи"}[task["list"]]
        due = f" на {intent['due_date']}" if intent.get("due_date") and not intent.get("recurrence") else ""
        rec = " Буду возвращать её по расписанию." if intent.get("recurrence") else ""
        prefix = "Добавлено" if created else "Уже есть"
        return Outcome(True, f"{prefix} {label}: {task['title']}{due}.{rec}", refs=[{"kind": "task", "id": task["id"]}])

    def do_add_shopping(self, intent: dict[str, Any], ctx: Ctx, session: dict[str, Any], **_: Any) -> Outcome:
        added, existing, refs = [], [], []
        for title in intent["items"]:
            task, created = self.app.tasks.create(ctx, title=title, list_name="shopping")
            (added if created else existing).append(task["title"])
            refs.append({"kind": "task", "id": task["id"]})
        parts = []
        if added:
            parts.append("Добавлено в список покупок: " + ", ".join(added))
        if existing:
            parts.append("уже было: " + ", ".join(existing))
        return Outcome(True, "; ".join(parts) + ".", refs=refs)

    def do_complete_task(self, intent: dict[str, Any], ctx: Ctx, session: dict[str, Any], **_: Any) -> Outcome:
        matches = self.app.tasks.find_open_by_title(intent["title"], intent.get("list"))
        if not matches:
            return Outcome(False, f"Не нашёл задачу «{intent['title']}».")
        if len(matches) > 1:
            options = [m["title"] for m in matches[:4]]
            return Outcome(False, "Какую отметить: " + "; ".join(options) + "?", clarify={"question": "Какую задачу отметить?", "options": options})
        task = self.app.tasks.update(ctx, matches[0]["id"], {"done": True})
        return Outcome(True, f"Отмечено выполненным: {task['title']}.", refs=[{"kind": "task", "id": task["id"]}])

    def do_query_tasks(self, intent: dict[str, Any], ctx: Ctx, session: dict[str, Any], **_: Any) -> Outcome:
        list_name = intent.get("list")
        tasks = self.app.tasks.list(list_name=list_name)
        label = {"shopping": "В списке покупок", "chores": "Повторяющиеся дела", "tasks": "Задачи"}.get(list_name or "tasks", "Задачи")
        if not tasks:
            return Outcome(True, f"{label}: пусто.", data={"tasks": []})
        spoken = ", ".join(t["title"] for t in tasks[:8])
        more = f" И ещё {len(tasks) - 8}." if len(tasks) > 8 else ""
        return Outcome(True, f"{label}: {spoken}.{more}", data={"tasks": tasks})

    # ---- Home Assistant ------------------------------------------------------------------------

    def do_ha_control(self, intent: dict[str, Any], ctx: Ctx, session: dict[str, Any], **_: Any) -> Outcome:
        if not self.app.ha.configured():
            return Outcome(False, "Home Assistant не подключён.")
        matches = self.app.ha.search_entities(intent["entity_hint"], limit=4)
        if not matches:
            return Outcome(False, f"Не нашёл устройство «{intent['entity_hint']}».")
        if len(matches) > 1 and matches[0]["score"] - matches[1]["score"] < 0.15:
            names = [m["name"] for m in matches[:3]]
            return Outcome(False, f"Какое устройство: {', '.join(names)}?", clarify={"question": f"Какое устройство: {', '.join(names)}?", "options": names})
        entity = matches[0]
        domain = entity["entity_id"].split(".")[0]
        service = intent["service"]
        self.app.ha.call_service(domain, service, {"entity_id": entity["entity_id"]})
        with self.app.db.write() as conn:
            self.app.audit.record(conn, ctx, "ha_action", None, "call_service", None, {"service": f"{domain}.{service}", "entity_id": entity["entity_id"]},
                                  f"HA: {domain}.{service} → {entity['name']}", undoable=False)
        verb = {"turn_on": "Включил", "turn_off": "Выключил", "toggle": "Переключил", "open_cover": "Открыл", "close_cover": "Закрыл"}.get(service, "Готово:")
        return Outcome(True, f"{verb} «{entity['name']}».", refs=[{"kind": "ha_entity", "id": entity["entity_id"]}])

    def do_ha_query(self, intent: dict[str, Any], ctx: Ctx, session: dict[str, Any], **_: Any) -> Outcome:
        if not self.app.ha.configured():
            return Outcome(False, "Home Assistant не подключён.")
        matches = self.app.ha.search_entities(intent["entity_hint"], limit=3)
        if not matches:
            return Outcome(False, f"Не нашёл датчик «{intent['entity_hint']}».")
        top = matches[0]
        state = self.app.ha.get_state(top["entity_id"]) or {}
        unit = (state.get("attributes") or {}).get("unit_of_measurement", "")
        return Outcome(True, f"{top['name']}: {state.get('state', top['state'])} {unit}".strip() + ".", refs=[{"kind": "ha_entity", "id": top["entity_id"]}])

    # ---- meta ----------------------------------------------------------------------------------

    def do_undo(self, intent: dict[str, Any], ctx: Ctx, session: dict[str, Any], **_: Any) -> Outcome:
        target = session.get("last_command_id") or self.app.audit.last_undoable_command()
        if not target:
            return Outcome(False, "Нечего отменять.")
        count = self.app.audit.undo_command(int(target), ctx)
        return Outcome(True, f"Отменено действий: {count}.", session={"last_command_id": None})

    def do_help(self, intent: dict[str, Any], ctx: Ctx, session: dict[str, Any], **_: Any) -> Outcome:
        return Outcome(True, "Я запоминаю, где что лежит, ищу вещи, веду календарь, напоминания и списки, "
                             "пишу в Telegram и управляю домом. Например: «запомни, девять резисторов лежат в третьей коробке».")

    def do_clarify(self, intent: dict[str, Any], ctx: Ctx, session: dict[str, Any], **_: Any) -> Outcome:
        return Outcome(False, intent.get("question") or "Уточните, пожалуйста.", clarify={"question": intent.get("question"), "options": intent.get("options") or []})


def created_names(app: Any, ids: list[int]) -> list[str]:
    names = []
    for location_id in ids:
        try:
            names.append(app.locations.get(location_id)["name"])
        except DomovoyError:
            continue
    return names
