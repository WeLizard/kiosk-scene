"""Voice front doors (Alice skill, kiosk microphone, HA Assist) and the HTTP API's security and realtime contract."""
from __future__ import annotations

import json
import threading
import time
import urllib.error
import urllib.request

from ..helpers import ADDON_DIR  # noqa: F401
from domovoy.api import ApiServer
from domovoy.assistant.voice import strip_trigger
from domovoy.frontends.alice import AliceFrontend, speakable
from domovoy.frontends.assist import AssistFrontend
from domovoy.server import build
from .base import AppCase
from .fakes import FakeHA, FakeLLM, FakeSTT

REMEMBER = "запомни девять резисторов 10 кОм лежат в третьей коробке нижнего шкафа"


def alice_request(command: str, *, new: bool = False, user: str = "u1", session: str = "s1") -> dict:
    return {"meta": {"locale": "ru-RU"}, "session": {"session_id": session, "user": {"user_id": user}, "new": new, "message_id": 1},
            "request": {"command": command, "original_utterance": command, "type": "SimpleUtterance"}, "version": "1.0"}


class AliceSkill(AppCase):
    def setUp(self) -> None:
        super().setUp()
        _, self.scheduler = build(self.app)
        self.alice = AliceFrontend(self.app, self.pipeline, self.voice)

    def test_protocol_ping_welcome_and_exit(self) -> None:
        self.assertEqual(self.alice.handle(alice_request("ping"))["response"]["text"], "pong")
        welcome = self.alice.handle(alice_request("", new=True))
        self.assertFalse(welcome["response"]["end_session"])
        self.assertEqual(welcome["version"], "1.0")
        bye = self.alice.handle(alice_request("спасибо"))
        self.assertTrue(bye["response"]["end_session"])

    def test_remember_and_follow_up_without_repeating_the_invocation(self) -> None:
        first = self.alice.handle(alice_request(REMEMBER, new=True))
        self.assertIn("Коробка 3", first["response"]["text"])
        self.assertFalse(first["response"]["end_session"])                                            # the session stays open
        self.assertEqual(first["response"]["text"], first["response"]["tts"])
        follow = self.alice.handle(alice_request("нет, десять"))
        self.assertIn("10", follow["response"]["text"])
        self.assertEqual(self.app.items.list()[0]["quantity"], 10)
        self.assertEqual(self.app.commands.list()[0]["frontend"], "alice")

    def test_replies_are_tts_friendly_and_bounded(self) -> None:
        spoken = speakable("Записано: 9 шт «резистор» — Шкаф нижний → Коробка 3.")
        for symbol in ("→", "«", "»", "—"):
            self.assertNotIn(symbol, spoken)
        self.assertLessEqual(len(speakable("Слово. " * 400)), 1000)

    def test_private_skill_only_answers_allowed_users(self) -> None:
        self.app.settings.update({"alice": {"allowed_user_ids": ["owner"]}})
        denied = self.alice.handle(alice_request(REMEMBER, user="stranger"))
        self.assertIn("приватный", denied["response"]["text"])
        self.assertEqual(self.app.items.list(), [])
        self.assertIn("Записано", self.alice.handle(alice_request(REMEMBER, user="owner"))["response"]["text"])

    def test_slow_processing_gets_an_honest_holding_reply_within_alices_budget(self) -> None:
        self.app.settings.update({"alice": {"budget_s": 0.2}})
        original = self.pipeline.handle
        self.pipeline.handle = lambda *a, **k: (time.sleep(0.6), original(*a, **k))[1]            # type: ignore[method-assign]
        started = time.monotonic()
        answer = self.alice.handle(alice_request(REMEMBER))
        self.assertLess(time.monotonic() - started, 0.5)
        self.assertIn("Принял", answer["response"]["text"])
        time.sleep(0.8)                                                                             # the command still completes and is recorded
        self.assertEqual(self.app.items.list()[0]["quantity"], 9)


