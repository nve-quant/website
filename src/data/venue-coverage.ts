// CEX coverage confirmed by owner via supplied DataIndexer SVG directory.
// DEX deployment details pending; okx-x is a duplicate mark.
// Operational coverage does not imply partnership or endorsement.
export interface CexVenue { name: string; logo?: string; }
export interface DexDeployment { protocol: string; networks: string[]; poolTypes: string[]; }
export const cexVenues: CexVenue[] = [
  {
    "name": "AscendEX",
    "logo": "/images/venues/ascendex.svg"
  },
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
    "name": "BitMart",
    "logo": "/images/venues/bitmart.svg"
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
    "name": "CoinEx",
    "logo": "/images/venues/coinex.svg"
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
export const dexDeployments: DexDeployment[] = [];
