# Legal Notes

This repository is intended to be publishable as a public project.

## What this repository may contain

- generic scene engine code;
- adapter code for supported avatar runtimes;
- provider code for state and control inputs;
- schemas, docs, and build tooling;
- demo assets that are explicitly licensed for redistribution.

## What this repository must not contain by default

- proprietary Live2D models, textures, motions, expressions, or paid asset packs;
- proprietary Unity projects or third-party character assets without redistribution rights;
- user secrets, Home Assistant tokens, or production credentials;
- branded private content that belongs to a specific deployment unless its license explicitly allows redistribution.

## Distribution model

The public `kiosk-scene` core is separate from instance repos and private asset packs.

Recommended split:

- public core repo: generic code only;
- instance repo: configuration, entity mapping, branding, deployment scripts;
- private asset pack: avatar model files and restricted binaries.

## Licensing posture

This file is not legal advice. Before public release:

1. choose a license for the core code;
2. confirm redistribution rights for every bundled asset;
3. keep third-party proprietary runtimes and models outside the public repo when required by their terms.

