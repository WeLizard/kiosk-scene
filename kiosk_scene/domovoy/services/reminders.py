from __future__ import annotations

import datetime as dt
import logging
import sqlite3
from typing import Any

from ..clock import Clock, from_iso, to_iso
from ..db import Database, dumps, loads
from ..errors import DomovoyError, NotFoundError, ValidationError
from ..nlu.datetimes import next_occurrence, validate_recurrence
from .audit import AuditLog, row_to_dict
from .context import Ctx
from .delivery import CHANNELS, DeliveryService

LOG = logging.getLogger("domovoy.reminders")

TRIGGER_TYPES = ("presence", "room", "state")
STATES = ("pending", "fired", "done", "cancelled")


def validate_trigger(trigger: Any) -> dict[str, Any]:
    if not isinstance(trigger, dict) or trigger.get("type") not in TRIGGER_TYPES:
        raise ValidationError("Unknown trigger type", fields={"trigger": f"type must be one of {', '.join(TRIGGER_TYPES)}"})
    kind = trigger["type"]
    clean: dict[str, Any] = {"type": kind}
    if kind == "presence":
        person = str(trigger.get("person") or "")
        if not person.startswith("person."):
            raise ValidationError("Presence trigger needs a person.* entity", fields={"trigger": "person is required"})
        clean.update(person=person, place=str(trigger.get("place") or "home"))
    elif kind == "room":
        place = str(trigger.get("place") or "").strip()
        if not place:
            raise ValidationError("Room trigger needs a place name", fields={"trigger": "place is required"})
        clean["place"] = place[:80]
    else:
        entity = str(trigger.get("entity_id") or "")
        if entity.count(".") != 1:
            raise ValidationError("State trigger needs an entity_id", fields={"trigger": "entity_id is required"})
        clean["entity_id"] = entity
        for key in ("to", "from"):
            if trigger.get(key) not in (None, ""):
                clean[key] = str(trigger[key])[:80]
        if "to" not in clean and "from" not in clean:
            raise ValidationError("State trigger needs `to` or `from`", fields={"trigger": "to or from required"})
    clean["require_transition"] = bool(trigger.get("require_transition", kind != "presence" or trigger.get("require_transition", False)))
    window = trigger.get("window")
    if window:
        if not isinstance(window, dict) or not all(_hhmm(window.get(k)) for k in ("from", "to")):
            raise ValidationError("Window must be {from: HH:MM, to: HH:MM}", fields={"trigger": "invalid window"})
        clean["window"] = {"from": window["from"], "to": window["to"]}
    if trigger.get("_last") is not None:
        clean["_last"] = trigger["_last"]
    return clean


def _hhmm(value: Any) -> bool:
    try:
        hours, minutes = str(value).split(":")
        return 0 <= int(hours) <= 23 and 0 <= int(minutes) <= 59
    except ValueError:
        return False


