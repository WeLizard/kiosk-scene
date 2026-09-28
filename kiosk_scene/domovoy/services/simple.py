from __future__ import annotations

import sqlite3
from typing import Any, Callable

from ..clock import Clock
from ..db import Database, dumps, loads
from ..errors import NotFoundError, ValidationError
from ..text import clean_phrase, norm_key
from .audit import AuditLog, row_to_dict
from .context import Ctx
from .search import SearchService

TASK_LISTS = ("tasks", "shopping", "chores")


class NoteService:
    """Free-form memories that are not a physical item ("код домофона 4512", "Ирина любит зелёный чай")."""

    def __init__(self, db: Database, clock: Clock, audit: AuditLog, search: SearchService) -> None:
        self.db, self.clock, self.audit, self.search = db, clock, audit, search
        search.register("note", self._doc)
        audit.on_undo("note", lambda conn, id_: self.search.reindex(conn, "note", id_))

    def get(self, note_id: int) -> dict[str, Any]:
        with self.db.read() as conn:
            row = conn.execute("SELECT * FROM notes WHERE id = ? AND deleted_at IS NULL", (note_id,)).fetchone()
        if row is None:
            raise NotFoundError("Note not found")
        return self._public(row)

    def list(self, *, q: str = "", limit: int = 200) -> list[dict[str, Any]]:
        with self.db.read() as conn:
            if q:
                like = f"%{q.lower()}%"
                rows = conn.execute(
                    "SELECT * FROM notes WHERE deleted_at IS NULL AND (lower(body) LIKE ? OR lower(title) LIKE ?) ORDER BY updated_at DESC LIMIT ?",
                    (like, like, limit),
                ).fetchall()
            else:
                rows = conn.execute("SELECT * FROM notes WHERE deleted_at IS NULL ORDER BY updated_at DESC LIMIT ?", (limit,)).fetchall()
        return [self._public(r) for r in rows]

    def create(self, ctx: Ctx, *, body: str, title: str = "", tags: list[str] | None = None) -> dict[str, Any]:
        body = str(body or "").strip()
        if not body:
            raise ValidationError("Text is required", fields={"body": "Required"})
        if len(body) > 8000:
            raise ValidationError("Text is too long", fields={"body": "Max 8000 characters"})
        now = self.clock.now_iso()
        with self.db.write() as conn:
            cursor = conn.execute(
                "INSERT INTO notes(title, body, tags, source, created_at, updated_at) VALUES (?,?,?,?,?,?)",
                (clean_phrase(title)[:200], body, dumps(self._tags(tags)), ctx.source, now, now),
            )
            note_id = int(cursor.lastrowid or 0)
            after = row_to_dict(conn.execute("SELECT * FROM notes WHERE id = ?", (note_id,)).fetchone())
            self.audit.record(conn, ctx, "note", note_id, "create", None, after, f"Заметка: {body[:60]}")
            self.search.reindex(conn, "note", note_id)
            self.db.emit(conn, "notes.changed", {"id": note_id})
        return self.get(note_id)

    def update(self, ctx: Ctx, note_id: int, patch: dict[str, Any]) -> dict[str, Any]:
        with self.db.write() as conn:
            row = conn.execute("SELECT * FROM notes WHERE id = ? AND deleted_at IS NULL", (note_id,)).fetchone()
            if row is None:
                raise NotFoundError("Note not found")
            before = row_to_dict(row)
            values: dict[str, Any] = {}
            if "body" in patch:
                body = str(patch["body"] or "").strip()
                if not body:
                    raise ValidationError("Text is required", fields={"body": "Required"})
                values["body"] = body[:8000]
            if "title" in patch:
                values["title"] = clean_phrase(str(patch["title"] or ""))[:200]
            if "tags" in patch:
                values["tags"] = dumps(self._tags(patch["tags"]))
            if not values:
                return self._public(row)
            values["updated_at"] = self.clock.now_iso()
            conn.execute(f"UPDATE notes SET {', '.join(f'{k} = ?' for k in values)} WHERE id = ?", (*values.values(), note_id))
            after = row_to_dict(conn.execute("SELECT * FROM notes WHERE id = ?", (note_id,)).fetchone())
            self.audit.record(conn, ctx, "note", note_id, "update", before, after, "Заметка изменена")
            self.search.reindex(conn, "note", note_id)
            self.db.emit(conn, "notes.changed", {"id": note_id})
        return self.get(note_id)

    def delete(self, ctx: Ctx, note_id: int) -> None:
        with self.db.write() as conn:
            row = conn.execute("SELECT * FROM notes WHERE id = ? AND deleted_at IS NULL", (note_id,)).fetchone()
            if row is None:
                raise NotFoundError("Note not found")
            now = self.clock.now_iso()
            before = row_to_dict(row)
            conn.execute("UPDATE notes SET deleted_at = ?, updated_at = ? WHERE id = ?", (now, now, note_id))
            after = row_to_dict(conn.execute("SELECT * FROM notes WHERE id = ?", (note_id,)).fetchone())
            self.audit.record(conn, ctx, "note", note_id, "delete", before, after, "Заметка удалена")
            self.search.reindex(conn, "note", note_id)
            self.db.emit(conn, "notes.changed", {"id": note_id})

    @staticmethod
    def _tags(tags: Any) -> list[str]:
        if not tags:
            return []
        if not isinstance(tags, (list, tuple)):
            raise ValidationError("Tags must be a list", fields={"tags": "Invalid"})
        return [clean_phrase(str(t))[:40] for t in tags if clean_phrase(str(t))][:20]

    def _doc(self, conn: sqlite3.Connection, note_id: int) -> tuple[str, str] | None:
        row = conn.execute("SELECT * FROM notes WHERE id = ?", (note_id,)).fetchone()
        if row is None or row["deleted_at"]:
            return None
        return (row["title"] or row["body"][:80]), f"{row['body']} {' '.join(loads(row['tags'], []))}"

    @staticmethod
    def _public(row: sqlite3.Row) -> dict[str, Any]:
        data = row_to_dict(row) or {}
        data["tags"] = loads(data.get("tags"), [])
        return data


