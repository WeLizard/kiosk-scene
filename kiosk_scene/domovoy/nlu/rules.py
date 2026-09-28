"""Deterministic Russian command interpreter (the fast path; no model involved).

Design rules:
  * Every recognised sentence becomes intents with an honest `confidence`; anything the patterns do not
    cover returns `None` so the pipeline can ask an (optional) local model or say it did not understand.
  * Patterns run on a folded copy of the text (lower-case, ё→е) that has the *same length* as the original,
    so matched spans can be cut out of the original to keep the user's own spelling for names and titles.
  * Nothing here touches the database. Resolution (which item? which calendar?) happens in the executor.
"""
from __future__ import annotations

import datetime as dt
import re
from dataclasses import dataclass, field
from typing import Any, Callable

from ..clock import to_iso
from ..text import clean_phrase, norm_key, stem
from .datetimes import DAY_PART_HOURS, WhenResult, extract_when
from .items import parse_item_phrase
from .numbers import ordinal_value, parse_number
from .places import looks_like_place, parse_place
from .presence_words import DAY_WINDOWS

Intent = dict[str, Any]

APPOINTMENT_NOMINATIVE = {
    "стоматолога": "Стоматолог", "врача": "Врач", "зубного": "Зубной", "парикмахера": "Парикмахер", "терапевта": "Терапевт",
    "окулиста": "Окулист", "сантехника": "Сантехник", "электрика": "Электрик", "мастера": "Мастер", "юриста": "Юрист",
    "нотариуса": "Нотариус", "педиатра": "Педиатр", "ветеринара": "Ветеринар", "косметолога": "Косметолог", "массажиста": "Массажист",
    "маникюр": "Маникюр", "педикюр": "Педикюр", "стрижку": "Стрижка", "приём": "Приём", "прием": "Приём",
}


@dataclass
class InterpretContext:
    now: dt.datetime
    session: dict[str, Any] = field(default_factory=dict)
    contact_names: list[str] = field(default_factory=list)
    default_reminder_hour: int = 9


def fold(text: str) -> str:
    return text.lower().replace("ё", "е")


def _cut(original: str, spans: list[tuple[int, int]]) -> str:
    pieces, last = [], 0
    for start, end in sorted(spans):
        if start < last:
            continue
        pieces.append(original[last:start])
        last = end
    pieces.append(original[last:])
    value = re.sub(r"\s+", " ", " ".join(pieces)).strip()
    value = re.sub(r"\s+([,.;:!?])", r"\1", value)
    return re.sub(r"^[,.;:\s]+|[,.;:\s]+$", "", value)


def _intent(kind: str, confidence: float, evidence: str, **fields: Any) -> Intent:
    result: Intent = {"type": kind, "confidence": round(confidence, 3), "evidence": evidence[:300]}
    result.update({k: v for k, v in fields.items() if v is not None and v != "" and v != []})
    return result


def _cap(text: str) -> str:
    return text[:1].upper() + text[1:] if text else text


