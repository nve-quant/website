// Editorial drafts adapted from the existing site's service descriptions.
// Capability claims must be confirmed before publication; see content inventory.
export const services = [
 {name:'Market design',for:'For issuers and tokenization platforms',summary:'Define the market before you build it.',detail:'Start with the reference price, redemption terms and the venues where your asset trades. Set the trading hours, inventory and operating limits around those conditions.',source:'https://onchainbureau.com/rwa'},
 {name:'Pools and hooks',for:'For onchain asset markets',summary:'Connect pool behaviour to the asset’s terms.',detail:'Design how liquidity is placed and how a pool responds when the reference price changes, becomes stale or stops updating. Where an asset requires access rules, account for those rules in the market design.',source:'https://onchainbureau.com/pools'},
 {name:'Market making',for:'For issuers and crypto teams',summary:'Support two-sided markets across venues.',detail:'Quote bids and offers on order books and pools, with the pairs, inventory, depth targets and operating limits defined in the engagement.',source:'https://onchainbureau.com/market-making'},
 {name:'Treasury execution',for:'For token treasuries',summary:'Turn a treasury decision into an execution plan.',detail:'Plan spot buying, selling and rebalancing around the assets, amounts, venues and schedule. Review execution against the agreed plan.',source:'https://onchainbureau.com/treasury'},
 {name:'Distribution',for:'For assets seeking counterparties',summary:'Find the right venues and counterparties.',detail:'Identify relevant exchanges, lending markets and prospective holders, and prepare the material for their review. Listing and allocation decisions remain with the counterparty.',source:'https://onchainbureau.com/algorithmic-marketing'},
];
export const steps = [
 {title:'Understand the asset',text:'Review its structure, existing markets, reference price and redemption terms.'},
 {title:'Agree the mandate',text:'Define the venues, access, capital, operating limits and reporting requirements.'},
 {title:'Operate and review',text:'Review execution, liquidity and exceptions against the agreed scope.'},
];
