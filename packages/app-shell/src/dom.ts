/**
 * Tiny DOM builder. Text is always inserted as text nodes, never parsed as HTML, so
 * user-supplied strings (item names dictated by voice, calendar titles, ...) cannot inject markup.
 */

export type Child = Node | string | number | null | undefined | false | Child[];

export interface Props {
  class?: string;
  style?: Partial<CSSStyleDeclaration> | string;
  dataset?: Record<string, string | number | boolean | undefined>;
  aria?: Record<string, string | number | boolean | undefined>;
  [key: string]: unknown;
}

function appendChildren(parent: Node, children: Child[]): void {
  for (const child of children) {
    if (child === null || child === undefined || child === false) {
      continue;
    }
    if (Array.isArray(child)) {
      appendChildren(parent, child);
    } else if (child instanceof Node) {
      parent.appendChild(child);
    } else {
      parent.appendChild(document.createTextNode(String(child)));
    }
  }
}

export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props?: Props | null,
  ...children: Child[]
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);
  for (const [key, value] of Object.entries(props ?? {})) {
    if (value === undefined || value === null || value === false) {
      continue;
    }
    if (key === "class") {
      element.className = String(value);
    } else if (key === "style") {
      if (typeof value === "string") {
        element.setAttribute("style", value);
      } else {
        Object.assign(element.style, value);
      }
    } else if (key === "dataset") {
      for (const [name, item] of Object.entries(value as Record<string, unknown>)) {
        if (item !== undefined) {
          element.dataset[name] = String(item);
        }
      }
    } else if (key === "aria") {
      for (const [name, item] of Object.entries(value as Record<string, unknown>)) {
        if (item !== undefined) {
          element.setAttribute(`aria-${name}`, String(item));
        }
      }
    } else if (key.startsWith("on") && typeof value === "function") {
      element.addEventListener(key.slice(2).toLowerCase(), value as EventListener);
    } else if (key === "value" || key === "checked" || key === "disabled" || key === "selected") {
      (element as unknown as Record<string, unknown>)[key] = value;
    } else if (value === true) {
      element.setAttribute(key, "");
    } else {
      element.setAttribute(key, String(value));
    }
  }
  appendChildren(element, children);
  return element;
}

export function clear(node: Node): void {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

export function replaceChildren(node: Node, ...children: Child[]): void {
  clear(node);
  appendChildren(node, children);
}

/** Collects teardown callbacks so a view can release timers/listeners in one call. */
export class Disposer {
  private readonly callbacks: Array<() => void> = [];
  private disposed = false;

  add(callback: () => void): void {
    if (this.disposed) {
      callback();
      return;
    }
    this.callbacks.push(callback);
  }

  listen<K extends keyof HTMLElementEventMap>(
    target: HTMLElement | Document | Window,
    type: K,
    handler: (event: HTMLElementEventMap[K]) => void,
  ): void {
    target.addEventListener(type, handler as EventListener);
    this.add(() => target.removeEventListener(type, handler as EventListener));
  }

  get isDisposed(): boolean {
    return this.disposed;
  }

  dispose(): void {
    if (this.disposed) {
      return;
    }
    this.disposed = true;
    for (const callback of this.callbacks.splice(0).reverse()) {
      try {
        callback();
      } catch {
        // Teardown must always run to the end.
      }
    }
  }
}

export function debounce<A extends unknown[]>(fn: (...args: A) => void, waitMs: number): ((...args: A) => void) & { cancel(): void } {
  let timer: ReturnType<typeof setTimeout> | null = null;
  const wrapped = (...args: A): void => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
      fn(...args);
    }, waitMs);
  };
  wrapped.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };
  return wrapped;
}
