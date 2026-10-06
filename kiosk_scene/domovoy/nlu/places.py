"""Parse spoken places: «в третьей коробке нижнего шкафа» → ["Шкаф нижний", "Коробка 3"] (root → leaf)."""
from __future__ import annotations

import re
from dataclasses import dataclass, field

from ..text import normalize
from .numbers import ordinal_value, parse_number

# (stems, nominative, gender, kind, rank) – lower rank = larger container.
_NOUNS = [
    (("комнат",), "комната", "f", "room", 1), (("кухн",), "кухня", "f", "room", 1), (("спальн",), "спальня", "f", "room", 1),
    (("детск",), "детская", "f", "room", 1), (("гостин",), "гостиная", "f", "room", 1), (("ванн",), "ванная", "f", "room", 1),
    (("туалет",), "туалет", "m", "room", 1), (("коридор",), "коридор", "m", "room", 1), (("прихож",), "прихожая", "f", "room", 1),
    (("балкон",), "балкон", "m", "room", 1), (("лоджи",), "лоджия", "f", "room", 1), (("гараж",), "гараж", "m", "room", 1),
    (("мастерск",), "мастерская", "f", "room", 1), (("кладов",), "кладовка", "f", "room", 1), (("чердак",), "чердак", "m", "room", 1),
    (("подвал",), "подвал", "m", "room", 1), (("погреб",), "погреб", "m", "room", 1), (("кабинет",), "кабинет", "m", "room", 1),
    (("офис",), "офис", "m", "room", 1), (("дач",), "дача", "f", "home", 0), (("дом",), "дом", "m", "home", 0),
    (("шкафчик", "шкафик"), "шкафчик", "m", "cabinet", 2), (("шкаф",), "шкаф", "m", "cabinet", 2), (("стеллаж",), "стеллаж", "m", "cabinet", 2),
    (("тумбочк",), "тумбочка", "f", "cabinet", 2), (("тумб",), "тумба", "f", "cabinet", 2), (("комод",), "комод", "m", "cabinet", 2),
    (("верстак",), "верстак", "m", "cabinet", 2), (("сейф",), "сейф", "m", "cabinet", 2), (("антресол",), "антресоль", "f", "cabinet", 2),
    (("холодильник",), "холодильник", "m", "cabinet", 2), (("морозилк",), "морозилка", "f", "cabinet", 2), (("стол",), "стол", "m", "cabinet", 2),
    (("полк",), "полка", "f", "shelf", 3), (("ящик",), "ящик", "m", "shelf", 3), (("выдвижн",), "ящик", "m", "shelf", 3),
    (("коробк", "коробочк"), "коробка", "f", "box", 4), (("контейнер",), "контейнер", "m", "box", 4), (("органайзер",), "органайзер", "m", "box", 4),
    (("пакет",), "пакет", "m", "box", 4), (("сумк",), "сумка", "f", "box", 4), (("кейс",), "кейс", "m", "box", 4),
    (("чемодан",), "чемодан", "m", "box", 4), (("банк",), "банка", "f", "box", 4), (("ящичек",), "ящичек", "m", "box", 4),
    (("ячейк",), "ячейка", "f", "cell", 5), (("отсек",), "отсек", "m", "cell", 5), (("секци",), "секция", "f", "cell", 5),
    (("отделен",), "отделение", "n", "cell", 5), (("кармашек", "кармашк"), "кармашек", "m", "cell", 5),
]
_ADJ = {
    "нижн": ("нижний", "нижняя", "нижнее"), "верхн": ("верхний", "верхняя", "верхнее"), "лев": ("левый", "левая", "левое"),
    "прав": ("правый", "правая", "правое"), "средн": ("средний", "средняя", "среднее"),
    "централь": ("центральный", "центральная", "центральное"), "дальн": ("дальний", "дальняя", "дальнее"),
    "ближн": ("ближний", "ближняя", "ближнее"), "больш": ("большой", "большая", "большое"), "маленьк": ("маленький", "маленькая", "маленькое"),
    "син": ("синий", "синяя", "синее"), "красн": ("красный", "красная", "красное"), "зелен": ("зелёный", "зелёная", "зелёное"),
    "черн": ("чёрный", "чёрная", "чёрное"), "бел": ("белый", "белая", "белое"), "желт": ("жёлтый", "жёлтая", "жёлтое"),
    "прозрачн": ("прозрачный", "прозрачная", "прозрачное"),
}
_PREPOSITIONS = {"в", "во", "на", "из", "с", "со", "под", "над", "у", "около", "возле", "рядом", "внутри", "где", "там", "то", "самой", "самом"}
_GENDER_INDEX = {"m": 0, "f": 1, "n": 2}
_NUMBER_WORDS = {"номер", "№", "n"}


