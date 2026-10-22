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
    const ring=mesh(new THREE.TorusGeometry(.482,.006,8,64),steel,x,.71,0);ring.rotation.y=Math.PI/2;
    // Contoured saddle bears on the lower shell; the old rectangular block intersected it.
    const saddle=new THREE.Shape();saddle.moveTo(-.40,0);saddle.lineTo(.40,0);saddle.lineTo(.40,.43);
    for(let i=0;i<=24;i++){const z=.40-i*.8/24;saddle.lineTo(z,.71-Math.sqrt(.485*.485-z*z));}
    saddle.closePath();const support=new THREE.ExtrudeGeometry(saddle,{depth:.14,bevelEnabled:false});
    const supportMesh=mesh(support,frame,x-.07,0,0);supportMesh.rotation.y=Math.PI/2;
    mesh(new RoundedBoxGeometry(.32,.045,.88,1,.01),steel,x,-.01,0);
  }
  for(const x of [-.54,.54])for(const z of [-.35,.35])mesh(new THREE.CylinderGeometry(.024,.024,.026,6),frame,x,.023,z);
  for(const x of [-.675,.675]){const weld=mesh(new THREE.TorusGeometry(.48,.004,6,64),steel,x,.71,0);weld.rotation.y=Math.PI/2;}
  const flange=mesh(new THREE.CylinderGeometry(.087,.087,.045,40),frame,1.19,.72,0);flange.rotation.z=Math.PI/2;
  for(let i=0;i<6;i++){const a=i*Math.PI/3;const bolt=mesh(new THREE.CylinderGeometry(.011,.011,.057,6),steel,1.19,.72+Math.cos(a)*.065,Math.sin(a)*.065);bolt.rotation.z=Math.PI/2;}
  const pipeCurve=new THREE.CatmullRomCurve3([new THREE.Vector3(.89,.72,0),new THREE.Vector3(1.25,.72,0),new THREE.Vector3(1.30,1.18,0),new THREE.Vector3(.68,1.25,0),new THREE.Vector3(.60,1.14,0)]);
  mesh(new THREE.TubeGeometry(pipeCurve,36,.025,12,false),steel,0,0,0);
  mesh(new THREE.CylinderGeometry(.038,.038,.10,16),valve,1.3,1.07,0);
  const wheel=mesh(new THREE.TorusGeometry(.11,.013,10,32),valve,1.3,1.07,.09);
  for(let i=0;i<4;i++){const spoke=mesh(new THREE.BoxGeometry(.20,.012,.012),valve,1.3,1.07,.09);spoke.rotation.z=i*Math.PI/4;}
  wheel.rotation.z=.2;
  mesh(new THREE.CylinderGeometry(.027,.027,.09,12),steel,.15,1.22,0);
  const gauge=mesh(new THREE.CylinderGeometry(.09,.09,.035,32),frame,.15,1.32,.035);gauge.rotation.x=Math.PI/2;
  const dial=document.createElement('canvas');dial.width=dial.height=256;const d=dial.getContext('2d')!;d.fillStyle='#e5e4d4';d.fillRect(0,0,256,256);d.strokeStyle='#364b44';d.lineWidth=4;
  for(let i=0;i<13;i++){const a=(i/12*1.5+.75)*Math.PI;d.beginPath();d.moveTo(128+Math.cos(a)*78,128+Math.sin(a)*78);d.lineTo(128+Math.cos(a)*94,128+Math.sin(a)*94);d.stroke();}d.beginPath();d.moveTo(128,128);d.lineTo(85,68);d.stroke();
  const dialMap=new THREE.CanvasTexture(dial);dialMap.colorSpace=THREE.SRGBColorSpace;
  mesh(new THREE.CircleGeometry(.077,32),new THREE.MeshStandardMaterial({map:dialMap,roughness:.5}),.15,1.32,.055);
  const label=document.createElement('canvas');label.width=1024;label.height=256;const ctx=label.getContext('2d')!;ctx.fillStyle='#dfe3cf';ctx.fillRect(0,0,1024,256);ctx.fillStyle='#304941';ctx.textAlign='center';ctx.font='600 78px sans-serif';ctx.fillText('NATURAL GAS',512,115);ctx.font='28px monospace';ctx.fillText('PRESSURE VESSEL',512,188);
  const map=new THREE.CanvasTexture(label);map.colorSpace=THREE.SRGBColorSpace;map.anisotropy=8;
  const labelGeometry=new THREE.PlaneGeometry(1.0,.25,20,8),labelPositions=labelGeometry.getAttribute('position');
  for(let i=0;i<labelPositions.count;i++){const y=labelPositions.getY(i)+.04;labelPositions.setZ(i,Math.sqrt(.483*.483-y*y)-.484);}
  labelGeometry.computeVertexNormals();
  mesh(labelGeometry,new THREE.MeshStandardMaterial({map,roughness:.7}),0,.75,.484);
  group.rotation.y=-.1;return group;
}

