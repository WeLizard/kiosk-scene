from __future__ import annotations

import datetime as dt
import unittest
from zoneinfo import ZoneInfo

from ..helpers import ADDON_DIR  # noqa: F401
from domovoy.nlu.datetimes import extract_when, format_when, next_occurrence
from domovoy.nlu.intents import validate_intent
from domovoy.nlu.items import parse_item_phrase
from domovoy.nlu.numbers import ordinal_value, parse_number
from domovoy.nlu.places import parse_place
from domovoy.nlu.rules import InterpretContext, RuleInterpreter
from domovoy.errors import ValidationError
from domovoy.text import normalize, norm_key, similarity

TZ = ZoneInfo("Europe/Sofia")
NOW = dt.datetime(2026, 9, 28, 10, 0, tzinfo=TZ)   # a Monday


class NumbersAndText(unittest.TestCase):
    def test_cardinals_and_ordinals(self) -> None:
        cases = {"девять": 9, "двадцать пять": 25, "сто двадцать три": 123, "две тысячи": 2000, "10": 10, "2.5": 2.5, "полтора": 1.5}
        for phrase, value in cases.items():
            self.assertEqual(parse_number(normalize(phrase).split(), 0)[0], value, phrase)
        for word, value in {"третьей": 3, "первую": 1, "десятого": 10, "четвертой": 4}.items():
            self.assertEqual(ordinal_value(word), value, word)

    def test_stemming_equates_inflections(self) -> None:
        self.assertEqual(norm_key("резисторы 10 кОм"), norm_key("резисторов 10 ком"))
        self.assertEqual(norm_key("коробке"), norm_key("коробка"))
        self.assertGreater(similarity("программатор", "программатором"), 0.8)


class Places(unittest.TestCase):
    def test_containment_is_ordered_big_to_small_whatever_the_word_order(self) -> None:
        cases = {
            "третьей коробке нижнего шкафа": ["Шкаф нижний", "Коробка 3"],
            "гараже на второй полке в шкафу": ["Гараж", "Шкаф", "Полка 2"],
            "в гараже в третьей коробке": ["Гараж", "Коробка 3"],
            "коробке номер 3 на верхней полке": ["Полка верхняя", "Коробка 3"],
        }
        for phrase, path in cases.items():
            self.assertEqual(parse_place(phrase).path, path, phrase)

    def test_unknown_words_lower_confidence_instead_of_being_guessed(self) -> None:
        parsed = parse_place("какой-то штуке")
        self.assertEqual(parsed.path, [])
        self.assertEqual(parsed.confidence, 0.0)
        self.assertLess(parse_place("коробке возле окна").confidence, 0.9)


class Items(unittest.TestCase):
    def test_quantity_units_and_lemma(self) -> None:
        cases = {
            "девять резисторов 10 кОм": ("резистор 10 кОм", 9, "шт"),
            "5 метров провода": ("провод", 5, "м"),
            "две батарейки": ("батарейка", 2, "шт"),
            "10 кОм резисторов": ("10 кОм резисторов", None, ""),     # the number belongs to the name
            "резисторы 10 кОм, девять штук": ("резисторы 10 кОм", 9, "шт"),
            "штангенциркуль": ("штангенциркуль", None, ""),
        }
        for phrase, (name, qty, unit) in cases.items():
            parsed = parse_item_phrase(phrase)
            self.assertEqual((parsed.name, parsed.quantity, parsed.unit), (name, qty, unit), phrase)


class DateTimes(unittest.TestCase):
    def test_owner_examples(self) -> None:
        r = extract_when("Добавь в календарь стоматолога на следующий четверг в 18:30", NOW)
        self.assertEqual(r.start, dt.datetime(2026, 10, 8, 18, 30, tzinfo=TZ))     # Thursday of the *next* calendar week
        self.assertEqual(r.text, "Добавь в календарь стоматолога")
        r = extract_when("напомни через 20 минут выключить духовку", NOW)
        self.assertEqual(r.start, NOW + dt.timedelta(minutes=20))
        r = extract_when("завтра в 9 утра позвонить маме", NOW)
        self.assertEqual(r.start, dt.datetime(2026, 9, 29, 9, 0, tzinfo=TZ))
        self.assertEqual(r.text, "позвонить маме")

    def test_weekday_rules(self) -> None:
        self.assertEqual(extract_when("в четверг в 18:30", NOW).start.date(), dt.date(2026, 10, 1))
        self.assertEqual(extract_when("в понедельник в 9:00", NOW).start.date(), dt.date(2026, 10, 5))   # today is Monday → next week
        self.assertEqual(extract_when("в этот четверг", NOW).start.date(), dt.date(2026, 10, 1))

    def test_time_of_day_and_ranges(self) -> None:
        self.assertEqual(extract_when("в шесть вечера", NOW).start.hour, 18)
        r = extract_when("встреча 15 октября с 14 до 15", NOW)
        self.assertEqual((r.start.hour, r.end.hour, r.start.day), (14, 15, 15))
        self.assertTrue(extract_when("первого октября день рождения", NOW).all_day)

    def test_recurrence_starts_on_the_next_matching_day(self) -> None:
        r = extract_when("каждую пятницу вечером поливать цветы", NOW)
        self.assertEqual(r.recurrence, {"freq": "weekly", "interval": 1, "byweekday": [4]})
        self.assertEqual(r.start, dt.datetime(2026, 10, 2, 19, 0, tzinfo=TZ))
        r = extract_when("каждый понедельник в 8:00", NOW)
        self.assertEqual(r.start, dt.datetime(2026, 10, 5, 8, 0, tzinfo=TZ))          # 8:00 today already passed
        self.assertEqual(next_occurrence(r.recurrence, r.start).date(), dt.date(2026, 10, 12))

    def test_speakable_dates(self) -> None:
        self.assertEqual(format_when(dt.datetime(2026, 10, 8, 18, 30, tzinfo=TZ), NOW), "8 октября в 18:30")
        self.assertEqual(format_when(dt.datetime(2026, 9, 29, 9, 0, tzinfo=TZ), NOW), "завтра в 9:00")


