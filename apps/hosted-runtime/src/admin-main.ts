import { ExtensionRegistry } from "@kiosk-scene/core";
import { mountAdminApp } from "@kiosk-scene/app-shell";
import "@kiosk-scene/app-shell/styles";
import { loadBootstrap, resolveBootstrapUrl, resolveHostedUrl, retryBoot } from "./bootstrap";
import { loadBootstrapExtensions } from "./kiosk-extensions";
import { resolveUiLang } from "./locale";
import { renderStatus } from "./status";
import { createSettingsExtension } from "./settings-page";

const STRINGS = {
  ru: {
    title: "KioskScene · администрирование",
    loading: "Загружаю приложения…",
    failed: "Не удалось связаться с add-on. Повторяю попытку автоматически.",
    kiosk: "Экран киоска",
    editor: "Редактор сцены",
    sections: "Разделы",
    menu: "Меню",
    noPages: "Нет установленных приложений",
    noPagesHint: "Включите расширение в настройках add-on, чтобы его разделы появились здесь.",
    notFound: "Такой страницы нет",
    live: "На связи",
    reconnecting: "Переподключение…",
    offline: "Нет связи — показаны сохранённые данные",
    connecting: "Подключение…",
  },
  en: {
    title: "KioskScene · administration",
    loading: "Loading applications…",
    failed: "Could not reach the add-on. Retrying automatically.",
    kiosk: "Kiosk display",
    editor: "Scene editor",
    sections: "Sections",
    menu: "Menu",
    noPages: "No applications are installed",
    noPagesHint: "Enable an extension in the add-on options to see its pages here.",
    notFound: "This page does not exist",
    live: "Live",
    reconnecting: "Reconnecting…",
    offline: "Offline — showing saved data",
    connecting: "Connecting…",
  },
};

const root = document.getElementById("app");
if (!root) {
  throw new Error("Missing #app root element");
}
const container: HTMLElement = root;
const lang = resolveUiLang();
const text = STRINGS[lang];
document.documentElement.lang = lang;
renderStatus(container, text.title, text.loading);

async function boot(): Promise<void> {
  const bootstrapUrl = resolveBootstrapUrl();
  const bootstrap = await loadBootstrap(bootstrapUrl);
  const registry = new ExtensionRegistry();
  const avatarEditorUrl = new URL(resolveHostedUrl(String(bootstrap.entryUrl || "/scene-runtime/"), bootstrapUrl));
  avatarEditorUrl.searchParams.set("editor", "1");
  avatarEditorUrl.searchParams.set("editorTab", "avatar");
  await loadBootstrapExtensions(registry, bootstrap, bootstrapUrl);
  await registry.load(createSettingsExtension({
    lang,
    catalogUrl: resolveHostedUrl(bootstrap.files?.sceneCatalogUrl || "/scene-api/scene-catalog", bootstrapUrl),
    avatarCatalogUrl: resolveHostedUrl(bootstrap.files?.avatarCatalogUrl || "/scene-api/avatar-catalog", bootstrapUrl),
    sceneEditorApiUrl: resolveHostedUrl(bootstrap.sceneEditorApiUrl || "/scene-editor-form/api/config", bootstrapUrl),
    capabilitiesUrl: resolveHostedUrl(bootstrap.files?.adminCapabilitiesUrl || "/scene-api/admin-capabilities", bootstrapUrl),
    selectUrl: resolveHostedUrl(bootstrap.files?.sceneSelectUrl || "/scene-api/scene-pack/select", bootstrapUrl),
    cloneUrl: resolveHostedUrl(bootstrap.files?.sceneCloneUrl || "/scene-api/scene-pack/clone", bootstrapUrl),
    avatarEditorUrl: avatarEditorUrl.toString(),
    hasDomovoy: registry.listExtensions().some((extension) => extension.id === "domovoy"),
  }));
  const app = mountAdminApp(container, {
    registry,
    title: text.title,
    locale: navigator.language,
    defaultPageId: "kiosk-scene.settings",
    resolveUrl: (url) => resolveHostedUrl(url, bootstrapUrl),
    labels: {
      sections: text.sections,
      menu: text.menu,
      noPages: text.noPages,
      noPagesHint: text.noPagesHint,
      notFound: text.notFound,
      live: text.live,
      reconnecting: text.reconnecting,
      offline: text.offline,
      connecting: text.connecting,
    },
    footerLinks: [
      { label: text.kiosk, href: resolveHostedUrl(String(bootstrap.entryUrl || "/scene-runtime/"), bootstrapUrl) },
      { label: text.editor, href: resolveHostedUrl(String(bootstrap.sceneEditorUrl || "/scene-editor/"), bootstrapUrl) },
    ],
  });
  // `persisted` = the page is going into the back/forward cache and may come back: keep it alive.
  window.addEventListener("pagehide", (event) => {
    if (!event.persisted) {
      app.dispose();
    }
  });
}

void retryBoot(boot, {
  onRetry(error, _attempt, waitMs) {
    renderStatus(container, text.title, `${text.failed} (${Math.round(waitMs / 1000)}s)`, String(error));
  },
});
