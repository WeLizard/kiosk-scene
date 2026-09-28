from __future__ import annotations

import datetime as dt
import sqlite3
from typing import Any

from ..clock import Clock, from_iso
from ..db import Database, dumps, loads
from ..errors import NotFoundError, ValidationError
from .audit import row_to_dict

SESSION_TTL = dt.timedelta(minutes=30)
STATUSES = ("applied", "clarify", "review", "rejected", "failed", "answered", "partial")


class CommandLog:
    """Every natural-language command with what was understood, what was done, and what was said back."""

    def __init__(self, db: Database, clock: Clock) -> None:
        self.db, self.clock = db, clock

    def start(self, *, text: str, frontend: str, session_id: str | None) -> int:
        with self.db.write() as conn:
            cursor = conn.execute(
                "INSERT INTO commands(ts, frontend, session_id, text, status) VALUES (?,?,?,?, 'failed')",
                (self.clock.now_iso(), frontend, session_id, text[:2000]),
            )
            return int(cursor.lastrowid or 0)

    def finish(self, command_id: int, *, status: str, interpreter: str | None, intents: Any, confidence: float | None,
               reply: str, result: Any = None, error: str | None = None) -> None:
        with self.db.write() as conn:
            conn.execute(
                "UPDATE commands SET status = ?, interpreter = ?, intents = ?, confidence = ?, reply = ?, result = ?, error = ? WHERE id = ?",
                (status, interpreter, dumps(intents) if intents is not None else None, confidence, reply[:2000],
                 dumps(result) if result is not None else None, error, command_id),
            )
            self.db.emit(conn, "commands.changed", {"id": command_id, "status": status})

    def get(self, command_id: int) -> dict[str, Any]:
        with self.db.read() as conn:
            row = conn.execute("SELECT * FROM commands WHERE id = ?", (command_id,)).fetchone()
        if row is None:
            raise NotFoundError("Command not found")
        return self._public(row)

    def list(self, limit: int = 50, before_id: int | None = None) -> list[dict[str, Any]]:
        with self.db.read() as conn:
            if before_id:
                rows = conn.execute("SELECT * FROM commands WHERE id < ? ORDER BY id DESC LIMIT ?", (before_id, limit)).fetchall()
            else:
                rows = conn.execute("SELECT * FROM commands ORDER BY id DESC LIMIT ?", (limit,)).fetchall()
        return [self._public(r) for r in rows]

    @staticmethod
    def _public(row: sqlite3.Row) -> dict[str, Any]:
        data = row_to_dict(row) or {}
        for key in ("intents", "result"):
            data[key] = loads(data.get(key), None)
        return data


class SessionStore:
    """Short-term conversational memory: last referenced entities and a pending clarification."""

    def __init__(self, db: Database, clock: Clock) -> None:
        self.db, self.clock = db, clock

    def get(self, session_id: str | None) -> dict[str, Any]:
        if not session_id:
            return {}
        with self.db.read() as conn:
            row = conn.execute("SELECT * FROM sessions WHERE id = ?", (session_id,)).fetchone()
        if row is None:
            return {}
        if self.clock.now() - from_iso(row["updated_at"]) > SESSION_TTL:
            return {}
        return loads(row["context"], {}) or {}

    def save(self, session_id: str | None, context: dict[str, Any]) -> None:
        if not session_id:
            return
        with self.db.write() as conn:
            conn.execute(
                "INSERT INTO sessions(id, updated_at, context) VALUES (?,?,?) ON CONFLICT(id) DO UPDATE SET updated_at = excluded.updated_at, context = excluded.context",
                (session_id[:120], self.clock.now_iso(), dumps(context)),
            )
            # Housekeeping: forget sessions untouched for a day.
            conn.execute("DELETE FROM sessions WHERE updated_at < ?", ((self.clock.now() - dt.timedelta(days=1)).strftime("%Y-%m-%dT%H:%M:%SZ"),))


class ReviewQueue:
    """Proposals the assistant was not confident enough to apply silently."""

    def __init__(self, db: Database, clock: Clock) -> None:
        self.db, self.clock = db, clock

    def add(self, *, command_id: int | None, proposal: Any, reason: str, confidence: float | None) -> int:
        with self.db.write() as conn:
            cursor = conn.execute(
                "INSERT INTO review_queue(command_id, ts, proposal, reason, confidence) VALUES (?,?,?,?,?)",
                (command_id, self.clock.now_iso(), dumps(proposal), reason[:500], confidence),
            )
            review_id = int(cursor.lastrowid or 0)
            self.db.emit(conn, "review.changed", {"id": review_id, "status": "pending"})
        return review_id

    def get(self, review_id: int) -> dict[str, Any]:
        with self.db.read() as conn:
            row = conn.execute("SELECT * FROM review_queue WHERE id = ?", (review_id,)).fetchone()
        if row is None:
            raise NotFoundError("Review item not found")
        return self._public(row)

    def list(self, status: str = "pending", limit: int = 100) -> list[dict[str, Any]]:
        with self.db.read() as conn:
            rows = conn.execute(
                "SELECT r.*, c.text AS command_text FROM review_queue r LEFT JOIN commands c ON c.id = r.command_id "
                "WHERE r.status = ? ORDER BY r.id DESC LIMIT ?", (status, limit)
            ).fetchall()
        return [self._public(r) for r in rows]

    def pending_count(self) -> int:
        with self.db.read() as conn:
            return int(conn.execute("SELECT COUNT(*) FROM review_queue WHERE status = 'pending'").fetchone()[0])

    def resolve(self, review_id: int, status: str, resolution: str = "") -> dict[str, Any]:
        if status not in ("approved", "rejected"):
            raise ValidationError("Invalid status")
        with self.db.write() as conn:
            row = conn.execute("SELECT * FROM review_queue WHERE id = ?", (review_id,)).fetchone()
            if row is None:
                raise NotFoundError("Review item not found")
            if row["status"] != "pending":
                raise ValidationError("Already resolved", code="already_resolved")
            conn.execute("UPDATE review_queue SET status = ?, resolved_at = ?, resolution = ? WHERE id = ?",
                         (status, self.clock.now_iso(), resolution[:500], review_id))
            self.db.emit(conn, "review.changed", {"id": review_id, "status": status})
        return self.get(review_id)

    def update_proposal(self, review_id: int, proposal: Any) -> None:
        with self.db.write() as conn:
            conn.execute("UPDATE review_queue SET proposal = ? WHERE id = ? AND status = 'pending'", (dumps(proposal), review_id))
            self.db.emit(conn, "review.changed", {"id": review_id, "status": "pending"})

    @staticmethod
    def _public(row: sqlite3.Row) -> dict[str, Any]:
        data = row_to_dict(row) or {}
        data["proposal"] = loads(data.get("proposal"), [])
        return data
