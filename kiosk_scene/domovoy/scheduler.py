from __future__ import annotations

import datetime as dt
import logging
import threading
import time
from typing import Any, Callable

from .errors import DomovoyError
from .services.context import Ctx

LOG = logging.getLogger("domovoy.scheduler")


class Scheduler:
    """Background worker. Every job is isolated: an exception in one (a dead Telegram, a slow HA) is logged and
    recorded in the integration's health, and the loop carries on. All state lives in the database, so a
    restart resumes exactly where it stopped (overdue reminders fire once, `sending` messages are re-queued)."""

    def __init__(self, app: Any, interval: float | None = None) -> None:
        self.app = app
        self.interval = interval if interval is not None else app.env.scheduler_interval_s
        self._stop = threading.Event()
        self._thread: threading.Thread | None = None
        self._last_housekeeping = 0.0
        self._last_backup_day: str = ""
        self._last_telegram = 0.0
        self.last_activity_at = 0.0     # set by the API on every command; embedding backfill waits for quiet

    # ---- lifecycle -----------------------------------------------------------------------------

    def start(self) -> None:
        recovered = self.app.outbox.recover()
        if recovered:
            LOG.info("Recovered %s message(s) that were mid-send at shutdown", recovered)
        self._thread = threading.Thread(target=self._loop, name="domovoy-scheduler", daemon=True)
        self._thread.start()

    def stop(self) -> None:
        self._stop.set()
        if self._thread:
            self._thread.join(timeout=5)

    def _loop(self) -> None:
        while not self._stop.is_set():
            self.tick()
            self._stop.wait(self.interval)

    # ---- one pass ------------------------------------------------------------------------------

    def tick(self) -> dict[str, Any]:
        report: dict[str, Any] = {}
        for name, job in (
            ("reminders", self._job_reminders), ("triggers", self._job_triggers), ("outbox", self._job_outbox),
            ("telegram", self._job_telegram), ("embeddings", self._job_embeddings), ("housekeeping", self._job_housekeeping),
        ):
            try:
                report[name] = job()
            except Exception as exc:  # noqa: BLE001 - see class docstring
                LOG.warning("Scheduler job %s failed: %s", name, exc)
                report[name] = f"error: {exc}"
        return report

    def _job_reminders(self) -> int:
        fired = 0
        for reminder in self.app.reminders.due_time_reminders():
            try:
                self.app.reminders.fire(reminder)
                fired += 1
            except DomovoyError as exc:
                LOG.warning("Reminder %s could not fire: %s", reminder["id"], exc.message)
        return fired

    def _job_triggers(self) -> int:
        if not self.app.reminders.armed_context_reminders():
            return 0
        if not self.app.ha.configured():
            return 0
        try:
            return len(self.app.triggers.run_once())
        except DomovoyError as exc:  # HA unreachable: health already updated; try again next tick
            LOG.info("Trigger evaluation skipped: %s", exc.message)
            return 0

    def _job_outbox(self) -> int:
        return self.app.outbox.process_due()

    def _job_telegram(self) -> int:
        if not self.app.telegram.configured() or time.monotonic() - self._last_telegram < 15:
            return 0
        self._last_telegram = time.monotonic()
        offset = self.app.db.get_setting("telegram.offset", None)
        updates = self.app.telegram.get_updates(offset, timeout=0)
        if not updates:
            return 0
        links = list(self.app.db.get_setting("telegram.link_requests", []) or [])
        known_ids = {str((c["channels"].get("telegram") or {}).get("chat_id", "")) for c in self.app.contacts.list()}
        for update in updates:
            message = update.get("message") or {}
            chat = message.get("chat") or {}
            chat_id = str(chat.get("id", ""))
            if chat_id and chat_id not in known_ids and not any(l["chat_id"] == chat_id for l in links):
                links.append({
                    "chat_id": chat_id, "name": " ".join(filter(None, [chat.get("first_name"), chat.get("last_name")])) or chat.get("username", ""),
                    "username": chat.get("username", ""), "at": self.app.clock.now_iso(),
                })
        self.app.db.set_setting("telegram.link_requests", links[-20:])
        self.app.db.set_setting("telegram.offset", int(updates[-1]["update_id"]) + 1)
        with self.app.db.write() as conn:
            self.app.db.emit(conn, "contacts.changed", {"link_requests": len(links)})
        return len(updates)

    def _job_embeddings(self) -> int:
        if time.monotonic() - self.last_activity_at < 10:
            return 0     # a person is talking to it; do not compete for the CPU
        return self.app.search.backfill_model_embeddings(limit=8)

    def _job_housekeeping(self) -> str:
        now = time.monotonic()
        if now - self._last_housekeeping < 3600:
            return "skipped"
        self._last_housekeeping = now
        self.app.db.trim_change_log()
        today = self.app.clock.local_now().strftime("%Y-%m-%d")
        if today != self._last_backup_day and self.app.clock.local_now().hour >= 3:
            from .backup import create_backup

            create_backup(self.app)
            self._last_backup_day = today
            return "backup"
        return "ok"
