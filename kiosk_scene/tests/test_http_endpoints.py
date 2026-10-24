from __future__ import annotations

import http.client
import json
import threading
import unittest
import urllib.error
import urllib.request
from contextlib import contextmanager
from http.server import ThreadingHTTPServer

from .helpers import load_module, scene_env

ADMIN = {"X-Scene-Admin": "1", "X-Scene-Client": "editor"}
JSON_ADMIN = {**ADMIN, "Content-Type": "application/json"}


@contextmanager
def serve(handler_cls):
    server = ThreadingHTTPServer(("127.0.0.1", 0), handler_cls)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    try:
        yield f"http://127.0.0.1:{server.server_address[1]}"
    finally:
        server.shutdown()
        server.server_close()


def request(url: str, method: str = "GET", body: bytes | None = None, headers: dict | None = None):
    req = urllib.request.Request(url, data=body, method=method, headers=headers or {})
    try:
        with urllib.request.urlopen(req, timeout=5) as response:
            return response.status, json.loads(response.read().decode("utf-8") or "null")
    except urllib.error.HTTPError as error:
        return error.code, json.loads(error.read().decode("utf-8") or "null")


class ConfigServiceHttpTests(unittest.TestCase):
    def test_save_and_reload_config_over_http(self) -> None:
        with scene_env(SCENE_EDITOR_PATH_PREFIX="/scene-editor-form"):
            service = load_module("scene_config_service")
            with serve(service.SceneConfigHandler) as base:
                payload = {"version": 1, "rotation": {"order": ["A"]}, "pages": [{"id": "A", "title": "A"}]}
                status, body = request(
                    base + "/scene-editor-form/api/config",
                    "POST",
                    json.dumps({"config": payload, "expectedPackId": "demo"}).encode(),
                    JSON_ADMIN,
                )
                self.assertEqual(status, 200, body)
                status, body = request(base + "/scene-editor-form/api/config", headers=ADMIN)
                self.assertEqual(status, 200)
                self.assertEqual(body["config"]["pages"][0]["id"], "A")

    def test_config_api_requires_admin_and_json(self) -> None:
        with scene_env(SCENE_EDITOR_PATH_PREFIX="/scene-editor-form"):
            service = load_module("scene_config_service")
            with serve(service.SceneConfigHandler) as base:
                url = base + "/scene-editor-form/api/config"
                self.assertEqual(request(url)[0], 403)
                self.assertEqual(request(url, "POST", b"{}")[0], 403)
                self.assertEqual(request(url, "POST", b"{}", ADMIN)[0], 415)
                host, port = base.removeprefix("http://").split(":")
                conn = http.client.HTTPConnection(host, int(port), timeout=5)
                conn.request("GET", "/scene-editor-form/", headers=ADMIN)
                response = conn.getresponse()
                self.assertEqual(response.status, 302)
                self.assertEqual(response.getheader("Location"), "../scene-editor/")
                conn.close()

    def test_bad_requests_are_client_errors(self) -> None:
        with scene_env(SCENE_EDITOR_PATH_PREFIX="/scene-editor-form"):
            service = load_module("scene_config_service")
            with serve(service.SceneConfigHandler) as base:
                url = base + "/scene-editor-form/api/config"
                self.assertEqual(request(url, "POST", b"not json", JSON_ADMIN)[0], 400)
                self.assertEqual(request(url, "POST", b"[1,2]", JSON_ADMIN)[0], 400)
                self.assertEqual(request(url, "POST", b'{"version":1,"pages":[],"x":NaN}', JSON_ADMIN)[0], 400)
                # Claim an oversized body without sending it: the server must answer from
                # the header alone instead of buffering the payload.
                import http.client

                host, port = base.removeprefix("http://").split(":")
                conn = http.client.HTTPConnection(host, int(port), timeout=5)
                conn.putrequest("POST", "/scene-editor-form/api/config")
                conn.putheader("X-Scene-Admin", "1")
                conn.putheader("X-Scene-Client", "editor")
                conn.putheader("Content-Type", "application/json")
                conn.putheader("Content-Length", str(service.MAX_CONFIG_BODY_BYTES + 10))
                conn.endheaders()
                self.assertEqual(conn.getresponse().status, 413)
                conn.close()

    def test_stale_editor_save_is_rejected(self) -> None:
        with scene_env(SCENE_EDITOR_PATH_PREFIX="/scene-editor-form") as root:
            service = load_module("scene_config_service")
            with serve(service.SceneConfigHandler) as base:
                payload = {"config": {"version": 1, "pages": []}, "expectedPackId": "demo"}
                (root / "active-pack.json").write_text('{"id": "other"}', encoding="utf-8")
                status, body = request(
                    base + "/scene-editor-form/api/config",
                    "POST",
                    json.dumps(payload).encode(),
                    JSON_ADMIN,
                )
                self.assertEqual(status, 409, body)
                self.assertFalse((root / "scene-packs" / "other" / "scene.default.json").exists())


class HostServiceHttpTests(unittest.TestCase):
    def test_bootstrap_and_unknown_endpoint(self) -> None:
        with scene_env():
            host = load_module("scene_host_service")
            with serve(host.SceneHostHandler) as base:
                status, body = request(base + "/scene-api/bootstrap")
                self.assertEqual(status, 200)
                self.assertEqual(body["packId"], "demo")
                self.assertEqual(request(base + "/scene-api/nope")[0], 404)

    def test_invalid_content_length_is_rejected(self) -> None:
        with scene_env():
            host = load_module("scene_host_service")
            with serve(host.SceneHostHandler) as base:
                status, _ = request(
                    base + "/scene-api/avatar-pack?packId=x",
                    "POST",
                    b"{}",
                    JSON_ADMIN,
                )
                self.assertIn(status, (400, 404))
                self.assertEqual(
                    request(base + "/scene-api/avatar-pack?packId=x", "POST", b"{}", {"Content-Type": "application/json"})[0],
                    403,
                )

    def test_scene_mutation_requires_admin_headers(self) -> None:
        with scene_env() as root:
            host = load_module("scene_host_service")
            pack = root / "scene-packs" / "demo"
            (pack / "renderer.kiosk-scene.json").write_text('{"version": 1}', encoding="utf-8")
            (pack / "scene.default.json").write_text('{"pages": []}', encoding="utf-8")
            with serve(host.SceneHostHandler) as base:
                status, catalog = request(base + "/scene-api/scene-catalog")
                self.assertEqual(status, 200)
                self.assertEqual([item["id"] for item in catalog["items"]], ["demo"])
                body = json.dumps({"sourcePackId": "demo", "newPackId": "copy"}).encode()
                self.assertEqual(request(base + "/scene-api/scene-pack/clone", "POST", body)[0], 403)
                self.assertFalse((root / "scene-packs" / "copy").exists())
                headers = {"X-Scene-Admin": "1", "X-Scene-Client": "admin-page"}
                self.assertEqual(request(base + "/scene-api/scene-pack/clone", "POST", body, headers)[0], 200)
                self.assertEqual(request(base + "/scene-api/scene-pack/clone", "POST", body, headers)[0], 409)
                select = json.dumps({"packId": "copy", "expectedPackId": "demo"}).encode()
                self.assertEqual(request(base + "/scene-api/scene-pack/select", "POST", select, headers)[0], 200)
                self.assertEqual(request(base + "/scene-api/scene-pack/select", "POST", select, headers)[0], 409)


if __name__ == "__main__":
    unittest.main()
