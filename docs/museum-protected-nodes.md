# Museum protected runtime nodes

This list is a Phase 6A guardrail. The names below are referenced by runtime
code and must not be renamed or deleted during asset optimization until the
binding is intentionally migrated and the runtime is revalidated.

## Interaction-critical roots

ObjectHighlighter resolves these names through
MUSEUM_INTERACTIVE_MESH_NAMES and scene.getObjectByName():

| GLB node name | Current artifact binding | Runtime behavior | Risk |
| --- | --- | --- | --- |
| bacho | artifact-ho-chi-minh-statue | legacy artifact target | Missing/renamed node removes target |
| aonau | artifact-brown-khaki-shirt | legacy artifact target | Missing/renamed node removes target |
| tuyenngon | artifact-declaration-of-independence | legacy artifact target | Missing/renamed node removes target |
| aodai | artifact-ao-dai | legacy artifact target | Missing/renamed node removes target |
| anh3 | artifact-bronze-drum | legacy artifact target | Missing/renamed node removes target |
| Cone | artifact-conical-hat | legacy artifact target | Missing/renamed node removes target |
| anh1 | artifact-propaganda-poster-1950 | legacy artifact target | Missing/renamed node removes target |
| anh2 | artifact-subsidy-coupon-1981 | legacy artifact target | Missing/renamed node removes target |
| CoffeeTable | artifact-vietnamese-cuisine | legacy artifact target | Missing/renamed node removes target |

These remain legacy/draft records with no canonical chapter assignment.
aotim is present in the GLB but is not a current interaction binding.

Phase 6B records each protected node's local matrix, world matrix, and
world-space subtree bounds in
`scripts/fixtures/museum-asset-baseline.json`. Candidate assets are compared
with a `1e-5` floating-point tolerance by:

```text
node scripts/validate-museum-asset.mjs --asset <candidate.glb> --baseline scripts/fixtures/museum-asset-baseline.json
```

The validator requires exactly one resolution for all nine interaction roots
and all four collision/occlusion roots. A hash change alone is not a failure;
protected transform, bounds, collision, or structural drift is.

## Collision and occlusion-critical meshes

findMuseumCollisionMeshes() resolves the following exact names for both
movement collision and the cached structural occluder collection:

| GLB node name | Static measured bounds (x,y,z min → max) | Role |
| --- | --- | --- |
| Plane042_Material_0 | (-4.071, -1.974, 4.438) → (4.065, 8.449, 4.451) | structural boundary |
| Plane057_Material_0 | (4.001, -1.974, -5.901) → (4.012, 8.449, 4.513) | structural boundary |
| Plane058_Material_0 | (-4.065, -1.974, -5.870) → (4.071, 8.449, -5.857) | structural boundary |
| Plane059_Material_0 | (-4.017, -1.974, -5.880) → (-4.006, 8.449, 4.534) | structural boundary |

Do not replace these with visual geometry alone. A future optimized asset may
use separate low-poly collision helpers, but that is a deliberate Phase 6B
runtime migration.

## Other code references

- public/museum.glb is loaded by MuseumModel via useGLTF('/museum.glb').
- scene.getObjectByName() is the binding mechanism for the lists above.
- MuseumModel uses the scene root, so scene hierarchy changes can affect
  lifecycle even when a node name is not individually referenced.
- Cube_4 is not present in the current GLB and is not a protected name.

## Rename/delete protocol for Phase 6B

1. Keep the original LFS asset unchanged.
2. Produce a separately named working candidate.
3. Update bindings only in a deliberate migration.
4. Validate all nine artifact roots and four collision roots exist exactly once
   (or migrate the lookup to an explicit mapping).
5. Re-run movement, occlusion, interaction, and station reachability checks.
6. Compare the fixed screenshot set before accepting the candidate.
