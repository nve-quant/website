# Foundation QA — 20 October 2026

## Automated and structural checks
- Fresh `npm ci --offline`: passed from lockfile using cached registry packages; 337 packages installed, zero reported vulnerabilities.
- `npm run check`: zero errors, warnings or hints.
- `npm run build`: passed. Production contains the index only; assertions exclude both concept and responsive-review routes and concept links.
- Local HTTP checks: index, review page and three concept pages returned 200. All 10 directly linked scripts/styles returned 200.
- Typed content validates required title, summary, source URL, status and research date.

## Browser checks
Native Chrome and Safari were used because the browser connector was unavailable. Safari's development-only /review page measures the embedded page's actual scroll width after fonts load and validates section destinations.

| Concept | 375px | 768px | 1440px |
| --- | --- | --- | --- |
| Institutional clarity | Pass | Pass | Pass |
| Market mechanics | Pass | Pass | Pass |
| Research-led authority | Pass | Pass | Pass |

Each cell passed: no document horizontal overflow, zero broken section anchors and fonts loaded. Mobile and desktop screenshot evidence is in screenshots/. These are native window captures, not full-page exports; the review harness can scroll horizontally around a 1440px iframe in a smaller window, while the embedded page itself has no overflow.

Direct-page desktop inspection covered all three compositions. Contact and research section navigation was exercised. Mailto targets were inspected without sending mail or opening an external email workflow. Shared focus styling is visible in review-tool captures; a complete keyboard and assistive-technology audit remains a production-stage check. Reduced motion is respected in CSS; the concepts contain no animation.

Safari console was empty after a fresh research-concept load. Chrome showed extension-generated warnings (MetaMask/MozBar and others). A temporary server connection failure occurred during clean dependency installation; the server was restarted and all routes were rechecked. server-restart-interruption.png records that failure, not a successful layout test. A full multi-browser console/network capture is not claimed.

## Contrast
Calculated from declared foreground/background colours using sRGB relative luminance:
- Institutional ink on white: 11.20:1; on research surface: 9.81:1.
- Mechanics ink on ground: 10.62:1; on diagram surface: 8.86:1.
- Research ink on tinted surface: 10.31:1; secondary drawing text on white: 6.72:1.
- Focus colour on research surface: 5.69:1.
These text pairs exceed WCAG AA's 4.5:1 normal-text threshold. This is not a claim of a full accessibility certification.

## Defects fixed and subtraction pass
- Astro telemetry attempted an out-of-workspace preference write: disabled telemetry in project commands.
- Migrated the schema import to astro/zod and replaced deprecated URL schema syntax; final diagnostics are clean.
- Tablet diagram columns aligned unevenly: changed flow alignment to start, retaining centred connectors.
- Research concept repeated the same note in two sections: removed the duplicate and linked navigation to the opening research section.
- Disabled Astro's developer toolbar to keep visual studies unobstructed.
- Kept all proof figures, customer logos, motion and nonessential iconography out of the concepts.

## Design assessment
- Institutional: clearest offer and contact hierarchy; the least distinctive direction, requiring stronger real evidence in the full homepage.
- Mechanics: makes relationships tangible; the diagram is illustrative, so it must never be treated as performance proof.
- Research: most specific opening and strongest editorial character; the service proposition appears later, a conscious tradeoff to review with the owner.

## Next review
Select a direction. Confirm copy claims and research date, then develop final tokens and the complete homepage. Before production, complete keyboard/screen-reader checks, full browser/network coverage, real-content review, URL redirect mapping and hosting decisions.


## Developed homepage — Market mechanics selected
- Homepage replaces the root comparison index; studies move to development-only /studies. The original concepts remain intact except their return links.
- Type/content checks and static build pass. Production contains only the homepage, not the review routes.
- Safari /review measured homepage widths 375, 768 and 1440px: all passed no horizontal overflow, zero broken section targets and loaded fonts.
- Service disclosure opened by click and closed using Space; accessibility tree reported the expanded and collapsed states. Contextual email subjects were inspected, with no mail sent.
- Desktop diagram and mobile heading/navigation inspected; screenshots named home-*.png capture the review.
- No homepage application JavaScript was added. Animation remains absent; shared visible focus and reduced-motion rules are retained.
- Business copy remains draft. Company/Legal/research links intentionally open existing public pages; their contents have not been migrated.


## Interactive 3D explorer — 2026-10-20
- Clean `npm ci --offline` succeeded (346 packages audited, zero reported vulnerabilities). `npm run check`: zero errors, warnings or hints. Static build and production-isolation assertion passed. Vite reports the separately loaded Three.js chunk exceeds 500kB; real-device loading/performance remains a pre-launch check.
- Chrome native browser review: original gold and portfolio geometry rendered; selecting unique asset updated the explanation and model state. Start/pause toggled accessible pressed state; arrow-key selection switched fund to unique asset; directional rotation and an expanded research question were exercised.
- `/review` measured 375, 768 and 1440px: no horizontal overflow, zero broken section links, fonts loaded. Rechecked selected fund at 375/768 and unique at 1440. The harness now remeasures after selection/disclosure changes.
- Fixed mobile helper words running together after hiding a line break. Fixed cropped tablet scene framing by adapting camera field of view to narrow aspect ratios. Reviewed the corrected tablet rendering.
- Mobile displays the original SVG fallback and retains scenario selection without 3D controls. Reduced-motion and WebGL-loss fallbacks were inspected in source but not exercised with OS preference changes or forced context loss. Full screen-reader, cross-browser console and real-device performance testing remain outstanding. Chrome's installed extensions generate console noise; no clean-console claim is made.
- Screenshots: explorer-gold-desktop.png, explorer-unique-desktop.png, explorer-desktop-1440.png, explorer-tablet-768.png and explorer-mobile-375.png. These are native browser captures including browser chrome.
- Motion is confined to brief transitions, pointer tilt and user-controlled rotation. No live numbers, external model downloads or invented proof were introduced. Business text remains draft.

### Asset detail refinement
All three refined models visually reviewed in Chrome; captures are refined-gold.png, refined-fund.png and refined-emerald.png. Responsive harness passed 375/768/1440px without overflow or broken section targets. Type checks and build pass. Same render resolution and shadow-map allocation as before; a single 256×512 generated stamp texture and small procedural geometry details add no asset requests. GPU frame times on low-end hardware have not been benchmarked; no universal speed guarantee is claimed. Vite’s existing lazy-chunk size advisory remains.

### Studio model rebuild
- Replaced the incremental models with cast bullion, enamel certificates and a transmissive emerald. Inspected gold/gem in Chrome and all three models in Safari. Captures: studio-gold.png, studio-fund.png, studio-emerald.png.
- Fixed an opaque floor canvas covering the first caption line: captions now sit above the canvas. Tightened camera framing and inspected the complete model at 768px; studio-tablet-768.png records the result. Responsive harness passed 375/768/1440px with no horizontal overflow and zero broken section targets.
- Independent structural audit: gold 1,872 triangles, fund 8,636, emerald 264. Modest geometry; material/texture and transmission costs matter more. Reduced fund shadow casters, removed per-pixel temporary array allocations in gold texture generation, capped gemstone transmission to half resolution, and verified texture disposal. These are structural/Node checks, not a real-device GPU benchmark.
- Type/content check and static build passed; existing lazy chunk advisory remains. No new dependencies or model/texture downloads. Compressed lazy scene bundle measured about 141 KiB including Three.js; real-device FPS and load timings remain a launch check.

