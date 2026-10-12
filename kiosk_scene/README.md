# Kiosk Scene Add-on

This directory contains the standalone Home Assistant add-on source for hosting
the generic `kiosk-scene` runtime.

What this add-on owns:

- `/scene/`
- `/scene-api/bootstrap`
- `/scene-api/avatar-catalog`
- `/scene-api/avatar-import`
- `/scene-editor/`
- `/admin/` (the add-on ingress entry point and administration UI)
- `/domovoy-api/` (optional Domovoy service, `domovoy_enabled`)
- `/scene-extensions/` (extension modules)
- `/scene-runtime/` (served from the add-on image at `/opt/kiosk-scene/scene-runtime/`)
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
- imported avatar packs expose their semantic motion-map in the Avatar section, so the user can bind runtime cues like `idle`, `think`, `busy`, or `greet` to actual model motions
- the Avatar section now renders a visual catalog of available avatar packs with previews, motion count, and capabilities instead of only a raw dropdown
- the Home Assistant section now exposes explicit binding targets for the selected card, so entity assignment does not depend on guessing the currently focused field
- the editor preview is now interactive: clicking a page or card inside the simulated display selects it in the settings dashboard below
- page order and card order can now be changed by drag-and-drop directly in the editor lists, in addition to the existing move buttons

Settings in Home Assistant:

- Enable **Show in sidebar** on the Kiosk Scene add-on to open `/admin/` from the HA sidebar. The panel is restricted to HA administrators.
- Use the add-on **Configuration** tab for startup options: the IANA time zone, Domovoy on/off, kiosk microphone and trusted networks. These take effect after an add-on restart. `active_pack_id` is only the initial scene on first start.
- Use **KioskScene → Settings** to select or clone an existing scene pack. These actions are available through authenticated HA ingress; direct LAN access can browse the catalog but cannot change it.
- Use the scene editor to import and select avatar packs. Scene packs and avatar packs have separate catalogs.
- When Domovoy is enabled, its own Settings and Integrations pages contain its runtime settings. HA entity fields offer a list of current entities while preserving manual IDs and values that are temporarily unavailable.

Development workflow:

```bash
pnpm release:kiosk-addon   # builds the hosted runtime and the Domovoy extension, syncs both seeds, validates them
pnpm test && pnpm test:python
```

After syncing, `kiosk_scene/scene-runtime-seed/` contains the hosted runtime bundle and
`kiosk_scene/extensions-seed/` the extension modules that the add-on seeds into persistent HA storage on start. Both are
committed build outputs: CI rebuilds them and fails when they differ from the sources. The runtime is served directly
from the image. Older files under `/config/kiosk-scene/scene-runtime/` are left untouched but are no longer served.

Domovoy (optional): see [docs/domovoy.md](../docs/domovoy.md), [docs/voice.md](../docs/voice.md) and the options in
[docs/deployment-home-assistant.md](../docs/deployment-home-assistant.md).
