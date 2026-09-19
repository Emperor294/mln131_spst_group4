# SOCIALISM 360 museum asset audit

Phase 6A is an inspection and planning record. No GLB transform, mesh, material,
texture, runtime binding, collision rule, or academic record was changed.

## Audit baseline

| Item | Measured value |
| --- | --- |
| Asset | public/museum.glb |
| File size | 101,405,464 bytes (96.67 MiB) |
| SHA-256 | 7956A554D01BDFD38143F8B59BAB9D665835C6798AADD626AD33EE92F5A645FB |
| GLB version | 2 |
| Scenes | 1 |
| Nodes | 261 |
| Meshes | 93 |
| Mesh primitives | 93 |
| Triangles | 426,771 |
| Materials | 42 |
| Textures / images | 65 / 65 |
| Cameras / animations / skins | 0 / 0 / 0 |
| Embedded glTF lights | 0 |
| External resources | None observed; all 65 images use embedded buffer views |
| Geometry compression | No KHR_draco_mesh_compression, EXT_meshopt_compression, or KHR_texture_basisu |
| Other extensions | KHR_materials_emissive_strength, KHR_materials_unlit, KHR_materials_ior, KHR_materials_specular |

The current runtime still exposes 7 logical zones, 17 academic stations, 28
concepts, 9 legacy artifact targets, and 4 structural collision/occluder
meshes. The authored player spawn is [0, 1.7, 3].

The node inventory includes a name AmbientLight, but the glTF JSON has no
KHR_lights_punctual light definitions; current lighting is supplied by the
R3F scene.

## Resource weight

The embedded image payloads total 86,053,744 bytes (84.9% of the GLB). The
remaining approximately 15.35 MB is JSON, buffer padding, vertex/index data,
and other glTF payload. The measured profile therefore points first to texture
work, with geometry a secondary but material performance concern.

Largest embedded images:

| Image index | Dimensions | Format | Encoded bytes | Review note |
| ---: | ---: | --- | ---: | --- |
| 1 | 4096×4096 | PNG | 28,477,868 | Highest-cost payload; visual alpha/quality review required |
| 6 | 2048×2048 | PNG | 11,525,656 | Unusually large PNG for a 2K image |
| 0 | 4096×4096 | JPEG | 5,975,920 | Large photographic texture |
| 47 | 1600×985 | PNG | 3,279,248 | Large non-power-of-two image |
| 15 | 1024×1024 | PNG | 2,215,076 | Candidate for visual review |
| 16 | 1024×1024 | PNG | 2,095,384 | Candidate for visual review |
| 31 | 1024×1024 | PNG | 1,992,276 | Candidate for visual review |
| 14 | 1024×1024 | PNG | 1,851,016 | Candidate for visual review |
| 29 | 1024×1024 | PNG | 1,706,624 | Candidate for visual review |
| 33 | 1024×512 | PNG | 1,566,076 | Candidate for visual review |

There are 53 PNGs and 12 JPEGs. Resolution distribution includes two 4096²,
two 2048², forty 1024² images, and smaller exhibit/prop images. Exact payload
hashing found three duplicate groups:

- image indices 41,45,49,53,57,61 (346,772 bytes each);
- image indices 42,46,50,54,58,62 (693,204 bytes each);
- image indices 44,48,52,56,60,64 (24,688 bytes each).

Removing five redundant copies from each group would avoid 5,323,320 bytes in
a future export, subject to checking material UV and alpha semantics. This is a
candidate only; no deduplication was performed.

## Node inventory

The scene is an imported open-office/gallery shell with several separately
exported props nested below repeated Sketchfab_model, root, and Object_4-style
names.

### Architecture

- empty_office_space.glb
- Sketchfab_model
- 60218395bad04ab2b54b73c63a924108fbx
- RootNode
- Plane040 through Plane059 and their material-suffixed children

The four structural names used by movement and occlusion are listed in
museum-protected-nodes.md.

