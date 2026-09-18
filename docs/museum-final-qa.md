# SOCIALISM 360 final museum QA

## Desktop 3D

Run at `1440x900`, `1366x768`, and `1024x768` with a fine pointer:

1. Open `/baotang`; confirm the capability gate selects full 3D.
2. Confirm the actual GLB loading progress appears without an artificial delay.
3. Dismiss onboarding, click the scene, and verify pointer lock.
4. Test W/A/S/D, diagonal movement, Space jump, landing, and wall collision.
5. Aim through a structural wall and confirm no artifact or station interaction is offered.
6. Enter Zones 1–7 and check signage, HUD, entry feedback, and stable zone changes.
7. Open grouped academic concepts, navigate previous/next, inspect sources, and follow the chapter CTA.
8. Open several legacy artifacts and confirm they still use `MuseumObjectDialog`.
9. Press Escape, close dialogs, and verify exploration can resume without recapture loops.
10. Resize the window and repeat a station/dialog interaction.

## Tablet and mobile

At touch/coarse-pointer sizes, especially `390px` wide:

1. Confirm the lightweight experience appears without a Canvas.
2. Verify no `museum.glb` request is made.
3. Open every zone and confirm its concept cards are reachable.
4. Verify Chapter 5 exposes all five concepts and retains its alliance scope note.
5. Verify Chapter 6 remains neutral and text-only; verify Chapter 7 remains abstract and non-prescriptive.
6. Check source pages, lesson names, chapter links, focus states, and keyboard navigation.
7. Rotate orientation and confirm the layout remains usable without horizontal overflow.

## Failure and accessibility checks

- Simulate a failed GLB request or unavailable WebGL; confirm the lightweight museum and `/chapters` remain available.
- Test `prefers-reduced-motion: reduce` in both presentations.
- Confirm the full 3D confirmation warning appears before an opt-in load on fallback-capable devices.
- Confirm no progress, quiz, authentication, or persistence state is introduced.

Visual browser QA is a manual release check; static build checks do not prove
station placement, pointer feel, or network request behavior.
