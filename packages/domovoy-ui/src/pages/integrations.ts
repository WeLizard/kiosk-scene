import { Disposer, asyncView, badge, button, form, h, replaceChildren, table, toast, type FieldOptions } from "@kiosk-scene/app-shell";
import type { ExtensionRuntime, MountedView } from "@kiosk-scene/core";
import { T, statusLabel, statusTone } from "../i18n.js";
import type { Contact, Integration, Settings } from "../types.js";
import { formatDateTime } from "../util.js";
import { both, emptyLine, formDialog, liveRefresh, pageHead, perform, read, smallButton, view } from "./common.js";

const INTEGRATION_TITLES: Record<string, string> = {
  home_assistant: "Home Assistant", telegram: "Telegram", caldav: "Календарь CalDAV", llm: "Языковая модель", speak: "Голос через колонки", stt: "Распознавание речи",
};

interface Loaded {
  integrations: Integration[];
  secrets: Record<string, boolean>;
  settings: Settings;
  contacts: Contact[];
  linkRequests: Array<{ chat_id: string; name?: string; username?: string; text?: string }>;
}

const lines = (value: unknown): string => (Array.isArray(value) ? value.join("\n") : "");
const splitLines = (text: string): string[] => text.split(/[\n,]/).map((s) => s.trim()).filter(Boolean);

/** A form bound to a slice of settings and a set of write-only secrets. Empty secret field = leave as is. */
function settingsForm(
  runtime: ExtensionRuntime,
  fields: FieldOptions[],
  build: (values: Record<string, string | boolean>) => { settings?: Record<string, unknown>; secrets?: Record<string, string> },
  onSaved: () => void,
): HTMLFormElement {
  const f = form(fields, {
    onSubmit: async (values, handle) => {
      const { settings, secrets } = build(values);
      if (settings && Object.keys(settings).length) {
        const result = await runtime.invokeAction("domovoy.actions", "settings.update", settings);
        if (!result.ok) {
          handle.showErrors(result.error);
          return;
        }
      }
      const filled = Object.fromEntries(Object.entries(secrets ?? {}).filter(([, v]) => v !== ""));
      if (Object.keys(filled).length) {
        const result = await runtime.invokeAction("domovoy.actions", "secrets.set", filled);
        if (!result.ok) {
          handle.showErrors(result.error);
          return;
        }
      }
      toast("Сохранено", "good");
      onSaved();
    },
  });
  return f.el;
}

const secretField = (name: string, label: string, present: boolean): FieldOptions => ({
  name, label, type: "password", value: "", autocomplete: "new-password", placeholder: present ? "сохранён — введите, чтобы заменить" : "не задан", wide: true,
});

function testButton(runtime: ExtensionRuntime, name: string, onDone: () => void): HTMLElement {
  return smallButton("Проверить", async () => {
    const result = await runtime.invokeAction<{ ok: boolean; detail?: unknown; error?: { message: string } }>("domovoy.actions", "integration.test", { name });
    if (!result.ok) {
      toast(result.error.message, "bad", 7000);
    } else if (result.data.ok) {
      toast("Связь есть", "good");
    } else {
      toast(result.data.error?.message ?? "Не получилось", "bad", 7000);
    }
    onDone();
  });
}

function section(id: string, title: string, statusEl: HTMLElement | null, body: HTMLElement): HTMLElement {
  return h("details", { class: "ks-card dv-section", id: `dv-${id}` }, h("summary", null, h("h2", null, title), statusEl), body);
}