### Imported exhibit/decoration groups

Important imported roots include trong_ong_ong_son_-_viet_nam.glb,
coffee_table.glb, bread_vietnam.glb, mooncake_in_vietnam.glb,
braised_meat_with_eggs_-_thit_kho_trung_vietnam.glb,
marvelous_to_substance_test_3_aodai_2.glb,
vietnamese___non_la.glb, vietnam_flag.glb, and repeated wall_picture.glb
groups. These names describe source asset exports, not academic assignments.

### Legacy artifacts

The nine code-bound roots are bacho, aonau, tuyenngon, aodai, anh3, Cone, anh1,
anh2, and CoffeeTable. aotim is present in the asset but is not in the runtime
binding registry. Cube_4 is not present.

### Unknown/generic overhead

The imported hierarchy repeats generic names (Sketchfab_model, root,
GLTF_SceneRootNode, Object_4, Cube, and RootNode). This is manageable today
because the runtime references only the protected names, but it makes future
name-based asset cleanup unsafe without a binding migration.

## Geometry audit

The highest triangle meshes are:

| Mesh index / node path | Triangles | Share |
| --- | ---: | ---: |
| mesh[41] / .../bacho/Object_4 | 99,999 | 23.4% |
| mesh[39] / .../aonau/Object_4 | 94,972 | 22.3% |
| mesh[19] / .../aotim/Object_4 | 91,915 | 21.5% |
| mesh[71] / .../polySurface60_lambert2_0 (braised-meat asset) | 51,984 | 12.2% |
| mesh[72] / .../polySurface60_lambert1_0 | 24,384 | 5.7% |
| mesh[73] / .../polySurface60_xoong_SM_Pot_01001SG1_0 | 18,592 | 4.4% |
| mesh[74] / .../polySurface60_phong1_0 | 12,288 | 2.9% |

The first three meshes alone are 67.2% of all triangles; the first seven are
92.4%. This strongly favors targeted review of imported artifact/food assets
before broad architectural decimation. No mesh was decimated or merged.

## Material audit

- 42 materials total: 39 OPAQUE, 3 BLEND, 0 MASK.
- 39 materials are marked double-sided.
- Two materials carry non-zero emissive factors.
- Material names repeat, notably six Mat_picture and six Mat-pic entries.
  Their image payloads include the exact duplicate groups above.
- Materials use base-color, normal, metallic/roughness, occlusion, and a small
  amount of emissive texture data.

The repeated material shapes are consolidation opportunities, but texture
indices, alpha behavior, UVs, and legacy appearance must be checked together.
The broad double-sided setting is also a review candidate, not an automatic
optimization: changing it can alter back-face visibility in the open gallery.

## World-space bounds

Bounds below are static AABBs derived from POSITION accessor min/max values and
node TRS/matrix transforms. They are not a substitute for a browser walk test.

| Region | min (x,y,z) | max (x,y,z) |
| --- | --- | --- |
| Whole GLB, including imported outlier content | (-4.071, -3.645, -5.901) | (9.818, 8.449, 5.016) |
| Four structural collision meshes | (-4.071, -1.974, -5.901) | (4.071, 8.449, 4.534) |
| Runtime authored walk rectangle (prior spatial data) | approximately (-4.05, -, -5.55) | approximately (4.05, -, 4.10) |
| Player spawn | (0, 1.7, 3) | point |

The whole-GLB max X and low Y are inflated by the imported vietnam_flag.glb
group (Object_6 reaches x 9.818 and y -3.645). This is a concrete manual
review candidate, not proof that the flag is unused. The four wall/structure
meshes describe the bounded play shell; the runtime also adds a procedural
50×50 floor.

## Current R3F layer versus GLB

The GLB supplies the inherited architecture, imported props, legacy artifacts,
and structural collision surfaces. The runtime supplies:

- the procedural floor, local Sky, and four lightweight lights;
- all 17 academic concept stations;
- zone signage and zone identity accents;
- the Chapter 5 alliance ring/accent variant;
- pointer-lock movement, collision checks, cached interaction targets, and
  cached occluders;
- HUD, crosshair, prompts, onboarding, loading, and dialogs.

This separation is valuable: academic exhibits and signage are already
source-controlled and can evolve without re-exporting the asset.

## Static zone/station audit

The current seven centers are logical overlays in one open rectangle, not seven
physical GLB rooms. All station positions are inside the collision rectangle,
but many academic interaction radii overlap because the shared station radius
is 5 units while neighboring stations are about 0.96–1.25 units apart.
That is a readability/wayfinding concern for redesign, not a runtime defect.

### Logical zone mapping

| Zone | Center (x,z) | Radius | Stations | Nearby static geometry | Static risk |
| --- | --- | ---: | --- | --- | --- |
| 01 | (0, 2.35) | 1.45 | origins, method | north interior of open shell | shared-radius overlap with 02/03; sign line is open |
| 02 | (2.6, 2.35) | 1.45 | worker, conditions | east wall and bacho/tuyenngon side | conditions is near east wall and legacy objects |
| 03 | (-2.6, 2.35) | 1.45 | socialism, transition | west wall and anh1 side | socialism is near west wall and legacy wall picture |
| 04 | (-2.35, -0.1) | 1.45 | democracy, relationship | west/central shell | relationship and 05 are close; signage sightline needs review |
| 05 | (0, -0.55) | 1.45 | structure, necessity, alliance | central open area | densest zone; alliance is near Zone 7 foundations |
| 06 | (2.6, -0.55) | 1.45 | nation, religion, relations | east wall and aonau side | religion is near east wall and legacy clothing |
| 07 | (0, -3.35) | 1.45 | position, foundations, vietnam | south edge of shell | foundations/alliance overlap; south edge needs a clear return route |

The current label positions are the same x/z centers at y 2.65. They are
procedural signs, not GLB signage, so their visual occlusion and corridor
clearance still require browser review.

| Station | Zone | Position (x,z) | Nearest station (m) | Nearest structural edge (m) | Nearby legacy | Static classification |
| --- | --- | ---: | ---: | ---: | --- | --- |
| station-zone01-origins | 01 | (-0.80, 2.35) | 1.20 | 1.77 | — | SAFE |
| station-zone01-method | 01 | (0.80, 2.35) | 1.20 | 1.77 | — | SAFE |
| station-zone02-worker | 02 | (2.00, 2.35) | 1.20 | 1.72 | — | SAFE |
| station-zone02-conditions | 02 | (3.25, 2.35) | 1.25 | 0.82 | bacho 0.57; tuyenngon 0.84 | HIGH-RISK |
| station-zone03-socialism | 03 | (-3.25, 2.35) | 1.25 | 0.82 | anh1 0.87 | HIGH-RISK |
| station-zone03-transition | 03 | (-2.00, 2.35) | 1.20 | 1.72 | — | SAFE |
| station-zone04-democracy | 04 | (-2.80, 0.20) | 1.25 | 1.27 | CoffeeTable 0.69 | HIGH-RISK |
| station-zone04-relationship | 04 | (-1.55, 0.20) | 1.06 | 2.52 | — | REVIEW |
| station-zone05-structure | 05 | (-0.80, -0.55) | 1.06 | 3.27 | — | REVIEW |
| station-zone05-necessity | 05 | (0.80, -0.55) | 1.20 | 3.27 | — | SAFE |
| station-zone05-alliance | 05 | (0.00, -1.85) | 0.96 | 4.03 | — | REVIEW |
| station-zone06-nation | 06 | (2.00, -0.55) | 1.20 | 2.07 | — | SAFE |
| station-zone06-religion | 06 | (3.25, -0.55) | 1.25 | 0.82 | aonau 0.52 | HIGH-RISK |
| station-zone06-relations | 06 | (2.60, -1.85) | 1.43 | 1.47 | — | REVIEW |
| station-zone07-position | 07 | (-2.00, -3.05) | 2.16 | 2.07 | Cone 2.35 | SAFE |
| station-zone07-foundations | 07 | (0.15, -2.80) | 0.96 | 3.08 | — | REVIEW |
| station-zone07-vietnam | 07 | (2.00, -3.35) | 1.62 | 2.07 | anh3 2.01 | SAFE |

