# Onchain Bureau website brief

## Purpose and audience
Help token issuers and crypto teams understand the core market-making services and start a relevant engagement. Tokenized-asset issuers and tokenization platforms are also served, as a specialist application of the broader liquidity business. Primary action: email info@onchainbureau.com to discuss their market. This is a B2B marketing site, not an investment platform.

Owner clarification, 20 October 2026: Onchain Bureau is primarily a market maker as a service, managing liquidity on centralized exchanges with low latency and managing concentrated liquidity on DEXs. Lead the homepage with those two services. Tokenized assets belong in their own lower section, with the existing 3D explorer preserved. Supporting services remain secondary. Platform remains explicitly in development. No quantified latency, return, spread or uptime promises without evidence.

## Visitor questions
- Is this relevant to my asset and stage of development?
- What does the firm actually deliver?
- How does the work differ between centralized order books and concentrated-liquidity pools?
- For tokenized assets, how do reference prices, liquidity and redemption connect?
- What access or control would the firm need?
- What evidence supports the claims, and how do I start a conversation?

## Proposed sitemap
Home; Solutions overview; service detail pages led by CEX market making and DEX liquidity management, followed by tokenized assets, pools and hooks, treasury execution and distribution; Research index and articles; Company; Contact. Preserve Legal and How we work content in the migration review. Platform is a future-product explanation, not a functioning product in this milestone.

## Content and proof
See docs/content-inventory.md for source URLs and treatment. The existing website is first-party source material, not independent verification. Current homepage copy lives in src/data/home.ts and typed Markdown collections. src/data/site.ts retains the original shared concept copy for the archived studies. No invented results, logos, clients, testimonials, screenshots or audit claims. Illustrative diagrams must say so. Dates and statements sourced from the old site must be confirmed before publication.

## Constraints
Local-only. Full visual rethink. Market mechanics is selected for the developed homepage; three original concepts remain as development-only references. No CMS, backend, authentication, analytics, trading integrations or domain changes. Do not install additional design plugins just to accumulate rules. Use frontend-design guidance and document decisions.

Avoid default purple gradients, glass cards, emoji, interchangeable three-card sections, decorative terminal UIs, uncontrolled perpetual animation, fake dashboard numbers and default icon libraries. Typography must serve the content; a different font alone is not an identity. A justified exception is recorded in DESIGN.md.

## Completion and next decision
Foundation includes a working local comparison, documented evidence gaps and validation. The owner has selected Market mechanics. The next review covers the developed homepage and its draft business copy. Success means visitors can explain the business and find contact details, with distinctive but usable presentation.

## Owner-confirmed operating model and reporting, 20 October 2026
The service is fully non-custodial: API-key access for client CEX accounts, and analogous roles/permissions through Safe or Squads vaults for DEX work, adaptable to client requirements. A service mandate uses client-funded liquidity for a fee; exact commercial terms and technical permissions are engagement-specific.

An existing live client dashboard provides aggregate and exchange-specific candlestick charts, order books, active and filled orders, accounting, filled-order CSV downloads, and liquidity/microstructure metrics for comparison with agreed SLAs. These capabilities are owner-confirmed; screenshots and implementation details have not been independently reviewed. Do not call this dashboard “in development.” Remove the ambiguous future-platform homepage promotion while preserving its source material for clarification.

This milestone adds CEX Market Making (`/market-making`), DEX Liquidity Management (`/dex-liquidity-management`) and How We Work (`/work`) alongside the expanded homepage. Company biographies, real dashboard screenshots, a dedicated tokenized-assets page, research migration and a standalone contact page follow later. Remain local-only.

## Conversion-content review, 20 October 2026
Owner requested implementing the conversion audit locally before deciding what to retain. Added problem-to-objective explanations, service-fit guidance, proposed KPI frameworks, commercial/access questions, an enquiry template and a local Company page. The homepage mandate document is replaced by client needs and measurement; detailed mandate content remains on the service pages.

This request does not confirm new facts about people, results, venue support, fees or controls. Development-only editorial notes identify the missing evidence in context and are excluded from static output. See docs/commercial-evidence.md for exact inputs. Company currently describes only the confirmed operating model; biographies and substantiated track record remain pending.

## Owner-confirmed additional services, 20 October 2026
The owner confirmed OTC deals and systematic strategies as a service, including plug-and-play trading strategy terminals and managed vaults. Include these in navigation and the homepage service overview. Exact strategy catalogue, execution/counterparty model, custody and vault configuration, supported deployments, commercial terms and results are not confirmed by this statement. Do not extend CEX/DEX-specific access claims to every strategy product.

## Asset-study expansion, 20 October 2026
Owner requested selectable specimens within asset groups: four gemstones, four precious metals, and oil/wheat commodities. Preserve the original gold/emerald and existing fund/stock studies. Side arrows select the specimen; object dragging continues to rotate. All are illustrative studies, not a statement that these instruments are offered or managed. Keep generation lazy and the mobile/reduced-motion fallback.

