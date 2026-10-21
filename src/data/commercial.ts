// Editorial proposals for owner review, not measured outcomes or contractual commitments.
export const clientNeeds = [
 {diagram:'book' as const,problem:'A thin or uneven order book',objective:'Define the size buyers and sellers should be able to trade, then set quoting and depth objectives around the available capital.',link:'/market-making',label:'CEX market making'},
 {diagram:'venues' as const,problem:'Liquidity spread across venues',objective:'Review each market separately and agree where to allocate inventory, so an aggregate view does not hide a weak individual book.',link:'/market-making#measurement',label:'Measuring market quality'},
 {diagram:'range' as const,problem:'A DEX position that needs attention',objective:'Review where liquidity is placed as prices move, weighing usable liquidity against changing asset exposure and repositioning costs.',link:'/dex-liquidity-management',label:'DEX liquidity management'},
 {diagram:'report' as const,problem:'Too little visibility into the operation',objective:'Inspect orders, accounting and market activity in the client dashboard, then review the work against the agreed service levels.',link:'/work#review',label:'Reporting and review'},
];
export const commercialQuestions = [
 {title:'Capital & allocation',text:'Start with at least US$3,000 worth of each asset per exchange account. Required capital depends on the trading objectives. If balances become one-sided, we may request replenishment or redistribution; you make the transfers.'},
 {title:'Fees & operating costs',text:'Separate the service fee from exchange fees, pool fees, gas and other execution costs. Establish who pays each cost and when.'},
 {title:'P&L, income & rebates',text:'Specify how trading gains and losses, LP fees and venue rebates are attributed. Review these alongside asset exposure, rather than treating trading volume as a return.'},
 {title:'Duration & exit',text:'Set the engagement period, notice arrangements, outstanding-order or position handling, and the process for removing access.'},
];
export const accessQuestions = [
 {title:'Authority',text:'Identify the actions permitted through API access or vault roles, who approves them and how permissions can be changed or revoked.'},
 {title:'Limits',text:'Agree inventory boundaries and activity limits. The CEX response includes reducing quote size and notifying internal trade operations and the client through automated alerts.'},
 {title:'Exceptions',text:'Establish the response to venue outages, unavailable price inputs, unusual market conditions and breaches of operating limits.'},
 {title:'People & escalation',text:'Identify the operational contacts, monitoring arrangements, escalation route and who can authorise a restart or adjustment.'},
];
