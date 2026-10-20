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
  for(const [depth,rows] of [[b.depth.bids,b.bids],[b.depth.asks,[...b.asks].reverse()]]){
    let cumulative=0;
    depth.points.forEach((point,i)=>{
      cumulative+=Number(rows[i].size);
      assert.equal(point.price,Number(rows[i].price));
      assert.equal(point.size,cumulative,'Depth must use the displayed book sizes');
      assert(point.x>=350&&point.x<=524&&point.y>=78&&point.y<=252);
      if(i)assert(point.y<depth.points[i-1].y,'Depth grows away from the spread');
    });
  }
  assert(r.left>=32&&r.left+r.width<=508);assert(r.price>=32&&r.price<=508);assert.equal(r.width,176);
  assert(Math.abs(r.price-r.center)<32,'Managed range follows price without the previous long lag');
  for(const level of r.poolLevels){
    assert.equal(level.total,level.other+level.managed,'Pool liquidity includes the managed position');
    assert(level.managed>=0&&level.managed<=116,'Managed allocation stays within its height bounds');
    assert(level.total>0&&level.total<=181,'Pool bars remain inside the plot');
  }
  assert(!/NaN|Infinity/.test(r.bars+b.fill+b.line+b.volume));
}
const quotes=Array.from({length:9},(_,i)=>bookGeometry(i*.12));
assert(new Set(quotes.map(q=>q.price)).size>=5,'Multiple price updates per second');
assert.deepEqual(bookGeometry(.121).bids,bookGeometry(.239).bids,'Quotes stable between ticks');
// Old bars translate left by elapsed time; they must never change height.
const volumeBars=time=>[...bookGeometry(time).volume.matchAll(/M(-?[\d.]+) 252v-([\d.]+)/g)].map(([,x,h])=>({x:Number(x),h:Number(h)}));
for(const time of [0,.11,.25,1.34,8.51]){
  for(const delta of [.04,.13,.39]){
    const after=volumeBars(time+delta),shift=delta/.12*(284/95);
    for(const bar of volumeBars(time).filter(bar=>bar.x-shift>=20)){
      const moved=after.find(next=>Math.abs(next.x-(bar.x-shift))<.02);
      assert(moved,'Historical volume bar stays attached to its time sample');
      assert.equal(moved.h,bar.h,'Historical volume must not be rewritten');
    }
  }
}
assert(Math.abs(rangeGeometry(0).center-rangeGeometry(5-1e-5).center)<.001);
assert(Math.abs(rangeGeometry(0).price-rangeGeometry(5-1e-5).price)<.001);
assert.equal(rangeGeometry(.75).center,270,'A small explanatory delay remains');
assert(rangeGeometry(.9).center>270,'Repositioning starts soon after price movement');
for(const t of [.9,1.3,2.8,3.3,4.5]){
  assert(Math.abs(rangeGeometry(t).center-rangeGeometry(t-.1875).price)<1e-8,'Range tracks the delayed price path');
}
const profile=rangeGeometry(0);
assert(profile.managedLevels[10].height<profile.managedLevels[4].height,'Managed centre is thinner than its shoulders');
assert(profile.managedLevels[0].height<profile.managedLevels[4].height,'Outer edges taper beyond the shoulders');
assert.deepEqual(profile.managedLevels.map(l=>l.height),profile.managedLevels.map(l=>l.height).reverse(),'Managed profile is balanced around its centre');
const nearestPool=x=>profile.poolLevels.reduce((a,b)=>Math.abs(b.x+3.5-x)<Math.abs(a.x+3.5-x)?b:a);
assert(nearestPool(270).total<nearestPool(214).total&&nearestPool(270).total<nearestPool(326).total,'Pool has less liquidity in the centre than at both shoulders');

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

// Tabs change only the presentation, including while animation is paused.
const element=extra=>Object.assign(new EventTarget(),{attrs:new Map(),setAttribute(k,v){this.attrs.set(k,v);},focus(){this.focused=true;}},extra);
const tabs=['book','depth'].map(view=>element({id:`cex-${view}-tab`,dataset:{marketView:view}}));
const panel=element(),bookView=element(),depthView=element(),title=element(),description=element({textContent:'Original order book description'}),tablist=element({hidden:true}),legend={hidden:false};
const cexButton=element({hidden:true}),cexLabel={textContent:''};
const elements={'[data-motion-toggle]':cexButton,'[data-motion-label]':cexLabel,'[data-phase]':phase,'[data-market-panel]':panel,'[data-book-view]':bookView,'[data-depth-view]':depthView,'[data-chart-title]':title,'#cex-chart-description':description,'[data-view-tabs]':tablist,'.legend-own':{parentElement:legend}};
const cexRoot={dataset:{liquidityAnimation:'cex'},querySelector:s=>elements[s],querySelectorAll:s=>s==='[data-market-view]'?tabs:[]};
initLiquidityAnimation(cexRoot);
observe([{isIntersecting:true}]);cexButton.dispatchEvent(new Event('click'));assert.equal(pending.size,0);
tabs[1].dispatchEvent(new Event('click'));
assert.equal(depthView.attrs.get('display'),'inline');assert.equal(bookView.attrs.get('display'),'none');
assert.equal(tabs[1].attrs.get('aria-selected'),'true');assert.equal(panel.attrs.get('aria-labelledby'),tabs[1].id);assert(legend.hidden);
assert.equal(pending.size,0,'Changing view must preserve pause');
tabs[1].dispatchEvent(Object.assign(new Event('keydown',{cancelable:true}),{key:'ArrowLeft'}));
assert.equal(tabs[0].attrs.get('aria-selected'),'true');assert(tabs[0].focused);assert.equal(tabs[1].tabIndex,-1);
assert.equal(description.textContent,'Original order book description');assert(!legend.hidden);
reduced.matches=true;reduced.dispatchEvent(new Event('change'));
tabs[1].dispatchEvent(new Event('click'));assert.equal(depthView.attrs.get('display'),'inline');assert.equal(pending.size,0,'Tabs work with reduced motion');
window.dispatchEvent(Object.assign(new Event('pagehide'),{persisted:false}));
console.log('Liquidity checks passed: stable historical volume, book/depth consistency, tabs, quote cadence, range bounds, loop continuity, pause, visibility, reduced motion and teardown.');