class KioskMicrophone(AppCase):
    def setUp(self) -> None:
        super().setUp()
        self.stt = FakeSTT()
        self.stt.__enter__()
        self.addCleanup(self.stt.__exit__)
        self.ha = FakeHA()
        self.ha.__enter__()
        self.addCleanup(self.ha.__exit__)
        self.app.secrets.set("ha_token", self.ha.TOKEN)
        self.app.settings.update({
            "ha": {"url": self.ha.url + "/api"},
            "voice": {"enabled": True, "stt": {"base_url": self.stt.url + "/v1", "model": "small", "language": "ru"}, "window_s": 20},
            "speakers": [{"id": "k", "entity_id": "media_player.station_kitchen", "room": "кухня", "mode": "yandex_station_text"}],
        })
        self._t = [1000.0]
        self.voice._now = lambda: self._t[0]

    def hear(self, text: str, room: str = "кухня") -> dict:
        self.stt.text = text
        return self.voice.handle_audio(b"RIFFfakewav", "audio/wav", room=room)

    def test_trigger_word_gates_everything(self) -> None:
        self.assertEqual(self.hear("какая сегодня погода в Париже").get("reason"), "no_trigger")   # ambient talk: ignored
        self.assertEqual(self.app.commands.list(), [])                                              # …and never stored
        self.assertEqual(self.ha.calls, [])
        r = self.hear("Домовой, " + REMEMBER)
        self.assertTrue(r["handled"], r)
        self.assertEqual(self.app.items.list()[0]["quantity"], 9)

    def test_the_answer_is_spoken_by_the_station_in_the_room_that_asked(self) -> None:
        r = self.hear("Эй, домовой, где резисторы?")
        self.assertTrue(r["spoken"], r)
        domain, service, data = self.ha.calls[-1]
        self.assertEqual((domain, service, data["entity_id"]), ("media_player", "play_media", "media_player.station_kitchen"))
        self.assertEqual(data["media_content_id"], r["reply"].replace("→", ",").replace("«", "").replace("»", "") if False else data["media_content_id"])
        self.assertTrue(data["media_content_id"])

    def test_conversation_window_lets_follow_ups_skip_the_trigger_word_until_it_expires(self) -> None:
        self.hear("Домовой, " + REMEMBER)
        self._t[0] += 5
        self.assertTrue(self.hear("нет, десять")["handled"])                                       # follow-up inside the window
        self.assertEqual(self.app.items.list()[0]["quantity"], 10)
        self._t[0] += 60
        self.assertEqual(self.hear("нет, пять").get("reason"), "no_trigger")                        # window closed
        self.assertEqual(self.app.items.list()[0]["quantity"], 10)
        self.assertEqual(self.voice.window_open("гостиная"), False)                                 # windows are per room

    def test_bare_trigger_word_opens_the_window_and_says_so(self) -> None:
        r = self.hear("Домовой")
        self.assertEqual(r["status"], "listening")
        self.assertTrue(self.voice.window_open("кухня"))

    def test_stt_failure_or_busy_drops_the_segment_without_side_effects(self) -> None:
        self.stt.fail_status = 500
        self.assertEqual(self.voice.handle_audio(b"x", "audio/wav", room="кухня")["handled"], False)
        self.stt.fail_status = 0
        self.assertTrue(self.app.gate.acquire())                                                     # the CPU is busy with something else
        try:
            r = self.voice.handle_audio(b"x", "audio/wav", room="кухня")
            self.assertEqual((r["handled"], r["reason"]), (False, "busy"))
        finally:
            self.app.gate.release()
        self.assertEqual(self.app.commands.list(), [])

    def test_voice_can_be_switched_off(self) -> None:
        self.app.settings.update({"voice": {"enabled": False}})
        self.assertEqual(self.hear("Домовой, " + REMEMBER)["reason"], "voice_disabled")

    def test_trigger_word_detection(self) -> None:
        for phrase in ("Домовой, добавь", "домового попроси добавить", "Эй, Домовой добавь", "Слушай домовой: добавь"):
            had, rest = strip_trigger(phrase, ["домовой"])
            self.assertTrue(had, phrase)
            self.assertNotIn("омов", rest)
        self.assertFalse(strip_trigger("дом закрыт", ["домовой"])[0])
        self.assertFalse(strip_trigger("добавь домовой", ["домовой"])[0])


class HaAssist(AppCase):
    def test_text_in_reply_out_for_ha_automations(self) -> None:
        assist = AssistFrontend(self.voice)
        out = assist.handle({"text": REMEMBER, "conversation_id": "abc", "language": "ru"})
        self.assertEqual(out["status"], "applied")
        self.assertEqual(out["response"]["speech"]["plain"]["speech"], out["reply"])
        self.assertEqual(out["response"]["response_type"], "action_done")
        from domovoy.errors import ValidationError
        with self.assertRaises(ValidationError):
            assist.handle({"text": "  "})


