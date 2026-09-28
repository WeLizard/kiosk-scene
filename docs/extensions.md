# Extension model

KioskScene is a **generic frontend/platform layer**. It knows how to show a rotating scene on a kiosk and how to host
an administration UI on a phone or desktop; it knows nothing about what the data means. Anything domain-specific — a
household inventory, a shopping list, a smart-home dashboard — arrives as an **extension**.

The rule that keeps this honest: nothing household-specific may appear in `packages/core`, `packages/app-shell`,
`packages/shell-browser` or `packages/widgets-core`. The reference extension, [Domovoy](./domovoy.md), lives in
`packages/domovoy-ui` (browser) and `kiosk_scene/domovoy` (backend) and uses only the contracts below.

```
             ┌──────────────── extension module (one ES module) ────────────────┐
 kiosk  ───► │ pages · widgets · services · data/action providers · realtime    │ ◄─── admin (phone/desktop)
 (scene)     └───────────────────────────────┬──────────────────────────────────┘
                     packages/core (contracts, registry)  ·  packages/app-shell (UI kit, HTTP, long-poll, admin shell)
                                             │ HTTP (relative to the add-on, ingress-safe)
                                             ▼
                                   the extension's own backend
```

## Contributions

An extension is `{ manifest, activate(host), deactivate? }`. Everything it registers is namespaced `<extension>.<name>`
and owned by it: unloading an extension removes exactly its contributions, and a failing `activate` is rolled back
completely (no half a UI is left behind).

| Contribution | What it is | Where it appears |
| --- | --- | --- |
| `DataProvider` | read side: `read(params) → ExtensionResult` | pages, widgets (`runtime.readData`) |
| `ActionProvider` | write side: `invoke(action, input)`; `describe()` lists actions | pages, widgets (`runtime.invokeAction`) |
| `PageDefinition` | a full page; `modes: ["admin" \| "kiosk"]` | admin navigation, or a kiosk slide with `kind: "app"` |
| `WidgetDefinition` | a small live/interactive card | kiosk scene cards with `type: "widget"` |
| `RealtimeSource` | push/poll channel; topics, status, resync | `runtime.subscribe`, `runtime.onRealtimeStatus` |
| `ServiceDefinition` | background job without UI, per mode | started by the host, stopped on unload |

Providers **never throw across the boundary**. Every call returns `{ ok: true, data }` or
`{ ok: false, error: { code, message, fields?, retryable? } }`, so a view can always render the failure instead of
crashing, and a form can put `fields` next to the inputs they belong to.

## Runtime handed to pages and widgets

`mode`, `locale`, `config` (from `extension.json`), `resolveUrl(url)` (ingress-aware), `readData`, `invokeAction`,
`subscribe(source, topic, fn)`, `onRealtimeStatus`, `navigate(pageId, params)`, and `refresh()` (asks the host to
re-read its own sources immediately — used so the avatar reacts the moment a reply is produced).

## Realtime contract

`createLongPollSource` speaks a small cursor protocol so it behaves identically behind Home Assistant ingress, nginx and
captive proxies, and needs no WebSocket/SSE buffering configuration:

```
GET events?since=<cursor>&timeout=<s>  →  { cursor, events: [{ seq, topic, payload }] }
                                       →  { cursor, reset: true }   (cursor unknown: database replaced/restored)
```

* topics match exactly or by prefix (`items` receives `items.changed`);
* after every reconnect, `reset`, or return from a hidden tab, every subscriber gets one synthetic **resync**
  message — "you may have missed events, refetch";
* reconnect uses exponential backoff with jitter; polling pauses while the page is hidden;
* `runtime.onRealtimeStatus` reports `connecting | live | reconnecting | offline`.

A page that stays open therefore never shows stale data for longer than one round trip, and a service restart is
recovered without user action (covered by the end-to-end test in `packages/domovoy-ui/test/e2e.test.ts`).

## Admin mode and kiosk mode

* **Admin** (`/admin/`): `mountAdminApp` renders a sidebar on wide screens and a top bar + drawer + bottom bar on
  phones, hash routing (`#/domovoy.inventory?location_id=3`), an error boundary per page, and a connection indicator.
* **Kiosk** (`/scene/`): a scene page can be `{ "kind": "app", "app": "domovoy.today", "props": {…} }`, and a card can
  be `{ "type": "widget", "widget": "domovoy.next-event", "props": {…} }`. App slides are mounted **once** and kept
  across refreshes; while someone types into one, automatic rotation pauses (`interactionHoldMs`); touch swipes ignore
  anything marked `data-no-swipe`. If the extension is not loaded (yet), the slide shows a placeholder and upgrades
  when it arrives.

Kiosk data and layout are rendered by a reconciling shell: an unchanged slide is never torn down on refresh, and a
display that cannot reach its sources for `staleAfterFailures` cycles shows an honest "no connection" badge (4xx answers
for optional files do not count).

## Shipping an extension in the add-on

1. Build the module to a single ES file (see `packages/domovoy-ui/vite.config.ts`).
2. Put it in `kiosk_scene/extensions-seed/<id>/<module>.js` (`pnpm release:kiosk-addon` does this for Domovoy).
3. At start `run.sh` copies it to `/config/kiosk-scene/extensions/<id>/` and writes `extension.json`:
   `{ "id", "title", "module", "enabled", "config" }`.
4. `scene_host_service.py` lists enabled extensions in `/scene-api/bootstrap`; both the kiosk runtime and `admin.html`
   load them with a dynamic `import()`. A broken or slow extension is reported and skipped — it can never stop the
   base scene from starting.

Extension ids match `^[a-z][a-z0-9-]{1,31}$`, must equal their directory name, and modules must live inside it.

## Writing one

```ts
import { EXTENSION_API_VERSION, type Extension } from "@kiosk-scene/core";
import { createHttpClient, createLongPollSource, h } from "@kiosk-scene/app-shell";

const extension: Extension = {
  manifest: { id: "garden", title: "Garden", version: "1.0.0", apiVersion: EXTENSION_API_VERSION },
  activate(host) {
    const http = createHttpClient({ baseUrl: String(host.config.apiBase) });
    host.registerDataProvider({ id: "garden.api", read: (p: { path: string }) => http.request(p.path) });
    host.registerRealtimeSource(createLongPollSource({ id: "garden.events", http }));
    host.registerPage({
      id: "garden.beds", title: "Beds", modes: ["admin"],
      mount(el, _params, runtime) {
        el.append(h("p", null, "Hello"));
        return { dispose() {} };
      },
    });
  },
};
export default extension;
```

`packages/app-shell` provides the pieces a page needs: `h` (a DOM builder that never parses strings as HTML — voice- or
calendar-supplied text cannot inject markup), `asyncView` (loading/error/data lifecycle where a slow old response can
never overwrite a newer one and a failed refresh keeps the last good data on screen), forms with server-side field
errors, dialogs with focus trap, toasts, tables that collapse to cards on phones, and `setUiStrings` for localisation.

## Tests

`packages/core/test/extensions.test.ts` (registry, rollback, namespacing), `packages/app-shell/test/*` (realtime,
UI kit, admin shell), `packages/shell-browser/test/shell.test.ts` (reconciliation, app slides, widgets, stale badge),
and the end-to-end suite that drives every Domovoy page against the real backend.
