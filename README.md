# Onchain Bureau design foundation

Local Astro/TypeScript marketing-site exploration. No deployment or live-site changes.

## Run
Use Node **24.11.0** (`nvm use`) and npm. From this directory:

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:4321. The comparison index links to all three concepts. Astro binds to loopback only. Telemetry is disabled in the scripts.

```sh
npm run check
npm run build
npm run preview
```

**Preview serves the production build, which intentionally excludes concepts.** Use `npm run dev` to review them. The build assertion checks this separation. All pages currently carry noindex metadata because this is a development foundation.

## Structure
- `src/data`: shared positioning and concept metadata.
- `src/content`: typed service and research drafts with source URLs and approval status.
- `src/components`, `src/layouts`, `src/styles`: shared semantic structure and isolated concept treatments.
- `src/concepts.astro`: development-only route injected by Astro configuration.
- `docs`: source inventory, asset licences, QA evidence and review instructions.

Edit shared copy once to update all concepts. Check source claims before approving draft content. The research links open the existing public article; email links open the visitor's mail client. No messages are sent by the application.

## Review
Read BRIEF.md and DESIGN.md, compare concepts on desktop and mobile, and select a direction. Only then consolidate final tokens and build the full homepage. See docs/QA.md for observed verification and remaining checks. Hosting, SEO migration and production launch are separate milestones.

The development-only `/review` route offers exact 375/768/1440px embedded previews and reports overflow, missing section targets and font readiness. It is excluded from production alongside the concepts. Screenshot evidence is in `docs/screenshots/`.
