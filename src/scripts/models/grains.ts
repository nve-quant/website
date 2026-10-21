import * as THREE from 'three';
import {surfaceRelief} from './surfaces';

export function createCorn():THREE.Group {
  const group=new THREE.Group();
  const cream=new THREE.MeshStandardMaterial({color:0xead9a0,roughness:.85});
  const cob=new THREE.Mesh(new THREE.CapsuleGeometry(.12,1.32,8,24),cream);cob.position.y=.95;cob.castShadow=true;group.add(cob);
  const grain=new THREE.MeshPhysicalMaterial({color:0xffffff,roughness:.4,bumpMap:surfaceRelief('grain'),bumpScale:.001,clearcoat:.16,clearcoatRoughness:.3});
  const kernelGeometry=new THREE.SphereGeometry(1,20,14),kp=kernelGeometry.getAttribute('position');
  for(let i=0;i<kp.count;i++){
    const x=kp.getX(i),y=kp.getY(i),z=kp.getZ(i);
    const dent=z>0?.28*Math.exp(-(x*x*7+y*y*9))*z:0;
    kp.setXYZ(i,Math.sign(x)*Math.pow(Math.abs(x),.78),Math.sign(y)*Math.pow(Math.abs(y),.83),z-dent);
  }
  kernelGeometry.computeVertexNormals();
  const kernels=new THREE.InstancedMesh(kernelGeometry,grain,18*16);
  const dummy=new THREE.Object3D();let n=0;
  for(let row=0;row<18;row++)for(let column=0;column<16;column++){
    const y=.28+row*.086,a=(column+(row%2)*.10)/16*Math.PI*2;
    const taper=1-.73*Math.pow(row/17,5),r=.155*taper;
    dummy.position.set(Math.sin(a)*r,y+Math.sin(row*13+column*7)*.004,Math.cos(a)*r);dummy.rotation.set(0,a,0);dummy.scale.set(.036*taper,.047,.048*taper);dummy.updateMatrix();kernels.setMatrixAt(n,dummy.matrix);
    kernels.setColorAt(n,new THREE.Color().setHSL(.115+(column%3)*.003,.75,.50+(row%4)*.018));n++;
  }
  kernels.castShadow=true;group.add(kernels);
  const leafMaterial=new THREE.MeshStandardMaterial({color:0xb2a16a,roughness:.75,side:THREE.DoubleSide,bumpMap:surfaceRelief('fibre'),bumpScale:.004});
  for(let leaf=0;leaf<5;leaf++){
    const angle=leaf*Math.PI*2/5,positions:number[]=[],indices:number[]=[],uvs:number[]=[],veins:number[]=[];
    for(let row=0;row<=20;row++){
      const t=row/20,width=Math.sin(Math.PI*t)*.20,reach=.10+Math.pow(t,2)*.62;
      const y=.10+t*1.30-Math.pow(t,3)*.65;
      for(let column=0;column<=6;column++){
        const side=(column/6-.5)*2,x=side*width,z=reach+(1-side*side)*.04+Math.sin(t*17+leaf)*Math.abs(side)*.012;
        uvs.push(column/6,t);
        positions.push(x*Math.cos(angle)+z*Math.sin(angle),y,z*Math.cos(angle)-x*Math.sin(angle));
        if(row<20&&column<6){const i=row*7+column;indices.push(i,i+7,i+1,i+1,i+7,i+8);}
      }
      if(row<20){const nt=(row+1)/20,nr=.10+nt*nt*.62,ny=.10+nt*1.30-nt*nt*nt*.65;veins.push((reach+.04)*Math.sin(angle),y+.002,(reach+.04)*Math.cos(angle),(nr+.04)*Math.sin(angle),ny+.002,(nr+.04)*Math.cos(angle));}
    }
    const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));geometry.setIndex(indices);geometry.computeVertexNormals();
    const husk=new THREE.Mesh(geometry,leafMaterial);husk.castShadow=true;group.add(husk);
    const line=new THREE.BufferGeometry();line.setAttribute('position',new THREE.Float32BufferAttribute(veins,3));group.add(new THREE.LineSegments(line,new THREE.LineBasicMaterial({color:0xc3c68b})));
  }
  const stalk=new THREE.Mesh(new THREE.CylinderGeometry(.045,.06,.22,10),cream);stalk.position.y=.07;stalk.castShadow=true;group.add(stalk);
  group.rotation.z=-.12;group.updateMatrixWorld(true);group.position.y=-.035-new THREE.Box3().setFromObject(group).min.y;return new THREE.Group().add(group);
}

