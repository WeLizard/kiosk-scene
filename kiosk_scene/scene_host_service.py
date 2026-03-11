#!/usr/bin/env python3
from __future__ import annotations

import base64
import email.policy
import hashlib
import json
import logging
import os
import shutil
import socket
import stat
import tempfile
import threading
import time
import zipfile
import uuid
from email.parser import BytesParser
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path, PurePosixPath
from typing import Any
from urllib.parse import parse_qs, quote, urlsplit, urlunsplit
from urllib.request import Request, urlopen

try:
    from scene_config_service import (
        compile_scene_display_config as compile_editor_scene_display_config,
        normalize_scene_config as normalize_editor_scene_config,
        write_json_atomic as write_editor_scene_json_atomic,
    )
except Exception:
    compile_editor_scene_display_config = None
    normalize_editor_scene_config = None
    write_editor_scene_json_atomic = None


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
DISPLAY_SCENE_CONFIG_FILENAME = "scene.display.json"
MAX_AVATAR_IMPORT_BYTES = int(
    os.environ.get("SCENE_AVATAR_IMPORT_MAX_BYTES", str(256 * 1024 * 1024))
)
MAX_AVATAR_IMPORT_FILES = int(os.environ.get("SCENE_AVATAR_IMPORT_MAX_FILES", "2048"))
SHARED_AVATAR_RUNTIME_URL = (
    os.environ.get("SCENE_SHARED_AVATAR_RUNTIME_URL", "../../scene-runtime/avatar.html").strip()
    or "../../scene-runtime/avatar.html"
)
SHARED_PRESET_BASE_URL = (
    os.environ.get("SCENE_SHARED_PRESET_BASE_URL", "../../scene-runtime/assets").strip()
    or "../../scene-runtime/assets"
)
AVATAR_UPLOADS_DIR = SCENE_ROOT / ".avatar-upload-sessions"
HOME_ASSISTANT_API_URL = (
    os.environ.get("SCENE_HOME_ASSISTANT_API_URL", "http://supervisor/core/api").strip().rstrip("/")
    or "http://supervisor/core/api"
)
HOME_ASSISTANT_WS_URL = (
    os.environ.get("SCENE_HOME_ASSISTANT_WS_URL", "").strip()
)
HOME_ASSISTANT_STATES_CACHE_TTL_MS = max(
    250,
    int(os.environ.get("SCENE_HA_STATES_CACHE_TTL_MS", "2000") or "2000"),
)
WEATHER_ENTITY_ID = (
    os.environ.get("SCENE_WEATHER_ENTITY_ID", "weather.forecast_home_assistant").strip()
    or "weather.forecast_home_assistant"
)
HOME_ASSISTANT_STREAM_POLL_SEC = max(
    0.5,
    float(os.environ.get("SCENE_HA_STATES_STREAM_POLL_SEC", "1.0") or "1.0"),
)
HOME_ASSISTANT_STREAM_KEEPALIVE_SEC = max(
    5.0,
    float(os.environ.get("SCENE_HA_STATES_STREAM_KEEPALIVE_SEC", "15.0") or "15.0"),
)
HOME_ASSISTANT_WS_RETRY_SEC = max(
    2.0,
    float(os.environ.get("SCENE_HA_WS_RETRY_SEC", "5.0") or "5.0"),
)

_ha_states_cache_lock = threading.Lock()
_ha_states_cache_at = 0.0
_ha_states_cache: list[dict[str, Any]] | None = None
_ha_states_generation = 0
_ha_states_condition = threading.Condition(_ha_states_cache_lock)
_ha_ws_listener_started = False
_ha_ws_snapshot_ready = False
_ha_all_states_by_entity: dict[str, dict[str, Any]] = {}
HOME_ASSISTANT_TOKEN_PATHS = (
    Path("/run/s6/container_environment/SUPERVISOR_TOKEN"),
    Path("/run/s6/container_environment/HASSIO_TOKEN"),
)


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


def ensure_display_scene_config(pack_id: str | None = None) -> None:
    if (
        compile_editor_scene_display_config is None
        or normalize_editor_scene_config is None
        or write_editor_scene_json_atomic is None
    ):
        return
    resolved_pack_id = str(pack_id or load_active_pack_id()).strip() or DEFAULT_PACK_ID
    pack_dir = PACKS_DIR / resolved_pack_id
    primary_path = pack_dir / "scene.default.json"
    display_path = pack_dir / DISPLAY_SCENE_CONFIG_FILENAME
    if not primary_path.exists():
        return
    try:
        payload = json.loads(primary_path.read_text(encoding="utf-8"))
        normalized = normalize_editor_scene_config(payload)
        compiled = compile_editor_scene_display_config(normalized)
        serialized = json.dumps(compiled, ensure_ascii=False, separators=(",", ":"), sort_keys=True)
        current = ""
        if display_path.exists():
            try:
                current = json.dumps(
                    json.loads(display_path.read_text(encoding="utf-8")),
                    ensure_ascii=False,
                    separators=(",", ":"),
                    sort_keys=True,
                )
            except Exception:
                current = ""
        if serialized != current:
            write_editor_scene_json_atomic(display_path, compiled)
    except Exception as exc:
        logging.warning("Failed to refresh display scene config for %s: %s", resolved_pack_id, exc)


def resolve_runtime_scene_config_name(pack_dir: Path) -> str:
    display_config_path = pack_dir / DISPLAY_SCENE_CONFIG_FILENAME
    if display_config_path.exists():
        return DISPLAY_SCENE_CONFIG_FILENAME
    return "scene.default.json"


