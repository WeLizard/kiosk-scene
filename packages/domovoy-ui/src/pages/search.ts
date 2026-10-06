import { Disposer, badge, debounce, h, replaceChildren, spinner } from "@kiosk-scene/app-shell";
import type { ExtensionRuntime, MountedView } from "@kiosk-scene/core";
import { T } from "../i18n.js";
import type { SearchHit } from "../types.js";
import { emptyLine, keepFocus, listItem, liveRefresh, read, view } from "./common.js";
import { openItemDialog } from "./inventory.js";

interface SearchResponse {
  query: string;
  mode: string;
  embedder: string;
  hits: SearchHit[];
}

const KIND_PAGE: Record<string, string> = { location: "domovoy.locations", note: "domovoy.memory", task: "domovoy.tasks", event: "domovoy.calendar" };

export function mountSearch(host: HTMLElement, params: Record<string, unknown>, runtime: ExtensionRuntime): MountedView {
  const disposer = new Disposer();
  const active = new Set<string>();
  const input = h("input", { class: "ks-input dv-command", type: "search", placeholder: T.search_placeholder, "aria-label": T.search, autocomplete: "off", value: String(params.q ?? "") });
  const chips = h("div", { class: "ks-row dv-chips" });
  const results = h("div", { class: "dv-results", "aria-live": "polite" });
  const meta = h("p", { class: "ks-muted dv-search-meta" });
  let sequence = 0;
  let controller: AbortController | null = null;

  const renderChips = (): void => keepFocus(chips, () => {
    replaceChildren(
      chips,
      Object.entries(T.kinds).map(([kind, label]) =>
        h("button", {
          type: "button",
          dataset: { key: kind },
          class: `ks-chip${active.has(kind) ? " is-active" : ""}`,
          "aria-pressed": String(active.has(kind)),
          onClick: () => {
            if (active.has(kind)) {
              active.delete(kind);
            } else {
              active.add(kind);
            }
            renderChips();
            void run();
          },
        }, label),
      ),
    );
  });

  const open = (hit: SearchHit): void => {
    if (hit.kind === "item") {
      openItemDialog(runtime, hit.id, () => void run());
    } else if (KIND_PAGE[hit.kind]) {
      runtime.navigate(KIND_PAGE[hit.kind], { id: String(hit.id) });
    }
  };

  const run = async (): Promise<void> => {
    const q = input.value.trim();
    controller?.abort();
    const mine = (sequence += 1);
    if (!q) {
      replaceChildren(results, h("p", { class: "ks-muted" }, "Ищет по вещам, местам, заметкам, задачам и событиям — даже с опечатками."));
      meta.textContent = "";
      return;
    }
    controller = new AbortController();
    replaceChildren(results, spinner());
    const result = await read<SearchResponse>(runtime, "api/search", { q, kinds: [...active].join(",") || undefined, limit: 30 }, controller.signal);
    if (mine !== sequence) {
      return;
    }
    if (!result.ok) {
      if (result.error.code !== "aborted") {
        replaceChildren(results, h("p", { class: "ks-error" }, result.error.message));
      }
      return;
    }
    const { hits, embedder, mode } = result.data;
    meta.textContent = `${mode === "hybrid" ? "Смысловой поиск" : "Поиск по словам и опечаткам"} · ${embedder}`;
    replaceChildren(
      results,
      hits.length
        ? h("ul", { class: "ks-list ks-list-click" }, hits.map((hit) => {
            const li = listItem(
              h("span", null, badge(T.kinds[hit.kind] ?? hit.kind, "info"), " ", hit.title),
              hit.snippet,
            );
            li.tabIndex = 0;
            li.setAttribute("role", "button");
            li.addEventListener("click", () => open(hit));
            li.addEventListener("keydown", (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                open(hit);
              }
            });
            return li;
          }))
        : emptyLine(`Ничего не нашлось по «${q}». Возможно, я этого ещё не запоминал.`),
    );
  };

  const debounced = debounce(() => void run(), 250);
  input.addEventListener("input", () => debounced());
  disposer.add(() => debounced.cancel());
  disposer.add(() => controller?.abort());
  renderChips();
  replaceChildren(host, h("div", { class: "ks-page" }, h("div", { class: "ks-card" }, input, chips, meta), results));
  void run();
  liveRefresh(runtime, disposer, ["items", "locations", "notes", "tasks", "calendar"], () => void run(), 500);
  return view(disposer);
}
