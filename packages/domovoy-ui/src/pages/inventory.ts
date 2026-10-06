import { Disposer, asyncView, badge, button, field, h, openDialog, replaceChildren, table } from "@kiosk-scene/app-shell";
import type { ExtensionRuntime, MountedView } from "@kiosk-scene/core";
import { T } from "../i18n.js";
import type { AuditRow, Item, Location } from "../types.js";
import { formatDateTime, fmtQuantity } from "../util.js";
import { both, emptyLine, formDialog, formatProperties, listItem, liveRefresh, pageHead, parsePath, parseProperties, perform, read, smallButton, toNumber, view } from "./common.js";

function locationOptions(locations: Location[], includeNone = true): Array<{ value: string; label: string }> {
  const options = locations
    .slice()
    .sort((a, b) => a.path.join("/").localeCompare(b.path.join("/"), "ru"))
    .map((l) => ({ value: String(l.id), label: l.path.join(" → ") }));
  return includeNone ? [{ value: "", label: "— без места —" }, ...options] : options;
}

/** Add/edit form. Existing place *or* a new one typed as `Шкаф → Полка 2` (created on save). */
export function editItem(runtime: ExtensionRuntime, locations: Location[], item: Item | null, onDone: () => void): Promise<boolean> {
  return formDialog(
    item ? `Изменить: ${item.name}` : "Добавить вещь",
    [
      { name: "name", label: T.name, required: true, value: item?.name ?? "", wide: true },
      { name: "quantity", label: T.quantity, type: "number", step: "any", min: 0, value: item?.quantity ?? "" },
      { name: "unit", label: T.unit, value: item?.unit ?? "", placeholder: "шт, кг, м…" },
      { name: "location_id", label: T.place, type: "select", options: locationOptions(locations), value: item?.location_id ? String(item.location_id) : "", wide: true },
      { name: "new_path", label: "Или новое место", placeholder: "Нижний шкаф → Коробка 3", hint: "Создам недостающие уровни автоматически.", wide: true },
      { name: "category", label: "Категория", value: item?.category ?? "" },
      { name: "properties", label: "Свойства", type: "textarea", rows: 3, value: formatProperties(item?.properties), hint: "По строке: «номинал: 10 кОм»", wide: true },
      { name: "notes", label: T.notes, type: "textarea", rows: 2, value: item?.notes ?? "", wide: true },
    ],
    async (values) => {
      const path = parsePath(String(values.new_path ?? ""));
      const body: Record<string, unknown> = {
        name: String(values.name).trim(),
        quantity: toNumber(values.quantity),
        unit: String(values.unit ?? "").trim(),
        category: String(values.category ?? "").trim(),
        properties: parseProperties(String(values.properties ?? "")),
        notes: String(values.notes ?? ""),
      };
      if (path.length) {
        body.location_path = path;
      } else {
        body.location_id = values.location_id ? Number(values.location_id) : null;
      }
      const result = item ? await runtimeAct(runtime, "items.update", { id: item.id, ...body }) : await runtimeAct(runtime, "items.create", body);
      if (result.ok) {
        onDone();
      }
      return result;
    },
  );
}

function runtimeAct(runtime: ExtensionRuntime, name: string, input: unknown) {
  return runtime.invokeAction("domovoy.actions", name, input);
}

export function openItemDialog(runtime: ExtensionRuntime, id: number, onChange: () => void): void {
  const body = h("div", { class: "dv-item-detail" }, h("p", { class: "ks-muted" }, T.loading));
  const dialog = openDialog("Вещь", body);
  void (async () => {
    const [item, history, locations] = await Promise.all([
      read<{ item: Item }>(runtime, `api/items/${id}`),
      read<{ history: AuditRow[] }>(runtime, `api/items/${id}/history`),
      read<{ locations: Location[] }>(runtime, "api/locations"),
    ]);
    if (!item.ok) {
      replaceChildren(body, h("p", { class: "ks-error" }, item.error.message));
      return;
    }
    const it = item.data.item;
    const changed = (): void => {
      onChange();
      dialog.close();
    };
    replaceChildren(
      body,
      h("h3", null, it.name),
      h("dl", { class: "dv-facts" },
        h("dt", null, T.quantity), h("dd", null, fmtQuantity(it.quantity, it.unit) || T.none),
        h("dt", null, T.place), h("dd", null, it.location_text || "не указано"),
        it.category ? [h("dt", null, "Категория"), h("dd", null, it.category)] : null,
        ...Object.entries(it.properties ?? {}).flatMap(([k, v]) => [h("dt", null, k), h("dd", null, v)]),
        it.notes ? [h("dt", null, T.notes), h("dd", null, it.notes)] : null,
        h("dt", null, "Изменено"), h("dd", null, `${formatDateTime(it.updated_at)} · ${it.source}`),
      ),
      h("div", { class: "ks-row" },
        button(T.edit, { variant: "primary", onClick: () => locations.ok && void editItem(runtime, locations.data.locations, it, changed) }),
        button("Списать 1", { onClick: async () => { if ((await perform(runtime, "items.consume", { id: it.id, quantity: 1 })).ok) { changed(); } } }),
        button(T.delete, { variant: "danger", onClick: async () => { if ((await perform(runtime, "items.delete", { id: it.id }, { confirm: { title: "Удалить вещь", message: `«${it.name}» будет удалена. Это можно отменить в журнале.` } })).ok) { changed(); } } }),
      ),
      h("h4", null, "История"),
      history.ok && history.data.history.length
        ? h("ul", { class: "ks-list" }, history.data.history.slice(0, 12).map((row) => listItem(row.summary, `${formatDateTime(row.ts)} · ${row.actor}/${row.source}`)))
        : emptyLine("Изменений не было."),
    );
  })();
}

