import { Disposer, asyncView, badge, button, confirmDialog, form, h, replaceChildren, toast, type FieldOptions } from "@kiosk-scene/app-shell";
import type { ExtensionRuntime, MountedView } from "@kiosk-scene/core";
import { T } from "../i18n.js";
import type { Settings } from "../types.js";
import { setServerTimezone } from "../util.js";
import { emptyLine, liveRefresh, pageHead, perform, read, view } from "./common.js";

interface Loaded {
  settings: Settings;
  voice: { enabled: boolean; stt_configured: boolean; trigger_words: string[]; window_s: number; busy: boolean };
  state: { version: string; timezone: string; counts: Record<string, number> };
  backups: Array<{ name: string; bytes: number }>;
}

const splitList = (text: string): string[] => text.split(/[\n,]/).map((s) => s.trim()).filter(Boolean);

function timezoneOptions(current: string): Array<{ value: string; label: string }> {
  let zones: string[] = [];
  try {
    zones = (Intl as unknown as { supportedValuesOf?: (key: string) => string[] }).supportedValuesOf?.("timeZone") ?? [];
  } catch {
    zones = [];
  }
  if (!zones.length) {
    zones = ["Europe/Moscow", "Europe/Kaliningrad", "Europe/Samara", "Asia/Yekaterinburg", "Asia/Novosibirsk", "Asia/Vladivostok", "UTC"];
  }
  if (current && !zones.includes(current)) {
    zones = [current, ...zones];
  }
  return [{ value: "", label: "Как на сервере" }, ...zones.map((z) => ({ value: z, label: z }))];
}

function panel(title: string, hint: string | null, ...children: Array<HTMLElement | null>): HTMLElement {
  return h("section", { class: "ks-card dv-section-card" }, h("header", null, h("h2", null, title)), hint ? h("p", { class: "ks-muted" }, hint) : null, children);
}

function saveForm(runtime: ExtensionRuntime, fields: FieldOptions[], build: (v: Record<string, string | boolean>) => Record<string, unknown>, onSaved: () => void): HTMLElement {
  return form(fields, {
    onSubmit: async (values, handle) => {
      const result = await runtime.invokeAction("domovoy.actions", "settings.update", build(values));
      if (!result.ok) {
        handle.showErrors(result.error);
        return;
      }
      toast("Сохранено", "good");
      onSaved();
    },
  }).el;
}

