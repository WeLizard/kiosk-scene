from __future__ import annotations

import datetime as dt
from typing import Any

from .presence import ACTIVE_LIKE, in_window
from .reminders import ReminderService


def evaluate_trigger(trigger: dict[str, Any], states: dict[str, dict[str, Any]], local_now: dt.datetime,
                     place_entry: dict[str, Any] | None) -> tuple[bool, dict[str, Any]]:
    """Pure decision function. Returns `(fires, memory)`; `memory` is stored on the reminder for the next tick.

    Transition-based triggers need to know what they saw *last time*; the very first evaluation only records a
    baseline (it never fires on the state the reminder was created in, unless `require_transition` is false and
    the condition is already true).
    """
    kind = trigger["type"]
    last = trigger.get("_last") or {}
    first_look = "value" not in last
    window_ok = in_window(local_now, trigger.get("window"))
    require_transition = bool(trigger.get("require_transition"))

    if kind == "presence":
        state = states.get(trigger["person"])
        if state is None:
            return False, last
        value = str(state.get("state")) == trigger.get("place", "home")
        prev = last.get("value")
    elif kind == "room":
        if place_entry is None:
            return False, last
        state = states.get(str(place_entry.get("entity_id", "")))
        if state is None:
            return False, last
        value = str(state.get("state")) == str(place_entry.get("state", "on"))
        prev = last.get("value")
    else:  # state
        state = states.get(trigger["entity_id"])
        if state is None:
            return False, last
        current = str(state.get("state"))
        value = current
        prev = last.get("value")
        memory = {"value": current}
        if first_look:
            return False, memory
        changed = current != prev
        if not changed:
            return False, memory
        if "to" in trigger and current != trigger["to"]:
            return False, memory
        if "from" in trigger and prev != trigger["from"]:
            return False, memory
        return True, memory

    memory = {"value": value}
    if not value or not window_ok:
        return False, memory
    if require_transition and (first_look or prev is True):
        return False, memory
    return True, memory


def looks_active(state: str) -> bool:
    return str(state).lower() in ACTIVE_LIKE


class TriggerEngine:
    """Evaluates armed context reminders against a Home Assistant snapshot."""

    def __init__(self, reminders: ReminderService, presence: Any, clock: Any) -> None:
        self.reminders, self.presence, self.clock = reminders, presence, clock

    def run_once(self) -> list[int]:
        armed = self.reminders.armed_context_reminders()
        if not armed:
            return []
        states = self.presence.states(fresh=True)
        fired: list[int] = []
        for reminder in armed:
            trigger = dict(reminder["trigger"] or {})
            entry = self.presence.place_entry(trigger.get("place", "")) if trigger.get("type") == "room" else None
            fires, memory = evaluate_trigger(trigger, states, self.clock.local_now(), entry)
            if memory != trigger.get("_last"):
                trigger["_last"] = memory
                self.reminders.store_trigger_memory(reminder["id"], trigger)
            if fires:
                self.reminders.fire(reminder)
                fired.append(reminder["id"])
        return fired
