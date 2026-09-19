# Phase 6C physical seven-zone museum redesign

## Scope

Phase 6C changes the physical presentation layer only. `public/museum.glb` is
not edited. Academic content, MuseumZone/MuseumConcept meanings, legacy
bindings, assessment, and the lightweight fallback remain unchanged.

The implementation is a hybrid:

```text
stable museum.glb shell
        +
source-controlled procedural R3F architecture
        ↓
lobby + seven open exhibition bays
```

The authored shell is intentionally not seven enclosed rooms. It uses portal
frames, partial-height display partitions, floor markers, and grouped station
placements so the visitor can read the museum spatially while retaining clear
circulation and sightlines.

## Lobby

The existing spawn `[0, 1.7, 3]` remains in place. Around it, a restrained
lobby frame and floor marker establish the entry. A compact world-space panel
shows:

- SOCIALISM 360;
- Explore · Interact · Understand;
- the seven numbered destinations.

The lobby is orientation, not an eighth lesson. It contains no long academic
copy and does not remove the visitor's ability to move directly toward any
open bay.

## Physical topology

| Zone | Entry / center | Stations | Physical treatment | Circulation relationship |
| --- | --- | ---: | --- | --- |
| 01 | Front center, `(0, 1.9)` | 2 | Wide introductory portal, paired side partitions, floor marker | First bay directly beyond the lobby |
| 02 | Front east, `(2.4, 1.9)` | 2 | East-side portal and floor delineation | Open branch from the front spine |
| 03 | Front west, `(-2.4, 1.9)` | 2 | West-side portal and floor delineation | Open branch opposite Zone 2 |
| 04 | Mid west, `(-2.4, -0.4)` | 2 | West portal and open floor bay | Branches from the front/mid circulation path |
| 05 | Mid center, `(0, -0.65)` | 3 | Broad flagship threshold and enlarged central floor marker | Central connector between west/east bays |
| 06 | Mid east, `(2.4, -0.8)` | 3 | East portal, neutral geometry, and floor bay | Open branch from the central connector |
| 07 | Rear, `(0, -3.55)` | 3 | Wide rear portal and large abstract floor field | Final/rear destination with a return sightline |

The guided narrative remains `ENTRY → 01 → 02 → 03 → 04 → 05 → 06 → 07`,
but there are no doors, teleporters, or forced transitions.

## Station relocation

All 17 stations remain registered and keep their canonical IDs/concepts. The
main changes are deliberate spacing and bay grouping:

- Zone 5 alliance moved away from Zone 7 foundations;
- Zone 2/3 stations moved inward from the structural side walls;
- Zone 4 relationship moved into its west bay rather than the central seam;
- Zone 6 stations moved clear of the east wall and portal posts;
- Zone 7 stations form a broad rear row rather than crowding the central bay.

The layout stores station positions in one map and the existing station registry
consumes those positions. Academic summaries are not copied into layout data.

## Physical structures

`MUSEUM_PHYSICAL_STRUCTURES` currently defines 34 lightweight structures:

- 4 lobby frame/marker elements;
- 21 portal elements (7 headers and 14 open posts);
- 2 collidable Zone 1 partial partitions;
- 7 zone floor markers.

The renderer uses one shared unit `BoxGeometry` and shared standard materials
per shell/accent family. There are no per-zone lights, shadows, external assets,
or physics dependencies.

Portal posts and headers are orientation elements and remain open. Only the
partial bay partitions and lobby frame posts are registered as movement
colliders/occluders.

## Collision architecture

The four GLB collision meshes remain the authoritative inherited shell. New
procedural meshes register through `userData.museumCollider` and are collected
once by the existing `findMuseumCollisionMeshes()` setup path. The existing
CharacterController ray-based movement therefore resolves both GLB and
procedural blockers without a new physics engine.

- GLB collision structures: 4
- Procedural colliders: 4
- Player clearance used by static validation: 0.42 world units

No collider is recreated per frame.

## Occlusion architecture

The same static procedural partition meshes register as occluders through
`userData.museumOccluder`. ObjectHighlighter's existing cached occluder ray
test now considers both the four GLB occluders and the procedural set.

- GLB occluders: 4
- Procedural occluders: 4
- Scene-wide recursive raycast: not introduced
- Per-frame scene traversal: not introduced

This prevents academic stations and legacy artifacts from being activated
through a new solid-looking partition.

## Zone detection

Zone detection now uses the same rectangular bay volumes authored in
`museum-layout-v2.ts`, rather than relying only on overlapping radial circles.
The previous hysteresis behavior is preserved with a 0.35-unit expanded exit
margin, preventing HUD flicker at bay boundaries.

## Static reachability

`museum-layout-validation.ts` performs a lightweight 2D flood-fill over the
walkable bounds using 0.2-unit cells and 0.42-unit player clearance. It checks
zone entries, station bases, duplicate IDs, collider dimensions, station/base
overlap, and spawn validity.

Current result:

- Zone entries reachable: **7 / 7**
- Stations reachable: **17 / 17**
- Spawn inside collider: **no**
- Canonical concepts reachable: **28 / 28**

This is static geometry validation, not a replacement for a real browser walk
test.

## Debug mode

Append `?museumDebug=1` to `/baotang` to show a development-only layout panel
and wireframes for procedural occluders. Production mode has no top-down map or
technical labels.

## Legacy coexistence

All nine legacy artifact targets remain in the GLB and retain their exact
bindings. No object was deleted, hidden, moved in the GLB, or given a canonical
academic assignment. The `vietnam_flag.glb` outlier remains a later visual
review item.

## Visual QA limitation

Browser visual QA was not available during this implementation. The following
must be reviewed at 1440×900 (and optionally 1366×768) before finalizing the
art direction:

- lobby sightline toward multiple bays;
- Zone 1 and Zone 3 front-bay separation;
- Zone 5 breathing room and centrality;
- Zone 6/7 neutral abstract presentation;
- partition height and perceived openness;
- signage readability and clipping;
- station scale and legacy-object clutter;
- collision/occlusion behavior while walking.

Phase 6D may now fill these spaces with detailed academic installations. Phase
6E remains responsible for final lighting, material direction, and atmosphere.
