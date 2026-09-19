# SOCIALISM 360 museum redesign blueprint

This document is the Phase 6A physical and authoring blueprint. It does not
implement a redesign and does not change museum.glb.

## Recommendation

Use a **hybrid** architecture:

- a smaller, intentionally authored architectural/collision GLB for the shell;
- source-controlled R3F stations, signs, academic accents, and interaction layer;
- legacy objects kept separate and visibly draft/contextual until reviewed.

This follows the measured evidence: images are 84.9% of the current file, the
first seven meshes are 92.4% of its triangles, and the current code already
keeps all 17 academic stations outside the GLB. Preserving the current GLB
unchanged is the safest short-term runtime choice but does not provide physical
seven-zone hierarchy. A total rebuild has the highest visual and binding risk.

## Design intent

The museum should read as a dark editorial academic exhibition: one coherent
institutional language, quiet zone accents, strong numbering, generous
circulation, and short world-space labels. It should not read as an arcade, a
generic office, or a collection of floating SaaS cards.

The existing model semantically starts from an open-office/gallery shell
(empty_office_space.glb) with imported props. Because screenshots were not
available, this is a structural observation rather than a final visual
judgement.

## Future lobby

The lobby is a low-density orientation room immediately inside the entry:

- a restrained SOCIALISM 360 title wall;
- the three-step cue **Explore → Interact → Understand**;
- a seven-number floor/wall index with short titles;
- one clear route into the gallery loop;
- no full academic paragraphs and no legacy artifact cluster.

The lobby should make the 1→7 sequence legible while preserving free movement.
It is a wayfinding device, not an eighth content zone.

## Seven physical learning spaces

The following are spatial metaphors for a future remodel. They reuse the
verified zone meanings and do not add academic claims.

### 01 — Origins / Foundations Gallery

Use a shallow timeline wall and two facing foundation bays. The first bay
groups origins and development; the second groups theoretical foundation and
research method. Keep chronology as a visual reading aid, not a decorative
historical claim. The current overlay has two stations and can seed this room.

### 02 — Working Class / Historical Mission Gallery

Use a three-part wall rhythm: working-class concept, mission content, and
conditions/Vietnam framing. Keep the composition analytical and non-heroic.
The two existing stations can become paired exhibit tables with a clear
through-route.

### 03 — Transition Corridor

Use a linear or gently turning sequence: socialism, transition, and Vietnam’s
transitional path. A comparison wall can show relationships between concepts
without depicting an independently asserted inevitable outcome. The current
left-side overlay is a suitable prototype for a corridor, but the GLB does not
currently guarantee one.

### 04 — Democracy & State Hall

Use two parallel display walls and a central relationship threshold. This is
paired/relational space, not a competitive “system versus system” arena. Keep
the central view open so the relationship station is not visually subordinate.

### 05 — Structure & Alliance Flagship

Give Zone 5 the largest clear central footprint:

1. a perimeter structure wall establishes social structure and transformation;
2. a central, low-profile alliance installation introduces necessity;
3. three equal visual sectors label the **Công nhân – Nông dân – Trí thức**
   core alliance focus;
4. a surrounding ring or triad of bays presents economic, political, and
   cultural-social alliance contents;
5. a Vietnam-direction wall closes the sequence.

The three groups are one core alliance focus, not the complete social-class
structure. The installation must not use arrows or scale to imply otherwise.
The current alliance station/ring is a useful procedural seed, but a future
room should give it circulation and interpretive hierarchy without making a
giant glowing centerpiece.

### 06 — Nation / Ethnicity / Religion Gallery

Use neutral planes, intersecting bands, and text-led relational diagrams:
nation-state, ethnic community, religion, belief, and relations. Do not use
ethnic costumes, religious symbols, or imagery that equates ethnicity with
religion. The gallery should feel calm and comparative rather than immersive
through cultural stereotypes.

### 07 — Family & Society Space

Use a four-function relationship installation and a second, non-prescriptive
transformation wall. Abstract linked frames or changing room thresholds can
show relationships without a literal “ideal family” scene, character model, or
gender prescription.

## Visitor flow

The intended route is:

ENTRY → 01 → 02 → 03 → 04 → 05 → 06 → 07

Each zone needs a visible onward cue and a return sightline, but cross-links and
the lobby index must support free exploration. Static analysis shows the
current GLB is an open bounded rectangle with logical centers rather than seven
rooms, so the full guided flow requires an architectural remodel or a
substantial procedural partition layer. It should not be faked by moving signs
alone.

## Wayfinding language

Future signs should share one plate, one type scale, and one accent rule:

01 → NHẬP MÔN

Use zone number plus short title, with one directional cue at transitions.
Long chapter titles remain in dialogs/panels. Keep zone colors as accents; never
make color the sole identifier.

## GLB versus R3F responsibility

### Keep in the architectural GLB

- floors, ceilings, walls, door openings, structural columns;
- deliberate exhibit bays and circulation geometry;
- simple collision helpers with stable names;
- only contextual legacy meshes that survive visual/provenance review.

### Keep procedural/source-controlled in R3F

- all 17 academic station bodies;
- zone signs, numbering, labels, and accents;
- the Zone 5 alliance treatment;
- abstract Zone 6 and Zone 7 relationship installations;
- hover/interaction visuals and learning UI.

This keeps academic changes independent from DCC exports and protects the
runtime registry.

## Legacy strategy

The nine current roots remain draft and unassigned. In a future exhibition:

- retain only objects that support a reviewed contextual vignette;
- relocate or hide objects that crowd academic stations;
- remove from the canonical route when their visual role is distracting;
- never infer chapter membership from resemblance;
- preserve the root name or migrate the binding deliberately before deletion.

The current vietnam_flag.glb bounds are an outlier that extends beyond the
architectural shell; its future placement needs human review before it is
considered part of the canonical exhibition.

## Phase 6 visual QA plan

For each future milestone, capture before/after screenshots from fixed,
documented cameras at 1440×900 (and optionally 1366×768):

- lobby;
- Zone 1;
- Zone 3 corridor;
- Zone 5 wide and alliance close-up;
- Zone 6;
- Zone 7;
- transition/corridor sightline;
- one station close-up.

Compare the same camera position before and after every asset change. Human
review must decide lighting balance, texture legibility, station scale,
atmosphere, and whether the zones read as one exhibition.

If a development-only marker is added later, keep a small named set such as
qa-lobby, qa-zone01, qa-zone03-corridor, qa-zone05-wide,
qa-zone05-alliance-close, qa-zone06, qa-zone07, and qa-station-close. These are
review viewpoints only; they must not alter the production spawn or camera
controls.

## Phase 6B entry criteria

Before a controlled optimization:

1. create a working export beside, not over, the original;
2. preserve the protected node list;
3. add an automated node/bounds/material validation step;
4. compare the fixed screenshot set;
5. retest movement, collision, occlusion, all nine artifact roots, and all 17
   procedural stations;
6. verify a deployed GLB response is binary rather than an LFS pointer.