### Automatic rotation and direct manipulation
- All three 3D assets now rotate by default. Removed the separate rotation arrows and button; drag the object itself, or click it to pause/resume. Space/Enter provide the same pause action and arrow keys provide manual rotation. The pause choice persists across asset changes.
- Safari review covered automatic motion, all three selections, direct dragging, release outside the canvas, click pause/resume and keyboard rotation/resume. Fixed pointer handling so mouse movement without the primary button held cannot be mistaken for a drag.
- Responsive review passed 375/768/1440px: no horizontal overflow, zero broken section targets and fonts loaded. The 375px SVG fallback has no inactive model control or drag hint. Captures: rotation-gold-desktop.png, rotation-tablet-768.png and rotation-mobile-375.png.
- Type/content checks and static build pass; production isolation passes. No dependencies or downloaded assets added. Existing Three.js lazy-chunk size advisory remains.
- Source review verified the 30fps automatic-render cap, stopping rendering during a stationary held drag, pointer-capture cleanup, offscreen/background cancellation and reduced-motion fallback. Real touch hardware, forced WebGL loss, OS reduced-motion switching and GPU frame timings were not exercised in this pass.

### Subtle gold engraving adjustment
Changed only the engraving height-map shade (#656565 → #595959) and engraving colour (#bb8d3b → #b78a39), giving the recessed marks slightly more depth and contrast. Geometry, gold surface, lighting and interactions are unchanged. Reviewed the gold model in Safari; capture: gold-engraving-subtle.png. Type/content checks and build passed. No layout changes or new responsive checks in this pass.

### Unbranded bullion stamps and stock certificate
- The prior engraving adjustment was still too faint for the owner. Enlarged the fineness/weight lettering, strengthened recess contrast and removed OB/Onchain Bureau markings. Reviewed the resulting gold in Safari and the stamped mobile fallback in Chrome. Bar geometry and shared lighting remain unchanged.
- Added the tokenized-stock selector, scenario explanation, original 3D paper certificate and SVG fallback. Reviewed the certificate in Safari and Chrome; increased border stroke weights after the first render looked too faint. Chrome click-to-pause and dragging exercised on the new certificate.
- Chrome responsive harness measured 375, 768 and 1440px both before and after selecting stock: no horizontal overflow, zero broken section anchors and fonts loaded. Visually checked the two-column mobile selector, mobile certificate/gold, and complete tablet certificate framing.
- Captures: gold-unbranded-stamps.png, stock-certificate-desktop.png, stock-mobile-375.png and stock-tablet-768.png.
- Type/content checks, static build and production-isolation checks pass. The existing lazy-chunk size advisory remains. Scene code is 148,927 gzip bytes in this build; certificate textures are generated only on first stock selection, with no external asset fetches or new dependencies. No new GPU timing, screen-reader or clean-console audit is claimed.

## Service-first homepage, 20 October 2026
- Repositioned the hero and metadata around market making on CEX and DEX. Added two primary service explanations and original schematic SVGs. Removed the duplicated generic market-making disclosure and tokenized-asset-first introduction. Preserved the four models, renderer and interaction code; moved the explorer below the engagement process.
- `npm run check`: 21 files, zero errors/warnings/hints. `npm run build`: passed, one production page; development-route isolation passed. Existing lazy Three.js chunk warning remains. No dependency changes or new client JavaScript.
- Chrome responsive harness at 375, 768 and 1440px: observed no horizontal overflow, zero broken section anchors and loaded fonts. Reviewed hero, service layouts, relocated explorer and tablet contact/footer. Services stack on mobile and share columns on tablet/desktop. Checked Services, Asset studies and Talk to us navigation; inspected CEX/DEX mailto destinations and subjects without sending email.
- Found two text joins caused by hiding forced line breaks on small screens; removed those breaks. Enlarged schematic labels at narrow widths. Rechecked corrected mobile text and all three widths after fixes.
- Confirmed mobile asset selection still updates to the stock certificate and explanation. Desktop/tablet navigation to the lower explorer initializes the existing rotating gold scene. No model or rendering changes. Existing reduced-motion and keyboard behavior retained in code; no new full assistive-technology, console or GPU audit claimed for this layout change.
- Evidence: `services-desktop-1440.png`, `services-tablet-768.png`, `services-mobile-375.png`, `asset-section-desktop.png`, `asset-section-mobile.png`. Desktop service capture predates the narrow-width typography correction; desktop layout is unchanged. Screenshots show native browser windows and the development review harness, not full-page exports.
- Subtraction pass: removed the generic asset-context section and duplicate market-making row; preserved supplementary services as secondary to the two main offers. Next review: approve positioning and operational detail, then develop dedicated CEX/DEX service pages and consider expanding the tokenized-asset studies into their own page.

## Animated service diagrams, 20 October 2026
- Replaced coarse service SVGs with detailed cumulative order-book depth and a concentrated-liquidity profile. The depth updates continuously; DEX price and range changes occur sequentially. Added independent semantic pause/resume buttons and static-first rendering.
- `npm run check`: 25 files, zero errors/warnings/hints. `npm run build`: passed, one page and production isolation passed; pre-existing Three.js chunk warning remains. Initial check caught a component-name collision with archived concepts; resolved by naming the new component `LiquidityDiagram.astro` and restoring the original concept component unchanged.
- `node scripts/check-liquidity-animation.mjs`: passed. Samples 64 seconds of geometry to check ordered cumulative depth, bid/ask separation, range bounds and finite coordinates; checks loop continuity. Controller tests mock browser events and verify initial/offscreen suspension, persistent user pause, document visibility, reduced-motion changes, bfcache return and teardown. These are controller tests, not a substitute for an OS-level accessibility audit.
- Safari observed at 375, 768 and 1440px: no horizontal overflow, zero broken anchors and fonts loaded. Reviewed both charts at mobile and paired tablet/desktop sizes. Observed movement and changed positions across captures; clicked DEX pause (Resume label and pressed state), then resumed. Existing lower asset studies and layout are unchanged. No fresh full console audit, screen-reader session or physical-device GPU profiling claimed.
- Screenshot evidence: `animated-book-375.png`, `animated-range-375.png`, `animated-markets-768.png`, `animated-markets-1440.png`. The 1440px iframe exceeds Safari's native window width, so its right side is cropped in the screenshot; the harness measures the full iframe and reports no page overflow. Native desktop preview was also visually reviewed with both diagrams fully visible.
- Animation module is inlined by Astro: 3,281 bytes minified, 1,552 bytes gzip when compressed alone. No new packages, external data fetches or downloaded graphics. Frame updates capped at 30fps and cancelled while inactive. No claim that this byte count equals total page transfer size.
- Subtraction pass: avoided numerical pseudo-market feeds, extra controls, glow effects and decorative motion. Color, axes and the moving geometry each have an explanatory role.

## Faster price chart and order book, 20 October 2026
- CEX now combines a scrolling 96-sample indexed price trace, activity bars and a ten-level order book. Quote snapshots update at 120ms intervals; size updates are staggered by row. DEX cycle shortened from 16 seconds to 5 seconds. No additional packages or data connections.
- `node scripts/check-liquidity-animation.mjs` passed: chart/book prices agree, bid/ask ordering and separation remain correct, sizes are positive, quote ticks remain stable between updates, multiple prices update within a second, DEX bounds and five-second wrap remain continuous. Existing mocked pause/visibility/reduced-motion/teardown checks also passed.
- `npm run check`: 25 files, zero errors/warnings/hints. `npm run build`: passed with one production page and development-route isolation. Existing Three.js chunk warning unchanged.
- Safari: observed the scrolling chart and changing price/size ladder. CEX Pause changed to Resume with pressed state; Resume restored the running state. Responsive harness passed at 375, 768 and 1440px with no page overflow, no broken anchors and fonts loaded. Reviewed numeric legibility and the paired layouts. Screenshots: `fast-markets-desktop.png`, `fast-markets-375.png`, `fast-markets-768.png`, `fast-markets-1440.png`. The 1440px review iframe remains wider than the native Safari window, so that capture is cropped at the right edge; native desktop capture shows the complete pair.
- The shared diagram animation module is 4,249 bytes minified / 1,986 bytes gzip, measured from the production JS file. Astro now emits it as a separate module. Frame drawing remains capped at 30fps; quote text changes only on a new quote tick. This is bundle-size measurement, not a new GPU/CPU performance audit. Existing independent pause, reduced-motion and inactive-page suspension remain.
- Subtraction pass: no return percentages, real ticker, exchange logos, countdowns, latency readouts or status-light flashing. Only the chart, quote ladder and explanatory DEX motion were changed.

## Our-order markers, 20 October 2026
- Added small yellow circles beside prices at seven larger simulated levels; three smaller levels remain unmarked. Legend and accessible chart description explain the meaning. Markers update with quote sizes using the existing controller.
- Existing geometry/controller checks, `npm run check` (25 files, zero issues) and static build/production isolation passed. Existing Three.js chunk-size warning remains. No dependency changes.
- Safari review: dots and legend are legible and do not overlap prices at native desktop, 375, 768 and 1440px. Responsive harness reported no horizontal overflow, zero broken section links and loaded fonts at all three widths. Observed the marks changing with the animated quotes.
- Captures: own-orders-desktop.png, own-orders-375.png, own-orders-768.png and own-orders-1440.png. The 1440px iframe capture is cropped by the narrower native browser window; its measured page has no overflow. No fresh console, screen-reader or GPU audit claimed for this small addition. Existing motion safeguards passed the controller checks.

## Service pages and client transparency, 20 October 2026
- Added `/market-making`, `/dex-liquidity-management` and `/work`, shared marketing/service layouts, navigation and footer. The homepage now follows its service explanations with mandate parameters, non-custodial access, existing dashboard capabilities and the four-step engagement sequence. Supplementary services, asset studies and research follow. Removed the ambiguous future-platform promotion and retained its source in the inventory.
- Owner-confirmed access and dashboard facts are recorded separately from draft service explanations and unresolved configurations. No dashboard mockup, client evidence, numerical service commitment or new data connection was added. Existing market animations and all four asset models are unchanged.
- `npm run check`: 37 files, zero errors/warnings/hints. `npm run build`: four static pages; development routes excluded. Extended build checks passed for local links, cross-page anchors, assets, one h1 per page and noindex. `node scripts/check-liquidity-animation.mjs` passed geometry, quote cadence, pause, visibility, reduced-motion events and teardown checks. No dependency changes; the existing lazy Three.js chunk-size advisory remains.
- Safari review harness: all four pages at 375, 768 and 1440px reported no horizontal overflow, zero broken section targets, zero broken images and loaded fonts. Reviewed the new content, service diagrams, access sections, FAQ/contact sections, responsibility table and lower engagement sections. Also followed the cross-page links from Home to CEX, CEX to DEX, DEX to How We Work, and How We Work back to homepage asset studies; inspected the retained asset and research sections at native desktop width.
- Exercised pause/resume on each new service page and observed label/pressed-state changes. Opened FAQs with pointer and keyboard; Tab exposed a visible focus outline and Space opened the next CEX FAQ. Email destinations and service subjects were inspected without launching or sending email. Existing reduced-motion behaviour passed the controller checks; OS-level preference switching, a screen-reader session, full console audit and hardware performance profiling were not performed in this pass.
- Fixed two review findings: widened the mobile responsibility table's first column so “Objectives” is not split, and supplied a light focus outline for links on the dark reporting surface. Rechecked the table after the fix. New text colour pairings measure at least 5.33:1; reporting text is 8.36:1, lime reporting headings 8.86:1.
- Evidence in `docs/screenshots`: `transparency-home-{375,768,1440}.png`, `cex-page-{375,768,1440}.png`, `dex-page-{375,768,1440}.png`, `work-page-{375,768,1440}.png` and `cex-faq-keyboard-375.png`. These are native browser captures of selected review sections, not full-page exports. The 1440px iframe is wider than Safari's native window and is cropped in captures; overflow measurements cover the full iframe. The mobile work capture includes the corrected table.
- Subtraction pass kept reporting as typography and capability descriptions, retained native disclosure controls for FAQs, and avoided additional decorative motion or a component library. Next content milestones remain real dashboard captures, company biographies, a dedicated asset-studies page, expanded research and a contact page when source material is available. All changes remain local.

## Stable volume history and book/depth tabs, 20 October 2026
- Fixed historical volume bars being resampled as their visible array index changed. Bars now derive their position and height from an absolute sample ID; partially clipped bars scroll out intact.
- Added Order book / Depth tabs to the shared CEX chart, used on Home and `/market-making`. Depth accumulates the same displayed sizes and prices, with a fixed shared scale. View changes preserve the timeline and pause state. Static order book remains available without JavaScript; reduced-motion users can still switch views.
- Regression checks passed for historical-bar translation and unchanged heights across fractional and whole quote ticks, cumulative depth matching order sizes, pointer/keyboard tab state, pause preservation and reduced-motion switching. Existing geometry, cadence, visibility and lifecycle checks passed. `npm run check`: 37 files, no issues. Static build and internal link/isolation checks passed; pre-existing Three.js chunk advisory remains.
- Safari: switched views with pointer and Left/Right keys, observed the selected state, updated accessible description and visible keyboard outline. Reviewed mobile and tablet depth alongside service content. Home and CEX responsive harnesses at 375/768/1440px reported no overflow, broken section targets or broken images, with fonts loaded. The desktop review iframe exceeds the available native browser width, so its right side is cropped in the capture; full depth geometry was visually reviewed at 375 and 768px.
- Captures: `book-depth-375.png` (keyboard focus), `book-depth-768.png`, `book-depth-1440.png`. No new packages or external assets. No fresh OS-level reduced-motion, full console or GPU audit claimed; reduced-motion interaction is covered by the controller tests.

## Conversion clarity and evidence placements, 20 October 2026
- Added client problems/objectives, service fit and intended benefits, CEX/DEX measurement definitions, commercial and control questions, local Company page and an email briefing template. Retained all chart/model code. Replaced the repeated homepage mandate document with needs and measurement; detailed service mandates remain. No new runtime JavaScript or dependencies.
- Missing business evidence is explicit in development-only native disclosures, with a consolidated checklist in docs/commercial-evidence.md. No biographies, client results, numerical targets, pricing or supported-venue claims were invented. Static checks assert that editorial review text never reaches production HTML.
- Type/content checks: 43 files, zero issues. Build produces five pages and passes route isolation, local links/assets, cross-page anchors, heading and noindex checks. Existing liquidity animation checks passed, including stable volume and tabs. The existing lazy Three.js size advisory remains.
- Safari harness measured all five pages at 375, 768 and 1440px: no horizontal overflow, zero broken section targets/images, fonts loaded. Visually reviewed representative new shared layouts: mobile homepage benefit rows; CEX measurement at mobile/tablet; DEX measurement at desktop; mobile/tablet commercial and control sections; Company evidence placements at mobile/desktop; shared mobile enquiry/footer. Reviewed lower sections through section controls.
- Keyboard Tab/Space opened the second Company evidence disclosure, with visible focus. Inspected the encoded mailto recipient, subject and briefing body without sending email. Shortened the measurement introduction after the first mobile review; rechecked the revised text at tablet and desktop. No layout defects were found in the reviewed new components.
- Screenshots: conversion-home-375.png, conversion-work-375.png, conversion-work-768.png, conversion-cex-768.png, conversion-dex-1440.png, conversion-company-375.png and conversion-company-1440.png. Captures show selected review sections in the native browser, not full-page exports.
- Scope limits: this is a local editorial implementation, not evidence that all commercial information gaps are resolved. Owner facts and approvals remain necessary for the marked placements. No fresh screen-reader, full console or GPU audit; unchanged motion behaviour is covered by the existing controller checks.

## DEX profile and tracking, 20 October 2026
- Reduced range-response delay from approximately 938ms to 188ms in the illustrative animation. Replaced bell profiles with constant managed liquidity L within its bounds and stepped total pool liquidity, including the managed contribution. Updated the axis and accessible description.
- `npm run check`: 43 files, zero issues. Static build and route/link/asset/isolation checks passed for all five pages. Animation checks passed for tighter price tracking, loop continuity, constant range liquidity, additive pool totals and plot bounds, alongside existing CEX volume/depth and pause/visibility/reduced-motion lifecycle checks. Existing Three.js bundle advisory remains; no dependencies added.
- Safari review: Home and DEX service passed the responsive harness at 375, 768 and 1440px with no horizontal overflow, broken section links or broken images; fonts loaded. Visually reviewed DEX chart geometry and adjacent service content at all three widths. Observed changed positions across captures and exercised Pause/Resume, confirming labels and pressed state.
- Captures: `dex-tracking-375.png`, `dex-tracking-768.png`, `dex-tracking-1440.png`. These are native selected-section captures; tablet/desktop captures crop the section's upper edge. The complete chart was visible on mobile. No new OS-level motion-preference, screen-reader, console or hardware performance audit; motion safeguards are covered by controller tests. No typography, navigation, CEX chart or 3D asset changes.

## DEX centre valley follow-up, 20 October 2026
- Replaced the flat managed band with a balanced central valley, fuller shoulders and tapered outer edges. Broader background pool liquidity also has a central dip; total pool liquidity continues to include the managed allocation. Preserved the shorter response delay, frame cap and controls.
- Type/content checks passed for 43 files with zero issues. Build and static isolation/link checks passed for five routes. Geometry tests now verify the centre/shoulder relationship, outer taper, symmetry, additive totals and bounds; all existing tracking, loop, CEX and motion-controller tests pass. Existing Three.js size advisory unchanged.
- Safari DEX review at 375, 768 and 1440px: no overflow, broken section links or images; fonts loaded. Visually checked the profile and adjacent lower service sections. Captures: dex-shoulders-375.png, dex-shoulders-768.png, dex-shoulders-1440.png. Tablet/desktop captures crop the upper section edge; mobile shows the full chart. No new full-site, console or OS-level reduced-motion audit claimed for this geometry-only change.

## Services dropdown and expanded offering, 20 October 2026
- Added a shared Services disclosure with summaries and links for CEX, DEX, OTC, systematic strategies, treasury execution, market design, pool design/hooks and distribution. Grouped by liquidity management, execution/strategy and market support. Added homepage OTC/strategy explanations and stable anchors for every supporting service. Owner-confirmed categories and unresolved details are recorded in the brief/inventory.
- Fixed a review finding: pointer entry followed by a click could immediately close the hover-opened panel. The first mouse click now preserves it. Supplemental links open their target explanation, both on the same page and after navigating from another page.
- Final type/content check: 44 files, zero issues. Static build, five-page links/assets/anchors/noindex and development isolation passed. Navigation controller checks cover hover entry, departure delay, crossing the gap, first-click preservation, outside dismissal, ArrowDown focus, Escape restoration, focus exit and touch fallback. Existing liquidity animation tests pass. Existing Three.js size advisory remains.
- Safari: reviewed the expanded menu at 375, 768 and 1440px; homepage harness passes all three with no overflow, broken section links/images, fonts loaded. Before adding OTC/strategies, also checked all four remaining routes at all three widths using the shared header. Observed first-click opening, visible focus, Escape dismissal and Space reopening. Followed Market design on the same page, Treasury execution from Company, and Systematic strategies to its expanded homepage copy; verified its email enquiry recipient/subject without sending email.
- Final screenshots: services-menu-375.png, services-menu-768.png, services-menu-1440.png. Mobile capture shows the upper part of the longer menu. Browser review used width-constrained iframes, not physical touch devices or short-height viewport emulation. Native pointer-move automation was unavailable; hover lifecycle is covered by event-controller checks, while click and keyboard actions were exercised in Safari. No new screen-reader or full console audit claimed. Menu introduces no animated transition, packages or remote assets.

## Animated client-need diagrams, 20 October 2026
- Added four inline SVG diagrams beside the client-need headings, with one native pause/resume button, static accessible descriptions and an illustrative-data caption. CSS handles frame animation; a small controller gates it by visibility, document state, user pause and reduced motion. No new packages or external assets.
- Type/content checks passed for 46 files, zero issues. Build and five-page static link/anchor/isolation checks passed. New controller checks passed for all four diagrams, persistent pause, offscreen suspension, hidden documents, preference changes and page lifecycle. Existing service-navigation and liquidity animation checks also pass. Pre-existing Three.js advisory unchanged.
- Safari homepage harness passed at 375, 768 and 1440px with no overflow or broken section links/images and loaded fonts. Reviewed all four diagrams and row alignment, including the lower reporting row and control on mobile. Observed different book/allocation/report states across captures. Pointer Pause/Resume updated the visible label and pressed state. A Space attempt after an accessibility click did not focus the button, so no fresh keyboard activation pass is claimed. The control remains a native button with existing focus styles.
- Screenshots: needs-diagrams-1440.png, needs-diagrams-768.png, needs-diagrams-375.png, needs-diagrams-lower-375.png. Reduced motion and hidden/offscreen behaviour were tested at controller level; no new OS preference, screen-reader, full console or hardware performance audit.
- Final contrast pass: strengthened meaningful diagram outlines to #72866e (3.65:1 against #f6f7f2) and outlined sage shapes. Dark fills measure 7.07:1. Rebuilt and refreshed the three width captures after this change; lower mobile capture records the preceding layout pass.

## Asset variants and commodities — 20 October 2026
- Added twelve selectable specimens across five categories: four metals, four gems, fund, stock, oil and wheat. Existing gold/emerald defaults remain unchanged. Native previous/next buttons wrap within each category and remember selections. Single-specimen categories hide these controls.
- `npm run check`: 50 files, zero errors/warnings/hints. `npm run build`: five static pages, all static-link/noindex/isolation checks pass, including exclusion of `/asset-review`. The pre-existing deferred Three.js chunk-size warning remains; no dependency or network model/texture downloads were added.
- `node scripts/check-asset-explorer.mjs`: passes lazy initialization, both-direction wraparound, category memory, naming, scene synchronization, hidden controls for single specimens, mobile/reduced-motion fallback, document visibility and teardown. Existing liquidity, navigation and need-illustration checks also pass.
- Browser material review: all twelve models rendered successfully with the production renderer at `/asset-review`. Reviewed new ruby, sapphire, diamond, silver, oil and wheat surfaces. Explicit still renders avoid reliance on browser animation scheduling. Switching through all categories showed resident geometry/texture counts falling as old models were evicted. The cache is capped at three specimens; only the selected group renders.
- Found and fixed clipped oil/wheat tops by scaling their internal groups for the established camera; turned the oil label toward the initial camera. Fixed a CSS specificity collision that initially displayed both the old gemstone fallback and the new diamond. Removed the explanation-panel fade-in, which left text invisible when browser animation scheduling was suspended. Removed forced tablet caption wrapping.
- Browser `/review`: 375, 768 and 1440px report no horizontal overflow, zero broken section links/images and loaded fonts. Inspected side controls, specimen captions, category wrapping and explanatory text; tablet/desktop include the lower relationship row. Native selection and repeated arrow activation changed names/counts and visible fallback geometry correctly. Visible focus observed on category inputs and material-review buttons.
- Browser limitation: this automation session suspended continuous page animation, so homepage screenshots show fallback SVGs even at larger widths. Production 3D models were reviewed via explicit WebGL still renders; continuous rotation and physical drag were not re-observed in this pass. Their existing event/render code is retained, while controller lifecycle behavior is covered by the new test. Reduced motion was exercised in the controller harness, not by changing the user's OS preferences. No new FPS claim is made.
- Screenshots: `assets-selector-375.png`, `assets-selector-768.png`, `assets-selector-1440.png`; `assets-mobile-375.png` (wheat); `assets-tablet-768.png` (oil); `assets-{gold,silver,palladium,platinum,emerald,ruby,sapphire,diamond,fund-share,share-certificate,oil,wheat}.png` (WebGL material review).
- Local only. No deployment, hosting or domain changes.

### Wheat cast-shadow correction — 20 October 2026
Owner clarified “shade” meant the cast shadow, not the colour. Only kernels were casting shadows, leaving a detached head silhouette. Enabled casting for the stalk meshes and binding, lowered the sheaf to place the cut ends immediately above the receiving floor, and reduced wheat-specific normal bias for the thin stalks. Tightened/lightened its contact shadow; other models restore their original settings on selection. No material colours, page layouts or fallback SVGs changed.

Type check and static build pass. Observed a complete connected sheaf silhouette in the production WebGL material reviewer; screenshot `assets-wheat-shadow-fixed.png`. Rendered triangle count including shadow passes rose from 55,206 to 58,566 with no new geometry or textures. Existing responsive layouts are unchanged; no additional layout test or continuous-animation claim is made for this focused correction.

## Metals, grains and real estate — 20 October 2026
- Nineteen specimens across seven categories. Added copper, aluminium, corn, soybeans and three architectural models. Wheat geometry/materials/shadow settings remain unchanged from the preceding correction. No new packages or network asset requests.
- `npm run check`: 54 files, zero errors/warnings/hints. `npm run build`: five static pages; link/asset/anchor/noindex and development-route isolation checks pass. Existing deferred Three.js chunk-size advisory remains. `git diff --check` clean.
- Extended `node scripts/check-asset-explorer.mjs`: every category traversed forward and backward, wraps correctly and updates its caption. Category memory, lazy initialization, scene selection, single-specimen control hiding, reduced-motion/mobile fallbacks, visibility and disposal pass.
- Safari production material reviewer: all seven new specimens rendered, with complete framing and no visible geometry failure. Rendered triangles including shadow passes: corn 71,798; soy 16,518; residential 5,358; office 3,102; industrial 3,406; copper 3,126; aluminium 3,750. Resident geometry counts dropped from 18 to 7 when switching onward, consistent with eviction. Counts are not an FPS benchmark.
- Safari homepage harness passes at 375, 768 and 1440px: no horizontal overflow, broken section links or broken images; fonts loaded. Observed mobile grain switching, real-estate selection, office next/previous labels, complete lower explanatory sections/relationship rows and expanded property FAQ. Desktop/tablet displayed actual 3D models. Office orientation changed between captures, object click paused rotation with the correct pressed state, and Tab showed a visible focus outline on the property FAQ. Drag was not re-exercised. Reduced-motion lifecycle remains controller-tested, without an OS preference change.
- Original mobile SVGs added for all new models; removed the old hidden commodity/wheat coupling. No browser defects remained in the reviewed views. Full console, screen-reader and device performance audits were not repeated.
- Screenshots: `assets-{corn,soybeans,copper,aluminium,residential,office,industrial}.png`; `assets-grains-375.png`, `assets-property-lower-375.png`, `assets-property-768.png`, `assets-property-1440.png`, `assets-property-focus-1440.png`.
- Local-only checkpoint; no deployment, domain or hosting changes.

## GitHub and remote preview — 20 October 2026
Owner authorized pushing to nve-quant/website (public) and preparing a separate Vercel preview. Added a GitHub Actions clean-install/check/controller/build workflow, explicit static Vercel settings, noindex response header and cloud handoff guide. All local checks passed; the first GitHub Actions run completed successfully from npm ci. Vercel clean installation/type checking/build succeeded using the current official CLI; the installed older CLI was incompatible with its upload endpoint. Git integration connected to the new project. Hosted homepage returned HTTP 200 through authenticated Vercel CLI access, with expected title, new asset categories and noindex metadata/header. Existing live domain and dashboard project were not modified. Cloud environment creation remains an account-side next step; no claim that this local conversation was migrated.

## Asset taxonomy and detail pass — 21 October 2026
- Eight categories and twenty-five specimens. Six additions: nickel, natural gas, coffee, cotton, Treasury bill and corporate bond. Specimen-specific explanatory notes and original SVG companions included. Category visibility CSS is generated from typed data; the selector uses four desktop columns and two mobile columns.
- `npm run check`: 59 files, zero errors/warnings/hints. `npm run build`: five pages with static link, asset, anchor, h1, noindex and development-route isolation checks passing. The existing deferred Three.js chunk advisory remains. No new packages or downloaded model/texture files.
- Extended asset-controller checks pass all category forward/backward cycles, remembered selections, captions and note visibility, lazy initialization, reduced-motion/mobile behavior and lifecycle. New `check-asset-models.mjs` executes all real factories with stubbed canvas calls, asserting finite geometry/instance transforms, floor/framing bounds and per-model budgets (<200k triangles, <90 mesh calls, <32 MiB estimated RGBA+mipmap textures). This is not WebGL or texture-appearance validation.
- Geometry counts before shadow passes: wheat 120,000; corn 103,432; soy 14,976; residential 33,048; office 38,772; warehouse 19,244; oil 59,040. Mesh calls respectively 23, 8, 27, 7, 5, 7, 38. Oil's 2K colour map plus relief uses an estimated 22.67 MiB with RGBA mipmaps; other changed models are lower. Three-model eviction, one active model, 30 fps rotation and offscreen pause remain. Canvas capped at DPR 2 / 2.4 MP; shadow map 2048². No measured FPS claim.
- Code review fixed a potentially mirrored barrel UV mapping and brought soy pods/seeds and the corn stalk to the receiving floor. Financial paper studies retain specimen labels and no real issuer/official seal.
- **Browser QA pending:** native browser access failed with `Sky Computer Use native pipe startup failed`. Resetting the session and requesting available surfaces returned no apps or browsers with the same error. Could not capture fresh screenshots, verify 375/768/1440px rendering, inspect textures/shadows visually, or re-exercise drag/keyboard/focus in this session. Prior screenshots are not evidence for this update. `/review` and `/asset-review` remain ready for the next browser-capable task.
- Publish as a review branch/preview pending visual review; do not merge automatically. Live domain unchanged.

### Asset fallback regression — 22 October 2026
Observed local HTTP failures: the scene module loaded, but Three.js and RoundedBoxGeometry optimized dependency URLs returned HTTP 504 `Outdated Optimize Dep`. The controller silently caught the resulting import failure and showed SVG illustrations. Original gold and gemstone model files are identical to main. Restarted the server with a fresh disposable Vite cache; recursive requests for all 15 scene modules then succeeded. Added explicit pre-optimization of the two dependencies and separate caches per Astro command to prevent build/check work sharing the running development cache.

Removed the 701px rendering gate. Small screens now load the same procedural models lazily, within the existing pixel/cache/frame budgets. Reduced motion retains the detailed model with automatic rotation and entrance easing disabled, rather than replacing it with SVG artwork. Actual WebGL failures log the error and label the simplified illustration. Controller regression check now initializes at mobile width and verifies 3D retention under reduced motion. Browser UI connection failed (`Sky Computer Use native pipe startup failed`); visual appearance, mobile GPU performance and screenshots remain unverified. HTTP/module checks are not a rendered browser test. The observed cache failure is local; a corresponding hosted failure has not been established.

### Market specificity and realism pass — 22 October 2026
Checks: all 25 factories stay within the existing bounds and budgets. Added an assertion that textured mesh materials have UV coordinates, catching the missing corn-husk and soybean-shell mapping addressed here. Corn uses 151,816 triangles; buildings use 6–8 mesh draws and at most 4.33MiB estimated textures. Oil remains 22.67MiB; no global resolution or lighting increase. Controller tests pass after naming changes, including short bullion stamps independent of longer captions. Gold/gem files remain unchanged.

Browser connection retried after resetting CUA: no apps/browsers available, `Sky Computer Use native pipe startup failed`. Cannot capture or certify 375/768/1440px screenshots, appearance, clipping, real WebGL materials or device frame rates. Local asset review and responsive harness remain available for the visual pass. This limitation is not replaced by source inspection or mocked canvas tests.

### Multi-agent energy/agriculture/property review — 21 October 2026
Three explicitly authorised agents handled crops, energy/soft commodities and property. Integration review additionally corrected drum/sack/loose-bean grounding and cotton fibre roots, which now use the same surface deformation and transforms as their lobes. Property agent ray-tested all 50 residential window openings. Protected gold, gem, metal, equity and fund source files were compared byte-for-byte against the starting commit; createNickel and the shared scene renderer also remain unchanged.

Final checks pass: Astro check (59 files, zero errors/warnings), five-route static build and internal-link/isolation checks, asset controller checks, all25 model geometry/UV/resource checks, git diff whitespace check. Recursive local HTTP verification fetched all15 scene modules without errors. Resource examples: wheat126,240 triangles/25mesh draws; corn153,664/9; soy20,376/36; coffee129,720/3; cotton23,640/33; property max44,568 triangles/12draws/4.33MiB estimated textures; oil59,424/24/22.67MiB; gas9,760/31/2MiB. These remain under the existing caps; they are not measured browser FPS.

Visible redundant caption and instructions removed; accessible description, keyboard operations and rotation state remain. Failure text appears only when the renderer fails. Oil texture no longer includes ILLUSTRATIVE SPECIMEN. Section-level context remains.

Visual verification blocked: CUA native pipe startup failed, and explicit in-app-browser creation returned Browser is not available: iab. No 375/768/1440 screenshots or WebGL appearance/performance claims. All ten affected assets remain available in /asset-review locally for inspection; that route stays excluded from production. Photorealism still needs actual rendered visual judgement.

### Corn, soybean, coffee and warehouse correction
Owner reported lower corn husks intersecting the ear, unrealistic soy/coffee, and overlapping warehouse dock plates. Corn husk paths now clear the kernel envelope; matching centre veins no longer follow the obsolete inward path. Tapered cob replaces a capsule core that protruded through narrowing upper rows. Added clearance assertion for husk vertices above the first kernel row. Warehouse removes redundant full-width black backing and outer jamb plates, uses one U gasket with recessed shutter, lower independent bumpers and slim canopy supports; duplicate leveler plate removed.

Soy rebuilt as a low split pod with separate concave thick valves, three exposed seeds and four grounded loose seeds. Coffee rebuilt as an asymmetric flattened fabric sack with folded cuff, supported irregular kernels and a level bulk substrate. Independent geometry review and the committed model regression verify118 transformed coffee-kernel bounds have no pairwise intersections and19 spilled kernels contact the floor. Conservative bounding-box support approximates packing; it is not a rigid-body simulation or proof of photographic appearance.

All25 model checks remain within established budgets; mapped geometry has UVs. Protected models, other energy/agriculture specimens and residential/office definitions remain unchanged. Astro check/build/controller checks pass. Browser access remains blocked by native pipe startup failure; visual appearance and responsive screenshots cannot be certified in this session. Owner feedback, not prior unobserved visual checks, identified these defects.

### Attachment/support regression follow-up
Previous clearance and non-overlap checks did not establish attachment or actual surface contact. Owner correctly identified those gaps. Added explicit corn-root assertions inside stalk radius alongside existing upper-husk clearance. Coffee verification now raycasts actual transformed kernel vertices against the actual support mesh and requires contact within .001 model units, rather than accepting bounding-box support. All in-bag kernels pass, as do spilled-kernel floor checks and non-overlap. All16 loose soybeans independently contact floor y=-.035 by transformed vertex minimum. This replaces the rejected pod composition; soybean detail text now says dry oilseed.

All25 geometry/UV/budget checks pass. Browser access was retried: native pipe startup failed with no available apps/browsers. No screenshots or rendered visual sign-off are claimed. The new checks specifically address attachment/support; they are not proof of photorealistic appearance.

### Client-need DEX stacking fix
Owner reported the bars in “A DEX position that needs attention” were not stacked. They were two baseline-sharing silhouettes. Fixed bin lower bars now anchor managed upper bars. Regression samples101 interpolation frames for nonnegative contributions, chart bounds, segment contact and constant managed total. Existing illustration pause/visibility/reduced-motion checks pass. Astro type check and static build pass. Browser-rendered animation remains unverified because browser access is unavailable in this session.

## Commercial graphics and copy interview
- Added permissions pathways, native CEX/DEX measurement selector, reporting capability map, client/operator handoff and OTC/strategy disclosure diagrams. Coverage component is data-gated pending confirmed public names.
- `npm run check`: 68 files, zero diagnostics. `npm run build`: five routes; local links/assets/anchors, h1, noindex and development-route isolation pass. Existing large Three.js chunk warning remains; no dependency added.
- Existing liquidity animation, need illustration and service navigation checks pass. No new animation loop introduced.
- Reporting component was corrected during integration from dark text to #f6f7f2 / #d6dfd3 against #243f35 (calculated contrast 10.62:1 / 8.36:1).
- CUA returned no apps/browsers and a native pipe startup error. Desktop/mobile screenshots and observed browser keyboard/overflow checks remain outstanding; responsive CSS is implemented but not visually verified.
- Owner interview questions sent in three groups. Venue logos, actual DEX deployments, dashboard media and experience/results await evidence; no placeholders for those ship publicly.

## Owner interview integration and CEX coverage
- Added 27 owner-supplied venue SVGs (~89 KB total), named accessible rail entries and previous/next controls. Touch/keyboard scrolling remains native; smooth scrolling disabled under reduced motion. DEX deployment details remain pending.
- Updated company history, approved MNEE/BSV examples, reporting, spot/perpetual operation, monitoring, DEX permissions and commercial copy. Systematic strategies marked pilot/coming soon.
- Type checks: 70 files, no diagnostics. Static build and local asset/link/anchor/noindex isolation pass. Existing service-navigation, liquidity-animation and need-illustration checks pass. Existing Three.js bundle-size warning remains.
- Original SVGs scanned for script/foreignObject/event handlers/external references before copying. Blockfinex embeds a raster PNG; retained as owner-provided art.
- Browser screenshot/keyboard/overflow verification remains unavailable in this environment; do not treat implemented breakpoints as observed browser passes.

### Confirmed DEX coverage
Enabled eight-protocol EVM/Solana coverage matrix and updated both service FAQs. Type checks (70 files, no diagnostics), static build and link/asset/isolation checks pass. No new dependencies or animation changes. Browser layout verification remains outstanding. Numeric latency wording remains held for the precise percentile/threshold/timestamp definition.

### Founders, entity and enquiry conversion
Updated named engagement examples, short founder profiles with LinkedIn links, verified UK entity/number, client-only CEX transfers, per-asset/per-exchange starting capital, latency FAQ and free assessment/proposal CTA. Checks and static build pass with 70 files and five routes; existing bundle-size warning remains. New external links sourced from public LinkedIn results and Companies House. Browser visual validation remains outstanding.

### CEX carousel automatic motion and direct drag
71-file type check and static build pass. New check-venue-carousel.mjs validates 18px/s pacing, subpixel accumulation, modulo wrapping, hidden duplicate semantics, pointer drag, keyboard browsing, pause persistence, focus, reduced motion, visibility and page lifecycle with DOM mocks. These are logic tests, not observed browser rendering. Visual review/screenshots still outstanding. No arrows or visible scrollbar; subtle pause control retained.

### Venue hover and DEX logo display
Fixed ineffective image:hover target (images are pointer-events:none), replacing with entry:hover. Removed inert from decorative clone entries so their hover works; aria-hidden retains single accessible list. Replaced DEX table with two responsive ecosystem groups and eight local marks. PNGs visually inspected; SVGs scanned for active/external content. Aerodrome uses a 3.2KB vector rather than supplied 482KB artwork.
Type check: 73 files, zero diagnostics. Static build and all local link/asset/isolation checks pass; carousel lifecycle/drag/motion checks pass. Browser layout/hover verification still outstanding.

### Permissions and measurement visual rebuild
Replaced static access glyphs with CEX/DEX instruction/permission/account diagrams; replaced six small metric thumbnails with six selectable large animated scenes. Mobile uses vertical access flow and top metric selection. Corrected new CEX permissions text to retain disabled transfers; clarified DEX miniature with individual ranges rather than overlapping pool/managed silhouettes. Clipped impact projections to the chart and increased mobile SVG label sizes.

`npm run check` passes (77 files, zero diagnostics); static build links/assets/anchors/noindex/isolation pass. New explainer-motion checks verify persistent pause, viewport/hidden suspension, reduced-motion changes, page lifecycle, six-view integration and unique SVG IDs. Existing liquidity animation checks retained. New diagrams use CSS animation with lifecycle-gating JS only; no dependencies or RAF loop added. Existing Three.js bundle warning unchanged.

CUA again returned no enabled apps/browsers and native pipe startup failure. No browser screenshots or observed layout/keyboard checks were possible. 375/768/1440 visual verification remains outstanding, and this pass does not claim browser approval.

### Named Solana pools and trading venues
- Shared coverage directory now appears on Home and DEX service, with ten Solana venues and specific pool/market families. Trading coverage follows explicit owner confirmation; routing aggregators and infrastructure interfaces are excluded. EVM protocol scope unchanged.
- `npm run check`: 77 files, no errors, warnings or hints. `npm run build`: five static pages; local links/assets, anchors, heading/noindex and development-route isolation checks pass. Existing Three.js chunk-size advisory remains; no additional JavaScript or dependency introduced.
- Existing venue-carousel and service-navigation checks pass. Browser testing used isolated headless Google Chrome through the already installed Playwright package, with no project dependency change.
- Observed Home and DEX service at 375, 768 and 1440 CSS pixels: document width equals viewport width in all six cases, all venue images decode, no browser errors on final build, fonts loaded, all ten Solana names visible. Reviewed complete coverage captures including lower proprietary-AMM entries and the scope note. Narrow phones use one column for the detailed Solana entries; tablet uses two; desktop uses three.
- Observed Moonit logo changing from grayscale(1) to grayscale(0) on hover; reduced-motion checks return a 0s transition. Keyboard focus on the service link is a visible 3px outline. Enter follows the DEX detail link and opens the new launch/trading FAQ. No new motion or interactive controls.
- First pass found the existing `/favicon.ico` 404. Added a local SVG favicon and verified no resource or console errors on the final static preview. A running Astro dev server retained older component markup; restarted it with `npm run dev -- --force` and served the fresh build separately on localhost:4322 for final verification. The dev server remains on localhost:4321.
- Screenshots: `solana-coverage-{home,dex}-{375,768,1440}.png` show the complete directory, with matching `solana-context-*` viewport captures. The mobile capture uses a taller viewport to fit the whole directory; width remains exactly 375px. An initial oversized element capture showed a fixed skip-link capture artifact; final captures fit inside their viewport and normal viewport review confirmed the skip link remains offscreen until focused.
- Subtraction pass: removed the generic all-pool-types label and the initial promotional tagline; rejected generic unknown-project logo placeholders. Five new local identification images total 121,665 bytes, loaded lazily. No fabricated operating metrics, pool addresses, current balances or partner claims.

## DEX market categories and EVM deployment scope — 21 October 2026

Changes reviewed on / and /dex-liquidity-management. Raydium LaunchLab, Meteora DBC, Pump.fun and Moonit now sit under Launchpads & bonding curves; Raydium/Meteora LP products, Orca and PumpSwap remain under Liquidity pools. Phoenix spot and proprietary AMMs have their own execution group. Robinhood Uniswap v4 and the initial proposed Pools.trade launchpad entry are visibly Coming soon, outside current coverage.

Validation:
- npm run check: 78 files, no errors, warnings or hints.
- npm run build: all five static pages; internal links, local assets, anchors, one h1 and noindex checks passed; development-only routes excluded. Existing Three.js chunk-size warning persists, unrelated to this static directory change.
- Venue-carousel and services-navigation harnesses passed.
- Headless Chrome review of both pages at 375×812, 768×1000 and 1440×1000. Scrolled through every coverage entry and the lower footnote. No horizontal overflow, broken/undecodable images, page errors, console errors or HTTP failures.
- Confirmed 16 current entries and two upcoming entries on each page. All four Solana LP products, four launch products and four other trading venues are in the correct groups. Robinhood is absent from the current six-chain heading and present in the coming-soon inset only.
- Full-section screenshots captured with extended viewport height after checking the normal viewport; restored normal height for lower-section checks. All six screenshots inspected visually.
- Normal-motion Moonit hover changed grayscale(1) to grayscale(0). Reduced-motion logo transition is 0s.
- Keyboard-focused DEX detail link has a visible 3px outline; Enter navigates correctly. The new Robinhood FAQ opens with Enter.
- Calculated text contrast: muted on ground 5.88:1, primary on ground 10.62:1, coming-soon badge 8.86:1.
- Official Pools.trade SVG parses, contains no script/foreignObject/event attributes or external resource references, and adds 2.6 KB with no runtime request or JavaScript.

Observed problems addressed: the former brand-level rows mixed LP products and launch curves; those now have separate named sections. Generic EVM labels omitted chain/version scope; Uniswap, Aerodrome and Velodrome now show their specific mappings. PancakeSwap remains owner-confirmed with unspecified chain/version details because this repository does not corroborate them. Mobile uses single-column venue rows to keep product names readable.

Screenshots:
- [Homepage, 375px](screenshots/dex-market-types-home-375.png)
- [Homepage, 768px](screenshots/dex-market-types-home-768.png)
- [Homepage, 1440px](screenshots/dex-market-types-home-1440.png)
- [DEX service, 375px](screenshots/dex-market-types-dex-375.png)
- [DEX service, 768px](screenshots/dex-market-types-dex-768.png)
- [DEX service, 1440px](screenshots/dex-market-types-dex-1440.png)

Scope limit: the source audit establishes connector and deployment configuration, not successful production execution on every chain. No trading bot was run. Pools.trade is an initial proposed launchpad name pending optional owner clarification; it is not claimed as an implemented integration.

## Robinhood availability correction — 21 October 2026

Supersedes the prior screenshot/state that marked Uniswap on Robinhood as coming soon. Owner confirms it is already covered.

- Type/content checks: 78 files, no errors/warnings/hints. Static build and all five-route isolation/link/asset/heading/noindex checks pass.
- Browser: homepage and DEX page at 375×812, 768×1000 and 1440×1000; every coverage row and the lower footnote visited. No overflow, broken images, console/page errors or HTTP errors.
- Current Uniswap entry explicitly maps v3/v4 to the original six chains and v4 to Robinhood Chain. Exactly one current Uniswap entry; no Uniswap item among upcoming entries. EVM chain heading now includes Robinhood.
- Upcoming entries are GIGA DEX, Pools.trade and Pons only. Pool/launch labels remain distinct. Copy explicitly says Uniswap v4 is already supported.
- Normal-motion colour hover works; reduced-motion duration remains 0s. DEX link has visible 3px keyboard focus and navigates with Enter; corrected Robinhood FAQ opens with Enter.
- Inspected all six full-section screenshots. Three columns at desktop, two at tablet, one on narrow phones. The longer upcoming heading and badge wrap naturally on mobile. Source logos for GIGA/Pons inspected at native resolution.
- No dependencies or client scripts added. Two official raster icons total 45,110 bytes; no invented SVG replacements. Existing Three.js build size warning remains unrelated.

Screenshots:
[Home 375](screenshots/robinhood-coverage-home-375.png), [Home 768](screenshots/robinhood-coverage-home-768.png), [Home 1440](screenshots/robinhood-coverage-home-1440.png),
[DEX 375](screenshots/robinhood-coverage-dex-375.png), [DEX 768](screenshots/robinhood-coverage-dex-768.png), [DEX 1440](screenshots/robinhood-coverage-dex-1440.png).

Logo-search limitation: additional local Solana/launchpad SVGs were not located in the searched folders. macOS blocked Trash enumeration even on an unsandboxed read-only retry. Existing images remain intact pending the owner's folder clarification.

## Owner SVGs, reconstructed vectors and Moonit removal — 21 October 2026

- Replaced PancakeSwap, Pump.fun/PumpSwap and Orca raster marks with the owner's supplied SVGs, unchanged. Replaced SolFi/Tessera V with requested vector reconstructions. Removed Moonit from the shared directory, FAQ and public assets.
- Validated all five SVG files: no embedded image, script, foreignObject, event handler or external resource. SolFi lettering is outlined; no font dependency.
- Compared both reconstructed assets against their original rasters in Chrome at 256px and the site's actual 40px size, including grayscale. SolFi retains its ring/lettering; Tessera approximates photographic surface detail. Rejected the first coarse colour trace because it flattened lighting. Source rasters archived under docs/reference-assets/venues/.
- npm run check: 78 files, no errors/warnings/hints. Build passes all five static pages and link/asset/anchor/h1/noindex/development-route checks. Existing Three.js size warning unchanged.
- Homepage and DEX route reviewed in Chrome at 375×812, 768×1000 and 1440×1000; all coverage entries and footnotes traversed. No horizontal overflow, missing/undecodable logos, console/page errors or HTTP failures.
- Browser assertions confirm no Moonit text on either page, 15 current venue entries, all six affected venue entries loading SVGs, and unchanged Robinhood v4/current versus three-upcoming status.
- Hovering Pump.fun changes grayscale(1) to grayscale(0); reduced-motion transition remains 0s. Service link retains visible 3px keyboard outline, Enter navigation works, and FAQ opens by keyboard.
- Screenshots captured for all six page/width combinations. Desktop home, tablet DEX and mobile home screenshots visually inspected along with the detailed source/vector comparison.
- No site JavaScript or dependencies added. Reconstructed files measure approximately 1.6 KB (SolFi) and 43 KB (Tessera) when gzipped. Static vector rendering only; existing image lazy loading retained.

[Source/vector comparison](screenshots/venue-vector-comparison.png).
[Home 375](screenshots/venue-vectors-home-375.png), [Home 768](screenshots/venue-vectors-home-768.png), [Home 1440](screenshots/venue-vectors-home-1440.png).
[DEX 375](screenshots/venue-vectors-dex-375.png), [DEX 768](screenshots/venue-vectors-dex-768.png), [DEX 1440](screenshots/venue-vectors-dex-1440.png).
