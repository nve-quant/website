---
title: DEX liquidity management
headline: Put liquidity where your market trades.
summary: Active management of concentrated-liquidity positions, with client-controlled assets and defined roles and permissions.
source: https://onchainbureau.com/pools
status: draft
kind: dex
audience: For token issuers and crypto teams managing liquidity in decentralized markets.
fit:
  - Placing concentrated liquidity for an existing or proposed pool.
  - Reviewing a position as the market moves away from its selected range.
  - Allocating treasury-owned liquidity across positions or pools.
outcomes:
  - title: Relate the allocation to trading needs
    text: Discuss how much liquidity the market needs around relevant prices, then weigh range width against the assets and capital available.
  - title: Make repositioning a considered decision
    text: Assess price movement, exposure and transaction costs together. A move back into range is not automatically a better economic outcome.
  - title: Review the full position
    text: Consider fee income alongside inventory value and operating costs. Choose a comparison benchmark when defining how the engagement will be assessed.
metrics:
  - name: Active range & allocation
    benefit: See where liquidity is positioned relative to the market.
    definition: Range boundaries, current price, capital allocation and time in range. Treat range status as operational context, not proof of profitability.
  - name: Trading impact
    benefit: Assess the liquidity available for trade sizes relevant to your pool.
    definition: Buy/sell size, pool state, fees and quote methodology. Distinguish a pool-level estimate from routed or realised execution.
  - name: Inventory composition
    benefit: Understand how asset exposure changes as the market trades through a position.
    definition: Token quantities, valuation reference, cash flows and agreed exposure boundaries. Separate price effects from deposits and withdrawals.
  - name: Fees & repositioning costs
    benefit: Evaluate income alongside the costs of maintaining positions.
    definition: Accrued and collected fees, gas, swap costs and service fees, with a clear accounting period and treatment of uncollected income.
  - name: Outcome against a benchmark
    benefit: Put position value and income into the context of an agreed alternative.
    definition: Benchmark, valuation dates and external cash flows. Include costs and distinguish market exposure from the effect of management.
operations:
  - title: Range selection
    text: Define where to place liquidity around the market. Range width is considered alongside price movement, the asset pair and the inventory available.
  - title: Position rebalancing
    text: Review positions as market conditions change. Repositioning decisions consider the current allocation, inventory exposure and transaction costs within the agreed mandate.
  - title: Capital allocation
    text: Agree how much capital to allocate and which pools fall within scope. Review the distribution of that capital as prices and liquidity needs change.
access: Your assets remain under your control. Operation uses defined roles and permissions through Safe or Squads vaults, with the setup adapted to client requirements. The specific vault arrangement and permissions are agreed before operation.
considerations: A narrower range concentrates liquidity but can move out of range as prices change. Asset exposure changes as trades occur, and repositioning incurs transaction costs. Active management does not remove market, smart-contract or inventory risk, or guarantee returns.
faqs:
  - question: Who controls the assets?
    answer: The service is non-custodial. Client-controlled Safe or Squads vaults use roles and permissions for the agreed work. The configuration is defined for each engagement and can accommodate client requirements.
  - question: Can you work with an existing pool?
    answer: Bring the pool, chain, asset pair and current position details to the initial review. We assess the proposed setup and agree which pools and activities belong within the mandate.
  - question: When are positions rebalanced?
    answer: Rebalancing is considered against the position, market conditions, inventory exposure and transaction costs. The operating approach is agreed for the engagement; there is no universal fixed interval.
  - question: Does active management guarantee a return?
    answer: No. Fees earned, changes in asset value, inventory exposure and transaction costs all affect the outcome. The service manages positions within agreed limits rather than promising a yield or protection from losses.
---
Concentrated liquidity requires decisions about where to place capital and how to respond when the market moves. We define those decisions around your asset pair, allocation and operating constraints.
