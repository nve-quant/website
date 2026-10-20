import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import ts from 'typescript';
import {bookGeometry,rangeGeometry} from '../src/scripts/liquidity-geometry.ts';

for(let t=0;t<64;t+=.05){
  const b=bookGeometry(t),r=rangeGeometry(t);
  for(const [line,side] of [[b.bidLine,-1],[b.askLine,1]]){
    const levels=[...line.matchAll(/H([\d.]+)V([\d.]+)/g)].map(m=>[+m[1],+m[2]]);
    assert.equal(levels.length,24);
    levels.forEach(([x,y],i)=>{assert(side<0?x<b.mid:x>b.mid);assert(y>=54&&y<236);if(i)assert(y<levels[i-1][1]);});
  }
  assert(r.left>=32&&r.left+r.width<=508);assert(r.price>=32&&r.price<=508);assert.equal(r.width,176);
  assert(!/NaN|Infinity/.test(r.bars+b.bidFill+b.askFill));
}
assert(Math.abs(rangeGeometry(0).center-rangeGeometry(16-1e-5).center)<.001);

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
console.log('Liquidity checks passed: depth geometry, range bounds, loop continuity, pause, visibility, reduced motion and teardown.');
