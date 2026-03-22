#!/usr/bin/env python3
from __future__ import annotations

import email.policy
import json
import logging
import os
import shutil
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
from urllib.parse import parse_qs, quote, urlsplit
from urllib.request import Request, urlopen


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
HOME_ASSISTANT_STATES_CACHE_TTL_MS = max(
    250,
    int(os.environ.get("SCENE_HA_STATES_CACHE_TTL_MS", "2000") or "2000"),
)
WEATHER_ENTITY_ID = (
    os.environ.get("SCENE_WEATHER_ENTITY_ID", "weather.forecast_home_assistant").strip()
    or "weather.forecast_home_assistant"
)

_ha_states_cache_lock = threading.Lock()
_ha_states_cache_at = 0.0
_ha_states_cache: list[dict[str, Any]] | None = None
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


def resolve_runtime_scene_config_name(pack_dir: Path) -> str:
    display_config_path = pack_dir / DISPLAY_SCENE_CONFIG_FILENAME
    if display_config_path.exists():
        return DISPLAY_SCENE_CONFIG_FILENAME
    return "scene.default.json"


def build_bootstrap() -> dict[str, Any]:
    pack_id = load_active_pack_id()
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
    token = (
        os.environ.get("SUPERVISOR_TOKEN", "").strip()
        or os.environ.get("HASSIO_TOKEN", "").strip()
    )
    if not token:
        for path in HOME_ASSISTANT_TOKEN_PATHS:
            try:
                token = path.read_text(encoding="utf-8").strip()
            except OSError:
                token = ""
            if token:
                break

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


def load_filtered_home_assistant_states(pack_id: str | None = None) -> list[dict[str, Any]]:
    global _ha_states_cache
    global _ha_states_cache_at

    entity_ids = set(collect_pack_home_assistant_entity_ids(pack_id))
    if not entity_ids:
        return []

    now_ms = time.monotonic() * 1000
    with _ha_states_cache_lock:
        if (
            _ha_states_cache is None
            or now_ms - _ha_states_cache_at >= HOME_ASSISTANT_STATES_CACHE_TTL_MS
        ):
            _ha_states_cache = fetch_home_assistant_states()
            _ha_states_cache_at = now_ms
        snapshot = list(_ha_states_cache)

    return [
        state
        for state in snapshot
        if str(state.get("entity_id") or "").strip() in entity_ids
    ]


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


def delete_avatar_pack(pack_id: str) -> dict[str, Any]:
    normalized = slugify(pack_id)
    if normalized != pack_id or not pack_id:
        raise ValueError("Invalid packId.")
    pack_dir = AVATAR_PACKS_DIR / pack_id
    if not pack_dir.exists():
        raise FileNotFoundError(f"Avatar pack not found: {pack_id}")
    shutil.rmtree(pack_dir)
    logging.info("Deleted avatar pack: %s (%s)", pack_id, pack_dir)
    return {"success": True, "packId": pack_id}


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

    def do_DELETE(self) -> None:
        parsed = urlsplit(self.path)
        path = parsed.path.rstrip("/") or "/"
        if path == f"{PATH_PREFIX}/avatar-pack":
            try:
                pack_id = resolve_pack_id(parsed.query)
                self.send_json(delete_avatar_pack(pack_id))
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
