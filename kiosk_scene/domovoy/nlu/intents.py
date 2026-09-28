"""Intent catalogue and strict validation.

Every interpreter (rules or an LLM) emits the same JSON-shaped intents. Nothing downstream ever trusts them:
`validate_intent` rebuilds each intent field by field from an allow-list, so unknown keys, wrong types,
absurd sizes and malformed dates are dropped or rejected *before* anything touches the database.
"""
from __future__ import annotations

import datetime as dt
from typing import Any

from ..clock import from_iso
from ..errors import ValidationError

# kind → (max length / max items, required)
STR, NUM, BOOL, STRLIST, STRMAP, ISO, ENUM, DICT, ANY = "str", "num", "bool", "strlist", "strmap", "iso", "enum", "dict", "any"

READ_ONLY = {"find_item", "list_location", "query_calendar", "query_tasks", "query_memory", "ha_query", "clarify", "help"}

INTENTS: dict[str, dict[str, tuple]] = {
    "add_item": {"name": (STR, 200, True), "quantity": (NUM,), "unit": (STR, 32), "location_path": (STRLIST, 8, 80),
                 "location_kinds": (STRLIST, 8, 24), "properties": (STRMAP,), "notes": (STR, 2000), "mode": (ENUM, ("set", "add"))},
    "place_item": {"name": (STR, 200, True), "quantity": (NUM,), "unit": (STR, 32), "location_path": (STRLIST, 8, 80),
                   "location_kinds": (STRLIST, 8, 24)},
    "move_item": {"name": (STR, 200), "item_id": (NUM,), "location_path": (STRLIST, 8, 80), "location_kinds": (STRLIST, 8, 24),
                  "use_last": (BOOL,)},
    "consume_item": {"name": (STR, 200), "item_id": (NUM,), "quantity": (NUM, None, True), "use_last": (BOOL,)},
    "use_item": {"name": (STR, 200, True)},
    "set_quantity": {"name": (STR, 200), "item_id": (NUM,), "quantity": (NUM, None, True), "unit": (STR, 32), "use_last": (BOOL,)},
    "remove_item": {"name": (STR, 200), "item_id": (NUM,), "use_last": (BOOL,)},
    "find_item": {"query": (STR, 200, True), "since": (ISO,), "until": (ISO,), "location_path": (STRLIST, 8, 80), "count": (BOOL,)},
    "list_location": {"location_path": (STRLIST, 8, 80, True), "location_kinds": (STRLIST, 8, 24)},
    "add_note": {"text": (STR, 4000, True), "title": (STR, 200)},
    "query_memory": {"query": (STR, 300, True)},
    "create_reminder": {"text": (STR, 500, True), "when": (ISO,), "date_only": (BOOL,), "trigger": (DICT,), "recurrence": (DICT,),
                        "channel": (ENUM, ("ui", "telegram", "speak", "ha_notify")), "recipient": (STR, 80)},
    "create_event": {"title": (STR, 300, True), "start": (ISO, None, True), "end": (ISO,), "all_day": (BOOL,), "location": (STR, 300),
                     "notes": (STR, 2000), "calendar": (STR, 80)},
    "query_calendar": {"start": (ISO, None, True), "end": (ISO, None, True), "label": (STR, 80)},
    "update_event": {"title": (STR, 300, True), "new_start": (ISO,), "new_end": (ISO,), "new_title": (STR, 300), "search_start": (ISO,), "search_end": (ISO,)},
    "delete_event": {"title": (STR, 300, True), "search_start": (ISO,), "search_end": (ISO,)},
    "send_message": {"recipient": (STR, 80, True), "text": (STR, 2000, True), "channel": (ENUM, ("telegram", "speak", "ha_notify", "ui")),
                     "when": (ISO,)},
    "add_task": {"title": (STR, 300, True), "list": (ENUM, ("tasks", "shopping", "chores")), "due_date": (STR, 10), "recurrence": (DICT,)},
    "add_shopping": {"items": (STRLIST, 30, 200, True)},
    "complete_task": {"title": (STR, 300, True), "list": (ENUM, ("tasks", "shopping", "chores"))},
    "query_tasks": {"list": (ENUM, ("tasks", "shopping", "chores"))},
    "ha_control": {"service": (STR, 80, True), "entity_hint": (STR, 120, True), "entity_id": (STR, 120), "data": (DICT,)},
    "ha_query": {"entity_hint": (STR, 120, True), "entity_id": (STR, 120)},
    "undo": {},
    "help": {},
    "clarify": {"question": (STR, 300, True), "options": (STRLIST, 8, 120)},
}

ENVELOPE = {"type", "confidence", "evidence"}


def is_mutating(intent_type: str) -> bool:
    return intent_type not in READ_ONLY and intent_type != "undo"


def _fail(message: str, field: str) -> ValidationError:
    return ValidationError(message, fields={field: message})


