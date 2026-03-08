import { bootstrapSceneShellApp } from "@kiosk-scene/shell-browser";
import "@kiosk-scene/shell-browser/styles";

interface SceneHostBootstrap {
  success?: boolean;
  packId?: string;
  sceneEditorUrl?: string;
  files?: {
    rendererConfigUrl?: string;
    sceneConfigUrl?: string;
    entityMapUrl?: string;
    avatarManifestUrl?: string;
  };
  availability?: Record<string, boolean>;
}

const DEFAULT_BOOTSTRAP_URL = "/scene-api/bootstrap";

function resolveBootstrapUrl(): string {
  const params = new URLSearchParams(window.location.search);
  return params.get("bootstrap") || DEFAULT_BOOTSTRAP_URL;
}

function renderStatus(root: HTMLElement, title: string, body: string, details?: string): void {
  root.innerHTML = `
    <section style="min-height:100vh;display:grid;place-items:center;padding:24px;background:linear-gradient(180deg,#eef4f8 0%,#dce8f0 100%);color:#203041;font-family:'Aptos','Segoe UI',sans-serif;">
      <div style="max-width:720px;padding:28px;border-radius:28px;background:rgba(255,255,255,0.82);border:1px solid rgba(32,48,65,0.08);box-shadow:0 24px 60px rgba(90,112,132,0.18);">
        <h1 style="margin:0 0 12px;font-size:28px;line-height:1.05;letter-spacing:-0.04em;">${title}</h1>
        <p style="margin:0 0 12px;font-size:15px;line-height:1.5;color:rgba(32,48,65,0.78);">${body}</p>
        ${details ? `<pre style="margin:0;padding:14px 16px;border-radius:18px;background:#f4f8fb;border:1px solid rgba(32,48,65,0.08);overflow:auto;font-size:12px;line-height:1.45;">${details}</pre>` : ""}
      </div>
    </section>
  `;
}

async function loadBootstrap(url: string): Promise<SceneHostBootstrap> {
  const response = await fetch(url, { cache: "no-store" });
  const payload = await response.json() as SceneHostBootstrap;
  if (!response.ok || payload.success === false) {
    throw new Error(`Failed to load ${url}: HTTP ${response.status}`);
  }
  return payload;
}

const root = document.getElementById("app");
if (!root) {
  throw new Error("Missing #app root element");
}

renderStatus(root, "Starting scene host", "Loading hosted kiosk-scene bootstrap...");

void (async () => {
  const bootstrapUrl = resolveBootstrapUrl();
  try {
    const bootstrap = await loadBootstrap(bootstrapUrl);
    const rendererConfigUrl = String(bootstrap.files?.rendererConfigUrl || "").trim();
    if (!rendererConfigUrl) {
      renderStatus(
        root,
        "Scene host is missing a renderer config",
        "The OpenClaw host is up, but the active pack does not provide renderer.kiosk-scene.json yet.",
        JSON.stringify(bootstrap, null, 2),
      );
      return;
    }

    document.documentElement.dataset.packId = String(bootstrap.packId || "");
    document.title = bootstrap.packId
      ? `kiosk-scene hosted runtime (${bootstrap.packId})`
      : "kiosk-scene hosted runtime";

    await bootstrapSceneShellApp(root, {
      rendererConfigUrl,
      iconBaseUrl: "./assets",
    });
  } catch (error) {
    renderStatus(
      root,
      "Scene host failed to start",
      "The hosted runtime could not load its bootstrap payload from OpenClaw Assistant.",
      String(error),
    );
  }
})();
