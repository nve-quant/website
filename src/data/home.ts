// Core positioning supplied by the owner; supporting copy adapted from the existing site.
// Capability claims must be confirmed before publication; see content inventory.
export const services = [
 {name:'Market design',for:'For issuers and tokenization platforms',summary:'Define the market before you build it.',detail:'Start with the reference price, redemption terms and the venues where your asset trades. Set the trading hours, inventory and operating limits around those conditions.',source:'https://onchainbureau.com/rwa'},
 {name:'Pool design and hooks',for:'For onchain asset markets',summary:'Connect pool behaviour to the asset’s terms.',detail:'Design how liquidity is placed and how a pool responds when the reference price changes, becomes stale or stops updating. Where an asset requires access rules, account for those rules in the market design.',source:'https://onchainbureau.com/pools'},
 {name:'Treasury execution',for:'For token treasuries',summary:'Turn a treasury decision into an execution plan.',detail:'Plan spot buying, selling and rebalancing around the assets, amounts, venues and schedule. Review execution against the agreed plan.',source:'https://onchainbureau.com/treasury'},
 {name:'Distribution',for:'For assets seeking counterparties',summary:'Find the right venues and counterparties.',detail:'Identify relevant exchanges, lending markets and prospective holders, and prepare the material for their review. Listing and allocation decisions remain with the counterparty.',source:'https://onchainbureau.com/algorithmic-marketing'},
];
export const steps = [
 {title:'Review your markets',text:'Start with your token, trading pairs, existing venues and liquidity needs.'},
 {title:'Agree the mandate',text:'Define the venues, access, capital, operating limits and reporting requirements.'},
 {title:'Operate and review',text:'Review execution, liquidity and exceptions against the agreed scope.'},
];

// Owner clarification, 2026-10-20. No measured latency or performance guarantees.
export const homepage = {
 title: 'Market making on CEX and DEX',
 description: 'Market making as a service. Low-latency liquidity management on centralized exchanges and concentrated-liquidity management on decentralized exchanges.',
 intro: 'We manage liquidity for token issuers and crypto teams. Low-latency market making on centralized exchanges. Active concentrated-liquidity management on DEXs.',
};
export const coreServices = [
 {
  id: 'cex', label: 'Centralized exchanges', title: 'CEX market making',
  intro: 'Low-latency liquidity management on exchange order books.',
  detail: 'Manage bids, offers and inventory around your trading pairs. Quoting responds to market conditions within the limits of an agreed mandate.',
  scope: ['Two-sided quoting', 'Inventory management', 'Execution limits'],
  contact: 'Discuss CEX market making',
 },
 {
  id: 'dex', label: 'Decentralized exchanges', title: 'DEX liquidity management',
  intro: 'Active management of concentrated-liquidity positions.',
  detail: 'Set liquidity ranges around your market. Monitor positions and adjust their allocation as prices move, with capital and risk limits defined upfront.',
  scope: ['Range selection', 'Position rebalancing', 'Capital allocation'],
  contact: 'Discuss DEX liquidity',
 },
] as const;
