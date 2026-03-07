import type { SceneConfigV1, ScenePageV1 } from "./contracts.js";
import { isObjectRecord, normalizeStringList, trimText } from "./utils.js";

export interface NormalizedSceneConfigV1 {
  version: 1;
  rotation: {
    order: string[];
    defaultDwellMs: number;
  };
  pages: ScenePageV1[];
}

export function unwrapSceneConfigPayload(config: unknown): unknown {
  if (isObjectRecord(config) && isObjectRecord(config.config)) {
    return config.config;
  }
  return config;
}

export function mergeScenePage(basePage: ScenePageV1, incomingPage: unknown): ScenePageV1 {
  const merged: ScenePageV1 = { ...basePage };
  if (!isObjectRecord(incomingPage)) {
    return merged;
  }

  if (typeof incomingPage.id === "string") {
    merged.id = trimText(incomingPage.id, 40) || merged.id;
  }
  if (typeof incomingPage.kind === "string") {
    merged.kind = incomingPage.kind === "forecast+cards"
      ? "forecast+cards"
      : (incomingPage.kind === "overview" ? "overview" : "cards");
  }
  if (typeof incomingPage.layout === "string") {
    merged.kind = incomingPage.layout === "forecast+cards" ? "forecast+cards" : "cards";
  }
  if (typeof incomingPage.cardStyle === "string") {
    merged.cardStyle = incomingPage.cardStyle === "mini" ? "mini" : "full";
  }
  if (typeof incomingPage.title === "string") {
    merged.title = incomingPage.title;
  }
  if (typeof incomingPage.subtitle === "string") {
    merged.subtitle = incomingPage.subtitle;
  }
  if (typeof incomingPage.stampCaption === "string") {
    merged.stampCaption = incomingPage.stampCaption;
  }
  if (typeof incomingPage.stampValue === "string") {
    merged.stampValue = incomingPage.stampValue;
  }
  if (Number.isFinite(Number(incomingPage.slot))) {
    merged.slot = Math.max(0, Number(incomingPage.slot));
  }
  if (Array.isArray(incomingPage.cards)) {
    merged.cards = incomingPage.cards.filter((card) => isObjectRecord(card));
  }
  return merged;
}

export function normalizeSceneConfig(config: unknown, defaults: SceneConfigV1): NormalizedSceneConfigV1 {
  const payload = unwrapSceneConfigPayload(config);
  const defaultPages = Array.isArray(defaults.pages) ? defaults.pages.slice() : [];
  const incomingPages = isObjectRecord(payload) && Array.isArray(payload.pages) ? payload.pages : [];

  const pages = defaultPages.map((basePage) => {
    const incoming = incomingPages.find((page) => trimText(isObjectRecord(page) ? page.id : "", 40) === basePage.id);
    return mergeScenePage(basePage, incoming);
  });

  const incomingRotation = isObjectRecord(payload) && isObjectRecord(payload.rotation) ? payload.rotation : {};
  const rawOrder = Array.isArray(incomingRotation.order) ? incomingRotation.order : defaults.rotation.order;
  const order = normalizeStringList(rawOrder).filter((item, index, list) => {
    return pages.some((page) => page.id === item) && list.indexOf(item) === index;
  });

  return {
    version: 1,
    rotation: {
      order: order.length ? order : defaults.rotation.order.slice(),
      defaultDwellMs: Math.max(
        5_000,
        (Number(incomingRotation.defaultDwellSeconds) || defaults.rotation.defaultDwellSeconds) * 1_000,
      ),
    },
    pages,
  };
}

export function getSceneSlides(scene: NormalizedSceneConfigV1): ScenePageV1[] {
  return scene.pages
    .filter((page) => page.kind !== "overview")
    .sort((left, right) => (Number(left.slot) || 0) - (Number(right.slot) || 0));
}