export function mountInventory(host: HTMLElement, params: Record<string, unknown>, runtime: ExtensionRuntime): MountedView {
  const disposer = new Disposer();
  let q = "";
  let locationId = String(params.location_id ?? "");
  const content = h("div");
  const filter = field({ name: "q", label: "Фильтр", placeholder: "название или заметка" });
  const where = field({ name: "loc", label: T.place, type: "select", options: [{ value: "", label: "Везде" }], value: locationId });
  let lastLocations: Location[] = [];

  const handle = asyncView<[{ items: Item[] }, { locations: Location[] }]>({
    host: content,
    load: (signal) => both(
      read<{ items: Item[] }>(runtime, "api/items", { q: q || undefined, location_id: locationId || undefined, limit: 500 }, signal),
      read<{ locations: Location[] }>(runtime, "api/locations", undefined, signal),
    ),
    render: ([{ items }, { locations }], refresh) => {
      lastLocations = locations;
      const select = where.input as HTMLSelectElement;
      const options = [{ value: "", label: "Везде" }, ...locationOptions(locations, false)];
      replaceChildren(select, options.map((o) => h("option", { value: o.value, selected: o.value === locationId }, o.label)));
      select.value = locationId;
      return h(
        "div",
        null,
        table<Item>(
          [
            { key: "name", header: T.name, render: (i) => h("button", { class: "ks-link", type: "button", onClick: () => openItemDialog(runtime, i.id, refresh) }, i.name) },
            { key: "qty", header: T.quantity, render: (i) => (i.quantity === 0 ? badge("нет", "warn") : fmtQuantity(i.quantity, i.unit) || T.none) },
            { key: "place", header: T.place, render: (i) => i.location_text || T.none },
            { key: "updated", header: "Изменено", render: (i) => formatDateTime(i.updated_at), className: "ks-hide-narrow" },
            {
              key: "actions", header: "", render: (i) => h("div", { class: "ks-row" },
                smallButton(T.edit, () => void editItem(runtime, locations, i, refresh)),
                smallButton(T.delete, async () => { if ((await perform(runtime, "items.delete", { id: i.id }, { confirm: { title: "Удалить вещь", message: `«${i.name}» будет удалена. Это можно отменить в журнале.` } })).ok) { refresh(); } }, "danger"),
              ),
            },
          ],
          items,
          h("div", { class: "ks-empty" }, h("strong", null, "Здесь пока пусто"), h("p", null, "Скажите «запомни: девять резисторов лежат в третьей коробке» или добавьте вручную.")),
        ),
        h("p", { class: "ks-muted" }, `${items.length} шт.${items.length >= 500 ? " (показаны первые 500 — уточните фильтр)" : ""}`),
      );
    },
  });

  const reload = (): void => handle.refresh();
  filter.input.addEventListener("input", () => {
    q = (filter.input as HTMLInputElement).value.trim();
    reload();
  });
  where.input.addEventListener("change", () => {
    locationId = (where.input as HTMLSelectElement).value;
    reload();
  });
  replaceChildren(
    host,
    h("div", { class: "ks-page" },
      pageHead(T.inventory, button(T.add, { variant: "primary", onClick: () => void editItem(runtime, lastLocations, null, reload) })),
      h("div", { class: "ks-card ks-filters" }, filter.el, where.el),
      content,
    ),
  );
  liveRefresh(runtime, disposer, ["items", "locations"], reload);
  disposer.add(() => handle.dispose());
  return view(disposer);
}
