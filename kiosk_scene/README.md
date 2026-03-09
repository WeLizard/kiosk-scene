# Kiosk Scene Add-on

This directory contains the standalone Home Assistant add-on source for hosting
the generic `kiosk-scene` runtime.

What this add-on owns:

- `/scene/`
- `/scene-api/bootstrap`
- `/scene-api/avatar-catalog`
- `/scene-api/avatar-import`
- `/scene-editor/`
- `/config/kiosk-scene/scene-runtime/`
- `/config/kiosk-scene/scene-packs/<pack-id>/`
- `/config/kiosk-scene/avatar-packs/<avatar-id>/`

What this add-on does not own:

- kiosk browser/device runtime
- OpenClaw gateway/control-plane logic
- instance-specific pack contents

Editor model:

- top: one honest display preview for the selected screen profile
- bottom: a normal scrollable settings page
- avatar choice belongs to the current instance-pack and points at separate `avatar-packs`
- avatar packs can be imported from `.zip` archives directly in the editor; the add-on scaffolds `avatar.manifest.json` and a draft `motion-map.json`

Development workflow:

```bash
pnpm build:hosted
pnpm sync:kiosk-addon-runtime
```

After syncing, `kiosk_scene/scene-runtime-seed/` contains the hosted
runtime bundle that the add-on seeds into persistent HA storage on first boot.
