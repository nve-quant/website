import * as THREE from 'three';

type PropertyKind='residential'|'office'|'warehouse';
/** Original architectural miniatures; no named development or implied portfolio. */
export function createRealEstate(kind:PropertyKind):THREE.Group {
  const group=new THREE.Group();
  const materials={
    stone:new THREE.MeshStandardMaterial({color:0xd7d2c2,roughness:.83}),
    concrete:new THREE.MeshStandardMaterial({color:0x9fa49b,roughness:.9}),
    dark:new THREE.MeshStandardMaterial({color:0x35423f,roughness:.55,metalness:.2}),
    glass:new THREE.MeshStandardMaterial({color:0x719095,roughness:.17,metalness:.48}),
    frame:new THREE.MeshStandardMaterial({color:0xc4c9c3,roughness:.35,metalness:.65}),
    brick:new THREE.MeshStandardMaterial({color:0x9e7863,roughness:.92}),
    warm:new THREE.MeshStandardMaterial({color:0xb2aa86,roughness:.36,metalness:.15}),
  };
  type Finish=keyof typeof materials;
  const batches=new Map<Finish,THREE.Matrix4[]>();const dummy=new THREE.Object3D();
  const box=(finish:Finish,w:number,h:number,d:number,x:number,y:number,z:number,angle=0)=>{
    dummy.position.set(x,y,z);dummy.scale.set(w,h,d);dummy.rotation.set(0,0,angle);dummy.updateMatrix();
    const batch=batches.get(finish)??[];batch.push(dummy.matrix.clone());batches.set(finish,batch);
  };
  if(kind==='residential'){
    box('concrete',1.85,.055,1.60,0,0,0);
    box('brick',1.24,1.40,.96,0,.75,0);
    box('stone',1.31,.055,1.03,0,.065,0);
    for(let floor=0;floor<5;floor++){
      const y=.18+floor*.27;
      box('stone',1.32,.035,1.03,0,y-.08,0);
      for(let col=0;col<3;col++){
        const x=(col-1)*.40;
        box('dark',.28,.185,.022,x,y+.045,.49);
        box((floor+col)%6===0?'warm':'glass',.242,.155,.025,x,y+.045,.505);
        box('stone',.014,.17,.03,x,y+.045,.525);
        if(floor>0){
          box('stone',.35,.025,.24,x,y-.07,.59);
          box('dark',.35,.012,.012,x,y+.055,.705);
          for(const dx of [-.16,-.08,0,.08,.16])box('dark',.008,.12,.008,x+dx,y-.005,.705);
        }
        // Rear façade: same floor logic, without balconies.
        box('dark',.28,.185,.02,x,y+.045,-.49);box('glass',.24,.15,.022,x,y+.045,-.505);
      }
      for(const side of [-1,1])for(const z of [-.27,.20]){
        box('dark',.02,.185,.25,side*.63,y+.045,z);box('glass',.022,.15,.215,side*.644,y+.045,z);
      }
    }
    box('stone',1.35,.065,1.08,0,1.47,0);
    box('dark',1.18,.015,.91,0,1.51,0);
    for(const x of [-.65,.65])box('stone',.04,.09,1.04,x,1.54,0);
    for(const z of [-.5,.5])box('stone',1.30,.09,.04,0,1.54,z);
    box('concrete',.38,.17,.34,-.28,1.60,-.20);
    for(let i=0;i<5;i++)box('dark',.31,.012,.012,-.28,1.56+i*.023,-.025);
    box('dark',.22,.26,.035,0,.20,.52);box('glass',.17,.22,.04,0,.20,.54);
    box('stone',.42,.028,.28,0,.36,.61);
    box('stone',.46,.025,.26,0,.04,.65);
  }else if(kind==='office'){
    box('concrete',1.75,.055,1.55,0,0,0);
    box('dark',1.02,1.71,.92,0,.88,0);
    for(let floor=0;floor<10;floor++){
      const y=.15+floor*.16;
      for(const side of [-1,1]){
        box('glass',1.025,.132,.018,0,y,side*.47);
        box('glass',.018,.132,.925,side*.52,y,0);
        box('frame',1.06,.014,.025,0,y+.073,side*.48);
        box('frame',.025,.014,.96,side*.53,y+.073,0);
      }
    }
    for(let i=0;i<7;i++)for(const side of [-1,1]){
      box('frame',.012,1.62,.022,-.48+i*.16,.88,side*.485);
      box('frame',.022,1.62,.012,side*.535,.88,-.43+i*.143);
    }
    box('frame',1.10,.045,1.0,0,1.76,0);
    box('dark',.94,.025,.84,0,1.79,0);
    for(const x of [-.22,.22]){
      box('frame',.28,.13,.30,x,1.85,-.13);
      for(let i=0;i<6;i++)box('dark',.23,.008,.018,x,1.918,-.24+i*.043);
    }
    box('dark',.38,.25,.10,0,.16,.51);box('glass',.32,.21,.02,0,.16,.57);
    box('frame',.55,.025,.34,0,.32,.63);
  }else{
    box('concrete',2.75,.055,2.12,0,0,.12);
    box('stone',2.05,.58,1.32,0,.33,-.12);
    // Low pitched roof, closed extruded section.
    const roofShape=new THREE.Shape();roofShape.moveTo(-1.09,.59);roofShape.lineTo(0,.79);roofShape.lineTo(1.09,.59);roofShape.lineTo(1.09,.55);roofShape.lineTo(0,.75);roofShape.lineTo(-1.09,.55);roofShape.closePath();
    const roof=new THREE.Mesh(new THREE.ExtrudeGeometry(roofShape,{depth:1.44,bevelEnabled:false}),materials.dark);roof.position.z=-.84;roof.castShadow=true;group.add(roof);
    for(let i=0;i<35;i++){
      const x=-1.0+i*.059;
      box('frame',.007,.49,.014,x,.33,-.79);
      if(Math.abs(x)>.88)box('frame',.007,.49,.014,x,.33,.55);
    }
    for(let i=0;i<23;i++)for(const x of [-1.035,1.035])box('frame',.012,.49,.007,x,.33,-.76+i*.058);
    for(const x of [-.67,0,.67]){
      box('dark',.48,.40,.035,x,.25,.56);box('frame',.38,.34,.018,x,.25,.585);
      for(let i=0;i<8;i++)box('concrete',.38,.007,.021,x,.105+i*.041,.597);
      for(const dx of [-.22,.22])box('dark',.045,.13,.055,x+dx,.095,.60);
      box('concrete',.51,.07,.27,x,.045,.66);
      for(const dx of [-.23,.23])box('stone',.018,.003,.42,x+dx,.03,1.0);
    }
    // Roof lights follow each pitch, without transparency render passes.
    for(const x of [-.52,.52])for(const z of [-.50,.05])box('glass',.37,.012,.27,x,.707,z,x<0?.181:-.181);
    box('dark',.02,.25,.16,1.04,.18,-.51);box('glass',.022,.16,.12,1.055,.21,-.51);
  }
  // Repeated façade details share a single geometry and one draw per material.
  const cube=new THREE.BoxGeometry(1,1,1);
  batches.forEach((matrices,finish)=>{
    const mesh=new THREE.InstancedMesh(cube,materials[finish],matrices.length);
    matrices.forEach((matrix,i)=>mesh.setMatrixAt(i,matrix));mesh.castShadow=true;mesh.receiveShadow=true;group.add(mesh);
  });
  // Discard unused materials; the scene owns all materials referenced by meshes.
  Object.entries(materials).forEach(([name,material])=>{if(!batches.has(name as Finish)&&!(kind==='warehouse'&&name==='dark'))material.dispose();});
  group.rotation.y=-.12;return group;
}
