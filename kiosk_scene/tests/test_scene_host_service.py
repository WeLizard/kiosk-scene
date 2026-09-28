from __future__ import annotations

import io
import json
import unittest
import zipfile
from pathlib import Path

from .helpers import load_module, scene_env


def make_manifest(pack_dir: Path, **overrides) -> None:
    manifest = {
        "version": 1,
        "name": "Test",
        "adapter": "live2d",
        "assetRoot": "./",
        "modelUrl": "./model.model3.json",
        "motionMapUrl": "./motion-map.json",
        "capabilities": {},
    }
    manifest.update(overrides)
    pack_dir.mkdir(parents=True, exist_ok=True)
    (pack_dir / "avatar.manifest.json").write_text(json.dumps(manifest), encoding="utf-8")


class BootstrapTests(unittest.TestCase):
    def test_stale_display_config_is_not_used(self) -> None:
        with scene_env() as root:
            config = load_module("scene_config_service")
            host = load_module("scene_host_service")
            config.save_scene_config({"version": 1, "rotation": {"order": ["a"]}, "pages": [{"id": "a"}]})
            pack = root / "scene-packs" / "demo"
            self.assertEqual(host.resolve_runtime_scene_config_name(pack), "scene.display.json")
            # Hand-edit the source: the compiled file is now stale and must not shadow it.
            (pack / "scene.default.json").write_text(
                json.dumps({"version": 1, "pages": [{"id": "b"}]}), encoding="utf-8"
            )
            self.assertEqual(host.resolve_runtime_scene_config_name(pack), "scene.default.json")

    def test_legacy_display_config_without_digest_is_ignored(self) -> None:
        with scene_env() as root:
            host = load_module("scene_host_service")
            pack = root / "scene-packs" / "demo"
            (pack / "scene.default.json").write_text("{}", encoding="utf-8")
            (pack / "scene.display.json").write_text(json.dumps({"kind": "scene.display"}), encoding="utf-8")
            self.assertEqual(host.resolve_runtime_scene_config_name(pack), "scene.default.json")

    def test_active_pack_id_cannot_escape_the_packs_directory(self) -> None:
        with scene_env() as root:
            host = load_module("scene_host_service")
            (root / "active-pack.json").write_text('{"id": "../../etc"}', encoding="utf-8")
            self.assertEqual(host.load_active_pack_id(), "demo")
            (root / "active-pack.json").write_text('{"id": "ok-pack_1"}', encoding="utf-8")
            self.assertEqual(host.load_active_pack_id(), "ok-pack_1")


class AvatarPackTests(unittest.TestCase):
    def test_motion_map_path_cannot_leave_the_pack(self) -> None:
        with scene_env() as root:
            host = load_module("scene_host_service")
            make_manifest(root / "avatar-packs" / "evil", motionMapUrl="../../../outside.json")
            outside = root.parent / "outside.json"
            with self.assertRaises(ValueError):
                host.save_avatar_pack_motion_map("evil", {"motionMap": {"motions": [], "semantic": {}}})
            self.assertFalse(outside.exists())
            self.assertFalse((root / "outside.json").exists())

    def test_saving_motion_map_without_motion_map_url_is_a_client_error(self) -> None:
        with scene_env() as root:
            host = load_module("scene_host_service")
            make_manifest(root / "avatar-packs" / "nomap", motionMapUrl="")
            with self.assertRaises(ValueError):
                host.save_avatar_pack_motion_map("nomap", {"motionMap": {"motions": [], "semantic": {}}})

    def test_motion_map_round_trip(self) -> None:
        with scene_env() as root:
            host = load_module("scene_host_service")
            make_manifest(root / "avatar-packs" / "ok")
            payload = {"motionMap": {"motions": [{"index": 0}], "semantic": {"idle": [0]}}}
            host.save_avatar_pack_motion_map("ok", payload)
            details = host.load_avatar_pack_details("ok")
            self.assertEqual(details["motionMap"], payload["motionMap"])

    def test_zip_with_path_traversal_is_rejected(self) -> None:
        with scene_env() as root:
            host = load_module("scene_host_service")
            buffer = io.BytesIO()
            with zipfile.ZipFile(buffer, "w") as archive:
                archive.writestr("../evil.txt", "x")
            archive_path = root / "bad.zip"
            archive_path.write_bytes(buffer.getvalue())
            with self.assertRaises(ValueError):
                host.safe_extract_zip(archive_path, root / "out")

    def test_avatar_pack_ids_are_validated(self) -> None:
        with scene_env():
            host = load_module("scene_host_service")
            for bad in ("../x", "a/b", "", "Has Space"):
                with self.subTest(bad):
                    with self.assertRaises((ValueError, FileNotFoundError)):
                        host.load_avatar_pack_details(bad)


if __name__ == "__main__":
    unittest.main()
