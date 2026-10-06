from __future__ import annotations

import datetime as dt
import sqlite3
from pathlib import Path
from typing import Any

from .db import MIGRATIONS
from .errors import ValidationError

# Order matters for import (parents first). Secrets and derived tables (search, embeddings, change_log) are never exported.
EXPORT_TABLES = ["locations", "items", "notes", "tasks", "contacts", "reminders", "calendar_events", "outbox", "commands",
                 "review_queue", "audit_log"]
SCHEMA_VERSION = max(v for v, _ in MIGRATIONS)


def create_backup(app: Any) -> Path:
    """Consistent snapshot of the live database using SQLite's online backup API, with rotation."""
    backups = app.env.backups_dir
    backups.mkdir(parents=True, exist_ok=True)
    stamp = app.clock.now().strftime("%Y%m%d-%H%M%S")
    target = backups / f"domovoy-{stamp}.db"
    with app.db.read() as source:
        dest = sqlite3.connect(str(target))
        try:
            source.backup(dest)
        finally:
            dest.close()
    existing = sorted(backups.glob("domovoy-*.db"))
    for old in existing[: max(0, len(existing) - app.env.backup_keep)]:
        old.unlink(missing_ok=True)
    return target


def list_backups(app: Any) -> list[dict[str, Any]]:
    backups = app.env.backups_dir
    if not backups.exists():
        return []
    return [{"name": p.name, "bytes": p.stat().st_size} for p in sorted(backups.glob("domovoy-*.db"), reverse=True)]


def export_data(app: Any) -> dict[str, Any]:
    tables: dict[str, list[dict[str, Any]]] = {}
    with app.db.read() as conn:
        for name in EXPORT_TABLES:
            tables[name] = [{k: row[k] for k in row.keys()} for row in conn.execute(f"SELECT * FROM {name}")]
        settings = {r["key"]: r["value"] for r in conn.execute("SELECT key, value FROM settings WHERE key LIKE 'cfg.%'")}
    return {"format": "domovoy-export", "schema_version": SCHEMA_VERSION, "exported_at": app.clock.now_iso(), "tables": tables, "settings": settings}


def import_data(app: Any, payload: dict[str, Any]) -> dict[str, int]:
    """Replace all data with an export. Validated first; a safety backup is taken; the swap is one transaction,
    so a bad file can never leave a half-imported database."""
    if not isinstance(payload, dict) or payload.get("format") != "domovoy-export":
        raise ValidationError("Not a Domovoy export file", code="bad_export")
    if int(payload.get("schema_version", 0)) > SCHEMA_VERSION:
        raise ValidationError("The export comes from a newer Domovoy version", code="newer_schema")
    tables = payload.get("tables")
    if not isinstance(tables, dict):
        raise ValidationError("Export has no tables", code="bad_export")
    with app.db.read() as conn:
        columns = {name: {r["name"] for r in conn.execute(f"PRAGMA table_info({name})")} for name in EXPORT_TABLES}
    for name in EXPORT_TABLES:
        rows = tables.get(name, [])
        if not isinstance(rows, list):
            raise ValidationError(f"Table {name} must be a list", code="bad_export")
        for row in rows:
            if not isinstance(row, dict) or not row or set(row) - columns[name]:
                raise ValidationError(f"Table {name} contains an invalid row", code="bad_export")
    settings = payload.get("settings") or {}
    if not isinstance(settings, dict) or any(not str(k).startswith("cfg.") for k in settings):
        raise ValidationError("Invalid settings block", code="bad_export")

    create_backup(app)
    counts: dict[str, int] = {}
    with app.db.write() as conn:
        conn.execute("PRAGMA defer_foreign_keys = ON")
        for name in reversed(EXPORT_TABLES):
            conn.execute(f"DELETE FROM {name}")
        for name in EXPORT_TABLES:
            rows = tables.get(name, [])
            for row in rows:
                cols = list(row)
                conn.execute(f"INSERT INTO {name}({', '.join(cols)}) VALUES ({', '.join('?' for _ in cols)})", [row[c] for c in cols])
            counts[name] = len(rows)
        conn.execute("DELETE FROM settings WHERE key LIKE 'cfg.%'")
        for key, value in settings.items():
            conn.execute("INSERT INTO settings(key, value) VALUES (?, ?)", (key, str(value)))
        conn.execute("DELETE FROM sessions")
        app.db.emit(conn, "data.reset", counts)
    app.search.rebuild_all()
    return counts
