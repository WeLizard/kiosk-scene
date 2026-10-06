from __future__ import annotations

import json
import socket
import threading
import time
import urllib.error
import urllib.request
from dataclasses import dataclass, field
from typing import Any

from ..errors import ProviderError

USER_AGENT = "Domovoy/0.1"


@dataclass
class ProviderHealth:
    """What the Integrations page shows for one adapter."""

    name: str
    status: str = "unconfigured"          # unconfigured | ok | degraded | down | disabled
    detail: str = ""
    last_ok: str | None = None
    last_error: str | None = None
    last_error_at: str | None = None
    consecutive_failures: int = 0
    extra: dict[str, Any] = field(default_factory=dict)

    def public(self) -> dict[str, Any]:
        return {
            "name": self.name, "status": self.status, "detail": self.detail, "last_ok": self.last_ok,
            "last_error": self.last_error, "last_error_at": self.last_error_at,
            "consecutive_failures": self.consecutive_failures, **self.extra,
        }


class HealthTracker:
    def __init__(self, name: str, clock: Any) -> None:
        self.health = ProviderHealth(name)
        self._clock = clock
        self._lock = threading.Lock()

    def unconfigured(self, detail: str = "") -> None:
        with self._lock:
            self.health.status, self.health.detail = "unconfigured", detail

    def ok(self, detail: str = "") -> None:
        with self._lock:
            self.health.status, self.health.detail = "ok", detail
            self.health.last_ok = self._clock.now_iso()
            self.health.consecutive_failures = 0

    def fail(self, error: Exception, secrets: list[str] | None = None) -> None:
        with self._lock:
            self.health.consecutive_failures += 1
            self.health.last_error = redact(str(error), secrets or [])[:300]
            self.health.last_error_at = self._clock.now_iso()
            self.health.status = "down" if self.health.consecutive_failures >= 3 else "degraded"


class CircuitBreaker:
    """Stops hammering a provider that keeps failing; half-opens after `cooldown` seconds."""

    def __init__(self, threshold: int = 3, cooldown: float = 60.0, now=time.monotonic) -> None:
        self.threshold, self.cooldown, self._now = threshold, cooldown, now
        self._failures = 0
        self._opened_at: float | None = None
        self._lock = threading.Lock()

    @property
    def open(self) -> bool:
        with self._lock:
            if self._opened_at is None:
                return False
            if self._now() - self._opened_at >= self.cooldown:
                return False  # half-open: allow one probe
            return True

    def success(self) -> None:
        with self._lock:
            self._failures, self._opened_at = 0, None

    def failure(self) -> None:
        with self._lock:
            self._failures += 1
            if self._failures >= self.threshold:
                self._opened_at = self._now()


def redact(text: str, secrets: list[str]) -> str:
    for secret in secrets:
        if secret and len(secret) >= 6:
            text = text.replace(secret, "***")
    return text


def http_request(
    method: str, url: str, *, headers: dict[str, str] | None = None, body: bytes | None = None,
    timeout: float = 10.0, provider: str = "", secrets: list[str] | None = None,
) -> tuple[int, dict[str, str], bytes]:
    """One HTTP call. Non-2xx → ProviderError with `retryable` set by status; never leaks secrets in messages."""
    request = urllib.request.Request(url, data=body, method=method, headers={"User-Agent": USER_AGENT, **(headers or {})})
    secret_list = secrets or []
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            return response.status, {k.lower(): v for k, v in response.headers.items()}, response.read()
    except urllib.error.HTTPError as exc:
        payload = exc.read()[:2000]
        retryable = exc.code >= 500 or exc.code in (408, 425, 429)
        detail = redact(payload.decode("utf-8", "replace"), secret_list)
        raise ProviderError(
            f"{provider or 'provider'} HTTP {exc.code}: {detail[:200]}", code=f"http_{exc.code}", retryable=retryable, provider=provider
        ) from None
    except (urllib.error.URLError, socket.timeout, TimeoutError, ConnectionError, OSError) as exc:
        reason = getattr(exc, "reason", exc)
        raise ProviderError(
            f"{provider or 'provider'} unreachable: {redact(str(reason), secret_list)}", code="unreachable", retryable=True, provider=provider
        ) from None


def json_request(method: str, url: str, *, payload: Any = None, headers: dict[str, str] | None = None, timeout: float = 10.0,
                 provider: str = "", secrets: list[str] | None = None) -> Any:
    body = None if payload is None else json.dumps(payload).encode("utf-8")
    merged = {"Accept": "application/json", **(headers or {})}
    if body is not None:
        merged["Content-Type"] = "application/json"
    _, _, data = http_request(method, url, headers=merged, body=body, timeout=timeout, provider=provider, secrets=secrets)
    if not data:
        return None
    try:
        return json.loads(data.decode("utf-8"))
    except ValueError:
        raise ProviderError(f"{provider or 'provider'} returned invalid JSON", code="bad_response", retryable=True, provider=provider) from None


class ResourceGate:
    """Bounds heavy local work (LLM, STT, embeddings) to N concurrent jobs.

    The target box is a fanless mini PC (Intel N150, 16 GB, no GPU) that also runs Home Assistant and a WebGL
    kiosk. Queueing model calls behind each other would make every voice command slow; instead callers either
    wait a short, bounded time or get `None` and degrade (deferred to review, or the audio segment is dropped).
    """

    def __init__(self, slots: int = 1) -> None:
        self._sem = threading.BoundedSemaphore(max(1, slots))
        self._busy = 0
        self._lock = threading.Lock()

    def acquire(self, wait: float = 0.0) -> bool:
        ok = self._sem.acquire(timeout=wait) if wait > 0 else self._sem.acquire(blocking=False)
        if ok:
            with self._lock:
                self._busy += 1
        return ok

    def release(self) -> None:
        with self._lock:
            self._busy = max(0, self._busy - 1)
        self._sem.release()

    @property
    def busy(self) -> bool:
        with self._lock:
            return self._busy > 0
