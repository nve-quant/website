# Working on Onchain Bureau

Read BRIEF.md, DESIGN.md and docs/content-inventory.md before changing content or UI. Apply the frontend-design skill for visual work. Keep changes focused and explain observed problems rather than making arbitrary styling passes.

- This milestone is local-only. Do not publish, change DNS or alter the live site.
- Market mechanics is selected. Develop the homepage at / using its scoped design system. Preserve the original concepts at /studies as development-only references.
- Keep shared content in src/data and typed content collections. Concept-specific styles must be scoped to their body class; shared mechanics may be reused.
- Never invent proof. Preserve source URLs, draft status and illustrative labels. New business claims need explicit sourcing and owner review.
- Maintain semantic HTML, visible keyboard focus, readable contrast, reduced motion and mobile layouts.
- Use npm and the lockfile. Run npm run check and npm run build after substantive changes. Build must exclude concept routes and links.
- Review 375, 768 and 1440px layouts in the browser, including lower sections. Capture screenshots and record failures/fixes in docs/QA.md. Never report a browser test as passed without observing it.
- Use a fresh-install check when dependencies change. Do not add a component framework or backend without a concrete requirement.
- Make Git checkpoints for meaningful milestones. Never commit secrets, dependencies or generated build output.
