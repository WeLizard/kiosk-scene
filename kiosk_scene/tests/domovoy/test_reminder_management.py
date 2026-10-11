from __future__ import annotations

from ..helpers import ADDON_DIR  # noqa: F401
from domovoy.errors import ConflictError, ValidationError
from domovoy.nlu.intents import validate_intent
from domovoy.services.context import Ctx
from .base import AppCase


class ReminderManagement(AppCase):
    def test_query_complete_and_cancel_by_number(self) -> None:
        first = self.say("Напомни через час купить молоко")
        second = self.say("Напомни через два часа позвонить маме")
        self.assertEqual(first["status"], "applied")
        self.assertEqual(second["status"], "applied")
        ids = [r["id"] for r in self.app.reminders.list()]
        listed = self.say("Покажи мои напоминания")
        self.assertEqual(listed["status"], "answered")
        self.assertEqual(len(listed["results"][0]["data"]["reminders"]), 2)
        self.assertIn("№", listed["reply"])
        self.assertEqual(self.say(f"отметь напоминание {ids[0]} выполненным")["status"], "applied")
        self.assertEqual(self.app.reminders.get(ids[0])["state"], "done")
        self.assertEqual(self.say(f"удали напоминание {ids[1]}")["status"], "applied")
        self.assertEqual(self.app.reminders.list(), [])

    def test_query_includes_fired_reminders(self) -> None:
        self.say("Напомни через час купить молоко")
        rid = self.app.reminders.list()[0]["id"]
        self.app.reminders.update(Ctx(source="test"), rid, {"state": "fired"})
        listed = self.say("Покажи мои напоминания")
        self.assertEqual(listed["status"], "answered")
        self.assertEqual([r["id"] for r in listed["results"][0]["data"]["reminders"]], [rid])

    def test_ambiguous_name_then_second_uses_saved_ids(self) -> None:
        self.say("Напомни через час купить молоко")
        self.say("Напомни через два часа купить хлеб")
        ids = [r["id"] for r in self.app.reminders.list()]
        result = self.say("отмени напоминание купить")
        self.assertEqual(result["status"], "clarify")
        self.assertEqual(len(self.app.sessions.get("t")["pending"]["reminder_ids"]), 2)
        self.assertEqual(self.say("второе")["status"], "applied")
        self.assertEqual(self.app.reminders.list()[0]["id"], ids[0])

    def test_explicit_target_overrides_last_and_done_cannot_be_snoozed(self) -> None:
        self.say("Напомни через час купить молоко")
        milk = self.app.reminders.list()[0]["id"]
        self.say("Напомни через два часа купить хлеб")
        bread = next(r["id"] for r in self.app.reminders.list() if "хлеб" in r["text"])
        self.assertEqual(self.say(f"отложи напоминание {milk} на 15 минут")["status"], "applied")
        self.assertEqual(self.app.reminders.get(milk)["due_at"], "2026-09-28T07:15:00Z")
        self.assertEqual(self.say("отложи его на 10 минут")["status"], "applied")
        self.assertEqual(self.app.reminders.get(milk)["due_at"], "2026-09-28T07:10:00Z")
        self.assertEqual(self.say(f"отметь напоминание {milk} выполненным")["status"], "applied")
        self.assertEqual(self.say("отложи его на 10 минут")["status"], "failed")
        self.assertEqual(self.app.reminders.get(milk)["state"], "done")
        self.assertEqual(self.app.reminders.get(bread)["state"], "pending")

    def test_context_snooze_rejected_and_review_has_concrete_id(self) -> None:
        trigger = {"type": "room", "place": "мастерская"}
        context = self.app.reminders.create(Ctx(source="test"), text="Забрать ключ", trigger=trigger)
        self.assertEqual(self.say(f"отложи напоминание {context['id']} на 10 минут")["status"], "failed")
        self.say("Напомни через час купить молоко")
        rid = next(r["id"] for r in self.app.reminders.list() if r["kind"] == "time")
        self.app.settings.update({"auto_apply_confidence": 0.99})
        queued = self.say("удали напоминание купить молоко")
        self.assertEqual(queued["status"], "review")
        proposal = self.app.review.get(queued["results"][0]["review_id"])["proposal"]
        self.assertEqual(proposal[0]["reminder_id"], rid)
        self.assertNotIn("text", proposal[0])
        self.app.reminders.complete(Ctx(source="test"), rid)
        approved = self.pipeline.approve_review(queued["results"][0]["review_id"])
        self.assertFalse(approved["ok"])
        self.assertEqual(self.app.reminders.get(rid)["state"], "done")

    def test_service_rejects_reopening_done_and_context_snooze(self) -> None:
        self.say("Напомни через час купить молоко")
        rid = self.app.reminders.list()[0]["id"]
        ctx = Ctx(source="test")
        self.app.reminders.complete(ctx, rid)
        with self.assertRaises(ConflictError):
            self.app.reminders.snooze(ctx, rid, 10)
        with self.assertRaises(ConflictError):
            self.app.reminders.update(ctx, rid, {"state": "pending"})
        with self.assertRaises(ConflictError):
            self.app.reminders.complete(ctx, rid)
        with self.assertRaises(ConflictError):
            self.app.reminders.delete(ctx, rid, _require_active=True)
        self.assertEqual(self.app.reminders.get(rid)["state"], "done")
        context = self.app.reminders.create(ctx, text="Забрать ключ", trigger={"type": "room", "place": "мастерская"})
        with self.assertRaises(ConflictError):
            self.app.reminders.snooze(ctx, context["id"], 10)
        self.assertEqual(self.app.reminders.get(context["id"])["state"], "pending")

    def test_id_and_minutes_must_be_positive_integers(self) -> None:
        for field, value in (("reminder_id", 0), ("reminder_id", 1.5), ("minutes", 0), ("minutes", 10081), ("minutes", 1.5)):
            intent = {"type": "snooze_reminder", "reminder_id": 1, "minutes": 10, "confidence": 1.0}
            intent[field] = value
            with self.subTest(field=field, value=value), self.assertRaises(ValidationError):
                validate_intent(intent)
