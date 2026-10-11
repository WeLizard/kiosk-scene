"""Real Bot API adapter, persistent inbox, pipeline and outbox contracts."""
from __future__ import annotations

import datetime as dt
from unittest.mock import patch

from ..helpers import ADDON_DIR  # noqa: F401
from domovoy.frontends.telegram import UNCERTAIN
from domovoy.services.context import Ctx
from .base import AppCase
from .fakes import FakeTelegram

UI = Ctx(source="test")


def update(uid, text="/help", chat_id=42, kind="private"):
    return {"update_id": uid, "message": {"chat": {"id": chat_id, "type": kind, "first_name": "Илья"},
                                         "from": {"id": chat_id, "is_bot": False}, "text": text}}


class TelegramFrontendTests(AppCase):
    def setUp(self):
        super().setUp()
        self.tg = FakeTelegram()
        self.tg.__enter__()
        self.addCleanup(lambda: self.tg.__exit__(None, None, None))
        self.app.settings.update({"telegram": {"base_url": self.tg.url}})
        self.app.secrets.set("telegram_token", self.tg.TOKEN)
        self.app.contacts.create(UI, name="Илья", is_self=True, channels={"telegram": {"chat_id": "42"}})

    def poll(self, *updates):
        self.tg.updates = list(updates)
        return self.app.telegram_frontend.poll()

    def test_russian_command_reply_delivery_restart_and_dedup(self):
        command = update(1, "Запомни: девять резисторов лежат в третьей коробке нижнего шкафа")
        self.poll(command)
        self.assertEqual(len(self.app.items.list()), 1)
        self.assertEqual(self.app.commands.list()[0]["frontend"], "telegram")
        self.app.outbox.process_due()
        self.assertEqual(len(self.tg.sent), 1)
        self.restart()
        self.poll(command, update(2, "нет, десять"))
        self.assertEqual(self.app.items.list()[0]["quantity"], 10)
        self.assertEqual(len(self.app.commands.list()), 2)
        self.assertEqual(len(self.app.outbox.list()), 2)
        self.assertEqual(self.app.db.get_setting("telegram.offset"), 3)

    def test_only_self_private_chat_can_command_unknown_only_start_pairs(self):
        self.app.contacts.create(UI, name="Гость", channels={"telegram": {"chat_id": "77"}})
        self.poll(update(1, "Добавь в список покупок хлеб", 55), update(2, "/start", 55),
                  update(3, "Добавь в список покупок хлеб", 77), update(4, "/today", 77),
                  update(5, "/start", -10, "group"), update(6, "Добавь в список покупок хлеб", 42, "supergroup"))
        self.assertEqual(self.app.tasks.list(), [])
        self.assertEqual(self.app.commands.list(), [])
        self.assertEqual([r["chat_id"] for r in self.app.db.get_setting("telegram.link_requests")], ["55"])
        self.assertEqual(len(self.app.outbox.list()), 1)

    def test_disabled_stops_poll_and_preserves_queued_replies_without_attempts(self):
        self.poll(update(1))
        self.app.settings.update({"telegram": {"enabled": False}})
        self.tg.updates = [update(2, "Добавь в список покупок хлеб")]
        self.assertEqual(self.app.telegram_frontend.poll(), 0)
        self.assertEqual(len(self.tg.updates), 1)
        self.assertEqual(self.app.outbox.process_due(), 0)
        self.assertEqual(self.app.outbox.list()[0]["attempts"], 0)
        self.app.settings.update({"telegram": {"enabled": True}})
        self.assertEqual(self.app.telegram_frontend.poll(), 1)
        self.assertEqual(len(self.app.tasks.list()), 1)

    def test_nontext_malformed_sender_and_group_updates_acknowledged_without_effects(self):
        forged = update(2, "Добавь в список покупок хлеб")
        forged["message"]["from"]["id"] = 77
        self.poll(None, [], {"update_id": "wrong"}, {"update_id": 1, "message": []}, forged,
                  update(3, None), {"update_id": 4, "message": {"chat": "bad"}},
                  update(5, "/start", 42, "group"))
        self.assertEqual(self.app.db.get_setting("telegram.offset"), 6)
        self.assertEqual(self.app.outbox.list(), [])
        self.assertEqual(self.app.tasks.list(), [])
        self.assertEqual(self.app.db.get_setting("telegram.link_requests", []), [])

    def test_disabled_telegram_backlog_does_not_starve_other_channels(self):
        for index in range(25):
            self.app.outbox.enqueue(UI, channel="telegram", recipient="self", address="42", text=f"Ответ {index}")
        speech = self.app.outbox.enqueue(UI, channel="speak", recipient="self", address="{}", text="Выключи духовку")
        self.app.settings.update({"telegram": {"enabled": False}})
        with patch.object(self.app.speak, "send", return_value="spoken") as sender:
            self.assertEqual(self.app.outbox.process_due(limit=20), 1)
            sender.assert_called_once_with("{}", "Выключи духовку")
        rows = self.app.outbox.list()
        self.assertEqual(next(row["status"] for row in rows if row["id"] == speech["id"]), "sent")
        self.assertTrue(all(row["status"] == "queued" and row["attempts"] == 0
                            for row in rows if row["channel"] == "telegram"))

    def test_crash_after_side_effect_never_reexecutes_and_replies_uncertain(self):
        frontend = self.app.telegram_frontend
        self.tg.updates = [update(1, "Добавь в список покупок хлеб")]
        with patch.object(frontend, "_finish", side_effect=RuntimeError("simulated crash")):
            with self.assertRaises(RuntimeError):
                frontend.poll()
        self.assertEqual(len(self.app.tasks.list()), 1)
        self.restart()
        self.poll(update(1, "Добавь в список покупок хлеб"), update(2, "/shopping"))
        self.assertEqual(len(self.app.commands.list()), 2)
        replies = self.app.outbox.list()
        self.assertEqual(len(replies), 2)
        self.assertTrue(any(row["text"] == UNCERTAIN for row in replies))
        with self.app.db.read() as conn:
            self.assertEqual(conn.execute("SELECT status FROM telegram_updates WHERE update_id = 1").fetchone()[0], "uncertain")

    def test_claim_before_execution_crash_is_honestly_uncertain(self):
        with self.app.db.write() as conn:
            conn.execute("INSERT INTO telegram_updates(update_id, chat_id, status, created_at) VALUES (1, '42', 'processing', ?)",
                         (self.clock.now_iso(),))
        self.restart()
        self.poll(update(1, "Добавь в список покупок хлеб"))
        self.assertEqual(self.app.tasks.list(), [])
        self.assertEqual(self.app.outbox.list()[0]["text"], UNCERTAIN)
        self.poll(update(1))
        self.assertEqual(len(self.app.outbox.list()), 1)

    def test_reply_and_completion_roll_back_together_on_offset_write_failure(self):
        original = self.app.db.set_setting

        def fail_offset(key, value):
            if key == "telegram.offset":
                raise RuntimeError("disk write interrupted")
            return original(key, value)

        with patch.object(self.app.db, "set_setting", side_effect=fail_offset):
            with self.assertRaises(RuntimeError):
                self.poll(update(1, "Добавь в список покупок хлеб"))
        self.assertEqual(self.app.outbox.list(), [])
        self.assertEqual(len(self.app.commands.list()), 1)
        self.restart()
        self.poll(update(1, "Добавь в список покупок хлеб"))
        self.assertEqual(len(self.app.commands.list()), 1)
        self.assertEqual(self.app.outbox.list()[0]["text"], UNCERTAIN)

    def test_crash_after_external_message_does_not_send_it_twice(self):
        self.app.contacts.create(UI, name="Ирина", channels={"telegram": {"chat_id": "77"}})
        with patch.object(self.app.telegram_frontend, "_finish", side_effect=RuntimeError("crash")):
            with self.assertRaises(RuntimeError):
                self.poll(update(1, "Отправь Ирине в Telegram, что я задержусь"))
        self.assertEqual(len(self.tg.sent), 1)
        self.restart()
        self.poll(update(1, "Отправь Ирине в Telegram, что я задержусь"))
        self.app.outbox.process_due()
        self.assertEqual(len([r for r in self.tg.sent if str(r["chat_id"]) == "77"]), 1)
        self.assertEqual(self.tg.sent[-1]["text"], UNCERTAIN)

    def test_useful_commands_and_local_date_in_today(self):
        self.app.calendar.create(UI, title="Врач", start=self.clock.now() + dt.timedelta(hours=2))
        self.app.tasks.create(UI, title="Хлеб", list_name="shopping")
        self.app.tasks.create(UI, title="Уборка")
        self.app.reminders.create(UI, text="Фильтр", due_at=self.clock.now() + dt.timedelta(hours=2), channel="ui")
        self.app.reminders.create(UI, text="Полночь", due_at=self.clock.local_now().replace(hour=0, minute=30), channel="ui")
        self.poll(update(1, "/start"), update(2, "/help"), update(3, "/today"), update(4, "/shopping"))
        replies = {r["id"]: r["text"] for r in self.app.outbox.list()}
        self.assertIn("/shopping", replies[1])
        self.assertIn("Врач", replies[3])
        self.assertIn("Уборка", replies[3])
        self.assertIn("Фильтр", replies[3])
        self.assertIn("Полночь", replies[3])
        self.assertIn("Хлеб", replies[4])

    def test_failed_speaker_without_self_address_falls_back_to_screen(self):
        self.app.contacts.update(UI, self.app.contacts.list()[0]["id"], {"channels": {}})
        row = self.app.outbox.enqueue(UI, channel="speak", recipient="self", address="{}", text="Выключи духовку", key="test")
        from domovoy.errors import ProviderError
        with patch.object(self.app.speak, "send", side_effect=ProviderError("no speaker", retryable=False)):
            self.app.outbox.deliver_now(row["id"])
        self.assertEqual([r["channel"] for r in self.app.outbox.list()], ["speak"])
        with self.app.db.read() as conn:
            notification = conn.execute("SELECT payload FROM change_log WHERE topic = 'notification'").fetchone()
        self.assertIn("Выключи духовку", notification[0])

    def test_today_filters_shopping_and_future_before_limit_and_prioritizes_due(self):
        for index in range(15):
            self.app.tasks.create(UI, title=f"Покупка {index}", list_name="shopping", due_date="2026-09-01")
            self.app.tasks.create(UI, title=f"Будущее {index}", due_date="2026-09-29")
        self.app.tasks.create(UI, title="Срок сегодня", due_date="2026-09-28")
        self.app.tasks.create(UI, title="Просрочено", due_date="2026-09-27")
        self.app.tasks.create(UI, title="Обычная задача")
        self.poll(update(1, "/today"))
        reply = self.app.outbox.list()[0]["text"]
        self.assertIn("Обычная задача", reply)
        self.assertNotIn("Покупка", reply)
        self.assertNotIn("Будущее", reply)
        self.assertLess(reply.index("Просрочено"), reply.index("Срок сегодня"))
        self.assertLess(reply.index("Срок сегодня"), reply.index("Обычная задача"))
        for index in range(15):
            self.app.tasks.create(UI, title=f"Без срока {index}")
        self.poll(update(2, "/today"))
        reply = self.app.outbox.list()[0]["text"]
        self.assertEqual(reply.count("Задача: "), 12)
        self.assertIn("Просрочено", reply)
        self.assertIn("Срок сегодня", reply)
