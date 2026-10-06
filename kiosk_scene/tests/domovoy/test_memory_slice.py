"""Memory slice: natural language → parse → validate → persist → search/retrieve → edit → undo, across restarts."""
from __future__ import annotations

import json

from ..helpers import ADDON_DIR  # noqa: F401
from domovoy.backup import export_data, import_data
from domovoy.services.context import Ctx
from .base import AppCase
from .fakes import FakeLLM

REMEMBER = "Алиса, попроси Домового запомнить: девять резисторов 10 кОм лежат в третьей коробке нижнего шкафа."


class MemorySlice(AppCase):
    def test_remember_then_find_it_by_voice_and_by_search(self) -> None:
        r = self.say(REMEMBER)
        self.assertEqual(r["status"], "applied", r)
        self.assertIn("Коробка 3", r["reply"])
        item = self.app.items.list()[0]
        self.assertEqual((item["name"], item["quantity"], item["unit"]), ("резистор 10 кОм", 9, "шт"))
        self.assertEqual(item["location_path"], ["Шкаф нижний", "Коробка 3"])

        found = self.say("Домовой, где лежат резисторы 10 ком?")
        self.assertEqual(found["status"], "answered")
        self.assertIn("Шкаф нижний → Коробка 3", found["reply"])

        hits = self.app.search.search("резистр в нижнем шкафу")["hits"]       # typo + inflection
        self.assertEqual((hits[0]["kind"], hits[0]["id"]), ("item", item["id"]))

    def test_data_survives_a_restart(self) -> None:
        self.say(REMEMBER)
        self.restart()
        self.assertEqual(self.app.items.list()[0]["quantity"], 9)
        self.assertIn("Коробка 3", self.say("где резисторы")["reply"])
        self.assertEqual(self.app.search.search("резистор")["hits"][0]["kind"], "item")   # index rebuilt from the same DB

    def test_conversational_corrections_use_the_previous_command(self) -> None:
        self.say(REMEMBER, "s1")
        r = self.say("нет, десять", "s1")
        self.assertEqual(r["status"], "applied", r)
        self.assertEqual(self.app.items.list()[0]["quantity"], 10)
        r = self.say("нет, в четвертой коробке", "s1")
        self.assertEqual(self.app.items.list()[0]["location_path"], ["Шкаф нижний", "Коробка 4"])     # sibling of the last box
        # a different conversation has no "previous command"
        r = self.say("нет, десять", "someone-else")
        self.assertNotEqual(r["status"], "applied")
        self.assertEqual(self.app.items.list()[0]["quantity"], 10)

    def test_consume_use_and_count(self) -> None:
        self.say(REMEMBER)
        self.assertIn("Осталось 6", self.say("я использовал три резистора 10 ком")["reply"])
        self.assertIn("Всего 6", self.say("сколько у меня резисторов")["reply"])
        r = self.say("я использовал сто резисторов 10 ком")
        self.assertEqual(r["status"], "failed")
        self.assertEqual(self.app.items.list()[0]["quantity"], 6)                            # never goes negative

    def test_yesterdays_tool_is_found_through_recorded_activity(self) -> None:
        self.say("положил программатор в третью коробку", "a")
        self.say("положил программатор stm32 в первую коробку", "a")
        self.clock.advance(days=1)                                                            # it is now "today"
        self.app.items.touch_used(Ctx(source="test"), self.app.items.candidates("программатор stm32")[0]["id"])
        self.clock.advance(days=1)
        r = self.say("Домовой, где программатор, которым я пользовался вчера?")
        self.assertIn("stm32", r["reply"].lower())
        self.assertNotIn("Нашёл несколько", r["reply"])

    def test_undo_reverts_the_whole_command_including_created_places(self) -> None:
        self.say(REMEMBER)
        self.assertTrue(self.app.locations.list_flat())
        r = self.say("отмени")
        self.assertEqual(r["status"], "answered")
        self.assertEqual(self.app.items.list(), [])
        self.assertEqual(self.app.locations.list_flat(), [])
        self.assertEqual(self.app.search.search("резистор")["hits"], [])                     # index follows the undo

    def test_undo_refuses_to_clobber_a_newer_change(self) -> None:
        self.say(REMEMBER)
        item = self.app.items.list()[0]
        create_audit = [a for a in self.app.audit.list(entity_type="item") if a["action"] == "create"][0]
        self.app.items.update(Ctx(source="ui"), item["id"], {"quantity": 42})
        from domovoy.errors import ConflictError
        with self.assertRaises(ConflictError):
            self.app.audit.undo(create_audit["id"], Ctx(source="ui"))
        self.assertEqual(self.app.items.get(item["id"])["quantity"], 42)

    def test_ambiguity_becomes_a_question_and_the_answer_completes_the_command(self) -> None:
        self.say("запомни девять резисторов 10 ком лежат в первой коробке", "c")
        self.say("запомни пять резисторов 1 ком лежат во второй коробке", "c")
        r = self.say("я использовал два резистора", "c")
        self.assertEqual(r["status"], "clarify", r)
        self.assertEqual(len(r["options"]), 2)
        done = self.say("второй", "c")
        self.assertEqual(done["status"], "applied", done)
        quantities = sorted(i["quantity"] for i in self.app.items.list())
        self.assertEqual(quantities, [3, 9])
        self.assertEqual(self.say("нет", "c")["status"], "rejected")                          # nothing pending any more

    def test_free_form_facts_are_notes_and_searchable(self) -> None:
        r = self.say("запомни: код от домофона 4512")
        self.assertEqual(r["status"], "applied")
        self.assertEqual(self.app.search.search("домофон")["hits"][0]["kind"], "note")
        self.assertIn("4512", self.say("какой код от домофона?")["reply"])

    def test_list_a_place(self) -> None:
        self.say(REMEMBER)
        self.say("положил 3 батарейки в нижний шкаф")
        reply = self.say("что лежит в нижнем шкафу?")["reply"]
        self.assertIn("резистор", reply)
        self.assertIn("батарейк", reply)

    def test_export_import_round_trip_rebuilds_everything(self) -> None:
        self.say(REMEMBER)
        self.say("запомни: код от домофона 4512")
        dump = json.loads(json.dumps(export_data(self.app)))            # through real JSON, like a downloaded file
        self.assertNotIn("api_token", json.dumps(dump))                 # secrets are never exported
        self.say("удали резисторы")                                     # not understood: no change
        self.app.items.delete(Ctx(source="ui"), self.app.items.list()[0]["id"])
        self.assertEqual(self.app.items.list(), [])
        import_data(self.app, dump)
        self.assertEqual(self.app.items.list()[0]["quantity"], 9)
        self.assertEqual(self.app.search.search("домофон")["hits"][0]["kind"], "note")
        from domovoy.errors import ValidationError
        for bad in ({"format": "other"}, {"format": "domovoy-export", "schema_version": 99, "tables": {}},
                    {"format": "domovoy-export", "schema_version": 1, "tables": {"items": [{"nope": 1}]}}):
            with self.assertRaises(ValidationError):
                import_data(self.app, bad)
        self.assertEqual(self.app.items.list()[0]["quantity"], 9)       # rejected imports changed nothing


