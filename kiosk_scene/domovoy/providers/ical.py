"""Minimal iCalendar (RFC 5545) reader/writer for VEVENT: enough for CalDAV CRUD without dependencies."""
from __future__ import annotations

import logging
import datetime as dt
import re
import uuid
from dataclasses import dataclass, field
from typing import Any

from ..clock import UTC, parse_tz


@dataclass
class ICalEvent:
    uid: str
    title: str
    start: dt.datetime            # tz-aware; for all-day events midnight in `tz`
    end: dt.datetime
    all_day: bool = False
    location: str = ""
    notes: str = ""
    recurring: bool = False
    raw_props: list[str] = field(default_factory=list)


def unfold(text: str) -> list[str]:
    lines: list[str] = []
    for raw in text.replace("\r\n", "\n").replace("\r", "\n").split("\n"):
        if raw[:1] in (" ", "\t") and lines:
            lines[-1] += raw[1:]
        else:
            lines.append(raw)
    return lines


def fold(line: str) -> str:
    data = line.encode("utf-8")
    if len(data) <= 75:
        return line
    parts, current = [], b""
    for char in line:
        encoded = char.encode("utf-8")
        limit = 75 if not parts else 74
        if len(current) + len(encoded) > limit:
            parts.append(current.decode("utf-8"))
            current = b""
        current += encoded
    parts.append(current.decode("utf-8"))
    return "\r\n ".join(parts)


def escape(text: str) -> str:
    return text.replace("\\", "\\\\").replace(";", "\;").replace(",", "\\,").replace("\r\n", "\\n").replace("\n", "\\n")


def unescape(text: str) -> str:
    out, i = [], 0
    while i < len(text):
        if text[i] == "\\" and i + 1 < len(text):
            nxt = text[i + 1]
            out.append("\n" if nxt in "nN" else nxt)
            i += 2
        else:
            out.append(text[i])
            i += 1
    return "".join(out)


def _split_prop(line: str) -> tuple[str, dict[str, str], str]:
    head, _, value = line.partition(":")
    name, *params = head.split(";")
    parsed = {}
    for param in params:
        key, _, val = param.partition("=")
        parsed[key.upper()] = val.strip('"')
    return name.upper(), parsed, value


def _parse_dt(value: str, params: dict[str, str], default_tz: dt.tzinfo) -> tuple[dt.datetime, bool]:
    value = value.strip()
    if params.get("VALUE") == "DATE" or re.fullmatch(r"\d{8}", value):
        day = dt.datetime.strptime(value[:8], "%Y%m%d")
        return day.replace(tzinfo=default_tz), True
    if value.endswith("Z"):
        return dt.datetime.strptime(value, "%Y%m%dT%H%M%SZ").replace(tzinfo=UTC), False
    naive = dt.datetime.strptime(value[:15], "%Y%m%dT%H%M%S")
    tzid = params.get("TZID")
    return naive.replace(tzinfo=parse_tz(tzid) if tzid else default_tz), False


def parse_events(text: str, default_tz: dt.tzinfo = UTC) -> list[ICalEvent]:
    events: list[ICalEvent] = []
    current: dict[str, Any] | None = None
    depth = 0
    for line in unfold(text):
        if not line.strip():
            continue
        upper = line.strip().upper()
        if upper == "BEGIN:VEVENT" and current is None:
            current, depth = {"props": []}, 0
            continue
        if current is None:
            continue
        if upper.startswith("BEGIN:"):
            depth += 1
            continue
        if upper.startswith("END:"):
            if depth > 0:
                depth -= 1
                continue
            if upper == "END:VEVENT":
                try:
                    event = _build(current, default_tz)
                except (ValueError, OverflowError) as exc:
                    # a server's malformed VEVENT (odd date format, ...) is skipped, the rest of the calendar is kept
                    logging.getLogger("domovoy.ical").warning("Skipping malformed VEVENT: %s", exc)
                    event = None
                if event:
                    events.append(event)
                current = None
            continue
        if depth == 0:
            current["props"].append(line)
    return events


def _build(data: dict[str, Any], default_tz: dt.tzinfo) -> ICalEvent | None:
    fields: dict[str, tuple[dict[str, str], str]] = {}
    for line in data["props"]:
        name, params, value = _split_prop(line)
        fields.setdefault(name, (params, value))
    if "DTSTART" not in fields:
        return None
    start, all_day = _parse_dt(fields["DTSTART"][1], fields["DTSTART"][0], default_tz)
    if "DTEND" in fields:
        end, _ = _parse_dt(fields["DTEND"][1], fields["DTEND"][0], default_tz)
    elif "DURATION" in fields:
        end = start + _parse_duration(fields["DURATION"][1])
    else:
        end = start + (dt.timedelta(days=1) if all_day else dt.timedelta(hours=1))
    return ICalEvent(
        uid=unescape(fields.get("UID", ({}, str(uuid.uuid4())))[1]),
        title=unescape(fields.get("SUMMARY", ({}, ""))[1]),
        start=start, end=end, all_day=all_day,
        location=unescape(fields.get("LOCATION", ({}, ""))[1]),
        notes=unescape(fields.get("DESCRIPTION", ({}, ""))[1]),
        recurring="RRULE" in fields or "RECURRENCE-ID" in fields,
        raw_props=data["props"],
    )


