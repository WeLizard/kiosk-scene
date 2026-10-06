"""Optional model-based interpreter. Output is untrusted input to the same validation as the rules' output."""
from __future__ import annotations

import datetime as dt
from typing import Any

from ..errors import ProviderError
from ..nlu.intents import INTENTS, llm_json_schema


def _catalogue() -> str:
    lines = []
    for name, spec in INTENTS.items():
        fields = ", ".join(f"{f}{'*' if len(d) > 2 and d[2] else ''}" for f, d in spec.items())
        lines.append(f"- {name}: {fields}" if fields else f"- {name}")
    return "\n".join(lines)


SYSTEM = (
    "Ты разбираешь команды для домашнего ассистента «Домовой». Отвечай ТОЛЬКО JSON по схеме. "
    "Ничего не выдумывай: если данных не хватает, верни intent clarify с вопросом. "
    "Даты и время — ISO 8601 со смещением часового пояса. Местa задавай списком от большого к малому "
    "(например [\"Шкаф нижний\", \"Коробка 3\"]). Поле confidence — твоя честная уверенность 0..1.\n"
    "Типы (* — обязательно):\n" + _catalogue()
)


class LlmInterpreter:
    name = "llm"

    def __init__(self, provider: Any) -> None:
        self.provider = provider

    def available(self) -> bool:
        return bool(self.provider.configured()) and not self.provider.breaker.open

    def interpret(self, text: str, *, now: dt.datetime, session: dict[str, Any], deadline: float | None) -> list[dict[str, Any]]:
        context = f"Сейчас: {now.isoformat(timespec='minutes')} ({now.tzname() or 'local'}). Команда: {text}"
        last = {k: session[k] for k in ("last_item_id", "last_location_id") if session.get(k)}
        if last:
            context += f"\nКонтекст беседы: {last}"
        result = self.provider.chat_json(SYSTEM, context, llm_json_schema(), deadline=deadline)
        intents = result.get("intents")
        if not isinstance(intents, list):
            raise ProviderError("llm: response has no intents list", code="bad_response", retryable=True, provider="llm")
        return intents[:4]
