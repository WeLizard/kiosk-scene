from __future__ import annotations

import logging
from pathlib import Path
from typing import Any

from .clock import Clock
from .config import Settings
from .db import Database
from .embeddings import HashingEmbedder
from .providers.base import CircuitBreaker, HealthTracker, ResourceGate
from .providers.caldav import CalDavProvider
from .providers.homeassistant import HomeAssistantProvider, supervisor_token
from .providers.llm import ModelEmbedder, OpenAICompatibleProvider
from .providers.speak import SpeakSender
from .providers.stt import SttProvider
from .providers.telegram import TelegramProvider
from .secret_store import SecretsStore
from .services.audit import AuditLog
from .services.avatar import AvatarState
from .services.calendar import CalendarService
from .services.commands import CommandLog, ReviewQueue, SessionStore
from .services.delivery import DeliveryService
from .services.items import ItemService
from .services.locations import LocationService
from .services.outbox import OutboxService
from .services.presence import PresenceService
from .services.reminders import ReminderService
from .services.search import SearchService
from .services.settings import SettingsService
from .services.simple import ContactService, NoteService, TaskService
from .services.triggers import TriggerEngine

LOG = logging.getLogger("domovoy")


class Domovoy:
    """Composition root: wires services and providers. Everything is constructed here and nowhere else,
    so tests can build an app with a fake clock and in-memory or temp-dir storage in one call."""

    def __init__(self, settings: Settings | None = None, *, clock: Clock | None = None, telegram_base_url: str | None = None) -> None:
        self.env = settings or Settings()
        self.clock = clock or Clock(self.env.timezone)
        self.db = Database(self.env.db_path if str(self.env.db_path) != ":memory:" else ":memory:", self.clock)
        self.secrets = SecretsStore(self.env.secrets_path)
        self.settings = SettingsService(self.db)
        tz_override = self.settings.get("timezone")
        if tz_override:
            self.clock.set_timezone(tz_override)

        # -- integrations (each one can be missing or down without affecting the rest) -------------
        self.health = {name: HealthTracker(name, self.clock) for name in ("home_assistant", "telegram", "caldav", "llm", "speak", "stt")}
        self.gate = ResourceGate(1)
        self.ha = HomeAssistantProvider(
            url=lambda: self.settings.get("ha")["url"] or self.env.ha_api_url,
            token=lambda: self.secrets.get("ha_token") or supervisor_token(),
            health=self.health["home_assistant"],
            allowed=self._allowed_services,
        )
        self.telegram = TelegramProvider(
            token=lambda: self.secrets.get("telegram_token"), health=self.health["telegram"],
            base_url=telegram_base_url or self.settings.get("telegram")["base_url"],
        )
        self.caldav = CalDavProvider(
            config=lambda: self.settings.get("caldav"), secret=lambda: self.secrets.get("caldav_password"),
            health=self.health["caldav"], tz=lambda: self.clock.tz, clock=self.clock,
        )
        self.llm = OpenAICompatibleProvider(
            config=lambda: self.settings.get("ai"), api_key=lambda: self.secrets.get("llm_api_key"),
            health=self.health["llm"], breaker=CircuitBreaker(), gate=self.gate,
        )
        self.stt = SttProvider(
            config=lambda: self.settings.get("voice")["stt"], api_key=lambda: self.secrets.get("llm_api_key"),
            health=self.health["stt"], gate=self.gate,
        )

        # -- domain --------------------------------------------------------------------------------
        self.audit = AuditLog(self.db, self.clock)
        self.avatar = AvatarState(self.db, self.clock)
        self.search = SearchService(self.db, self.clock)
        self.locations = LocationService(self.db, self.clock, self.audit, self.search)
        self.items = ItemService(self.db, self.clock, self.audit, self.search, self.locations)
        self.notes = NoteService(self.db, self.clock, self.audit, self.search)
        self.tasks = TaskService(self.db, self.clock, self.audit, self.search)
        self.contacts = ContactService(self.db, self.clock, self.audit)
        self.presence = PresenceService(self.ha, self.settings)
        self.outbox = OutboxService(self.db, self.clock, self.settings)
        self.speak = SpeakSender(self.ha, self.settings, self.presence, self.clock, self.health["speak"])
        self.speak.app_ref = self
        self.outbox.register(self.telegram)
        self.outbox.register(self.speak)
        self.outbox.register(_HaNotifySender(self.ha))
        self.delivery = DeliveryService(self.outbox, self.contacts, self.db)
        self.reminders = ReminderService(self.db, self.clock, self.audit, self.delivery)
        self.triggers = TriggerEngine(self.reminders, self.presence, self.clock)
        self.calendar = CalendarService(self.db, self.clock, self.audit, self.search, caldav=self.caldav, ha=self.ha, settings=self.settings)
        self.commands = CommandLog(self.db, self.clock)
        self.sessions = SessionStore(self.db, self.clock)
        self.review = ReviewQueue(self.db, self.clock)
        self.refresh_embedder()

    # ---- runtime configuration -----------------------------------------------------------------

    def _allowed_services(self) -> list[str]:
        from .providers.homeassistant import DEFAULT_ALLOWED_SERVICES

        extra = self.settings.get("ha").get("allowed_services") or []
        return list(DEFAULT_ALLOWED_SERVICES) + [str(s) for s in extra]

    def refresh_embedder(self) -> None:
        ai = self.settings.get("ai")
        if ai.get("enabled") and ai.get("base_url") and ai.get("embedding_model"):
            self.search.set_model_embedder(ModelEmbedder(self.llm))
        else:
            self.search.set_model_embedder(None)

    def integrations(self) -> list[dict[str, Any]]:
        ai, voice = self.settings.get("ai"), self.settings.get("voice")
        tracked = {
            "home_assistant": self.ha.configured(), "telegram": self.telegram.configured(),
            "caldav": self.caldav.configured(), "llm": self.llm.configured(), "speak": bool(self.settings.get("speakers")),
            "stt": bool(voice.get("stt", {}).get("base_url")),
        }
        result = []
        for name, configured in tracked.items():
            health = self.health[name].health
            if not configured:
                health.status = "unconfigured"
            elif health.status == "unconfigured":
                health.status = "ok" if health.last_ok else "degraded" if health.last_error else "unknown"
            result.append({**health.public(), "configured": configured})
        return result

    def close(self) -> None:
        self.db.close()


class _HaNotifySender:
    """`ha_notify` channel: address is a notify service like `notify.mobile_app_pixel`."""

    channel = "ha_notify"

    def __init__(self, ha: HomeAssistantProvider) -> None:
        self.ha = ha

    def send(self, address: str, text: str) -> str:
        from .errors import ProviderError

        domain, _, service = (address or "notify.notify").partition(".")
        if domain != "notify" or not service:
            raise ProviderError("ha_notify address must be a notify.* service", code="bad_config", retryable=False, provider="ha_notify")
        self.ha.call_service("notify", service, {"message": text}, enforce_allowlist=False)
        return "ha_notify"
