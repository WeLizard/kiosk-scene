"""Regression tests for defects found by an independent review of the backend. Each test failed before its fix."""
from __future__ import annotations

import datetime as dt
import json
import os
import sqlite3
import threading
import urllib.error
import urllib.request
from zoneinfo import ZoneInfo

from domovoy.api import ApiServer
from domovoy.errors import ConflictError, ForbiddenError, ValidationError
from domovoy.nlu.datetimes import extract_when, validate_recurrence
from domovoy.providers.ical import parse_events
from domovoy.server import build
from .base import AppCase, TZ
from .fakes import FakeHA, FakeLLM, FakeTelegram


class Recipients(AppCase):
    def test_a_preposition_is_never_taken_for_a_person(self) -> None:
        from domovoy.services.context import Ctx

        ctx = Ctx(actor="test", source="test")
        self.app.contacts.create(ctx, name="Иван Петров", channels={"telegram": {"chat_id": "1"}})
        self.app.contacts.create(ctx, name="Ирина", channels={"telegram": {"chat_id": "2"}})
        for phrase in ("напиши в телеграм что задержусь", "отправь в телеграм, что задержусь", "напиши на работу что опоздаю"):
            r = self.say(phrase)
            self.assertEqual(r["status"], "clarify", (phrase, r))
            self.assertIn("Кому", r["reply"])
        self.assertEqual(self.app.outbox.list(), [])                                             # nothing was sent to anybody
        self.assertEqual(self.app.contacts.resolve("в"), [])
        self.assertEqual([c["name"] for c in self.app.contacts.resolve("Ивану")], ["Иван Петров"])   # whole names still work
        self.assertEqual([c["name"] for c in self.app.contacts.resolve("Иван")], ["Иван Петров"])

    def test_two_messages_to_one_person_in_one_command_are_both_delivered(self) -> None:
        from domovoy.services.context import Ctx

        with FakeTelegram() as tg:
            self.app.settings.update({"telegram": {"base_url": tg.url}})                         # applies at once, no restart
            self.app.secrets.set("telegram_token", FakeTelegram.TOKEN)
            self.app.contacts.create(Ctx(actor="test", source="test"), name="Ирина", channels={"telegram": {"chat_id": "2"}})
            r = self.pipeline.approve_review(self.app.review.add(command_id=None, proposal=[
                {"type": "send_message", "recipient": "Ирина", "text": "Я задержусь", "channel": "telegram", "confidence": 0.9},
                {"type": "send_message", "recipient": "Ирина", "text": "Купи хлеб", "channel": "telegram", "confidence": 0.9}],
                reason="t", confidence=0.7))
            self.assertTrue(r["ok"], r)
            self.assertEqual([m["text"] for m in tg.sent], ["Я задержусь", "Купи хлеб"])

    def test_a_scheduled_message_is_not_sent_before_its_time(self) -> None:
        from domovoy.services.context import Ctx

        with FakeTelegram() as tg:
            self.app.settings.update({"telegram": {"base_url": tg.url}})
            self.app.secrets.set("telegram_token", FakeTelegram.TOKEN)
            self.app.contacts.create(Ctx(actor="test", source="test"), name="Ирина", channels={"telegram": {"chat_id": "2"}})
            r = self.say("Отправь Ирине в Telegram завтра в 9 утра, что я заеду")
            self.assertEqual(r["status"], "applied", r)
            self.assertEqual(self.app.outbox.process_due(), 0)                                  # not due yet: the row was *created* deferred
            self.assertEqual(tg.sent, [])
            self.clock.advance(hours=24)
            self.assertEqual(self.app.outbox.process_due(), 1)
            self.assertEqual(len(tg.sent), 1)


