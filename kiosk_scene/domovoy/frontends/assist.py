"""Home Assistant Assist / automation entry point.

HA calls this from a sentence-trigger automation (`домовой {text}`) through `rest_command`, then speaks the returned
`reply` through the Assist pipeline (or onto a station). The payload is deliberately tiny and stable.
"""
from __future__ import annotations

from typing import Any

from ..errors import ValidationError


class AssistFrontend:
    def __init__(self, voice: Any) -> None:
        self.voice = voice

    def handle(self, payload: dict[str, Any]) -> dict[str, Any]:
        text = str(payload.get("text") or "").strip()
        if not text:
            raise ValidationError("text is required", fields={"text": "Required"})
        room = str(payload.get("room") or payload.get("area") or "")
        session_id = f"assist:{payload.get('conversation_id') or payload.get('device_id') or 'default'}"
        speak = bool(payload.get("speak", False))
        result = self.voice.handle_transcript(text, room=room, session_id=session_id, require_trigger=False, source="assist",
                                              reply_mode="speak" if speak else "text")
        reply = result.get("reply", "")
        return {
            "reply": reply, "status": result.get("status"), "command_id": result.get("command_id"),
            "conversation_id": payload.get("conversation_id"), "spoken": result.get("spoken", False),
            # shape HA's conversation agent responses use, so a custom agent can pass it straight through
            "response": {"speech": {"plain": {"speech": reply}}, "response_type": "action_done" if result.get("status") in ("applied", "answered") else "error"},
        }
