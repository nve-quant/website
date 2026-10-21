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

## Service navigation and new owner confirmations, 20 October 2026
Owner confirmed OTC deals and systematic strategies as a service, including plug-and-play trading strategy terminals and managed vaults. Added draft descriptions in src/data/home.ts and homepage anchors /#otc-deals and /#systematic-strategies. These are owner-confirmed service categories, not independently verified product evidence. Exact strategies, deployment support, custody, counterparties, settlement process, terms and results remain unspecified. No returns, screenshots, automation guarantee or principal-versus-agency model was invented.

The Services dropdown reuses core and supplementary service data, with detail links to /market-making and /dex-liquidity-management and deep links to the homepage explanations. Additional stable anchors: /#market-design, /#pool-design, /#treasury-execution and /#distribution. Existing source URLs and migration decisions remain unchanged.

## Client-need illustrations, 20 October 2026
Four original SVG diagrams accompany the existing client problems and objectives. Their changing order sizes, venue allocation levels, DEX movement and report marks are schematic, not live observations, client results, a specific strategy or a dashboard screenshot. The existing business copy and service links are unchanged. The venue animation redistributes a constant illustrative total; no units or monetary values are asserted.

## Expanded asset specimens, 20 October 2026
Owner requested emerald/ruby/sapphire/diamond, gold/silver/palladium/platinum, and commodities including oil and wheat. These specify illustrative subjects, not supported instruments, custody holdings, market-making clients or new commercial claims. All meshes, texture maps and fallback SVGs are original code-generated work; no downloaded or unlicensed models. Bullion purity/weight stamps are specimen artwork and do not represent refinery certification. Gem optics are lightweight visual approximations, not a grading or valuation tool.

The former Tokenized gold tab becomes Precious metals, with generalized draft reference-market copy. Its original gold research URL remains unchanged as a related example. Commodities copy introduces questions to define during market design; no supporting research URL or delivery capability has been invented. These explanations remain subject to content review before publication.

### Asset category expansion — 20 October 2026
- Source: owner's explicit request for Metals, Grains with wheat/corn/soy, and a separate Real estate category. Retain this taxonomy and the existing wheat shadow correction.
- Original assets: copper strip coil, aluminium cast ingots, corn, dry soybean pods, residential building, office tower and logistics warehouse. Generated as local Three.js geometry with authored SVG companions; no third-party asset licence required.
- Draft copy: grain specification, storage/delivery questions and property ownership/valuation/exit questions in `src/data/market-model.ts`. Review before publication; these describe illustrative design considerations, not instrument-specific advice or confirmed services/holdings. No invented source links or property values.
- Existing commodity copy rewritten for oil after moving wheat. Unique-asset copy now focuses on gems/lots; property has its own explanation. Existing source URLs retained.

### Taxonomy and six specimens — 21 October 2026
Owner supplied/approved the eight-category grouping and new nickel, gas, coffee, cotton, Treasury-bill and corporate-bond studies. Replaced the broad Metals/Commodities and Unique asset labels; relabelled stock as Equities and fund group as Fixed income & funds, with Fund shares as its specimen label. No claim that a token automatically gives direct asset ownership.

Bill and corporate-debt explanatory facts checked against primary sources:
- TreasuryDirect, https://www.treasurydirect.gov/marketable-securities/treasury-bills/ — bills sold at discount or face value, defined maturity.
- Investor.gov, https://www.investor.gov/introduction-investing/investing-basics/investment-products/bonds-or-fixed-income-products — corporate debt, interest/principal and issuer payment risk.
The fund-versus-direct-instrument distinction was explicitly requested by the owner. The 3D paper studies are marked illustrative, not issued securities. Commodity form/grade/location and property copy remain draft market-design questions, without specific commercial commitments. All model/fallback artwork is locally authored; no external assets or new licences.

### Market-specific specimen naming — 22 October 2026
Owner requested meaningful market distinctions and a realism pass. These are illustrative subjects, not newly confirmed products, certified inventory or exchange affiliations. Specimens now identify WTI light sweet crude, Henry Hub natural gas, Hard Red Winter wheat, No. 2 yellow corn/soybeans, Arabica coffee and Upland cotton. Primary aluminium references P1020A; rolled copper remains a fabricated strip coil rather than being mislabeled Grade A cathodes. Precious-metal captions reflect the existing specimen stamps. Financial studies distinguish Treasury fund shares, a 13-week U.S. Treasury bill, fixed-rate corporate debt and common stock. Property names specify multifamily residential, commercial office and logistics real estate without invented locations, tenants or valuations. Gem cuts remain unchanged; no unverified origin, treatment or grading claims.

