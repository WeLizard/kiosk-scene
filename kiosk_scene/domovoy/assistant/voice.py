"""Voice gateway: several ways in (Alice skill, kiosk microphone, HA Assist), one brain, one way out.

Trigger word and conversation window
------------------------------------
Ambient audio from a microphone must not act on everything it hears. A segment is only *used* when its
transcript starts with the configured name/trigger (default «Домовой, …»). That opens a short conversation window for that room during
which follow-ups need no trigger word. Transcripts of everything else are discarded immediately and never stored.

Reply routing
-------------
The answer goes back the way the request came when that path can speak (Alice skill, HA Assist response). Requests
that cannot hear a reply (kiosk microphone, text from a script) get it spoken on the speaker of *their* room via the
`speak` channel, i.e. on the Yandex Station, in Alice's voice.
"""
from __future__ import annotations

import re
import threading
import time
from typing import Any

from ..errors import ProviderError
from ..identity import invocation_names, strip_trigger
from ..text import normalize

DEFAULT_TRIGGERS = ["домовой", "домового", "домовому", "домовым", "домовом", "domovoy"]


class VoiceGateway:
    MAX_WINDOWS = 128

    def __init__(self, app: Any, pipeline: Any, *, monotonic=time.monotonic) -> None:
        self.app, self.pipeline, self._now = app, pipeline, monotonic
        self._windows: dict[str, float] = {}
        self._lock = threading.Lock()

    # ---- state ---------------------------------------------------------------------------------

    def config(self) -> dict[str, Any]:
        return self.app.settings.get("voice")

    def triggers(self) -> list[str]:
        """The configured name/aliases plus any extra words from Voice settings."""
        extra = [str(word) for word in (self.config().get("trigger_words") or []) if str(word).strip()]
        seen: set[str] = set()
        result: list[str] = []
        for word in [*invocation_names(self.app.settings), *extra]:
            key = word.casefold()
            if key not in seen:
                seen.add(key)
                result.append(word)
        return result or DEFAULT_TRIGGERS

    def window_open(self, room: str) -> bool:
        with self._lock:
            return self._windows.get(room or "", 0) > self._now()

    def _open_window(self, room: str) -> None:
        now = self._now()
        with self._lock:
            for key in [key for key, until in self._windows.items() if until <= now]:
                self._windows.pop(key, None)
            if len(self._windows) >= self.MAX_WINDOWS:
                oldest = min(self._windows, key=self._windows.get)
                self._windows.pop(oldest, None)
            self._windows[room or ""] = now + float(self.config().get("window_s") or 20)

    def _close_window(self, room: str) -> None:
        with self._lock:
            self._windows.pop(room or "", None)

    # ---- entry points --------------------------------------------------------------------------

    def handle_audio(self, audio: bytes, mime: str, *, room: str = "", session_id: str | None = None) -> dict[str, Any]:
        cfg = self.config()
        if not cfg.get("enabled"):
            return {"handled": False, "reason": "voice_disabled"}
        try:
            transcript = self.app.stt.transcribe(audio, mime, language=(cfg.get("stt") or {}).get("language") or "ru")
        except ProviderError as exc:
            # busy / down: drop the segment rather than queueing audio on a small machine
            return {"handled": False, "reason": exc.code, "message": exc.message}
        return self.handle_transcript(transcript, room=room, session_id=session_id, require_trigger=True, source="kiosk-mic")

    def handle_transcript(self, transcript: str, *, room: str = "", session_id: str | None = None, require_trigger: bool = True,
                          source: str = "voice", reply_mode: str | None = None) -> dict[str, Any]:
        cfg = self.config()
        transcript = (transcript or "").strip()
        if not transcript:
            return {"handled": False, "reason": "empty"}
        had_trigger, rest = strip_trigger(transcript, self.triggers())
        if require_trigger and not had_trigger and not self.window_open(room):
            # Not addressed to us: forget it. Nothing is logged or stored.
            return {"handled": False, "reason": "no_trigger"}
        if had_trigger and not rest:
            self._open_window(room)
            reply = "Слушаю."
            return self._deliver({"handled": True, "status": "listening", "reply": reply, "command_id": None}, room, reply_mode)
        text = rest if had_trigger else transcript
        session = session_id or f"voice:{room or 'default'}"
        self._open_window(room)
        result = self.pipeline.handle(text, frontend=source, session_id=session, room=room or None)
        if re.fullmatch(r"(?:спасибо|все|всё|хватит|стоп|пока|достаточно)[.!]?", normalize(text)):
            self._close_window(room)
        result["handled"] = True
        return self._deliver(result, room, reply_mode)

    def _deliver(self, result: dict[str, Any], room: str, reply_mode: str | None) -> dict[str, Any]:
        mode = reply_mode or self.config().get("reply") or "speak"
        reply = self.app.speech.render(result.get("reply") or "")
        result["reply"] = reply
        result["spoken"] = False
        self._avatar_react(result, reply)
        if mode == "speak" and reply and self.app.settings.get("speakers"):
            try:
                from ..services.context import Ctx

                entry = self.app.delivery.send(Ctx(actor="system", source="voice", command_id=result.get("command_id")), channel="speak",
                                               recipient="self", text=reply, room=room or self.config().get("room") or None)
                if entry.get("id"):
                    outcome = self.app.outbox.deliver_now(int(entry["id"]))
                    result["spoken"] = outcome.get("status") == "sent"
                    if not result["spoken"]:
                        result["speak_error"] = outcome.get("last_error")
            except Exception as exc:  # the answer is still returned in the payload for the screen
                result["speak_error"] = str(exc)[:200]
        return result

    def _avatar_react(self, result: dict[str, Any], reply: str) -> None:
        """Voice conversations are visible on the kiosk avatar (words + mouth). Typed web chat is not mirrored there."""
        if not reply:
            return
        mood = {"applied": "success", "answered": "neutral", "clarify": "question", "review": "question",
                "failed": "error", "partial": "error", "rejected": "error", "listening": "greet"}.get(result.get("status") or "", "neutral")
        try:
            # when the reply is spoken through `speak`, the speaker path already publishes it; avoid a double update
            if not (self.config().get("reply") == "speak" and self.app.settings.get("speakers")):
                self.app.avatar.say(reply, mood, spoken=True)
        except Exception:  # noqa: BLE001 - the avatar is decoration; never break a command for it
            pass