def build_bootstrap() -> dict[str, Any]:
    pack_id = load_active_pack_id()
    ensure_display_scene_config(pack_id)
    pack_dir = PACKS_DIR / pack_id
    pack_base_url = f"/scene-packs/{quote(pack_id)}/"
    runtime_scene_config_name = resolve_runtime_scene_config_name(pack_dir)
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
            "sceneConfigUrl": pack_base_url + runtime_scene_config_name,
            "entityMapUrl": pack_base_url + "entity-map.json",
            "avatarManifestUrl": pack_base_url + "avatar.manifest.json",
            "haStatesUrl": f"{PATH_PREFIX}/ha-states",
            "haStatesStreamUrl": f"{PATH_PREFIX}/ha-states-stream",
            "avatarCatalogUrl": f"{PATH_PREFIX}/avatar-catalog",
            "avatarImportUrl": f"{PATH_PREFIX}/avatar-import",
            "avatarPackApiUrl": f"{PATH_PREFIX}/avatar-pack",
        },
        "availability": {
            "runtimeIndex": (RUNTIME_DIR / "index.html").exists(),
            "packDir": pack_dir.exists(),
            "rendererConfig": (pack_dir / "renderer.kiosk-scene.json").exists(),
            "sceneConfig": (pack_dir / "scene.default.json").exists(),
            "sceneDisplayConfig": (pack_dir / DISPLAY_SCENE_CONFIG_FILENAME).exists(),
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
    normalized_parts = [
        part
        for part in PurePosixPath(normalized).parts
        if part not in ("", ".")
    ]
    if not normalized_parts or ".." in normalized_parts:
        return ""
    normalized_path = "/".join(normalized_parts)
    root = str(asset_root or "").strip()
    if root and not (root.startswith("/") or "://" in root):
        root_parts = [
            part
            for part in PurePosixPath(root).parts
            if part not in ("", ".")
        ]
        if ".." in root_parts:
            return ""
        quoted_root = quote("/".join(root_parts), safe="/") if root_parts else ""
        root = f"/avatar-packs/{quote(pack_id)}"
        if quoted_root:
            root = f"{root}/{quoted_root}"
    elif not root:
        root = f"/avatar-packs/{quote(pack_id)}"
    root = root.rstrip("/")
    return f"{root}/{quote(normalized_path, safe='/')}"


def slugify(value: str) -> str:
    normalized = "".join(
        char.lower() if char.isalnum() else "-"
        for char in str(value or "").strip()
    )
    collapsed = "-".join(part for part in normalized.split("-") if part)
    return collapsed[:48] or "avatar-pack"


def unique_pack_id(preferred: str) -> str:
    base = slugify(preferred)
    candidate = base
    suffix = 2
    while (AVATAR_PACKS_DIR / candidate).exists():
        candidate = f"{base}-{suffix}"
        suffix += 1
    return candidate


def humanize_name(value: str) -> str:
    cleaned = str(value or "").replace("_", " ").replace("-", " ").strip()
    return cleaned or "Avatar Pack"


def normalize_extracted_root(root: Path) -> Path:
    current = root
    while True:
        children = [item for item in current.iterdir() if item.name != "__MACOSX"]
        dirs = [item for item in children if item.is_dir()]
        files = [item for item in children if item.is_file()]
        if len(dirs) == 1 and not files:
            current = dirs[0]
            continue
        return current


def safe_extract_zip(archive_path: Path, target_dir: Path) -> None:
    target_root = target_dir.resolve()
    with zipfile.ZipFile(archive_path) as archive:
        infos = archive.infolist()
        if len(infos) > MAX_AVATAR_IMPORT_FILES:
            raise ValueError(
                f"Archive contains too many files ({len(infos)} > {MAX_AVATAR_IMPORT_FILES})."
            )

        total_unpacked = 0
        for info in infos:
            filename = PurePosixPath(info.filename)
            if not info.filename or info.is_dir():
                continue
            if filename.is_absolute() or ".." in filename.parts:
                raise ValueError(f"Unsafe archive path: {info.filename}")

            mode = stat.S_IFMT(info.external_attr >> 16)
            if mode == stat.S_IFLNK:
                raise ValueError(f"Symlinks are not supported in avatar archives: {info.filename}")

            total_unpacked += max(0, int(info.file_size))
            if total_unpacked > MAX_AVATAR_IMPORT_BYTES * 4:
                raise ValueError("Archive expands to an unsafe size.")

            destination = target_root.joinpath(*filename.parts).resolve()
            if not destination.is_relative_to(target_root):
                raise ValueError(f"Archive extraction escaped target directory: {info.filename}")
            destination.parent.mkdir(parents=True, exist_ok=True)
            with archive.open(info) as source, destination.open("wb") as target:
                shutil.copyfileobj(source, target)


def read_json_file(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def read_json_file_if_exists(path: Path) -> Any | None:
    if not path.exists():
        return None
    try:
        return read_json_file(path)
    except Exception as exc:
        logging.warning("Failed to read %s: %s", path, exc)
        return None


def is_home_assistant_entity_id(value: Any) -> bool:
    normalized = str(value or "").strip()
    return bool(normalized and "." in normalized and " " not in normalized)


def resolve_home_assistant_websocket_url() -> str:
    explicit = HOME_ASSISTANT_WS_URL.strip()
    if explicit:
        return explicit
    parsed = urlsplit(HOME_ASSISTANT_API_URL)
    scheme = "wss" if parsed.scheme == "https" else "ws"
    path = parsed.path.rstrip("/")
    if path.endswith("/api"):
        path = path[: -len("/api")]
    return urlunsplit((scheme, parsed.netloc, f"{path}/websocket", "", ""))


def load_home_assistant_token() -> str:
    token = (
        os.environ.get("SUPERVISOR_TOKEN", "").strip()
        or os.environ.get("HASSIO_TOKEN", "").strip()
    )
    if token:
        return token
    for path in HOME_ASSISTANT_TOKEN_PATHS:
        try:
            token = path.read_text(encoding="utf-8").strip()
        except OSError:
            token = ""
        if token:
            return token
    return ""


def update_home_assistant_states_snapshot(states: list[dict[str, Any]]) -> list[dict[str, Any]]:
    global _ha_states_cache
    global _ha_states_cache_at
    global _ha_states_generation
    global _ha_ws_snapshot_ready

    normalized: list[dict[str, Any]] = []
    state_map: dict[str, dict[str, Any]] = {}
    for item in states:
        if not isinstance(item, dict):
            continue
        entity_id = str(item.get("entity_id") or "").strip()
        if not entity_id:
            continue
        snapshot = dict(item)
        normalized.append(snapshot)
        state_map[entity_id] = snapshot

    now_ms = time.monotonic() * 1000
    with _ha_states_condition:
        _ha_all_states_by_entity.clear()
        _ha_all_states_by_entity.update(state_map)
        _ha_states_cache = normalized
        _ha_states_cache_at = now_ms
        _ha_states_generation += 1
        _ha_ws_snapshot_ready = True
        _ha_states_condition.notify_all()
        return list(_ha_states_cache)


def apply_home_assistant_state_event(state: dict[str, Any] | None) -> None:
    global _ha_states_cache
    global _ha_states_cache_at
    global _ha_states_generation

    entity_id = str((state or {}).get("entity_id") or "").strip()
    if not entity_id:
        return

    now_ms = time.monotonic() * 1000
    with _ha_states_condition:
        _ha_all_states_by_entity[entity_id] = dict(state)
        _ha_states_cache = list(_ha_all_states_by_entity.values())
        _ha_states_cache_at = now_ms
        _ha_states_generation += 1
        _ha_states_condition.notify_all()


def remove_home_assistant_state(entity_id: str) -> None:
    global _ha_states_cache
    global _ha_states_cache_at
    global _ha_states_generation

    normalized = str(entity_id or "").strip()
    if not normalized:
        return
    now_ms = time.monotonic() * 1000
    with _ha_states_condition:
        if normalized not in _ha_all_states_by_entity:
            return
        _ha_all_states_by_entity.pop(normalized, None)
        _ha_states_cache = list(_ha_all_states_by_entity.values())
        _ha_states_cache_at = now_ms
        _ha_states_generation += 1
        _ha_states_condition.notify_all()


def collect_pack_home_assistant_entity_ids(pack_id: str | None = None) -> list[str]:
    resolved_pack_id = str(pack_id or load_active_pack_id()).strip() or DEFAULT_PACK_ID
    pack_dir = PACKS_DIR / resolved_pack_id
    entity_ids: set[str] = set()

    def add_entity(candidate: Any) -> None:
        if is_home_assistant_entity_id(candidate):
            entity_ids.add(str(candidate).strip())

    for filename in ("entity-map.json", "control-entity-map.json"):
        payload = read_json_file_if_exists(pack_dir / filename)
        if not isinstance(payload, dict):
            continue
        for value in payload.values():
            add_entity(value)

    scene_config = read_json_file_if_exists(pack_dir / "scene.default.json")
    if isinstance(scene_config, dict):
        for page in scene_config.get("pages", []):
            if not isinstance(page, dict):
                continue
            for card in page.get("cards", []):
                if not isinstance(card, dict):
                    continue
                for field in ("entity", "stateEntity", "downEntity", "upEntity"):
                    add_entity(card.get(field))

    add_entity(WEATHER_ENTITY_ID)
    return sorted(entity_ids)


def fetch_home_assistant_states() -> list[dict[str, Any]]:
    token = load_home_assistant_token()
    if not token:
        raise PermissionError("SUPERVISOR_TOKEN is not available; Home Assistant API access is disabled.")

    request = Request(
        f"{HOME_ASSISTANT_API_URL}/states",
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/json",
        },
    )
    with urlopen(request, timeout=10) as response:
        payload = json.loads(response.read().decode("utf-8"))
    if not isinstance(payload, list):
        raise ValueError("Home Assistant /states did not return a JSON array.")
    return [item for item in payload if isinstance(item, dict)]


class _HomeAssistantWebSocket:
    def __init__(self, sock: socket.socket):
        self.sock = sock
        self.remainder = b""

    def close(self) -> None:
        self.sock.close()

    def sendall(self, payload: bytes) -> None:
        self.sock.sendall(payload)

    def recv_http_headers(self) -> tuple[str, dict[str, str]]:
        buffer = bytearray()
        while b"\r\n\r\n" not in buffer:
            chunk = self.sock.recv(4096)
            if not chunk:
                raise ConnectionError("Unexpected EOF during WebSocket handshake.")
            buffer.extend(chunk)
        header_bytes, self.remainder = bytes(buffer).split(b"\r\n\r\n", 1)
        header_text = header_bytes.decode("utf-8", errors="replace")
        lines = header_text.split("\r\n")
        status_line = lines[0] if lines else ""
        headers: dict[str, str] = {}
        for line in lines[1:]:
            if ":" not in line:
                continue
            key, value = line.split(":", 1)
            headers[key.strip().lower()] = value.strip()
        return status_line, headers

    def recv_exact(self, size: int) -> bytes:
        if self.remainder:
            if len(self.remainder) >= size:
                chunk = self.remainder[:size]
                self.remainder = self.remainder[size:]
                return chunk
            chunks = [self.remainder]
            remaining = size - len(self.remainder)
            self.remainder = b""
        else:
            chunks = []
            remaining = size
        while remaining > 0:
            chunk = self.sock.recv(remaining)
            if not chunk:
                raise ConnectionError("Unexpected EOF while reading WebSocket frame.")
            chunks.append(chunk)
            remaining -= len(chunk)
        return b"".join(chunks)


def _encode_ws_frame(opcode: int, payload: bytes) -> bytes:
    masked_payload = bytearray(payload)
    mask_key = os.urandom(4)
    for index in range(len(masked_payload)):
        masked_payload[index] ^= mask_key[index % 4]

    frame = bytearray()
    frame.append(0x80 | (opcode & 0x0F))
    payload_length = len(masked_payload)
    if payload_length < 126:
        frame.append(0x80 | payload_length)
    elif payload_length < 65536:
        frame.append(0x80 | 126)
        frame.extend(payload_length.to_bytes(2, "big"))
    else:
        frame.append(0x80 | 127)
        frame.extend(payload_length.to_bytes(8, "big"))
    frame.extend(mask_key)
    frame.extend(masked_payload)
    return bytes(frame)


def _send_ws_json(sock: _HomeAssistantWebSocket, payload: dict[str, Any]) -> None:
    body = json.dumps(payload, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
    sock.sendall(_encode_ws_frame(0x1, body))


def _recv_ws_frame(sock: _HomeAssistantWebSocket) -> tuple[int, bytes]:
    header = sock.recv_exact(2)
    first = header[0]
    second = header[1]
    opcode = first & 0x0F
    masked = bool(second & 0x80)
    payload_length = second & 0x7F
    if payload_length == 126:
        payload_length = int.from_bytes(sock.recv_exact(2), "big")
    elif payload_length == 127:
        payload_length = int.from_bytes(sock.recv_exact(8), "big")
    mask_key = sock.recv_exact(4) if masked else b""
    payload = bytearray(sock.recv_exact(payload_length))
    if masked:
        for index in range(payload_length):
            payload[index] ^= mask_key[index % 4]
    return opcode, bytes(payload)


def _recv_ws_json(sock: _HomeAssistantWebSocket) -> dict[str, Any]:
    while True:
        opcode, payload = _recv_ws_frame(sock)
        if opcode == 0x8:
            raise ConnectionError("Home Assistant websocket closed the connection.")
        if opcode == 0x9:
            sock.sendall(_encode_ws_frame(0xA, payload))
            continue
        if opcode != 0x1:
            continue
        message = json.loads(payload.decode("utf-8"))
        if isinstance(message, dict):
            return message


def _connect_home_assistant_websocket() -> _HomeAssistantWebSocket:
    ws_url = resolve_home_assistant_websocket_url()
    parsed = urlsplit(ws_url)
    if parsed.scheme not in ("ws", "wss"):
        raise ValueError(f"Unsupported Home Assistant websocket scheme: {ws_url}")
    host = parsed.hostname or ""
    if not host:
        raise ValueError(f"Invalid Home Assistant websocket URL: {ws_url}")
    port = parsed.port or (443 if parsed.scheme == "wss" else 80)
    path = parsed.path or "/"
    if parsed.query:
        path = f"{path}?{parsed.query}"
    raw_sock = socket.create_connection((host, port), timeout=10)
    raw_sock.settimeout(30)
    if parsed.scheme == "wss":
        import ssl
        raw_sock = ssl.create_default_context().wrap_socket(raw_sock, server_hostname=host)
    sock = _HomeAssistantWebSocket(raw_sock)
    websocket_key = base64.b64encode(os.urandom(16)).decode("ascii")
    request_lines = [
        f"GET {path} HTTP/1.1",
        f"Host: {parsed.netloc}",
        "Upgrade: websocket",
        "Connection: Upgrade",
        f"Sec-WebSocket-Key: {websocket_key}",
        "Sec-WebSocket-Version: 13",
        "\r\n",
    ]
    sock.sendall("\r\n".join(request_lines).encode("utf-8"))
    status_line, headers = sock.recv_http_headers()
    if "101" not in status_line:
        raise ConnectionError(f"WebSocket handshake failed: {status_line or 'missing status line'}")
    expected_accept = base64.b64encode(
        hashlib.sha1(f"{websocket_key}258EAFA5-E914-47DA-95CA-C5AB0DC85B11".encode("utf-8")).digest()
    ).decode("ascii")
    if headers.get("sec-websocket-accept") != expected_accept:
        raise ConnectionError("Home Assistant websocket handshake returned an invalid accept header.")
    return sock


def _authenticate_home_assistant_websocket(sock: _HomeAssistantWebSocket) -> None:
    token = load_home_assistant_token()
    if not token:
        raise PermissionError("SUPERVISOR_TOKEN is not available; Home Assistant websocket access is disabled.")
    message = _recv_ws_json(sock)
    if message.get("type") != "auth_required":
        raise ConnectionError(f"Unexpected websocket pre-auth message: {message}")
    _send_ws_json(sock, {"type": "auth", "access_token": token})
    result = _recv_ws_json(sock)
    if result.get("type") != "auth_ok":
        raise PermissionError(f"Home Assistant websocket authentication failed: {result}")


def _bootstrap_home_assistant_states_via_websocket(sock: _HomeAssistantWebSocket) -> None:
    _send_ws_json(sock, {"id": 1, "type": "get_states"})
    _send_ws_json(sock, {"id": 2, "type": "subscribe_events", "event_type": "state_changed"})

    states_loaded = False
    subscription_ready = False
    while not (states_loaded and subscription_ready):
        message = _recv_ws_json(sock)
        if message.get("type") != "result":
            continue
        if message.get("id") == 1:
            result = message.get("result")
            if not isinstance(result, list):
                raise ValueError("Home Assistant websocket get_states did not return a list.")
            update_home_assistant_states_snapshot([item for item in result if isinstance(item, dict)])
            states_loaded = True
        elif message.get("id") == 2:
            if message.get("success") is not True:
                raise ValueError(f"Home Assistant websocket subscribe_events failed: {message}")
            subscription_ready = True


def _home_assistant_ws_listener() -> None:
    while True:
        sock: _HomeAssistantWebSocket | None = None
        try:
            sock = _connect_home_assistant_websocket()
            _authenticate_home_assistant_websocket(sock)
            _bootstrap_home_assistant_states_via_websocket(sock)
            logging.info("Home Assistant websocket state listener connected")
            while True:
                message = _recv_ws_json(sock)
                if message.get("type") != "event" or message.get("id") != 2:
                    continue
                event = message.get("event")
                if not isinstance(event, dict):
                    continue
                if str(event.get("event_type") or "") != "state_changed":
                    continue
                event_data = event.get("data")
                if not isinstance(event_data, dict):
                    continue
                entity_id = str(event_data.get("entity_id") or "").strip()
                new_state = event_data.get("new_state")
                if isinstance(new_state, dict):
                    apply_home_assistant_state_event(new_state)
                elif entity_id:
                    remove_home_assistant_state(entity_id)
        except Exception as exc:
            logging.warning("Home Assistant websocket state listener disconnected: %s", exc)
            try:
                fallback_states = fetch_home_assistant_states()
            except Exception as fallback_exc:
                logging.warning("Failed to refresh Home Assistant state fallback snapshot: %s", fallback_exc)
            else:
                update_home_assistant_states_snapshot(fallback_states)
        finally:
            if sock is not None:
                try:
                    sock.close()
                except OSError:
                    pass
        time.sleep(HOME_ASSISTANT_WS_RETRY_SEC)


def ensure_home_assistant_state_listener() -> None:
    global _ha_ws_listener_started

    with _ha_states_condition:
        if _ha_ws_listener_started:
            return
        _ha_ws_listener_started = True
    thread = threading.Thread(
        target=_home_assistant_ws_listener,
        name="scene-ha-state-listener",
        daemon=True,
    )
    thread.start()


def load_filtered_home_assistant_states(pack_id: str | None = None) -> list[dict[str, Any]]:
    entity_ids = set(collect_pack_home_assistant_entity_ids(pack_id))
    if not entity_ids:
        return []

    ensure_home_assistant_state_listener()
    with _ha_states_condition:
        snapshot = list(_ha_states_cache) if _ha_states_cache is not None else []
        snapshot_ready = _ha_ws_snapshot_ready

    if not snapshot:
        fallback_snapshot = update_home_assistant_states_snapshot(fetch_home_assistant_states())
        snapshot = fallback_snapshot
        snapshot_ready = True

    if not snapshot_ready:
        with _ha_states_condition:
            _ha_states_condition.wait(timeout=1.5)
            if _ha_states_cache is not None:
                snapshot = list(_ha_states_cache)

    return [
        state
        for state in snapshot
        if str(state.get("entity_id") or "").strip() in entity_ids
    ]


def build_filtered_home_assistant_states_payload(pack_id: str | None = None) -> dict[str, Any]:
    return {
        "success": True,
        "packId": str(pack_id or load_active_pack_id()).strip() or DEFAULT_PACK_ID,
        "states": load_filtered_home_assistant_states(pack_id),
        "emittedAt": int(time.time() * 1000),
    }


def resolve_motion_id(path: Path, fallback_index: int) -> str:
    name = path.name
    for suffix in (".motion3.json", ".json"):
        if name.endswith(suffix):
            name = name[: -len(suffix)]
            break
    name = slugify(name)
    return name or f"motion-{fallback_index:02d}"


def humanize_motion_label(group_name: str, path: Path, index: int) -> str:
    raw = path.name
    for suffix in (".motion3.json", ".json"):
        if raw.endswith(suffix):
            raw = raw[: -len(suffix)]
            break
    tokens = raw.replace("_", " ").replace("-", " ").strip()
    if tokens and tokens.lower() != group_name.lower():
        return tokens
    return f"{group_name} {index + 1}"


def read_motion_duration(path: Path) -> float:
    try:
        payload = read_json_file(path)
        duration = payload.get("Meta", {}).get("Duration")
        numeric = float(duration)
        return round(numeric, 3) if numeric > 0 else 0.0
    except Exception:
        return 0.0


def derive_motion_tags(group_name: str, relative_path: str) -> list[str]:
    tags: set[str] = set()
    joined = f"{group_name} {relative_path}".lower()
    compact = joined.replace("-", " ").replace("_", " ")

    if "idle" in compact:
        tags.update({"idle", "default", "calm"})
    if group_name.lower().startswith("tap"):
        tags.update({"touch", "reply_soft", "tap"})
    if group_name.lower().startswith("flick"):
        tags.update({"touch", "reply_soft", "flick"})
    if "shake" in compact:
        tags.update({"touch", "warning", "shake"})
    if any(token in compact for token in ("greet", "hello", "welcome", "bow", "polite")):
        tags.update({"greet", "welcome", "polite"})
    if any(token in compact for token in ("think", "ponder", "idea", "busy")):
        tags.update({"think", "busy"})
    if any(token in compact for token in ("smile", "happy", "joy", "approve")):
        tags.update({"happy", "approve"})
    if any(token in compact for token in ("surprise", "startle", "alert")):
        tags.update({"surprise", "alert"})
    if any(token in compact for token in ("sad", "cry", "down")):
        tags.update({"sad"})
    if any(token in compact for token in ("angry", "mad", "annoy", "disagree", "no")):
        tags.update({"warning", "disagree"})
    if not tags:
        tags.add(group_name.lower())
    return sorted(tags)


def build_semantic_map(motions: list[dict[str, Any]]) -> dict[str, Any]:
    def pick(*wanted: str) -> list[int]:
        result = [
            int(item["index"])
            for item in motions
            if any(tag in set(item.get("tags") or []) for tag in wanted)
        ]
        deduped: list[int] = []
        for item in result:
            if item not in deduped:
                deduped.append(item)
        return deduped

    semantic: dict[str, Any] = {}
    rules = {
        "idle": ("idle", "default", "calm"),
        "touch": ("touch", "tap", "flick", "shake", "reply_soft"),
        "reply_soft": ("reply_soft", "touch", "tap", "flick"),
        "think": ("think", "busy", "idle"),
        "busy": ("busy", "think", "idle"),
        "calm": ("calm", "idle", "default"),
        "happy": ("happy", "approve"),
        "surprise": ("surprise", "alert"),
        "warning": ("warning", "disagree", "shake"),
        "greet": ("greet", "welcome", "polite"),
        "speaking": ("reply_soft", "touch", "tap"),
    }
    for key, wanted in rules.items():
        indices = pick(*wanted)
        if indices:
            semantic[key] = indices

    if "idle" not in semantic and motions:
        semantic["idle"] = [0]
    if "touch" not in semantic and motions:
        semantic["touch"] = [1] if len(motions) > 1 else [0]
    return semantic


def build_motion_map(model_dir: Path, model_payload: dict[str, Any]) -> tuple[dict[str, Any], int]:
    motions_payload = model_payload.get("FileReferences", {}).get("Motions", {})
    motions: list[dict[str, Any]] = []
    index = 0
    if isinstance(motions_payload, dict):
        for group_name, items in motions_payload.items():
            if not isinstance(items, list):
                continue
            for item in items:
                if not isinstance(item, dict):
                    continue
                relative_file = str(item.get("File") or "").strip()
                if not relative_file:
                    continue
                motion_path = model_dir.joinpath(*PurePosixPath(relative_file).parts)
                motions.append(
                    {
                        "index": index,
                        "id": resolve_motion_id(motion_path, index),
                        "label": humanize_motion_label(str(group_name), motion_path, index),
                        "durationSec": read_motion_duration(motion_path),
                        "description": f"{group_name} · {motion_path.name}",
                        "group": str(group_name),
                        "file": relative_file,
                        "tags": derive_motion_tags(str(group_name), relative_file),
                    }
                )
                index += 1

    return {"motions": motions, "semantic": build_semantic_map(motions)}, len(motions)


def detect_lipsync_support(model_payload: dict[str, Any]) -> bool:
    groups = model_payload.get("Groups", [])
    if not isinstance(groups, list):
        return False
    for group in groups:
        if not isinstance(group, dict):
            continue
        if str(group.get("Name") or "").lower() == "lipsync":
            return True
    return False


def detect_expression_support(model_dir: Path) -> bool:
    return any(model_dir.rglob("*.exp3.json"))


def resolve_preview_asset(model_dir: Path, model_payload: dict[str, Any]) -> str:
    textures = model_payload.get("FileReferences", {}).get("Textures", [])
    if isinstance(textures, list) and textures:
        candidate = str(textures[0] or "").strip()
        if candidate:
            texture_path = model_dir.joinpath(*PurePosixPath(candidate).parts)
            if texture_path.exists():
                return candidate
    for pattern in ("**/texture_00.png", "**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.webp"):
        candidate = next(iter(sorted(model_dir.glob(pattern))), None)
        if candidate:
            return candidate.relative_to(model_dir).as_posix()
    return ""


def inspect_model_bundle(root_dir: Path) -> dict[str, Any]:
    candidates = sorted(
        root_dir.rglob("*.model3.json"),
        key=lambda item: (0 if "runtime" in item.parts else 1, len(item.parts), item.name.lower()),
    )
    if not candidates:
        raise ValueError("Archive does not contain a *.model3.json file.")

    model_json_path = candidates[0]
    model_payload = read_json_file(model_json_path)
    model_dir = model_json_path.parent
    motion_map, motion_count = build_motion_map(model_dir, model_payload)
    return {
        "model_json_path": model_json_path,
        "model_dir": model_dir,
        "motion_map": motion_map,
        "motion_count": motion_count,
        "preview_asset": resolve_preview_asset(model_dir, model_payload),
        "supports_lipsync": detect_lipsync_support(model_payload),
        "supports_emotion": detect_expression_support(model_dir),
    }


def dot_path(relative_path: Path, directory: bool = False) -> str:
    value = relative_path.as_posix().strip()
    if not value or value == ".":
        return "." if directory else "./"
    return f"./{value}" if not value.startswith(".") else value


def write_avatar_pack(
    pack_id: str,
    display_name: str,
    extracted_root: Path,
    model_info: dict[str, Any],
) -> dict[str, Any]:
    AVATAR_PACKS_DIR.mkdir(parents=True, exist_ok=True)
    pack_dir = AVATAR_PACKS_DIR / pack_id
    if pack_dir.exists():
        raise ValueError(f"Avatar pack already exists: {pack_id}")

    shutil.copytree(extracted_root, pack_dir)

    pack_model_dir = pack_dir / model_info["model_dir"].relative_to(extracted_root)
    motion_map_path = pack_model_dir / "motion-map.json"
    motion_map_path.write_text(
        json.dumps(model_info["motion_map"], ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    asset_root_rel = pack_model_dir.relative_to(pack_dir)
    model_json_rel = model_info["model_json_path"].relative_to(model_info["model_dir"])
    manifest = {
        "version": 1,
        "name": display_name,
        "adapter": "live2d",
        "assetRoot": dot_path(asset_root_rel, directory=True),
        "runtimeUrl": SHARED_AVATAR_RUNTIME_URL,
        "modelUrl": dot_path(model_json_rel),
        "fallbackPortrait": dot_path(Path(model_info["preview_asset"])) if model_info["preview_asset"] else "",
        "motionMapUrl": "./motion-map.json",
        "presetThumbs": {
            "full": f"{SHARED_PRESET_BASE_URL}/preset-full.svg",
            "torso": f"{SHARED_PRESET_BASE_URL}/preset-torso.svg",
            "head": f"{SHARED_PRESET_BASE_URL}/preset-head.svg",
        },
        "capabilities": {
            "supportsEmotion": bool(model_info["supports_emotion"]),
            "supportsMotion": bool(model_info["motion_count"]),
            "supportsViewPresets": True,
            "supportsLipSync": bool(model_info["supports_lipsync"]),
            "supportsPointerFocus": True,
        },
    }
    (pack_dir / "avatar.manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    return {
        "packId": pack_id,
        "packDir": str(pack_dir),
        "displayName": display_name,
        "motionCount": int(model_info["motion_count"]),
    }


def import_avatar_archive_from_path(
    filename: str, archive_path: Path, requested_pack_id: str = ""
) -> dict[str, Any]:
    preferred_name = Path(filename or "").stem or requested_pack_id or "avatar-pack"
    pack_id = unique_pack_id(requested_pack_id or preferred_name)
    display_name = humanize_name(preferred_name)

    with tempfile.TemporaryDirectory(prefix="kiosk-scene-avatar-import-") as temp_dir_name:
        temp_dir = Path(temp_dir_name)
        extracted_dir = temp_dir / "extracted"
        extracted_dir.mkdir(parents=True, exist_ok=True)
        safe_extract_zip(archive_path, extracted_dir)
        content_root = normalize_extracted_root(extracted_dir)
        if not any(content_root.iterdir()):
            raise ValueError("Archive is empty.")
        model_info = inspect_model_bundle(content_root)
        return write_avatar_pack(pack_id, display_name, content_root, model_info)


def import_avatar_archive(filename: str, payload: bytes, requested_pack_id: str = "") -> dict[str, Any]:
    with tempfile.TemporaryDirectory(prefix="kiosk-scene-avatar-import-upload-") as temp_dir_name:
        archive_path = Path(temp_dir_name) / "upload.zip"
        archive_path.write_bytes(payload)
        return import_avatar_archive_from_path(filename, archive_path, requested_pack_id)


def parse_multipart_form(body: bytes, content_type: str) -> tuple[dict[str, str], str, bytes]:
    parser = BytesParser(policy=email.policy.default)
    message = parser.parsebytes(
        (
            f"Content-Type: {content_type}\r\n"
            "MIME-Version: 1.0\r\n\r\n"
        ).encode("utf-8")
        + body
    )
    if not message.is_multipart():
        raise ValueError("Expected multipart/form-data payload.")

    fields: dict[str, str] = {}
    filename = ""
    file_payload = b""
    for part in message.iter_parts():
        if part.get_content_disposition() != "form-data":
            continue
        name = str(part.get_param("name", header="content-disposition") or "").strip()
        if part.get_filename():
            filename = str(part.get_filename() or "").strip()
            file_payload = part.get_payload(decode=True) or b""
            continue
        fields[name] = str(part.get_content() or "").strip()

    if not filename or not file_payload:
        raise ValueError("Avatar ZIP file is missing.")
    return fields, filename, file_payload


def resolve_avatar_upload_session_dir(upload_id: str) -> Path:
    safe_id = slugify(upload_id or "")
    if not safe_id:
        raise ValueError("Avatar upload session id is missing.")
    return AVATAR_UPLOADS_DIR / safe_id


def handle_avatar_import_chunk(
    fields: dict[str, str], fallback_filename: str, file_payload: bytes
) -> dict[str, Any]:
    upload_dir = resolve_avatar_upload_session_dir(str(fields.get("uploadId") or uuid.uuid4().hex))
    chunk_index = int(str(fields.get("chunkIndex") or "0"))
    chunk_count = int(str(fields.get("chunkCount") or "0"))
    original_filename = str(fields.get("filename") or fallback_filename or "").strip()
    requested_pack_id = str(fields.get("packId") or fields.get("slug") or "").strip()
    if not original_filename:
        raise ValueError("Avatar ZIP file is missing.")
    if chunk_count <= 0:
        raise ValueError("Chunk count must be greater than zero.")
    if chunk_index < 0 or chunk_index >= chunk_count:
        raise ValueError("Chunk index is out of range.")

    upload_dir.mkdir(parents=True, exist_ok=True)
    meta_path = upload_dir / "meta.json"
    parts_dir = upload_dir / "parts"
    parts_dir.mkdir(parents=True, exist_ok=True)
    next_meta = {
        "filename": original_filename,
        "packId": requested_pack_id,
        "chunkCount": chunk_count,
    }
    if meta_path.exists():
        current_meta = read_json_file(meta_path)
        if (
            str(current_meta.get("filename") or "") != original_filename
            or int(current_meta.get("chunkCount") or 0) != chunk_count
            or str(current_meta.get("packId") or "") != requested_pack_id
        ):
            shutil.rmtree(upload_dir, ignore_errors=True)
            raise ValueError("Upload session parameters changed. Start the ZIP upload again.")
    meta_path.write_text(json.dumps(next_meta, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (parts_dir / f"{chunk_index:06d}.part").write_bytes(file_payload)

    if chunk_index < chunk_count - 1:
        return {
            "success": True,
            "uploadId": upload_dir.name,
            "complete": False,
            "receivedChunk": chunk_index,
            "chunkCount": chunk_count,
        }

    missing = [index for index in range(chunk_count) if not (parts_dir / f"{index:06d}.part").exists()]
    if missing:
        raise ValueError("ZIP upload is incomplete. Start the upload again.")

    try:
        with tempfile.TemporaryDirectory(prefix="kiosk-scene-avatar-import-assemble-") as temp_dir_name:
            archive_path = Path(temp_dir_name) / "upload.zip"
            with archive_path.open("wb") as assembled:
                for index in range(chunk_count):
                    assembled.write((parts_dir / f"{index:06d}.part").read_bytes())
            return import_avatar_archive_from_path(
                filename=original_filename,
                archive_path=archive_path,
                requested_pack_id=requested_pack_id,
            )
    finally:
        shutil.rmtree(upload_dir, ignore_errors=True)


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
        motion_map_rel = str(manifest.get("motionMapUrl") or "").strip()
        asset_root_dir = pack_dir
        if asset_root and not asset_root.startswith("/") and "://" not in asset_root:
            asset_root_dir = pack_dir / asset_root.removeprefix("./")
        motion_map_path = (
            asset_root_dir / motion_map_rel.removeprefix("./")
            if motion_map_rel and not motion_map_rel.startswith("/")
            else None
        )
        motion_count = 0
        if motion_map_path and motion_map_path.exists():
            try:
                motion_map = read_json_file(motion_map_path)
                motions = motion_map.get("motions")
                if isinstance(motions, list):
                    motion_count = len(motions)
            except Exception as exc:
                logging.warning("Failed to read avatar pack motion-map %s: %s", motion_map_path, exc)
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
                "motionCount": motion_count,
                "capabilities": manifest.get("capabilities") if isinstance(manifest.get("capabilities"), dict) else {},
            }
        )

    return {
        "success": True,
        "items": packs,
        "root": str(AVATAR_PACKS_DIR),
    }


def resolve_pack_id(query_string: str) -> str:
    query = parse_qs(query_string or "", keep_blank_values=False)
    for key in ("packId", "id"):
        values = query.get(key)
        if not values:
            continue
        candidate = str(values[0] or "").strip()
        if candidate:
            return candidate
    raise ValueError("Missing packId query parameter.")


def load_avatar_pack_details(pack_id: str) -> dict[str, Any]:
    normalized_pack_id = slugify(pack_id)
    if normalized_pack_id != pack_id:
        raise ValueError("Invalid packId.")

    pack_dir = AVATAR_PACKS_DIR / pack_id
    manifest_path = pack_dir / "avatar.manifest.json"
    if not manifest_path.exists():
        raise FileNotFoundError(f"Avatar pack not found: {pack_id}")

    manifest = read_json_file(manifest_path)
    motion_map_rel = str(manifest.get("motionMapUrl") or "").strip()
    asset_root = str(manifest.get("assetRoot") or "").strip()
    asset_root_dir = pack_dir
    if asset_root and not asset_root.startswith("/") and "://" not in asset_root:
        asset_root_dir = pack_dir / asset_root.removeprefix("./")
    motion_map_path = (
        asset_root_dir / motion_map_rel.removeprefix("./")
        if motion_map_rel and not motion_map_rel.startswith("/")
        else None
    )
    motion_map = {}
    if motion_map_path and motion_map_path.exists():
        motion_map = read_json_file(motion_map_path)

    preview_url = _resolve_avatar_asset_url(
        pack_id,
        str(manifest.get("fallbackPortrait") or ""),
        asset_root,
    )

    return {
        "success": True,
        "packId": pack_id,
        "packDir": str(pack_dir),
        "manifestPath": str(manifest_path),
        "motionMapPath": str(motion_map_path) if motion_map_path else "",
        "manifest": manifest,
        "motionMap": motion_map,
        "summary": {
            "id": pack_id,
            "name": str(manifest.get("name") or pack_id),
            "manifestUrl": f"/avatar-packs/{quote(pack_id)}/avatar.manifest.json",
            "previewUrl": preview_url,
        },
    }


def save_avatar_pack_motion_map(pack_id: str, payload: dict[str, Any]) -> dict[str, Any]:
    details = load_avatar_pack_details(pack_id)
    motion_map_path = Path(str(details.get("motionMapPath") or ""))
    manifest = details.get("manifest") or {}
    motion_map = payload.get("motionMap")
    if not isinstance(motion_map, dict):
        raise ValueError("Request must provide a motionMap object.")
    motions = motion_map.get("motions")
    semantic = motion_map.get("semantic")
    if not isinstance(motions, list) or not isinstance(semantic, dict):
        raise ValueError("motionMap must contain motions[] and semantic{}.")
    if not motion_map_path:
        raise ValueError("Avatar pack does not define a writable motionMapUrl.")
    motion_map_path.parent.mkdir(parents=True, exist_ok=True)
    motion_map_path.write_text(
        json.dumps(motion_map, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    return {
        "success": True,
        "packId": pack_id,
        "motionMapPath": str(motion_map_path),
        "manifest": manifest,
        "motionMap": motion_map,
    }


class SceneHostHandler(BaseHTTPRequestHandler):
    server_version = "KioskSceneHost/1.0"

    def log_message(self, fmt: str, *args: Any) -> None:
        logging.info("%s - %s", self.address_string(), fmt % args)

    def send_json(self, payload: Any, status: HTTPStatus = HTTPStatus.OK) -> None:
        body = json.dumps(payload, ensure_ascii=False, indent=2).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def send_event_stream_message(self, payload: Any, event: str = "snapshot") -> None:
        body = json.dumps(payload, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
        self.wfile.write(f"event: {event}\n".encode("utf-8"))
        self.wfile.write(b"data: ")
        self.wfile.write(body)
        self.wfile.write(b"\n\n")
        self.wfile.flush()

    def send_event_stream_keepalive(self) -> None:
        self.wfile.write(b": keepalive\n\n")
        self.wfile.flush()

    def do_GET(self) -> None:
        parsed = urlsplit(self.path)
        path = parsed.path.rstrip("/") or "/"
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
        if path == f"{PATH_PREFIX}/ha-states":
            try:
                self.send_json(load_filtered_home_assistant_states())
            except PermissionError as exc:
                self.send_json(
                    {"success": False, "error": str(exc)},
                    status=HTTPStatus.SERVICE_UNAVAILABLE,
                )
            except ValueError as exc:
                self.send_json(
                    {"success": False, "error": str(exc)},
                    status=HTTPStatus.BAD_GATEWAY,
                )
            except Exception as exc:
                logging.exception("Failed to proxy Home Assistant states")
                self.send_json(
                    {"success": False, "error": f"Failed to proxy Home Assistant states: {exc}"},
                    status=HTTPStatus.BAD_GATEWAY,
                )
            return
        if path == f"{PATH_PREFIX}/ha-states-stream":
            self.handle_home_assistant_states_stream()
            return
        if path == f"{PATH_PREFIX}/avatar-catalog":
            self.send_json(load_avatar_catalog())
            return
        if path == f"{PATH_PREFIX}/avatar-pack":
            try:
                self.send_json(load_avatar_pack_details(resolve_pack_id(parsed.query)))
            except FileNotFoundError as exc:
                self.send_json(
                    {"success": False, "error": str(exc)},
                    status=HTTPStatus.NOT_FOUND,
                )
            except ValueError as exc:
                self.send_json(
                    {"success": False, "error": str(exc)},
                    status=HTTPStatus.BAD_REQUEST,
                )
            return
        self.send_json(
            {"success": False, "error": f"Endpoint not found: {path}"},
            status=HTTPStatus.NOT_FOUND,
        )

    def do_POST(self) -> None:
        parsed = urlsplit(self.path)
        path = parsed.path.rstrip("/") or "/"
        if path == f"{PATH_PREFIX}/avatar-import":
            self.handle_avatar_import()
            return
        if path == f"{PATH_PREFIX}/avatar-pack":
            self.handle_avatar_pack_save(parsed.query)
            return
        self.send_json(
            {"success": False, "error": f"Endpoint not found: {path}"},
            status=HTTPStatus.NOT_FOUND,
        )

    def handle_avatar_import(self) -> None:
        content_length = int(self.headers.get("Content-Length", "0") or "0")
        if content_length <= 0:
            self.send_json(
                {"success": False, "error": "Request body is empty."},
                status=HTTPStatus.BAD_REQUEST,
            )
            return
        if content_length > MAX_AVATAR_IMPORT_BYTES:
            self.send_json(
                {
                    "success": False,
                    "error": f"Archive is too large ({content_length} bytes > {MAX_AVATAR_IMPORT_BYTES}).",
                },
                status=HTTPStatus.REQUEST_ENTITY_TOO_LARGE,
            )
            return

        content_type = str(self.headers.get("Content-Type") or "").strip()
        if "multipart/form-data" not in content_type:
            self.send_json(
                {"success": False, "error": "Expected multipart/form-data upload."},
                status=HTTPStatus.BAD_REQUEST,
            )
            return

        body = self.rfile.read(content_length)
        try:
            fields, filename, file_payload = parse_multipart_form(body, content_type)
            is_chunked_upload = any(
                str(fields.get(key) or "").strip()
                for key in ("uploadId", "chunkIndex", "chunkCount")
            )
            if is_chunked_upload:
                result = handle_avatar_import_chunk(fields, filename, file_payload)
                if not result.get("complete", True):
                    self.send_json(result)
                    return
            else:
                result = import_avatar_archive(
                    filename=filename,
                    payload=file_payload,
                    requested_pack_id=str(fields.get("packId") or fields.get("slug") or "").strip(),
                )
            catalog = load_avatar_catalog()
            item = next(
                (
                    entry
                    for entry in catalog.get("items", [])
                    if str(entry.get("id") or "").strip() == result["packId"]
                ),
                None,
            )
            self.send_json(
                {
                    "success": True,
                    "item": item,
                    "packId": result["packId"],
                    "packDir": result["packDir"],
                    "motionCount": result["motionCount"],
                }
            )
        except zipfile.BadZipFile:
            self.send_json(
                {"success": False, "error": "Uploaded file is not a valid ZIP archive."},
                status=HTTPStatus.BAD_REQUEST,
            )
        except ValueError as exc:
            self.send_json(
                {"success": False, "error": str(exc)},
                status=HTTPStatus.BAD_REQUEST,
            )
        except Exception as exc:
            logging.exception("Avatar import failed")
            self.send_json(
                {"success": False, "error": f"Avatar import failed: {exc}"},
                status=HTTPStatus.INTERNAL_SERVER_ERROR,
            )

    def handle_avatar_pack_save(self, query_string: str) -> None:
        content_length = int(self.headers.get("Content-Length", "0") or "0")
        if content_length <= 0:
            self.send_json(
                {"success": False, "error": "Request body is empty."},
                status=HTTPStatus.BAD_REQUEST,
            )
            return
        try:
            pack_id = resolve_pack_id(query_string)
            payload = json.loads(self.rfile.read(content_length).decode("utf-8"))
            self.send_json(save_avatar_pack_motion_map(pack_id, payload))
        except FileNotFoundError as exc:
            self.send_json(
                {"success": False, "error": str(exc)},
                status=HTTPStatus.NOT_FOUND,
            )
        except ValueError as exc:
            self.send_json(
                {"success": False, "error": str(exc)},
                status=HTTPStatus.BAD_REQUEST,
            )
        except Exception as exc:
            logging.exception("Avatar pack save failed")
            self.send_json(
                {"success": False, "error": f"Avatar pack save failed: {exc}"},
                status=HTTPStatus.INTERNAL_SERVER_ERROR,
            )

    def handle_home_assistant_states_stream(self) -> None:
        ensure_home_assistant_state_listener()
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", "text/event-stream; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Connection", "keep-alive")
        self.send_header("X-Accel-Buffering", "no")
        self.end_headers()

        last_payload = ""
        last_generation = -1
        last_keepalive_at = 0.0
        try:
            while True:
                payload = build_filtered_home_assistant_states_payload()
                serialized = json.dumps(payload, ensure_ascii=False, separators=(",", ":"), sort_keys=True)
                now = time.monotonic()
                if serialized != last_payload:
                    self.send_event_stream_message(payload)
                    last_payload = serialized
                    last_keepalive_at = now
                elif now - last_keepalive_at >= HOME_ASSISTANT_STREAM_KEEPALIVE_SEC:
                    self.send_event_stream_keepalive()
                    last_keepalive_at = now
                with _ha_states_condition:
                    if last_generation != _ha_states_generation:
                        last_generation = _ha_states_generation
                        continue
                    timeout = max(0.25, HOME_ASSISTANT_STREAM_KEEPALIVE_SEC - (time.monotonic() - last_keepalive_at))
                    _ha_states_condition.wait(timeout=timeout)
        except (BrokenPipeError, ConnectionResetError, OSError):
            logging.info("Home Assistant state stream client disconnected")
        except Exception:
            logging.exception("Home Assistant state stream failed")


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
