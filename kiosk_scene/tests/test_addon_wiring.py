"""The add-on as shipped: run.sh's Domovoy section, nginx.conf and the extension seed, with a real nginx in front of a
real Domovoy service. This is where "who is trusted" is decided, so it is tested end to end, not assumed."""
from __future__ import annotations

import json
import os
import shutil
import socket
import subprocess
import sys
import tempfile
import time
import unittest
import urllib.error
import urllib.request
from pathlib import Path

from .helpers import ADDON_DIR, load_module, scene_env

RUN_SH = (ADDON_DIR / "run.sh").read_text(encoding="utf-8")
NGINX = shutil.which("nginx")
TOOLS = all(shutil.which(t) for t in ("bash", "jq", "rsync"))


def free_port() -> int:
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


def lan_address() -> str | None:
    """An address of this machine that is not loopback: requests from it look like LAN traffic to nginx."""
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.connect(("10.255.255.255", 1))
            address = s.getsockname()[0]
    except OSError:
        return None
    return None if address.startswith("127.") else address


def domovoy_block() -> str:
    start = RUN_SH.index("# ---- Domovoy (optional)")
    return RUN_SH[start:RUN_SH.index("for scene_file in renderer.kiosk-scene.json")]


def run_block(root: Path, *, enabled: str = "true", mic: str = "false", room: str = "", networks: str = "") -> Path:
    """Executes the real shell code from run.sh with paths pointed at a scratch directory; returns the origin conf."""
    origin_conf = root / "domovoy-origin.conf"
    script = domovoy_block().replace("/etc/nginx/domovoy-origin.conf", str(origin_conf))
    script = script.replace('IMAGE_EXTENSIONS_SEED_DIR="/opt/kiosk-scene/extensions-seed"', f'IMAGE_EXTENSIONS_SEED_DIR="{ADDON_DIR / "extensions-seed"}"')
    env = {**os.environ, "SCENE_ROOT": str(root / "config" / "kiosk-scene"), "TZNAME": "Europe/Moscow", "DOMOVOY_ENABLED": enabled,
           "DOMOVOY_KIOSK_MIC": mic, "DOMOVOY_KIOSK_ROOM": room, "DOMOVOY_TRUSTED_NETWORKS": networks}
    done = subprocess.run(["bash", "-c", "set -euo pipefail\n" + script], env=env, capture_output=True, text=True, timeout=30)
    if done.returncode != 0:
        raise AssertionError(f"run.sh block failed:\n{done.stderr}")
    return origin_conf


def nginx_conf(root: Path, *, listen: int, domovoy_port: int, origin_conf: Path) -> Path:
    text = (ADDON_DIR / "nginx.conf").read_text(encoding="utf-8")
    text = text.replace("/etc/nginx/domovoy-origin.conf", str(origin_conf)).replace("listen 48123;", f"listen {listen};")
    text = text.replace("127.0.0.1:48099", f"127.0.0.1:{domovoy_port}").replace("/config/kiosk-scene", str(root / "config" / "kiosk-scene"))
    text = text.replace("access_log /dev/stdout;", f"access_log {root / 'access.log'};").replace("error_log /dev/stderr notice;", f"error_log {root / 'error.log'} notice;")
    path = root / "nginx.conf"
    path.write_text(text, encoding="utf-8")
    return path


def get(url: str, *, headers: dict | None = None, method: str = "GET", data: bytes | None = None, timeout: float = 10):
    request = urllib.request.Request(url, headers=headers or {}, method=method, data=data)

    class NoRedirect(urllib.request.HTTPRedirectHandler):
        def redirect_request(self, *args, **kwargs):  # noqa: D102
            return None

    opener = urllib.request.build_opener(NoRedirect)
    try:
        with opener.open(request, timeout=timeout) as response:
            return response.status, response.read(), dict(response.headers)
    except urllib.error.HTTPError as exc:
        return exc.code, exc.read(), dict(exc.headers)