class HomeAssistantSecrets(AppCase):
    def test_the_supervisor_token_only_goes_to_the_supervisors_own_address(self) -> None:
        os.environ["SUPERVISOR_TOKEN"] = "SUPERVISOR-SECRET"
        self.addCleanup(os.environ.pop, "SUPERVISOR_TOKEN", None)
        self.assertEqual(self.app._ha_token(), "SUPERVISOR-SECRET")                                # default: the add-on's own proxy
        self.app.settings.update({"ha": {"url": "http://attacker.example:8123/api"}})
        self.assertEqual(self.app._ha_token(), "")                                                # typed-in address: never
        self.assertFalse(self.app.ha.configured())
        self.app.settings.update({"ha": {"url": self.app.env.ha_api_url}})
        self.assertEqual(self.app._ha_token(), "SUPERVISOR-SECRET")

    def test_no_caller_can_use_a_denied_service_not_even_through_a_speaker(self) -> None:
        with FakeHA() as ha:
            self.app.settings.update({"ha": {"url": ha.url + "/api"}})
            self.app.secrets.set("ha_token", FakeHA.TOKEN)
            for domain, service in (("lock", "unlock"), ("hassio", "addon_stop"), ("shell_command", "x"), ("alarm_control_panel", "alarm_disarm")):
                with self.assertRaises(ForbiddenError):
                    self.app.ha.call_service(domain, service, {}, enforce_allowlist=False)
            self.app.settings.update({"speakers": [{"entity_id": "media_player.k", "mode": "custom", "service": "lock.unlock", "data": {"entity_id": "{entity_id}"}, "default": True}],
                                      "speak": {"quiet_from": "", "quiet_to": ""}})
            from domovoy.errors import ProviderError

            with self.assertRaises((ForbiddenError, ProviderError)):
                self.app.speak.send("{}", "привет")
            self.assertEqual(ha.calls, [])


class HttpSecurity(AppCase):
    def setUp(self) -> None:
        super().setUp()
        ctx, _ = build(self.app)
        self.server = ApiServer(("127.0.0.1", 0), ctx)
        threading.Thread(target=self.server.serve_forever, daemon=True).start()
        self.addCleanup(self.server.server_close)
        self.addCleanup(self.server.shutdown)
        self.base = f"http://127.0.0.1:{self.server.server_address[1]}"

    def call(self, method, path, body=None, headers=None):
        data = json.dumps(body).encode() if body is not None else None
        request = urllib.request.Request(self.base + path, method=method, data=data,
                                         headers={"Content-Type": "application/json", "X-Domovoy-Client": "1", **(headers or {})})
        try:
            with urllib.request.urlopen(request, timeout=10) as response:
                return response.status, json.loads(response.read() or b"null")
        except urllib.error.HTTPError as error:
            return error.code, json.loads(error.read() or b"null")

    def test_changing_an_integration_address_forgets_the_secret_saved_for_the_old_one(self) -> None:
        self.call("PUT", "/api/settings", {"ha": {"url": "http://ha.lan:8123/api"}})
        self.call("PUT", "/api/integrations/secrets", {"ha_token": "LONG-LIVED-TOKEN", "telegram_token": "123:TG"})
        status, body = self.call("PUT", "/api/settings", {"ha": {"url": "http://evil.example/api"}})
        self.assertEqual(status, 200)
        self.assertEqual(body["secrets_cleared"], ["ha_token"])
        self.assertFalse(self.app.secrets.has("ha_token"))
        self.assertTrue(self.app.secrets.has("telegram_token"))                                    # unrelated secrets stay
        # a path change on the same host keeps it
        self.call("PUT", "/api/integrations/secrets", {"ha_token": "AGAIN"})
        self.assertEqual(self.call("PUT", "/api/settings", {"ha": {"url": "http://evil.example/other"}})[1]["secrets_cleared"], [])

    def test_settings_that_would_crash_the_service_are_refused(self) -> None:
        for body in ({"telegram": {"base_url": None}}, {"telegram": {"base_url": ""}}, {"voice": {"stt": "x"}}, {"voice": {"nope": 1}},
                     {"timezone": "Mars/Base"}, {"ai": {"enabled": "yes"}}, {"ha": {"allowed_services": [1]}}, {"ha": {"url": "http://"}},
                     {"ai": {"base_url": "ftp://x"}}):
            status, err = self.call("PUT", "/api/settings", body)
            self.assertEqual(status, 422, (body, err))
        self.assertEqual(self.call("GET", "/api/state")[0], 200)                                   # and the service is still fine
        self.assertEqual(self.call("PUT", "/api/settings", {"timezone": "Europe/Moscow", "voice": {"stt": {"language": "ru"}}})[0], 200)

    def test_the_review_threshold_cannot_exceed_the_auto_apply_threshold(self) -> None:
        status, err = self.call("PUT", "/api/settings", {"auto_apply_confidence": 0.4})           # review is 0.5 by default
        self.assertEqual(status, 422, err)
        self.assertEqual(self.call("PUT", "/api/settings", {"auto_apply_confidence": 0.4, "review_confidence": 0.3})[0], 200)

    def test_non_ascii_credentials_are_a_401_not_a_crash(self) -> None:
        self.assertEqual(self.call("GET", "/api/state", headers={"X-Domovoy-Origin": "lan", "Authorization": "Bearer токен".encode("utf-8").decode("latin-1")})[0], 401)
        status, _ = self.call("POST", "/frontends/assist", {"text": "привет"}, headers={"X-Domovoy-Origin": "lan", "X-Domovoy-Secret": "секрет".encode("utf-8").decode("latin-1")})
        self.assertEqual(status, 401)

    def test_the_assist_secret_is_not_accepted_in_the_query_string(self) -> None:
        secret = self.app.secrets.get("assist_secret")
        status, _ = self.call("POST", f"/frontends/assist?secret={secret}", {"text": "привет"}, headers={"X-Domovoy-Origin": "lan"})
        self.assertEqual(status, 401)