SAFE, REVIEW, and HIGH-RISK are static flags based on proximity and overlap
heuristics. They do not authorize coordinate changes. The three HIGH-RISK
entries combine a near-wall or near-artifact relationship and should be the
first viewpoints in a future browser review.

## Legacy object spatial audit

All nine remain draft/legacy and have no canonical chapter assignment.

| Mesh root / legacy record | Approx center (x,y,z) | Approx bounds (x,y,z min → max) | Visual role | Runtime / academic assignment | Future design recommendation |
| --- | --- | --- | --- | --- | --- |
| bacho / artifact-ho-chi-minh-statue | (3.078, 0.997, 1.808) | (2.413, 0.007, 1.006) → (3.744, 1.986, 2.610) | imported statue | Interactive legacy / NONE | REVIEW; retain only as clearly labelled historical context if visual quality and provenance are accepted |
| aonau / artifact-brown-khaki-shirt | (3.182, 1.231, -1.062) | (2.942, 0.454, -1.568) → (3.421, 2.008, -0.556) | clothing display | Interactive legacy / NONE | REVIEW; avoid crowding Zone 6 academic stations |
| tuyenngon / artifact-declaration-of-independence | (3.988, 2.703, 2.748) | (3.965, 1.747, 1.548) → (4.010, 3.659, 3.948) | wall document/picture | Interactive legacy / NONE | KEEP AS CONTEXT only after wall-display and provenance review |
| aodai / artifact-ao-dai | (-2.637, 1.408, -5.506) | (-3.122, 0.510, -5.716) → (-2.152, 2.305, -5.296) | clothing/model | Interactive legacy / NONE | KEEP AS CONTEXT or move in a later asset redesign; currently sits at the south edge |
| anh3 / artifact-bronze-drum | (3.947, 2.356, -3.857) | (3.915, 1.400, -5.358) → (3.979, 3.312, -2.357) | wall picture | Interactive legacy / NONE | REVIEW; wall-picture treatment can remain contextual, not academic assignment |
| Cone / artifact-conical-hat | (-1.881, 1.158, -5.397) | (-2.320, 0.988, -5.836) → (-1.443, 1.328, -4.959) | conical-hat prop | Interactive legacy / NONE | REVIEW; retain only if the future gallery can make its context explicit |
| anh1 / artifact-propaganda-poster-1950 | (-3.991, 1.181, 2.798) | (-4.009, 0.544, 1.798) → (-3.973, 1.819, 3.798) | wall picture/poster | Interactive legacy / NONE | REVIEW; close to Zone 3 station layer |
| anh2 / artifact-subsidy-coupon-1981 | (-3.982, 2.004, 0.000) | (-4.000, 1.366, -1.000) → (-3.964, 2.641, 1.000) | wall document/picture | Interactive legacy / NONE | REVIEW; preserve draft status and do not attach to democracy concepts |
| CoffeeTable / artifact-vietnamese-cuisine | (-3.186, 0.290, -0.366) | (-3.906, -0.008, -2.088) → (-2.467, 0.588, 1.356) | table/food prop | Interactive legacy / NONE | REMOVE FROM CANONICAL EXHIBITION or retain as unassigned context after visual review |

These are design recommendations only. No object was moved, hidden, deleted, or
academically reassigned in Phase 6A.

## Fit and optimization conclusion

