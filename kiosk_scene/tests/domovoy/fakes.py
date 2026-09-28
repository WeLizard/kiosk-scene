"""Real HTTP servers standing in for external services, so the *actual* adapters run in tests.

Nothing here is mocked at the Python level: the code under test opens sockets and speaks HTTP to these.
"""
from __future__ import annotations

import base64
import json
import re
import threading
import time
import uuid
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from typing import Any, Callable
from urllib.parse import parse_qs, unquote, urlsplit


class FakeServer:
    """Base: start on an ephemeral port; subclasses implement `handle(method, path, query, headers, body)`."""

    def __init__(self) -> None:
        outer = self

        class Handler(BaseHTTPRequestHandler):
            protocol_version = "HTTP/1.1"

            def log_message(self, *args: Any) -> None:  # silence
                pass

            def _run(self) -> None:
                length = int(self.headers.get("Content-Length") or 0)
                body = self.rfile.read(length) if length else b""
                parsed = urlsplit(self.path)
                query = {k: v[0] for k, v in parse_qs(parsed.query).items()}
                outer.requests.append((self.command, unquote(parsed.path), dict(self.headers), body))
                if outer.delay:
                    time.sleep(outer.delay)
                status, headers, payload = outer.handle(self.command, unquote(parsed.path), query, self.headers, body)
                data = payload if isinstance(payload, bytes) else json.dumps(payload).encode()
                self.send_response(status)
                for k, v in {"Content-Type": "application/json", **headers}.items():
                    self.send_header(k, v)
                self.send_header("Content-Length", str(len(data)))
                self.end_headers()
                self.wfile.write(data)

            do_GET = do_POST = do_PUT = do_DELETE = do_PATCH = _run

            def do_PROPFIND(self) -> None:
                self._run()

            def do_REPORT(self) -> None:
                self._run()

        self.requests: list[tuple[str, str, dict[str, str], bytes]] = []
        self.delay = 0.0
        self.server = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)

    @property
    def url(self) -> str:
        return f"http://127.0.0.1:{self.server.server_address[1]}"

    def __enter__(self) -> "FakeServer":
        self.thread.start()
        return self

    def __exit__(self, *exc: Any) -> None:
        self.server.shutdown()
        self.server.server_close()

    def handle(self, method: str, path: str, query: dict, headers: Any, body: bytes) -> tuple[int, dict, Any]:  # pragma: no cover
        raise NotImplementedError


class FakeTelegram(FakeServer):
    TOKEN = "123456:TEST-TOKEN-abcdef"

    def __init__(self) -> None:
        super().__init__()
        self.sent: list[dict[str, Any]] = []
        self.fail_next = 0          # respond 500 this many times
        self.unauthorized = False
        self.updates: list[dict[str, Any]] = []

    def handle(self, method, path, query, headers, body):
        m = re.match(r"^/bot([^/]+)/(\w+)$", path)
        if not m:
            return 404, {}, {"ok": False}
        token, name = m.groups()
        if self.unauthorized or token != self.TOKEN:
            return 401, {}, {"ok": False, "error_code": 401, "description": "Unauthorized"}
        if self.fail_next > 0:
            self.fail_next -= 1
            return 500, {}, {"ok": False, "error_code": 500, "description": "Internal"}
        data = json.loads(body or b"{}")
        if name == "sendMessage":
            self.sent.append(data)
            return 200, {}, {"ok": True, "result": {"message_id": len(self.sent), "chat": {"id": data["chat_id"]}}}
        if name == "getMe":
            return 200, {}, {"ok": True, "result": {"id": 1, "username": "domovoy_test_bot"}}
        if name == "getUpdates":
            updates, self.updates = self.updates, []
            return 200, {}, {"ok": True, "result": updates}
        return 404, {}, {"ok": False, "description": "unknown method"}


class FakeHA(FakeServer):
    TOKEN = "ha-test-token-123456"

    def __init__(self) -> None:
        super().__init__()
        self.states: dict[str, dict[str, Any]] = {}
        self.calls: list[tuple[str, str, dict[str, Any]]] = []
        self.calendars: dict[str, list[dict[str, Any]]] = {}
        self.fail_services = False

    def set_state(self, entity_id: str, state: str, **attributes: Any) -> None:
        self.states[entity_id] = {"entity_id": entity_id, "state": state, "attributes": attributes}

    def handle(self, method, path, query, headers, body):
        if headers.get("Authorization") != f"Bearer {self.TOKEN}":
            return 401, {}, {"message": "401: Unauthorized"}
        if path == "/api/states":
            return 200, {}, list(self.states.values())
        m = re.match(r"^/api/states/(.+)$", path)
        if m:
            state = self.states.get(m.group(1))
            return (200, {}, state) if state else (404, {}, {"message": "Entity not found"})
        m = re.match(r"^/api/services/(\w+)/(\w+)$", path)
        if m and method == "POST":
            if self.fail_services:
                return 500, {}, {"message": "boom"}
            self.calls.append((m.group(1), m.group(2), json.loads(body or b"{}")))
            return 200, {}, []
        if path == "/api/calendars":
            return 200, {}, [{"entity_id": e, "name": e} for e in self.calendars]
        m = re.match(r"^/api/calendars/(.+)$", path)
        if m:
            return 200, {}, self.calendars.get(m.group(1), [])
        return 404, {}, {"message": "not found"}


