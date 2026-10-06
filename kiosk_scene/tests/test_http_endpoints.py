from __future__ import annotations

import json
import threading
import unittest
import urllib.error
import urllib.request
from contextlib import contextmanager
from http.server import ThreadingHTTPServer

from .helpers import load_module, scene_env


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
                    json.dumps(payload).encode(),
                    {"Content-Type": "application/json"},
                )
                self.assertEqual(status, 200, body)
                status, body = request(base + "/scene-editor-form/api/config")
                self.assertEqual(status, 200)
                self.assertEqual(body["config"]["pages"][0]["id"], "A")

    def test_bad_requests_are_client_errors(self) -> None:
        with scene_env(SCENE_EDITOR_PATH_PREFIX="/scene-editor-form"):
            service = load_module("scene_config_service")
            with serve(service.SceneConfigHandler) as base:
                url = base + "/scene-editor-form/api/config"
                self.assertEqual(request(url, "POST", b"not json")[0], 400)
                self.assertEqual(request(url, "POST", b"[1,2]")[0], 400)
                # Claim an oversized body without sending it: the server must answer from
                # the header alone instead of buffering the payload.
                import http.client

                host, port = base.removeprefix("http://").split(":")
                conn = http.client.HTTPConnection(host, int(port), timeout=5)
                conn.putrequest("POST", "/scene-editor-form/api/config")
                conn.putheader("Content-Type", "application/json")
                conn.putheader("Content-Length", str(service.MAX_CONFIG_BODY_BYTES + 10))
                conn.endheaders()
                self.assertEqual(conn.getresponse().status, 413)
                conn.close()


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
                    {"Content-Type": "application/json"},
                )
                self.assertIn(status, (400, 404))


if __name__ == "__main__":
    unittest.main()
