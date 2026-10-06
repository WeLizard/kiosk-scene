"""Personal-assistant slice: NL command → calendar / reminder / message → adapter → persisted result → visible in the API."""
from __future__ import annotations

import datetime as dt

from ..helpers import ADDON_DIR  # noqa: F401
from domovoy.scheduler import Scheduler
from domovoy.services.context import Ctx
from .base import TZ, AppCase
from .fakes import FakeCalDAV, FakeHA, FakeTelegram

UI = Ctx(source="test")


class Calendar(AppCase):
    def test_local_calendar_create_query_move_delete_by_voice(self) -> None:
        r = self.say("Добавь в календарь стоматолога на следующий четверг в 18:30")
        self.assertEqual(r["status"], "applied", r)
        self.assertIn("8 октября в 18:30", r["reply"])
        events = self.app.calendar.list_events(self.clock.now(), self.clock.now() + dt.timedelta(days=30))["events"]
        self.assertEqual([e["title"] for e in events], ["Стоматолог"])

        self.assertIn("Стоматолог", self.say("Что у меня на неделе по календарю?")["reply"] + self.say("что в календаре 8 октября")["reply"])
        self.assertEqual(self.say("что у меня завтра по календарю")["reply"], "Событий завтра нет.")

        moved = self.say("перенеси стоматолога на пятницу в 10:00")
        self.assertEqual(moved["status"], "applied", moved)
        event = self.app.calendar.list_events(self.clock.now(), self.clock.now() + dt.timedelta(days=30))["events"][0]
        self.assertTrue(event["start"].startswith("2026-10-02T10:00"))

        self.assertEqual(self.say("удали событие стоматолог")["status"], "applied")
        self.assertEqual(self.app.calendar.list_events(self.clock.now(), self.clock.now() + dt.timedelta(days=30))["events"], [])
        self.say("отмени")                                                                     # undo the delete
        self.assertEqual(len(self.app.calendar.list_events(self.clock.now(), self.clock.now() + dt.timedelta(days=30))["events"]), 1)

    def test_caldav_adapter_full_crud_against_a_real_http_server(self) -> None:
        with FakeCalDAV() as dav:
            self.app.settings.update({"caldav": {"url": dav.url + "/cal/anna/personal/", "username": dav.USER}, "calendar": {"default": "caldav"}})
            self.app.secrets.set("caldav_password", dav.PASSWORD)
            r = self.say("Добавь в календарь стоматолога на следующий четверг в 18:30")
            self.assertEqual(r["status"], "applied", r)
            self.assertEqual(len(dav.resources), 1)
            ics = next(iter(dav.resources.values()))[0]
            self.assertIn("SUMMARY:Стоматолог", ics)
            self.assertIn("DTSTART:20261008T153000Z", ics)                                     # 18:30 Sofia (+03:00)

            # someone else added attendees/alarm in their calendar app: Domovoy must not destroy them on update
            href = next(iter(dav.resources))
            ics_rich = ics.replace("END:VEVENT", "ATTENDEE:mailto:wife@example.com\r\nBEGIN:VALARM\r\nTRIGGER:-PT15M\r\nEND:VALARM\r\nEND:VEVENT")
            dav.resources[href] = (ics_rich, '"rich"')
            moved = self.say("перенеси стоматолога на пятницу в 10:00")
            self.assertEqual(moved["status"], "applied", moved)
            new_ics = dav.resources[href][0]
            self.assertIn("ATTENDEE:mailto:wife@example.com", new_ics)
            self.assertIn("TRIGGER:-PT15M", new_ics)
            self.assertIn("DTSTART:20261002T070000Z", new_ics)

            listed = self.say("что в календаре в пятницу")
            self.assertIn("Стоматолог", listed["reply"])
            self.assertEqual(self.say("удали событие стоматолог")["status"], "applied")
            self.assertEqual(dav.resources, {})

            self.say("Добавь в календарь врача на следующий четверг в 12:00")
            self.assertEqual(len(dav.resources), 1)
            self.say("отмени")                                                                  # undo creates → DELETE on the server
            self.assertEqual(dav.resources, {})

    def test_caldav_outage_is_reported_and_nothing_is_lost(self) -> None:
        with FakeCalDAV() as dav:
            self.app.settings.update({"caldav": {"url": dav.url + "/cal/anna/personal/", "username": dav.USER}, "calendar": {"default": "caldav"}})
            self.app.secrets.set("caldav_password", dav.PASSWORD)
            dav.fail = True
            r = self.say("Добавь в календарь стоматолога на следующий четверг в 18:30")
            self.assertEqual(r["status"], "failed")
            self.assertIn("недоступен", r["reply"])
            self.assertTrue(r["results"][0].get("retryable"))
            self.assertEqual(self.app.commands.list()[0]["status"], "failed")                   # recorded, retryable from Activity
            # the local calendar keeps working, and a query merges what it can read with a warning about the rest
            self.app.calendar.create(UI, title="Своё", start=self.clock.now() + dt.timedelta(hours=3), calendar="local")
            listed = self.app.calendar.list_events(self.clock.now(), self.clock.now() + dt.timedelta(days=1))
            self.assertEqual([e["title"] for e in listed["events"]], ["Своё"])
            self.assertEqual(listed["warnings"][0]["source"], "caldav")
            with self.app.db.read() as conn:
                self.assertEqual(conn.execute("PRAGMA integrity_check").fetchone()[0], "ok")
            wrong = self.app.caldav
            self.app.secrets.set("caldav_password", "wrong-password")
            dav.fail = False
            self.assertEqual(self.say("что у меня на неделе по календарю")["status"], "answered")   # 401 → warning, not a crash

    def test_home_assistant_calendar_is_read_and_can_create(self) -> None:
        with FakeHA() as ha:
            self.app.secrets.set("ha_token", ha.TOKEN)
            self.app.settings.update({"ha": {"url": ha.url + "/api"}, "calendar": {"default": "ha:calendar.family", "ha_calendars": ["calendar.family"]}})
            ha.calendars["calendar.family"] = [{"uid": "u1", "summary": "Родительское собрание", "start": {"dateTime": "2026-09-29T17:00:00+03:00"},
                                                "end": {"dateTime": "2026-09-29T18:00:00+03:00"}}]
            self.assertIn("Родительское собрание", self.say("что у меня завтра по календарю")["reply"])
            self.assertEqual(self.say("Добавь в календарь стрижку на пятницу в 15:00")["status"], "applied")
            domain, service, data = ha.calls[-1]
            self.assertEqual((domain, service, data["entity_id"]), ("calendar", "create_event", "calendar.family"))
            self.assertEqual(data["summary"], "Стрижка")


