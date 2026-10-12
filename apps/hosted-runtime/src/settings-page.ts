import type { Extension } from "@kiosk-scene/core";
import "./settings-page.css";

interface ScenePack { id: string; name: string; pageCount: number; active: boolean }
interface SceneCatalog { success: boolean; activePackId: string; items: ScenePack[] }
interface AvatarCatalog { success: boolean; items: Array<{ id: string; name: string }> }
interface SceneConfigResponse {
  success: boolean;
  packId: string;
  config?: { avatar?: { packId?: string | null } };
}

export interface SettingsPageOptions {
  lang: "ru" | "en";
  catalogUrl: string;
  avatarCatalogUrl: string;
  sceneEditorApiUrl: string;
  capabilitiesUrl: string;
  selectUrl: string;
  cloneUrl: string;
  avatarEditorUrl: string;
  hasDomovoy: boolean;
}

const COPY = {
  ru: {
    title: "Настройки Kiosk Scene",
    intro: "Сцена задаёт страницы экрана. Аватар — персонаж внутри выбранной сцены.",
    scene: "Сцена", sceneHint: "Выбери готовую сцену или создай копию для своих изменений.",
    active: "Активная сцена", pages: "страниц", sceneCount: "сцен",
    select: "Применить сцену", clone: "Создать копию", cloneOpen: "Создать копию сцены",
    newId: "ID новой сцены", newIdHint: "Латинские буквы, цифры, точка, дефис или подчёркивание.",
    avatar: "Аватар", avatarHint: "Выбор, импорт и движения персонажа находятся в редакторе сцены.",
    avatarOpen: "Открыть аватары", avatarLoading: "Загружаю библиотеку аватаров…",
    avatarUnavailable: "Не удалось прочитать библиотеку. Открой редактор, чтобы проверить её.",
    avatarStale: "Сцена изменилась. Обнови страницу, чтобы увидеть её аватар.",
    avatarBuiltIn: "Встроенный аватар сцены", avatarMissing: "нет в библиотеке",
    avatarCount: "дополнительных аватаров доступно",
    addon: "Параметры приложения", addonHint: "Часовой пояс, Домовой и микрофон киоска настраиваются в Home Assistant.",
    addonOpen: "Открыть конфигурацию", addonPath: "Home Assistant → Приложения → Kiosk Scene → Конфигурация",
    domovoy: "Домовой", domovoyHint: "Напоминания, голос и подключения домашнего помощника.",
    domovoyOpen: "Настройки Домового", integrations: "Интеграции",
    enableDomovoy: "Домовой отключён. Включи его в конфигурации приложения.",
    restricted: "Изменения доступны через Home Assistant ingress.",
    refreshed: "Настройки обновлены.", loading: "Загружаю настройки…",
    noScenes: "Валидных сцен не найдено.", error: "Не удалось выполнить действие",
    changed: "Активная сцена изменилась. Обнови страницу.",
  },
  en: {
    title: "Kiosk Scene settings",
    intro: "A scene defines the display pages. An avatar is the character within the selected scene.",
    scene: "Scene", sceneHint: "Choose a scene or make a copy for your own changes.",
    active: "Active scene", pages: "pages", sceneCount: "scenes",
    select: "Use scene", clone: "Create copy", cloneOpen: "Create a scene copy",
    newId: "New scene ID", newIdHint: "Letters, numbers, periods, hyphens, or underscores.",
    avatar: "Avatar", avatarHint: "Choose, import, and map character motions in the scene editor.",
    avatarOpen: "Open avatars", avatarLoading: "Loading avatar library…",
    avatarUnavailable: "The avatar library could not be loaded. Open the editor to check it.",
    avatarStale: "The scene changed. Refresh to see its avatar.",
    avatarBuiltIn: "Built-in scene avatar", avatarMissing: "missing from library",
    avatarCount: "additional avatars available",
    addon: "App configuration", addonHint: "Set the timezone, Domovoy, and kiosk microphone in Home Assistant.",
    addonOpen: "Open configuration", addonPath: "Home Assistant → Apps → Kiosk Scene → Configuration",
    domovoy: "Domovoy", domovoyHint: "Reminders, voice, and home assistant connections.",
    domovoyOpen: "Domovoy settings", integrations: "Integrations",
    enableDomovoy: "Domovoy is off. Enable it in app configuration.",
    restricted: "Changes are available through Home Assistant ingress.",
    refreshed: "Settings updated.", loading: "Loading settings…",
    noScenes: "No valid scenes found.", error: "Action failed",
    changed: "The active scene changed. Refresh this page.",
  },
};

