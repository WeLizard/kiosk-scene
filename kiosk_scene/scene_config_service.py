#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
import logging
import math
import os
import re
import tempfile
import threading
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any
from urllib.parse import urlsplit


HOST = os.environ.get("SCENE_EDITOR_HOST", "127.0.0.1")
PORT = int(os.environ.get("SCENE_EDITOR_PORT", "48098"))
PATH_PREFIX = "/scene-editor"
PATH_PREFIX = os.environ.get("SCENE_EDITOR_PATH_PREFIX", PATH_PREFIX).rstrip("/")
SCENE_ROOT = Path(os.environ.get("SCENE_ROOT", "/config/kiosk-scene"))
PACKS_DIR = Path(os.environ.get("SCENE_PACKS_DIR", str(SCENE_ROOT / "scene-packs")))
ACTIVE_PACK_FILE = Path(
    os.environ.get("SCENE_ACTIVE_PACK_FILE", str(SCENE_ROOT / "active-pack.json"))
)
DEFAULT_PACK_ID = os.environ.get("SCENE_DEFAULT_PACK_ID", "neiri").strip() or "neiri"
EXPLICIT_SCENE_CONFIG_PATH = os.environ.get("SCENE_EDITOR_CONFIG_PATH", "").strip()
DISPLAY_SCENE_CONFIG_FILENAME = "scene.display.json"
MAX_CONFIG_BODY_BYTES = int(os.environ.get("SCENE_EDITOR_MAX_BODY_BYTES", str(2 * 1024 * 1024)))
_config_write_lock = threading.Lock()
SAFE_PACK_ID_RE = re.compile(r"^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$")


class ScenePackChangedError(RuntimeError):
    pass


LEGACY_SCENE_CONFIG_PATHS = (
    Path("/config/www/neiri-scene/scene.default.json"),
    Path("/config/www/live2d/neiri-slides.json"),
    Path("/config/haoskiosk/display-config.json"),
)

DEFAULT_SCENE_CONFIG: dict[str, Any] = {
    "version": 1,
    "rotation": {
        "order": ["page-1"],
        "defaultDwellSeconds": 18,
    },
    "display": {
        "safeArea": {
            "top": 0,
            "right": 0,
            "bottom": 0,
            "left": 0,
        },
        "layoutPaddingPx": 16,
        "layoutGapPx": 16,
        "globalScale": 1,
    },
    "avatar": {
        "packId": None,
    },
    "pages": [
        {
            "id": "page-1",
            "kind": "cards",
            "title": "Overview",
            "subtitle": "Add dashboard cards here",
            "cards": [],
        }
    ],
}



def normalize_scene_config(config: Any) -> dict[str, Any]:
    if not isinstance(config, dict):
        raise ValueError("Scene config must be a JSON object")
    return config


def trim_text(value: Any, fallback: str = "", limit: int = 120) -> str:
    normalized = str(value or "").strip()
    if not normalized:
        return fallback
    return normalized[:limit]


def normalize_non_negative_number(value: Any, fallback: int) -> int:
    try:
        numeric = float(value)
    except (TypeError, ValueError):
        return fallback
    if not math.isfinite(numeric):
        return fallback
    return max(0, int(math.floor(numeric + 0.5)))  # half-up, like JS Math.round


def normalize_display_scale(value: Any, fallback: float = 1.0) -> float:
    try:
        numeric = float(value)
    except (TypeError, ValueError):
        return fallback
    if not math.isfinite(numeric):
        return fallback
    return min(1.0, max(0.75, numeric))


def clone_json(value: Any) -> Any:
    return parse_json(json.dumps(value, ensure_ascii=False))


def parse_json(text: str) -> Any:
    def reject_constant(value: str) -> None:
        raise ValueError(f"Non-finite JSON number is not allowed: {value}")

    return json.loads(text, parse_constant=reject_constant)


