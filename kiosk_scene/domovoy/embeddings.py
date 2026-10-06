"""Embedding providers.

`HashingEmbedder` is the always-available local fallback: deterministic character-trigram + stemmed-word
hashing into a fixed-size vector. It gives typo/inflection tolerant similarity with zero dependencies, but it
is *lexical*, not semantic – the search API reports which mode answered so the UI never overstates it.
A model embedder (OpenAI-compatible `/v1/embeddings`, e.g. llama.cpp) adds real semantic similarity.
"""
from __future__ import annotations

import math
import struct
import zlib
from typing import Protocol, Sequence

from .text import normalize, stem


class Embedder(Protocol):
    name: str
    semantic: bool

    def embed(self, texts: Sequence[str]) -> list[list[float]]: ...


class HashingEmbedder:
    semantic = False

    def __init__(self, dim: int = 256) -> None:
        self.dim = dim
        self.name = f"hash-trigram-{dim}"

    def embed(self, texts: Sequence[str]) -> list[list[float]]:
        return [self._one(text) for text in texts]

    def _one(self, text: str) -> list[float]:
        vec = [0.0] * self.dim
        words = [stem(w) for w in normalize(text).split()]
        features: list[tuple[str, float]] = []
        for word in words:
            features.append((f"w:{word}", 2.0))
            padded = f"^{word}$"
            features.extend((f"t:{padded[i:i + 3]}", 1.0) for i in range(max(1, len(padded) - 2)))
        for feature, weight in features:
            h = zlib.crc32(feature.encode("utf-8"))
            index = h % self.dim
            sign = 1.0 if (h >> 16) & 1 else -1.0
            vec[index] += sign * weight
        return _unit(vec)


def _unit(vec: list[float]) -> list[float]:
    norm = math.sqrt(sum(v * v for v in vec))
    return [v / norm for v in vec] if norm else vec


def pack(vec: Sequence[float]) -> bytes:
    return struct.pack(f"<{len(vec)}f", *vec)


def unpack(blob: bytes) -> list[float]:
    return list(struct.unpack(f"<{len(blob) // 4}f", blob))


def cosine(a: Sequence[float], b: Sequence[float]) -> float:
    if len(a) != len(b) or not a:
        return 0.0
    return sum(x * y for x, y in zip(a, b))
