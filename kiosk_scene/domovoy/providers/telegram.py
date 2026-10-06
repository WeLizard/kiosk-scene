from __future__ import annotations

from typing import Any, Callable

from ..errors import ProviderError, ProviderNotConfigured
from .base import HealthTracker, json_request

MAX_MESSAGE = 4000


class TelegramProvider:
    """Telegram Bot API adapter (sendMessage, getUpdates for contact linking).

    `base_url` is injectable so tests run the *real* adapter against a local fake Bot API server.
    """

    channel = "telegram"

    DEFAULT_BASE = "https://api.telegram.org"

    def __init__(self, token: Callable[[], str], health: HealthTracker, *, base_url: str | Callable[[], str] = DEFAULT_BASE,
                 timeout: float = 10.0) -> None:
        self._token = token
        self.health = health
        self._base_url = base_url
        self.timeout = timeout

    @property
    def base_url(self) -> str:
        """Read on every call, so an address changed in the settings applies at once (no restart)."""
        value = self._base_url() if callable(self._base_url) else self._base_url
        return (value if isinstance(value, str) and value else self.DEFAULT_BASE).rstrip("/")

    @base_url.setter
    def base_url(self, value: str | Callable[[], str]) -> None:
        self._base_url = value

    def configured(self) -> bool:
        return bool(self._token())

    def _call(self, method: str, payload: dict[str, Any], *, timeout: float | None = None) -> Any:
        token = self._token()
        if not token:
            raise ProviderNotConfigured("telegram", "Telegram bot token is not set")
        try:
            data = json_request(
                "POST", f"{self.base_url}/bot{token}/{method}", payload=payload, timeout=timeout or self.timeout,
                provider="telegram", secrets=[token],
            )
        except ProviderError as exc:
            self.health.fail(exc, [token])
            raise
        if not isinstance(data, dict) or not data.get("ok"):
            description = str((data or {}).get("description", "unknown error")) if isinstance(data, dict) else "bad response"
            code = int((data or {}).get("error_code", 0)) if isinstance(data, dict) else 0
            error = ProviderError(f"telegram: {description}", code=f"telegram_{code}", retryable=code in (0, 429) or code >= 500, provider="telegram")
            self.health.fail(error, [token])
            raise error
        self.health.ok()
        return data.get("result")

    def send(self, address: str, text: str) -> str:
        """Send one message; returns Telegram's message id. `address` is the numeric chat id."""
        if not str(address).strip():
            raise ProviderError("telegram: recipient has no chat id", code="no_address", retryable=False, provider="telegram")
        chunks = [text[i:i + MAX_MESSAGE] for i in range(0, len(text), MAX_MESSAGE)] or [""]
        last = ""
        for chunk in chunks:
            result = self._call("sendMessage", {"chat_id": address, "text": chunk, "disable_web_page_preview": True})
            last = str((result or {}).get("message_id", ""))
        return last

    def test(self) -> dict[str, Any]:
        me = self._call("getMe", {})
        return {"username": (me or {}).get("username", ""), "id": (me or {}).get("id")}

    def get_updates(self, offset: int | None, timeout: int = 0) -> list[dict[str, Any]]:
        payload: dict[str, Any] = {"timeout": timeout, "allowed_updates": ["message"]}
        if offset is not None:
            payload["offset"] = offset
        return list(self._call("getUpdates", payload, timeout=timeout + self.timeout) or [])
