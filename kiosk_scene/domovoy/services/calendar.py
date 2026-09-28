from __future__ import annotations

import datetime as dt
import sqlite3
from typing import Any, Callable

from ..clock import Clock, UTC, from_iso, to_iso
from ..db import Database
from ..errors import NotFoundError, ProviderError, ValidationError
from ..providers.calendar_base import CalEvent
from .audit import AuditLog, row_to_dict
from .context import Ctx
from .search import SearchService

LOCAL = "local"


class CalendarService:
    """One calendar API over several sources: the built-in local calendar, a CalDAV collection, HA calendars.

    Sources fail independently: a dead CalDAV server yields a warning next to the events that *were* readable
    instead of an empty or broken calendar.
    """

    def __init__(self, db: Database, clock: Clock, audit: AuditLog, search: SearchService, *,
                 caldav: Any | None = None, ha: Any | None = None, settings: Any | None = None) -> None:
        self.db, self.clock, self.audit, self.search = db, clock, audit, search
        self.caldav, self.ha, self.settings = caldav, ha, settings
        search.register("event", self._doc)
        audit.on_undo("calendar_event", lambda conn, id_: self.search.reindex(conn, "event", id_))
        audit.on_custom_undo("calendar_external", self._undo_external)

    # ---- sources -------------------------------------------------------------------------------

    def sources(self) -> list[dict[str, Any]]:
        result = [{"id": LOCAL, "title": "Локальный календарь", "capabilities": ["read", "create", "update", "delete"], "available": True}]
        if self.caldav is not None and self.caldav.configured():
            result.append({"id": "caldav", "title": "CalDAV", "capabilities": sorted(self.caldav.capabilities), "available": True})
        if self.ha is not None and self.settings is not None:
            for entity in self.settings.get("calendar").get("ha_calendars", []):
                result.append({"id": f"ha:{entity}", "title": f"Home Assistant: {entity}", "capabilities": ["read", "create"], "available": self.ha.configured()})
        return result

    def default_source(self) -> str:
        wanted = (self.settings.get("calendar").get("default") if self.settings else LOCAL) or LOCAL
        return wanted if any(s["id"] == wanted for s in self.sources()) else LOCAL

    # ---- reads ---------------------------------------------------------------------------------

    def list_events(self, start: dt.datetime, end: dt.datetime) -> dict[str, Any]:
        events: list[CalEvent] = list(self._local_between(start, end))
        warnings: list[dict[str, str]] = []
        for source_id, fetch in self._external_fetchers(start, end):
            try:
                events.extend(fetch())
            except ProviderError as exc:
                warnings.append({"source": source_id, "message": exc.message, "code": exc.code})
        events.sort(key=lambda e: (e.start, e.title))
        return {"events": [e.public() for e in events], "warnings": warnings}

    def _external_fetchers(self, start: dt.datetime, end: dt.datetime) -> list[tuple[str, Callable[[], list[CalEvent]]]]:
        fetchers: list[tuple[str, Callable[[], list[CalEvent]]]] = []
        if self.caldav is not None and self.caldav.configured():
            fetchers.append(("caldav", lambda: self.caldav.list_events(start, end)))
        if self.ha is not None and self.settings is not None:
            for entity in self.settings.get("calendar").get("ha_calendars", []):
                fetchers.append((f"ha:{entity}", lambda e=entity: self.ha.calendar_events(e, start, end, self.clock.tz)))
        return fetchers

    def _local_between(self, start: dt.datetime, end: dt.datetime) -> list[CalEvent]:
        with self.db.read() as conn:
            rows = conn.execute(
                "SELECT * FROM calendar_events WHERE deleted_at IS NULL AND end > ? AND start < ? ORDER BY start",
                (to_iso(start), to_iso(end)),
            ).fetchall()
        return [self._to_event(r) for r in rows]

    # ---- writes --------------------------------------------------------------------------------

    def create(self, ctx: Ctx, *, title: str, start: dt.datetime, end: dt.datetime | None = None, all_day: bool = False,
               location: str = "", notes: str = "", calendar: str | None = None) -> CalEvent:
        title = (title or "").strip()
        if not title:
            raise ValidationError("Title is required", fields={"title": "Required"})
        if start.tzinfo is None:
            raise ValidationError("Start must include a timezone", fields={"start": "Invalid"})
        minutes = int(self.settings.get("default_event_minutes")) if self.settings else 60
        if all_day:
            end = end or start + dt.timedelta(days=1)
        else:
            end = end or start + dt.timedelta(minutes=minutes)
        if end <= start:
            raise ValidationError("End must be after start", fields={"end": "Must be after start"})
        calendar = calendar or self.default_source()
        if calendar == LOCAL:
            return self._create_local(ctx, title, start, end, all_day, location, notes)
        if calendar == "caldav" and self.caldav is not None:
            event = self.caldav.create_event(title=title, start=start, end=end, all_day=all_day, location=location, notes=notes)
        elif calendar.startswith("ha:") and self.ha is not None:
            self.ha.create_calendar_event(calendar[3:], title=title, start=start, end=end, all_day=all_day, location=location, notes=notes)
            event = CalEvent(id=f"{title}@{to_iso(start)}", calendar=calendar, title=title, start=start, end=end, all_day=all_day, location=location, notes=notes, read_only=True)
        else:
            raise ValidationError("Unknown calendar", fields={"calendar": "Unknown"})
        with self.db.write() as conn:
            # HA calendars cannot delete through the REST API, so only CalDAV creations are undoable.
            self.audit.record(
                conn, ctx, "calendar_external", None, "create", None,
                {"calendar": event.calendar, "id": event.id, "title": title}, f"Событие «{title}» ({event.calendar})",
                undoable=(calendar == "caldav"),
            )
            self.db.emit(conn, "calendar.changed", {"calendar": event.calendar})
        return event

    def _create_local(self, ctx: Ctx, title: str, start: dt.datetime, end: dt.datetime, all_day: bool, location: str, notes: str) -> CalEvent:
        now = self.clock.now_iso()
        with self.db.write() as conn:
            cursor = conn.execute(
                "INSERT INTO calendar_events(calendar, title, start, end, all_day, location, notes, created_at, updated_at) VALUES ('local',?,?,?,?,?,?,?,?)",
                (title[:300], to_iso(start), to_iso(end), 1 if all_day else 0, location[:300], notes[:4000], now, now),
            )
            event_id = int(cursor.lastrowid or 0)
            after = row_to_dict(conn.execute("SELECT * FROM calendar_events WHERE id = ?", (event_id,)).fetchone())
            self.audit.record(conn, ctx, "calendar_event", event_id, "create", None, after, f"Событие «{title}»")
            self.search.reindex(conn, "event", event_id)
            self.db.emit(conn, "calendar.changed", {"calendar": LOCAL, "id": event_id})
        return self._to_event(self._row(event_id))

    def update(self, ctx: Ctx, ref: str, patch: dict[str, Any]) -> CalEvent:
        source, native = split_ref(ref)
        if source != LOCAL:
            if source == "caldav" and self.caldav is not None:
                event = self.caldav.update_event(native, patch)
                with self.db.write() as conn:
                    self.audit.record(conn, ctx, "calendar_external", None, "update", None, {"calendar": "caldav", "id": native},
                                      f"Событие «{event.title}» изменено (CalDAV)", undoable=False)
                    self.db.emit(conn, "calendar.changed", {"calendar": "caldav"})
                return event
            raise ValidationError("This calendar is read-only for Domovoy", code="read_only")
        event_id = int(native)
        with self.db.write() as conn:
            row = conn.execute("SELECT * FROM calendar_events WHERE id = ? AND deleted_at IS NULL", (event_id,)).fetchone()
            if row is None:
                raise NotFoundError("Event not found")
            before = row_to_dict(row)
            values: dict[str, Any] = {}
            if "title" in patch:
                if not str(patch["title"]).strip():
                    raise ValidationError("Title is required", fields={"title": "Required"})
                values["title"] = str(patch["title"]).strip()[:300]
            start = patch.get("start") or from_iso(row["start"])
            end = patch.get("end") or from_iso(row["end"])
            if "start" in patch and "end" not in patch:
                end = start + (from_iso(row["end"]) - from_iso(row["start"]))
            if "start" in patch or "end" in patch:
                if end <= start:
                    raise ValidationError("End must be after start", fields={"end": "Must be after start"})
                values["start"], values["end"] = to_iso(start), to_iso(end)
            for key in ("location", "notes"):
                if key in patch:
                    values[key] = str(patch[key] or "")[:4000]
            if "all_day" in patch:
                values["all_day"] = 1 if patch["all_day"] else 0
            if not values:
                return self._to_event(row)
            values["updated_at"] = self.clock.now_iso()
            conn.execute(f"UPDATE calendar_events SET {', '.join(f'{k} = ?' for k in values)} WHERE id = ?", (*values.values(), event_id))
            after = row_to_dict(conn.execute("SELECT * FROM calendar_events WHERE id = ?", (event_id,)).fetchone())
            self.audit.record(conn, ctx, "calendar_event", event_id, "update", before, after, f"Событие «{row['title']}» изменено")
            self.search.reindex(conn, "event", event_id)
            self.db.emit(conn, "calendar.changed", {"calendar": LOCAL, "id": event_id})
        return self._to_event(self._row(event_id))

    def delete(self, ctx: Ctx, ref: str) -> None:
        source, native = split_ref(ref)
        if source != LOCAL:
            if source == "caldav" and self.caldav is not None:
                self.caldav.delete_event(native)
                with self.db.write() as conn:
                    self.audit.record(conn, ctx, "calendar_external", None, "delete", None, {"calendar": "caldav", "id": native},
                                      "Событие удалено (CalDAV)", undoable=False)
                    self.db.emit(conn, "calendar.changed", {"calendar": "caldav"})
                return
            raise ValidationError("This calendar is read-only for Domovoy", code="read_only")
        event_id = int(native)
        with self.db.write() as conn:
            row = conn.execute("SELECT * FROM calendar_events WHERE id = ? AND deleted_at IS NULL", (event_id,)).fetchone()
            if row is None:
                raise NotFoundError("Event not found")
            now = self.clock.now_iso()
            before = row_to_dict(row)
            conn.execute("UPDATE calendar_events SET deleted_at = ?, updated_at = ? WHERE id = ?", (now, now, event_id))
            after = row_to_dict(conn.execute("SELECT * FROM calendar_events WHERE id = ?", (event_id,)).fetchone())
            self.audit.record(conn, ctx, "calendar_event", event_id, "delete", before, after, f"Событие «{row['title']}» удалено")
            self.search.reindex(conn, "event", event_id)
            self.db.emit(conn, "calendar.changed", {"calendar": LOCAL, "id": event_id})

    def find_by_title(self, title: str, start: dt.datetime, end: dt.datetime) -> list[CalEvent]:
        from ..text import norm_key

        key = norm_key(title)
        found = self.list_events(start, end)["events"]
        matches = []
        for item in found:
            candidate = norm_key(item["title"])
            if key and (key in candidate or candidate in key):
                matches.append(item)
        return matches

    # ---- internals -----------------------------------------------------------------------------

    def _undo_external(self, after: dict[str, Any]) -> None:
        if after.get("calendar") == "caldav" and self.caldav is not None:
            self.caldav.delete_event(str(after["id"]))
        else:
            raise ValidationError("This event cannot be removed automatically", code="not_undoable")

    def _row(self, event_id: int) -> sqlite3.Row:
        with self.db.read() as conn:
            row = conn.execute("SELECT * FROM calendar_events WHERE id = ?", (event_id,)).fetchone()
        if row is None:
            raise NotFoundError("Event not found")
        return row

    def _to_event(self, row: sqlite3.Row) -> CalEvent:
        tz = self.clock.tz
        return CalEvent(
            id=str(row["id"]), calendar=LOCAL, title=row["title"], start=from_iso(row["start"]).astimezone(tz),
            end=from_iso(row["end"]).astimezone(tz), all_day=bool(row["all_day"]), location=row["location"], notes=row["notes"],
        )

    def _doc(self, conn: sqlite3.Connection, event_id: int) -> tuple[str, str] | None:
        row = conn.execute("SELECT * FROM calendar_events WHERE id = ?", (event_id,)).fetchone()
        if row is None or row["deleted_at"]:
            return None
        return row["title"], f"{row['start'][:10]} {row['location']} {row['notes']}"


def split_ref(ref: str) -> tuple[str, str]:
    """`local:12`, `caldav:abc.ics`, `ha:calendar.home:uid` → (source, native id)."""
    if ref.startswith("ha:"):
        parts = ref.split(":", 2)
        return f"ha:{parts[1]}", parts[2] if len(parts) > 2 else ""
    source, _, native = ref.partition(":")
    if not native:
        return LOCAL, source
    return source, native