@unittest.skipUnless(NGINX and TOOLS, "nginx, bash, jq and rsync are needed")
class OriginFile(unittest.TestCase):
    def setUp(self) -> None:
        self.root = Path(tempfile.mkdtemp(prefix="addon-wiring-"))
        self.addCleanup(shutil.rmtree, self.root, True)

    def test_only_well_formed_networks_reach_the_nginx_config_and_it_stays_valid(self) -> None:
        conf = run_block(self.root, networks="192.168.1.40\n10.0.0.0/24\n1.2.3.4; } evil { \nnot-an-ip\nfd00::/8\n\n")
        text = conf.read_text(encoding="utf-8")
        for good in ("192.168.1.40 local;", "10.0.0.0/24 local;", "fd00::/8 local;", "127.0.0.1/32 local;", "172.30.32.2/32 ingress;", "default lan;"):
            self.assertIn(good, text)
        self.assertNotIn("evil", text)
        self.assertNotIn("not-an-ip", text)
        config = nginx_conf(self.root, listen=free_port(), domovoy_port=free_port(), origin_conf=conf)
        checked = subprocess.run([NGINX, "-t", "-c", str(config), "-g", f"pid {self.root / 'n.pid'};"], capture_output=True, text=True)
        self.assertEqual(checked.returncode, 0, checked.stderr)

    def test_extension_manifest_follows_the_add_on_options(self) -> None:
        run_block(self.root, enabled="true", mic="true", room="кухня")
        manifest = json.loads((self.root / "config/kiosk-scene/extensions/domovoy/extension.json").read_text(encoding="utf-8"))
        self.assertEqual(manifest["id"], "domovoy")
        self.assertEqual((manifest["enabled"], manifest["module"]), (True, "domovoy.js"))
        self.assertEqual(manifest["config"], {"apiBase": "/domovoy-api/", "mic": {"room": "кухня"}})
        self.assertGreater((self.root / "config/kiosk-scene/extensions/domovoy/domovoy.js").stat().st_size, 10_000)

        with scene_env(SCENE_EXTENSIONS_DIR=str(self.root / "config/kiosk-scene/extensions")):
            host = load_module("scene_host_service")
            found = host.discover_extensions()
            self.assertEqual([e["id"] for e in found], ["domovoy"])
            self.assertTrue(found[0]["moduleUrl"].startswith("/scene-extensions/domovoy/domovoy.js"))
            self.assertEqual(found[0]["config"]["mic"], {"room": "кухня"})

        run_block(self.root, enabled="false", mic="false")
        manifest = json.loads((self.root / "config/kiosk-scene/extensions/domovoy/extension.json").read_text(encoding="utf-8"))
        self.assertEqual((manifest["enabled"], manifest["config"]["mic"]), (False, False))
        with scene_env(SCENE_EXTENSIONS_DIR=str(self.root / "config/kiosk-scene/extensions")):
            self.assertEqual(load_module("scene_host_service").discover_extensions(), [])   # switched off = gone from the scene