class ModelProposals(AppCase):
    def test_an_undo_proposed_by_a_model_waits_for_a_person(self) -> None:
        self.say("запомни: девять винтов лежат в коробке")
        with FakeLLM() as llm:
            self.app.settings.update({"ai": {"enabled": True, "base_url": llm.url + "/v1", "model": "tiny", "auto_apply": False}})
            llm.reply = {"intents": [{"type": "undo", "confidence": 0.95}]}
            r = self.say("ну это, убери то самое")
            self.assertEqual((r["status"], r["interpreter"]), ("review", "llm"), r)
            self.assertEqual(len(self.app.items.list()), 1)                                       # nothing was undone
            self.assertEqual(len(self.app.review.list()), 1)


class Recurrence(AppCase):
    def test_a_broken_rule_is_refused_when_saved(self) -> None:
        from domovoy.services.context import Ctx

        ctx = Ctx(actor="test", source="test")
        for rule in ({"freq": "daily", "interval": "abc"}, {"freq": "hourly"}, {"freq": "weekly", "byweekday": [9]}, {"freq": "daily", "interval": 0}, "daily"):
            with self.assertRaises(ValidationError):
                self.app.reminders.create(ctx, text="x", due_at=self.clock.now() + dt.timedelta(hours=1), recurrence=rule)
        self.assertEqual(validate_recurrence({"freq": "weekly", "byweekday": [4, 0, 4], "junk": 1}), {"freq": "weekly", "interval": 1, "byweekday": [0, 4]})

    def test_patching_due_at_normalises_the_time_and_refuses_words(self) -> None:
        from domovoy.services.context import Ctx

        ctx = Ctx(actor="test", source="test")
        r = self.app.reminders.create(ctx, text="x", due_at=self.clock.now() + dt.timedelta(hours=5))
        updated = self.app.reminders.update(ctx, r["id"], {"due_at": "2026-10-01T09:00:00+03:00"})
        self.assertEqual(updated["due_at"], "2026-10-01T06:00:00Z")
        with self.assertRaises(ValidationError):
            self.app.reminders.update(ctx, r["id"], {"due_at": "tomorrow"})

    def test_one_poisoned_reminder_neither_blocks_the_others_nor_repeats(self) -> None:
        from domovoy.services.context import Ctx

        ctx = Ctx(actor="test", source="test")
        good = self.app.reminders.create(ctx, text="хороший", due_at=self.clock.now() + dt.timedelta(minutes=30))
        bad = self.app.reminders.create(ctx, text="испорченный", due_at=self.clock.now() + dt.timedelta(minutes=10))
        with self.app.db.write() as conn:                                                          # as if stored by an older version
            conn.execute("UPDATE reminders SET recurrence = ? WHERE id = ?", (json.dumps({"freq": "daily", "interval": "abc"}), bad["id"]))
        _, scheduler = build(self.app)
        self.clock.advance(minutes=40)
        self.assertEqual(scheduler.tick()["reminders"], 2)                                         # both fired in one pass
        self.assertEqual(self.app.reminders.get(good["id"])["state"], "fired")
        self.assertEqual(self.app.reminders.get(bad["id"])["state"], "fired")                     # fired once, no repeat rule left
        self.clock.advance(minutes=5)
        self.assertEqual(scheduler.tick()["reminders"], 0)                                         # and not again


