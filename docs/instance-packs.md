# Instance Packs

An instance pack is the deployment-specific layer on top of the public core.

Examples:

- `neiri-scene`
- a public demo scene
- a customer-specific kiosk package

## Instance responsibilities

- assistant naming and branding
- avatar manifest
- scene config
- state provider configuration
- control provider configuration
- entity mapping
- deployment output path

## What should remain outside the instance repo when needed

- proprietary model binaries
- secrets
- customer-private assets

