import * as THREE from 'three';
import {surfaceRelief} from './surfaces';

/** Original unbranded steel drum, with rolled seams, hoops and two bung fittings. */
export function createOil():THREE.Group {
  const group=new THREE.Group();group.name='WTI light sweet crude illustrative drum';
  const art=document.createElement('canvas');art.width=2048;art.height=2048;
  const ctx=art.getContext('2d')!;ctx.scale(2,2);
  ctx.fillStyle='#303e41';ctx.fillRect(0,0,1024,1024);
  let seed=47;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
  for(let i=0;i<2800;i++){ctx.fillStyle=`rgba(170,180,174,${random()*.06})`;ctx.fillRect(random()*1024,random()*1024,.5+random(),3+random()*20);}
  ctx.fillStyle='#dfcc88';ctx.fillRect(0,392,1024,230);
  ctx.fillStyle='#263638';ctx.textAlign='center';ctx.font='600 76px sans-serif';ctx.fillText('WTI',256,472);ctx.font='24px sans-serif';ctx.fillText('LIGHT SWEET CRUDE',256,514);ctx.font='17px monospace';ctx.fillText('ILLUSTRATIVE SPECIMEN',256,554);
  ctx.font='20px monospace';ctx.fillStyle='#bfc7be';ctx.fillText('PETROLEUM',256,705);
  // Small chips follow the rolled hoops; avoid uniform noise over the entire paint.
  for(let i=0;i<650;i++){
    const x=random()*1024,y=[12,265,752,1008][i%4]+(random()-.5)*15;
    ctx.fillStyle=i%5===0?'rgba(113,82,50,.48)':'rgba(149,157,151,.42)';
    ctx.fillRect(x,y,1+random()*9,.4+random()*1.5);
  }
  for(let i=0;i<32;i++){
    const x=random()*1024,y=random()*1024;
    ctx.strokeStyle='rgba(192,198,188,.16)';ctx.lineWidth=.5;
    ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+3+random()*18,y+15+random()*65);ctx.stroke();
  }
  const map=new THREE.CanvasTexture(art);map.colorSpace=THREE.SRGBColorSpace;map.anisotropy=4;
  const micro=surfaceRelief('paint',512);micro.repeat.set(3,2);
  const paint=new THREE.MeshPhysicalMaterial({map,metalness:.65,roughness:.36,bumpMap:micro,bumpScale:.003,roughnessMap:micro,clearcoat:.35,clearcoatRoughness:.3});
  const steel=new THREE.MeshStandardMaterial({color:0x77817c,metalness:.92,roughness:.29});
  const lid=new THREE.MeshPhysicalMaterial({color:0x354548,metalness:.78,roughness:.38,bumpMap:micro,bumpScale:.0015,clearcoat:.22});
  const profile:THREE.Vector2[]=[];
  for(let i=0;i<=80;i++){
    const y=.075+i*2.17/80;
    const rib=.019*Math.exp(-Math.pow((y-.64)/.055,2))+.019*Math.exp(-Math.pow((y-1.67)/.055,2));
    profile.push(new THREE.Vector2(.785+rib+.004*Math.sin(y*19),y));
  }
  const shellGeometry=new THREE.LatheGeometry(profile,128);
  const shell=new THREE.Mesh(shellGeometry,paint);shell.castShadow=true;group.add(shell);
  const ring=(radius:number,tube:number,y:number,material:THREE.Material)=>{const mesh=new THREE.Mesh(new THREE.TorusGeometry(radius,tube,12,128),material);mesh.rotation.x=Math.PI/2;mesh.position.y=y;mesh.castShadow=true;group.add(mesh);};
  for(const y of [.09,2.23])ring(.79,.04,y,steel);
  for(const y of [.64,1.67]){ring(.798,.035,y,lid);ring(.791,.012,y-.045,steel);ring(.791,.012,y+.045,lid);}
  const diskGeometry=new THREE.CylinderGeometry(.785,.785,.035,128);
  for(const y of [.09,2.22]){const disk=new THREE.Mesh(diskGeometry,lid);disk.position.y=y;disk.castShadow=true;group.add(disk);}
  ring(.69,.012,2.243,lid);
  for(const [x,z,r] of [[.42,.29,.105],[-.43,-.3,.062]]){
    const collar=new THREE.Mesh(new THREE.CylinderGeometry(r,r,.035,24),steel);collar.position.set(x,2.255,z);group.add(collar);
    const cap=new THREE.Mesh(new THREE.CylinderGeometry(r*.75,r*.75,.028,6),lid);cap.position.set(x,2.281,z);group.add(cap);
    const groove=new THREE.Mesh(new THREE.BoxGeometry(r*.9,.004,.014),steel);groove.position.set(x,2.298,z);group.add(groove);
  }
  // Stamped lid ribs and a restrained seam; fine hardware survives close inspection.
  for(const r of [.56,.61,.72])ring(r,.004,2.244,steel);
  for(const [x,z] of [[.42,.29],[-.43,-.3]])for(let i=0;i<8;i++){
    const a=i*Math.PI/4,bolt=new THREE.Mesh(new THREE.CylinderGeometry(.009,.009,.008,6),steel);bolt.position.set(x+Math.cos(a)*.09,2.281,z+Math.sin(a)*.09);group.add(bolt);
  }
  const seam=new THREE.Mesh(new THREE.CylinderGeometry(.004,.004,2.07,6),steel);seam.position.set(0,1.16,-.788);group.add(seam);
  group.rotation.y=-.95;group.scale.setScalar(.74);return new THREE.Group().add(group);
}

