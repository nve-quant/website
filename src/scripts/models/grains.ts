import * as THREE from 'three';
import {surfaceRelief} from './surfaces';

export function createCorn():THREE.Group {
  const group=new THREE.Group();group.name='Mature yellow dent corn with dry husks';
  const cream=new THREE.MeshStandardMaterial({color:0xead9a0,roughness:.85});
  const cobProfile=[[.035,.16],[.10,.23],[.13,.30],[.125,.95],[.115,1.30],[.085,1.50],[.04,1.67],[0,1.78]].map(([r,y])=>new THREE.Vector2(r,y));
  const cob=new THREE.Mesh(new THREE.LatheGeometry(cobProfile,32),cream);cob.castShadow=true;group.add(cob);
  const grain=new THREE.MeshPhysicalMaterial({color:0xffffff,roughness:.48,bumpMap:surfaceRelief('grain'),bumpScale:.001,clearcoat:.07,clearcoatRoughness:.48});
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
    dummy.position.set(Math.sin(a)*r,y+Math.sin(row*13+column*7)*.004,Math.cos(a)*r);dummy.rotation.set(0,a,0);dummy.scale.set(.038*taper*(1+.035*Math.sin(column*19+row)),.045*(1+.04*Math.cos(row*11+column)),.049*taper);dummy.updateMatrix();kernels.setMatrixAt(n,dummy.matrix);
    kernels.setColorAt(n,new THREE.Color().setHSL(.108+(column%3)*.003,.67,.49+(row%4)*.018));n++;
  }
  kernels.castShadow=true;group.add(kernels);
  const leafMaterial=new THREE.MeshStandardMaterial({color:0xc7b580,roughness:.87,side:THREE.DoubleSide,bumpMap:surfaceRelief('fibre'),bumpScale:.004});
  for(let leaf=0;leaf<5;leaf++){
    const angle=leaf*Math.PI*2/5+Math.sin(leaf*13)*.13,positions:number[]=[],indices:number[]=[],uvs:number[]=[],veins:number[]=[];
    for(let row=0;row<=20;row++){
      const t=row/20,width=Math.sin(Math.PI*t)**.75*(.16+(leaf%3)*.025)+.018*(1-t)**8;
      // Peel away below the first kernel row, then curl outward; never pass through the ear.
      const reach=.038+.31*(1-Math.exp(-t*12))+t*t*(.30+(leaf%3)*.05);
      const y=.10+t*1.30-Math.pow(t,3)*.65;
      for(let column=0;column<=6;column++){
        const side=(column/6-.5)*2,x=side*width,z=reach+Math.min(1,t*10)*((1-side*side)*.04+Math.sin(t*17+leaf)*Math.abs(side)*.018+Math.cos(side*40+t*3)*.0025);
        uvs.push(column/6,t);
        positions.push(x*Math.cos(angle)+z*Math.sin(angle),y,z*Math.cos(angle)-x*Math.sin(angle));
        if(row<20&&column<6){const i=row*7+column;indices.push(i,i+7,i+1,i+1,i+7,i+8);}
      }
      if(row<20){const nt=(row+1)/20,nr=.038+.31*(1-Math.exp(-nt*12))+nt*nt*(.30+(leaf%3)*.05),ny=.10+nt*1.30-nt*nt*nt*.65;veins.push((reach+Math.min(1,t*10)*.04)*Math.sin(angle),y+.002,(reach+Math.min(1,t*10)*.04)*Math.cos(angle),(nr+Math.min(1,nt*10)*.04)*Math.sin(angle),ny+.002,(nr+Math.min(1,nt*10)*.04)*Math.cos(angle));}
    }
    const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));geometry.setIndex(indices);geometry.computeVertexNormals();
    const husk=new THREE.Mesh(geometry,leafMaterial);husk.name='peeled-corn-husk';husk.castShadow=true;group.add(husk);
    const line=new THREE.BufferGeometry();line.setAttribute('position',new THREE.Float32BufferAttribute(veins,3));group.add(new THREE.LineSegments(line,new THREE.LineBasicMaterial({color:0xb7a473})));
  }
  const silkGeometry=new THREE.BufferGeometry(),silkPositions:number[]=[],silkIndices:number[]=[];
  for(let strand=0;strand<22;strand++){
    const a=strand*2.39996,r=.025+(strand%5)*.006;
    const curve=new THREE.CubicBezierCurve3(new THREE.Vector3(Math.cos(a)*r,1.76,Math.sin(a)*r),new THREE.Vector3(Math.cos(a)*.12,1.86,Math.sin(a)*.12),new THREE.Vector3(Math.cos(a)*.22,1.59,Math.sin(a)*.22),new THREE.Vector3(Math.cos(a)*.19,1.45-(strand%4)*.025,Math.sin(a)*.19));
    const tube=new THREE.TubeGeometry(curve,14,.0014,3,false),offset=silkPositions.length/3;
    silkPositions.push(...tube.getAttribute('position').array);silkIndices.push(...Array.from(tube.index!.array,n=>n+offset));tube.dispose();
  }
  silkGeometry.setAttribute('position',new THREE.Float32BufferAttribute(silkPositions,3));silkGeometry.setIndex(silkIndices);silkGeometry.computeVertexNormals();
  group.add(new THREE.Mesh(silkGeometry,new THREE.MeshStandardMaterial({color:0x82613a,roughness:.95})));
  const stalk=new THREE.Mesh(new THREE.CylinderGeometry(.045,.06,.22,10),cream);stalk.position.y=.07;stalk.castShadow=true;group.add(stalk);
  group.rotation.z=-.12;group.updateMatrixWorld(true);group.position.y=-.035-new THREE.Box3().setFromObject(group).min.y;return new THREE.Group().add(group);
}

