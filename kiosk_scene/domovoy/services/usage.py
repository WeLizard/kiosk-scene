"""Monthly token accounting for an external chat API.

The semantic router and search keep using the local embedding model. Only chat calls that actually leave the
house are counted; the budget stops those calls before any request is sent.
"""
from __future__ import annotations

import threading
from typing import Any

from ..clock import Clock
from ..db import Database, dumps


class TokenUsage:
    def __init__(self, db: Database, clock: Clock, settings: Any) -> None:
        self.db, self.clock, self.settings = db, clock, settings
        self._lock = threading.Lock()

    def _month(self) -> str:
        return self.clock.local_now().strftime("%Y-%m")

    def snapshot(self) -> dict[str, Any]:
        month = self._month()
        stored_month = str(self.db.get_setting("ai.usage_month", "") or "")
        used = int(self.db.get_setting("ai.usage_tokens", 0) or 0) if stored_month == month else 0
        budget = int(self.settings.get("ai").get("monthly_token_budget") or 0)
        return {"month": month, "used": used, "budget": budget, "remaining": max(0, budget - used) if budget else None}

    def allow(self) -> bool:
        state = self.snapshot()
        return not state["budget"] or state["used"] < state["budget"]

    def record(self, tokens: int) -> None:
        tokens = max(0, int(tokens))
        if not tokens:
            return
        with self._lock:
            month = self._month()
            stored_month = str(self.db.get_setting("ai.usage_month", "") or "")
            used = int(self.db.get_setting("ai.usage_tokens", 0) or 0) if stored_month == month else 0
            with self.db.write() as conn:
                conn.execute(
                    "INSERT INTO settings(key, value) VALUES ('ai.usage_month', ?) "
                    "ON CONFLICT(key) DO UPDATE SET value = excluded.value", (dumps(month),)
                )
                conn.execute(
                    "INSERT INTO settings(key, value) VALUES ('ai.usage_tokens', ?) "
                    "ON CONFLICT(key) DO UPDATE SET value = excluded.value", (dumps(used + tokens),)
                )
