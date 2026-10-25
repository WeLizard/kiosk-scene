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