/** A list stored as one settings key (speakers, rooms, places): table + add/edit/delete dialogs. */
function collectionEditor(
  runtime: ExtensionRuntime,
  key: "speakers" | "rooms" | "places",
  rows: Array<Record<string, any>>,
  columns: Array<{ header: string; render(row: Record<string, any>): string }>,
  fieldsFor: (row: Record<string, any> | null) => FieldOptions[],
  toRow: (values: Record<string, string | boolean>, previous: Record<string, any> | null) => Record<string, any>,
  title: string,
  refresh: () => void,
): HTMLElement {
  const save = async (next: Array<Record<string, any>>) => {
    const result = await runtime.invokeAction("domovoy.actions", "settings.update", { [key]: next });
    if (!result.ok) {
      toast(result.error.message, "bad", 7000);
    } else {
      refresh();
    }
    return result;
  };
  const edit = (index: number): void => {
    const row = index >= 0 ? rows[index] : null;
    void formDialog(row ? `Изменить: ${title}` : `Добавить: ${title}`, fieldsFor(row), async (values) => {
      const next = rows.slice();
      const built = toRow(values, row);
      if (index >= 0) {
        next[index] = built;
      } else {
        next.push(built);
      }
      return save(next);
    });
  };
  return h(
    "div",
    null,
    table<Record<string, any>>(
      [
        ...columns.map((c, i) => ({ key: `c${i}`, header: c.header, render: (row: Record<string, any>) => c.render(row) })),
        { key: "a", header: "", render: (row: Record<string, any>) => h("div", { class: "ks-row" }, smallButton(T.edit, () => edit(rows.indexOf(row))), smallButton(T.delete, async () => { void (await save(rows.filter((r) => r !== row))); }, "danger")) },
      ],
      rows,
      emptyLine("Пока не задано."),
    ),
    h("div", { class: "ks-row" }, button(T.add, { onClick: () => edit(-1) })),
  );
}

function contactsSection(runtime: ExtensionRuntime, data: Loaded, refresh: () => void): HTMLElement {
  const edit = (contact: Contact | null): void => {
    void formDialog(
      contact ? `Изменить: ${contact.name}` : "Новый контакт",
      [
        { name: "name", label: "Имя", required: true, value: contact?.name ?? "", wide: true },
        { name: "aliases", label: "Как ещё называют", value: (contact?.aliases ?? []).join(", "), hint: "Через запятую: «жена, Маша»", wide: true },
        { name: "chat_id", label: "Telegram chat_id", value: contact?.channels.telegram?.chat_id ?? "", hint: "Проще: пусть человек напишет боту, потом нажмите «Привязать» ниже.", wide: true },
        { name: "is_self", label: "Это я", type: "checkbox", value: contact?.is_self ?? false },
      ],
      async (values) => {
        const channels = { ...(contact?.channels ?? {}) } as Record<string, unknown>;
        if (String(values.chat_id).trim()) {
          channels.telegram = { chat_id: String(values.chat_id).trim() };
        } else {
          delete channels.telegram;
        }
        const body = { name: String(values.name).trim(), aliases: splitLines(String(values.aliases)), channels, is_self: values.is_self === true };
        const result = contact ? await runtime.invokeAction("domovoy.actions", "contacts.update", { id: contact.id, ...body }) : await runtime.invokeAction("domovoy.actions", "contacts.create", body);
        if (result.ok) {
          refresh();
        }
        return result;
      },
    );
  };
  const link = (chatId: string, label: string): void => {
    void formDialog(
      `Привязать ${label}`,
      [{ name: "contact_id", label: "К контакту", type: "select", options: data.contacts.map((c) => ({ value: String(c.id), label: c.name })), required: true }],
      async (values) => {
        const result = await runtime.invokeAction("domovoy.actions", "contacts.link", { contact_id: Number(values.contact_id), chat_id: chatId });
        if (result.ok) {
          refresh();
        }
        return result;
      },
    );
  };
  return h(
    "div",
    null,
    table<Contact>(
      [
        { key: "name", header: "Имя", render: (c) => h("span", null, c.name, c.is_self ? [" ", badge("это я", "info")] : null) },
        { key: "al", header: "Также", render: (c) => c.aliases.join(", ") || T.none },
        { key: "tg", header: "Telegram", render: (c) => (c.channels.telegram?.chat_id ? badge("привязан", "good") : badge("не привязан", "warn")) },
        { key: "a", header: "", render: (c) => h("div", { class: "ks-row" }, smallButton(T.edit, () => edit(c)), smallButton(T.delete, async () => { if ((await perform(runtime, "contacts.delete", { id: c.id }, { confirm: { title: "Удалить контакт", message: c.name } })).ok) { refresh(); } }, "danger")) },
      ],
      data.contacts,
      emptyLine("Контактов нет. Добавьте себя и тех, кому Домовой будет писать."),
    ),
    data.linkRequests.length
      ? h("div", { class: "dv-link-requests" },
          h("h3", null, "Кто-то написал боту"),
          h("ul", { class: "ks-list" }, data.linkRequests.map((r) => h("li", null, h("div", { class: "ks-grow" }, `${r.name || r.username || "Без имени"} · chat_id ${r.chat_id}`, r.text ? h("div", { class: "ks-sub" }, `«${r.text}»`) : null), smallButton("Привязать…", () => link(r.chat_id, r.name || r.username || r.chat_id), "primary")))),
        )
      : null,
    h("div", { class: "ks-row" }, button("Добавить контакт", { onClick: () => edit(null) })),
  );
}