class TaskService:
    """Tasks, shopping list and recurring chores share one table, separated by `list`."""

    def __init__(self, db: Database, clock: Clock, audit: AuditLog, search: SearchService) -> None:
        self.db, self.clock, self.audit, self.search = db, clock, audit, search
        search.register("task", self._doc)
        audit.on_undo("task", lambda conn, id_: self.search.reindex(conn, "task", id_))

    def get(self, task_id: int) -> dict[str, Any]:
        with self.db.read() as conn:
            row = conn.execute("SELECT * FROM tasks WHERE id = ? AND deleted_at IS NULL", (task_id,)).fetchone()
        if row is None:
            raise NotFoundError("Task not found")
        return self._public(row)

    def list(self, *, list_name: str | None = None, include_done: bool = False, limit: int = 500) -> list[dict[str, Any]]:
        clauses, params = ["deleted_at IS NULL"], []
        if list_name:
            clauses.append("list = ?")
            params.append(list_name)
        if not include_done:
            clauses.append("done_at IS NULL")
        with self.db.read() as conn:
            rows = conn.execute(
                f"SELECT * FROM tasks WHERE {' AND '.join(clauses)} ORDER BY done_at IS NOT NULL, due_date IS NULL, due_date, id DESC LIMIT ?",
                (*params, limit),
            ).fetchall()
        return [self._public(r) for r in rows]

    def create(self, ctx: Ctx, *, title: str, list_name: str = "tasks", due_date: str | None = None, notes: str = "",
               recurrence: dict[str, Any] | None = None, dedupe: bool = True) -> tuple[dict[str, Any], bool]:
        """Returns `(task, created)`; an open task with the same title in the same list is reused."""
        title = clean_phrase(title)
        if not title:
            raise ValidationError("Title is required", fields={"title": "Required"})
        if list_name not in TASK_LISTS:
            raise ValidationError("Unknown list", fields={"list": f"One of {', '.join(TASK_LISTS)}"})
        if due_date is not None and not _is_date(due_date):
            raise ValidationError("Due date must be YYYY-MM-DD", fields={"due_date": "Invalid date"})
        now = self.clock.now_iso()
        with self.db.write() as conn:
            if dedupe:
                for row in conn.execute("SELECT * FROM tasks WHERE list = ? AND done_at IS NULL AND deleted_at IS NULL", (list_name,)):
                    if norm_key(row["title"]) == norm_key(title):
                        return self._public(row), False
            cursor = conn.execute(
                "INSERT INTO tasks(title, list, notes, due_date, recurrence, source, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?)",
                (title[:300], list_name, notes[:4000], due_date, dumps(recurrence) if recurrence else None, ctx.source, now, now),
            )
            task_id = int(cursor.lastrowid or 0)
            after = row_to_dict(conn.execute("SELECT * FROM tasks WHERE id = ?", (task_id,)).fetchone())
            self.audit.record(conn, ctx, "task", task_id, "create", None, after, f"Задача ({list_name}): {title}")
            self.search.reindex(conn, "task", task_id)
            self.db.emit(conn, "tasks.changed", {"id": task_id})
        return self.get(task_id), True

    def update(self, ctx: Ctx, task_id: int, patch: dict[str, Any]) -> dict[str, Any]:
        with self.db.write() as conn:
            row = conn.execute("SELECT * FROM tasks WHERE id = ? AND deleted_at IS NULL", (task_id,)).fetchone()
            if row is None:
                raise NotFoundError("Task not found")
            before = row_to_dict(row)
            values: dict[str, Any] = {}
            if "title" in patch:
                title = clean_phrase(str(patch["title"]))
                if not title:
                    raise ValidationError("Title is required", fields={"title": "Required"})
                values["title"] = title[:300]
            if "list" in patch:
                if patch["list"] not in TASK_LISTS:
                    raise ValidationError("Unknown list", fields={"list": "Invalid"})
                values["list"] = patch["list"]
            if "notes" in patch:
                values["notes"] = str(patch["notes"] or "")[:4000]
            if "due_date" in patch:
                if patch["due_date"] and not _is_date(str(patch["due_date"])):
                    raise ValidationError("Due date must be YYYY-MM-DD", fields={"due_date": "Invalid date"})
                values["due_date"] = patch["due_date"] or None
            if "done" in patch:
                values["done_at"] = self.clock.now_iso() if patch["done"] else None
            if not values:
                return self._public(row)
            values["updated_at"] = self.clock.now_iso()
            conn.execute(f"UPDATE tasks SET {', '.join(f'{k} = ?' for k in values)} WHERE id = ?", (*values.values(), task_id))
            after = row_to_dict(conn.execute("SELECT * FROM tasks WHERE id = ?", (task_id,)).fetchone())
            action = "complete" if "done" in patch and patch["done"] else "update"
            self.audit.record(conn, ctx, "task", task_id, action, before, after, f"Задача «{row['title']}» {'выполнена' if action == 'complete' else 'изменена'}")
            self.search.reindex(conn, "task", task_id)
            self.db.emit(conn, "tasks.changed", {"id": task_id})
            # Recurring chore: completing it re-opens a fresh occurrence.
            if action == "complete" and row["recurrence"] and row["done_at"] is None:
                self._spawn_next(conn, ctx, after or {})
        return self.get(task_id)

    def delete(self, ctx: Ctx, task_id: int) -> None:
        with self.db.write() as conn:
            row = conn.execute("SELECT * FROM tasks WHERE id = ? AND deleted_at IS NULL", (task_id,)).fetchone()
            if row is None:
                raise NotFoundError("Task not found")
            now = self.clock.now_iso()
            before = row_to_dict(row)
            conn.execute("UPDATE tasks SET deleted_at = ?, updated_at = ? WHERE id = ?", (now, now, task_id))
            after = row_to_dict(conn.execute("SELECT * FROM tasks WHERE id = ?", (task_id,)).fetchone())
            self.audit.record(conn, ctx, "task", task_id, "delete", before, after, f"Задача «{row['title']}» удалена")
            self.search.reindex(conn, "task", task_id)
            self.db.emit(conn, "tasks.changed", {"id": task_id})

    def find_open_by_title(self, title: str, list_name: str | None = None) -> list[dict[str, Any]]:
        key = norm_key(title)
        return [t for t in self.list(list_name=list_name) if key and (key in norm_key(t["title"]) or norm_key(t["title"]) in key)]

    def _spawn_next(self, conn: sqlite3.Connection, ctx: Ctx, done_row: dict[str, Any]) -> None:
        from ..nlu.datetimes import next_occurrence  # local import: nlu depends on nothing in services
        import datetime as dt

        rule = loads(done_row.get("recurrence"), None)
        if not rule:
            return
        base = dt.datetime.fromisoformat(done_row["due_date"] + "T00:00:00") if done_row.get("due_date") else self.clock.local_now().replace(tzinfo=None)
        following = next_occurrence(rule, base)
        if following is None:
            return
        now = self.clock.now_iso()
        cursor = conn.execute(
            "INSERT INTO tasks(title, list, notes, due_date, recurrence, source, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?)",
            (done_row["title"], done_row["list"], done_row["notes"], following.date().isoformat(), done_row["recurrence"], ctx.source, now, now),
        )
        new_id = int(cursor.lastrowid or 0)
        after = row_to_dict(conn.execute("SELECT * FROM tasks WHERE id = ?", (new_id,)).fetchone())
        self.audit.record(conn, ctx, "task", new_id, "create", None, after, f"Повтор задачи: {done_row['title']}")
        self.search.reindex(conn, "task", new_id)

    def _doc(self, conn: sqlite3.Connection, task_id: int) -> tuple[str, str] | None:
        row = conn.execute("SELECT * FROM tasks WHERE id = ?", (task_id,)).fetchone()
        if row is None or row["deleted_at"]:
            return None
        return row["title"], f"{row['list']} {row['notes']}"

    @staticmethod
    def _public(row: sqlite3.Row) -> dict[str, Any]:
        data = row_to_dict(row) or {}
        data["recurrence"] = loads(data.get("recurrence"), None)
        data["done"] = data.get("done_at") is not None
        return data


