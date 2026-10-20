import * as THREE from 'three';
import {createGold} from './models/gold';
import {createFund} from './models/fund';
import {createEmerald} from './models/emerald';
import type {MarketModelId} from '../data/market-model';

/** Original procedural geometry; no remote models, textures or market data. */
export function createMarketScene(host: HTMLElement, onContextLost: () => void) {
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
  const models:Record<MarketModelId,THREE.Group>={gold:createGold(),fund:createFund(),unique:createEmerald()};
  Object.values(models).forEach(model=>{rig.add(model);model.visible=false;});
  // Clamp texture sampling once, including shared maps created by the model builders.
  scene.traverse(object=>{
    if(!(object instanceof THREE.Mesh))return;
    const materials=Array.isArray(object.material)?object.material:[object.material];
    materials.forEach(material=>Object.values(material).forEach(value=>{
      if(value instanceof THREE.Texture)value.anisotropy=Math.min(value.anisotropy,renderer.capabilities.getMaxAnisotropy());
    }));
  });
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

  let active:MarketModelId='gold';
  let rotation=-.2, targetRotation=-.2, tilt=0, targetTilt=0;
  let scale=1, spinning=false, visible=true, disposed=false, contextLost=false;
  let frame:number|undefined, lastTime=0;
  function schedule(){if(frame===undefined&&visible&&!disposed&&!contextLost)frame=requestAnimationFrame(draw);}
  function draw(time:number){
    frame=undefined;
    const dt=Math.min((time-lastTime)/1000 || .016,.05);lastTime=time;
    if(spinning)targetRotation+=dt*.3;
    const ease=1-Math.exp(-dt*9);
    rotation+=(targetRotation-rotation)*ease;tilt+=(targetTilt-tilt)*ease;scale+=(1-scale)*ease;
    rig.rotation.y=rotation;rig.rotation.x=tilt;models[active].scale.setScalar(scale);
    renderer.render(scene,camera);
    if(spinning||Math.abs(targetRotation-rotation)>.001||Math.abs(targetTilt-tilt)>.001||Math.abs(1-scale)>.001)schedule();
  }
  function resize(){
    const {width,height}=host.getBoundingClientRect();
    if(!width||!height)return;
    renderer.setSize(width,height,false);camera.aspect=width/height;
    camera.fov=THREE.MathUtils.radToDeg(2*Math.atan(Math.tan(THREE.MathUtils.degToRad(25)/2)/Math.min(1,camera.aspect)));
    camera.updateProjectionMatrix();schedule();
  }
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(host);
  function pointer(event:PointerEvent){
    if(event.pointerType!=='mouse')return;
    const bounds=host.getBoundingClientRect();
    targetTilt=((event.clientY-bounds.top)/bounds.height-.5)*.12;schedule();
  }
  function leave(){targetTilt=0;schedule();}
  function lost(event:Event){event.preventDefault();contextLost=true;spinning=false;if(frame!==undefined)cancelAnimationFrame(frame);frame=undefined;onContextLost();}
  host.addEventListener('pointermove',pointer);host.addEventListener('pointerleave',leave);
  canvas.addEventListener('webglcontextlost',lost);
  resize();
  return {
    select(id:MarketModelId){active=id;Object.entries(models).forEach(([key,model])=>{model.visible=key===id;model.scale.setScalar(1);});scale=.86;targetRotation=-.2;spinning=false;schedule();},
    rotate(delta:number){targetRotation+=delta;schedule();},
    spin(value:boolean){spinning=value;schedule();},
    visible(value:boolean){visible=value;if(!value&&frame!==undefined){cancelAnimationFrame(frame);frame=undefined;}if(value){lastTime=performance.now();schedule();}},
    dispose(){
      disposed=true;if(frame!==undefined)cancelAnimationFrame(frame);resizeObserver.disconnect();
      host.removeEventListener('pointermove',pointer);host.removeEventListener('pointerleave',leave);canvas.removeEventListener('webglcontextlost',lost);
      const geometries=new Set<THREE.BufferGeometry>();const materials=new Set<THREE.Material>();const textures=new Set<THREE.Texture>();
      scene.traverse(object=>{if(object instanceof THREE.Mesh||object instanceof THREE.Line){geometries.add(object.geometry);(Array.isArray(object.material)?object.material:[object.material]).forEach(m=>materials.add(m));}});
      geometries.forEach(g=>g.dispose());materials.forEach(m=>{Object.values(m).forEach(value=>{if(value instanceof THREE.Texture)textures.add(value);});m.dispose();});textures.forEach(t=>t.dispose());key.shadow.dispose();environment.dispose();renderer.dispose();canvas.remove();
    },
  };
}
