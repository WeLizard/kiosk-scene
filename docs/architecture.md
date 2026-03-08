# Architecture

## Overview

`kiosk-scene` is the scene layer between a kiosk runtime and avatar-specific rendering backends.

The architecture is intentionally split into four concerns:

1. kiosk runtime
2. scene core
3. avatar adapter
4. instance pack

## Boundaries

### Kiosk runtime

The kiosk runtime is out of scope for this repo. It should only:

- open a stable URL;
- refresh or restore the display;
- control screen power and input;
- expose kiosk-safe browser settings.

It must not own avatar layout, page orchestration, or state rules.

### Scene core

The core owns:

- page layout;
- carousel state and orchestration;
- manual carousel navigation on top of automatic rotation;
- loader lifecycle;
- widget composition;
- state and control precedence;
- adapter lifecycle and message passing.

The core does not own:

- proprietary model assets;
- Home Assistant entity names;
- instance branding;
- backend-specific rendering internals.

For the current kiosk shell, the layout contract is not abstract:

- avatar panel stays on the left
- carousel and assistant content stay on the right
- avatar view presets stay in the avatar panel
- carousel `prev`, `next`, and dot navigation feed the same control layer as external display commands

### Avatar adapter

An adapter translates generic scene commands into backend-specific behavior.

The adapter contract should support:

- `mount`
- `dispose`
- `setState`
- `setCue`
- `setViewPreset`
- `showBubble`
- `getCapabilities`

Backends may include:

- Live2D
- Unity WebGL
- static portrait

The current Live2D path is intentionally pragmatic: `packages/adapter-live2d` hosts the existing browser runtime through an iframe bridge and translates generic scene commands into the legacy `postMessage` protocol. That keeps migration risk low while the instance repo is being split from the old prototype.

### Browser shell

`packages/shell-browser` is the current browser-facing implementation of the kiosk shell:

- left avatar panel;
- right carousel panel;
- avatar view preset controls;
- overview page composition that mirrors the current Neiri deployment pattern;
- dynamic card pages backed by normalized scene config.

Apps such as `apps/demo-generic`, `apps/hosted-runtime`, and instance wrappers such as `neiri-scene/app` should stay thin and configure this shell rather than forking its runtime logic.

`apps/hosted-runtime` is the canonical hosted entrypoint for the standalone `Kiosk Scene` add-on: it loads `/scene-api/bootstrap`, resolves the active pack URLs, and then boots the generic shell.

### Instance pack

Instance repos such as `neiri-scene` should provide:

- branding;
- scene defaults;
- state provider wiring;
- control provider wiring;
- entity mapping;
- deployment scripts;
- private asset references.

## State vs Control

The engine must keep these separate:

- `state`: what the assistant is actually doing
- `control`: temporary overrides for what the display should show right now

Canonical semantic fields:

- `state.emotion`
- `state.activity`
- `state.cue`
- `control.cue.cue`
- optional `speaking`
- optional `intensity`

Legacy compatibility fields still accepted during migration:

- `state.motion`
- `control.cue.motion`

Recommended precedence:

1. `control.cue`, `control.page`, `control.viewPreset`
2. explicit cues in `state`
3. backend-published state
4. frontend inference

## Config Surface

The public config surface is defined by versioned schemas:

- `renderer.config.schema.json`
- `avatar.manifest.schema.json`
- `scene.schema.json`
- `state.schema.json`
- `control.schema.json`

## Migration Path from Local Prototype

The local `neiri-scene` prototype should be split as follows:

- generic state and control logic to `packages/core`
- Live2D renderer hosting and bridge logic to `packages/adapter-live2d`
- Home Assistant state reads to `packages/provider-ha`
- JSON polling fallbacks to `packages/provider-json`
- generic page widgets to `packages/widgets-core`
- Neiri-specific pages, names, entities, and asset references stay in the instance repo