class ReviewQueue(AppCase):
    def test_an_empty_proposal_cannot_be_approved(self) -> None:
        review_id = self.app.review.add(command_id=None, proposal=[], reason="model was down", confidence=None)
        with self.assertRaises(ValidationError) as caught:
            self.pipeline.approve_review(review_id)
        self.assertEqual(caught.exception.code, "empty_proposal")
        self.assertEqual(self.app.review.get(review_id)["status"], "pending")

    def test_only_one_of_two_simultaneous_approvals_runs(self) -> None:
        review_id = self.app.review.add(command_id=None, proposal=[{"type": "add_note", "text": "одна заметка", "confidence": 0.6}], reason="t", confidence=0.6)
        outcomes: list[str] = []

        def approve() -> None:
            try:
                self.pipeline.approve_review(review_id)
                outcomes.append("ok")
            except ValidationError:
                outcomes.append("refused")

        threads = [threading.Thread(target=approve) for _ in range(6)]
        [t.start() for t in threads]
        [t.join() for t in threads]
        self.assertEqual(sorted(outcomes), ["ok"] + ["refused"] * 5)
        self.assertEqual(len(self.app.notes.list()), 1)

    def test_a_failed_approval_stays_in_the_queue(self) -> None:
        review_id = self.app.review.add(command_id=None, proposal=[{"type": "move_item", "name": "несуществующая штука", "location_path": ["Гараж"], "confidence": 0.6}],
                                        reason="t", confidence=0.6)
        result = self.pipeline.approve_review(review_id)
        self.assertFalse(result["ok"])
        self.assertTrue(result["still_pending"])
        self.assertEqual(self.app.review.get(review_id)["status"], "pending")                      # nothing changed, nothing lost

    def test_items_claimed_when_the_process_died_are_put_back(self) -> None:
        review_id = self.app.review.add(command_id=None, proposal=[{"type": "add_note", "text": "x", "confidence": 0.6}], reason="t", confidence=0.6)
        self.assertTrue(self.app.review.claim(review_id))
        self.restart()
        self.assertEqual(self.app.review.get(review_id)["status"], "pending")


class Undo(AppCase):
    def test_a_place_cannot_be_undone_while_things_are_in_it(self) -> None:
        from domovoy.services.context import Ctx

        ctx = Ctx(actor="test", source="test")
        place = self.app.locations.create(ctx, name="Коробка 9")
        entry = [a for a in self.app.audit.list(entity_type="location") if a["entity_id"] == place["id"]][0]
        self.app.items.create(ctx, name="винт", quantity=3, location_id=place["id"])
        with self.assertRaises(ConflictError) as caught:
            self.app.audit.undo(entry["id"], ctx)
        self.assertEqual(caught.exception.code, "location_not_empty")

    def test_restoring_a_deleted_place_whose_name_is_taken_is_a_conflict_not_a_crash(self) -> None:
        from domovoy.services.context import Ctx

        ctx = Ctx(actor="test", source="test")
        place = self.app.locations.create(ctx, name="Шкаф")
        self.app.locations.delete(ctx, place["id"])
        self.app.locations.create(ctx, name="Шкаф")
        delete_entry = [a for a in self.app.audit.list(entity_type="location") if a["action"] == "delete"][0]
        with self.assertRaises(ConflictError):
            self.app.audit.undo(delete_entry["id"], ctx)

    def test_a_bare_undo_does_not_reach_back_to_an_old_change_from_another_conversation(self) -> None:
        self.say("запомни: девять винтов лежат в коробке", session="web-old")
        self.clock.advance(minutes=20)                                                             # past the 15-minute reach, inside the conversation
        r = self.pipeline.handle("отмени", session_id="fresh-voice-session")
        self.assertEqual(r["status"], "failed")
        self.assertEqual(r["reply"], "Нечего отменять.")
        self.assertEqual(len(self.app.items.list()), 1)
        # …but the conversation that made the change can still undo it
        self.assertIn("Отменено", self.say("отмени", session="web-old")["reply"])

    def test_undo_with_nothing_undoable_answers_in_russian(self) -> None:
        with FakeTelegram() as tg:
            from domovoy.services.context import Ctx

            self.app.settings.update({"telegram": {"base_url": tg.url}})
            self.app.secrets.set("telegram_token", FakeTelegram.TOKEN)
            self.app.contacts.create(Ctx(actor="test", source="test"), name="Ирина", channels={"telegram": {"chat_id": "2"}})
            self.say("Отправь Ирине в Telegram, что я задержусь")
            reply = self.say("отмени")["reply"]
            self.assertNotIn("Nothing", reply)
            self.assertRegex(reply, "[а-яА-Я]")

    def test_snapshots_from_an_imported_file_cannot_smuggle_column_names_into_sql(self) -> None:
        conn = sqlite3.connect(":memory:")
        conn.row_factory = sqlite3.Row
        conn.execute("CREATE TABLE things(id INTEGER PRIMARY KEY, name TEXT)")
        conn.execute("INSERT INTO things VALUES (1, 'a')")
        from domovoy.services.audit import AuditLog

        AuditLog._restore(conn, "things", 1, {"name": "b", "name = 'x'; DROP TABLE things; --": "boom"})
        self.assertEqual(conn.execute("SELECT name FROM things WHERE id = 1").fetchone()[0], "b")


