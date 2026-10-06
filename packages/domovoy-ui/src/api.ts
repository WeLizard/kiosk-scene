import { createHttpClient, type HttpClient, type HttpRequestOptions } from "@kiosk-scene/app-shell";
import type { ActionDescriptor, ActionProvider, DataProvider, ExtensionResult, ProviderCallContext } from "@kiosk-scene/core";

export const DATA_PROVIDER_ID = "domovoy.api";
export const ACTION_PROVIDER_ID = "domovoy.actions";
export const EVENTS_SOURCE_ID = "domovoy.events";

type Input = Record<string, any>;
interface Spec {
  title: string;
  method: NonNullable<HttpRequestOptions["method"]>;
  path: (input: Input) => string;
  body?: (input: Input) => unknown;
  query?: (input: Input) => Record<string, string | number | undefined>;
  destructive?: boolean;
}

const rest = (input: Input, omit: string[] = ["id"]): Input => Object.fromEntries(Object.entries(input).filter(([k]) => !omit.includes(k)));
const withId = (base: string) => (input: Input): string => `${base}/${encodeURIComponent(String(input.id))}`;

/** Every write the UI can perform, by name. The extension model exposes these as an ActionProvider. */
export const ACTIONS: Record<string, Spec> = {
  "command.send": { title: "Отправить команду", method: "POST", path: () => "api/command", body: (i) => i },
  "command.undo": { title: "Отменить команду", method: "POST", path: (i) => `api/commands/${i.id}/undo`, body: () => ({}) },
  "items.create": { title: "Добавить предмет", method: "POST", path: () => "api/items", body: (i) => i },
  "items.update": { title: "Изменить предмет", method: "PATCH", path: withId("api/items"), body: (i) => rest(i) },
  "items.delete": { title: "Удалить предмет", method: "DELETE", path: withId("api/items"), destructive: true },
  "items.move": { title: "Переместить предмет", method: "POST", path: (i) => `api/items/${i.id}/move`, body: (i) => rest(i) },
  "items.consume": { title: "Списать", method: "POST", path: (i) => `api/items/${i.id}/consume`, body: (i) => rest(i) },
  "locations.create": { title: "Добавить место", method: "POST", path: () => "api/locations", body: (i) => i },
  "locations.update": { title: "Изменить место", method: "PATCH", path: withId("api/locations"), body: (i) => rest(i) },
  "locations.delete": { title: "Удалить место", method: "DELETE", path: withId("api/locations"), destructive: true },
  "notes.create": { title: "Добавить заметку", method: "POST", path: () => "api/notes", body: (i) => i },
  "notes.update": { title: "Изменить заметку", method: "PATCH", path: withId("api/notes"), body: (i) => rest(i) },
  "notes.delete": { title: "Удалить заметку", method: "DELETE", path: withId("api/notes"), destructive: true },
  "tasks.create": { title: "Добавить задачу", method: "POST", path: () => "api/tasks", body: (i) => i },
  "tasks.update": { title: "Изменить задачу", method: "PATCH", path: withId("api/tasks"), body: (i) => rest(i) },
  "tasks.complete": { title: "Отметить задачу", method: "POST", path: (i) => `api/tasks/${i.id}/complete`, body: (i) => ({ done: i.done ?? true }) },
  "tasks.delete": { title: "Удалить задачу", method: "DELETE", path: withId("api/tasks"), destructive: true },
  "reminders.create": { title: "Добавить напоминание", method: "POST", path: () => "api/reminders", body: (i) => i },
  "reminders.update": { title: "Изменить напоминание", method: "PATCH", path: withId("api/reminders"), body: (i) => rest(i) },
  "reminders.done": { title: "Напоминание выполнено", method: "POST", path: (i) => `api/reminders/${i.id}/done`, body: () => ({}) },
  "reminders.snooze": { title: "Отложить напоминание", method: "POST", path: (i) => `api/reminders/${i.id}/snooze`, body: (i) => ({ minutes: i.minutes }) },
  "reminders.delete": { title: "Удалить напоминание", method: "DELETE", path: withId("api/reminders"), destructive: true },
  "calendar.create": { title: "Добавить событие", method: "POST", path: () => "api/calendar/events", body: (i) => i },
  "calendar.update": { title: "Изменить событие", method: "PATCH", path: () => "api/calendar/event", body: (i) => rest(i, ["ref"]), query: (i) => ({ ref: i.ref }) },
  "calendar.delete": { title: "Удалить событие", method: "DELETE", path: () => "api/calendar/event", query: (i) => ({ ref: i.ref }), destructive: true },
  "contacts.create": { title: "Добавить контакт", method: "POST", path: () => "api/contacts", body: (i) => i },
  "contacts.update": { title: "Изменить контакт", method: "PATCH", path: withId("api/contacts"), body: (i) => rest(i) },
  "contacts.delete": { title: "Удалить контакт", method: "DELETE", path: withId("api/contacts"), destructive: true },
  "contacts.link": { title: "Привязать Telegram", method: "POST", path: () => "api/contacts/link", body: (i) => i },
  "review.approve": { title: "Подтвердить", method: "POST", path: (i) => `api/review/${i.id}/approve`, body: (i) => (i.proposal ? { proposal: i.proposal } : {}) },
  "review.reject": { title: "Отклонить", method: "POST", path: (i) => `api/review/${i.id}/reject`, body: () => ({}) },
  "audit.undo": { title: "Отменить изменение", method: "POST", path: (i) => `api/audit/${i.id}/undo`, body: (i) => ({ force: Boolean(i.force) }) },
  "outbox.retry": { title: "Повторить отправку", method: "POST", path: (i) => `api/outbox/${i.id}/retry`, body: () => ({}) },
  "outbox.cancel": { title: "Отменить отправку", method: "POST", path: (i) => `api/outbox/${i.id}/cancel`, body: () => ({}) },
  "settings.update": { title: "Сохранить настройки", method: "PUT", path: () => "api/settings", body: (i) => i },
  "secrets.set": { title: "Сохранить секрет", method: "PUT", path: () => "api/integrations/secrets", body: (i) => i },
  "integration.test": { title: "Проверить интеграцию", method: "POST", path: (i) => `api/integrations/${i.name}/test`, body: () => ({}) },
  "security.rotate": { title: "Сменить секрет", method: "POST", path: () => "api/security/rotate", body: (i) => ({ name: i.name }), destructive: true },
  "backup.create": { title: "Сделать резервную копию", method: "POST", path: () => "api/backup", body: () => ({}) },
  "data.import": { title: "Импортировать данные", method: "POST", path: () => "api/import", body: (i) => i.data, destructive: true },
  "voice.text": { title: "Голосовая команда (текст)", method: "POST", path: () => "api/voice/command", body: (i) => i },
};

