/**
 * URL resolution shared by every browser package.
 *
 * The add-on runs behind Home Assistant ingress (`/api/hassio_ingress/<token>/...`), where a
 * root-relative URL such as `/scene-api/bootstrap` must be re-anchored under the ingress root
 * instead of the origin. Direct access (`http://host:48123/scene-runtime/`) needs no re-anchoring.
 */

const INGRESS_PREFIX = /^\/api\/hassio_ingress\/[^/]+\//;

function currentHref(): string {
  return typeof window !== "undefined" ? window.location.href : "http://localhost/";
}

export function withTrailingSlash(value: string): string {
  return value.endsWith("/") ? value : `${value}/`;
}

/** Ingress root of `baseUrl`, or `""` when the URL is not served through ingress. */
export function resolveIngressRoot(baseUrl: string, locationHref: string = currentHref()): string {
  try {
    const parsed = new URL(baseUrl, locationHref);
    const match = parsed.pathname.match(INGRESS_PREFIX);
    return match ? new URL(match[0], parsed.origin).toString() : "";
  } catch {
    return "";
  }
}

export function isAbsoluteUrl(value: string): boolean {
  return /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(value);
}

/** Resolves `candidate` against `baseUrl`, re-anchoring root-relative URLs under the ingress root. */
export function resolveUrlAgainst(baseUrl: string, candidate: string, locationHref: string = currentHref()): string {
  const normalized = String(candidate ?? "").trim();
  if (!normalized) {
    return "";
  }
  if (isAbsoluteUrl(normalized)) {
    return normalized;
  }
  const resolvedBase = new URL(baseUrl, locationHref);
  if (normalized.startsWith("/")) {
    const ingressRoot = resolveIngressRoot(resolvedBase.toString(), locationHref);
    if (ingressRoot) {
      return new URL(normalized.slice(1), ingressRoot).toString();
    }
    return new URL(normalized, resolvedBase.origin).toString();
  }
  return new URL(normalized, resolvedBase).toString();
}

/** Directory URL of `candidate` (the URL with its last path segment removed). */
export function resolveBaseUrl(candidate: string, locationHref: string = currentHref()): string {
  try {
    return new URL(".", candidate).toString();
  } catch {
    return new URL(".", locationHref).toString();
  }
}
