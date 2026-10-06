from __future__ import annotations

from typing import Any


class DomovoyError(Exception):
    """Base class. `code` is stable and machine readable; `message` is user presentable."""

    status = 500
    code = "internal_error"

    def __init__(self, message: str, *, code: str | None = None, fields: dict[str, str] | None = None) -> None:
        super().__init__(message)
        self.message = message
        if code:
            self.code = code
        self.fields = fields or {}

    def to_payload(self) -> dict[str, Any]:
        payload: dict[str, Any] = {"code": self.code, "message": self.message}
        if self.fields:
            payload["fields"] = self.fields
        return payload


class ValidationError(DomovoyError):
    status = 422
    code = "validation_error"


class NotFoundError(DomovoyError):
    status = 404
    code = "not_found"


class ConflictError(DomovoyError):
    status = 409
    code = "conflict"


class UnauthorizedError(DomovoyError):
    status = 401
    code = "unauthorized"


class ForbiddenError(DomovoyError):
    status = 403
    code = "forbidden"


class PayloadTooLarge(DomovoyError):
    status = 413
    code = "payload_too_large"


class ProviderError(DomovoyError):
    """An external integration failed. `retryable` tells the outbox/scheduler whether to try again."""

    status = 502
    code = "provider_error"

    def __init__(
        self,
        message: str,
        *,
        code: str | None = None,
        retryable: bool = True,
        provider: str = "",
    ) -> None:
        super().__init__(message, code=code)
        self.retryable = retryable
        self.provider = provider


class ProviderNotConfigured(ProviderError):
    status = 503
    code = "provider_not_configured"

    def __init__(self, provider: str, message: str | None = None) -> None:
        super().__init__(message or f"{provider} is not configured", retryable=False, provider=provider)
