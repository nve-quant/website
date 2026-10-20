# Design exploration

Status: Market mechanics selected by the owner. The developed homepage is at /. Original studies remain at /studies in development.

## Common principles
Lead with the business or an asset-specific question. Keep readable measures, familiar navigation and a real contact action. Structural rules communicate grouping. One distinctive idea per concept; motion must support orientation or interaction. All concepts share service and research content and an explicitly illustrative operating diagram.

## Concept specifications (provisional)
| Concept | Type | Palette | Composition and reason |
| --- | --- | --- | --- |
| Institutional clarity | Public Sans 400/500 | #193e59 ink; white; #eaf1f5 research shelf | Wide proposition with compact explanatory column; restrained hierarchy makes the offer legible. |
| Market mechanics | Public Sans 400/500 | #243f35 ink; #f6f7f2 ground; #dce9a9 diagram | The operating relationship is the largest coloured surface. Green relates to the illustrative flow, without live financial data or dashboard chrome. |
| Research-led authority | Newsreader 400 headings; Public Sans body | #433048 ink; white; #f0edf2 surface; #695475 drawing | An asset-specific research question leads; a geometric emerald study reinforces the subject rather than pretending to show a real asset. |

Public Sans provides open, readable operational text. Newsreader is reserved for the concept that prioritises reading. Fonts are self-hosted through Fontsource with font-display: swap; see docs/assets.md. Layouts use fluid heading sizes, 5–6vw outer gutters and 600/900px responsive changes. These are experimental settings, not approved brand tokens.

## Review criteria
Evaluate clarity of offer, business specificity, evidence credibility, mobile readability, hierarchy and memorability. Use a short observation for each, not a fabricated numerical slop score. Compare at the same widths and with the same content. Apply the competitor-substitution test and remove elements without a job.

## Decision log
- 2026-10-20: owner chose refined current positioning, full visual rethink, local-only development, file-based editing through Codex and three concepts.
- Shared content and operating diagram are independent of concept styling. Research concept reorders the research preview to lead with insight.
- Original vector asset study uses no third-party imagery. No external icons or stock photography.
- Final fonts, colours, spacing and reusable component tokens are deferred until concept selection.

## Next implementation milestone
After selection, consolidate the chosen styles into semantic CSS variables, resolve draft claims with the owner, develop a complete homepage, then extract only the components required by service and research pages. Review mobile before expanding to the remaining sitemap.


## Selected system: Market mechanics
The owner selected Market mechanics for the homepage on 2026-10-20. The selected palette and Public Sans family are implemented in src/styles/home.css as scoped CSS custom properties:
- Ink #243f35; ground #f6f7f2; diagram accent #dce9a9; secondary text #526457; divider #b4bfb1; paper #ffffff.
- Public Sans 400/500, self-hosted. Headings use negative tracking and fluid sizes; body copy stays within readable measures.
- Outer spacing: clamp(24px, 5vw, 80px). Section spacing: clamp(64px, 8vw, 112px). Responsive changes at 600px and 1000px.
- Diagram is the principal coloured surface. It connects asset terms/reference prices, market operations and holders. No decorative chart series, inferred performance or live-data claims.
- Service rows use native details/summary controls. Open states reveal draft descriptions and contextual email links; these disclosures work without JavaScript.

Composition reviewed against the brief before implementation:
```
Brand                         Services / How we work / Research / Contact
Specific proposition          Business explanation + email CTA
Asset terms → market operations → holders (illustrative)
Why the asset matters          Operational explanation
Service name                  Summary + expandable detail
Engagement explanation        Three sequential steps
Research introduction         Asset-specific note
Platform status               Enquiry link
Contact invitation            Email + what to include
```
The old three-node diagram was too abstract to explain the work. It has been replaced with concrete reference-price, venue, liquidity and operating-rule labels. Final homepage copy is still subject to business review; selecting the visual direction does not verify capabilities.

Next: owner review of the developed homepage, then build service/research pages from the chosen system. Company and Legal currently link to the existing public site.


## Interactive asset explorer
The owner requested more dynamic and 3D treatment after reviewing the static homepage. Replace its static diagram with three selectable illustrative asset studies: gold ingots, portfolio-share layers and a faceted unique asset. The selected study changes reference-price, liquidity and redemption explanations together. This gives the motion a business-specific purpose.

Use original procedural Three.js geometry with a pale green surface (#e6ebd9), physical lighting and restrained model transitions. Rotation is opt-in and pausable; pointer movement produces a small tilt. Render on demand and pause offscreen/in background. Small screens (700px and below), reduced-motion preferences and WebGL failures retain original SVG illustrations and the same selectable content. CSS handles selection independently of JavaScript. Brief entrance and disclosure transitions respect reduced motion.

Next: review this interaction and approve business copy before expanding service and research pages. The live site remains untouched.
