from __future__ import annotations

import io
import json
import uuid
from typing import Any, Callable

from ..errors import ProviderError, ProviderNotConfigured
from .base import HealthTracker, ResourceGate, http_request


class SttProvider:
    """Speech-to-text through any OpenAI-compatible `/v1/audio/transcriptions` server
    (whisper.cpp server, faster-whisper-server/speaches, LocalAI, …). Runs on the local network only.

    Audio is streamed straight to the STT server and never written to disk here. On a small CPU-only box the
    shared `ResourceGate` makes overlapping requests fail fast (`busy`) instead of piling up.
    """

    def __init__(self, config: Callable[[], dict[str, Any]], api_key: Callable[[], str], health: HealthTracker, gate: ResourceGate,
                 timeout: float = 30.0) -> None:
        self._config, self._api_key, self.health, self.gate, self.timeout = config, api_key, health, gate, timeout

    def configured(self) -> bool:
        return bool(self._config().get("base_url"))

    def transcribe(self, audio: bytes, mime: str = "audio/wav", language: str | None = None) -> str:
        cfg = self._config()
        base = str(cfg.get("base_url") or "").rstrip("/")
        if not base:
            raise ProviderNotConfigured("stt", "Speech recognition server is not configured")
        max_bytes = int(float(cfg.get("max_seconds") or 15) * 48_000 * 2) + 4096  # 24 kHz-ish 16-bit upper bound
        if len(audio) > max(max_bytes, 1_000_000):
            raise ProviderError("Audio segment is too long", code="too_long", retryable=False, provider="stt")
        if not self.gate.acquire(wait=0.0):
            raise ProviderError("Speech recognition is busy", code="busy", retryable=True, provider="stt")
        boundary = f"----domovoy{uuid.uuid4().hex}"
        ext = "wav" if "wav" in mime else "webm" if "webm" in mime else "ogg" if "ogg" in mime else "bin"
        parts = io.BytesIO()

        def field(name: str, value: str) -> None:
            parts.write(f'--{boundary}\r\nContent-Disposition: form-data; name="{name}"\r\n\r\n{value}\r\n'.encode())

        field("model", str(cfg.get("model") or "whisper-1"))
        field("language", language or str(cfg.get("language") or "ru"))
        field("response_format", "json")
        field("temperature", "0")
        parts.write(f'--{boundary}\r\nContent-Disposition: form-data; name="file"; filename="clip.{ext}"\r\nContent-Type: {mime}\r\n\r\n'.encode())
        parts.write(audio)
        parts.write(f"\r\n--{boundary}--\r\n".encode())
        key = self._api_key()
        headers = {"Content-Type": f"multipart/form-data; boundary={boundary}", "Accept": "application/json"}
        if key:
            headers["Authorization"] = f"Bearer {key}"
        try:
            _, _, body = http_request("POST", f"{base}/audio/transcriptions", headers=headers, body=parts.getvalue(),
                                      timeout=self.timeout, provider="stt", secrets=[key])
        except ProviderError as exc:
            self.health.fail(exc, [key])
            raise
        finally:
            self.gate.release()
        try:
            text = str(json.loads(body.decode("utf-8")).get("text", "")).strip()
        except (ValueError, AttributeError):
            raise ProviderError("stt: unexpected response", code="bad_response", retryable=True, provider="stt") from None
        self.health.ok()
        return text