class Rules(unittest.TestCase):
    def setUp(self) -> None:
        self.rules = RuleInterpreter()
        self.ctx = InterpretContext(now=NOW, contact_names=["Ирина", "Ирине", "Мама"])

    def one(self, phrase: str) -> dict:
        out = self.rules.interpret(phrase, self.ctx)
        self.assertTrue(out, f"not understood: {phrase}")
        return out[0]

    def test_memory_examples_from_the_spec(self) -> None:
        i = self.one("Алиса, попроси Домового запомнить: девять резисторов 10 кОм лежат в третьей коробке нижнего шкафа.")
        self.assertEqual((i["type"], i["name"], i["quantity"], i["location_path"]), ("add_item", "резистор 10 кОм", 9, ["Шкаф нижний", "Коробка 3"]))
        self.assertGreaterEqual(i["confidence"], 0.9)
        i = self.one("Домовой, где программатор, которым я пользовался вчера?")
        self.assertEqual((i["type"], i["query"]), ("find_item", "программатор"))
        self.assertLess(i["since"], i["until"])

    def test_assistant_examples_from_the_spec(self) -> None:
        i = self.one("Добавь в календарь стоматолога на следующий четверг в 18:30")
        self.assertEqual((i["type"], i["title"], i["start"]), ("create_event", "Стоматолог", "2026-10-08T15:30:00Z"))
        self.assertEqual(self.one("Что у меня завтра по календарю?")["type"], "query_calendar")
        i = self.one("Напомни поменять фильтр, когда вечером буду дома")
        self.assertEqual((i["type"], i["text"]), ("create_reminder", "Поменять фильтр"))
        self.assertEqual(i["trigger"], {"type": "presence", "place": "home", "require_transition": False, "window": {"from": "18:00", "to": "23:59"}})
        i = self.one("Когда я зайду в мастерскую, напомни забрать штангенциркуль")
        self.assertEqual((i["text"], i["trigger"]["type"], i["trigger"]["require_transition"]), ("Забрать штангенциркуль", "room", True))
        i = self.one("Отправь Ирине в Telegram, что я задержусь минут на сорок")
        self.assertEqual((i["type"], i["recipient"], i["channel"], i["text"]), ("send_message", "Ирине", "telegram", "Я задержусь минут на сорок"))
        i = self.one("Когда принтер закончит печать, отправь мне сообщение в Telegram")
        self.assertEqual((i["type"], i["channel"], i["trigger"]["type"], i["trigger"]["entity_hint"]), ("create_reminder", "telegram", "state", "принтер"))
        i = self.one("Добавь фильтры для воды в список покупок")
        self.assertEqual((i["type"], i["items"]), ("add_shopping", ["Фильтры для воды"]))
        # the destination may come first: found by the UI end-to-end test, the most natural spoken order
        for phrase in ("Добавь в список покупок молоко и хлеб", "запиши в покупки: молоко, хлеб", "Добавь в мой список покупок молоко и хлеб"):
            i = self.one(phrase)
            self.assertEqual((i["type"], i["items"]), ("add_shopping", ["Молоко", "Хлеб"]), phrase)

    def test_corrections_reference_the_previous_command(self) -> None:
        self.assertEqual(self.one("нет, десять")["quantity"], 10)
        self.assertEqual(self.one("не девять, а десять")["quantity"], 10)
        i = self.one("нет, в четвертой коробке")
        self.assertEqual((i["type"], i["use_last"], i["location_path"]), ("move_item", True, ["Коробка 4"]))

    def test_unknown_sentences_are_not_guessed(self) -> None:
        for phrase in ("абракадабра шмяк", "расскажи анекдот"):
            self.assertIsNone(self.rules.interpret(phrase, self.ctx), phrase)


class Validation(unittest.TestCase):
    def test_unknown_keys_are_dropped_and_bad_types_rejected(self) -> None:
        clean = validate_intent({"type": "add_item", "confidence": 0.9, "name": "  винт   М3 ", "quantity": "5", "evil": "DROP TABLE"})
        self.assertNotIn("evil", clean)
        self.assertEqual((clean["name"], clean["quantity"]), ("винт М3", 5.0))
        for bad in (
            {"type": "nope", "confidence": 1},
            {"type": "add_item", "confidence": 1, "name": "x" * 500},
            {"type": "add_item", "confidence": 1, "name": "x", "quantity": -3},
            {"type": "add_item", "confidence": 1, "name": "x", "quantity": "lots"},
            {"type": "create_event", "confidence": 1, "title": "t", "start": "not a date"},
            {"type": "add_item", "confidence": 1},
            {"type": "move_item", "confidence": 1, "location_path": ["a"]},
            "string",
        ):
            with self.assertRaises(ValidationError, msg=str(bad)):
                validate_intent(bad)

    def test_confidence_is_clamped(self) -> None:
        self.assertEqual(validate_intent({"type": "undo", "confidence": 7})["confidence"], 1.0)
        self.assertEqual(validate_intent({"type": "undo", "confidence": float("nan")})["confidence"], 0.0)


if __name__ == "__main__":
    unittest.main()
