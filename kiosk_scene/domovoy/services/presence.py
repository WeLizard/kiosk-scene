from __future__ import annotations

import threading
import time
from typing import Any

from ..text import norm_key

ACTIVE_LIKE = {"printing", "on", "running", "heating", "cleaning", "washing", "drying", "active", "playing", "печатает", "работает"}
from ..nlu.presence_words import DAY_WINDOWS  # noqa: F401  (re-exported for callers)


class PresenceService:
    """Where is everybody, according to Home Assistant, cached for a couple of seconds."""

    def __init__(self, ha: Any, settings: Any, ttl: float = 2.0) -> None:
        self.ha, self.settings, self.ttl = ha, settings, ttl
        self._cache: dict[str, dict[str, Any]] = {}
        self._at = 0.0
        self._lock = threading.Lock()

    def states(self, *, fresh: bool = False) -> dict[str, dict[str, Any]]:
        with self._lock:
            if not fresh and self._cache and time.monotonic() - self._at < self.ttl:
                return self._cache
        snapshot = {s["entity_id"]: s for s in self.ha.get_states() if "entity_id" in s}
        with self._lock:
            self._cache, self._at = snapshot, time.monotonic()
        return snapshot

    def _entry_active(self, entry: dict[str, Any], states: dict[str, dict[str, Any]]) -> bool:
        state = states.get(str(entry.get("entity_id", "")))
        return bool(state) and str(state.get("state")) == str(entry.get("state", "on"))

    def active_rooms(self, states: dict[str, dict[str, Any]] | None = None) -> list[str]:
        """Rooms whose presence entity currently matches, per the owner's `rooms` mapping."""
        states = states if states is not None else self.states()
        return [str(r.get("name") or r.get("room")) for r in self.settings.get("rooms") if self._entry_active(r, states)]

    def place_entry(self, name: str) -> dict[str, Any] | None:
        key = norm_key(name)
        for entry in list(self.settings.get("places")) + list(self.settings.get("rooms")):
            if norm_key(str(entry.get("name") or entry.get("room") or "")) == key:
                return entry
        return None


def in_window(local_time: Any, window: dict[str, str] | None) -> bool:
    """`window = {"from": "18:00", "to": "23:59"}`; wraps past midnight (`22:00`→`05:59`)."""
    if not window:
        return True
    current = local_time.strftime("%H:%M")
    start, end = window.get("from", "00:00"), window.get("to", "23:59")
    return start <= current <= end if start <= end else current >= start or current <= end
