from __future__ import annotations

import datetime as dt
import sqlite3
from typing import Any, Protocol

from ..clock import Clock, from_iso, to_iso
from ..db import Database, dumps, loads
from ..errors import NotFoundError, ProviderError, ValidationError
from .audit import row_to_dict
from .context import Ctx

BACKOFF_SECONDS = [30, 120, 600, 3600, 6 * 3600]
MAX_ATTEMPTS = len(BACKOFF_SECONDS) + 1


class Sender(Protocol):
    channel: str

    def send(self, address: str, text: str) -> str: ...


class OutboxService:
    """Durable, retrying delivery queue for everything that leaves the house (Telegram, speakers, HA notify).

    A message is written to the database *before* any network call, so a crash, restart or provider outage
    never loses it. Delivery is at-least-once: if the process dies between the provider accepting a message
    and us recording it, that one message may be sent again after restart.
    """

    def __init__(self, db: Database, clock: Clock, settings: Any) -> None:
        self.db, self.clock, self.settings = db, clock, settings
        self.senders: dict[str, Sender] = {}

    def register(self, sender: Sender) -> None:
        self.senders[sender.channel] = sender

    # ---- enqueue -------------------------------------------------------------------------------

    def enqueue(self, ctx: Ctx, *, channel: str, recipient: str, address: str, text: str, key: str | None = None,
                not_before: dt.datetime | None = None) -> dict[str, Any]:
        text = (text or "").strip()
        if not text:
            raise ValidationError("Message text is empty", fields={"text": "Required"})
        now = self.clock.now_iso()
        with self.db.write() as conn:
            if key:
                existing = conn.execute("SELECT * FROM outbox WHERE idempotency_key = ?", (key,)).fetchone()
                if existing is not None:
                    return self._public(existing)
            cursor = conn.execute(
                """INSERT INTO outbox(channel, recipient, address, text, status, next_attempt_at, idempotency_key, command_id, created_at)
                   VALUES (?,?,?,?, 'queued', ?, ?, ?, ?)""",
                (channel, recipient, address, text[:8000], to_iso(not_before) if not_before else now, key, ctx.command_id, now),
            )
            outbox_id = int(cursor.lastrowid or 0)
            self.db.emit(conn, "outbox.changed", {"id": outbox_id, "status": "queued"})
            row = conn.execute("SELECT * FROM outbox WHERE id = ?", (outbox_id,)).fetchone()
        return self._public(row)

    # ---- processing ----------------------------------------------------------------------------

    def recover(self) -> int:
        """After a crash: messages stuck in `sending` go back to `queued`."""
        with self.db.write() as conn:
            cursor = conn.execute("UPDATE outbox SET status = 'queued' WHERE status = 'sending'")
            if cursor.rowcount:
                self.db.emit(conn, "outbox.changed", {"recovered": cursor.rowcount})
            return int(cursor.rowcount)

    def process_due(self, limit: int = 20) -> int:
        with self.db.read() as conn:
            rows = conn.execute(
                "SELECT id FROM outbox WHERE status = 'queued' AND next_attempt_at <= ? ORDER BY id LIMIT ?",
                (self.clock.now_iso(), limit),
            ).fetchall()
        handled = 0
        for row in rows:
            handled += 1 if self._deliver(int(row["id"])) else 0
        return handled

    def deliver_now(self, outbox_id: int) -> dict[str, Any]:
        """Try one message immediately (used right after enqueue so replies can state the real outcome)."""
        self._deliver(outbox_id)
        with self.db.read() as conn:
            row = conn.execute("SELECT * FROM outbox WHERE id = ?", (outbox_id,)).fetchone()
        return self._public(row) if row else {}

    def _deliver(self, outbox_id: int) -> bool:
        with self.db.write() as conn:
            claimed = conn.execute(
                "UPDATE outbox SET status = 'sending', attempts = attempts + 1 WHERE id = ? AND status = 'queued'", (outbox_id,)
            ).rowcount
            row = conn.execute("SELECT * FROM outbox WHERE id = ?", (outbox_id,)).fetchone()
        if not claimed or row is None:
            return False
        sender = self.senders.get(row["channel"])
        try:
            if sender is None:
                raise ProviderError(f"No sender for channel {row['channel']}", code="no_sender", retryable=False, provider=row["channel"])
            message_id = sender.send(row["address"], row["text"])
        except ProviderError as exc:
            self._on_failure(row, exc)
            return True
        except Exception as exc:  # a buggy adapter must not kill the worker or lose the message
            self._on_failure(row, ProviderError(f"Unexpected adapter failure: {exc}", code="adapter_crash", retryable=True, provider=row["channel"]))
            return True
        with self.db.write() as conn:
            conn.execute(
                "UPDATE outbox SET status = 'sent', sent_at = ?, provider_message_id = ?, last_error = NULL WHERE id = ?",
                (self.clock.now_iso(), message_id, outbox_id),
            )
            self.db.emit(conn, "outbox.changed", {"id": outbox_id, "status": "sent"})
        return True

    def _on_failure(self, row: sqlite3.Row, error: ProviderError) -> None:
        attempts = int(row["attempts"])
        final = (not error.retryable) or attempts >= MAX_ATTEMPTS
        with self.db.write() as conn:
            if final:
                conn.execute("UPDATE outbox SET status = 'failed', last_error = ? WHERE id = ?", (error.message[:500], row["id"]))
            else:
                delay = BACKOFF_SECONDS[min(attempts - 1, len(BACKOFF_SECONDS) - 1)]
                conn.execute(
                    "UPDATE outbox SET status = 'queued', last_error = ?, next_attempt_at = ? WHERE id = ?",
                    (error.message[:500], to_iso(self.clock.now() + dt.timedelta(seconds=delay)), row["id"]),
                )
            self.db.emit(conn, "outbox.changed", {"id": row["id"], "status": "failed" if final else "queued"})
        if final:
            self._fallback(row)

    def _fallback(self, row: sqlite3.Row) -> None:
        """A speaker that never answers should not swallow a reminder: fall back to Telegram/UI once."""
        if row["channel"] != "speak":
            return
        fallback = self.settings.get("speak").get("fallback")
        if fallback in (None, "", "none", "speak"):
            return
        key = f"{row['idempotency_key'] or row['id']}:fallback"
        if fallback == "ui":
            with self.db.write() as conn:
                self.db.emit(conn, "notification", {"text": row["text"], "source": "speak-fallback"})
            return
        try:
            self.enqueue(Ctx(actor="system", source="outbox", command_id=row["command_id"]), channel=fallback,
                         recipient=row["recipient"], address=self._fallback_address(row, fallback), text=row["text"], key=key)
        except ValidationError:
            pass

    def _fallback_address(self, row: sqlite3.Row, channel: str) -> str:
        with self.db.read() as conn:
            contact = conn.execute("SELECT channels FROM contacts WHERE is_self = 1 AND deleted_at IS NULL").fetchone()
        channels = loads(contact["channels"], {}) if contact else {}
        value = channels.get(channel) or {}
        return str(value.get("chat_id") or value.get("service") or "") if isinstance(value, dict) else str(value)

    # ---- management ----------------------------------------------------------------------------

    def list(self, *, status: str | None = None, limit: int = 100) -> list[dict[str, Any]]:
        with self.db.read() as conn:
            if status:
                rows = conn.execute("SELECT * FROM outbox WHERE status = ? ORDER BY id DESC LIMIT ?", (status, limit)).fetchall()
            else:
                rows = conn.execute("SELECT * FROM outbox ORDER BY id DESC LIMIT ?", (limit,)).fetchall()
        return [self._public(r) for r in rows]

    def retry(self, outbox_id: int) -> dict[str, Any]:
        with self.db.write() as conn:
            row = conn.execute("SELECT * FROM outbox WHERE id = ?", (outbox_id,)).fetchone()
            if row is None:
                raise NotFoundError("Message not found")
            if row["status"] not in ("failed", "cancelled"):
                raise ValidationError("Only failed messages can be retried", code="not_retryable")
            conn.execute("UPDATE outbox SET status = 'queued', attempts = 0, next_attempt_at = ?, last_error = NULL WHERE id = ?",
                         (self.clock.now_iso(), outbox_id))
            self.db.emit(conn, "outbox.changed", {"id": outbox_id, "status": "queued"})
            row = conn.execute("SELECT * FROM outbox WHERE id = ?", (outbox_id,)).fetchone()
        return self._public(row)

    def cancel(self, outbox_id: int) -> dict[str, Any]:
        with self.db.write() as conn:
            row = conn.execute("SELECT * FROM outbox WHERE id = ?", (outbox_id,)).fetchone()
            if row is None:
                raise NotFoundError("Message not found")
            if row["status"] not in ("queued", "failed"):
                raise ValidationError("Only queued or failed messages can be cancelled", code="not_cancellable")
            conn.execute("UPDATE outbox SET status = 'cancelled' WHERE id = ?", (outbox_id,))
            self.db.emit(conn, "outbox.changed", {"id": outbox_id, "status": "cancelled"})
            row = conn.execute("SELECT * FROM outbox WHERE id = ?", (outbox_id,)).fetchone()
        return self._public(row)

    def counts(self) -> dict[str, int]:
        with self.db.read() as conn:
            return {r["status"]: r["n"] for r in conn.execute("SELECT status, COUNT(*) n FROM outbox GROUP BY status")}

    @staticmethod
    def _public(row: sqlite3.Row) -> dict[str, Any]:
        data = row_to_dict(row) or {}
        data.pop("idempotency_key", None)
        return data
