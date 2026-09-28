from __future__ import annotations

import json
import re
import time
from typing import Any, Callable, Sequence

from ..errors import ProviderError, ProviderNotConfigured
from .base import CircuitBreaker, HealthTracker, ResourceGate, json_request


class OpenAICompatibleProvider:
    """Any OpenAI-compatible endpoint (llama.cpp server, Ollama /v1, vLLM, LM Studio). No model is hard-coded.

    Output is *untrusted*: this class only transports and lightly parses; validation lives in `nlu.validate`.
    A circuit breaker keeps a dead model server from adding its timeout to every voice command.
    """

    def __init__(self, config: Callable[[], dict[str, Any]], api_key: Callable[[], str], health: HealthTracker,
                 breaker: CircuitBreaker | None = None, timeout: float = 20.0, gate: ResourceGate | None = None) -> None:
        self._config, self._api_key, self.health = config, api_key, health
        self.breaker = breaker or CircuitBreaker()
        self.timeout = timeout
        self.gate = gate or ResourceGate(1)

    def configured(self) -> bool:
        cfg = self._config()
        return bool(cfg.get("base_url") and cfg.get("enabled", True))

    @property
    def model_name(self) -> str:
        return str(self._config().get("model") or "")

    def _headers(self) -> dict[str, str]:
        key = self._api_key()
        return {"Authorization": f"Bearer {key}"} if key else {}

    def _post(self, path: str, payload: dict[str, Any], timeout: float) -> Any:
        cfg = self._config()
        base = str(cfg.get("base_url") or "").rstrip("/")
        if not base or cfg.get("enabled") is False:
            raise ProviderNotConfigured("llm", "Local AI provider is not configured")
        if self.breaker.open:
            raise ProviderError("llm: temporarily disabled after repeated failures", code="circuit_open", retryable=True, provider="llm")
        key = self._api_key()
        try:
            data = json_request("POST", f"{base}/{path.lstrip('/')}", payload=payload, headers=self._headers(), timeout=timeout,
                                provider="llm", secrets=[key])
        except ProviderError as exc:
            self.breaker.failure()
            self.health.fail(exc, [key])
            raise
        self.breaker.success()
        self.health.ok()
        return data

    def chat_json(self, system: str, user: str, schema: dict[str, Any], *, deadline: float | None = None) -> dict[str, Any]:
        """Ask for JSON matching `schema`. `deadline` is seconds available in total (voice frontends are strict)."""
        timeout = min(self.timeout, deadline) if deadline else self.timeout
        if timeout <= 0.2:
            raise ProviderError("llm: no time left for a model call", code="deadline", retryable=True, provider="llm")
        payload = {
            "model": self.model_name or "default",
            "temperature": 0,
            # Small local models on a CPU-only box: never let generation run away.
            "max_tokens": int(self._config().get("max_tokens") or 320),
            "messages": [{"role": "system", "content": system}, {"role": "user", "content": user}],
            "response_format": {"type": "json_schema", "json_schema": {"name": "domovoy_intents", "strict": True, "schema": schema}},
        }
        if not self.gate.acquire(wait=min(1.0, max(0.0, timeout - 0.2))):
            raise ProviderError("llm: model is busy with another job", code="busy", retryable=True, provider="llm")
        try:
            data = self._post("chat/completions", payload, timeout)
        finally:
            self.gate.release()
        try:
            content = data["choices"][0]["message"]["content"]
        except (KeyError, IndexError, TypeError):
            raise ProviderError("llm: unexpected response shape", code="bad_response", retryable=True, provider="llm") from None
        return extract_json_object(content)

    def embed(self, texts: Sequence[str]) -> list[list[float]]:
        model = str(self._config().get("embedding_model") or self.model_name or "default")
        if not self.gate.acquire(wait=0.0):
            raise ProviderError("llm: model is busy with another job", code="busy", retryable=True, provider="llm")
        try:
            data = self._post("embeddings", {"model": model, "input": list(texts)}, min(self.timeout, 15.0))
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
