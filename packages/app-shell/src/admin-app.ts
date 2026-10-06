import {
  createExtensionRuntime,
  ServiceRunner,
  type ExtensionRegistry,
  type ExtensionRuntime,
  type MountedView,
  type PageDefinition,
  type RealtimeStatus,
} from "@kiosk-scene/core";
import { h, replaceChildren } from "./dom.js";
import { button, errorState, spinner } from "./ui.js";

export interface AdminAppOptions {
  registry: ExtensionRegistry;
  title?: string;
  locale?: string;
  resolveUrl?: (url: string) => string;
  /** Page shown when the hash is empty. Defaults to the first page in navigation order. */
  defaultPageId?: string;
  /** Extra links shown at the bottom of the navigation (e.g. kiosk view, editor). */
  footerLinks?: Array<{ label: string; href: string }>;
  labels?: Partial<AdminLabels>;
}

export interface AdminLabels {
  sections: string;
  menu: string;
  noPages: string;
  noPagesHint: string;
  notFound: string;
  live: string;
  reconnecting: string;
  offline: string;
  connecting: string;
}

const DEFAULT_LABELS: AdminLabels = {
  sections: "Sections",
  menu: "Menu",
  noPages: "No applications are installed",
  noPagesHint: "Enable an extension in the add-on options to see its pages here.",
  notFound: "This page does not exist",
  live: "Live",
  reconnecting: "Reconnecting…",
  offline: "Offline — showing saved data",
  connecting: "Connecting…",
};

export interface AdminAppHandle {
  navigate(pageId: string, params?: Record<string, string>): void;
  dispose(): void;
}