class RuleInterpreter:
    name = "rules"

    def __init__(self) -> None:
        self._handlers: list[Callable[[str, str, InterpretContext], list[Intent] | None]] = [
            self._undo, self._help, self._correction, self._reminder, self._message, self._calendar,
            self._shopping_and_tasks, self._home_assistant, self._inventory, self._note,
        ]

    # ---- entry point ---------------------------------------------------------------------------

    def interpret(self, text: str, ctx: InterpretContext) -> list[Intent] | None:
        original = self._strip_invocation(text)
        if not original:
            return None
        folded = fold(original)
        for handler in self._handlers:
            result = handler(original, folded, ctx)
            if result:
                return result
        if original.rstrip().endswith("?") and len(original) > 6:
            return [_intent("query_memory", 0.55, original, query=clean_phrase(original))]
        return None

    @staticmethod
    def _strip_invocation(text: str) -> str:
        value = " ".join(str(text or "").split())
        value = re.sub(r"^(?:(?:эй|слушай|привет|алиса)[, ]+)*", "", value, flags=re.I)
        value = re.sub(r"^(?:(?:попроси|спроси у|скажи|передай)\s+)?домов\w*[, :.-]*", "", value, flags=re.I)
        value = re.sub(r"^(?:(?:пожалуйста|давай|ну)[, ]+)+", "", value, flags=re.I)
        value = re.sub(r"[, ]*(?:пожалуйста|спасибо)[.! ]*$", "", value, flags=re.I)
        return value.strip()

    # ---- meta ----------------------------------------------------------------------------------

    def _undo(self, original: str, folded: str, ctx: InterpretContext) -> list[Intent] | None:
        if re.fullmatch(r"(?:отмени|отмена|откати|верни(?: как было)?|отмени это|отмени последнее(?: действие)?|отмени все)[.!]?", folded.strip()):
            return [_intent("undo", 0.95, original)]
        return None

    def _help(self, original: str, folded: str, ctx: InterpretContext) -> list[Intent] | None:
        if re.fullmatch(r"(?:помощь|что ты умеешь|что умеешь|что можешь|помоги)[?.!]?", folded.strip()):
            return [_intent("help", 0.95, original)]
        return None

    # ---- corrections of the previous command ---------------------------------------------------

    def _correction(self, original: str, folded: str, ctx: InterpretContext) -> list[Intent] | None:
        m = re.match(r"^(?:нет|не так|неправильно|ой|ошибся|ошиблась|извини|исправь|поправь|на самом деле)\b[,.!:\s-]*(?P<rest>.*)$", folded)
        rest = m.group("rest") if m else None
        if rest is None and re.match(r"^не\s+.+?[,\s]+а\s+.+$", folded):
            rest = folded  # «не девять, а десять»
        if rest is None:
            m2 = re.match(r"^(?:исправь|поправь|поменяй|измени)\s+количество\s+на\s+(?P<rest>.+)$", folded)
            rest = m2.group("rest") if m2 else None
            if rest is None:
                return None
        if not rest:
            return None
        both = re.match(r"^не\s+(?P<old>.+?)[,\s]+а\s+(?P<new>.+)$", rest)
        target = both.group("new") if both else rest
        target = re.sub(r"^(?:количество|там)\s+", "", target.strip())
        number = parse_number(target.split(), 0)
        words = target.split()
        if number and number[1] >= len(words) - 1 and (number[1] == len(words) or words[number[1]] in ("шт", "штук", "штуки", "штука")):
            return [_intent("set_quantity", 0.9, original, use_last=True, quantity=number[0])]
        place_match = re.match(r"^(?:в|во|на)\s+(?P<loc>.+)$", target)
        if place_match and looks_like_place(place_match.group("loc")):
            place = parse_place(place_match.group("loc"))
            return [_intent("move_item", min(0.9, place.confidence), original, use_last=True, location_path=place.path, location_kinds=place.kinds)]
        return None

    # ---- reminders and event-driven messages ---------------------------------------------------

    _PRESENCE = re.compile(
        r"(?P<lead>\b(?:когда|как только|как|после того как)\s+(?:я\s+)?(?:(?P<p1>утром|днем|вечером|ночью)\s+)?"
        r"(?P<verb>буду|окажусь|приду|вернусь|зайду|войду|появлюсь|пойду|приеду|заеду)\s+(?:(?P<p2>утром|днем|вечером|ночью)\s+)?"
        r"(?:(?P<home>домой|дома|в квартиру|в квартире)|(?:в|на)\s+(?P<place>[а-я]+(?:\s+[а-я]+)?))(?P<tail>\s+(?:вечером|утром|днем))?)"
    )
    _STATE = re.compile(
        r"(?P<lead>\b(?:когда|как только|после того как|как)\s+(?P<what>[а-я0-9 ]{2,40}?)\s+"
        r"(?P<verb>закончит\w*|завершит\w*|допечатает|доделает|остынет|нагреется|включится|выключится|начнет\w*|запустится|отключится)"
        r"(?:\s+(?P<obj>печатать|печать|стирку|стирать|уборку|работу|цикл|сушку|нагрев|заряд\w*))?)"
    )
    _CHANNEL = re.compile(r"\b(?:(?:в|по)\s+(?:телеграм\w*|телеге|тг|telegram)|(?P<voice>голосом|вслух|на колонк\w+|на станци\w+|в колонк\w+)|(?P<ui>на экран\w*|на дисплей))\b")

    def _reminder(self, original: str, folded: str, ctx: InterpretContext) -> list[Intent] | None:
        remind = re.search(r"\bнапомни\w*\b|\bнапоминани\w*\b|\bпоставь напоминани\w*\b", folded)
        notify = re.search(r"\b(?:отправь|пришли|напиши|сообщи|уведоми|дай знать)\s+мне\b", folded)
        presence = self._PRESENCE.search(folded)
        state = None if presence else self._STATE.search(folded)
        if not remind and not (notify and (presence or state)):
            return None
        spans: list[tuple[int, int]] = []
        trigger: dict[str, Any] | None = None
        day_part = None
        confidence = 0.92
        entity_hint = ""
        if presence:
            spans.append(presence.span())
            day_part = presence.group("p1") or presence.group("p2") or (presence.group("tail") or "").strip() or None
            transition = presence.group("verb") not in ("буду",)
            place = presence.group("place")
            if presence.group("home") or (place and re.match(r"^(?:дом|квартир)", place)):
                trigger = {"type": "presence", "place": "home", "require_transition": transition}
            elif place:
                trigger = {"type": "room", "place": clean_phrase(place), "require_transition": True}
            if trigger and day_part:
                key = {"утром": "morning", "днем": "day", "вечером": "evening", "ночью": "night"}[day_part.strip()]
                start, end = DAY_WINDOWS[key]
                trigger["window"] = {"from": start, "to": end}
            confidence = 0.88
        elif state:
            spans.append(state.span())
            verb = state.group("verb")
            event = "start" if verb.startswith(("начн", "запуст", "включит")) else "finish"
            entity_hint = clean_phrase(state.group("what"))
            trigger = {"type": "state", "event": event, "entity_hint": entity_hint, "require_transition": True}
            confidence = 0.8
        rest_folded = folded
        remaining_original = original
        cmd_spans = list(spans)
        for pattern in (r"\bнапомни\w*(?:\s+мне)?\b", r"\b(?:отправь|пришли|напиши|сообщи|уведоми|дай знать)\s+мне(?:\s+(?:сообщение|уведомление|смс))?\b", r"\bпоставь напоминани\w*\b"):
            for hit in re.finditer(pattern, folded):
                cmd_spans.append(hit.span())
        channel = None
        ch = self._CHANNEL.search(folded)
        if ch:
            cmd_spans.append(ch.span())
            channel = "speak" if ch.group("voice") else "ui" if ch.group("ui") else "telegram"
        cut_once = _cut(original, cmd_spans)
        # times are found in what remains of the sentence (the trigger clause is already gone)
        when = extract_when(cut_once, ctx.now, default_hour=ctx.default_reminder_hour)
        text = when.text
        text = re.sub(r"^(?:что|о том,? что|про|чтобы я|чтобы)\s+", "", text, flags=re.I)
        text = re.sub(r"\s*[,;]\s*$", "", text)
        text = clean_phrase(text)
        if trigger and trigger["type"] == "state" and not text:
            text = f"{_cap(entity_hint)}: {'готово' if trigger['event'] == 'finish' else 'началось'}"
        if not text:
            return [_intent("clarify", 0.4, original, question="О чём напомнить?")]
        if trigger is None and when.start is None and when.recurrence is None:
            return [_intent("clarify", 0.4, original, question="Когда напомнить?")]
        if trigger is None and when.day_part and not when.time_given:
            pass
        fields: dict[str, Any] = {"text": _cap(text), "channel": channel}
        if trigger:
            fields["trigger"] = trigger
            if when.start is not None and not trigger.get("window") and when.time_given:
                # "когда приду домой, но не раньше 18:00" – keep as a window start
                trigger["window"] = {"from": when.start.strftime("%H:%M"), "to": "23:59"}
        else:
            start = when.start
            if start is not None and when.recurrence and start <= ctx.now:
                from .datetimes import next_occurrence
                start = next_occurrence(when.recurrence, start) or start
            fields["when"] = to_iso(start) if start else None
            fields["date_only"] = when.date_only or None
            fields["recurrence"] = when.recurrence
        return [_intent("create_reminder", confidence, original, **fields)]

    # ---- messages ------------------------------------------------------------------------------

    _MESSAGE = re.compile(
        r"^(?:отправь|отправить|напиши|написать|пошли|передай|сообщи|скажи|напишите)\s+(?P<who>[а-яa-z-]+)\s*(?P<mid>.*)$"
    )

    def _message(self, original: str, folded: str, ctx: InterpretContext) -> list[Intent] | None:
        m = self._MESSAGE.match(folded)
        if not m:
            return None
        who = m.group("who")
        known = {stem(w) for name in ctx.contact_names for w in fold(name).split()}
        is_self = who in ("мне", "себе")
        if not is_self and stem(who) not in known and who not in ("контакту",):
            if not re.search(r"\b(?:телеграм\w*|телеге|тг|telegram|сообщени\w+)\b", folded):
                return None
        start = m.start("mid")
        mid_folded = folded[start:]
        mid_original = original[start:]
        channel = "telegram"
        ch = re.match(r"^\s*(?:(?:в|по)\s+)?(?:(?P<tg>телеграм\w*|телеге|тг|telegram)|(?P<sp>голосом|вслух|на колонк\w+)|(?P<ha>приложени\w+|уведомлени\w+))\s*[,:-]?\s*", mid_folded)
        offset = 0
        if ch:
            channel = "speak" if ch.group("sp") else "ha_notify" if ch.group("ha") else "telegram"
            offset = ch.end()
        rest_original = mid_original[offset:]
        rest_folded = mid_folded[offset:]
        rest_original = re.sub(r"^(?:сообщение|сообщением)\s*", "", rest_original, flags=re.I)
        rest_folded = re.sub(r"^(?:сообщение|сообщением)\s*", "", rest_folded)
        when_iso = None
        separator = re.search(r"\b(?:что|чтобы)\b|[:,]", rest_folded)
        if separator and separator.start() > 0:
            head = rest_original[: separator.start()]
            timing = extract_when(head, ctx.now, default_hour=ctx.default_reminder_hour)
            if timing.start is not None:
                when_iso = to_iso(timing.start)
                rest_original = rest_original[separator.start():]
        rest_original = re.sub(r"^(?:\s*(?:что|чтобы)\s+|[:,\s]+)", "", rest_original, flags=re.I).strip()
        if not rest_original:
            return [_intent("clarify", 0.4, original, question="Что отправить?")]
        recipient = "self" if is_self else _cap(who)
        # An unknown name is not a parsing doubt: the structure is clear and the executor will say "unknown contact".
        confidence = 0.9 if (is_self or stem(who) in known) else 0.85
        return [_intent("send_message", confidence, original, recipient=recipient, text=_cap(clean_phrase(rest_original)), channel=channel, when=when_iso)]

    # ---- calendar ------------------------------------------------------------------------------

    _CAL_QUERY = re.compile(
        r"(?:^|\b)(?:что|какие|какой|есть ли|покажи|прочитай|скажи|расскажи|чем)\b.*\b(?:календар\w*|событи\w*|встреч\w*|планы|расписани\w*|запланирован\w*|дела)\b"
        r"|^что у меня\s+(?:на\s+)?(?:сегодня|завтра|послезавтра|этой неделе|неделе|следующей неделе|(?:в|во)\s+\w+)\??$"
    )

    def _calendar(self, original: str, folded: str, ctx: InterpretContext) -> list[Intent] | None:
        if self._CAL_QUERY.search(folded) and not re.search(r"\b(?:добавь|поставь|запиши|создай|запланируй|занеси)\b", folded):
            return [self._calendar_query(original, folded, ctx)]
        update = re.match(r"^(?:перенеси|перенести|передвинь|сдвинь|перезапиши|перенесите)\s+(?P<title>.+?)\s+(?P<whenfull>(?:на|в|во)\s+(?P<when>.+))$", folded)
        if update and not looks_like_place(update.group("when")):
            # keep the preposition: «на пятницу» / «в четверг» need it to be recognised as a weekday
            when = extract_when(original[update.start("whenfull"):], ctx.now, default_hour=ctx.default_reminder_hour)
            if when.start is not None:
                title = original[update.start("title"):update.end("title")]
                return [_intent("update_event", 0.85, original, title=self._event_title(title),
                                new_start=to_iso(when.start), new_end=to_iso(when.end) if when.end else None)]
        delete = re.match(r"^(?:удали|отмени|убери|сотри)\s+(?:событие|встречу|запись)\s+(?P<title>.+?)(?:\s+(?:из|в)\s+календар\w+)?$", folded)
        if delete:
            return [_intent("delete_event", 0.85, original, title=self._event_title(original[delete.start("title"):delete.end("title")]))]
        create = re.match(r"^(?:добавь|поставь|запиши|создай|запланируй|занеси|внеси|назначь|запланировать|добавить|записать)\b\s*(?P<rest>.+)$", folded)
        has_cal_word = re.search(r"\bкалендар\w*|\bсобыти\w*|\bвстреч\w*", folded) is not None
        if create and (has_cal_word or self._looks_like_appointment(folded, ctx)):
            body = original[create.start("rest"):]
            spans = []
            for hit in re.finditer(r"\b(?:в|на)\s+(?:мой\s+)?календар\w*|\bкалендар\w*|\bсобыти\w*\s*(?:на\s+)?|\bв\s+расписани\w+", fold(body)):
                spans.append(hit.span())
            body_clean = _cut(body, spans)
            when = extract_when(body_clean, ctx.now, default_hour=ctx.default_reminder_hour)
            title = self._event_title(when.text)
            if not title:
                return [_intent("clarify", 0.4, original, question="Как назвать событие?")]
            if when.start is None:
                return [_intent("clarify", 0.45, original, question=f"На какое время поставить «{title}»?")]
            confidence = 0.92 if when.time_given or when.all_day else 0.8
            return [_intent("create_event", confidence, original, title=title, start=to_iso(when.start),
                            end=to_iso(when.end) if when.end else None, all_day=when.all_day or None)]
        return None

    def _looks_like_appointment(self, folded: str, ctx: InterpretContext) -> bool:
        return any(word in folded for word in ("стоматолог", "врач", "приём", "прием", "парикмахер", "терапевт", "стрижк", "маникюр", "день рождения"))

    def _event_title(self, raw: str) -> str:
        title = clean_phrase(re.sub(r"^(?:на|в|во|к|о|про)\s+", "", raw.strip(), flags=re.I))
        words = title.split()
        if words:
            key = words[0].lower().replace("ё", "е")
            if key in APPOINTMENT_NOMINATIVE:
                words[0] = APPOINTMENT_NOMINATIVE[key]
                title = " ".join(words)
        return _cap(title)

    def _calendar_query(self, original: str, folded: str, ctx: InterpretContext) -> Intent:
        now = ctx.now
        midnight = now.replace(hour=0, minute=0, second=0, microsecond=0)
        if re.search(r"\bна\s+(?:этой\s+)?неделе\b|\bза неделю\b|\bна ближайшие дни\b", folded):
            start, end, label = now, midnight + dt.timedelta(days=7), "на неделю"
        elif re.search(r"\bна\s+следующей неделе\b", folded):
            monday = midnight + dt.timedelta(days=7 - midnight.weekday())
            start, end, label = monday, monday + dt.timedelta(days=7), "на следующей неделе"
        else:
            when = extract_when(original, now, past_ok=True)
            if when.start is not None:
                start = when.start.replace(hour=0, minute=0, second=0, microsecond=0)
                end = start + dt.timedelta(days=1)
                label = when.matched[0] if when.matched else "в этот день"
                if start.date() == now.date():
                    start = now
            else:
                start, end, label = now, midnight + dt.timedelta(days=1), "сегодня"
        return _intent("query_calendar", 0.9, original, start=to_iso(start), end=to_iso(end), label=label)

    # ---- shopping list and tasks ---------------------------------------------------------------

    def _split_items(self, raw: str) -> list[str]:
        parts = re.split(r"\s*(?:,|;|\bи\b|\bа также\b)\s*", raw)
        return [_cap(clean_phrase(p)) for p in parts if clean_phrase(p)]

    def _shopping_and_tasks(self, original: str, folded: str, ctx: InterpretContext) -> list[Intent] | None:
        if re.fullmatch(r"(?:что|чего)\s+(?:нужно|надо)?\s*купить\??|(?:что|какие)?\s*(?:в|на)?\s*(?:моем\s+)?списк\w*\s+(?:покупок|покупки)\??|список покупок\??|покажи список покупок", folded.strip()):
            return [_intent("query_tasks", 0.9, original, **{"list": "shopping"})]
        if re.fullmatch(r"(?:какие\s+)?(?:мои\s+)?(?:задачи|дела)\??|что (?:у меня )?(?:по задачам|надо сделать)\??|покажи задачи", folded.strip()):
            return [_intent("query_tasks", 0.85, original, **{"list": "tasks"})]
        m = re.match(r"^(?:добавь|занеси|запиши|внеси|положи|добавить|записать)\s+(?P<items>.+?)\s+(?:в|на)\s+(?:мой\s+|наш\s+)?(?:список\s+)?(?:покупок|покупки|закупок)$", folded)
        if m:
            return [_intent("add_shopping", 0.93, original, items=self._split_items(original[m.start("items"):m.end("items")]))]
        # verb + destination first: «добавь в список покупок молоко и хлеб» (the most natural spoken order)
        m = re.match(r"^(?:добавь|занеси|запиши|внеси|положи|добавить|записать)\s+(?:в|на)\s+(?:мой\s+|наш\s+)?(?:список\s+)?(?:покупок|покупки|закупок)\s*[,:]?\s*(?P<items>.+)$", folded)
        if m:
            return [_intent("add_shopping", 0.93, original, items=self._split_items(original[m.start("items"):]))]
        m = re.match(r"^(?:в\s+(?:список\s+)?(?:покупок|покупки))\s*[,:]?\s*(?:добавь|запиши)?\s*(?P<items>.+)$", folded)
        if m:
            return [_intent("add_shopping", 0.9, original, items=self._split_items(original[m.start("items"):]))]
        m = re.match(r"^(?:(?:мне\s+)?(?:надо|нужно|необходимо)\s+купить|купить|надо купить|не забыть купить|не забудь купить|закажи)\s+(?P<items>.+)$", folded)
        if m:
            return [_intent("add_shopping", 0.85, original, items=self._split_items(original[m.start("items"):]))]
        m = re.match(r"^(?:у меня\s+)?(?:закончил(?:ся|ась|ось|ись)|кончил(?:ся|ась|ось|ись))\s+(?P<items>.+)$", folded)
        if m:
            items = self._split_items(original[m.start("items"):])
            return [_intent("add_shopping", 0.8, original, items=items)] + [
                _intent("set_quantity", 0.8, original, name=parse_item_phrase(i).name if parse_item_phrase(i) else i, quantity=0)
                for i in items
            ]
        m = re.match(r"^(?:выполнил[аи]?|сделал[аи]?|готово|отметь(?:\s+выполненн\w+)?|вычеркни|купил[аи]?)\s*[:,]?\s*(?P<t>.+)$", folded)
        if m and not looks_like_place(m.group("t")):
            title = clean_phrase(original[m.start("t"):])
            return [_intent("complete_task", 0.8, original, title=title, **({"list": "shopping"} if folded.startswith(("купил", "вычеркни")) else {}))]
        m = re.match(r"^(?:добавь|поставь|создай|заведи|запиши)\s+(?:в\s+(?:мои\s+)?(?:задачи|дела)\s+)?(?:задач\w+|дело)\s*[:,]?\s*(?P<t>.+)$", folded)
        if m:
            return self._task_intent(original, original[m.start("t"):], ctx, 0.9)
        m = re.match(r"^(?:мне\s+)?(?:надо|нужно|необходимо|не забыть|не забудь|хочу|планирую)\s+(?P<t>.+)$", folded)
        if m:
            return self._task_intent(original, original[m.start("t"):], ctx, 0.72)
        when = extract_when(original, ctx.now, default_hour=ctx.default_reminder_hour)
        if when.recurrence and re.match(r"^(?:каждый|каждую|каждое|каждые|раз в|ежедневно|ежемесячно|еженедельно|по\s+\w+ам)\b", folded) or (
            when.recurrence and re.search(r"\b(?:менять|поливать|мыть|убирать|проверять|стирать|выносить|чистить|протирать|заряжать)\b", folded)
        ):
            title = clean_phrase(when.text)
            if title:
                return [_intent("add_task", 0.86, original, title=_cap(title), **{"list": "chores"},
                                due_date=when.start.date().isoformat() if when.start else None, recurrence=when.recurrence)]
        return None

    def _task_intent(self, original: str, raw: str, ctx: InterpretContext, confidence: float) -> list[Intent]:
        when = extract_when(raw, ctx.now, default_hour=ctx.default_reminder_hour)
        title = clean_phrase(when.text)
        if not title:
            return [_intent("clarify", 0.4, original, question="Какую задачу добавить?")]
        list_name = "chores" if when.recurrence else "tasks"
        return [_intent("add_task", confidence, original, title=_cap(title), **{"list": list_name},
                        due_date=when.start.date().isoformat() if when.start else None, recurrence=when.recurrence)]

    # ---- Home Assistant ------------------------------------------------------------------------

    _HA_VERBS = {
        "включи": "turn_on", "зажги": "turn_on", "выключи": "turn_off", "погаси": "turn_off", "отключи": "turn_off",
        "переключи": "toggle", "открой": "open_cover", "закрой": "close_cover",
    }

    def _home_assistant(self, original: str, folded: str, ctx: InterpretContext) -> list[Intent] | None:
        m = re.match(r"^(?P<verb>включи|зажги|выключи|погаси|отключи|переключи|открой|закрой)\s+(?P<what>.+)$", folded)
        if m and not looks_like_place(m.group("what")) or (m and re.search(r"\b(?:свет|лампу|лампа|шторы|жалюзи|вентилятор|розетку|подсветку)\b", folded)):
            hint = clean_phrase(original[m.start("what"):])
            return [_intent("ha_control", 0.82, original, service=self._HA_VERBS[m.group("verb")], entity_hint=hint)]
        q = re.match(r"^(?:какая|какой|какое|сколько|что показывает|покажи|скажи)\s+(?:сейчас\s+)?(?P<what>(?:температур|влажност|давлени|заряд|уровень|освещенност|мощност|расход).*)$", folded)
        if q:
            return [_intent("ha_query", 0.8, original, entity_hint=clean_phrase(original[q.start("what"):]))]
        q = re.match(r"^(?P<what>.+?)\s+(?:сейчас\s+)?(?:включен[аоы]?|выключен[аоы]?|работает|печатает|открыт[аоы]?|закрыт[аоы]?|дома)\?$", folded)
        if q and not looks_like_place(q.group("what")):
            return [_intent("ha_query", 0.7, original, entity_hint=clean_phrase(original[q.start("what"):q.end("what")]))]
        return None

    # ---- inventory (the memory slice) ----------------------------------------------------------

    _REMEMBER = re.compile(r"^(?:запомни(?:ть)?|запиши|записать|сохрани|отметь|учти)\s*[:,-]?\s*(?:что\s+)?", re.I)

    def _inventory(self, original: str, folded: str, ctx: InterpretContext) -> list[Intent] | None:
        prefix = self._REMEMBER.match(folded)
        body_orig = original[prefix.end():] if prefix else original
        body = fold(body_orig)
        for handler in (self._inv_find, self._inv_list, self._inv_consume, self._inv_move, self._inv_statement, self._inv_place, self._inv_have):
            result = handler(body_orig, body, original, ctx)
            if result:
                return result
        return None

    def _location(self, phrase: str) -> tuple[list[str], list[str], float]:
        parsed = parse_place(phrase)
        return parsed.path, parsed.kinds, parsed.confidence

    def _inv_find(self, body_orig: str, body: str, original: str, ctx: InterpretContext) -> list[Intent] | None:
        m = re.match(
            r"^(?:(?:скажи|подскажи|напомни|покажи)\s+)?(?:где(?:\s+у\s+нас|\s+у\s+меня)?|найди|найти|поищи|покажи где|где-то)\s*"
            r"(?:(?:лежит|лежат|находится|находятся|хранится|хранятся|можно найти)\s+)?(?P<what>.+?)\??$", body)
        count = re.match(r"^(?:сколько|скажи сколько)\s+(?:у\s+меня\s+|у\s+нас\s+)?(?:осталось\s+)?(?P<what>.+?)\??$", body)
        has = re.match(r"^(?:есть ли|имеется ли)\s+(?:у\s+меня\s+|у\s+нас\s+)?(?P<what>.+?)\??$", body)
        hit = m or count or has
        if not hit:
            return None
        what_orig = body_orig[hit.start("what"):hit.end("what")]
        since = until = None
        rel = re.match(
            r"^(?P<item>.+?),?\s+(?:которы[мйеюх]\w*|какой|какую|какое)\s+я\s+(?:пользовался|пользовалась|использовал\w*|брал\w*|доставал\w*|видел\w*|трогал\w*|держал\w*)\s*(?P<when>.*)$",
            fold(what_orig),
        )
        confidence = 0.9
        if rel:
            item_text = what_orig[rel.start("item"):rel.end("item")]
            when_text = what_orig[rel.start("when"):]
            window = _past_window(when_text, ctx.now)
            if window:
                since, until = to_iso(window[0]), to_iso(window[1])
            what_orig = item_text
        location = None
        loc_match = re.match(r"^(?P<item>.+?)\s+(?:в|на|во)\s+(?P<loc>.+)$", fold(what_orig))
        if loc_match and looks_like_place(loc_match.group("loc")):
            location = parse_place(what_orig[loc_match.start("loc"):]).path
            what_orig = what_orig[loc_match.start("item"):loc_match.end("item")]
        item = parse_item_phrase(what_orig)
        query = clean_phrase(item.name if item else what_orig)
        if not query:
            return None
        return [_intent("find_item", confidence, original, query=query, since=since, until=until, location_path=location, count=True if (count or has) else None)]

    def _inv_list(self, body_orig: str, body: str, original: str, ctx: InterpretContext) -> list[Intent] | None:
        m = re.match(r"^(?:что|чего)\s+(?:у\s+меня\s+|у\s+нас\s+)?(?:лежит|находится|хранится|есть|осталось)\s+(?:в|на|во)\s+(?P<loc>.+?)\??$", body) or \
            re.match(r"^(?:покажи|перечисли)\s+(?:что\s+)?(?:лежит\s+)?(?:в|на|во)\s+(?P<loc>.+?)\??$", body)
        if not m or not looks_like_place(m.group("loc")):
            return None
        place = parse_place(body_orig[m.start("loc"):m.end("loc")])
        return [_intent("list_location", min(0.9, place.confidence), original, location_path=place.path, location_kinds=place.kinds)]

    def _inv_consume(self, body_orig: str, body: str, original: str, ctx: InterpretContext) -> list[Intent] | None:
        m = re.match(r"^(?:я\s+)?(?:потратил\w*|израсходовал\w*|истратил\w*|использовал\w*|взял\w*|забрал\w*|достал\w*|съел\w*|выпил\w*)\s+(?P<what>.+?)\.?$", body)
        if m:
            item = parse_item_phrase(body_orig[m.start("what"):m.end("what")])
            if item and item.quantity is not None:
                return [_intent("consume_item", 0.9, original, name=item.name, quantity=item.quantity)]
            if item:
                return [_intent("use_item", 0.85, original, name=item.name)]
        m = re.match(r"^(?:я\s+)?(?:пользовался|пользовалась|пользуюсь|работал\w* с)\s+(?P<what>.+?)\.?$", body)
        if m:
            item = parse_item_phrase(body_orig[m.start("what"):m.end("what")])
            if item:
                return [_intent("use_item", 0.85, original, name=item.name)]
        m = re.match(r"^(?:у\s+меня\s+)?(?:остал(?:ось|ась|ся|ись))\s+(?P<what>.+?)\.?$", body)
        if m:
            item = parse_item_phrase(body_orig[m.start("what"):m.end("what")])
            if item and item.quantity is not None:
                return [_intent("set_quantity", 0.88, original, name=item.name, quantity=item.quantity)]
        return None

    def _inv_move(self, body_orig: str, body: str, original: str, ctx: InterpretContext) -> list[Intent] | None:
        m = re.match(r"^(?:перенес\w*|переложи\w*|переместил\w*|переставь|перестав\w*|перекинь|перекинул\w*)\s+(?P<item>.+?)\s+(?:в|на|во)\s+(?P<loc>.+?)\.?$", body)
        if not m or not looks_like_place(m.group("loc")):
            return None
        item = parse_item_phrase(body_orig[m.start("item"):m.end("item")])
        if not item:
            return None
        path, kinds, conf = self._location(body_orig[m.start("loc"):m.end("loc")])
        if not path:
            return None
        return [_intent("move_item", min(0.9, conf), original, name=item.name, location_path=path, location_kinds=kinds)]

    def _inv_statement(self, body_orig: str, body: str, original: str, ctx: InterpretContext) -> list[Intent] | None:
        """«девять резисторов 10 кОм лежат в третьей коробке нижнего шкафа» – a statement of fact (sets the quantity)."""
        m = re.match(
            r"^(?:у\s+меня\s+|у\s+нас\s+)?(?P<item>.+?)\s+(?:лежит|лежат|находится|находятся|хранится|хранятся|храню|хранил\w*|лежали|валяется|валяются)\s+"
            r"(?:(?:в|на|во|под)\s+)?(?P<loc>.+?)\.?$", body)
        if not m or not looks_like_place(m.group("loc")):
            return None
        item = parse_item_phrase(body_orig[m.start("item"):m.end("item")])
        if not item:
            return None
        place = parse_place(body_orig[m.start("loc"):m.end("loc")])
        if not place.path:
            return None
        confidence = 0.93 * place.confidence / 0.95 if not place.unknown else place.confidence * 0.9
        if item.quantity is None:
            confidence -= 0.03
        return [_intent("add_item", round(min(0.95, confidence), 3), original, name=item.name, quantity=item.quantity, unit=item.unit,
                        location_path=place.path, location_kinds=place.kinds, mode="set")]

    def _inv_place(self, body_orig: str, body: str, original: str, ctx: InterpretContext) -> list[Intent] | None:
        """«положил 3 резистора в коробку 4» / «добавь батарейки в шкаф» (adds to what is there)."""
        m = re.match(
            r"^(?:я\s+)?(?:положил\w*|убрал\w*|поставил\w*|спрятал\w*|сложил\w*|кинул\w*|добавь|добавил\w*|занес\w*|принес\w*)\s+(?P<item>.+?)\s+(?:в|на|во|под)\s+(?P<loc>.+?)\.?$", body)
        if not m or not looks_like_place(m.group("loc")):
            return None
        item = parse_item_phrase(body_orig[m.start("item"):m.end("item")])
        if not item:
            return None
        place = parse_place(body_orig[m.start("loc"):m.end("loc")])
        if not place.path:
            return None
        if item.quantity is not None:
            return [_intent("add_item", min(0.92, place.confidence), original, name=item.name, quantity=item.quantity, unit=item.unit,
                            location_path=place.path, location_kinds=place.kinds, mode="add")]
        return [_intent("place_item", min(0.9, place.confidence), original, name=item.name, location_path=place.path, location_kinds=place.kinds)]

    def _inv_have(self, body_orig: str, body: str, original: str, ctx: InterpretContext) -> list[Intent] | None:
        """«у меня есть 5 метров провода» – an item without a place."""
        m = re.match(r"^у\s+меня\s+(?:есть|появил\w*|теперь)\s+(?P<item>.+?)\.?$", body)
        if not m:
            return None
        item = parse_item_phrase(body_orig[m.start("item"):m.end("item")])
        if not item:
            return None
        return [_intent("add_item", 0.82, original, name=item.name, quantity=item.quantity, unit=item.unit, mode="set")]

    # ---- free-form memory ----------------------------------------------------------------------

    def _note(self, original: str, folded: str, ctx: InterpretContext) -> list[Intent] | None:
        m = self._REMEMBER.match(folded)
        if not m:
            return None
        text = clean_phrase(original[m.end():])
        if len(text) < 3:
            return [_intent("clarify", 0.4, original, question="Что запомнить?")]
        return [_intent("add_note", 0.9, original, text=_cap(text))]


# ---- helpers ---------------------------------------------------------------------------------


def _past_window(text: str, now: dt.datetime) -> tuple[dt.datetime, dt.datetime] | None:
    """`вчера`, `на прошлой неделе`, `недавно`, `сегодня` → [start, end) for activity look-ups."""
    t = fold(text)
    midnight = now.replace(hour=0, minute=0, second=0, microsecond=0)
    if re.search(r"\bпозавчера\b", t):
        return midnight - dt.timedelta(days=2), midnight - dt.timedelta(days=1)
    if re.search(r"\bвчера\b", t):
        return midnight - dt.timedelta(days=1), midnight
    if re.search(r"\bсегодня\b", t):
        return midnight, now + dt.timedelta(minutes=1)
    if re.search(r"\bна прошлой неделе\b", t):
        monday = midnight - dt.timedelta(days=midnight.weekday())
        return monday - dt.timedelta(days=7), monday
    if re.search(r"\bна этой неделе\b|\bза неделю\b", t):
        return midnight - dt.timedelta(days=7), now + dt.timedelta(minutes=1)
    if re.search(r"\bнедавно\b|\bв последн\w+ дни\b", t):
        return midnight - dt.timedelta(days=3), now + dt.timedelta(minutes=1)
    return None