class ReminderService:
    """Time reminders and context reminders (presence / room / device state) with delivery channel."""

    def __init__(self, db: Database, clock: Clock, audit: AuditLog, delivery: DeliveryService) -> None:
        self.db, self.clock, self.audit, self.delivery = db, clock, audit, delivery
        audit.on_undo("reminder", lambda conn, id_: None)

    def get(self, reminder_id: int) -> dict[str, Any]:
        with self.db.read() as conn:
            row = conn.execute("SELECT * FROM reminders WHERE id = ? AND deleted_at IS NULL", (reminder_id,)).fetchone()
        if row is None:
            raise NotFoundError("Reminder not found")
        return self._public(row)

    def list(self, *, states: list[str] | None = None, limit: int = 200) -> list[dict[str, Any]]:
        states = states or ["pending", "fired"]
        with self.db.read() as conn:
            rows = conn.execute(
                f"SELECT * FROM reminders WHERE deleted_at IS NULL AND state IN ({','.join('?' * len(states))}) "
                "ORDER BY state = 'fired' DESC, due_at IS NULL, due_at, id DESC LIMIT ?", (*states, limit)
            ).fetchall()
        return [self._public(r) for r in rows]

    def create(self, ctx: Ctx, *, text: str, due_at: dt.datetime | None = None, trigger: dict[str, Any] | None = None,
               recurrence: dict[str, Any] | None = None, channel: str = "speak", recipient: str = "self") -> dict[str, Any]:
        text = (text or "").strip()
        if not text:
            raise ValidationError("Text is required", fields={"text": "Required"})
        if channel not in CHANNELS:
            raise ValidationError("Unknown channel", fields={"channel": f"One of {', '.join(CHANNELS)}"})
        if due_at is None and trigger is None:
            raise ValidationError("A reminder needs a time or a trigger", fields={"due_at": "Time or trigger required"})
        if due_at is not None and due_at.tzinfo is None:
            raise ValidationError("Time must include a timezone", fields={"due_at": "Invalid"})
        clean_trigger = validate_trigger(trigger) if trigger else None
        recurrence = validate_recurrence(recurrence) if recurrence else None
        now = self.clock.now_iso()
        with self.db.write() as conn:
            cursor = conn.execute(
                """INSERT INTO reminders(text, kind, due_at, trigger, recurrence, channel, recipient, source, armed_at, created_at, updated_at)
                   VALUES (?,?,?,?,?,?,?,?,?,?,?)""",
                (text[:500], "context" if clean_trigger else "time", to_iso(due_at) if due_at else None,
                 dumps(clean_trigger) if clean_trigger else None, dumps(recurrence) if recurrence else None,
                 channel, recipient or "self", ctx.source, now, now, now),
            )
            reminder_id = int(cursor.lastrowid or 0)
            after = row_to_dict(conn.execute("SELECT * FROM reminders WHERE id = ?", (reminder_id,)).fetchone())
            self.audit.record(conn, ctx, "reminder", reminder_id, "create", None, after, f"Напоминание: {text[:60]}")
            self.db.emit(conn, "reminders.changed", {"id": reminder_id})
        return self.get(reminder_id)

    def update(self, ctx: Ctx, reminder_id: int, patch: dict[str, Any]) -> dict[str, Any]:
        with self.db.write() as conn:
            row = conn.execute("SELECT * FROM reminders WHERE id = ? AND deleted_at IS NULL", (reminder_id,)).fetchone()
            if row is None:
                raise NotFoundError("Reminder not found")
            before = row_to_dict(row)
            values: dict[str, Any] = {}
            if "text" in patch:
                text = str(patch["text"]).strip()
                if not text:
                    raise ValidationError("Text is required", fields={"text": "Required"})
                values["text"] = text[:500]
            if "due_at" in patch:
                due = patch["due_at"]
                if isinstance(due, dt.datetime):
                    values["due_at"] = to_iso(due)
                elif due:
                    try:
                        values["due_at"] = to_iso(from_iso(str(due)))    # normalised to UTC: a raw "+03:00" string sorts wrongly
                    except ValueError:
                        raise ValidationError("due_at must be ISO-8601 with a timezone", fields={"due_at": "Invalid"}) from None
                else:
                    values["due_at"] = None
            if "channel" in patch:
                if patch["channel"] not in CHANNELS:
                    raise ValidationError("Unknown channel", fields={"channel": "Invalid"})
                values["channel"] = patch["channel"]
            if "recipient" in patch:
                values["recipient"] = str(patch["recipient"] or "self")[:80]
            if "state" in patch:
                if patch["state"] not in STATES:
                    raise ValidationError("Unknown state", fields={"state": "Invalid"})
                values["state"] = patch["state"]
            if "trigger" in patch:
                values["trigger"] = dumps(validate_trigger(patch["trigger"])) if patch["trigger"] else None
            if not values:
                return self._public(row)
            values["updated_at"] = self.clock.now_iso()
            conn.execute(f"UPDATE reminders SET {', '.join(f'{k} = ?' for k in values)} WHERE id = ?", (*values.values(), reminder_id))
            after = row_to_dict(conn.execute("SELECT * FROM reminders WHERE id = ?", (reminder_id,)).fetchone())
            self.audit.record(conn, ctx, "reminder", reminder_id, "update", before, after, f"Напоминание «{row['text'][:40]}» изменено")
            self.db.emit(conn, "reminders.changed", {"id": reminder_id})
        return self.get(reminder_id)

    def complete(self, ctx: Ctx, reminder_id: int) -> dict[str, Any]:
        return self.update(ctx, reminder_id, {"state": "done"})

    def snooze(self, ctx: Ctx, reminder_id: int, minutes: int = 10) -> dict[str, Any]:
        if not 1 <= minutes <= 7 * 24 * 60:
            raise ValidationError("Snooze must be 1 minute to 7 days", fields={"minutes": "Out of range"})
        due = self.clock.now() + dt.timedelta(minutes=minutes)
        return self.update(ctx, reminder_id, {"state": "pending", "due_at": due})

    def delete(self, ctx: Ctx, reminder_id: int) -> None:
        with self.db.write() as conn:
            row = conn.execute("SELECT * FROM reminders WHERE id = ? AND deleted_at IS NULL", (reminder_id,)).fetchone()
            if row is None:
                raise NotFoundError("Reminder not found")
            now = self.clock.now_iso()
            before = row_to_dict(row)
            conn.execute("UPDATE reminders SET deleted_at = ?, updated_at = ? WHERE id = ?", (now, now, reminder_id))
            after = row_to_dict(conn.execute("SELECT * FROM reminders WHERE id = ?", (reminder_id,)).fetchone())
            self.audit.record(conn, ctx, "reminder", reminder_id, "delete", before, after, f"Напоминание «{row['text'][:40]}» удалено")
            self.db.emit(conn, "reminders.changed", {"id": reminder_id})

    # ---- firing (called by the scheduler) ------------------------------------------------------

    def due_time_reminders(self) -> list[dict[str, Any]]:
        with self.db.read() as conn:
            rows = conn.execute(
                "SELECT * FROM reminders WHERE deleted_at IS NULL AND kind = 'time' AND state = 'pending' AND due_at <= ? ORDER BY due_at",
                (self.clock.now_iso(),),
            ).fetchall()
        return [self._public(r) for r in rows]

    def armed_context_reminders(self) -> list[dict[str, Any]]:
        with self.db.read() as conn:
            rows = conn.execute("SELECT * FROM reminders WHERE deleted_at IS NULL AND kind = 'context' AND state = 'pending'").fetchall()
        return [self._public(r) for r in rows]

    def store_trigger_memory(self, reminder_id: int, trigger: dict[str, Any]) -> None:
        """Persist what the trigger last saw so a restart does not re-fire or miss a transition."""
        with self.db.write() as conn:
            conn.execute("UPDATE reminders SET trigger = ? WHERE id = ?", (dumps(trigger), reminder_id))

    def fire(self, reminder: dict[str, Any], ctx: Ctx | None = None) -> dict[str, Any]:
        """Deliver a reminder, then advance its state. Delivery failures leave it `pending` for the next tick."""
        ctx = ctx or Ctx(actor="system", source="scheduler")
        reminder_id = int(reminder["id"])
        fired_at = self.clock.now()
        # Work out the next occurrence *before* delivering anything: a rule that cannot be evaluated (stored by an
        # older version, edited in the database) is treated as "no repeat" instead of raising after the message has
        # been sent and re-sending it on every tick.
        rule = reminder.get("recurrence")
        upcoming = None
        if rule and reminder.get("due_at"):
            try:
                rule = validate_recurrence(rule)
                upcoming = next_occurrence(rule, from_iso(reminder["due_at"]).astimezone(self.clock.tz))
                guard = 0
                while upcoming is not None and upcoming <= fired_at.astimezone(self.clock.tz) and guard < 1000:
                    upcoming = next_occurrence(rule, upcoming)
                    guard += 1
            except (DomovoyError, ValueError, TypeError, OverflowError) as exc:
                LOG.warning("Reminder %s has an unusable recurrence rule, firing once: %s", reminder_id, exc)
                rule, upcoming = None, None
        key = f"reminder:{reminder_id}:{to_iso(fired_at)[:16]}"
        delivery_note = ""
        try:
            self.delivery.send(ctx, channel=reminder["channel"], recipient=reminder["recipient"], text=reminder["text"], key=key, mood="alert")
        except ValidationError as exc:
            # e.g. the contact was deleted or has no address: never lose the reminder – show it on screen and say why.
            delivery_note = f" (доставка не удалась: {exc.message})"
            self.delivery.send(ctx, channel="ui", recipient="self", text=f"{reminder['text']}{delivery_note}", key=key + ":ui")
        with self.db.write() as conn:
            if rule and reminder.get("due_at"):
                conn.execute("UPDATE reminders SET due_at = ?, fired_at = ?, updated_at = ? WHERE id = ?",
                             (to_iso(upcoming) if upcoming else None, to_iso(fired_at), to_iso(fired_at), reminder_id))
                if upcoming is None:
                    conn.execute("UPDATE reminders SET state = 'fired' WHERE id = ?", (reminder_id,))
            else:
                conn.execute("UPDATE reminders SET state = 'fired', fired_at = ?, updated_at = ? WHERE id = ?",
                             (to_iso(fired_at), to_iso(fired_at), reminder_id))
            self.audit.record(conn, ctx, "reminder", reminder_id, "fire", None, None,
                              f"Сработало: {reminder['text'][:60]}{delivery_note}", undoable=False)
            self.db.emit(conn, "reminders.fired", {"id": reminder_id, "text": reminder["text"]})
        return self.get(reminder_id)

    @staticmethod
    def _public(row: sqlite3.Row) -> dict[str, Any]:
        data = row_to_dict(row) or {}
        data["trigger"] = loads(data.get("trigger"), None)
        data["recurrence"] = loads(data.get("recurrence"), None)
        return data
