import { Disposer, asyncView, badge, button, form, h, replaceChildren, table, toast, type FieldOptions } from "@kiosk-scene/app-shell";
import type { ExtensionRuntime, MountedView } from "@kiosk-scene/core";
import { T, statusLabel, statusTone } from "../i18n.js";
import type { Contact, Integration, Settings } from "../types.js";
import { formatDateTime } from "../util.js";
import { both, emptyLine, formDialog, liveRefresh, pageHead, perform, read, smallButton, view } from "./common.js";

const INTEGRATION_TITLES: Record<string, string> = {
  home_assistant: "Home Assistant", telegram: "Telegram", alice: "Алиса", caldav: "Календарь CalDAV", llm: "Языковая модель", speak: "Голос через колонки", stt: "Распознавание речи",
};

interface Loaded {
  integrations: Integration[];
  secrets: Record<string, boolean>;
  settings: Settings;
  contacts: Contact[];
  linkRequests: Array<{ chat_id: string; name?: string; username?: string; text?: string }>;
  haEntities: HaEntity[];
  haEntitiesAvailable: boolean;
}

interface HaEntity { id: string; name: string; domain: string; state: string }

export function entityFields(name: string, label: string, saved: string, entities: HaEntity[], domains?: string[], required = false): FieldOptions[] {
  const choices = entities.filter((entity) => !domains || domains.includes(entity.domain));
  const options = [{ value: "", label: "Выбрать из Home Assistant" },
    ...choices.map((entity) => ({ value: entity.id, label: `${entity.name} (${entity.id})` }))];
  if (saved && !choices.some((entity) => entity.id === saved)) {
    options.push({ value: saved, label: `${saved} (сейчас не найдено)` });
  }
  return [
    { name: `${name}_pick`, label, type: "select", options, value: saved, wide: true },
    { name, label: `${label}: ID вручную`, value: saved, required: required && choices.length === 0,
      hint: "Можно указать ID вручную. Сохранённое значение не исчезнет, если HA временно недоступен.", wide: true },
  ];
}

export function entityValue(values: Record<string, string | boolean>, name: string, saved: string): string {
  const manual = String(values[name] ?? "").trim();
  return manual !== saved ? manual : String(values[`${name}_pick`] ?? "").trim() || manual;
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
      const filled = Object.fromEntries(Object.entries(secrets ?? {}).filter(([, v]) => v !== ""));
      if (settings && Object.keys(settings).length) {
        const result = await runtime.invokeAction<{ secrets_cleared?: string[] }>("domovoy.actions", "settings.update", settings);
        if (!result.ok) {
          handle.showErrors(result.error);
          return;
        }
        // A secret belongs to the address it was saved for: pointing the integration elsewhere forgets it.
        const forgotten = (result.data.secrets_cleared ?? []).filter((name) => !(name in filled));
        if (forgotten.length) {
          toast("Адрес изменён, поэтому сохранённый ключ сброшен — введите его заново.", "warn", 9000);
        }
      }
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
      const detail = result.data.detail as { username?: string } | undefined;
      toast(detail?.username ? `Связь есть: @${detail.username}` : "Связь есть", "good");
    } else {
      toast(result.data.error?.message ?? "Не получилось", "bad", 7000);
    }
    onDone();
  });
}

const openSections = new Set<string>();

