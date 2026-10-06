from __future__ import annotations

import json
import threading
import unittest
from pathlib import Path

from .helpers import load_module, scene_env

CASES = json.loads(
    (Path(__file__).resolve().parents[2] / "tests" / "contracts" / "scene-display-cases.json").read_text(
        encoding="utf-8"
    )
)


class SceneDisplayContractTests(unittest.TestCase):
    """The Python compiler and the TS runtime must agree (see scene-display.contract.test.ts)."""

    def test_cases_match_expected_display_config(self) -> None:
        with scene_env():
            service = load_module("scene_config_service")
            for case in CASES:
                with self.subTest(case["name"]):
                    compiled = service.compile_scene_display_config(case["input"])
                    expected = case["expected"]
                    self.assertEqual(compiled["rotation"], expected["rotation"])
                    self.assertEqual(compiled["display"], expected["display"])
                    self.assertEqual([page["id"] for page in compiled["pages"]], expected["pageIds"])
                    for page_id, fields in (expected.get("pages") or {}).items():
                        page = next(item for item in compiled["pages"] if item["id"] == page_id)
                        for key, value in fields.items():
                            self.assertEqual(page[key], value, f"{page_id}.{key}")


class SceneConfigPersistenceTests(unittest.TestCase):
    def test_loading_config_does_not_write_files(self) -> None:
        with scene_env() as root:
            service = load_module("scene_config_service")
            pack = root / "scene-packs" / "demo"
            (pack / "scene.default.json").write_text(json.dumps(CASES[0]["input"]), encoding="utf-8")
            before = sorted(path.name for path in pack.iterdir())
            service.load_scene_config()
            after = sorted(path.name for path in pack.iterdir())
            self.assertEqual(before, after, "GET /api/config must be side-effect free")

    def test_save_writes_source_and_compiled_display_atomically(self) -> None:
        with scene_env() as root:
            service = load_module("scene_config_service")
            service.save_scene_config(CASES[1]["input"])
            pack = root / "scene-packs" / "demo"
            self.assertTrue((pack / "scene.default.json").exists())
            display = json.loads((pack / "scene.display.json").read_text(encoding="utf-8"))
            self.assertEqual(display["rotation"]["order"], ["Weather", "Home", "week"])
            leftovers = [path.name for path in pack.iterdir() if path.name.endswith(".tmp")]
            self.assertEqual(leftovers, [])

    def test_failed_compile_leaves_previous_files_untouched(self) -> None:
        with scene_env() as root:
            service = load_module("scene_config_service")
            service.save_scene_config(CASES[0]["input"])
            pack = root / "scene-packs" / "demo"
            original = (pack / "scene.default.json").read_text(encoding="utf-8")

            def boom(_config):
                raise RuntimeError("compile exploded")

            service.compile_scene_display_config = boom  # type: ignore[assignment]
            with self.assertRaises(RuntimeError):
                service.save_scene_config(CASES[1]["input"])
            self.assertEqual((pack / "scene.default.json").read_text(encoding="utf-8"), original)

    def test_concurrent_saves_never_corrupt_the_file(self) -> None:
        with scene_env() as root:
            service = load_module("scene_config_service")
            errors: list[Exception] = []

            def worker(index: int) -> None:
                try:
                    for _ in range(20):
                        service.save_scene_config(CASES[index % len(CASES)]["input"])
                except Exception as exc:  # pragma: no cover - failure path
                    errors.append(exc)

            threads = [threading.Thread(target=worker, args=(i,)) for i in range(6)]
            for thread in threads:
                thread.start()
            for thread in threads:
                thread.join()
            self.assertEqual(errors, [])
            pack = root / "scene-packs" / "demo"
            json.loads((pack / "scene.default.json").read_text(encoding="utf-8"))
            json.loads((pack / "scene.display.json").read_text(encoding="utf-8"))

    def test_save_rejects_non_object_payloads(self) -> None:
        with scene_env():
            service = load_module("scene_config_service")
            with self.assertRaises(ValueError):
                service.save_scene_config([1, 2, 3])


if __name__ == "__main__":
    unittest.main()
