# kiosk-scene

`kiosk-scene` is a backend-agnostic scene engine for kiosk displays that show an avatar on the left and a rotating information deck on the right.

The project is designed for Home Assistant kiosk deployments, but the core must remain generic:

- the kiosk runtime only opens a URL and controls the screen;
- the scene engine owns layout, carousel, widgets, orchestration, and avatar lifecycle;
- avatar rendering is adapter-based, so Live2D, a static portrait, or a pack-supplied module (for example a three.js room with a character) can plug into the same scene contract; Unity WebGL remains a documented contract stub;
- private models and branded assets stay outside the public core.

The shell contract for the current Home Assistant deployment is also explicit:

- avatar panel on the left
- rotating carousel and assistant deck on the right
- three avatar view presets: `full`, `torso`, `head`
- manual carousel navigation layered on top of automatic rotation

## Goals

- Keep `HAOS-kiosk` free of avatar and layout logic.
- Make the scene engine reusable with more than one avatar technology.
- Keep the public repo safe to publish without proprietary model assets.
- Separate `state` from `control`.
- Allow private instance repos such as `neiri` to provide branding, assets, entity mapping, and deployment.

## Repository Layout

```text
apps/demo-generic/            Generic demo app notes
apps/hosted-runtime/          Hosted runtime entrypoints (kiosk + admin) for the Kiosk Scene add-on
docs/                         Architecture, extension model, Domovoy, voice, deployment and compliance docs
kiosk_scene/                  Standalone Home Assistant add-on source for Kiosk Scene
kiosk_scene/domovoy/          Domovoy household assistant backend (Python standard library only)
packages/core/                Contracts, runtime boundaries and the extension registry
packages/app-shell/           Generic UI kit, HTTP client, long-poll realtime and the admin shell
packages/domovoy-ui/          Domovoy UI as an extension (11 admin sections, kiosk widgets, microphone)
packages/adapter-live2d/      Live2D adapter and compatibility bridge
packages/adapter-unity-webgl/ Unity WebGL adapter boundary
packages/adapter-static/      Static portrait adapter boundary
packages/adapter-module/      Hosts an avatar runtime that the instance pack ships as an ES module
packages/shell-browser/       Browser shell with the left-avatar/right-carousel UI
packages/provider-ha/         Home Assistant state provider boundary
packages/provider-json/       JSON file state provider boundary
packages/widgets-core/        Shared widget contracts
PROJECTS/                     Subprojects united under this repository
PROJECTS/neiri/               Private Neiri instance as a Git submodule (requires access)
PROJECTS/haos/                HAOS-kiosk Chromium fork as a Git submodule
schemas/                      Public JSON schemas
tools/                        Config validation and support tooling
```

## Contracts

The public surface of the project is built around five versioned contracts:

- `renderer.config.v1`
- `avatar.manifest.v1`
- `scene.v1`
- `state.v1`
- `control.v1`
- `entity-map.v1`

All instance-specific data should flow through these contracts rather than through hardcoded project logic.

`state.v1` and `control.v1` are semantic-first:

- canonical runtime intent is `emotion`, `activity`, `cue`, optional `speaking`, optional `intensity`
- legacy `motion` is still accepted as a compatibility bridge for older Neiri/Live2D deployments

## Legal and Asset Policy

This repo is intentionally structured so it can be published without shipping proprietary avatar assets.

- Read [LEGAL.md](./LEGAL.md)
- Read [ASSET_POLICY.md](./ASSET_POLICY.md)
- Read [THIRD_PARTY.md](./THIRD_PARTY.md)
- Read [docs/compliance/live2d.md](./docs/compliance/live2d.md)
- Read [docs/compliance/unity.md](./docs/compliance/unity.md)

## Current Status

The repository is already runnable:

- `packages/core` contains the shared state, control, scene, idle, and presentation logic
- `packages/provider-json` and `packages/provider-ha` provide normalized state inputs
- `packages/adapter-static` is a redistribution-safe portrait adapter
- `packages/adapter-module` imports `entry` from the avatar manifest (`"adapter": "module"`) and forwards state, cues, view presets and bubbles to the `createAvatar()` controller it exports; the runtime and its assets stay in the instance pack, loading happens in the background and a failed module falls back to the portrait
- `packages/adapter-live2d` can host the current legacy `avatar.html` runtime through a compatibility iframe bridge
- `packages/shell-browser` owns the current left-avatar/right-carousel browser shell
- `apps/demo-generic` is a thin Vite wrapper around that shell and selects the avatar backend from `avatar.manifest.json`
- `apps/hosted-runtime` is the canonical add-on-hosted runtime that boots from `/scene-api/bootstrap`
- `kiosk_scene` is the standalone HA add-on source that hosts the generic runtime and editor
- `packages/app-shell` and the extension registry in `packages/core` form a generic frontend/platform layer (kiosk *and* desktop/mobile administration) that extensions plug into — see [docs/extensions.md](./docs/extensions.md)
- [Domovoy](./docs/domovoy.md), a local household assistant (memory/inventory, calendar, reminders, messaging, voice through Yandex Stations), is the first extension; it is optional (`domovoy_enabled`) and lives entirely outside the platform packages — voice paths in [docs/voice.md](./docs/voice.md)

The Neiri instance is pinned as the `PROJECTS/neiri` Git submodule. The public repository stores only its Git commit pointer and URL; the model, apartment, and runtime remain in the private repository. Contributors with access can run `git submodule update --init PROJECTS/neiri` after cloning. The generic demo, public CI, and add-on build do not require the private checkout. The remaining instance work is to complete deployment through the public module adapter contract.

`PROJECTS/` is the home for subprojects of this repository: `PROJECTS/neiri` and `PROJECTS/haos` are tracked Git submodules, while local-only working material (Blender sources, reference archives) stays untracked and gitignored. See [PROJECTS/README.md](./PROJECTS/README.md).

## Quick Start

```bash
pnpm install
pnpm verify
pnpm dev:demo
```

Useful commands:

- `pnpm typecheck`
- `pnpm test` (TypeScript: unit + UI ↔ real backend end-to-end) and `pnpm test:python` (add-on services, Domovoy, nginx wiring)
- `pnpm validate:demo`
- `pnpm build:demo`
- `pnpm build:hosted` / `pnpm build:domovoy`
- `pnpm sync:kiosk-addon-runtime`
- `pnpm release:kiosk-addon`

The demo app is a redistribution-safe browser scene that exercises:

- config loading
- JSON state/control providers
- scene normalization and orchestration
- avatar backend selection from `avatar.manifest.json`
- static avatar adapter behavior
- Live2D compatibility bridge wiring for legacy `avatar.html`

The hosted runtime is the add-on-facing variant used by `kiosk_scene`:

- it fetches `/scene-api/bootstrap`
- it loads the active pack's `renderer.kiosk-scene.json`
- it is synced into `kiosk_scene/scene-runtime-seed` (and the Domovoy extension into `kiosk_scene/extensions-seed`)
- a second entry, `admin.html`, hosts the administration shell for extension pages
