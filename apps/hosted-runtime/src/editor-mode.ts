import type { SceneCardV1, SceneConfigV1, ScenePageV1 } from "@kiosk-scene/core";

type UiLang = "ru" | "en";

type EditorCopy = {
  title: string;
  subtitle: (packId: string) => string;
  statusLoading: string;
  statusSaved: string;
  statusDirty: string;
  statusFailed: string;
  viewOnly: string;
  save: string;
  saving: string;
  addPage: string;
  hidePanel: string;
  showPanel: string;
  pages: string;
  pageKind: string;
  pageCards: (count: number) => string;
  inspector: string;
  pageSettings: string;
  cards: string;
  cardType: string;
  noCards: string;
  addCard: string;
  remove: string;
  up: string;
  down: string;
  loadError: string;
  saveError: string;
  kindOverview: string;
  kindCards: string;
  kindForecastCards: string;
  fieldPageId: string;
  fieldTitle: string;
  fieldSubtitle: string;
  fieldKind: string;
  fieldSlot: string;
  fieldCardStyle: string;
  fieldStampCaption: string;
  fieldStampValue: string;
  fieldCardCaption: string;
  fieldCardHint: string;
  fieldCardEntity: string;
  fieldCardValue: string;
  fieldCardOnText: string;
  fieldCardOffText: string;
  fieldCardStateEntity: string;
  fieldCardDownEntity: string;
  fieldCardUpEntity: string;
  fieldCardDigits: string;
  fieldCardUnit: string;
  styleFull: string;
  styleMini: string;
  cardEntity: string;
  cardText: string;
  cardTodo: string;
  cardOnOff: string;
  cardBattery: string;
  cardNetwork: string;
  cardTime: string;
  cardPercent: string;
  cardNumber: string;
};

export interface NativeEditorShellOptions {
  packId: string;
  sceneApiUrl: string;
  sceneUrl: string;
}

const PAGE_KIND_OPTIONS = ["overview", "cards", "forecast+cards"] as const;
const CARD_STYLE_OPTIONS = ["full", "mini"] as const;
const CARD_TYPE_OPTIONS = [
  "entity",
  "text",
  "todo",
  "onoff",
  "battery",
  "network",
  "time",
  "percent",
  "number",
] as const;

const COMMON_CARD_FIELDS = ["caption", "hint"] as const;

