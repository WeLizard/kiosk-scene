# Home Assistant Deployment Notes

For a Home Assistant kiosk deployment, keep the external entrypoint stable and move scene logic into the renderer.

## Recommended split

- `HAOS-kiosk` opens `/dashboard-display/0`
- the active Home Assistant dashboard contains a single iframe
- the iframe points to the built scene app under `/local/<instance>/index.html`

## Runtime files

Typical deployed files:

- `/config/www/neiri-scene/index.html`
- `/config/www/neiri-scene/renderer.config.json`
- `/config/www/neiri-scene/avatar.manifest.json`
- `/config/www/neiri-scene/scene.default.json`
- `/config/www/neiri-scene/control.json`

## State sources

Recommended first iteration:

- primary: Home Assistant helper entities via `provider-ha`
- fallback: JSON state snapshot via `provider-json`

## Do not place in the kiosk layer

- avatar model paths
- layout rules
- carousel page definitions
- scene orchestration logic
- assistant-specific messaging rules

