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
      const t=row/20,width=Math.sin(Math.PI*t)**.75*(.16+(leaf%3)*.025);
      // Peel away below the first kernel row, then curl outward; never pass through the ear.
      const reach=.10+.23*(1-Math.exp(-t*10))+t*t*(.30+(leaf%3)*.05);
      const y=.10+t*1.30-Math.pow(t,3)*.65;
      for(let column=0;column<=6;column++){
        const side=(column/6-.5)*2,x=side*width,z=reach+(1-side*side)*.04+Math.sin(t*17+leaf)*Math.abs(side)*.018+Math.cos(side*40+t*3)*.0025;
        uvs.push(column/6,t);
        positions.push(x*Math.cos(angle)+z*Math.sin(angle),y,z*Math.cos(angle)-x*Math.sin(angle));
        if(row<20&&column<6){const i=row*7+column;indices.push(i,i+7,i+1,i+1,i+7,i+8);}
      }
      if(row<20){const nt=(row+1)/20,nr=.10+.23*(1-Math.exp(-nt*10))+nt*nt*(.30+(leaf%3)*.05),ny=.10+nt*1.30-nt*nt*nt*.65;veins.push((reach+.04)*Math.sin(angle),y+.002,(reach+.04)*Math.cos(angle),(nr+.04)*Math.sin(angle),ny+.002,(nr+.04)*Math.cos(angle));}
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
  const group=new THREE.Group();group.name='Split dry soybean pod with yellow seeds';
  const fibre=surfaceRelief('fibre'),grain=surfaceRelief('grain');
  const outer=new THREE.MeshStandardMaterial({color:0x9e8156,roughness:.93,bumpMap:fibre,bumpScale:.0018});
  const inner=new THREE.MeshStandardMaterial({color:0xd2b98a,roughness:.96,bumpMap:fibre,bumpScale:.0007});
  const seamMaterial=new THREE.MeshStandardMaterial({color:0x8c704a,roughness:.97});
  // A split pod is two thin, concave valves, not a perforated cylindrical tube.
  const sample=(t:number,v:number,inside=true)=>{
    const envelope=Math.sin(Math.PI*t)**.60;
    const chamber=.86+.14*Math.cos((t-.18)*Math.PI*6);
    const width=.205*envelope*chamber;
    return new THREE.Vector3((t-.5)*1.92,-.025+.135*envelope*v*v+(inside?.008:0),.035*Math.sin(t*Math.PI*1.3)+width*v);
  };
  const valve=()=>{
    const body=new THREE.Group(),positions:number[]=[],uvs:number[]=[],indices:number[]=[];
    const rows=48,columns=20,count=(rows+1)*(columns+1);
    for(let layer=0;layer<2;layer++)for(let row=0;row<=rows;row++)for(let col=0;col<=columns;col++){
      const t=row/rows,v=col/columns*2-1,p=sample(t,v,layer===0);
      positions.push(p.x,p.y,p.z);uvs.push(col/columns,t);
    }
    for(let layer=0;layer<2;layer++)for(let row=0;row<rows;row++)for(let col=0;col<columns;col++){
      const a=layer*count+row*(columns+1)+col,b=a+columns+1;
      if(layer===0)indices.push(a,a+1,b,a+1,b+1,b);else indices.push(a,b,a+1,a+1,b,b+1);
    }
    // Join the two surfaces at both long edges, leaving no paper-thin silhouette.
    for(let row=0;row<rows;row++)for(const col of [0,columns]){
      const a=row*(columns+1)+col,b=a+columns+1;indices.push(a,a+count,b,b,a+count,b+count);
    }
    const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));geometry.setIndex(indices);
    geometry.addGroup(0,rows*columns*6,0);geometry.addGroup(rows*columns*6,indices.length-rows*columns*6,1);geometry.computeVertexNormals();
    const shell=new THREE.Mesh(geometry,[inner,outer]);shell.castShadow=shell.receiveShadow=true;body.add(shell);
    for(const v of [-1,1]){
      const points=Array.from({length:49},(_,i)=>sample(i/48,v));
      const edge=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),48,.004,5,false),seamMaterial);edge.castShadow=true;body.add(edge);
    }
    return body;
  };
  const occupied=valve();occupied.rotation.y=-.14;occupied.position.z=.14;group.add(occupied);
  // The empty opposite valve has twisted open and rests behind the seeded half.
  const empty=valve();empty.rotation.set(-.28,.16,.025);empty.position.set(-.05,0,-.41);empty.updateMatrixWorld(true);empty.position.y=-.025-new THREE.Box3().setFromObject(empty).min.y;group.add(empty);
  const seedGeometry=new THREE.SphereGeometry(1,28,20),seedPositions=seedGeometry.getAttribute('position');
  for(let i=0;i<seedPositions.count;i++){
    const x=seedPositions.getX(i),y=seedPositions.getY(i),z=seedPositions.getZ(i);
    const d=.035*Math.exp(-(x*x*20+(y-.6)**2*18+(z-.8)**2*18));
    seedPositions.setXYZ(i,x*(1+.018*y),y-d*.6,z-d*.8);
  }
  seedGeometry.computeVertexNormals();
  const hilumGeometry=new THREE.SphereGeometry(1,14,10),hilumMaterial=new THREE.MeshStandardMaterial({color:0x806744,roughness:.9});
  const bean=(parent:THREE.Group,x:number,z:number,r:number,angle:number,lift=0)=>{
    const seedGroup=new THREE.Group();
    const material=new THREE.MeshStandardMaterial({color:new THREE.Color().setHSL(.115,.38,.64+.025*Math.sin(angle*7)),roughness:.67,bumpMap:grain,bumpScale:.00065});
    const seed=new THREE.Mesh(seedGeometry,material);seed.scale.set(r,r*.91,r*.94);seed.castShadow=seed.receiveShadow=true;seedGroup.add(seed);
    const normal=new THREE.Vector3(0,.6,.8),hilum=new THREE.Mesh(hilumGeometry,hilumMaterial);
    hilum.scale.set(r*.075,r*.19,.003);hilum.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),normal);hilum.position.set(0,r*.91*.6,r*.94*.8);seedGroup.add(hilum);
    seedGroup.rotation.set(.12*Math.sin(angle),angle,.08*Math.cos(angle));seedGroup.position.set(x,0,z);seedGroup.updateMatrixWorld(true);
    seedGroup.position.y=lift-.025-new THREE.Box3().setFromObject(seedGroup).min.y;parent.add(seedGroup);
  };
  // Seeds sit in the valve, with independently rotated loose seeds in the foreground.
  bean(occupied,-.51,.024,.151,.4,.010);bean(occupied,-.015,.033,.164,-.7,.010);bean(occupied,.49,.038,.153,1.8,.010);
  bean(group,-.65,.65,.148,2.4);bean(group,.02,.77,.156,-1.2);bean(group,.62,.60,.142,.8);bean(group,.94,.25,.137,-2.4);
  // Scale the low still-life by width while preserving contact with the studio floor.
  group.scale.setScalar(1.12);group.updateMatrixWorld(true);group.position.y=-.035-new THREE.Box3().setFromObject(group).min.y;
  return new THREE.Group().add(group);
}
