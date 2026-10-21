import { defineConfig } from 'astro/config';
export default defineConfig({ vite: {optimizeDeps: {include: ['three', 'three/addons/geometries/RoundedBoxGeometry.js']}}, output: 'static', devToolbar: {enabled: false}, integrations: [{name: 'local-concepts', hooks: {'astro:config:setup': ({command, injectRoute, updateConfig}) => {
  // Keep build/check dependency optimization from invalidating a running preview.
  updateConfig({vite: {cacheDir: `node_modules/.vite-${command}`}});
  if (command === 'dev') {
 injectRoute({pattern: '/concepts/[direction]', entrypoint: './src/concepts.astro'});
 injectRoute({pattern: '/studies', entrypoint: './src/studies.astro'});
 injectRoute({pattern: '/asset-review', entrypoint: './src/asset-review.astro'});
 injectRoute({pattern: '/review', entrypoint: './src/review.astro'});
 }
}}}] });
