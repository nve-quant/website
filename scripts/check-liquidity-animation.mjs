import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import ts from 'typescript';
import {bookGeometry,rangeGeometry} from '../src/scripts/liquidity-geometry.ts';

for(let t=0;t<64;t+=.05){
  const b=bookGeometry(t),r=rangeGeometry(t);
  const price=Number(b.price);
  assert(price>99&&price<101); assert(b.priceY>=68&&b.priceY<=214);
  assert.equal(b.bids.length,5);assert.equal(b.asks.length,5);
  for(const [rows,side] of [[b.bids,-1],[b.asks,1]]){
    rows.forEach((row,i)=>{
      assert(side<0?Number(row.price)<price:Number(row.price)>price);
      if(i)assert(Number(row.price)<Number(rows[i-1].price),'Ladder sorted from high to low');
      assert(Number(row.size)>0&&row.width<=174&&row.width>0);
    });
  }
  assert(Math.abs(Number(b.asks[4].price)-Number(b.bids[0].price)-.04)<1e-8);
  assert(r.left>=32&&r.left+r.width<=508);assert(r.price>=32&&r.price<=508);assert.equal(r.width,176);
  assert(!/NaN|Infinity/.test(r.bars+b.fill+b.line+b.volume));
}
const quotes=Array.from({length:9},(_,i)=>bookGeometry(i*.12));
assert(new Set(quotes.map(q=>q.price)).size>=5,'Multiple price updates per second');
assert.deepEqual(bookGeometry(.121).bids,bookGeometry(.239).bids,'Quotes stable between ticks');
assert(Math.abs(rangeGeometry(0).center-rangeGeometry(5-1e-5).center)<.001);
assert(Math.abs(rangeGeometry(0).price-rangeGeometry(5-1e-5).price)<.001);

// Exercise lifecycle without a browser: offscreen, hidden, pause, motion preference and teardown.
const pending=new Map();let next=0,observe;
globalThis.requestAnimationFrame=fn=>{pending.set(++next,fn);return next;};
globalThis.cancelAnimationFrame=id=>pending.delete(id);
globalThis.IntersectionObserver=class{constructor(fn){observe=fn;}observe(){}disconnect(){}};
const reduced=Object.assign(new EventTarget(),{matches:false});
globalThis.matchMedia=()=>reduced;
globalThis.document=Object.assign(new EventTarget(),{hidden:false});
globalThis.window=new EventTarget();
const source=await readFile(new URL('../src/scripts/liquidity-animation.ts',import.meta.url),'utf8');
const geometryURL=new URL('../src/scripts/liquidity-geometry.ts',import.meta.url).href;
const output=ts.transpileModule(source.replace("'./liquidity-geometry'",JSON.stringify(geometryURL)),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {initLiquidityAnimation}=await import(`data:text/javascript;base64,${Buffer.from(output).toString('base64')}`);
const attrs=new Map();const button=Object.assign(new EventTarget(),{hidden:true,setAttribute:(k,v)=>attrs.set(k,v)});
const label={textContent:''},phase={textContent:''};
const root={dataset:{liquidityAnimation:'dex'},querySelector:s=>s==='[data-motion-toggle]'?button:s==='[data-motion-label]'?label:phase,querySelectorAll:()=>[]};
initLiquidityAnimation(root);assert.equal(pending.size,0);
observe([{isIntersecting:true}]);assert.equal(pending.size,1);
button.dispatchEvent(new Event('click'));assert.equal(pending.size,0);assert.equal(attrs.get('aria-pressed'),'true');
observe([{isIntersecting:false}]);observe([{isIntersecting:true}]);assert.equal(pending.size,0,'User pause survives viewport changes');
button.dispatchEvent(new Event('click'));assert.equal(pending.size,1);
document.hidden=true;document.dispatchEvent(new Event('visibilitychange'));assert.equal(pending.size,0);
document.hidden=false;document.dispatchEvent(new Event('visibilitychange'));assert.equal(pending.size,1);
observe([{isIntersecting:false}]);assert.equal(pending.size,0);
observe([{isIntersecting:true}]);reduced.matches=true;reduced.dispatchEvent(new Event('change'));assert.equal(pending.size,0);assert.equal(button.hidden,true);
reduced.matches=false;reduced.dispatchEvent(new Event('change'));assert.equal(pending.size,1);assert.equal(button.hidden,false);
window.dispatchEvent(Object.assign(new Event('pagehide'),{persisted:true}));assert.equal(pending.size,0);
window.dispatchEvent(new Event('pageshow'));assert.equal(pending.size,1);
window.dispatchEvent(Object.assign(new Event('pagehide'),{persisted:false}));assert.equal(pending.size,0);
window.dispatchEvent(new Event('pageshow'));assert.equal(pending.size,0);
console.log('Liquidity checks passed: price/book consistency, quote cadence, range bounds, loop continuity, pause, visibility, reduced motion and teardown.');
