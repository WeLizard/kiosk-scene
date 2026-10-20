# PROJECTS

Subprojects that belong to this repository. Each entry is either a Git
submodule (tracked) or local-only working material (untracked, gitignored).

| Path | Kind | Source |
| --- | --- | --- |
| `neiri/` | Git submodule (private, requires access) | https://github.com/WeLizard/neiri |
| `haos/` | Git submodule | https://github.com/WeLizard/HAOS-kiosk |
| `blend/` | Local only, ignored | Blender sources and rig reports |
| `legacy-neiri-pilot/` | Local only, ignored | Early Neiri pilot and rig kit |
| `references/` | Local only, ignored | Archived character, rig and chat references |
| `motion-lab/` | Local only, ignored | Neiri motion and rig experiments |

Local-only directories never enter the public repository: they contain
proprietary models, private media and history, which the asset policy in
[ASSET_POLICY.md](../ASSET_POLICY.md) keeps out of the published core.

## Init

```bash
git clone --recurse-submodules https://github.com/WeLizard/kiosk-scene.git
# or, in an existing checkout:
git submodule update --init PROJECTS/neiri PROJECTS/haos
```

The Neiri instance resolves the engine root by walking from its own
location (`../`, `../kiosk-scene`, `../../`, `../../kiosk-scene`), so it
builds both as `PROJECTS/neiri` inside this repository and as a sibling
checkout next to it.

## Updating a subproject

```bash
git -C PROJECTS/neiri pull --ff-only
git -C PROJECTS/haos pull --ff-only
git add PROJECTS/neiri PROJECTS/haos
git commit -m "Advance subproject pointers"
```
