from __future__ import annotations

import datetime as dt
import json
import logging
import re
import time
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from typing import Any, Callable
from urllib.parse import parse_qs, unquote, urlsplit

from . import __version__
from .auth import Authenticator, MUTATING, Principal
from .backup import create_backup, export_data, import_data, list_backups
from .clock import from_iso, to_iso
from .errors import DomovoyError, NotFoundError, PayloadTooLarge, ProviderError, UnauthorizedError, ValidationError
from .services.context import Ctx

LOG = logging.getLogger("domovoy.api")
MAX_JSON_BYTES = 1024 * 1024
MAX_AUDIO_BYTES = 4 * 1024 * 1024
WRITABLE_SECRETS = ("telegram_token", "caldav_password", "ha_token", "llm_api_key")
ROTATABLE = ("api_token", "alice_secret", "assist_secret")


class Request:
    def __init__(self, method: str, path: str, query: dict[str, str], headers: Any, body: bytes, principal: Principal | None, remote_ip: str) -> None:
        self.method, self.path, self.query, self.headers, self.body = method, path, query, headers, body
        self.principal, self.remote_ip = principal, remote_ip
        self.params: dict[str, str] = {}

    def json(self) -> dict[str, Any]:
        if not self.body:
            return {}
        content_type = (self.headers.get("Content-Type") or "").split(";")[0].strip().lower()
        if content_type != "application/json":
            raise ValidationError("Content-Type must be application/json", code="bad_content_type")
        try:
            data = json.loads(self.body.decode("utf-8"))
        except (ValueError, UnicodeDecodeError):
            raise ValidationError("Body is not valid JSON", code="bad_json") from None
        if not isinstance(data, dict):
            raise ValidationError("Body must be a JSON object", code="bad_json")
        return data

    def int_param(self, name: str) -> int:
        return int(self.params[name])

    def q_int(self, name: str, default: int, low: int = 0, high: int = 10_000) -> int:
        try:
            return max(low, min(high, int(self.query.get(name, default))))
        except ValueError:
            raise ValidationError(f"{name} must be an integer", fields={name: "Not a number"}) from None

    def ctx(self, source: str = "ui") -> Ctx:
        return Ctx(actor="user", source=source)


class Router:
    def __init__(self) -> None:
        self.routes: list[tuple[str, re.Pattern[str], Callable[[Request], Any], str]] = []

    def add(self, method: str, pattern: str, handler: Callable[[Request], Any], *, auth: str = "user") -> None:
        self.routes.append((method, re.compile(f"^{pattern}$"), handler, auth))

    def match(self, method: str, path: str) -> tuple[Callable[[Request], Any], dict[str, str], str] | None | str:
        allowed = False
        for route_method, regex, handler, auth in self.routes:
            m = regex.match(path)
            if not m:
                continue
            if route_method != method:
                allowed = True
                continue
            return handler, m.groupdict(), auth
        return "method" if allowed else None


