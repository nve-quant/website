// Editorial proposals for owner review, not measured outcomes or contractual commitments.
export const clientNeeds = [
 {diagram:'book' as const,problem:'A thin or uneven order book',objective:'Define the size buyers and sellers should be able to trade, then set quoting and depth objectives around the available capital.',link:'/market-making',label:'CEX market making'},
 {diagram:'venues' as const,problem:'Liquidity spread across venues',objective:'Review each market separately and agree where to allocate inventory, so an aggregate view does not hide a weak individual book.',link:'/market-making#measurement',label:'Measuring market quality'},
 {diagram:'range' as const,problem:'A DEX position that needs attention',objective:'Review where liquidity is placed as prices move, weighing usable liquidity against changing asset exposure and repositioning costs.',link:'/dex-liquidity-management',label:'DEX liquidity management'},
 {diagram:'report' as const,problem:'Too little visibility into the operation',objective:'Inspect orders, accounting and market activity in the client dashboard, then review the work against the agreed service levels.',link:'/work#review',label:'Reporting and review'},
];
export const commercialQuestions = [
 {title:'Capital & allocation',text:'Define the token and quote assets required, their distribution across venues or pools, and how funding or withdrawals change the scope.'},
 {title:'Fees & operating costs',text:'Separate the service fee from exchange fees, pool fees, gas and other execution costs. Establish who pays each cost and when.'},
 {title:'P&L, income & rebates',text:'Specify how trading gains and losses, LP fees and venue rebates are attributed. Review these alongside asset exposure, rather than treating trading volume as a return.'},
 {title:'Duration & exit',text:'Set the engagement period, notice arrangements, outstanding-order or position handling, and the process for removing access.'},
];
export const accessQuestions = [
 {title:'Authority',text:'Identify the actions permitted through API access or vault roles, who approves them and how permissions can be changed or revoked.'},
 {title:'Limits',text:'Define inventory boundaries and activity limits, including the conditions that require a pause or a change in scope.'},
 {title:'Exceptions',text:'Establish the response to venue outages, unavailable price inputs, unusual market conditions and breaches of operating limits.'},
 {title:'People & escalation',text:'Identify the operational contacts, monitoring arrangements, escalation route and who can authorise a restart or adjustment.'},
];
