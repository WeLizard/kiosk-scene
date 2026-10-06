import { Disposer, asyncView, button, form, h, openDialog, replaceChildren, toast, type FieldOptions } from "@kiosk-scene/app-shell";
import type { ExtensionRuntime, MountedView } from "@kiosk-scene/core";
import { INTENT_SPECS, applyEdits, describeIntent, fieldText, intentTitle } from "../intents.js";
import { T } from "../i18n.js";
import type { ReviewItem } from "../types.js";
import { formatDateTime, isoToLocalInput, zonedToIso } from "../util.js";
import { card, keepFocus, liveRefresh, pageHead, perform, read, smallButton, statusBadge, view } from "./common.js";

type Intent = Record<string, unknown>;

interface ApproveResult {
  ok: boolean;
  still_pending?: boolean;
  results: Array<{ ok: boolean; message: string }>;
}

/**
 * Approving can succeed as a request and still change nothing (an ambiguous item, a provider that is down): the server
 * then keeps the item in the queue. Say so, instead of a green "done".
 */
async function approveVia(runtime: ExtensionRuntime, id: number, proposal: Intent[] | undefined, success: string): Promise<boolean> {
  const result = await perform<ApproveResult>(runtime, "review.approve", proposal ? { id, proposal } : { id });
  if (!result.ok) {
    return false;
  }
  const failed = result.data.results.filter((r) => !r.ok).map((r) => r.message);
  if (result.data.still_pending) {
    toast(`Не выполнено, осталось в очереди: ${failed.join(" ")}`, "bad", 9000);
    return false;
  }
  toast(failed.length ? `Выполнено частично. ${failed.join(" ")}` : success, failed.length ? "warn" : "good", failed.length ? 9000 : 4500);
  return true;
}

function editDialog(runtime: ExtensionRuntime, item: ReviewItem, onDone: () => void): void {
  const dialog = openDialog("Проверить и поправить", (close) => {
    const forms = item.proposal.map((intent) => {
      const spec = INTENT_SPECS[String(intent.type)];
      const fields: FieldOptions[] = (spec?.fields ?? [])
        .filter((f) => f.kind !== "json")
        .map((f) => {
          const raw = intent[f.name];
          const value = f.kind === "iso" && typeof raw === "string" ? isoToLocalInput(raw) : f.kind === "bool" ? raw === true : fieldText(f, raw);
          return {
            name: f.name,
            label: f.label,
            type: f.kind === "bool" ? "checkbox" : f.kind === "enum" ? "select" : f.kind === "iso" ? "datetime-local" : f.kind === "num" ? "text" : "text",
            value: value as string | boolean,
            options: f.options?.map((o) => ({ value: o, label: T.channels[o] ?? T.lists[o] ?? ({ set: "заменить на это число", add: "прибавить к имеющемуся" } as Record<string, string>)[o] ?? o })),
            wide: true,
          } satisfies FieldOptions;
        });
      return { intent, fields, handle: form(fields, { submitLabel: T.save, onSubmit: () => undefined }) };
    });
    const save = async (): Promise<void> => {
      const proposal = forms.map(({ intent, handle }) => applyEdits(intent, handle.values(), (local) => zonedToIso(local)));
      if (await approveVia(runtime, item.id, proposal, "Выполнено с вашими правками")) {
        close(true);
        onDone();
      }
    };
    return h(
      "div",
      null,
      h("p", { class: "ks-muted" }, `Вы сказали: «${item.command_text ?? ""}». ${item.reason}`),
      forms.map(({ intent, handle }) => h("fieldset", { class: "dv-intent" }, h("legend", null, intentTitle(String(intent.type))), h("div", { class: "ks-form-grid" }, Object.values(handle.fields).map((f) => f.el)))),
      h("div", { class: "ks-form-actions" }, button("Применить с правками", { variant: "primary", onClick: () => void save() }), button(T.cancel, { onClick: () => close(false) })),
    );
  });
  void dialog;
}

export function mountReview(host: HTMLElement, _params: Record<string, unknown>, runtime: ExtensionRuntime): MountedView {
  const disposer = new Disposer();
  const content = h("div");
  const approve = async (id: number, proposal: Intent[] | undefined, refresh: () => void): Promise<void> => {
    if (await approveVia(runtime, id, proposal, "Выполнено")) {
      refresh();
    }
  };
  let status: "pending" | "approved" | "rejected" = "pending";
  const tabs = h("div", { class: "ks-row dv-chips" });

  const renderTabs = (): void => keepFocus(tabs, () => {
    replaceChildren(tabs, (["pending", "approved", "rejected"] as const).map((s) =>
      h("button", { type: "button", dataset: { key: s }, class: `ks-chip${status === s ? " is-active" : ""}`, "aria-pressed": String(status === s), onClick: () => { status = s; renderTabs(); handle.refresh(); } }, s === "pending" ? "Ждут решения" : s === "approved" ? "Принятые" : "Отклонённые"),
    ));
  });

  const handle = asyncView<{ items: ReviewItem[] }>({
    host: content,
    load: (signal) => read<{ items: ReviewItem[] }>(runtime, "api/review", { status }, signal),
    render: ({ items }, refresh) =>
      items.length
        ? h("div", { class: "ks-grid" }, items.map((item) =>
            card(
              h("span", null, `«${item.command_text ?? "—"}»`),
              h("div", null,
                h("p", { class: "ks-muted" }, `${formatDateTime(item.ts)} · уверенность ${item.confidence === null ? "—" : Math.round(item.confidence * 100) + "%"} · ${item.reason}`),
                h("ul", { class: "ks-list" }, item.proposal.map((intent: Intent) => h("li", null, describeIntent(intent, (iso) => formatDateTime(iso))))),
                status === "pending"
                  ? h("div", { class: "ks-row" },
                      smallButton("Подтвердить", async () => { await approve(item.id, undefined, refresh); }, "primary"),
                      smallButton("Поправить…", () => editDialog(runtime, item, refresh)),
                      smallButton(T.reject, async () => { if ((await perform(runtime, "review.reject", { id: item.id })).ok) { refresh(); } }, "danger"),
                    )
                  : statusBadge(item.status),
              ),
            ),
          ))
        : h("div", { class: "ks-empty" }, h("strong", null, status === "pending" ? "Всё проверено" : "Пусто"), h("p", null, status === "pending" ? "Неуверенные команды попадают сюда — я ничего не записываю без вашего подтверждения." : "")),
  });

  renderTabs();
  replaceChildren(host, h("div", { class: "ks-page" }, pageHead(T.review), h("p", { class: "ks-muted" }, "Здесь команды, в которых я не уверен, и всё, что предложила языковая модель. Пока вы не подтвердите, ничего не изменилось."), tabs, content));
  liveRefresh(runtime, disposer, ["review", "commands"], () => handle.refresh());
  disposer.add(() => handle.dispose());
  return view(disposer);
}
