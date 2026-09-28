import { Disposer, asyncView, button, field, h, replaceChildren } from "@kiosk-scene/app-shell";
import type { ExtensionRuntime, MountedView } from "@kiosk-scene/core";
import { T } from "../i18n.js";
import type { Item, Note } from "../types.js";
import { formatDateTime, fmtQuantity } from "../util.js";
import { both, card, emptyLine, formDialog, listItem, liveRefresh, pageHead, perform, read, smallButton, view } from "./common.js";
import { commandBar } from "./today.js";

function noteForm(runtime: ExtensionRuntime, note: Note | null, onDone: () => void): void {
  void formDialog(
    note ? "Изменить заметку" : "Новая заметка",
    [
      { name: "title", label: "Заголовок", value: note?.title ?? "", wide: true },
      { name: "body", label: "Текст", type: "textarea", rows: 6, required: true, value: note?.body ?? "", wide: true },
      { name: "tags", label: "Теги", value: (note?.tags ?? []).join(", "), hint: "Через запятую", wide: true },
    ],
    async (values) => {
      const body = { title: String(values.title ?? "").trim(), body: String(values.body).trim(), tags: String(values.tags ?? "").split(",").map((t) => t.trim()).filter(Boolean) };
      const result = note ? await runtime.invokeAction("domovoy.actions", "notes.update", { id: note.id, ...body }) : await runtime.invokeAction("domovoy.actions", "notes.create", body);
      if (result.ok) {
        onDone();
      }
      return result;
    },
  );
}

/** Memory = what the household told Domovoy to remember: free-form notes plus the things it has placed. */
export function mountMemory(host: HTMLElement, _params: Record<string, unknown>, runtime: ExtensionRuntime): MountedView {
  const disposer = new Disposer();
  const content = h("div");
  let q = "";
  const filter = field({ name: "q", label: "Поиск по заметкам", placeholder: "слово из заголовка или текста" });
  const addButton = button(T.add, { variant: "primary" });

  const handle = asyncView<[{ notes: Note[] }, { items: Item[] }]>({
    host: content,
    load: (signal) => both(
      read<{ notes: Note[] }>(runtime, "api/notes", { q: q || undefined }, signal),
      read<{ items: Item[] }>(runtime, "api/items", { limit: 8 }, signal),
    ),
    render: ([{ notes }, { items }], refresh) => {
      addButton.onclick = () => noteForm(runtime, null, refresh);
      return h(
        "div",
        { class: "ks-grid" },
        card(
          "Заметки",
          notes.length
            ? h("ul", { class: "ks-list" }, notes.map((n) =>
                listItem(
                  n.title || n.body.slice(0, 60),
                  h("span", null, n.title ? n.body.slice(0, 200) : "", n.tags.length ? ` · #${n.tags.join(" #")}` : "", ` · ${formatDateTime(n.updated_at)}`),
                  h("div", { class: "ks-row" },
                    smallButton(T.edit, () => noteForm(runtime, n, refresh)),
                    smallButton(T.delete, async () => { if ((await perform(runtime, "notes.delete", { id: n.id }, { confirm: { title: "Удалить заметку", message: n.title || n.body.slice(0, 80) } })).ok) { refresh(); } }, "danger"),
                  ),
                ),
              ))
            : emptyLine(q ? "Ничего не найдено." : "Заметок пока нет. Скажите «запомни, что код домофона 4711»."),
        ),
        card(
          "Недавно запомнено",
          items.length
            ? h("ul", { class: "ks-list" }, items.map((i) => listItem(`${i.name}${i.quantity !== null ? ` — ${fmtQuantity(i.quantity, i.unit)}` : ""}`, `${i.location_text || "место не указано"} · ${formatDateTime(i.updated_at)}`)))
            : emptyLine(),
        ),
      );
    },
  });

  filter.input.addEventListener("input", () => {
    q = (filter.input as HTMLInputElement).value.trim();
    handle.refresh();
  });
  replaceChildren(host, h("div", { class: "ks-page" }, pageHead(T.memory, addButton), commandBar(runtime, () => handle.refresh()), h("div", { class: "ks-card ks-filters" }, filter.el), content));
  liveRefresh(runtime, disposer, ["notes", "items", "locations"], () => handle.refresh());
  disposer.add(() => handle.dispose());
  return view(disposer);
}
