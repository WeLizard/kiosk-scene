import { createLongPollSource, injectStyles, setUiStrings } from "@kiosk-scene/app-shell";
import { KIT_CSS } from "@kiosk-scene/app-shell/kit-css";
import { EXTENSION_API_VERSION, type Extension, type ExtensionHost, type PageDefinition } from "@kiosk-scene/core";
import { EVENTS_SOURCE_ID, createApi, storeToken } from "./api.js";
import { T } from "./i18n.js";
import { mountActivity } from "./pages/activity.js";
import { mountCalendar } from "./pages/calendar.js";
import { mountIntegrations } from "./pages/integrations.js";
import { mountInventory } from "./pages/inventory.js";
import { mountLocations } from "./pages/locations.js";
import { mountMemory } from "./pages/memory.js";
import { mountReview } from "./pages/review.js";
import { mountSearch } from "./pages/search.js";
import { mountSettings } from "./pages/settings.js";
import { mountTasks } from "./pages/tasks.js";
import { mountToday } from "./pages/today.js";
import { createServices } from "./services.js";
import { DOMOVOY_CSS } from "./styles.js";
import { WIDGETS } from "./widgets.js";
import { askForToken } from "./token.js";

const PAGES: PageDefinition[] = [
  { id: "domovoy.today", title: T.today, icon: "🏠", modes: ["admin", "kiosk"], order: 10, mount: mountToday },
  { id: "domovoy.search", title: T.search, icon: "🔎", modes: ["admin"], order: 20, mount: mountSearch },
  { id: "domovoy.inventory", title: T.inventory, icon: "📦", modes: ["admin"], order: 30, group: "Дом", mount: mountInventory },
  { id: "domovoy.locations", title: T.locations, icon: "🗄️", modes: ["admin"], order: 40, group: "Дом", mount: mountLocations },
  { id: "domovoy.calendar", title: T.calendar, icon: "📅", modes: ["admin"], order: 50, group: "Планы", mount: mountCalendar },
  { id: "domovoy.tasks", title: T.tasks, icon: "✅", modes: ["admin"], order: 60, group: "Планы", mount: mountTasks },
  { id: "domovoy.memory", title: T.memory, icon: "🧠", modes: ["admin"], order: 70, group: "Дом", mount: mountMemory },
  { id: "domovoy.review", title: T.review, icon: "🛡️", modes: ["admin"], order: 80, group: "Домовой", mount: mountReview },
  { id: "domovoy.activity", title: T.activity, icon: "📜", modes: ["admin"], order: 90, group: "Домовой", mount: mountActivity },
  { id: "domovoy.integrations", title: T.integrations, icon: "🔌", modes: ["admin"], order: 100, group: "Домовой", mount: mountIntegrations },
  { id: "domovoy.settings", title: T.settings, icon: "⚙️", modes: ["admin"], order: 110, group: "Домовой", mount: mountSettings },
];

/**
 * The Domovoy household assistant, as a KioskScene extension. Everything household-specific lives here and in
 * the `domovoy` backend: the platform packages know only the extension contracts this file implements.
 */
const extension: Extension = {
  manifest: { id: "domovoy", title: "Домовой", version: "0.1.0", apiVersion: EXTENSION_API_VERSION },

  activate(host: ExtensionHost): void {
    const apiBase = typeof host.config.apiBase === "string" && host.config.apiBase ? host.config.apiBase : "../domovoy-api/";
    setUiStrings({ retry: T.retry, cancel: T.cancel, confirm: T.confirm, save: T.save, close: T.close, required: "Обязательное поле", loading: T.loading, nothingHere: T.empty, olderData: "Показаны прежние данные" });
    injectStyles("domovoy-ui-kit", KIT_CSS);
    injectStyles("domovoy-ui", DOMOVOY_CSS);

    const api = createApi({ baseUrl: apiBase, onUnauthorized: () => askForToken(storeToken) });
    host.registerDataProvider(api.data);
    host.registerActionProvider(api.actions);
    host.registerRealtimeSource(createLongPollSource({ id: EVENTS_SOURCE_ID, http: api.http, waitSeconds: 25, pauseWhenHidden: true }));
    for (const page of PAGES) {
      host.registerPage(page);
    }
    for (const widget of WIDGETS) {
      host.registerWidget(widget);
    }
    for (const service of createServices(api.http)) {
      host.registerService(service);
    }
  },
};

export default extension;
export { PAGES, WIDGETS };