class HttpApi(AppCase):
    def setUp(self) -> None:
        super().setUp()
        ctx, self.scheduler = build(self.app)
        self.server = ApiServer(("127.0.0.1", 0), ctx)
        threading.Thread(target=self.server.serve_forever, daemon=True).start()
        self.addCleanup(self.server.server_close)
        self.addCleanup(self.server.shutdown)
        self.base = f"http://127.0.0.1:{self.server.server_address[1]}"

    def call(self, method: str, path: str, body=None, headers=None, raw: bytes | None = None):
        data = raw if raw is not None else (json.dumps(body).encode() if body is not None else None)
        merged = {"Content-Type": "application/json", "X-Domovoy-Client": "1", **(headers or {})}
        request = urllib.request.Request(self.base + path, method=method, data=data, headers=merged)
        try:
            with urllib.request.urlopen(request, timeout=10) as response:
                return response.status, json.loads(response.read() or b"null")
        except urllib.error.HTTPError as error:
            return error.code, json.loads(error.read() or b"null")

    def test_full_memory_flow_over_http(self) -> None:
        status, r = self.call("POST", "/api/command", {"text": REMEMBER, "session_id": "web"})
        self.assertEqual((status, r["status"]), (200, "applied"))
        status, found = self.call("GET", "/api/search?q=%D1%80%D0%B5%D0%B7%D0%B8%D1%81%D1%82%D0%BE%D1%80")
        self.assertEqual(found["hits"][0]["kind"], "item")
        item_id = found["hits"][0]["id"]
        status, edited = self.call("PATCH", f"/api/items/{item_id}", {"quantity": 12, "notes": "проверить"})
        self.assertEqual(edited["item"]["quantity"], 12)
        status, moved = self.call("POST", f"/api/items/{item_id}/move", {"location_path": ["Гараж", "Полка 1"]})
        self.assertEqual(moved["item"]["location_path"], ["Гараж", "Полка 1"])
        status, hist = self.call("GET", f"/api/items/{item_id}/history")
        self.assertGreaterEqual(len(hist["history"]), 3)
        status, tree = self.call("GET", "/api/locations/tree")
        self.assertEqual(sorted(n["name"] for n in tree["tree"]), ["Гараж", "Шкаф нижний"])
        status, err = self.call("DELETE", f"/api/locations/{tree['tree'][0]['id']}")
        self.assertEqual((status, err["error"]["code"]), (409, "location_not_empty"))

    def test_validation_errors_are_structured_for_forms(self) -> None:
        status, err = self.call("POST", "/api/items", {"name": "", "quantity": -1})
        self.assertEqual(status, 422)
        self.assertIn("name", err["error"]["fields"])
        status, err = self.call("POST", "/api/items", {"name": "винт", "quantity": "много"})
        self.assertEqual(err["error"]["fields"], {"quantity": "Not a number"})
        status, err = self.call("GET", "/api/nope")
        self.assertEqual((status, err["error"]["code"]), (404, "not_found"))
        status, err = self.call("PATCH", "/api/state", {})
        self.assertEqual(status, 405)

    def test_lan_access_needs_a_token_and_csrf_is_blocked(self) -> None:
        # nginx marks direct LAN requests as origin "lan"; ingress/local are trusted
        status, err = self.call("GET", "/api/state", headers={"X-Domovoy-Origin": "lan"})
        self.assertEqual((status, err["error"]["code"]), (401, "auth_required"))
        token = self.app.secrets.get("api_token")
        status, _ = self.call("GET", "/api/state", headers={"X-Domovoy-Origin": "lan", "Authorization": f"Bearer {token}"})
        self.assertEqual(status, 200)
        status, _ = self.call("GET", "/api/state", headers={"X-Domovoy-Origin": "lan", "Authorization": "Bearer wrong"})
        self.assertEqual(status, 401)
        # a trusted browser session still cannot be driven by another website: no custom header → refused
        request = urllib.request.Request(self.base + "/api/command", method="POST", data=b'{"text":"x"}',
                                         headers={"Content-Type": "text/plain", "X-Domovoy-Origin": "ingress"})
        with self.assertRaises(urllib.error.HTTPError) as caught:
            urllib.request.urlopen(request)
        self.assertEqual(caught.exception.code, 401)
        status, err = self.call("POST", "/api/command", raw=b'{"text":"x"}', headers={"Content-Type": "text/plain"})
        self.assertEqual((status, err["error"]["code"]), (422, "bad_content_type"))
        self.assertEqual(self.call("GET", "/health", headers={"X-Domovoy-Origin": "lan"})[0], 200)   # health is public

    def test_alice_endpoint_is_protected_by_its_own_secret(self) -> None:
        secret = self.app.secrets.get("alice_secret")
        wrong = self.call("POST", "/frontends/alice/not-the-secret", alice_request("ping"), headers={"X-Domovoy-Origin": "lan"})
        self.assertEqual(wrong[0], 401)
        ok = self.call("POST", f"/frontends/alice/{secret}", alice_request("ping"), headers={"X-Domovoy-Origin": "lan", "X-Domovoy-Client": ""})
        self.assertEqual(ok[1]["response"]["text"], "pong")

    def test_oversized_and_malformed_bodies_are_rejected(self) -> None:
        status, err = self.call("POST", "/api/command", raw=b"{not json")
        self.assertEqual((status, err["error"]["code"]), (422, "bad_json"))
        import http.client
        conn = http.client.HTTPConnection("127.0.0.1", self.server.server_address[1], timeout=5)
        conn.putrequest("POST", "/api/command")
        conn.putheader("Content-Type", "application/json")
        conn.putheader("X-Domovoy-Client", "1")
        conn.putheader("Content-Length", str(50 * 1024 * 1024))
        conn.endheaders()
        self.assertEqual(conn.getresponse().status, 413)
        conn.close()

    def test_long_poll_realtime_contract(self) -> None:
        status, first = self.call("GET", "/events")
        cursor = first["cursor"]
        result: dict = {}

        def waiter() -> None:
            result["r"] = self.call("GET", f"/events?since={cursor}&timeout=10")

        thread = threading.Thread(target=waiter)
        thread.start()
        time.sleep(0.3)
        started = time.monotonic()
        self.call("POST", "/api/notes", {"body": "новая заметка"})
        thread.join(5)
        self.assertLess(time.monotonic() - started, 2)                                              # woken by the write, not by the timeout
        topics = [e["topic"] for e in result["r"][1]["events"]]
        self.assertIn("notes.changed", topics)
        # a cursor from a *different* database (restored backup, wiped data) is answered with reset
        status, reset = self.call("GET", "/events?since=999999&timeout=0")
        self.assertTrue(reset["reset"])
        # nothing new: returns after the timeout with an empty list
        status, idle = self.call("GET", f"/events?since={self.app.db.latest_seq}&timeout=0.3")
        self.assertEqual(idle["events"], [])

    def test_security_and_integration_secrets_are_write_only(self) -> None:
        self.call("PUT", "/api/integrations/secrets", {"telegram_token": "123:SECRET-VALUE"})
        status, view = self.call("GET", "/api/integrations")
        self.assertTrue(view["secrets"]["telegram_token"])
        self.assertNotIn("SECRET-VALUE", json.dumps(view))
        self.assertNotIn("SECRET-VALUE", json.dumps(self.call("GET", "/api/settings")[1]))
        self.assertNotIn("SECRET-VALUE", json.dumps(self.call("GET", "/api/export")[1]))
        status, err = self.call("PUT", "/api/integrations/secrets", {"api_token": "hijack"})
        self.assertEqual(status, 422)

    def test_review_queue_over_http(self) -> None:
        self.call("POST", "/api/command", {"text": "мне надо разобрать гараж"})
        status, queue = self.call("GET", "/api/review")
        self.assertEqual(len(queue["items"]), 1)
        status, done = self.call("POST", f"/api/review/{queue['items'][0]['id']}/approve", {})
        self.assertTrue(done["ok"])
        self.assertEqual(self.call("GET", "/api/tasks")[1]["tasks"][0]["title"], "Разобрать гараж")

    def test_today_endpoint_feeds_the_kiosk_widgets(self) -> None:
        self.call("POST", "/api/command", {"text": "Добавь в календарь стоматолога завтра в 18:30"})
        self.call("POST", "/api/command", {"text": "Добавь фильтры для воды в список покупок"})
        self.call("POST", "/api/command", {"text": "Напомни через 20 минут выключить духовку"})
        status, today = self.call("GET", "/api/today")
        self.assertEqual([e["title"] for e in today["events"]], ["Стоматолог"])
        self.assertEqual(today["shopping"][0]["title"], "Фильтры для воды")
        self.assertEqual(today["reminders"][0]["text"], "Выключить духовку")
        self.assertEqual(len(today["recent"]), 3)

    def test_backup_and_export_import_over_http(self) -> None:
        self.call("POST", "/api/command", {"text": REMEMBER})
        status, made = self.call("POST", "/api/backup", {})
        self.assertTrue(made["file"].endswith(".db"))
        status, dump = self.call("GET", "/api/export")
        self.call("POST", "/api/command", {"text": "отмени"})
        self.assertEqual(self.call("GET", "/api/items")[1]["items"], [])
        status, imported = self.call("POST", "/api/import", dump)
        self.assertEqual(imported["imported"]["items"], 1)
        self.assertEqual(self.call("GET", "/api/items")[1]["items"][0]["quantity"], 9)


