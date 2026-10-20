# Content inventory

Captured from public homepage https://onchainbureau.com/ on 2026-10-20. Link inventory is observed from homepage HTML; linked pages are not all independently audited. No full article or source asset migration has been performed.

## Copy decisions
- Retain: audiences, service categories, contact details, research topics and platform-in-development distinction.
- Rewrite: long service descriptions into clear visitor questions and short explanations.
- Verify: operational capabilities, audit/component claims, custody and access restrictions, turnaround times, legal identity, article dates and platform availability before launch.
- Remove from the new concepts: repeated service pitches, illustrative financial figures and diagrams that appear to be proof of actual performance.
- New shared headline and summaries are editorial drafts, not verified claims. The emerald preview comes from the homepage's 14 October note; publication date/year requires owner confirmation.

## URL and asset migration inventory
| Original destination | Treatment |
| --- | --- |
| / | Retain source URL for migration; refine copy and verify business claims before publication. |
| /algorithmic-marketing | Retain source URL for migration; refine copy and verify business claims before publication. |
| /assets/brand/apple-touch-icon.png | Inventory only; do not reuse compiled application files. Verify font and brand provenance before reuse. |
| /assets/brand/favicon.png | Inventory only; do not reuse compiled application files. Verify font and brand provenance before reuse. |
| /assets/brand/favicon.svg | Inventory only; do not reuse compiled application files. Verify font and brand provenance before reuse. |
| /assets/chart-BRu2AL7k.js | Inventory only; do not reuse compiled application files. Verify font and brand provenance before reuse. |
| /assets/fonts/ibm-plex-sans-400.woff2 | Inventory only; do not reuse compiled application files. Verify font and brand provenance before reuse. |
| /assets/fonts/ibm-plex-sans-500.woff2 | Inventory only; do not reuse compiled application files. Verify font and brand provenance before reuse. |
| /assets/home-FfJiYejP.css | Inventory only; do not reuse compiled application files. Verify font and brand provenance before reuse. |
| /assets/index-B--REI9G.js | Inventory only; do not reuse compiled application files. Verify font and brand provenance before reuse. |
| /assets/parts-DWK_Z54S.js | Inventory only; do not reuse compiled application files. Verify font and brand provenance before reuse. |
| /assets/registry-Bww_jZLx.js | Inventory only; do not reuse compiled application files. Verify font and brand provenance before reuse. |
| /assets/routes-CSnx35AV.js | Inventory only; do not reuse compiled application files. Verify font and brand provenance before reuse. |
| /assets/v-book-CA3hlfsl.js | Inventory only; do not reuse compiled application files. Verify font and brand provenance before reuse. |
| /assets/v-hub-MebgZhmC.js | Inventory only; do not reuse compiled application files. Verify font and brand provenance before reuse. |
| /assets/v8-CyER7NAg.css | Inventory only; do not reuse compiled application files. Verify font and brand provenance before reuse. |
| /company | Retain source URL for migration; refine copy and verify business claims before publication. |
| /contact | Retain source URL for migration; refine copy and verify business claims before publication. |
| /legal | Retain source URL for migration; refine copy and verify business claims before publication. |
| /market-making | Retain source URL for migration; refine copy and verify business claims before publication. |
| /platform | Retain source URL for migration; refine copy and verify business claims before publication. |
| /pools | Retain source URL for migration; refine copy and verify business claims before publication. |
| /research | Retain source URL for migration; refine copy and verify business claims before publication. |
| /research/assets-that-differ-unit-by-unit | Retain topic and original URL; review full article and date before migration. Homepage preview only reviewed in this milestone. |
| /research/nav-aware-uniswap-v4-pools | Retain topic and original URL; review full article and date before migration. Homepage preview only reviewed in this milestone. |
| /research/tokenized-gold-thin-markets | Retain topic and original URL; review full article and date before migration. Homepage preview only reviewed in this milestone. |
| /research/weekend-reference-gap | Retain topic and original URL; review full article and date before migration. Homepage preview only reviewed in this milestone. |
| /rwa | Retain source URL for migration; refine copy and verify business claims before publication. |
| /rwa#token-design | Retain source URL for migration; refine copy and verify business claims before publication. |
| /treasury | Retain source URL for migration; refine copy and verify business claims before publication. |
| /work | Retain source URL for migration; refine copy and verify business claims before publication. |
| https://blog.uniswap.org/how-permissioned-pools-work-on-uniswap-v4 | Reference only; does not independently establish company capabilities. |
| https://docs.uniswap.org/contracts/v4/concepts/hooks | Reference only; does not independently establish company capabilities. |
| https://find-and-update.company-information.service.gov.uk/company/15636039 | Reference only; does not independently establish company capabilities. |
| https://onchainbureau.com/ | Reference only; does not independently establish company capabilities. |
| https://t.me/onchainbureau | Retain contact destination; owner to confirm before launch. |
| mailto:info@onchainbureau.com | Retain contact destination; owner to confirm before launch. |