### Expanded asset studies — 20 October 2026
Owner requested distinct Metals, Grains (wheat, corn and soy) and Real estate categories. Metals now includes the original gold, silver, palladium and platinum plus copper and aluminium. Real estate uses original residential, office and industrial architectural miniatures. Oil remains under Commodities. These are illustrative market-design studies, not a portfolio, available products, certified holdings or evidence of existing client mandates. New grain/property copy is a draft for owner review.

### Asset taxonomy and detail pass — 21 October 2026
Owner approved eight groups: Precious metals; Industrial metals; Energy; Agriculture; Gemstones & collectibles; Real estate; Equities; Fixed income & funds. Add nickel, natural gas, coffee, cotton, Treasury bill and corporate bond specimens. Watches/art remain future possibilities, not additions in this milestone. Fund shares, direct bills and corporate debt must be distinguished in the explanation. These remain illustrative market studies, not a product catalogue or claimed holdings. Owner also requested more detailed grains, buildings and barrel, with the existing performance-conscious rendering approach retained.

Owner requested market-specific specimen names and a realism upgrade on 22 October 2026. Use appropriate benchmark/class/grade/form distinctions in the asset explorer, with primary references in the inventory. Treat these as illustrative subjects, not supported-product or certified-inventory claims. Prioritise agriculture, property and the oil drum while preserving gold/gem appearance and rendering budgets.

## Focused model refinement and caption cleanup
Owner explicitly requested multi-agent refinement of agriculture (wheat, corn, soybeans, coffee, cotton), energy (oil and natural gas) and all three property studies. Exclude precious/industrial metals, gems, equities, fixed income and funds from model changes. Remove the oil drum’s illustrative stamp and repeated “Illustrative asset study / Drag to rotate / Click to pause” caption. Preserve accessible rotation controls and the section-level context; user authorization supersedes the earlier instruction to retain every illustrative label.

## Owner interview: operating history, coverage and commercial model
Source: owner answers and follow-up publication permission, 21 October 2026. Supersedes previous assumptions about general availability of systematic strategies.
- Operating since 2022. Public people: Nicholas van Eerde and Nahuel Angelone; roles/approved biographies remain pending.
- Client fit includes exchanges, stablecoins, utility/layer-one projects and gemstone-backed tokens. Owner expressly approved naming MNEE and Bitcoin SV (BSV) engagements. Emerald/ruby project names and exchange client name remain unspecified. Gem backing valuation/certification and CMC ranking are not published without supporting evidence.
- Core priorities: CEX/DEX. OTC is a small secondary activity. Systematic terminals/vaults are testing/pilot, coming soon rather than generally available.
- Main differentiator: bespoke transparent reporting of orders and SLA metrics in real time, including directly sourced exchange data. Case-specific introductions/additional support are not a standard promised service package.
- CEX: spot and perpetuals; quoting, depth, availability, inventory, allocation and hedging scoped to client needs. Internal ML volatility forecasting, OMS controls, logs, data pipelines and alerting; human trade ops monitors books 24/7.
- DEX: ranges/balances chosen with client; primarily automated adjustments, with discretionary exceptions/requests. Safe/Squads roles restrict operation to agreed pool/pair without withdrawal/send authority. This is a permission model, not proof that malicious extraction or losses are impossible.
- Monthly retainer; 3/6/12/24-month terms. Client generally receives P&L/rebates/LP fees and pays costs, with some negotiated income-share/lower-retainer arrangements. Loan models are exceptional, not core marketing. Stated capital floor of 3k awaits currency, unit and publication wording.
- Weekly/monthly Telegram reviews, calls if required. Real-time CEX/DEX dashboard, visual chart and table trade history, timeframe CSV/JSON exports; spread/depth snapshots/history and fair-value/oracle quotation reference.
- Latency answer mentions sub-3–5ms, typically ~1ms and some sub-1ms RTT. Do not publish an all-venue guarantee until measurement endpoints, bound/percentile, exclusions and applicable deployments are clarified.
- Coverage authorized from SVGs in owner-specified DataIndexer asset folder. 27 distinct CEXs copied; duplicate OKX mark excluded. Uniswap/Aerodrome/Hyperliquid deployment details remain pending; PNG-only files were outside the stated SVG selection.

### Owner follow-up: DEX coverage and latency definition
Owner confirms Uniswap v3/v4, Aerodrome, Velodrome and PancakeSwap; support across EVM chains. Solana: Raydium, Meteora, Orca and PumpSwap, all pool types. Protocol support does not imply every protocol is deployed on every EVM chain. Hyperliquid product scope still unconfirmed. Public coverage matrix and DEX FAQ updated.

Latency figures described by owner as p50 across all venues, with low jitter and p99 close to p50, measured from order sending to the timestamp of accepted order. Latency clauses are available by agreement but not standard contracts. “Upper bound” conflicts with percentile terminology; exact 3ms versus 5ms threshold, timestamp origin and clock synchronization remain to clarify. Public numeric latency claim remains deferred, while contractual availability is stated accurately.