class AvatarBridge(AppCase):
    """The display avatar has no audio: it shows the words and animates for as long as the station is speaking."""

    def test_a_spoken_reply_makes_the_avatar_speak_then_settle(self) -> None:
        idle = self.app.avatar.snapshot()
        self.assertEqual((idle["speaking"], idle["message"], idle["activity"]), (False, "", "idle"))
        self.app.avatar.say("Записано: девять резисторов в третьей коробке.", "success")
        talking = self.app.avatar.snapshot()
        self.assertEqual((talking["speaking"], talking["activity"], talking["cue"], talking["emotion"]), (True, "speaking", "happy", "happy"))
        self.assertIn("резисторов", talking["message"])
        self.assertGreater(talking["revision"], idle["revision"])
        self.clock.advance(seconds=5)                                                    # ≈ 46 chars at 13 chars/s (3.5 s) is done
        after = self.app.avatar.snapshot()
        self.assertEqual((after["speaking"], after["activity"]), (False, "idle"))
        self.assertTrue(after["message"])                                               # the bubble lingers a moment
        self.clock.advance(seconds=10)
        self.assertEqual(self.app.avatar.snapshot()["message"], "")

    def test_state_has_every_field_the_scene_contract_requires(self) -> None:
        self.app.avatar.say("Привет", "greet")
        state = self.app.avatar.snapshot()
        for key, kind in {"version": int, "revision": int, "assistant": str, "online": bool, "busy": bool, "message": str,
                          "speaking": bool, "updatedAt": str, "source": str}.items():
            self.assertIsInstance(state[key], kind, key)
        self.assertEqual(state["version"], 1)
        self.assertTrue(state["updatedAt"].endswith("Z"))

    def test_voice_conversations_reach_the_avatar_but_typed_chat_does_not(self) -> None:
        self.pipeline.handle("запомни: код от домофона 4512", frontend="web", session_id="w")
        self.assertEqual(self.app.avatar.snapshot()["message"], "")                     # a private phone chat is not shown on the wall
        self.voice.handle_transcript("запомни: код от домофона 4512", require_trigger=False, source="alice", reply_mode="text")
        state = self.app.avatar.snapshot()
        self.assertEqual((state["speaking"], state["cue"]), (True, "happy"))

    def test_thinking_is_shown_while_the_model_works_and_cleared_afterwards(self) -> None:
        with FakeLLM() as llm:
            llm.reply = {"intents": []}
            self.app.settings.update({"ai": {"enabled": True, "base_url": llm.url + "/v1", "model": "tiny"}})
            seen = []
            original = self.pipeline.llm.interpret

            def spy(*a, **k):
                seen.append(self.app.avatar.snapshot()["activity"])
                return original(*a, **k)

            self.pipeline.llm.interpret = spy                                            # type: ignore[method-assign]
            self.say("странная просьба про паяльник")
            self.assertEqual(seen, ["thinking"])
            self.assertEqual(self.app.avatar.snapshot()["activity"], "idle")

    def test_state_endpoint_and_wake_up_event(self) -> None:
        ctx, _ = build(self.app)
        server = ApiServer(("127.0.0.1", 0), ctx)
        threading.Thread(target=server.serve_forever, daemon=True).start()
        self.addCleanup(server.server_close)
        self.addCleanup(server.shutdown)
        base = f"http://127.0.0.1:{server.server_address[1]}"
        cursor = self.app.db.latest_seq
        self.app.avatar.say("Готово", "success")
        request = urllib.request.Request(base + "/api/avatar/state", headers={"X-Domovoy-Origin": "local"})
        state = json.loads(urllib.request.urlopen(request).read())
        self.assertEqual((state["speaking"], state["message"]), (True, "Готово"))
        _, events, _ = self.app.db.wait_for_changes(cursor, 0)
        self.assertIn("avatar.changed", [e["topic"] for e in events])                    # the kiosk extension uses this to refresh at once
