import { ExtensionRegistry } from "@kiosk-scene/core";

export interface ExtensionDescriptor {
  id: string;
  moduleUrl: string;
  config?: Record<string, unknown>;
}

export interface ExtensionLoadReport {
  id: string;
  ok: boolean;
  error?: string;
}

export interface LoadExtensionsOptions {
  importModule?: (url: string) => Promise<unknown>;
  timeoutMs?: number;
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number, label: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`${label} timed out after ${timeoutMs} ms`)), timeoutMs);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

/**
 * Loads extension modules one by one. A broken extension is reported and skipped; it never
 * prevents the base scene (or other extensions) from starting.
 */
export async function loadExtensions(
  registry: ExtensionRegistry,
  descriptors: ExtensionDescriptor[],
  options: LoadExtensionsOptions = {},
): Promise<ExtensionLoadReport[]> {
  const importModule = options.importModule ?? ((url: string) => import(/* @vite-ignore */ url));
  const timeoutMs = options.timeoutMs ?? 15_000;
  const reports: ExtensionLoadReport[] = [];
  for (const descriptor of descriptors) {
    try {
      const loaded = await withTimeout(importModule(descriptor.moduleUrl), timeoutMs, `Import of ${descriptor.id}`);
      const candidate = (loaded as { default?: unknown } | null)?.default ?? loaded;
      const extension = await withTimeout(
        registry.load(candidate, descriptor.config ?? {}),
        timeoutMs,
        `Activation of ${descriptor.id}`,
      );
      if (extension.manifest.id !== descriptor.id) {
        await registry.unload(extension.manifest.id);
        throw new Error(`Module declares id "${extension.manifest.id}" but was configured as "${descriptor.id}".`);
      }
      reports.push({ id: descriptor.id, ok: true });
    } catch (error) {
      reports.push({ id: descriptor.id, ok: false, error: error instanceof Error ? error.message : String(error) });
    }
  }
  return reports;
}

/** Idempotently injects a `<style>` block; extensions use it for their own CSS. */
export function injectStyles(id: string, css: string): void {
  if (typeof document === "undefined" || document.getElementById(id)) {
    return;
  }
  const style = document.createElement("style");
  style.id = id;
  style.textContent = css;
  document.head.appendChild(style);
}
