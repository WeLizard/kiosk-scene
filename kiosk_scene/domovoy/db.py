from __future__ import annotations

import json
import logging
import sqlite3
import threading
from contextlib import contextmanager
from pathlib import Path
from typing import Any, Iterator

from .clock import Clock

LOG = logging.getLogger("domovoy.db")

# Each migration runs once, in order, inside a transaction. Never edit an applied migration; add a new one.
MIGRATIONS: list[tuple[int, str]] = [
    (
        1,
        """
        CREATE TABLE meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);

        CREATE TABLE locations (
          id INTEGER PRIMARY KEY,
          parent_id INTEGER REFERENCES locations(id),
          name TEXT NOT NULL,
          norm_name TEXT NOT NULL,
          kind TEXT NOT NULL DEFAULT 'place',
          notes TEXT NOT NULL DEFAULT '',
          position INTEGER NOT NULL DEFAULT 0,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL,
          deleted_at TEXT
        );
        CREATE UNIQUE INDEX uq_location_sibling
          ON locations(COALESCE(parent_id, 0), norm_name) WHERE deleted_at IS NULL;
        CREATE INDEX ix_location_parent ON locations(parent_id);

        CREATE TABLE items (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          norm_name TEXT NOT NULL,
          quantity REAL,
          unit TEXT NOT NULL DEFAULT '',
          location_id INTEGER REFERENCES locations(id),
          category TEXT NOT NULL DEFAULT '',
          properties TEXT NOT NULL DEFAULT '{}',
          notes TEXT NOT NULL DEFAULT '',
          source TEXT NOT NULL DEFAULT 'ui',
          confidence REAL,
          last_used_at TEXT,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL,
          deleted_at TEXT
        );
        CREATE INDEX ix_items_norm ON items(norm_name);
        CREATE INDEX ix_items_location ON items(location_id);

        CREATE TABLE notes (
          id INTEGER PRIMARY KEY,
          title TEXT NOT NULL DEFAULT '',
          body TEXT NOT NULL,
          tags TEXT NOT NULL DEFAULT '[]',
          source TEXT NOT NULL DEFAULT 'ui',
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL,
          deleted_at TEXT
        );

        CREATE TABLE tasks (
          id INTEGER PRIMARY KEY,
          title TEXT NOT NULL,
          list TEXT NOT NULL DEFAULT 'tasks',
          notes TEXT NOT NULL DEFAULT '',
          due_date TEXT,
          recurrence TEXT,
          done_at TEXT,
          source TEXT NOT NULL DEFAULT 'ui',
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL,
          deleted_at TEXT
        );
        CREATE INDEX ix_tasks_list ON tasks(list, done_at);

        CREATE TABLE contacts (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          norm_name TEXT NOT NULL,
          aliases TEXT NOT NULL DEFAULT '[]',
          channels TEXT NOT NULL DEFAULT '{}',
          is_self INTEGER NOT NULL DEFAULT 0,
          notes TEXT NOT NULL DEFAULT '',
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL,
          deleted_at TEXT
        );

        CREATE TABLE reminders (
          id INTEGER PRIMARY KEY,
          text TEXT NOT NULL,
          kind TEXT NOT NULL DEFAULT 'time',
          due_at TEXT,
          trigger TEXT,
          recurrence TEXT,
          state TEXT NOT NULL DEFAULT 'pending',
          channel TEXT NOT NULL DEFAULT 'ui',
          recipient TEXT NOT NULL DEFAULT 'self',
          source TEXT NOT NULL DEFAULT 'ui',
          fired_at TEXT,
          armed_at TEXT NOT NULL,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL,
          deleted_at TEXT
        );
        CREATE INDEX ix_reminders_due ON reminders(state, due_at);

        CREATE TABLE calendar_events (
          id INTEGER PRIMARY KEY,
          calendar TEXT NOT NULL DEFAULT 'local',
          title TEXT NOT NULL,
          start TEXT NOT NULL,
          end TEXT NOT NULL,
          all_day INTEGER NOT NULL DEFAULT 0,
          location TEXT NOT NULL DEFAULT '',
          notes TEXT NOT NULL DEFAULT '',
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL,
          deleted_at TEXT
        );
        CREATE INDEX ix_calendar_start ON calendar_events(start);

        CREATE TABLE outbox (
          id INTEGER PRIMARY KEY,
          channel TEXT NOT NULL,
          recipient TEXT NOT NULL,
          address TEXT NOT NULL DEFAULT '',
          text TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'queued',
          attempts INTEGER NOT NULL DEFAULT 0,
          next_attempt_at TEXT NOT NULL,
          last_error TEXT,
          provider_message_id TEXT,
          idempotency_key TEXT UNIQUE,
          command_id INTEGER,
          created_at TEXT NOT NULL,
          sent_at TEXT
        );
        CREATE INDEX ix_outbox_due ON outbox(status, next_attempt_at);

        CREATE TABLE commands (
          id INTEGER PRIMARY KEY,
          ts TEXT NOT NULL,
          frontend TEXT NOT NULL,
          session_id TEXT,
          text TEXT NOT NULL,
          interpreter TEXT,
          intents TEXT,
          status TEXT NOT NULL,
          confidence REAL,
          reply TEXT,
          result TEXT,
          error TEXT
        );
        CREATE INDEX ix_commands_ts ON commands(ts);

        CREATE TABLE review_queue (
          id INTEGER PRIMARY KEY,
          command_id INTEGER REFERENCES commands(id),
          ts TEXT NOT NULL,
          proposal TEXT NOT NULL,
          reason TEXT NOT NULL,
          confidence REAL,
          status TEXT NOT NULL DEFAULT 'pending',
          resolved_at TEXT,
          resolution TEXT
        );
        CREATE INDEX ix_review_status ON review_queue(status);

        CREATE TABLE audit_log (
          id INTEGER PRIMARY KEY,
          ts TEXT NOT NULL,
          actor TEXT NOT NULL,
          source TEXT NOT NULL,
          entity_type TEXT NOT NULL,
          entity_id INTEGER,
          action TEXT NOT NULL,
          before TEXT,
          after TEXT,
          summary TEXT NOT NULL DEFAULT '',
          command_id INTEGER,
          undoable INTEGER NOT NULL DEFAULT 1,
          undone_by INTEGER
        );
        CREATE INDEX ix_audit_entity ON audit_log(entity_type, entity_id);
        CREATE INDEX ix_audit_ts ON audit_log(ts);

        CREATE TABLE sessions (
          id TEXT PRIMARY KEY,
          updated_at TEXT NOT NULL,
          context TEXT NOT NULL DEFAULT '{}'
        );

        CREATE TABLE settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);

        CREATE TABLE change_log (
          seq INTEGER PRIMARY KEY AUTOINCREMENT,
          ts TEXT NOT NULL,
          topic TEXT NOT NULL,
          payload TEXT NOT NULL DEFAULT '{}'
        );

        CREATE TABLE embeddings (
          kind TEXT NOT NULL,
          ref_id INTEGER NOT NULL,
          model TEXT NOT NULL,
          text_hash TEXT NOT NULL,
          vec BLOB NOT NULL,
          PRIMARY KEY (kind, ref_id, model)
        );

        CREATE TABLE search_docs (
          kind TEXT NOT NULL,
          ref_id INTEGER NOT NULL,
          text TEXT NOT NULL,
          PRIMARY KEY (kind, ref_id)
        );
        """,
    ),
]

