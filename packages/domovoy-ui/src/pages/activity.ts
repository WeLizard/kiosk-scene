import { Disposer, asyncView, badge, h, replaceChildren } from "@kiosk-scene/app-shell";
import type { ExtensionRuntime, MountedView } from "@kiosk-scene/core";
import { describeIntent } from "../intents.js";
import { T } from "../i18n.js";
import type { AuditRow, CommandRecord, OutboxRow } from "../types.js";
import { formatDateTime } from "../util.js";
import { card, emptyLine, keepFocus, listItem, liveRefresh, pageHead, perform, read, smallButton, statusBadge, view } from "./common.js";

type Tab = "audit" | "commands" | "outbox";

const TABS: Array<[Tab, string]> = [["audit", "Изменения"], ["commands", "Команды"], ["outbox", "Отправка сообщений"]];

export function mountActivity(host: HTMLElement, _params: Record<string, unknown>, runtime: ExtensionRuntime): MountedView {
  const disposer = new Disposer();
  const content = h("div");
  const tabs = h("div", { class: "ks-row dv-chips", role: "tablist" });
  let tab: Tab = "audit";
  let handle: { refresh(): void; dispose(): void } | null = null;

  const mountTab = (): void => {
    handle?.dispose();
    keepFocus(tabs, () => replaceChildren(tabs, TABS.map(([id, label]) =>
      h("button", { type: "button", role: "tab", dataset: { key: id }, class: `ks-chip${tab === id ? " is-active" : ""}`, "aria-selected": String(tab === id), onClick: () => { tab = id; mountTab(); } }, label),
    )));
    if (tab === "audit") {
      handle = asyncView<{ audit: AuditRow[] }>({
        host: content,
        load: (signal) => read(runtime, "api/audit", { limit: 100 }, signal),
        render: ({ audit }, refresh) =>
          audit.length
            ? h("ul", { class: "ks-list" }, audit.map((row) =>
                listItem(
                  h("span", null, row.summary, " ", badge(row.source, "neutral")),
                  `${formatDateTime(row.ts)} · ${row.actor}`,
                  row.undoable ? smallButton(T.undo, async () => { if ((await perform(runtime, "audit.undo", { id: row.id }, { success: "Отменено" })).ok) { refresh(); } }, "ghost") : null,
                ),
              ))
            : emptyLine("Изменений пока не было."),
      });
    } else if (tab === "commands") {
      handle = asyncView<{ commands: CommandRecord[] }>({
        host: content,
        load: (signal) => read(runtime, "api/commands", { limit: 100 }, signal),
        render: ({ commands }) =>
          commands.length
            ? h("ul", { class: "ks-list" }, commands.map((c) =>
                listItem(
                  h("span", null, `«${c.text}»`, " ", statusBadgeFor(c.status)),
                  [formatDateTime(c.ts), c.frontend, c.interpreter ?? "", c.confidence !== null ? `${Math.round(c.confidence * 100)}%` : "", c.reply ?? c.error ?? ""].filter(Boolean).join(" · "),
                  c.intents?.length ? h("details", null, h("summary", null, "Как я понял"), h("ul", null, c.intents.map((i) => h("li", null, describeIntent(i, (iso) => formatDateTime(iso)))))) : null,
                ),
              ))
            : emptyLine("Команд пока не было."),
      });
    } else {
      handle = asyncView<{ messages: OutboxRow[] }>({
        host: content,
        load: (signal) => read(runtime, "api/outbox", { limit: 100 }, signal),
        render: ({ messages }, refresh) =>
          messages.length
            ? h("ul", { class: "ks-list" }, messages.map((m) =>
                listItem(
                  h("span", null, m.text, " ", statusBadge(m.status)),
                  `${T.channels[m.channel] ?? m.channel} → ${m.recipient || "—"} · ${formatDateTime(m.created_at)}${m.attempts ? ` · попыток: ${m.attempts}` : ""}${m.last_error ? ` · ${m.last_error}` : ""}`,
                  h("div", { class: "ks-row" },
                    m.status === "failed" || m.status === "queued" ? smallButton("Повторить", async () => { if ((await perform(runtime, "outbox.retry", { id: m.id })).ok) { refresh(); } }, "primary") : null,
                    m.status === "failed" || m.status === "queued" ? smallButton(T.cancel, async () => { if ((await perform(runtime, "outbox.cancel", { id: m.id })).ok) { refresh(); } }, "danger") : null,
                  ),
                ),
              ))
            : emptyLine("Исходящих сообщений не было."),
      });
    }
  };

  const statusBadgeFor = (status: string): HTMLElement => statusBadge(status);
  mountTab();
  replaceChildren(host, h("div", { class: "ks-page" }, pageHead(T.activity), tabs, card("", content)));
  liveRefresh(runtime, disposer, ["audit", "commands", "outbox", "items", "locations", "notes", "tasks", "reminders", "calendar"], () => handle?.refresh(), 500);
  disposer.add(() => handle?.dispose());
  return view(disposer);
}
