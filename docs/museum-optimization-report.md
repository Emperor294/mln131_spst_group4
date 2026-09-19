# Phase 6B museum optimization report

## Scope and policy

Phase 6B is a controlled asset-maintenance pass. It does not remodel the museum, move stations, alter collision, or curate legacy exhibits. The only production transformation promoted here is exact embedded-image deduplication: image payload bytes are shared through existing glTF `bufferView` references while image, texture, sampler, UV, material, node, and transform semantics remain unchanged.

The Phase 6A input baseline was:

| Measure | Input |
| --- | ---: |
| File | `public/museum.glb` |
| Bytes | 101,405,464 (96.71 MiB) |
| SHA-256 | `7956a554d01bdfd38143f8b59bab9d665835c6798aadd626ad33ee92f5a645fb` |

## Production output

The production asset now contains the same 65 image resources and the same decoded image payloads, but duplicate image `bufferView`s point to one canonical copy. No meshes, transforms, materials, collision objects, or runtime names were edited.

| Measure | Output |
| --- | ---: |
| Bytes | 96,082,144 (91.63 MiB) |
| Bytes saved | 5,323,320 |
| Reduction | 5.25% |
| SHA-256 | `fd7783e324a0133bd3bf6847cba9b88a137f0e2588c99e98cb136bcb50f90f2e` |

The new hash is the Phase 6B production baseline for Phase 6C. Git history/LFS provides rollback; a second large GLB is not checked in.

## Structural parity

The before/after validator reports the same 1 scene, 261 nodes, 93 meshes, 93 primitives, 426,771 triangles, 42 materials, 65 textures, and 65 images. The four collision/occluder nodes and all nine interaction names resolve exactly once. Whole-scene bounds, collision bounds, and every protected node's local matrix, world matrix, and subtree bounds pass the baseline comparison with a `1e-5` tolerance.

The three exact duplicate groups are:

| Image indices | Bytes each | Duplicate bytes removed |
| --- | ---: | ---: |
| 41, 45, 49, 53, 57, 61 | 346,772 | 1,733,860 |
| 42, 46, 50, 54, 58, 62 | 693,204 | 3,466,020 |
| 44, 48, 52, 56, 60, 64 | 24,688 | 123,440 |

The actual file reduction equals the theoretical duplicate payload total. Texture objects, sampler indices, material slots, UV sets, and alpha modes were not merged or rewritten.

As an additional byte-level check, all 65 per-image SHA-256 values match the
Phase 6A LFS object; only the containing buffer-view layout changed.

## Major texture ownership

The validator follows `image → texture → material → primitive → node`:

| Image | Profile | Ownership | Classification |
| --- | --- | --- | --- |
| 1 | 4096×4096 PNG, 28,477,868 bytes, color type 6 (alpha channel present) | texture 1 → material 0 → mesh 0 → `Plane040_Material023_0` | architecture/room surface; review alpha usage visually before any resize |
| 6 | 2048×2048 PNG, 11,525,656 bytes, color type 6 | texture 6 → material 2 → mesh 2/13/15/17 → four `Plane042/057/058/059_Material_0` nodes | collision/architectural shell; protected; do not resize without visual and collision QA |
| 0 | 4096×4096 JPEG, 5,975,920 bytes | texture 0 → material 0 → mesh 0 → `Plane040_Material023_0` | architectural surface; JPEG was not re-encoded |
| 47 | 1600×985 PNG, 3,279,248 bytes, color type 6 | texture 47 → material 33 → mesh 84 → `Cube_Mat-pic_0` | picture/legacy context; visual review candidate |

The two large PNGs expose an alpha-capable PNG color type; this is not proof that meaningful transparent pixels are used. Alpha-required/opaque-pixel classification still needs decoded-pixel inspection and browser review before conversion. No texture was downscaled or converted in Phase 6B.

## Geometry and legacy cost

The highest triangle concentrations remain legacy or prop-like resources: mesh 41 (`bacho`) 99,999 triangles, mesh 39 (`aonau`) 94,972, unbound `aotim` mesh 19 91,915, and food/prop meshes 71–74 at 51,984/24,384/18,592/12,288 triangles. The first three account for about 67% of scene triangles. `aotim` is present but not bound by runtime code; it is a Phase 6C removal/review candidate, not a Phase 6B deletion.

Approximate resource ownership for the protected legacy roots (unique image bytes within the root's material closure, so shared images can be counted in multiple rows) is:

| Root | Triangles | Unique image bytes | Phase 6B decision |
| --- | ---: | ---: | --- |
| `bacho` | 99,999 | 298,340 | keep protected; redesign/replacement review later |
| `aonau` | 94,972 | 277,456 | keep protected; redesign/replacement review later |
| `tuyenngon` | 28 | 2,178,116 | keep binding; visual curation later |
| `aodai` | 4,679 | 3,925,148 | keep binding; visual curation later |
| `anh3` | 28 | 4,343,912 | keep binding; visual curation later |
| `Cone` | 192 | 2,337,448 | keep binding; visual curation later |
| `anh1` | 28 | 1,503,288 | keep binding; visual curation later |
| `anh2` | 28 | 2,386,316 | keep binding; visual curation later |
| `CoffeeTable` | 1,164 | 2,476,300 | keep binding; visual curation later |

The flag outlier (`vietnam_flag.glb`) is 5,794 triangles and extends the whole-scene bounds; it remains untouched and is a Phase 6C spatial-review item. No legacy object received an academic assignment.

## Deferred experiments

The following were deliberately not promoted:

- 4096→2048 or 2048→1024 resizing: visually sensitive and browser visual QA is unavailable.
- PNG→WebP or JPEG re-encoding: potentially lossy/alpha-sensitive; no human comparison was performed.
- Lossless PNG recompression: no existing local tool was available that could be added without expanding the dependency surface.
- Geometry simplification/decimation: the largest meshes are likely legacy/prop candidates for Phase 6C, and simplification could alter silhouette and interaction expectations.
- Material consolidation, double-sided changes, Draco, Meshopt, and KTX2: all deferred until the physical redesign stabilizes and a verified runtime decoding/visual QA path exists.

No temporary candidate GLB is tracked in the repository. The candidate was validated outside the repository and then promoted; it may be removed after review.

## Reproducible pipeline

```text
node scripts/validate-museum-asset.mjs --asset public/museum.glb
node scripts/optimize-museum-asset.mjs \
  --input public/museum.glb \
  --output <temporary-candidate.glb> \
  --expected-sha 7956A554D01BDFD38143F8B59BAB9D665835C6798AADD626AD33EE92F5A645FB
node scripts/validate-museum-asset.mjs \
  --asset <temporary-candidate.glb> \
  --baseline scripts/fixtures/museum-asset-baseline.json
```

The optimizer refuses to overwrite its input and checks the expected source hash. The validator fails on malformed GLB structure, empty/invalid bounds, missing or ambiguous protected nodes, collision loss, or protected transform/bounds drift. There is no external glTF validator installed in this checkout; the scripts perform deterministic structural and parity checks and should be supplemented by a browser loader/runtime smoke test.

## Future 6C opportunity

The largest likely future savings are physical-curation decisions around the three high-poly imported props (`bacho`, `aonau`, and unbound `aotim`) plus meshes 71–74 and the 4096/2048 architectural textures. Those decisions belong to the seven-zone redesign, where removal, replacement, or a procedural R3F exhibit can be judged visually and academically. Phase 6B intentionally leaves them intact.
