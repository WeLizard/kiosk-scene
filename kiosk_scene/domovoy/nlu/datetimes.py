"""Russian date/time phrase extraction.

`extract_when` finds date/time/duration/recurrence phrases in a sentence, resolves them against
`now`, and returns the sentence with those phrases cut out (so the remainder can become a title).
Everything is anchored to the user's timezone; results are timezone-aware datetimes.
"""
from __future__ import annotations

import datetime as dt
import re
from dataclasses import dataclass, field

from .numbers import ordinal_value, parse_number

MONTHS = {
    "января": 1, "февраля": 2, "марта": 3, "апреля": 4, "мая": 5, "июня": 6, "июля": 7, "августа": 8,
    "сентября": 9, "октября": 10, "ноября": 11, "декабря": 12,
}
MONTH_NAMES_GEN = list(MONTHS.keys())
WEEKDAY_STEMS = [("понедельник", 0), ("вторник", 1), ("сред", 2), ("четверг", 3), ("пятниц", 4), ("суббот", 5), ("воскресень", 6)]
WEEKDAY_NAMES_ACC = ["в понедельник", "во вторник", "в среду", "в четверг", "в пятницу", "в субботу", "в воскресенье"]
DAY_PART_HOURS = {"morning": 9, "day": 13, "evening": 19, "night": 23}

_UNIT_WORDS = {
    0: "ноль", 1: "один", 2: "два", 3: "три", 4: "четыре", 5: "пять", 6: "шесть", 7: "семь", 8: "восемь",
    9: "девять", 10: "десять", 11: "одиннадцать", 12: "двенадцать", 13: "тринадцать", 14: "четырнадцать",
    15: "пятнадцать", 16: "шестнадцать", 17: "семнадцать", 18: "восемнадцать", 19: "девятнадцать",
}
_TENS_WORDS = {20: "двадцать", 30: "тридцать", 40: "сорок", 50: "пятьдесят"}


