from __future__ import annotations

import json
from typing import Any

from ..errors import ValidationError
from .context import Ctx
from .outbox import OutboxService

CHANNELS = ("ui", "telegram", "speak", "ha_notify")


class DeliveryService:
    """Turns "tell X this, this way" into a durable outbox entry with a resolved address."""

    def __init__(self, outbox: OutboxService, contacts: Any, db: Any) -> None:
        self.outbox, self.contacts, self.db = outbox, contacts, db

    def send(self, ctx: Ctx, *, channel: str, recipient: str, text: str, key: str | None = None, room: str | None = None,
             mood: str | None = None) -> dict[str, Any]:
        if channel not in CHANNELS:
            raise ValidationError(f"Unknown channel {channel}", fields={"channel": f"One of {', '.join(CHANNELS)}"})
        if channel == "ui":
            with self.db.write() as conn:
                self.db.emit(conn, "notification", {"text": text, "source": ctx.source})
            return {"channel": "ui", "status": "sent"}
        if channel == "speak":
            target = {k: v for k, v in (("room", room), ("mood", mood)) if v}
            address = json.dumps(target, ensure_ascii=False)
            return self.outbox.enqueue(ctx, channel="speak", recipient=recipient or "self", address=address, text=text, key=key)
        contact = self._contact(recipient, channel)
        address = self._address(contact, channel)
        return self.outbox.enqueue(ctx, channel=channel, recipient=contact["name"], address=address, text=text, key=key)

    def _contact(self, recipient: str, channel: str) -> dict[str, Any]:
        matches = self.contacts.resolve(recipient or "self")
        if not matches:
            who = recipient if recipient and recipient != "self" else "владелец"
            raise ValidationError(f"Не знаю контакт «{who}». Добавьте его в разделе Интеграции → Контакты.", code="unknown_contact",
                                  fields={"recipient": "Unknown contact"})
        if len(matches) > 1:
            names = ", ".join(c["name"] for c in matches[:4])
            raise ValidationError(f"Уточните, кому именно: {names}", code="ambiguous_contact", fields={"recipient": "Ambiguous"})
        return matches[0]

    @staticmethod
    def _address(contact: dict[str, Any], channel: str) -> str:
        info = (contact.get("channels") or {}).get(channel)
        address = ""
        if isinstance(info, dict):
            address = str(info.get("chat_id") or info.get("service") or "")
        elif info:
            address = str(info)
        if not address:
            hint = {"telegram": "Попросите контакт написать боту /start и свяжите чат в Интеграциях",
                    "ha_notify": "Укажите сервис notify.* в контакте"}.get(channel, "Добавьте адрес в контакте")
            raise ValidationError(f"У контакта «{contact['name']}» нет адреса для {channel}. {hint}.", code="no_address",
                                  fields={"recipient": "No address"})
        return address