def _parse_duration(value: str) -> dt.timedelta:
    match = re.fullmatch(r"P(?:(\d+)W)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?", value.strip())
    if not match:
        return dt.timedelta(hours=1)
    weeks, days, hours, minutes, seconds = (int(g or 0) for g in match.groups())
    return dt.timedelta(weeks=weeks, days=days, hours=hours, minutes=minutes, seconds=seconds)


def _fmt_dt(value: dt.datetime, all_day: bool) -> str:
    if all_day:
        return f";VALUE=DATE:{value.strftime('%Y%m%d')}"
    return f":{value.astimezone(UTC).strftime('%Y%m%dT%H%M%SZ')}"


def build_calendar(*, uid: str, title: str, start: dt.datetime, end: dt.datetime, all_day: bool, location: str = "",
                   notes: str = "", now: dt.datetime | None = None) -> str:
    stamp = (now or dt.datetime.now(UTC)).astimezone(UTC).strftime("%Y%m%dT%H%M%SZ")
    lines = [
        "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Domovoy//KioskScene//EN", "CALSCALE:GREGORIAN", "BEGIN:VEVENT",
        f"UID:{uid}", f"DTSTAMP:{stamp}", f"DTSTART{_fmt_dt(start, all_day)}", f"DTEND{_fmt_dt(end, all_day)}",
        f"SUMMARY:{escape(title)}",
    ]
    if location:
        lines.append(f"LOCATION:{escape(location)}")
    if notes:
        lines.append(f"DESCRIPTION:{escape(notes)}")
    lines += ["END:VEVENT", "END:VCALENDAR"]
    return "\r\n".join(fold(line) for line in lines) + "\r\n"


def patch_calendar(text: str, *, title: str | None = None, start: dt.datetime | None = None, end: dt.datetime | None = None,
                   all_day: bool | None = None, location: str | None = None, notes: str | None = None,
                   original_all_day: bool = False, now: dt.datetime | None = None) -> str:
    """Change only the named VEVENT properties and keep everything else (attendees, alarms, X- props…)."""
    lines = unfold(text)
    out: list[str] = []
    in_event, depth = False, 0
    handled = {"SUMMARY": title, "LOCATION": location, "DESCRIPTION": notes}
    replaced: set[str] = set()
    effective_all_day = original_all_day if all_day is None else all_day
    for line in lines:
        upper = line.strip().upper()
        if upper == "BEGIN:VEVENT":
            in_event = True
            out.append(line)
            continue
        if in_event and upper.startswith("BEGIN:"):
            depth += 1
        elif in_event and upper.startswith("END:") and depth > 0:
            depth -= 1
        elif in_event and upper == "END:VEVENT":
            for name, value in handled.items():
                if value is not None and name not in replaced and value != "":
                    out.append(f"{name}:{escape(value)}")
            if start is not None and "DTSTART" not in replaced:
                out.append(f"DTSTART{_fmt_dt(start, effective_all_day)}")
            if end is not None and "DTEND" not in replaced:
                out.append(f"DTEND{_fmt_dt(end, effective_all_day)}")
            out.append(line)
            in_event = False
            continue
        if in_event and depth == 0 and line.strip():
            name = _split_prop(line)[0]
            if name in handled and handled[name] is not None:
                replaced.add(name)
                if handled[name] != "":
                    out.append(f"{name}:{escape(handled[name] or '')}")
                continue
            if name == "DTSTART" and start is not None:
                replaced.add("DTSTART")
                out.append(f"DTSTART{_fmt_dt(start, effective_all_day)}")
                continue
            if name in ("DTEND", "DURATION") and (end is not None or start is not None):
                if end is not None:
                    replaced.add("DTEND")
                    out.append(f"DTEND{_fmt_dt(end, effective_all_day)}")
                continue
            if name == "DTSTAMP":
                out.append(f"DTSTAMP:{(now or dt.datetime.now(UTC)).astimezone(UTC).strftime('%Y%m%dT%H%M%SZ')}")
                continue
        out.append(line)
    return "\r\n".join(fold(line) for line in out) + "\r\n"
