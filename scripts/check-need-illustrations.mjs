import assert from 'node:assert/strict';
import {needLiquidityBands} from '../src/data/need-liquidity.ts';
import {initNeedIllustrations} from '../src/scripts/need-illustrations.ts';

let observe;
globalThis.IntersectionObserver=class{constructor(callback){observe=callback;}observe(){}};
const reduced=Object.assign(new EventTarget(),{matches:false});
globalThis.matchMedia=()=>reduced;
globalThis.document=Object.assign(new EventTarget(),{hidden:false});
globalThis.window=new EventTarget();
const diagrams=Array.from({length:4},()=>({running:false,toggleAttribute(name,value){assert.equal(name,'data-running');this.running=value;}}));
const attributes=new Map();
const button=Object.assign(new EventTarget(),{hidden:true,textContent:'',setAttribute:(key,value)=>attributes.set(key,value)});
initNeedIllustrations({querySelectorAll:()=>diagrams,querySelector:()=>button});
const running=value=>assert(diagrams.every(diagram=>diagram.running===value));
running(false);
observe([{isIntersecting:true}]);running(true);
button.dispatchEvent(new Event('click'));running(false);
assert.equal(button.textContent,'Resume illustrations');assert.equal(attributes.get('aria-pressed'),'true');
observe([{isIntersecting:false}]);observe([{isIntersecting:true}]);running(false);
button.dispatchEvent(new Event('click'));running(true);
document.hidden=true;document.dispatchEvent(new Event('visibilitychange'));running(false);
document.hidden=false;document.dispatchEvent(new Event('visibilitychange'));running(true);
reduced.matches=true;reduced.dispatchEvent(new Event('change'));running(false);assert(button.hidden);
reduced.matches=false;reduced.dispatchEvent(new Event('change'));running(true);assert(!button.hidden);
window.dispatchEvent(new Event('pagehide'));running(false);
window.dispatchEvent(new Event('pageshow'));running(true);
observe([{isIntersecting:false}]);running(false);
console.log('Need illustration checks passed: four-diagram pause, offscreen suspension, persistent pause, visibility, reduced motion and page lifecycle.');

// Each contribution grows from the fixed top of the other-liquidity bar.
const totals=[];
for(let frame=0;frame<=100;frame++){
 const progress=frame/100;let managedTotal=0;
 for(const band of needLiquidityBands){
  const height=band.managedStart*(1-progress)+band.managedEnd*progress;
  const baseTop=80-band.other,managedTop=baseTop-height;
  assert(height>=0&&managedTop>=18,'Stack remains nonnegative and inside chart');
  assert(Math.abs(managedTop+height-baseTop)<1e-9,'Managed segment rests on pool segment');
  managedTotal+=height;
 }
 totals.push(managedTotal);
}
assert(totals.every(total=>Math.abs(total-totals[0])<1e-9),'Reallocation preserves total managed contribution');
console.log('DEX need diagram: stacked contributions and constant allocation through animation.');
