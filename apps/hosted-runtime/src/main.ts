import { bootstrapSceneShellApp } from "@kiosk-scene/shell-browser";
import "@kiosk-scene/shell-browser/styles";
import { mountNativeEditorShell } from "./editor-mode";

interface SceneHostBootstrap {
  success?: boolean;
  packId?: string;
  entryUrl?: string;
  runtimeBaseUrl?: string;
  sceneEditorUrl?: string;
  sceneEditorFormUrl?: string;
  sceneEditorApiUrl?: string;
  files?: {
    rendererConfigUrl?: string;
    sceneConfigUrl?: string;
    entityMapUrl?: string;
    avatarManifestUrl?: string;
  };
  availability?: Record<string, boolean>;
}

const DEFAULT_BOOTSTRAP_URL = "../scene-api/bootstrap";

type UiLang = "ru" | "en";

type HostedRuntimeCopy = {
  startingTitle: string;
  startingBody: string;
  missingRendererTitle: string;
  missingRendererBody: string;
  failedTitle: string;
  failedBody: string;
  editorTitle: string;
  editorSubtitle: (packId: string) => string;
  viewOnly: string;
  openForm: string;
  hidePanel: string;
  showPanel: string;
  iframeTitle: string;
};

const COPY: Record<UiLang, HostedRuntimeCopy> = {
  ru: {
    startingTitle: "Запуск сцены",
    startingBody: "Загружаю bootstrap для размещённой версии kiosk-scene...",
    missingRendererTitle: "Не найден renderer config",
    missingRendererBody: "Хост сцены запущен, но в активном pack пока нет renderer.kiosk-scene.json.",
    failedTitle: "Сцена не запустилась",
    failedBody: "Hosted runtime не смог загрузить bootstrap из add-on Kiosk Scene.",
    editorTitle: "Режим редактора сцены",
    editorSubtitle: (packId: string) =>
      `Pack: ${packId || "default"} · Редактирование поверх живого runtime`,
    viewOnly: "Только просмотр",
    openForm: "Открыть форму",
    hidePanel: "Скрыть панель",
    showPanel: "Показать панель",
    iframeTitle: "Форма редактора сцены",
  },
  en: {
    startingTitle: "Starting scene host",
    startingBody: "Loading hosted kiosk-scene bootstrap...",
    missingRendererTitle: "Scene host is missing a renderer config",
    missingRendererBody:
      "The scene host is up, but the active pack does not provide renderer.kiosk-scene.json yet.",
    failedTitle: "Scene host failed to start",
    failedBody: "The hosted runtime could not load its bootstrap payload from the Kiosk Scene add-on.",
    editorTitle: "Scene Editor Mode",
    editorSubtitle: (packId: string) =>
      `Pack: ${packId || "default"} · Preview-first editing on the live kiosk runtime`,
    viewOnly: "View Only",
    openForm: "Open Form",
    hidePanel: "Hide Panel",
    showPanel: "Show Panel",
    iframeTitle: "Scene editor form",
  },
};

function resolveUiLang(): UiLang {
  const locale = String(navigator.language || "").toLowerCase();
  return locale.startsWith("ru") ? "ru" : "en";
}

function resolveBootstrapUrl(): string {
  const params = new URLSearchParams(window.location.search);
  return params.get("bootstrap") || DEFAULT_BOOTSTRAP_URL;
}

function resolveIngressRoot(bootstrapUrl: string): string | null {
  const resolved = new URL(bootstrapUrl, window.location.href);
  for (const marker of ["/scene-api/", "/scene-runtime/", "/scene-editor/"]) {
    const index = resolved.pathname.indexOf(marker);
    if (index >= 0) {
      return new URL(resolved.pathname.slice(0, index + 1), resolved.origin).toString();
    }
  }
  return null;
}

function resolveHostedUrl(value: string, bootstrapUrl: string): string {
  const normalized = String(value || "").trim();
  if (!normalized) {
    return "";
  }
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(normalized)) {
    return normalized;
  }

  const bootstrapBase = new URL(bootstrapUrl, window.location.href);
  if (normalized.startsWith("/")) {
    const ingressRoot = resolveIngressRoot(bootstrapUrl);
    if (ingressRoot) {
      return new URL(normalized.slice(1), ingressRoot).toString();
    }
  }
  return new URL(normalized, bootstrapBase).toString();
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

function isEditorMode(): boolean {
  const params = new URLSearchParams(window.location.search);
  return params.get("editor") === "1";
}

