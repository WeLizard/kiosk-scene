# Home Assistant Deployment Notes

For a Home Assistant kiosk deployment, keep the kiosk entrypoint stable and host the scene app inside `OpenClawHomeAssistant`.

## Recommended split

- `HAOS-kiosk` opens the stable hosted scene URL
- `OpenClawHomeAssistant` hosts the generic `kiosk-scene` runtime under `/scene/`
- `kiosk-scene` fetches `/scene-api/bootstrap`
- the active pack lives under `/config/openclaw-scene/scene-packs/<pack-id>/`

## Canonical hosted paths

Runtime and pack delivery:

- `/config/openclaw-scene/scene-runtime/`
- `/config/openclaw-scene/scene-packs/<pack-id>/renderer.kiosk-scene.json`
- `/config/openclaw-scene/scene-packs/<pack-id>/avatar.manifest.json`
- `/config/openclaw-scene/scene-packs/<pack-id>/scene.default.json`
- `/config/openclaw-scene/scene-packs/<pack-id>/entity-map.json`
- `/config/openclaw-scene/scene-packs/<pack-id>/neiri-control.json`

Ingress and bootstrap:

- `/scene/`
- `/scene-api/bootstrap`
- `/scene-editor/`

## Transitional legacy bridge

The old `/config/www/neiri-scene/` layout is migration-only:

- `OpenClawHomeAssistant` may seed missing canonical pack files from `/config/www/neiri-scene/`
- new edits and new runtime ownership must target `/config/openclaw-scene/...`
- `/local/...` should be treated as compatibility-only, not as the canonical delivery path

## State sources

Recommended order:

- primary: platform-provided state/control from `OpenClawHomeAssistant`
- bridge: Home Assistant helper entities via `provider-ha`
- fallback: JSON state snapshot via `provider-json`

## Do not place in the kiosk layer

- avatar model paths
- layout rules
- carousel page definitions
- scene orchestration logic
- assistant-specific messaging rules
- hosted scene config ownership