class Reminders(AppCase):
    def test_time_reminder_fires_once_and_is_visible_until_acknowledged(self) -> None:
        r = self.say("Напомни через 20 минут выключить духовку")
        self.assertEqual(r["status"], "applied", r)
        sched = Scheduler(self.app, interval=1)
        self.assertEqual(sched.tick()["reminders"], 0)
        self.clock.advance(minutes=21)
        self.assertEqual(sched.tick()["reminders"], 1)
        self.assertEqual(sched.tick()["reminders"], 0)                                           # fires once
        reminder = self.app.reminders.list(states=["fired"])[0]
        self.assertEqual(reminder["text"], "Выключить духовку")
        events = [e for e in self.app.db.wait_for_changes(0, 0)[1] if e["topic"] == "notification"]
        self.assertEqual(events[0]["payload"]["text"], "Выключить духовку")                       # the kiosk/UI gets a live notification
        self.app.reminders.complete(UI, reminder["id"])
        self.assertEqual(self.app.reminders.list(), [])

    def test_recurring_reminders_reschedule_and_missed_ones_fire_once_after_downtime(self) -> None:
        self.say("Напомни каждый понедельник в 8:00 вынести мусор")
        reminder = self.app.reminders.list()[0]
        self.assertEqual(reminder["due_at"], "2026-10-05T05:00:00Z")
        self.clock.advance(days=20)                                                              # the box was off for three weeks
        sched = Scheduler(self.app, interval=1)
        self.assertEqual(sched.tick()["reminders"], 1)                                            # once, not three times
        after = self.app.reminders.get(reminder["id"])
        self.assertEqual(after["state"], "pending")
        self.assertEqual(after["due_at"], "2026-10-19T05:00:00Z")

    def test_snooze_and_delete(self) -> None:
        self.say("Напомни через час позвонить маме")
        rid = self.app.reminders.list()[0]["id"]
        self.app.reminders.snooze(UI, rid, 30)
        self.assertEqual(self.app.reminders.get(rid)["due_at"], "2026-09-28T07:30:00Z")
        self.app.reminders.delete(UI, rid)
        self.assertEqual(self.app.reminders.list(), [])

    def test_presence_reminder_fires_when_you_are_home_in_the_evening(self) -> None:
        with FakeHA() as ha:
            self.app.secrets.set("ha_token", ha.TOKEN)
            self.app.settings.update({"ha": {"url": ha.url + "/api", "person_entity": "person.anna"}})
            ha.set_state("person.anna", "not_home")
            r = self.say("Напомни поменять фильтр, когда вечером буду дома")
            self.assertEqual(r["status"], "applied", r)
            sched = Scheduler(self.app, interval=1)
            self.assertEqual(sched.tick()["triggers"], 0)                                          # away
            ha.set_state("person.anna", "home")
            self.assertEqual(sched.tick()["triggers"], 0)                                          # home, but it is 10:00, not evening
            self.clock.set(dt.datetime(2026, 9, 28, 19, 0, tzinfo=TZ))
            self.assertEqual(sched.tick()["triggers"], 1)
            self.assertEqual(self.app.reminders.list(states=["fired"])[0]["text"], "Поменять фильтр")

    def test_entering_a_room_needs_a_transition_and_a_mapped_sensor(self) -> None:
        with FakeHA() as ha:
            self.app.secrets.set("ha_token", ha.TOKEN)
            self.app.settings.update({"ha": {"url": ha.url + "/api"}})
            unmapped = self.say("Когда я зайду в мастерскую, напомни забрать штангенциркуль")
            self.assertEqual(unmapped["status"], "clarify")                                         # honest: no sensor for that place
            self.assertEqual(self.app.reminders.list(), [])
            self.app.settings.update({"places": [{"name": "мастерская", "entity_id": "binary_sensor.workshop_presence", "state": "on"}]})
            ha.set_state("binary_sensor.workshop_presence", "on")                                   # already there when asked
            self.assertEqual(self.say("Когда я зайду в мастерскую, напомни забрать штангенциркуль")["status"], "applied")
            sched = Scheduler(self.app, interval=1)
            self.assertEqual(sched.tick()["triggers"], 0)                                          # being there is not "entering"
            ha.set_state("binary_sensor.workshop_presence", "off")
            sched.tick()
            ha.set_state("binary_sensor.workshop_presence", "on")
            self.assertEqual(sched.tick()["triggers"], 1)

    def test_trigger_memory_survives_restart_so_a_transition_is_neither_missed_nor_repeated(self) -> None:
        with FakeHA() as ha:
            self.app.secrets.set("ha_token", ha.TOKEN)
            self.app.settings.update({"ha": {"url": ha.url + "/api"}, "places": [{"name": "мастерская", "entity_id": "binary_sensor.ws", "state": "on"}]})
            ha.set_state("binary_sensor.ws", "off")
            self.say("Когда я зайду в мастерскую, напомни забрать штангенциркуль")
            Scheduler(self.app, interval=1).tick()                                                  # baseline recorded: "away"
            self.restart()
            ha.set_state("binary_sensor.ws", "on")
            self.assertEqual(Scheduler(self.app, interval=1).tick()["triggers"], 1)                 # the entry that happened during the restart
            self.restart()
            self.assertEqual(Scheduler(self.app, interval=1).tick()["triggers"], 0)                 # and it does not fire again

    def test_printer_finished_message_uses_the_current_state_as_the_thing_to_wait_out(self) -> None:
        with FakeHA() as ha:
            self.app.secrets.set("ha_token", ha.TOKEN)
            self.app.settings.update({"ha": {"url": ha.url + "/api"}})
            self.app.contacts.create(UI, name="Анна", is_self=True, channels={"telegram": {"chat_id": "42"}})
            ha.set_state("sensor.printer_status", "idle", friendly_name="Принтер 3D")
            idle = self.say("Когда принтер закончит печать, отправь мне сообщение в Telegram")
            self.assertEqual(idle["status"], "clarify")                                              # idle printer: nothing to wait for
            ha.set_state("sensor.printer_status", "printing", friendly_name="Принтер 3D")
            self.assertEqual(self.say("Когда принтер закончит печать, отправь мне сообщение в Telegram")["status"], "applied")
            trigger = self.app.reminders.list()[0]["trigger"]
            self.assertEqual((trigger["entity_id"], trigger["from"]), ("sensor.printer_status", "printing"))
            with FakeTelegram() as tg:
                self.app.secrets.set("telegram_token", tg.TOKEN)
                self.app.settings.update({"telegram": {"base_url": tg.url}})
                self.build_telegram(tg)
                sched = Scheduler(self.app, interval=1)
                sched.tick()
                ha.set_state("sensor.printer_status", "idle", friendly_name="Принтер 3D")
                report = sched.tick()
                self.assertEqual(report["triggers"], 1)
                sched.tick()
                self.assertEqual([m["chat_id"] for m in tg.sent], ["42"])
                self.assertIn("Принтер", tg.sent[0]["text"])

    def build_telegram(self, tg) -> None:
        self.app.telegram.base_url = tg.url.rstrip("/")


