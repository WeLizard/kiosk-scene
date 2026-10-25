from __future__ import annotations

import json
import re
import time
from typing import Any, Callable, Sequence
from urllib.parse import urlsplit

from ..errors import ProviderError, ProviderNotConfigured
from .base import CircuitBreaker, HealthTracker, ResourceGate, json_request


class OpenAICompatibleProvider:
    """Any OpenAI-compatible endpoint (llama.cpp server, Ollama /v1, vLLM, LM Studio). No model is hard-coded.

    Output is *untrusted*: this class only transports and lightly parses; validation lives in `nlu.validate`.
    A circuit breaker keeps a dead model server from adding its timeout to every voice command.
    """

    def __init__(self, config: Callable[[], dict[str, Any]], api_key: Callable[[], str], health: HealthTracker,
                 breaker: CircuitBreaker | None = None, timeout: float = 20.0, gate: ResourceGate | None = None,
                 usage: Any | None = None) -> None:
        self._config, self._api_key, self.health = config, api_key, health
        self.breaker = breaker or CircuitBreaker()
        self.timeout = timeout
        self.gate = gate or ResourceGate(1)
        self.usage = usage

    def configured(self) -> bool:
        cfg = self._config()
        return bool(cfg.get("base_url") and cfg.get("enabled", True) and cfg.get("model"))

    @property
    def model_name(self) -> str:
        return str(self._config().get("model") or "")

    def _headers(self, embedding: bool, base: str) -> dict[str, str]:
        key = self._api_key()
        if not key:
            return {}
        if embedding:
            # Never send a cloud key to a different (usually local) embedding endpoint.
            chat = urlsplit(str(self._config().get("base_url") or ""))
            target = urlsplit(base)
            if (chat.scheme, chat.hostname, chat.port) != (target.scheme, target.hostname, target.port):
                return {}
        return {"Authorization": f"Bearer {key}"}

    def _post(self, path: str, payload: dict[str, Any], timeout: float, *, embedding: bool = False) -> Any:
        cfg = self._config()
        base = str((cfg.get("embedding_base_url") if embedding else "") or cfg.get("base_url") or "").rstrip("/")
        if not base or cfg.get("enabled") is False:
            raise ProviderNotConfigured("llm", "Local AI provider is not configured")
        if self.breaker.open:
            raise ProviderError("llm: temporarily disabled after repeated failures", code="circuit_open", retryable=True, provider="llm")
        key = self._api_key()
        try:
            data = json_request("POST", f"{base}/{path.lstrip('/')}", payload=payload, headers=self._headers(embedding, base),
                                timeout=timeout, provider="llm", secrets=[key])
        except ProviderError as exc:
            self.breaker.failure()
            self.health.fail(exc, [key])
            raise
        self.breaker.success()
        self.health.ok()
        return data

    def chat_json(self, system: str, user: str, schema: dict[str, Any], *, deadline: float | None = None) -> dict[str, Any]:
        """Ask for JSON matching `schema`. `deadline` is seconds available in total (voice frontends are strict)."""
        cfg = self._config()
        if self.usage is not None and not self.usage.allow():
            raise ProviderError("llm: monthly token budget exhausted", code="budget", retryable=False, provider="llm")
        configured_timeout = float(cfg.get("timeout_s") or self.timeout)
        timeout = min(configured_timeout, deadline) if deadline else configured_timeout
        if timeout <= 0.2:
            raise ProviderError("llm: no time left for a model call", code="deadline", retryable=True, provider="llm")
        # Low-token mode sends no full JSON schema: the compact catalogue in the system prompt is enough,
        # and the validator still rejects every unknown or malformed field.
        response_format = ({"type": "json_object"} if cfg.get("low_tokens", True)
                           else {"type": "json_schema", "json_schema": {"name": "domovoy_intents", "strict": True, "schema": schema}})
        payload = {
            "model": self.model_name or "default",
            "temperature": 0,
            # Never let generation run away, especially on a metered API.
            "max_tokens": int(cfg.get("max_tokens") or 160),
            "messages": [{"role": "system", "content": system}, {"role": "user", "content": user}],
            # Local reasoning models otherwise spend the whole budget thinking and return empty content.
            "reasoning_effort": "none",
            "response_format": response_format,
        }
        if not self.gate.acquire(wait=min(1.0, max(0.0, timeout - 0.2))):
            raise ProviderError("llm: model is busy with another job", code="busy", retryable=True, provider="llm")
        try:
            try:
                data = self._post("chat/completions", payload, timeout)
            except ProviderError as exc:
                # Ollama/llama.cpp may reject OpenAI's json_schema wrapper while still supporting JSON output.
                # Retry once without it; the prompt already asks for JSON and extract_json_object is tolerant.
                if exc.code not in ("http_400", "http_422"):
                    raise
                removed = False
                for field in ("reasoning_effort", "response_format"):
                    if field in payload:
                        payload.pop(field, None)
                        removed = True
                if not removed:
                    raise
                data = self._post("chat/completions", payload, timeout)
        finally:
            self.gate.release()
        try:
            content = data["choices"][0]["message"]["content"]
        except (KeyError, IndexError, TypeError):
            raise ProviderError("llm: unexpected response shape", code="bad_response", retryable=True, provider="llm") from None
        if self.usage is not None:
            reported = (data.get("usage") or {}).get("total_tokens")
            tokens = reported if type(reported) is int and reported >= 0 else max(1, (len(system) + len(user) + len(str(content))) // 4)
            self.usage.record(tokens)
        return extract_json_object(content)

    def embed(self, texts: Sequence[str]) -> list[list[float]]:
        model = str(self._config().get("embedding_model") or self.model_name or "default")
        if not self.gate.acquire(wait=0.0):
            raise ProviderError("llm: model is busy with another job", code="busy", retryable=True, provider="llm")
        try:
            data = self._post("embeddings", {"model": model, "input": list(texts)}, min(self.timeout, 15.0), embedding=True)
        finally:
            self.gate.release()
        try:
            vectors = [item["embedding"] for item in sorted(data["data"], key=lambda d: d.get("index", 0))]
        except (KeyError, TypeError):
            raise ProviderError("llm: unexpected embeddings response", code="bad_response", retryable=True, provider="llm") from None
        if len(vectors) != len(texts):
            raise ProviderError("llm: embeddings count mismatch", code="bad_response", retryable=True, provider="llm")
        return vectors

    def test(self) -> dict[str, Any]:
        started = time.monotonic()
        result = self.chat_json("Reply with the JSON {\"ok\": true}.", "ping", {"type": "object", "properties": {"ok": {"type": "boolean"}}, "required": ["ok"]}, deadline=10)
        return {"ok": bool(result.get("ok")), "latency_ms": int((time.monotonic() - started) * 1000), "model": self.model_name}


def extract_json_object(content: Any) -> dict[str, Any]:
    """Model output → dict. Tolerates ```json fences and leading chatter; anything else is a bad response."""
    if isinstance(content, dict):
        return content
    text = str(content or "").strip()
    fence = re.search(r"```(?:json)?\s*(\{.*\})\s*```", text, re.S)
    if fence:
        text = fence.group(1)
    else:
        start, end = text.find("{"), text.rfind("}")
        if start != -1 and end > start:
            text = text[start:end + 1]
    try:
        parsed = json.loads(text)
    except ValueError:
        raise ProviderError("llm: response is not JSON", code="bad_response", retryable=True, provider="llm") from None
    if not isinstance(parsed, dict):
        raise ProviderError("llm: response is not a JSON object", code="bad_response", retryable=True, provider="llm")
    return parsed


class ModelEmbedder:
    """Adapts the provider to the `Embedder` protocol used by search."""

    semantic = True

    def __init__(self, provider: OpenAICompatibleProvider) -> None:
        self.provider = provider

    @property
    def name(self) -> str:
        return f"model:{self.provider._config().get('embedding_model') or self.provider.model_name or 'default'}"

    def embed(self, texts: Sequence[str]) -> list[list[float]]:
        return self.provider.embed(texts)
