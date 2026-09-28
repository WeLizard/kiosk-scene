from __future__ import annotations

import sqlite3
from typing import Any, Callable

from ..clock import Clock
from ..db import Database, dumps, loads
from ..errors import ConflictError, NotFoundError, ValidationError
from .context import Ctx

# Tables whose rows can be restored generically from an audit snapshot.
UNDOABLE_TABLES = {
    "item": "items",
    "location": "locations",
    "note": "notes",
    "task": "tasks",
    "reminder": "reminders",
    "contact": "contacts",
    "calendar_event": "calendar_events",
}


def row_to_dict(row: sqlite3.Row | None) -> dict[str, Any] | None:
    return None if row is None else {key: row[key] for key in row.keys()}


class AuditLog:
    """Append-only history of every change plus generic undo from before/after snapshots."""

    def __init__(self, db: Database, clock: Clock) -> None:
        self.db = db
        self.clock = clock
        self._after_undo: dict[str, Callable[[sqlite3.Connection, int], None]] = {}
        self._custom_undo: dict[str, Callable[[dict[str, Any]], None]] = {}

    def on_undo(self, entity_type: str, hook: Callable[[sqlite3.Connection, int], None]) -> None:
        """Services register a hook (e.g. reindex search) that runs after an entity is restored."""
        self._after_undo[entity_type] = hook

    def on_custom_undo(self, entity_type: str, handler: Callable[[dict[str, Any]], None]) -> None:
        """For changes with an external effect (e.g. an event created in a CalDAV calendar). The handler runs
        *outside* any DB transaction (it does network I/O) and receives the audit row's `after` snapshot."""
        self._custom_undo[entity_type] = handler

    def record(
        self,
        conn: sqlite3.Connection,
        ctx: Ctx,
        entity_type: str,
        entity_id: int | None,
        action: str,
        before: dict[str, Any] | None,
        after: dict[str, Any] | None,
        summary: str,
        *,
        undoable: bool = True,
    ) -> int:
        cursor = conn.execute(
            """INSERT INTO audit_log(ts, actor, source, entity_type, entity_id, action, before, after, summary,
                                     command_id, undoable) VALUES (?,?,?,?,?,?,?,?,?,?,?)""",
            (
                self.clock.now_iso(), ctx.actor, ctx.source, entity_type, entity_id, action,
                dumps(before) if before is not None else None,
                dumps(after) if after is not None else None,
                summary, ctx.command_id, 1 if undoable else 0,
            ),
        )
        audit_id = int(cursor.lastrowid or 0)
        self.db.emit(conn, "audit.created", {"id": audit_id, "entity": entity_type, "entity_id": entity_id})
        return audit_id

    def list(self, *, entity_type: str | None = None, entity_id: int | None = None, limit: int = 100,
             before_id: int | None = None) -> list[dict[str, Any]]:
        clauses, params = [], []
        if entity_type:
            clauses.append("entity_type = ?")
            params.append(entity_type)
        if entity_id is not None:
            clauses.append("entity_id = ?")
            params.append(entity_id)
        if before_id:
            clauses.append("id < ?")
            params.append(before_id)
        where = f"WHERE {' AND '.join(clauses)}" if clauses else ""
        with self.db.read() as conn:
            rows = conn.execute(
                f"SELECT * FROM audit_log {where} ORDER BY id DESC LIMIT ?", (*params, max(1, min(limit, 500)))
            ).fetchall()
        return [self._public(r) for r in rows]

    def get(self, audit_id: int) -> dict[str, Any]:
        with self.db.read() as conn:
            row = conn.execute("SELECT * FROM audit_log WHERE id = ?", (audit_id,)).fetchone()
        if row is None:
            raise NotFoundError("Audit record not found")
        return self._public(row)

    @staticmethod
    def _public(row: sqlite3.Row) -> dict[str, Any]:
        data = {key: row[key] for key in row.keys()}
        data["before"] = loads(data["before"])
        data["after"] = loads(data["after"])
        data["undoable"] = bool(data["undoable"]) and data["undone_by"] is None and data["action"] != "undo"
        return data

    # ---- undo --------------------------------------------------------------------------------

    def undo(self, audit_id: int, ctx: Ctx, *, force: bool = False) -> dict[str, Any]:
        with self.db.read() as conn:
            peek = conn.execute("SELECT * FROM audit_log WHERE id = ?", (audit_id,)).fetchone()
        if peek is not None and peek["entity_type"] in self._custom_undo:
            self._undo_custom(peek, ctx)
            return self.get(audit_id)
        with self.db.write() as conn:
            row = conn.execute("SELECT * FROM audit_log WHERE id = ?", (audit_id,)).fetchone()
            if row is None:
                raise NotFoundError("Audit record not found")
            self._undo_row(conn, row, ctx, force=force)
        return self.get(audit_id)

    def undo_command(self, command_id: int, ctx: Ctx, *, force: bool = False) -> int:
        """Undo every undoable change made by one command, newest first. Returns how many were undone."""
        with self.db.read() as conn:
            rows = conn.execute(
                "SELECT * FROM audit_log WHERE command_id = ? AND undone_by IS NULL AND action != 'undo' ORDER BY id DESC",
                (command_id,),
            ).fetchall()
        if not rows:
            raise NotFoundError("Nothing to undo for this command")
        count = 0
        # External effects first and outside the transaction; then all local rows atomically.
        for row in rows:
            if row["undoable"] and row["entity_type"] in self._custom_undo:
                self._undo_custom(row, ctx)
                count += 1
        with self.db.write() as conn:
            for row in rows:
                if not row["undoable"] or row["entity_type"] in self._custom_undo:
                    continue
                fresh = conn.execute("SELECT * FROM audit_log WHERE id = ?", (row["id"],)).fetchone()
                self._undo_row(conn, fresh, ctx, force=force)
                count += 1
        return count

    def _undo_custom(self, row: sqlite3.Row, ctx: Ctx) -> None:
        if row["undone_by"] is not None:
            raise ConflictError("Already undone")
        if not row["undoable"]:
            raise ValidationError("This change cannot be undone", code="not_undoable")
        self._custom_undo[row["entity_type"]](loads(row["after"], {}) or {})
        with self.db.write() as conn:
            undo_id = self.record(conn, ctx, row["entity_type"], row["entity_id"], "undo", loads(row["after"]), None,
                                  f"Отмена: {row['summary']}", undoable=False)
            conn.execute("UPDATE audit_log SET undone_by = ? WHERE id = ?", (undo_id, row["id"]))

    def last_undoable_command(self) -> int | None:
        with self.db.read() as conn:
            row = conn.execute(
                "SELECT command_id FROM audit_log WHERE command_id IS NOT NULL AND undone_by IS NULL AND undoable = 1 "
                "AND action != 'undo' ORDER BY id DESC LIMIT 1"
            ).fetchone()
        return int(row["command_id"]) if row else None

    def _undo_row(self, conn: sqlite3.Connection, row: sqlite3.Row, ctx: Ctx, *, force: bool) -> None:
        if row["undone_by"] is not None:
            raise ConflictError("Already undone")
        if not row["undoable"]:
            raise ValidationError("This change cannot be undone (it had external effects)", code="not_undoable")
        table = UNDOABLE_TABLES.get(row["entity_type"])
        if table is None or row["entity_id"] is None:
            raise ValidationError("This change cannot be undone", code="not_undoable")
        before, after = loads(row["before"]), loads(row["after"])
        entity_id = int(row["entity_id"])
        current = row_to_dict(conn.execute(f"SELECT * FROM {table} WHERE id = ?", (entity_id,)).fetchone())
        if not force and after is not None and current is not None and _comparable(current) != _comparable(after):
            raise ConflictError(
                "It was changed again after this action; undo the newer change first", code="changed_since"
            )
        if row["action"] == "create":
            restored = dict(after or current or {})
            restored["deleted_at"] = self.clock.now_iso()
            self._restore(conn, table, entity_id, restored)
            new_action = "delete"
        else:
            if before is None:
                raise ValidationError("Nothing to restore", code="not_undoable")
            self._restore(conn, table, entity_id, before)
            new_action = "restore"
        new_row = row_to_dict(conn.execute(f"SELECT * FROM {table} WHERE id = ?", (entity_id,)).fetchone())
        undo_id = self.record(
            conn, ctx, row["entity_type"], entity_id, "undo", current, new_row, f"Отмена: {row['summary']}", undoable=False
        )
        conn.execute("UPDATE audit_log SET undone_by = ? WHERE id = ?", (undo_id, row["id"]))
        hook = self._after_undo.get(row["entity_type"])
        if hook:
            hook(conn, entity_id)
        self.db.emit(conn, f"{row['entity_type']}s.changed", {"id": entity_id, "action": new_action})

    @staticmethod
    def _restore(conn: sqlite3.Connection, table: str, entity_id: int, snapshot: dict[str, Any]) -> None:
        columns = [c for c in snapshot if c != "id"]
        exists = conn.execute(f"SELECT 1 FROM {table} WHERE id = ?", (entity_id,)).fetchone()
        if exists:
            assignments = ", ".join(f"{c} = ?" for c in columns)
            conn.execute(f"UPDATE {table} SET {assignments} WHERE id = ?", (*[snapshot[c] for c in columns], entity_id))
        else:
            names = ", ".join(["id", *columns])
            marks = ", ".join("?" for _ in range(len(columns) + 1))
            conn.execute(f"INSERT INTO {table}({names}) VALUES ({marks})", (entity_id, *[snapshot[c] for c in columns]))


def _comparable(snapshot: dict[str, Any]) -> dict[str, Any]:
    """Ignore bookkeeping columns that legitimately drift (timestamps of unrelated touches)."""
    return {k: v for k, v in snapshot.items() if k not in ("updated_at", "last_used_at")}
