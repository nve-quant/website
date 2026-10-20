import * as THREE from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import type {MarketModelId} from '../data/market-model';

/** Original procedural geometry; no remote models, textures or market data. */
export function createMarketScene(host: HTMLElement, onContextLost: () => void) {
  const renderer = new THREE.WebGLRenderer({alpha:true, antialias:true, powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  const canvas = renderer.domElement;
  host.append(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, .1, 40);
  camera.position.set(5, 3.7, 6.5);
  camera.lookAt(0, .5, 0);
  const environmentScene = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(environmentScene, .04);
  scene.environment = environment.texture;
  environmentScene.dispose(); pmrem.dispose();
  scene.add(new THREE.HemisphereLight(0xffffff, 0x53644a, 2));
  const key = new THREE.DirectionalLight(0xfff6df, 4);
  key.position.set(-3, 7, 4); key.castShadow = true;
  key.shadow.mapSize.set(1024,1024);
  key.shadow.camera.left = -4; key.shadow.camera.right = 4;
  key.shadow.camera.top = 4; key.shadow.camera.bottom = -4;
  key.shadow.normalBias = .035;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xd4e9cf, 2);
  rim.position.set(4,3,-5); scene.add(rim);
  const rig = new THREE.Group(); scene.add(rig);
  const models: Record<MarketModelId, THREE.Group> = {
    gold:new THREE.Group(), fund:new THREE.Group(), unique:new THREE.Group(),
  };
  Object.values(models).forEach(model => {rig.add(model); model.visible=false;});
  const mat = (color:number, metalness=.15, roughness=.35) => new THREE.MeshStandardMaterial({color,metalness,roughness});
  const gold = mat(0xd9ac4f,.8,.24);
  const green = mat(0x64856c,.28,.3);
  const pale = mat(0xc9d8b5,.2,.33);
  const mesh = (geometry:THREE.BufferGeometry, material:THREE.Material, parent:THREE.Object3D) => {
    const object = new THREE.Mesh(geometry, material);
    object.castShadow = true; object.receiveShadow = true; parent.add(object); return object;
  };
  function slab(w:number, d:number, h:number, bevel:number) {
    const shape = new THREE.Shape();
    shape.moveTo(-w/2,-d/2); shape.lineTo(w/2,-d/2);
    shape.lineTo(w/2,d/2); shape.lineTo(-w/2,d/2); shape.closePath();
    const geometry = new THREE.ExtrudeGeometry(shape,{depth:h,bevelEnabled:true,bevelSize:bevel,bevelThickness:bevel,bevelSegments:3,steps:1});
    geometry.rotateX(-Math.PI/2); geometry.center(); return geometry;
  }
  // Offset ingots establish depth through overlap and a bevel that catches the key light.
  [[-.52,0,0],[.52,0,0],[0,.42,0]].forEach(([x,y,z],i) => {
    const bar=mesh(slab(.78,1.85,.32,.07),gold,models.gold);
    bar.position.set(x,y+.2,z); bar.rotation.y=i===2?-.12:0;
    const stamp=mesh(new THREE.PlaneGeometry(.32,.55),mat(0xb78b39,.65,.4),bar);
    stamp.rotation.x=-Math.PI/2;stamp.position.y=.237;
  });
  for(let i=0;i<5;i++) {
    const share=mesh(slab(1.75,1.75,.11,.045),i%2?pale:green,models.fund);
    share.position.y=i*.27; share.rotation.y=i*.09;
    const inset=mesh(new THREE.RingGeometry(.28,.30,48),mat(0xe2ebd0,.4,.25),share);
    inset.rotation.x=-Math.PI/2;inset.position.y=.105;
  }
  const gemMaterial=new THREE.MeshPhysicalMaterial({color:0x38795a,metalness:.15,roughness:.16,clearcoat:1,clearcoatRoughness:.1,flatShading:true});
  const gem=mesh(new THREE.OctahedronGeometry(1.1,0),gemMaterial,models.unique);
  gem.scale.set(1,1.35,.82);gem.position.y=.87;gem.rotation.set(.08,.4,.14);
  const edges = new THREE.LineSegments(new THREE.EdgesGeometry(gem.geometry),new THREE.LineBasicMaterial({color:0x91bc95,transparent:true,opacity:.5}));
  gem.add(edges);
  const base=mesh(new THREE.CylinderGeometry(1.8,1.85,.12,80),mat(0xc2cfae,.08,.75),scene);
  base.position.y=-.28;
  const ring=mesh(new THREE.TorusGeometry(2.13,.009,8,100),mat(0x8c9e78,0,.8),scene);
  ring.rotation.x=-Math.PI/2;ring.position.y=-.32;
  for(let i=0;i<3;i++) {
    const angle=i*Math.PI*2/3+.2;
    const node=mesh(new THREE.SphereGeometry(.06,12,8),mat(0x456444),scene);
    node.position.set(Math.cos(angle)*2.13,-.32,Math.sin(angle)*2.13);
  }
  const ground=mesh(new THREE.PlaneGeometry(30,30),new THREE.ShadowMaterial({opacity:.15}),scene);
  ground.rotation.x=-Math.PI/2;ground.position.y=-.36;ground.castShadow=false;

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
    camera.fov=THREE.MathUtils.radToDeg(2*Math.atan(Math.tan(THREE.MathUtils.degToRad(34)/2)/Math.min(1,camera.aspect)));
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
      const geometries=new Set<THREE.BufferGeometry>();const materials=new Set<THREE.Material>();
      scene.traverse(object=>{if(object instanceof THREE.Mesh||object instanceof THREE.LineSegments){geometries.add(object.geometry);(Array.isArray(object.material)?object.material:[object.material]).forEach(m=>materials.add(m));}});
      geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());environment.dispose();renderer.dispose();canvas.remove();
    },
  };
}
