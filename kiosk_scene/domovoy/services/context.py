from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class Ctx:
    """Who is doing this and why; recorded in every audit row."""

    actor: str = "user"          # user | assistant | system
    source: str = "ui"           # ui | alice | assist | telegram | scheduler | import | ...
    command_id: int | None = None

    def with_command(self, command_id: int | None) -> "Ctx":
        return Ctx(self.actor, self.source, command_id)


SYSTEM = Ctx(actor="system", source="system")
