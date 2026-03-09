#!/usr/bin/env python3
from __future__ import annotations

import email.policy
import json
import logging
import os
import shutil
import stat
import tempfile
import zipfile
from email.parser import BytesParser
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path, PurePosixPath
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
            "avatarImportUrl": f"{PATH_PREFIX}/avatar-import",
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


def import_avatar_archive(filename: str, payload: bytes, requested_pack_id: str = "") -> dict[str, Any]:
    preferred_name = Path(filename or "").stem or requested_pack_id or "avatar-pack"
    pack_id = unique_pack_id(requested_pack_id or preferred_name)
    display_name = humanize_name(preferred_name)

    with tempfile.TemporaryDirectory(prefix="kiosk-scene-avatar-import-") as temp_dir_name:
        temp_dir = Path(temp_dir_name)
        archive_path = temp_dir / "upload.zip"
        archive_path.write_bytes(payload)

        extracted_dir = temp_dir / "extracted"
        extracted_dir.mkdir(parents=True, exist_ok=True)
        safe_extract_zip(archive_path, extracted_dir)
        content_root = normalize_extracted_root(extracted_dir)
        if not any(content_root.iterdir()):
            raise ValueError("Archive is empty.")
        model_info = inspect_model_bundle(content_root)
        return write_avatar_pack(pack_id, display_name, content_root, model_info)


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

    def do_POST(self) -> None:
        path = urlsplit(self.path).path.rstrip("/") or "/"
        if path == f"{PATH_PREFIX}/avatar-import":
            self.handle_avatar_import()
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
