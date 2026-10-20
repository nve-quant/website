# Design exploration

Status: three local concepts; no final visual identity selected.

## Common principles
Lead with the business or an asset-specific question. Keep readable measures, familiar navigation and a real contact action. Structural rules communicate grouping. One distinctive idea per concept; no decorative animation. All concepts share service and research content and an explicitly illustrative operating diagram.

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