/** Where Home Assistant's own process reaches the add-on (nginx publishes this port on the host network). */
const HA_LOCAL_BASE = "http://127.0.0.1:48123/domovoy-api/";
const SECRET_PLACEHOLDER = "<секрет Assist — нажмите «Показать»>";

function haYaml(secret: string): string {
  return [
    "# configuration.yaml — один раз",
    "rest_command:",
    "  domovoy_say:",
    `    url: "${HA_LOCAL_BASE}frontends/assist"`,
    "    method: POST",
    "    headers:",
    `      X-Domovoy-Secret: "${secret}"`,
    "      Content-Type: application/json",
    '    payload: \'{"text": {{ text | tojson }}, "room": {{ room | default("") | tojson }}, "speak": true}\'',
    "",
    "# автоматизация: фраза в Assist / на Яндекс Станции через HA: «домовой …»",
    "automation:",
    "  - alias: Домовой — голосовая команда",
    "    trigger:",
    "      - platform: conversation",
    "        command:",
    '          - "домовой {text}"',
    "    action:",
    "      - service: rest_command.domovoy_say",
    "        data:",
    '          text: "{{ trigger.slots.text }}"',
    "    # ответ озвучит сам Домовой через колонки из раздела «Голос через колонки»",
  ].join("\n");
}

interface SecurityInfo {
  api_token: string;
  alice_path: string;
  assist_secret: string;
}

/**
 * Keys for outside clients. They are fetched only when the person asks to see or copy one — never on page load —
 * so they are not in the page (or its memory) while nobody needs them.
 */
function securitySection(runtime: ExtensionRuntime, refresh: () => void): HTMLElement {
  const fetchSecurity = async (): Promise<SecurityInfo | null> => {
    const result = await read<SecurityInfo>(runtime, "api/security");
    if (!result.ok) {
      toast(result.error.message, "bad", 7000);
      return null;
    }
    return result.data;
  };
  const copy = async (value: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(value);
      toast("Скопировано", "good");
    } catch {
      toast("Не удалось скопировать — нажмите «Показать» и выделите вручную", "warn", 7000);
    }
  };
  const secretRow = (label: string, pick: (info: SecurityInfo) => string, rotateName: string): HTMLElement => {
    const code = h("code", { class: "dv-secret" }, "•".repeat(12));
    let shown = false;
    return h("div", { class: "dv-secret-row" },
      h("strong", null, label),
      code,
      h("div", { class: "ks-row" },
        smallButton("Показать", async () => {
          if (shown) {
            shown = false;
            code.textContent = "•".repeat(12);
            return;
          }
          const info = await fetchSecurity();
          if (info) {
            shown = true;
            code.textContent = pick(info);
          }
        }, "ghost"),
        smallButton("Скопировать", async () => { const info = await fetchSecurity(); if (info) { await copy(pick(info)); } }, "ghost"),
        smallButton("Сменить", async () => { if ((await perform(runtime, "security.rotate", { name: rotateName }, { confirm: { title: "Сменить секрет", message: "Старый перестанет работать: его нужно будет заменить везде, где он указан.", label: "Сменить" } })).ok) { refresh(); } }, "danger"),
      ),
    );
  };
  return h(
    "div",
    null,
    h("p", { class: "ks-muted" }, "Из панели Home Assistant доступ уже открыт. Эти ключи нужны только для внешних клиентов: они не хранятся на странице, пока вы их не запросите."),
    secretRow("API-токен (Bearer)", (i) => i.api_token, "api_token"),
    secretRow("Секрет для Home Assistant (Assist)", (i) => i.assist_secret, "assist_secret"),
    secretRow("Путь вебхука для навыка Алисы (добавьте ваш публичный https://-адрес перед ним)", (i) => i.alice_path, "alice_secret"),
    h("h3", null, "Голос через Home Assistant (фраза «домовой …»)"),
    h("p", { class: "ks-muted" }, "Если Home Assistant работает не на этом же устройстве, замените 127.0.0.1 на адрес, по которому он видит аддон."),
    h("pre", { class: "dv-code" }, haYaml(SECRET_PLACEHOLDER)),
    smallButton("Скопировать YAML с секретом", async () => { const info = await fetchSecurity(); if (info) { await copy(haYaml(info.assist_secret)); } }, "secondary"),
  );
}