const COPY: Record<UiLang, EditorCopy> = {
  ru: {
    title: "Редактор сцены",
    subtitle: (packId) => `Pack: ${packId || "default"} · Редактирование прямо поверх живой сцены`,
    statusLoading: "Загружаю конфигурацию сцены...",
    statusSaved: "Сохранено",
    statusDirty: "Есть несохранённые изменения",
    statusFailed: "Ошибка",
    viewOnly: "Только просмотр",
    save: "Сохранить",
    saving: "Сохраняю...",
    addPage: "+ Страница",
    hidePanel: "Скрыть панель",
    showPanel: "Показать панель",
    pages: "Страницы",
    pageKind: "Тип",
    pageCards: (count) => `${count} карточ${count === 1 ? "ка" : count < 5 ? "ки" : "ек"}`,
    inspector: "Инспектор",
    pageSettings: "Параметры страницы",
    cards: "Карточки",
    cardType: "Тип карточки",
    noCards: "На странице пока нет карточек",
    addCard: "+ Карточка",
    remove: "Удалить",
    up: "Выше",
    down: "Ниже",
    loadError: "Не удалось загрузить конфиг сцены",
    saveError: "Не удалось сохранить конфиг сцены",
    kindOverview: "overview",
    kindCards: "cards",
    kindForecastCards: "forecast+cards",
    fieldPageId: "ID страницы",
    fieldTitle: "Заголовок",
    fieldSubtitle: "Подзаголовок",
    fieldKind: "Тип страницы",
    fieldSlot: "Слот",
    fieldCardStyle: "Стиль карточек",
    fieldStampCaption: "Подпись штампа",
    fieldStampValue: "Значение штампа",
    fieldCardCaption: "Подпись",
    fieldCardHint: "Подсказка",
    fieldCardEntity: "Entity",
    fieldCardValue: "Текст / значение",
    fieldCardOnText: "Текст On",
    fieldCardOffText: "Текст Off",
    fieldCardStateEntity: "Entity состояния",
    fieldCardDownEntity: "Entity down",
    fieldCardUpEntity: "Entity up",
    fieldCardDigits: "Digits",
    fieldCardUnit: "Unit",
    styleFull: "full",
    styleMini: "mini",
    cardEntity: "entity",
    cardText: "text",
    cardTodo: "todo",
    cardOnOff: "onoff",
    cardBattery: "battery",
    cardNetwork: "network",
    cardTime: "time",
    cardPercent: "percent",
    cardNumber: "number",
  },
  en: {
    title: "Scene Editor",
    subtitle: (packId) => `Pack: ${packId || "default"} · Edit directly on top of the live scene`,
    statusLoading: "Loading scene config...",
    statusSaved: "Saved",
    statusDirty: "Unsaved changes",
    statusFailed: "Error",
    viewOnly: "View Only",
    save: "Save",
    saving: "Saving...",
    addPage: "+ Page",
    hidePanel: "Hide Panel",
    showPanel: "Show Panel",
    pages: "Pages",
    pageKind: "Kind",
    pageCards: (count) => `${count} cards`,
    inspector: "Inspector",
    pageSettings: "Page settings",
    cards: "Cards",
    cardType: "Card type",
    noCards: "No cards on this page yet",
    addCard: "+ Card",
    remove: "Remove",
    up: "Up",
    down: "Down",
    loadError: "Failed to load scene config",
    saveError: "Failed to save scene config",
    kindOverview: "overview",
    kindCards: "cards",
    kindForecastCards: "forecast+cards",
    fieldPageId: "Page ID",
    fieldTitle: "Title",
    fieldSubtitle: "Subtitle",
    fieldKind: "Page kind",
    fieldSlot: "Slot",
    fieldCardStyle: "Card style",
    fieldStampCaption: "Stamp caption",
    fieldStampValue: "Stamp value",
    fieldCardCaption: "Caption",
    fieldCardHint: "Hint",
    fieldCardEntity: "Entity",
    fieldCardValue: "Text / value",
    fieldCardOnText: "On text",
    fieldCardOffText: "Off text",
    fieldCardStateEntity: "State entity",
    fieldCardDownEntity: "Down entity",
    fieldCardUpEntity: "Up entity",
    fieldCardDigits: "Digits",
    fieldCardUnit: "Unit",
    styleFull: "full",
    styleMini: "mini",
    cardEntity: "entity",
    cardText: "text",
    cardTodo: "todo",
    cardOnOff: "onoff",
    cardBattery: "battery",
    cardNetwork: "network",
    cardTime: "time",
    cardPercent: "percent",
    cardNumber: "number",
  },
};

type EditorState = {
  config: SceneConfigV1 | null;
  selectedPageId: string | null;
  dirty: boolean;
  saving: boolean;
  status: string;
  statusTone: "muted" | "ok" | "bad";
};

function resolveUiLang(): UiLang {
  const locale = String(navigator.language || "").toLowerCase();
  return locale.startsWith("ru") ? "ru" : "en";
}

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function cloneConfig<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function orderedPages(config: SceneConfigV1): ScenePageV1[] {
  const byId = new Map(config.pages.map((page) => [page.id, page]));
  const ordered = config.rotation.order.map((pageId) => byId.get(pageId)).filter(Boolean) as ScenePageV1[];
  const extras = config.pages.filter((page) => !ordered.some((item) => item.id === page.id));
  return [...ordered, ...extras];
}

function pageIndexById(config: SceneConfigV1, pageId: string | null): number {
  if (!pageId) {
    return 0;
  }
  return Math.max(0, orderedPages(config).findIndex((page) => page.id === pageId));
}

function slugify(input: string): string {
  return String(input || "")
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || "page";
}

function uniquePageId(config: SceneConfigV1, seed: string): string {
  const base = slugify(seed);
  let next = base;
  let counter = 2;
  while (config.pages.some((page) => page.id === next)) {
    next = `${base}-${counter}`;
    counter += 1;
  }
  return next;
}

function createPage(config: SceneConfigV1): ScenePageV1 {
  const index = config.pages.length + 1;
  return {
    id: uniquePageId(config, `page-${index}`),
    kind: "cards",
    title: `Page ${index}`,
    subtitle: "",
    slot: index - 1,
    cardStyle: "mini",
    stampCaption: "Page",
    stampValue: `${index} / ${index}`,
    cards: [],
  };
}

