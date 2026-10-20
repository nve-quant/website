import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {surfaceRelief} from './surfaces';

export function createNickel():THREE.Group {
  const group=new THREE.Group(),metal=new THREE.MeshStandardMaterial({color:0xaeb8b5,metalness:.94,roughness:.36,bumpMap:surfaceRelief('paint'),bumpScale:.004});
  const geometry=new RoundedBoxGeometry(1.35,.055,1.05,2,.018);
  for(let i=0;i<9;i++){
    const plate=new THREE.Mesh(geometry,metal);plate.position.set(Math.sin(i*3)*.025,.01+i*.062,Math.cos(i*2)*.024);plate.rotation.y=(i%3-1)*.025;plate.castShadow=plate.receiveShadow=true;group.add(plate);
  }
  const band=new THREE.MeshStandardMaterial({color:0x394440,metalness:.7,roughness:.35});
  for(const x of [-.42,.42]){
    const wrap=new THREE.Mesh(new THREE.BoxGeometry(.035,.58,1.09),band);wrap.position.set(x,.27,0);wrap.castShadow=true;group.add(wrap);
  }
  group.rotation.y=-.15;return group;
}

export function createGas():THREE.Group {
  const group=new THREE.Group();
  const steel=new THREE.MeshPhysicalMaterial({color:0xc5cfce,metalness:.8,roughness:.27,clearcoat:.25,bumpMap:surfaceRelief('paint'),bumpScale:.001});
  const frame=new THREE.MeshStandardMaterial({color:0x3e514d,metalness:.6,roughness:.38});
  const valve=new THREE.MeshStandardMaterial({color:0x8b533b,metalness:.55,roughness:.38});
  const mesh=(geometry:THREE.BufferGeometry,material:THREE.Material,x:number,y:number,z:number)=>{const object=new THREE.Mesh(geometry,material);object.position.set(x,y,z);object.castShadow=object.receiveShadow=true;group.add(object);return object;};
  const tank=mesh(new THREE.CapsuleGeometry(.48,1.35,12,64),steel,0,.71,0);tank.rotation.z=Math.PI/2;
  for(const x of [-.54,.54]){
    const ring=mesh(new THREE.TorusGeometry(.485,.018,10,64),frame,x,.71,0);ring.rotation.y=Math.PI/2;
    mesh(new RoundedBoxGeometry(.16,.35,.65,1,.02),frame,x,.16,0);
    mesh(new RoundedBoxGeometry(.32,.045,.88,1,.01),steel,x,-.01,0);
  }
  const pipeCurve=new THREE.CatmullRomCurve3([new THREE.Vector3(.89,.72,0),new THREE.Vector3(1.25,.72,0),new THREE.Vector3(1.30,1.18,0),new THREE.Vector3(.68,1.25,0),new THREE.Vector3(.60,1.14,0)]);
  mesh(new THREE.TubeGeometry(pipeCurve,36,.025,12,false),steel,0,0,0);
  const wheel=mesh(new THREE.TorusGeometry(.11,.013,10,32),valve,1.3,1.07,.09);
  for(let i=0;i<4;i++){const spoke=mesh(new THREE.BoxGeometry(.20,.012,.012),valve,1.3,1.07,.09);spoke.rotation.z=i*Math.PI/4;}
  wheel.rotation.z=.2;
  mesh(new THREE.CylinderGeometry(.027,.027,.09,12),steel,.15,1.22,0);
  const gauge=mesh(new THREE.CylinderGeometry(.09,.09,.035,32),frame,.15,1.32,.035);gauge.rotation.x=Math.PI/2;
  const dial=document.createElement('canvas');dial.width=dial.height=256;const d=dial.getContext('2d')!;d.fillStyle='#e5e4d4';d.fillRect(0,0,256,256);d.strokeStyle='#364b44';d.lineWidth=4;
  for(let i=0;i<13;i++){const a=(i/12*1.5+.75)*Math.PI;d.beginPath();d.moveTo(128+Math.cos(a)*78,128+Math.sin(a)*78);d.lineTo(128+Math.cos(a)*94,128+Math.sin(a)*94);d.stroke();}d.beginPath();d.moveTo(128,128);d.lineTo(85,68);d.stroke();
  const dialMap=new THREE.CanvasTexture(dial);dialMap.colorSpace=THREE.SRGBColorSpace;
  mesh(new THREE.CircleGeometry(.077,32),new THREE.MeshStandardMaterial({map:dialMap,roughness:.5}),.15,1.32,.055);
  const label=document.createElement('canvas');label.width=1024;label.height=256;const ctx=label.getContext('2d')!;ctx.fillStyle='#dfe3cf';ctx.fillRect(0,0,1024,256);ctx.fillStyle='#304941';ctx.textAlign='center';ctx.font='600 78px sans-serif';ctx.fillText('NATURAL GAS',512,115);ctx.font='28px monospace';ctx.fillText('ILLUSTRATIVE STORAGE VESSEL',512,188);
  const map=new THREE.CanvasTexture(label);map.colorSpace=THREE.SRGBColorSpace;map.anisotropy=8;
  mesh(new THREE.PlaneGeometry(1.0,.25),new THREE.MeshStandardMaterial({map,roughness:.7}),0,.75,.484);
  group.rotation.y=-.1;return group;
}

