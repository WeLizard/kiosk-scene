"""How the assistant is addressed and how it calls itself.

The name is a user setting, not a constant: the same list feeds the kiosk microphone trigger, the
leading-word stripper used by Alice/Assist/Telegram and the avatar's `assistant` field.
"""
from __future__ import annotations

import re
from typing import Any

from .text import normalize, stem

DEFAULT_NAME = "Домовой"
DEFAULT_ALIASES = ["домовой", "домового", "домовому", "домовым", "домовом", "domovoy"]
POLITE_LEADS = {"эй", "слушай", "слышь", "привет", "хэй", "ну", "алиса", "окей", "ок"}
_LEAD_VERBS = re.compile(r"^(?:(?:попроси|спроси у|скажи|передай)\s+)?", re.I)
_POLITE_LEADS = re.compile(r"^(?:(?:эй|слушай|слышь|привет|хэй|ну|алиса|окей|ок)[, ]+)+", re.I)
_FILLER_START = re.compile(r"^(?:(?:пожалуйста|давай|ну)[, ]+)+", re.I)
_FILLER_END = re.compile(r"[, ]*(?:пожалуйста|спасибо)[.! ]*$", re.I)


def _identity(settings: Any) -> dict[str, Any]:
    try:
        value = settings.get("identity")
    except AttributeError:
        value = None
    return value if isinstance(value, dict) else {}


def display_name(settings: Any) -> str:
    """The spelling used in replies and on the kiosk; falls back to the product default."""
    name = " ".join(str(_identity(settings).get("name") or DEFAULT_NAME).split())
    return name or DEFAULT_NAME


def invocation_names(settings: Any) -> list[str]:
    """Name plus aliases, lower-cased and de-duplicated. The primary name is always included."""
    values = [display_name(settings)]
    aliases = _identity(settings).get("aliases")
    if isinstance(aliases, list):
        values.extend(str(value) for value in aliases)
    return _unique(values)


def _unique(values: list[str]) -> list[str]:
    seen: set[str] = set()
    result: list[str] = []
    for value in values:
        value = " ".join(str(value or "").split())
        key = value.casefold()
        if value and key not in seen:
            seen.add(key)
            result.append(value)
    return result


def strip_trigger(text: str, triggers: list[str]) -> tuple[bool, str]:
    """`(had_trigger, rest)`. Matches a trigger word at the start (after polite filler), any grammatical case."""
    words = str(text or "").strip().split()
    known = {stem(normalize(t)) for t in triggers if t}
    index = 0
    while index < len(words) and normalize(words[index]) in POLITE_LEADS:
        index += 1
    if index < len(words) and stem(normalize(words[index]).strip()) in known:
        rest = " ".join(words[index + 1:])
        return True, re.sub(r"^[,:.\-–—\s]+", "", rest)
    return False, str(text or "").strip()


def strip_invocation(text: str, names: list[str] | None = None) -> str:
    """Remove a leading address such as «Нейри, …» or «попроси Домового …».

    `None` means the built-in defaults (used by the rule interpreter when called directly); an explicit
    list is used as-is, so clearing aliases in the UI really stops those words from being stripped.
    """
    value = " ".join(str(text or "").split())
    value = _POLITE_LEADS.sub("", value)
    value = _FILLER_START.sub("", value)
    names = [DEFAULT_NAME, *DEFAULT_ALIASES] if names is None else names
    if names:
        prefix = _LEAD_VERBS.match(value)
        verb = prefix.group(0) if prefix else ""
        had, rest = strip_trigger(value[len(verb):], names)
        if had:
            value = rest
    value = _FILLER_START.sub("", value)
    value = _FILLER_END.sub("", value)
    return value.strip()
