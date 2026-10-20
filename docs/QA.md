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