class Messaging(AppCase):
    def setUp(self) -> None:
        super().setUp()
        self.tg = FakeTelegram()
        self.tg.__enter__()
        self.addCleanup(self.tg.__exit__)
        self.app.secrets.set("telegram_token", self.tg.TOKEN)
        self.app.telegram.base_url = self.tg.url
        self.app.contacts.create(UI, name="Ирина", aliases=["Ира"], channels={"telegram": {"chat_id": "777"}})
        self.app.contacts.create(UI, name="Анна", is_self=True, channels={"telegram": {"chat_id": "42"}})

    def test_send_to_a_contact_by_declined_name(self) -> None:
        r = self.say("Отправь Ирине в Telegram, что я задержусь минут на сорок")
        self.assertEqual(r["status"], "applied", r)
        self.assertIn("Отправлено", r["reply"])
        self.assertEqual(self.tg.sent, [{"chat_id": "777", "text": "Я задержусь минут на сорок", "disable_web_page_preview": True}])
        self.assertEqual(self.app.outbox.list()[0]["status"], "sent")
        self.assertEqual(self.app.commands.list()[0]["frontend"], "web")

    def test_unknown_recipient_and_missing_address_are_explained(self) -> None:
        r = self.say("Отправь Борису в Telegram, что я опаздываю")
        self.assertEqual(r["status"], "failed")
        self.assertIn("Не знаю контакт", r["reply"])
        self.app.contacts.create(UI, name="Борис", channels={})
        self.assertIn("нет адреса", self.say("Отправь Борису в Telegram, что я опаздываю")["reply"])
        self.assertEqual(self.tg.sent, [])

    def test_provider_outage_queues_with_backoff_and_delivers_later(self) -> None:
        self.tg.fail_next = 2
        r = self.say("Отправь Ирине в Telegram, что я задержусь")
        self.assertEqual(r["status"], "applied")
        self.assertIn("очередь", r["reply"])
        entry = self.app.outbox.list()[0]
        self.assertEqual((entry["status"], entry["attempts"]), ("queued", 1))
        sched = Scheduler(self.app, interval=1)
        sched.tick()
        self.assertEqual(self.app.outbox.list()[0]["status"], "queued")                             # backoff: not due yet
        self.clock.advance(seconds=31)
        sched.tick()
        self.assertEqual(self.app.outbox.list()[0]["attempts"], 2)
        self.clock.advance(minutes=3)
        sched.tick()
        self.assertEqual(self.app.outbox.list()[0]["status"], "sent")
        self.assertEqual(len(self.tg.sent), 1)                                                        # exactly one delivery

    def test_bad_token_fails_immediately_and_can_be_retried_after_fixing_it(self) -> None:
        self.app.secrets.set("telegram_token", "999:WRONG-TOKEN")
        self.say("Отправь Ирине в Telegram, что я задержусь")
        entry = self.app.outbox.list()[0]
        self.assertEqual(entry["status"], "failed")
        self.assertNotIn("WRONG-TOKEN", entry["last_error"])                                        # secrets never leak into errors
        self.app.secrets.set("telegram_token", self.tg.TOKEN)
        self.app.outbox.retry(entry["id"])
        Scheduler(self.app, interval=1).tick()
        self.assertEqual(self.app.outbox.list()[0]["status"], "sent")

    def test_messages_survive_a_crash_between_enqueue_and_send(self) -> None:
        self.tg.fail_next = 100
        self.say("Отправь Ирине в Telegram, что я задержусь")
        with self.app.db.write() as conn:
            conn.execute("UPDATE outbox SET status = 'sending'")                                     # died mid-send
        self.restart()
        self.app.telegram.base_url = self.tg.url
        self.tg.fail_next = 0
        sched = Scheduler(self.app, interval=1)
        sched.start()                                                                                # start() re-queues `sending` rows
        sched.stop()
        self.assertEqual(self.app.outbox.list()[0]["status"], "queued")
        self.clock.advance(seconds=31)
        Scheduler(self.app, interval=1).tick()
        self.assertEqual(self.app.outbox.list()[0]["status"], "sent")

    def test_scheduler_isolates_a_failing_job(self) -> None:
        def boom() -> int:
            raise RuntimeError("job exploded")
        sched = Scheduler(self.app, interval=1)
        sched._job_triggers = boom                                                                   # type: ignore[method-assign]
        self.say("Напомни через 5 минут проверить")
        self.clock.advance(minutes=6)
        report = sched.tick()
        self.assertIn("error", report["triggers"])
        self.assertEqual(report["reminders"], 1)                                                     # the other jobs still ran

    def test_unknown_telegram_chats_become_link_requests(self) -> None:
        self.tg.updates = [{"update_id": 5, "message": {"chat": {"id": 555, "first_name": "Борис"}, "text": "/start"}}]
        Scheduler(self.app, interval=1).tick()
        requests = self.app.db.get_setting("telegram.link_requests")
        self.assertEqual((requests[0]["chat_id"], requests[0]["name"]), ("555", "Борис"))
        self.assertEqual(self.app.db.get_setting("telegram.offset"), 6)


