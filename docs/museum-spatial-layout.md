# SOCIALISM 360 museum spatial layout

Phase 4C adds a serializable academic layer inside the existing `museum.glb`.
The GLB remains the physical environment; these positions are lightweight,
non-collidable learning stations placed in its walkable interior.

## Authoring reference

- Approximate GLB bounds: `x -4.05..4.05`, `z -5.55..4.10` for the primary walkable rectangle.
- Player spawn: `[0, 1.7, 3]` (camera height; station bases use `y = 0`).
- Collision geometry is retained unchanged. Stations are visual/procedural and do not add collision meshes.
- Legacy object coordinates were inspected before authoring. Stations avoid the known artifact cluster and the four boundary collision meshes.

## Zone centres

| Zone | Centre (x, y, z) | Activation radius |
| --- | --- | --- |
| 01 | `[0, 0, 2.35]` | 1.45 |
| 02 | `[2.6, 0, 2.35]` | 1.45 |
| 03 | `[-2.6, 0, 2.35]` | 1.45 |
| 04 | `[-2.35, 0, -0.1]` | 1.45 |
| 05 | `[0, 0, -0.55]` | 1.45 |
| 06 | `[2.6, 0, -0.55]` | 1.45 |
| 07 | `[0, 0, -3.35]` | 1.45 |

## Station authoring

The complete station-to-concept mapping is the source of truth in
`src/features/museum/data/concept-stations.ts`. There are 17 physical
stations covering all 28 concepts. Grouping is spatial only: the canonical
`MuseumConcept` records remain separate and are navigated inside
`ConceptDialog`.

The concept IDs below omit the shared `museum-concept-` prefix for compactness.

| Station | Position (x, y, z) | Concept IDs |
| --- | --- | --- |
| `station-zone01-origins` | `[-0.8, 0, 2.35]` | `ch01-origins`, `ch01-development` |
| `station-zone01-method` | `[0.8, 0, 2.35]` | `ch01-marx-engels`, `ch01-research` |
| `station-zone02-worker` | `[2, 0, 2.35]` | `ch02-worker`, `ch02-mission` |
| `station-zone02-conditions` | `[3.25, 0, 2.35]` | `ch02-conditions`, `ch02-vietnam` |
| `station-zone03-socialism` | `[-3.25, 0, 2.35]` | `ch03-socialism` |
| `station-zone03-transition` | `[-2, 0, 2.35]` | `ch03-transition`, `ch03-vietnam-path` |
| `station-zone04-democracy` | `[-2.8, 0, 0.2]` | `ch04-democracy`, `ch04-state` |
| `station-zone04-relationship` | `[-1.55, 0, 0.2]` | `ch04-democracy-state` |
| `station-zone05-structure` | `[-0.8, 0, -0.55]` | `ch05-structure`, `ch05-transformation` |
| `station-zone05-necessity` | `[0.8, 0, -0.55]` | `ch05-alliance-necessity` |
| `station-zone05-alliance` | `[0, 0, -1.85]` | `ch05-vietnam-alliance`, `ch05-alliance-contents` |
| `station-zone06-nation` | `[2, 0, -0.55]` | `ch06-nation-meanings`, `ch06-national-relations` |
| `station-zone06-religion` | `[3.25, 0, -0.55]` | `ch06-religion-framework`, `ch06-religion-principles` |
| `station-zone06-relations` | `[2.6, 0, -1.85]` | `ch06-ethnic-religious-relations` |
| `station-zone07-position` | `[-2, 0, -3.05]` | `ch07-family-position`, `ch07-family-functions` |
| `station-zone07-foundations` | `[0.15, 0, -2.8]` | `ch07-family-foundations` |
| `station-zone07-vietnam` | `[2, 0, -3.35]` | `ch07-vietnamese-family` |

Stations are intentionally non-collidable, use basic procedural geometry, and
are kept away from narrow edges and the spawn path. Zone 5 uses the alliance
variant for its central station without implying that the three displayed
groups exhaust the wider social-class structure.

## Manual QA

1. Enter `/baotang` and confirm the spawn area remains clear.
2. Walk to each numbered sign and confirm the zone HUD changes once per zone.
3. Approach every station, aim at its panel, and confirm the prompt/crosshair.
4. Open grouped concepts with the station dialog and use previous/next controls.
5. Follow the chapter CTA, return to the museum, and confirm pointer lock can be re-entered.
6. Confirm legacy artifacts still open the legacy artifact dialog independently.
7. Inspect Zone 5, Zone 6, and Zone 7 wording for semantic and visual neutrality.