function section(id: string, title: string, statusEl: HTMLElement | null, body: HTMLElement): HTMLElement {
  const el = h("details", { class: "ks-card dv-section", id: `dv-${id}` }, h("summary", null, h("h2", null, title), statusEl), body);
  el.open = openSections.has(id);
  el.addEventListener("toggle", () => {
    if (el.open) {
      openSections.add(id);
    } else {
      openSections.delete(id);
    }
  });
  return el;
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
        { name: "is_self", label: "Это я", type: "checkbox", value: contact?.is_self ?? false, hint: "Только этот контакт может давать команды в Telegram." },
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
    const options = data.contacts.map((c) => ({ value: String(c.id), label: c.name }));
    options.push({ value: "__new__", label: "Создать новый контакт…" });
    void formDialog(
      `Привязать ${label}`,
      [
        { name: "contact_id", label: "К контакту", type: "select", options, required: true, value: data.contacts[0]?.id ? String(data.contacts[0].id) : "__new__", wide: true },
        { name: "is_self", label: "Это я (владелец) — разрешить команды", type: "checkbox", value: false, hint: "Команды принимает только контакт с этой галочкой." },
      ],
      async (values) => {
        const isSelf = values.is_self === true;
        if (values.contact_id === "__new__") {
          const created = await runtime.invokeAction<{ contact: Contact }>("domovoy.actions", "contacts.create", {
            name: label, aliases: [], channels: { telegram: { chat_id: chatId } }, is_self: isSelf,
          });
          if (!created.ok) {
            return created;
          }
          // The create action does not consume the pending link request; linking the new contact does.
          const linked = await runtime.invokeAction("domovoy.actions", "contacts.link", {
            contact_id: created.data.contact.id, chat_id: chatId, is_self: isSelf,
          });
          if (linked.ok) {
            refresh();
          }
          return linked;
        }
        const result = await runtime.invokeAction("domovoy.actions", "contacts.link", {
          contact_id: Number(values.contact_id), chat_id: chatId, is_self: isSelf,
        });
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

function haYaml(secret: string, assistantName = "Домовой"): string {
  const name = assistantName.trim() || "Домовой";
  const phrase = name.toLowerCase();
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
    `# автоматизация: фраза в Assist / на Яндекс Станции через HA: «${phrase} …»`,
    "automation:",
    `  - alias: ${name} — голосовая команда`,
    "    trigger:",
    "      - platform: conversation",
    "        command:",
    `          - "${phrase} {text}"`,
    "    action:",
    "      - service: rest_command.domovoy_say",
    "        data:",
    '          text: "{{ trigger.slots.text }}"',
    `    # ответ озвучит сам ${name} через колонки из раздела «Голос через колонки»`,
  ].join("\n");
}

interface SecurityInfo {
  api_token: string;
  alice_path: string;
  assist_secret: string;
}

function securityControls(runtime: ExtensionRuntime, refresh: () => void) {
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
  return { secretRow, fetchSecurity, copy };
}

function securitySection(runtime: ExtensionRuntime, refresh: () => void, settings: Settings): HTMLElement {
  const { secretRow, fetchSecurity, copy } = securityControls(runtime, refresh);
  const name = settings.identity?.name || "Домовой";
  return h(
    "div",
    null,
    h("p", { class: "ks-muted" }, "Из панели Home Assistant доступ уже открыт. Эти ключи нужны только для внешних клиентов: они не хранятся на странице, пока вы их не запросите."),
    secretRow("API-токен (Bearer)", (i) => i.api_token, "api_token"),
    secretRow("Секрет для Home Assistant (Assist)", (i) => i.assist_secret, "assist_secret"),
    h("h3", null, `Голос через Home Assistant (фраза «${name.toLowerCase()} …»)`),
    h("p", { class: "ks-muted" }, "Если Home Assistant работает не на этом же устройстве, замените 127.0.0.1 на адрес, по которому он видит аддон."),
    h("pre", { class: "dv-code" }, haYaml(SECRET_PLACEHOLDER, name)),
    smallButton("Скопировать YAML с секретом", async () => { const info = await fetchSecurity(); if (info) { await copy(haYaml(info.assist_secret, name)); } }, "secondary"),
  );
}

function aliceSection(runtime: ExtensionRuntime, refresh: () => void, settings: Settings): HTMLElement {
  const { secretRow } = securityControls(runtime, refresh);
  const check = smallButton("Проверить настройку", async () => {
    const result = await runtime.invokeAction<{ ok: boolean; detail?: { reply?: string }; error?: { message: string } }>("domovoy.actions", "alice.test");
    if (!result.ok) {
      toast(result.error.message, "bad", 8000);
    } else if (result.data.ok) {
      toast("Настройка Алисы готова: навык отвечает локально. Публичный адрес и сам навык проверяются в Yandex Dialogs.", "good", 9000);
    } else {
      toast(result.data.error?.message ?? "Настройка не готова", "bad", 8000);
    }
    refresh();
  }, "secondary");
  return h(
    "div",
    null,
    h("p", { class: "ks-muted" }, "Алиса подключается как приватный навык Yandex Dialogs. Домовой не создаёт навык за вас: нужен публичный HTTPS-адрес, который видит Яндекс."),
    h("ol", { class: "ks-list" },
      h("li", null, "Создайте приватный навык в Yandex Dialogs."),
      h("li", null, "Вставьте полный webhook-адрес: ваш публичный https://-адрес + путь ниже."),
      h("li", null, "Добавьте свой Yandex user id в поле «Кому можно говорить» и сохраните."),
      h("li", null, "Нажмите «Проверить настройку»: она проверяет allow-list и локальный ответ навыка, но не доступность из интернета."),
    ),
    secretRow("Путь вебхука для навыка Алисы", (i) => i.alice_path, "alice_secret"),
    h("p", { class: "ks-muted" }, "Полный адрес: https://<ваш публичный адрес> + путь выше. Если аддон доступен только в LAN, Яндекс не сможет открыть навык — нужен туннель или reverse proxy с HTTPS."),
    h("h3", null, "Кому можно говорить"),
    h("p", { class: "ks-muted" }, "Укажите Yandex user id (не логин и не email), по одному на строку или через запятую. Пустой список отключает команды: это защита от чужих людей, получивших ссылку на навык."),
    settingsForm(runtime, [
      { name: "allowed_user_ids", label: "Yandex user id", type: "textarea", rows: 3, value: lines(settings.alice?.allowed_user_ids), placeholder: "1234567890", hint: "Посмотреть id можно в профиле пользователя в консоли Yandex Dialogs.", wide: true },
    ], (v) => ({ settings: { alice: { allowed_user_ids: splitLines(String(v.allowed_user_ids)) } } }), refresh),
    h("div", { class: "ks-row" }, check),
  );
}

export function mountIntegrations(host: HTMLElement, _params: Record<string, unknown>, runtime: ExtensionRuntime): MountedView {
  const disposer = new Disposer();
  const content = h("div");

  const handle = asyncView<Loaded>({
    host: content,
    load: async (signal) => {
      const [main, settings, contacts, entities] = await Promise.all([
        read<{ integrations: Integration[]; secrets: Record<string, boolean> }>(runtime, "api/integrations", undefined, signal),
        read<{ settings: Settings }>(runtime, "api/settings", undefined, signal),
        read<{ contacts: Contact[]; link_requests: Loaded["linkRequests"] }>(runtime, "api/contacts", undefined, signal),
        read<{ entities: HaEntity[] }>(runtime, "api/ha/entities", { limit: 1000 }, signal),
      ]);
      const paired = await both(Promise.resolve(main), Promise.resolve(settings));
      if (!paired.ok) {
        return paired;
      }
      if (!contacts.ok) {
        return contacts;
      }
      return { ok: true as const, data: { integrations: paired.data[0].integrations, secrets: paired.data[0].secrets, settings: paired.data[1].settings, contacts: contacts.data.contacts, linkRequests: contacts.data.link_requests ?? [],
        haEntities: entities.ok ? entities.data.entities : [], haEntitiesAvailable: entities.ok } };
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

      const ha = section("ha", "Home Assistant", status("home_assistant"), h("div", null, detail("home_assistant"),
        data.haEntitiesAvailable ? null : h("p", { class: "ks-muted" }, "Список сущностей недоступен. Можно указать ID вручную."), settingsForm(runtime, [
        { name: "url", label: "Адрес Home Assistant", type: "url", value: s.ha.url, placeholder: "http://homeassistant.local:8123", hint: "В аддоне обычно http://supervisor/core — оставьте пустым, если работаете внутри HA.", wide: true },
        secretField("ha_token", "Долгоживущий токен доступа", data.secrets.ha_token),
        ...entityFields("person_entity", "Ваш person", s.ha.person_entity, data.haEntities, ["person"]),
        { name: "allowed_services", label: "Разрешённые сервисы управления", type: "textarea", rows: 4, value: lines(s.ha.allowed_services), placeholder: "light.turn_on\nlight.turn_off\nscript.turn_on", hint: "Дополнительно к базовым (свет, розетки, вентиляторы, шторы, сцены). Замки, сигнализация, скрипты и Supervisor запрещены всегда.", wide: true },
      ], (v) => ({ settings: { ha: { url: String(v.url).trim(), person_entity: entityValue(v, "person_entity", s.ha.person_entity), allowed_services: splitLines(String(v.allowed_services)) } }, secrets: { ha_token: String(v.ha_token) } }), refresh)));

      const tgStatus = h("span", { class: "ks-row" },
        status("telegram"),
        data.linkRequests.length ? badge(`${data.linkRequests.length} запрос(а)`, "warn") : null,
      );
      const tgTestMessage = smallButton("Отправить тестовое сообщение", async () => {
        const result = await runtime.invokeAction<{ ok: boolean; detail?: { status?: string; last_error?: string }; error?: { message: string } }>(
          "domovoy.actions", "telegram.test_message",
        );
        if (!result.ok) {
          toast(result.error.message, "bad", 8000);
        } else if (result.data.ok) {
          toast("Тестовое сообщение отправлено в Telegram", "good");
        } else {
          toast(result.data.detail?.last_error ?? "Не удалось отправить: сообщение осталось в очереди", "bad", 9000);
        }
        refresh();
      }, "secondary");
      const tg = section("telegram", "Telegram", tgStatus, h("div", null,
        h("p", { class: "ks-muted" }, "Бот принимает команды только в личном чате владельца — контакта с галочкой «Это я». Группы и другие контакты могут только получать сообщения."),
        detail("telegram"),
        h("div", { class: "ks-row" }, tgTestMessage),
        settingsForm(runtime, [
          { name: "enabled", label: "Включён", type: "checkbox", value: s.telegram.enabled },
          secretField("telegram_token", "Токен бота (от @BotFather)", data.secrets.telegram_token),
          { name: "proxy", label: "HTTP-прокси для Telegram", type: "url", value: s.telegram.proxy ?? "", placeholder: "http://127.0.0.1:9080", hint: "Только для Telegram. Для Tor add-on включите http_tunnel: true и укажите http://127.0.0.1:9080. Пусто — прямое подключение.", wide: true },
        ], (v) => ({ settings: { telegram: { enabled: v.enabled === true, proxy: String(v.proxy).trim() } }, secrets: { telegram_token: String(v.telegram_token) } }), refresh),
        h("h3", null, "Контакты"),
        contactsSection(runtime, data, refresh),
      ));

      const cal = section("calendar", "Календарь", status("caldav"), h("div", null, detail("caldav"), settingsForm(runtime, [
        { name: "url", label: "CalDAV URL", type: "url", value: s.caldav.url, placeholder: "https://caldav.example.com/dav/user/calendar/", wide: true },
        { name: "username", label: "Логин", value: s.caldav.username },
        secretField("caldav_password", "Пароль / пароль приложения", data.secrets.caldav_password),
        { name: "default", label: "Куда добавлять по умолчанию", type: "select", options: [{ value: "local", label: "Локальный календарь" }, { value: "caldav", label: "CalDAV" }], value: s.calendar.default },
        { name: "ha_calendar_pick", label: "Добавить календарь HA", type: "select", value: "", options: [{ value: "", label: "Выбрать из Home Assistant" },
          ...data.haEntities.filter((entity) => entity.domain === "calendar").map((entity) => ({ value: entity.id, label: `${entity.name} (${entity.id})` }))], wide: true },
        { name: "ha_calendars", label: "Календари из Home Assistant", type: "textarea", rows: 2, value: lines(s.calendar.ha_calendars), placeholder: "calendar.family", hint: "По одному на строку. События из них видны; добавлять можно, менять и удалять — нет.", wide: true },
      ], (v) => ({ settings: { caldav: { url: String(v.url).trim(), username: String(v.username).trim() }, calendar: { default: v.default,
        ha_calendars: [...new Set([...splitLines(String(v.ha_calendars)), String(v.ha_calendar_pick || "").trim()].filter(Boolean))] } },
        secrets: { caldav_password: String(v.caldav_password) } }), refresh)));

      const llmUsage = data.integrations.find((item) => item.name === "llm")?.usage;
      const llm = section("llm", "Языковая модель (необязательно)", status("llm"), h("div", null, detail("llm"),
        h("p", { class: "ks-muted" }, "Подойдёт любой OpenAI-совместимый сервер: локальный (Ollama, llama.cpp, LM Studio) или облачный. Без неё Домовой работает по правилам — быстро и без нагрузки на процессор. Модель ничего не решает сама: её предложения проходят проверку и попадают в «Проверку»."),
        h("p", { class: "ks-muted" }, "Модель эмбеддингов делает поиск смысловым и включает быстрый роутер личных фактов: «у меня день рождения…», «что я люблю» разбираются за ~0,3 с, без генерации. Языковая модель нужна только для длинного хвоста."),
        h("p", { class: "ks-muted" }, "Для облачного API оставьте адрес эмбеддингов локальным (Ollama): тогда семантика не тратит облачные токены. Компактный режим не отправляет полную JSON-схему, а лимит останавливает запросы при исчерпании бюджета."),
        llmUsage ? h("p", { class: "ks-muted" }, `Токенов в этом месяце: ${llmUsage.used.toLocaleString("ru-RU")}${llmUsage.budget ? ` из ${llmUsage.budget.toLocaleString("ru-RU")}` : " (без лимита)"}.`) : null,
        settingsForm(runtime, [
          { name: "enabled", label: "Включена", type: "checkbox", value: s.ai.enabled },
          { name: "base_url", label: "Адрес API (чат)", type: "url", value: s.ai.base_url, placeholder: "https://api.openai.com/v1", wide: true },
          { name: "embedding_base_url", label: "Адрес эмбеддингов (локальный)", type: "url", value: s.ai.embedding_base_url, placeholder: "http://127.0.0.1:11434/v1", hint: "Пусто — использовать основной адрес. Для облачного чата укажите локальный Ollama, чтобы не платить за эмбеддинги.", wide: true },
          { name: "model", label: "Модель для команд", value: s.ai.model, placeholder: "gpt-4o-mini", hint: "Можно оставить пустым: тогда работают правила и семантический роутер, без генерации." },
          { name: "embedding_model", label: "Модель для смыслового поиска и роутера", value: s.ai.embedding_model, placeholder: "qwen3-embedding:0.6b", hint: "Пусто — поиск по словам и опечаткам, без семантики. Для Ollama подойдёт qwen3-embedding:0.6b." },
          { name: "max_tokens", label: "Максимум токенов на ответ", type: "number", min: 32, max: 4096, value: s.ai.max_tokens ?? 160, hint: "160 хватает на 1–2 команды; больше — только если модель обрезает JSON." },
          { name: "monthly_token_budget", label: "Лимит токенов в месяц (0 — без лимита)", type: "number", min: 0, max: 10000000, value: s.ai.monthly_token_budget ?? 0, wide: true },
          { name: "low_tokens", label: "Экономить токены: без полной JSON-схемы", type: "checkbox", value: s.ai.low_tokens !== false, hint: "Компактный JSON-режим; проверка полей всё равно остаётся на сервере.", wide: true },
          secretField("llm_api_key", "API-ключ (если нужен)", data.secrets.llm_api_key),
        ], (v) => ({ settings: { ai: {
          enabled: v.enabled === true, base_url: String(v.base_url).trim(), embedding_base_url: String(v.embedding_base_url).trim(),
          model: String(v.model).trim(), embedding_model: String(v.embedding_model).trim(),
          max_tokens: Number(v.max_tokens) || 160, monthly_token_budget: Number(v.monthly_token_budget) || 0,
          low_tokens: v.low_tokens === true,
        } }, secrets: { llm_api_key: String(v.llm_api_key) } }), refresh)));

      const speakers = section("speak", "Голос через колонки (Яндекс Станции)", status("speak"), h("div", null, detail("speak"),
        h("p", { class: "ks-muted" }, "Домовой говорит через колонки, подключённые к Home Assistant. Способ озвучки задаётся здесь, а не в коде."),
        collectionEditor(runtime, "speakers", s.speakers, [
          { header: "Колонка", render: (r) => String(r.name || r.entity_id) },
          { header: "Комната", render: (r) => String(r.room ?? "") || T.none },
          { header: "Способ", render: (r) => ({ yandex_station_text: "Яндекс Станция (текст)", tts_speak: "TTS (tts.speak)", custom: "свой сервис" } as Record<string, string>)[String(r.mode)] ?? String(r.mode ?? "Яндекс Станция (текст)") },
          { header: "", render: (r) => (r.default ? "по умолчанию" : "") },
        ], (row) => [
          { name: "name", label: "Название", value: row?.name ?? "", placeholder: "Станция на кухне" },
          ...entityFields("entity_id", "media_player", String(row?.entity_id ?? ""), data.haEntities, ["media_player"], true),
          { name: "room", label: "Комната", value: row?.room ?? "", placeholder: "кухня" },
          { name: "mode", label: "Способ озвучки", type: "select", options: [{ value: "yandex_station_text", label: "Яндекс Станция: media_player.play_media (text)" }, { value: "tts_speak", label: "tts.speak (нужна TTS-сущность)" }, { value: "custom", label: "Свой сервис" }], value: row?.mode ?? "yandex_station_text", wide: true },
          ...entityFields("tts_entity", "TTS-сущность (для tts.speak)", String(row?.tts_entity ?? ""), data.haEntities, ["tts"]),
          { name: "service", label: "Свой сервис", value: row?.service ?? "", placeholder: "script.say", hint: "domain.service; в данных используйте {text} и {entity_id}." },
          { name: "default", label: "По умолчанию, если неизвестно, где человек", type: "checkbox", value: row?.default === true, wide: true },
        ], (v, prev) => ({ ...(prev ?? {}), id: prev?.id ?? entityValue(v, "entity_id", String(prev?.entity_id ?? "")), name: String(v.name).trim(),
          entity_id: entityValue(v, "entity_id", String(prev?.entity_id ?? "")), room: String(v.room).trim(), mode: v.mode,
          tts_entity: entityValue(v, "tts_entity", String(prev?.tts_entity ?? "")), service: String(v.service).trim(), default: v.default === true }), "колонка", refresh),
      ));

      const rooms = section("rooms", "Где вы находитесь: комнаты и места", null, h("div", null,
        h("p", { class: "ks-muted" }, "Датчик присутствия или устройство, по которому Домовой понимает, что вы в комнате, — для напоминаний «когда зайду на кухню» и чтобы отвечать в нужную колонку."),
        h("h3", null, "Комнаты"),
        collectionEditor(runtime, "rooms", s.rooms, [{ header: "Комната", render: (r) => String(r.name || r.room) }, { header: "Датчик", render: (r) => `${r.entity_id ?? ""} = ${r.state ?? "on"}` }],
          (row) => [
            { name: "name", label: "Название", required: true, value: row?.name ?? row?.room ?? "", placeholder: "кухня" },
            ...entityFields("entity_id", "Сущность", String(row?.entity_id ?? ""), data.haEntities,
              ["binary_sensor", "sensor", "device_tracker", "person", "zone", "input_boolean"], true),
            { name: "state", label: "Активна, когда состояние", value: row?.state ?? "on" },
          ], (v, prev) => ({ ...(prev ?? {}), name: String(v.name).trim(), entity_id: entityValue(v, "entity_id", String(prev?.entity_id ?? "")),
            state: String(v.state).trim() || "on" }), "комната", refresh),
        h("h3", null, "Другие места и устройства"),
        collectionEditor(runtime, "places", s.places, [{ header: "Место", render: (r) => String(r.name) }, { header: "Сущность", render: (r) => `${r.entity_id ?? ""} = ${r.state ?? "on"}` }],
          (row) => [
            { name: "name", label: "Название", required: true, value: row?.name ?? "", placeholder: "мастерская" },
            ...entityFields("entity_id", "Сущность", String(row?.entity_id ?? ""), data.haEntities, undefined, true),
            { name: "state", label: "Активно, когда состояние", value: row?.state ?? "on" },
          ], (v, prev) => ({ ...(prev ?? {}), name: String(v.name).trim(), entity_id: entityValue(v, "entity_id", String(prev?.entity_id ?? "")),
            state: String(v.state).trim() || "on" }), "место", refresh),
      ));

      const stt = section("stt", "Распознавание речи (микрофон киоска)", status("stt"), h("div", null, detail("stt"),
        h("p", { class: "ks-muted" }, "Нужно только если вы говорите в микрофон киоска. Голос через Алису/Home Assistant приходит уже текстом. Подойдёт любой сервер с OpenAI-совместимым /audio/transcriptions (например, локальный faster-whisper)."),
        settingsForm(runtime, [
          { name: "base_url", label: "Адрес STT-сервера", type: "url", value: s.voice.stt.base_url, placeholder: "http://127.0.0.1:8000/v1", wide: true },
          { name: "model", label: "Модель", value: s.voice.stt.model, placeholder: "small" },
          { name: "language", label: "Язык", value: s.voice.stt.language },
          { name: "max_seconds", label: "Максимум секунд записи", type: "number", min: 3, max: 60, value: s.voice.stt.max_seconds },
        ], (v) => ({ settings: { voice: { stt: { base_url: String(v.base_url).trim(), model: String(v.model).trim(), language: String(v.language).trim() || "ru", max_seconds: Number(v.max_seconds) || 15 } } } }), refresh)));

      const alice = section("alice", "Алиса", status("alice"), aliceSection(runtime, refresh, s));
      const security = section("security", "Доступ и Home Assistant", null, securitySection(runtime, refresh, s));

      return h("div", { class: "dv-stack" }, statusGrid, ha, tg, alice, cal, speakers, rooms, llm, stt, security);
    },
  });

  replaceChildren(host, h("div", { class: "ks-page" }, pageHead(T.integrations), content));
  liveRefresh(runtime, disposer, ["integrations", "contacts", "settings"], () => handle.refresh(), 800, host);
  disposer.add(() => handle.dispose());
  return view(disposer);
}
