# Remote development handoff

Repository: https://github.com/nve-quant/website

## Start here

Read AGENTS.md, BRIEF.md, DESIGN.md and docs/content-inventory.md. The selected design is Market mechanics. Preserve the established typography, palette, service positioning, animated market diagrams and procedural asset models. This repository contains the implementation and decisions; a new cloud task does not need the original local conversation to understand them.

Use Node 24.11.0 from .nvmrc and npm:

```sh
npm ci
npm run check
node scripts/check-liquidity-animation.mjs
node scripts/check-service-navigation.mjs
node scripts/check-need-illustrations.mjs
node scripts/check-asset-explorer.mjs
npm run build
```

For a cloud browser preview:

```sh
npm run dev -- --host 0.0.0.0
```

The server uses port 4321. Expose that port only through the environment's authenticated preview mechanism. If the proxy requires an allowed host, allow its exact hostname rather than disabling host validation globally. No database, secrets, API keys or backend are required. Package installation needs registry access.

## Current site

- Static routes: `/`, `/market-making`, `/dex-liquidity-management`, `/work`, `/company`.
- Development-only routes: `/review`, `/asset-review`, `/studies`, `/concepts/[direction]`. These must remain excluded from builds.
- `/review` provides exact 375, 768 and 1440px viewport checks and section navigation.
- `/asset-review` renders each procedural specimen explicitly for material inspection.
- Asset explorer: nineteen specimens in Metals, Yield-bearing fund, Tokenized stock, Unique asset, Grains, Real estate and Commodities. Grain specimens are wheat, corn and soy; property specimens are residential, office and industrial.
- Mobile and reduced-motion views deliberately use SVG illustrations. Desktop 3D loads on intersection, caches at most three models, rotates automatically and supports direct drag and click-to-pause.
- All business evidence gaps and draft claims remain in docs/commercial-evidence.md. Do not invent proof, numbers, customers or dashboard screenshots.

## GitHub and Vercel

Use a feature branch and a pull request for each remote change. GitHub Actions runs checks and the static build. Vercel's Git integration should create branch previews and update the main deployment when a change merges. Confirm the integration and preview URL in the deployment status rather than assuming a push deployed.

Vercel settings are versioned in vercel.json: Astro, npm ci, npm run check && npm run build, dist output, Node 24.x selected by package.json. No Astro adapter is needed for this static build. The host's Node 24 patch may differ from the development pin.

The owner authorized this GitHub repository and a separate Vercel preview. Do not attach onchainbureau.com, change DNS or alter the existing dashboard project. Keep noindex and the X-Robots-Tag header until an explicit production launch. Noindex is a crawler directive, not access control.

## Cloud environment setup

Create a cloud environment using this repository. Ask the setup task to install Node from .nvmrc, run npm ci, run the checks above, and verify the dev server on port 4321. Publish the prepared environment after reviewing its setup report. Start subsequent tasks against it and preserve changes in Git.

Suggested first task:

> Continue the Onchain Bureau website in nve-quant/website. Read AGENTS.md and docs/CLOUD_HANDOFF.md, run the checks and open the homepage. Preserve the established design and 3D assets. Make requested changes on a feature branch and open a PR for review. Keep the live domain unchanged.

Official references:
- https://learn.chatgpt.com/docs/environments/cloud-environments
- https://vercel.com/docs/frameworks/frontend/astro