function downloadJson(name: string, data: unknown): void {
  const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
  const link = h("a", { href: url, download: name });
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

export function mountSettings(host: HTMLElement, _params: Record<string, unknown>, runtime: ExtensionRuntime): MountedView {
  const disposer = new Disposer();
  const content = h("div");

  const handle = asyncView<Loaded>({
    host: content,
    load: async (signal) => {
      const [settings, voice, state, backups] = await Promise.all([
        read<{ settings: Settings }>(runtime, "api/settings", undefined, signal),
        read<Loaded["voice"]>(runtime, "api/voice/status", undefined, signal),
        read<Loaded["state"]>(runtime, "api/state", undefined, signal),
        read<{ backups: Loaded["backups"] }>(runtime, "api/backups", undefined, signal),
      ]);
      if (!settings.ok) return settings;
      if (!voice.ok) return voice;
      if (!state.ok) return state;
      return { ok: true as const, data: { settings: settings.data.settings, voice: voice.data, state: state.data, backups: backups.ok ? backups.data.backups : [] } };
    },
    render: ({ settings: s, voice, state, backups }, refresh) => {
      setServerTimezone(state.timezone);
      const general = panel("Общие", null, saveForm(runtime, [
        { name: "timezone", label: "Часовой пояс", type: "select", options: timezoneOptions(s.timezone), value: s.timezone, hint: `Сейчас на сервере: ${state.timezone}`, wide: true },
        { name: "default_reminder_hour", label: "Во сколько напоминать, если сказали только «завтра» (час)", type: "number", min: 0, max: 23, value: s.default_reminder_hour, wide: true },
        { name: "default_event_minutes", label: "Длительность события по умолчанию, минут", type: "number", min: 5, max: 1440, value: s.default_event_minutes, wide: true },
      ], (v) => ({ timezone: String(v.timezone), default_reminder_hour: Number(v.default_reminder_hour), default_event_minutes: Number(v.default_event_minutes) }), refresh));

      const confidence = panel("Насколько доверять пониманию команд", "Правила понимают привычные фразы сами. Если уверенность ниже порога — команда не выполняется, а ждёт вашего решения в «Проверке». Записи, предложенные языковой моделью, всегда идут на проверку, пока вы явно не разрешите иначе.", saveForm(runtime, [
        { name: "auto_apply_confidence", label: "Выполнять сразу при уверенности от (0–1)", type: "number", min: 0, max: 1, step: 0.05, value: s.auto_apply_confidence, wide: true },
        { name: "review_confidence", label: "Отправлять на проверку от (ниже — переспрашивать)", type: "number", min: 0, max: 1, step: 0.05, value: s.review_confidence, wide: true },
        { name: "ai_auto_apply", label: "Выполнять записи языковой модели без проверки (при уверенности от 0,9)", type: "checkbox", value: s.ai.auto_apply, hint: "Не рекомендуется: модель может ошибаться. Всё можно отменить в «Журнале», но лучше сначала посмотреть.", wide: true },
      ], (v) => ({ auto_apply_confidence: Number(v.auto_apply_confidence), review_confidence: Number(v.review_confidence), ai: { auto_apply: v.ai_auto_apply === true } }), refresh));

      const voiceCard = panel("Голос", "Обращение по слову-триггеру работает и с колонками через Home Assistant, и с микрофоном киоска. Разговор без слова-триггера не сохраняется.", h("p", null, "Микрофон киоска: ", voice.enabled ? badge("включён", "good") : badge("выключен", "neutral"), " ", voice.stt_configured ? badge("распознавание настроено", "good") : badge("распознавание не настроено", "warn")),
        saveForm(runtime, [
          { name: "enabled", label: "Принимать голосовые команды с микрофона киоска", type: "checkbox", value: s.voice.enabled, wide: true },
          { name: "trigger_words", label: "Слова-триггеры", value: (s.voice.trigger_words ?? []).join(", "), hint: "Через запятую, все падежи, которые вы произносите: «домовой, домового, домовому».", wide: true },
          { name: "window_s", label: "После обращения слушать без повторного слова, секунд", type: "number", min: 5, max: 120, value: s.voice.window_s, wide: true },
          { name: "reply", label: "Как отвечать", type: "select", options: [{ value: "speak", label: "Голосом через колонки" }, { value: "text", label: "Только текстом на экране" }], value: s.voice.reply, wide: true },
          { name: "room", label: "Комната этого микрофона", value: s.voice.room, hint: "Чтобы ответ прозвучал в ближайшей колонке.", wide: true },
          { name: "speak_enabled", label: "Озвучивать напоминания и ответы", type: "checkbox", value: s.speak.enabled, wide: true },
          { name: "quiet_from", label: "Тихие часы с", type: "time", value: s.speak.quiet_from },
          { name: "quiet_to", label: "до", type: "time", value: s.speak.quiet_to },
          { name: "fallback", label: "Если колонка не ответила", type: "select", options: [{ value: "telegram", label: "Написать в Telegram" }, { value: "ui", label: "Показать на экране" }, { value: "none", label: "Ничего" }], value: s.speak.fallback, wide: true },
        ], (v) => ({ voice: { enabled: v.enabled === true, trigger_words: splitList(String(v.trigger_words)), window_s: Number(v.window_s), reply: v.reply, room: String(v.room).trim() }, speak: { enabled: v.speak_enabled === true, quiet_from: String(v.quiet_from), quiet_to: String(v.quiet_to), fallback: v.fallback } }), refresh),
      );

      const messaging = panel("Сообщения", null, saveForm(runtime, [
        { name: "sandbox", label: "Тестовый режим: ничего не отправлять наружу (Telegram, HA-уведомления)", type: "checkbox", value: s.messaging.sandbox, hint: "Сообщения останутся в «Журнале → Отправка» — удобно проверять сценарии.", wide: true },
      ], (v) => ({ messaging: { sandbox: v.sandbox === true } }), refresh));

      const fileInput = h("input", { type: "file", accept: "application/json,.json", hidden: true });
      fileInput.addEventListener("change", async () => {
        const file = fileInput.files?.[0];
        fileInput.value = "";
        if (!file) {
          return;
        }
        let parsed: unknown;
        try {
          parsed = JSON.parse(await file.text());
        } catch {
          toast("Это не JSON-файл", "bad");
          return;
        }
        const ok = await confirmDialog({ title: "Заменить все данные?", message: "Все текущие данные (вещи, места, заметки, задачи, напоминания, журнал) будут заменены содержимым файла. Перед этим я сделаю резервную копию.", confirmLabel: "Заменить", destructive: true });
        if (ok) {
          const result = await perform(runtime, "data.import", { data: parsed }, { success: "Данные импортированы" });
          if (result.ok) {
            refresh();
          }
        }
      });
      const data = panel("Данные и резервные копии", `Версия ${state.version}. В базе: ${state.counts.items} вещей, ${state.counts.locations} мест, ${state.counts.notes} заметок. Пароли и токены в экспорт не попадают.`,
        h("div", { class: "ks-row" },
          button("Сделать резервную копию", { variant: "primary", onClick: async () => { if ((await perform(runtime, "backup.create", {}, { success: "Копия создана" })).ok) { refresh(); } } }),
          button("Скачать экспорт (JSON)", { onClick: async () => {
            const result = await read<unknown>(runtime, "api/export");
            if (result.ok) {
              downloadJson(`domovoy-export-${new Date().toISOString().slice(0, 10)}.json`, result.data);
            } else {
              toast(result.error.message, "bad");
            }
          } }),
          button("Импортировать…", { variant: "danger", onClick: () => fileInput.click() }),
          fileInput,
        ),
        backups.length ? h("ul", { class: "ks-list" }, backups.slice(0, 8).map((b) => h("li", null, h("div", { class: "ks-grow" }, b.name, h("div", { class: "ks-sub" }, `${Math.max(1, Math.round(b.bytes / 1024))} КБ`))))) : emptyLine("Резервных копий пока нет — они создаются раз в сутки автоматически."),
        h("small", { class: "ks-muted" }, "Копии лежат в /config/kiosk-scene/domovoy/backups — они попадают и в общую резервную копию Home Assistant."),
      );

      return h("div", { class: "dv-stack" }, general, confidence, voiceCard, messaging, data);
    },
  });

  replaceChildren(host, h("div", { class: "ks-page" }, pageHead(T.settings), content));
  liveRefresh(runtime, disposer, ["settings"], () => handle.refresh(), 800, host);
  disposer.add(() => handle.dispose());
  return view(disposer);
}