## Developed Market mechanics homepage
Service copy and engagement steps in src/data/home.ts are editorial drafts adapted from the service descriptions already inventoried. Each service retains its source URL. Business capability claims and the platform development statement require owner confirmation before publication. No quantitative results, audit guarantees or performance claims were added. The emerald research preview retains its existing source, with its unconfirmed date omitted from the developed homepage. Company and Legal links point to the current public pages while local replacements remain outside this milestone.

## Interactive asset scenarios
`src/data/market-model.ts` contains editorial drafts for tokenized gold, yield-bearing funds and unique assets. Each retains its existing-site research source. Explanations are illustrative design questions, not verified capabilities, investment advice, live market conditions or performance evidence. Owner review remains required before publication.


## Tokenized-stock scenario
New editorial draft in `src/data/market-model.ts`, informed by the [SEC staff Statement on Tokenized Securities, 28 January 2026](https://www.sec.gov/newsroom/speeches-statements/corp-fin-statement-tokenized-securities-012826-statement-tokenized-securities). This external source supports the distinction between issuer-sponsored tokenized shares and third-party structures; it does not verify Onchain Bureau capabilities. Rights, corporate actions and exit terms remain structure-specific design questions. The physical certificate is original specimen artwork, not an actual issued security. Business copy still requires owner approval.

Gold model marks now use generic metal, fineness and weight labels instead of OB/Onchain Bureau. No refinery logo or certification claim is depicted. The existing [Argor-Heraeus cast-bar reference](https://www.argor-heraeus.com/en/products-and-services/products/cast-and-minted-bars/1000g-au-cast-classic-999.9/) remains visual context only; no imagery is reused.

## Owner positioning correction: CEX and DEX first
Source: owner instruction in this session, 20 October 2026. Onchain Bureau is primarily market making as a service: low-latency liquidity management on centralized exchanges and concentrated-liquidity management on DEXs. This supersedes the earlier tokenized-asset-first homepage positioning. Retain tokenized assets, models and research as a dedicated lower section; retain all original migration URLs.

`src/data/home.ts` now holds the primary homepage positioning and the two core service summaries. Qualitative low latency and the two service categories are owner supplied. Quoting, inventory limits, range selection and rebalancing copy is an editorial explanation for owner review, not a new guarantee. No numerical latency, supported venue list, client proof, custody claim or promised return has been introduced. The source site’s supporting services remain draft copy. Original concept copy in `src/data/site.ts` is preserved for comparison studies.

Reviewed https://arrakis.finance/ as the owner's service-category reference. It supports the reference category of active onchain liquidity management; its customers, results and self-custody claims are not Onchain Bureau evidence and are not reused. The new diagrams are original, schematic and explicitly labelled, without simulated prices or quantities.

## Animated service illustrations
The CEX depth and DEX range graphics use deterministic generated coordinates in `src/scripts/liquidity-geometry.ts`. They are original explanatory visuals, explicitly labelled “Illustrative market. Not live data.” Neither shape nor timing represents actual exchange data, client inventory, liquidity results or an operating guarantee. CEX uses cumulative depth with a gap between bids and asks; DEX separates a schematic price move from a subsequent range adjustment. There are no quoted prices or measured quantities.

### CEX chart and quote ladder revision
Owner requested faster motion and a chart with an order book. The new CEX visual includes generated index prices around 100 and generated order sizes, with an explicit simulated-data label. These are illustrative values, not source material, quoted market prices, customer evidence or company performance. Quote update timing is animation pacing, not a latency claim. This supersedes the earlier statement that the service diagrams contain no numbers. DEX pacing is accelerated for explanation, not an execution or rebalance commitment.

### Illustrative order participation — 20 October 2026
Owner-requested “Our orders” markers identify seven larger simulated CEX price levels. This is explanatory animation content, not verified market share, customer evidence or real order ownership. The dot denotes participation at a price level; the displayed aggregate size is not a claim about Onchain Bureau's order size. Retain the simulated-market label when reusing this graphic.

## Service pages and client transparency, 20 October 2026
Primary new source: the owner's direct confirmations in this conversation. Fully non-custodial operation; CEX API-key access; DEX Safe/Squads vault roles and permissions adaptable to client needs. Existing live dashboard: aggregate and separate exchange candlestick charts, order books, active/filled orders, accounting, CSV downloads of filled orders, and liquidity/microstructure metrics against agreed SLAs. These are owner-confirmed business capabilities, not independently verified product behavior or measured performance.

The approved service-mandate model uses client capital and agreed fees. Exact permissions, vault configurations, SLA values, metrics methodology, venue coverage, onboarding time, fees and review frequency remain unspecified. No unsupported quantitative promise or integration list is added. New service collection entries retain draft editorial status for final copy review; their source URLs preserve migration context, while this entry records the newer owner evidence.

| Destination | Current local treatment |
| --- | --- |
| `/market-making` | Retain original URL for the CEX service detail page. |
| `/dex-liquidity-management` | New dedicated DEX management route. `/pools` remains inventoried for future pool-design content; no redirect decision is made here. |
| `/work` | Retain original URL for the expanded engagement process and responsibilities. |
| `/platform` | Preserve original source. Remove the ambiguous homepage “in development” promotion pending clarification of its relationship to the live client dashboard. |

Copy boundaries: service scope, FAQs, responsibility allocations and operating considerations are editorial explanations based on the approved plan; client-specific mechanics are agreed during scoping. No fabricated dashboard imagery or login URL. Actual dashboard visuals, Company biographies, new research articles and further migration mapping are later work.

## Conversion-content drafts, 20 October 2026
Owner authorised local implementation of the adversarial conversion review, with inclusion decisions later. This is editorial authorisation, not confirmation of new business facts. Service collection fields `fit`, `outcomes` and `metrics` contain proposed scoping situations, intended benefits and measurement definitions. They do not claim achieved results or availability of every metric in the dashboard.

`src/data/commercial.ts` records client-problem explanations and commercial/control questions to settle. It does not assert fee amounts, minimum capital, income allocation, permissions, automation or incident coverage. `/company` now exists locally and is linked from the homepage and footer; its operating-model copy uses prior owner confirmations. Public company-page retrieval was unavailable during this pass, so no new people, credentials or registration facts were imported.

Evidence still required: named biographies and firm history; permitted case study/reference; confirmed venue and protocol coverage; real dashboard media; KPI availability/methodology; latency evidence; commercial details and exact controls. Development-only `ReviewNote` placements and docs/commercial-evidence.md track these inputs. They do not ship in the static build. Existing source URLs remain unchanged.

## DEX illustration clarification, 20 October 2026
The owner requested faster range tracking and questioned the centre-heavy distribution. The revised graphic represents liquidity L available at each price, rather than cumulative market depth or token value. A single managed range is flat within its bounds; the pool total combines its contribution with other illustrative overlapping ranges. Source for the range-based model: [Uniswap concentrated liquidity](https://developers.uniswap.org/docs/get-started/concepts/liquidity-providers/concentrated-liquidity). The chosen range widths, profile and shortened response delay remain illustrative, not actual positions, a universal pool shape, a trading strategy or evidence of execution speed.

### DEX profile clarification follow-up
The owner clarified the requested profile as a central valley with fuller shoulders, rather than a flat band. The illustration now aggregates multiple managed ranges. Its accessible description supersedes the prior single-position explanation; it explicitly avoids presenting the shape as a universal profile or actual strategy. The animation pace and all values remain illustrative.