class Clarification(AppCase):
    def test_asking_which_item_creates_no_places_and_the_answer_completes_the_command(self) -> None:
        self.say("запомни: паяльник лежит в гараже", session="s")
        self.assertEqual(self.say("запомни: паяльник лежит на балконе", session="s2")["status"], "applied")
        if len(self.app.items.list()) == 1:                                                         # same name → the second only moved it
            self.app.items.create(__import__("domovoy.services.context", fromlist=["Ctx"]).Ctx(actor="t", source="t"), name="паяльник", quantity=1)
        places_before = len(self.app.locations.list_flat())
        r = self.say("положил паяльник в подвал на верхнюю полку", session="s3")
        self.assertEqual(r["status"], "clarify", r)
        self.assertEqual(len(self.app.locations.list_flat()), places_before)                       # nothing was created to ask the question
        done = self.say("второй", session="s3")
        self.assertEqual(done["status"], "applied", done)
        self.assertGreater(len(self.app.locations.list_flat()), places_before)
        self.assertIn("Подвал", {i["location_path"][0] for i in self.app.items.list() if i["location_path"]})


class Calendar(AppCase):
    def test_all_day_events_span_whole_days(self) -> None:
        r = self.say("Добавь в календарь день рождения Маши 15 октября на весь день")
        self.assertEqual(r["status"], "applied", r)
        event = self.app.calendar.list_events(dt.datetime(2026, 10, 14, tzinfo=TZ), dt.datetime(2026, 10, 17, tzinfo=TZ))["events"][0]
        self.assertTrue(event["all_day"])
        self.assertEqual(event["start"][11:19], "00:00:00")
        self.assertEqual(dt.datetime.fromisoformat(event["end"]) - dt.datetime.fromisoformat(event["start"]), dt.timedelta(days=1))
        # so the day after it does not list it
        self.assertEqual(self.app.calendar.list_events(dt.datetime(2026, 10, 16, tzinfo=TZ), dt.datetime(2026, 10, 17, tzinfo=TZ))["events"], [])

    def test_one_malformed_event_from_a_server_does_not_hide_the_rest(self) -> None:
        text = ("BEGIN:VCALENDAR\nBEGIN:VEVENT\nUID:bad\nSUMMARY:Сломанное\nDTSTART:2026-10-01T10:00:00Z\nEND:VEVENT\n"
                "BEGIN:VEVENT\nUID:ok\nSUMMARY:Нормальное\nDTSTART:20261002T100000Z\nEND:VEVENT\nEND:VCALENDAR\n")
        self.assertEqual([e.title for e in parse_events(text)], ["Нормальное"])

    def test_an_unexpected_provider_error_is_a_warning_not_a_500(self) -> None:
        class Broken:
            def configured(self):
                return True

            def list_events(self, start, end):
                raise ValueError("odd data")

        self.app.calendar.caldav = Broken()
        result = self.app.calendar.list_events(dt.datetime(2026, 9, 28, tzinfo=TZ), dt.datetime(2026, 9, 30, tzinfo=TZ))
        self.assertEqual(result["events"], [])
        self.assertEqual(result["warnings"][0]["source"], "caldav")


class DaylightSaving(AppCase):
    def test_in_two_hours_is_two_real_hours_across_a_clock_change(self) -> None:
        # Sofia: 2026-10-25 04:00 EEST → 03:00 EET. 02:30 EEST + 2 h of elapsed time is 03:30 EET (= 01:30 UTC).
        now = dt.datetime(2026, 10, 25, 2, 30, tzinfo=ZoneInfo("Europe/Sofia"))
        when = extract_when("через 2 часа", now, default_hour=9)
        self.assertEqual(when.start.astimezone(dt.timezone.utc), dt.datetime(2026, 10, 25, 1, 30, tzinfo=dt.timezone.utc))
        # a reminder for tomorrow keeps its wall-clock time across the change
        tomorrow = extract_when("завтра в 9 утра", dt.datetime(2026, 10, 24, 12, 0, tzinfo=ZoneInfo("Europe/Sofia")), default_hour=9)
        self.assertEqual((tomorrow.start.day, tomorrow.start.hour), (25, 9))
