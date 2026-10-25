"""The assistant name is a setting: replies, leading-word stripping and the avatar follow it."""
from __future__ import annotations

from ..helpers import ADDON_DIR  # noqa: F401
from domovoy.errors import ValidationError
from domovoy.frontends.telegram import TelegramFrontend
from domovoy.identity import DEFAULT_ALIASES, DEFAULT_NAME, strip_invocation

from .base import AppCase


class Identity(AppCase):
    def test_default_name_and_aliases_are_available(self) -> None:
        identity = self.app.settings.get("identity")
        self.assertEqual(identity["name"], DEFAULT_NAME)
        self.assertEqual(identity["aliases"], DEFAULT_ALIASES)
        self.assertEqual(identity["gender"], "male")
        self.assertEqual(self.app.settings.get("voice")["trigger_words"], [])

    def test_pipeline_strips_the_configured_name_and_alias_forms(self) -> None:
        self.app.settings.update({"identity": {"name": "Нейри", "aliases": ["нейри", "нейрия", "нейрию"]}})
        answer = self.say("Нейри, что в списке покупок?")
        self.assertEqual(answer["status"], "answered")
        self.assertNotIn("Не понял", answer["reply"])
        answer = self.say("попроси Нейрию, что в списке покупок?")
        self.assertEqual(answer["status"], "answered")
        self.assertNotIn("Не понял", answer["reply"])

    def test_old_name_is_not_stripped_after_aliases_are_replaced(self) -> None:
        self.assertEqual(strip_invocation("Домовой, добавь молоко", ["Нейри"]), "Домовой, добавь молоко")
        self.assertEqual(strip_invocation("Нейри, добавь молоко", ["Нейри"]), "добавь молоко")

    def test_avatar_and_telegram_help_use_the_name(self) -> None:
        self.app.settings.update({"identity": {"name": "Нейри"}})
        self.assertEqual(self.app.avatar.snapshot()["assistant"], "Нейри")
        self.assertTrue(TelegramFrontend(self.app)._help().startswith("Я Нейри."))

    def test_name_and_aliases_are_validated(self) -> None:
        with self.assertRaises(ValidationError):
            self.app.settings.update({"identity": {"name": "  "}})
        with self.assertRaises(ValidationError):
            self.app.settings.update({"identity": {"name": "Нейри", "aliases": ["x"] * 21}})
        with self.assertRaises(ValidationError):
            self.app.settings.update({"identity": {"name": "x" * 41}})
        with self.assertRaises(ValidationError):
            self.app.settings.update({"identity": {"gender": "neutral"}})

    def test_female_speech_changes_first_person_forms_but_not_the_owner(self) -> None:
        self.app.settings.update({"identity": {"gender": "female"}})
        self.assertEqual(self.app.speech.render("Не уверен, что понял. Владелец должен связать."),
                         "Не уверена, что поняла. Владелец должен связать.")
        self.assertEqual(self.app.speech.render("«я понял» и я понял"), "«я понял» и я поняла")
        answer = self.say("абракадабра без команды")
        self.assertEqual(answer["status"], "rejected")
        self.assertTrue(answer["reply"].startswith("Не поняла."), answer["reply"])
        self.assertTrue(self.app.commands.list()[0]["reply"].startswith("Не поняла."))
        self.assertEqual(self.app.speech.render("Готов."), "Готова.")
        note = self.say("Запомни, у меня день рождения 3 августа")
        self.assertEqual((note["status"], note["reply"]), ("applied", "Запомнила."))
        self.assertEqual(self.app.commands.list()[0]["result"][0]["message"], "Запомнила.")
        self.assertEqual(self.app.speech.render("Отметил использование."), "Отметила использование.")

    def test_forget_phrase_becomes_a_reminder(self) -> None:
        answer = self.say("мне нужно не забыть позвонить маме в субботу")
        self.assertEqual(answer["status"], "applied")
        reminder = self.app.reminders.list()[0]
        self.assertEqual(reminder["text"], "Позвонить маме")
        self.assertTrue(reminder["due_at"].startswith("2026-10-03"), reminder["due_at"])

    def test_greeting_is_answered_instead_of_rejected(self) -> None:
        for text in ("На связи", "привет", "ты здесь?"):
            answer = self.say(text)
            self.assertEqual((answer["status"], answer["reply"]), ("answered", "На связи."), text)
