"""Restarts, concurrency and provider failures must never corrupt or lose data."""
from __future__ import annotations

import os
import sqlite3
import stat
import threading

from ..helpers import ADDON_DIR  # noqa: F401
from domovoy.backup import create_backup
from domovoy.db import Database
from domovoy.errors import ProviderError
from domovoy.providers.base import CircuitBreaker, HealthTracker, ResourceGate
from domovoy.providers.llm import OpenAICompatibleProvider, extract_json_object
from domovoy.secret_store import SecretsStore
from domovoy.services.context import Ctx
from .base import AppCase
from .fakes import FakeHA, FakeLLM

UI = Ctx(source="test")


class Storage(AppCase):
    def test_migrations_are_idempotent_across_restarts(self) -> None:
        self.restart()
        self.restart()
        with self.app.db.read() as conn:
            self.assertEqual(conn.execute("SELECT COUNT(*) FROM schema_migrations").fetchone()[0], 1)
            self.assertEqual(conn.execute("PRAGMA integrity_check").fetchone()[0], "ok")
            self.assertEqual(conn.execute("PRAGMA foreign_keys").fetchone()[0], 1)

    def test_a_failure_inside_a_write_rolls_back_entity_audit_and_events_together(self) -> None:
        before = self.app.db.latest_seq
        original = self.app.search.reindex

        def broken(*_a, **_k):
            raise RuntimeError("index exploded")

        self.app.search.reindex = broken                                                   # type: ignore[method-assign]
        with self.assertRaises(RuntimeError):
            self.app.items.create(UI, name="винт", quantity=3)
        self.app.search.reindex = original                                                 # type: ignore[method-assign]
        self.assertEqual(self.app.items.list(), [])
        self.assertEqual(self.app.audit.list(), [])
        self.assertEqual(self.app.db.latest_seq, before)

    def test_concurrent_writers_do_not_lose_updates_or_deadlock(self) -> None:
        errors: list[Exception] = []

        def worker(n: int) -> None:
            try:
                for i in range(15):
                    self.app.items.create(UI, name=f"деталь {n}-{i}", quantity=1)
                    self.app.notes.create(UI, body=f"заметка {n}-{i}")
            except Exception as exc:  # noqa: BLE001
                errors.append(exc)

        threads = [threading.Thread(target=worker, args=(n,)) for n in range(6)]
        for t in threads:
            t.start()
        for t in threads:
            t.join(60)
        self.assertEqual(errors, [])
        self.assertEqual(len(self.app.items.list(limit=1000)), 90)
        self.assertEqual(len(self.app.notes.list(limit=1000)), 90)
        self.assertEqual(len(self.app.audit.list(limit=500)), 180)

    def test_backup_is_a_consistent_openable_database(self) -> None:
        self.say("запомни девять резисторов лежат в коробке")
        path = create_backup(self.app)
        with sqlite3.connect(path) as conn:
            self.assertEqual(conn.execute("SELECT COUNT(*) FROM items").fetchone()[0], 1)
            self.assertEqual(conn.execute("PRAGMA integrity_check").fetchone()[0], "ok")

    def test_secrets_file_is_private_and_survives_garbage(self) -> None:
        self.app.secrets.set("telegram_token", "abc:def")
        mode = stat.S_IMODE(os.stat(self.app.env.secrets_path).st_mode)
        self.assertEqual(mode, 0o600)
        self.app.env.secrets_path.write_text("{corrupt", encoding="utf-8")
        fresh = SecretsStore(self.app.env.secrets_path)                                     # regenerates instead of crashing
        self.assertTrue(fresh.get("api_token"))
        self.assertFalse(fresh.has("telegram_token"))

    def test_realtime_cursor_is_monotonic_across_restart(self) -> None:
        self.say("запомни: заметка один")
        cursor = self.app.db.latest_seq
        self.restart()
        self.assertEqual(self.app.db.latest_seq, cursor)
        self.say("запомни: заметка два")
        self.assertGreater(self.app.db.latest_seq, cursor)
        self.assertFalse(self.app.db.wait_for_changes(cursor, 0)[2])

    def test_deleting_data_is_soft_and_recoverable(self) -> None:
        item, _ = self.app.items.create(UI, name="винт", quantity=3)
        self.app.items.delete(UI, item["id"])
        self.assertEqual(self.app.items.list(), [])
        with self.app.db.read() as conn:
            self.assertIsNotNone(conn.execute("SELECT deleted_at FROM items WHERE id = ?", (item["id"],)).fetchone()["deleted_at"])
        self.app.audit.undo(self.app.audit.list(entity_type="item")[0]["id"], UI)
        self.assertEqual(self.app.items.get(item["id"])["name"], "винт")


