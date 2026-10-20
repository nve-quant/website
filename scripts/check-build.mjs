import {existsSync, readFileSync, readdirSync} from 'node:fs';
import assert from 'node:assert/strict';
assert(!existsSync('dist/concepts'), 'Design concepts must not be built');
assert(!readFileSync('dist/index.html', 'utf8').includes('href="/concepts/'), 'Production index must not link to development routes');
console.log('Production isolation checks passed.');

assert(!existsSync('dist/review'), 'Review tooling must not be built');
assert(!existsSync('dist/studies'), 'Study index must not be built');

// Validate the complete static navigation graph, including cross-page anchors.
const pages=readdirSync('dist',{recursive:true}).filter(path=>path.endsWith('.html'));
const ids=new Map(pages.map(path=>[path,new Set([...readFileSync(`dist/${path}`,'utf8').matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]))]));
for(const page of pages){
 const html=readFileSync(`dist/${page}`,'utf8');
 assert(!html.includes('Editorial review:'),`${page}: editorial review notes must remain development-only`);
 assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,`${page}: one h1 required`);
 assert(html.includes('noindex,nofollow'),`${page}: local review must remain noindex`);
 const base=new URL(page==='index.html'?'/':`/${page.replace(/index\.html$/,'')}`,'https://local.invalid');
 for(const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)){
  const value=match[1];
  if(!value.startsWith('/')&&!value.startsWith('#'))continue;
  const url=new URL(value,base);
  if(url.origin!==base.origin)continue;
  const pathname=decodeURIComponent(url.pathname).replace(/^\//,'');
  const target=pathname.endsWith('/')?`${pathname}index.html`:ids.has(`${pathname}/index.html`)?`${pathname}/index.html`:pathname;
  assert(existsSync(`dist/${target}`),`${page}: missing local target ${value}`);
  if(url.hash&&ids.has(target))assert(ids.get(target).has(decodeURIComponent(url.hash.slice(1))),`${page}: missing anchor ${value}`);
 }
}
for(const route of ['market-making','dex-liquidity-management','work','company'])assert(ids.has(`${route}/index.html`),`Missing service route: ${route}`);
console.log(`Static page checks passed: ${pages.length} pages, local links/assets, anchors, h1 and noindex.`);