export function parseRoute(hash: string): { pageId: string; params: Record<string, string> } {
  const trimmed = hash.replace(/^#\/?/, "");
  const [rawPage, rawQuery = ""] = trimmed.split("?");
  const params: Record<string, string> = {};
  for (const [key, value] of new URLSearchParams(rawQuery)) {
    params[key] = value;
  }
  let pageId = rawPage;
  try {
    pageId = decodeURIComponent(rawPage);
  } catch {
    // Keep the raw value; lookup will simply fail and show "not found".
  }
  return { pageId, params };
}

export function buildRoute(pageId: string, params?: Record<string, string>): string {
  const query = new URLSearchParams(params ?? {}).toString();
  return `#/${encodeURIComponent(pageId)}${query ? `?${query}` : ""}`;
}

/**
 * Desktop/mobile administration shell: sidebar on wide screens, top bar + drawer + quick
 * bottom bar on phones. It only knows about registered pages — it has no idea what they do.
 */
export function mountAdminApp(root: HTMLElement, options: AdminAppOptions): AdminAppHandle {
  const labels = { ...DEFAULT_LABELS, ...(options.labels ?? {}) };
  const { registry } = options;
  let disposed = false;
  let current: { pageId: string; view: MountedView | null } | null = null;
  let navigationSeq = 0;

  const runtime: ExtensionRuntime = createExtensionRuntime({
    registry,
    mode: "admin",
    locale: options.locale,
    resolveUrl: options.resolveUrl,
    navigate: (pageId, params) => navigate(pageId, params),
  });

  const services = new ServiceRunner(registry, "admin", runtime, (id, error) => console.warn(`Extension service ${id} failed`, error));
  services.start();

  const view = h("main", { class: "ks-main-view", id: "ks-view", tabindex: -1 });
  const title = h("h1", { class: "ks-topbar-title" });
  const statusPill = h("span", { class: "ks-conn", dataset: { state: "connecting" }, role: "status" }, labels.connecting);
  const navList = h("nav", { class: "ks-nav-list", aria: { label: labels.sections } });
  const bottomNav = h("nav", { class: "ks-bottom-nav", aria: { label: labels.sections } });
  const shell = h("div", { class: "ks-admin", dataset: { menu: "closed" } });

  function pages(): PageDefinition[] {
    return registry.listPages("admin");
  }

  function navLink(page: PageDefinition, className: string): HTMLAnchorElement {
    return h(
      "a",
      { class: className, href: buildRoute(page.id), dataset: { pageId: page.id }, onClick: () => setMenu(false, false) },
      h("span", { class: "ks-nav-icon", aria: { hidden: true } }, page.icon ?? page.title.slice(0, 1)),
      h("span", { class: "ks-nav-label" }, page.title),
    );
  }

  function renderNav(): void {
    const list = pages();
    const groups = new Map<string, PageDefinition[]>();
    for (const page of list) {
      const key = page.group ?? "";
      groups.set(key, [...(groups.get(key) ?? []), page]);
    }
    const nodes: Array<HTMLElement> = [];
    for (const [group, items] of groups) {
      if (group) {
        nodes.push(h("div", { class: "ks-nav-group" }, group));
      }
      nodes.push(...items.map((page) => navLink(page, "ks-nav-item")));
    }
    replaceChildren(navList, nodes);
    replaceChildren(bottomNav, list.slice(0, 4).map((page) => navLink(page, "ks-bottom-item")));
    markActive();
  }

  function markActive(): void {
    const active = current?.pageId ?? "";
    for (const link of shell.querySelectorAll<HTMLAnchorElement>("[data-page-id]")) {
      if (link.dataset.pageId === active) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    }
  }

  function updateStatus(): void {
    const sources = registry.listRealtimeSources();
    let state: RealtimeStatus = "live";
    if (!sources.length) {
      statusPill.hidden = true;
      return;
    }
    statusPill.hidden = false;
    const statuses = sources.map((source) => source.status());
    if (statuses.includes("offline")) {
      state = "offline";
    } else if (statuses.includes("reconnecting")) {
      state = "reconnecting";
    } else if (statuses.includes("connecting")) {
      state = "connecting";
    }
    statusPill.dataset.state = state;
    statusPill.textContent = labels[state === "live" ? "live" : state];
  }

  const statusUnsubscribers: Array<() => void> = [];
  function watchSources(): void {
    for (const unsubscribe of statusUnsubscribers.splice(0)) {
      unsubscribe();
    }
    for (const source of registry.listRealtimeSources()) {
      statusUnsubscribers.push(source.onStatus(updateStatus));
    }
    updateStatus();
  }

  function unmountCurrent(): void {
    const mounted = current;
    current = null;
    try {
      mounted?.view?.dispose();
    } catch (error) {
      console.warn("Page dispose failed", error);
    }
  }

  async function show(): Promise<void> {
    const sequence = (navigationSeq += 1);
    const list = pages();
    const route = parseRoute(window.location.hash);
    let page = list.find((item) => item.id === route.pageId) ?? null;
    if (!route.pageId) {
      page = list.find((item) => item.id === options.defaultPageId) ?? list[0] ?? null;
    }
    unmountCurrent();
    if (!list.length) {
      title.textContent = options.title ?? "";
      replaceChildren(view, h("div", { class: "ks-empty" }, h("strong", null, labels.noPages), h("p", null, labels.noPagesHint)));
      markActive();
      return;
    }
    if (!page) {
      title.textContent = labels.notFound;
      replaceChildren(view, errorState({ code: "not_found", message: labels.notFound, retryable: false }));
      markActive();
      return;
    }
    title.textContent = page.title;
    document.title = options.title ? `${page.title} · ${options.title}` : page.title;
    current = { pageId: page.id, view: null };
    markActive();
    const host = h("div", { class: "ks-page", dataset: { page: page.id } }, spinner());
    replaceChildren(view, host);
    try {
      const mounted = await page.mount(host, route.params, runtime);
      if (disposed || sequence !== navigationSeq) {
        mounted.dispose();
        return;
      }
      if (host.firstElementChild?.classList.contains("ks-loading") && host.childElementCount === 1) {
        // The page did not render anything yet; keep the spinner until it does.
      }
      current = { pageId: page.id, view: mounted };
    } catch (error) {
      if (disposed || sequence !== navigationSeq) {
        return;
      }
      replaceChildren(
        host,
        errorState(
          { code: "page_crashed", message: `${page.title} failed to open: ${error instanceof Error ? error.message : String(error)}`, retryable: true },
          () => void show(),
        ),
      );
    }
    view.focus({ preventScroll: true });
  }

  function navigate(pageId: string, params?: Record<string, string>): void {
    const next = buildRoute(pageId, params);
    if (window.location.hash === next) {
      void show();
    } else {
      window.location.hash = next;
    }
  }

  const onHashChange = (): void => void show();
  const menuButton = button("☰", { variant: "ghost", title: labels.menu, onClick: () => setMenu(shell.getAttribute("data-menu") !== "open") });
  menuButton.classList.add("ks-menu-button");
  menuButton.setAttribute("aria-label", labels.menu);
  menuButton.setAttribute("aria-expanded", "false");

  /**
   * The phone drawer: while it is closed nothing in it can be tabbed to (`inert` + hidden by CSS), while it is open
   * focus moves into it and Escape closes it and returns focus to the button.
   */
  function setMenu(open: boolean, restoreFocus = true): void {
    shell.setAttribute("data-menu", open ? "open" : "closed");
    menuButton.setAttribute("aria-expanded", String(open));
    const sidebar = shell.querySelector<HTMLElement>(".ks-sidebar");
    const drawerMode = window.matchMedia?.("(max-width: 899px)").matches ?? false;
    if (sidebar) {
      sidebar.toggleAttribute("inert", drawerMode && !open);
    }
    if (open) {
      shell.querySelector<HTMLElement>(".ks-sidebar a")?.focus();
    } else if (restoreFocus && drawerMode && sidebar?.contains(document.activeElement)) {
      menuButton.focus();
    }
  }
  const onMenuKey = (event: KeyboardEvent): void => {
    if (event.key === "Escape" && shell.getAttribute("data-menu") === "open") {
      setMenu(false);
    }
  };
  document.addEventListener("keydown", onMenuKey);
  const onResize = (): void => setMenu(shell.getAttribute("data-menu") === "open", false);
  window.addEventListener("resize", onResize);

  replaceChildren(
    shell,
    h(
      "aside",
      { class: "ks-sidebar" },
      h("div", { class: "ks-brand" }, options.title ?? "KioskScene"),
      navList,
      h("div", { class: "ks-nav-footer" }, (options.footerLinks ?? []).map((link) => h("a", { href: link.href, class: "ks-nav-footer-link" }, link.label))),
    ),
    h("div", { class: "ks-scrim", onClick: () => setMenu(false) }),
    h("div", { class: "ks-content" }, h("header", { class: "ks-topbar" }, menuButton, title, statusPill), view),
    bottomNav,
  );
  replaceChildren(root, shell);

  const unsubscribeRegistry = registry.onChange(() => {
    renderNav();
    watchSources();
    if (!current || !pages().some((page) => page.id === current?.pageId)) {
      void show();
    }
  });
  window.addEventListener("hashchange", onHashChange);
  setMenu(false, false);
  renderNav();
  watchSources();
  void show();

  return {
    navigate,
    dispose() {
      disposed = true;
      services.stop();
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("keydown", onMenuKey);
      unsubscribeRegistry();
      for (const unsubscribe of statusUnsubscribers.splice(0)) {
        unsubscribe();
      }
      unmountCurrent();
      replaceChildren(root);
    },
  };
}
