"""The semantic router is a narrow, fast fallback between the rules and the model."""
from __future__ import annotations

from ..helpers import ADDON_DIR  # noqa: F401
from domovoy.assistant.semantic import SemanticRouter
from .base import AppCase


def fake_embed(texts: list[str]) -> list[list[float]]:
    vectors = []
    for text in texts:
        low = text.lower()
        if any(word in low for word in ("когда", "какой", "какая", "что ты знаешь", "что я", "сколько", "как зовут", "где я")):
            vectors.append([0.0, 1.0, 0.0, 0.0])
        elif any(word in low for word in ("день рождения", "аллерг", "люблю", "кот", "машина", "размер", "группа крови", "работаю")):
            vectors.append([1.0, 0.0, 0.0, 0.0])
        else:
            vectors.append([0.0, 0.0, 0.0, 1.0])
    return vectors


class Semantic(AppCase):
    def setUp(self) -> None:
        super().setUp()
        self.app.settings.update({"ai": {"enabled": True, "base_url": "http://fake/v1", "embedding_model": "fake-embed"},
                                  "identity": {"gender": "female"}})
        self.app.llm.embed = fake_embed
        self.router = SemanticRouter(self.app)

    def test_personal_fact_and_question_are_routed(self) -> None:
        fact = self.router.route("у меня день рождения 3 августа")
        self.assertIsNotNone(fact)
        self.assertEqual((fact[0]["type"], fact[0]["text"]), ("add_note", "У меня день рождения 3 августа"))
        question = self.router.route("когда у меня день рождения?")
        self.assertIsNotNone(question)
        self.assertEqual(question[0]["type"], "query_memory")

    def test_unrelated_command_is_not_hijacked(self) -> None:
        self.assertIsNone(self.router.route("включи свет на кухне"))

    def test_router_is_disabled_without_an_embedding_model(self) -> None:
        self.app.settings.update({"ai": {"enabled": False}})
        self.assertIsNone(self.router.route("у меня день рождения 3 августа"))

    def test_pipeline_uses_semantic_fallback_before_the_model(self) -> None:
        answer = self.say("у меня аллергия на пыль")
        self.assertEqual((answer["status"], answer["reply"]), ("applied", "Запомнила."))
        self.assertEqual(self.app.commands.list()[0]["interpreter"], "semantic")
        self.assertEqual(self.app.notes.list()[0]["body"], "У меня аллергия на пыль")
