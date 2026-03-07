# Live2D Compliance Notes

This project can support Live2D, but the public core must stay clean of restricted model content.

## Official References

- Cubism SDK for Web:
  https://docs.live2d.com/en/cubism-sdk-manual/cubism-sdk-for-web/
- Cubism SDK release license:
  https://www.live2d.com/en/sdk/license/
- Cubism SDK overview:
  https://www.live2d.com/en/sdk/about/

## Repository Rules

- Do not commit proprietary model files to the public core.
- Do not assume redistribution rights for purchased or private model assets.
- Treat model packages, textures, and motions as instance-private unless their license clearly permits redistribution.
- Keep any user-supplied SDK installation or asset import step outside the public code bundle when required by the license.

## Adapter Design Rule

The Live2D adapter may define:

- capability contracts;
- runtime hooks;
- motion and expression mapping;
- view preset mapping;

but it should load actual model assets from an external instance manifest rather than from hardcoded public repo paths.