const AUTH_KEY = "domovoy.token";

export function readToken(): string | null {
  try {
    return window.localStorage.getItem(AUTH_KEY);
  } catch {
    return null;
  }
}

export function storeToken(token: string): void {
  try {
    if (token) {
      window.localStorage.setItem(AUTH_KEY, token);
    } else {
      window.localStorage.removeItem(AUTH_KEY);
    }
  } catch {
    // Private mode: the token then only lives for this page load.
  }
}

export interface ApiOptions {
  baseUrl: string;
  fetchImpl?: typeof fetch;
  onUnauthorized?: () => void;
}

export function createApi(options: ApiOptions): { http: HttpClient; data: DataProvider; actions: ActionProvider } {
  const http = createHttpClient({
    baseUrl: options.baseUrl,
    fetchImpl: options.fetchImpl,
    getToken: readToken,
    // The custom header is what turns a cross-site form post into something the server refuses (CSRF defence).
    headers: { "X-Domovoy-Client": "kiosk-scene" },
    onUnauthorized: () => options.onUnauthorized?.(),
    timeoutMs: 20_000,
  });

  const data: DataProvider<{ path: string; query?: Record<string, string | number | undefined> }, unknown> = {
    id: DATA_PROVIDER_ID,
    async read(params, context?: ProviderCallContext): Promise<ExtensionResult<unknown>> {
      const path = String(params?.path ?? "");
      if (!/^(api\/|events)/.test(path)) {
        return { ok: false, error: { code: "bad_path", message: `Refusing to read ${path}` } };
      }
      return http.request(path, { query: params.query, signal: context?.signal });
    },
  };

  const actions: ActionProvider = {
    id: ACTION_PROVIDER_ID,
    describe(): ActionDescriptor[] {
      return Object.entries(ACTIONS).map(([id, spec]) => ({ id, title: spec.title, destructive: spec.destructive }));
    },
    async invoke<T>(action: string, input: unknown, context?: ProviderCallContext): Promise<ExtensionResult<T>> {
      const spec = ACTIONS[action];
      if (!spec) {
        return { ok: false, error: { code: "unknown_action", message: `Unknown action ${action}` } };
      }
      const payload = (input ?? {}) as Input;
      return http.request<T>(spec.path(payload), {
        method: spec.method,
        body: spec.body ? spec.body(payload) : undefined,
        query: spec.query?.(payload),
        signal: context?.signal,
      });
    },
  };
  return { http, data, actions };
}