def sanitize_page(page: Any, index: int, used_ids: set[str]) -> dict[str, Any]:
    payload = clone_json(page) if isinstance(page, dict) else {}
    raw_id = trim_text(payload.get("id"), f"page-{index + 1}", 40)
    page_id = raw_id
    suffix = 2
    while page_id in used_ids:
        page_id = f"{raw_id}-{suffix}"
        suffix += 1
    used_ids.add(page_id)

    kind = trim_text(payload.get("kind"), "cards", 24)
    if kind not in ("overview", "cards", "forecast+cards", "grid", "app"):
        kind = "cards"
    card_style = trim_text(payload.get("cardStyle"), "full", 16)
    if card_style not in ("mini", "full"):
        card_style = "full"

    normalized = payload
    normalized["id"] = page_id
    normalized["kind"] = kind
    normalized["cardStyle"] = card_style
    normalized["title"] = trim_text(payload.get("title"), page_id, 120)

    subtitle = trim_text(payload.get("subtitle"), "", 240)
    if subtitle:
        normalized["subtitle"] = subtitle
    else:
        normalized.pop("subtitle", None)

    stamp_caption = trim_text(payload.get("stampCaption"), "", 60)
    if stamp_caption:
        normalized["stampCaption"] = stamp_caption
    else:
        normalized.pop("stampCaption", None)

    stamp_value = trim_text(payload.get("stampValue"), "", 120)
    if stamp_value:
        normalized["stampValue"] = stamp_value
    else:
        normalized.pop("stampValue", None)

    if isinstance(payload.get("slot"), (int, float)) or str(payload.get("slot") or "").strip():
        try:
            normalized["slot"] = max(0, int(float(payload.get("slot"))))
        except (TypeError, ValueError):
            normalized.pop("slot", None)
    else:
        normalized.pop("slot", None)

    grid_cols = payload.get("gridColumns")
    if isinstance(grid_cols, (int, float)):
        normalized["gridColumns"] = max(1, min(12, int(grid_cols)))
    else:
        normalized.pop("gridColumns", None)

    grid_rows = payload.get("gridRows")
    if isinstance(grid_rows, (int, float)):
        normalized["gridRows"] = max(1, min(12, int(grid_rows)))
    else:
        normalized.pop("gridRows", None)

    cards = payload.get("cards")
    if isinstance(cards, list):
        normalized["cards"] = [clone_json(card) for card in cards if isinstance(card, dict)]
    else:
        normalized.pop("cards", None)
    return normalized


def order_pages(pages: list[dict[str, Any]], order: list[str]) -> list[dict[str, Any]]:
    by_id = {str(page.get("id") or ""): page for page in pages}
    ordered: list[dict[str, Any]] = []
    seen: set[str] = set()
    for page_id in order:
        page = by_id.get(page_id)
        if page is not None and page_id not in seen:
            ordered.append(page)
            seen.add(page_id)
    for page in pages:
        page_id = str(page.get("id") or "")
        if page_id not in seen:
            ordered.append(page)
            seen.add(page_id)
    return ordered


