"""Text normalisation shared by parsing, matching and search (Russian-first, English tolerated)."""
from __future__ import annotations

import re
import unicodedata

_SUFFIXES = tuple(sorted(
    [
        "ыми", "ями", "ами", "ого", "его", "ему", "ому", "ими", "иях", "ях", "ах", "ов", "ев", "ей", "ом", "ем",
        "ою", "ею", "ая", "яя", "ое", "ее", "ые", "ие", "ый", "ий", "ой", "ых", "их", "ым", "им", "ую", "юю",
        "ам", "ям", "ы", "и", "а", "я", "у", "ю", "е", "о", "ь", "й",
    ],
    key=len,
    reverse=True,
))

STOPWORDS = frozenset(
    """
    где что как мне мой моя мое мои у меня в во на из для и или по с со к ко о об от до за при не ни
    ли же бы ну вот это этот эта эти тот та те там тут здесь лежит лежат находится находятся хранится
    хранятся есть был была было были будет пожалуйста найди покажи скажи подскажи который которая которое
    которые которым которой которого я ты мы вы он она они мною нам свой своя свои сколько ещё еще
    the a an of in on at is are where what
    """.split()
)

_LATIN_TO_RU = {"ω": "ом", "Ω": "ом", "μ": "мк", "µ": "мк"}


def normalize(text: str) -> str:
    """Lower-case, fold ё, drop punctuation. Digits and decimal separators between digits are kept."""
    value = unicodedata.normalize("NFKC", str(text or "").replace("№", " номер "))
    for source, target in _LATIN_TO_RU.items():
        value = value.replace(source, target)
    value = value.lower().replace("ё", "е")
    value = re.sub(r"(?<=\d)[,](?=\d)", ".", value)
    value = re.sub(r"[^0-9a-zа-я.:+/№#-]+", " ", value)
    # keep separators that sit between digits (10.5, 18:30, 3/4) or form an ordinal suffix (3-й)
    value = re.sub(r"(?<![0-9])[.:/+-]+|[.:/+-]+(?![0-9а-я])", " ", value)
    value = re.sub(r"(?<![0-9])[.:/+]+(?=[0-9])|(?<=[0-9])[.:/+]+(?![0-9])", " ", value)
    return re.sub(r"\s+", " ", value).strip()


def stem(word: str) -> str:
    """Very small suffix stripper: enough to equate резистор/резисторы/резисторов, коробке/коробка."""
    if not word or word.isdigit() or not re.search(r"[а-я]", word) or len(word) < 4:
        return word
    for suffix in _SUFFIXES:
        if word.endswith(suffix) and len(word) - len(suffix) >= 3:
            return word[: -len(suffix)]
    return word


def tokens(text: str, *, drop_stopwords: bool = False) -> list[str]:
    result = []
    for word in normalize(text).split():
        if drop_stopwords and word in STOPWORDS:
            continue
        result.append(stem(word))
    return result


def norm_key(text: str) -> str:
    """Canonical comparison key for names: stemmed tokens, stopwords kept (they distinguish 'для воды')."""
    return " ".join(tokens(text))


def trigrams(text: str) -> set[str]:
    padded = f"  {normalize(text)} "
    return {padded[i : i + 3] for i in range(len(padded) - 2)}


def similarity(left: str, right: str) -> float:
    """Dice coefficient over character trigrams (typo/inflection tolerant), 0..1."""
    a, b = trigrams(left), trigrams(right)
    if not a or not b:
        return 0.0
    return 2 * len(a & b) / (len(a) + len(b))


def clean_phrase(text: str) -> str:
    """Trim whitespace and stray punctuation from a user phrase, keeping its own capitalisation."""
    value = re.sub(r"\s+", " ", str(text or "")).strip()
    return value.strip(" \t\r\n,.;:!?-–—\"'«»")


def capitalize_first(text: str) -> str:
    return text[:1].upper() + text[1:] if text else text
