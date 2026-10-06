from __future__ import annotations

import datetime as dt
import tempfile
import unittest
from pathlib import Path
from zoneinfo import ZoneInfo

from ..helpers import ADDON_DIR  # noqa: F401  (puts the add-on dir on sys.path)
from domovoy.app import Domovoy
from domovoy.assistant.pipeline import CommandPipeline
from domovoy.assistant.voice import VoiceGateway
from domovoy.clock import FixedClock
from domovoy.config import Settings

TZ = ZoneInfo("Europe/Sofia")


class AppCase(unittest.TestCase):
    """Fresh on-disk database + fake clock (Monday 28 Sep 2026, 10:00 Sofia) per test."""

    def setUp(self) -> None:
        self._tmp = tempfile.TemporaryDirectory(prefix="domovoy-test-")
        self.addCleanup(self._tmp.cleanup)
        self.data_dir = Path(self._tmp.name)
        self.clock = FixedClock(dt.datetime(2026, 9, 28, 10, 0, tzinfo=TZ), tz="Europe/Sofia")
        self.build()

    def build(self, **kwargs) -> None:
        self.app = Domovoy(Settings(data_dir=self.data_dir, timezone="Europe/Sofia"), clock=self.clock, **kwargs)
        self.pipeline = CommandPipeline(self.app)
        self.voice = VoiceGateway(self.app, self.pipeline)
        self.addCleanup(self.app.close)

    def restart(self, **kwargs) -> None:
        """Simulate a process restart: close everything and reopen the same data directory."""
        self.app.close()
        self.build(**kwargs)

    def say(self, text: str, session: str = "t") -> dict:
        return self.pipeline.handle(text, session_id=session)