function createCard(type: string): SceneCardV1 {
  switch (type) {
    case "text":
      return { type, caption: "Text", value: "—", hint: "" };
    case "todo":
      return { type, caption: "Todo", entity: "", hint: "" };
    case "onoff":
      return { type, caption: "Switch", entity: "", hint: "", onText: "On", offText: "Off" };
    case "battery":
      return { type, caption: "Battery", entity: "", stateEntity: "", hint: "" };
    case "network":
      return { type, caption: "Network", downEntity: "", upEntity: "", hint: "" };
    case "time":
      return { type, caption: "Time", entity: "", hint: "" };
    case "percent":
      return { type, caption: "Percent", entity: "", digits: 0, hint: "" };
    case "number":
      return { type, caption: "Number", entity: "", digits: 0, unit: "", hint: "" };
    default:
      return { type: "entity", caption: "Entity", entity: "", hint: "" };
  }
}

function fieldValue(record: Record<string, unknown>, key: string): string {
  const value = record[key];
  return value === undefined || value === null ? "" : String(value);
}

function pageFieldValue(page: ScenePageV1, key: keyof ScenePageV1): string {
  const value = page[key];
  return value === undefined || value === null ? "" : String(value);
}

function focusScenePageByIndex(index: number): void {
  const dot = document.querySelector<HTMLButtonElement>(`.carousel-dot[data-slide-index="${index}"]`);
  dot?.click();
}

function setSelectedPageParam(pageId: string | null): void {
  const url = new URL(window.location.href);
  if (pageId) {
    url.searchParams.set("editorPage", pageId);
  } else {
    url.searchParams.delete("editorPage");
  }
  window.history.replaceState({}, "", url);
}

function initialSelectedPageId(config: SceneConfigV1): string | null {
  const url = new URL(window.location.href);
  const candidate = url.searchParams.get("editorPage");
  if (candidate && orderedPages(config).some((page) => page.id === candidate)) {
    return candidate;
  }
  return orderedPages(config)[0]?.id || null;
}

async function loadConfig(apiUrl: string): Promise<SceneConfigV1> {
  const response = await fetch(apiUrl, { cache: "no-store" });
  const payload = await response.json() as { success?: boolean; config?: SceneConfigV1 };
  if (!response.ok || payload.success === false || !payload.config) {
    throw new Error(`GET ${apiUrl} failed: HTTP ${response.status}`);
  }
  return cloneConfig(payload.config);
}

async function saveConfig(apiUrl: string, config: SceneConfigV1): Promise<SceneConfigV1> {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(config),
  });
  const payload = await response.json() as { success?: boolean; config?: SceneConfigV1 };
  if (!response.ok || payload.success === false || !payload.config) {
    throw new Error(`POST ${apiUrl} failed: HTTP ${response.status}`);
  }
  return cloneConfig(payload.config);
}

function cardFieldsForType(type: string): string[] {
  switch (type) {
    case "text":
      return [...COMMON_CARD_FIELDS, "value"];
    case "todo":
      return [...COMMON_CARD_FIELDS, "entity"];
    case "onoff":
      return [...COMMON_CARD_FIELDS, "entity", "onText", "offText"];
    case "battery":
      return [...COMMON_CARD_FIELDS, "entity", "stateEntity"];
    case "network":
      return [...COMMON_CARD_FIELDS, "downEntity", "upEntity"];
    case "time":
      return [...COMMON_CARD_FIELDS, "entity"];
    case "percent":
      return [...COMMON_CARD_FIELDS, "entity", "digits"];
    case "number":
      return [...COMMON_CARD_FIELDS, "entity", "digits", "unit"];
    default:
      return [...COMMON_CARD_FIELDS, "entity"];
  }
}

function pageKindLabel(copy: EditorCopy, kind: string): string {
  if (kind === "cards") {
    return copy.kindCards;
  }
  if (kind === "forecast+cards") {
    return copy.kindForecastCards;
  }
  return copy.kindOverview;
}

function cardTypeLabel(copy: EditorCopy, type: string): string {
  const map: Record<string, string> = {
    entity: copy.cardEntity,
    text: copy.cardText,
    todo: copy.cardTodo,
    onoff: copy.cardOnOff,
    battery: copy.cardBattery,
    network: copy.cardNetwork,
    time: copy.cardTime,
    percent: copy.cardPercent,
    number: copy.cardNumber,
  };
  return map[type] || type;
}

