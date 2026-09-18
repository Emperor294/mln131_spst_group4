# SOCIALISM 360 device matrix

Phase 4E selects the experience on the client after a neutral shell renders.
The policy uses pointer capability, hover support, viewport width, WebGL
availability, and (when available) `connection.saveData`; it does not use a
user-agent model list.

| Device/capability | Default | Interaction | GLB expectation | Optional override |
| --- | --- | --- | --- | --- |
| Desktop + mouse, fine pointer, hover, >= 900px | Full 3D | Pointer lock, WASD, mouse, Space | Loads only after `/baotang` selects 3D | Use the lightweight route presentation if needed |
| Laptop | Full 3D when fine pointer + hover are available | Pointer lock, keyboard, mouse | Loads on 3D mount | Lightweight remains available through the route architecture |
| Tablet touch | Lightweight | Tap, keyboard/accessibility navigation | No request | `Thử chế độ 3D` only when WebGL is detected; not touch-optimized |
| Mobile portrait/landscape | Lightweight | Tap, scroll, buttons, links | No request | Optional 3D confirmation when WebGL is detected |
| No WebGL | Lightweight | Tap, scroll, buttons, links | No request | No 3D opt-in is offered |
| Reduced motion | Same capability choice | Same controls, reduced CSS transitions | Same as selected mode | No forced motion |

The lightweight path exposes all seven canonical zones and all 28 concepts,
with textbook pages, lesson relationships, and chapter links. It deliberately
does not recreate the nine legacy artifact interactions.

## Network checks

Use browser DevTools Network with a cache-disabled reload when needed:

- `/` request count for `museum.glb`: `0`;
- `/chapters` request count for `museum.glb`: `0`;
- lightweight `/baotang` request count for `museum.glb`: `0`;
- full 3D `/baotang` request for `museum.glb`: expected once, then cache may satisfy it.
