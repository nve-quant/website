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
