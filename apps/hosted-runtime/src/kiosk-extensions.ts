import { ExtensionRegistry } from "@kiosk-scene/core";
import { loadExtensions, type ExtensionLoadReport } from "@kiosk-scene/app-shell";
import { resolveHostedUrl, type SceneHostBootstrap } from "./bootstrap";

/**
 * Loads the extensions listed in the bootstrap into `registry`. Never throws: an extension that cannot
 * be loaded is logged and skipped so the base scene keeps running.
 */
export async function loadBootstrapExtensions(
  registry: ExtensionRegistry,
  bootstrap: SceneHostBootstrap,
  bootstrapUrl: string,
): Promise<ExtensionLoadReport[]> {
  const descriptors = (bootstrap.extensions ?? [])
    .filter((entry) => entry && entry.id && entry.moduleUrl)
    .map((entry) => ({
      id: entry.id,
      moduleUrl: resolveHostedUrl(entry.moduleUrl, bootstrapUrl),
      config: {
        ...(entry.config ?? {}),
        // Extension API bases are root-relative in the bootstrap; make them ingress-aware once, here.
        ...(typeof entry.config?.apiBase === "string"
          ? { apiBase: resolveHostedUrl(entry.config.apiBase, bootstrapUrl) }
          : {}),
      },
    }));
  const reports = await loadExtensions(registry, descriptors);
  for (const report of reports) {
    if (!report.ok) {
      console.warn(`Extension "${report.id}" was not loaded: ${report.error}`);
    }
  }
  return reports;
}
