import type { SceneCardV1, SceneConfigV1, ScenePageV1 } from "@kiosk-scene/core";
import { getHomeAssistantHandle, type HomeAssistantStateEntity, type HomeAssistantStates } from "@kiosk-scene/provider-ha";

type UiLang = "ru" | "en";

type EditorCopy = {
  title: string;
  subtitle: (packId: string) => string;
  previewTitle: string;
  previewSubtitle: string;
  previewDisplay: string;
  previewResolution: string;
  previewApplyProfile: string;
  dashboardTitle: string;
  dashboardSubtitle: string;
  statusLoading: string;
  statusSaved: string;
  statusDirty: string;
  statusFailed: string;
  viewOnly: string;
  save: string;
  saving: string;
  addPage: string;
  avatar: string;
  avatarSubtitle: string;
  avatarPack: string;
  avatarPackCurrent: string;
  avatarPackHint: string;
  avatarPackEmpty: string;
  avatarPackAppliedAfterSave: string;
  avatarPackDefaultTile: string;
  avatarPackDefaultHint: string;
  avatarPackSelect: string;
  avatarPackSelected: string;
  avatarPackMotionCount: (count: number) => string;
  avatarCapabilityMotion: string;
  avatarCapabilityEmotion: string;
  avatarCapabilityLipSync: string;
  avatarImport: string;
  avatarImportHint: string;
  avatarImportSelect: string;
  avatarImportSelected: (name: string) => string;
  avatarImportButton: string;
  avatarImporting: string;
  avatarImportSuccess: (name: string) => string;
  avatarImportError: string;
  avatarMapping: string;
  avatarMappingSubtitle: string;
  avatarMappingEmpty: string;
  avatarMappingLoading: string;
  avatarMappingLoadError: string;
  avatarMappingSaveError: string;
  avatarMappingMotion: string;
  avatarMappingSaveHint: string;
  avatarMotionNone: string;
  avatarSemanticIdle: string;
  avatarSemanticTouch: string;
  avatarSemanticReplySoft: string;
  avatarSemanticThink: string;
  avatarSemanticBusy: string;
  avatarSemanticCalm: string;
  avatarSemanticHappy: string;
  avatarSemanticSurprise: string;
  avatarSemanticWarning: string;
  avatarSemanticGreet: string;
  avatarSemanticSpeaking: string;
  pages: string;
  pageKind: string;
  pageCards: (count: number) => string;
  inspector: string;
  pageSettings: string;
  displaySettings: string;
  displaySubtitle: string;
  cards: string;
  cardsSubtitle: string;
  cardInspector: string;
  cardInspectorEmpty: string;
  cardTemplates: string;
  cardType: string;
  noCards: string;
  addCard: string;
  bindFromHa: string;
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
  fieldDisplaySafeTop: string;
  fieldDisplaySafeRight: string;
  fieldDisplaySafeBottom: string;
  fieldDisplaySafeLeft: string;
  fieldDisplayPadding: string;
  fieldDisplayGap: string;
  fieldDisplayScale: string;
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
  homeAssistant: string;
  entitySearch: string;
  entityBindingTargets: string;
  entityBinding: string;
  entityBindingEmpty: string;
  entityBindingActive: (card: string, field: string) => string;
  noEntities: string;
  useEntity: string;
};

