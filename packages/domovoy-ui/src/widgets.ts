import { Disposer, asyncView, h, replaceChildren } from "@kiosk-scene/app-shell";
import type { ExtensionRuntime, MountedView, WidgetDefinition } from "@kiosk-scene/core";
import { commandBar } from "./pages/today.js";
import { emptyLine, liveRefresh, perform, read, smallButton, view } from "./pages/common.js";
import type { CalEvent, TodayPayload } from "./types.js";
import { dayKey, formatTime, relative, setServerTimezone } from "./util.js";

const asCount = (value: unknown, fallback: number, max: number): number => {
  const n = Number(value);
  return Number.isFinite(n) && n >= 1 ? Math.min(max, Math.floor(n)) : fallback;
};

function todayWidget(id: string, title: string, render: (data: TodayPayload, refresh: () => void, props: Record<string, unknown>, runtime: ExtensionRuntime) => HTMLElement): WidgetDefinition {
  return {
    id,
    title,
    mount(host, props, runtime): MountedView {
      const disposer = new Disposer();
      const root = h("div", { class: `ks-scope dv-widget ${id.replace(".", "-")}`, dataset: { noSwipe: "true", theme: "kiosk" } });
      replaceChildren(host, root);
      let current = props;
      const handle = asyncView<TodayPayload>({
        host: root,
        load: (signal) => read<TodayPayload>(runtime, "api/today", undefined, signal),
        render: (data, refresh) => {
          setServerTimezone(data.timezone);
          return render(data, refresh, current, runtime);
        },
      });
      liveRefresh(runtime, disposer, ["calendar", "reminders", "tasks"], () => handle.refresh(), 400);
      // The "next event" text is relative ("in 12 min"): keep it honest without waiting for a server event.
      const tick = window.setInterval(() => handle.refresh(), 60_000);
      disposer.add(() => window.clearInterval(tick));
      disposer.add(() => handle.dispose());
      return {
        update(next) {
          current = next;
          handle.refresh();
        },
        dispose: () => disposer.dispose(),
      };
    },
  };
}

function upcoming(data: TodayPayload): CalEvent[] {
  const now = new Date(data.now).getTime();
  return data.events.filter((e) => e.all_day || new Date(e.end).getTime() > now);
}

export const WIDGETS: WidgetDefinition[] = [
  todayWidget("domovoy.next-event", "Ближайшее событие", (data) => {
    const [next] = upcoming(data).filter((e) => !e.all_day);
    const [allDay] = upcoming(data).filter((e) => e.all_day && dayKey(e.start, data.timezone) === dayKey(data.now, data.timezone));
    const event = next ?? allDay;
    return event
      ? h("div", { class: "dv-next" }, h("div", { class: "dv-next-when" }, event.all_day ? "сегодня" : `${formatTime(event.start, data.timezone)} · ${relative(event.start, new Date(data.now).getTime())}`), h("div", { class: "dv-next-title" }, event.title), event.location ? h("div", { class: "ks-muted" }, event.location) : null)
      : h("div", { class: "dv-next" }, h("div", { class: "ks-muted" }, "Ближайших событий нет"));
  }),

  todayWidget("domovoy.today", "Сегодня", (data, _refresh, props) => {
    const events = upcoming(data).slice(0, asCount(props.maxEvents, 4, 10));
    const reminders = data.reminders.slice(0, asCount(props.maxReminders, 4, 10));
    return h(
      "div",
      { class: "dv-today-widget" },
      events.length ? h("ul", { class: "ks-list" }, events.map((e) => h("li", null, h("span", { class: "dv-time" }, e.all_day ? "весь день" : formatTime(e.start, data.timezone)), " ", e.title))) : emptyLine("Событий нет"),
      reminders.length ? h("ul", { class: "ks-list dv-reminders" }, reminders.map((r) => h("li", { class: r.state === "fired" ? "dv-fired" : "" }, "🔔 ", r.text))) : null,
      data.review_count ? h("div", { class: "ks-muted" }, `Ждёт проверки: ${data.review_count}`) : null,
    );
  }),

  todayWidget("domovoy.shopping", "Покупки", (data, refresh, props, runtime) => {
    const items = data.shopping.slice(0, asCount(props.max, 8, 30));
    return items.length
      ? h("ul", { class: "ks-list dv-shopping" }, items.map((t) => h("li", null, h("span", { class: "ks-grow" }, t.title), smallButton("✓", async () => { if ((await perform(runtime, "tasks.complete", { id: t.id })).ok) { refresh(); } }, "ghost", "Куплено"))))
      : emptyLine("Список покупок пуст");
  }),

  {
    id: "domovoy.command",
    title: "Командная строка",
    mount(host, _props, runtime): MountedView {
      const disposer = new Disposer();
      const root = h("div", { class: "ks-scope dv-widget", dataset: { noSwipe: "true", theme: "kiosk" } }, commandBar(runtime, () => runtime.refresh()));
      replaceChildren(host, root);
      return view(disposer);
    },
  },
];
