import { ExtensionRegistry } from "@kiosk-scene/core";
import { loadExtensions, type ExtensionLoadReport } from "@kiosk-scene/app-shell";
import { isSameOrigin, resolveHostedUrl, type SceneHostBootstrap } from "./bootstrap";

/**
 * Loads the extensions listed in the bootstrap into `registry`. Never throws: an extension that cannot
 * be loaded is logged and skipped so the base scene keeps running.
 */
export async function loadBootstrapExtensions(
  registry: ExtensionRegistry,
  bootstrap: SceneHostBootstrap,
  bootstrapUrl: string,
): Promise<ExtensionLoadReport[]> {
  const rejected: ExtensionLoadReport[] = [];
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
    }))
    // An extension is code plus a place to send the user's requests (and, for LAN access, their token): both must live
    // on this origin. Anything else is refused, never loaded.
    .filter((descriptor) => {
      const apiBase = typeof descriptor.config.apiBase === "string" ? descriptor.config.apiBase : "";
      const ok = isSameOrigin(descriptor.moduleUrl) && (!apiBase || isSameOrigin(apiBase));
      if (!ok) {
        rejected.push({ id: descriptor.id, ok: false, error: "moduleUrl and apiBase must be on the same origin as the page" });
      }
      return ok;
    });
  const reports = [...rejected, ...(await loadExtensions(registry, descriptors))];
  for (const report of reports) {
    if (!report.ok) {
      console.warn(`Extension "${report.id}" was not loaded: ${report.error}`);
    }
  }
  return reports;
}