export function createSoy():THREE.Group {
  const group=new THREE.Group();group.name='Loose dry yellow soybean commodity sample';
  const grain=surfaceRelief('grain');
  const seedMaterial=new THREE.MeshStandardMaterial({color:0xffffff,roughness:.64,bumpMap:grain,bumpScale:.00055});
  const seedGeometry=new THREE.SphereGeometry(1,28,20),positions=seedGeometry.getAttribute('position');
  // Very slight ovoid asymmetry and a shallow hilar depression. Mature dry
  // soybeans remain nearly round, unlike kidney-shaped beans or smooth beads.
  for(let i=0;i<positions.count;i++){
    const x=positions.getX(i),y=positions.getY(i),z=positions.getZ(i);
    const d=.018*Math.exp(-(x*x*30+(y-.6)**2*26+(z-.8)**2*26));
    positions.setXYZ(i,x*(1+.012*y),y-d*.6,z-d*.8);
  }
  seedGeometry.computeVertexNormals();
  const seeds=new THREE.InstancedMesh(seedGeometry,seedMaterial,16);seeds.name='loose soybean seeds';seeds.castShadow=seeds.receiveShadow=true;
  const hilumGeometry=new THREE.SphereGeometry(1,14,10);
  const hila=new THREE.InstancedMesh(hilumGeometry,new THREE.MeshStandardMaterial({color:0x8c7248,roughness:.87}),16);
  const placed:{x:number;z:number;bound:number}[]=[];let randomSeed=81937;
  const random=()=>{randomSeed=(Math.imul(randomSeed,1664525)+1013904223)>>>0;return randomSeed/4294967296;};
  const seedTransform=new THREE.Object3D(),hilumTransform=new THREE.Object3D(),vertex=new THREE.Vector3();
  for(let i=0;i<16;i++){
    const radius=.142+random()*.032,bound=radius*1.025;
    let x=0,z=0,found=false;
    for(let attempt=0;attempt<4000;attempt++){
      const angle=random()*Math.PI*2,reach=Math.sqrt(random());x=Math.cos(angle)*reach*.96;z=Math.sin(angle)*reach*.74;
      if(placed.every(other=>Math.hypot(x-other.x,z-other.z)>bound+other.bound+.012)){found=true;break;}
    }
    if(!found)throw new Error('Soybean sample placement could not maintain clearance');
    placed.push({x,z,bound});
    seedTransform.position.set(x,0,z);seedTransform.rotation.set(random()*Math.PI*2,random()*Math.PI*2,random()*Math.PI*2);
    seedTransform.scale.set(radius,radius*(.94+random()*.04),radius*(.95+random()*.045));seedTransform.updateMatrix();
    // Rest each rotated mesh on an actual surface vertex, rather than a loose
    // transformed bounding box. Every seed has its own floor contact.
    let lowest=Infinity;
    for(let j=0;j<positions.count;j++){vertex.fromBufferAttribute(positions,j).applyMatrix4(seedTransform.matrix);lowest=Math.min(lowest,vertex.y);}
    seedTransform.position.y=-.035-lowest;seedTransform.updateMatrix();seeds.setMatrixAt(i,seedTransform.matrix);
    seeds.setColorAt(i,new THREE.Color().setHSL(.116+random()*.009,.30+random()*.045,.66+random()*.035));
    // The short brown seed scar sits into the shallow depression. Its position
    // follows the same seed transform; some scars naturally face away.
    hilumTransform.position.set(0,.6*.981,.8*.981);hilumTransform.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),new THREE.Vector3(0,.6,.8));
    hilumTransform.scale.set(.058,.145,.011);hilumTransform.updateMatrix();hila.setMatrixAt(i,seedTransform.matrix.clone().multiply(hilumTransform.matrix));
  }
  // Tight world-local bounds prevent a rotated cube approximation from claiming
  // these round seeds penetrate the floor (and improve instance culling bounds).
  for(const mesh of [seeds,hila]){
    const bounds=new THREE.Box3(),matrix=new THREE.Matrix4(),vertices=mesh.geometry.getAttribute('position');
    for(let i=0;i<mesh.count;i++){mesh.getMatrixAt(i,matrix);for(let j=0;j<vertices.count;j++)bounds.expandByPoint(vertex.fromBufferAttribute(vertices,j).applyMatrix4(matrix));}
    mesh.boundingBox=bounds;
  }
  group.add(seeds,hila);return group;
}
