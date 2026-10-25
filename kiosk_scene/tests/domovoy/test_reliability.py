"""Restarts, concurrency and provider failures must never corrupt or lose data."""
from __future__ import annotations

import datetime as dt
import json
import os
import sqlite3
import stat
import threading
import time
import unittest
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from unittest import mock

from ..helpers import ADDON_DIR  # noqa: F401
from domovoy.backup import create_backup, export_data, import_data
from domovoy.db import Database
from domovoy.errors import ProviderError
from domovoy.providers.base import CircuitBreaker, HealthTracker, ResourceGate
from domovoy.providers.llm import OpenAICompatibleProvider, extract_json_object
from domovoy.secret_store import SecretsStore
from domovoy.services.context import Ctx
from .base import AppCase, TZ
from .fakes import FakeHA, FakeLLM

UI = Ctx(source="test")


class Storage(AppCase):
    def test_migrations_are_idempotent_across_restarts(self) -> None:
        self.restart()
        self.restart()
        with self.app.db.read() as conn:
            from domovoy.db import MIGRATIONS
            self.assertEqual(conn.execute("SELECT COUNT(*) FROM schema_migrations").fetchone()[0], len(MIGRATIONS))
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

    @unittest.skipIf(os.name == "nt", "Windows keeps the SQLite file open during cleanup")
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
        conn = sqlite3.connect(path)
        try:
            self.assertEqual(conn.execute("SELECT COUNT(*) FROM items").fetchone()[0], 1)
            self.assertEqual(conn.execute("PRAGMA integrity_check").fetchone()[0], "ok")
        finally:
            conn.close()

    @unittest.skipIf(os.name == "nt", "POSIX file modes are not represented on Windows")
    def test_secrets_file_is_private_and_survives_garbage(self) -> None:
        self.app.secrets.set("telegram_token", "abc:def")
        mode = stat.S_IMODE(os.stat(self.app.env.secrets_path).st_mode)
        self.assertEqual(mode, 0o600)
        self.app.env.secrets_path.write_text("{corrupt", encoding="utf-8")
        fresh = SecretsStore(self.app.env.secrets_path)                                     # regenerates instead of crashing
        self.assertTrue(fresh.get("api_token"))
        self.assertFalse(fresh.has("telegram_token"))
        self.assertTrue(self.app.env.secrets_path.with_name(self.app.env.secrets_path.name + ".corrupt").exists())

    def test_secret_store_does_not_overwrite_on_a_transient_read_error(self) -> None:
        with mock.patch.object(Path, "read_text", side_effect=PermissionError("denied")):
            with self.assertRaises(PermissionError):
                SecretsStore(self.app.env.secrets_path)

    def test_concurrent_backups_get_distinct_files(self) -> None:
        paths: list[Path] = []
        errors: list[Exception] = []

        def worker() -> None:
            try:
                paths.append(create_backup(self.app))
            except Exception as exc:  # noqa: BLE001
                errors.append(exc)

        threads = [threading.Thread(target=worker) for _ in range(2)]
        [thread.start() for thread in threads]
        [thread.join() for thread in threads]

        self.assertEqual(errors, [])
        self.assertEqual(len(paths), 2)
        self.assertEqual(len({path.name for path in paths}), 2)
        for path in paths:
            conn = sqlite3.connect(path)
            try:
                self.assertEqual(conn.execute("PRAGMA integrity_check").fetchone()[0], "ok")
            finally:
                conn.close()

    def test_import_requeues_messages_that_were_mid_send(self) -> None:
        with self.app.db.write() as conn:
            conn.execute(
                "INSERT INTO outbox(channel, recipient, text, status, next_attempt_at, created_at) VALUES ('ui', 'self', 'x', 'sending', ?, ?)",
                ("2026-09-28T07:00:00+00:00", "2026-09-28T07:00:00+00:00"),
            )
        dump = json.loads(json.dumps(export_data(self.app)))

        import_data(self.app, dump)

        with self.app.db.read() as conn:
            self.assertEqual(conn.execute("SELECT status FROM outbox").fetchone()[0], "queued")

    def test_import_clears_a_secret_when_the_exported_address_changes(self) -> None:
        self.app.settings.update({"ha": {"url": "http://old.local:8123"}})
        self.app.secrets.set("ha_token", "long-lived-token")
        dump = json.loads(json.dumps(export_data(self.app)))
        ha = json.loads(dump["settings"]["cfg.ha"])
        ha["url"] = "http://evil.local:8123"
        dump["settings"]["cfg.ha"] = json.dumps(ha)

        import_data(self.app, dump)

        self.assertFalse(self.app.secrets.has("ha_token"))

    def test_quiet_hours_use_minutes_and_wrap_midnight(self) -> None:
        from domovoy.services.presence import in_window

        self.assertTrue(in_window(dt.datetime(2026, 9, 28, 23, 30), {"from": "23:00", "to": "07:00"}))
        self.assertTrue(in_window(dt.datetime(2026, 9, 28, 6, 30), {"from": "23:00", "to": "07:00"}))
        self.assertFalse(in_window(dt.datetime(2026, 9, 28, 7, 30), {"from": "23:00", "to": "07:00"}))
        self.assertFalse(in_window(dt.datetime(2026, 9, 28, 22, 30), {"from": "23:00", "to": "07:00"}))
        self.assertTrue(in_window(dt.datetime(2026, 9, 28, 9, 5), {"from": "9:00", "to": "10:00"}))

        self.app.settings.update({"speak": {"quiet_from": "23:00", "quiet_to": "07:00"}})
        self.clock.set(dt.datetime(2026, 9, 28, 23, 30, tzinfo=TZ))
        self.assertTrue(self.app.speak.in_quiet_hours())
        self.clock.set(dt.datetime(2026, 9, 28, 7, 30, tzinfo=TZ))
        self.assertFalse(self.app.speak.in_quiet_hours())

    def test_ha_event_times_are_sent_timezone_aware(self) -> None:
        from domovoy.providers.base import HealthTracker
        from domovoy.providers.homeassistant import HomeAssistantProvider

        captured: dict = {}

        def capture(domain, service, data=None, *, enforce_allowlist=True):
            captured.update(data or {})

        provider = HomeAssistantProvider(url=lambda: "http://ha", token=lambda: "t", health=HealthTracker("ha", self.clock))
        provider.call_service = capture                                                    # type: ignore[method-assign]
        start = dt.datetime(2026, 9, 28, 10, 0, tzinfo=TZ)
        provider.create_calendar_event("calendar.home", title="Врач", start=start, end=start + dt.timedelta(hours=1), all_day=False)

        self.assertTrue(captured["start_date_time"].endswith("Z"))
        self.assertTrue(captured["end_date_time"].endswith("Z"))

    def test_telegram_poll_runs_off_the_scheduler_thread(self) -> None:
        from domovoy.server import build

        _, scheduler = build(self.app)
        self.addCleanup(scheduler.stop)
        self.app.settings.update({"telegram": {"enabled": True}})
        self.app.secrets.set("telegram_token", "123:abc")
        scheduler._last_telegram = -100
        original = self.app.telegram_frontend.poll

        def slow_poll():
            time.sleep(0.4)
            return 1

        self.app.telegram_frontend.poll = slow_poll                                          # type: ignore[method-assign]
        self.addCleanup(setattr, self.app.telegram_frontend, "poll", original)
        started = time.monotonic()
        self.assertEqual(scheduler._job_telegram(), 0)
        self.assertLess(time.monotonic() - started, 0.2)
        self.assertIsNotNone(scheduler._telegram_future)
        scheduler._telegram_future.result(timeout=2)
        self.assertTrue(scheduler._telegram_future.done())

    def test_rate_limiter_bounds_its_key_table(self) -> None:
        from domovoy.auth import RateLimiter

        limiter = RateLimiter(limit=10, window=1)
        for index in range(5000):
            limiter.record_failure(f"203.0.113.{index}")
        self.assertLessEqual(len(limiter._hits), RateLimiter.MAX_KEYS)

    def test_retention_prunes_old_history_but_keeps_actionable_rows(self) -> None:
        old = "2020-01-01T00:00:00+00:00"
        fresh = "2026-09-28T07:00:00+00:00"
        with self.app.db.write() as conn:
            old_command = conn.execute("INSERT INTO commands(ts, frontend, text, status) VALUES (?, 'test', 'old', 'applied')", (old,)).lastrowid
            pending_command = conn.execute("INSERT INTO commands(ts, frontend, text, status) VALUES (?, 'test', 'pending', 'review')", (old,)).lastrowid
            fresh_command = conn.execute("INSERT INTO commands(ts, frontend, text, status) VALUES (?, 'test', 'fresh', 'applied')", (fresh,)).lastrowid
            conn.execute("INSERT INTO review_queue(command_id, ts, proposal, reason, status) VALUES (?, ?, '[]', 'old', 'approved')", (old_command, old))
            conn.execute("INSERT INTO review_queue(command_id, ts, proposal, reason, status) VALUES (?, ?, '[]', 'waiting', 'pending')", (pending_command, old))
            conn.execute("INSERT INTO review_queue(command_id, ts, proposal, reason, status) VALUES (?, ?, '[]', 'fresh', 'approved')", (fresh_command, fresh))
            conn.execute("INSERT INTO audit_log(ts, actor, source, entity_type, action, summary) VALUES (?, 'user', 'test', 'item', 'create', 'old')", (old,))
            conn.execute("INSERT INTO audit_log(ts, actor, source, entity_type, action, summary) VALUES (?, 'user', 'test', 'item', 'create', 'fresh')", (fresh,))
            conn.execute("INSERT INTO outbox(channel, recipient, text, status, next_attempt_at, created_at) VALUES ('ui', 'self', 'old', 'sent', ?, ?)", (old, old))
            conn.execute("INSERT INTO outbox(channel, recipient, text, status, next_attempt_at, created_at) VALUES ('ui', 'self', 'queued', 'queued', ?, ?)", (old, old))
            conn.execute("INSERT INTO outbox(channel, recipient, text, status, next_attempt_at, created_at) VALUES ('ui', 'self', 'fresh', 'sent', ?, ?)", (fresh, fresh))
            conn.execute("INSERT INTO telegram_updates(update_id, chat_id, status, created_at) VALUES (1, '1', 'done', ?)", (old,))
            conn.execute("INSERT INTO telegram_updates(update_id, chat_id, status, created_at) VALUES (2, '1', 'processing', ?)", (old,))
            conn.execute("INSERT INTO telegram_updates(update_id, chat_id, status, created_at) VALUES (3, '1', 'done', ?)", (fresh,))

        counts = self.app.retention.prune()

        with self.app.db.read() as conn:
            self.assertEqual(conn.execute("SELECT COUNT(*) FROM commands").fetchone()[0], 2)
            self.assertEqual(conn.execute("SELECT COUNT(*) FROM review_queue").fetchone()[0], 2)
            self.assertEqual(conn.execute("SELECT COUNT(*) FROM audit_log").fetchone()[0], 1)
            self.assertEqual(conn.execute("SELECT COUNT(*) FROM outbox").fetchone()[0], 2)
            self.assertEqual(conn.execute("SELECT COUNT(*) FROM telegram_updates").fetchone()[0], 2)
            self.assertEqual(conn.execute("SELECT status FROM review_queue WHERE reason = 'waiting'").fetchone()[0], "pending")
            self.assertEqual(conn.execute("SELECT status FROM outbox WHERE text = 'queued'").fetchone()[0], "queued")
            self.assertEqual(conn.execute("SELECT status FROM telegram_updates WHERE update_id = 2").fetchone()[0], "processing")
        self.assertEqual(counts, {"review": 1, "commands": 1, "audit": 1, "outbox": 1, "telegram": 1})

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
    def test_http_request_uses_an_explicit_proxy(self) -> None:
        from domovoy.providers.base import http_request

        seen: list[str] = []

        class Proxy(BaseHTTPRequestHandler):
            def do_GET(self):  # noqa: N802
                seen.append(self.path)
                body = b"ok"
                self.send_response(200)
                self.send_header("Content-Length", str(len(body)))
                self.end_headers()
                self.wfile.write(body)

            def log_message(self, *_args):
                return

        server = ThreadingHTTPServer(("127.0.0.1", 0), Proxy)
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        self.addCleanup(server.server_close)
        self.addCleanup(server.shutdown)
        status, _, body = http_request(
            "GET", "http://example.invalid/test",
            proxy=f"http://127.0.0.1:{server.server_address[1]}",
        )
        self.assertEqual((status, body), (200, b"ok"))
        self.assertEqual(seen, ["http://example.invalid/test"])

    def test_telegram_provider_passes_proxy_to_the_http_layer(self) -> None:
        from domovoy.providers import telegram as telegram_module
        from domovoy.providers.base import HealthTracker
        from domovoy.providers.telegram import TelegramProvider

        captured: dict = {}
        original = telegram_module.json_request

        def fake_json(method, url, **kwargs):
            captured.update({"method": method, "url": url, **kwargs})
            return {"ok": True, "result": {}}

        telegram_module.json_request = fake_json  # type: ignore[assignment]
        try:
            provider = TelegramProvider(
                token=lambda: "token", health=HealthTracker("telegram", self.clock),
                base_url="http://telegram.test", proxy=lambda: "http://127.0.0.1:9080",
            )
            provider.test()
        finally:
            telegram_module.json_request = original  # type: ignore[assignment]
        self.assertEqual(captured.get("proxy"), "http://127.0.0.1:9080")

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

    def test_llm_retries_without_an_unsupported_response_format(self) -> None:
        with FakeLLM() as llm:
            llm.reject_response_format = True
            llm.reply = {"ok": True}
            provider = OpenAICompatibleProvider(lambda: {"base_url": llm.url + "/v1", "enabled": True}, lambda: "",
                                                HealthTracker("llm", self.clock), timeout=2)
            self.assertEqual(provider.chat_json("s", "u", {"type": "object"}), {"ok": True})
            self.assertEqual(len(llm.requests), 2)
            first, second = json.loads(llm.requests[0][3]), json.loads(llm.requests[1][3])
            self.assertIn("response_format", first)
            self.assertEqual(first.get("reasoning_effort"), "none")
            self.assertNotIn("response_format", second)
            self.assertNotIn("reasoning_effort", second)

    def test_low_token_chat_uses_json_object_and_records_usage(self) -> None:
        with FakeLLM() as llm:
            llm.reply = {"intents": []}
            llm.usage_total = 42
            provider = OpenAICompatibleProvider(
                lambda: {"base_url": llm.url + "/v1", "enabled": True, "model": "tiny", "low_tokens": True, "max_tokens": 80},
                lambda: "SECRET", HealthTracker("llm", self.clock), timeout=2, usage=self.app.usage,
            )
            self.assertEqual(provider.chat_json("s", "u", {}), {"intents": []})
            payload = json.loads(llm.requests[0][3])
            self.assertEqual(payload["response_format"], {"type": "json_object"})
            self.assertEqual(payload["max_tokens"], 80)
            self.assertNotIn("json_schema", payload["response_format"])
            self.assertEqual(self.app.usage.snapshot()["used"], 42)

    def test_monthly_budget_stops_chat_before_the_request(self) -> None:
        self.app.settings.update({"ai": {"monthly_token_budget": 10}})
        self.app.usage.record(10)
        with FakeLLM() as llm:
            provider = OpenAICompatibleProvider(
                lambda: {"base_url": llm.url + "/v1", "enabled": True, "model": "tiny"},
                lambda: "", HealthTracker("llm", self.clock), timeout=2, usage=self.app.usage,
            )
            with self.assertRaises(ProviderError) as stopped:
                provider.chat_json("s", "u", {})
            self.assertEqual(stopped.exception.code, "budget")
            self.assertEqual(llm.requests, [])

    def test_embeddings_can_use_a_separate_local_endpoint_without_the_cloud_key(self) -> None:
        with FakeLLM() as chat, FakeLLM() as embed:
            provider = OpenAICompatibleProvider(
                lambda: {"base_url": chat.url + "/v1", "embedding_base_url": embed.url + "/v1", "enabled": True,
                         "model": "tiny", "embedding_model": "embed"},
                lambda: "SECRET", HealthTracker("llm", self.clock), timeout=2,
            )
            self.assertEqual(len(provider.embed(["hello"])[0]), embed.embed_dim)
            self.assertEqual(chat.requests, [])
            self.assertEqual(len(embed.requests), 1)
            headers = {k.lower(): v for k, v in embed.requests[0][2].items()}
            self.assertNotIn("authorization", headers)

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
