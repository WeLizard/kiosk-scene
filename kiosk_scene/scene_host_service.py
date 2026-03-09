#!/usr/bin/env python3
from __future__ import annotations

import json
import logging
import os
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any
from urllib.parse import quote, urlsplit


HOST = os.environ.get("SCENE_HOST_BIND", "127.0.0.1")
PORT = int(os.environ.get("SCENE_HOST_PORT", "48097"))
PATH_PREFIX = os.environ.get("SCENE_API_PREFIX", "/scene-api").rstrip("/")
SCENE_ROOT = Path(os.environ.get("SCENE_ROOT", "/config/kiosk-scene"))
RUNTIME_DIR = Path(
    os.environ.get("SCENE_RUNTIME_DIR", str(SCENE_ROOT / "scene-runtime"))
)
PACKS_DIR = Path(os.environ.get("SCENE_PACKS_DIR", str(SCENE_ROOT / "scene-packs")))
AVATAR_PACKS_DIR = Path(
    os.environ.get("SCENE_AVATAR_PACKS_DIR", str(SCENE_ROOT / "avatar-packs"))
)
ACTIVE_PACK_FILE = Path(
    os.environ.get("SCENE_ACTIVE_PACK_FILE", str(SCENE_ROOT / "active-pack.json"))
)
DEFAULT_PACK_ID = os.environ.get("SCENE_DEFAULT_PACK_ID", "neiri").strip() or "neiri"


def load_active_pack_id() -> str:
    if ACTIVE_PACK_FILE.exists():
        try:
            payload = json.loads(ACTIVE_PACK_FILE.read_text(encoding="utf-8"))
            value = str(payload.get("id", "")).strip()
            if value:
                return value
        except Exception as exc:
            logging.warning("Failed to read %s: %s", ACTIVE_PACK_FILE, exc)
    return DEFAULT_PACK_ID


def build_bootstrap() -> dict[str, Any]:
    pack_id = load_active_pack_id()
    pack_dir = PACKS_DIR / pack_id
    pack_base_url = f"/scene-packs/{quote(pack_id)}/"
    return {
        "success": True,
        "packId": pack_id,
        "entryUrl": "/scene-runtime/",
        "runtimeBaseUrl": "/scene-runtime/",
        "packBaseUrl": pack_base_url,
        "apiBaseUrl": f"{PATH_PREFIX}/",
        "sceneEditorUrl": "/scene-editor/",
        "sceneEditorFormUrl": "/scene-editor-form/",
        "sceneEditorApiUrl": "/scene-editor-form/api/config",
        "files": {
            "rendererConfigUrl": pack_base_url + "renderer.kiosk-scene.json",
            "sceneConfigUrl": pack_base_url + "scene.default.json",
            "entityMapUrl": pack_base_url + "entity-map.json",
            "avatarManifestUrl": pack_base_url + "avatar.manifest.json",
            "avatarCatalogUrl": f"{PATH_PREFIX}/avatar-catalog",
        },
        "availability": {
            "runtimeIndex": (RUNTIME_DIR / "index.html").exists(),
            "packDir": pack_dir.exists(),
            "rendererConfig": (pack_dir / "renderer.kiosk-scene.json").exists(),
            "sceneConfig": (pack_dir / "scene.default.json").exists(),
            "entityMap": (pack_dir / "entity-map.json").exists(),
            "avatarManifest": (pack_dir / "avatar.manifest.json").exists(),
            "avatarPacksDir": AVATAR_PACKS_DIR.exists(),
        },
        "paths": {
            "runtimeDir": str(RUNTIME_DIR),
            "packsDir": str(PACKS_DIR),
            "avatarPacksDir": str(AVATAR_PACKS_DIR),
            "activePackFile": str(ACTIVE_PACK_FILE),
            "packDir": str(pack_dir),
        },
    }


def _resolve_avatar_asset_url(pack_id: str, value: str, asset_root: str = "") -> str:
    normalized = str(value or "").strip()
    if not normalized:
        return ""
    if normalized.startswith("/") or "://" in normalized:
        return normalized
    root = str(asset_root or "").strip()
    if root and not (root.startswith("/") or "://" in root):
        root = f"/avatar-packs/{quote(pack_id)}/{quote(root, safe='/')}"
    elif not root:
        root = f"/avatar-packs/{quote(pack_id)}"
    root = root.rstrip("/")
    return f"{root}/{quote(normalized, safe='/')}"


def load_avatar_catalog() -> dict[str, Any]:
    packs: list[dict[str, Any]] = []
    if not AVATAR_PACKS_DIR.exists():
        return {
            "success": True,
            "items": packs,
            "root": str(AVATAR_PACKS_DIR),
        }

    for pack_dir in sorted(
        [item for item in AVATAR_PACKS_DIR.iterdir() if item.is_dir()],
        key=lambda item: item.name.lower(),
    ):
        manifest_path = pack_dir / "avatar.manifest.json"
        if not manifest_path.exists():
            continue
        try:
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        except Exception as exc:
            logging.warning("Failed to read avatar pack manifest %s: %s", manifest_path, exc)
            continue

        pack_id = pack_dir.name
        asset_root = str(manifest.get("assetRoot") or "").strip()
        fallback_portrait = _resolve_avatar_asset_url(
            pack_id, str(manifest.get("fallbackPortrait", "")), asset_root
        )
        packs.append(
            {
                "id": pack_id,
                "name": str(manifest.get("name") or pack_id),
                "adapter": str(manifest.get("adapter") or ""),
                "manifestUrl": f"/avatar-packs/{quote(pack_id)}/avatar.manifest.json",
                "previewUrl": fallback_portrait,
                "fallbackPortrait": fallback_portrait,
            }
        )

    return {
        "success": True,
        "items": packs,
        "root": str(AVATAR_PACKS_DIR),
    }


class SceneHostHandler(BaseHTTPRequestHandler):
    server_version = "KioskSceneHost/1.0"

    def log_message(self, fmt: str, *args: Any) -> None:
        logging.info("%s - %s", self.address_string(), fmt % args)

    def send_json(
        self, payload: dict[str, Any], status: HTTPStatus = HTTPStatus.OK
    ) -> None:
        body = json.dumps(payload, ensure_ascii=False, indent=2).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self) -> None:
        path = urlsplit(self.path).path.rstrip("/") or "/"
        if path == "/health":
            self.send_json(
                {
                    "status": "ok",
                    "sceneRoot": str(SCENE_ROOT),
                    "runtimeDir": str(RUNTIME_DIR),
                    "packsDir": str(PACKS_DIR),
                    "activePackId": load_active_pack_id(),
                }
            )
            return
        if path == f"{PATH_PREFIX}/bootstrap":
            self.send_json(build_bootstrap())
            return
        if path == f"{PATH_PREFIX}/avatar-catalog":
            self.send_json(load_avatar_catalog())
            return
        self.send_json(
            {"success": False, "error": f"Endpoint not found: {path}"},
            status=HTTPStatus.NOT_FOUND,
        )


def main() -> None:
    logging.basicConfig(
        level=logging.INFO,
        format="[%(asctime)s] %(levelname)s: %(message)s",
        datefmt="%H:%M:%S",
    )
    server = ThreadingHTTPServer((HOST, PORT), SceneHostHandler)
    logging.info(
        "Starting scene host service on http://%s:%s for %s",
        HOST,
        PORT,
        SCENE_ROOT,
    )
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