class Policy(AppCase):
    def test_uncertain_writes_go_to_the_review_queue_not_the_database(self) -> None:
        r = self.say("мне надо разобрать гараж")                        # chatty "надо…" → task, confidence 0.72
        self.assertEqual(r["status"], "review", r)
        self.assertIn("задача «Разобрать гараж»", r["reply"])            # says *what* is waiting, not just "a change"
        self.assertEqual(self.app.tasks.list(), [])
        review = self.app.review.list()
        self.assertEqual(len(review), 1)
        approved = self.pipeline.approve_review(review[0]["id"])
        self.assertTrue(approved["ok"])
        self.assertEqual(self.app.tasks.list()[0]["title"], "Разобрать гараж")
        self.assertEqual(self.app.review.list(), [])

    def test_review_items_can_be_edited_before_approval_and_rejected(self) -> None:
        self.say("мне надо разобрать гараж")
        review_id = self.app.review.list()[0]["id"]
        edited = self.app.review.get(review_id)["proposal"]
        edited[0]["title"] = "Разобрать кладовку"
        self.pipeline.approve_review(review_id, edited=edited)
        self.assertEqual(self.app.tasks.list()[0]["title"], "Разобрать кладовку")
        self.say("мне нужно починить кран")
        self.pipeline.reject_review(self.app.review.list()[0]["id"])
        self.assertEqual(len(self.app.tasks.list()), 1)

    def test_nonsense_is_rejected_with_a_helpful_reply(self) -> None:
        r = self.say("абракадабра шмяк")
        self.assertEqual(r["status"], "rejected")
        self.assertIn("запомни", r["reply"])
        self.assertEqual(self.app.items.list(), [])

    def test_every_command_is_logged_with_what_was_understood(self) -> None:
        self.say(REMEMBER)
        logged = self.app.commands.list()[0]
        self.assertEqual((logged["status"], logged["interpreter"], logged["frontend"]), ("applied", "rules", "web"))
        self.assertEqual(logged["intents"][0]["type"], "add_item")
        audit = self.app.audit.list()
        self.assertTrue(all(a["command_id"] == logged["id"] for a in audit))


