"""Item phrase parsing: «девять резисторов 10 кОм» → (9, 'шт', 'резистор 10 кОм')."""
from __future__ import annotations

import re
from dataclasses import dataclass

from ..text import clean_phrase, normalize
from .numbers import parse_number

# units that count things or measure amounts (a leading number followed by one of these is a quantity)
QUANTITY_UNITS = {
    "шт": "шт", "штук": "шт", "штуки": "шт", "штука": "шт", "штуку": "шт", "пачка": "пачка", "пачки": "пачка", "пачек": "пачка",
    "упаковка": "уп.", "упаковки": "уп.", "упаковок": "уп.", "рулон": "рулон", "рулона": "рулон", "рулонов": "рулон",
    "комплект": "комплект", "комплекта": "комплект", "комплектов": "комплект", "пара": "пара", "пары": "пара", "пар": "пара",
    "г": "г", "грамм": "г", "грамма": "г", "граммов": "г", "кг": "кг", "килограмм": "кг", "килограмма": "кг", "килограммов": "кг",
    "м": "м", "метр": "м", "метра": "м", "метров": "м", "л": "л", "литр": "л", "литра": "л", "литров": "л", "мл": "мл",
    "бутылка": "бутылка", "бутылки": "бутылка", "бутылок": "бутылка", "банка": "банка", "банки": "банка", "банок": "банка",
}
# a leading number followed by these belongs to the *name* (component values), e.g. «10 кОм резисторов»
VALUE_UNITS = {"ком", "ом", "мом", "мкф", "пф", "нф", "вт", "ма", "мм", "см", "в", "гц", "кгц", "мгц"}
_GEN_PL_TO_NOM = re.compile(r"(?<=[бвгджзклмнпрстфхцчшщ])(ов|ев)$")
_LEADING_NOISE = {"мои", "моих", "все", "всех", "такие", "такой", "такую", "этот", "эти", "этих", "тот", "те", "ещё", "еще", "есть", "у", "меня", "а", "также", "еще"}


@dataclass
class ItemPhrase:
    name: str
    quantity: float | None
    unit: str
    confidence: float


def guess_lemma(word: str, *, measured: bool = False) -> str:
    """Cautious genitive → nominative for the head noun («резисторов» → «резистор»); otherwise unchanged.

    After a measure («5 метров провода») the noun is genitive *singular*, so «провода» → «провод».
    """
    lower = word.lower().replace("ё", "е")
    if measured and len(lower) > 4 and lower.endswith("а") and lower[-2] in "бвгджзклмнпрстфхцчшщ":
        return word[:-1]
    if len(lower) > 4 and _GEN_PL_TO_NOM.search(lower):
        return _GEN_PL_TO_NOM.sub("", word)
    if len(lower) > 5 and lower.endswith("ки") and not lower.endswith("ики"):
        return word[:-2] + "ка"
    return word


def parse_item_phrase(phrase: str) -> ItemPhrase | None:
    text = clean_phrase(phrase)
    if not text:
        return None
    original_words = text.split()
    folded = [w.lower().replace("ё", "е").strip(",.;:!?") for w in original_words]
    while folded and folded[0] in _LEADING_NOISE:
        folded.pop(0)
        original_words.pop(0)
    if not folded:
        return None
    quantity: float | None = None
    unit = ""
    confidence = 0.9
    parsed = parse_number(folded, 0)
    if parsed and not (folded[0].isdigit() and len(folded) == 1):
        value, used = parsed
        following = folded[used] if used < len(folded) else ""
        if following in VALUE_UNITS:
            pass  # «10 ком резисторов»: part of the name
        elif following in QUANTITY_UNITS:
            quantity, unit = value, QUANTITY_UNITS[following]
            original_words, folded = original_words[used + 1:], folded[used + 1:]
        elif used < len(folded):
            quantity = value
            original_words, folded = original_words[used:], folded[used:]
    # trailing quantity: «резисторы 10 кОм, девять штук»
    if quantity is None and len(folded) >= 3 and folded[-1] in ("шт", "штук", "штуки", "штука"):
        for width in (1, 2, 3):
            number = parse_number(folded[-1 - width:-1], 0)
            if number and number[1] == width:
                quantity, unit = number[0], "шт"
                original_words, folded = original_words[:-1 - width], folded[:-1 - width]
                break
    if folded and folded[0] in ("несколько", "много", "пару", "пара"):
        original_words, folded = original_words[1:], folded[1:]
        confidence -= 0.05
    if not folded:
        return None
    # after 2–4 a countable noun is genitive singular («два резистора»), after a measure it is too («метра провода»)
    genitive_singular = unit in ("м", "кг", "г", "л", "мл") or (quantity is not None and float(quantity).is_integer() and 2 <= quantity <= 4)
    original_words[0] = guess_lemma(original_words[0], measured=genitive_singular)
    name = clean_phrase(" ".join(original_words))
    if not name or len(name) > 200:
        return None
    if quantity is not None and not unit:
        unit = "шт"
    return ItemPhrase(name=name, quantity=quantity, unit=unit, confidence=confidence)
