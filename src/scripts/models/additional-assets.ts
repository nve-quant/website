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
  const group=new THREE.Group(),cloth=surfaceRelief('cloth',512);cloth.repeat.set(5,3);
  const art=document.createElement('canvas');art.width=1024;art.height=512;const ctx=art.getContext('2d')!;ctx.fillStyle='#a18b60';ctx.fillRect(0,0,1024,512);ctx.fillStyle='#334239';ctx.textAlign='center';ctx.font='600 62px serif';ctx.fillText('ARABICA',256,255);ctx.font='23px monospace';ctx.fillText('GREEN BEANS',256,298);
  // Fine alternating yarns retain the printed legend while giving the sack a woven colour surface.
  for(let y=0;y<512;y+=4){ctx.fillStyle=y%8?'rgba(42,29,13,.13)':'rgba(236,220,170,.15)';ctx.fillRect(0,y,1024,1);}
  for(let x=0;x<1024;x+=5){ctx.fillStyle=x%10?'rgba(37,30,18,.10)':'rgba(227,210,163,.18)';ctx.fillRect(x,0,1,512);}
  const map=new THREE.CanvasTexture(art);map.colorSpace=THREE.SRGBColorSpace;map.anisotropy=8;
  const sackMaterial=new THREE.MeshStandardMaterial({map,bumpMap:cloth,bumpScale:.012,roughness:.94,side:THREE.DoubleSide});
  const profile=[new THREE.Vector2(.30,0),new THREE.Vector2(.48,.04),new THREE.Vector2(.55,.22),new THREE.Vector2(.51,.66),new THREE.Vector2(.43,.99),new THREE.Vector2(.45,1.07)];
  const curve=new THREE.SplineCurve(profile);
  const sackGeometry=new THREE.LatheGeometry(curve.getPoints(48),80);const position=sackGeometry.getAttribute('position');
  for(let i=0;i<position.count;i++){const x=position.getX(i),z=position.getZ(i),y=position.getY(i),a=Math.atan2(z,x),r=1+.025*Math.sin(a*13+y*8)+.018*Math.sin(a*7-y*5)*(y+.2);position.setXYZ(i,x*r,y,z*r);}sackGeometry.computeVertexNormals();
  const sack=new THREE.Mesh(sackGeometry,sackMaterial);sack.castShadow=sack.receiveShadow=true;group.add(sack);
  const mouth:THREE.Vector3[]=[];
  for(let i=0;i<80;i++){const a=i/80*Math.PI*2,r=.445*(1+.025*Math.sin(a*13+1.07*8)+.018*Math.sin(a*7-1.07*5)*1.27);mouth.push(new THREE.Vector3(Math.cos(a)*r,1.067+.009*Math.sin(a*5),Math.sin(a)*r));}
  const rim=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(mouth,true),120,.016,8,true),new THREE.MeshStandardMaterial({color:0xb2a076,bumpMap:cloth,bumpScale:.003,roughness:.94}));rim.castShadow=true;group.add(rim);
  const stitches:number[]=[];
  for(let i=0;i<80;i++){const a=i/80*Math.PI*2,r=.45;stitches.push(Math.cos(a)*r,1.045,Math.sin(a)*r,Math.cos(a+.012)*r,1.025,Math.sin(a+.012)*r);}
  const stitchGeometry=new THREE.BufferGeometry();stitchGeometry.setAttribute('position',new THREE.Float32BufferAttribute(stitches,3));group.add(new THREE.LineSegments(stitchGeometry,new THREE.LineBasicMaterial({color:0x6d5838})));
  const beansGeometry=new THREE.SphereGeometry(1,22,14),p=beansGeometry.getAttribute('position');
  for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),z=p.getZ(i);if(z>0)p.setZ(i,z-.30*Math.exp(-Math.pow((x+.08*Math.sin(y*4))/.14,2))*(1-y*y));}beansGeometry.computeVertexNormals();beansGeometry.rotateX(-Math.PI/2);
  sackGeometry.computeBoundingBox();const sackFloor=sackGeometry.boundingBox!.min.y,beanPoint=new THREE.Vector3();
  const beans=new THREE.InstancedMesh(beansGeometry,new THREE.MeshStandardMaterial({color:0xa4ac7b,roughness:.72,bumpMap:surfaceRelief('grain'),bumpScale:.002}),210),dummy=new THREE.Object3D();
  for(let i=0;i<210;i++){
    const a=i*2.39996,r=i<186?Math.sqrt(i/186)*.40:.56+(i%3)*.10;
    dummy.position.set(Math.cos(a)*r,i<186?1.04+.12*(1-r/.45)+.008*Math.sin(i*13):.015,Math.sin(a)*r);dummy.rotation.set((i%3-.5)*.15,a,(i%4-2)*.1);dummy.scale.set(.047*(1+.12*Math.sin(i*3)),.031,.067*(1+.12*Math.cos(i*5)));dummy.updateMatrix();
    if(i>=186){
      // Use the rotated kernel surface, not an assumed ellipsoid half-height.
      let lowest=Infinity;
      for(let vertex=0;vertex<p.count;vertex++){beanPoint.fromBufferAttribute(p,vertex).applyMatrix4(dummy.matrix);lowest=Math.min(lowest,beanPoint.y);}
      dummy.position.y+=sackFloor-lowest;dummy.updateMatrix();
    }
    beans.setMatrixAt(i,dummy.matrix);beans.setColorAt(i,new THREE.Color().setScalar(.75+(i%7)*.045));
  }
  beans.castShadow=beans.receiveShadow=true;group.add(beans);group.rotation.y=-.95;group.position.y=-.035-sackFloor;return group;
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