class Speakers(AppCase):
    """The apartment speaks through Yandex Stations, driven by Home Assistant."""

    def setUp(self) -> None:
        super().setUp()
        self.ha = FakeHA()
        self.ha.__enter__()
        self.addCleanup(self.ha.__exit__)
        self.app.secrets.set("ha_token", self.ha.TOKEN)
        self.app.settings.update({
            "ha": {"url": self.ha.url + "/api"},
            "speakers": [
                {"id": "kitchen", "entity_id": "media_player.station_kitchen", "room": "кухня", "mode": "yandex_station_text", "default": True},
                {"id": "office", "entity_id": "media_player.station_office", "room": "кабинет", "mode": "tts_speak", "tts_entity": "tts.yandex"},
            ],
            "rooms": [{"name": "кабинет", "entity_id": "binary_sensor.office_presence", "state": "on"}],
            "speak": {"quiet_from": "23:00", "quiet_to": "07:00", "fallback": "ui"},
        })

    def speak(self, text: str, **target) -> dict:
        import json
        entry = self.app.delivery.send(UI, channel="speak", recipient="self", text=text, room=target.get("room"))
        return self.app.outbox.deliver_now(entry["id"])

    def test_reminders_are_spoken_on_the_station_of_the_room_you_are_in(self) -> None:
        self.app.presence.ttl = 0                                   # no presence caching in this test
        self.ha.set_state("binary_sensor.office_presence", "on")
        self.assertEqual(self.speak("Пора менять фильтр")["status"], "sent")
        domain, service, data = self.ha.calls[-1]
        self.assertEqual((domain, service), ("tts", "speak"))
        self.assertEqual((data["media_player_entity_id"], data["entity_id"], data["message"]), ("media_player.station_office", "tts.yandex", "Пора менять фильтр"))
        self.ha.set_state("binary_sensor.office_presence", "off")
        self.speak("Пора менять фильтр")
        domain, service, data = self.ha.calls[-1]
        self.assertEqual((domain, service, data["media_content_type"]), ("media_player", "play_media", "text"))   # default speaker: kitchen
        self.assertEqual(data["entity_id"], "media_player.station_kitchen")

    def test_quiet_hours_do_not_speak_and_fall_back_to_the_screen(self) -> None:
        self.clock.set(dt.datetime(2026, 9, 28, 23, 30, tzinfo=TZ))
        result = self.speak("Тихо")
        self.assertEqual(result["status"], "failed")
        self.assertEqual(self.ha.calls, [])
        self.assertIn("notification", [e["topic"] for e in self.app.db.wait_for_changes(0, 0)[1]])

    def test_speaker_offline_retries_then_falls_back(self) -> None:
        self.ha.fail_services = True
        result = self.speak("Проверка")
        self.assertEqual(result["status"], "queued")
        self.assertEqual(result["attempts"], 1)

    def test_reminder_spoken_by_default_when_speakers_exist(self) -> None:
        r = self.say("Напомни через 5 минут проверить пирог")
        self.assertIn("голосом", r["reply"])
        self.clock.advance(minutes=6)
        Scheduler(self.app, interval=1).tick()
        self.assertEqual(self.ha.calls[-1][2]["media_content_id"], "Проверить пирог")


