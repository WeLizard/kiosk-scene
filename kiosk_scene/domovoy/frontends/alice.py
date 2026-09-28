"""Yandex Dialogs (Alice) webhook: https://yandex.ru/dev/dialogs/alice/doc/protocol.html

The skill's activation name is «Домовой». Sessions stay open (`end_session=false`) so that after
«Алиса, домовой …» follow-ups need no repeated invocation; «хватит»/«спасибо» closes it.
Alice waits ~3 s for the answer: the pipeline gets a strict budget, and when it cannot finish in time the
speaker hears an honest "accepted, working on it" while the command completes and is recorded in Activity.
"""
from __future__ import annotations

import concurrent.futures
import re
from typing import Any

from ..text import normalize

MAX_TEXT = 1000
EXIT_WORDS = {"хватит", "выйди", "выход", "закрой навык", "стоп", "все", "всё", "спасибо", "пока", "до свидания", "достаточно"}
_POOL = concurrent.futures.ThreadPoolExecutor(max_workers=4, thread_name_prefix="alice")


def speakable(text: str) -> str:
    """Make a reply pleasant for TTS: no arrows/quotes, no double punctuation, ≤ 1000 chars at a sentence edge."""
    cleaned = text.replace("→", ",").replace("«", "").replace("»", "").replace("—", ",")
    cleaned = re.sub(r"\s+", " ", cleaned).strip()
    cleaned = re.sub(r"([,.;:!?])\1+", r"\1", cleaned)
    if len(cleaned) <= MAX_TEXT:
        return cleaned
    cut = cleaned[:MAX_TEXT]
    edge = max(cut.rfind(". "), cut.rfind("; "), cut.rfind(", "))
    return (cut[: edge + 1] if edge > 200 else cut).strip()


class AliceFrontend:
    def __init__(self, app: Any, pipeline: Any, voice: Any) -> None:
        self.app, self.pipeline, self.voice = app, pipeline, voice

    def _response(self, payload: dict[str, Any], text: str, *, end: bool = False) -> dict[str, Any]:
        spoken = speakable(text)
        return {"response": {"text": spoken, "tts": spoken, "end_session": end}, "version": payload.get("version", "1.0")}

    def handle(self, payload: dict[str, Any]) -> dict[str, Any]:
        request = payload.get("request") or {}
        session = payload.get("session") or {}
        command = str(request.get("command") or "").strip()
        original = str(request.get("original_utterance") or "").strip()
        if original.lower() == "ping" or command.lower() == "ping":
            return {"response": {"text": "pong", "end_session": False}, "version": payload.get("version", "1.0")}

        cfg = self.app.settings.get("alice")
        allowed = [str(x) for x in cfg.get("allowed_user_ids") or []]
        if allowed:
            ids = {str((session.get("user") or {}).get("user_id", "")), str(session.get("user_id", "")),
                   str((session.get("application") or {}).get("application_id", ""))}
            if not ids & set(allowed):
                return self._response(payload, "Этот навык приватный.", end=True)

        if not command:
            return self._response(payload, "Слушаю. Скажите, что запомнить, найти или добавить в календарь.")
        if normalize(command) in EXIT_WORDS:
            return self._response(payload, "Хорошо. Зовите, если что.", end=True)

        # Alice hands over the words *after* the activation name, so no trigger word is required here. A stray
        # «домовой …» at the start (users repeat it out of habit) is tolerated by the rule interpreter.
        session_id = f"alice:{session.get('session_id') or session.get('user_id') or 'default'}"
        budget = float(cfg.get("budget_s") or 2.5)
        future = _POOL.submit(self.voice.handle_transcript, command, room="", session_id=session_id, require_trigger=False,
                              source="alice", reply_mode="text")
        try:
            result = future.result(timeout=budget)
        except concurrent.futures.TimeoutError:
            return self._response(payload, "Принял, разбираюсь. Результат появится в журнале.")
        reply = result.get("reply") or "Готово."
        return self._response(payload, reply)