function mountEditorShell(options: {
  packId: string;
  editorFormUrl: string;
  editorApiUrl: string;
  sceneUrl: string;
}): void {
  const copy = COPY[resolveUiLang()];
  const existing = document.getElementById("scene-editor-shell");
  if (existing) {
    existing.remove();
  }

  const wrapper = document.createElement("aside");
  wrapper.id = "scene-editor-shell";
  wrapper.innerHTML = `
    <style>
      #scene-editor-shell {
        position: fixed;
        top: 18px;
        right: 18px;
        bottom: 18px;
        width: min(460px, calc(100vw - 36px));
        z-index: 30;
        display: grid;
        grid-template-rows: auto 1fr;
        border-radius: 28px;
        border: 1px solid rgba(32, 48, 65, 0.12);
        background: rgba(244, 249, 252, 0.78);
        box-shadow: 0 26px 80px rgba(46, 72, 94, 0.26);
        backdrop-filter: blur(18px);
        overflow: hidden;
      }

      #scene-editor-shell[data-collapsed="true"] {
        width: auto;
        bottom: auto;
        background: transparent;
        border: 0;
        box-shadow: none;
        backdrop-filter: none;
        overflow: visible;
      }

      #scene-editor-shell[data-collapsed="true"] .scene-editor-panel {
        display: none;
      }

      #scene-editor-shell .scene-editor-topbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 14px 16px;
        border-bottom: 1px solid rgba(32, 48, 65, 0.08);
        background: linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.52));
      }

      #scene-editor-shell[data-collapsed="true"] .scene-editor-topbar {
        border: 0;
        padding: 0;
        background: transparent;
      }

      #scene-editor-shell .scene-editor-title {
        display: grid;
        gap: 2px;
        min-width: 0;
      }

      #scene-editor-shell .scene-editor-title strong {
        font: 600 15px/1.1 "Aptos", "Segoe UI", sans-serif;
        color: #203041;
        letter-spacing: -0.02em;
      }

      #scene-editor-shell .scene-editor-title span {
        font: 12px/1.3 "Aptos", "Segoe UI", sans-serif;
        color: rgba(32, 48, 65, 0.68);
      }

      #scene-editor-shell .scene-editor-actions {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
        justify-content: flex-end;
      }

      #scene-editor-shell .scene-editor-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 40px;
        padding: 0 14px;
        border-radius: 999px;
        border: 1px solid rgba(62, 98, 122, 0.18);
        background: rgba(255,255,255,0.86);
        color: #203041;
        text-decoration: none;
        font: 13px/1 "Aptos", "Segoe UI", sans-serif;
        cursor: pointer;
      }

      #scene-editor-shell .scene-editor-button.is-accent {
        background: linear-gradient(180deg, rgba(111, 191, 162, 0.22), rgba(111, 191, 162, 0.12));
        border-color: rgba(77, 147, 121, 0.28);
      }

      #scene-editor-shell .scene-editor-panel {
        min-height: 0;
        background: rgba(248, 251, 253, 0.92);
      }

      #scene-editor-shell .scene-editor-frame {
        width: 100%;
        height: 100%;
        border: 0;
        background: transparent;
      }
    </style>
    <div class="scene-editor-topbar">
      <div class="scene-editor-title">
        <strong>${copy.editorTitle}</strong>
        <span>${copy.editorSubtitle(options.packId || "default")}</span>
      </div>
      <div class="scene-editor-actions">
        <a class="scene-editor-button" href="${options.sceneUrl}">${copy.viewOnly}</a>
        <a class="scene-editor-button" href="${options.editorFormUrl}" target="_blank" rel="noreferrer">${copy.openForm}</a>
        <button class="scene-editor-button is-accent" type="button" data-scene-editor-toggle>${copy.hidePanel}</button>
      </div>
    </div>
    <div class="scene-editor-panel">
      <iframe class="scene-editor-frame" src="${options.editorFormUrl}" title="${copy.iframeTitle}"></iframe>
    </div>
  `;

  document.body.appendChild(wrapper);

  const toggleButton = wrapper.querySelector<HTMLButtonElement>("[data-scene-editor-toggle]");
  toggleButton?.addEventListener("click", () => {
    const collapsed = wrapper.dataset.collapsed === "true";
    wrapper.dataset.collapsed = collapsed ? "false" : "true";
    if (toggleButton) {
      toggleButton.textContent = collapsed ? copy.hidePanel : copy.showPanel;
    }
  });

  document.documentElement.dataset.editorMode = "true";
  document.body.dataset.editorMode = "true";
  document.body.style.overflow = "hidden";
  if (options.editorApiUrl) {
    document.documentElement.dataset.editorApiUrl = options.editorApiUrl;
  }
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

const copy = COPY[resolveUiLang()];

renderStatus(root, copy.startingTitle, copy.startingBody);

void (async () => {
  const bootstrapUrl = resolveBootstrapUrl();
  try {
    const bootstrap = await loadBootstrap(bootstrapUrl);
    const rendererConfigUrl = resolveHostedUrl(
      String(bootstrap.files?.rendererConfigUrl || "").trim(),
      bootstrapUrl,
    );
    if (!rendererConfigUrl) {
      renderStatus(
        root,
        copy.missingRendererTitle,
        copy.missingRendererBody,
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

    if (isEditorMode()) {
      await mountNativeEditorShell({
        packId: String(bootstrap.packId || "").trim(),
        sceneApiUrl: resolveHostedUrl(
          String(bootstrap.sceneEditorApiUrl || "").trim(),
          bootstrapUrl,
        ),
        sceneUrl: resolveHostedUrl(
          String(bootstrap.entryUrl || bootstrap.runtimeBaseUrl || "./").trim(),
          bootstrapUrl,
        ),
      });
    }
  } catch (error) {
    renderStatus(
      root,
      copy.failedTitle,
      copy.failedBody,
      String(error),
    );
  }
})();
