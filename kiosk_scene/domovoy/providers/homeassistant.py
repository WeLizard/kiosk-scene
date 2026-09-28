from __future__ import annotations

import datetime as dt
import fnmatch
import os
from pathlib import Path
from typing import Any, Callable
from urllib.parse import quote

from ..clock import UTC
from ..errors import ForbiddenError, ProviderError, ProviderNotConfigured, ValidationError
from ..text import similarity, tokens
from .base import HealthTracker, json_request
from .calendar_base import CalEvent

# Services the assistant may call unless the owner extends the list. Dangerous domains are deliberately absent.
DEFAULT_ALLOWED_SERVICES = [
    "light.turn_on", "light.turn_off", "light.toggle", "switch.turn_on", "switch.turn_off", "switch.toggle",
    "fan.turn_on", "fan.turn_off", "cover.open_cover", "cover.close_cover", "scene.turn_on",
]
ALWAYS_DENIED = ["homeassistant.stop", "homeassistant.restart", "hassio.*", "lock.*", "alarm_control_panel.*", "shell_command.*", "python_script.*"]

TOKEN_FILES = (Path("/run/s6/container_environment/SUPERVISOR_TOKEN"), Path("/run/s6/container_environment/HASSIO_TOKEN"))


def supervisor_token() -> str:
    token = os.environ.get("SUPERVISOR_TOKEN") or os.environ.get("HASSIO_TOKEN") or ""
    if token:
        return token.strip()
    for path in TOKEN_FILES:
        try:
            value = path.read_text(encoding="utf-8").strip()
        except OSError:
            continue
        if value:
            return value
    return ""


