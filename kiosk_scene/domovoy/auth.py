from __future__ import annotations

import hmac
import threading
import time
from dataclasses import dataclass

from .errors import UnauthorizedError

TRUSTED_ORIGINS = {"ingress", "local"}
MUTATING = {"POST", "PUT", "PATCH", "DELETE"}


@dataclass
class Principal:
    origin: str          # ingress | local | token
    trusted: bool


class RateLimiter:
    def __init__(self, limit: int = 10, window: float = 60.0) -> None:
        self.limit, self.window = limit, window
        self._hits: dict[str, list[float]] = {}
        self._lock = threading.Lock()

    def blocked(self, key: str) -> bool:
        now = time.monotonic()
        with self._lock:
            hits = [t for t in self._hits.get(key, []) if now - t < self.window]
            self._hits[key] = hits
            return len(hits) >= self.limit

    def record_failure(self, key: str) -> None:
        with self._lock:
            self._hits.setdefault(key, []).append(time.monotonic())


class Authenticator:
    """Who may call the API.

    * Requests that reached us through Home Assistant ingress or from this machine (`X-Domovoy-Origin`, set by nginx
      which overwrites any client-sent value) are trusted – HA already authenticated the user.
    * Anything else (another device on the LAN hitting the add-on port) needs `Authorization: Bearer <api_token>`.
    * State-changing requests must carry `X-Domovoy-Client` (or a bearer token). A page on another website cannot add
      that header without a CORS preflight, which this server never grants – that is the CSRF defence.
    """

    def __init__(self, secrets, *, trust_local: bool = True) -> None:
        self.secrets, self.trust_local = secrets, trust_local
        self.limiter = RateLimiter()

    def authenticate(self, headers, method: str, peer_ip: str, client_ip: str | None = None) -> Principal:
        """`peer_ip` is the socket peer (decides "local"); `client_ip` is the real caller behind the proxy (rate limits)."""
        remote_ip = client_ip or peer_ip
        origin = (headers.get("X-Domovoy-Origin") or "").lower()
        bearer = self._bearer(headers)
        if bearer:
            if self.limiter.blocked(remote_ip):
                raise UnauthorizedError("Too many failed attempts, try again later", code="rate_limited")
            if hmac.compare_digest(bearer, self.secrets.get("api_token")):
                return Principal("token", True)
            self.limiter.record_failure(remote_ip)
            raise UnauthorizedError("Invalid token")
        trusted_origin = origin in TRUSTED_ORIGINS or (not origin and self.trust_local and peer_ip in ("127.0.0.1", "::1"))
        if not trusted_origin:
            raise UnauthorizedError("Authentication required: use the Home Assistant panel or send the API token", code="auth_required")
        if method in MUTATING and not headers.get("X-Domovoy-Client"):
            raise UnauthorizedError("Missing X-Domovoy-Client header", code="csrf")
        return Principal(origin or "local", True)

    @staticmethod
    def _bearer(headers) -> str:
        value = headers.get("Authorization") or ""
        return value[7:].strip() if value.lower().startswith("bearer ") else ""

    def check_secret(self, name: str, supplied: str) -> bool:
        expected = self.secrets.get(name)
        return bool(expected) and hmac.compare_digest(expected, supplied or "")
