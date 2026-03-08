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