function labelForField(copy: EditorCopy, field: string): string {
  const map: Record<string, string> = {
    caption: copy.fieldCardCaption,
    hint: copy.fieldCardHint,
    entity: copy.fieldCardEntity,
    value: copy.fieldCardValue,
    onText: copy.fieldCardOnText,
    offText: copy.fieldCardOffText,
    stateEntity: copy.fieldCardStateEntity,
    downEntity: copy.fieldCardDownEntity,
    upEntity: copy.fieldCardUpEntity,
    digits: copy.fieldCardDigits,
    unit: copy.fieldCardUnit,
  };
  return map[field] || field;
}

function renderPageField(label: string, field: string, value: string, wide = false): string {
  return `
    <div class="field ${wide ? "is-wide" : ""}">
      <label for="page-field-${field}">${escapeHtml(label)}</label>
      <input id="page-field-${field}" type="text" data-page-field="${escapeHtml(field)}" value="${escapeHtml(value)}">
    </div>
  `;
}

function renderPageSelect(
  label: string,
  field: string,
  value: string,
  options: Array<{ value: string; label: string }>,
): string {
  return `
    <div class="field">
      <label for="page-select-${field}">${escapeHtml(label)}</label>
      <select id="page-select-${field}" data-page-field="${escapeHtml(field)}">
        ${options.map((option) => `<option value="${escapeHtml(option.value)}"${option.value === value ? " selected" : ""}>${escapeHtml(option.label)}</option>`).join("")}
      </select>
    </div>
  `;
}

function renderCard(copy: EditorCopy, card: SceneCardV1, index: number, count: number): string {
  const type = fieldValue(card as Record<string, unknown>, "type") || "entity";
  const fields = cardFieldsForType(type);
  return `
    <article class="card-item">
      <div class="card-item-head">
        <div>
          <strong>${escapeHtml(fieldValue(card as Record<string, unknown>, "caption") || cardTypeLabel(copy, type))}</strong>
          <div class="meta">${escapeHtml(cardTypeLabel(copy, type))}</div>
        </div>
        <div class="card-actions">
          <button class="tiny-btn" type="button" data-action="card-up" data-card-index="${index}"${index === 0 ? " disabled" : ""}>${copy.up}</button>
          <button class="tiny-btn" type="button" data-action="card-down" data-card-index="${index}"${index === count - 1 ? " disabled" : ""}>${copy.down}</button>
          <button class="tiny-btn" type="button" data-action="card-remove" data-card-index="${index}">${copy.remove}</button>
        </div>
      </div>
      <div class="card-grid">
        <div class="field is-wide">
          <label>${escapeHtml(copy.cardType)}</label>
          <select data-card-index="${index}" data-card-field="type">
            ${CARD_TYPE_OPTIONS.map((item) => `<option value="${item}"${item === type ? " selected" : ""}>${escapeHtml(cardTypeLabel(copy, item))}</option>`).join("")}
          </select>
        </div>
        ${fields.map((field) => `
          <div class="field ${field === "hint" ? "is-wide" : ""}">
            <label>${escapeHtml(labelForField(copy, field))}</label>
            <input
              type="${field === "digits" ? "number" : "text"}"
              data-card-index="${index}"
              data-card-field="${escapeHtml(field)}"
              value="${escapeHtml(fieldValue(card as Record<string, unknown>, field))}"
            >
          </div>
        `).join("")}
      </div>
    </article>
  `;
}

