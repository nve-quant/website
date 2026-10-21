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
    text: Agree ranges and token balances with your team. Range width is considered alongside price movement, the asset pair and the inventory available.
  - title: Position rebalancing
    text: Adjustments are primarily automated within the agreed approach, with discretionary intervention for exceptions or client requests. Repositioning generally proceeds when the expected benefit outweighs gas costs, alongside the current allocation and inventory exposure.
  - title: Engagement-specific tools
    text: Depending on the pool and mandate, management may include dynamic fees, hedging on another market or arbitrage execution. These tools are selected for the engagement rather than included in every setup.
  - title: Capital allocation
    text: Agree how much capital to allocate and which pools fall within scope. Review the distribution of that capital as prices and liquidity needs change.
access: Your assets remain under your control. Safe or Squads vault roles restrict our operation to the specified pool and asset pair, without withdrawal or send authority. We agree the vault configuration, ranges, balances and operating limits with your team before operation.
considerations: A narrower range concentrates liquidity but can move out of range as prices change. Asset exposure changes as trades occur, and repositioning incurs transaction costs. Active management does not remove market, smart-contract or inventory risk, or guarantee returns.
faqs:
  - question: Which protocols and chains do you support?
    answer: Uniswap v3 and v4 coverage spans Ethereum, Arbitrum, Optimism, Polygon, Base and BNB Chain. Uniswap v4 is also supported on Robinhood Chain. Aerodrome coverage includes Slipstream and classic stable/volatile pools on Base; Velodrome Slipstream is on Optimism. PancakeSwap is also supported, with the deployment agreed for the engagement. Solana liquidity pools include Raydium AMM v4, CPMM and CLMM; Meteora DLMM, DAMM v1 and DAMM v2; Orca Whirlpools; and PumpSwap constant-product pools. We agree the version, pool, asset pair and permitted activity before operation.
  - question: Does your Solana coverage extend beyond liquidity pools?
    answer: Yes. Launch-market execution covers Raydium LaunchLab, Meteora Dynamic Bonding Curve (DBC), Pump.fun and Jupiter Studio. Trading coverage also includes the Phoenix spot order book and the SolFi, Tessera V and ZeroFi proprietary AMMs. These are distinct market structures, with activities and permissions agreed separately from concentrated-liquidity management. Trading against a proprietary AMM does not mean we manage its liquidity.
  - question: Is Robinhood Chain coverage available yet?
    answer: Yes. Uniswap v4 on Robinhood Chain is already supported. Additional coverage is coming soon for GIGA DEX pools and launch-market execution on Pools.trade and Pons. Those planned integrations are separate from our existing Uniswap service; their coming-soon status refers to our coverage, not the venues themselves.
  - question: Who controls the assets?
    answer: You retain control through your Safe or Squads vault. Our roles are restricted to the specified pool and asset pair, with no withdrawal or send authority. The configuration is agreed for the engagement. These permission boundaries do not remove market, smart-contract or inventory risk.
  - question: Can you work with an existing pool?
    answer: Bring the pool, chain, asset pair and current position details to the initial review. We assess the proposed setup and agree which pools and activities belong within the mandate.
  - question: When are positions rebalanced?
    answer: We agree ranges, balances and the operating approach with your team. Adjustments are primarily automated, with discretionary intervention for exceptions or client requests. Market conditions, inventory exposure and transaction costs inform repositioning; there is no universal fixed interval.
  - question: Does active management guarantee a return?
    answer: No. Fees earned, changes in asset value, inventory exposure and transaction costs all affect the outcome. The service manages positions within agreed limits rather than promising a yield or protection from losses.
---
Concentrated liquidity requires decisions about where to place capital and how to respond when the market moves. We define those decisions around your asset pair, allocation and operating constraints.