FTS_STATEMENT = (
    "CREATE VIRTUAL TABLE IF NOT EXISTS search_fts USING fts5("
    "text, kind UNINDEXED, ref_id UNINDEXED, tokenize='unicode61 remove_diacritics 2')"
)


def dumps(value: Any) -> str:
    return json.dumps(value, ensure_ascii=False, separators=(",", ":"), sort_keys=True)


def loads(value: str | None, default: Any = None) -> Any:
    if value is None or value == "":
        return default
    try:
        return json.loads(value)
    except (TypeError, ValueError):
        return default


class Database:
    """SQLite wrapper: WAL, foreign keys, one connection per thread, explicit write transactions.

    All mutations of one logical operation (entity change + audit row + change_log rows) happen in a
    single `write()` block, so a crash can never leave an entity changed without its audit trail.
    """

    def __init__(self, path: Path | str, clock: Clock | None = None) -> None:
        self.path = str(path)
        self.clock = clock or Clock()
        self._local = threading.local()
        self._cond = threading.Condition()
        self._latest_seq = 0
        self.fts_enabled = False
        if self.path != ":memory:":
            Path(self.path).parent.mkdir(parents=True, exist_ok=True)
        self._memory_conn: sqlite3.Connection | None = None
        self._write_lock = threading.RLock()
        self._write_depth = 0
        self._migrate()
        with self.read() as conn:
            row = conn.execute("SELECT COALESCE(MAX(seq), 0) FROM change_log").fetchone()
            self._latest_seq = int(row[0])

    # ---- connections -------------------------------------------------------------------------

    def _connect(self) -> sqlite3.Connection:
        if self.path == ":memory:":
            if self._memory_conn is None:
                self._memory_conn = self._open(":memory:")
            return self._memory_conn
        conn = getattr(self._local, "conn", None)
        if conn is None:
            conn = self._open(self.path)
            self._local.conn = conn
        return conn

    @staticmethod
    def _open(path: str) -> sqlite3.Connection:
        conn = sqlite3.connect(path, timeout=10, isolation_level=None, check_same_thread=False)
        conn.row_factory = sqlite3.Row
        conn.execute("PRAGMA foreign_keys = ON")
        conn.execute("PRAGMA busy_timeout = 10000")
        if path != ":memory:":
            conn.execute("PRAGMA journal_mode = WAL")
            conn.execute("PRAGMA synchronous = NORMAL")
        return conn

    @contextmanager
    def read(self) -> Iterator[sqlite3.Connection]:
        yield self._connect()

    @contextmanager
    def write(self) -> Iterator[sqlite3.Connection]:
        """Serialised write transaction. Rolls back on any exception; notifies long-pollers on commit.

        Re-entrant: a nested `write()` on the same thread joins the outer transaction, so services can
        call each other without ever splitting one logical operation across two commits.
        """
        with self._write_lock:
            conn = self._connect()
            if self._write_depth > 0:
                self._write_depth += 1
                try:
                    yield conn
                finally:
                    self._write_depth -= 1
                return
            conn.execute("BEGIN IMMEDIATE")
            self._write_depth = 1
            before = self._latest_seq
            try:
                yield conn
                row = conn.execute("SELECT COALESCE(MAX(seq), 0) FROM change_log").fetchone()
                conn.execute("COMMIT")
            except BaseException:
                try:
                    conn.execute("ROLLBACK")
                except sqlite3.Error:
                    pass
                raise
            finally:
                self._write_depth = 0
            latest = int(row[0])
            if latest > before:
                with self._cond:
                    self._latest_seq = latest
                    self._cond.notify_all()

    # ---- migrations --------------------------------------------------------------------------

    def _migrate(self) -> None:
        conn = self._connect()
        conn.execute("CREATE TABLE IF NOT EXISTS schema_migrations (version INTEGER PRIMARY KEY, applied_at TEXT NOT NULL)")
        applied = {row[0] for row in conn.execute("SELECT version FROM schema_migrations")}
        for version, script in MIGRATIONS:
            if version in applied:
                continue
            LOG.info("Applying migration %s", version)
            try:
                conn.execute("BEGIN IMMEDIATE")
                for statement in _split_statements(script):
                    conn.execute(statement)
                conn.execute(
                    "INSERT INTO schema_migrations(version, applied_at) VALUES (?, ?)", (version, self.clock.now_iso())
                )
                conn.execute("COMMIT")
            except BaseException:
                conn.execute("ROLLBACK")
                raise
        try:
            conn.execute(FTS_STATEMENT)
            self.fts_enabled = True
        except sqlite3.OperationalError as exc:
            LOG.warning("SQLite FTS5 unavailable (%s); falling back to LIKE search", exc)
            self.fts_enabled = False

    # ---- realtime ----------------------------------------------------------------------------

    def emit(self, conn: sqlite3.Connection, topic: str, payload: dict[str, Any] | None = None) -> None:
        conn.execute(
            "INSERT INTO change_log(ts, topic, payload) VALUES (?, ?, ?)",
            (self.clock.now_iso(), topic, dumps(payload or {})),
        )

    @property
    def latest_seq(self) -> int:
        return self._latest_seq

    def wait_for_changes(self, since: int, timeout: float) -> tuple[int, list[dict[str, Any]], bool]:
        """Long-poll primitive. Returns `(cursor, events, reset)`.

        `reset` is True when the caller's cursor is ahead of the log (database replaced/restored), which
        tells clients to refetch everything instead of trusting their cursor.
        """
        with self._cond:
            if since > self._latest_seq:
                return self._latest_seq, [], True
            if since == self._latest_seq and timeout > 0:
                self._cond.wait(timeout=timeout)
            latest = self._latest_seq
        with self.read() as conn:
            rows = conn.execute(
                "SELECT seq, topic, payload FROM change_log WHERE seq > ? ORDER BY seq LIMIT 500", (since,)
            ).fetchall()
        if rows:
            events = [{"seq": r["seq"], "topic": r["topic"], "payload": loads(r["payload"], {})} for r in rows]
            return events[-1]["seq"], events, False
        return latest, [], False

    def trim_change_log(self, keep: int = 5000) -> None:
        with self.write() as conn:
            conn.execute("DELETE FROM change_log WHERE seq <= (SELECT MAX(seq) FROM change_log) - ?", (keep,))

    # ---- helpers -----------------------------------------------------------------------------

    def get_setting(self, key: str, default: Any = None) -> Any:
        with self.read() as conn:
            row = conn.execute("SELECT value FROM settings WHERE key = ?", (key,)).fetchone()
        return loads(row["value"], default) if row else default

    def set_setting(self, key: str, value: Any) -> None:
        with self.write() as conn:
            conn.execute(
                "INSERT INTO settings(key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value",
                (key, dumps(value)),
            )
            self.emit(conn, "settings.changed", {"key": key})

    def close(self) -> None:
        conn = getattr(self._local, "conn", None)
        if conn is not None:
            conn.close()
            self._local.conn = None
        if self._memory_conn is not None:
            self._memory_conn.close()
            self._memory_conn = None


def _split_statements(script: str) -> list[str]:
    statements: list[str] = []
    buffer: list[str] = []
    for line in script.splitlines():
        buffer.append(line)
        if line.rstrip().endswith(";"):
            statement = "\n".join(buffer).strip()
            if statement:
                statements.append(statement)
            buffer = []
    tail = "\n".join(buffer).strip()
    if tail:
        statements.append(tail)
    return statements
