import * as THREE from 'three';

/** A cast bullion study, with original specimen marks (not a refinery certification). */
export type BullionMetal = 'gold' | 'silver' | 'palladium' | 'platinum';
const finishes = {
  gold: {rgb:[242,192,96],symbol:'Au',name:'FINE GOLD',purity:'999.9',edge:0xf2c060,light:'#ffe4a0',mark:'#80551d',rough:.25},
  silver: {rgb:[228,232,236],symbol:'Ag',name:'FINE SILVER',purity:'999.9',edge:0xe4e8ec,light:'#ffffff',mark:'#61666c',rough:.22},
  palladium: {rgb:[191,199,208],symbol:'Pd',name:'PALLADIUM',purity:'999.5',edge:0xbfc7d0,light:'#f1f6ff',mark:'#4a535f',rough:.28},
  platinum: {rgb:[211,209,202],symbol:'Pt',name:'PLATINUM',purity:'999.5',edge:0xd3d1ca,light:'#fffaf1',mark:'#64615b',rough:.32},
} as const;
export function createGold(metal:BullionMetal = 'gold'): THREE.Group {
  const finish=finishes[metal];
  const group=new THREE.Group();
  let seed=9183;
  const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
  const canvas=()=>{const c=document.createElement('canvas');c.width=512;c.height=1024;return c;};
  const color=canvas(),height=canvas(),rough=canvas();
  const colorCtx=color.getContext('2d')!,heightCtx=height.getContext('2d')!,roughCtx=rough.getContext('2d')!;
  const colorImage=colorCtx.createImageData(512,1024),heightImage=heightCtx.createImageData(512,1024),roughImage=roughCtx.createImageData(512,1024);
  for(let y=0;y<1024;y++)for(let x=0;x<512;x++){
    const i=(y*512+x)*4,n=random()-.5;
    const cast=Math.sin(x*.038+Math.sin(y*.019)*2)*Math.sin(y*.026)*2;
    colorImage.data[i]=finish.rgb[0]+n*6+cast;colorImage.data[i+1]=finish.rgb[1]+n*5+cast;colorImage.data[i+2]=finish.rgb[2]+n*4;colorImage.data[i+3]=255;
    const h=180+n*5+cast; heightImage.data[i]=h;heightImage.data[i+1]=h;heightImage.data[i+2]=h;heightImage.data[i+3]=255;
    const r=112+n*20+cast*3;roughImage.data[i]=r;roughImage.data[i+1]=r;roughImage.data[i+2]=r;roughImage.data[i+3]=255;
  }
  colorCtx.putImageData(colorImage,0,0);heightCtx.putImageData(heightImage,0,0);roughCtx.putImageData(roughImage,0,0);
  // The same engraved artwork changes colour, surface height and roughness.
  const mark=(ctx:CanvasRenderingContext2D,fill:string)=>{
    ctx.save();ctx.fillStyle=fill;ctx.strokeStyle=fill;ctx.textAlign='center';
    ctx.lineWidth=4;ctx.strokeRect(184,112,144,142);
    ctx.font='74px Georgia,serif';ctx.fillText(finish.symbol,256,213);
    ctx.font=`600 ${metal==='gold'?59:48}px sans-serif`;ctx.fillText(finish.name,256,389);
    ctx.font='96px sans-serif';ctx.fillText(finish.purity,256,522);
    ctx.font='500 52px sans-serif';ctx.fillText('1000 g',256,632);
    ctx.font='21px monospace';ctx.fillText('SPECIMEN',256,790);
    ctx.font='28px monospace';ctx.fillText('000001',256,842);
    ctx.restore();
  };
  mark(heightCtx,'#222222');mark(roughCtx,'#acacac');
  // Small offset highlights mimic the lip of a struck mark, rather than printed black text.
  colorCtx.save();colorCtx.translate(0,-2);mark(colorCtx,finish.light);colorCtx.restore();mark(colorCtx,finish.mark);
  for(let i=0;i<150;i++){
    const x=random()*512,y=random()*1024,length=8+random()*65;
    heightCtx.strokeStyle=`rgba(70,70,70,${.035+random()*.07})`;heightCtx.lineWidth=.5+random();
    heightCtx.beginPath();heightCtx.moveTo(x,y);heightCtx.lineTo(x+length,y+length*.2);heightCtx.stroke();
  }
  const texture=(c:HTMLCanvasElement,srgb=false)=>{const t=new THREE.CanvasTexture(c);if(srgb)t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;return t;};
  const topMaterial=new THREE.MeshStandardMaterial({map:texture(color,true),bumpMap:texture(height),bumpScale:.028,roughnessMap:texture(rough),roughness:.52,metalness:1});
  const sideMaterial=new THREE.MeshStandardMaterial({color:finish.edge,metalness:1,roughness:finish.rough});
  // Smooth rounded perimeter; broad taper and softened lips distinguish cast from minted bars.
  const ring=(w:number,d:number,r:number,y:number)=>{
    const points:THREE.Vector3[]=[];
    for(let corner=0;corner<4;corner++){
      const angle=corner*Math.PI/2;
      const cx=(corner===0||corner===3?1:-1)*(w/2-r);
      const cz=(corner<2?1:-1)*(d/2-r);
      for(let j=0;j<12;j++){
        const a=angle+j/11*Math.PI/2;
        points.push(new THREE.Vector3(cx+Math.cos(a)*r,y,cz+Math.sin(a)*r));
      }
    }
    return points;
  };
  // Corner centers in perimeter order: front-right, front-left, rear-left, rear-right.
  const profiles=[
    [1.06,2.12,.13,0],[1.12,2.18,.14,.035],[1.12,2.18,.14,.065],
    [.99,2.05,.15,.35],[.975,2.035,.15,.39],[.94,2,.15,.415],[.90,1.96,.15,.425],
  ];
  const rings=profiles.map(([w,d,r,y])=>ring(w,d,r,y));
  const positions:number[]=[],indices:number[]=[],uvs:number[]=[];
  rings.forEach(points=>points.forEach(p=>{positions.push(p.x,p.y,p.z);uvs.push((p.x+.56)/1.12,(p.z+1.09)/2.18);}));
  const count=rings[0].length;
  for(let j=0;j<rings.length-1;j++)for(let i=0;i<count;i++){
    const next=(i+1)%count,a=j*count+i,b=j*count+next,c=(j+1)*count+i,d=(j+1)*count+next;
    indices.push(a,c,b,b,c,d);
  }
  const sides=new THREE.BufferGeometry();sides.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));sides.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));sides.setIndex(indices);sides.computeVertexNormals();
  const topPositions=[0,.425,0],topUVs=[.5,.5],topIndices:number[]=[];
  rings.at(-1)!.forEach(p=>{topPositions.push(p.x,p.y,p.z);topUVs.push((p.x+.45)/.90,1-(p.z+.98)/1.96);});
  for(let i=0;i<count;i++)topIndices.push(0,(i+1)%count+1,i+1);
  const top=new THREE.BufferGeometry();top.setAttribute('position',new THREE.Float32BufferAttribute(topPositions,3));top.setAttribute('uv',new THREE.Float32BufferAttribute(topUVs,2));top.setIndex(topIndices);top.computeVertexNormals();
  const placements=[[-.61,0,-.06,.035],[.61,0,.04,-.025],[.05,.43,.02,-.19]];
  for(const [x,y,z,angle] of placements){
    const bar=new THREE.Group();bar.position.set(x,y,z);bar.rotation.y=angle;
    for(const [geometry,material] of [[sides,sideMaterial],[top,topMaterial]] as const){const surface=new THREE.Mesh(geometry,material);surface.castShadow=true;surface.receiveShadow=true;bar.add(surface);}
    group.add(bar);
  }
  return group;
}
