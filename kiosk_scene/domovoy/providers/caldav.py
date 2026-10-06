from __future__ import annotations

import base64
import datetime as dt
import uuid
import xml.etree.ElementTree as ET
from typing import Any, Callable
from urllib.parse import quote, urljoin, urlsplit

from ..clock import UTC
from ..errors import ProviderError, ProviderNotConfigured
from .base import HealthTracker, http_request
from .calendar_base import CalEvent
from .ical import build_calendar, parse_events, patch_calendar

NS = {"d": "DAV:", "c": "urn:ietf:params:xml:ns:caldav"}
MAX_XML = 4 * 1024 * 1024


class CalDavProvider:
    """CalDAV calendar collection (Nextcloud, Radicale, Baïkal, Yandex, iCloud, Google via CalDAV) with full CRUD.

    Configuration is the calendar *collection* URL plus credentials; no discovery magic that could pick the
    wrong calendar. Updates patch the existing VEVENT instead of replacing it, so attendees/alarms survive.
    """

    id = "caldav"
    title = "CalDAV"
    capabilities = {"read", "create", "update", "delete"}

    def __init__(self, config: Callable[[], dict[str, Any]], secret: Callable[[], str], health: HealthTracker,
                 tz: Callable[[], dt.tzinfo], clock: Any, timeout: float = 15.0) -> None:
        self._config, self._secret, self.health, self._tz, self._clock, self.timeout = config, secret, health, tz, clock, timeout

    # ---- plumbing ----------------------------------------------------------------------------

    def configured(self) -> bool:
        return bool(self._config().get("url"))

    def _base(self) -> str:
        url = str(self._config().get("url") or "")
        if not url:
            raise ProviderNotConfigured("caldav", "CalDAV calendar URL is not set")
        return url if url.endswith("/") else url + "/"

    def _headers(self, extra: dict[str, str] | None = None) -> dict[str, str]:
        cfg, secret = self._config(), self._secret()
        headers = dict(extra or {})
        if cfg.get("auth") == "bearer" and secret:
            headers["Authorization"] = f"Bearer {secret}"
        elif cfg.get("username"):
            token = base64.b64encode(f"{cfg['username']}:{secret}".encode()).decode()
            headers["Authorization"] = f"Basic {token}"
        return headers

    def _request(self, method: str, url: str, *, body: bytes | None = None, headers: dict[str, str] | None = None) -> tuple[int, dict[str, str], bytes]:
        secret = self._secret()
        try:
            result = http_request(method, url, headers=self._headers(headers), body=body, timeout=self.timeout, provider="caldav", secrets=[secret])
        except ProviderError as exc:
            self.health.fail(exc, [secret])
            raise
        self.health.ok()
        return result

    @staticmethod
    def _xml(data: bytes) -> ET.Element:
        if len(data) > MAX_XML or b"<!DOCTYPE" in data[:2048].upper() or b"<!ENTITY" in data.upper():
            raise ProviderError("caldav: refusing suspicious XML response", code="bad_response", retryable=False, provider="caldav")
        try:
            return ET.fromstring(data)
        except ET.ParseError:
            raise ProviderError("caldav: response is not valid XML", code="bad_response", retryable=True, provider="caldav") from None

    def _href_url(self, event_id: str) -> str:
        return urljoin(self._base(), event_id)

    # ---- operations --------------------------------------------------------------------------

    def test(self) -> dict[str, Any]:
        body = b'<?xml version="1.0"?><d:propfind xmlns:d="DAV:"><d:prop><d:displayname/><d:resourcetype/></d:prop></d:propfind>'
        status, _, data = self._request("PROPFIND", self._base(), body=body, headers={"Depth": "0", "Content-Type": "application/xml"})
        name = ""
        try:
            node = self._xml(data).find(".//d:displayname", NS)
            name = (node.text or "") if node is not None else ""
        except ProviderError:
            pass
        return {"status": status, "calendar": name}

    def list_events(self, start: dt.datetime, end: dt.datetime) -> list[CalEvent]:
        fmt = "%Y%m%dT%H%M%SZ"
        body = (
            '<?xml version="1.0" encoding="utf-8"?>'
            '<c:calendar-query xmlns:d="DAV:" xmlns:c="urn:ietf:params:xml:ns:caldav">'
            "<d:prop><d:getetag/><c:calendar-data/></d:prop>"
            '<c:filter><c:comp-filter name="VCALENDAR"><c:comp-filter name="VEVENT">'
            f'<c:time-range start="{start.astimezone(UTC).strftime(fmt)}" end="{end.astimezone(UTC).strftime(fmt)}"/>'
            "</c:comp-filter></c:comp-filter></c:filter></c:calendar-query>"
        ).encode()
        _, _, data = self._request("REPORT", self._base(), body=body, headers={"Depth": "1", "Content-Type": "application/xml; charset=utf-8"})
        root = self._xml(data)
        events: list[CalEvent] = []
        base_path = urlsplit(self._base()).path
        for response in root.findall("d:response", NS):
            href = (response.findtext("d:href", default="", namespaces=NS) or "").strip()
            calendar_data = response.findtext(".//c:calendar-data", default="", namespaces=NS)
            if not href or not calendar_data:
                continue
            relative = href[len(base_path):] if href.startswith(base_path) else href
            for parsed in parse_events(calendar_data, self._tz()):
                if parsed.end <= start or parsed.start >= end:
                    continue
                events.append(CalEvent(
                    id=relative, calendar=self.id, title=parsed.title, start=parsed.start, end=parsed.end,
                    all_day=parsed.all_day, location=parsed.location, notes=parsed.notes, recurring=parsed.recurring,
                    read_only=parsed.recurring,
                ))
        events.sort(key=lambda e: e.start)
        return events

    def create_event(self, *, title: str, start: dt.datetime, end: dt.datetime, all_day: bool, location: str = "", notes: str = "") -> CalEvent:
        uid = f"{uuid.uuid4()}@domovoy"
        resource = f"{quote(uid, safe='@-')}.ics"
        ics = build_calendar(uid=uid, title=title, start=start, end=end, all_day=all_day, location=location, notes=notes, now=self._clock.now())
        self._request("PUT", self._href_url(resource), body=ics.encode("utf-8"),
                      headers={"Content-Type": "text/calendar; charset=utf-8", "If-None-Match": "*"})
        return CalEvent(id=resource, calendar=self.id, title=title, start=start, end=end, all_day=all_day, location=location, notes=notes)

    def _fetch(self, event_id: str) -> tuple[str, str]:
        _, headers, data = self._request("GET", self._href_url(event_id), headers={"Accept": "text/calendar"})
        return data.decode("utf-8", "replace"), headers.get("etag", "")

    def update_event(self, event_id: str, patch: dict[str, Any]) -> CalEvent:
        text, etag = self._fetch(event_id)
        parsed = parse_events(text, self._tz())
        if not parsed:
            raise ProviderError("caldav: event not found", code="not_found", retryable=False, provider="caldav")
        current = parsed[0]
        if current.recurring:
            raise ProviderError("caldav: editing recurring events is not supported", code="unsupported", retryable=False, provider="caldav")
        start = patch.get("start", current.start)
        end = patch.get("end")
        if end is None and "start" in patch:
            end = start + (current.end - current.start)
        all_day = patch.get("all_day", current.all_day)
        updated = patch_calendar(
            text, title=patch.get("title"), start=patch.get("start"), end=end if ("start" in patch or "end" in patch) else None,
            all_day=patch.get("all_day"), location=patch.get("location"), notes=patch.get("notes"),
            original_all_day=current.all_day, now=self._clock.now(),
        )
        headers = {"Content-Type": "text/calendar; charset=utf-8"}
        if etag:
            headers["If-Match"] = etag
        self._request("PUT", self._href_url(event_id), body=updated.encode("utf-8"), headers=headers)
        return CalEvent(
            id=event_id, calendar=self.id, title=patch.get("title", current.title), start=start, end=end or current.end,
            all_day=all_day, location=patch.get("location", current.location), notes=patch.get("notes", current.notes),
        )

    def delete_event(self, event_id: str) -> None:
        self._request("DELETE", self._href_url(event_id))
