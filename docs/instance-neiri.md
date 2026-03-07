# Neiri Instance Mapping

This document describes how the current local `neiri-scene` deployment should map onto `kiosk-scene`.

## Current runtime assumptions

The existing Neiri deployment currently relies on:

- Home Assistant helper entities named `neiri_*`
- fallback JSON state under `/local/live2d/neiri-state.json`
- a separate control file under `/local/neiri-scene/neiri-control.json`
- a thin dashboard wrapper reachable through `/dashboard-display/0`

## Target split

### Public core: `kiosk-scene`

- scene runtime
- control sanitation
- JSON provider
- Home Assistant provider
- Live2D compatibility bridge adapter
- widget runtime

### Instance repo: `neiri-scene`

- Neiri branding
- active `renderer.config.json`
- `avatar.manifest.json`
- `scene.default.json`
- Home Assistant entity map
- deployment path `/config/www/neiri-scene/`
- private asset references

## Recommended Neiri avatar manifest

```json
{
  "version": 1,
  "adapter": "live2d",
  "assetRoot": "/local/live2d/haru-pro",
  "runtimeUrl": "../avatar.html",
  "modelUrl": "./haru_greeter_t05.model3.json",
  "fallbackPortrait": "./haru_greeter_t05.2048/texture_00.png",
  "motionMapUrl": "/local/live2d/neiri-motion-map.json",
  "capabilities": {
    "supportsEmotion": true,
    "supportsMotion": true,
    "supportsViewPresets": true,
    "supportsLipSync": true,
    "supportsPointerFocus": true
  }
}
```

This keeps the public adapter generic while letting the private Neiri instance continue to use its current runtime layout and model assets.

## Entity mapping for Neiri

```json
{
  "online": "input_boolean.neiri_online",
  "busy": "input_boolean.neiri_busy",
  "status": "input_text.neiri_status",
  "message": "input_text.neiri_message",
  "source": "input_text.neiri_source",
  "updatedAt": "input_text.neiri_updated_at",
  "emotion": "input_text.neiri_emotion",
  "motion": "input_text.neiri_motion",
  "revision": "input_number.neiri_revision"
}
```

## Migration order

1. extract generic provider logic from the current prototype into `provider-ha` and `provider-json`
2. extract control and scene normalization into `core`
3. move the existing `avatar.html` runtime behind the Live2D bridge adapter
4. rebuild the Neiri instance repo so it only supplies config and assets
5. keep `dashboard-display/0` stable as the external kiosk entrypoint
