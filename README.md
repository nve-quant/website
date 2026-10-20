# Onchain Bureau design foundation

Local Astro/TypeScript marketing-site exploration. No deployment or live-site changes.

## Run
Use Node **24.11.0** (`nvm use`) and npm. From this directory:

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:4321. The root serves the developed Market mechanics homepage. `/studies` links to the three original concepts. Astro binds to loopback only. Telemetry is disabled in the scripts.

```sh
npm run check
npm run build
npm run preview
```

**Preview serves the homepage build, which intentionally excludes studies, concepts and review tooling.** Use `npm run dev` to review them. The build assertion checks this separation. All pages currently carry noindex metadata because this is a development foundation.

## Structure
- `src/data`: shared positioning and concept metadata.
- `src/content`: typed service and research drafts with source URLs and approval status.
- `src/components`, `src/layouts`, `src/styles`: shared semantic structure and isolated concept treatments.
- `src/concepts.astro`: development-only route injected by Astro configuration.
- `docs`: source inventory, asset licences, QA evidence and review instructions.

Edit shared copy once to update all concepts. Check source claims before approving draft content. The research links open the existing public article; email links open the visitor's mail client. No messages are sent by the application.

## Review
Market mechanics is selected. Read BRIEF.md and DESIGN.md, then review the complete homepage on desktop and mobile. Confirm draft business copy before publication. See docs/QA.md for observed verification and remaining checks. Hosting, SEO migration and production launch are separate milestones.

The development-only `/review` route offers exact 375/768/1440px embedded previews and reports overflow, missing section targets and font readiness. It is excluded from production alongside the concepts. Screenshot evidence is in `docs/screenshots/`.

## Interactive market study
`src/data/market-model.ts` holds four illustrative scenarios. `AssetMarket.astro` renders their accessible selector, explanations and SVG fallbacks. `src/scripts/market-explorer.ts` loads the Three.js scene only near the viewport in a visible document, on screens wider than 700px without reduced motion.

The selected asset rotates automatically. Drag the object directly to rotate it; click to pause or resume. With the scene focused, Space/Enter toggles pause and the arrow keys rotate or tilt the object manually, pausing automatic rotation. Pause remains selected when changing assets or returning to the scene.

Automatic rotation is capped at 30 rendered frames per second; dragging can use the display rate while movement settles. Rendering stops outside the model's viewport observation area, when the document is hidden, or when a paused scene has settled. Mobile, reduced-motion and WebGL-unavailable views retain selectable SVG illustrations. Geometry, textures and lighting are local; no model CDN or live data is used. The separately loaded Three.js chunk triggers Vite’s size advisory; measure real-device loading before launch.

For changes to the animated CEX/DEX diagrams, also run `node scripts/check-liquidity-animation.mjs`. This checks geometry invariants and animation lifecycle behavior with mocked browser events; use `/review` for the visual browser pass.
