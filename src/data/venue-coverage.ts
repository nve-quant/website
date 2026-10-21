// CEX coverage confirmed by owner via supplied DataIndexer SVG directory.
// DEX protocol/version coverage owner-confirmed; chain support does not imply every protocol exists on every chain.
// okx-x is a duplicate mark. Hyperliquid product scope remains pending.
// Operational coverage does not imply partnership or endorsement.
export interface CexVenue { name: string; logo?: string; }
export interface DexDeployment {
 logo?: string;
 protocol: string;
 network: 'EVM' | 'Solana';
 category: 'pools' | 'launchpads' | 'trading';
 products: string[];
 chains?: string[];
 status: 'available' | 'coming-soon';
}
export const cexVenues: CexVenue[] = [
  {
    "name": "Binance",
    "logo": "/images/venues/binance.svg"
  },
  {
    "name": "BingX",
    "logo": "/images/venues/bingx.svg"
  },
  {
    "name": "Bitfinex",
    "logo": "/images/venues/bitfinex.svg"
  },
  {
    "name": "Bitget",
    "logo": "/images/venues/bitget.svg"
  },
  {
    "name": "Bithumb",
    "logo": "/images/venues/bithumb.svg"
  },
  {
    "name": "Bitstamp",
    "logo": "/images/venues/bitstamp.svg"
  },
  {
    "name": "Blockfinex",
    "logo": "/images/venues/blockfinex.svg"
  },
  {
    "name": "Bybit",
    "logo": "/images/venues/bybit.svg"
  },
  {
    "name": "Coinbase",
    "logo": "/images/venues/coinbase.svg"
  },
  {
    "name": "CoinDCX",
    "logo": "/images/venues/coindcx.svg"
  },
  {
    "name": "Coinone",
    "logo": "/images/venues/coinone.svg"
  },
  {
    "name": "CoinW",
    "logo": "/images/venues/coinw.svg"
  },
  {
    "name": "Crypto.com",
    "logo": "/images/venues/cryptocom.svg"
  },
  {
    "name": "DigiFinex",
    "logo": "/images/venues/digifinex.svg"
  },
  {
    "name": "Gate.io",
    "logo": "/images/venues/gateio.svg"
  },
  {
    "name": "HTX",
    "logo": "/images/venues/htx.svg"
  },
  {
    "name": "Indodax",
    "logo": "/images/venues/indodax.svg"
  },
  {
    "name": "Kraken",
    "logo": "/images/venues/kraken.svg"
  },
  {
    "name": "KuCoin",
    "logo": "/images/venues/kucoin.svg"
  },
  {
    "name": "MEXC",
    "logo": "/images/venues/mexc.svg"
  },
  {
    "name": "OKX",
    "logo": "/images/venues/okx.svg"
  },
  {
    "name": "Upbit",
    "logo": "/images/venues/upbit.svg"
  },
  {
    "name": "WEEX",
    "logo": "/images/venues/weex.svg"
  },
  {
    "name": "XT.com",
    "logo": "/images/venues/xt.svg"
  }
];
// Supported registry + connector families in the owner's uniswap-mm repository.
// This is deployment scope, not a claim of client operation on every chain.
export const evmChains = ['Ethereum', 'Arbitrum', 'Optimism', 'Polygon', 'Base', 'BNB Chain'];
export const dexDeployments: DexDeployment[] = [
 {logo:'/images/venues/uniswap.svg',protocol:'Uniswap',network:'EVM',category:'pools',products:['v3','v4'],chains:evmChains,status:'available'},
 {logo:'/images/venues/aerodrome.svg',protocol:'Aerodrome',network:'EVM',category:'pools',products:['Slipstream','Classic stable & volatile'],chains:['Base'],status:'available'},
 {logo:'/images/venues/velodrome.svg',protocol:'Velodrome',network:'EVM',category:'pools',products:['Slipstream'],chains:['Optimism'],status:'available'},
 // PancakeSwap is separately owner-confirmed. This repo does not establish its versions or chain mappings.
 {logo:'/images/venues/pancakeswap.png',protocol:'PancakeSwap',network:'EVM',category:'pools',products:[],status:'available'},
 // Owner confirmed trading venues in the recovered SOL_DEX_MM_2 inventory for publication.
 // Launch curves, spot order books and proprietary AMMs are not LP-position products.
 // Aggregators (Jupiter, DFlow, OKX routing), Jito and base programs are deliberately excluded.
 {logo:'/images/venues/raydium.svg',protocol:'Raydium',network:'Solana',category:'pools',products:['AMM v4','CPMM','CLMM'],status:'available'},
 {logo:'/images/venues/meteora.svg',protocol:'Meteora',network:'Solana',category:'pools',products:['DLMM','DAMM v1','DAMM v2'],status:'available'},
 {logo:'/images/venues/orca.png',protocol:'Orca',network:'Solana',category:'pools',products:['Whirlpools'],status:'available'},
 {logo:'/images/venues/pumpswap.png',protocol:'PumpSwap',network:'Solana',category:'pools',products:['Constant-product AMM'],status:'available'},
 {logo:'/images/venues/raydium.svg',protocol:'Raydium LaunchLab',network:'Solana',category:'launchpads',products:['Bonding curves'],status:'available'},
 {logo:'/images/venues/meteora.svg',protocol:'Meteora DBC',network:'Solana',category:'launchpads',products:['Dynamic Bonding Curve'],status:'available'},
 {logo:'/images/venues/pumpswap.png',protocol:'Pump.fun',network:'Solana',category:'launchpads',products:['Bonding curves'],status:'available'},
 {logo:'/images/venues/moonit.png',protocol:'Moonit',network:'Solana',category:'launchpads',products:['Bonding curves'],status:'available'},
 {logo:'/images/venues/phoenix.webp',protocol:'Phoenix',network:'Solana',category:'trading',products:['Spot order book'],status:'available'},
 {logo:'/images/venues/solfi.webp',protocol:'SolFi',network:'Solana',category:'trading',products:['Proprietary AMM'],status:'available'},
 {logo:'/images/venues/tessera.png',protocol:'Tessera V',network:'Solana',category:'trading',products:['Proprietary AMM'],status:'available'},
 {logo:'/images/venues/zerofi.png',protocol:'ZeroFi',network:'Solana',category:'trading',products:['Proprietary AMM'],status:'available'},
 // Coming soon is Bureau's service status, not the chain's launch status.
 {logo:'/images/venues/uniswap.svg',protocol:'Uniswap',network:'EVM',category:'pools',products:['v4'],chains:['Robinhood Chain'],status:'coming-soon'},
 {logo:'/images/venues/pools-trade.svg',protocol:'Pools.trade',network:'EVM',category:'launchpads',products:['Crowd Launch','Instant Launch'],chains:['Robinhood Chain'],status:'coming-soon'},
];