class HomeAssistantProvider:
    """Home Assistant REST adapter: read states, call *allow-listed* services, calendars, speaker output."""

    def __init__(self, url: Callable[[], str], token: Callable[[], str], health: HealthTracker,
                 allowed: Callable[[], list[str]] | None = None, timeout: float = 8.0) -> None:
        self._url, self._token, self.health, self._allowed, self.timeout = url, token, health, allowed or (lambda: DEFAULT_ALLOWED_SERVICES), timeout

    def configured(self) -> bool:
        return bool(self._url() and self._token())

    def _call(self, method: str, path: str, payload: Any = None) -> Any:
        token = self._token()
        if not token or not self._url():
            raise ProviderNotConfigured("home_assistant", "Home Assistant API access is not available")
        try:
            data = json_request(
                method, f"{self._url().rstrip('/')}/{path.lstrip('/')}", payload=payload,
                headers={"Authorization": f"Bearer {token}"}, timeout=self.timeout, provider="home_assistant", secrets=[token],
            )
        except ProviderError as exc:
            self.health.fail(exc, [token])
            raise
        self.health.ok()
        return data

    # ---- state -------------------------------------------------------------------------------

    def get_states(self) -> list[dict[str, Any]]:
        data = self._call("GET", "states")
        return [s for s in (data or []) if isinstance(s, dict)]

    def get_state(self, entity_id: str) -> dict[str, Any] | None:
        try:
            data = self._call("GET", f"states/{quote(entity_id, safe='._')}")
        except ProviderError as exc:
            if exc.code == "http_404":
                return None
            raise
        return data if isinstance(data, dict) else None

    def search_entities(self, hint: str, *, domains: list[str] | None = None, limit: int = 5) -> list[dict[str, Any]]:
        """Fuzzy match spoken names («принтер», «свет на кухне») to entities by friendly name / entity id."""
        hint_tokens = set(tokens(hint, drop_stopwords=True))
        scored = []
        for state in self.get_states():
            entity_id = state.get("entity_id", "")
            if domains and entity_id.split(".")[0] not in domains:
                continue
            name = str((state.get("attributes") or {}).get("friendly_name") or entity_id)
            name_tokens = set(tokens(name)) | set(tokens(entity_id.split(".", 1)[-1].replace("_", " ")))
            overlap = len(hint_tokens & name_tokens) / max(1, len(hint_tokens))
            score = max(overlap, similarity(hint, name) * 0.9)
            if score >= 0.5:
                scored.append((score, {"entity_id": entity_id, "name": name, "state": state.get("state"), "score": round(score, 3)}))
        scored.sort(key=lambda pair: pair[0], reverse=True)
        return [item for _, item in scored[:limit]]

    # ---- services ----------------------------------------------------------------------------

    def is_allowed(self, domain: str, service: str) -> bool:
        full = f"{domain}.{service}"
        if any(fnmatch.fnmatch(full, pattern) for pattern in ALWAYS_DENIED):
            return False
        return any(fnmatch.fnmatch(full, pattern) for pattern in self._allowed())

    def call_service(self, domain: str, service: str, data: dict[str, Any] | None = None, *, enforce_allowlist: bool = True) -> Any:
        if enforce_allowlist and not self.is_allowed(domain, service):
            raise ForbiddenError(f"Service {domain}.{service} is not allowed for the assistant", code="service_not_allowed")
        if not domain.isidentifier() or not service.replace("_", "").isalnum():
            raise ValidationError("Invalid service name")
        return self._call("POST", f"services/{domain}/{service}", data or {})

    # ---- calendars ---------------------------------------------------------------------------

    def list_calendars(self) -> list[dict[str, str]]:
        return [{"entity_id": c.get("entity_id", ""), "name": c.get("name", c.get("entity_id", ""))} for c in (self._call("GET", "calendars") or [])]

    def calendar_events(self, entity_id: str, start: dt.datetime, end: dt.datetime, tz: dt.tzinfo) -> list[CalEvent]:
        query = f"calendars/{quote(entity_id, safe='._')}?start={quote(start.astimezone(UTC).strftime('%Y-%m-%dT%H:%M:%SZ'))}&end={quote(end.astimezone(UTC).strftime('%Y-%m-%dT%H:%M:%SZ'))}"
        events = []
        for raw in self._call("GET", query) or []:
            start_value, end_value = raw.get("start", {}), raw.get("end", {})
            s, all_day = _ha_time(start_value, tz)
            e, _ = _ha_time(end_value, tz)
            if s is None:
                continue
            events.append(CalEvent(
                id=str(raw.get("uid") or f"{entity_id}:{s.isoformat()}"), calendar=f"ha:{entity_id}", title=str(raw.get("summary", "")),
                start=s, end=e or s + dt.timedelta(hours=1), all_day=all_day, location=str(raw.get("location", "") or ""),
                notes=str(raw.get("description", "") or ""), read_only=True,
            ))
        return events

    def create_calendar_event(self, entity_id: str, *, title: str, start: dt.datetime, end: dt.datetime, all_day: bool,
                              location: str = "", notes: str = "") -> None:
        data: dict[str, Any] = {"entity_id": entity_id, "summary": title}
        if all_day:
            data["start_date"], data["end_date"] = start.date().isoformat(), max(end.date(), start.date() + dt.timedelta(days=1)).isoformat()
        else:
            data["start_date_time"], data["end_date_time"] = start.strftime("%Y-%m-%d %H:%M:%S"), end.strftime("%Y-%m-%d %H:%M:%S")
        if location:
            data["location"] = location
        if notes:
            data["description"] = notes
        # calendar.create_event is a calendar-management service, not a device control one.
        self.call_service("calendar", "create_event", data, enforce_allowlist=False)


def _ha_time(value: Any, tz: dt.tzinfo) -> tuple[dt.datetime | None, bool]:
    if isinstance(value, str):
        value = {"dateTime": value} if "T" in value else {"date": value}
    if not isinstance(value, dict):
        return None, False
    try:
        if value.get("dateTime"):
            parsed = dt.datetime.fromisoformat(str(value["dateTime"]).replace("Z", "+00:00"))
            return (parsed if parsed.tzinfo else parsed.replace(tzinfo=tz)), False
        if value.get("date"):
            day = dt.date.fromisoformat(str(value["date"]))
            return dt.datetime(day.year, day.month, day.day, tzinfo=tz), True
    except ValueError:
        return None, False
    return None, False
