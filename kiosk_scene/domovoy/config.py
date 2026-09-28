from __future__ import annotations

import os
from dataclasses import dataclass, field
from pathlib import Path


def _int(name: str, default: int) -> int:
    try:
        return int(os.environ.get(name, "") or default)
    except ValueError:
        return default


@dataclass
class Settings:
    """Process-level configuration (environment). Runtime, user-editable settings live in the database."""

    data_dir: Path = field(default_factory=lambda: Path(os.environ.get("DOMOVOY_DATA_DIR", "/config/kiosk-scene/domovoy")))
    host: str = os.environ.get("DOMOVOY_BIND", "127.0.0.1")
    port: int = _int("DOMOVOY_PORT", 48099)
    timezone: str = os.environ.get("DOMOVOY_TIMEZONE") or os.environ.get("TZ") or "UTC"
    language: str = os.environ.get("DOMOVOY_LANGUAGE", "ru")
    scheduler_interval_s: float = float(os.environ.get("DOMOVOY_SCHEDULER_INTERVAL", "5") or 5)
    trust_local: bool = os.environ.get("DOMOVOY_TRUST_LOCAL", "1") != "0"
    ha_api_url: str = os.environ.get("DOMOVOY_HA_API_URL", "http://supervisor/core/api").rstrip("/")
    max_body_bytes: int = _int("DOMOVOY_MAX_BODY_BYTES", 8 * 1024 * 1024)
    backup_keep: int = _int("DOMOVOY_BACKUP_KEEP", 7)

    @property
    def db_path(self) -> Path:
        return self.data_dir / "domovoy.db"

    @property
    def secrets_path(self) -> Path:
        return self.data_dir / "secrets.json"

    @property
    def backups_dir(self) -> Path:
        return self.data_dir / "backups"
