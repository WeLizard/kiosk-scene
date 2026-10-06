import { Disposer, asyncView, badge, button, field, h, replaceChildren } from "@kiosk-scene/app-shell";
import type { ExtensionRuntime, MountedView } from "@kiosk-scene/core";
import { T } from "../i18n.js";
import type { Contact, Reminder, Task } from "../types.js";
import { describeRecurrence, describeTrigger, formatDateTime, relative, timezone, zonedToIso, isoToLocalInput } from "../util.js";
import { both, card, emptyLine, formDialog, listItem, liveRefresh, pageHead, perform, read, smallButton, statusBadge, view } from "./common.js";

const CHANNEL_OPTIONS = Object.entries(T.channels).map(([value, label]) => ({ value, label }));

function reminderForm(runtime: ExtensionRuntime, contacts: Contact[], reminder: Reminder | null, onDone: () => void): void {
  const tz = timezone();
  const kind = reminder?.kind ?? "time";
  const trig = (reminder?.trigger ?? {}) as Record<string, any>;
  // A "device state" condition cannot be built in this form; editing such a reminder must leave it exactly as it is.
  const keepsTrigger = kind !== "time" && trig.type === "state";
  const window = trig.window ? { window: trig.window } : {};        // a time-of-day window survives edits
  void formDialog(
    reminder ? "Изменить напоминание" : "Новое напоминание",
    [
      { name: "text", label: "О чём напомнить", required: true, value: reminder?.text ?? "", wide: true },
      { name: "mode", label: "Когда", type: "select", options: [...(keepsTrigger ? [{ value: "keep", label: "Условие устройства (не меняется)" }] : []), { value: "time", label: "В указанное время" }, { value: "presence", label: "Когда приду домой" }, { value: "room", label: "Когда зайду в комнату" }], value: keepsTrigger ? "keep" : kind === "time" ? "time" : String(trig.type ?? "presence") },
      { name: "due_at", label: "Дата и время", type: "datetime-local", value: reminder?.due_at ? isoToLocalInput(reminder.due_at, tz) : "" },
      { name: "place", label: "Комната", value: trig.place && trig.type === "room" ? String(trig.place) : "", hint: "Для «когда зайду в комнату»: как в настройках комнат, например «кухня»." },
      { name: "channel", label: "Как сообщить", type: "select", options: CHANNEL_OPTIONS, value: reminder?.channel ?? "speak" },
      { name: "recipient", label: "Кому", type: "select", options: [{ value: "self", label: "Мне" }, ...contacts.filter((c) => !c.is_self).map((c) => ({ value: c.name, label: c.name }))], value: reminder?.recipient ?? "self" },
    ],
    async (values) => {
      const mode = String(values.mode);
      const body: Record<string, unknown> = { text: String(values.text).trim(), channel: values.channel, recipient: values.recipient };
      if (mode === "keep") {
        // text, channel and recipient only: the trigger (and its memory of the last observed state) is untouched
      } else if (mode === "time") {
        if (!values.due_at) {
          return { ok: false as const, error: { code: "validation", message: "Укажите время", fields: { due_at: "Укажите время" } } };
        }
        body.due_at = zonedToIso(String(values.due_at), tz);
        body.trigger = null;
      } else if (mode === "room") {
        if (!String(values.place).trim()) {
          return { ok: false as const, error: { code: "validation", message: "Укажите комнату", fields: { place: "Укажите комнату" } } };
        }
        body.trigger = { type: "room", place: String(values.place).trim(), require_transition: true, ...window };
      } else {
        const person = (await runtime.readData<{ settings: { ha: { person_entity: string } } }>("domovoy.api", { path: "api/settings" }));
        const entity = person.ok ? person.data.settings.ha.person_entity : "";
        if (!entity) {
          return { ok: false as const, error: { code: "validation", message: "Сначала укажите person-сущность в Интеграциях → Home Assistant." } };
        }
        body.trigger = { type: "presence", person: entity, place: "home", require_transition: true, ...window };
      }
      const result = reminder
        ? await runtime.invokeAction("domovoy.actions", "reminders.update", { id: reminder.id, ...body })
        : await runtime.invokeAction("domovoy.actions", "reminders.create", body);
      if (result.ok) {
        onDone();
      }
      return result;
    },
  );
}

function taskForm(runtime: ExtensionRuntime, task: Task | null, listName: Task["list"], onDone: () => void): void {
  void formDialog(
    task ? "Изменить задачу" : "Новая задача",
    [
      { name: "title", label: T.title, required: true, value: task?.title ?? "", wide: true },
      { name: "list", label: "Список", type: "select", options: Object.entries(T.lists).map(([value, label]) => ({ value, label })), value: task?.list ?? listName },
      { name: "due_date", label: "Срок", type: "date", value: task?.due_date ?? "" },
      { name: "notes", label: T.notes, type: "textarea", rows: 2, value: task?.notes ?? "", wide: true },
    ],
    async (values) => {
      const body = { title: String(values.title).trim(), list: values.list, due_date: values.due_date || null, notes: String(values.notes ?? "") };
      const result = task ? await runtime.invokeAction("domovoy.actions", "tasks.update", { id: task.id, ...body }) : await runtime.invokeAction("domovoy.actions", "tasks.create", body);
      if (result.ok) {
        onDone();
      }
      return result;
    },
  );
}

