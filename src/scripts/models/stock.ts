import * as THREE from 'three';

/** Original specimen artwork on a gently curled paper sheet, not an issued security. */
export function createStock(kind:'stock'|'treasury'|'bond'='stock'): THREE.Group {
  const group = new THREE.Group();
  const width = 2.75, depth = 1.84;
  const face = document.createElement('canvas');
  face.width = 1536; face.height = 1024;
  const ink = face.getContext('2d')!;
  ink.fillStyle = '#ede3cc';
  ink.fillRect(0, 0, face.width, face.height);

  let seed = 5271;
  const random = () => {seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296;};
  // Fine rag fibres remain subtle; paper is tactile, not artificially distressed.
  for (let i = 0; i < 14000; i++) {
    ink.strokeStyle = i % 2 ? 'rgba(115,94,62,.055)' : 'rgba(255,255,255,.22)';
    const x = random() * 1536, y = random() * 1024;
    ink.lineWidth = .5;
    ink.beginPath(); ink.moveTo(x, y);
    ink.lineTo(x + 1 + random() * 7, y + random() * 2); ink.stroke();
  }
  const blue = kind==='treasury'?'#365347':kind==='bond'?'#674734':'#153444', lightBlue = kind==='stock'?'#46616a':'#6c7966';
  const line = (x1:number, y1:number, x2:number, y2:number, weight=1) => {
    ink.lineWidth = weight; ink.beginPath(); ink.moveTo(x1, y1); ink.lineTo(x2, y2); ink.stroke();
  };
  function rosette(x:number, y:number, radius:number, count:number, color:string) {
    ink.strokeStyle = color; ink.lineWidth = 1.6;
    for (let ring = 0; ring < count; ring++) {
      ink.beginPath();
      for (let j = 0; j <= 480; j++) {
        const t = j / 480 * Math.PI * 2;
        const r = radius + ring * 2.5 + 7 * Math.sin(t * 18 + ring * .32);
        const px = x + Math.cos(t) * r, py = y + Math.sin(t) * r;
        if (j === 0) ink.moveTo(px, py); else ink.lineTo(px, py);
      }
      ink.stroke();
    }
  }
  ink.strokeStyle = blue;
  for (const [inset, weight] of [[28,6],[38,2],[49,4],[83,2],[96,3]]) {
    ink.lineWidth = weight; ink.strokeRect(inset,inset,1536-inset*2,1024-inset*2);
  }
  // Interwoven lines form an original engraved security border.
  for (let strand = 0; strand < 9; strand++) {
    ink.lineWidth = 1.5; ink.strokeStyle = blue;
    for (const baseline of [65,959]) {
      ink.beginPath();
      for (let x = 52; x <= 1484; x += 2) {
        const y = baseline + Math.sin(x * .055 + strand * .56) * 12;
        if (x === 52) ink.moveTo(x,y); else ink.lineTo(x,y);
      }
      ink.stroke();
    }
    for (const baseline of [65,1471]) {
      ink.beginPath();
      for (let y = 52; y <= 972; y += 2) {
        const x = baseline + Math.sin(y * .055 + strand * .56) * 12;
        if (y === 52) ink.moveTo(x,y); else ink.lineTo(x,y);
      }
      ink.stroke();
    }
  }
  for (const x of [143,1393]) for (const y of [143,881]) {
    ink.fillStyle = '#ede3cc'; ink.beginPath(); ink.arc(x,y,54,0,Math.PI*2); ink.fill();
    rosette(x,y,31,7,blue);
  }
  // Original architectural vignette: no company logo, coat of arms or official seal.
  ink.strokeStyle = lightBlue;
  ink.lineWidth = 1;
  for (let i=0;i<5;i++) {
    ink.beginPath(); ink.ellipse(768,218,121+i*3,66+i*2,0,0,Math.PI*2); ink.stroke();
  }
  ink.strokeStyle = blue;
  ink.beginPath(); ink.moveTo(695,194); ink.lineTo(768,155); ink.lineTo(841,194); ink.closePath(); ink.stroke();
  line(697,200,839,200,3);
  for (let x=710;x<=826;x+=29) {
    ink.strokeRect(x-5,206,10,56);
    for(let offset=-3;offset<=3;offset+=3)line(x+offset,210,x+offset,258,.6);
  }
  line(690,269,846,269,2); line(684,276,852,276,2);

  ink.fillStyle = blue; ink.textBaseline = 'middle';
  ink.textAlign = 'left'; ink.font = '23px Georgia,serif'; ink.fillText('No. 000001',228,148);
  ink.textAlign = 'right'; ink.font = '22px sans-serif'; ink.fillText('SPECIMEN',1308,148);
  ink.textAlign = 'center';
  ink.font = '32px Georgia,serif'; ink.fillText(kind==='stock'?'S H A R E   C E R T I F I C A T E':'D E B T   I N S T R U M E N T',768,338);
  ink.font = '106px Georgia,serif'; ink.fillText(kind==='treasury'?'Treasury bill':kind==='bond'?'Corporate bond':'Common stock',768,448);
  ink.strokeStyle = lightBlue; line(414,521,1122,521);
  ink.font = '23px Georgia,serif'; ink.fillText(kind==='treasury'?'U.S. Treasury · 13-week maturity':kind==='bond'?'Fixed coupon · Issuer credit · Maturity':'Registered ownership',768,562);
  ink.font = '22px Georgia,serif'; ink.fillText(kind==='stock'?'This specimen illustrates a physical share certificate.':'Illustrative document. Not an issued or redeemable security.',768,613);
  ink.font = '20px Georgia,serif'; ink.fillText('Rights and transfer terms depend on the issuing structure.',768,650);

  // A faint central watermark and unfilled registration/signature fields.
  ink.save(); ink.translate(768,751); ink.rotate(-.09);
  ink.fillStyle = 'rgba(36,68,82,.09)'; ink.font = '82px Georgia,serif'; ink.fillText('SPECIMEN',0,0); ink.restore();
  ink.strokeStyle = lightBlue;
  line(591,836,871,836); line(956,836,1236,836);
  ink.fillStyle = blue; ink.font = '18px Georgia,serif';
  ink.fillText('Authorised signatory',731,862); ink.fillText('Transfer register',1096,862);
  ink.font = '16px sans-serif'; ink.fillText('ILLUSTRATIVE DOCUMENT · NOT AN ISSUED SECURITY',768,917);

  const texture = new THREE.CanvasTexture(face);
  texture.colorSpace = THREE.SRGBColorSpace; texture.anisotropy = 4;
  // A small tiled fibre map adds surface relief without another large texture.
  const fibre = document.createElement('canvas'); fibre.width = fibre.height = 128;
  const fibreCtx = fibre.getContext('2d')!;
  const pixels = fibreCtx.createImageData(128,128);
  for(let i=0;i<pixels.data.length;i+=4){
    const value=150+Math.round(random()*35);
    pixels.data[i]=pixels.data[i+1]=pixels.data[i+2]=value; pixels.data[i+3]=255;
  }
  fibreCtx.putImageData(pixels,0,0);
  const bump = new THREE.CanvasTexture(fibre);
  bump.wrapS = bump.wrapT = THREE.RepeatWrapping; bump.repeat.set(12,8);
  const frontMaterial = new THREE.MeshStandardMaterial({map:texture,bumpMap:bump,bumpScale:.0007,roughness:.87,metalness:0});
  const backMaterial = new THREE.MeshStandardMaterial({color:0xece2c8,bumpMap:bump,bumpScale:.0007,roughness:.92,side:THREE.BackSide});
  const edgeMaterial = new THREE.MeshStandardMaterial({color:0xd2c5a6,roughness:.95});
  const surfaceY = (x:number,z:number) => .18 + .07*(x/width*2)**2 + .13*Math.max(0,x/width*2)**6 + .045*(z/depth*2)**2;
  const sheet = new THREE.PlaneGeometry(width,depth,48,32);
  sheet.rotateX(-Math.PI/2);
  const positions=sheet.getAttribute('position');
  for(let i=0;i<positions.count;i++)positions.setY(i,surfaceY(positions.getX(i),positions.getZ(i)));
  positions.needsUpdate=true; sheet.computeVertexNormals();
  const front=new THREE.Mesh(sheet,frontMaterial); front.castShadow=true; front.receiveShadow=true; group.add(front);
  const back=new THREE.Mesh(sheet,backMaterial); back.position.y=-.008; group.add(back);
  // The actual paper edge follows the curled surface; it is not a thick plaque.
  const perimeter:THREE.Vector3[]=[];
  for(let side=0;side<4;side++)for(let i=0;i<=48;i++){
    const t=i/48;
    const x=side===0?-width/2+t*width:side===1?width/2:side===2?width/2-t*width:-width/2;
    const z=side===0?-depth/2:side===1?-depth/2+t*depth:side===2?depth/2:depth/2-t*depth;
    perimeter.push(new THREE.Vector3(x,surfaceY(x,z),z));
  }
  const edgePositions:number[]=[],edgeIndices:number[]=[];
  perimeter.forEach((p,i)=>{
    edgePositions.push(p.x,p.y,p.z,p.x,p.y-.008,p.z);
    if(i<perimeter.length-1)edgeIndices.push(i*2,i*2+1,i*2+2,i*2+2,i*2+1,i*2+3);
  });
  const edgeGeometry=new THREE.BufferGeometry();
  edgeGeometry.setAttribute('position',new THREE.Float32BufferAttribute(edgePositions,3));edgeGeometry.setIndex(edgeIndices);edgeGeometry.computeVertexNormals();
  group.add(new THREE.Mesh(edgeGeometry,edgeMaterial));

  // A small raised foil rosette catches the light independently of the paper.
  const sealCanvas=document.createElement('canvas');sealCanvas.width=sealCanvas.height=256;
  const seal=sealCanvas.getContext('2d')!;
  seal.fillStyle='#c8a35b';seal.fillRect(0,0,256,256);
  seal.strokeStyle='#7d5a25';seal.lineWidth=2;
  for(const radius of [78,86,101,111]){seal.beginPath();seal.arc(128,128,radius,0,Math.PI*2);seal.stroke();}
  for(let i=0;i<72;i++){
    const t=i/72*Math.PI*2;seal.beginPath();seal.moveTo(128+Math.cos(t)*90,128+Math.sin(t)*90);seal.lineTo(128+Math.cos(t+.05)*107,128+Math.sin(t+.05)*107);seal.stroke();
  }
  seal.fillStyle='#6e4c20';seal.textAlign='center';seal.textBaseline='middle';
  seal.font='23px Georgia,serif';seal.fillText('SPECIMEN',128,119);seal.font='18px Georgia,serif';seal.fillText('SEAL',128,146);
  const sealTexture=new THREE.CanvasTexture(sealCanvas);sealTexture.colorSpace=THREE.SRGBColorSpace;sealTexture.anisotropy=4;
  const sealShape=new THREE.Shape();
  for(let i=0;i<=96;i++){
    const t=i/96*Math.PI*2,r=i%2?.176:.19;
    if(i===0)sealShape.moveTo(Math.cos(t)*r,Math.sin(t)*r);else sealShape.lineTo(Math.cos(t)*r,Math.sin(t)*r);
  }
  sealShape.closePath();
  const sealGeometry=new THREE.ExtrudeGeometry(sealShape,{depth:.004,bevelEnabled:true,bevelSize:.001,bevelThickness:.001,bevelSegments:1,steps:1});
  const sealUV=sealGeometry.getAttribute('uv'),sealPos=sealGeometry.getAttribute('position');
  for(let i=0;i<sealUV.count;i++)sealUV.setXY(i,sealPos.getX(i)/.38+.5,sealPos.getY(i)/.38+.5);
  sealGeometry.rotateX(-Math.PI/2);
  const sealMaterial=new THREE.MeshStandardMaterial({map:sealTexture,metalness:.78,roughness:.4});
  const foil=new THREE.Mesh(sealGeometry,sealMaterial);
  foil.position.set(-.72,surfaceY(-.72,.5)+.012,.5);
  foil.castShadow=true; group.add(foil);
  group.rotation.y=-.08;
  return group;
}