class ModelAsAdvisor(AppCase):
    """A local model may propose; it never writes on its own authority, and its failure changes nothing."""

    def setUp(self) -> None:
        super().setUp()
        self.llm = FakeLLM()
        self.llm.__enter__()
        self.addCleanup(self.llm.__exit__)
        self.app.settings.update({"ai": {"enabled": True, "base_url": self.llm.url + "/v1", "model": "tiny"}})

    def test_model_proposals_are_queued_for_review_by_default(self) -> None:
        self.llm.reply = {"intents": [{"type": "add_item", "confidence": 0.99, "name": "паяльник", "quantity": 1, "location_path": ["Гараж"]}]}
        r = self.say("у меня в гараже завёлся паяльник, запиши-ка")
        self.assertEqual((r["status"], r["interpreter"]), ("review", "llm"), r)
        self.assertEqual(self.app.items.list(), [])
        self.pipeline.approve_review(self.app.review.list()[0]["id"])
        self.assertEqual(self.app.items.list()[0]["name"], "паяльник")

    def test_owner_can_enable_auto_apply_but_only_for_very_confident_output(self) -> None:
        self.app.settings.update({"ai": {"auto_apply": True}})
        self.llm.reply = {"intents": [{"type": "add_item", "confidence": 0.95, "name": "паяльник", "location_path": ["Гараж"]}]}
        self.assertEqual(self.say("завёлся паяльник в гараже")["status"], "applied")
        self.llm.reply = {"intents": [{"type": "add_item", "confidence": 0.7, "name": "клей", "location_path": ["Гараж"]}]}
        self.assertEqual(self.say("завёлся клей в гараже")["status"], "review")

    def test_garbage_from_the_model_is_rejected_by_validation(self) -> None:
        for reply in ("not json at all", {"intents": [{"type": "drop_database", "confidence": 1}]},
                      {"intents": [{"type": "add_item", "confidence": 1, "name": "x", "quantity": -5}]}, {"nope": 1}):
            self.llm.reply = reply
            r = self.say("странная просьба про паяльник")
            self.assertIn(r["status"], ("rejected", "review"), (reply, r))
            self.assertEqual(self.app.items.list(), [])

    def test_a_dead_model_defers_to_review_and_the_rules_still_work(self) -> None:
        self.llm.fail_status = 500
        r = self.say("странная просьба про паяльник")
        self.assertEqual(r["status"], "review")
        self.assertIn("очередь", r["reply"])
        self.assertEqual(self.say(REMEMBER)["status"], "applied")            # deterministic path is unaffected
        self.assertEqual(self.app.items.list()[0]["quantity"], 9)

    def test_voice_budget_never_waits_for_the_model(self) -> None:
        self.llm.delay = 0.6
        r = self.pipeline.handle("странная просьба про паяльник", session_id="v", deadline_s=1.0)
        self.assertEqual(r["status"], "review")                              # 1.0s budget < 1.5s minimum for a model call
        self.assertEqual(self.llm.requests, [])