Primary specification references:
- WTI: https://www.cmegroup.com/markets/energy/crude-oil/light-sweet-crude.contract.html
- Henry Hub: https://www.cmegroup.com/markets/energy/natural-gas/natural-gas.contractSpecs.html
- Wheat classes: https://uswheat.org/crop-and-quality/
- Corn grade: https://www.cmegroup.com/markets/agriculture/grains/corn/specs
- Soybean grade: https://www.cmegroup.com/content/dam/cmegroup/market-regulation/rule-filings/2024/12/24-443.pdf
- Arabica/Coffee C: https://www.ice.com/products/15/data
- Cotton specification: https://www.theice.com/publicdocs/futures_us_reports/cotton/Cotton_Deliverers_Guide.pdf
- Upland cotton: https://www.ams.usda.gov/grades-standards/universal-upland-color-and-leaf-grade-cotton-standards
- Primary aluminium: https://www.lme.com/en/metals/non-ferrous/lme-aluminium/contract-specifications
- Treasury maturities: https://www.treasurydirect.gov/marketable-securities/treasury-bills/

Captions and specimen notes separate a reference specification from a complete lot/contract. The oil drum and gas vessel are symbolic illustrations, not actual delivery arrangements. Agricultural shapes cannot certify grades. No protein percentage, origin, credit rating or security identifier has been invented.

### Owner-requested model refinement and caption subtraction
Owner authorised removing the oil barrel’s illustrative stamp and repeated asset-study/rotation caption. The section-level context still distinguishes studies from actual offerings. Gas/coffee model captions also omit redundant illustrative wording. No product support, certifications, provenance, tenants or performance claims added. Changes use local procedural geometry/materials only; no external model/image licences introduced. Excluded metals/gems/equities/fixed-income/fund model definitions remain unchanged.

## Commercial graphics and copy interview
Owner requested parallel work on the proposed graphics while answering a broad business-copy interview. New access/handoff/reporting visuals use the existing owner-confirmed operating model. Measurement diagrams are educational drafts, not measured results or confirmation that every measure is available in the dashboard. OTC/strategy diagrams explain discussion scope, without inferring settlement, custody, returns or principal/agency models.

Coverage data in src/data/venue-coverage.ts is intentionally empty pending owner-confirmed venues, protocol/network combinations and publication permission. No coverage section renders without data. Real sanitized dashboard imagery and team/client evidence remain outstanding; the reporting capability map does not substitute for such proof. Interview questions and outstanding source dependencies are recorded in docs/copy-interview.md. No new owner answers have been received during this implementation pass.

## Owner interview answers and dashboard source review
Source: direct owner answers, 21 October 2026; publication permission for named MNEE/BSV engagements received in follow-up. See BRIEF.md for the full confirmation/qualification ledger. Public copy now uses operating since 2022, the two named people (without invented titles), approved client examples, 24/7 human monitoring, spot/perpetual scope, permission-restricted DEX operation, reporting detail and retainer/term structure. Systematic strategies explicitly pilot/coming soon. No published latency number, 3k minimum, gem valuation/certification, CMC ranking or undisclosed client name.

Read-only review of the owner-specified DataIndexer/frontend/src corroborated:
- components/ExchangeChart.tsx:376–410: actual-trade markers on candles.
- components/hbot/HbotInstanceDetailView.tsx:41–106,458+,638,778: CSV exports, active order fields and fills.
- components/liquidity/LiquidityDashboard.tsx:113–133: spread/depth history, basis-point controls and bid/ask/total modes.
- pages/MarketMicrostructure.tsx:265–266: depth relative to mid and coverage limitations.
- components/risk/OracleMarkChart.tsx:74,378: historical/live oracle marks.
Source code does not independently establish production availability, direct feed provenance, client entitlements or JSON export scope. Those remain owner-confirmed capabilities. Depth reference and oracle views are kept distinct in copy rather than assuming all depth uses the oracle. No private source, configurations, live records or credentials copied.

27 CEX marks copied from the owner's crypto SVG directory into public/images/venues. Owner confirms operational coverage, not exchange endorsements/partnerships. Exclude Uniswap/Aerodrome/Hyperliquid pending product/network scope, duplicate okx-x, and PNG-only LBank/Coinstore. Original logo files preserved. Brand marks identify venues, not clients. Remaining questions in docs/copy-interview.md.

### DEX deployment and latency follow-up
Direct owner reply confirms eight protocols: Uniswap v3/v4, Aerodrome, Velodrome, PancakeSwap across EVM deployments; Raydium, Meteora, Orca and PumpSwap on Solana across pool types. Matrix uses EVM/Solana families rather than inventing individual deployments. No version inferred for Aerodrome/Velodrome/PancakeSwap. Hyperliquid remains omitted pending product scope.
Latency clarification: owner reports p50 values across venues, close p99, send-to-order-acceptance timestamp. Exact threshold and timestamp/clock methodology still pending; do not relabel percentile evidence as a hard maximum or received-acknowledgement RTT. Latency terms may be negotiated but are not standard contractual guarantees.

### Funding, limits and DEX tool clarification
Source: direct owner response. 3k per asset at launch, currency/per-account scope awaiting final confirmation. Publish funding of both assets and replenishment/redistribution coordination; hold numerical minimum and exact transfer authority. Confirmed CEX size reduction plus internal and client-bot alerts. DEX cost-benefit-aware rebalancing and case-specific dynamic fees/hedging/arbitrage added to service copy. No universal availability or returns claimed.
