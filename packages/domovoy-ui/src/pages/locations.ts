import { Disposer, asyncView, badge, button, h } from "@kiosk-scene/app-shell";
import type { ExtensionRuntime, MountedView } from "@kiosk-scene/core";
import { T } from "../i18n.js";
import type { LocationNode } from "../types.js";
import { formDialog, liveRefresh, pageHead, perform, smallButton, view } from "./common.js";

const KIND_LABELS: Record<string, string> = { home: "дом", room: "комната", cabinet: "шкаф", shelf: "полка", box: "коробка", cell: "ячейка", place: "место" };
const KIND_OPTIONS = Object.entries(KIND_LABELS).map(([value, label]) => ({ value, label }));

function flatten(nodes: LocationNode[], out: LocationNode[] = []): LocationNode[] {
  for (const node of nodes) {
    out.push(node);
    flatten(node.children, out);
  }
  return out;
}

export function mountLocations(host: HTMLElement, _params: Record<string, unknown>, runtime: ExtensionRuntime): MountedView {
  const disposer = new Disposer();
  const content = h("div");
  const addButton = button(T.add, { variant: "primary" });

  const edit = (node: LocationNode | null, parent: LocationNode | null, tree: LocationNode[], refresh: () => void): void => {
    const candidates = flatten(tree).filter((n) => !node || (n.id !== node.id && !n.path.join("\u0000").startsWith(node.path.join("\u0000") + "\u0000")));
    void formDialog(
      node ? `Изменить: ${node.name}` : parent ? `Новое место внутри «${parent.name}»` : "Новое место",
      [
        { name: "name", label: T.name, required: true, value: node?.name ?? "", wide: true },
        { name: "kind", label: "Тип", type: "select", options: KIND_OPTIONS, value: node?.kind ?? (parent ? "box" : "room") },
        { name: "parent_id", label: "Внутри", type: "select", options: [{ value: "", label: "— верхний уровень —" }, ...candidates.map((n) => ({ value: String(n.id), label: n.path.join(" → ") }))], value: String((node ? node.parent_id : parent?.id) ?? ""), wide: true },
        { name: "notes", label: T.notes, type: "textarea", rows: 2, value: node?.notes ?? "", wide: true },
      ],
      async (values) => {
        const body = { name: String(values.name).trim(), kind: String(values.kind), notes: String(values.notes ?? ""), parent_id: values.parent_id ? Number(values.parent_id) : null };
        const result = node ? await runtime.invokeAction("domovoy.actions", "locations.update", { id: node.id, ...body }) : await runtime.invokeAction("domovoy.actions", "locations.create", body);
        if (result.ok) {
          refresh();
        }
        return result;
      },
    );
  };

  const renderNode = (node: LocationNode, tree: LocationNode[], refresh: () => void): HTMLElement =>
    h("li", { class: "dv-loc" },
      h("div", { class: "dv-loc-row" },
        h("span", { class: "dv-loc-name" }, node.name, " ", badge(KIND_LABELS[node.kind] ?? node.kind, "neutral")),
        h("span", { class: "ks-muted" }, node.item_count ? `${node.item_count} вещ.` : ""),
        h("span", { class: "ks-row dv-loc-actions" },
          node.item_count ? smallButton("Вещи", () => runtime.navigate("domovoy.inventory", { location_id: String(node.id) }), "ghost") : null,
          smallButton("+ Внутрь", () => edit(null, node, tree, refresh), "ghost"),
          smallButton(T.edit, () => edit(node, null, tree, refresh)),
          smallButton(T.delete, async () => { if ((await perform(runtime, "locations.delete", { id: node.id }, { confirm: { title: "Удалить место", message: `«${node.name}» будет удалено (только если оно пустое).` } })).ok) { refresh(); } }, "danger"),
        ),
      ),
      node.children.length ? h("ul", { class: "dv-loc-tree" }, node.children.map((c) => renderNode(c, tree, refresh))) : null,
    );

  const handle = asyncView<{ tree: LocationNode[] }>({
    host: content,
    load: (signal) => runtime.readData("domovoy.api", { path: "api/locations/tree" }, { signal }),
    render: ({ tree }, refresh) => {
      addButton.onclick = () => edit(null, null, tree, refresh);
      return tree.length
        ? h("ul", { class: "dv-loc-tree dv-loc-root" }, tree.map((n) => renderNode(n, tree, refresh)))
        : h("div", { class: "ks-empty" }, h("strong", null, "Мест ещё нет"), h("p", null, "Они появятся сами, когда вы скажете «положил в третью коробку нижнего шкафа», или добавьте вручную."));
    },
  });
  host.replaceChildren(h("div", { class: "ks-page" }, pageHead(T.locations, addButton), h("div", { class: "ks-card" }, content)));
  liveRefresh(runtime, disposer, ["locations", "items"], () => handle.refresh());
  disposer.add(() => handle.dispose());
  return view(disposer);
}
