from __future__ import annotations

import datetime as dt
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError

UTC = dt.timezone.utc


def parse_tz(name: str) -> dt.tzinfo:
    try:
        return ZoneInfo(name)
    except (ZoneInfoNotFoundError, ValueError, KeyError):
        return UTC


def to_iso(value: dt.datetime) -> str:
    """UTC ISO-8601 with second precision: the only datetime format stored in the database."""
    if value.tzinfo is None:
        raise ValueError("naive datetime cannot be stored")
    return value.astimezone(UTC).replace(microsecond=0).strftime("%Y-%m-%dT%H:%M:%SZ")


def from_iso(value: str) -> dt.datetime:
    text = value.strip()
    if text.endswith("Z"):
        text = text[:-1] + "+00:00"
    parsed = dt.datetime.fromisoformat(text)
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=UTC)
    return parsed.astimezone(UTC)


class Clock:
    """Injectable time source. Tests use `FixedClock`; production uses the wall clock."""

    def __init__(self, tz: dt.tzinfo | str = UTC) -> None:
        self.tz: dt.tzinfo = parse_tz(tz) if isinstance(tz, str) else tz

    def now(self) -> dt.datetime:
        return dt.datetime.now(UTC)

    def local_now(self) -> dt.datetime:
        return self.now().astimezone(self.tz)

    def now_iso(self) -> str:
        return to_iso(self.now())

    def set_timezone(self, name: str) -> None:
        self.tz = parse_tz(name)


class FixedClock(Clock):
    def __init__(self, now: dt.datetime, tz: dt.tzinfo | str = UTC) -> None:
        super().__init__(tz)
        self._now = now if now.tzinfo else now.replace(tzinfo=self.tz)

    def now(self) -> dt.datetime:
        return self._now.astimezone(UTC)

    def set(self, now: dt.datetime) -> None:
        self._now = now if now.tzinfo else now.replace(tzinfo=self.tz)

    def advance(self, **kwargs: float) -> None:
        self._now = self._now + dt.timedelta(**kwargs)
