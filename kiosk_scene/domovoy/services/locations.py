from __future__ import annotations

import sqlite3
from typing import Any

from ..clock import Clock
from ..db import Database
from ..errors import ConflictError, NotFoundError, ValidationError
from ..text import capitalize_first, clean_phrase, norm_key, similarity
from .audit import AuditLog, row_to_dict
from .context import Ctx
from .search import SearchService

KINDS = ("home", "room", "cabinet", "shelf", "box", "cell", "place")
MAX_DEPTH = 8


class LocationService:
    """Tree of places: room → cabinet → shelf → box → cell (any depth up to MAX_DEPTH)."""

    def __init__(self, db: Database, clock: Clock, audit: AuditLog, search: SearchService) -> None:
        self.db = db
        self.clock = clock
        self.audit = audit
        self.search = search
        search.register("location", self._doc)
        audit.on_undo("location", lambda conn, id_: self.reindex_subtree(conn, id_))

    # ---- reads -------------------------------------------------------------------------------

    def get(self, location_id: int, *, include_deleted: bool = False) -> dict[str, Any]:
        with self.db.read() as conn:
            row = conn.execute("SELECT * FROM locations WHERE id = ?", (location_id,)).fetchone()
        if row is None or (row["deleted_at"] and not include_deleted):
            raise NotFoundError("Location not found")
        return self._public(row)

    def path_names(self, conn: sqlite3.Connection, location_id: int | None) -> list[str]:
        names: list[str] = []
        seen: set[int] = set()
        current = location_id
        while current is not None and current not in seen:
            seen.add(current)
            row = conn.execute("SELECT id, parent_id, name FROM locations WHERE id = ?", (current,)).fetchone()
            if row is None:
                break
            names.append(row["name"])
            current = row["parent_id"]
        return list(reversed(names))

    def path_names_for(self, location_id: int | None) -> list[str]:
        with self.db.read() as conn:
            return self.path_names(conn, location_id)

    def path_text(self, location_id: int | None) -> str:
        with self.db.read() as conn:
            return " → ".join(self.path_names(conn, location_id))

    def list_flat(self) -> list[dict[str, Any]]:
        with self.db.read() as conn:
            rows = conn.execute("SELECT * FROM locations WHERE deleted_at IS NULL ORDER BY parent_id, position, name").fetchall()
            counts = {
                r["location_id"]: r["n"]
                for r in conn.execute(
                    "SELECT location_id, COUNT(*) n FROM items WHERE deleted_at IS NULL AND location_id IS NOT NULL GROUP BY location_id"
                )
            }
        by_id = {r["id"]: r for r in rows}
        result = []
        for row in rows:
            public = self._public(row)
            names, current, seen = [], row["id"], set()
            while current in by_id and current not in seen:
                seen.add(current)
                names.append(by_id[current]["name"])
                current = by_id[current]["parent_id"]
            public["path"] = list(reversed(names))
            public["item_count"] = counts.get(row["id"], 0)
            result.append(public)
        return result

    def tree(self) -> list[dict[str, Any]]:
        flat = self.list_flat()
        nodes = {item["id"]: {**item, "children": []} for item in flat}
        roots = []
        for item in flat:
            node = nodes[item["id"]]
            parent = nodes.get(item["parent_id"]) if item["parent_id"] else None
            (parent["children"] if parent else roots).append(node)
        return roots

    def descendants(self, conn: sqlite3.Connection, location_id: int) -> list[int]:
        ids = [location_id]
        frontier = [location_id]
        while frontier:
            marks = ",".join("?" * len(frontier))
            rows = conn.execute(
                f"SELECT id FROM locations WHERE parent_id IN ({marks}) AND deleted_at IS NULL", frontier
            ).fetchall()
            frontier = [int(r["id"]) for r in rows if int(r["id"]) not in ids]
            ids.extend(frontier)
        return ids

    def find_child(self, conn: sqlite3.Connection, parent_id: int | None, name: str) -> sqlite3.Row | None:
        return conn.execute(
            "SELECT * FROM locations WHERE COALESCE(parent_id, 0) = ? AND norm_name = ? AND deleted_at IS NULL",
            (parent_id or 0, norm_key(name)),
        ).fetchone()

    def resolve_path(
        self, path: list[str], *, create: bool, ctx: Ctx | None = None, kinds: list[str] | None = None,
        conn: sqlite3.Connection | None = None,
    ) -> tuple[int | None, list[int], list[str]]:
        """Resolve root→leaf names to a location id.

        Returns `(leaf_id, created_ids, ambiguous)`. Without `create`, unknown segments stop resolution and
        `leaf_id` is None. Near-duplicates ("нижний шкаф" vs "шкаф нижний") match by normalised key, then by
        trigram similarity ≥ 0.85; a 0.6–0.85 candidate is reported in `ambiguous` instead of guessed.
        """
        if conn is None:
            with self.db.write() as inner:
                return self.resolve_path(path, create=create, ctx=ctx, kinds=kinds, conn=inner)
        parent: int | None = None
        created: list[int] = []
        ambiguous: list[str] = []
        for depth, name in enumerate(path):
            name = clean_phrase(name)
            if not name:
                continue
            row = self.find_child(conn, parent, name)
            if row is None:
                siblings = conn.execute(
                    "SELECT * FROM locations WHERE COALESCE(parent_id, 0) = ? AND deleted_at IS NULL", (parent or 0,)
                ).fetchall()
                best = max(siblings, key=lambda r: similarity(r["name"], name), default=None)
                score = similarity(best["name"], name) if best else 0.0
                if best is not None and score >= 0.85:
                    row = best
                elif best is not None and score >= 0.6 and not create:
                    ambiguous.append(f"{name} ≈ {best['name']}")
            if row is None:
                if not create:
                    return None, created, ambiguous
                kind = (kinds[depth] if kinds and depth < len(kinds) else "place")
                new_id = self._insert(conn, ctx or Ctx(), name, parent, kind, "", auto=True)
                created.append(new_id)
                parent = new_id
            else:
                parent = int(row["id"])
        return parent, created, ambiguous

    def find_partial(self, path: list[str], *, prefer_under: int | None = None) -> tuple[list[int], list[str]]:
        """Locate a *partially specified* place («коробка 4») anywhere in the tree.

        Returns `(matching leaf ids, their full paths)`. The last path element must match the node; earlier
        elements must match its ancestors in order (not necessarily adjacent). `prefer_under` narrows the
        result to that subtree when several nodes match («четвёртая коробка» near where the last item was).
        """
        if not path:
            return [], []
        wanted = [norm_key(p) for p in path]
        with self.db.read() as conn:
            rows = conn.execute("SELECT id, parent_id, name, norm_name FROM locations WHERE deleted_at IS NULL").fetchall()
            by_id = {r["id"]: r for r in rows}
            scope = set(self.descendants(conn, prefer_under)) if prefer_under is not None else None
        matches: list[tuple[int, list[str]]] = []
        for row in rows:
            if row["norm_name"] != wanted[-1]:
                continue
            chain, current, seen = [], row, set()
            while current is not None and current["id"] not in seen:
                seen.add(current["id"])
                chain.append(current)
                current = by_id.get(current["parent_id"]) if current["parent_id"] else None
            chain.reverse()
            idx = 0
            for node in chain:
                if idx < len(wanted) and node["norm_name"] == wanted[idx]:
                    idx += 1
            if idx == len(wanted):
                matches.append((int(row["id"]), [n["name"] for n in chain]))
        if scope is not None:
            narrowed = [m for m in matches if m[0] in scope]
            if narrowed:
                matches = narrowed
        return [m[0] for m in matches], [" → ".join(m[1]) for m in matches]

    # ---- writes ------------------------------------------------------------------------------

    def create(self, ctx: Ctx, *, name: str, parent_id: int | None = None, kind: str = "place", notes: str = "") -> dict[str, Any]:
        name = clean_phrase(name)
        if not name:
            raise ValidationError("Name is required", fields={"name": "Required"})
        if kind not in KINDS:
            raise ValidationError("Unknown kind", fields={"kind": f"One of {', '.join(KINDS)}"})
        with self.db.write() as conn:
            if parent_id is not None:
                self._require(conn, parent_id)
                if len(self.path_names(conn, parent_id)) >= MAX_DEPTH:
                    raise ValidationError("Location tree is too deep", fields={"parent_id": "Too deep"})
            if self.find_child(conn, parent_id, name):
                raise ConflictError("A place with this name already exists here", code="duplicate_location")
            new_id = self._insert(conn, ctx, name, parent_id, kind, notes)
        return self.get(new_id)

    def update(self, ctx: Ctx, location_id: int, patch: dict[str, Any]) -> dict[str, Any]:
        with self.db.write() as conn:
            row = self._require(conn, location_id)
            before = row_to_dict(row) or {}
            values: dict[str, Any] = {}
            if "name" in patch:
                name = clean_phrase(str(patch["name"]))
                if not name:
                    raise ValidationError("Name is required", fields={"name": "Required"})
                values["name"], values["norm_name"] = name, norm_key(name)
            if "kind" in patch:
                if patch["kind"] not in KINDS:
                    raise ValidationError("Unknown kind", fields={"kind": f"One of {', '.join(KINDS)}"})
                values["kind"] = patch["kind"]
            if "notes" in patch:
                values["notes"] = str(patch["notes"] or "")[:2000]
            if "parent_id" in patch:
                new_parent = patch["parent_id"]
                if new_parent is not None:
                    self._require(conn, int(new_parent))
                    if int(new_parent) in self.descendants(conn, location_id):
                        raise ValidationError("Cannot move a place inside itself", fields={"parent_id": "Cycle"})
                values["parent_id"] = new_parent
            if not values:
                return self._public(row)
            new_parent_id = values.get("parent_id", row["parent_id"])
            new_norm = values.get("norm_name", row["norm_name"])
            clash = self.find_child(conn, new_parent_id, new_norm)
            if clash is not None and int(clash["id"]) != location_id:
                raise ConflictError("A place with this name already exists here", code="duplicate_location")
            values["updated_at"] = self.clock.now_iso()
            conn.execute(
                f"UPDATE locations SET {', '.join(f'{k} = ?' for k in values)} WHERE id = ?", (*values.values(), location_id)
            )
            after = row_to_dict(conn.execute("SELECT * FROM locations WHERE id = ?", (location_id,)).fetchone())
            self.audit.record(conn, ctx, "location", location_id, "update", before, after, f"Место «{before['name']}» изменено")
            self.reindex_subtree(conn, location_id)
            self.db.emit(conn, "locations.changed", {"id": location_id})
        return self.get(location_id)

    def delete(self, ctx: Ctx, location_id: int) -> None:
        with self.db.write() as conn:
            row = self._require(conn, location_id)
            children = conn.execute("SELECT COUNT(*) FROM locations WHERE parent_id = ? AND deleted_at IS NULL", (location_id,)).fetchone()[0]
            items = conn.execute("SELECT COUNT(*) FROM items WHERE location_id = ? AND deleted_at IS NULL", (location_id,)).fetchone()[0]
            if children or items:
                raise ConflictError(
                    "The place is not empty: move or delete its contents first", code="location_not_empty"
                )
            before = row_to_dict(row)
            now = self.clock.now_iso()
            conn.execute("UPDATE locations SET deleted_at = ?, updated_at = ? WHERE id = ?", (now, now, location_id))
            after = row_to_dict(conn.execute("SELECT * FROM locations WHERE id = ?", (location_id,)).fetchone())
            self.audit.record(conn, ctx, "location", location_id, "delete", before, after, f"Место «{row['name']}» удалено")
            self.search.reindex(conn, "location", location_id)
            self.db.emit(conn, "locations.changed", {"id": location_id})

    # ---- internals ---------------------------------------------------------------------------

    def _insert(self, conn: sqlite3.Connection, ctx: Ctx, name: str, parent_id: int | None, kind: str, notes: str, *, auto: bool = False) -> int:
        now = self.clock.now_iso()
        display = capitalize_first(name)
        cursor = conn.execute(
            "INSERT INTO locations(parent_id, name, norm_name, kind, notes, created_at, updated_at) VALUES (?,?,?,?,?,?,?)",
            (parent_id, display, norm_key(display), kind, notes, now, now),
        )
        new_id = int(cursor.lastrowid or 0)
        after = row_to_dict(conn.execute("SELECT * FROM locations WHERE id = ?", (new_id,)).fetchone())
        self.audit.record(conn, ctx, "location", new_id, "create", None, after, f"Создано место «{display}»")
        self.search.reindex(conn, "location", new_id)
        self.db.emit(conn, "locations.changed", {"id": new_id})
        return new_id

    def _require(self, conn: sqlite3.Connection, location_id: int) -> sqlite3.Row:
        row = conn.execute("SELECT * FROM locations WHERE id = ?", (location_id,)).fetchone()
        if row is None or row["deleted_at"]:
            raise NotFoundError("Location not found")
        return row

    def reindex_subtree(self, conn: sqlite3.Connection, location_id: int) -> None:
        for lid in self.descendants(conn, location_id):
            self.search.reindex(conn, "location", lid)
            for item in conn.execute("SELECT id FROM items WHERE location_id = ? AND deleted_at IS NULL", (lid,)).fetchall():
                self.search.reindex(conn, "item", int(item["id"]))

    def _doc(self, conn: sqlite3.Connection, location_id: int) -> tuple[str, str] | None:
        row = conn.execute("SELECT * FROM locations WHERE id = ?", (location_id,)).fetchone()
        if row is None or row["deleted_at"]:
            return None
        return row["name"], " ".join([" ".join(self.path_names(conn, location_id)), row["kind"], row["notes"]])

    @staticmethod
    def _public(row: sqlite3.Row) -> dict[str, Any]:
        data = row_to_dict(row) or {}
        data.pop("norm_name", None)
        return data