class FakeCalDAV(FakeServer):
    """A tiny CalDAV collection: PROPFIND, REPORT (time-range ignored except containment), PUT/GET/DELETE with ETags."""

    USER, PASSWORD = "anna", "s3cret-pass"

    def __init__(self) -> None:
        super().__init__()
        self.resources: dict[str, tuple[str, str]] = {}   # href -> (ics, etag)
        self.fail = False

    def handle(self, method, path, query, headers, body):
        expected = "Basic " + base64.b64encode(f"{self.USER}:{self.PASSWORD}".encode()).decode()
        if headers.get("Authorization") != expected:
            return 401, {"WWW-Authenticate": 'Basic realm="x"'}, b"unauthorized"
        if self.fail:
            return 503, {}, b"maintenance"
        base = "/cal/anna/personal/"
        if method == "PROPFIND":
            xml = '<?xml version="1.0"?><d:multistatus xmlns:d="DAV:"><d:response><d:href>%s</d:href><d:propstat><d:prop><d:displayname>Personal</d:displayname></d:prop></d:propstat></d:response></d:multistatus>' % base
            return 207, {"Content-Type": "application/xml"}, xml.encode()
        if method == "REPORT":
            parts = ""
            for href, (ics, etag) in self.resources.items():
                parts += (f'<d:response><d:href>{href}</d:href><d:propstat><d:prop><d:getetag>{etag}</d:getetag>'
                          f'<c:calendar-data xmlns:c="urn:ietf:params:xml:ns:caldav"><![CDATA[{ics}]]></c:calendar-data></d:prop></d:propstat></d:response>')
            xml = f'<?xml version="1.0"?><d:multistatus xmlns:d="DAV:" xmlns:c="urn:ietf:params:xml:ns:caldav">{parts}</d:multistatus>'
            return 207, {"Content-Type": "application/xml"}, xml.encode()
        if method == "PUT":
            if headers.get("If-None-Match") == "*" and path in self.resources:
                return 412, {}, b"exists"
            if headers.get("If-Match") and path in self.resources and headers["If-Match"] != self.resources[path][1]:
                return 412, {}, b"etag mismatch"
            etag = f'"{uuid.uuid4().hex[:8]}"'
            self.resources[path] = (body.decode("utf-8"), etag)
            return 201, {"ETag": etag}, b""
        if method == "GET":
            if path not in self.resources:
                return 404, {}, b"missing"
            ics, etag = self.resources[path]
            return 200, {"Content-Type": "text/calendar", "ETag": etag}, ics.encode()
        if method == "DELETE":
            return (204, {}, b"") if self.resources.pop(path, None) else (404, {}, b"missing")
        return 405, {}, b""


class FakeLLM(FakeServer):
    def __init__(self) -> None:
        super().__init__()
        self.reply: Any = {"intents": []}
        self.fail_status = 0
        self.embed_dim = 8

    def handle(self, method, path, query, headers, body):
        if self.fail_status:
            return self.fail_status, {}, {"error": "down"}
        if path == "/v1/chat/completions":
            content = self.reply if isinstance(self.reply, str) else json.dumps(self.reply, ensure_ascii=False)
            return 200, {}, {"choices": [{"message": {"content": content}}]}
        if path == "/v1/embeddings":
            data = json.loads(body)
            return 200, {}, {"data": [{"index": i, "embedding": [float((hash(t) >> k) & 3) for k in range(self.embed_dim)]} for i, t in enumerate(data["input"])]}
        return 404, {}, {}


class FakeSTT(FakeServer):
    def __init__(self) -> None:
        super().__init__()
        self.text = ""
        self.fail_status = 0

    def handle(self, method, path, query, headers, body):
        if self.fail_status:
            return self.fail_status, {}, {"error": "down"}
        if path == "/v1/audio/transcriptions":
            return 200, {}, {"text": self.text}
        return 404, {}, {}
