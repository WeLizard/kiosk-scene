from __future__ import annotations

from typing import Any

from ..db import Database
from ..errors import ValidationError

DEFAULTS: dict[str, Any] = {
    "timezone": "",
    "language": "ru",
    "default_reminder_hour": 9,
    "default_event_minutes": 60,
    "auto_apply_confidence": 0.8,
    "review_confidence": 0.5,
    "ai": {"enabled": False, "base_url": "", "model": "", "embedding_model": "", "auto_apply": False, "timeout_s": 20, "max_tokens": 320},
    "voice": {"enabled": False, "trigger_words": ["домовой", "домового", "домовому", "домовым", "домовом", "domovoy"],
              "window_s": 20, "reply": "speak", "room": "", "stt": {"base_url": "", "model": "", "language": "ru", "max_seconds": 15}},
    "calendar": {"default": "local", "ha_calendars": []},
    "caldav": {"url": "", "username": "", "auth": "basic"},
    "ha": {"url": "", "allowed_services": [], "person_entity": ""},
    "telegram": {"enabled": True, "base_url": "https://api.telegram.org"},
    "messaging": {"sandbox": False},
    "speakers": [],
    "speak": {"enabled": True, "fallback": "telegram", "quiet_from": "23:00", "quiet_to": "07:00"},
    "rooms": [],
    "places": [],
    "alice": {"allowed_user_ids": [], "budget_s": 2.5},
}

# Only these top-level keys may be written through the API; each value is validated for shape.
SHAPES: dict[str, type | tuple[type, ...]] = {
    "timezone": str, "language": str, "default_reminder_hour": int, "default_event_minutes": int,
    "auto_apply_confidence": (int, float), "review_confidence": (int, float),
    "ai": dict, "voice": dict, "calendar": dict, "caldav": dict, "ha": dict, "telegram": dict, "messaging": dict,
    "speakers": list, "speak": dict, "rooms": list, "places": list, "alice": dict,
}


class SettingsService:
    def __init__(self, db: Database) -> None:
        self.db = db

    def get(self, key: str) -> Any:
        default = DEFAULTS[key]
        value = self.db.get_setting(f"cfg.{key}", None)
        if value is None:
            return default
        if isinstance(default, dict) and isinstance(value, dict):
            return {**default, **value}
        return value

    def all(self) -> dict[str, Any]:
        return {key: self.get(key) for key in DEFAULTS}

    def update(self, patch: dict[str, Any]) -> dict[str, Any]:
        for key, value in patch.items():
            if key not in SHAPES:
                raise ValidationError(f"Unknown setting: {key}", fields={key: "Unknown setting"})
            expected = SHAPES[key]
            if isinstance(value, bool) or not isinstance(value, expected):
                raise ValidationError(f"Invalid value for {key}", fields={key: "Wrong type"})
            self._check(key, value)
        for key, value in patch.items():
            # Nested settings are patched, not replaced: sending {"ai": {"auto_apply": true}} keeps base_url etc.
            merged = {**self.get(key), **value} if isinstance(DEFAULTS[key], dict) else value
            self.db.set_setting(f"cfg.{key}", merged)
        return self.all()

    @staticmethod
    def _check(key: str, value: Any) -> None:
        if key in ("auto_apply_confidence", "review_confidence") and not 0 <= float(value) <= 1:
            raise ValidationError("Must be between 0 and 1", fields={key: "0..1"})
        if key == "default_reminder_hour" and not 0 <= value <= 23:
            raise ValidationError("Must be 0..23", fields={key: "0..23"})
        if key == "default_event_minutes" and not 5 <= value <= 24 * 60:
            raise ValidationError("Must be 5..1440", fields={key: "5..1440"})
        if key == "speakers":
            for item in value:
                if not isinstance(item, dict) or not str(item.get("entity_id", "")).count(".") == 1:
                    raise ValidationError("Each speaker needs an entity_id like media_player.xxx", fields={key: "Invalid speaker"})
        if key in ("rooms", "places"):
            for item in value:
                if not isinstance(item, dict) or not str(item.get("name") or item.get("room") or "").strip():
                    raise ValidationError("Each entry needs a name", fields={key: "Invalid entry"})
        if key in ("ai", "caldav", "ha", "telegram"):
            for field in ("base_url", "url"):
                url = str(value.get(field, "") or "")
                if url and not url.startswith(("http://", "https://")):
                    raise ValidationError("URL must start with http:// or https://", fields={key: f"{field}: invalid URL"})
