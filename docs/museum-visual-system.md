# SOCIALISM 360 visual system — Phase 6E

Phase 6E establishes the final visual-polish layer for the current museum
architecture. It changes presentation only: academic data, station topology,
collision, occlusion, and the GLB remain unchanged.

## Visual hierarchy

1. Architecture is the quiet, matte background layer.
2. Academic exhibits use brighter values and restrained zone accents.
3. Interaction feedback receives the strongest short-term emphasis through the
   warm interaction accent, crosshair state, and prompt.

Legacy GLB artifacts remain visible and interactive. Their GLTF materials are
not mutated; the procedural academic layer is given clearer value and accent
separation instead.

## Central theme

`src/features/museum/theme/museum-visual-theme.ts` owns the shared 3D palette,
roughness/metalness defaults, lighting values, label contrast colors, and
renderer exposure. Existing per-zone accents remain owned by
`spatial-zones.ts` and are consumed through the theme helper rather than
duplicated in components.

The palette is intentionally restrained:

- dark blue-neutral architecture and floor;
- warm neutral exhibit surfaces;
- muted blue structural lines;
- existing per-zone accents;
- warm amber interaction emphasis.

Zone identity still uses number, title, physical topology, and signage; accent
color is supplemental only.

## Lighting

`MuseumLighting` is the single full-3D lighting component. It retains the local
procedural Sky and uses three non-shadow-casting lights:

- one cool-neutral ambient light;
- one warm broad key directional light;
- one cool broad fill directional light.

The former five-light setup was reduced to three lights. No point-light grid,
per-exhibit lights, shadow maps, HDRI, fog, bloom, SSAO, depth of field, or
other post-processing was added.

The renderer uses centralized ACES filmic tone mapping with exposure `1.04`.
No per-material exposure compensation is used.

## Materials

Procedural architecture uses high-roughness, low-metalness matte materials.
Academic exhibits use a small shared resource set:

- exhibit surface;
- neutral exhibit;
- structural connector;
- alliance emphasis;
- per-zone accent materials.

Labels and HUD elements use dark translucent backplates with warm borders and
high-contrast text. No GLTF-owned material is mutated.

## Lobby and signage

The lobby keeps its compact SOCIALISM 360 orientation panel and seven-number
index. Contrast was strengthened without adding academic paragraphs.

The visual hierarchy remains:

```text
zone number
↓
zone short title
↓
station/exhibit identity
↓
interaction prompt
```

## Sensitive-zone rules

- Zone 3 remains visually balanced and non-directional.
- Zone 4 uses equal treatment for democracy/state concepts.
- Zone 5 receives presentation emphasis through composition and accent, not
  political valuation.
- Zone 6 remains abstract and contains no ethnic or religious symbolism.
- Zone 7 remains abstract and contains no gender-coded or prescriptive home
  imagery.

## Accessibility

- Labels use opaque-enough dark backplates and brighter text.
- Zone number, title, and physical placement supplement accent color.
- Academic and legacy interaction prompts remain distinct: `Khám phá` and
  `Xem hiện vật`.
- The crosshair retains separate academic, artifact, and neutral states using
  shape, border style, color, and scale.
- HUD, zone toast, loading, and onboarding retain semantic/status text.
- No new required animation was introduced; reduced-motion users receive the
  same static exhibit and lighting presentation.
- ConceptDialog and legacy dialogs remain the readable white overlay layer.

## Performance boundary

Phase 6E adds no external assets, no packages, no textures, no runtime shadow
lights, and no animated materials. It does not change the 77 academic exhibit
mesh elements, 34 physical structures, or collision/occlusion counts.

## QA checklist

Human/browser review remains required at 1440×900, 1366×768, 1024×768, and
390px for:

- lobby hierarchy and signage;
- Zones 1, 3, 5, 6, and 7;
- circulation sightline;
- exhibit close-up;
- ConceptDialog open;
- legacy-object competition;
- label contrast and clipping;
- loading/onboarding/HUD/toast/crosshair readability;
- reduced-motion and keyboard-accessible overlay behavior.
