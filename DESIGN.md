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

### Conversion and evidence review
Preserve the Market mechanics palette, type and existing visual assets. Problem-to-objective rows replace the repeated homepage mandate document, while the service pages keep the detailed scope. KPI registers pair each proposed measure's client value with a concrete definition; they contain no invented targets or results. Tablet uses two columns, mobile stacks each definition under its measure. Commercial and access questions use definition lists.

Local editorial notes use a muted paper surface and dashed rule, collapsed by default. They are clearly separate from client copy, work with native keyboard disclosures and are omitted from builds. The Company route provides a truthful operating-model introduction with evidence placements awaiting real biographies and results. The contact action explains its next step and uses a plain email briefing template. No additional motion, runtime JavaScript or packages.

### DEX liquidity profile and faster tracking
Shorten the managed range's illustrative response delay from roughly 0.94 seconds to 0.19 seconds while preserving the five-second cycle and 30fps draw cap. Price and range now follow the same path with a small delay. This is explanatory pacing, not a rebalance-speed commitment.

The vertical axis now explicitly represents liquidity L at each price. A single managed range has a flat liquidity contribution within its bounds; overlapping LP ranges form a stepped pool profile. Pool totals include the managed position and update as its range changes. This replaces the two generic bell shapes. Cumulative depth increasing away from the current price is a different chart. Reference: [Uniswap concentrated liquidity](https://developers.uniswap.org/docs/get-started/concepts/liquidity-providers/concentrated-liquidity). Preserve the existing visual system, pause control and motion safeguards.

### DEX centre valley and shoulders
Owner clarified the intended shape: thinner near the centre, fuller a little further out, with nonlinear transitions. Supersede the single flat-range illustration with an aggregate of multiple managed ranges. Use a low central allocation, two balanced shoulders and tapered outer edges; the pool profile includes that managed contribution over a broader stepped background. Keep the existing palette, Public Sans, SVG dimensions, fast tracking and motion controls. This is a selected illustrative allocation, not a claim that every pool or strategy has this shape.

### Services navigation overview
Replace the Services anchor with a native disclosure enhanced for mouse hover. Preserve the existing Public Sans, forest ink, ground and rules. Desktop uses three columns: Liquidity management (CEX/DEX), Execution & strategy (OTC, systematic strategies, treasury execution), and Market support (market design, pools/hooks, distribution). The two core services have larger titles; all entries include existing content summaries. Tablet groups market support below the first two columns; mobile stacks groups in a height-limited scrollable panel. No icons beyond a directional chevron, new assets, shadows or decorative transitions.

Hover opens with a short leave delay for crossing into the panel. Native click/touch and keyboard disclosure behaviour remain; ArrowDown enters the links, Escape dismisses and restores trigger focus, leaving focus or clicking outside dismisses. The first mouse click preserves a menu already opened by pointer entry. Supplemental links open their corresponding homepage explanations, including cross-page visits. The service overview remains available within the panel.

### Small diagrams for client needs
Owner requested a simple dynamic graphic for every client-need row. Add four original inline SVG illustrations: uneven book sizes, allocation across three venues, a price-following DEX allocation, and activity entering a report. Preserve forest/sage colours, Public Sans and the existing ruled rows. Desktop reserves a narrow diagram column; mobile pairs the illustration with its heading and keeps explanatory copy full width. No card surfaces, new icons, performance readouts or dashboard mockups.

Motion explains each operation with 3.6-second CSS sequences. A small controller enables motion only while the section is visible and the document active. One section pause/resume control preserves user intent; reduced-motion users receive static illustrations. No rendering library, remote assets or per-frame JavaScript. Diagrams have static accessible descriptions and an illustrative-data caption.

### Specimens within asset studies
Owner requested gemstone and bullion variants plus commodities, selected with side arrows. Keep the existing section, Public Sans, forest ink and pale green stage. Rename the gold category Precious metals; preserve its gold geometry, engraving depth, textures and lighting. Add silver, palladium and platinum finishes and specimen stamps. Preserve the original emerald, adding oval ruby, cushion sapphire and a round diamond study with separate optical/material settings. Commodities begins with a rolled steel oil drum and a bound wheat sheaf. These are original procedural illustrations, not scans or certified holdings.

Two quiet circular side buttons cycle within a category; captions name the specimen and show its position. They wrap in both directions and remember the last specimen per category. The buttons disappear for fund and stock. Drag/click rotation remains attached to the object. Remove the explanation-panel entrance animation so text remains visible when browser animation scheduling is suspended.

Build only selected specimens; retain at most three in a least-recently-used cache and dispose evicted geometry, materials, maps and instance buffers. Keep the existing 30fps rotation cap, DPR limit, half-resolution transmission, offscreen/hidden suspension and mobile/reduced-motion SVG fallback. Wheat kernels use one instanced mesh. Local /asset-review provides explicit still renders with production geometry/materials and resource counts, without relying on browser animation scheduling; it never enters the static output.

### Wheat shadow grounding
Include stalks and twine in the wheat's directional shadow, align the cut ends with the receiving floor, and use a tighter, lighter contact shadow. Apply a smaller normal bias only for wheat so its thin stems remain connected in projection. Preserve the material colour and all other asset lighting settings.

### Metals, grains and property — 20 October 2026
Expanded the explorer to seven categories and nineteen specimens. Kept the existing category identifiers and original gold/gem geometry. Wheat and its corrected shadow move intact into Grains. Copper uses a rolled strip coil; aluminium uses a restrained cast finish. Corn uses instanced kernels and curved husks; soy shows opened dry pods and seed. Property uses original architectural miniatures with balconies, mullions, loading bays and roof equipment, avoiding implied photographs of real holdings. Repeated building details are instanced by material.

The category row can wrap and becomes a two-column selector on mobile. Each new specimen has an original SVG companion for mobile, reduced motion and unavailable WebGL. Side arrows retain wrapping, category memory and accessible names. Models are created on demand, with the existing three-model eviction limit. No new dependencies, downloaded textures or models.

### Eight asset groups and higher-detail models — 21 October 2026
Changed the selector to a consistent four-column desktop/two-column mobile grid. Generated its category/specimen visibility rules from the typed data to avoid manually duplicated selectors as groups grow. Existing internal IDs/anchors remain stable. Twenty-five specimens retain native previous/next controls and per-category memory. Additional notes distinguish fund shares, Treasury bills, corporate bonds and physical commodity illustrations.

Grains have finer curved surfaces and small tiled relief maps. Corn has a tapered tip and waxier kernel response; soy pods/seeds are grounded individually. Wheat retains the corrected stalk shadow and binding. Buildings add rounded edges, brick/mortar texture, recessed glazing with pane variation, balcony returns, coping, gutters and warehouse roof seams. The barrel uses a continuous profiled shell, 2K label map, paint relief, lid ribs and detailed fittings. Gold and gemstone geometry remains unchanged.

New models: strapped nickel cathode plates; an explicitly illustrative natural-gas storage vessel; a burlap coffee sack with instanced green beans; cotton bolls; and original Treasury/corporate-debt document studies using the established paper renderer. No government seal, issuer identity or invented security terms. All new art and maps are procedural and local.

Canvas pixel ratio is capped at 2 and 2.4 million pixels; shadow map is 2048 square. Model creation remains lazy with a three-model cache and offscreen suspension. Repeated façade pieces and grains use shared/instanced geometry. Added geometry, draw-call and estimated texture-memory budget checks; these do not substitute for browser/device profiling. Browser review was unavailable in this session and remains pending.

### Preserve 3D detail across viewport and motion preferences
Supersedes the mobile/reduced-motion SVG policy above. Load the same detailed models on small screens, retaining lazy initialization, bounded pixels, 30fps idle rotation, offscreen suspension and three-model cache. Reduced motion shows stationary 3D with direct manipulation, without entrance easing or automatic rotation. SVGs remain for unavailable WebGL/no JavaScript, not a viewport-based quality tier. Explicitly label a renderer failure instead of presenting the simplified artwork as the intended model.

### Market distinctions and material refinement — 22 October 2026
Keep the eight category labels; use benchmark, crop class, grade reference, material form and instrument type at specimen level. Give detail captions their own line and reserve 120px below the canvas for wrapped labels. Retain the current studio lighting, original bullion and gem geometry.

Refine dent-corn crown geometry and mature husk colour; add UV coordinates to previously unmapped corn husks and soybean pod shells, plus pod seams. Wheat spikelets have pointed glumes/keels and restrained dimensional variation. Coffee sack uses a continuous curved profile and folds. Building glazing has a shared room-depth texture, more appropriate brick scale, rooftop fan relief, door reveals and paving joints. Oil has WTI specimen artwork, hoop-localised paint chips, fine scratches and relief on the lid. Geometry remains instanced/shared, textures local, and loading lazy. These are procedural realism improvements; final photorealism is a visual review judgement, not established by a geometry check.

### Focused asset refinement and removal of repeated instructions
Owner requested a multi-agent pass limited to energy, agriculture and property. Preserve precious/industrial metals, gems, equity/fixed-income/fund geometry and the shared renderer/lighting.

Agriculture: mature corn has less glossy irregular dent kernels, folded dry husks and curved silk; soy has narrower side-pod openings, smaller seed hila and batched pod hairs; wheat has geometric tapered awns, stem nodes and twisted binding. Coffee uses a woven sack, stitched irregular lip and smaller varied grooved beans; cotton has asymmetric lobes, curved bracts and surface-rooted fibres transformed with each lobe. Grain textures remain small and tiled.

Energy: replace invented oil-bung flange bolts with sealing rings, add restrained handling dents and correct painted-steel response. Gas has contoured saddles, welded seams, nozzle hardware and a conforming identification plate. Ground the drum and coffee with their actual bounds rather than leaving a floor gap.

Property: apartment masonry now has actual apertures and recessed glazing; roof access and vents follow floor scale. Office gets all-sided spandrels, corner caps and supported canopy. Warehouse gets raised docks, levelers, down-pitch standing seams, curbed rooflights, sheltered loading and personnel access. Ground all bases. Repeated details stay instanced.

Remove the oil illustrative stamp and the caption’s repeated asset-study/rotation instructions per owner request. Rotation remains on the object, keyboard-accessible, with its hidden accessible description and state. Only a genuine renderer error displays an explanatory message. The existing single section-level context remains.

### Owner-observed corn/dock defects and soybean/coffee reconstruction
Corn husks now peel outside the kernel envelope below the first row; centre-vein positions follow the same path. Replace the capsule cob with a tapered core so it cannot protrude through the narrow upper rows. A geometry regression checks the husk clearance above y=.23.

Warehouse bays use one U-shaped gasket frame, recessed shutter and independent lower bumpers. Remove the stacked full-width backplate, oversized outer jambs and duplicate leveler-edge plate; slim the canopy supports. Preserve other property types.

Replace upright soybean tubes with a low split-pod composition: separate inner/outer shell surfaces with actual rim thickness, an opened opposite valve, cream seeds with small hila and scattered grounded seeds. Coffee uses an asymmetric flattened sack, folded uneven cuff, quieter printed mark and flattened cleft-faced green beans. Appearance still requires browser review; geometry checks alone do not establish photorealism.

### Direct attachment and surface support correction
Owner found detached corn leaves and floating coffee beans, and rejected the split-soybean-pod composition. Corn husks now start with a finite-width root inside the stalk radius at y=.10, then peel clear below the first kernel row. Coffee no longer stacks kernels on bounding-box tops: each visible kernel rests on the same filled height-field mesh used by the scene. Footprint bounds only reject overlap. Soy now uses a loose sample of16 nearly spherical dry yellow seeds, small inset hila, subtle variation and actual per-seed ground contact. No pods.

### Small DEX need diagram: true stacked contributions
Replace independently overlaid moving silhouettes with eight fixed price bands. Other pool liquidity is the lower sage segment; managed allocation grows upward from its top. Reallocate managed heights across the same bins while price and range markers move, retaining the short tracking lag. Endpoint allocations have equal total height, so interpolation preserves capital in this schematic. Reduced-motion state shares the same initial price, range and allocation alignment. Original section pause/offscreen/visibility controls continue to govern CSS animation.

### Commercial explanatory graphics and owner interview
Add a permissions map separating client account/vault, agreed access and Bureau operations. Measurement uses a native CEX/DEX radio selector with explanatory diagrams rather than generated performance results. Reporting replaces the existing capability list with annotated graphic rows; these are not a trading-app mockup or a screenshot. Keep light text on the dark reporting surface. Replace the homepage process list with paired client inputs/Bureau outputs. OTC and strategies have scoped diagrams inside their existing disclosures, without inventing principal/agency or settlement arrangements.

Use static geometry and native interaction, with no new dependencies or perpetual animation alongside the existing moving market illustrations. VenueCoverage is data-gated: CEX logo rail and DEX deployment matrix remain absent until public coverage is owner-confirmed. Do not populate it with competitor venue lists. Full interview scope is tracked in docs/copy-interview.md.

### Confirmed venue coverage and operating evidence
Populate the CEX rail with 27 distinct owner-confirmed venue marks. Use visible names as well as logos, native horizontal touch/keyboard scrolling and previous/next controls. No automatic movement is needed alongside the existing animated market charts. Retain colour on original marks; white Bybit/OKX/Crypto.com artwork gets a dark backing. No implied partnership labels. DEX deployment matrix remains data-gated pending protocol/network details. Add concise owner-approved engagement examples and distinguish pilot-stage strategies in both navigation summaries and homepage copy.
