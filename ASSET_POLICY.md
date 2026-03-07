# Asset Policy

`kiosk-scene` accepts only assets that can be lawfully redistributed in the repository.

## Allowed in the public repo

- original project code;
- original SVG icons, CSS, and example UI assets created for this project;
- demo media with explicit redistribution rights;
- schemas and configuration examples;
- adapter code that references external runtimes without embedding restricted files.

## Not allowed in the public repo

- Live2D model files such as `.moc3`, paid textures, paid motions, or private `.model3.json` bundles;
- Unity WebGL build output tied to proprietary avatar content unless redistribution is explicitly allowed;
- private home layouts, photos, or customer-specific art;
- copied vendor files that require a separate download flow if their license does not permit repo distribution.

## Operational Rule

Instance repos such as `neiri-scene` may reference:

- a private asset root;
- a private deployment package;
- a user-supplied SDK download;

but the public core must not depend on committed restricted assets.

