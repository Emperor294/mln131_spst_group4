# Museum asset audit

This document preserves the Phase 6A input profile and the Phase 6B production update. The GLB is intentionally versioned by Git/LFS rather than by checking in a second large binary.

## Phase 6A input baseline

- `public/museum.glb`: 101,405,464 bytes (96.71 MiB)
- SHA-256: `7956a554d01bdfd38143f8b59bab9d665835c6798aadd626ad33ee92f5a645fb`
- 1 scene, 261 nodes, 93 meshes, 93 primitives, 426,771 triangles
- 42 materials, 65 textures/images (53 PNG, 12 JPEG)
- no Draco, Meshopt, or KTX2 compression
- embedded image bytes: 86,053,744

The Phase 6A structural, spatial, protected-node, and redesign observations remain the reference for the inherited environment. The browser visual audit was not performed in that phase.

The inherited runtime profile remains 7 logical zones, 17 academic stations,
28 concepts, 9 legacy artifact targets, 4 structural collision/occluder
meshes, and player spawn `[0, 1.7, 3]`. The GLB is an imported open-office /
gallery shell with repeated `Sketchfab_model`, `root`, `GLTF_SceneRootNode`,
and `Object_4` names. `AmbientLight` is a node name only; current lighting is
supplied by the R3F scene and there are no embedded punctual lights.

The Phase 6A bounds remain useful for later redesign review:

| Region | min (x,y,z) | max (x,y,z) |
| --- | --- | --- |
| Whole GLB, including the imported flag outlier | (-4.071, -3.645, -5.901) | (9.818, 8.449, 5.016) |
| Four structural collision meshes | (-4.071, -1.974, -5.901) | (4.071, 8.449, 4.534) |
| Authored walk rectangle | approximately (-4.05, -, -5.55) | (4.05, -, 4.10) |
| Player spawn | (0, 1.7, 3) | point |

The R3F layer remains responsible for the procedural floor, sky/lights, all 17
academic stations, zone signage/accents, movement, cached collision/occlusion,
HUD, onboarding, and dialogs. The GLB supplies the inherited shell and props.
The current seven zone centers are logical overlays rather than seven physical
rooms; their static spacing and wall/legacy-object congestion remain Phase 6C
review items. No station or flag coordinates changed in Phase 6B.

The highest geometry concentrations remain mesh 41 (`bacho`, 99,999
triangles), mesh 39 (`aonau`, 94,972), unbound `aotim` mesh 19 (91,915), and
food/prop meshes 71–74 (51,984/24,384/18,592/12,288). The first three are
about 67% of the scene triangles. Materials remain 39 OPAQUE and 3 BLEND;
39 are double-sided. These are redesign/visual-review candidates, not blind
optimization targets.

## Phase 6B production state

The production GLB now has:

- 96,082,144 bytes (91.63 MiB)
- SHA-256: `fd7783e324a0133bd3bf6847cba9b88a137f0e2588c99e98cb136bcb50f90f2e`
- unchanged scene/node/mesh/primitive/triangle/material/texture/image counts
- unchanged protected transforms, bounds, collision geometry, image payloads, and texture semantics

The only promoted change is exact duplicate-image payload deduplication. Three groups (images 41/45/49/53/57/61, 42/46/50/54/58/62, and 44/48/52/56/60/64) save 5,323,320 bytes. No texture resizing, format conversion, material merge, geometry simplification, compression extension, architecture edit, station movement, or legacy-object removal was performed.

Run `scripts/validate-museum-asset.mjs` for the current machine-readable report and protected parity checks. See `docs/museum-optimization-report.md` for ownership and promotion details.
