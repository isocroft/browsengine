## Changes for July 2024 (...v0.2.3)
- Chore: Removed `pointer_enabled` property from `window.webpage.engine` since `navigator.pointerEnabled` is now deprecated.
- Fixed: Fixed bug with `window.webpage.engine.old_impl`.
- Fixed: Fixed all bugs around correctly reporting `window.webpage.old.*` for all older browsers.
- Added: `window.webpage.newer.*` for all newer browsers.
- Added: New property (boolean) `window.webpage.device.agent.safari_ios`.
- Added: New property (boolean) `window.webpage.device.agent.safari_mac`.
- Added: New property (boolean) `window.webpage.device.agent.chrome_android`.
- Added: New property (boolean) `window.webpage.device.agent.operamini`.
- Added: New property (boolean) `window.webpage.device.agent.operamobile`.
- Support: `window.webpage.device.zoom_level` now updates as web page is resized or zoomed.
- Support: The [Brave browser](https://brave.com/) is now being supported.

## Changes for November 2021 to March 2024 (...v0.2.1)
- Fixed: Fixed all bugs for correctly detecting Safari.
- Added: `window.navigator.isSWCapable()`.
- Added: New property (string) `window.webpage.device.zoom_level`.
- Support: Newer **Blink** (Chrome, Edge, Opera) and **Webkit** (Safari) engines now recognized.
- Support: The [Vivaldi browser](https://vivaldi.com/) is now being supported.