def compile_scene_display_config(config: dict[str, Any]) -> dict[str, Any]:
    payload = normalize_scene_config(config)
    rotation = payload.get("rotation") if isinstance(payload.get("rotation"), dict) else {}
    display = payload.get("display") if isinstance(payload.get("display"), dict) else {}
    safe_area = display.get("safeArea") if isinstance(display.get("safeArea"), dict) else {}
    avatar = payload.get("avatar") if isinstance(payload.get("avatar"), dict) else {}

    raw_pages = payload.get("pages") if isinstance(payload.get("pages"), list) else []
    if not raw_pages:
        raw_pages = DEFAULT_SCENE_CONFIG["pages"]

    used_ids: set[str] = set()
    pages = [sanitize_page(page, index, used_ids) for index, page in enumerate(raw_pages)]

    raw_order = [
        trim_text(item, "", 40)
        for item in (rotation.get("order") if isinstance(rotation.get("order"), list) else [])
        if trim_text(item, "", 40)
    ]
    order = [
        page_id
        for page_id in raw_order
        if any(page.get("id") == page_id for page in pages)
    ]
    if not order:
        order = [str(page.get("id") or "") for page in pages]
    ordered_pages = order_pages(pages, order)

    try:
        dwell_seconds = float(rotation.get("defaultDwellSeconds", DEFAULT_SCENE_CONFIG["rotation"]["defaultDwellSeconds"]))
    except (TypeError, ValueError):
        dwell_seconds = float(DEFAULT_SCENE_CONFIG["rotation"]["defaultDwellSeconds"])
    if not math.isfinite(dwell_seconds):
        dwell_seconds = float(DEFAULT_SCENE_CONFIG["rotation"]["defaultDwellSeconds"])
    dwell_ms = max(5000, int(math.floor(dwell_seconds * 1000 + 0.5)))

    pack_id = avatar.get("packId")
    normalized_pack_id = trim_text(pack_id, "", 120) if isinstance(pack_id, str) else ""

    return {
        "version": 1,
        "kind": "scene.display",
        "rotation": {
            "order": [str(page.get("id") or "") for page in ordered_pages],
            "defaultDwellMs": dwell_ms,
        },
        "display": {
            "safeAreaPx": {
                "top": normalize_non_negative_number(safe_area.get("top"), 0),
                "right": normalize_non_negative_number(safe_area.get("right"), 0),
                "bottom": normalize_non_negative_number(safe_area.get("bottom"), 0),
                "left": normalize_non_negative_number(safe_area.get("left"), 0),
            },
            "layoutPaddingPx": normalize_non_negative_number(display.get("layoutPaddingPx"), 16),
            "layoutGapPx": normalize_non_negative_number(display.get("layoutGapPx"), 16),
            "globalScale": normalize_display_scale(display.get("globalScale"), 1.0),
        },
        "avatar": {
            "packId": normalized_pack_id or None,
        },
        "pages": ordered_pages,
    }


def load_active_pack_id() -> str:
    if ACTIVE_PACK_FILE.exists():
        try:
            payload = json.loads(ACTIVE_PACK_FILE.read_text(encoding="utf-8"))
            value = str(payload.get("id", "")).strip()
            if value and SAFE_PACK_ID_RE.match(value) and ".." not in value:
                return value
        except Exception as exc:
            logging.warning("Failed to read %s: %s", ACTIVE_PACK_FILE, exc)
    return DEFAULT_PACK_ID if SAFE_PACK_ID_RE.match(DEFAULT_PACK_ID) and ".." not in DEFAULT_PACK_ID else "neiri"


def resolve_primary_scene_config_path() -> Path:
    if EXPLICIT_SCENE_CONFIG_PATH:
        return Path(EXPLICIT_SCENE_CONFIG_PATH)
    return PACKS_DIR / load_active_pack_id() / "scene.default.json"


def resolve_display_scene_config_path(primary_path: Path) -> Path:
    return primary_path.with_name(DISPLAY_SCENE_CONFIG_FILENAME)


def serialize_json(payload: Any) -> str:
    return json.dumps(payload, ensure_ascii=False, indent=2) + "\n"


def write_text_atomic(path: Path, text: str) -> None:
    """Write via a unique temp file in the same directory, fsync, then rename."""
    path.parent.mkdir(parents=True, exist_ok=True)
    handle, temp_name = tempfile.mkstemp(prefix=path.name + ".", suffix=".tmp", dir=str(path.parent))
    try:
        with os.fdopen(handle, "w", encoding="utf-8", newline="\n") as stream:
            stream.write(text)
            stream.flush()
            os.fsync(stream.fileno())
        os.replace(temp_name, path)
    except BaseException:
        try:
            os.unlink(temp_name)
        except OSError:
            pass
        raise


def write_json_atomic(path: Path, payload: Any) -> None:
    write_text_atomic(path, serialize_json(payload))


