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

### Additional Robinhood-native venue marks
- GIGA DEX: https://gigadex.app/giga-icon.png (official 150×150 transparent PNG, 1,833 bytes).
- Pons: https://docs.ponsfamily.com/pons.png (official documentation logo, 256×256 transparent PNG, 43,277 bytes).
Both downloaded unchanged, inspected visually, stored locally and rendered at 40 CSS pixels. Public page/documentation asset links provide provenance. SVG versions were not identified in the accessible local collection or these first-party pages; these remain genuine raster assets. No tracing, generated brand artwork, raster-to-SVG wrappers or remote runtime requests.

### Owner SVG uploads and requested vector reconstruction — 21 October 2026
- Owner upload cake.svg moved unchanged to public/images/venues/pancakeswap.svg (3,122 bytes).
- Owner upload pump.svg moved unchanged to public/images/venues/pump.svg (2,653 bytes); shared by Pump.fun and PumpSwap.
- Owner upload orca.svg moved unchanged to public/images/venues/orca.svg (3,890 bytes).
- Superseded PancakeSwap, Pump and Orca PNGs removed. Moonit logo removed with its directory entry.
- public/images/venues/solfi.svg: reconstruction from the previously sourced SolFi image. Original wordmark outlined with Potrace; circular ring/spokes rebuilt as mathematical paths with gradients. Approximately 4 KB, 1.6 KB gzip.
- public/images/venues/tessera.svg: colour contours traced from the existing Tessera V avatar using VTracer, with SVG gradients, a smooth sphere clip and static sub-pixel blending. Approximately 131 KB, 43 KB gzip. This preserves the blue/pink sphere treatment but simplifies the photographic surface; it is not a newly discovered official vector master.
- Both reconstructions contain vector paths/gradients only, with no image element, embedded raster, scripts or external dependencies. Tessera uses a static SVG blur filter; neither adds a runtime animation or site script.
- Raster source files retained at docs/reference-assets/venues/solfi.webp and docs/reference-assets/venues/tessera.png. Earlier source URLs remain the provenance. Native-size and actual 40px Chrome comparison saved in docs/screenshots/venue-vector-comparison.png.

### Transparent Tessera/SolFi and Jupiter Studio — 21 October 2026
Removed the full-canvas background path from tessera.svg and solfi.svg. Tessera retains its sphere/halo only. SolFi's white lettering and light ring were adapted to a dark-on-light monochrome variant so transparency remains readable on the website; geometry is unchanged.

Owner supplied jup.svg, archived unchanged at docs/reference-assets/venues/jup-original.svg. public/images/venues/jupiter-studio.svg retains its paths and circular badge with Studio's warm-to-mint spectrum, visually matched to https://studio.jup.ag/images/banner.jpg, linked by the official https://studio.jup.ag/ homepage. This is a colour adaptation of the supplied master, not a newly downloaded official Studio SVG. Gradient colours: #FFCE6B, #FFA46F, #F398BF, #B6A9DD, #94D5BA, #79E5DD. Original standard Jupiter colours remain in the archived source.

### Live brand adaptation and original scenario graphics
The outlined B geometry in SiteHeader.astro and public/favicon.svg is adapted from the owner-owned live homepage's inline 64×64 brand SVG, inspected 21 October 2026 at https://onchainbureau.com/. Colours and adjacent text follow the local design. No new external image dependency.
MarketScenarios.astro contains four original vector explanations, backed by src/data/market-scenarios.ts. These are illustrative diagrams, not screenshots, exchange data or client results. Existing locally installed OFL Newsreader font is reused. Dark gallery changes only its surrounding CSS and matte ground colour; specimen meshes and textures are unchanged.
