"""Private owner-only Telegram frontend with durable, at-most-once command execution."""
from __future__ import annotations

import datetime as dt
import threading
from typing import Any

from ..assistant.pipeline import CommandPipeline
from ..clock import from_iso
from ..identity import display_name
from ..services.context import Ctx

UNCERTAIN = ("Обработка предыдущей команды была прервана. Часть действий могла выполниться. "
             "Я не повторяю команду автоматически: проверь результат и журнал.")


class TelegramFrontend:
    def __init__(self, app: Any) -> None:
        self.app = app
        self.pipeline = CommandPipeline(app)
        self._lock = threading.Lock()

    def poll(self) -> int:
        # One owner of the poll/claim lifecycle in this process; no new worker or timer.
        with self._lock:
            if not self.app.settings.get("telegram").get("enabled") or not self.app.telegram.configured():
                return 0
            self._recover()
            updates = self.app.telegram.get_updates(self.app.db.get_setting("telegram.offset"), timeout=0)
            handled = 0
            for update in updates:
                if not isinstance(update, dict):
                    continue
                uid = update.get("update_id")
                if type(uid) is not int or not 0 <= uid < 2**63 - 1:
                    continue
                self._handle(uid, update)
                handled += 1
            return handled

    def _help(self) -> str:
        return self.app.speech.render(
            f"Я {display_name(self.app.settings)}. Напиши, например: «Где резисторы?», "
            "«Добавь в список покупок молоко», «Напомни через 20 минут выключить духовку».\n"
            "/today — события, задачи и напоминания сегодня\n/shopping — список покупок\n/help — помощь"
        )

    def _owner(self, chat_id: str) -> bool:
        return any(contact["is_self"] and self._address(contact) == chat_id for contact in self.app.contacts.list())

    @staticmethod
    def _address(contact: dict[str, Any]) -> str:
        address = contact["channels"].get("telegram") or {}
        return str(address.get("chat_id", "")) if isinstance(address, dict) else str(address)

    def _recover(self) -> None:
        with self.app.db.read() as conn:
            rows = conn.execute("SELECT update_id, chat_id FROM telegram_updates WHERE status = 'processing'").fetchall()
        for row in rows:
            # Never re-run a claimed command: external effects cannot be rolled back with SQLite.
            address = row["chat_id"] if row["chat_id"] and self._owner(row["chat_id"]) else None
            self._finish(row["update_id"], "uncertain", address, self.app.speech.render(UNCERTAIN))

    def _handle(self, uid: int, update: dict[str, Any]) -> None:
        message = update.get("message")
        message = message if isinstance(message, dict) else {}
        chat, sender = message.get("chat"), message.get("from")
        chat = chat if isinstance(chat, dict) else {}
        sender = sender if isinstance(sender, dict) else {}
        cid = chat.get("id")
        private = (chat.get("type") == "private" and type(cid) is int and 0 < cid < 2**63
                   and type(sender.get("id")) is int and sender["id"] == cid and not sender.get("is_bot"))
        text = message.get("text")
        valid = private and isinstance(text, str) and bool(text.strip())
        address = str(cid) if valid else None
        with self.app.db.write() as conn:
            claimed = conn.execute(
                "INSERT OR IGNORE INTO telegram_updates(update_id, chat_id, status, created_at) VALUES (?,?, 'processing', ?)",
                (uid, address, self.app.clock.now_iso()),
            ).rowcount
        if not claimed:
            return
        if not valid:
            self._finish(uid, "ignored")
            return
        text = text.strip()
        command = text.split()[0].lower()
        if not self._owner(address):
            if command == "/start":
                with self.app.db.write() as conn:
                    links = list(self.app.db.get_setting("telegram.link_requests", []) or [])
                    known = any(self._address(c) == address for c in self.app.contacts.list())
                    if not known and not any(link.get("chat_id") == address for link in links):
                        links.append({"chat_id": address, "name": " ".join(v for v in
                                      (chat.get("first_name"), chat.get("last_name")) if isinstance(v, str))[:200]
                                      or str(chat.get("username") or "")[:100],
                                      "username": str(chat.get("username") or "")[:100], "at": self.app.clock.now_iso()})
                        self.app.db.set_setting("telegram.link_requests", links[-20:])
                        self.app.db.emit(conn, "contacts.changed", {"link_requests": len(links)})
                    self._finish(uid, "paired", address, self.app.speech.render(
                        "Для команд владелец должен связать этот личный чат с контактом «Я» в Интеграциях → Контакты."))
            else:
                self._finish(uid, "ignored")
            return
        if command in ("/start", "/help"):
            reply = self._help()
        elif command == "/today":
            reply = self._today()
        elif command == "/shopping":
            reply = self.pipeline.handle("что в списке покупок", frontend="telegram", session_id=f"telegram:{address}")["reply"]
        elif command.startswith("/"):
            reply = "Неизвестная команда. " + self._help()
        else:
            reply = self.pipeline.handle(text, frontend="telegram", session_id=f"telegram:{address}")["reply"]
        self._finish(uid, "done", address, reply)

    def _finish(self, uid: int, status: str, address: str | None = None, reply: str = "") -> None:
        with self.app.db.write() as conn:
            if address and reply:
                self.app.outbox.enqueue(Ctx(actor="system", source="telegram"), channel="telegram", recipient="self",
                                        address=address, text=reply, key=f"telegram:update:{uid}:reply")
            conn.execute("UPDATE telegram_updates SET status = ?, completed_at = ? WHERE update_id = ?",
                         (status, self.app.clock.now_iso(), uid))
            offset = self.app.db.get_setting("telegram.offset", 0) or 0
            self.app.db.set_setting("telegram.offset", max(offset, uid + 1))

    def _today(self) -> str:
        start = self.app.clock.local_now().replace(hour=0, minute=0, second=0, microsecond=0)
        calendar = self.app.calendar.list_events(start, start + dt.timedelta(days=1))
        lines = ["Сегодня:"] + [("Весь день" if event.get("all_day") else
                                 from_iso(event["start"]).astimezone(self.app.clock.tz).strftime("%H:%M"))
                                + " — " + event["title"] for event in calendar["events"][:12]]
        if not calendar["events"]:
            lines.append("Событий нет.")
        lines.extend("Предупреждение: " + str(warning) for warning in calendar["warnings"])
        lines.extend("Задача: " + task["title"] for task in self.app.tasks.list(
            exclude_list="shopping", due_through=start.date().isoformat(), limit=12))
        lines.extend("Напоминание: " + reminder["text"] for reminder in self.app.reminders.list(states=["pending"], limit=100)
                     if reminder.get("due_at") and from_iso(reminder["due_at"]).astimezone(self.app.clock.tz).date() == start.date())
        return "\n".join(lines)
