import { defineConfig } from 'astro/config';
export default defineConfig({ output: 'static', devToolbar: {enabled: false}, integrations: [{name: 'local-concepts', hooks: {'astro:config:setup': ({command, injectRoute}) => {
  if (command === 'dev') {
 injectRoute({pattern: '/concepts/[direction]', entrypoint: './src/concepts.astro'});
 injectRoute({pattern: '/studies', entrypoint: './src/studies.astro'});
 injectRoute({pattern: '/review', entrypoint: './src/review.astro'});
 }
}}}] });
