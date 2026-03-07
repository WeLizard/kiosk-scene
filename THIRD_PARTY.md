# Third-Party Technology Notes

This document tracks the primary external technologies that the public core is designed to work with.

## Live2D

- Cubism SDK for Web manual:
  https://docs.live2d.com/en/cubism-sdk-manual/cubism-sdk-for-web/
- SDK release license:
  https://www.live2d.com/en/sdk/license/
- SDK overview:
  https://www.live2d.com/en/sdk/about/

Important note:

- `Cubism Core` is distributed through Live2D's official SDK package flow and is not treated here as a public repo dependency to vendor blindly.

## Unity WebGL

- Browser compatibility:
  https://docs.unity3d.com/kr/6000.0/Manual/webgl-browsercompatibility.html
- Web technical limitations:
  https://docs.unity3d.com/cn/2023.2/Manual/webgl-technical-overview.html
- WebGL input behavior:
  https://docs.unity3d.com/cn/2022.2/Manual/webgl-input.html

Important notes:

- Unity support in this project means browser-hosted Unity WebGL builds, not a native Unity runtime.
- Browser and iframe limitations must be documented by the Unity adapter.

