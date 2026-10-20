// Illustrative design questions, not claims about a specific instrument or live market.
export const marketModels = [
  {
    id: 'gold', label: 'Precious metals', object: 'A claim on physical metal',
    title: 'A familiar asset. A different market.',
    intro: 'The reference may come from the underlying metal’s market. The token still has its own trading venues, access rules and redemption terms.',
    reference: 'A reference for the underlying metal',
    liquidity: 'Inventory across pools and order books',
    redemption: 'Defined by the issuer and custodian',
    question: 'What happens when the reference market closes?',
    answer: 'The design needs rules for reference age, trading hours and the next price update. A token can trade around the clock while its reference does not.',
    route: ['Metal reference', 'Token market', 'Issuer redemption'],
    source: 'https://onchainbureau.com/research/tokenized-gold-thin-markets',
  },
  {
    id: 'fund', label: 'Yield-bearing fund', object: 'A share in an underlying portfolio',
    title: 'The value changes. The market must follow.',
    intro: 'A fund share links trading to a portfolio valuation. How yield accrues and when that valuation updates both matter to the market design.',
    reference: 'A published net asset value (NAV)',
    liquidity: 'Positions aligned with valuation updates',
    redemption: 'The fund’s dealing and settlement windows',
    question: 'Who keeps the yield when a share changes hands?',
    answer: 'An accruing share and a distributing share behave differently. The token’s structure needs to make the holder’s entitlement clear before liquidity is designed.',
    route: ['Portfolio NAV', 'Share market', 'Fund redemption'],
    source: 'https://onchainbureau.com/rwa#token-design',
  },
  {
    id: 'stock', label: 'Tokenized stock', object: 'A share certificate, reinterpreted onchain',
    title: 'A stock reference. A defined set of rights.',
    intro: 'A token can represent an issuer’s share or a separate claim linked to it. The structure determines what the holder owns and how the token connects to the underlying market.',
    reference: 'The underlying share’s market price',
    liquidity: 'Trading hours, venue access and available inventory',
    redemption: 'Transfer or exit terms defined by the structure',
    question: 'What happens to dividends, votes and stock splits?',
    answer: 'Those rights and events need explicit treatment in the token’s terms. A matching price does not by itself establish identical shareholder rights.',
    route: ['Share reference', 'Token market', 'Defined holder rights'],
    source: 'https://www.sec.gov/newsroom/speeches-statements/corp-fin-statement-tokenized-securities-012826-statement-tokenized-securities',
  },
  {
    id: 'unique', label: 'Unique asset', object: 'An asset with its own characteristics',
    title: 'Two assets. Not necessarily one price.',
    intro: 'An emerald, a building or a single lot may differ from every other unit. The first question is what can reasonably trade together.',
    reference: 'An appraisal or asset-specific valuation',
    liquidity: 'A lot, a grade or a pooled structure',
    redemption: 'Specific to the asset and its legal structure',
    question: 'Can these assets share the same pool?',
    answer: 'A shared category is not enough. Consider the differences between individual units before choosing a pool, a graded structure or an auction.',
    route: ['Asset valuation', 'Market structure', 'Asset-specific exit'],
    source: 'https://onchainbureau.com/research/assets-that-differ-unit-by-unit',
  },
  {
    id: 'commodities', label: 'Commodities', object: 'A physical commodity, with defined delivery terms',
    title: 'The specification shapes the contract.',
    intro: 'Oil and wheat make the underlying questions tangible: what is represented, where it is held and how a holder can exit. The illustration is a starting point for defining the instrument.',
    reference: 'A benchmark matched to the contract specification',
    liquidity: 'Inventory and venues appropriate to the instrument',
    redemption: 'Agreed delivery or settlement terms',
    question: 'What needs to be defined before a market can trade?',
    answer: 'Set out the commodity, quality, quantity, location and settlement terms. Then establish how the token relates to that specification and who fulfils each obligation.',
    route: ['Contract specification', 'Token market', 'Agreed settlement'],
    source: null,
  },
] as const;
export type MarketModelId = typeof marketModels[number]['id'];

/** Original illustrative specimens, not available products or certified holdings. */
export const assetVariants = {
  gold: [{id:'gold',label:'Gold',detail:'Cast bullion'}, {id:'silver',label:'Silver',detail:'Cast bullion'}, {id:'palladium',label:'Palladium',detail:'Cast bullion'}, {id:'platinum',label:'Platinum',detail:'Cast bullion'}],
  fund: [{id:'fund',label:'Fund share',detail:'Underlying portfolio'}],
  stock: [{id:'stock',label:'Share certificate',detail:'Illustrative specimen'}],
  unique: [{id:'emerald',label:'Emerald',detail:'Emerald cut'}, {id:'ruby',label:'Ruby',detail:'Oval cut'}, {id:'sapphire',label:'Sapphire',detail:'Cushion cut'}, {id:'diamond',label:'Diamond',detail:'Round brilliant study'}],
  commodities: [{id:'oil',label:'Crude oil',detail:'Steel drum'}, {id:'wheat',label:'Wheat',detail:'Harvest sheaf'}],
} as const satisfies Record<MarketModelId, readonly {id:string;label:string;detail:string}[]>;
export type AssetVariantId = typeof assetVariants[MarketModelId][number]['id'];
