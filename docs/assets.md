# Assets and licensing

- Public Sans: self-hosted from @fontsource/public-sans, weights 400/500. SIL Open Font License 1.1; licence copy is docs/licenses/public-sans.txt.
- Newsreader: self-hosted from @fontsource/newsreader, weight 400. SIL Open Font License 1.1; licence copy is docs/licenses/newsreader.txt.
- Geometric emerald study: original inline SVG created for this project; illustrative, not a photograph or appraisal of a real asset.
- Operating diagram and wordmark treatment: original HTML/CSS studies. Wordmark is provisional, not a final logo.
- Existing site's favicon and IBM Plex Sans URLs are inventoried but not reused. Confirm licensing/source files if subsequently retained.
- No external font requests, stock imagery, customer logos or third-party icon library.

- Three.js 0.186.1: MIT-licensed rendering library; licence in docs/licenses/three.txt. All three scene geometries and fallback SVGs are original procedural illustrations, not product screenshots or representations of specific investments. RoomEnvironment provides procedural lighting without a downloaded image.

- Product-study model modules in src/scripts/models: original gold geometry/maps, fund certificate geometry/guilloché maps and emerald-cut geometry. Generated canvas maps are created locally at runtime, with no asset downloads. Gold stamps use original Onchain Bureau specimen artwork; no third-party hallmark is reproduced.
- Studio lighting is now an original procedural softbox environment, replacing RoomEnvironment.


### Stock certificate
`src/scripts/models/stock.ts` and the stock SVG in `AssetMarket.astro` contain original procedural artwork: engraved borders, rosettes, architectural vignette, paper fibres, curved sheet geometry and specimen foil seal. Canvas lettering uses system Georgia/sans-serif; no font or artwork is downloaded. The paper is an illustrative design study without an issuer identity, completed signature or certification claim.

### Venue identification marks
27 SVGs in public/images/venues copied from the owner-supplied DataIndexer/frontend/src/assets/venues/crypto directory following explicit coverage/public-site instructions. Original third-party brand artwork, used to identify supported venues, not original Onchain Bureau art or endorsements. No ownership or blanket licence asserted. Source provenance is owner-supplied; retain appropriate trademark usage. Blockfinex SVG contains an embedded PNG. Total files approximately 89 KB; lazy-loaded via img, no executable SVG embedding. PNG-only and DEX assets omitted pending scope confirmation. This supersedes the earlier statement that no third-party logos are used.

### DEX protocol marks
Local identification artwork, not endorsement claims. Uniswap copied from the owner-supplied DataIndexer directory. Other source assets:
- Aerodrome: https://aerodrome.finance/svg/AERO/favicon.svg (3.2 KB official vector, replacing the much larger supplied illustration).
- Velodrome: https://velodrome.finance/svg/VELO/favicon.svg
- Meteora: https://www.meteora.ag/icons/v2.svg
- PancakeSwap: https://pancakeswap.finance/logo.png
- Raydium: https://raw.githubusercontent.com/raydium-io/media-assets/master/logo.svg
- Orca: official orca-so GitHub organisation avatar, https://avatars.githubusercontent.com/u/74166425?v=4&s=128
- PumpSwap: Pump.fun organisation's shared brand mark, https://avatars.githubusercontent.com/u/148890315?v=4&s=128 (not a newly drawn PumpSwap-specific logo).
PNG marks visually inspected. SVGs checked for active/external content. Images load locally and lazily; trademarks remain with their owners. No third-party tracking or remote runtime asset dependency.

### Additional Solana venue identification
- Pump.fun reuses the previously sourced Pump.fun brand mark also used for PumpSwap. Visible names distinguish the two programs.
- Moonit: https://moon.it/apple-touch-icon.png (official 180px PNG).
- Phoenix spot: https://icons.llamao.fi/icons/protocols/phoenix-spot (400px WebP); exact Solana spot entry, not the unrelated Phoenix-branded protocols or the newer perpetual product.
- SolFi: https://icons.llamao.fi/icons/protocols/solfi-v1 (303px WebP); project metadata links to https://x.com/SolFiAMM.
- Tessera V: https://static1.tokenterminal.com//tesserav/logo.png?logo_hash=ef2333cc38612682e99fa92a8cbd8fbee7405dc9 (256px PNG, project-specific image from https://tokenterminal.com/explorer/projects/tesserav).
- ZeroFi: https://static1.tokenterminal.com//zerofi/logo.png?logo_hash=710e16191d115c51dd362877a24225f3c8138f38 (256px PNG, project-specific image from https://tokenterminal.com/explorer/projects/zerofi).

The DefiLlama and Token Terminal assets are third-party venue-identification sources, not independently supplied official brand kits. They are not claimed as original art or broadly licensed assets. The generic question-mark avatars returned for Tessera/ZeroFi by the first registry were rejected. All final marks visually inspected, stored locally, rendered via lazy-loaded images with visible venue names, and used only for identification. Five new images total approximately 119 KiB; no remote requests at runtime.

`public/favicon.svg`: original geometric OB monogram using the established site colours; added after browser review found the missing default favicon request. Not copied from a venue or stamped onto asset models.

### Robinhood coming-soon launchpad identification
Pools.trade: https://pools.trade/favicon.svg, copied unchanged to public/images/venues/pools-trade.svg (2,596 bytes). Official vector with embedded gradients only; no scripts, external references or runtime fetches. Used to identify planned coverage, not a partnership. Uniswap v4 reuses the existing Uniswap mark. LaunchLab and Meteora DBC reuse Raydium/Meteora marks with distinct visible product names.
