"""Russian number words (cardinals and ordinals, all cases) and digits."""
from __future__ import annotations

import re

_UNITS = {
    "ноль": 0, "нол": 0, "один": 1, "одн": 1, "одного": 1, "одному": 1, "одним": 1, "одной": 1, "одну": 1,
    "два": 2, "две": 2, "двух": 2, "двум": 2, "двумя": 2, "три": 3, "трех": 3, "трем": 3, "тремя": 3,
    "четыре": 4, "четырех": 4, "четырем": 4, "четырьмя": 4, "пять": 5, "пяти": 5, "пятью": 5,
    "шесть": 6, "шести": 6, "шестью": 6, "семь": 7, "семи": 7, "семью": 7, "восемь": 8, "восьми": 8, "восемью": 8,
    "девять": 9, "девяти": 9, "девятью": 9, "десять": 10, "десяти": 10, "десятью": 10,
    "одиннадцать": 11, "одиннадцати": 11, "двенадцать": 12, "двенадцати": 12, "тринадцать": 13, "тринадцати": 13,
    "четырнадцать": 14, "четырнадцати": 14, "пятнадцать": 15, "пятнадцати": 15, "шестнадцать": 16,
    "шестнадцати": 16, "семнадцать": 17, "семнадцати": 17, "восемнадцать": 18, "восемнадцати": 18,
    "девятнадцать": 19, "девятнадцати": 19,
}
_TENS = {
    "двадцать": 20, "двадцати": 20, "тридцать": 30, "тридцати": 30, "сорок": 40, "сорока": 40,
    "пятьдесят": 50, "пятидесяти": 50, "шестьдесят": 60, "шестидесяти": 60, "семьдесят": 70, "семидесяти": 70,
    "восемьдесят": 80, "восьмидесяти": 80, "девяносто": 90, "девяноста": 90,
}
_HUNDREDS = {
    "сто": 100, "ста": 100, "двести": 200, "двухсот": 200, "триста": 300, "трехсот": 300, "четыреста": 400,
    "четырехсот": 400, "пятьсот": 500, "пятисот": 500, "шестьсот": 600, "шестисот": 600, "семьсот": 700,
    "семисот": 700, "восемьсот": 800, "восьмисот": 800, "девятьсот": 900, "девятисот": 900,
}
_SPECIAL = {"пара": 2, "пару": 2, "пары": 2, "парочку": 2, "полтора": 1.5, "полторы": 1.5, "пол": 0.5, "половина": 0.5}

# Ordinal stems -> value (works for every case/gender because only the stem is compared).
_ORDINAL_STEMS = [
    ("перв", 1), ("втор", 2), ("трет", 3), ("четверт", 4), ("пят", 5), ("шест", 6), ("седьм", 7),
    ("восьм", 8), ("девят", 9), ("десят", 10), ("одиннадцат", 11), ("двенадцат", 12), ("тринадцат", 13),
    ("четырнадцат", 14), ("пятнадцат", 15), ("шестнадцат", 16), ("семнадцат", 17), ("восемнадцат", 18),
    ("девятнадцат", 19), ("двадцат", 20),
]
_ORDINAL_ENDINGS = ("ый", "ий", "ой", "ая", "яя", "ое", "ее", "ые", "ие", "ого", "его", "ому", "ему", "ым", "им",
                    "ом", "ем", "ую", "юю", "ой", "ей", "ых", "их", "ыми", "ими", "ья", "ье", "ью", "ьей", "ьем", "ьего")


def _all_cardinals() -> dict[str, float]:
    table: dict[str, float] = {}
    for source in (_UNITS, _TENS, _HUNDREDS, _SPECIAL):
        table.update({k: float(v) for k, v in source.items()})
    return table


_CARDINALS = _all_cardinals()
_DIGIT_RE = re.compile(r"^\d+(?:\.\d+)?$")


def ordinal_value(word: str) -> int | None:
    """`третьей` -> 3, `нижнего` -> None. Also accepts `3-й`, `3й`, `№3`."""
    match = re.fullmatch(r"(\d+)-?(?:й|я|е|ю|ой|го|му|м|ая|ый|ое|ые|ых|ом|ей)", word)
    if match:
        return int(match.group(1))
    for stem, value in _ORDINAL_STEMS:
        if word.startswith(stem):
            rest = word[len(stem):]
            if rest in _ORDINAL_ENDINGS or rest in ("ь" + e for e in ("я", "е", "ю", "ей", "ем")):
                return value
            # "третий", "третья", "третьей", "третьего": the stem swallows a soft sign.
            if stem == "трет" and rest[:1] == "ь":
                return value
    return None


def is_number_word(word: str) -> bool:
    return bool(_DIGIT_RE.match(word)) or word in _CARDINALS


def parse_number(words: list[str], start: int = 0) -> tuple[float, int] | None:
    """Parse a cardinal at `words[start:]`. Returns `(value, words_consumed)` or None.

    Handles digits (`10`, `2.5`), single words, and compounds (`двадцать пять`, `сто двадцать три`,
    `две тысячи`).
    """
    if start >= len(words):
        return None
    first = words[start]
    if _DIGIT_RE.match(first):
        value = float(first)
        used = 1
        if start + used < len(words) and words[start + used] in ("тысяч", "тысячи", "тысяча", "тыс"):
            return value * 1000, used + 1
        return value, used
    if first not in _CARDINALS:
        return None
    total = 0.0
    used = 0
    index = start
    seen_group = False
    current = 0.0
    while index < len(words):
        word = words[index]
        if word in _HUNDREDS and not seen_group_hundreds(current):
            current += _HUNDREDS[word]
        elif word in _TENS and current % 100 == 0:
            current += _TENS[word]
        elif word in _UNITS and current % 10 == 0 and (current % 100 == 0 or current % 100 >= 20):
            current += _UNITS[word]
        elif word in _SPECIAL and used == 0:
            return _SPECIAL[word], 1
        elif word in ("тысяча", "тысячи", "тысяч", "тыс") and used > 0:
            total += (current or 1) * 1000
            current = 0.0
            seen_group = True
            index += 1
            used += 1
            continue
        else:
            break
        index += 1
        used += 1
    if used == 0:
        return None
    return total + current, used


def seen_group_hundreds(current: float) -> bool:
    return current >= 100


def find_numbers(words: list[str]) -> list[tuple[int, int, float]]:
    """All `(start, length, value)` number spans in a token list."""
    spans = []
    index = 0
    while index < len(words):
        parsed = parse_number(words, index)
        if parsed:
            spans.append((index, parsed[1], parsed[0]))
            index += parsed[1]
        else:
            index += 1
    return spans