@unittest.skipUnless(NGINX and TOOLS, "nginx, bash, jq and rsync are needed")
class BehindNginx(unittest.TestCase):
    """Real nginx (this add-on's nginx.conf) → real Domovoy service."""

    nginx: subprocess.Popen | None = None
    domovoy: subprocess.Popen | None = None
    lan: str | None = None

    @classmethod
    def setUpClass(cls) -> None:
        cls.root = Path(tempfile.mkdtemp(prefix="addon-nginx-"))
        cls.lan = lan_address()
        trusted = ""   # the LAN address is deliberately NOT trusted at first
        cls.origin_conf = run_block(cls.root, networks=trusted)
        cls.data = cls.root / "domovoy-data"
        cls.data.mkdir()
        cls.domovoy_port, cls.port = free_port(), free_port()
        cls.domovoy = subprocess.Popen(
            [sys.executable, str(ADDON_DIR / "domovoy_service.py")], cwd=ADDON_DIR, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
            env={**os.environ, "DOMOVOY_DATA_DIR": str(cls.data), "DOMOVOY_PORT": str(cls.domovoy_port), "DOMOVOY_BIND": "127.0.0.1", "DOMOVOY_TIMEZONE": "Europe/Moscow"})
        cls.start_nginx()
        deadline = time.time() + 15
        while time.time() < deadline:
            try:
                if get(f"http://127.0.0.1:{cls.port}/domovoy-api/health")[0] == 200:
                    break
            except OSError:
                pass
            time.sleep(0.1)
        else:
            raise AssertionError("Domovoy behind nginx never became healthy")

    @classmethod
    def start_nginx(cls) -> None:
        for path in [cls.root] + [p for p in cls.root.rglob("*") if p.is_dir()]:
            path.chmod(0o755)
        config = nginx_conf(cls.root, listen=cls.port, domovoy_port=cls.domovoy_port, origin_conf=cls.origin_conf)
        for path in cls.root.rglob("*"):
            if path.is_file():
                path.chmod(0o644)
        cls.nginx = subprocess.Popen([NGINX, "-c", str(config), "-g", f"pid {cls.root / 'n.pid'}; daemon off;"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        time.sleep(0.5)

    @classmethod
    def stop_nginx(cls) -> None:
        if cls.nginx:
            cls.nginx.terminate()
            cls.nginx.wait(10)
            cls.nginx = None

    @classmethod
    def tearDownClass(cls) -> None:
        cls.stop_nginx()
        if cls.domovoy:
            cls.domovoy.terminate()
            cls.domovoy.wait(10)
        shutil.rmtree(cls.root, ignore_errors=True)

    def url(self, path: str, host: str = "127.0.0.1") -> str:
        return f"http://{host}:{self.port}{path}"

    def test_this_machine_is_trusted_and_can_use_the_api(self) -> None:
        status, body, _ = get(self.url("/domovoy-api/api/state"))
        self.assertEqual(status, 200, body)
        status, body, _ = get(self.url("/domovoy-api/api/command"), method="POST", data=json.dumps({"text": "привет"}).encode(),
                             headers={"Content-Type": "application/json", "X-Domovoy-Client": "t"})
        self.assertEqual(status, 200, body)

    def test_a_lan_device_needs_the_token_and_cannot_claim_to_be_ingress(self) -> None:
        if not self.lan:
            self.skipTest("no non-loopback address on this machine")
        status, body, _ = get(self.url("/domovoy-api/api/state", self.lan))
        self.assertEqual(status, 401, body)
        self.assertEqual(json.loads(body)["error"]["code"], "auth_required")
        # a forged trust header from the client is overwritten by nginx
        forged = get(self.url("/domovoy-api/api/state", self.lan), headers={"X-Domovoy-Origin": "ingress"})
        self.assertEqual(forged[0], 401)
        forged = get(self.url("/domovoy-api/api/state", self.lan), headers={"X-Domovoy-Origin": "local", "X-Real-IP": "127.0.0.1"})
        self.assertEqual(forged[0], 401)
        # ... but the API token works from the LAN
        token = (self.data / "secrets.json").read_text(encoding="utf-8")
        token = json.loads(token)["api_token"]
        ok = get(self.url("/domovoy-api/api/state", self.lan), headers={"Authorization": f"Bearer {token}"})
        self.assertEqual(ok[0], 200)
        # the public health check needs nothing
        self.assertEqual(get(self.url("/domovoy-api/health", self.lan))[0], 200)

    def test_zz_a_listed_network_is_trusted_without_a_token(self) -> None:
        if not self.lan:
            self.skipTest("no non-loopback address on this machine")
        self.assertEqual(get(self.url("/domovoy-api/api/state", self.lan))[0], 401)
        self.stop_nginx()
        type(self).origin_conf = run_block(self.root, networks=self.lan)
        self.start_nginx()
        self.assertEqual(get(self.url("/domovoy-api/api/state", self.lan))[0], 200)

    def test_long_poll_passes_through_unbuffered(self) -> None:
        cursor = json.loads(get(self.url("/domovoy-api/events"))[1])["cursor"]
        started = time.monotonic()
        status, body, _ = get(self.url(f"/domovoy-api/events?since={cursor}&timeout=1.5"), timeout=10)
        self.assertEqual(status, 200)
        self.assertEqual(json.loads(body)["events"], [])
        self.assertGreaterEqual(time.monotonic() - started, 1.0)     # held open by the server, not cut short by the proxy

    def test_oversized_uploads_are_refused_by_nginx(self) -> None:
        status, _, _ = get(self.url("/domovoy-api/api/voice/command"), method="POST", data=b"\0" * (10 * 1024 * 1024),
                           headers={"Content-Type": "audio/wav", "X-Domovoy-Client": "t"}, timeout=30)
        self.assertEqual(status, 413)

    def test_extension_files_admin_redirect_and_missing_paths(self) -> None:
        status, body, headers = get(self.url("/scene-extensions/domovoy/extension.json"))
        self.assertEqual(status, 200)
        self.assertEqual(json.loads(body)["id"], "domovoy")
        status, body, _ = get(self.url("/scene-extensions/domovoy/domovoy.js"))
        self.assertEqual(status, 200)
        self.assertGreater(len(body), 10_000)
        self.assertEqual(get(self.url("/scene-extensions/domovoy/../../etc/passwd"))[0], 404)
        self.assertEqual(get(self.url("/scene-extensions/nothing/x.js"))[0], 404)
        status, _, headers = get(self.url("/admin/"))
        self.assertEqual(status, 302)
        self.assertTrue(headers["Location"].startswith("../scene-runtime/admin.html"))
        self.assertEqual(get(self.url("/admin"))[2]["Location"], "admin/")


if __name__ == "__main__":
    unittest.main()
