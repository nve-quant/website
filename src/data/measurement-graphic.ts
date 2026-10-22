// Editorial measurement definitions, not achieved results or promised dashboard fields.
export const measurementViews = [
  { id: 'cex', label: 'CEX order book', metrics: [
    {id:'spread', title:'Spread', question:'How far apart are the best quotes?', text:'Read the gap between the best bid and ask alongside available size. A narrow spread alone does not tell you how much can trade.'},
    {id:'depth', title:'Executable depth', question:'What size is available near the market?', text:'Assess the orders available within an agreed distance from the market, on both sides of the book.'},
    {id:'availability', title:'Quote availability', question:'When is two-sided liquidity present?', text:'Measure quoting against an agreed observation window and definition. Review interruptions and market conditions alongside the result.'},
  ]},
  { id: 'dex', label: 'DEX liquidity position', metrics: [
    {id:'allocation', title:'Active allocation', question:'Where is liquidity working?', text:'Compare the market price with position ranges. Capital outside an active range has a different role from liquidity available at the current price.'},
    {id:'impact', title:'Price impact', question:'How does trade size affect execution?', text:'Compare the execution available for defined trade sizes. Pool composition and the surrounding liquidity matter.'},
    {id:'economics', title:'Position economics', question:'What remains after costs and exposure?', text:'Review fees alongside transaction costs and changes in inventory value. Fee income alone is not the return on a position.'},
  ]},
] as const;