The inherited shell is technically usable as a bounded open gallery, but it
does not encode seven physical rooms: zones are currently logical overlays. The
asset also combines architecture with many source-exported props and repeated
materials/textures. The strongest measured opportunities are texture payload
cleanup and targeted high-poly prop review, followed by a controlled
architectural remodel.

Technical fit is descriptive rather than a political or academic ranking:

- runtime binding stability: **GOOD FIT** while the protected names remain;
- spatial flexibility for seven physical galleries: **PARTIAL FIT**;
- texture/asset optimization potential: **GOOD FIT**, led by measured image
  duplication and oversized PNGs;
- visual identity fit: **PARTIAL / UNVERIFIED** until the required browser
  screenshots are reviewed.

Recommended future path: **hybrid GLB + procedural R3F**. Keep a deliberately
simple architectural/collision GLB with protected binding names, while keeping
academic stations, labels, accents, and concept presentation in R3F. A full
preserve strategy leaves the 84.9% texture weight and inherited spatial language
untouched. A full rebuild increases visual freedom but carries unnecessary
collision, binding, and deployment risk.

## Phase 6B candidates (not executed)

1. **LOW risk — exact duplicate texture cleanup**, after checking alpha/UV
   equivalence and keeping the original asset untouched.
2. **MEDIUM risk — visual review and selective resize/format conversion** for
   the 4096²/large PNG offenders; compare fixed viewpoints before/after.
3. **MEDIUM risk — targeted simplification** of the three high-poly legacy
   meshes and the braised-food asset; preserve the nine root names.
4. **MEDIUM risk — material consolidation** for repeated wall-picture material
   structures after a render comparison.
5. **HIGH risk — architectural remodel/zone partitioning** in Blender with
   replacement collision helpers and a binding migration plan.
6. **HIGH risk — Meshopt/Draco/KTX2 pipeline adoption** only after browser
   support, caching, deployment, and collision validation.

No final size target is promised. Textures are the first measured opportunity;
geometry is the second.

## Compression suitability (future only)

- **Meshopt:** a plausible medium/high-risk geometry experiment after the
  current node and collision validation is automated. It can reduce vertex/index
  transfer cost, but the export pipeline and decoder/runtime support must be
  validated on the actual Next deployment.
- **Draco:** technically viable for static meshes, but introduces decoder
  delivery and decode-time considerations. It is a higher workflow change than
  exact texture deduplication and should not be applied to a working collision
  candidate without movement/occlusion tests.
- **WebP:** a medium-risk candidate for photographic/color images after an
  alpha and normal-map review. The large PNGs may benefit, but loss or alpha
  changes can visibly damage wall pictures and material maps.
- **KTX2/Basis:** a high-risk delivery change with transcoder assets and GPU
  format variability. It may produce the strongest runtime texture benefit,
  but requires a deliberate loader, cache, and browser/device test plan.

None of these compression paths was executed in Phase 6A.

## Tooling and delivery notes

Manual Blender/DCC work is likely for room proportions, exhibit walls,
architectural remodel, UV cleanup, material consolidation, and authored
collision helpers. glTF tooling is appropriate for non-destructive inspection,
hashing, duplicate detection, validation, and later controlled texture or
compression experiments.

The .gitattributes file tracks *.glb with Git LFS, and git lfs ls-files reports
public/museum.glb as a real LFS object in this checkout. Vercel retrieval of
the binary was not verified locally; a future asset change must verify the
deployed response is the binary rather than an LFS pointer. Keep the original
asset outside the working export and produce a separately named candidate
(museum-v2.glb) only after review; do not add a second 97 MiB binary during
6A.

## Visual-audit limitation

**VISUAL BROWSER AUDIT NOT PERFORMED.** No browser screenshot run was available
in this audit. Lighting, texture fidelity, station scale, atmosphere, and
visitor readability therefore remain human/browser decisions. The static
HIGH-RISK station rows above are the required first review set.
