import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import ts from 'typescript';
import {assetVariants} from '../src/data/market-model.ts';
const original=await readFile('src/scripts/market-explorer.ts','utf8');
const source=original.replace(/import .*?from .*?;\n/g,'').replace("await import('./market-scene')",'await globalThis.assetSceneImport()');
globalThis.testAssetVariants=assetVariants;
const {initMarketExplorer:init}=await import(`data:text/javascript;base64,${Buffer.from(ts.transpileModule('const assetVariants=globalThis.testAssetVariants;\n'+source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText).toString('base64')}`);
const element=()=>Object.assign(new EventTarget(),{dataset:{},attributes:new Map(),textContent:'',setAttribute(k,v){this.attributes.set(k,v);}});
const host=element(),hint=element(),status=element(),stamp=element(),purity=element(),weight=element();
const previous=element(),next=element();previous.dataset.specimenStep='-1';next.dataset.specimenStep='1';
const controls=Object.assign(element(),{hidden:true,querySelectorAll:()=>[previous,next]});
const captions=Object.fromEntries(Object.keys(assetVariants).map(id=>[id,{fields:{'[data-specimen-name]':element(),'[data-specimen-detail]':element(),'[data-specimen-count]':element()},querySelector(s){return this.fields[s];}}]));
const inputs=Object.keys(assetVariants).map(value=>Object.assign(element(),{value,checked:value==='gold'}));
const root={dataset:{},querySelector(s){if(s.startsWith('[data-caption='))return captions[s.split('"')[1]];return {'[data-model-canvas]':host,'[data-model-hint]':hint,'[data-model-status]':status,'[data-specimen-controls]':controls,'[data-bullion-stamp]':stamp,'[data-bullion-purity]':purity,'[data-bullion-weight]':weight}[s];},querySelectorAll:()=>inputs};
const desktop=Object.assign(element(),{matches:true}),reduced=Object.assign(element(),{matches:false});
globalThis.matchMedia=q=>q.includes('701')?desktop:reduced;
globalThis.document=Object.assign(element(),{hidden:false});globalThis.window=element();
let observe;globalThis.IntersectionObserver=class{constructor(callback){observe=callback;}observe(){}disconnect(){}};
const selections=[],visibility=[];let imports=0,disposed=false;
globalThis.assetSceneImport=async()=>{imports++;return {createMarketScene:()=>({select:id=>selections.push(id),visible:value=>visibility.push(value),dispose:()=>{disposed=true;}})};};
init(root);
assert.equal(root.dataset.specimen,'gold');assert(!controls.hidden);assert.equal(imports,0,'Do not load 3D before intersection');
previous.dispatchEvent(new Event('click'));assert.equal(root.dataset.specimen,'aluminium');assert.equal(stamp.textContent,'ALUMINIUM');
next.dispatchEvent(new Event('click'));assert.equal(root.dataset.specimen,'gold');
const choose=id=>{inputs.forEach(input=>input.checked=input.value===id);inputs.find(input=>input.value===id).dispatchEvent(new Event('change'));};
for(const [category,variants] of Object.entries(assetVariants)){
  choose(category);assert.equal(controls.hidden,variants.length===1);
  for(let i=1;i<=variants.length;i++){
    next.dispatchEvent(new Event('click'));assert.equal(root.dataset.specimen,variants[i%variants.length].id);
    assert.equal(captions[category].fields['[data-specimen-name]'].textContent,variants[i%variants.length].label);
  }
  previous.dispatchEvent(new Event('click'));assert.equal(root.dataset.specimen,variants.at(-1).id);
  next.dispatchEvent(new Event('click'));
}
choose('grains');next.dispatchEvent(new Event('click'));assert.equal(root.dataset.specimen,'corn');
choose('fund');assert(controls.hidden);choose('grains');assert.equal(root.dataset.specimen,'corn','Remember selection in each category');
observe([{isIntersecting:true}]);await new Promise(resolve=>setImmediate(resolve));assert.equal(imports,1);assert.equal(selections.at(-1),'corn');assert.equal(root.dataset.renderer,'ready');
next.dispatchEvent(new Event('click'));assert.equal(selections.at(-1),'soy');
reduced.matches=true;reduced.dispatchEvent(new Event('change'));assert.equal(root.dataset.renderer,'fallback');assert.equal(host.tabIndex,-1);assert.equal(visibility.at(-1),false);
next.dispatchEvent(new Event('click'));assert.equal(root.dataset.specimen,'wheat','Selection works under reduced motion');
reduced.matches=false;reduced.dispatchEvent(new Event('change'));assert.equal(root.dataset.renderer,'ready');
document.hidden=true;document.dispatchEvent(new Event('visibilitychange'));assert.equal(visibility.at(-1),false);
document.hidden=false;document.dispatchEvent(new Event('visibilitychange'));assert.equal(visibility.at(-1),true);
desktop.matches=false;desktop.dispatchEvent(new Event('change'));assert.equal(root.dataset.renderer,'fallback');
window.dispatchEvent(new Event('pagehide'));assert(disposed);
console.log('Asset explorer checks passed: lazy initialization, both-way wraparound, per-category memory, accessible labels, single-specimen controls, scene selection, mobile/reduced-motion fallback, visibility and disposal.');
