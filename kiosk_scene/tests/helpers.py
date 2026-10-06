"""Shared helpers for add-on service tests (stdlib unittest only)."""
from __future__ import annotations

import importlib
import os
import sys
import tempfile
from contextlib import contextmanager
from pathlib import Path

ADDON_DIR = Path(__file__).resolve().parents[1]
if str(ADDON_DIR) not in sys.path:
    sys.path.insert(0, str(ADDON_DIR))


@contextmanager
def scene_env(**extra: str):
    """Point the services at a throw-away SCENE_ROOT and reload them."""
    with tempfile.TemporaryDirectory(prefix="kiosk-scene-test-") as tmp:
        root = Path(tmp) / "kiosk-scene"
        (root / "scene-packs" / "demo").mkdir(parents=True)
        (root / "avatar-packs").mkdir(parents=True)
        (root / "scene-runtime").mkdir(parents=True)
        (root / "active-pack.json").write_text('{"id": "demo"}', encoding="utf-8")
        env = {
            "SCENE_ROOT": str(root),
            "SCENE_DEFAULT_PACK_ID": "demo",
            "SCENE_EDITOR_CONFIG_PATH": "",
        }
        env.update(extra)
        saved = {key: os.environ.get(key) for key in env}
        os.environ.update(env)
        try:
            yield root
        finally:
            for key, value in saved.items():
                if value is None:
                    os.environ.pop(key, None)
                else:
                    os.environ[key] = value


def load_module(name: str):
    if name in sys.modules:
        return importlib.reload(sys.modules[name])
    return importlib.import_module(name)