export function mountIntegrations(host: HTMLElement, _params: Record<string, unknown>, runtime: ExtensionRuntime): MountedView {
  const disposer = new Disposer();
  const content = h("div");

  const handle = asyncView<Loaded>({
    host: content,
    load: async (signal) => {
      const [main, settings, contacts] = await Promise.all([
        read<{ integrations: Integration[]; secrets: Record<string, boolean> }>(runtime, "api/integrations", undefined, signal),
        read<{ settings: Settings }>(runtime, "api/settings", undefined, signal),
        read<{ contacts: Contact[]; link_requests: Loaded["linkRequests"] }>(runtime, "api/contacts", undefined, signal),
      ]);
      const paired = await both(Promise.resolve(main), Promise.resolve(settings));
      if (!paired.ok) {
        return paired;
      }
      if (!contacts.ok) {
        return contacts;
      }
      return { ok: true as const, data: { integrations: paired.data[0].integrations, secrets: paired.data[0].secrets, settings: paired.data[1].settings, contacts: contacts.data.contacts, linkRequests: contacts.data.link_requests ?? [] } };
    },
    render: (data, refresh) => {
      const s = data.settings;
      const status = (name: string): HTMLElement | null => {
        const i = data.integrations.find((x) => x.name === name);
        return i ? badge(statusLabel(i.status), statusTone(i.status)) : null;
      };
      const detail = (name: string): HTMLElement | null => {
        const i = data.integrations.find((x) => x.name === name);
        if (!i) {
          return null;
        }
        return h("p", { class: "ks-muted" }, [i.detail, i.last_ok ? `Последний успех: ${formatDateTime(i.last_ok)}.` : "", i.last_error ? `Последняя ошибка: ${i.last_error}` : ""].filter(Boolean).join(" "), " ", testButton(runtime, name, refresh));
      };

      const statusGrid = h("div", { class: "ks-grid dv-status-grid" }, data.integrations.map((i) =>
        h("div", { class: "ks-card dv-status" }, h("strong", null, INTEGRATION_TITLES[i.name] ?? i.name), badge(statusLabel(i.status), statusTone(i.status)), h("small", { class: "ks-muted" }, i.detail && i.detail.toLowerCase() !== statusLabel(i.status).toLowerCase() ? i.detail : "")),
      ));

      const ha = section("ha", "Home Assistant", status("home_assistant"), h("div", null, detail("home_assistant"), settingsForm(runtime, [
        { name: "url", label: "Адрес Home Assistant", type: "url", value: s.ha.url, placeholder: "http://homeassistant.local:8123", hint: "В аддоне обычно http://supervisor/core — оставьте пустым, если работаете внутри HA.", wide: true },
        secretField("ha_token", "Долгоживущий токен доступа", data.secrets.ha_token),
        { name: "person_entity", label: "Ваш person", value: s.ha.person_entity, placeholder: "person.ivan", hint: "Для напоминаний «когда приду домой».", wide: true },
        { name: "allowed_services", label: "Разрешённые сервисы управления", type: "textarea", rows: 4, value: lines(s.ha.allowed_services), placeholder: "light.turn_on\nlight.turn_off\nscript.turn_on", hint: "Только эти сервисы Домовой может вызывать. Замки, сигнализация и оболочка запрещены всегда.", wide: true },
      ], (v) => ({ settings: { ha: { url: String(v.url).trim(), person_entity: String(v.person_entity).trim(), allowed_services: splitLines(String(v.allowed_services)) } }, secrets: { ha_token: String(v.ha_token) } }), refresh)));

      const tg = section("telegram", "Telegram", status("telegram"), h("div", null, detail("telegram"), settingsForm(runtime, [
        { name: "enabled", label: "Включён", type: "checkbox", value: s.telegram.enabled },
        secretField("telegram_token", "Токен бота (от @BotFather)", data.secrets.telegram_token),
      ], (v) => ({ settings: { telegram: { enabled: v.enabled === true } }, secrets: { telegram_token: String(v.telegram_token) } }), refresh), h("h3", null, "Контакты"), contactsSection(runtime, data, refresh)));

      const cal = section("calendar", "Календарь", status("caldav"), h("div", null, detail("caldav"), settingsForm(runtime, [
        { name: "url", label: "CalDAV URL", type: "url", value: s.caldav.url, placeholder: "https://caldav.example.com/dav/user/calendar/", wide: true },
        { name: "username", label: "Логин", value: s.caldav.username },
        secretField("caldav_password", "Пароль / пароль приложения", data.secrets.caldav_password),
        { name: "default", label: "Куда добавлять по умолчанию", type: "select", options: [{ value: "local", label: "Локальный календарь" }, { value: "caldav", label: "CalDAV" }], value: s.calendar.default },
        { name: "ha_calendars", label: "Календари из Home Assistant", type: "textarea", rows: 2, value: lines(s.calendar.ha_calendars), placeholder: "calendar.family", hint: "По одному на строку. События из них видны; добавлять можно, менять и удалять — нет.", wide: true },
      ], (v) => ({ settings: { caldav: { url: String(v.url).trim(), username: String(v.username).trim() }, calendar: { default: v.default, ha_calendars: splitLines(String(v.ha_calendars)) } }, secrets: { caldav_password: String(v.caldav_password) } }), refresh)));

      const llm = section("llm", "Языковая модель (необязательно)", status("llm"), h("div", null, detail("llm"),
        h("p", { class: "ks-muted" }, "Подойдёт любой OpenAI-совместимый сервер: локальный (Ollama, llama.cpp, LM Studio) или облачный. Без неё Домовой работает по правилам — быстро и без нагрузки на процессор. Модель ничего не решает сама: её предложения проходят проверку и попадают в «Проверку»."),
        settingsForm(runtime, [
          { name: "enabled", label: "Включена", type: "checkbox", value: s.ai.enabled },
          { name: "base_url", label: "Адрес API", type: "url", value: s.ai.base_url, placeholder: "http://192.168.1.20:11434/v1", wide: true },
          { name: "model", label: "Модель для команд", value: s.ai.model, placeholder: "qwen2.5:3b-instruct" },
          { name: "embedding_model", label: "Модель для смыслового поиска", value: s.ai.embedding_model, placeholder: "nomic-embed-text", hint: "Пусто — поиск по словам и опечаткам, без модели." },
          secretField("llm_api_key", "API-ключ (если нужен)", data.secrets.llm_api_key),
        ], (v) => ({ settings: { ai: { enabled: v.enabled === true, base_url: String(v.base_url).trim(), model: String(v.model).trim(), embedding_model: String(v.embedding_model).trim() } }, secrets: { llm_api_key: String(v.llm_api_key) } }), refresh)));

      const speakers = section("speak", "Голос через колонки (Яндекс Станции)", status("speak"), h("div", null, detail("speak"),
        h("p", { class: "ks-muted" }, "Домовой говорит через колонки, подключённые к Home Assistant. Способ озвучки задаётся здесь, а не в коде."),
        collectionEditor(runtime, "speakers", s.speakers, [
          { header: "Колонка", render: (r) => String(r.name || r.entity_id) },
          { header: "Комната", render: (r) => String(r.room ?? "") || T.none },
          { header: "Способ", render: (r) => ({ yandex_station_text: "Яндекс Станция (текст)", tts_speak: "TTS (tts.speak)", custom: "свой сервис" } as Record<string, string>)[String(r.mode)] ?? String(r.mode ?? "Яндекс Станция (текст)") },
          { header: "", render: (r) => (r.default ? "по умолчанию" : "") },
        ], (row) => [
          { name: "name", label: "Название", value: row?.name ?? "", placeholder: "Станция на кухне" },
          { name: "entity_id", label: "media_player", required: true, value: row?.entity_id ?? "", placeholder: "media_player.yandex_station_kitchen", wide: true },
          { name: "room", label: "Комната", value: row?.room ?? "", placeholder: "кухня" },
          { name: "mode", label: "Способ озвучки", type: "select", options: [{ value: "yandex_station_text", label: "Яндекс Станция: media_player.play_media (text)" }, { value: "tts_speak", label: "tts.speak (нужна TTS-сущность)" }, { value: "custom", label: "Свой сервис" }], value: row?.mode ?? "yandex_station_text", wide: true },
          { name: "tts_entity", label: "TTS-сущность", value: row?.tts_entity ?? "", placeholder: "tts.yandex_station", hint: "Только для tts.speak." },
          { name: "service", label: "Свой сервис", value: row?.service ?? "", placeholder: "script.say", hint: "domain.service; в данных используйте {text} и {entity_id}." },
          { name: "default", label: "По умолчанию, если неизвестно, где человек", type: "checkbox", value: row?.default === true, wide: true },
        ], (v, prev) => ({ ...(prev ?? {}), id: prev?.id ?? String(v.entity_id), name: String(v.name).trim(), entity_id: String(v.entity_id).trim(), room: String(v.room).trim(), mode: v.mode, tts_entity: String(v.tts_entity).trim(), service: String(v.service).trim(), default: v.default === true }), "колонка", refresh),
      ));

      const rooms = section("rooms", "Где вы находитесь: комнаты и места", null, h("div", null,
        h("p", { class: "ks-muted" }, "Датчик присутствия или устройство, по которому Домовой понимает, что вы в комнате, — для напоминаний «когда зайду на кухню» и чтобы отвечать в нужную колонку."),
        h("h3", null, "Комнаты"),
        collectionEditor(runtime, "rooms", s.rooms, [{ header: "Комната", render: (r) => String(r.name || r.room) }, { header: "Датчик", render: (r) => `${r.entity_id ?? ""} = ${r.state ?? "on"}` }],
          (row) => [
            { name: "name", label: "Название", required: true, value: row?.name ?? row?.room ?? "", placeholder: "кухня" },
            { name: "entity_id", label: "Сущность", required: true, value: row?.entity_id ?? "", placeholder: "binary_sensor.kitchen_presence", wide: true },
            { name: "state", label: "Активна, когда состояние", value: row?.state ?? "on" },
          ], (v, prev) => ({ ...(prev ?? {}), name: String(v.name).trim(), entity_id: String(v.entity_id).trim(), state: String(v.state).trim() || "on" }), "комната", refresh),
        h("h3", null, "Другие места и устройства"),
        collectionEditor(runtime, "places", s.places, [{ header: "Место", render: (r) => String(r.name) }, { header: "Сущность", render: (r) => `${r.entity_id ?? ""} = ${r.state ?? "on"}` }],
          (row) => [
            { name: "name", label: "Название", required: true, value: row?.name ?? "", placeholder: "мастерская" },
            { name: "entity_id", label: "Сущность", required: true, value: row?.entity_id ?? "", placeholder: "sensor.printer_status", wide: true },
            { name: "state", label: "Активно, когда состояние", value: row?.state ?? "on" },
          ], (v, prev) => ({ ...(prev ?? {}), name: String(v.name).trim(), entity_id: String(v.entity_id).trim(), state: String(v.state).trim() || "on" }), "место", refresh),
      ));

      const stt = section("stt", "Распознавание речи (микрофон киоска)", status("stt"), h("div", null, detail("stt"),
        h("p", { class: "ks-muted" }, "Нужно только если вы говорите в микрофон киоска. Голос через Алису/Home Assistant приходит уже текстом. Подойдёт любой сервер с OpenAI-совместимым /audio/transcriptions (например, локальный faster-whisper)."),
        settingsForm(runtime, [
          { name: "base_url", label: "Адрес STT-сервера", type: "url", value: s.voice.stt.base_url, placeholder: "http://127.0.0.1:8000/v1", wide: true },
          { name: "model", label: "Модель", value: s.voice.stt.model, placeholder: "small" },
          { name: "language", label: "Язык", value: s.voice.stt.language },
          { name: "max_seconds", label: "Максимум секунд записи", type: "number", min: 3, max: 60, value: s.voice.stt.max_seconds },
        ], (v) => ({ settings: { voice: { stt: { base_url: String(v.base_url).trim(), model: String(v.model).trim(), language: String(v.language).trim() || "ru", max_seconds: Number(v.max_seconds) || 15 } } } }), refresh)));

      const security = section("security", "Доступ, Алиса и Home Assistant", null, securitySection(runtime, refresh));

      return h("div", { class: "dv-stack" }, statusGrid, ha, tg, cal, speakers, rooms, llm, stt, security);
    },
  });

  replaceChildren(host, h("div", { class: "ks-page" }, pageHead(T.integrations), content));
  liveRefresh(runtime, disposer, ["integrations", "contacts", "settings"], () => handle.refresh(), 800, host);
  disposer.add(() => handle.dispose());
  return view(disposer);
}
