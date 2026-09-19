# SOCIALISM 360 final 3D audit — Phase 6F

Phase 6F is the technical audit and freeze record for the full desktop museum.
It does not change the academic model, physical topology, GLB, or Phase 5
assessment code.

## Final 3D architecture

```text
/baotang
  ↓
MuseumExperienceGate
  ├─ Lightweight Academic Museum
  └─ Full 3D Museum (dynamic, client-only)
       ├─ protected museum.glb shell
       ├─ 6C procedural architecture and cached blockers
       ├─ 6D academic exhibits
       └─ 6E visual system
```

The full branch owns the Canvas, GLB loader, player controller, interaction
registry, zone runtime, exhibits, lighting, and dialogs. The lightweight
branch is a normal React presentation and does not mount a Canvas or import
the full game module.

## Audit findings

| Severity | Count | Finding |
| --- | ---: | --- |
| CRITICAL | 0 | No blocking load, access, collision, or data-integrity defect found by static/build validation. |
| MAJOR | 0 | No scene-wide interaction regression, fallback GLB request, or invalid spatial invariant found. |
| MINOR | 1 (fixed) | Pre-pointer-lock keydown input could be replayed at lock acquisition; corrected during this audit. |
| INFO | 4 | Browser visual/runtime profiling, deployed-binary verification, the existing legacy `<img>` lint warning, and future large-asset optimization remain manual/deferred checks. |

## Correction made

| File | Area | Issue | Correction |
| --- | --- | --- | --- |
| `src/features/game/CharacterController.tsx` | Pointer-lock input lifecycle | Keydown events were accepted before pointer lock, allowing entry/onboarding input to be replayed on lock acquisition. | Added a ref-based lock guard; movement input is now accepted only after explicit pointer-lock acquisition. Blur, visibility loss, unlock, and dialog disable continue clearing movement state. |

No movement constants, collision geometry, spawn, academic mappings, or GLB data
were changed.

## Production asset baseline

`public/museum.glb` remains the Phase 6B production binary:

- bytes: `96,082,144` (91.63 MiB)
- SHA-256: `FD7783E324A0133BD3BF6847CBA9B88A137F0E2588C99E98CB136BCB50F90F2E`
- 1 scene, 261 nodes, 93 meshes, 93 primitives, 426,771 triangles
- 42 materials, 65 textures/images (53 PNG, 12 JPEG)
- no Draco, Meshopt, or KTX2 extensions

The Phase 6B validator passes protected-node resolution, transform/bounds
parity, collision-node resolution, and structural checks. The asset is tracked
by Git LFS (`fd7783e324 * public/museum.glb`).

## Runtime integrity

- 7 rectangular physical zones; 7/7 static zone entries reachable.
- 17 academic stations and 17 data-driven exhibits; 17/17 station areas are
  statically reachable.
- 28/28 canonical concepts are covered by the existing station groupings.
- 9 legacy interaction roots + 17 academic roots = 26 logical targets.
- Interaction distance remains 8 units for legacy artifacts and 5 units for
  academic stations.
- Interaction uses the cached registry roots, nearest valid intersection, and
  cached structural/procedural occluders. No scene-wide recursive raycast is
  used.
- Four GLB collision meshes and four procedural colliders feed the same cached
  movement path. Four GLB occluders and four procedural occluders feed the
  interaction visibility check.
- Rectangular zone volumes retain the 0.35-unit exit hysteresis.
- Spatial assertions reject invalid structures, station/blocker overlap,
  invalid collider dimensions, and unreachable authored targets at build time.

## Input, pointer lock, and dialogs

The controller retains WASD movement, Space jump, gravity, camera-relative
movement, and horizontal collision resolution. Key, blur, visibility, unlock,
and disabled-state cleanup are registered with matching teardown. Pointer lock
is entered only by user action and Escape/unlock clears movement state.

Opening either dialog disables the controller and interaction highlighter;
closing restores the normal scene path. Concept and legacy dialogs remain
separate and use their existing canonical content flows.

## Loading, isolation, and fallback

- `Full3DMuseum` is a Next dynamic import with `ssr: false`.
- No `useGLTF.preload` call exists for the museum asset.
- `/museum.glb` is referenced only by the full `GameModel` branch.
- Lightweight mode renders without Canvas and has no full-3D import path.
- Full-3D loading uses Drei `useProgress`; no artificial timer is used.
- The error boundary switches to the lightweight museum if the full branch
  throws. WebGL/capability detection selects lightweight mode for coarse
  pointers, narrow viewports, save-data connections, or unavailable WebGL.

## Rendering and performance profile

Structural/runtime facts (not an FPS claim):

- 3 lights, 0 shadow-casting lights, Canvas shadows disabled.
- no bloom, post-processing, external HDR, audio, or new network assets.
- Canvas DPR remains `[1, 1.5]`.
- 34 procedural physical structures; 4 procedural colliders and 4 procedural
  occluders.
- 77 academic exhibit mesh elements, 3 shared primitive geometries, a small
  shared material palette, and 0 exhibit animation loops.
- Frame-loop vectors, raycasters, and intersection arrays are held in refs and
  reused. Semantic React updates occur only for target/zone changes.
- Procedural geometry/material ownership is memoized and disposed on layer
  teardown; GLTF-owned materials are not disposed by procedural layers.

Measured build-visible route sizes are recorded in
[`museum-performance.md`](./museum-performance.md). No browser FPS, renderer
statistics, heap profile, or localhost network timing is claimed here because
browser profiling was not available during this audit.

## Accessibility and reduced motion

The final code review confirms semantic status text for loading, onboarding,
zone HUD/toasts, and interaction prompts; non-color zone identity through
numbers, titles, and physical placement; separate academic/legacy prompt
labels; and readable dialog overlays. No required academic information
depends on animation, and the existing reduced-motion CSS path remains in
place. Keyboard-only overlay and dialog focus behavior remains part of the
manual QA checklist.

## Legacy and academic status

All nine legacy objects remain interactive, draft/review-required, and
academically unassigned. No legacy node was renamed, removed, or rebound.
Academic data remains 7 zones, 17 stations, 17 exhibits, and 28 concepts.
No chapter, lesson, source, MuseumConcept, MuseumZone, quiz, progress, or
assessment file changed in Phase 6F.

## Deployment status

The local working tree contains the actual GLB and Git LFS reports the asset.
No deployed URL/configuration was available for this audit, so the deployed
`/museum.glb` binary, content length, content type, cache headers, and deployed
hash remain a release/deployment QA check. The required manual check is to
request the deployed asset, reject a ~134-byte LFS pointer response, and hash
the downloaded binary against the production hash above.

## Remaining release checks

These are manual QA/deployment checks, not code findings:

- 1440×900, 1366×768, and 1024×768 walk-throughs covering lobby, Zones 1, 3,
  5, 6, and 7; all 17 stations; several legacy objects; collision; occlusion;
  dialogs; pointer-lock re-entry; and reduced motion.
- 390px/coarse-pointer fallback check confirming no Canvas and no GLB request.
- Browser network/request count, renderer statistics, memory observation, and
  deployed Vercel binary/hash verification.

## Freeze boundary

Phase 6 v1 freezes the hybrid GLB + R3F architecture, seven physical zones,
17 academic exhibits, 28 concepts, nine legacy targets, adaptive lightweight
fallback, local three-light/no-shadow rendering, no post-processing, and no
external 3D/network exhibit assets. Future changes require a new explicit
phase; Phase 7 was not started.