def build_router(ctx: "ApiContext") -> Router:
    app, pipeline, voice = ctx.app, ctx.pipeline, ctx.voice
    r = Router()

    def iso_param(req: Request, name: str, default: dt.datetime) -> dt.datetime:
        raw = req.query.get(name)
        if not raw:
            return default
        try:
            value = from_iso(raw) if "T" in raw else dt.datetime.fromisoformat(raw).replace(tzinfo=app.clock.tz)
        except ValueError:
            raise ValidationError(f"{name} must be an ISO date/time", fields={name: "Invalid"}) from None
        return value

    # ---- health, state -------------------------------------------------------------------------
    r.add("GET", "/health", lambda req: {"status": "ok", "version": __version__}, auth="public")

    def state(req: Request) -> dict[str, Any]:
        with app.db.read() as conn:
            def count(sql: str) -> int:
                return int(conn.execute(sql).fetchone()[0])
            counts = {
                "items": count("SELECT COUNT(*) FROM items WHERE deleted_at IS NULL"),
                "locations": count("SELECT COUNT(*) FROM locations WHERE deleted_at IS NULL"),
                "notes": count("SELECT COUNT(*) FROM notes WHERE deleted_at IS NULL"),
                "tasks_open": count("SELECT COUNT(*) FROM tasks WHERE deleted_at IS NULL AND done_at IS NULL"),
                "reminders_pending": count("SELECT COUNT(*) FROM reminders WHERE deleted_at IS NULL AND state = 'pending'"),
                "reminders_fired": count("SELECT COUNT(*) FROM reminders WHERE deleted_at IS NULL AND state = 'fired'"),
                "review_pending": count("SELECT COUNT(*) FROM review_queue WHERE status = 'pending'"),
            }
        return {"version": __version__, "now": app.clock.now_iso(), "timezone": str(app.clock.tz), "counts": counts,
                "outbox": app.outbox.counts(), "integrations": app.integrations(), "cursor": app.db.latest_seq}
    r.add("GET", "/api/state", state)

    def today(req: Request) -> dict[str, Any]:
        now = app.clock.local_now()
        midnight = now.replace(hour=0, minute=0, second=0, microsecond=0)
        events = app.calendar.list_events(midnight, midnight + dt.timedelta(days=2))
        tasks = app.tasks.list(include_done=False, limit=200)
        with app.db.read() as conn:
            review = int(conn.execute("SELECT COUNT(*) FROM review_queue WHERE status = 'pending'").fetchone()[0])
        return {
            "now": to_iso(now), "timezone": str(app.clock.tz), "events": events["events"], "warnings": events["warnings"],
            "reminders": app.reminders.list(states=["pending", "fired"], limit=12),
            "tasks": [t for t in tasks if t["list"] != "shopping"][:12], "shopping": [t for t in tasks if t["list"] == "shopping"][:20],
            "review_count": review, "recent": app.commands.list(limit=6), "outbox": app.outbox.counts(),
        }
    r.add("GET", "/api/today", today)

    # ---- commands ------------------------------------------------------------------------------
    def command(req: Request) -> dict[str, Any]:
        body = req.json()
        ctx.scheduler.last_activity_at = time.monotonic()
        return pipeline.handle(str(body.get("text") or ""), frontend="web", session_id=str(body.get("session_id") or "") or None,
                               room=str(body.get("room") or "") or None)
    r.add("POST", "/api/command", command)
    r.add("GET", "/api/commands", lambda req: {"commands": app.commands.list(req.q_int("limit", 50, 1, 200), req.q_int("before_id", 0) or None)})
    r.add("POST", r"/api/commands/(?P<id>\d+)/undo", lambda req: {"undone": app.audit.undo_command(req.int_param("id"), req.ctx())})

    # ---- search --------------------------------------------------------------------------------
    def search(req: Request) -> dict[str, Any]:
        kinds = [k for k in req.query.get("kinds", "").split(",") if k] or None
        return app.search.search(req.query.get("q", ""), kinds=kinds, limit=req.q_int("limit", 20, 1, 50))
    r.add("GET", "/api/search", search)

    # ---- items and locations -------------------------------------------------------------------
    def resolve_location(body: dict[str, Any], req: Request) -> int | None:
        if body.get("location_path"):
            path = body["location_path"]
            if not isinstance(path, list) or not all(isinstance(x, str) for x in path) or len(path) > 8:
                raise ValidationError("location_path must be a list of names", fields={"location_path": "Invalid"})
            leaf, _, _ = app.locations.resolve_path(path, create=True, ctx=req.ctx())
            return leaf
        value = body.get("location_id")
        return int(value) if value not in (None, "") else None

    def items_list(req: Request) -> dict[str, Any]:
        loc = req.query.get("location_id")
        return {"items": app.items.list(location_id=int(loc) if loc else None, q=req.query.get("q", ""), limit=req.q_int("limit", 200, 1, 1000),
                                        offset=req.q_int("offset", 0), include_empty=req.query.get("include_empty", "1") != "0")}
    r.add("GET", "/api/items", items_list)

    def items_create(req: Request) -> dict[str, Any]:
        body = req.json()
        item, outcome = app.items.create(req.ctx(), name=str(body.get("name", "")), quantity=body.get("quantity"), unit=str(body.get("unit", "")),
                                         location_id=resolve_location(body, req), properties=body.get("properties"), notes=str(body.get("notes", "")),
                                         category=str(body.get("category", "")), mode=body.get("mode", "set"), merge=bool(body.get("merge", False)))
        return {"item": item, "outcome": outcome}
    r.add("POST", "/api/items", items_create)
    r.add("GET", r"/api/items/(?P<id>\d+)", lambda req: {"item": app.items.get(req.int_param("id"))})

    def items_patch(req: Request) -> dict[str, Any]:
        body = req.json()
        if "location_path" in body:
            body["location_id"] = resolve_location(body, req)
        return {"item": app.items.update(req.ctx(), req.int_param("id"), body)}
    r.add("PATCH", r"/api/items/(?P<id>\d+)", items_patch)

    def items_delete(req: Request) -> dict[str, Any]:
        app.items.delete(req.ctx(), req.int_param("id"))
        return {"ok": True}
    r.add("DELETE", r"/api/items/(?P<id>\d+)", items_delete)
    r.add("POST", r"/api/items/(?P<id>\d+)/move", lambda req: {"item": app.items.move(req.ctx(), req.int_param("id"), resolve_location(req.json(), req))})
    r.add("POST", r"/api/items/(?P<id>\d+)/consume", lambda req: {"item": app.items.consume(req.ctx(), req.int_param("id"), req.json().get("quantity"))})
    r.add("GET", r"/api/items/(?P<id>\d+)/history", lambda req: {"history": app.audit.list(entity_type="item", entity_id=req.int_param("id"), limit=100)})

    r.add("GET", "/api/locations", lambda req: {"locations": app.locations.list_flat()})
    r.add("GET", "/api/locations/tree", lambda req: {"tree": app.locations.tree()})
    r.add("POST", "/api/locations", lambda req: {"location": app.locations.create(req.ctx(), name=str(req.json().get("name", "")),
          parent_id=req.json().get("parent_id"), kind=req.json().get("kind", "place"), notes=str(req.json().get("notes", "")))})
    r.add("PATCH", r"/api/locations/(?P<id>\d+)", lambda req: {"location": app.locations.update(req.ctx(), req.int_param("id"), req.json())})

    def location_delete(req: Request) -> dict[str, Any]:
        app.locations.delete(req.ctx(), req.int_param("id"))
        return {"ok": True}
    r.add("DELETE", r"/api/locations/(?P<id>\d+)", location_delete)

    # ---- notes, tasks ---------------------------------------------------------------------------
    r.add("GET", "/api/notes", lambda req: {"notes": app.notes.list(q=req.query.get("q", ""))})
    r.add("POST", "/api/notes", lambda req: {"note": app.notes.create(req.ctx(), body=str(req.json().get("body", "")), title=str(req.json().get("title", "")), tags=req.json().get("tags"))})
    r.add("PATCH", r"/api/notes/(?P<id>\d+)", lambda req: {"note": app.notes.update(req.ctx(), req.int_param("id"), req.json())})

    def note_delete(req: Request) -> dict[str, Any]:
        app.notes.delete(req.ctx(), req.int_param("id"))
        return {"ok": True}
    r.add("DELETE", r"/api/notes/(?P<id>\d+)", note_delete)

    r.add("GET", "/api/tasks", lambda req: {"tasks": app.tasks.list(list_name=req.query.get("list") or None, include_done=req.query.get("include_done") == "1")})

    def task_create(req: Request) -> dict[str, Any]:
        body = req.json()
        task, created = app.tasks.create(req.ctx(), title=str(body.get("title", "")), list_name=body.get("list", "tasks"), due_date=body.get("due_date"),
                                         notes=str(body.get("notes", "")), recurrence=body.get("recurrence"))
        return {"task": task, "created": created}
    r.add("POST", "/api/tasks", task_create)
    r.add("PATCH", r"/api/tasks/(?P<id>\d+)", lambda req: {"task": app.tasks.update(req.ctx(), req.int_param("id"), req.json())})
    r.add("POST", r"/api/tasks/(?P<id>\d+)/complete", lambda req: {"task": app.tasks.update(req.ctx(), req.int_param("id"), {"done": req.json().get("done", True)})})

    def task_delete(req: Request) -> dict[str, Any]:
        app.tasks.delete(req.ctx(), req.int_param("id"))
        return {"ok": True}
    r.add("DELETE", r"/api/tasks/(?P<id>\d+)", task_delete)

    # ---- reminders ------------------------------------------------------------------------------
    r.add("GET", "/api/reminders", lambda req: {"reminders": app.reminders.list(states=[s for s in req.query.get("states", "pending,fired").split(",") if s])})

    def reminder_create(req: Request) -> dict[str, Any]:
        body = req.json()
        due = None
        if body.get("due_at"):
            try:
                due = from_iso(str(body["due_at"]))
            except ValueError:
                raise ValidationError("due_at must be ISO-8601 with timezone", fields={"due_at": "Invalid"}) from None
        return {"reminder": app.reminders.create(req.ctx(), text=str(body.get("text", "")), due_at=due, trigger=body.get("trigger"),
                                                 recurrence=body.get("recurrence"), channel=body.get("channel", "ui"), recipient=str(body.get("recipient") or "self"))}
    r.add("POST", "/api/reminders", reminder_create)
    r.add("PATCH", r"/api/reminders/(?P<id>\d+)", lambda req: {"reminder": app.reminders.update(req.ctx(), req.int_param("id"), req.json())})
    r.add("POST", r"/api/reminders/(?P<id>\d+)/done", lambda req: {"reminder": app.reminders.complete(req.ctx(), req.int_param("id"))})
    r.add("POST", r"/api/reminders/(?P<id>\d+)/snooze", lambda req: {"reminder": app.reminders.snooze(req.ctx(), req.int_param("id"), int(req.json().get("minutes", 10)))})

    def reminder_delete(req: Request) -> dict[str, Any]:
        app.reminders.delete(req.ctx(), req.int_param("id"))
        return {"ok": True}
    r.add("DELETE", r"/api/reminders/(?P<id>\d+)", reminder_delete)

    # ---- calendar -------------------------------------------------------------------------------
    def cal_list(req: Request) -> dict[str, Any]:
        now = app.clock.local_now().replace(hour=0, minute=0, second=0, microsecond=0)
        start = iso_param(req, "start", now)
        end = iso_param(req, "end", start + dt.timedelta(days=14))
        if end <= start or end - start > dt.timedelta(days=400):
            raise ValidationError("Range must be positive and at most 400 days", fields={"end": "Invalid range"})
        return app.calendar.list_events(start, end)
    r.add("GET", "/api/calendar/events", cal_list)
    r.add("GET", "/api/calendar/sources", lambda req: {"sources": app.calendar.sources(), "default": app.calendar.default_source()})

    def cal_create(req: Request) -> dict[str, Any]:
        body = req.json()
        try:
            start = from_iso(str(body.get("start", "")))
            end = from_iso(str(body["end"])) if body.get("end") else None
        except ValueError:
            raise ValidationError("start/end must be ISO-8601 with timezone", fields={"start": "Invalid"}) from None
        event = app.calendar.create(req.ctx(), title=str(body.get("title", "")), start=start.astimezone(app.clock.tz),
                                    end=end.astimezone(app.clock.tz) if end else None, all_day=bool(body.get("all_day")),
                                    location=str(body.get("location", "")), notes=str(body.get("notes", "")), calendar=body.get("calendar"))
        return {"event": event.public()}
    r.add("POST", "/api/calendar/events", cal_create)

    def cal_patch(req: Request) -> dict[str, Any]:
        body = req.json()
        patch: dict[str, Any] = {k: body[k] for k in ("title", "location", "notes", "all_day") if k in body}
        for key in ("start", "end"):
            if body.get(key):
                try:
                    patch[key] = from_iso(str(body[key])).astimezone(app.clock.tz)
                except ValueError:
                    raise ValidationError(f"{key} must be ISO-8601 with timezone", fields={key: "Invalid"}) from None
        return {"event": app.calendar.update(req.ctx(), req.query.get("ref", ""), patch).public()}
    r.add("PATCH", "/api/calendar/event", cal_patch)

    def cal_delete(req: Request) -> dict[str, Any]:
        app.calendar.delete(req.ctx(), req.query.get("ref", ""))
        return {"ok": True}
    r.add("DELETE", "/api/calendar/event", cal_delete)

    # ---- contacts, review, audit, outbox --------------------------------------------------------
    r.add("GET", "/api/contacts", lambda req: {"contacts": app.contacts.list(), "link_requests": app.db.get_setting("telegram.link_requests", []) or []})
    r.add("POST", "/api/contacts", lambda req: {"contact": app.contacts.create(req.ctx(), name=str(req.json().get("name", "")), aliases=req.json().get("aliases"),
          channels=req.json().get("channels"), is_self=bool(req.json().get("is_self")), notes=str(req.json().get("notes", "")))})
    r.add("PATCH", r"/api/contacts/(?P<id>\d+)", lambda req: {"contact": app.contacts.update(req.ctx(), req.int_param("id"), req.json())})

    def contact_delete(req: Request) -> dict[str, Any]:
        app.contacts.delete(req.ctx(), req.int_param("id"))
        return {"ok": True}
    r.add("DELETE", r"/api/contacts/(?P<id>\d+)", contact_delete)

    def contact_link(req: Request) -> dict[str, Any]:
        body = req.json()
        chat_id = str(body.get("chat_id", ""))
        contact = app.contacts.get(int(body.get("contact_id", 0)))
        channels = dict(contact["channels"])
        channels["telegram"] = {"chat_id": chat_id}
        updated = app.contacts.update(req.ctx(), contact["id"], {"channels": channels})
        remaining = [x for x in (app.db.get_setting("telegram.link_requests", []) or []) if x.get("chat_id") != chat_id]
        app.db.set_setting("telegram.link_requests", remaining)
        return {"contact": updated}
    r.add("POST", "/api/contacts/link", contact_link)

    r.add("GET", "/api/review", lambda req: {"items": app.review.list(status=req.query.get("status", "pending"))})

    def review_approve(req: Request) -> dict[str, Any]:
        body = req.json()
        return pipeline.approve_review(req.int_param("id"), edited=body.get("proposal") if isinstance(body.get("proposal"), list) else None)
    r.add("POST", r"/api/review/(?P<id>\d+)/approve", review_approve)
    r.add("POST", r"/api/review/(?P<id>\d+)/reject", lambda req: {"item": pipeline.reject_review(req.int_param("id"))})

    def review_edit(req: Request) -> dict[str, Any]:
        proposal = req.json().get("proposal")
        if not isinstance(proposal, list):
            raise ValidationError("proposal must be a list of intents", fields={"proposal": "Invalid"})
        from .nlu.intents import validate_intent
        app.review.update_proposal(req.int_param("id"), [validate_intent(i) for i in proposal])
        return {"item": app.review.get(req.int_param("id"))}
    r.add("PATCH", r"/api/review/(?P<id>\d+)", review_edit)

    r.add("GET", "/api/audit", lambda req: {"audit": app.audit.list(entity_type=req.query.get("entity_type") or None,
          entity_id=int(req.query["entity_id"]) if req.query.get("entity_id") else None, limit=req.q_int("limit", 100, 1, 500),
          before_id=req.q_int("before_id", 0) or None)})
    r.add("POST", r"/api/audit/(?P<id>\d+)/undo", lambda req: {"audit": app.audit.undo(req.int_param("id"), req.ctx(), force=bool(req.json().get("force")))})
    r.add("GET", "/api/outbox", lambda req: {"messages": app.outbox.list(status=req.query.get("status") or None, limit=req.q_int("limit", 100, 1, 500))})
    r.add("POST", r"/api/outbox/(?P<id>\d+)/retry", lambda req: {"message": app.outbox.retry(req.int_param("id"))})
    r.add("POST", r"/api/outbox/(?P<id>\d+)/cancel", lambda req: {"message": app.outbox.cancel(req.int_param("id"))})

    # ---- settings, integrations, security -------------------------------------------------------
    r.add("GET", "/api/settings", lambda req: {"settings": app.settings.all()})

    def settings_put(req: Request) -> dict[str, Any]:
        result = app.settings.update(req.json())
        if "timezone" in req.json() and req.json()["timezone"]:
            app.clock.set_timezone(req.json()["timezone"])
        app.refresh_embedder()
        return {"settings": result}
    r.add("PUT", "/api/settings", settings_put)
    r.add("GET", "/api/integrations", lambda req: {"integrations": app.integrations(),
          "secrets": {name: app.secrets.has(name) for name in WRITABLE_SECRETS}})

    def secrets_put(req: Request) -> dict[str, Any]:
        body = req.json()
        for name, value in body.items():
            if name not in WRITABLE_SECRETS:
                raise ValidationError(f"Unknown secret {name}", fields={name: "Unknown"})
            if not isinstance(value, str):
                raise ValidationError("Secret must be a string", fields={name: "Invalid"})
            app.secrets.set(name, value.strip())
        with app.db.write() as conn:
            app.db.emit(conn, "integrations.changed", {})
        return {"secrets": {name: app.secrets.has(name) for name in WRITABLE_SECRETS}}
    r.add("PUT", "/api/integrations/secrets", secrets_put)

    def integration_test(req: Request) -> dict[str, Any]:
        name = req.params["name"]
        try:
            if name == "telegram":
                detail = app.telegram.test()
            elif name == "caldav":
                detail = app.caldav.test()
            elif name == "home_assistant":
                detail = {"entities": len(app.ha.get_states())}
            elif name == "llm":
                detail = app.llm.test()
            elif name == "speak":
                app.speak.send("{}", "Проверка связи. Домовой на месте.")
                detail = {"spoken": True}
            else:
                raise NotFoundError("Unknown integration")
        except ProviderError as exc:
            return {"ok": False, "error": {"code": exc.code, "message": exc.message}}
        return {"ok": True, "detail": detail}
    r.add("POST", r"/api/integrations/(?P<name>[a-z_]+)/test", integration_test)

    def security(req: Request) -> dict[str, Any]:
        return {"api_token": app.secrets.get("api_token"), "alice_path": f"/domovoy-api/frontends/alice/{app.secrets.get('alice_secret')}",
                "assist_secret": app.secrets.get("assist_secret")}
    r.add("GET", "/api/security", security)

    def rotate(req: Request) -> dict[str, Any]:
        name = str(req.json().get("name", ""))
        if name not in ROTATABLE:
            raise ValidationError("Unknown secret", fields={"name": "Unknown"})
        app.secrets.rotate(name)
        return security(req)
    r.add("POST", "/api/security/rotate", rotate)

    # ---- backup / export / import ---------------------------------------------------------------
    r.add("GET", "/api/export", lambda req: export_data(app))

    def import_(req: Request) -> dict[str, Any]:
        return {"imported": import_data(app, req.json())}
    r.add("POST", "/api/import", import_)

    def backup(req: Request) -> dict[str, Any]:
        return {"file": create_backup(app).name}
    r.add("POST", "/api/backup", backup)
    r.add("GET", "/api/backups", lambda req: {"backups": list_backups(app)})

    # ---- voice ----------------------------------------------------------------------------------
    def voice_command(req: Request) -> dict[str, Any]:
        content_type = (req.headers.get("Content-Type") or "").split(";")[0].strip().lower()
        ctx.scheduler.last_activity_at = time.monotonic()
        room = req.headers.get("X-Room") or ""
        if content_type.startswith("audio/"):
            return voice.handle_audio(req.body, content_type, room=room, session_id=None)
        body = req.json()
        return voice.handle_transcript(str(body.get("text", "")), room=str(body.get("room") or room), session_id=body.get("session_id"),
                                       require_trigger=bool(body.get("require_trigger", False)), source="voice")
    r.add("POST", "/api/voice/command", voice_command)
    r.add("GET", "/api/voice/status", lambda req: {"enabled": bool(voice.config().get("enabled")), "stt_configured": app.stt.configured(),
          "trigger_words": voice.config().get("trigger_words"), "window_s": voice.config().get("window_s"), "busy": app.gate.busy})

    # ---- avatar ---------------------------------------------------------------------------------
    r.add("GET", "/api/avatar/state", lambda req: app.avatar.snapshot())

    # ---- realtime -------------------------------------------------------------------------------
    def events(req: Request) -> dict[str, Any]:
        since_raw = req.query.get("since")
        timeout = min(30.0, max(0.0, float(req.query.get("timeout", 0) or 0)))
        if since_raw in (None, ""):
            return {"cursor": app.db.latest_seq, "events": []}
        try:
            since = int(since_raw)
        except ValueError:
            raise ValidationError("since must be an integer", fields={"since": "Invalid"}) from None
        cursor, items, reset = app.db.wait_for_changes(since, timeout)
        payload: dict[str, Any] = {"cursor": cursor, "events": items}
        if reset:
            payload["reset"] = True
        return payload
    r.add("GET", "/events", events)

    # ---- external frontends (own credentials) ---------------------------------------------------
    r.add("POST", r"/frontends/alice/(?P<secret>[A-Za-z0-9_\-]+)", lambda req: ctx.alice.handle(req.json()), auth="alice")
    r.add("POST", "/frontends/assist", lambda req: ctx.assist.handle(req.json()), auth="assist")
    return r