export function mountTasks(host: HTMLElement, _params: Record<string, unknown>, runtime: ExtensionRuntime): MountedView {
  const disposer = new Disposer();
  const content = h("div");
  let showDone = false;
  let contacts: Contact[] = [];
  const addReminder = button("Напоминание", { variant: "primary" });
  const addTask = button("Задача", { variant: "secondary" });
  const doneToggle = field({ name: "done", label: "Показывать выполненное", type: "checkbox", value: false });

  const handle = asyncView<[{ reminders: Reminder[] }, { tasks: Task[] }, { contacts: Contact[] }]>({
    host: content,
    load: async (signal) => {
      const states = showDone ? "pending,fired,done,cancelled" : "pending,fired";
      const first = await both(
        read<{ reminders: Reminder[] }>(runtime, "api/reminders", { states }, signal),
        read<{ tasks: Task[] }>(runtime, "api/tasks", { include_done: showDone ? "1" : "0" }, signal),
      );
      if (!first.ok) {
        return first;
      }
      const contactsResult = await read<{ contacts: Contact[] }>(runtime, "api/contacts", undefined, signal);
      return { ok: true as const, data: [first.data[0], first.data[1], contactsResult.ok ? contactsResult.data : { contacts: [] }] as [{ reminders: Reminder[] }, { tasks: Task[] }, { contacts: Contact[] }] };
    },
    render: ([{ reminders }, { tasks }, c], refresh) => {
      contacts = c.contacts;
      addReminder.onclick = () => reminderForm(runtime, contacts, null, refresh);
      addTask.onclick = () => taskForm(runtime, null, "tasks", refresh);
      const reminderRow = (r: Reminder): HTMLElement =>
        listItem(
          h("span", null, r.text, " ", statusBadge(r.state)),
          `${r.kind === "time" && r.due_at ? `${formatDateTime(r.due_at)}${r.state === "pending" ? ` (${relative(r.due_at)})` : ""}` : describeTrigger(r.trigger)}${r.recurrence ? ` · ${describeRecurrence(r.recurrence)}` : ""} · ${T.channels[r.channel] ?? r.channel}${r.recipient && r.recipient !== "self" ? ` → ${r.recipient}` : ""}`,
          h("div", { class: "ks-row" },
            r.state === "fired" || r.state === "pending" ? smallButton("Готово", async () => { if ((await perform(runtime, "reminders.done", { id: r.id })).ok) { refresh(); } }, "primary") : null,
            r.state === "pending" || r.state === "fired" ? smallButton("+10 мин", async () => { if ((await perform(runtime, "reminders.snooze", { id: r.id, minutes: 10 })).ok) { refresh(); } }) : null,
            r.state === "pending" ? smallButton(T.edit, () => reminderForm(runtime, contacts, r, refresh)) : null,
            smallButton(T.delete, async () => { if ((await perform(runtime, "reminders.delete", { id: r.id }, { confirm: { title: "Удалить напоминание", message: `«${r.text}»` } })).ok) { refresh(); } }, "danger"),
          ),
          r.state === "fired" ? "dv-fired" : "",
        );
      const taskRows = (list: Task["list"]): HTMLElement => {
        const rows = tasks.filter((t) => t.list === list);
        return rows.length
          ? h("ul", { class: "ks-list" }, rows.map((t) =>
              listItem(
                h("span", { class: t.done ? "dv-done" : "" }, t.title),
                [t.due_date ? `срок ${t.due_date}` : "", t.recurrence ? describeRecurrence(t.recurrence) : "", t.notes].filter(Boolean).join(" · "),
                h("div", { class: "ks-row" },
                  smallButton(t.done ? "Вернуть" : list === "shopping" ? "Куплено" : "Готово", async () => { if ((await perform(runtime, "tasks.complete", { id: t.id, done: !t.done })).ok) { refresh(); } }, t.done ? "secondary" : "primary"),
                  smallButton(T.edit, () => taskForm(runtime, t, list, refresh)),
                  smallButton(T.delete, async () => { if ((await perform(runtime, "tasks.delete", { id: t.id }, { confirm: { title: "Удалить задачу", message: `«${t.title}»` } })).ok) { refresh(); } }, "danger"),
                ),
              ),
            ))
          : emptyLine();
      };
      return h(
        "div",
        { class: "ks-grid" },
        card("Напоминания", reminders.length ? h("ul", { class: "ks-list" }, reminders.map(reminderRow)) : emptyLine("Напоминаний нет.")),
        card(T.lists.tasks, taskRows("tasks")),
        card(T.lists.shopping, taskRows("shopping")),
        card(T.lists.chores, taskRows("chores")),
      );
    },
  });
  doneToggle.input.addEventListener("change", () => {
    showDone = (doneToggle.input as HTMLInputElement).checked;
    handle.refresh();
  });
  replaceChildren(host, h("div", { class: "ks-page" }, pageHead(T.tasks, addReminder, addTask), h("div", { class: "ks-card ks-filters" }, doneToggle.el), content));
  liveRefresh(runtime, disposer, ["reminders", "tasks", "contacts"], () => handle.refresh());
  disposer.add(() => handle.dispose());
  return view(disposer);
}