export async function mountNativeEditorShell(options: NativeEditorShellOptions): Promise<void> {
  const copy = COPY[resolveUiLang()];
  const existing = document.getElementById("scene-editor-shell");
  existing?.remove();

  const wrapper = document.createElement("aside");
  wrapper.id = "scene-editor-shell";
  document.body.appendChild(wrapper);

  const state: EditorState = {
    config: null,
    selectedPageId: null,
    dirty: false,
    saving: false,
    status: copy.statusLoading,
    statusTone: "muted",
  };

  const render = (): void => {
    const config = state.config;
    const ordered = config ? orderedPages(config) : [];
    const selectedPage = ordered.find((page) => page.id === state.selectedPageId) || ordered[0] || null;
    const selectedCards = Array.isArray(selectedPage?.cards) ? selectedPage.cards : [];

    wrapper.innerHTML = `
      <style>
        #scene-editor-shell {
          position: fixed;
          top: 18px;
          right: 18px;
          bottom: 18px;
          width: min(540px, calc(100vw - 36px));
          z-index: 40;
          display: grid;
          grid-template-rows: auto 1fr;
          border-radius: 28px;
          border: 1px solid rgba(32,48,65,0.12);
          background: rgba(244,249,252,0.92);
          box-shadow: 0 26px 80px rgba(46,72,94,0.26);
          backdrop-filter: blur(18px);
          overflow: hidden;
        }
        #scene-editor-shell[data-collapsed="true"] { width: auto; bottom: auto; background: transparent; border: 0; box-shadow: none; backdrop-filter: none; overflow: visible; }
        #scene-editor-shell[data-collapsed="true"] .scene-editor-main { display: none; }
        #scene-editor-shell .scene-editor-topbar { display:flex; align-items:flex-start; justify-content:space-between; gap:12px; padding:14px 16px; border-bottom:1px solid rgba(32,48,65,0.08); background:linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.52)); }
        #scene-editor-shell[data-collapsed="true"] .scene-editor-topbar { border:0; padding:0; background:transparent; }
        #scene-editor-shell .scene-editor-title strong { display:block; font:600 15px/1.1 "Aptos","Segoe UI",sans-serif; color:#203041; }
        #scene-editor-shell .scene-editor-title span { display:block; margin-top:4px; font:12px/1.3 "Aptos","Segoe UI",sans-serif; color:rgba(32,48,65,0.68); }
        #scene-editor-shell .scene-editor-status { margin-top:8px; display:inline-flex; align-items:center; min-height:28px; padding:0 10px; border-radius:999px; background:rgba(255,255,255,0.84); font:12px/1 "Aptos","Segoe UI",sans-serif; color:#4b6577; }
        #scene-editor-shell .scene-editor-status[data-tone="ok"] { color:#2b7f57; }
        #scene-editor-shell .scene-editor-status[data-tone="bad"] { color:#ab4444; }
        #scene-editor-shell .scene-editor-actions { display:flex; align-items:center; gap:8px; flex-wrap:wrap; justify-content:flex-end; }
        #scene-editor-shell .scene-editor-button, #scene-editor-shell .tiny-btn, #scene-editor-shell input, #scene-editor-shell select { font:13px/1.2 "Aptos","Segoe UI",sans-serif; }
        #scene-editor-shell .scene-editor-button, #scene-editor-shell .tiny-btn { display:inline-flex; align-items:center; justify-content:center; min-height:40px; padding:0 14px; border-radius:999px; border:1px solid rgba(62,98,122,0.18); background:rgba(255,255,255,0.86); color:#203041; text-decoration:none; cursor:pointer; }
        #scene-editor-shell .tiny-btn { min-height:30px; padding:0 10px; }
        #scene-editor-shell .scene-editor-button.is-accent { background:linear-gradient(180deg, rgba(111,191,162,0.24), rgba(111,191,162,0.12)); border-color:rgba(77,147,121,0.28); }
        #scene-editor-shell .scene-editor-main { display:grid; grid-template-columns:190px minmax(0, 1fr); min-height:0; }
        #scene-editor-shell .scene-editor-pages, #scene-editor-shell .scene-editor-inspector { min-height:0; overflow:auto; }
        #scene-editor-shell .scene-editor-pages { padding:14px; border-right:1px solid rgba(32,48,65,0.08); background:rgba(246,250,252,0.92); }
        #scene-editor-shell .scene-editor-inspector { padding:16px; background:rgba(250,252,253,0.92); }
        #scene-editor-shell h2 { margin:0 0 10px; font:700 15px/1.1 "Aptos","Segoe UI",sans-serif; color:#203041; }
        #scene-editor-shell .meta { font:12px/1.35 "Aptos","Segoe UI",sans-serif; color:rgba(32,48,65,0.66); }
        #scene-editor-shell .page-list, #scene-editor-shell .cards-list { display:grid; gap:10px; }
        #scene-editor-shell .page-chip, #scene-editor-shell .card-item { display:grid; gap:10px; padding:12px; border-radius:18px; border:1px solid rgba(32,48,65,0.08); background:rgba(255,255,255,0.86); }
        #scene-editor-shell .page-chip.is-active { border-color:rgba(77,147,121,0.34); box-shadow:0 0 0 2px rgba(111,191,162,0.18); }
        #scene-editor-shell .page-chip-header { display:grid; gap:4px; cursor:pointer; }
        #scene-editor-shell .page-chip-header strong, #scene-editor-shell .card-item-head strong { display:block; font:700 14px/1.1 "Aptos","Segoe UI",sans-serif; color:#203041; }
        #scene-editor-shell .page-chip-actions, #scene-editor-shell .card-actions, #scene-editor-shell .card-add { display:flex; gap:8px; flex-wrap:wrap; }
        #scene-editor-shell .inspector-grid, #scene-editor-shell .card-grid { display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:10px; }
        #scene-editor-shell .field { display:grid; gap:6px; }
        #scene-editor-shell .field.is-wide { grid-column:1 / -1; }
        #scene-editor-shell .field label { font:12px/1.25 "Aptos","Segoe UI",sans-serif; color:rgba(32,48,65,0.72); }
        #scene-editor-shell input, #scene-editor-shell select { width:100%; min-height:40px; border-radius:12px; border:1px solid rgba(32,48,65,0.12); background:rgba(255,255,255,0.92); padding:0 12px; color:#203041; }
      </style>
      <div class="scene-editor-topbar">
        <div class="scene-editor-title">
          <strong>${copy.title}</strong>
          <span>${copy.subtitle(options.packId)}</span>
          <div class="scene-editor-status" data-tone="${state.statusTone}">${escapeHtml(state.status)}</div>
        </div>
        <div class="scene-editor-actions">
          <a class="scene-editor-button" href="${escapeHtml(options.sceneUrl)}">${copy.viewOnly}</a>
          <button class="scene-editor-button is-accent" type="button" data-action="save"${state.saving || !config ? " disabled" : ""}>${state.saving ? copy.saving : copy.save}</button>
          <button class="scene-editor-button" type="button" data-action="add-page"${!config ? " disabled" : ""}>${copy.addPage}</button>
          <button class="scene-editor-button" type="button" data-action="toggle-panel">${wrapper.dataset.collapsed === "true" ? copy.showPanel : copy.hidePanel}</button>
        </div>
      </div>
      <div class="scene-editor-main">
        <section class="scene-editor-pages">
          <h2>${copy.pages}</h2>
          <div class="page-list">
            ${ordered.map((page, index) => `
              <article class="page-chip ${page.id === (selectedPage?.id || "") ? "is-active" : ""}">
                <div class="page-chip-header" data-action="select-page" data-page-id="${escapeHtml(page.id)}">
                  <strong>${escapeHtml(page.title || page.id || `Page ${index + 1}`)}</strong>
                  <span class="meta">${escapeHtml(pageKindLabel(copy, page.kind))} · ${escapeHtml(copy.pageCards(Array.isArray(page.cards) ? page.cards.length : 0))}</span>
                </div>
                <div class="page-chip-actions">
                  <button class="tiny-btn" type="button" data-action="page-up" data-page-id="${escapeHtml(page.id)}"${index === 0 ? " disabled" : ""}>${copy.up}</button>
                  <button class="tiny-btn" type="button" data-action="page-down" data-page-id="${escapeHtml(page.id)}"${index === ordered.length - 1 ? " disabled" : ""}>${copy.down}</button>
                  <button class="tiny-btn" type="button" data-action="page-remove" data-page-id="${escapeHtml(page.id)}"${ordered.length <= 1 ? " disabled" : ""}>${copy.remove}</button>
                </div>
              </article>
            `).join("") || `<div class="meta">${copy.statusLoading}</div>`}
          </div>
        </section>
        <section class="scene-editor-inspector">
          <h2>${copy.inspector}</h2>
          ${selectedPage ? `
            <div class="meta">${copy.pageSettings}</div>
            <div class="inspector-grid" style="margin-top:12px;">
              ${renderPageField(copy.fieldPageId, "id", pageFieldValue(selectedPage, "id"), true)}
              ${renderPageSelect(copy.fieldKind, "kind", pageFieldValue(selectedPage, "kind"), PAGE_KIND_OPTIONS.map((item) => ({ value: item, label: pageKindLabel(copy, item) })))}
              ${renderPageField(copy.fieldTitle, "title", pageFieldValue(selectedPage, "title"), true)}
              ${renderPageField(copy.fieldSubtitle, "subtitle", pageFieldValue(selectedPage, "subtitle"), true)}
              ${renderPageField(copy.fieldSlot, "slot", pageFieldValue(selectedPage, "slot"))}
              ${renderPageSelect(copy.fieldCardStyle, "cardStyle", pageFieldValue(selectedPage, "cardStyle") || "full", CARD_STYLE_OPTIONS.map((item) => ({ value: item, label: item === "mini" ? copy.styleMini : copy.styleFull })))}
              ${renderPageField(copy.fieldStampCaption, "stampCaption", pageFieldValue(selectedPage, "stampCaption"))}
              ${renderPageField(copy.fieldStampValue, "stampValue", pageFieldValue(selectedPage, "stampValue"))}
            </div>
            <h2 style="margin-top:18px;">${copy.cards}</h2>
            <div class="card-add">
              <select data-add-card-type>
                ${CARD_TYPE_OPTIONS.map((type) => `<option value="${type}">${escapeHtml(cardTypeLabel(copy, type))}</option>`).join("")}
              </select>
              <button class="scene-editor-button" type="button" data-action="add-card">${copy.addCard}</button>
            </div>
            <div class="cards-list" style="margin-top:12px;">
              ${selectedCards.length ? selectedCards.map((card, index) => renderCard(copy, card, index, selectedCards.length)).join("") : `<div class="meta">${copy.noCards}</div>`}
            </div>
          ` : `<div class="meta">${copy.statusLoading}</div>`}
        </section>
      </div>
    `;
  };

  const setStatus = (text: string, tone: EditorState["statusTone"]): void => {
    state.status = text;
    state.statusTone = tone;
    render();
  };

  const syncSelection = (): void => {
    if (!state.config) {
      return;
    }
    const ordered = orderedPages(state.config);
    if (!ordered.length) {
      state.selectedPageId = null;
      return;
    }
    if (!state.selectedPageId || !ordered.some((page) => page.id === state.selectedPageId)) {
      state.selectedPageId = ordered[0].id;
    }
    setSelectedPageParam(state.selectedPageId);
    focusScenePageByIndex(pageIndexById(state.config, state.selectedPageId));
  };

  const markDirty = (): void => {
    state.dirty = true;
    setStatus(copy.statusDirty, "muted");
  };

  const reloadPreview = (): void => {
    const url = new URL(window.location.href);
    url.searchParams.set("editor", "1");
    if (state.selectedPageId) {
      url.searchParams.set("editorPage", state.selectedPageId);
    }
    url.searchParams.set("v", String(Date.now()));
    window.location.replace(url.toString());
  };

  const updatePageField = (field: keyof ScenePageV1, value: string): void => {
    if (!state.config || !state.selectedPageId) {
      return;
    }
    const page = state.config.pages.find((item) => item.id === state.selectedPageId);
    if (!page) {
      return;
    }
    if (field === "slot") {
      page.slot = value === "" ? undefined : Number(value);
    } else if (field === "id") {
      const nextId = uniquePageId(state.config, value || "page");
      const prevId = page.id;
      page.id = nextId;
      state.config.rotation.order = state.config.rotation.order.map((item) => item === prevId ? nextId : item);
      state.selectedPageId = nextId;
    } else {
      if (field === "title" || field === "subtitle" || field === "stampCaption" || field === "stampValue") {
        page[field] = value;
      } else if (field === "kind") {
        page.kind = value as ScenePageV1["kind"];
      } else if (field === "cardStyle") {
        page.cardStyle = value as ScenePageV1["cardStyle"];
      }
    }
    markDirty();
    syncSelection();
  };

  const updateCardField = (cardIndex: number, field: string, value: string): void => {
    if (!state.config || !state.selectedPageId) {
      return;
    }
    const page = state.config.pages.find((item) => item.id === state.selectedPageId);
    if (!page) {
      return;
    }
    if (!Array.isArray(page.cards)) {
      page.cards = [];
    }
    const card = page.cards[cardIndex];
    if (!card) {
      return;
    }
    if (field === "type") {
      const nextCard = createCard(value);
      page.cards[cardIndex] = { ...nextCard, caption: fieldValue(card as Record<string, unknown>, "caption") || nextCard.caption };
    } else if (field === "digits") {
      (card as Record<string, unknown>)[field] = value === "" ? 0 : Number(value);
    } else {
      (card as Record<string, unknown>)[field] = value;
    }
    markDirty();
  };

  wrapper.addEventListener("click", async (event) => {
    const target = event.target as HTMLElement | null;
    const actionEl = target?.closest<HTMLElement>("[data-action]");
    const action = actionEl?.dataset.action;
    if (!action) {
      return;
    }
    if (action === "toggle-panel") {
      const collapsed = wrapper.dataset.collapsed === "true";
      wrapper.dataset.collapsed = collapsed ? "false" : "true";
      render();
      return;
    }
    if (!state.config) {
      return;
    }

    const ordered = orderedPages(state.config);
    const pageId = actionEl?.dataset.pageId || null;
    const pageIndex = pageId ? ordered.findIndex((page) => page.id === pageId) : -1;

    if (action === "select-page" && pageId) {
      state.selectedPageId = pageId;
      syncSelection();
      render();
      return;
    }
    if (action === "page-up" && pageIndex > 0) {
      const order = ordered.map((page) => page.id);
      [order[pageIndex - 1], order[pageIndex]] = [order[pageIndex], order[pageIndex - 1]];
      state.config.rotation.order = order;
      state.selectedPageId = pageId;
      markDirty();
      syncSelection();
      render();
      return;
    }
    if (action === "page-down" && pageIndex >= 0 && pageIndex < ordered.length - 1) {
      const order = ordered.map((page) => page.id);
      [order[pageIndex], order[pageIndex + 1]] = [order[pageIndex + 1], order[pageIndex]];
      state.config.rotation.order = order;
      state.selectedPageId = pageId;
      markDirty();
      syncSelection();
      render();
      return;
    }
    if (action === "page-remove" && pageId && ordered.length > 1) {
      state.config.pages = state.config.pages.filter((page) => page.id !== pageId);
      state.config.rotation.order = orderedPages(state.config).map((page) => page.id);
      state.selectedPageId = orderedPages(state.config)[Math.max(0, pageIndex - 1)]?.id || orderedPages(state.config)[0]?.id || null;
      markDirty();
      syncSelection();
      render();
      return;
    }
    if (action === "add-page") {
      const page = createPage(state.config);
      state.config.pages.push(page);
      state.config.rotation.order = orderedPages(state.config).map((item) => item.id);
      state.selectedPageId = page.id;
      markDirty();
      syncSelection();
      render();
      return;
    }
    if (action === "add-card" && state.selectedPageId) {
      const page = state.config.pages.find((item) => item.id === state.selectedPageId);
      const addType = wrapper.querySelector<HTMLSelectElement>("[data-add-card-type]")?.value || "entity";
      if (page) {
        if (!Array.isArray(page.cards)) {
          page.cards = [];
        }
        page.cards.push(createCard(addType));
        markDirty();
        render();
      }
      return;
    }
    const cardIndex = Number(actionEl?.dataset.cardIndex || "-1");
    if (cardIndex >= 0 && state.selectedPageId) {
      const page = state.config.pages.find((item) => item.id === state.selectedPageId);
      if (!page || !Array.isArray(page.cards)) {
        return;
      }
      if (action === "card-remove") {
        page.cards = page.cards.filter((_, index) => index !== cardIndex);
        markDirty();
        render();
        return;
      }
      if (action === "card-up" && cardIndex > 0) {
        [page.cards[cardIndex - 1], page.cards[cardIndex]] = [page.cards[cardIndex], page.cards[cardIndex - 1]];
        markDirty();
        render();
        return;
      }
      if (action === "card-down" && cardIndex < page.cards.length - 1) {
        [page.cards[cardIndex], page.cards[cardIndex + 1]] = [page.cards[cardIndex + 1], page.cards[cardIndex]];
        markDirty();
        render();
        return;
      }
    }
    if (action === "save") {
      state.saving = true;
      setStatus(copy.saving, "muted");
      try {
        state.config = await saveConfig(options.sceneApiUrl, cloneConfig(state.config));
        state.dirty = false;
        state.saving = false;
        syncSelection();
        setStatus(copy.statusSaved, "ok");
        window.setTimeout(() => reloadPreview(), 250);
      } catch (error) {
        state.saving = false;
        setStatus(`${copy.saveError}: ${String(error)}`, "bad");
      }
    }
  });

  wrapper.addEventListener("input", (event) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    if (!target || !state.config) {
      return;
    }
    if (target.dataset.pageField) {
      updatePageField(target.dataset.pageField as keyof ScenePageV1, target.value);
      render();
      return;
    }
    if (target.dataset.cardField && target.dataset.cardIndex) {
      updateCardField(Number(target.dataset.cardIndex), target.dataset.cardField, target.value);
      render();
    }
  });

  try {
    state.config = await loadConfig(options.sceneApiUrl);
    state.selectedPageId = initialSelectedPageId(state.config);
    state.status = copy.statusSaved;
    state.statusTone = "ok";
    syncSelection();
  } catch (error) {
    state.status = `${copy.loadError}: ${String(error)}`;
    state.statusTone = "bad";
  }

  render();
}
