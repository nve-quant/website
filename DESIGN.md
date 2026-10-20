# Design exploration

Status: Market mechanics selected by the owner. The developed homepage is at /. Original studies remain at /studies in development.

### CEX order book / depth switch
The shared CEX illustration now offers Order book and Depth tabs in the existing Public Sans, forest-green and muted-brown system. The left price history remains in place. The right depth view accumulates the same five levels per side shown in the book, on one fixed size scale; it is not a separate invented feed. Native tab buttons support arrow keys, Home/End and visible focus, without restarting motion or overriding pause. The order-participation legend appears only in the book view. Historical volume is anchored to absolute sample IDs so completed bars retain their heights while scrolling. No new dependency or network request.

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
The owner requested more dynamic and 3D treatment after reviewing the static homepage. Replace its static diagram with four selectable illustrative asset studies: gold ingots, portfolio-share layers, a physical stock certificate and a faceted unique asset. The selected study changes reference-price, liquidity and redemption explanations together. This gives the motion a business-specific purpose.

Use original procedural Three.js geometry with a pale green surface (#e6ebd9), physical lighting and restrained model transitions. The selected asset rotates automatically. Drag the object directly to turn and tilt it; click the object or press Space/Enter while the scene has focus to pause or resume. Arrow keys turn or tilt the object and pause automatic rotation. Keep the scene focusable with visible focus and interaction instructions. Preserve the visitor's pause choice when switching assets or returning to the scene.

Cap automatic rotation at 30 rendered frames per second. Direct dragging can use the display rate while movement settles; a stationary held drag does not keep rendering. Stop rendering outside the model's viewport observation area or while the document is hidden. Small screens (700px and below), reduced-motion preferences and WebGL failures retain original SVG illustrations and the same selectable content, without an inactive scene tab stop. CSS handles selection independently of JavaScript. Brief entrance and disclosure transitions respect reduced motion.

Next: review this interaction and approve business copy before expanding service and research pages. The live site remains untouched.

### Asset detail refinement (earlier iteration)
Refined the three models with tighter gold bevels and a local 256×512 stamp texture, metallic fund layers with perimeter inlays, and an original 112-triangle stepped emerald cut. Reduced fill light/exposure to preserve material contrast. Reused ingot and share geometry. Kept the 1.75 pixel-ratio cap, 1024px shadow map, lazy loading and on-demand rendering; no bloom, transmission pass, downloaded textures or new dependencies.

### Bullion / studio rendering pass
The owner rejected the incremental detail pass as still too basic. Rebuilt the assets as product studies: tapered cast bullion with rounded lips, recessed specimen typography and surface variation; enamel fund-share certificates with original guilloché engraving; and an emerald cut with optical depth. A custom photographic studio reflection environment replaces the general room. Removed the decorative pedestal, orbit ring and crosshair. Tightened the camera framing so material detail is legible. Gold typography depicts an illustrative specimen; it is not evidence of a refinery certification or an asset held by the business.

Bullion silhouette/reference context: [Argor-Heraeus cast bar catalogue](https://www.argor-heraeus.com/en/products-and-services/products/cast-and-minted-bars/1000g-au-cast-classic-999.9/). No manufacturer logos, images or model files are reused.

Performance: one visible asset group, original procedural geometry and generated maps, no external asset fetches. Reflection environment is generated once. Retain DPR cap 1.75 and one 1024² shadow map; the gemstone uses one half-resolution transmission pass. Automatic rotation uses a 30fps cap. Rendering stops once paused movement settles, outside the model's viewport observation area or while the document is hidden. Initialization waits for a visible document and model area. Dispose shared maps once on teardown.


### Readable bullion stamps and tokenized stock
The owner found the initial engraving adjustment too faint and rejected Onchain Bureau branding on bullion. Replaced it with larger generic Au, FINE GOLD, 999.9 and 1000 g stamps, a stronger recessed height map and darker groove interiors. Keep the original bar geometry, material finish, lighting and motion. The small specimen marking distinguishes the study from an actual certified refinery product. Mobile gold also includes purity and weight markings.

Added a tokenized-stock scenario with an original curved paper certificate: ivory rag-paper texture, navy security-print borders, architectural vignette, registration fields and a raised foil specimen seal. The certificate is illustrative and does not name a real issuer or establish shareholder rights. The stock explanation links to SEC staff's tokenized-securities statement and distinguishes underlying share prices from the rights conferred by a token structure.

The paper geometry and generated textures are created on first stock selection; no remote model, image, font or extra dependency is fetched. The existing capped rotation and drag interaction are shared. Mobile selectors use two columns for four readable choices; stock has an original SVG fallback.

### Service-first homepage hierarchy
Owner clarification, 20 October 2026: market making is the main business; tokenized assets are a specialist application. The developed homepage now leads with “Market making. On CEX and DEX.” and an explicit service description. Preserve Public Sans, the selected green palette and the existing asset models.

Composition: hero → CEX/DEX operating explanations → supporting services → engagement process → dedicated tokenized-asset explorer → research → platform status → contact. The header links directly to the asset studies for returning visitors.

The two primary services share a comparison surface, divided by a single rule. Original inline SVGs show the subject of each operation: two-sided orders around a spread, and allocated liquidity ranges around a price. These are labelled schematic illustrations without numbers, live-data styling or exchange endorsements. No new animation or JavaScript is required. The more elaborate 3D studies remain below the engagement section, with existing lazy loading and interaction intact.

Arrakis (https://arrakis.finance/) was reviewed as service-positioning context, not copied for visuals, performance claims, client evidence or product architecture. Proposed operational details remain subject to owner review. The approved business category does not establish custody arrangements, exact integrations or measured latency.

### Animated market mechanics
Owner requested more professional, dynamic CEX/DEX graphics. Replace the four broad order bars with 24 cumulative price levels on each side of a spread. Use forest green (#315c49) for bids and muted brown (#8a6648) for asks; this secondary color encodes the two sides rather than creating a new brand accent. Show fine gridlines, labelled relative-price axes, outlined reference markers and restrained transparent area fills on #edf0e7. No invented price, volume, latency or performance figures.

DEX shows background liquidity and a distinct managed position. A 16-second illustrative sequence moves price, holds an observation interval and then repositions the range. It explains the service, not an actual strategy or recommended rebalancing rule. The controlled recurring motion is an explicit owner-requested exception to the original static diagram plan. Both charts have independent pause/resume controls, respect reduced motion, stop outside the viewport and stop when the document is hidden. Use small native SVG updates capped at 30fps; no chart library, canvas or added rendering dependency. Static SVG is present before JavaScript and remains usable without it. Keep the four 3D asset studies unchanged.

### Faster price chart and order book
Owner asked for a more active, HFT-like visual and a chart alongside an order book. Replace the CEX cumulative-depth view with a scrolling indexed price trace, activity bars and five ask/five bid levels. Synthetic quotes update every 120ms; sizes change on staggered row intervals. The chart, displayed index and ladder all derive from one quote snapshot. Use tabular numerals and quiet depth fills, not flashing panels or decorative activity lights. Keep the established forest/brown side colors and pause control.

This explicitly labelled numerical demonstration is an exception to the earlier number-free diagram rule. It does not depict a real ticker, client result, trading interface or measured execution speed. Labels say “Simulated quotes” and “Simulated market. Not live data.” The DEX explanation is now a five-second cycle (3.2× the previous pace), still showing price movement before range adjustment. The SVG draw cap remains 30fps and existing visibility/reduced-motion behavior remains intact.

### Our-order markers
Owner requested tiny yellow dots identifying our illustrative CEX orders. Mark the seven largest of the ten displayed levels and leave the three smallest unmarked; recompute alongside quote updates. The marker means the level contains our orders, not that all displayed size belongs to the firm. Use a 3-unit SVG radius, yellow #e0b72f and darker #866819 outline, plus an “Our orders” legend. Preserve the synthetic-data disclosure and describe the markers in the accessible chart description. No additional animation loop, library or asset is needed.

### Service pages and client transparency
Owner-approved milestone: expand the local homepage and add `/market-making`, `/dex-liquidity-management` and `/work`. Preserve the selected Public Sans typography, ground #f6f7f2, ink #243f35, muted #526457, rules #b4bfb1, accent #dce9a9 and white document surface. The mandate uses a document composition with named scope fields. Access is explained through CEX accounts and DEX vaults. A forest-green reporting section groups actual dashboard capabilities without simulating a product screenshot. These different content structures carry the hierarchy; no new decorative animation is needed.

Home order: hero → primary services with detail links → mandate → non-custodial permissions → dashboard visibility → four-step engagement → supplementary services → preserved asset studies → research → contact. Shared navigation, footer and page layout serve all four routes. Service pages reuse the existing chart/range component and native FAQ disclosures. The responsibility comparison stays a semantic table with wrapping text on mobile.

The owner confirmed non-custodial CEX API access, DEX Safe/Squads roles and permissions adaptable to client requirements, and an existing comprehensive live dashboard. The old future-platform promotion is removed from the homepage to avoid confusing it with the live dashboard; its source remains inventoried. Do not invent screenshots, an authentication destination, API permission flags, vault configuration or uniform reporting coverage. Reduced-motion and offscreen controls remain in the original animation controller. New content adds no client-side JavaScript outside the development review tool.