def _small_number_words() -> dict[str, int]:
    table: dict[str, int] = {}
    for n in range(0, 60):
        if n < 20:
            table[_UNIT_WORDS[n]] = n
        else:
            tens, unit = (n // 10) * 10, n % 10
            table[_TENS_WORDS[tens] + (f" {_UNIT_WORDS[unit]}" if unit else "")] = n
    table["одна"] = 1
    table["две"] = 2
    return table


SMALL_WORDS = _small_number_words()
_NUM_ALT = "|".join(sorted((re.escape(w) for w in SMALL_WORDS), key=len, reverse=True))
NUM = rf"(?:\d{{1,2}}|{_NUM_ALT})"


def _num(value: str) -> int:
    value = value.strip()
    return int(value) if value.isdigit() else SMALL_WORDS[value]


@dataclass
class WhenResult:
    text: str
    start: dt.datetime | None = None
    end: dt.datetime | None = None
    all_day: bool = False
    date_only: bool = False
    time_given: bool = False
    day_part: str | None = None
    recurrence: dict | None = None
    relative: bool = False
    matched: list[str] = field(default_factory=list)

    @property
    def found(self) -> bool:
        return self.start is not None or self.recurrence is not None or self.day_part is not None


def _fold(text: str) -> str:
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
    value = re.sub(r"^[,.;:\s]+|[,.;:\s]+$", "", value)
    return value


def _at(now: dt.datetime, day: dt.date, hour: int, minute: int = 0) -> dt.datetime:
    return dt.datetime(day.year, day.month, day.day, hour, minute, tzinfo=now.tzinfo)


def _apply_meridiem(hour: int, part: str | None) -> int:
    if part in ("вечера", "дня", "ночи") and hour < 12:
        if part == "ночи" and hour == 12:
            return 0
        return hour + 12 if not (part == "ночи" and hour < 5) else hour
    if part == "утра" and hour == 12:
        return 0
    return hour


def extract_when(text: str, now: dt.datetime, *, default_hour: int = 9, past_ok: bool = False) -> WhenResult:
    """Find and resolve time expressions. `now` must be timezone-aware (user's local time)."""
    folded = _fold(text)
    spans: list[tuple[int, int]] = []
    result = WhenResult(text=text)
    today = now.date()

    def claim(match: re.Match[str]) -> None:
        spans.append(match.span())
        result.matched.append(match.group(0))

    date: dt.date | None = None
    hour: int | None = None
    minute = 0
    end_hour: int | None = None
    end_minute = 0
    duration: dt.timedelta | None = None
    delta_dt: dt.datetime | None = None

    # -- recurrence -------------------------------------------------------------------------
    recur: dict | None = None
    m = re.search(r"\b(?:каждые|раз в)\s+(?P<n>\d+|два|три|четыре)?\s*(?P<u>дн\w+|недел\w+|месяц\w*|год\w*)", folded)
    if m and not re.search(r"\bкаждые\b", m.group(0)) or (m and m.group("n")):
        unit = m.group("u")
        freq = "daily" if unit.startswith("дн") else "weekly" if unit.startswith("недел") else "monthly" if unit.startswith("месяц") else "yearly"
        n = m.group("n")
        interval = int(n) if n and n.isdigit() else {"два": 2, "три": 3, "четыре": 4}.get(n or "", 1)
        recur = {"freq": freq, "interval": interval}
        claim(m)
    if recur is None:
        m = re.search(r"\b(?:ежедневно|каждый день|каждые сутки|каждое утро|каждый вечер|каждую ночь|каждый день)\b", folded)
        if m:
            recur = {"freq": "daily", "interval": 1}
            if "утро" in m.group(0):
                result.day_part = "morning"
            elif "вечер" in m.group(0):
                result.day_part = "evening"
            claim(m)
    if recur is None:
        m = re.search(r"\b(?:еженедельно|каждую неделю|раз в неделю)\b", folded)
        if m:
            recur = {"freq": "weekly", "interval": 1}
            claim(m)
    if recur is None:
        m = re.search(r"\bкажд(?:ый|ую|ое)\s+(?P<wd>понедельник|вторник|сред[ау]|четверг|пятниц[уа]|суббот[уа]|воскресень[ея])\b", folded)
        if m:
            wd = next(v for stem, v in WEEKDAY_STEMS if m.group("wd").startswith(stem))
            recur = {"freq": "weekly", "interval": 1, "byweekday": [wd]}
            claim(m)
    if recur is None:
        m = re.search(r"\bпо\s+(?P<wd>понедельникам|вторникам|средам|четвергам|пятницам|субботам|воскресеньям)\b", folded)
        if m:
            wd = next(v for stem, v in WEEKDAY_STEMS if m.group("wd").startswith(stem))
            recur = {"freq": "weekly", "interval": 1, "byweekday": [wd]}
            claim(m)
    if recur is None:
        m = re.search(r"\b(?:ежемесячно|каждый месяц|раз в месяц)\b", folded)
        if m:
            recur = {"freq": "monthly", "interval": 1}
            claim(m)
    if recur is None:
        m = re.search(r"\b(?:ежегодно|каждый год|раз в год)\b", folded)
        if m:
            recur = {"freq": "yearly", "interval": 1}
            claim(m)
    result.recurrence = recur

    # -- relative offsets ("через 20 минут") -----------------------------------------------
    m = re.search(
        r"\bчерез\s+(?:(?P<half>полчаса)|(?P<pair>пару|пар)\s+(?P<pu>минут|часов|дней|недель)|(?P<n>\d+|[а-я]+(?:\s+[а-я]+){0,2}?)\s+(?P<u>минут\w*|мин\b|час\w*|дн\w+|недел\w+|месяц\w*)|(?P<one>час|минуту|день|неделю|месяц))",
        folded,
    )
    if m:
        amount, unit = None, None
        if m.group("half"):
            amount, unit = 30, "минут"
        elif m.group("pair"):
            amount, unit = 2, m.group("pu")
        elif m.group("one"):
            amount, unit = 1, m.group("one")
        else:
            parsed = parse_number(m.group("n").split())
            if parsed and parsed[1] == len(m.group("n").split()):
                amount, unit = parsed[0], m.group("u")
        if amount is not None and unit:
            if unit.startswith("мин"):
                delta = dt.timedelta(minutes=amount)
            elif unit.startswith("час"):
                delta = dt.timedelta(hours=amount)
            elif unit.startswith("дн") or unit.startswith("ден"):
                delta = dt.timedelta(days=amount)
            elif unit.startswith("недел"):
                delta = dt.timedelta(weeks=amount)
            else:
                delta = dt.timedelta(days=30 * amount)
            delta_dt = now + delta
            result.relative = True
            claim(m)

    # -- explicit dates -------------------------------------------------------------------
    m = re.search(rf"\b(?P<d>\d{{1,2}}|[а-я]+)\s+(?P<mon>{'|'.join(MONTH_NAMES_GEN)})(?:\s+(?P<y>\d{{4}}))?\b", folded)
    if m:
        raw_day = m.group("d")
        day = int(raw_day) if raw_day.isdigit() else ordinal_value(raw_day)
        if day and 1 <= day <= 31:
            month = MONTHS[m.group("mon")]
            year = int(m.group("y")) if m.group("y") else today.year
            try:
                candidate = dt.date(year, month, day)
                if not m.group("y") and candidate < today and not past_ok:
                    candidate = dt.date(year + 1, month, day)
                date = candidate
                claim(m)
            except ValueError:
                pass
    if date is None:
        m = re.search(r"(?<![\d:])(?P<d>\d{1,2})[./](?P<m>\d{1,2})(?:[./](?P<y>\d{2,4}))?(?![\d:])", folded)
        if m and 1 <= int(m.group("m")) <= 12 and 1 <= int(m.group("d")) <= 31:
            year = int(m.group("y")) if m.group("y") else today.year
            if year < 100:
                year += 2000
            try:
                candidate = dt.date(year, int(m.group("m")), int(m.group("d")))
                if not m.group("y") and candidate < today and not past_ok:
                    candidate = dt.date(year + 1, int(m.group("m")), int(m.group("d")))
                date = candidate
                claim(m)
            except ValueError:
                pass

    # -- relative days / weekdays -------------------------------------------------------------
    if date is None:
        m = re.search(r"\b(?P<w>сегодня|завтра|послезавтра|вчера|позавчера)\b", folded)
        if m:
            offset = {"сегодня": 0, "завтра": 1, "послезавтра": 2, "вчера": -1, "позавчера": -2}[m.group("w")]
            date = today + dt.timedelta(days=offset)
            claim(m)
    if date is None:
        m = re.search(
            r"\b(?P<lead>(?:в|на|во)\s+(?P<rel>следующ\w+|эт\w+|ближайш\w+)\s+|(?:в|во|на)\s+)(?P<wd>понедельник\w*|вторник\w*|сред[ауы]|четверг\w*|пятниц\w*|суббот\w*|воскресень\w*)",
            folded,
        )
        if m:
            wd = next(v for stem, v in WEEKDAY_STEMS if m.group("wd").startswith(stem))
            rel = m.group("rel") or ""
            days_ahead = (wd - today.weekday()) % 7
            if rel.startswith("следующ"):
                # "следующий четверг" = that weekday in the *next calendar week* (Mon-Sun).
                monday_next = today + dt.timedelta(days=7 - today.weekday())
                date = monday_next + dt.timedelta(days=wd)
            elif rel.startswith("эт"):
                date = today + dt.timedelta(days=days_ahead)
            else:
                date = today + dt.timedelta(days=days_ahead or 7)
            claim(m)

    # -- explicit times / ranges ---------------------------------------------------------------
    m = re.search(rf"\bс\s+(?P<h1>\d{{1,2}}|{_NUM_ALT})(?:[:.\s](?P<m1>\d{{2}}))?\s+до\s+(?P<h2>\d{{1,2}}|{_NUM_ALT})(?:[:.\s](?P<m2>\d{{2}}))?\b", folded)
    if m:
        hour, minute = _num(m.group("h1")), int(m.group("m1") or 0)
        end_hour, end_minute = _num(m.group("h2")), int(m.group("m2") or 0)
        claim(m)
    if hour is None:
        m = re.search(r"\b(?:в|к|на)\s+(?P<h>\d{1,2})[:.](?P<m>\d{2})\b", folded)
        if m:
            hour, minute = int(m.group("h")), int(m.group("m"))
            claim(m)
    if hour is None:
        m = re.search(rf"\b(?:в|к|на)\s+(?P<h>{NUM})(?:\s+час(?:а|ов)?)?(?:\s+(?P<m>\d{{2}}|тридцать|пятнадцать|сорок пять|сорок|двадцать|десять|пять|пятьдесят))?\s+(?P<p>утра|вечера|дня|ночи)\b", folded)
        if m:
            hour = _apply_meridiem(_num(m.group("h")), m.group("p"))
            if m.group("m"):
                minute = int(m.group("m")) if m.group("m").isdigit() else SMALL_WORDS.get(m.group("m"), 0)
            claim(m)
    if hour is None:
        m = re.search(rf"\b(?:в|к|на)\s+(?P<h>{NUM})\s+(?P<m>\d{{2}}|тридцать|пятнадцать|сорок пять|сорок|двадцать|десять|пятьдесят|ноль пять)\b", folded)
        if m:
            h = _num(m.group("h"))
            mm = int(m.group("m")) if m.group("m").isdigit() else SMALL_WORDS.get(m.group("m"), 0)
            if 0 <= h <= 23 and 0 <= mm <= 59:
                hour, minute = h, mm
                claim(m)
    if hour is None:
        m = re.search(rf"\b(?:в|к)\s+(?P<h>\d{{1,2}}|{_NUM_ALT})\s+час(?:а|ов)?\b", folded)
        if m and 0 <= _num(m.group("h")) <= 23:
            hour = _num(m.group("h"))
            claim(m)
    if hour is None:
        m = re.search(r"\bв\s+(?P<s>полдень|полночь)\b", folded)
        if m:
            hour = 12 if m.group("s") == "полдень" else 0
            claim(m)
    if hour is None:
        # bare hour after "в": only when it cannot be confused with a quantity ("в 18")
        m = re.search(r"\b(?:в|к)\s+(?P<h>\d{1,2})\b(?!\s*(?:шт|штук|кг|г\b|м\b|мм|см|л\b|мл|коробк|ящик|шкаф|полк|ком|ом|в\b))", folded)
        if m and 0 <= int(m.group("h")) <= 23 and int(m.group("h")) >= 6:
            hour = int(m.group("h"))
            claim(m)

    m = re.search(rf"\bна\s+(?P<n>\d+|{_NUM_ALT}|час|полчаса|пару часов)\s*(?P<u>минут\w*|час\w*)?\b", folded)
    if m and (m.group("u") or m.group("n") in ("час", "полчаса")):
        n = m.group("n")
        if n == "полчаса":
            duration = dt.timedelta(minutes=30)
        elif n == "час":
            duration = dt.timedelta(hours=1)
        else:
            amount = int(n) if n.isdigit() else SMALL_WORDS.get(n)
            if amount is not None and m.group("u"):
                duration = dt.timedelta(minutes=amount) if m.group("u").startswith("мин") else dt.timedelta(hours=amount)
        if duration is not None:
            claim(m)

    # -- day part -------------------------------------------------------------------------
    m = re.search(r"\b(?:(?P<part>утром|днем|вечером|ночью)|с утра)\b", folded)
    if m:
        part = m.group("part")
        result.day_part = {"утром": "morning", "днем": "day", "вечером": "evening", "ночью": "night", None: "morning"}[part]
        claim(m)

    # -- assemble -------------------------------------------------------------------------
    if delta_dt is not None:
        result.start = delta_dt
        result.time_given = True
    elif date is not None or hour is not None or result.day_part or recur:
        if hour is not None:
            result.time_given = True
        elif result.day_part:
            hour, minute = DAY_PART_HOURS[result.day_part], 0
            result.time_given = True
        weekdays = (recur or {}).get("byweekday")
        if date is None and weekdays:
            # weekly rule with named weekdays: first matching day whose time is still ahead
            for offset in range(0, 8):
                day = today + dt.timedelta(days=offset)
                if day.weekday() in weekdays and (offset > 0 or _at(now, day, hour if hour is not None else default_hour, minute) > now):
                    date = day
                    break
        if date is None and hour is not None:
            candidate = _at(now, today, hour, minute)
            date = today if candidate > now or past_ok else today + dt.timedelta(days=1)
        if date is None and recur:
            date = today
        if date is not None:
            if hour is None:
                result.date_only = True
                hour = default_hour
            result.start = _at(now, date, hour, minute)
    if result.start is not None:
        if end_hour is not None:
            result.end = _at(now, result.start.date(), end_hour, end_minute)
            if result.end <= result.start:
                result.end += dt.timedelta(days=1)
        elif duration is not None:
            result.end = result.start + duration
        if result.date_only and recur is None:
            result.all_day = True
    result.text = _cut(text, spans)
    return result


def format_when(value: dt.datetime, now: dt.datetime, *, all_day: bool = False) -> str:
    """Human readable, TTS friendly Russian: 'завтра в 18:30', 'в четверг, 8 октября в 18:30'."""
    local = value.astimezone(now.tzinfo)
    days = (local.date() - now.date()).days
    time_part = "" if all_day else f" в {local.hour}:{local.minute:02d}"
    if days == 0:
        return f"сегодня{time_part}"
    if days == 1:
        return f"завтра{time_part}"
    if days == 2:
        return f"послезавтра{time_part}"
    month = MONTH_NAMES_GEN[local.month - 1]
    if 2 < days < 7:
        return f"{WEEKDAY_NAMES_ACC[local.weekday()]}, {local.day} {month}{time_part}"
    return f"{local.day} {month}{time_part}" + (f" {local.year}" if local.year != now.year else "")


def next_occurrence(rule: dict, after: dt.datetime) -> dt.datetime | None:
    """Next fire time strictly after `after` for a recurrence rule anchored at `after`'s time-of-day."""
    freq = rule.get("freq")
    interval = max(1, int(rule.get("interval") or 1))
    if freq == "daily":
        return after + dt.timedelta(days=interval)
    if freq == "weekly":
        weekdays = sorted(rule.get("byweekday") or [after.weekday()])
        for offset in range(1, 8 * interval + 1):
            candidate = after + dt.timedelta(days=offset)
            if candidate.weekday() in weekdays:
                weeks = (candidate.date() - after.date()).days // 7
                if interval == 1 or weeks % interval == 0 or (candidate.date() - after.date()).days < 7:
                    return candidate
        return after + dt.timedelta(weeks=interval)
    if freq == "monthly":
        month = after.month - 1 + interval
        year = after.year + month // 12
        month = month % 12 + 1
        day = after.day
        while day > 28:
            try:
                return after.replace(year=year, month=month, day=day)
            except ValueError:
                day -= 1
        return after.replace(year=year, month=month, day=day)
    if freq == "yearly":
        try:
            return after.replace(year=after.year + interval)
        except ValueError:
            return after.replace(year=after.year + interval, day=28)
    return None
