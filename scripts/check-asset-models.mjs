import assert from 'node:assert/strict';
import {registerHooks} from 'node:module';
import * as THREE from 'three';
import {assetVariants} from '../src/data/market-model.ts';
// Node resolves the extensionless TS imports used by Astro. Canvas calls are stubbed:
// this checks geometry and resource budgets, not texture appearance or WebGL output.
registerHooks({resolve(specifier,context,next){
  if(specifier.startsWith('.')&&!/\.[cm]?[jt]s$/.test(specifier))specifier+='.ts';
  return next(specifier,context);
}});
const canvasContext=()=>new Proxy({
  createImageData:(w,h)=>({data:new Uint8ClampedArray(w*h*4),width:w,height:h}),
  createLinearGradient:()=>({addColorStop(){}}),createRadialGradient:()=>({addColorStop(){}}),
  measureText:text=>({width:text.length*8}),
},{get(target,key){return key in target?target[key]:()=>{};}});
globalThis.document={createElement(tag){assert.equal(tag,'canvas');return {width:0,height:0,getContext:()=>canvasContext()};}};
const {assetBuilders}=await import('../src/scripts/models/index.ts');
const ids=Object.values(assetVariants).flat().map(asset=>asset.id);
assert.equal(new Set(ids).size,ids.length,'Every specimen has a unique id');
assert.deepEqual(Object.keys(assetBuilders).sort(),[...ids].sort(),'Every specimen has a factory');
const rows=[];
for(const id of ids){
  const model=assetBuilders[id]();model.updateMatrixWorld(true);
  let triangles=0,calls=0;const geometries=new Set(),materials=new Set(),textures=new Set();
  model.traverse(object=>{
    if(!(object instanceof THREE.Mesh||object instanceof THREE.Line))return;
    const g=object.geometry;geometries.add(g);
    for(const attribute of Object.values(g.attributes))assert(Array.from(attribute.array).every(Number.isFinite),`${id}: finite attributes`);
    if(object instanceof THREE.InstancedMesh)assert(Array.from(object.instanceMatrix.array).every(Number.isFinite),`${id}: finite instances`);
    if(object instanceof THREE.Mesh){triangles+=(g.index?g.index.count:g.attributes.position.count)/3*(object.count??1);calls+=1;}
    for(const material of Array.isArray(object.material)?object.material:[object.material]){
      if(material.map||material.bumpMap||material.roughnessMap)assert(g.attributes.uv,`${id}: mapped surfaces need texture coordinates`);
      materials.add(material);for(const value of Object.values(material))if(value instanceof THREE.Texture)textures.add(value);
    }
  });
  const bounds=new THREE.Box3().setFromObject(model),size=bounds.getSize(new THREE.Vector3());
  assert(!bounds.isEmpty()&&size.length()>0,`${id}: non-empty model`);
  assert(bounds.min.y>=-.065,`${id}: does not penetrate floor (${bounds.min.y})`);
  assert(size.x<3.5&&size.z<3.5&&bounds.max.y<2.15,`${id}: stays within studio framing envelope`);
  assert(triangles<200000,`${id}: geometry budget exceeded (${triangles})`);
  assert(calls<90,`${id}: draw-call budget exceeded (${calls})`);
  const textureMiB=[...textures].reduce((sum,t)=>sum+(t.image?.width??0)*(t.image?.height??0)*4*4/3,0)/1048576;
  assert(textureMiB<32,`${id}: texture budget exceeded (${textureMiB})`);
  rows.push({id,triangles:Math.round(triangles),meshCalls:calls,textureMiB:+textureMiB.toFixed(2),height:+size.y.toFixed(2)});
  geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());model.traverse(o=>{if(o instanceof THREE.InstancedMesh)o.dispose();});
}
console.table(rows);
console.log('All 25 models: finite geometry, factory coverage, floor/framing bounds and per-model geometry/draw/texture budgets pass. Canvas is stubbed; visual browser review is separate.');
