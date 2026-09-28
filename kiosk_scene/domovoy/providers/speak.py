from __future__ import annotations

import json
from typing import Any

from ..errors import ProviderError, ProviderNotConfigured
from ..text import norm_key
from .base import HealthTracker


class SpeakSender:
    """Voice output through Home Assistant, e.g. onto Yandex Stations.

    Which HA service actually speaks is *configuration*, not code: each speaker declares a `mode`
      - `tts_speak`           → tts.speak {entity_id: <tts_entity>, media_player_entity_id: <speaker>, message}
      - `yandex_station_text` → media_player.play_media {entity_id: <speaker>, media_content_type: "text", media_content_id}
      - `custom`              → any `service` ("domain.service") with a `data` template using {text} and {entity_id}
    so nothing here depends on how a particular integration is spelled.
    """

    channel = "speak"

    def __init__(self, ha: Any, settings: Any, presence: Any, clock: Any, health: HealthTracker) -> None:
        self.ha, self.settings, self.presence, self.clock, self.health = ha, settings, presence, clock, health

    # ---- selection -----------------------------------------------------------------------------

    def in_quiet_hours(self) -> bool:
        cfg = self.settings.get("speak")
        start, end, now = cfg.get("quiet_from") or "", cfg.get("quiet_to") or "", self.clock.local_now().strftime("%H:%M")
        if not start or not end or start == end:
            return False
        return start <= now < end if start < end else now >= start or now < end

    def choose(self, target: dict[str, Any]) -> list[dict[str, Any]]:
        speakers = [s for s in self.settings.get("speakers") if s.get("entity_id")]
        if not speakers:
            raise ProviderNotConfigured("speak", "No speakers are configured (Settings → Speakers)")
        wanted_id = target.get("speaker")
        if wanted_id:
            picked = [s for s in speakers if s.get("id") == wanted_id or s.get("entity_id") == wanted_id]
            if picked:
                return picked
        rooms: list[str] = []
        if target.get("room"):
            rooms = [str(target["room"])]
        elif self.ha is not None and self.ha.configured():
            try:
                rooms = self.presence.active_rooms()
            except ProviderError:
                rooms = []
        keys = {norm_key(r) for r in rooms}
        in_room = [s for s in speakers if norm_key(str(s.get("room", ""))) in keys and keys]
        if in_room:
            return in_room
        defaults = [s for s in speakers if s.get("default")]
        return defaults or speakers[:1]

    # ---- sending -------------------------------------------------------------------------------

    def send(self, address: str, text: str) -> str:
        try:
            target = json.loads(address) if address else {}
        except ValueError:
            target = {}
        if not self.settings.get("speak").get("enabled", True):
            raise ProviderError("Voice output is disabled", code="speak_disabled", retryable=False, provider="speak")
        if self.in_quiet_hours() and not target.get("urgent"):
            raise ProviderError("Quiet hours: not speaking", code="quiet_hours", retryable=False, provider="speak")
        if self.ha is None or not self.ha.configured():
            raise ProviderNotConfigured("speak", "Home Assistant API access is not available")
        spoken = 0
        last_error: ProviderError | None = None
        for speaker in self.choose(target):
            domain, service, data = build_speak_call(speaker, text)
            try:
                self.ha.call_service(domain, service, data, enforce_allowlist=False)
                spoken += 1
            except ProviderError as exc:
                last_error = exc
        if spoken == 0 and last_error is not None:
            raise last_error
        self.health.ok()
        return f"speak:{spoken}"


def build_speak_call(speaker: dict[str, Any], text: str) -> tuple[str, str, dict[str, Any]]:
    entity = str(speaker["entity_id"])
    mode = speaker.get("mode") or "yandex_station_text"
    text = " ".join(str(text).split())[:800]
    if mode == "tts_speak":
        tts_entity = str(speaker.get("tts_entity") or "")
        if not tts_entity:
            raise ProviderError("Speaker needs a tts_entity for mode tts_speak", code="bad_config", retryable=False, provider="speak")
        return "tts", "speak", {"entity_id": tts_entity, "media_player_entity_id": entity, "message": text}
    if mode == "yandex_station_text":
        return "media_player", "play_media", {"entity_id": entity, "media_content_type": "text", "media_content_id": text}
    if mode == "custom":
        service = str(speaker.get("service") or "")
        if service.count(".") != 1:
            raise ProviderError("Custom speaker needs service like domain.service", code="bad_config", retryable=False, provider="speak")
        template = speaker.get("data") or {}
        data = {k: (v.replace("{text}", text).replace("{entity_id}", entity) if isinstance(v, str) else v) for k, v in template.items()}
        domain, name = service.split(".")
        return domain, name, data
    raise ProviderError(f"Unknown speaker mode {mode}", code="bad_config", retryable=False, provider="speak")
