---
title: CEX market making
headline: Liquidity on both sides of your market.
summary: Low-latency spot and perpetual market making for exchanges and token projects, with non-custodial API access and real-time reporting.
source: https://onchainbureau.com/market-making
status: draft
kind: cex
audience: For exchanges, token issuers and crypto teams operating spot or perpetual markets.
fit:
  - Preparing liquidity for an upcoming exchange listing.
  - Reviewing a live book with wide spreads or insufficient depth.
  - Coordinating inventory across several venues or trading pairs.
outcomes:
  - title: Make trading capacity explicit
    text: Start with the trade sizes your market needs to support. Use spread and executable depth objectives to describe the liquidity required on each side.
  - title: Give the operation a clear owner
    text: Put quoting and inventory management within a defined service scope, with client responsibilities and access agreed before operation.
  - title: Make the work inspectable
    text: Follow orders and accounting through the dashboard and compare market quality with the agreed SLA. Review exceptions as well as averages.
metrics:
  - name: Bid–ask spread
    benefit: Understand the gap between the best available buying and selling prices.
    definition: Reference price, sampling interval and distribution over the review period. Separate total-market spread from the spread of our own quotes.
  - name: Executable depth
    benefit: Understand how much size is offered close to the market on each side.
    definition: Price bands around the reference, quote-currency value and bid/ask separation. Identify our orders separately from aggregate venue depth.
  - name: Slippage at relevant sizes
    benefit: Estimate the trading impact of order sizes that matter to your market.
    definition: Order size, buy/sell direction, reference and fees. Label estimates from book snapshots separately from realised execution.
  - name: Two-sided quote availability
    benefit: Check whether usable bids and offers were present through the period.
    definition: Required size and spread, observation interval, measurement window and treatment of venue outages. Server uptime is a separate measure.
  - name: Inventory exposure
    benefit: See how capital is distributed and where exposure approaches operating limits.
    definition: Asset balances by venue, valuation reference and agreed boundaries. Distinguish transfers from trading changes.
operations:
  - title: Two-sided quoting
    text: Manage bids and offers around your trading pairs. Quoting objectives, depth and operating limits are defined around the market and the capital allocated to it.
  - title: Inventory management
    text: Review token and quote-asset balances as orders fill. Manage quoting within the inventory limits agreed for each market.
  - title: Coordination across venues
    text: Agree the quoting, inventory, hedging and cross-venue allocation needed for your markets. Review each venue individually as well as the aggregate position.
  - title: Monitoring and trade operations
    text: Human trade operations monitor books around the clock, supported by internal logging, data pipelines, dashboards and alerts. Machine-learning volatility forecasts and order-management controls inform the operation.
access: Your assets remain under your control. Onchain Bureau operates through API-key access to your exchange accounts. Permissions and the account setup are agreed with you before operation, within a non-custodial arrangement.
considerations: Market conditions, available inventory and venue availability affect quoting. The mandate defines objectives and operating limits; it does not guarantee a token price, trading volume or uninterrupted exchange availability.
faqs:
  - question: Who supplies the trading capital?
    answer: You allocate the token and quote assets used for the engagement. The capital, markets and operating limits are agreed as part of the service mandate.
  - question: Do we transfer custody to Onchain Bureau?
    answer: No. The service is non-custodial and uses API-key access to client-controlled exchange accounts. The permissions and account arrangement are defined during setup.
  - question: Can we inspect individual orders?
    answer: Yes. The live client dashboard includes active and filled orders, order books, accounting, and aggregate and exchange-specific candlestick charts. Trade history is available on charts and in tables, with timeframe-selected CSV and JSON exports.
  - question: How are objectives and fees agreed?
    answer: We scope the engagement around your markets, capital and operating requirements. The standard model is a monthly retainer. Contract terms of three months, six months, one year and two years are available; pricing and service-level objectives are agreed for the mandate. Dashboard liquidity and microstructure metrics support review against the agreed SLA.
---
The engagement starts with your existing or planned markets: trading pairs, venues, allocated capital and the liquidity you need. These inputs define the operating mandate and the basis for reviewing the work.
