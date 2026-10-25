"""Grammatical gender for the assistant's own speech.

Replies are written in a gender-neutral way where possible. For the remaining first-person forms
(«понял», «не уверен», «готов») this renders the feminine variant when the owner asks for it. Quoted
fragments are left untouched: they usually contain the user's words or a name.
"""
from __future__ import annotations

import re
from typing import Any

_FEMININE_VERBS = {
    "понял": "поняла", "записал": "записала", "нашёл": "нашла", "нашел": "нашла",
    "показал": "показала", "сделал": "сделала", "принял": "приняла", "отправил": "отправила",
    "создал": "создала", "добавил": "добавила", "обновил": "обновила", "удалил": "удалила",
    "поставил": "поставила", "включил": "включила", "выключил": "выключила", "проверил": "проверила",
    "посмотрел": "посмотрела", "услышал": "услышала", "расслышал": "расслышала", "смог": "смогла",
    "успел": "успела", "начал": "начала", "закончил": "закончила", "напомнил": "напомнила",
    "изменил": "изменила", "исправил": "исправила", "поправил": "поправила", "отменил": "отменила",
    "вернул": "вернула", "выбрал": "выбрала", "сохранил": "сохранила", "загрузил": "загрузила",
    "подготовил": "подготовила", "попросил": "попросила", "сказал": "сказала", "ответил": "ответила",
    "решил": "решила", "хотел": "хотела", "принёс": "принесла", "принес": "принесла",
    "занёс": "занесла", "занес": "занесла", "положил": "положила", "убрал": "убрала",
    "спрятал": "спрятала", "сложил": "сложила", "кинул": "кинула", "оказался": "оказалась",
    "постарался": "постаралась", "собрался": "собралась", "записался": "записалась",
    "запомнил": "запомнила", "отметил": "отметила", "уточнил": "уточнила", "подтвердил": "подтвердила",
    "одобрил": "одобрила", "отклонил": "отклонила", "вспомнил": "вспомнила", "забыл": "забыла",
    "написал": "написала", "прочитал": "прочитала", "открыл": "открыла", "закрыл": "закрыла",
    "взял": "взяла", "дал": "дала", "пришёл": "пришла", "пришел": "пришла", "ушёл": "ушла",
    "ушел": "ушла", "купил": "купила", "приготовил": "приготовила", "позвонил": "позвонила",
    "встретил": "встретила", "разрешил": "разрешила", "запретил": "запретила", "перевёл": "перевела",
    "перевел": "перевела", "зафиксировал": "зафиксировала", "учёл": "учла", "учел": "учла",
    "выполнил": "выполнила",
}
_FIRST_PERSON_ADJECTIVES = {
    "уверен": "уверена", "готов": "готова", "должен": "должна", "рад": "рада",
    "согласен": "согласна", "прав": "права", "виноват": "виновата",
}
_SPECIAL_VERBS = {"мог": "могла"}
_QUOTED = re.compile(r"(«[^»]*»|\"[^\"]*\"|`[^`]*`)")
_WORD = re.compile(r"(?<![0-9A-Za-zА-Яа-яЁё])([0-9A-Za-zА-Яа-яЁё]+)(?![0-9A-Za-zА-Яа-яЁё])")
_FIRST_PERSON = re.compile(
    r"(?P<pre>(?:\bя\s+|\bЯ\s+|^|[.!?]\s+)(?:не\s+)?)(?P<word>уверен|готов|должен|рад|согласен|прав|виноват)\b",
    re.I | re.M,
)
_FIRST_PERSON_VERB = re.compile(
    r"(?P<pre>(?:\bя\s+|\bЯ\s+|^|[.!?]\s+)(?:не\s+)?)(?P<word>мог)\b",
    re.I | re.M,
)


def speech_gender(settings: Any) -> str:
    try:
        identity = settings.get("identity")
    except AttributeError:
        identity = None
    return "female" if isinstance(identity, dict) and identity.get("gender") == "female" else "male"


def _match_case(source: str, replacement: str) -> str:
    if source.isupper():
        return replacement.upper()
    if source[:1].isupper():
        return replacement[:1].upper() + replacement[1:]
    return replacement


def _render_segment(text: str) -> str:
    def verb(match: re.Match[str]) -> str:
        word = match.group(1)
        replacement = _FEMININE_VERBS.get(word.casefold())
        return _match_case(word, replacement) if replacement else word

    text = _WORD.sub(verb, text)

    def first_person(match: re.Match[str]) -> str:
        word = match.group("word")
        replacement = _FIRST_PERSON_ADJECTIVES.get(word.casefold()) or _SPECIAL_VERBS.get(word.casefold())
        return match.group("pre") + (_match_case(word, replacement) if replacement else word)

    text = _FIRST_PERSON.sub(first_person, text)
    return _FIRST_PERSON_VERB.sub(first_person, text)


def render(text: str, gender: str) -> str:
    if gender != "female" or not text:
        return text
    parts = _QUOTED.split(str(text))
    for index in range(0, len(parts), 2):
        parts[index] = _render_segment(parts[index])
    return "".join(parts)


class SpeechStyle:
    def __init__(self, settings: Any) -> None:
        self.settings = settings

    def render(self, text: str) -> str:
        return render(text, speech_gender(self.settings))

    def render_payload(self, payload: dict[str, Any]) -> dict[str, Any]:
        if isinstance(payload.get("reply"), str):
            payload["reply"] = self.render(payload["reply"])
        if isinstance(payload.get("questions"), list):
            payload["questions"] = [self.render(item) if isinstance(item, str) else item for item in payload["questions"]]
        if isinstance(payload.get("options"), list):
            payload["options"] = [self.render(item) if isinstance(item, str) else item for item in payload["options"]]
        for result in payload.get("results") or []:
            if isinstance(result, dict) and isinstance(result.get("message"), str):
                result["message"] = self.render(result["message"])
        return payload
