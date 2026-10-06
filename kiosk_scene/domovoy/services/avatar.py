from __future__ import annotations

import datetime as dt
import threading
from typing import Any

from ..clock import Clock, to_iso
from ..db import Database

# Cue vocabulary the Live2D motion map already understands (idle, think, busy, happy, greet, warning, surprise, reply_soft).
MOOD_CUES = {"neutral": "reply_soft", "success": "happy", "error": "warning", "question": "think", "alert": "surprise", "greet": "greet"}
CHARS_PER_SECOND = 13.0        # typical Russian TTS pace; only used to time the mouth animation
LINGER_SECONDS = 4.0           # the bubble stays a moment after the voice stops
THINKING_TIMEOUT = 30.0


class AvatarState:
    """What the kiosk avatar should be doing, published as `state.v1` for the scene's JSON state provider.

    The avatar has no audio of its own: the voice comes from the speaker (a Yandex Station via Home Assistant). This
    service tells the avatar *what is being said and for how long*, so it can show the words and animate its mouth
    for that duration. Timing is an estimate from text length, not phoneme-accurate lip sync.
    """

    def __init__(self, db: Database, clock: Clock, assistant_name: str = "Домовой") -> None:
        self.db, self.clock, self.assistant_name = db, clock, assistant_name
        self._lock = threading.Lock()
        self._message = ""
        self._cue: str | None = None
        self._speaking_until: dt.datetime | None = None
        self._speaking = False
        self._thinking_until: dt.datetime | None = None
        self._updated_at = clock.now()
        self._revision = int(db.get_setting("avatar.revision", 0) or 0)

    # ---- publishing ----------------------------------------------------------------------------

    def say(self, text: str, mood: str = "neutral", *, spoken: bool = True) -> None:
        text = " ".join(str(text or "").split())[:400]
        if not text:
            return
        now = self.clock.now()
        seconds = min(45.0, max(2.0, len(text) / CHARS_PER_SECOND)) if spoken else 0.0
        with self._lock:
            self._message = text
            self._cue = MOOD_CUES.get(mood, "reply_soft")
            self._speaking = spoken
            self._speaking_until = now + dt.timedelta(seconds=seconds) if spoken else now + dt.timedelta(seconds=LINGER_SECONDS)
            self._thinking_until = None
            self._updated_at = now
        self._publish("say")

    def thinking(self, on: bool) -> None:
        now = self.clock.now()
        with self._lock:
            self._thinking_until = now + dt.timedelta(seconds=THINKING_TIMEOUT) if on else None
            self._updated_at = now
        self._publish("thinking" if on else "idle")

    def _publish(self, event: str) -> None:
        with self._lock:
            self._revision += 1
            revision = self._revision
        with self.db.write() as conn:
            conn.execute(
                "INSERT INTO settings(key, value) VALUES ('avatar.revision', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value", (str(revision),)
            )
            self.db.emit(conn, "avatar.changed", {"event": event, "revision": revision})

    # ---- reading -------------------------------------------------------------------------------

    def snapshot(self) -> dict[str, Any]:
        now = self.clock.now()
        with self._lock:
            speaking = self._speaking and self._speaking_until is not None and now < self._speaking_until
            visible = self._speaking_until is not None and now < self._speaking_until + dt.timedelta(seconds=LINGER_SECONDS if self._speaking else 0)
            thinking = self._thinking_until is not None and now < self._thinking_until
            message = self._message if (visible or speaking) else ""
            cue = self._cue if message else None
            if thinking:
                cue = "think"
            activity = "speaking" if speaking else "thinking" if thinking else "idle"
            return {
                "version": 1, "assistant": self.assistant_name, "online": True, "busy": thinking, "status": "", "message": message,
                "source": "domovoy", "updatedAt": to_iso(self._updated_at), "emotion": "happy" if cue == "happy" else None,
                "activity": activity, "cue": cue, "intensity": None, "speaking": speaking, "revision": self._revision,
                "event": "speaking" if speaking else "thinking" if thinking else "",
            }
