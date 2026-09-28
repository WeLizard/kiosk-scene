import { Disposer, asyncView, badge, button, emptyState, h, replaceChildren } from "@kiosk-scene/app-shell";
import type { ExtensionRuntime, MountedView } from "@kiosk-scene/core";
import { T, statusLabel, statusTone } from "../i18n.js";
import type { CommandReply, TodayPayload } from "../types.js";
import { describeRecurrence, describeTrigger, dayKey, formatDateTime, formatTime, relative, setServerTimezone } from "../util.js";
import { act, card, emptyLine, listItem, liveRefresh, perform, read, smallButton, view } from "./common.js";

const SESSION_KEY = "domovoy.session";

function sessionId(): string {
  try {
    let value = window.sessionStorage.getItem(SESSION_KEY);
    if (!value) {
      value = `web-${Math.random().toString(36).slice(2, 10)}`;
      window.sessionStorage.setItem(SESSION_KEY, value);
    }
    return value;
  } catch {
    return "web-anon";
  }
}

/** The command bar: type (or paste what the microphone heard), see the reply, answer a clarifying question, undo. */
export function commandBar(runtime: ExtensionRuntime, onDone: () => void): HTMLElement {
  const input = h("input", { class: "ks-input dv-command", type: "text", placeholder: T.commandPlaceholder, "aria-label": "Команда", autocomplete: "off", enterkeyhint: "send" });
  const output = h("div", { class: "dv-reply", role: "status", "aria-live": "polite" });
  const sendButton = button(T.send, { variant: "primary", type: "submit" });
  const form = h("form", { class: "dv-commandbar" }, input, sendButton);

  const send = async (text: string): Promise<void> => {
    const value = text.trim();
    if (!value) {
      return;
    }
    sendButton.disabled = true;
    replaceChildren(output, h("span", { class: "ks-muted" }, T.loading));
    const result = await act<CommandReply>(runtime, "command.send", { text: value, session_id: sessionId() });
    sendButton.disabled = false;
    if (!result.ok) {
      replaceChildren(output, h("span", { class: "ks-error" }, result.error.message));
      return;
    }
    input.value = "";
    showReply(result.data);
    onDone();
  };

  const showReply = (reply: CommandReply): void => {
    const chips = (reply.options ?? []).map((option, index) => smallButton(`${index + 1}. ${option}`, () => void send(String(index + 1))));
    replaceChildren(
      output,
      h("div", { class: "dv-reply-line" }, badge(statusLabel(reply.status), statusTone(reply.status)), " ", reply.reply),
      chips.length ? h("div", { class: "ks-row dv-chips" }, chips) : null,
      reply.undoable && reply.command_id
        ? smallButton(T.undo, async () => {
            const undone = await perform(runtime, "command.undo", { id: reply.command_id }, { success: "Отменено" });
            if (undone.ok) {
              replaceChildren(output, h("span", { class: "ks-muted" }, "Отменено."));
              onDone();
            }
          }, "ghost")
        : null,
    );
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    void send(input.value);
  });
  return h("div", { class: "ks-card dv-command-card" }, form, output);
}

function eventList(payload: TodayPayload): HTMLElement {
  if (!payload.events.length) {
    return emptyLine("Сегодня и завтра событий нет.");
  }
  const tz = payload.timezone;
  setServerTimezone(tz);
  const today = dayKey(payload.now, tz);
  return h(
    "ul",
    { class: "ks-list" },
    payload.events.map((e) =>
      listItem(
        e.title,
        `${dayKey(e.start, tz) === today ? "сегодня" : "завтра"}, ${e.all_day ? "весь день" : `${formatTime(e.start, tz)}–${formatTime(e.end, tz)}`}${e.location ? ` · ${e.location}` : ""}`,
      ),
    ),
  );
}

export function mountToday(host: HTMLElement, _params: Record<string, unknown>, runtime: ExtensionRuntime): MountedView {
  const disposer = new Disposer();
  const kiosk = runtime.mode === "kiosk";
  const root = h("div", { class: `ks-page dv-today${kiosk ? " ks-scope dv-kiosk" : ""}`, dataset: kiosk ? { theme: "kiosk", noSwipe: "true" } : undefined });
  const content = h("div", { class: "ks-page" });
  const bar = commandBar(runtime, () => handle.refresh());
  replaceChildren(host, root);
  replaceChildren(root, bar, content);

  const handle = asyncView<TodayPayload>({
    host: content,
    load: (signal) => read<TodayPayload>(runtime, "api/today", undefined, signal),
    render: (data, refresh) => {
      setServerTimezone(data.timezone);
      const reminderActions = (id: number, state: string) =>
        h(
          "div",
          { class: "ks-row" },
          state === "fired" ? smallButton("Готово", async () => { await perform(runtime, "reminders.done", { id }); refresh(); }, "primary") : null,
          smallButton("+10 мин", async () => { await perform(runtime, "reminders.snooze", { id, minutes: 10 }); refresh(); }),
        );
      return h(
        "div",
        { class: "ks-grid" },
        card("Календарь", eventList(data)),
        card(
          "Напоминания",
          data.reminders.length
            ? h("ul", { class: "ks-list" }, data.reminders.map((r) =>
                listItem(
                  r.text,
                  [r.state === "fired" ? "сработало" : r.due_at ? `${formatDateTime(r.due_at)} (${relative(r.due_at)})` : describeTrigger(r.trigger), r.recurrence ? ` · ${describeRecurrence(r.recurrence)}` : "", ` · ${T.channels[r.channel] ?? r.channel}`].join(""),
                  reminderActions(r.id, r.state),
                  r.state === "fired" ? "dv-fired" : "",
                )))
            : emptyLine("Напоминаний нет."),
        ),
        card(
          "Список покупок",
          data.shopping.length
            ? h("ul", { class: "ks-list" }, data.shopping.map((t) => listItem(t.title, undefined, smallButton("Куплено", async () => { await perform(runtime, "tasks.complete", { id: t.id }); refresh(); }))))
            : emptyLine("Список покупок пуст."),
        ),
        card(
          "Задачи",
          data.tasks.length
            ? h("ul", { class: "ks-list" }, data.tasks.map((t) => listItem(t.title, t.due_date ? `до ${t.due_date}${t.recurrence ? ` · ${describeRecurrence(t.recurrence)}` : ""}` : "", smallButton("Готово", async () => { await perform(runtime, "tasks.complete", { id: t.id }); refresh(); }))))
            : emptyLine("Задач нет."),
        ),
        data.review_count
          ? card("Ждёт проверки", h("div", null, h("p", null, `Есть неуверенные команды: ${data.review_count}. Я ничего не записал без вашего подтверждения.`), button("Открыть проверку", { variant: "primary", onClick: () => runtime.navigate("domovoy.review") })))
          : null,
        data.warnings.length ? card("Календари", h("p", { class: "ks-stale-banner" }, `Не удалось прочитать: ${data.warnings.map((w) => w.source).join(", ")}`)) : null,
        kiosk ? null : card(
          "Последние команды",
          data.recent.length
            ? h("ul", { class: "ks-list" }, data.recent.map((c) => listItem(c.text, c.reply ?? "", badge(statusLabel(c.status), statusTone(c.status)))))
            : emptyState("Команд ещё не было", "Скажите или напишите что-нибудь выше."),
        ),
      );
    },
  });

  liveRefresh(runtime, disposer, ["calendar", "reminders", "tasks", "review", "commands", "outbox", "notification"], () => handle.refresh());
  disposer.add(() => handle.dispose());
  return view(disposer);
}
