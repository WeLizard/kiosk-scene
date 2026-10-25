"""Fast semantic routing for personal facts and questions.

The deterministic rules stay first: they are exact and instant. This router only catches phrases that
read like a personal fact or a question about one, where word-by-word matching is too brittle. Example
phrases are embedded once per model; a query costs one embedding (~0.3 s on the N150 iGPU), not a
generation. Anything outside this narrow domain returns None and goes to the optional LLM.
"""
from __future__ import annotations

import logging
import math
import re
import threading
from typing import Any

from ..errors import ProviderError
from ..text import capitalize_first, clean_phrase

LOG = logging.getLogger("domovoy.semantic")

# Calibrated on qwen3-embedding:0.6b with Russian phrases. The classes are deliberately narrow:
# a false positive here would write a note or answer from memory instead of letting the rules/LLM work.
ADD_NOTE_EXAMPLES = (
    "у меня день рождения третьего августа", "мой день рождения пятого мая",
    "я родился в тысяча девятьсот девяностом году", "моя жена родилась в июне",
    "у меня аллергия на орехи", "я люблю кофе без сахара", "мой размер обуви сорок два",
    "запомни, что код от домофона четыре семь один один", "у меня есть кот по имени Барсик",
    "моя машина стоит в гараже", "я работаю программистом", "у меня группа крови вторая положительная",
    "мне нравится джаз", "мой любимый цвет синий", "я предпочитаю утренний кофе", "я не люблю громкую музыку",
    "я люблю зелёный цвет", "мой любимый цвет зелёный", "я люблю тишину и спокойствие", "мне нравится зелёный цвет",
)
QUERY_EXAMPLES = (
    "когда у меня день рождения", "какой у меня размер обуви", "что ты знаешь обо мне",
    "что я люблю", "какая у меня группа крови", "как зовут моего кота",
    "что ты помнишь про мою машину", "где я работаю", "сколько мне лет", "когда родилась моя жена",
    "что мне нравится", "что я предпочитаю", "какой мой любимый цвет",
)
NEGATIVE_EXAMPLES = (
    "включи свет на кухне", "добавь молоко в список покупок", "напомни через час выключить духовку",
    "что у меня завтра по календарю", "где лежат резисторы", "привет", "на связи", "выключи телевизор",
    "покажи мои задачи", "открой шторы",
)
THRESHOLD = 0.72
MARGIN = 0.04


def _cosine(left: list[float], right: list[float]) -> float:
    if len(left) != len(right) or not left:
        return 0.0
    dot = sum(a * b for a, b in zip(left, right))
    norm = math.sqrt(sum(a * a for a in left)) * math.sqrt(sum(b * b for b in right))
    return dot / norm if norm else 0.0


class SemanticRouter:
    def __init__(self, app: Any) -> None:
        self.app = app
        self._lock = threading.Lock()
        self._model = ""
        self._vectors: list[list[float]] | None = None
        self._labels: list[str] = []

    def configured(self) -> bool:
        cfg = self.app.settings.get("ai")
        return bool(cfg.get("enabled") and (cfg.get("embedding_base_url") or cfg.get("base_url")) and cfg.get("embedding_model"))

    def warmup(self) -> None:
        try:
            self._ensure()
        except ProviderError as exc:
            LOG.debug("semantic warmup skipped: %s", exc.code)
        except Exception:  # noqa: BLE001 - warmup must never kill the service
            LOG.exception("semantic warmup failed")

    def _ensure(self) -> bool:
        if not self.configured():
            return False
        model = str(self.app.settings.get("ai").get("embedding_model") or "")
        with self._lock:
            if self._vectors is not None and self._model == model:
                return True
            labels = ["add_note"] * len(ADD_NOTE_EXAMPLES) + ["query_memory"] * len(QUERY_EXAMPLES) + \
                     ["negative"] * len(NEGATIVE_EXAMPLES)
            texts = [*ADD_NOTE_EXAMPLES, *QUERY_EXAMPLES, *NEGATIVE_EXAMPLES]
            vectors = self.app.llm.embed(texts)
            if len(vectors) != len(texts):
                return False
            self._labels, self._vectors, self._model = labels, vectors, model
            return True

    def route(self, text: str) -> list[dict[str, Any]] | None:
        if not self.configured():
            return None
        try:
            if not self._ensure():
                return None
            vector = self.app.llm.embed([text])[0]
        except ProviderError as exc:
            LOG.debug("semantic route skipped: %s", exc.code)
            return None
        except Exception:  # noqa: BLE001 - a broken embedding server must not break commands
            LOG.exception("semantic route failed")
            return None
        scores = {name: 0.0 for name in ("add_note", "query_memory", "negative")}
        with self._lock:
            vectors, labels = self._vectors or [], self._labels
            for label, example in zip(labels, vectors):
                scores[label] = max(scores[label], _cosine(vector, example))
        best = max(scores, key=scores.get)
        if best == "negative" or scores[best] < THRESHOLD:
            return None
        others = [value for name, value in scores.items() if name != best]
        if max(others) > scores[best] - MARGIN:
            return None
        confidence = round(min(0.95, 0.78 + (scores[best] - THRESHOLD) * 0.9), 3)
        clean = clean_phrase(text)
        if best == "add_note":
            body = re.sub(r"^(?:запомни|запиши|сохрани|не забудь)\b[,\s:.-]*", "", clean, flags=re.I).strip()
            return [{"type": "add_note", "confidence": confidence, "evidence": text, "text": capitalize_first(body or clean)}]
        return [{"type": "query_memory", "confidence": confidence, "evidence": text, "query": clean}]
