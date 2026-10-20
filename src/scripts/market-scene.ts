import * as THREE from 'three';
import {createGold} from './models/gold';
import {createFund} from './models/fund';
import {createStock} from './models/stock';
import {createEmerald} from './models/emerald';
import {createOil,createWheat} from './models/commodities';
import {createCorn,createSoy} from './models/grains';
import {createCopper} from './models/metals';
import {createRealEstate} from './models/real-estate';
import type {AssetVariantId} from '../data/market-model';

/** Original procedural geometry; no remote models, textures or market data. */
export function createMarketScene(host: HTMLElement, onContextLost: () => void, onRotationChange: (spinning: boolean) => void) {
  const renderer = new THREE.WebGLRenderer({alpha:true, antialias:true, powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.transmissionResolutionScale = .5;
  const canvas = renderer.domElement;
  host.append(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(25, 1, .1, 40);
  camera.position.set(3.7, 4.8, 6.4);
  camera.lookAt(0, .4, 0);
  // A photographic studio: large white softboxes and narrow edge strips.
  // These only render once into the reflection map, never as extra runtime lights.
  const studio=new THREE.Scene();studio.background=new THREE.Color(0x383c39);
  const softbox=(width:number,height:number,position:[number,number,number],intensity:number)=>{
    const panel=new THREE.Mesh(new THREE.PlaneGeometry(width,height),new THREE.MeshBasicMaterial({color:new THREE.Color(intensity,intensity,intensity),side:THREE.DoubleSide}));
    panel.position.set(...position);panel.lookAt(0,0,0);studio.add(panel);
  };
  softbox(5,4,[-4,6,2],4);
  softbox(1.2,5,[4,2,1],6);
  softbox(4,1.3,[0,3,-5],3);
  softbox(2,4,[-4,0,-3],1.2);
  softbox(4,2,[1,1,5],1.1);
  const pmrem=new THREE.PMREMGenerator(renderer);
  const environment=pmrem.fromScene(studio,.025,.1,30);
  scene.environment=environment.texture;
  studio.traverse(object=>{if(object instanceof THREE.Mesh){object.geometry.dispose();(object.material as THREE.Material).dispose();}});
  pmrem.dispose();
  scene.add(new THREE.HemisphereLight(0xffffff,0xb4b99f,.25));
  const key=new THREE.DirectionalLight(0xfff7e8,3.2);
  key.position.set(-3,6,4);key.castShadow=true;
  key.shadow.mapSize.set(1024,1024);
  key.shadow.camera.left=-3;key.shadow.camera.right=3;
  key.shadow.camera.top=3;key.shadow.camera.bottom=-3;
  key.shadow.camera.near=.1;key.shadow.camera.far=15;
  key.shadow.normalBias=.018;key.shadow.bias=-.00015;
  scene.add(key);
  const rig=new THREE.Group();scene.add(rig);
  const models=new Map<AssetVariantId,THREE.Group>();
  const builders:Record<AssetVariantId,()=>THREE.Group>={
    gold:()=>createGold(),silver:()=>createGold('silver'),palladium:()=>createGold('palladium'),platinum:()=>createGold('platinum'),
    fund:createFund,stock:createStock,emerald:createEmerald,ruby:()=>createEmerald('ruby'),sapphire:()=>createEmerald('sapphire'),diamond:()=>createEmerald('diamond'),oil:createOil,wheat:createWheat,corn:createCorn,soy:createSoy,copper:createCopper,aluminium:()=>createGold('aluminium'),
    residential:()=>createRealEstate('residential'),office:()=>createRealEstate('office'),warehouse:()=>createRealEstate('warehouse'),
  };
  const disposeTree=(root:THREE.Object3D)=>{
    const geometries=new Set<THREE.BufferGeometry>(),materials=new Set<THREE.Material>(),textures=new Set<THREE.Texture>();
    root.traverse(object=>{
      if(object instanceof THREE.Mesh||object instanceof THREE.Line){geometries.add(object.geometry);(Array.isArray(object.material)?object.material:[object.material]).forEach(m=>materials.add(m));}
      if(object instanceof THREE.InstancedMesh)object.dispose();
    });
    geometries.forEach(g=>g.dispose());materials.forEach(m=>{Object.values(m).forEach(value=>{if(value instanceof THREE.Texture)textures.add(value);});m.dispose();});textures.forEach(t=>t.dispose());
  };
  // Clamp texture sampling once, including shared maps created by the model builders.
  const configureTextures=(root:THREE.Object3D)=>root.traverse(object=>{
    if(!(object instanceof THREE.Mesh))return;
    const materials=Array.isArray(object.material)?object.material:[object.material];
    materials.forEach(material=>Object.values(material).forEach(value=>{
      if(value instanceof THREE.Texture)value.anisotropy=Math.min(value.anisotropy,renderer.capabilities.getMaxAnisotropy());
    }));
  });
  configureTextures(scene);
  const floor=new THREE.Mesh(new THREE.PlaneGeometry(100,100),new THREE.MeshBasicMaterial({color:0xe6ebd9,toneMapped:false}));
  floor.rotation.x=-Math.PI/2;floor.position.y=-.045;scene.add(floor);
  const ground=new THREE.Mesh(new THREE.PlaneGeometry(100,100),new THREE.ShadowMaterial({opacity:.12}));
  ground.rotation.x=-Math.PI/2;ground.position.y=-.04;ground.receiveShadow=true;scene.add(ground);
  // A small, generated contact shadow supports the transparent stone too.
  const contactCanvas=document.createElement('canvas');contactCanvas.width=128;contactCanvas.height=128;
  const context=contactCanvas.getContext('2d')!;
  const gradient=context.createRadialGradient(64,64,8,64,64,64);
  gradient.addColorStop(0,'rgba(37,49,29,.3)');gradient.addColorStop(.45,'rgba(37,49,29,.14)');gradient.addColorStop(1,'rgba(37,49,29,0)');
  context.fillStyle=gradient;context.fillRect(0,0,128,128);
  const contactTexture=new THREE.CanvasTexture(contactCanvas);contactTexture.colorSpace=THREE.SRGBColorSpace;
  const contact=new THREE.Mesh(new THREE.PlaneGeometry(3.6,3.4),new THREE.MeshBasicMaterial({map:contactTexture,transparent:true,depthWrite:false,toneMapped:false}));
  contact.rotation.x=-Math.PI/2;contact.position.y=-.035;scene.add(contact);

  let active:AssetVariantId='gold';
  let rotation=-.2, targetRotation=-.2, tilt=0, targetTilt=0;
  let scale=1, spinning=true, visible=true, disposed=false, contextLost=false;
  let drag: {id:number;startX:number;startY:number;x:number;y:number;moved:boolean}|undefined;
  let pointerActivation:boolean|undefined;
  let frame:number|undefined, lastTime=0;
  function schedule(){if(frame===undefined&&visible&&!disposed&&!contextLost)frame=requestAnimationFrame(draw);}
  function draw(time:number){
    frame=undefined;
    // The slow turn needs only 30 rendered frames/s; direct manipulation uses the display rate.
    if(spinning&&!drag&&time-lastTime<1000/30){schedule();return;}
    const dt=Math.min((time-lastTime)/1000 || .016,.05);lastTime=time;
    if(spinning&&!drag)targetRotation+=dt*.24;
    const ease=1-Math.exp(-dt*9);
    rotation+=(targetRotation-rotation)*ease;tilt+=(targetTilt-tilt)*ease;scale+=(1-scale)*ease;
    rig.rotation.y=rotation;rig.rotation.x=tilt;models.get(active)?.scale.setScalar(scale);
    renderer.render(scene,camera);
    if((spinning&&!drag)||Math.abs(targetRotation-rotation)>.001||Math.abs(targetTilt-tilt)>.001||Math.abs(1-scale)>.001)schedule();
  }
  function resize(){
    const {width,height}=host.getBoundingClientRect();
    if(!width||!height)return;
    renderer.setSize(width,height,false);camera.aspect=width/height;
    camera.fov=THREE.MathUtils.radToDeg(2*Math.atan(Math.tan(THREE.MathUtils.degToRad(25)/2)/Math.min(1,camera.aspect)));
    camera.updateProjectionMatrix();schedule();
  }
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(host);
  const raycaster=new THREE.Raycaster();
  const pointerPosition=new THREE.Vector2();
  function overObject(event:PointerEvent){
    const bounds=host.getBoundingClientRect();
    pointerPosition.set((event.clientX-bounds.left)/bounds.width*2-1,1-(event.clientY-bounds.top)/bounds.height*2);
    raycaster.setFromCamera(pointerPosition,camera);
    return raycaster.intersectObject(models.get(active)!,true).some(hit=>hit.object instanceof THREE.Mesh);
  }
  function endDrag(){
    if(!drag)return;
    const id=drag.id;
    drag=undefined;
    delete host.dataset.dragging;
    if(host.hasPointerCapture(id))host.releasePointerCapture(id);
    schedule();
  }
  function toggleRotation(){
    spinning=!spinning;
    onRotationChange(spinning);
    schedule();
  }
  function pointerDown(event:PointerEvent){
    if(!visible||contextLost||drag||!event.isPrimary||event.button!==0)return;
    pointerActivation=false;
    if(!overObject(event))return;
    event.preventDefault();
    drag={id:event.pointerId,startX:event.clientX,startY:event.clientY,x:event.clientX,y:event.clientY,moved:false};
    host.setPointerCapture(event.pointerId);
    host.dataset.dragging='true';
    host.focus({preventScroll:true});
    // Stop any residual automatic movement at the point where the object is picked up.
    targetRotation=rotation;targetTilt=tilt;
  }
  function pointerMove(event:PointerEvent){
    if(!visible||contextLost)return;
    if(!drag){
      host.dataset.hovered=String(overObject(event));
      return;
    }
    if(event.pointerId!==drag.id)return;
    if(event.pointerType==='mouse'&&!(event.buttons&1))return;
    if(Math.hypot(event.clientX-drag.startX,event.clientY-drag.startY)>4)drag.moved=true;
    if(drag.moved){
      targetRotation+=(event.clientX-drag.x)*.009;
      targetTilt=THREE.MathUtils.clamp(targetTilt+(event.clientY-drag.y)*.004,-.12,.25);
      schedule();
    }
    drag.x=event.clientX;drag.y=event.clientY;
  }
  function pointerUp(event:PointerEvent){
    if(event.pointerId!==drag?.id)return;
    pointerActivation=!drag.moved;
    endDrag();
  }
  function pointerCancel(event:PointerEvent){
    if(event.pointerId===drag?.id){pointerActivation=undefined;endDrag();}
  }
  function leave(){delete host.dataset.hovered;}
  function keyboard(event:KeyboardEvent){
    if(!visible||contextLost)return;
    pointerActivation=undefined;
    if(event.key===' '||event.key==='Enter'){
      event.preventDefault();
      if(!event.repeat)toggleRotation();
    }else if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)){
      event.preventDefault();
      if(spinning){spinning=false;onRotationChange(false);}
      if(event.key==='ArrowLeft')targetRotation-=Math.PI/12;
      if(event.key==='ArrowRight')targetRotation+=Math.PI/12;
      if(event.key==='ArrowUp')targetTilt=Math.max(-.12,targetTilt-.06);
      if(event.key==='ArrowDown')targetTilt=Math.min(.25,targetTilt+.06);
      schedule();
    }
  }
  function accessibleClick(event:MouseEvent){
    // Handle a physical click once, including Safari's detail=0 compatibility clicks.
    // Assistive technology can also activate the button without a pointer sequence.
    const activate=pointerActivation??(event.detail===0);
    pointerActivation=undefined;
    if(activate&&visible&&!contextLost)toggleRotation();
  }
  function lost(event:Event){
    event.preventDefault();contextLost=true;endDrag();
    if(frame!==undefined)cancelAnimationFrame(frame);frame=undefined;onContextLost();
  }
  const listeners=new AbortController();
  const signal=listeners.signal;
  host.addEventListener('pointerdown',pointerDown,{signal});
  host.addEventListener('pointermove',pointerMove,{signal});
  host.addEventListener('pointerup',pointerUp,{signal});
  host.addEventListener('pointercancel',pointerCancel,{signal});
  host.addEventListener('lostpointercapture',pointerCancel,{signal});
  host.addEventListener('pointerleave',leave,{signal});
  host.addEventListener('keydown',keyboard,{signal});
  host.addEventListener('click',accessibleClick,{signal});
  canvas.addEventListener('webglcontextlost',lost);
  resize();
  return {
    select(id:AssetVariantId){
      endDrag();
      let model=models.get(id);
      if(!model){model=builders[id]();configureTextures(model);models.set(id,model);rig.add(model);}
      // Three recently viewed specimens at most: no upfront generation or unbounded GPU cache.
      models.delete(id);models.set(id,model);
      if(models.size>3){const oldest=models.keys().next().value!;const evicted=models.get(oldest)!;rig.remove(evicted);disposeTree(evicted);models.delete(oldest);}
      contact.scale.setScalar(id==='wheat'?.18:id==='oil'?.6:1);
      contact.material.opacity=id==='wheat'?.65:1;
      // Thin stalks need a smaller shadow bias than the broad bullion surfaces.
      key.shadow.normalBias=id==='wheat'?.003:.018;
      active=id;models.forEach((entry,key)=>{entry.visible=key===id;entry.scale.setScalar(1);});
      scale=.86;rotation=targetRotation=-.2;tilt=targetTilt=0;schedule();
    },
    renderStill(){
      resize();rig.rotation.set(0,-.2,0);models.get(active)?.scale.setScalar(1);renderer.render(scene,camera);
      return {geometries:renderer.info.memory.geometries,textures:renderer.info.memory.textures,triangles:renderer.info.render.triangles};
    },
    visible(value:boolean){visible=value;if(!value){endDrag();leave();if(frame!==undefined){cancelAnimationFrame(frame);frame=undefined;}}if(value){lastTime=performance.now();schedule();}},
    dispose(){
      disposed=true;endDrag();if(frame!==undefined)cancelAnimationFrame(frame);resizeObserver.disconnect();
      listeners.abort();canvas.removeEventListener('webglcontextlost',lost);
      disposeTree(scene);models.clear();key.shadow.dispose();environment.dispose();renderer.dispose();canvas.remove();
    },
  };
}