export function createCoffee():THREE.Group {
  const group=new THREE.Group(),cloth=surfaceRelief('cloth',512);cloth.repeat.set(5,3);
  const art=document.createElement('canvas');art.width=1024;art.height=512;const ctx=art.getContext('2d')!;ctx.fillStyle='#a18b60';ctx.fillRect(0,0,1024,512);ctx.fillStyle='#334239';ctx.textAlign='center';ctx.font='600 62px serif';ctx.fillText('COFFEE',256,255);ctx.font='23px monospace';ctx.fillText('GREEN BEANS',256,298);ctx.font='17px monospace';ctx.fillText('ILLUSTRATIVE LOT',256,337);
  const map=new THREE.CanvasTexture(art);map.colorSpace=THREE.SRGBColorSpace;map.anisotropy=8;
  const sackMaterial=new THREE.MeshStandardMaterial({map,bumpMap:cloth,bumpScale:.012,roughness:.94,side:THREE.DoubleSide});
  const profile=[new THREE.Vector2(.30,0),new THREE.Vector2(.48,.04),new THREE.Vector2(.55,.22),new THREE.Vector2(.51,.66),new THREE.Vector2(.43,.99),new THREE.Vector2(.45,1.07)];
  const sackGeometry=new THREE.LatheGeometry(profile,80);const position=sackGeometry.getAttribute('position');
  for(let i=0;i<position.count;i++){const x=position.getX(i),z=position.getZ(i),y=position.getY(i),a=Math.atan2(z,x),r=1+.018*Math.sin(a*13+y*8);position.setXYZ(i,x*r,y,z*r);}sackGeometry.computeVertexNormals();
  const sack=new THREE.Mesh(sackGeometry,sackMaterial);sack.castShadow=sack.receiveShadow=true;group.add(sack);
  const rim=new THREE.Mesh(new THREE.TorusGeometry(.445,.025,10,80),new THREE.MeshStandardMaterial({color:0xb2a076,bumpMap:cloth,bumpScale:.01,roughness:.94}));rim.rotation.x=Math.PI/2;rim.position.y=1.065;rim.castShadow=true;group.add(rim);
  const beansGeometry=new THREE.SphereGeometry(1,18,12),p=beansGeometry.getAttribute('position');
  for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),z=p.getZ(i);if(z>0)p.setZ(i,z-.30*Math.exp(-Math.pow((x+.08*Math.sin(y*4))/.14,2))*(1-y*y));}beansGeometry.computeVertexNormals();beansGeometry.rotateX(-Math.PI/2);
  const beans=new THREE.InstancedMesh(beansGeometry,new THREE.MeshStandardMaterial({color:0xb7ba89,roughness:.62,bumpMap:surfaceRelief('grain'),bumpScale:.002}),100),dummy=new THREE.Object3D();
  for(let i=0;i<100;i++){
    const a=i*2.39996,r=i<86?Math.sqrt(i/86)*.40:.56+(i%3)*.10;
    dummy.position.set(Math.cos(a)*r,i<86?1.04+.12*(1-r/.45):.015,Math.sin(a)*r);dummy.rotation.set((i%3-.5)*.15,a,(i%4-2)*.1);dummy.scale.set(.058,.04,.085);dummy.updateMatrix();beans.setMatrixAt(i,dummy.matrix);beans.setColorAt(i,new THREE.Color().setScalar(.75+(i%7)*.045));
  }
  beans.castShadow=beans.receiveShadow=true;group.add(beans);group.rotation.y=-.95;return group;
}

export function createCotton():THREE.Group {
  const group=new THREE.Group(),branch=new THREE.MeshStandardMaterial({color:0x766047,roughness:.95});
  const white=new THREE.MeshStandardMaterial({color:0xf0eddf,roughness:1,bumpMap:surfaceRelief('fibre'),bumpScale:.008});
  const bollGeometry=new THREE.SphereGeometry(1,24,16),p=bollGeometry.getAttribute('position');
  for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),z=p.getZ(i),r=1+.035*Math.sin(x*19+y*13)*Math.cos(z*17);p.setXYZ(i,x*r,y*r,z*r);}bollGeometry.computeVertexNormals();
  const endpoints=[new THREE.Vector3(-.42,.94,.1),new THREE.Vector3(.35,1.25,.02),new THREE.Vector3(-.12,1.65,-.10)];
  const fibres:number[]=[];
  endpoints.forEach((end,index)=>{
    const curve=new THREE.QuadraticBezierCurve3(new THREE.Vector3(0,-.03,0),new THREE.Vector3(index===1?.04:-.12,.65,.03),end);
    const stem=new THREE.Mesh(new THREE.TubeGeometry(curve,20,.018,8,false),branch);stem.castShadow=true;group.add(stem);
    for(let lobe=0;lobe<5;lobe++){
      const a=lobe/5*Math.PI*2,centre=end.clone().add(new THREE.Vector3(Math.cos(a)*.15,.02,Math.sin(a)*.15));
      const cotton=new THREE.Mesh(bollGeometry,white);cotton.scale.set(.17,.20,.16);cotton.position.copy(centre);cotton.castShadow=true;group.add(cotton);
      const bract=new THREE.Mesh(new THREE.ConeGeometry(.115,.35,4),branch);bract.position.copy(end).add(new THREE.Vector3(Math.cos(a)*.12,-.14,Math.sin(a)*.12));bract.rotation.z=Math.cos(a)*-.5;bract.rotation.x=Math.sin(a)*.5;bract.castShadow=true;group.add(bract);
      for(let j=0;j<16;j++){const t=j*2.4,direction=new THREE.Vector3(Math.cos(t)*.15,.15*Math.sin(t*3),Math.sin(t)*.14);const from=centre.clone().add(direction);const to=centre.clone().add(direction.multiplyScalar(1.12));fibres.push(...from.toArray(),...to.toArray());}
    }
  });
  const detail=new THREE.BufferGeometry();detail.setAttribute('position',new THREE.Float32BufferAttribute(fibres,3));group.add(new THREE.LineSegments(detail,new THREE.LineBasicMaterial({color:0xf5f2e8,transparent:true,opacity:.55})));
  return group;
}