class HomeAssistantControl(AppCase):
    def setUp(self) -> None:
        super().setUp()
        self.ha = FakeHA()
        self.ha.__enter__()
        self.addCleanup(self.ha.__exit__)
        self.app.secrets.set("ha_token", self.ha.TOKEN)
        self.app.settings.update({"ha": {"url": self.ha.url + "/api"}})
        self.ha.set_state("light.kitchen", "off", friendly_name="Свет на кухне")
        self.ha.set_state("light.bedroom", "off", friendly_name="Свет в спальне")
        self.ha.set_state("lock.front_door", "locked", friendly_name="Входная дверь")
        self.ha.set_state("sensor.bedroom_temperature", "22.5", friendly_name="Температура в спальне", unit_of_measurement="°C")

    def test_control_query_and_ambiguity(self) -> None:
        r = self.say("включи свет на кухне")
        self.assertEqual(r["status"], "applied", r)
        self.assertEqual(self.ha.calls[-1], ("light", "turn_on", {"entity_id": "light.kitchen"}))
        self.assertIn("22.5", self.say("какая температура в спальне")["reply"])
        vague = self.say("включи свет")
        self.assertEqual(vague["status"], "clarify")
        self.assertEqual(len(self.ha.calls), 1)                                                     # nothing was switched on a guess

    def test_dangerous_services_are_never_called(self) -> None:
        r = self.say("открой входную дверь")
        self.assertNotEqual(r["status"], "applied")
        self.assertEqual([c for c in self.ha.calls if c[0] == "lock"], [])
        from domovoy.errors import ForbiddenError
        with self.assertRaises(ForbiddenError):
            self.app.ha.call_service("lock", "unlock", {"entity_id": "lock.front_door"})
        with self.assertRaises(ForbiddenError):
            self.app.ha.call_service("homeassistant", "restart", {})
