import { Disposer, asyncView, badge, button, h } from "@kiosk-scene/app-shell";
import type { ExtensionRuntime, MountedView } from "@kiosk-scene/core";
import { T } from "../i18n.js";
import type { CalEvent } from "../types.js";
import { dayKey, formatDay, formatTime, isoToLocalInput, setServerTimezone, timezone, zonedToIso } from "../util.js";
import { both, emptyLine, formDialog, listItem, liveRefresh, pageHead, perform, read, smallButton, view } from "./common.js";

interface Events {
  events: CalEvent[];
  warnings: Array<{ source: string; message: string }>;
}
interface Sources {
  sources: Array<{ id: string; title: string; capabilities: string[]; available: boolean }>;
  default: string;
}

function editEvent(runtime: ExtensionRuntime, sources: Sources, event: CalEvent | null, onDone: () => void): void {
  const tz = timezone();
  const startDefault = event ? isoToLocalInput(event.start, tz) : isoToLocalInput(new Date(Math.ceil(Date.now() / 3_600_000) * 3_600_000).toISOString(), tz);
  const endDefault = event ? isoToLocalInput(event.end, tz) : "";
  const writable = sources.sources.filter((s) => s.capabilities.includes("create") && s.available);
  void formDialog(
    event ? `Изменить: ${event.title}` : "Новое событие",
    [
      { name: "title", label: T.title, required: true, value: event?.title ?? "", wide: true },
      { name: "start", label: "Начало", type: "datetime-local", required: true, value: startDefault },
      { name: "end", label: "Конец", type: "datetime-local", value: endDefault, hint: "Пусто — по умолчанию из настроек." },
      { name: "all_day", label: "Весь день", type: "checkbox", value: event?.all_day ?? false },
      { name: "location", label: "Где", value: event?.location ?? "", wide: true },
      { name: "notes", label: T.notes, type: "textarea", rows: 2, value: event?.notes ?? "", wide: true },
      ...(event ? [] : [{ name: "calendar", label: "Календарь", type: "select" as const, options: writable.map((s) => ({ value: s.id, label: s.title })), value: sources.default }]),
    ],
    async (values) => {
      const body: Record<string, unknown> = {
        title: String(values.title).trim(),
        start: zonedToIso(String(values.start), tz),
        all_day: values.all_day === true,
        location: String(values.location ?? ""),
        notes: String(values.notes ?? ""),
      };
      if (values.end) {
        body.end = zonedToIso(String(values.end), tz);
      }
      const result = event
        ? await runtime.invokeAction("domovoy.actions", "calendar.update", { ref: event.ref, ...body })
        : await runtime.invokeAction("domovoy.actions", "calendar.create", { ...body, calendar: values.calendar });
      if (result.ok) {
        onDone();
      }
      return result;
    },
  );
}

export function mountCalendar(host: HTMLElement, _params: Record<string, unknown>, runtime: ExtensionRuntime): MountedView {
  const disposer = new Disposer();
  const content = h("div");
  let days = 14;
  let sources: Sources = { sources: [], default: "local" };
  const addButton = button(T.add, { variant: "primary" });
  const moreButton = button("Показать ещё 2 недели", { variant: "ghost" });

  const handle = asyncView<[Events, Sources]>({
    host: content,
    load: (signal) => {
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      const end = new Date(start.getTime() + days * 86_400_000);
      return both(
        read<Events>(runtime, "api/calendar/events", { start: start.toISOString(), end: end.toISOString() }, signal),
        read<Sources>(runtime, "api/calendar/sources", undefined, signal),
      );
    },
    render: ([{ events, warnings }, src], refresh) => {
      sources = src;
      addButton.onclick = () => editEvent(runtime, sources, null, refresh);
      const byDay = new Map<string, CalEvent[]>();
      for (const event of events) {
        const key = dayKey(event.start);
        byDay.set(key, [...(byDay.get(key) ?? []), event]);
      }
      return h(
        "div",
        null,
        warnings.length
          ? h("div", { class: "ks-stale-banner", role: "alert" }, `Не удалось прочитать календарь: ${warnings.map((w) => `${w.source} (${w.message})`).join("; ")}. Показано то, что доступно.`)
          : null,
        byDay.size
          ? [...byDay.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([key, list]) =>
              h("section", { class: "ks-card" },
                h("header", null, h("h2", null, formatDay(list[0].start))),
                h("ul", { class: "ks-list" }, list.sort((a, b) => a.start.localeCompare(b.start)).map((e) =>
                  listItem(
                    h("span", null, e.title, e.recurring ? h("span", { class: "ks-muted" }, " ↻") : null, e.read_only ? [" ", badge("только чтение", "neutral")] : null),
                    `${e.all_day ? "весь день" : `${formatTime(e.start)}–${formatTime(e.end)}`}${e.location ? ` · ${e.location}` : ""} · ${e.calendar}`,
                    e.read_only ? null : h("div", { class: "ks-row" },
                      smallButton(T.edit, () => editEvent(runtime, sources, e, refresh)),
                      smallButton(T.delete, async () => { if ((await perform(runtime, "calendar.delete", { ref: e.ref }, { confirm: { title: "Удалить событие", message: `«${e.title}» будет удалено из календаря.` } })).ok) { refresh(); } }, "danger"),
                    ),
                  ),
                )),
              ),
            )
          : emptyLine(`На ближайшие ${days} дней событий нет.`),
      );
    },
  });
  moreButton.onclick = () => {
    days += 14;
    handle.refresh();
  };
  host.replaceChildren(h("div", { class: "ks-page" }, pageHead(T.calendar, addButton), content, h("div", { class: "ks-row" }, moreButton)));
  void runtime.readData<{ timezone: string }>("domovoy.api", { path: "api/state" }).then((r) => r.ok && setServerTimezone(r.data.timezone));
  liveRefresh(runtime, disposer, ["calendar"], () => handle.refresh());
  disposer.add(() => handle.dispose());
  return view(disposer);
}
