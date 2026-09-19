# SOCIALISM 360 museum performance record — Phase 6F

This document records measured build/static facts only. It intentionally does
not invent FPS, GPU, heap, or network-transfer numbers.

## Asset and scene facts

| Measure | Production value |
| --- | ---: |
| `public/museum.glb` | 96,082,144 bytes / 91.63 MiB |
| SHA-256 | `FD7783E324A0133BD3BF6847CBA9B88A137F0E2588C99E98CB136BCB50F90F2E` |
| GLB nodes / meshes / primitives | 261 / 93 / 93 |
| GLB triangles | 426,771 |
| GLB materials / images | 42 / 65 |
| Procedural structures | 34 |
| Procedural colliders / occluders | 4 / 4 |
| Academic exhibit mesh elements | 77 |
| Academic exhibit animation loops | 0 |
| Lights / shadow lights | 3 / 0 |
| Post-processing passes | 0 |
| Canvas DPR | `[1, 1.5]` |

## Build-visible route sizes

The production `next build` summary reports the following route JavaScript
sizes. “First Load JS” is Next's build-visible figure, not a network-transfer
measurement.

| Route | Route size | First Load JS |
| --- | ---: | ---: |
| `/` | 798 B | 144 kB |
| `/chapters` | 2.32 kB | 143 kB |
| chapter route | 5.31 kB | 111 kB |
| quiz route | 4.69 kB | 169 kB |
| `/progress` | 2.91 kB | 144 kB |
| `/baotang` | 5.43 kB | 170 kB |
| shared by all | — | 102 kB |

The full 3D module is dynamically isolated behind the `/baotang` experience
gate. No assessment/progress route imports Three.js, R3F, the museum GLB, or
the full game runtime.

## Hot-loop and lifecycle audit

- `CharacterController`, `ObjectHighlighter`, and `MuseumZoneRuntime` are the
  only continuous R3F frame paths in the museum runtime.
- Controller vectors, raycasters, collision intersections, interaction
  intersections, and zone state are reused through refs.
- Interaction and collision each traverse only their cached root arrays; no
  `scene.children` interaction scan exists.
- React state changes are semantic (lock, hover target, active zone, dialogs,
  toasts), not unconditional per-frame updates.
- Global keyboard, blur, visibility, pointerdown, and dialog listeners have
  cleanup paths. Controller input is now ignored until pointer lock is active.
- Procedural layer geometries/materials are memoized and disposed by their
  owning layer. GLTF-owned materials remain untouched.

## Loading/network boundaries

The only production code reference to `/museum.glb` is the dynamically loaded
full-3D `MuseumModel`. There is no model preload call. Lightweight mode and
all non-museum routes have no architectural path to request the GLB. A fresh
full-3D browser request and deployed content length still require manual
browser/deployment measurement.

## Not measured in this environment

No browser automation/runtime profiler was available for this audit. Therefore
there is no claimed FPS, renderer `info.render.calls`, triangle throughput,
heap-growth result, exact request timing, cache-header result, or Vercel
deployment hash. These remain explicit release QA tasks.