def validate_intent(raw: Any) -> dict[str, Any]:
    """Return a clean intent or raise `ValidationError`. Never mutates `raw`."""
    if not isinstance(raw, dict):
        raise ValidationError("Intent must be an object")
    intent_type = raw.get("type")
    spec = INTENTS.get(intent_type) if isinstance(intent_type, str) else None
    if spec is None:
        raise ValidationError(f"Unknown intent type: {intent_type!r}", fields={"type": "unknown"})
    clean: dict[str, Any] = {"type": intent_type}
    try:
        confidence = float(raw.get("confidence", 0.0))
    except (TypeError, ValueError):
        raise _fail("confidence must be a number", "confidence") from None
    clean["confidence"] = max(0.0, min(1.0, confidence)) if confidence == confidence else 0.0
    clean["evidence"] = str(raw.get("evidence") or "")[:300]
    for name, definition in spec.items():
        value = raw.get(name)
        required = len(definition) > 2 and definition[2] is True
        if value is None or value == "" or value == []:
            if required:
                raise _fail(f"{name} is required", name)
            continue
        cleaned = _coerce(name, definition, value)
        if cleaned is not None:
            clean[name] = cleaned
    if not (spec.get("name") or spec.get("item_id")) or intent_type not in ("move_item", "consume_item", "set_quantity", "remove_item"):
        return clean
    if "name" not in clean and "item_id" not in clean and not clean.get("use_last"):
        raise _fail("Which item? name, item_id or use_last is required", "name")
    return clean


def _coerce(name: str, definition: tuple, value: Any) -> Any:
    kind = definition[0]
    if kind == STR:
        text = " ".join(str(value).split())
        limit = definition[1] or 300
        if len(text) > limit:
            raise _fail(f"{name} is too long (max {limit})", name)
        return text or None
    if kind == NUM:
        if isinstance(value, bool):
            raise _fail(f"{name} must be a number", name)
        try:
            number = float(value)
        except (TypeError, ValueError):
            raise _fail(f"{name} must be a number", name) from None
        if number != number or number in (float("inf"), float("-inf")) or number < 0 or number > 1_000_000:
            raise _fail(f"{name} is out of range", name)
        return number
    if kind == BOOL:
        return bool(value) if isinstance(value, bool) else str(value).lower() in ("true", "1", "yes")
    if kind == STRLIST:
        max_items, max_len = definition[1] or 10, definition[2] or 120
        if not isinstance(value, list) or len(value) > max_items:
            raise _fail(f"{name} must be a list of at most {max_items} items", name)
        items = [" ".join(str(item).split()) for item in value if str(item).strip()]
        if any(len(item) > max_len for item in items):
            raise _fail(f"{name} contains an item longer than {max_len}", name)
        return items or None
    if kind == STRMAP:
        if not isinstance(value, dict) or len(value) > 40:
            raise _fail(f"{name} must be an object with at most 40 keys", name)
        return {str(k)[:64]: str(v)[:256] for k, v in value.items()}
    if kind == ISO:
        try:
            parsed = from_iso(str(value))
        except ValueError:
            raise _fail(f"{name} must be an ISO-8601 datetime", name) from None
        if not dt.datetime(2000, 1, 1, tzinfo=dt.timezone.utc) <= parsed <= dt.datetime(2100, 1, 1, tzinfo=dt.timezone.utc):
            raise _fail(f"{name} is out of the supported range", name)
        return str(value)
    if kind == ENUM:
        if value not in definition[1]:
            raise _fail(f"{name} must be one of {', '.join(definition[1])}", name)
        return value
    if kind == DICT:
        if not isinstance(value, dict):
            raise _fail(f"{name} must be an object", name)
        return _plain(value, depth=0)
    return None


def _plain(value: Any, depth: int) -> Any:
    """Copy JSON-like data with bounded depth/size; anything exotic is stringified."""
    if depth > 3:
        return str(value)[:200]
    if isinstance(value, dict):
        return {str(k)[:64]: _plain(v, depth + 1) for k, v in list(value.items())[:40]}
    if isinstance(value, (list, tuple)):
        return [_plain(v, depth + 1) for v in list(value)[:40]]
    if isinstance(value, (int, float, bool)) or value is None:
        return value
    return str(value)[:300]


def llm_json_schema() -> dict[str, Any]:
    """One flat schema (all fields optional) keeps the grammar small enough for tiny local models."""
    properties: dict[str, Any] = {
        "type": {"type": "string", "enum": sorted(INTENTS)},
        "confidence": {"type": "number", "minimum": 0, "maximum": 1},
        "evidence": {"type": "string"},
    }
    kinds = {STR: {"type": "string"}, NUM: {"type": "number"}, BOOL: {"type": "boolean"}, ISO: {"type": "string"},
             STRLIST: {"type": "array", "items": {"type": "string"}}, STRMAP: {"type": "object", "additionalProperties": {"type": "string"}},
             DICT: {"type": "object"}}
    for spec in INTENTS.values():
        for name, definition in spec.items():
            if name in properties:
                continue
            properties[name] = {"type": "string", "enum": list(definition[1])} if definition[0] == ENUM else kinds[definition[0]]
    return {
        "type": "object",
        "properties": {"intents": {"type": "array", "maxItems": 4, "items": {"type": "object", "properties": properties, "required": ["type", "confidence"]}}},
        "required": ["intents"],
    }