class ProviderResilience(AppCase):
    def test_model_client_breaks_the_circuit_after_repeated_failures_and_recovers(self) -> None:
        with FakeLLM() as llm:
            now = [0.0]
            provider = OpenAICompatibleProvider(lambda: {"base_url": llm.url + "/v1", "enabled": True}, lambda: "",
                                                HealthTracker("llm", self.clock), CircuitBreaker(3, 30, now=lambda: now[0]), timeout=2)
            llm.fail_status = 500
            for _ in range(3):
                with self.assertRaises(ProviderError):
                    provider.chat_json("s", "u", {})
            calls = len(llm.requests)
            with self.assertRaises(ProviderError) as blocked:
                provider.chat_json("s", "u", {})
            self.assertEqual(blocked.exception.code, "circuit_open")
            self.assertEqual(len(llm.requests), calls)                                       # no network call while open
            now[0] = 31
            llm.fail_status = 0
            llm.reply = {"ok": True}
            self.assertEqual(provider.chat_json("s", "u", {}), {"ok": True})
            self.assertFalse(provider.breaker.open)
            self.assertEqual(provider.health.health.status, "ok")

    def test_heavy_jobs_share_one_slot_and_fail_fast(self) -> None:
        gate = ResourceGate(1)
        with FakeLLM() as llm:
            provider = OpenAICompatibleProvider(lambda: {"base_url": llm.url + "/v1"}, lambda: "", HealthTracker("llm", self.clock), gate=gate, timeout=2)
            self.assertTrue(gate.acquire())
            try:
                with self.assertRaises(ProviderError) as busy:
                    provider.chat_json("s", "u", {}, deadline=1.0)
                self.assertEqual(busy.exception.code, "busy")
            finally:
                gate.release()

    def test_model_output_parsing_is_tolerant_but_strict_about_shape(self) -> None:
        self.assertEqual(extract_json_object('Вот ответ:\n```json\n{"intents": []}\n```'), {"intents": []})
        self.assertEqual(extract_json_object('текст {"a": 1} хвост'), {"a": 1})
        for bad in ("совсем не json", "[1, 2]", "", None):
            with self.assertRaises(ProviderError):
                extract_json_object(bad)

    def test_home_assistant_outage_is_isolated_from_the_rest(self) -> None:
        with FakeHA() as ha:
            self.app.secrets.set("ha_token", "wrong-token")
            self.app.settings.update({"ha": {"url": ha.url + "/api"}})
            self.assertEqual(self.say("запомни девять резисторов лежат в коробке")["status"], "applied")   # memory does not need HA
            failed = self.say("включи свет на кухне")
            self.assertEqual(failed["status"], "failed")
            self.assertIn("недоступен", failed["reply"])
            self.assertEqual(self.app.health["home_assistant"].health.status, "degraded")
            self.assertNotIn("wrong-token", failed["reply"])

    def test_entity_search_matches_spoken_names(self) -> None:
        with FakeHA() as ha:
            self.app.secrets.set("ha_token", ha.TOKEN)
            self.app.settings.update({"ha": {"url": ha.url + "/api"}})
            ha.set_state("light.kitchen", "off", friendly_name="Свет на кухне")
            ha.set_state("sensor.printer_status", "printing", friendly_name="Принтер 3D")
            self.assertEqual(self.app.ha.search_entities("свет на кухне")[0]["entity_id"], "light.kitchen")
            self.assertEqual(self.app.ha.search_entities("принтер")[0]["entity_id"], "sensor.printer_status")
            self.assertEqual(self.app.ha.search_entities("холодильник"), [])