class ContactService:
    """People Domovoy can message. Aliases carry declensions: «Ирине», «Ирина» → same contact."""

    def __init__(self, db: Database, clock: Clock, audit: AuditLog) -> None:
        self.db, self.clock, self.audit = db, clock, audit

    def get(self, contact_id: int) -> dict[str, Any]:
        with self.db.read() as conn:
            row = conn.execute("SELECT * FROM contacts WHERE id = ? AND deleted_at IS NULL", (contact_id,)).fetchone()
        if row is None:
            raise NotFoundError("Contact not found")
        return self._public(row)

    def list(self) -> list[dict[str, Any]]:
        with self.db.read() as conn:
            rows = conn.execute("SELECT * FROM contacts WHERE deleted_at IS NULL ORDER BY is_self DESC, name").fetchall()
        return [self._public(r) for r in rows]

    def resolve(self, name: str) -> list[dict[str, Any]]:
        """Contacts matching a spoken name (any case), best first. Empty/'мне' resolves to the owner."""
        key = norm_key(name)
        if not key or key in ("self", "мне", "себе", "меня", "я", "me"):
            return [c for c in self.list() if c["is_self"]]
        exact, partial = [], []
        for contact in self.list():
            keys = {norm_key(contact["name"]), *(norm_key(a) for a in contact["aliases"])}
            if key in keys:
                exact.append(contact)
            elif any(key and (key in k or k in key) for k in keys if k):
                partial.append(contact)
        return exact or partial

    def create(self, ctx: Ctx, *, name: str, aliases: list[str] | None = None, channels: dict[str, Any] | None = None,
               is_self: bool = False, notes: str = "") -> dict[str, Any]:
        name = clean_phrase(name)
        if not name:
            raise ValidationError("Name is required", fields={"name": "Required"})
        now = self.clock.now_iso()
        with self.db.write() as conn:
            if is_self:
                conn.execute("UPDATE contacts SET is_self = 0 WHERE is_self = 1")
            cursor = conn.execute(
                "INSERT INTO contacts(name, norm_name, aliases, channels, is_self, notes, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?)",
                (name, norm_key(name), dumps(self._aliases(aliases)), dumps(self._channels(channels)), 1 if is_self else 0, notes[:1000], now, now),
            )
            contact_id = int(cursor.lastrowid or 0)
            after = row_to_dict(conn.execute("SELECT * FROM contacts WHERE id = ?", (contact_id,)).fetchone())
            self.audit.record(conn, ctx, "contact", contact_id, "create", None, self._redact(after), f"Контакт: {name}", undoable=False)
            self.db.emit(conn, "contacts.changed", {"id": contact_id})
        return self.get(contact_id)

    def update(self, ctx: Ctx, contact_id: int, patch: dict[str, Any]) -> dict[str, Any]:
        with self.db.write() as conn:
            row = conn.execute("SELECT * FROM contacts WHERE id = ? AND deleted_at IS NULL", (contact_id,)).fetchone()
            if row is None:
                raise NotFoundError("Contact not found")
            before = row_to_dict(row)
            values: dict[str, Any] = {}
            if "name" in patch:
                name = clean_phrase(str(patch["name"]))
                if not name:
                    raise ValidationError("Name is required", fields={"name": "Required"})
                values["name"], values["norm_name"] = name, norm_key(name)
            if "aliases" in patch:
                values["aliases"] = dumps(self._aliases(patch["aliases"]))
            if "channels" in patch:
                values["channels"] = dumps(self._channels(patch["channels"]))
            if "notes" in patch:
                values["notes"] = str(patch["notes"] or "")[:1000]
            if patch.get("is_self"):
                conn.execute("UPDATE contacts SET is_self = 0 WHERE is_self = 1")
                values["is_self"] = 1
            elif "is_self" in patch:
                values["is_self"] = 0
            if not values:
                return self._public(row)
            values["updated_at"] = self.clock.now_iso()
            conn.execute(f"UPDATE contacts SET {', '.join(f'{k} = ?' for k in values)} WHERE id = ?", (*values.values(), contact_id))
            after = row_to_dict(conn.execute("SELECT * FROM contacts WHERE id = ?", (contact_id,)).fetchone())
            self.audit.record(conn, ctx, "contact", contact_id, "update", self._redact(before), self._redact(after), f"Контакт «{row['name']}» изменён", undoable=False)
            self.db.emit(conn, "contacts.changed", {"id": contact_id})
        return self.get(contact_id)

    def delete(self, ctx: Ctx, contact_id: int) -> None:
        with self.db.write() as conn:
            row = conn.execute("SELECT * FROM contacts WHERE id = ? AND deleted_at IS NULL", (contact_id,)).fetchone()
            if row is None:
                raise NotFoundError("Contact not found")
            now = self.clock.now_iso()
            conn.execute("UPDATE contacts SET deleted_at = ?, updated_at = ? WHERE id = ?", (now, now, contact_id))
            self.audit.record(conn, ctx, "contact", contact_id, "delete", None, None, f"Контакт «{row['name']}» удалён", undoable=False)
            self.db.emit(conn, "contacts.changed", {"id": contact_id})

    @staticmethod
    def _aliases(aliases: Any) -> list[str]:
        if not aliases:
            return []
        if not isinstance(aliases, (list, tuple)):
            raise ValidationError("Aliases must be a list", fields={"aliases": "Invalid"})
        return [clean_phrase(str(a))[:80] for a in aliases if clean_phrase(str(a))][:20]

    @staticmethod
    def _channels(channels: Any) -> dict[str, Any]:
        if not channels:
            return {}
        if not isinstance(channels, dict):
            raise ValidationError("Channels must be an object", fields={"channels": "Invalid"})
        allowed = {"telegram", "ha_notify", "email"}
        result = {}
        for key, value in channels.items():
            if key not in allowed:
                raise ValidationError(f"Unknown channel {key}", fields={"channels": f"One of {', '.join(sorted(allowed))}"})
            result[key] = value
        return result

    @staticmethod
    def _redact(row: dict[str, Any] | None) -> dict[str, Any] | None:
        return row

    @staticmethod
    def _public(row: sqlite3.Row) -> dict[str, Any]:
        data = row_to_dict(row) or {}
        data.pop("norm_name", None)
        data["aliases"] = loads(data.get("aliases"), [])
        data["channels"] = loads(data.get("channels"), {})
        data["is_self"] = bool(data.get("is_self"))
        return data


def _is_date(value: str) -> bool:
    import datetime as dt

    try:
        dt.date.fromisoformat(value)
        return True
    except (TypeError, ValueError):
        return False