export interface NativeEditorShellOptions {
  packId: string;
  sceneApiUrl: string;
  avatarCatalogUrl?: string;
  avatarImportUrl?: string;
  avatarPackApiUrl?: string;
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
type CardTypeOption = (typeof CARD_TYPE_OPTIONS)[number];

const CARD_TYPE_DESCRIPTIONS: Record<UiLang, Record<CardTypeOption, string>> = {
  ru: {
    entity: "Одна сущность с кратким состоянием.",
    text: "Ручной текстовый блок без привязки.",
    todo: "Список дел или одна задача из HA.",
    onoff: "Переключатель с подписями Вкл/Выкл.",
    battery: "Заряд и отдельное состояние батареи.",
    network: "Скорость down/up для сети.",
    time: "Время или timestamp из HA.",
    percent: "Процентное значение с округлением.",
    number: "Число с единицей измерения.",
  },
  en: {
    entity: "Single entity with a compact state.",
    text: "Manual text block without HA binding.",
    todo: "Task list or a single HA task.",
    onoff: "Switch card with on/off labels.",
    battery: "Battery value with a secondary state.",
    network: "Network throughput with down/up.",
    time: "Time or timestamp from HA.",
    percent: "Percentage value with rounding.",
    number: "Numeric value with unit.",
  },
};

const COPY: Record<UiLang, EditorCopy> = {
  ru: {
    title: "Редактор сцены",
    subtitle: (packId) => `Пакет: ${packId || "default"} · Живое превью сцены и полный дашборд настроек`,
    previewTitle: "Превью дисплея",
    previewSubtitle: "Сверху показывается честный 1:1 viewport выбранного экрана. Если не влезает по ширине, страница просто прокручивается.",
    previewDisplay: "Экран для проверки",
    previewResolution: "Разрешение",
    previewApplyProfile: "Подставить в настройки экрана",
    dashboardTitle: "Панель настройки сцены",
    dashboardSubtitle: "Вся настройка расположена ниже превью как длинная редакторская страница.",
    statusLoading: "Загружаю конфигурацию сцены...",
    statusSaved: "Сохранено",
    statusDirty: "Есть несохранённые изменения",
    statusFailed: "Ошибка",
    viewOnly: "Только просмотр",
    save: "Сохранить",
    saving: "Сохраняю...",
    addPage: "+ Страница",
    avatar: "Аватар",
    avatarSubtitle: "Выбор Live2D-модели для текущего instance-pack. Применяется после сохранения и перезагрузки превью.",
    avatarPack: "Набор аватара",
    avatarPackCurrent: "Текущий avatar.manifest.json instance-pack",
    avatarPackHint: "Другие модели лежат отдельно в /config/kiosk-scene/avatar-packs/<id>/avatar.manifest.json.",
    avatarPackEmpty: "В каталоге avatar-packs пока нет отдельных моделей.",
    avatarPackAppliedAfterSave: "Выбранный avatar-pack вступит в силу после сохранения и автоматической перезагрузки превью.",
    avatarPackDefaultTile: "Текущий instance-pack",
    avatarPackDefaultHint: "Оставить аватар из scene-pack без отдельного avatar-pack.",
    avatarPackSelect: "Использовать",
    avatarPackSelected: "Будет применён после сохранения",
    avatarPackMotionCount: (count) => `${count} motion`,
    avatarCapabilityMotion: "Motion",
    avatarCapabilityEmotion: "Emotion",
    avatarCapabilityLipSync: "LipSync",
    avatarImport: "Импорт аватара",
    avatarImportHint: "Загрузи zip-архив с Live2D-моделью. Kiosk Scene сам распакует его в avatar-packs, найдёт model3.json и создаст draft motion-map.",
    avatarImportSelect: "ZIP архив аватара",
    avatarImportSelected: (name) => `Выбран архив: ${name}`,
    avatarImportButton: "Импортировать ZIP",
    avatarImporting: "Импортирую avatar-pack...",
    avatarImportSuccess: (name) => `Импортирован avatar-pack: ${name}`,
    avatarImportError: "Не удалось импортировать avatar-pack",
    avatarMapping: "Маппинг анимаций",
    avatarMappingSubtitle: "Здесь задаётся, какие движения модель использует для semantic cue/activity в runtime.",
    avatarMappingEmpty: "Выбери отдельный avatar-pack, чтобы редактировать его motion-map.",
    avatarMappingLoading: "Загружаю motion-map avatar-pack...",
    avatarMappingLoadError: "Не удалось загрузить motion-map avatar-pack",
    avatarMappingSaveError: "Не удалось сохранить motion-map avatar-pack",
    avatarMappingMotion: "Движение",
    avatarMappingSaveHint: "Изменения в motion-map сохраняются общей кнопкой «Сохранить» сверху вместе с конфигом сцены.",
    avatarMotionNone: "Не назначено",
    avatarSemanticIdle: "Idle / ожидание",
    avatarSemanticTouch: "Touch / касание",
    avatarSemanticReplySoft: "Reply soft / мягкий ответ",
    avatarSemanticThink: "Think / размышление",
    avatarSemanticBusy: "Busy / занята",
    avatarSemanticCalm: "Calm / спокойствие",
    avatarSemanticHappy: "Happy / радость",
    avatarSemanticSurprise: "Surprise / удивление",
    avatarSemanticWarning: "Warning / предупреждение",
    avatarSemanticGreet: "Greet / приветствие",
    avatarSemanticSpeaking: "Speaking / говорит",
    pages: "Страницы",
    pageKind: "Тип",
    pageCards: (count) => `${count} карточ${count === 1 ? "ка" : count < 5 ? "ки" : "ек"}`,
    inspector: "Инспектор",
    pageSettings: "Параметры страницы",
    displaySettings: "Дисплей и врезка",
    displaySubtitle: "Подстройка под физический экран, safe area и общий масштаб сцены.",
    cards: "Карточки",
    cardsSubtitle: "Сначала выбери или добавь карточку, затем настрой её ниже. Порядок здесь же влияет на правую карусель.",
    cardInspector: "Настройка карточки",
    cardInspectorEmpty: "Добавь карточку из шаблона выше или выбери существующую карточку из списка.",
    cardTemplates: "Шаблоны карточек",
    cardType: "Тип карточки",
    noCards: "На странице пока нет карточек",
    addCard: "+ Карточка",
    bindFromHa: "из HA",
    remove: "Удалить",
    up: "Выше",
    down: "Ниже",
    loadError: "Не удалось загрузить конфиг сцены",
    saveError: "Не удалось сохранить конфиг сцены",
    kindOverview: "Обзор",
    kindCards: "Карточки",
    kindForecastCards: "Прогноз + карточки",
    fieldPageId: "ID страницы",
    fieldTitle: "Заголовок",
    fieldSubtitle: "Подзаголовок",
    fieldKind: "Тип страницы",
    fieldSlot: "Слот",
    fieldCardStyle: "Стиль карточек",
    fieldStampCaption: "Подпись штампа",
    fieldStampValue: "Значение штампа",
    fieldDisplaySafeTop: "Безопасная зона сверху",
    fieldDisplaySafeRight: "Безопасная зона справа",
    fieldDisplaySafeBottom: "Безопасная зона снизу",
    fieldDisplaySafeLeft: "Безопасная зона слева",
    fieldDisplayPadding: "Внутренний отступ layout",
    fieldDisplayGap: "Промежуток между панелями",
    fieldDisplayScale: "Общий масштаб сцены",
    fieldCardCaption: "Подпись",
    fieldCardHint: "Подсказка",
    fieldCardEntity: "Сущность",
    fieldCardValue: "Текст / значение",
    fieldCardOnText: "Текст Вкл",
    fieldCardOffText: "Текст Выкл",
    fieldCardStateEntity: "Сущность состояния",
    fieldCardDownEntity: "Сущность down",
    fieldCardUpEntity: "Сущность up",
    fieldCardDigits: "Знаков после запятой",
    fieldCardUnit: "Единица измерения",
    styleFull: "Крупные",
    styleMini: "Мини",
    cardEntity: "Сущность",
    cardText: "Текст",
    cardTodo: "Список задач",
    cardOnOff: "Вкл / выкл",
    cardBattery: "Батарея",
    cardNetwork: "Сеть",
    cardTime: "Время",
    cardPercent: "Процент",
    cardNumber: "Число",
    homeAssistant: "Home Assistant",
    entitySearch: "Поиск сущностей",
    entityBindingTargets: "Куда привязывать",
    entityBinding: "Связать с полем",
    entityBindingEmpty: "Кликни в поле Сущность / State / Down / Up у карточки, потом выбери сущность здесь.",
    entityBindingActive: (card, field) => `Сейчас связываем: ${card} → ${field}`,
    noEntities: "Сущности Home Assistant пока недоступны",
    useEntity: "Использовать",
  },
  en: {
    title: "Scene Editor",
    subtitle: (packId) => `Pack: ${packId || "default"} · Live scene preview with a full settings dashboard`,
    previewTitle: "Display Preview",
    previewSubtitle: "The top stage renders a true 1:1 viewport of the selected screen. If it does not fit, the editor page simply scrolls.",
    previewDisplay: "Screen profile",
    previewResolution: "Resolution",
    previewApplyProfile: "Fill display settings below",
    dashboardTitle: "Scene Settings Dashboard",
    dashboardSubtitle: "All configuration lives below the preview as a normal scrollable page.",
    statusLoading: "Loading scene config...",
    statusSaved: "Saved",
    statusDirty: "Unsaved changes",
    statusFailed: "Error",
    viewOnly: "View Only",
    save: "Save",
    saving: "Saving...",
    addPage: "+ Page",
    avatar: "Avatar",
    avatarSubtitle: "Choose the Live2D model for this instance-pack. It applies after save and preview reload.",
    avatarPack: "Avatar pack",
    avatarPackCurrent: "Use the instance-pack avatar.manifest.json",
    avatarPackHint: "Additional models live in /config/kiosk-scene/avatar-packs/<id>/avatar.manifest.json.",
    avatarPackEmpty: "No separate avatar packs are available yet.",
    avatarPackAppliedAfterSave: "The selected avatar pack will apply after saving and reloading the preview.",
    avatarPackDefaultTile: "Current instance-pack",
    avatarPackDefaultHint: "Keep the avatar bundled directly with the scene pack.",
    avatarPackSelect: "Use avatar",
    avatarPackSelected: "Will apply after save",
    avatarPackMotionCount: (count) => `${count} motions`,
    avatarCapabilityMotion: "Motion",
    avatarCapabilityEmotion: "Emotion",
    avatarCapabilityLipSync: "LipSync",
    avatarImport: "Import avatar",
    avatarImportHint: "Upload a Live2D zip archive. Kiosk Scene will unpack it into avatar-packs, detect model3.json and create a draft motion map.",
    avatarImportSelect: "Avatar ZIP archive",
    avatarImportSelected: (name) => `Selected archive: ${name}`,
    avatarImportButton: "Import ZIP",
    avatarImporting: "Importing avatar pack...",
    avatarImportSuccess: (name) => `Imported avatar pack: ${name}`,
    avatarImportError: "Failed to import avatar pack",
    avatarMapping: "Animation mapping",
    avatarMappingSubtitle: "Map semantic cue/activity slots to actual model motions used by the runtime.",
    avatarMappingEmpty: "Choose a separate avatar pack to edit its motion map.",
    avatarMappingLoading: "Loading avatar pack motion map...",
    avatarMappingLoadError: "Failed to load avatar pack motion map",
    avatarMappingSaveError: "Failed to save avatar pack motion map",
    avatarMappingMotion: "Motion",
    avatarMappingSaveHint: "Motion-map changes are saved by the main Save button together with the scene config.",
    avatarMotionNone: "Not assigned",
    avatarSemanticIdle: "Idle",
    avatarSemanticTouch: "Touch",
    avatarSemanticReplySoft: "Reply soft",
    avatarSemanticThink: "Think",
    avatarSemanticBusy: "Busy",
    avatarSemanticCalm: "Calm",
    avatarSemanticHappy: "Happy",
    avatarSemanticSurprise: "Surprise",
    avatarSemanticWarning: "Warning",
    avatarSemanticGreet: "Greet",
    avatarSemanticSpeaking: "Speaking",
    pages: "Pages",
    pageKind: "Kind",
    pageCards: (count) => `${count} cards`,
    inspector: "Inspector",
    pageSettings: "Page settings",
    displaySettings: "Display fit",
    displaySubtitle: "Tune safe areas, spacing and overall scale for the physical screen.",
    cards: "Cards",
    cardsSubtitle: "Add or choose a card first, then edit it below. The order here drives the right-hand carousel.",
    cardInspector: "Card inspector",
    cardInspectorEmpty: "Add a card from the templates above or choose an existing one from the list.",
    cardTemplates: "Card templates",
    cardType: "Card type",
    noCards: "No cards on this page yet",
    addCard: "+ Card",
    bindFromHa: "from HA",
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
    fieldDisplaySafeTop: "Safe area top",
    fieldDisplaySafeRight: "Safe area right",
    fieldDisplaySafeBottom: "Safe area bottom",
    fieldDisplaySafeLeft: "Safe area left",
    fieldDisplayPadding: "Layout padding",
    fieldDisplayGap: "Layout gap",
    fieldDisplayScale: "Global scene scale",
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
    homeAssistant: "Home Assistant",
    entitySearch: "Search entities",
    entityBindingTargets: "Binding target",
    entityBinding: "Bind into field",
    entityBindingEmpty: "Click an Entity / State / Down / Up field on a card, then choose an entity here.",
    entityBindingActive: (card, field) => `Binding now: ${card} → ${field}`,
    noEntities: "Home Assistant entities are not available yet",
    useEntity: "Use",
  },
};

type EditorState = {
  config: SceneConfigV1 | null;
  selectedPageId: string | null;
  selectedCardIndex: number | null;
  dirty: boolean;
  saving: boolean;
  status: string;
  statusTone: "muted" | "ok" | "bad";
  haEntities: HaEntitySummary[];
  avatarCatalog: AvatarPackSummary[];
  entitySearch: string;
  focusedBinding: { cardIndex: number; field: string } | null;
  previewDisplayId: string;
  pendingAvatarZip: File | null;
  pendingAvatarZipName: string;
  avatarImporting: boolean;
  avatarImportStatus: string;
  avatarImportTone: "muted" | "ok" | "bad";
  avatarPackDetails: AvatarPackDetails | null;
  avatarPackLoading: boolean;
  avatarPackDirty: boolean;
  avatarPackSaving: boolean;
};

type HaEntitySummary = {
  entityId: string;
  name: string;
  domain: string;
  state: string;
  unit: string;
};

type AvatarPackSummary = {
  id: string;
  name: string;
  manifestUrl: string;
  previewUrl: string;
  motionCount: number;
  capabilities?: {
    supportsMotion?: boolean;
    supportsEmotion?: boolean;
    supportsLipSync?: boolean;
  };
};

type AvatarImportPayload = {
  success?: boolean;
  item?: AvatarPackSummary;
  error?: string;
};

type AvatarMotionDef = {
  index: number;
  id: string;
  label: string;
  group?: string;
  tags?: string[];
};

type AvatarPackDetails = {
  packId: string;
  manifest: Record<string, unknown>;
  motionMap: {
    motions: AvatarMotionDef[];
    semantic: Record<string, number | number[]>;
  };
};

const AVATAR_SEMANTIC_FIELDS = [
  { key: "idle", labelKey: "avatarSemanticIdle" },
  { key: "touch", labelKey: "avatarSemanticTouch" },
  { key: "reply_soft", labelKey: "avatarSemanticReplySoft" },
  { key: "think", labelKey: "avatarSemanticThink" },
  { key: "busy", labelKey: "avatarSemanticBusy" },
  { key: "calm", labelKey: "avatarSemanticCalm" },
  { key: "happy", labelKey: "avatarSemanticHappy" },
  { key: "surprise", labelKey: "avatarSemanticSurprise" },
  { key: "warning", labelKey: "avatarSemanticWarning" },
  { key: "greet", labelKey: "avatarSemanticGreet" },
  { key: "speaking", labelKey: "avatarSemanticSpeaking" },
] as const;

type AvatarSemanticField = (typeof AVATAR_SEMANTIC_FIELDS)[number];

type PreviewDisplayProfile = {
  id: string;
  width: number;
  height: number;
  label: Record<UiLang, string>;
  displayDefaults: {
    safeTop: number;
    safeRight: number;
    safeBottom: number;
    safeLeft: number;
    layoutPaddingPx: number;
    layoutGapPx: number;
    globalScale: number;
  };
};

const PREVIEW_DISPLAY_PROFILES: readonly PreviewDisplayProfile[] = [
  {
    id: "mellow-fly-7",
    width: 1024,
    height: 600,
    label: {
      ru: "Mellow Fly 7\" · 1024×600",
      en: "Mellow Fly 7\" · 1024x600",
    },
    displayDefaults: {
      safeTop: 0,
      safeRight: 0,
      safeBottom: 0,
      safeLeft: 0,
      layoutPaddingPx: 16,
      layoutGapPx: 16,
      globalScale: 1,
    },
  },
  {
    id: "hdmi-1080p",
    width: 1920,
    height: 1080,
    label: {
      ru: "HDMI дисплей 1920×1080",
      en: "HDMI display 1920x1080",
    },
    displayDefaults: {
      safeTop: 0,
      safeRight: 0,
      safeBottom: 0,
      safeLeft: 0,
      layoutPaddingPx: 24,
      layoutGapPx: 24,
      globalScale: 1,
    },
  },
  {
    id: "tv-1366",
    width: 1366,
    height: 768,
    label: {
      ru: "ТВ панель 1366×768",
      en: "TV panel 1366x768",
    },
    displayDefaults: {
      safeTop: 8,
      safeRight: 12,
      safeBottom: 12,
      safeLeft: 12,
      layoutPaddingPx: 18,
      layoutGapPx: 18,
      globalScale: 0.98,
    },
  },
  {
    id: "hdmi-1440p",
    width: 2560,
    height: 1440,
    label: {
      ru: "Монитор 2560×1440",
      en: "Monitor 2560x1440",
    },
    displayDefaults: {
      safeTop: 0,
      safeRight: 0,
      safeBottom: 0,
      safeLeft: 0,
      layoutPaddingPx: 24,
      layoutGapPx: 24,
      globalScale: 1,
    },
  },
  {
    id: "display-4k",
    width: 3840,
    height: 2160,
    label: {
      ru: "4K дисплей 3840×2160",
      en: "4K display 3840x2160",
    },
    displayDefaults: {
      safeTop: 0,
      safeRight: 0,
      safeBottom: 0,
      safeLeft: 0,
      layoutPaddingPx: 32,
      layoutGapPx: 32,
      globalScale: 1,
    },
  },
  {
    id: "portrait-1080",
    width: 1080,
    height: 1920,
    label: {
      ru: "Portrait 1080×1920",
      en: "Portrait 1080x1920",
    },
    displayDefaults: {
      safeTop: 8,
      safeRight: 8,
      safeBottom: 8,
      safeLeft: 8,
      layoutPaddingPx: 16,
      layoutGapPx: 16,
      globalScale: 0.96,
    },
  },
] as const;

const DEFAULT_PREVIEW_DISPLAY_ID = "mellow-fly-7";

function resolveUiLang(): UiLang {
  const locale = String(navigator.language || "").toLowerCase();
  return locale.startsWith("ru") ? "ru" : "en";
}

function resolvePreviewDisplayProfile(profileId: string | null | undefined): PreviewDisplayProfile {
  return PREVIEW_DISPLAY_PROFILES.find((profile) => profile.id === profileId)
    || PREVIEW_DISPLAY_PROFILES.find((profile) => profile.id === DEFAULT_PREVIEW_DISPLAY_ID)
    || PREVIEW_DISPLAY_PROFILES[0];
}

function formatPreviewResolution(profile: PreviewDisplayProfile): string {
  return `${profile.width} × ${profile.height}`;
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

type DisplayFieldKey =
  | "safeTop"
  | "safeRight"
  | "safeBottom"
  | "safeLeft"
  | "layoutPaddingPx"
  | "layoutGapPx"
  | "globalScale";

function readDisplayFieldValue(config: SceneConfigV1, field: DisplayFieldKey): string {
  const display = config.display || {};
  const safeArea = display.safeArea || {};
  switch (field) {
    case "safeTop":
      return String(Number.isFinite(Number(safeArea.top)) ? Number(safeArea.top) : 0);
    case "safeRight":
      return String(Number.isFinite(Number(safeArea.right)) ? Number(safeArea.right) : 0);
    case "safeBottom":
      return String(Number.isFinite(Number(safeArea.bottom)) ? Number(safeArea.bottom) : 0);
    case "safeLeft":
      return String(Number.isFinite(Number(safeArea.left)) ? Number(safeArea.left) : 0);
    case "layoutPaddingPx":
      return String(Number.isFinite(Number(display.layoutPaddingPx)) ? Number(display.layoutPaddingPx) : 16);
    case "layoutGapPx":
      return String(Number.isFinite(Number(display.layoutGapPx)) ? Number(display.layoutGapPx) : 16);
    case "globalScale":
      return String(Number.isFinite(Number(display.globalScale)) ? Number(display.globalScale) : 1);
    default:
      return "";
  }
}

function ensureDisplayConfig(config: SceneConfigV1): NonNullable<SceneConfigV1["display"]> {
  if (!config.display) {
    config.display = {};
  }
  if (!config.display.safeArea) {
    config.display.safeArea = {};
  }
  return config.display;
}

function readAvatarPackId(config: SceneConfigV1): string {
  const packId = String(config.avatar?.packId || "").trim();
  return packId;
}

function ensureAvatarConfig(config: SceneConfigV1): NonNullable<SceneConfigV1["avatar"]> {
  if (!config.avatar) {
    config.avatar = {};
  }
  return config.avatar;
}

function applyDisplayProfile(config: SceneConfigV1, profile: PreviewDisplayProfile): void {
  const display = ensureDisplayConfig(config);
  const safeArea = display.safeArea || {};
  safeArea.top = profile.displayDefaults.safeTop;
  safeArea.right = profile.displayDefaults.safeRight;
  safeArea.bottom = profile.displayDefaults.safeBottom;
  safeArea.left = profile.displayDefaults.safeLeft;
  display.safeArea = safeArea;
  display.layoutPaddingPx = profile.displayDefaults.layoutPaddingPx;
  display.layoutGapPx = profile.displayDefaults.layoutGapPx;
  display.globalScale = profile.displayDefaults.globalScale;
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

function cardTypeDescription(type: string): string {
  const lang = resolveUiLang();
  const descriptions = CARD_TYPE_DESCRIPTIONS[lang];
  return descriptions[type as CardTypeOption] || "";
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

function summarizeHaEntity(entityId: string, entity: HomeAssistantStateEntity): HaEntitySummary {
  const attributes = entity.attributes || {};
  const name = String(attributes.friendly_name || entityId);
  const domain = entityId.includes(".") ? entityId.split(".", 1)[0] || "other" : "other";
  const state = String(entity.state || "");
  const unit = String(attributes.unit_of_measurement || "");
  return { entityId, name, domain, state, unit };
}

function buildHaEntityCatalog(states: HomeAssistantStates | null | undefined): HaEntitySummary[] {
  if (!states) {
    return [];
  }
  return Object.entries(states)
    .map(([entityId, entity]) => summarizeHaEntity(entityId, entity))
    .sort((a, b) => {
      const domainCompare = a.domain.localeCompare(b.domain);
      if (domainCompare !== 0) {
        return domainCompare;
      }
      return a.name.localeCompare(b.name, "ru");
    });
}

function filterHaEntityCatalog(catalog: HaEntitySummary[], query: string): HaEntitySummary[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return catalog.slice(0, 48);
  }
  return catalog
    .filter((item) =>
      item.entityId.toLowerCase().includes(normalized)
      || item.name.toLowerCase().includes(normalized)
      || item.domain.toLowerCase().includes(normalized)
      || item.state.toLowerCase().includes(normalized))
    .slice(0, 48);
}

async function loadAvatarCatalog(url: string): Promise<AvatarPackSummary[]> {
  const target = String(url || "").trim();
  if (!target) {
    return [];
  }
  const response = await fetch(target, { cache: "no-store" });
  const payload = await response.json() as { success?: boolean; items?: Array<Partial<AvatarPackSummary>> };
  if (!response.ok || payload.success === false) {
    throw new Error(`GET ${target} failed: HTTP ${response.status}`);
  }
  return Array.isArray(payload.items)
    ? payload.items
      .map((item) => ({
        id: String(item.id || "").trim(),
        name: String(item.name || item.id || "").trim(),
        manifestUrl: String(item.manifestUrl || "").trim(),
        previewUrl: String(item.previewUrl || "").trim(),
        motionCount: Number(item.motionCount || 0),
        capabilities: typeof item.capabilities === "object" && item.capabilities
          ? {
              supportsMotion: Boolean(item.capabilities.supportsMotion),
              supportsEmotion: Boolean(item.capabilities.supportsEmotion),
              supportsLipSync: Boolean(item.capabilities.supportsLipSync),
            }
          : undefined,
      }))
      .filter((item) => item.id && item.manifestUrl)
    : [];
}

async function importAvatarPack(url: string, archive: File): Promise<AvatarPackSummary> {
  const target = String(url || "").trim();
  if (!target) {
    throw new Error("Avatar import API is not configured.");
  }
  const formData = new FormData();
  formData.set("archive", archive, archive.name);
  const response = await fetch(target, {
    method: "POST",
    body: formData,
  });
  const payload = await response.json() as AvatarImportPayload;
  if (!response.ok || payload.success === false || !payload.item) {
    throw new Error(String(payload.error || `HTTP ${response.status}`));
  }
  return {
    id: String(payload.item.id || "").trim(),
    name: String(payload.item.name || payload.item.id || "").trim(),
    manifestUrl: String(payload.item.manifestUrl || "").trim(),
    previewUrl: String(payload.item.previewUrl || "").trim(),
    motionCount: Number(payload.item.motionCount || 0),
    capabilities: typeof payload.item.capabilities === "object" && payload.item.capabilities
      ? {
          supportsMotion: Boolean(payload.item.capabilities.supportsMotion),
          supportsEmotion: Boolean(payload.item.capabilities.supportsEmotion),
          supportsLipSync: Boolean(payload.item.capabilities.supportsLipSync),
        }
      : undefined,
  };
}

async function loadAvatarPackDetails(url: string, packId: string): Promise<AvatarPackDetails> {
  const target = String(url || "").trim();
  const normalizedPackId = String(packId || "").trim();
  if (!target || !normalizedPackId) {
    throw new Error("Avatar pack API is not configured.");
  }
  const response = await fetch(`${target}?packId=${encodeURIComponent(normalizedPackId)}`, {
    cache: "no-store",
  });
  const payload = await response.json() as {
    success?: boolean;
    packId?: string;
    manifest?: Record<string, unknown>;
    motionMap?: { motions?: AvatarMotionDef[]; semantic?: Record<string, number | number[]> };
    error?: string;
  };
  if (!response.ok || payload.success === false || !payload.packId) {
    throw new Error(String(payload.error || `HTTP ${response.status}`));
  }
  return {
    packId: String(payload.packId || "").trim(),
    manifest: payload.manifest || {},
    motionMap: {
      motions: Array.isArray(payload.motionMap?.motions)
        ? payload.motionMap?.motions.map((item) => ({
            index: Number(item.index),
            id: String(item.id || "").trim(),
            label: String(item.label || item.id || "").trim(),
            group: String(item.group || "").trim(),
            tags: Array.isArray(item.tags) ? item.tags.map((tag) => String(tag || "").trim()).filter(Boolean) : [],
          })).filter((item) => Number.isFinite(item.index))
        : [],
      semantic: typeof payload.motionMap?.semantic === "object" && payload.motionMap?.semantic
        ? Object.fromEntries(Object.entries(payload.motionMap.semantic))
        : {},
    },
  };
}

async function saveAvatarPackDetails(url: string, details: AvatarPackDetails): Promise<AvatarPackDetails> {
  const target = String(url || "").trim();
  if (!target || !details.packId) {
    throw new Error("Avatar pack API is not configured.");
  }
  const response = await fetch(`${target}?packId=${encodeURIComponent(details.packId)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ motionMap: details.motionMap }),
  });
  const payload = await response.json() as {
    success?: boolean;
    packId?: string;
    manifest?: Record<string, unknown>;
    motionMap?: { motions?: AvatarMotionDef[]; semantic?: Record<string, number | number[]> };
    error?: string;
  };
  if (!response.ok || payload.success === false || !payload.packId) {
    throw new Error(String(payload.error || `HTTP ${response.status}`));
  }
  return {
    packId: String(payload.packId || "").trim(),
    manifest: payload.manifest || details.manifest,
    motionMap: {
      motions: Array.isArray(payload.motionMap?.motions) ? payload.motionMap.motions : details.motionMap.motions,
      semantic: typeof payload.motionMap?.semantic === "object" && payload.motionMap?.semantic
        ? Object.fromEntries(Object.entries(payload.motionMap.semantic))
        : details.motionMap.semantic,
    },
  };
}

function selectedSemanticMotion(value: number | number[] | undefined): string {
  if (Array.isArray(value)) {
    const first = value.find((item) => Number.isFinite(Number(item)));
    return first === undefined ? "" : String(Number(first));
  }
  return Number.isFinite(Number(value)) ? String(Number(value)) : "";
}

function avatarSemanticLabel(copy: EditorCopy, field: AvatarSemanticField): string {
  const value = copy[field.labelKey as keyof EditorCopy];
  return typeof value === "string" ? value : field.key;
}

function renderAvatarMapping(
  copy: EditorCopy,
  details: AvatarPackDetails,
): string {
  const motions = details.motionMap.motions || [];
  return `
    <div class="card-stack" style="margin-top:16px;">
      <div class="meta">${copy.avatarMappingSubtitle}</div>
      <div class="inspector-grid avatar-mapping-grid">
        ${AVATAR_SEMANTIC_FIELDS.map((field) => `
          <div class="field">
            <label for="avatar-semantic-${escapeHtml(field.key)}">${escapeHtml(avatarSemanticLabel(copy, field))}</label>
            <select id="avatar-semantic-${escapeHtml(field.key)}" data-avatar-semantic="${escapeHtml(field.key)}">
              <option value="">${escapeHtml(copy.avatarMotionNone)}</option>
              ${motions.map((motion) => `
                <option value="${escapeHtml(String(motion.index))}"${selectedSemanticMotion(details.motionMap.semantic[field.key]) === String(motion.index) ? " selected" : ""}>
                  ${escapeHtml(`${motion.label || motion.id} · #${motion.index}`)}
                </option>
              `).join("")}
            </select>
          </div>
        `).join("")}
      </div>
      <div class="cards-list">
        ${motions.map((motion) => `
          <article class="card-list-item">
            <div class="card-list-select">
              <strong>${escapeHtml(motion.label || motion.id || `Motion ${motion.index}`)}</strong>
              <span class="meta">${escapeHtml(`${copy.avatarMappingMotion} #${motion.index} · ${motion.group || "motion"}`)}</span>
              <code>${escapeHtml(motion.id || "")}</code>
            </div>
          </article>
        `).join("")}
      </div>
      <div class="meta">${copy.avatarMappingSaveHint}</div>
    </div>
  `;
}

function renderAvatarPackTile(
  copy: EditorCopy,
  item: AvatarPackSummary | null,
  selectedPackId: string,
): string {
  const packId = item?.id || "";
  const isSelected = selectedPackId === packId;
  const title = item?.name || copy.avatarPackDefaultTile;
  const subtitle = item?.id || copy.avatarPackCurrent;
  const previewUrl = item?.previewUrl || "";
  const tags = item
    ? [
        item.motionCount > 0 ? copy.avatarPackMotionCount(item.motionCount) : "",
        item.capabilities?.supportsMotion ? copy.avatarCapabilityMotion : "",
        item.capabilities?.supportsEmotion ? copy.avatarCapabilityEmotion : "",
        item.capabilities?.supportsLipSync ? copy.avatarCapabilityLipSync : "",
      ].filter(Boolean)
    : [copy.avatarPackDefaultHint];

  return `
    <article class="avatar-pack-card${isSelected ? " is-active" : ""}">
      <div class="avatar-pack-card-preview">
        ${previewUrl
          ? `<img src="${escapeHtml(previewUrl)}" alt="${escapeHtml(title)}">`
          : `<span>${escapeHtml(title)}</span>`}
      </div>
      <div class="avatar-pack-card-body">
        <strong>${escapeHtml(title)}</strong>
        <div class="meta">${escapeHtml(subtitle)}</div>
        <div class="avatar-pack-card-meta">
          ${tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
        </div>
        <button class="scene-editor-button${isSelected ? " is-accent" : ""}" type="button" data-action="select-avatar-pack" data-pack-id="${escapeHtml(packId)}">
          ${escapeHtml(isSelected ? copy.avatarPackSelected : copy.avatarPackSelect)}
        </button>
      </div>
    </article>
  `;
}

function isEntityBindingField(field: string): boolean {
  return ["entity", "stateEntity", "downEntity", "upEntity"].includes(field);
}

function renderBindingTargets(
  copy: EditorCopy,
  card: SceneCardV1 | null,
  cardIndex: number | null,
  focusedBinding: { cardIndex: number; field: string } | null,
): string {
  if (!card || cardIndex === null) {
    return `<div class="meta">${escapeHtml(copy.entityBindingEmpty)}</div>`;
  }
  const fields = cardFieldsForType(fieldValue(card as Record<string, unknown>, "type") || "entity")
    .filter((field) => isEntityBindingField(field));
  if (!fields.length) {
    return `<div class="meta">${escapeHtml(copy.entityBindingEmpty)}</div>`;
  }
  return `
    <div class="binding-targets">
      ${fields.map((field) => {
        const active = focusedBinding?.cardIndex === cardIndex && focusedBinding.field === field;
        return `
          <button class="tiny-btn${active ? " is-active" : ""}" type="button" data-action="focus-binding" data-card-index="${cardIndex}" data-binding-field="${escapeHtml(field)}">
            ${escapeHtml(labelForField(copy, field))}
          </button>
        `;
      }).join("")}
    </div>
  `;
}

function firstBindableFieldForType(type: string): string | null {
  return cardFieldsForType(type).find((field) => isEntityBindingField(field)) || null;
}

function renderPageField(label: string, field: string, value: string, wide = false): string {
  return `
    <div class="field ${wide ? "is-wide" : ""}">
      <label for="page-field-${field}">${escapeHtml(label)}</label>
      <input id="page-field-${field}" type="text" data-page-field="${escapeHtml(field)}" value="${escapeHtml(value)}">
    </div>
  `;
}

function renderDisplayField(label: string, field: DisplayFieldKey, value: string): string {
  const step = field === "globalScale" ? "0.01" : "1";
  return `
    <div class="field">
      <label for="display-field-${field}">${escapeHtml(label)}</label>
      <input id="display-field-${field}" type="number" step="${step}" data-display-field="${escapeHtml(field)}" value="${escapeHtml(value)}">
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

function renderCard(
  copy: EditorCopy,
  card: SceneCardV1,
  index: number,
  focusedBinding: { cardIndex: number; field: string } | null,
): string {
  const type = fieldValue(card as Record<string, unknown>, "type") || "entity";
  const fields = cardFieldsForType(type);
  return `
    <article class="card-item">
      <div class="card-item-head">
        <div>
          <strong>${escapeHtml(fieldValue(card as Record<string, unknown>, "caption") || cardTypeLabel(copy, type))}</strong>
          <div class="meta">${escapeHtml(cardTypeLabel(copy, type))}</div>
        </div>
        <div class="meta">#${index + 1}</div>
      </div>
      <div class="card-grid">
        <div class="field is-wide">
          <label>${escapeHtml(copy.cardType)}</label>
          <select data-card-index="${index}" data-card-field="type">
            ${CARD_TYPE_OPTIONS.map((item) => `<option value="${item}"${item === type ? " selected" : ""}>${escapeHtml(cardTypeLabel(copy, item))}</option>`).join("")}
          </select>
        </div>
        ${fields.map((field) => {
          const bindingField = isEntityBindingField(field);
          const isActiveBinding = bindingField
            && focusedBinding?.cardIndex === index
            && focusedBinding.field === field;
          if (bindingField) {
            return `
              <div class="field ${field === "hint" ? "is-wide" : ""} is-binding-field${isActiveBinding ? " is-active" : ""}">
                <label>${escapeHtml(labelForField(copy, field))}</label>
                <div class="field-binding-row">
                  <input
                    type="text"
                    data-card-index="${index}"
                    data-card-field="${escapeHtml(field)}"
                    data-binding-field="${escapeHtml(field)}"
                    value="${escapeHtml(fieldValue(card as Record<string, unknown>, field))}"
                  >
                  <button
                    class="tiny-btn"
                    type="button"
                    data-action="focus-binding"
                    data-card-index="${index}"
                    data-binding-field="${escapeHtml(field)}"
                  >${copy.bindFromHa}</button>
                </div>
              </div>
            `;
          }
          return `
            <div class="field ${field === "hint" ? "is-wide" : ""}">
              <label>${escapeHtml(labelForField(copy, field))}</label>
              <input
                type="${field === "digits" ? "number" : "text"}"
                data-card-index="${index}"
                data-card-field="${escapeHtml(field)}"
                value="${escapeHtml(fieldValue(card as Record<string, unknown>, field))}"
              >
            </div>
          `;
        }).join("")}
      </div>
    </article>
  `;
}

function renderCardListItem(
  copy: EditorCopy,
  card: SceneCardV1,
  index: number,
  count: number,
  selected: boolean,
): string {
  const type = fieldValue(card as Record<string, unknown>, "type") || "entity";
  const title = fieldValue(card as Record<string, unknown>, "caption") || cardTypeLabel(copy, type);
  const secondary = fieldValue(card as Record<string, unknown>, "entity")
    || fieldValue(card as Record<string, unknown>, "stateEntity")
    || fieldValue(card as Record<string, unknown>, "downEntity")
    || fieldValue(card as Record<string, unknown>, "upEntity")
    || fieldValue(card as Record<string, unknown>, "value")
    || fieldValue(card as Record<string, unknown>, "hint")
    || cardTypeDescription(type);

  return `
    <article class="card-list-item${selected ? " is-active" : ""}">
      <button class="card-list-select" type="button" data-action="select-card" data-card-index="${index}">
        <strong>${escapeHtml(title)}</strong>
        <span class="meta">${escapeHtml(cardTypeLabel(copy, type))}</span>
        <div class="meta">${escapeHtml(secondary)}</div>
      </button>
      <div class="card-actions">
        <button class="tiny-btn" type="button" data-action="card-up" data-card-index="${index}"${index === 0 ? " disabled" : ""}>${copy.up}</button>
        <button class="tiny-btn" type="button" data-action="card-down" data-card-index="${index}"${index === count - 1 ? " disabled" : ""}>${copy.down}</button>
        <button class="tiny-btn" type="button" data-action="card-remove" data-card-index="${index}">${copy.remove}</button>
      </div>
    </article>
  `;
}

function renderCardTemplateTile(copy: EditorCopy, type: string): string {
  return `
    <button
      class="card-template-button"
      type="button"
      data-action="add-card-template"
      data-card-type="${escapeHtml(type)}"
    >
      <strong>${escapeHtml(cardTypeLabel(copy, type))}</strong>
      <span>${escapeHtml(cardTypeDescription(type))}</span>
    </button>
  `;
}

function hydrateCardFromEntity(card: SceneCardV1, field: string, entity: HaEntitySummary): void {
  (card as Record<string, unknown>)[field] = entity.entityId;

  const record = card as Record<string, unknown>;
  if (!String(record.caption || "").trim()) {
    record.caption = entity.name;
  }
  if (!String(record.hint || "").trim()) {
    record.hint = entity.unit ? `${entity.state} ${entity.unit}`.trim() : entity.state;
  }
  if ((record.type === "number" || record.type === "percent") && !String(record.unit || "").trim() && entity.unit) {
    record.unit = entity.unit;
  }
}

export async function mountNativeEditorShell(options: NativeEditorShellOptions): Promise<void> {
  const copy = COPY[resolveUiLang()];
  const appRoot = document.getElementById("app");
  if (!appRoot) {
    throw new Error("Missing #app root");
  }
  const existing = document.getElementById("scene-editor-shell");
  if (existing?.contains(appRoot)) {
    document.body.insertBefore(appRoot, existing);
  }
  existing?.remove();

  const wrapper = document.createElement("section");
  wrapper.id = "scene-editor-shell";
  wrapper.innerHTML = `
    <style>
      #scene-editor-shell {
        max-width: 1420px;
        margin: 0 auto;
        padding: 24px 18px 64px;
        color: #203041;
      }
      #scene-editor-shell .scene-editor-page {
        display: grid;
        gap: 22px;
      }
      #scene-editor-shell .scene-preview-shell,
      #scene-editor-shell .scene-settings-card {
        border-radius: 24px;
        border: 1px solid rgba(32,48,65,0.1);
        background: rgba(248, 251, 253, 0.92);
        box-shadow: 0 16px 36px rgba(46,72,94,0.1);
      }
      #scene-editor-shell .scene-preview-shell {
        padding: 18px;
      }
      #scene-editor-shell .scene-preview-head,
      #scene-editor-shell .scene-dashboard-topbar {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        flex-wrap: wrap;
      }
      #scene-editor-shell .scene-preview-copy strong,
      #scene-editor-shell .scene-dashboard-title strong {
        display: block;
        font: 700 18px/1.05 "Aptos","Segoe UI",sans-serif;
        letter-spacing: -0.03em;
      }
      #scene-editor-shell .scene-preview-copy span,
      #scene-editor-shell .scene-dashboard-title span {
        display: block;
        margin-top: 6px;
        font: 13px/1.45 "Aptos","Segoe UI",sans-serif;
        color: rgba(32,48,65,0.68);
      }
      #scene-editor-shell .scene-preview-controls {
        display: flex;
        align-items: end;
        gap: 14px;
        flex-wrap: wrap;
      }
      #scene-editor-shell .scene-preview-resolution {
        min-width: 140px;
        padding: 10px 14px;
        border-radius: 18px;
        border: 1px solid rgba(32,48,65,0.08);
        background: rgba(255,255,255,0.82);
      }
      #scene-editor-shell .scene-preview-resolution span {
        display: block;
        font: 12px/1.2 "Aptos","Segoe UI",sans-serif;
        color: rgba(32,48,65,0.62);
      }
      #scene-editor-shell .scene-preview-resolution strong {
        display: block;
        margin-top: 4px;
        font: 700 15px/1.1 "Aptos","Segoe UI",sans-serif;
      }
      #scene-editor-shell .scene-preview-frame {
        margin-top: 18px;
        overflow-x: auto;
        overflow-y: hidden;
        padding: 4px 0 8px;
      }
      #scene-editor-shell .scene-preview-stage {
        overflow: hidden;
        border-radius: 18px;
        border: 1px solid rgba(32,48,65,0.1);
        background: #e6eef4;
        display: block;
      }
      #scene-editor-shell #app {
        overflow: hidden;
        margin: 0;
        min-height: 0;
        transform: none !important;
      }
      #scene-editor-shell #app,
      #scene-editor-shell #app .scene-viewport,
      #scene-editor-shell #app .layout {
        min-height: 0;
        height: 100%;
      }
      #scene-editor-shell #app .scene-viewport {
        overflow: hidden;
      }
      #scene-editor-shell .scene-dashboard {
        display: grid;
        gap: 18px;
      }
      #scene-editor-shell[data-collapsed="true"] .scene-dashboard-body {
        display: none;
      }
      #scene-editor-shell .scene-editor-status {
        margin-top: 10px;
        display: inline-flex;
        align-items: center;
        min-height: 30px;
        padding: 0 12px;
        border-radius: 999px;
        background: rgba(255,255,255,0.84);
        font: 12px/1 "Aptos","Segoe UI",sans-serif;
        color: #4b6577;
      }
      #scene-editor-shell .scene-editor-status[data-tone="ok"] { color:#2b7f57; }
      #scene-editor-shell .scene-editor-status[data-tone="bad"] { color:#ab4444; }
      #scene-editor-shell .scene-editor-actions {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
        justify-content: flex-end;
      }
      #scene-editor-shell .scene-editor-button,
      #scene-editor-shell .tiny-btn,
      #scene-editor-shell input,
      #scene-editor-shell select {
        font: 13px/1.2 "Aptos","Segoe UI",sans-serif;
      }
      #scene-editor-shell .scene-editor-button,
      #scene-editor-shell .tiny-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 40px;
        padding: 0 14px;
        border-radius: 999px;
        border: 1px solid rgba(62,98,122,0.18);
        background: rgba(255,255,255,0.86);
        color: #203041;
        text-decoration: none;
        cursor: pointer;
      }
      #scene-editor-shell .tiny-btn {
        min-height: 30px;
        padding: 0 10px;
      }
      #scene-editor-shell .tiny-btn.is-active {
        background: rgba(45,98,162,0.14);
        border-color: rgba(45,98,162,0.25);
        color: #1f4e87;
      }
      #scene-editor-shell .scene-editor-button.is-accent {
        background: linear-gradient(180deg, rgba(111,191,162,0.24), rgba(111,191,162,0.12));
        border-color: rgba(77,147,121,0.28);
      }
      #scene-editor-shell .scene-settings-card {
        padding: 18px;
      }
      #scene-editor-shell .scene-settings-head {
        margin-bottom: 12px;
      }
      #scene-editor-shell h2 {
        margin: 0 0 6px;
        font: 700 16px/1.1 "Aptos","Segoe UI",sans-serif;
        color: #203041;
      }
      #scene-editor-shell .meta {
        font: 12px/1.4 "Aptos","Segoe UI",sans-serif;
        color: rgba(32,48,65,0.66);
      }
      #scene-editor-shell .page-list,
      #scene-editor-shell .cards-list,
      #scene-editor-shell .scene-settings-stack {
        display: grid;
        gap: 10px;
      }
      #scene-editor-shell .ha-list {
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      }
      #scene-editor-shell .card-template-grid {
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      }
      #scene-editor-shell .card-template-button {
        display: grid;
        gap: 6px;
        min-height: 96px;
        padding: 14px;
        text-align: left;
        border-radius: 18px;
        border: 1px solid rgba(32,48,65,0.1);
        background: rgba(255,255,255,0.9);
        color: #203041;
        cursor: pointer;
      }
      #scene-editor-shell .card-template-button strong {
        display: block;
        font: 700 14px/1.15 "Aptos","Segoe UI",sans-serif;
      }
      #scene-editor-shell .card-template-button span {
        font: 12px/1.4 "Aptos","Segoe UI",sans-serif;
        color: rgba(32,48,65,0.66);
      }
      #scene-editor-shell .avatar-pack-box {
        display: grid;
        gap: 14px;
      }
      #scene-editor-shell .avatar-pack-grid {
        display: grid;
        gap: 12px;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      }
      #scene-editor-shell .avatar-pack-card {
        display: grid;
        gap: 12px;
        border-radius: 20px;
        border: 1px solid rgba(32,48,65,0.1);
        background: rgba(255,255,255,0.92);
        padding: 14px;
      }
      #scene-editor-shell .avatar-pack-card.is-active {
        border-color: rgba(45,98,162,0.35);
        box-shadow: inset 0 0 0 1px rgba(45,98,162,0.18);
      }
      #scene-editor-shell .avatar-pack-card-preview {
        min-height: 144px;
        border-radius: 16px;
        background: linear-gradient(180deg, rgba(223,232,239,0.82), rgba(236,242,246,0.92));
        display: grid;
        place-items: center;
        overflow: hidden;
      }
      #scene-editor-shell .avatar-pack-card-preview img {
        display: block;
        max-width: 100%;
        max-height: 144px;
        object-fit: contain;
      }
      #scene-editor-shell .avatar-pack-card-preview span {
        padding: 12px;
        text-align: center;
        font: 12px/1.35 "Aptos","Segoe UI",sans-serif;
        color: rgba(32,48,65,0.62);
      }
      #scene-editor-shell .avatar-pack-card-body {
        display: grid;
        gap: 8px;
      }
      #scene-editor-shell .avatar-pack-card-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      #scene-editor-shell .avatar-pack-card-meta span {
        border-radius: 999px;
        padding: 4px 8px;
        background: rgba(214,225,237,0.72);
        font-size: 11px;
        color: #385268;
      }
      #scene-editor-shell .page-chip,
      #scene-editor-shell .card-item,
      #scene-editor-shell .ha-entity,
      #scene-editor-shell .card-list-item {
        display: grid;
        gap: 10px;
        padding: 12px;
        border-radius: 18px;
        border: 1px solid rgba(32,48,65,0.08);
        background: rgba(255,255,255,0.86);
      }
      #scene-editor-shell .page-chip.is-active {
        border-color: rgba(77,147,121,0.34);
        box-shadow: 0 0 0 2px rgba(111,191,162,0.18);
      }
      #scene-editor-shell .card-list-item.is-active {
        border-color: rgba(77,147,121,0.34);
        box-shadow: 0 0 0 2px rgba(111,191,162,0.18);
      }
      #scene-editor-shell .page-chip-header {
        display: grid;
        gap: 4px;
        cursor: pointer;
      }
      #scene-editor-shell .card-list-select {
        display: grid;
        gap: 4px;
        padding: 0;
        border: 0;
        background: transparent;
        text-align: left;
        cursor: pointer;
        color: inherit;
      }
      #scene-editor-shell .page-chip-header strong,
      #scene-editor-shell .card-item-head strong,
      #scene-editor-shell .ha-entity strong,
      #scene-editor-shell .card-list-select strong {
        display: block;
        font: 700 14px/1.1 "Aptos","Segoe UI",sans-serif;
        color: #203041;
      }
      #scene-editor-shell .page-chip-actions,
      #scene-editor-shell .card-actions,
      #scene-editor-shell .card-add {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      #scene-editor-shell .inspector-grid,
      #scene-editor-shell .card-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
      }
      #scene-editor-shell .avatar-mapping-grid {
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      }
      #scene-editor-shell .card-stack {
        display: grid;
        gap: 16px;
      }
      #scene-editor-shell .field {
        display: grid;
        gap: 6px;
      }
      #scene-editor-shell .field.is-binding-field {
        padding: 10px;
        border-radius: 14px;
        border: 1px solid rgba(32,48,65,0.08);
        background: rgba(246,249,252,0.82);
      }
      #scene-editor-shell .field.is-binding-field.is-active {
        border-color: rgba(77,147,121,0.34);
        box-shadow: 0 0 0 2px rgba(111,191,162,0.18);
      }
      #scene-editor-shell .field.is-wide {
        grid-column: 1 / -1;
      }
      #scene-editor-shell .field label {
        font: 12px/1.25 "Aptos","Segoe UI",sans-serif;
        color: rgba(32,48,65,0.72);
      }
      #scene-editor-shell input,
      #scene-editor-shell select {
        width: 100%;
        min-height: 40px;
        border-radius: 12px;
        border: 1px solid rgba(32,48,65,0.12);
        background: rgba(255,255,255,0.92);
        padding: 0 12px;
        color: #203041;
      }
      #scene-editor-shell .field-binding-row {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 8px;
        align-items: center;
      }
      #scene-editor-shell .binding-targets {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 12px;
      }
      #scene-editor-shell .ha-entity code {
        font: 12px/1.25 Consolas, monospace;
        color: #385268;
      }
      #scene-editor-shell code {
        font: 12px/1.25 Consolas, monospace;
        color: #385268;
      }
      #scene-editor-shell .ha-entity-row {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 8px;
      }
      #scene-editor-shell .ha-state {
        font: 12px/1.3 "Aptos","Segoe UI",sans-serif;
        color: #4f6a7c;
      }
      @media (max-width: 980px) {
        #scene-editor-shell {
          padding: 12px 12px 42px;
        }
        #scene-editor-shell .scene-preview-shell,
        #scene-editor-shell .scene-settings-card {
          border-radius: 24px;
        }
        #scene-editor-shell .avatar-pack-box {
          grid-template-columns: 1fr;
        }
        #scene-editor-shell .inspector-grid,
        #scene-editor-shell .card-grid {
          grid-template-columns: 1fr;
        }
        #scene-editor-shell .field-binding-row {
          grid-template-columns: 1fr;
        }
      }
    </style>
    <div class="scene-editor-page">
      <section class="scene-preview-shell">
        <div class="scene-preview-head">
          <div class="scene-preview-copy">
            <strong>${copy.previewTitle}</strong>
            <span>${copy.previewSubtitle}</span>
          </div>
          <div class="scene-preview-controls">
            <div class="field">
              <label for="scene-preview-display">${copy.previewDisplay}</label>
              <select id="scene-preview-display" data-preview-display>
                ${PREVIEW_DISPLAY_PROFILES.map((profile) => `<option value="${escapeHtml(profile.id)}">${escapeHtml(profile.label[resolveUiLang()])}</option>`).join("")}
              </select>
            </div>
            <div class="scene-preview-resolution">
              <span>${copy.previewResolution}</span>
              <strong data-preview-resolution>1920 × 1080</strong>
            </div>
            <button class="scene-editor-button" type="button" data-action="apply-display-profile">${copy.previewApplyProfile}</button>
          </div>
        </div>
        <div class="scene-preview-frame">
          <div class="scene-preview-stage" data-preview-stage></div>
        </div>
      </section>
      <section class="scene-dashboard" data-dashboard></section>
    </div>
  `;
  document.body.appendChild(wrapper);
  document.documentElement.dataset.editorMode = "true";
  document.body.dataset.editorMode = "true";
  document.body.style.overflow = "auto";

  const previewStage = wrapper.querySelector<HTMLElement>("[data-preview-stage]");
  const previewResolution = wrapper.querySelector<HTMLElement>("[data-preview-resolution]");
  const previewDisplaySelect = wrapper.querySelector<HTMLSelectElement>("[data-preview-display]");
  const dashboardHost = wrapper.querySelector<HTMLElement>("[data-dashboard]");
  if (!previewStage || !previewResolution || !previewDisplaySelect || !dashboardHost) {
    throw new Error("Missing native editor shell elements");
  }
  previewStage.appendChild(appRoot);

  const state: EditorState = {
    config: null,
    selectedPageId: null,
    selectedCardIndex: null,
    dirty: false,
    saving: false,
    status: copy.statusLoading,
    statusTone: "muted",
    haEntities: [],
    avatarCatalog: [],
    entitySearch: "",
    focusedBinding: null,
    previewDisplayId: DEFAULT_PREVIEW_DISPLAY_ID,
    pendingAvatarZip: null,
    pendingAvatarZipName: "",
    avatarImporting: false,
    avatarImportStatus: "",
    avatarImportTone: "muted",
    avatarPackDetails: null,
    avatarPackLoading: false,
    avatarPackDirty: false,
    avatarPackSaving: false,
  };

  const loadSelectedAvatarPackDetails = async (packId: string | null | undefined): Promise<void> => {
    const normalizedPackId = String(packId || "").trim();
    if (!normalizedPackId || !options.avatarPackApiUrl) {
      state.avatarPackDetails = null;
      state.avatarPackLoading = false;
      state.avatarPackDirty = false;
      return;
    }
    state.avatarPackLoading = true;
    render();
    try {
      state.avatarPackDetails = await loadAvatarPackDetails(options.avatarPackApiUrl, normalizedPackId);
      state.avatarPackDirty = false;
    } catch (error) {
      state.avatarPackDetails = null;
      state.avatarPackDirty = false;
      setStatus(`${copy.avatarMappingLoadError}: ${String(error)}`, "bad");
    } finally {
      state.avatarPackLoading = false;
    }
  };

  const applyPreviewLayout = (): void => {
    const profile = resolvePreviewDisplayProfile(state.previewDisplayId);
    previewDisplaySelect.value = profile.id;
    previewResolution.textContent = formatPreviewResolution(profile);
    previewStage.style.width = `${profile.width}px`;
    previewStage.style.height = `${profile.height}px`;
    appRoot.style.width = `${profile.width}px`;
    appRoot.style.height = `${profile.height}px`;
  };

  const resizeObserver = typeof ResizeObserver !== "undefined"
    ? new ResizeObserver(() => applyPreviewLayout())
    : null;
  resizeObserver?.observe(previewStage);

  const render = (): void => {
    const config = state.config;
    const ordered = config ? orderedPages(config) : [];
    const selectedPage = ordered.find((page) => page.id === state.selectedPageId) || ordered[0] || null;
    const selectedCards = Array.isArray(selectedPage?.cards) ? selectedPage.cards : [];
    const selectedCard = state.selectedCardIndex !== null ? selectedCards[state.selectedCardIndex] || null : null;
    const filteredEntities = filterHaEntityCatalog(state.haEntities, state.entitySearch);
    const bindingLabel = state.focusedBinding
      ? copy.entityBindingActive(
          fieldValue(selectedCards[state.focusedBinding.cardIndex] as Record<string, unknown>, "caption")
            || `${copy.cards} #${state.focusedBinding.cardIndex + 1}`,
          labelForField(copy, state.focusedBinding.field),
        )
      : copy.entityBindingEmpty;
    const selectedAvatarPackId = config ? readAvatarPackId(config) : "";
    const avatarArchiveLabel = state.pendingAvatarZipName
      ? copy.avatarImportSelected(state.pendingAvatarZipName)
      : copy.avatarImportHint;
    const avatarImportStatus = state.avatarImportStatus
      ? `<div class="scene-editor-status" data-tone="${state.avatarImportTone}">${escapeHtml(state.avatarImportStatus)}</div>`
      : "";

    dashboardHost.innerHTML = `
      <div class="scene-dashboard-topbar">
        <div class="scene-dashboard-title">
          <strong>${copy.dashboardTitle}</strong>
          <span>${copy.dashboardSubtitle}</span>
          <div class="scene-editor-status" data-tone="${state.statusTone}">${escapeHtml(state.status)}</div>
        </div>
        <div class="scene-editor-actions">
          <a class="scene-editor-button" href="${escapeHtml(options.sceneUrl)}">${copy.viewOnly}</a>
          <button class="scene-editor-button is-accent" type="button" data-action="save"${state.saving || state.avatarPackSaving || !config ? " disabled" : ""}>${state.saving || state.avatarPackSaving ? copy.saving : copy.save}</button>
          <button class="scene-editor-button" type="button" data-action="add-page"${!config ? " disabled" : ""}>${copy.addPage}</button>
        </div>
      </div>
      <div class="scene-dashboard-body">
        <div class="scene-settings-stack">
          <section class="scene-settings-card">
            <div class="scene-settings-head">
              <h2>${copy.avatar}</h2>
              <div class="meta">${copy.avatarSubtitle}</div>
            </div>
          ${config ? `
            <div class="avatar-pack-box">
              <div class="meta">${state.avatarCatalog.length ? copy.avatarPackHint : copy.avatarPackEmpty}</div>
              <div class="meta">${copy.avatarPackAppliedAfterSave}</div>
              <div class="avatar-pack-grid">
                ${renderAvatarPackTile(copy, null, selectedAvatarPackId)}
                ${state.avatarCatalog.map((item) => renderAvatarPackTile(copy, item, selectedAvatarPackId)).join("")}
              </div>
            </div>
            <div class="card-stack" style="margin-top:16px;">
              <div class="field is-wide">
                <label for="avatar-pack-archive">${copy.avatarImportSelect}</label>
                <input id="avatar-pack-archive" type="file" accept=".zip,application/zip" data-avatar-archive>
              </div>
              <div class="meta">${escapeHtml(avatarArchiveLabel)}</div>
              <div class="page-chip-actions">
                <button class="scene-editor-button" type="button" data-action="import-avatar"${state.avatarImporting || !state.pendingAvatarZip || !options.avatarImportUrl ? " disabled" : ""}>
                  ${state.avatarImporting ? copy.avatarImporting : copy.avatarImportButton}
                </button>
              </div>
              ${avatarImportStatus}
            </div>
            ${selectedAvatarPackId
              ? state.avatarPackLoading
                ? `<div class="meta" style="margin-top:16px;">${copy.avatarMappingLoading}</div>`
                : state.avatarPackDetails
                  ? renderAvatarMapping(copy, state.avatarPackDetails)
                  : `<div class="meta" style="margin-top:16px;">${copy.avatarMappingEmpty}</div>`
              : `<div class="meta" style="margin-top:16px;">${copy.avatarMappingEmpty}</div>`}
          ` : `<div class="meta">${copy.statusLoading}</div>`}
          </section>
          <section class="scene-settings-card">
            <div class="scene-settings-head">
              <h2>${copy.pages}</h2>
              <div class="meta">${copy.subtitle(options.packId)}</div>
            </div>
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
          <section class="scene-settings-card">
            <div class="scene-settings-head">
              <h2>${copy.inspector}</h2>
              <div class="meta">${copy.pageSettings}</div>
            </div>
          ${selectedPage ? `
            <div class="inspector-grid">
              ${renderPageField(copy.fieldPageId, "id", pageFieldValue(selectedPage, "id"), true)}
              ${renderPageSelect(copy.fieldKind, "kind", pageFieldValue(selectedPage, "kind"), PAGE_KIND_OPTIONS.map((item) => ({ value: item, label: pageKindLabel(copy, item) })))}
              ${renderPageField(copy.fieldTitle, "title", pageFieldValue(selectedPage, "title"), true)}
              ${renderPageField(copy.fieldSubtitle, "subtitle", pageFieldValue(selectedPage, "subtitle"), true)}
              ${renderPageField(copy.fieldSlot, "slot", pageFieldValue(selectedPage, "slot"))}
              ${renderPageSelect(copy.fieldCardStyle, "cardStyle", pageFieldValue(selectedPage, "cardStyle") || "full", CARD_STYLE_OPTIONS.map((item) => ({ value: item, label: item === "mini" ? copy.styleMini : copy.styleFull })))}
              ${renderPageField(copy.fieldStampCaption, "stampCaption", pageFieldValue(selectedPage, "stampCaption"))}
              ${renderPageField(copy.fieldStampValue, "stampValue", pageFieldValue(selectedPage, "stampValue"))}
            </div>
          ` : `<div class="meta">${copy.statusLoading}</div>`}
          </section>
          <section class="scene-settings-card">
            <div class="scene-settings-head">
              <h2>${copy.cards}</h2>
              <div class="meta">${copy.cardsSubtitle}</div>
            </div>
          ${selectedPage ? `
            <div class="card-stack">
              <div>
                <div class="meta">${copy.cardTemplates}</div>
                <div class="card-template-grid" style="margin-top:12px;">
                  ${CARD_TYPE_OPTIONS.map((type) => renderCardTemplateTile(copy, type)).join("")}
                </div>
              </div>
              <div class="cards-list">
                ${selectedCards.length
                  ? selectedCards.map((card, index) => renderCardListItem(copy, card, index, selectedCards.length, index === state.selectedCardIndex)).join("")
                  : `<div class="meta">${copy.noCards}</div>`}
              </div>
              <div>
                <h2>${copy.cardInspector}</h2>
                ${selectedCard
                  ? renderCard(copy, selectedCard, state.selectedCardIndex || 0, state.focusedBinding)
                  : `<div class="meta">${copy.cardInspectorEmpty}</div>`}
              </div>
            </div>
          ` : `<div class="meta">${copy.statusLoading}</div>`}
          </section>
          <section class="scene-settings-card">
            <div class="scene-settings-head">
              <h2>${copy.displaySettings}</h2>
              <div class="meta">${copy.displaySubtitle}</div>
            </div>
          ${config ? `
            <div class="inspector-grid">
              ${renderDisplayField(copy.fieldDisplaySafeTop, "safeTop", readDisplayFieldValue(config, "safeTop"))}
              ${renderDisplayField(copy.fieldDisplaySafeRight, "safeRight", readDisplayFieldValue(config, "safeRight"))}
              ${renderDisplayField(copy.fieldDisplaySafeBottom, "safeBottom", readDisplayFieldValue(config, "safeBottom"))}
              ${renderDisplayField(copy.fieldDisplaySafeLeft, "safeLeft", readDisplayFieldValue(config, "safeLeft"))}
              ${renderDisplayField(copy.fieldDisplayPadding, "layoutPaddingPx", readDisplayFieldValue(config, "layoutPaddingPx"))}
              ${renderDisplayField(copy.fieldDisplayGap, "layoutGapPx", readDisplayFieldValue(config, "layoutGapPx"))}
              ${renderDisplayField(copy.fieldDisplayScale, "globalScale", readDisplayFieldValue(config, "globalScale"))}
            </div>
          ` : `<div class="meta">${copy.statusLoading}</div>`}
          </section>
          <section class="scene-settings-card">
            <div class="scene-settings-head">
              <h2>${copy.homeAssistant}</h2>
              <div class="meta">${escapeHtml(bindingLabel)}</div>
            </div>
          <div>
            <div class="meta">${copy.entityBindingTargets}</div>
            ${renderBindingTargets(copy, selectedCard, state.selectedCardIndex, state.focusedBinding)}
          </div>
          <div class="field ha-search" style="margin-top:12px;">
            <label for="ha-entity-search">${copy.entitySearch}</label>
            <input id="ha-entity-search" type="text" data-ha-search value="${escapeHtml(state.entitySearch)}">
          </div>
          <div class="ha-list">
            ${filteredEntities.length ? filteredEntities.map((entity) => `
              <article class="ha-entity">
                <div class="ha-entity-row">
                  <div>
                    <strong>${escapeHtml(entity.name)}</strong>
                    <div class="meta">${escapeHtml(entity.domain)}</div>
                  </div>
                  <button class="tiny-btn" type="button" data-action="bind-entity" data-entity-id="${escapeHtml(entity.entityId)}"${state.focusedBinding ? "" : " disabled"}>${copy.useEntity}</button>
                </div>
                <code>${escapeHtml(entity.entityId)}</code>
                <div class="ha-state">${escapeHtml(entity.state)}${entity.unit ? ` · ${escapeHtml(entity.unit)}` : ""}</div>
              </article>
            `).join("") : `<div class="meta">${copy.noEntities}</div>`}
          </div>
          </section>
        </div>
      </div>
    `;
    applyPreviewLayout();
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
    const selectedPage = ordered.find((page) => page.id === state.selectedPageId) || null;
    const cards = Array.isArray(selectedPage?.cards) ? selectedPage.cards : [];
    if (!cards.length) {
      state.selectedCardIndex = null;
      state.focusedBinding = null;
    } else if (state.selectedCardIndex === null || state.selectedCardIndex >= cards.length) {
      state.selectedCardIndex = 0;
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

  const updateDisplayField = (field: DisplayFieldKey, value: string): void => {
    if (!state.config) {
      return;
    }
    const display = ensureDisplayConfig(state.config);
    const safeArea = display.safeArea || {};
    const numericValue = value === "" ? null : Number(value);
    const normalized = Number.isFinite(numericValue) ? numericValue : null;

    if (field === "safeTop") {
      safeArea.top = normalized ?? 0;
    } else if (field === "safeRight") {
      safeArea.right = normalized ?? 0;
    } else if (field === "safeBottom") {
      safeArea.bottom = normalized ?? 0;
    } else if (field === "safeLeft") {
      safeArea.left = normalized ?? 0;
    } else if (field === "layoutPaddingPx") {
      display.layoutPaddingPx = normalized ?? 16;
    } else if (field === "layoutGapPx") {
      display.layoutGapPx = normalized ?? 16;
    } else if (field === "globalScale") {
      display.globalScale = normalized ?? 1;
    }

    display.safeArea = safeArea;
    markDirty();
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
      if (state.focusedBinding?.cardIndex === cardIndex) {
        const nextBindingField = firstBindableFieldForType(value);
        state.focusedBinding = nextBindingField ? { cardIndex, field: nextBindingField } : null;
      }
    } else if (field === "digits") {
      (card as Record<string, unknown>)[field] = value === "" ? 0 : Number(value);
    } else {
      (card as Record<string, unknown>)[field] = value;
    }
    markDirty();
  };

  const bindEntityToFocusedField = (entityId: string): void => {
    if (!state.config || !state.selectedPageId || !state.focusedBinding) {
      return;
    }
    const page = state.config.pages.find((item) => item.id === state.selectedPageId);
    const entity = state.haEntities.find((item) => item.entityId === entityId);
    if (!page || !Array.isArray(page.cards) || !entity) {
      return;
    }
    const card = page.cards[state.focusedBinding.cardIndex];
    if (!card) {
      return;
    }
    hydrateCardFromEntity(card, state.focusedBinding.field, entity);
    markDirty();
    render();
  };

  const focusBindingField = (cardIndex: number, field: string): void => {
    state.selectedCardIndex = cardIndex;
    state.focusedBinding = { cardIndex, field };
    render();
    window.requestAnimationFrame(() => {
      const searchInput = wrapper.querySelector<HTMLInputElement>("#ha-entity-search");
      searchInput?.scrollIntoView({ behavior: "smooth", block: "center" });
      searchInput?.focus();
      searchInput?.select();
    });
  };

  wrapper.addEventListener("click", async (event) => {
    const target = event.target as HTMLElement | null;
    const actionEl = target?.closest<HTMLElement>("[data-action]");
    const action = actionEl?.dataset.action;
    if (!action) {
      return;
    }
    if (action === "apply-display-profile" && state.config) {
      applyDisplayProfile(state.config, resolvePreviewDisplayProfile(state.previewDisplayId));
      markDirty();
      render();
      return;
    }
    if (action === "import-avatar") {
      if (!state.config || !options.avatarImportUrl || !state.pendingAvatarZip || state.avatarImporting) {
        return;
      }
      state.avatarImporting = true;
      state.avatarImportStatus = copy.avatarImporting;
      state.avatarImportTone = "muted";
      render();
      try {
        const importedPack = await importAvatarPack(options.avatarImportUrl, state.pendingAvatarZip);
        state.avatarCatalog = options.avatarCatalogUrl
          ? await loadAvatarCatalog(options.avatarCatalogUrl)
          : [importedPack];
        ensureAvatarConfig(state.config).packId = importedPack.id;
        await loadSelectedAvatarPackDetails(importedPack.id);
        state.pendingAvatarZip = null;
        state.pendingAvatarZipName = "";
        state.avatarImporting = false;
        state.avatarImportStatus = copy.avatarImportSuccess(importedPack.name || importedPack.id);
        state.avatarImportTone = "ok";
        markDirty();
        render();
      } catch (error) {
        state.avatarImporting = false;
        state.avatarImportStatus = `${copy.avatarImportError}: ${String(error)}`;
        state.avatarImportTone = "bad";
        render();
      }
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
      state.selectedCardIndex = 0;
      state.focusedBinding = null;
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
      state.selectedCardIndex = 0;
      state.focusedBinding = null;
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
      state.selectedCardIndex = null;
      state.focusedBinding = null;
      markDirty();
      syncSelection();
      render();
      return;
    }
    if (action === "add-card-template" && state.selectedPageId) {
      const page = state.config.pages.find((item) => item.id === state.selectedPageId);
      const addType = actionEl?.dataset.cardType || "entity";
      if (page) {
        if (!Array.isArray(page.cards)) {
          page.cards = [];
        }
        page.cards.push(createCard(addType));
        const nextCardIndex = page.cards.length - 1;
        state.selectedCardIndex = nextCardIndex;
        const bindingField = firstBindableFieldForType(addType);
        state.focusedBinding = bindingField ? { cardIndex: nextCardIndex, field: bindingField } : null;
        markDirty();
        render();
        if (bindingField) {
          window.requestAnimationFrame(() => {
            const searchInput = wrapper.querySelector<HTMLInputElement>("#ha-entity-search");
            searchInput?.scrollIntoView({ behavior: "smooth", block: "center" });
            searchInput?.focus();
          });
        }
      }
      return;
    }
    if (action === "focus-binding") {
      const cardIndex = Number(actionEl?.dataset.cardIndex || "-1");
      const bindingField = actionEl?.dataset.bindingField || "";
      if (cardIndex >= 0 && bindingField) {
        focusBindingField(cardIndex, bindingField);
      }
      return;
    }
    const cardIndex = Number(actionEl?.dataset.cardIndex || "-1");
    if (cardIndex >= 0 && state.selectedPageId) {
      const page = state.config.pages.find((item) => item.id === state.selectedPageId);
      if (!page || !Array.isArray(page.cards)) {
        return;
      }
      if (action === "select-card") {
        state.selectedCardIndex = cardIndex;
        render();
        return;
      }
      if (action === "card-remove") {
        page.cards = page.cards.filter((_, index) => index !== cardIndex);
        if (state.selectedCardIndex !== null) {
          if (state.selectedCardIndex === cardIndex) {
            state.selectedCardIndex = page.cards.length ? Math.min(cardIndex, page.cards.length - 1) : null;
          } else if (state.selectedCardIndex > cardIndex) {
            state.selectedCardIndex -= 1;
          }
        }
        if (state.focusedBinding) {
          if (state.focusedBinding.cardIndex === cardIndex) {
            state.focusedBinding = null;
          } else if (state.focusedBinding.cardIndex > cardIndex) {
            state.focusedBinding = {
              cardIndex: state.focusedBinding.cardIndex - 1,
              field: state.focusedBinding.field,
            };
          }
        }
        markDirty();
        render();
        return;
      }
      if (action === "card-up" && cardIndex > 0) {
        [page.cards[cardIndex - 1], page.cards[cardIndex]] = [page.cards[cardIndex], page.cards[cardIndex - 1]];
        if (state.selectedCardIndex === cardIndex) {
          state.selectedCardIndex = cardIndex - 1;
        } else if (state.selectedCardIndex === cardIndex - 1) {
          state.selectedCardIndex = cardIndex;
        }
        if (state.focusedBinding) {
          if (state.focusedBinding.cardIndex === cardIndex) {
            state.focusedBinding = { cardIndex: cardIndex - 1, field: state.focusedBinding.field };
          } else if (state.focusedBinding.cardIndex === cardIndex - 1) {
            state.focusedBinding = { cardIndex, field: state.focusedBinding.field };
          }
        }
        markDirty();
        render();
        return;
      }
      if (action === "card-down" && cardIndex < page.cards.length - 1) {
        [page.cards[cardIndex], page.cards[cardIndex + 1]] = [page.cards[cardIndex + 1], page.cards[cardIndex]];
        if (state.selectedCardIndex === cardIndex) {
          state.selectedCardIndex = cardIndex + 1;
        } else if (state.selectedCardIndex === cardIndex + 1) {
          state.selectedCardIndex = cardIndex;
        }
        if (state.focusedBinding) {
          if (state.focusedBinding.cardIndex === cardIndex) {
            state.focusedBinding = { cardIndex: cardIndex + 1, field: state.focusedBinding.field };
          } else if (state.focusedBinding.cardIndex === cardIndex + 1) {
            state.focusedBinding = { cardIndex, field: state.focusedBinding.field };
          }
        }
        markDirty();
        render();
        return;
      }
    }
    if (action === "save") {
      state.saving = true;
      state.avatarPackSaving = state.avatarPackDirty;
      setStatus(copy.saving, "muted");
      try {
        if (state.avatarPackDirty && state.avatarPackDetails && options.avatarPackApiUrl) {
          try {
            state.avatarPackDetails = await saveAvatarPackDetails(options.avatarPackApiUrl, state.avatarPackDetails);
          } catch (error) {
            throw new Error(`${copy.avatarMappingSaveError}: ${String(error)}`);
          }
          state.avatarPackDirty = false;
        }
        state.config = await saveConfig(options.sceneApiUrl, cloneConfig(state.config));
        state.dirty = false;
        state.saving = false;
        state.avatarPackSaving = false;
        syncSelection();
        setStatus(copy.statusSaved, "ok");
        window.setTimeout(() => reloadPreview(), 250);
      } catch (error) {
        state.saving = false;
        state.avatarPackSaving = false;
        setStatus(`${copy.saveError}: ${String(error)}`, "bad");
      }
      return;
    }
    if (action === "bind-entity") {
      const entityId = actionEl?.dataset.entityId || "";
      bindEntityToFocusedField(entityId);
    }
  });

  wrapper.addEventListener("input", (event) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    if (!target || !state.config) {
      if (target?.dataset.previewDisplay) {
        state.previewDisplayId = target.value || DEFAULT_PREVIEW_DISPLAY_ID;
        applyPreviewLayout();
      }
      return;
    }
    if (target.dataset.previewDisplay) {
      state.previewDisplayId = target.value || DEFAULT_PREVIEW_DISPLAY_ID;
      applyPreviewLayout();
      return;
    }
    if (target.dataset.avatarSemantic !== undefined) {
      const selectedPackId = readAvatarPackId(state.config);
      if (!state.avatarPackDetails || !selectedPackId || state.avatarPackDetails.packId !== selectedPackId) {
        return;
      }
      const selectedValue = target.value.trim();
      if (selectedValue) {
        state.avatarPackDetails.motionMap.semantic[target.dataset.avatarSemantic] = Number(selectedValue);
      } else {
        delete state.avatarPackDetails.motionMap.semantic[target.dataset.avatarSemantic];
      }
      state.avatarPackDirty = true;
      setStatus(copy.statusDirty, "muted");
      render();
      return;
    }
    if (target.dataset.pageField) {
      updatePageField(target.dataset.pageField as keyof ScenePageV1, target.value);
      render();
      return;
    }
    if (target.dataset.displayField) {
      updateDisplayField(target.dataset.displayField as DisplayFieldKey, target.value);
      render();
      return;
    }
    if (target.dataset.cardField && target.dataset.cardIndex) {
      state.selectedCardIndex = Number(target.dataset.cardIndex);
      updateCardField(Number(target.dataset.cardIndex), target.dataset.cardField, target.value);
      render();
      return;
    }
    if (target.hasAttribute("data-ha-search")) {
      state.entitySearch = target.value;
      render();
    }
  });

  wrapper.addEventListener("click", (event) => {
    const actionEl = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-action='select-avatar-pack']");
    if (!actionEl || !state.config) {
      return;
    }
    const packId = String(actionEl.dataset.packId || "").trim();
    ensureAvatarConfig(state.config).packId = packId || null;
    markDirty();
    void loadSelectedAvatarPackDetails(packId || null).finally(() => render());
    render();
  });

  wrapper.addEventListener("change", (event) => {
    const target = event.target as HTMLInputElement | null;
    if (!target?.dataset.avatarArchive) {
      return;
    }
    const archive = target.files?.[0] || null;
    state.pendingAvatarZip = archive;
    state.pendingAvatarZipName = archive?.name || "";
    state.avatarImportStatus = "";
    state.avatarImportTone = "muted";
    render();
  });

  wrapper.addEventListener("focusin", (event) => {
    const target = event.target as HTMLInputElement | null;
    if (!target?.dataset.bindingField) {
      return;
    }
    const cardIndex = Number(target.dataset.cardIndex || "-1");
    if (cardIndex < 0) {
      return;
    }
    state.selectedCardIndex = cardIndex;
    state.focusedBinding = {
      cardIndex,
      field: target.dataset.bindingField,
    };
  });

  try {
    state.config = await loadConfig(options.sceneApiUrl);
    if (options.avatarCatalogUrl) {
      try {
        state.avatarCatalog = await loadAvatarCatalog(options.avatarCatalogUrl);
      } catch {
        state.avatarCatalog = [];
      }
    }
    state.haEntities = buildHaEntityCatalog(getHomeAssistantHandle()?.states || null);
    state.selectedPageId = initialSelectedPageId(state.config);
    state.selectedCardIndex = 0;
    state.status = copy.statusSaved;
    state.statusTone = "ok";
    await loadSelectedAvatarPackDetails(readAvatarPackId(state.config));
    syncSelection();
  } catch (error) {
    state.status = `${copy.loadError}: ${String(error)}`;
    state.statusTone = "bad";
  }

  render();
}