function element<K extends keyof HTMLElementTagNameMap>(tag: K, className = "", content = ""): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (content) node.textContent = content;
  return node;
}

function link(label: string, href: string, primary = false): HTMLAnchorElement {
  const node = element("a", `ks-btn${primary ? " ks-btn-primary" : ""}`, label);
  node.href = href;
  return node;
}

function addonConfigUrl(): string | null {
  try {
    const match = (window.top?.location.pathname || "").match(/(?:^|\/)([a-z0-9]+_kiosk_scene)(?:\/|$)/);
    return match ? `/config/app/${match[1]}/config` : null;
  } catch {
    return null;
  }
}

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { cache: "no-store", headers: { "X-Scene-Client": "admin-page" } });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json() as Promise<T>;
}

async function postJson(url: string, body: Record<string, string>): Promise<void> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Scene-Client": "admin-page" },
    body: JSON.stringify(body),
  });
  const payload = await response.json() as { success?: boolean; error?: string };
  if (!response.ok || payload.success === false) {
    const error = new Error(payload.error || `HTTP ${response.status}`);
    error.name = response.status === 409 ? "SceneConflict" : "SceneError";
    throw error;
  }
}

export function createSettingsExtension(options: SettingsPageOptions): Extension {
  const copy = COPY[options.lang];
  return {
    manifest: { id: "kiosk-scene", title: "KioskScene", version: "1.0.0", apiVersion: 1 },
    activate(host) {
      host.registerPage({
        id: "kiosk-scene.settings", title: copy.title, icon: "⚙️", modes: ["admin"], order: 0,
        group: "KioskScene",
        async mount(root) {
          let disposed = false;
          let busy = false;
          let renderVersion = 0;
          root.classList.add("ks-settings-page");
          root.replaceChildren(element("p", "ks-muted", copy.loading));

          const refresh = async (message = ""): Promise<void> => {
            const version = ++renderVersion;
            const [catalog, capabilities] = await Promise.all([
              getJson<SceneCatalog>(options.catalogUrl),
              getJson<{ canManageScenePacks: boolean }>(options.capabilitiesUrl),
            ]);
            if (disposed || version !== renderVersion) return;
            const canManage = capabilities.canManageScenePacks === true;
            const currentScene = catalog.items.find((item) => item.id === catalog.activePackId);
            const status = element("p", "ks-settings-status", message || (canManage ? "" : copy.restricted));
            status.setAttribute("role", "status");
            const intro = element("p", "ks-settings-intro", copy.intro);
            const layout = element("div", "ks-settings-layout");
            const main = element("div", "ks-settings-column");
            const aside = element("div", "ks-settings-column");

            const sceneCard = element("section", "ks-card ks-settings-card");
            sceneCard.append(element("h2", "", copy.scene), element("p", "ks-muted", copy.sceneHint));
            if (currentScene) sceneCard.appendChild(element("p", "ks-settings-meta", `${catalog.items.length} ${copy.sceneCount} · ${currentScene.pageCount} ${copy.pages}`));
            if (!catalog.items.length) sceneCard.appendChild(element("p", "ks-muted", copy.noScenes));
            const sceneField = element("div", "ks-field");
            const sceneLabel = element("label", "", copy.active);
            const sceneSelect = element("select");
            const canSwitchScene = catalog.items.some((item) => item.id !== catalog.activePackId);
            sceneSelect.disabled = !canManage || !canSwitchScene;
            for (const item of catalog.items) {
              const option = element("option");
              option.value = item.id;
              option.textContent = `${item.name} (${item.id}) · ${item.pageCount} ${copy.pages}`;
              option.selected = item.id === catalog.activePackId;
              sceneSelect.appendChild(option);
            }
            sceneLabel.appendChild(sceneSelect);
            sceneField.appendChild(sceneLabel);
            sceneCard.appendChild(sceneField);
            const selectButton = element("button", "ks-btn ks-btn-primary", copy.select);
            selectButton.type = "button";
            selectButton.disabled = !canManage || sceneSelect.value === catalog.activePackId;
            if (canSwitchScene) {
              sceneSelect.addEventListener("change", () => {
                selectButton.disabled = !canManage || sceneSelect.value === catalog.activePackId;
              });
              sceneCard.appendChild(selectButton);
            }

            const cloneDetails = element("details", "ks-settings-details");
            cloneDetails.appendChild(element("summary", "", copy.cloneOpen));
            const cloneField = element("div", "ks-field");
            const cloneLabel = element("label", "", copy.newId);
            const cloneInput = element("input");
            cloneInput.type = "text";
            cloneInput.maxLength = 64;
            cloneInput.pattern = "[A-Za-z0-9][A-Za-z0-9._\\-]*";
            cloneInput.disabled = !canManage || !catalog.items.length;
            cloneLabel.appendChild(cloneInput);
            cloneField.append(cloneLabel, element("small", "ks-field-hint", copy.newIdHint));
            const cloneButton = element("button", "ks-btn", copy.clone);
            cloneButton.type = "button";
            cloneButton.disabled = true;
            cloneInput.addEventListener("input", () => {
              const id = cloneInput.value.trim();
              cloneButton.disabled = !canManage || !/^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/.test(id) || id.includes("..");
            });
            cloneDetails.append(cloneField, cloneButton);
            sceneCard.appendChild(cloneDetails);

            const avatarCard = element("section", "ks-card ks-settings-card ks-settings-avatar");
            avatarCard.append(element("h2", "", copy.avatar), element("p", "ks-muted", copy.avatarHint));
            const avatarSummary = element("div", "ks-settings-avatar-summary", copy.avatarLoading);
            avatarSummary.setAttribute("aria-live", "polite");
            avatarCard.append(avatarSummary, link(copy.avatarOpen, options.avatarEditorUrl, true));
            main.append(sceneCard, avatarCard);

            const addonCard = element("section", "ks-card ks-settings-card");
            addonCard.append(element("h2", "", copy.addon), element("p", "ks-muted", copy.addonHint));
            const configUrl = addonConfigUrl();
            if (configUrl) {
              const configLink = link(copy.addonOpen, configUrl);
              configLink.target = "_top";
              addonCard.appendChild(configLink);
            } else {
              addonCard.appendChild(element("p", "ks-settings-meta", copy.addonPath));
            }
            aside.appendChild(addonCard);

            const domovoyCard = element("section", "ks-card ks-settings-card");
            domovoyCard.append(element("h2", "", copy.domovoy), element("p", "ks-muted", options.hasDomovoy ? copy.domovoyHint : copy.enableDomovoy));
            if (options.hasDomovoy) {
              const actions = element("div", "ks-settings-actions");
              actions.append(link(copy.domovoyOpen, "#/domovoy.settings"), link(copy.integrations, "#/domovoy.integrations"));
              domovoyCard.appendChild(actions);
            }
            aside.appendChild(domovoyCard);
            layout.append(main, aside);
            root.replaceChildren(status, intro, layout);

            const run = async (url: string, body: Record<string, string>): Promise<void> => {
              if (busy || disposed) return;
              busy = true;
              try {
                await postJson(url, body);
                await refresh(copy.refreshed);
              } catch (error) {
                if (disposed) return;
                status.className = "ks-form-error";
                status.textContent = error instanceof Error && error.name === "SceneConflict"
                  ? copy.changed : `${copy.error}: ${String(error)}`;
              } finally {
                busy = false;
              }
            };
            selectButton.addEventListener("click", () => {
              void run(options.selectUrl, { packId: sceneSelect.value, expectedPackId: catalog.activePackId });
            });
            cloneButton.addEventListener("click", () => {
              void run(options.cloneUrl, { sourcePackId: sceneSelect.value, newPackId: cloneInput.value.trim() });
            });

            const [configResult, avatarsResult] = await Promise.allSettled([
              getJson<SceneConfigResponse>(options.sceneEditorApiUrl),
              getJson<AvatarCatalog>(options.avatarCatalogUrl),
            ]);
            if (disposed || version !== renderVersion) return;
            if (configResult.status !== "fulfilled" || avatarsResult.status !== "fulfilled"
              || configResult.value.success === false || avatarsResult.value.success === false) {
              avatarSummary.textContent = copy.avatarUnavailable;
              return;
            }
            if (configResult.value.packId !== catalog.activePackId) {
              avatarSummary.textContent = copy.avatarStale;
              return;
            }
            const packId = String(configResult.value.config?.avatar?.packId || "").trim();
            const avatars = avatarsResult.value.items;
            const selected = avatars.find((item) => item.id === packId);
            const name = packId ? (selected?.name || `${packId} — ${copy.avatarMissing}`) : copy.avatarBuiltIn;
            avatarSummary.replaceChildren(
              element("strong", "ks-settings-avatar-name", name),
              element("span", "ks-settings-avatar-count", `${avatars.length} ${copy.avatarCount}`),
            );
          };

          try {
            await refresh();
          } catch (error) {
            if (!disposed) root.replaceChildren(element("p", "ks-form-error", `${copy.error}: ${String(error)}`));
          }
          return { dispose() { disposed = true; renderVersion += 1; } };
        },
      });
    },
  };
}
