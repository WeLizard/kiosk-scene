from __future__ import annotations

import json
import os
import secrets as pysecrets
import threading
from pathlib import Path

KNOWN = ("api_token", "alice_secret", "assist_secret", "telegram_token", "caldav_password", "ha_token", "llm_api_key")


class SecretsStore:
    """Write-only secrets in `secrets.json` (0600), separate from the exportable database."""

    def __init__(self, path: Path) -> None:
        self.path = path
        self._lock = threading.Lock()
        self._data = self._load()
        changed = False
        for name in ("api_token", "alice_secret", "assist_secret"):
            if not self._data.get(name):
                self._data[name] = pysecrets.token_urlsafe(24)
                changed = True
        if changed:
            self._save()

    def _load(self) -> dict[str, str]:
        try:
            data = json.loads(self.path.read_text(encoding="utf-8"))
            return {k: str(v) for k, v in data.items()} if isinstance(data, dict) else {}
        except (OSError, ValueError):
            return {}

    def _save(self) -> None:
        self.path.parent.mkdir(parents=True, exist_ok=True)
        temp = self.path.with_name(self.path.name + ".tmp")
        fd = os.open(temp, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
        with os.fdopen(fd, "w", encoding="utf-8") as stream:
            json.dump(self._data, stream)
        os.replace(temp, self.path)
        os.chmod(self.path, 0o600)

    def get(self, name: str) -> str:
        with self._lock:
            return self._data.get(name, "")

    def has(self, name: str) -> bool:
        return bool(self.get(name))

    def set(self, name: str, value: str) -> None:
        if name not in KNOWN:
            raise KeyError(name)
        with self._lock:
            if value:
                self._data[name] = value
            else:
                self._data.pop(name, None)
            self._save()

    def rotate(self, name: str) -> str:
        value = pysecrets.token_urlsafe(24)
        self.set(name, value)
        return value
