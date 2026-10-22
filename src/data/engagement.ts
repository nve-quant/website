// Operational categories confirmed by the owner, 20 October 2026.
// Exact permissions, reporting coverage and commercial terms remain mandate-specific.
export const mandate = [
 {title:'Markets & pairs',text:'The exchanges, pools and asset pairs included in the engagement.'},
 {title:'Capital allocation',text:'The token and quote assets you allocate, and how they are distributed.'},
 {title:'Liquidity objectives',text:'The quoting or position-management objectives and how they are measured.'},
 {title:'Operating limits',text:'Inventory boundaries, permissions and the conditions for reviewing activity.'},
 {title:'Review arrangements',text:'The metrics, service levels and communication agreed for the mandate.'},
];
// Expanded dashboard scope confirmed by the owner, 21 October 2026.
// Read-only UI review corroborates historical spread/depth, oracle views and CSV fills;
// direct exchange sourcing and JSON/timeframe export scope remain owner-confirmed.
export const reporting = [
 {title:'Market view',text:'Follow CEX and DEX markets in real time, with data sourced directly from exchanges. Compare aggregate and exchange-specific candlestick charts and order books.'},
 {title:'Orders & exports',text:'Inspect active orders and executed trades on candlestick charts or in tables. Export the selected reporting period as CSV or JSON for your own analysis.'},
 {title:'Accounting',text:'Review accounting alongside orders and market activity, so execution records can be considered in the context of the engagement.'},
 {title:'Liquidity & history',text:'Inspect spread, depth at defined basis-point distances, and the fair-value or oracle reference used for quoting. Review snapshots and historical observations against the agreed SLA.'},
];
export const engagementSteps = [
 {title:'Review your markets',text:'Share your token, trading pairs, venues or pools, and what you want to improve. We review the proposed scope and the capital available.'},
 {title:'Define the mandate',text:'Agree the markets, capital allocation, liquidity objectives, fees, operating limits and basis for reviewing the work.'},
 {title:'Set up permissions',text:'Establish API access for CEX accounts or roles and permissions through Safe or Squads vaults for DEX activity. Agree the configuration before operation.'},
 {title:'Operate and review',text:'Follow activity through the client dashboard. Review liquidity and microstructure metrics against the agreed SLA and discuss changes to the mandate.'},
];
export const responsibilities = [
 {area:'Capital',client:'Allocate the assets and capital for the engagement.',bureau:'Operate within the agreed allocation and inventory limits.'},
 {area:'Access',client:'Control the accounts or vaults and approve the permissions.',bureau:'Use the agreed API access or vault roles for the scoped activities.'},
 {area:'Objectives',client:'Define market needs and agree the mandate.',bureau:'Translate the scope into quoting or position-management work.'},
 {area:'Review',client:'Review activity and agree changes to the mandate.',bureau:'Provide dashboard visibility and review metrics against the agreed SLA.'},
];