/** A bound sheaf: curved stalks, paired kernels and fine awns, batched for rendering. */
export function createWheat():THREE.Group {
  const group=new THREE.Group();group.name='Hard Red Winter wheat harvest study';
  const straw=new THREE.MeshStandardMaterial({color:0xc6a25c,roughness:.72});
  const relief=surfaceRelief('grain');
  const grain=new THREE.MeshPhysicalMaterial({color:0xffffff,roughness:.53,bumpMap:relief,bumpScale:.0015,clearcoat:.06});
  const kernelGeometry=new THREE.SphereGeometry(1,16,12),kp=kernelGeometry.getAttribute('position');
  // Pointed glumes enclosing each spikelet, with a raised longitudinal keel.
  for(let i=0;i<kp.count;i++){
    const x=kp.getX(i),y=kp.getY(i),z=kp.getZ(i),taper=1-.40*Math.max(0,y);
    kp.setXYZ(i,x*taper,y,z*taper*(1+.12*Math.exp(-x*x*25)));
  }
  kernelGeometry.computeVertexNormals();
  const kernels=new THREE.InstancedMesh(kernelGeometry,grain,18*18);
  const dummy=new THREE.Object3D();const awns:number[]=[];let instance=0;
  for(let stalk=0;stalk<18;stalk++){
    const angle=stalk*2.39996,spread=.25+(stalk%4)*.105;
    const x=Math.cos(angle)*spread,z=Math.sin(angle)*spread;
    const top=1.63+(stalk%5)*.11;
    const curve=new THREE.QuadraticBezierCurve3(new THREE.Vector3(x*.30,.04,z*.30),new THREE.Vector3(x*.18,.9,z*.18),new THREE.Vector3(x,top,z));
    const stem=new THREE.Mesh(new THREE.TubeGeometry(curve,14,.012,8,false),straw);stem.castShadow=true;group.add(stem);
    const tilt=new THREE.Vector3(x*.28,1,z*.28).normalize();
    const head=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),tilt);
    for(let tier=0;tier<9;tier++)for(let side=0;side<2;side++){
      const a=angle+side*Math.PI+(tier%2)*.30;
      const width=.075*Math.sin((tier+2)/12*Math.PI);
      const local=new THREE.Vector3(Math.cos(a)*width,tier*.052,Math.sin(a)*width).applyQuaternion(head);
      dummy.position.set(x+local.x,top+local.y,z+local.z);
      dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),new THREE.Vector3(Math.cos(a)*.55,.8,Math.sin(a)*.55).applyQuaternion(head).normalize());
      dummy.scale.set(.032*(1+.08*Math.sin(stalk*7+tier)),.078*(1+.07*Math.cos(tier*11+stalk)),.026);dummy.updateMatrix();kernels.setMatrixAt(instance,dummy.matrix);
      kernels.setColorAt(instance,new THREE.Color().setHSL(.102+(stalk%3)*.006,.42,.56+(tier%3)*.045));instance++;
      const tip=dummy.position.clone().add(new THREE.Vector3(0,.06,0).applyQuaternion(dummy.quaternion));
      awns.push(tip.x,tip.y,tip.z,tip.x+Math.cos(a)*.055,tip.y+.20,tip.z+Math.sin(a)*.055);
    }
  }
  kernels.castShadow=true;group.add(kernels);
  const awnGeometry=new THREE.BufferGeometry();awnGeometry.setAttribute('position',new THREE.Float32BufferAttribute(awns,3));
  group.add(new THREE.LineSegments(awnGeometry,new THREE.LineBasicMaterial({color:0xb69550,transparent:true,opacity:.75})));
  const twine=new THREE.MeshStandardMaterial({color:0x806840,roughness:.95});
  for(let i=0;i<4;i++){
    const tie=new THREE.Mesh(new THREE.TorusGeometry(.19,.012,6,40),twine);tie.rotation.x=Math.PI/2;tie.position.y=.62+i*.025;tie.castShadow=true;group.add(tie);
  }
  // Set the cut stalk ends just above the receiving floor, rather than floating.
  group.scale.setScalar(.62);group.position.y=-.06;return new THREE.Group().add(group);
}