export function createCoffee():THREE.Group {
  const group=new THREE.Group();group.name='Arabica green coffee in an open jute sack';
  let seed=87193;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
  const cloth=surfaceRelief('cloth',512);cloth.repeat.set(4,2);
  const art=document.createElement('canvas');art.width=1024;art.height=1024;const ctx=art.getContext('2d')!;
  ctx.fillStyle='#a48e68';ctx.fillRect(0,0,1024,1024);
  // Yarn-sized colour variations, rather than a uniform checkered noise overlay.
  for(let y=0;y<1024;y+=3){ctx.fillStyle=`rgba(231,213,171,${.05+random()*.10})`;ctx.fillRect(0,y,1024,1);}
  for(let x=0;x<1024;x+=3){ctx.fillStyle=`rgba(66,48,28,${.05+random()*.10})`;ctx.fillRect(x,0,1,1024);}
  for(let i=0;i<5000;i++){ctx.fillStyle=i%2?'rgba(228,210,170,.15)':'rgba(58,42,24,.12)';ctx.fillRect(random()*1024,random()*1024,.5+random(),2+random()*9);}
  ctx.fillStyle='rgba(45,56,40,.65)';ctx.textAlign='center';ctx.font='500 36px monospace';ctx.fillText('ARABICA',255,565);ctx.font='19px monospace';ctx.fillText('GREEN COFFEE',255,600);
  const map=new THREE.CanvasTexture(art);map.colorSpace=THREE.SRGBColorSpace;map.anisotropy=8;
  const fabric=new THREE.MeshStandardMaterial({map,bumpMap:cloth,bumpScale:.003,roughness:.98,side:THREE.DoubleSide});
  // A slumped, flattened bag: broad gusseted base, weight-bearing belly and an uneven folded mouth.
  const surface=(a:number,t:number)=>{
    const width=.43+.24*Math.sin(Math.PI*t*.91)-.045*t;
    const depth=.28+.15*Math.sin(Math.PI*t*.92)-.015*t;
    const crease=(.018*Math.sin(a*5+t*7)+.012*Math.sin(a*9-t*4))*Math.sin(Math.PI*t);
    const mouthHeight=1.04-.11*Math.sin(a)+.025*Math.sin(a*3+.7);
    const pinch=.055*Math.exp(-Math.pow((Math.cos(a)-.92)/.19,2))*Math.pow(t,3);
    return new THREE.Vector3(.055*t*t+(width+crease-pinch)*Math.cos(a),t*mouthHeight,(depth+crease)*Math.sin(a)+.035*Math.sin(t*Math.PI));
  };
  const vertices:number[]=[],uv:number[]=[],indices:number[]=[];
  const columns=96,rows=48;
  for(let row=0;row<=rows;row++)for(let col=0;col<=columns;col++){
    const a=col/columns*Math.PI*2,t=row/rows,p=surface(a,t);vertices.push(p.x,p.y,p.z);uv.push(col/columns,t);
    if(row<rows&&col<columns){const n=row*(columns+1)+col;indices.push(n,n+columns+1,n+1,n+1,n+columns+1,n+columns+2);}
  }
  const bodyGeometry=new THREE.BufferGeometry();bodyGeometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));bodyGeometry.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));bodyGeometry.setIndex(indices);bodyGeometry.computeVertexNormals();
  const sack=new THREE.Mesh(bodyGeometry,fabric);sack.castShadow=sack.receiveShadow=true;group.add(sack);
  const cuffVertices:number[]=[],cuffUv:number[]=[],cuffIndices:number[]=[];
  for(let row=0;row<=8;row++)for(let col=0;col<=columns;col++){
    const a=col/columns*Math.PI*2,t=row/8,p=surface(a,1),out=.008+.022*Math.sin(Math.PI*t);
    cuffVertices.push(p.x+Math.cos(a)*out,p.y-.105*t+.006*Math.sin(a*7)*t,p.z+Math.sin(a)*out);cuffUv.push(col/columns,.9+t*.1);
    if(row<8&&col<columns){const n=row*(columns+1)+col;cuffIndices.push(n,n+1,n+columns+1,n+1,n+columns+2,n+columns+1);}
  }
  const cuffGeometry=new THREE.BufferGeometry();cuffGeometry.setAttribute('position',new THREE.Float32BufferAttribute(cuffVertices,3));cuffGeometry.setAttribute('uv',new THREE.Float32BufferAttribute(cuffUv,2));cuffGeometry.setIndex(cuffIndices);cuffGeometry.computeVertexNormals();
  const cuff=new THREE.Mesh(cuffGeometry,fabric);cuff.castShadow=cuff.receiveShadow=true;group.add(cuff);
  const seams:number[]=[];
  for(let i=0;i<65;i++){
    const t=.025+i*.014,a=-1.8,p=surface(a,t),q=surface(a+.018,t+.008);p.add(new THREE.Vector3(Math.cos(a)*.004,0,Math.sin(a)*.004));q.add(new THREE.Vector3(Math.cos(a)*.004,0,Math.sin(a)*.004));seams.push(...p.toArray(),...q.toArray());
  }
  const seamGeometry=new THREE.BufferGeometry();seamGeometry.setAttribute('position',new THREE.Float32BufferAttribute(seams,3));group.add(new THREE.LineSegments(seamGeometry,new THREE.LineBasicMaterial({color:0x6e5c40})));
  const beanGeometry=new THREE.SphereGeometry(1,20,12),bp=beanGeometry.getAttribute('position');
  for(let i=0;i<bp.count;i++){
    const x=bp.getX(i),y=bp.getY(i),z=bp.getZ(i),taper=1-.13*z;
    const cleft=.26*Math.exp(-Math.pow((x+.055*Math.sin(z*4))/.13,2))*Math.max(0,1-z*z);
    bp.setXYZ(i,x*taper,y>0?.36*y-cleft:y*.70,z+.035*Math.sin(x*3)*(1-z*z));
  }
  beanGeometry.computeVertexNormals();
  const dummy=new THREE.Object3D(),point=new THREE.Vector3();
  const placements:{matrix:THREE.Matrix4;bounds:THREE.Box3;color:THREE.Color}[]=[];
  const bedHeight=(x:number,z:number)=>.99-.12*(((x-.05)/.44)**2+(z/.28)**2);
  // Each visible kernel rests on the filled surface itself, never on a neighbour's box.
  // Boxes only reject overlapping footprints; they do not determine support height.
  for(let attempt=0;attempt<6000&&placements.length<120;attempt++){
    const loose=attempt>=5500;
    let x:number,z:number,r:number;
    if(!loose){do{x=(random()*2-1)*.39;z=(random()*2-1)*.20;r=(x/.42)**2+(z/.235)**2;}while(r>.87);}
    else{do{x=(random()*2-1)*.95;z=.28+random()*.66;r=(x/.68)**2+(z/.47)**2;}while(r<1.3);}
    if(loose&&placements.filter(p=>p.bounds.min.y<.01).length>=20)break;
    const size=.90+random()*.15;
    dummy.position.set(x+.05,0,z);dummy.rotation.set((random()-.5)*.35,random()*Math.PI*2,(random()-.5)*.25);
    if(attempt%11===0)dummy.rotation.x+=Math.PI;
    dummy.scale.set(.024*size,.038*size,.035*size);dummy.updateMatrix();
    const bounds=new THREE.Box3();let lift=-Infinity;
    for(let j=0;j<bp.count;j++){
      point.fromBufferAttribute(bp,j).applyMatrix4(dummy.matrix);bounds.expandByPoint(point);
      lift=Math.max(lift,(loose?0:bedHeight(point.x,point.z))-point.y);
    }
    if(placements.some(p=>bounds.max.x>p.bounds.min.x-.001&&bounds.min.x<p.bounds.max.x+.001&&bounds.max.z>p.bounds.min.z-.001&&bounds.min.z<p.bounds.max.z+.001))continue;
    dummy.position.y=lift;dummy.updateMatrix();bounds.translate(new THREE.Vector3(0,lift,0));
    placements.push({matrix:dummy.matrix.clone(),bounds,color:new THREE.Color().setHSL(.18+random()*.035,.13+random()*.08,.44+random()*.13)});
  }
  const beans=new THREE.InstancedMesh(beanGeometry,new THREE.MeshStandardMaterial({color:0xffffff,roughness:.83,bumpMap:surfaceRelief('grain'),bumpScale:.0008}),placements.length);
  beans.name='coffee kernels';
  placements.forEach((placement,i)=>{beans.setMatrixAt(i,placement.matrix);beans.setColorAt(i,placement.color);});
  // The support mesh is the same height field used for contact placement.
  const bedPositions:number[]=[],bedUv:number[]=[],bedIndices:number[]=[];
  for(let ring=0;ring<=20;ring++)for(let sector=0;sector<=80;sector++){
    const r=ring/20,a=sector/80*Math.PI*2,x=.05+Math.cos(a)*r*.44,z=Math.sin(a)*r*.28;
    bedPositions.push(x,bedHeight(x,z),z);bedUv.push((x-.05)/.88+.5,z/.56+.5);
    if(ring<20&&sector<80){const i=ring*81+sector;bedIndices.push(i,i+1,i+81,i+1,i+82,i+81);}
  }
  const bedGeometry=new THREE.BufferGeometry();bedGeometry.setAttribute('position',new THREE.Float32BufferAttribute(bedPositions,3));bedGeometry.setAttribute('uv',new THREE.Float32BufferAttribute(bedUv,2));bedGeometry.setIndex(bedIndices);bedGeometry.computeVertexNormals();
  const bulk=new THREE.Mesh(bedGeometry,new THREE.MeshStandardMaterial({color:0x717660,roughness:1,bumpMap:surfaceRelief('grain'),bumpScale:.001}));
  bulk.name='coffee support surface';bulk.castShadow=bulk.receiveShadow=true;group.add(bulk);
  beans.castShadow=beans.receiveShadow=true;group.add(beans);
  group.rotation.y=-.45;group.position.y=-.035;return group;
}