export function createSoy():THREE.Group {
  const group=new THREE.Group();
  const shellMaterial=new THREE.MeshStandardMaterial({color:0x99845c,roughness:.9,side:THREE.DoubleSide,bumpMap:surfaceRelief('fibre'),bumpScale:.003});
  const seedMaterial=new THREE.MeshStandardMaterial({color:0xd8c899,roughness:.56,bumpMap:surfaceRelief('grain'),bumpScale:.001});
  const seedGeometry=new THREE.SphereGeometry(1,24,16);
  const hilumMaterial=new THREE.MeshStandardMaterial({color:0x847553,roughness:.86});
  const hilumGeometry=new THREE.SphereGeometry(1,12,8);
  const bean=(parent:THREE.Group,x:number,y:number,z:number,size=.16)=>{
    const seed=new THREE.Mesh(seedGeometry,seedMaterial);seed.position.set(x,y,z);seed.scale.set(size,size*.9,size*.86);seed.castShadow=true;parent.add(seed);
    const hilum=new THREE.Mesh(hilumGeometry,hilumMaterial);hilum.scale.set(size*.14,size*.35,.008);hilum.position.set(x,y,z+size*.85);parent.add(hilum);
  };
  for(let pod=0;pod<3;pod++){
    const body=new THREE.Group();const positions:number[]=[],indices:number[]=[],uvs:number[]=[];
    // Three swollen seed chambers, tapered ends and an open front seam.
    for(let row=0;row<=36;row++)for(let column=0;column<=20;column++){
      const t=row/36,y=t*1.42;
      const lobes=[.30,.70,1.10].reduce((sum,c)=>sum+Math.exp(-Math.pow((y-c)/.19,2)),0);
      const radius=(.065+.13*lobes)*Math.sin(Math.PI*t)**.3;
      const a=.70+column/20*(Math.PI*2-1.4);
      uvs.push(column/20,t);
      positions.push(Math.sin(a)*radius,y,Math.cos(a)*radius);
      if(row<36&&column<20){const i=row*21+column;indices.push(i,i+21,i+1,i+1,i+21,i+22);}
    }
    const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));geometry.setIndex(indices);geometry.computeVertexNormals();
    const shell=new THREE.Mesh(geometry,shellMaterial);shell.castShadow=shell.receiveShadow=true;body.add(shell);
    // Raised seam follows each swollen chamber, instead of a smooth open tube.
    for(const angle of [.70,Math.PI*2-.70]){
      const points=[];
      for(let j=0;j<=36;j++){
        const y=j/36*1.42,lobes=[.30,.70,1.10].reduce((sum,c)=>sum+Math.exp(-Math.pow((y-c)/.19,2)),0);
        const radius=(.065+.13*lobes)*Math.sin(Math.PI*j/36)**.3;
        points.push(new THREE.Vector3(Math.sin(angle)*radius,y,Math.cos(angle)*radius));
      }
      const seam=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),36,.006,5,false),shellMaterial);body.add(seam);
    }
    for(const y of [.30,.70,1.10])bean(body,0,y,.015,.155);
    body.rotation.z=(pod-1)*.32;body.rotation.y=(pod-1)*.35;body.position.set((pod-1)*.35,0,pod===1?.20:-.10);body.updateMatrixWorld(true);body.position.y=-.035-new THREE.Box3().setFromObject(body).min.y;group.add(body);
  }
  bean(group,.56,.091,.58,.14);bean(group,-.42,.082,.54,.13);bean(group,.08,.082,.70,.13);
  group.rotation.y=-.15;return group;
}
