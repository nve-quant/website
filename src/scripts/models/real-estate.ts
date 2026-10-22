import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {brickSurface,surfaceRelief,glazingSurface} from './surfaces';

type PropertyKind='residential'|'office'|'warehouse';
/** Original architectural miniatures; no named development or implied portfolio. */
export function createRealEstate(kind:PropertyKind):THREE.Group {
  const group=new THREE.Group();
  const stoneRelief=surfaceRelief('stone');stoneRelief.repeat.set(4,4);
  const materials={
    stone:new THREE.MeshStandardMaterial({color:0xd7d2c2,roughness:.83,bumpMap:stoneRelief,bumpScale:.002}),
    concrete:new THREE.MeshStandardMaterial({color:0x9fa49b,roughness:.9,bumpMap:stoneRelief,bumpScale:.004}),
    dark:new THREE.MeshStandardMaterial({color:0x35423f,roughness:.55,metalness:.2}),
    glass:new THREE.MeshPhysicalMaterial({color:0xffffff,map:glazingSurface(),roughness:.19,metalness:.28,clearcoat:1,clearcoatRoughness:.1}),
    frame:new THREE.MeshStandardMaterial({color:0xc4c9c3,roughness:.35,metalness:.65}),
    brick:new THREE.MeshStandardMaterial({color:0xffffff,roughness:.88,...(kind==='residential'?brickSurface():{})}),
    roof:new THREE.MeshStandardMaterial({color:0x727873,roughness:.84,bumpMap:stoneRelief,bumpScale:.0015}),
    sill:new THREE.MeshStandardMaterial({color:0xb4b7af,roughness:.54,metalness:.3}),
    warm:new THREE.MeshStandardMaterial({color:0xb2aa86,roughness:.36,metalness:.15}),
  };
  type Finish=keyof typeof materials;
  const batches=new Map<Finish,THREE.Matrix4[]>();const dummy=new THREE.Object3D();
  const box=(finish:Finish,w:number,h:number,d:number,x:number,y:number,z:number,angle=0)=>{
    dummy.position.set(x,y,z);dummy.scale.set(w,h,d);dummy.rotation.set(0,0,angle);dummy.updateMatrix();
    const batch=batches.get(finish)??[];batch.push(dummy.matrix.clone());batches.set(finish,batch);
  };
  const independentMaterials=new Set<Finish>();
  // Wall apertures give genuine reveal shadows; glazing no longer sits on a solid block.
  const masonryWall=(width:number,windows:{x:number,y:number,w:number,h:number}[],x:number,z:number,rotation:number)=>{
    const face=new THREE.Shape();face.moveTo(-width/2,.05);face.lineTo(width/2,.05);face.lineTo(width/2,1.45);face.lineTo(-width/2,1.45);face.closePath();
    windows.forEach(({x:wx,y,w,h})=>{
      const opening=new THREE.Path();opening.moveTo(wx-w/2,y-h/2);opening.lineTo(wx-w/2,y+h/2);opening.lineTo(wx+w/2,y+h/2);opening.lineTo(wx+w/2,y-h/2);opening.closePath();face.holes.push(opening);
    });
    const wall=new THREE.Mesh(new THREE.ExtrudeGeometry(face,{depth:.045,bevelEnabled:false}),materials.brick);
    wall.position.set(x,0,z);wall.rotation.y=rotation;wall.castShadow=wall.receiveShadow=true;group.add(wall);independentMaterials.add('brick');
  };
  if(kind==='residential'){
    box('concrete',1.85,.055,1.60,0,0,0);
    // Opaque interior set back from all four façades, with four perforated masonry walls.
    box('dark',1.16,1.38,.90,0,.75,0);
    const frontWindows=[],rearWindows=[],sideWindows=[];
    for(let floor=0;floor<5;floor++){
      const y=.225+floor*.27;
      for(let col=0;col<3;col++){
        const opening={x:(col-1)*.40,y,w:.28,h:.185};rearWindows.push(opening);
        frontWindows.push(floor===0&&col===1?{x:0,y:.195,w:.23,h:.28}:opening);
      }
      for(const z of [-.27,.20])sideWindows.push({x:z,y,w:.25,h:.185});
    }
    masonryWall(1.26,frontWindows,0,.50,0);
    masonryWall(1.26,rearWindows,0,-.50,Math.PI);
    masonryWall(1.0,sideWindows.map(window=>({...window,x:-window.x})),.63,0,Math.PI/2);
    masonryWall(1.0,sideWindows,-.63,0,-Math.PI/2);
    box('stone',1.31,.055,1.03,0,.065,0);
    for(let floor=0;floor<5;floor++){
      const y=.18+floor*.27;
      box('stone',1.32,.035,1.03,0,y-.08,0);
      for(let col=0;col<3;col++){
        const x=(col-1)*.40;
        if(floor!==0||col!==1){
          box('dark',.28,.185,.022,x,y+.045,.49);
          box('glass',.252,.164,.012,x,y+.045,.511);
          box('sill',.30,.012,.074,x,y-.047,.532);
          // Split sash with a transom, mounted inside the masonry reveal.
          box('frame',.25,.006,.008,x,y+.080,.523);
        }
        box('stone',.014,.17,.03,x,y+.045,.525);
        if(floor>0){
          box('stone',.35,.025,.24,x,y-.07,.59);
          box('dark',.35,.012,.012,x,y+.055,.705);
          for(const dx of [-.16,-.08,0,.08,.16])box('dark',.008,.12,.008,x+dx,y-.005,.705);
        }
        // Rear façade: same floor logic, without balconies.
        box('dark',.28,.185,.02,x,y+.045,-.49);box('glass',.252,.164,.012,x,y+.045,-.511);box('sill',.30,.012,.074,x,y-.047,-.532);
      }
      for(const side of [-1,1])for(const z of [-.27,.20]){
        box('dark',.02,.185,.25,side*.63,y+.045,z);box('glass',.012,.164,.226,side*.644,y+.045,z);box('sill',.075,.012,.27,side*.651,y-.047,z);box('frame',.008,.16,.008,side*.654,y+.045,z);
      }
    }
    box('stone',1.35,.065,1.08,0,1.47,0);
    box('roof',1.18,.015,.91,0,1.51,0);
    for(const x of [-.65,.65])box('stone',.04,.09,1.04,x,1.54,0);
    for(const z of [-.5,.5])box('stone',1.30,.09,.04,0,1.54,z);
    box('concrete',.38,.17,.34,-.28,1.60,-.20);
    for(let i=0;i<5;i++)box('dark',.31,.012,.012,-.28,1.56+i*.023,-.025);
    box('dark',.22,.26,.035,0,.20,.52);box('glass',.17,.22,.04,0,.20,.54);
    box('stone',.42,.028,.28,0,.36,.61);
    box('stone',.46,.025,.26,0,.04,.65);
    // Balcony returns, recessed sills, rainwater pipes and roof coping.
    for(let floor=1;floor<5;floor++)for(const x of [-.40,0,.40]){
      const y=.18+floor*.27;
      for(const side of [-1,1]){
        box('dark',.01,.012,.21,x+side*.166,y+.055,.60);
        box('dark',.008,.12,.008,x+side*.166,y-.005,.51);
      }
      box('stone',.29,.018,.045,x,y-.052,.51);
    }
    for(const x of [-.59,.59])box('frame',.016,1.37,.016,x,.75,-.507);
    for(const x of [-.66,.66])box('stone',.065,.014,1.10,x,1.59,0);
    for(const z of [-.51,.51])box('stone',1.38,.014,.065,0,1.59,z);
    // Roof access and vent stacks are scaled to the floor heights, not decorative towers.
    box('stone',.24,.22,.27,.30,1.62,-.23);
    box('sill',.28,.018,.31,.30,1.74,-.23);
    box('dark',.11,.17,.012,.30,1.60,-.085);
    for(const x of [-.46,.44]){box('sill',.045,.12,.045,x,1.57,.28);box('dark',.065,.012,.065,x,1.635,.28);}
    for(let step=0;step<3;step++){const height=.045+step*.022;box('stone',.43,height,.07,0,-.0275+height/2,.86-step*.055);}
  }else if(kind==='office'){
    box('concrete',1.75,.055,1.55,0,0,0);
    box('dark',1.02,1.71,.92,0,.88,0);
    for(let floor=0;floor<10;floor++){
      const y=.15+floor*.16;
      for(const side of [-1,1]){
        for(let pane=0;pane<6;pane++){
          box('glass',.148,.132,.018,-.40+pane*.16,y,side*.47);
          box('glass',.018,.132,.132,side*.52,y,-.357+pane*.143);
        }
        box('frame',1.06,.014,.025,0,y+.073,side*.48);
        box('frame',.025,.014,.96,side*.53,y+.073,0);
      }
    }
    for(let i=0;i<7;i++)for(const side of [-1,1]){
      box('frame',.012,1.62,.022,-.48+i*.16,.88,side*.485);
      box('frame',.022,1.62,.012,side*.535,.88,-.43+i*.143);
    }
    box('frame',1.10,.045,1.0,0,1.76,0);
    box('roof',.94,.025,.84,0,1.79,0);
    for(const x of [-.22,.22]){
      box('frame',.28,.13,.30,x,1.85,-.13);
      for(let i=0;i<6;i++)box('dark',.23,.008,.018,x,1.918,-.24+i*.043);
    }
    box('dark',.38,.25,.10,0,.16,.51);box('glass',.32,.21,.02,0,.16,.57);
    box('frame',.55,.025,.34,0,.32,.63);
    for(const side of [-1,1]){
      box('frame',.015,.21,.016,side*.08,.16,.587);
      box('frame',.008,.065,.02,side*.025,.16,.60);
      box('stone',.52,.05,.22,side*.55,.05,.59);
    }
    // Continuous opaque spandrels conceal slab edges; distinct from reflective vision glass.
    for(let floor=0;floor<10;floor++)for(const side of [-1,1]){
      const y=.15+floor*.16-.066;
      box('dark',1.03,.032,.02,0,y,side*.481);
      box('dark',.02,.032,.92,side*.531,y,0);
    }
    // Slim pressure caps and corner posts sit forward of the gasket/glass plane.
    for(const x of [-.526,.526])for(const z of [-.474,.474])box('sill',.025,1.65,.025,x,.88,z);
    for(const side of [-1,1]){
      box('dark',.04,.2925,.04,side*.245,.17375,.77);
      box('frame',.014,.2925,.014,side*.245,.17375,.77);
    }
    for(let i=0;i<5;i++)box('sill',.78,.006,.018,0,1.805,-.30+i*.15);
    for(const x of [-.50,.50])box('frame',.025,.07,.94,x,1.81,0);
    for(const z of [-.44,.44])box('frame',1.02,.07,.025,0,1.81,z);
  }else{
    box('concrete',2.75,.055,2.12,0,0,.12);
    box('stone',2.05,.58,1.32,0,.33,-.12);
    // Concrete plinth puts the dock floor above the vehicle apron.
    box('concrete',2.10,.14,1.36,0,.10,-.12);
    box('sill',2.11,.018,1.37,0,.175,-.12);
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
      // One flush U-shaped gasket around the shutter; no stacked full-width black plates.
      for(const dx of [-.205,.205])box('dark',.030,.31,.032,x+dx,.34,.568);
      box('dark',.44,.025,.032,x,.5075,.568);
      box('frame',.38,.29,.014,x,.34,.565);
      for(let i=0;i<8;i++)box('concrete',.375,.004,.005,x,.211+i*.036,.575);
      for(const dx of [-.22,.22])box('dark',.040,.10,.022,x+dx,.105,.753);
      box('concrete',.51,.14,.20,x,.10,.64);box('dark',.36,.012,.22,x,.176,.65);
      for(const dx of [-.23,.23])box('stone',.018,.003,.42,x+dx,.03,1.0);
    }
    // Roof lights follow each pitch, without transparency render passes.
    for(const x of [-.52,.52])for(const z of [-.50,.05]){box('dark',.39,.018,.29,x,.707,z,x<0?.181:-.181);box('glass',.355,.008,.255,x,.720,z,x<0?.181:-.181);box('frame',.008,.013,.27,x,.728,z,x<0?.181:-.181);}
    // Standing seams, gutters, dock rails and door hardware.
    // Standing seams run down each roof pitch toward the eaves, not along contour lines.
    for(let i=0;i<22;i++)for(const side of [-1,1]){
      box('sill',1.10,.008,.007,side*.54,.697,-.80+i*.065,-side*.181);
    }
    box('sill',.05,.022,1.46,0,.792,-.12);
    for(const x of [-1.08,1.08]){
      box('frame',.027,.025,1.46,x,.588,-.12);
      for(const z of [-.77,.52])box('frame',.019,.53,.019,x,.30,z);
    }
    for(const x of [-.67,0,.67]){
      box('frame',.065,.013,.012,x,.19,.616);
      for(const dx of [-.26,.26])box('warm',.025,.15,.025,x+dx,.105,.83);
    }
  }
  // Roof equipment has real relief and shadow, sharing one instanced fan mesh.
  if(kind!=='warehouse'){
    const fanGeometry=new THREE.TorusGeometry(.075,.006,6,24);
    const fans=new THREE.InstancedMesh(fanGeometry,materials.frame,kind==='office'?4:2);
    for(let i=0;i<fans.count;i++){
      dummy.position.set(kind==='office'?(i<2?-.22:.22):-.28,kind==='office'?1.926:1.69,-.20+(i%2)*.14);
      dummy.rotation.set(Math.PI/2,0,0);dummy.scale.setScalar(1);dummy.updateMatrix();fans.setMatrixAt(i,dummy.matrix);
    }
    fans.castShadow=true;group.add(fans);
  }
  // Door reveals, concrete expansion joints and restrained paving joints anchor scale.
  if(kind==='warehouse'){
    for(const x of [-.67,0,.67]){
      box('frame',.12,.020,.055,x,.565,.59);
    }
    // Side access stair, personnel door, and a sheltered loading canopy.
    box('dark',.015,.26,.14,1.045,.31,-.51);box('sill',.018,.23,.12,1.057,.31,-.51);box('dark',.025,.008,.025,1.074,.30,-.47);
    for(let step=0;step<3;step++)box('concrete',.07,.045*(step+1),.23,1.28-step*.065,.025+.0225*(step+1),-.51);
    box('sill',2.03,.02,.20,0,.567,.66);
    for(const x of [-.97,.97])box('frame',.012,.12,.012,x,.497,.735);
    for(const x of [-1.2,-.4,.4,1.2])box('dark',.002,.001,2.04,x,.028,.12);
  }else{
    for(const x of [-.78,-.39,0,.39,.78])box('dark',.002,.001,1.38,x,.028,0);
    for(const z of [-.65,-.32,0,.32,.65])box('dark',1.65,.001,.002,0,.028,z);
  }
  // Repeated façade details share a single geometry and one draw per material.
  const cube=new RoundedBoxGeometry(1,1,1,1,.012);
  batches.forEach((matrices,finish)=>{
    const mesh=new THREE.InstancedMesh(cube,materials[finish],matrices.length);
    matrices.forEach((matrix,i)=>{mesh.setMatrixAt(i,matrix);if(finish==='glass')mesh.setColorAt(i,new THREE.Color().setScalar(.78+(i*7%13)/60));});mesh.castShadow=true;mesh.receiveShadow=true;group.add(mesh);
  });
  // Discard unused materials; the scene owns all materials referenced by meshes.
  Object.entries(materials).forEach(([name,material])=>{if(!batches.has(name as Finish)&&!independentMaterials.has(name as Finish)&&!(kind==='warehouse'&&name==='dark'))material.dispose();});
  // Match the studio contact plane without burying the paving slab.
  group.position.y=-.0075;group.rotation.y=-.12;return group;
}
