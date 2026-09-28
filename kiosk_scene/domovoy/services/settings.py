from __future__ import annotations

from typing import Any
from urllib.parse import urlsplit
from zoneinfo import ZoneInfo

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
            if isinstance(DEFAULTS[key], dict):
                _check_nested(key, DEFAULTS[key], value)
            self._check(key, value)
        auto = float(patch.get("auto_apply_confidence", self.get("auto_apply_confidence")))
        review = float(patch.get("review_confidence", self.get("review_confidence")))
        if review > auto:
            raise ValidationError("The review threshold cannot be higher than the auto-apply threshold",
                                  fields={"review_confidence": "Must not exceed the auto-apply threshold"})
        for key, value in patch.items():
            # Nested settings are patched, not replaced: sending {"ai": {"auto_apply": true}} keeps base_url etc.
            merged = {**self.get(key), **value} if isinstance(DEFAULTS[key], dict) else value
            self.db.set_setting(f"cfg.{key}", merged)
        return self.all()

    @staticmethod
    def _check(key: str, value: Any) -> None:
        if key == "timezone" and value:
            try:
                ZoneInfo(value)
            except Exception:  # noqa: BLE001 - unknown key, malformed name, missing tzdata
                raise ValidationError("Unknown time zone (use a name like Europe/Moscow)", fields={key: "Unknown time zone"}) from None
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
        urls = [(key, value, "base_url"), (key, value, "url")] if key in ("ai", "caldav", "ha", "telegram") else []
        if key == "voice" and isinstance(value.get("stt"), dict):
            urls.append(("voice.stt", value["stt"], "base_url"))
        for owner, block, field in urls:
            if field not in block:
                continue
            url = block[field]
            parts = urlsplit(url) if isinstance(url, str) else None
            if url and (parts is None or parts.scheme not in ("http", "https") or not parts.hostname):
                raise ValidationError("URL must look like http://host:port/path", fields={key: f"{field}: invalid URL"})
            if owner == "telegram" and not url:
                raise ValidationError("The Telegram API address cannot be empty", fields={key: "base_url: required"})


def _shape_ok(default: Any, value: Any) -> bool:
    if isinstance(default, bool):
        return isinstance(value, bool)
    if isinstance(default, (int, float)):
        return isinstance(value, (int, float)) and not isinstance(value, bool)
    if isinstance(default, str):
        return isinstance(value, str)
    if isinstance(default, list):
        return isinstance(value, list)
    if isinstance(default, dict):
        return isinstance(value, dict)
    return True


def _check_nested(path: str, default: dict[str, Any], value: dict[str, Any]) -> None:
    """Every nested field must be a known one of the right type: a stored `null` or a string where an object is
    expected would otherwise crash the service at start-up (and restart it in a loop)."""
    for name, item in value.items():
        if name not in default:
            raise ValidationError(f"Unknown setting: {path}.{name}", fields={path: f"{name}: unknown"})
        if not _shape_ok(default[name], item):
            raise ValidationError(f"Invalid value for {path}.{name}", fields={path: f"{name}: wrong type"})
        if isinstance(default[name], dict):
            _check_nested(f"{path}.{name}", default[name], item)
        if isinstance(default[name], list) and default[name] == [] and name in _STRING_LISTS:
            if not all(isinstance(x, str) for x in item):
                raise ValidationError(f"{path}.{name} must be a list of strings", fields={path: f"{name}: strings only"})


_STRING_LISTS = {"allowed_services", "ha_calendars", "allowed_user_ids", "trigger_words"}
