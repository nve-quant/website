# Onchain Bureau design foundation

Astro/TypeScript marketing website. GitHub and a separate Vercel preview support remote development; the existing live site and domain remain unchanged. See [cloud handoff](docs/CLOUD_HANDOFF.md).

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
`src/data/market-model.ts` holds eight illustrative categories and twenty-five specimens. `AssetMarket.astro` renders their accessible selector, explanations and SVG fallbacks. `src/scripts/market-explorer.ts` loads the Three.js scene only near the viewport in a visible document, on screens wider than 700px without reduced motion.

The selected asset rotates automatically. Drag the object directly to rotate it; click to pause or resume. With the scene focused, Space/Enter toggles pause and the arrow keys rotate or tilt the object manually, pausing automatic rotation. Pause remains selected when changing assets or returning to the scene.

Automatic rotation is capped at 30 rendered frames per second; dragging can use the display rate while movement settles. Rendering stops outside the model's viewport observation area, when the document is hidden, or when a paused scene has settled. Mobile, reduced-motion and WebGL-unavailable views retain selectable SVG illustrations. Geometry, textures and lighting are local; no model CDN or live data is used. The separately loaded Three.js chunk triggers Vite’s size advisory; measure real-device loading before launch.

For changes to the animated CEX/DEX diagrams, also run `node scripts/check-liquidity-animation.mjs`. This checks geometry invariants and animation lifecycle behavior with mocked browser events; use `/review` for the visual browser pass.

## Service and engagement pages
Local routes: `/`, `/market-making`, `/dex-liquidity-management`, `/work`.
The shared marketing layout contains navigation and footer. Service detail copy is in the typed `services` collection; mandate, reporting and process content is in `src/data/engagement.ts`. The homepage retains the original model explorer. `/review` offers each page at 375, 768 and 1440px, with section jump controls and overflow/anchor/image checks. Review tooling and archived concepts remain excluded from builds.

`npm run build` also validates the static navigation graph, local asset references, section anchors, one h1 per page, and local noindex metadata. Run `node scripts/check-liquidity-animation.mjs` for geometry and controller regression checks. No additional dependencies were introduced for the service pages.

The local `/company` page and conversion sections are editorial drafts. Expand the “Editorial review” disclosures in development to see the evidence each placement needs; these notes are excluded from `npm run build`. See `docs/commercial-evidence.md` for the consolidated checklist. Service fit, benefits and proposed metric definitions live in the typed service collections. Shared email links include a short enquiry template; no form backend was added.

Service navigation interaction checks: `node scripts/check-service-navigation.mjs` (hover, dismissal, keyboard focus and touch fallback).

Client-need animation checks: `node scripts/check-need-illustrations.mjs` (pause, visibility, reduced motion and page lifecycle).

Asset studies: `/asset-review` is a development-only material inspection page for explicit still renders of each procedural specimen. `/review` covers the actual section at responsive widths. Run `node scripts/check-asset-explorer.mjs` to check variant cycling, remembered selections, lazy initialization, accessible naming, fallback modes and lifecycle handling.

Geometry/resource checks: `node scripts/check-asset-models.mjs`. This runs every real factory with a stubbed canvas to check finite geometry, floor/framing envelopes and resource budgets. It is not a visual or FPS test. Desktop rendering uses a maximum 2× device pixel ratio and a 2.4-megapixel canvas cap; automatic rotation remains capped at 30 fps.