@dataclass
class PlaceGroup:
    noun: str
    kind: str
    rank: int
    gender: str
    ordinal: int | None = None
    adjectives: list[str] = field(default_factory=list)

    @property
    def display(self) -> str:
        parts = [self.noun.capitalize()]
        if self.ordinal is not None:
            parts.append(str(self.ordinal))
        for adj in self.adjectives:
            parts.append(_ADJ[adj][_GENDER_INDEX[self.gender]])
        return " ".join(parts)


@dataclass
class PlaceParse:
    path: list[str]
    kinds: list[str]
    unknown: list[str]
    consumed_all: bool

    @property
    def confidence(self) -> float:
        if not self.path:
            return 0.0
        return 0.95 if not self.unknown else max(0.3, 0.9 - 0.25 * len(self.unknown))


def noun_for(word: str) -> tuple | None:
    best = None
    for entry in _NOUNS:
        for stem in entry[0]:
            if word.startswith(stem) and len(word) - len(stem) <= 3 and (best is None or len(stem) > best[0]):
                best = (len(stem), entry)
    return best[1] if best else None


def adjective_key(word: str) -> str | None:
    for stem in _ADJ:
        if word.startswith(stem) and len(word) - len(stem) <= 4:
            return stem
    return None


def parse_place(phrase: str) -> PlaceParse:
    """Read a location phrase into a containment path. Unknown words are reported, never guessed at."""
    words = normalize(phrase).split()
    groups: list[PlaceGroup] = []
    pending_adj: list[str] = []
    pending_ord: int | None = None
    unknown: list[str] = []
    index = 0
    while index < len(words):
        word = words[index]
        if word in _PREPOSITIONS:
            index += 1
            continue
        entry = noun_for(word)
        if entry is not None:
            group = PlaceGroup(noun=entry[1], kind=entry[3], rank=entry[4], gender=entry[2], ordinal=pending_ord, adjectives=list(pending_adj))
            pending_adj, pending_ord = [], None
            index += 1
            # trailing modifiers: «коробка 3», «коробка номер три», «шкаф нижний»
            while index < len(words):
                nxt = words[index]
                if nxt in _NUMBER_WORDS and index + 1 < len(words):
                    parsed = parse_number(words, index + 1)
                    if parsed:
                        group.ordinal, index = int(parsed[0]), index + 1 + parsed[1]
                        continue
                if nxt.startswith("№") and nxt[1:].isdigit():
                    group.ordinal, index = int(nxt[1:]), index + 1
                    continue
                if nxt.isdigit() and group.ordinal is None:
                    group.ordinal, index = int(nxt), index + 1
                    continue
                key = adjective_key(nxt)
                if key and noun_for(words[index + 1] if index + 1 < len(words) else "") is None:
                    group.adjectives.append(key)
                    index += 1
                    continue
                break
            groups.append(group)
            continue
        ordinal = ordinal_value(word)
        if ordinal is not None:
            pending_ord = ordinal
        elif (key := adjective_key(word)) is not None:
            pending_adj.append(key)
        else:
            unknown.append(word)
        index += 1
    if pending_ord is not None or pending_adj:
        unknown.append("<dangling modifier>")
    # Big container first. Equal ranks keep spoken order: «коробка в коробке» → later contains earlier.
    ordered = sorted(enumerate(groups), key=lambda pair: (pair[1].rank, -pair[0]))
    return PlaceParse(
        path=[g.display for _, g in ordered], kinds=[g.kind for _, g in ordered], unknown=unknown, consumed_all=not unknown,
    )


def looks_like_place(phrase: str) -> bool:
    return any(noun_for(w) for w in normalize(phrase).split())
