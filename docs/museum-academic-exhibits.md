# SOCIALISM 360 academic exhibits — Phase 6D

Phase 6D adds a source-controlled academic exhibit layer to the existing
physical museum. The GLB remains the architectural shell; the 17 exhibit
installations are lightweight procedural R3F geometry attached to the existing
station roots.

## Architecture

```text
MuseumConcept
    ↓
station grouping
    ↓
academic-exhibits.ts manifest
    ↓
AcademicExhibitLayer
    ↓
existing station interaction root
    ↓
ConceptDialog
```

The manifest stores station/zone/concept IDs and a finite visualization variant.
It does not duplicate summaries, lesson text, citations, or source references.
ConceptDialog remains the detailed academic and provenance layer.

## Visualization vocabulary

The renderer uses a small vocabulary of shared primitives:

- timeline markers;
- foundation pillars and frames;
- clusters and networks;
- layered panels;
- neutral frameworks;
- sequences;
- equal comparison panels;
- relationship connectors and bridges;
- parallel pillars.

All geometry uses shared box, cylinder, and torus resources. The layer has no
external models, textures, audio, particles, post-processing, or per-exhibit
lights. It uses no ambient animation, so reduced-motion users receive the same
static conceptual structure.

## Exhibit matrix

| Exhibit | Zone | Station | Visualization | Concepts | Collision |
|---|---:|---|---|---:|---|
| Zone 1 origins | 1 | station-zone01-origins | timeline | 2 | none |
| Zone 1 method | 1 | station-zone01-method | foundation | 2 | none |
| Zone 2 worker | 2 | station-zone02-worker | cluster | 2 | none |
| Zone 2 conditions | 2 | station-zone02-conditions | layers | 2 | none |
| Zone 3 socialism | 3 | station-zone03-socialism | framework | 1 | none |
| Zone 3 transition | 3 | station-zone03-transition | sequence | 2 | none |
| Zone 4 democracy | 4 | station-zone04-democracy | comparison | 2 | none |
| Zone 4 relationship | 4 | station-zone04-relationship | relationship | 1 | none |
| Zone 5 structure | 5 | station-zone05-structure | comparison | 2 | none |
| Zone 5 necessity | 5 | station-zone05-necessity | bridge | 1 | none |
| Zone 5 alliance | 5 | station-zone05-alliance | network | 2 | none |
| Zone 6 nation | 6 | station-zone06-nation | comparison | 2 | none |
| Zone 6 religion | 6 | station-zone06-religion | layers | 2 | none |
| Zone 6 relations | 6 | station-zone06-relations | network | 1 | none |
| Zone 7 position | 7 | station-zone07-position | parallel | 2 | none |
| Zone 7 foundations | 7 | station-zone07-foundations | foundation | 1 | none |
| Zone 7 Vietnam | 7 | station-zone07-vietnam | sequence | 1 | none |

## Zone-specific safety

- Zone 1 uses progression and foundation structures without inventing dates.
- Zone 2 uses neutral clusters and layers rather than heroic imagery.
- Zone 3 uses an even sequence; it does not encode a winner, ranking, or
  independently asserted inevitability.
- Zone 4 uses equal conceptual bodies and relationship connectors, never a
  competitive “versus” composition.
- Zone 5 keeps the broader social-structure exhibit separate from the alliance
  necessity bridge and the three-node Công nhân–Nông dân–Trí thức focus. The
  three alliance-content dimensions are a secondary ring, not additional
  interaction targets.
- Zone 6 uses abstract comparisons and networks only; there are no ethnic
  costumes, religious symbols, flags, buildings, stereotypes, or statistics.
- Zone 7 uses four parallel function pillars and abstract transformation
  geometry. It does not depict an ideal household or prescribe family roles.

## Interaction model

Each exhibit is rendered inside its existing station group. The interaction
registry therefore remains:

- 9 legacy artifact roots;
- 17 academic station roots;
- 26 total logical targets.

Decorative child meshes are not registered independently. Existing hover,
crosshair, occlusion, and ConceptDialog behavior remain authoritative.

## Validation

`academic-exhibit-validation.ts` is included in the existing museum spatial
validation path. It checks:

- exactly 17 exhibits;
- one exhibit per existing station;
- exact station concept grouping;
- 28/28 concept coverage;
- valid zone and visualization references;
- duplicate IDs and duplicate concept ownership;
- authored bounds and structural-collider overlap.

The Phase 6C static reachability checks remain active: 7/7 zones and 17/17
stations must remain reachable.

## Performance boundary

The academic layer adds only simple procedural meshes and shared resources. It
adds no GLB bytes and no network requests. It introduces zero colliders and zero
occluders. Final material, lighting, atmosphere, and legacy visual hierarchy
remain Phase 6E work.

## QA still required

Browser review remains required at the fixed Phase 6 viewpoints: lobby, Zones
1, 3, 5, 6, and 7, one transition view, and one close-up. Human review should
check label scale, exhibit readability, Zone 5 hierarchy, inherited legacy
clutter, and sensitive-content neutrality at desktop and 390px widths.