def source_digest(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def resolve_legacy_scene_config_paths(primary_path: Path) -> tuple[Path, ...]:
    paths: list[Path] = []
    for candidate in LEGACY_SCENE_CONFIG_PATHS:
        if candidate == primary_path or candidate in paths:
            continue
        paths.append(candidate)
    return tuple(paths)




def load_scene_config() -> tuple[dict[str, Any], Path, str | None]:
    """Read-only: never touches the pack directory."""
    primary_path = resolve_primary_scene_config_path()
    if primary_path.exists():
        config = normalize_scene_config(
            parse_json(primary_path.read_text(encoding="utf-8"))
        )
        return config, primary_path, None

    for legacy_path in resolve_legacy_scene_config_paths(primary_path):
        if legacy_path.exists():
            config = normalize_scene_config(
                parse_json(legacy_path.read_text(encoding="utf-8"))
            )
            return config, primary_path, str(legacy_path)

    return normalize_scene_config(clone_json(DEFAULT_SCENE_CONFIG)), primary_path, None


def save_scene_config(config: Any, expected_pack_id: str | None = None) -> tuple[dict[str, Any], Path]:
    normalized = normalize_scene_config(config)
    source_text = serialize_json(normalized)
    # Compile first: if the payload cannot be compiled nothing is written.
    display = compile_scene_display_config(normalized)
    display["sourceSha256"] = source_digest(source_text)
    with _config_write_lock:
        active_pack_id = load_active_pack_id()
        if expected_pack_id is not None and active_pack_id != expected_pack_id:
            raise ScenePackChangedError(f"Active scene changed from {expected_pack_id} to {active_pack_id}.")
        primary_path = Path(EXPLICIT_SCENE_CONFIG_PATH) if EXPLICIT_SCENE_CONFIG_PATH else PACKS_DIR / active_pack_id / "scene.default.json"
        if not EXPLICIT_SCENE_CONFIG_PATH and primary_path.parent.is_symlink():
            raise ValueError("Active scene pack directory cannot be a symlink.")
        if primary_path.exists():
            write_text_atomic(
                primary_path.with_name(primary_path.name + ".bak"),
                primary_path.read_text(encoding="utf-8"),
            )
        write_text_atomic(primary_path, source_text)
        write_json_atomic(resolve_display_scene_config_path(primary_path), display)
    return normalized, primary_path


class SceneConfigHandler(BaseHTTPRequestHandler):
    server_version = "KioskSceneEditor/1.0"

    def log_message(self, fmt: str, *args: Any) -> None:
        logging.info("%s - %s", self.address_string(), fmt % args)

    def send_json(self, payload: dict[str, Any], status: HTTPStatus = HTTPStatus.OK) -> None:
        body = json.dumps(payload, ensure_ascii=False, indent=2).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)



    def read_json_body(self) -> Any:
        try:
            length = int(self.headers.get("Content-Length", "0") or "0")
        except ValueError as exc:
            raise ValueError("Invalid Content-Length header") from exc
        if length < 0:
            raise ValueError("Invalid Content-Length header")
        if length > MAX_CONFIG_BODY_BYTES:
            raise OverflowError(f"Request body is too large ({length} > {MAX_CONFIG_BODY_BYTES})")
        raw = self.rfile.read(length) if length else b"{}"
        if not raw:
            raw = b"{}"
        return parse_json(raw.decode("utf-8"))

    def scene_admin_allowed(self) -> bool:
        return self.headers.get("X-Scene-Admin") == "1" and bool(self.headers.get("X-Scene-Client"))

    def scene_admin_source_allowed(self) -> bool:
        return self.headers.get("X-Scene-Admin") == "1"

    def do_GET(self) -> None:
        path = urlsplit(self.path).path
        if path == "/health":
            primary_path = resolve_primary_scene_config_path()
            self.send_json(
                {
                    "status": "ok",
                    "path": str(primary_path),
                    "activePackId": load_active_pack_id(),
                }
            )
            return
        if not self.scene_admin_source_allowed():
            self.send_json(
                {"success": False, "error": "Admin access required."},
                status=HTTPStatus.FORBIDDEN,
            )
            return
        if path in (PATH_PREFIX, PATH_PREFIX + "/"):
            # The native TypeScript editor is canonical; keep this URL as a redirect for old links.
            self.send_response(HTTPStatus.FOUND)
            self.send_header("Location", "../scene-editor/")
            self.send_header("Cache-Control", "no-store")
            self.send_header("Content-Length", "0")
            self.end_headers()
            return
        if path == PATH_PREFIX + "/api/config":
            try:
                config, primary_path, loaded_from = load_scene_config()
                self.send_json(
                    {
                        "success": True,
                        "config": config,
                        "path": str(primary_path),
                        "packId": load_active_pack_id() if EXPLICIT_SCENE_CONFIG_PATH else primary_path.parent.name,
                        "loadedFrom": loaded_from,
                    }
                )
            except Exception as exc:
                logging.exception("Failed to load scene config: %s", exc)
                self.send_json(
                    {"success": False, "error": str(exc)},
                    status=HTTPStatus.INTERNAL_SERVER_ERROR,
                )
            return
        self.send_json(
            {"success": False, "error": f"Endpoint not found: {path}"},
            status=HTTPStatus.NOT_FOUND,
        )

    def do_POST(self) -> None:
        path = urlsplit(self.path).path
        if not self.scene_admin_allowed():
            self.send_json(
                {"success": False, "error": "Admin access required."},
                status=HTTPStatus.FORBIDDEN,
            )
            return
        content_type = (self.headers.get("Content-Type") or "").split(";")[0].strip().lower()
        if content_type != "application/json":
            self.send_json(
                {"success": False, "error": "Content-Type must be application/json."},
                status=HTTPStatus.UNSUPPORTED_MEDIA_TYPE,
            )
            return
        if path != PATH_PREFIX + "/api/config":
            self.send_json(
                {"success": False, "error": f"Endpoint not found: {path}"},
                status=HTTPStatus.NOT_FOUND,
            )
            return
        try:
            payload = self.read_json_body()
        except OverflowError as exc:
            self.send_json(
                {"success": False, "error": str(exc)},
                status=HTTPStatus.REQUEST_ENTITY_TOO_LARGE,
            )
            return
        except (json.JSONDecodeError, UnicodeDecodeError, ValueError):
            self.send_json(
                {"success": False, "error": "Invalid JSON payload"},
                status=HTTPStatus.BAD_REQUEST,
            )
            return

        try:
            if not isinstance(payload, dict) or not isinstance(payload.get("expectedPackId"), str):
                raise ValueError("Missing expectedPackId.")
            config, primary_path = save_scene_config(payload.get("config"), payload["expectedPackId"])
            self.send_json(
                {
                    "success": True,
                    "config": config,
                    "path": str(primary_path),
                    "packId": load_active_pack_id() if EXPLICIT_SCENE_CONFIG_PATH else primary_path.parent.name,
                }
            )
        except ScenePackChangedError as exc:
            self.send_json(
                {"success": False, "error": str(exc), "packId": load_active_pack_id()},
                status=HTTPStatus.CONFLICT,
            )
        except ValueError as exc:
            self.send_json(
                {"success": False, "error": str(exc)},
                status=HTTPStatus.BAD_REQUEST,
            )
        except Exception as exc:
            logging.exception("Failed to save scene config: %s", exc)
            self.send_json(
                {"success": False, "error": str(exc)},
                status=HTTPStatus.INTERNAL_SERVER_ERROR,
            )


def main() -> None:
    logging.basicConfig(
        level=logging.INFO,
        format="[%(asctime)s] %(levelname)s: %(message)s",
        datefmt="%H:%M:%S",
    )
    server = ThreadingHTTPServer((HOST, PORT), SceneConfigHandler)
    logging.info(
        "Starting scene config service on http://%s:%s for %s",
        HOST,
        PORT,
        resolve_primary_scene_config_path(),
    )
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
