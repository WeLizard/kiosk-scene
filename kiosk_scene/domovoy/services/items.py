from __future__ import annotations

import sqlite3
from typing import Any

from ..clock import Clock
from ..db import Database, dumps, loads
from ..errors import NotFoundError, ValidationError
from ..text import clean_phrase, norm_key, similarity
from .audit import AuditLog, row_to_dict
from .context import Ctx
from .locations import LocationService
from .search import SearchService

MAX_QUANTITY = 1_000_000


def format_quantity(quantity: float | None, unit: str = "") -> str:
    if quantity is None:
        return ""
    number = int(quantity) if float(quantity).is_integer() else round(float(quantity), 3)
    return f"{number} {unit}".strip()


class ItemService:
    def __init__(self, db: Database, clock: Clock, audit: AuditLog, search: SearchService, locations: LocationService) -> None:
        self.db = db
        self.clock = clock
        self.audit = audit
        self.search = search
        self.locations = locations
        search.register("item", self._doc)
        audit.on_undo("item", lambda conn, id_: self.search.reindex(conn, "item", id_))

    # ---- reads -------------------------------------------------------------------------------

    def get(self, item_id: int, *, include_deleted: bool = False) -> dict[str, Any]:
        with self.db.read() as conn:
            row = conn.execute("SELECT * FROM items WHERE id = ?", (item_id,)).fetchone()
            if row is None or (row["deleted_at"] and not include_deleted):
                raise NotFoundError("Item not found")
            return self._public(conn, row)

    def list(self, *, location_id: int | None = None, q: str = "", limit: int = 200, offset: int = 0,
             include_empty: bool = True) -> list[dict[str, Any]]:
        clauses = ["deleted_at IS NULL"]
        params: list[Any] = []
        with self.db.read() as conn:
            if location_id is not None:
                ids = self.locations.descendants(conn, location_id)
                clauses.append(f"location_id IN ({','.join('?' * len(ids))})")
                params.extend(ids)
            if not include_empty:
                clauses.append("(quantity IS NULL OR quantity > 0)")
            if q:
                like = f"%{q.lower()}%"
                clauses.append("(lower(name) LIKE ? OR lower(notes) LIKE ? OR norm_name LIKE ?)")
                params.extend([like, like, f"%{norm_key(q)}%"])
            rows = conn.execute(
                f"SELECT * FROM items WHERE {' AND '.join(clauses)} ORDER BY updated_at DESC, id DESC LIMIT ? OFFSET ?",
                (*params, max(1, min(limit, 1000)), max(0, offset)),
            ).fetchall()
            return [self._public(conn, r) for r in rows]

    def candidates(self, name: str, *, location_id: int | None = None, limit: int = 8) -> list[dict[str, Any]]:
        """Items that `name` may refer to, best first (exact key → containment → fuzzy)."""
        key = norm_key(name)
        if not key:
            return []
        with self.db.read() as conn:
            rows = conn.execute("SELECT * FROM items WHERE deleted_at IS NULL").fetchall()
            scored: list[tuple[float, sqlite3.Row]] = []
            key_tokens = set(key.split())
            for row in rows:
                if row["norm_name"] == key:
                    score = 1.0
                else:
                    row_tokens = set(row["norm_name"].split())
                    if key_tokens and key_tokens <= row_tokens:
                        score = 0.9 - 0.02 * (len(row_tokens) - len(key_tokens))
                    else:
                        score = similarity(key, row["norm_name"]) * 0.8
                if score >= 0.6:
                    if location_id is not None and row["location_id"] is not None:
                        if row["location_id"] in self.locations.descendants(conn, location_id):
                            score += 0.05
                    scored.append((score, row))
            scored.sort(key=lambda pair: (pair[0], pair[1]["updated_at"]), reverse=True)
            result = []
            for score, row in scored[:limit]:
                public = self._public(conn, row)
                public["match_score"] = round(score, 3)
                result.append(public)
            return result

    def used_between(self, start_iso: str, end_iso: str) -> set[int]:
        """Items with any recorded activity (use/move/consume/update/create) in a time window."""
        with self.db.read() as conn:
            rows = conn.execute(
                "SELECT DISTINCT entity_id FROM audit_log WHERE entity_type = 'item' AND ts >= ? AND ts < ? AND action != 'delete'",
                (start_iso, end_iso),
            ).fetchall()
        return {int(r["entity_id"]) for r in rows if r["entity_id"] is not None}

    # ---- writes ------------------------------------------------------------------------------

    def create(
        self, ctx: Ctx, *, name: str, quantity: float | None = None, unit: str = "", location_id: int | None = None,
        properties: dict[str, Any] | None = None, notes: str = "", category: str = "", confidence: float | None = None,
        mode: str = "set", merge: bool = True,
    ) -> tuple[dict[str, Any], str]:
        """Create an item, or merge into an existing one with the same name at the same place.

        Returns `(item, outcome)` where outcome is `created`, `increased` or `set`.
        """
        name = clean_phrase(name)
        if not name:
            raise ValidationError("Name is required", fields={"name": "Required"})
        quantity = self._check_quantity(quantity)
        if location_id is not None:
            self.locations.get(location_id)
        props = self._check_properties(properties)
        with self.db.write() as conn:
            existing = None
            if merge:
                existing = conn.execute(
                    "SELECT * FROM items WHERE norm_name = ? AND COALESCE(location_id, 0) = ? AND deleted_at IS NULL",
                    (norm_key(name), location_id or 0),
                ).fetchone()
            now = self.clock.now_iso()
            if existing is not None:
                before = row_to_dict(existing)
                new_quantity = existing["quantity"]
                outcome = "set"
                if quantity is not None:
                    if mode == "add" and existing["quantity"] is not None:
                        new_quantity = existing["quantity"] + quantity
                        outcome = "increased"
                    else:
                        new_quantity = quantity
                merged_props = {**(loads(existing["properties"], {}) or {}), **props}
                conn.execute(
                    "UPDATE items SET quantity = ?, unit = COALESCE(NULLIF(?, ''), unit), properties = ?, updated_at = ?, "
                    "notes = CASE WHEN ? != '' THEN ? ELSE notes END WHERE id = ?",
                    (new_quantity, unit, dumps(merged_props), now, notes, notes, existing["id"]),
                )
                item_id = int(existing["id"])
                after = row_to_dict(conn.execute("SELECT * FROM items WHERE id = ?", (item_id,)).fetchone())
                self.audit.record(conn, ctx, "item", item_id, "update", before, after,
                                  f"«{existing['name']}»: {format_quantity(new_quantity, after['unit'] if after else '')}")
            else:
                cursor = conn.execute(
                    """INSERT INTO items(name, norm_name, quantity, unit, location_id, category, properties, notes, source,
                                         confidence, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)""",
                    (name, norm_key(name), quantity, unit, location_id, category, dumps(props), notes, ctx.source,
                     confidence, now, now),
                )
                item_id = int(cursor.lastrowid or 0)
                after = row_to_dict(conn.execute("SELECT * FROM items WHERE id = ?", (item_id,)).fetchone())
                self.audit.record(conn, ctx, "item", item_id, "create", None, after,
                                  f"Добавлено: {format_quantity(quantity, unit)} «{name}»".replace("  ", " "))
                outcome = "created"
            self.search.reindex(conn, "item", item_id)
            self.db.emit(conn, "items.changed", {"id": item_id, "outcome": outcome})
        return self.get(item_id), outcome

    def update(self, ctx: Ctx, item_id: int, patch: dict[str, Any], *, action: str = "update") -> dict[str, Any]:
        with self.db.write() as conn:
            row = conn.execute("SELECT * FROM items WHERE id = ?", (item_id,)).fetchone()
            if row is None or row["deleted_at"]:
                raise NotFoundError("Item not found")
            before = row_to_dict(row)
            values: dict[str, Any] = {}
            if "name" in patch:
                name = clean_phrase(str(patch["name"]))
                if not name:
                    raise ValidationError("Name is required", fields={"name": "Required"})
                values["name"], values["norm_name"] = name, norm_key(name)
            if "quantity" in patch:
                values["quantity"] = self._check_quantity(patch["quantity"])
            for key in ("unit", "category", "notes"):
                if key in patch:
                    values[key] = str(patch[key] or "")[:500 if key != "notes" else 4000]
            if "properties" in patch:
                values["properties"] = dumps(self._check_properties(patch["properties"]))
            if "location_id" in patch:
                if patch["location_id"] is not None:
                    self.locations.get(int(patch["location_id"]))
                values["location_id"] = patch["location_id"]
            if not values:
                return self._public(conn, row)
            values["updated_at"] = self.clock.now_iso()
            conn.execute(f"UPDATE items SET {', '.join(f'{k} = ?' for k in values)} WHERE id = ?", (*values.values(), item_id))
            after = row_to_dict(conn.execute("SELECT * FROM items WHERE id = ?", (item_id,)).fetchone())
            self.audit.record(conn, ctx, "item", item_id, action, before, after, self._summary(conn, action, before, after))
            self.search.reindex(conn, "item", item_id)
            self.db.emit(conn, "items.changed", {"id": item_id, "action": action})
        return self.get(item_id)

    def move(self, ctx: Ctx, item_id: int, location_id: int | None) -> dict[str, Any]:
        return self.update(ctx, item_id, {"location_id": location_id}, action="move")

    def consume(self, ctx: Ctx, item_id: int, amount: float) -> dict[str, Any]:
        amount = self._check_quantity(amount) or 0
        if amount <= 0:
            raise ValidationError("Amount must be positive", fields={"quantity": "Must be > 0"})
        item = self.get(item_id)
        if item["quantity"] is None:
            raise ValidationError("This item has no tracked quantity", fields={"quantity": "Not tracked"}, code="no_quantity")
        if amount > item["quantity"] + 1e-9:
            raise ValidationError(
                f"Only {format_quantity(item['quantity'], item['unit'])} left", fields={"quantity": "Too many"}, code="insufficient"
            )
        return self.update(ctx, item_id, {"quantity": round(item["quantity"] - amount, 6)}, action="consume")

    def touch_used(self, ctx: Ctx, item_id: int) -> dict[str, Any]:
        """Record that the user used an item ("я пользовался программатором"). Not undoable, harmless."""
        with self.db.write() as conn:
            row = conn.execute("SELECT * FROM items WHERE id = ? AND deleted_at IS NULL", (item_id,)).fetchone()
            if row is None:
                raise NotFoundError("Item not found")
            now = self.clock.now_iso()
            conn.execute("UPDATE items SET last_used_at = ? WHERE id = ?", (now, item_id))
            self.audit.record(conn, ctx, "item", item_id, "use", None, None, f"Использовано: «{row['name']}»", undoable=False)
            self.db.emit(conn, "items.changed", {"id": item_id, "action": "use"})
        return self.get(item_id)

    def delete(self, ctx: Ctx, item_id: int) -> None:
        with self.db.write() as conn:
            row = conn.execute("SELECT * FROM items WHERE id = ?", (item_id,)).fetchone()
            if row is None or row["deleted_at"]:
                raise NotFoundError("Item not found")
            before = row_to_dict(row)
            now = self.clock.now_iso()
            conn.execute("UPDATE items SET deleted_at = ?, updated_at = ? WHERE id = ?", (now, now, item_id))
            after = row_to_dict(conn.execute("SELECT * FROM items WHERE id = ?", (item_id,)).fetchone())
            self.audit.record(conn, ctx, "item", item_id, "delete", before, after, f"Удалено: «{row['name']}»")
            self.search.reindex(conn, "item", item_id)
            self.db.emit(conn, "items.changed", {"id": item_id, "action": "delete"})

    # ---- internals ---------------------------------------------------------------------------

    @staticmethod
    def _check_quantity(value: Any) -> float | None:
        if value is None or value == "":
            return None
        try:
            number = float(value)
        except (TypeError, ValueError):
            raise ValidationError("Quantity must be a number", fields={"quantity": "Not a number"}) from None
        if number != number or number < 0 or number > MAX_QUANTITY:
            raise ValidationError("Quantity is out of range", fields={"quantity": f"0..{MAX_QUANTITY}"})
        return round(number, 6)

    @staticmethod
    def _check_properties(value: Any) -> dict[str, Any]:
        if value in (None, ""):
            return {}
        if not isinstance(value, dict) or len(value) > 40:
            raise ValidationError("Properties must be an object with at most 40 keys", fields={"properties": "Invalid"})
        return {str(k)[:64]: str(v)[:256] for k, v in value.items()}

    def _summary(self, conn: sqlite3.Connection, action: str, before: dict[str, Any] | None, after: dict[str, Any] | None) -> str:
        name = (after or before or {}).get("name", "")
        if action == "move" and after:
            return f"«{name}» → {' → '.join(self.locations.path_names(conn, after['location_id'])) or 'без места'}"
        if action == "consume" and before and after:
            return f"«{name}»: {format_quantity(before['quantity'], before['unit'])} → {format_quantity(after['quantity'], after['unit'])}"
        return f"«{name}» обновлено"

    def _doc(self, conn: sqlite3.Connection, item_id: int) -> tuple[str, str] | None:
        row = conn.execute("SELECT * FROM items WHERE id = ?", (item_id,)).fetchone()
        if row is None or row["deleted_at"]:
            return None
        props = loads(row["properties"], {}) or {}
        location = " ".join(self.locations.path_names(conn, row["location_id"]))
        return row["name"], " ".join(
            [format_quantity(row["quantity"], row["unit"]), row["category"], row["notes"], location,
             " ".join(f"{k} {v}" for k, v in props.items())]
        )

    def _public(self, conn: sqlite3.Connection, row: sqlite3.Row) -> dict[str, Any]:
        data = row_to_dict(row) or {}
        data.pop("norm_name", None)
        data["properties"] = loads(data.get("properties"), {}) or {}
        path = self.locations.path_names(conn, data.get("location_id"))
        data["location_path"] = path
        data["location_text"] = " → ".join(path)
        data["quantity_text"] = format_quantity(data.get("quantity"), data.get("unit", ""))
        return data
