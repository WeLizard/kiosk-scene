# Home Assistant Deployment Notes

For a Home Assistant kiosk deployment, keep the kiosk entrypoint stable and host the scene app inside the standalone `Kiosk Scene` add-on.

## Recommended split

- `HAOS-kiosk` opens the stable hosted scene URL
- `Kiosk Scene` hosts the generic `kiosk-scene` runtime under `/scene/`
- `OpenClawHomeAssistant` remains the gateway/control-plane add-on
- `kiosk-scene` fetches `/scene-api/bootstrap`
- the active pack lives under `/config/kiosk-scene/scene-packs/<pack-id>/`

## Canonical hosted paths

Runtime and pack delivery:

- `/config/kiosk-scene/scene-runtime/`
- `/config/kiosk-scene/scene-packs/<pack-id>/renderer.kiosk-scene.json`
- `/config/kiosk-scene/scene-packs/<pack-id>/avatar.manifest.json`
- `/config/kiosk-scene/scene-packs/<pack-id>/scene.default.json`
- `/config/kiosk-scene/scene-packs/<pack-id>/entity-map.json`
- `/config/kiosk-scene/scene-packs/<pack-id>/neiri-control.json`

Ingress and bootstrap:

- `/scene/`
- `/scene-api/bootstrap`
- `/scene-editor/`

## Transitional legacy bridge

The old `/config/openclaw-scene/` and `/config/www/neiri-scene/` layouts are migration-only:

- `Kiosk Scene` may seed missing canonical pack files from `/config/openclaw-scene/` and `/config/www/neiri-scene/`
- new edits and new runtime ownership must target `/config/kiosk-scene/...`
- `/local/...` should be treated as compatibility-only, not as the canonical delivery path

## State sources

Recommended order:

- primary: platform-provided state/control from an external control-plane such as `OpenClawHomeAssistant`
- bridge: Home Assistant helper entities via `provider-ha`
- fallback: JSON state snapshot via `provider-json`

## Do not place in the kiosk layer

- avatar model paths
- layout rules
- carousel page definitions
- scene orchestration logic
- assistant-specific messaging rules
- hosted scene config ownership

## Domovoy (optional)

Set `domovoy_enabled: true` in the add-on options to start the Domovoy household assistant next to the scene. Nothing
changes for installations that leave it off.

| Option | Meaning |
| --- | --- |
| `domovoy_enabled` | start the service, load the extension, show the administration UI |
| `domovoy_kiosk_mic` / `domovoy_kiosk_room` | let the kiosk browser listen for «домовой …» ([docs/voice.md](./voice.md)); the room name picks the nearest speaker |
| `domovoy_trusted_networks` | LAN addresses / subnets (IPv4/IPv6, validated at start; invalid entries are skipped with a warning) that may use the API without a token — normally just the kiosk. The Home Assistant panel never needs a token |

Paths added by the add-on:

* `/admin/` — administration UI (also linked from the add-on panel), opens `scene-runtime/admin.html`
* `/domovoy-api/` — Domovoy REST + change feed (proxied to `127.0.0.1:48099`)
* `/scene-extensions/<id>/` — extension modules, listed in `/scene-api/bootstrap`
* `/config/kiosk-scene/domovoy/` — database, `secrets.json` (0600) and nightly backups; it is inside `/config`, so it
  is part of Home Assistant's own backups
* `/config/kiosk-scene/extensions/<id>/` — installed extension module + generated `extension.json`

Who is trusted: requests arriving through Home Assistant ingress (`172.30.32.2`) or from the add-on host itself are
trusted; every other LAN client needs the API token (Integrations → Доступ) or must be listed in
`domovoy_trusted_networks`. nginx decides this and overwrites the `X-Domovoy-Origin` header on every request.

Home Assistant access uses the supervisor token automatically (`homeassistant_api: true`), but only for the supervisor's
own address. A small default set of control services works out of the box (lights, switches, fans, covers, scenes); the
owner extends the list in Integrations. Locks, alarm panels, shell/python scripts and the supervisor API are never
callable by Domovoy.

Add scene pages/widgets by editing the pack's scene file: a page `{"id": "domovoy", "kind": "app", "app": "domovoy.today"}`
and cards `{"type": "widget", "widget": "domovoy.next-event"}`, `domovoy.shopping`, `domovoy.today`, `domovoy.command`.
