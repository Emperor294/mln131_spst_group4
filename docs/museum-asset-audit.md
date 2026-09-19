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

## Phase 6B production state

The production GLB now has:

- 96,082,144 bytes (91.63 MiB)
- SHA-256: `fd7783e324a0133bd3bf6847cba9b88a137f0e2588c99e98cb136bcb50f90f2e`
- unchanged scene/node/mesh/primitive/triangle/material/texture/image counts
- unchanged protected transforms, bounds, collision geometry, image payloads, and texture semantics

The only promoted change is exact duplicate-image payload deduplication. Three groups (images 41/45/49/53/57/61, 42/46/50/54/58/62, and 44/48/52/56/60/64) save 5,323,320 bytes. No texture resizing, format conversion, material merge, geometry simplification, compression extension, architecture edit, station movement, or legacy-object removal was performed.

Run `scripts/validate-museum-asset.mjs` for the current machine-readable report and protected parity checks. See `docs/museum-optimization-report.md` for ownership and promotion details.
