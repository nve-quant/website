import * as THREE from 'three';

/** Rolled copper strip, with a hollow core and fine exposed winding edges. */
export function createCopper():THREE.Group {
  const group=new THREE.Group();
  const copper=new THREE.MeshStandardMaterial({color:0xc6814d,metalness:.97,roughness:.29});
  const profile=[new THREE.Vector2(.35,-.62),new THREE.Vector2(.82,-.62),new THREE.Vector2(.85,-.59),new THREE.Vector2(.85,.59),new THREE.Vector2(.82,.62),new THREE.Vector2(.35,.62),new THREE.Vector2(.33,.60),new THREE.Vector2(.33,-.60),new THREE.Vector2(.35,-.62)];
  const coil=new THREE.Mesh(new THREE.LatheGeometry(profile,96),copper);
  coil.rotation.x=Math.PI/2;coil.position.y=.82;coil.castShadow=true;coil.receiveShadow=true;group.add(coil);
  const edges:number[]=[];
  for(const z of [-.621,.621])for(let r=.37;r<.83;r+=.018)for(let i=0;i<96;i++){
    const a=i/96*Math.PI*2,b=(i+1)/96*Math.PI*2;
    edges.push(Math.cos(a)*r,.82+Math.sin(a)*r,z,Math.cos(b)*r,.82+Math.sin(b)*r,z);
  }
  const winding=new THREE.BufferGeometry();winding.setAttribute('position',new THREE.Float32BufferAttribute(edges,3));
  group.add(new THREE.LineSegments(winding,new THREE.LineBasicMaterial({color:0x6d3e24,transparent:true,opacity:.38})));
  const pallet=new THREE.MeshStandardMaterial({color:0x8c7755,roughness:.9});
  for(const x of [-.54,.54]){const chock=new THREE.Mesh(new THREE.BoxGeometry(.22,.12,1.5),pallet);chock.position.set(x,.02,0);chock.castShadow=true;group.add(chock);}
  group.rotation.y=-.15;return group;
}