class ApiContext:
    def __init__(self, app: Any, pipeline: Any, voice: Any, alice: Any, assist: Any, auth: Authenticator, scheduler: Any) -> None:
        self.app, self.pipeline, self.voice, self.alice, self.assist, self.auth, self.scheduler = app, pipeline, voice, alice, assist, auth, scheduler
        self.router = build_router(self)


LOOPBACK = ("127.0.0.1", "::1")


def _redact_path(path: str) -> str:
    return re.sub(r"(/frontends/alice/)[^/?\s]+", r"\1***", path)


class ApiHandler(BaseHTTPRequestHandler):
    server_version = f"Domovoy/{__version__}"
    protocol_version = "HTTP/1.1"

    @property
    def api(self) -> ApiContext:
        return self.server.api_context  # type: ignore[attr-defined]

    def log_message(self, fmt: str, *args: Any) -> None:
        LOG.info("%s - %s", self.address_string(), _redact_path(fmt % args))

    def _send(self, status: int, payload: Any) -> None:
        body = json.dumps(payload, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _error(self, exc: DomovoyError) -> None:
        self._send(exc.status, {"error": exc.to_payload()})

    def _read_body(self, limit: int) -> bytes:
        raw = self.headers.get("Content-Length")
        if raw is None:
            return b""
        try:
            length = int(raw)
        except ValueError:
            raise ValidationError("Invalid Content-Length", code="bad_request") from None
        if length < 0:
            raise ValidationError("Invalid Content-Length", code="bad_request")
        if length > limit:
            self.close_connection = True
            raise PayloadTooLarge(f"Body too large (max {limit} bytes)")
        return self.rfile.read(length) if length else b""

    def _handle(self, method: str) -> None:
        parsed = urlsplit(self.path)
        path = unquote(parsed.path).rstrip("/") or "/"
        query = {k: v[0] for k, v in parse_qs(parsed.query, keep_blank_values=True).items()}
        body_consumed = method not in MUTATING
        try:
            matched = self.api.router.match(method, path)
            if matched is None:
                raise NotFoundError(f"No such endpoint: {method} {_redact_path(path)}")
            if matched == "method":
                self._send(HTTPStatus.METHOD_NOT_ALLOWED, {"error": {"code": "method_not_allowed", "message": "Method not allowed"}})
                return
            handler, params, auth_kind = matched  # type: ignore[misc]
            peer_ip = self.client_address[0]
            # Behind nginx every peer is 127.0.0.1; the real client is what nginx put in X-Real-IP (it overwrites any
            # value the client sent). Only a loopback peer is believed, so a LAN host cannot fake its address.
            remote_ip = ((self.headers.get("X-Real-IP") or "").strip() or peer_ip) if peer_ip in LOOPBACK else peer_ip
            content_type = (self.headers.get("Content-Type") or "").split(";")[0].strip().lower()
            limit = self.api.app.env.max_body_bytes if path == "/api/import" else MAX_AUDIO_BYTES if content_type.startswith("audio/") else MAX_JSON_BYTES
            principal = None
            if auth_kind == "user":  # reject before reading a potentially large body
                principal = self.api.auth.authenticate(self.headers, method, peer_ip, remote_ip)
            body = self._read_body(limit) if method in MUTATING else b""
            body_consumed = True
            if auth_kind == "alice":
                if not self.api.auth.check_secret("alice_secret", params.get("secret", "")):
                    raise UnauthorizedError("Invalid skill secret")
            elif auth_kind == "assist":
                supplied = self.headers.get("X-Domovoy-Secret") or query.get("secret", "")
                if not self.api.auth.check_secret("assist_secret", supplied):
                    principal = self.api.auth.authenticate(self.headers, method, peer_ip, remote_ip)
            request = Request(method, path, query, self.headers, body, principal, remote_ip)
            request.params = params
            result = handler(request)
            self._send(HTTPStatus.OK, result)
        except DomovoyError as exc:
            if not body_consumed:
                self.close_connection = True  # the unread body would otherwise be parsed as the next request
            self._error(exc)
        except (BrokenPipeError, ConnectionResetError):
            self.close_connection = True
        except Exception:  # noqa: BLE001 - never leak a traceback to a client
            LOG.exception("Unhandled error for %s %s", method, _redact_path(path))
            self._send(HTTPStatus.INTERNAL_SERVER_ERROR, {"error": {"code": "internal_error", "message": "Internal error"}})

    def do_GET(self) -> None:
        self._handle("GET")

    def do_POST(self) -> None:
        self._handle("POST")

    def do_PUT(self) -> None:
        self._handle("PUT")

    def do_PATCH(self) -> None:
        self._handle("PATCH")

    def do_DELETE(self) -> None:
        self._handle("DELETE")


class ApiServer(ThreadingHTTPServer):
    daemon_threads = True
    allow_reuse_address = True

    def __init__(self, address: tuple[str, int], api_context: ApiContext) -> None:
        super().__init__(address, ApiHandler)
        self.api_context = api_context
