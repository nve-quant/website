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
