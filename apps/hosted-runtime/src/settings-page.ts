import type { Extension } from "@kiosk-scene/core";

interface ScenePack {
  id: string;
  name: string;
  pageCount: number;
  active: boolean;
}

interface SceneCatalog {
  success: boolean;
  activePackId: string;
  items: ScenePack[];
}

export interface SettingsPageOptions {
  lang: "ru" | "en";
  catalogUrl: string;
  capabilitiesUrl: string;
  selectUrl: string;
  cloneUrl: string;
  avatarEditorUrl: string;
  hasDomovoy: boolean;
}

const COPY = {
  ru: {
    title: "Настройки KioskScene", scene: "Сцены", active: "Активная сцена", pages: "Страниц",
    select: "Применить сцену", clone: "Клонировать сцену", newId: "ID новой сцены",
    addon: "Настройки add-on", addonHint: "Часовой пояс, включение Домового и микрофон киоска настраиваются в Kiosk Scene → Configuration. После изменения перезапусти add-on.",
    avatar: "Добавить или выбрать аватар", domovoy: "Настройки Домового", integrations: "Интеграции Домового", enableDomovoy: "Домовой отключён. Включи его в Configuration add-on.",
    restricted: "Изменения доступны через Home Assistant ingress.",
    refreshed: "Настройки обновлены.", loading: "Загружаю настройки…",
    noScenes: "Валидных сцен не найдено.", openSupervisor: "Открыть Supervisor",
    error: "Не удалось выполнить действие", changed: "Активная сцена изменилась. Обнови страницу.",
  },
  en: {
    title: "KioskScene settings", scene: "Scenes", active: "Active scene", pages: "Pages",
    select: "Use scene", clone: "Clone scene", newId: "New scene ID",
    addon: "Add-on configuration", addonHint: "Set the timezone, enable Domovoy, and control the kiosk microphone in Kiosk Scene → Configuration. Restart the add-on after changes.",
    avatar: "Add or choose an avatar", domovoy: "Domovoy settings", integrations: "Domovoy integrations", enableDomovoy: "Domovoy is disabled. Enable it in the add-on Configuration.",
    restricted: "Changes are available through Home Assistant ingress.",
    refreshed: "Settings updated.", loading: "Loading settings…",
    noScenes: "No valid scenes found.", openSupervisor: "Open Supervisor",
    error: "Action failed", changed: "The active scene changed. Refresh this page.",
  },
};

function element<K extends keyof HTMLElementTagNameMap>(tag: K, className = "", content = ""): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (content) node.textContent = content;
  return node;
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
          root.replaceChildren(element("p", "ks-muted", copy.loading));

          const refresh = async (message = ""): Promise<void> => {
            const [catalog, capabilities] = await Promise.all([
              getJson<SceneCatalog>(options.catalogUrl),
              getJson<{ canManageScenePacks: boolean }>(options.capabilitiesUrl),
            ]);
            if (disposed) return;
            const canManage = capabilities.canManageScenePacks === true;
            const status = element("p", "ks-muted", message || (canManage ? "" : copy.restricted));
            status.setAttribute("role", "status");

            const sceneCard = element("section", "ks-card");
            sceneCard.appendChild(element("h2", "", copy.scene));
            if (!catalog.items.length) sceneCard.appendChild(element("p", "ks-muted", copy.noScenes));
            const sceneField = element("div", "ks-field");
            const sceneLabel = element("label", "", copy.active);
            const sceneSelect = element("select") as HTMLSelectElement;
            sceneSelect.disabled = !canManage || !catalog.items.length;
            for (const item of catalog.items) {
              const option = element("option") as HTMLOptionElement;
              option.value = item.id;
              option.textContent = `${item.name} (${item.id}) · ${copy.pages}: ${item.pageCount}`;
              option.selected = item.id === catalog.activePackId;
              sceneSelect.appendChild(option);
            }
            sceneLabel.appendChild(sceneSelect);
            sceneField.appendChild(sceneLabel);
            sceneCard.appendChild(sceneField);
            const sceneActions = element("div", "ks-toolbar");
            const selectButton = element("button", "ks-btn ks-btn-primary", copy.select);
            selectButton.type = "button";
            selectButton.disabled = !canManage || !catalog.items.length;
            sceneActions.appendChild(selectButton);
            sceneCard.appendChild(sceneActions);

            const cloneField = element("div", "ks-field");
            const cloneLabel = element("label", "", copy.newId);
            const cloneInput = element("input") as HTMLInputElement;
            cloneInput.type = "text";
            cloneInput.maxLength = 64;
            cloneInput.pattern = "[A-Za-z0-9][A-Za-z0-9._-]*";
            cloneInput.disabled = !canManage || !catalog.items.length;
            cloneLabel.appendChild(cloneInput);
            cloneField.appendChild(cloneLabel);
            const cloneButton = element("button", "ks-btn", copy.clone);
            cloneButton.type = "button";
            cloneButton.disabled = !canManage || !catalog.items.length;
            sceneCard.append(cloneField, cloneButton);

            const addonCard = element("section", "ks-card");
            addonCard.append(element("h2", "", copy.addon), element("p", "ks-muted", copy.addonHint));
            if (window.location.pathname.startsWith("/api/hassio_ingress/")) {
              const supervisorLink = element("a", "ks-btn", copy.openSupervisor);
              supervisorLink.href = "/hassio/dashboard";
              addonCard.appendChild(supervisorLink);
            }

            const linksCard = element("section", "ks-card");
            const links = element("div", "ks-toolbar");
            const destinations = [[copy.avatar, options.avatarEditorUrl]];
            if (options.hasDomovoy) {
              destinations.push([copy.domovoy, "#/domovoy.settings"], [copy.integrations, "#/domovoy.integrations"]);
            } else {
              linksCard.appendChild(element("p", "ks-muted", copy.enableDomovoy));
            }
            for (const [label, href] of destinations) {
              const link = element("a", "ks-btn", label);
              link.href = href;
              links.appendChild(link);
            }
            linksCard.appendChild(links);
            root.replaceChildren(status, sceneCard, addonCard, linksCard);

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
          };

          try {
            await refresh();
          } catch (error) {
            if (!disposed) root.replaceChildren(element("p", "ks-form-error", `${copy.error}: ${String(error)}`));
          }
          return { dispose() { disposed = true; } };
        },
      });
    },
  };
}