export function createCotton():THREE.Group {
  const group=new THREE.Group(),branch=new THREE.MeshStandardMaterial({color:0x766047,roughness:.95});
  const white=new THREE.MeshStandardMaterial({color:0xf0eddf,roughness:1,bumpMap:surfaceRelief('fibre'),bumpScale:.008});
  const bollGeometry=new THREE.SphereGeometry(1,32,24),p=bollGeometry.getAttribute('position');
  const lobeRadius=(x:number,y:number,z:number)=>1+.065*Math.sin(x*9+y*7)*Math.cos(z*8)+.022*Math.sin(x*31+y*23)*Math.cos(z*29);
  for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),z=p.getZ(i),r=lobeRadius(x,y,z);p.setXYZ(i,x*r,y*r,z*r);}bollGeometry.computeVertexNormals();
  const bractMaterial=new THREE.MeshStandardMaterial({color:0x84623e,roughness:.98,side:THREE.DoubleSide,bumpMap:surfaceRelief('fibre'),bumpScale:.003});
  const endpoints=[new THREE.Vector3(-.42,.94,.1),new THREE.Vector3(.35,1.25,.02),new THREE.Vector3(-.12,1.65,-.10)];
  const fibres:number[]=[];
  endpoints.forEach((end,index)=>{
    const curve=new THREE.QuadraticBezierCurve3(new THREE.Vector3(0,-.03,0),new THREE.Vector3(index===1?.04:-.12,.65,.03),end);
    const stem=new THREE.Mesh(new THREE.TubeGeometry(curve,20,.018,8,false),branch);stem.castShadow=true;group.add(stem);
    for(let lobe=0;lobe<5;lobe++){
      const a=lobe/5*Math.PI*2,centre=end.clone().add(new THREE.Vector3(Math.cos(a)*.15,.02,Math.sin(a)*.15));
      const cotton=new THREE.Mesh(bollGeometry,white);cotton.scale.set(.17*(1+.12*Math.sin(lobe*3+index)),.20,.16);cotton.rotation.set(lobe*.37,index*.6,lobe*.23);cotton.position.copy(centre);cotton.castShadow=true;group.add(cotton);
      const leaf=new THREE.BufferGeometry(),vertices:number[]=[],indices:number[]=[],uv:number[]=[];
      for(let row=0;row<=10;row++){
        const t=row/10,width=.07*Math.sin(Math.PI*t),r=.04+t*.26,y=-.12+.18*t-.20*t*t;
        for(const side of [-1,0,1]){vertices.push(Math.cos(a)*r-Math.sin(a)*width*side,y+(side===0?.025*Math.sin(Math.PI*t):0),Math.sin(a)*r+Math.cos(a)*width*side);uv.push((side+1)/2,t);}
        if(row<10)for(let col=0;col<2;col++){const n=row*3+col;indices.push(n,n+3,n+1,n+1,n+3,n+4);}
      }
      leaf.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));leaf.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));leaf.setIndex(indices);leaf.computeVertexNormals();
      const bract=new THREE.Mesh(leaf,bractMaterial);bract.position.copy(end);bract.castShadow=true;group.add(bract);
      cotton.updateMatrix();
      for(let j=0;j<110;j++){
        const t=j*2.39996,h=1-2*(j+.5)/110,radial=Math.sqrt(1-h*h),direction=new THREE.Vector3(Math.cos(t)*radial,h,Math.sin(t)*radial);
        direction.multiplyScalar(lobeRadius(direction.x,direction.y,direction.z));
        // Root just inside the tessellated surface; deform and transform with its own lobe.
        const from=direction.clone().multiplyScalar(.985),middle=direction.clone().multiplyScalar(1.035),to=direction.clone().multiplyScalar(1.07);
        middle.x+=.02*Math.sin(j*7);to.y+=.03*Math.sin(j*3);
        from.applyMatrix4(cotton.matrix);middle.applyMatrix4(cotton.matrix);to.applyMatrix4(cotton.matrix);
        fibres.push(...from.toArray(),...middle.toArray(),...middle.toArray(),...to.toArray());
      }
    }
  });
  const detail=new THREE.BufferGeometry();detail.setAttribute('position',new THREE.Float32BufferAttribute(fibres,3));group.add(new THREE.LineSegments(detail,new THREE.LineBasicMaterial({color:0xf5f2e8,transparent:true,opacity:.55})));
  return group;
}
