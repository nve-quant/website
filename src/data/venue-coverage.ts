// CEX coverage confirmed by owner via supplied DataIndexer SVG directory.
// DEX protocol/version coverage owner-confirmed; chain support does not imply every protocol exists on every chain.
// okx-x is a duplicate mark. Hyperliquid product scope remains pending.
// Operational coverage does not imply partnership or endorsement.
export interface CexVenue { name: string; logo?: string; }
export interface DexDeployment { logo: string; protocol: string; networks: string[]; poolTypes: string[]; }
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
export const dexCoverageNote = 'We support EVM chains and Solana. Protocol availability depends on the chain; the engagement identifies the specific deployment and pool.';
export const dexDeployments: DexDeployment[] = [
 {logo:'/images/venues/uniswap.svg',protocol:'Uniswap',networks:['EVM'],poolTypes:['v3','v4']},
 {logo:'/images/venues/aerodrome.svg',protocol:'Aerodrome',networks:['EVM'],poolTypes:[]},
 {logo:'/images/venues/velodrome.svg',protocol:'Velodrome',networks:['EVM'],poolTypes:[]},
 {logo:'/images/venues/pancakeswap.png',protocol:'PancakeSwap',networks:['EVM'],poolTypes:[]},
 {logo:'/images/venues/raydium.svg',protocol:'Raydium',networks:['Solana'],poolTypes:['All pool types']},
 {logo:'/images/venues/meteora.svg',protocol:'Meteora',networks:['Solana'],poolTypes:['All pool types']},
 {logo:'/images/venues/orca.png',protocol:'Orca',networks:['Solana'],poolTypes:['All pool types']},
 {logo:'/images/venues/pumpswap.png',protocol:'PumpSwap',networks:['Solana'],poolTypes:['All pool types']},
];
