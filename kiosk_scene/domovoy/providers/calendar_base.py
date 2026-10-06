from __future__ import annotations

import datetime as dt
from dataclasses import asdict, dataclass
from typing import Protocol


@dataclass
class CalEvent:
    id: str                      # provider-native id (opaque to callers)
    calendar: str                # provider id
    title: str
    start: dt.datetime           # tz-aware
    end: dt.datetime
    all_day: bool = False
    location: str = ""
    notes: str = ""
    recurring: bool = False
    read_only: bool = False

    def public(self) -> dict:
        data = asdict(self)
        data["start"] = self.start.isoformat()
        data["end"] = self.end.isoformat()
        data["ref"] = f"{self.calendar}:{self.id}"
        return data


class CalendarProvider(Protocol):
    id: str
    title: str
    capabilities: set[str]        # subset of {"read", "create", "update", "delete"}

    def configured(self) -> bool: ...

    def list_events(self, start: dt.datetime, end: dt.datetime) -> list[CalEvent]: ...

    def create_event(self, *, title: str, start: dt.datetime, end: dt.datetime, all_day: bool, location: str = "", notes: str = "") -> CalEvent: ...

    def update_event(self, event_id: str, patch: dict) -> CalEvent: ...

    def delete_event(self, event_id: str) -> None: ...
