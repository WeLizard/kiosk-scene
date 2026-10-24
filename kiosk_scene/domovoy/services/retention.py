from __future__ import annotations

import datetime as dt
from typing import Any, Callable

from ..clock import Clock
from ..db import Database


class RetentionService:
    """Deletes old operational history without touching anything still actionable.

    Commands referenced by a pending/applying review stay, as do queued/sending outbox rows and
    `processing` Telegram updates. Audit rows are ordinary history and are pruned by age.
    """

    def __init__(self, db: Database, clock: Clock, config: Callable[[], dict[str, Any]]) -> None:
        self.db = db
        self.clock = clock
        self._config = config

    def prune(self) -> dict[str, int]:
        config = self._config() or {}
        now = self.clock.now()

        def cutoff(name: str, default_days: int) -> str:
            try:
                days = max(1, int(config.get(name, default_days)))
            except (TypeError, ValueError):
                days = default_days
            return (now - dt.timedelta(days=days)).isoformat()

        counts: dict[str, int] = {}
        with self.db.write() as conn:
            counts["review"] = conn.execute(
                "DELETE FROM review_queue WHERE status IN ('approved', 'rejected') AND ts < ?",
                (cutoff("review_days", 90),),
            ).rowcount
            counts["commands"] = conn.execute(
                """DELETE FROM commands WHERE ts < ? AND id NOT IN (
                       SELECT command_id FROM review_queue
                       WHERE command_id IS NOT NULL AND status IN ('pending', 'applying')
                   )""",
                (cutoff("commands_days", 90),),
            ).rowcount
            counts["audit"] = conn.execute(
                "DELETE FROM audit_log WHERE ts < ?",
                (cutoff("audit_days", 365),),
            ).rowcount
            counts["outbox"] = conn.execute(
                "DELETE FROM outbox WHERE created_at < ? AND status IN ('sent', 'failed')",
                (cutoff("outbox_days", 30),),
            ).rowcount
            counts["telegram"] = conn.execute(
                "DELETE FROM telegram_updates WHERE created_at < ? AND status != 'processing'",
                (cutoff("telegram_updates_days", 30),),
            ).rowcount
        return counts
