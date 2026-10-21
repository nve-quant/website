// CEX coverage confirmed by owner via supplied DataIndexer SVG directory.
// DEX protocol/version coverage owner-confirmed; chain support does not imply every protocol exists on every chain.
// okx-x is a duplicate mark. Hyperliquid product scope remains pending.
// Operational coverage does not imply partnership or endorsement.
export interface CexVenue { name: string; logo?: string; }
export interface DexDeployment {
 logo?: string;
 protocol: string;
 networks: ('EVM' | 'Solana')[];
 poolTypes: string[];
 launchTypes?: string[];
 marketTypes?: string[];
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
export const dexCoverageNote = 'We support EVM chains and Solana. Protocol availability depends on the chain; the engagement identifies the specific deployment and pool.';
export const dexDeployments: DexDeployment[] = [
 {logo:'/images/venues/uniswap.svg',protocol:'Uniswap',networks:['EVM'],poolTypes:['v3','v4']},
 {logo:'/images/venues/aerodrome.svg',protocol:'Aerodrome',networks:['EVM'],poolTypes:[]},
 {logo:'/images/venues/velodrome.svg',protocol:'Velodrome',networks:['EVM'],poolTypes:[]},
 {logo:'/images/venues/pancakeswap.png',protocol:'PancakeSwap',networks:['EVM'],poolTypes:[]},
 // Owner confirmed trading venues in the recovered SOL_DEX_MM_2 inventory for publication.
 // Launch curves, spot order books and proprietary AMMs are not LP-position products.
 // Aggregators (Jupiter, DFlow, OKX routing), Jito and base programs are deliberately excluded.
 {logo:'/images/venues/raydium.svg',protocol:'Raydium',networks:['Solana'],poolTypes:['AMM v4','CPMM','CLMM'],launchTypes:['LaunchLab']},
 {logo:'/images/venues/meteora.svg',protocol:'Meteora',networks:['Solana'],poolTypes:['DLMM','DAMM v1','DAMM v2'],launchTypes:['Dynamic Bonding Curve (DBC)']},
 {logo:'/images/venues/orca.png',protocol:'Orca',networks:['Solana'],poolTypes:['Whirlpools']},
 {logo:'/images/venues/pumpswap.png',protocol:'PumpSwap',networks:['Solana'],poolTypes:['Constant-product AMM']},
 {logo:'/images/venues/pumpswap.png',protocol:'Pump.fun',networks:['Solana'],poolTypes:[],launchTypes:['Bonding curves']},
 {logo:'/images/venues/moonit.png',protocol:'Moonit',networks:['Solana'],poolTypes:[],launchTypes:['Bonding curves']},
 {logo:'/images/venues/phoenix.webp',protocol:'Phoenix',networks:['Solana'],poolTypes:[],marketTypes:['Spot order book']},
 {logo:'/images/venues/solfi.webp',protocol:'SolFi',networks:['Solana'],poolTypes:[],marketTypes:['Proprietary AMM']},
 {logo:'/images/venues/tessera.png',protocol:'Tessera V',networks:['Solana'],poolTypes:[],marketTypes:['Proprietary AMM']},
 {logo:'/images/venues/zerofi.png',protocol:'ZeroFi',networks:['Solana'],poolTypes:[],marketTypes:['Proprietary AMM']},
];
