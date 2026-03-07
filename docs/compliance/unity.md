# Unity WebGL Compliance and Runtime Notes

This project may support Unity through browser-hosted Unity WebGL builds.

## Official References

- Browser compatibility:
  https://docs.unity3d.com/kr/6000.0/Manual/webgl-browsercompatibility.html
- Web technical limitations:
  https://docs.unity3d.com/cn/2023.2/Manual/webgl-technical-overview.html
- WebGL input behavior:
  https://docs.unity3d.com/cn/2022.2/Manual/webgl-input.html

## Design Rules

- Treat Unity support as a separate adapter, not as a core assumption.
- Expect Chromium-first deployments for kiosk usage.
- Document iframe limitations and unsupported browser combinations in the adapter docs.
- Keep Unity builds instance-supplied when they include restricted content.

## Operational Notes

- Unity WebGL can capture keyboard input aggressively.
- Browser support and performance differ from Live2D.
- Safari iframe storage limitations must be considered when documenting portability outside the kiosk target.

