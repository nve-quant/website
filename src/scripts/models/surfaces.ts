import * as THREE from 'three';

/** Small deterministic relief maps: local, tiled, and disposed with their model. */
export function surfaceRelief(kind:'grain'|'fibre'|'paint'|'stone'|'cloth',size=256):THREE.CanvasTexture {
  const canvas=document.createElement('canvas');canvas.width=canvas.height=size;
  const ctx=canvas.getContext('2d')!,pixels=ctx.createImageData(size,size);let seed=913;
  const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
  for(let y=0;y<size;y++)for(let x=0;x<size;x++){
    const noise=(random()-.5)*(kind==='stone'?36:18);
    const relief=kind==='fibre'?Math.sin(x*.32+Math.sin(y*.04))*25:kind==='cloth'?(Math.cos(x*Math.PI/4)+Math.cos(y*Math.PI/4))*27:kind==='grain'?Math.sin(x*.12+Math.sin(y*.03))*7:0;
    const v=128+noise+relief,i=(y*size+x)*4;pixels.data[i]=pixels.data[i+1]=pixels.data[i+2]=v;pixels.data[i+3]=255;
  }
  ctx.putImageData(pixels,0,0);const texture=new THREE.CanvasTexture(canvas);texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.anisotropy=8;return texture;
}

export function brickSurface(){
  const canvas=document.createElement('canvas');canvas.width=canvas.height=512;const ctx=canvas.getContext('2d')!;
  const height=document.createElement('canvas');height.width=height.height=512;const bump=height.getContext('2d')!;
  ctx.fillStyle='#b4ac9b';ctx.fillRect(0,0,512,512);bump.fillStyle='#555';bump.fillRect(0,0,512,512);
  for(let row=0;row<16;row++)for(let col=-1;col<8;col++){
    const x=col*72+(row%2)*36,y=row*32;
    ctx.fillStyle=`hsl(${22+(col+row+8)%4} 23% ${46+(col*7+row*3+80)%9}%)`;ctx.fillRect(x+2,y+2,68,28);
    bump.fillStyle='#bbb';bump.fillRect(x+2,y+2,68,28);
    for(let fleck=0;fleck<14;fleck++){ctx.fillStyle='rgba(42,30,22,.09)';ctx.fillRect(x+4+(fleck*17+row*3)%62,y+4+(fleck*11)%22,3,1);}
  }
  const map=new THREE.CanvasTexture(canvas);map.colorSpace=THREE.SRGBColorSpace;map.anisotropy=8;
  const relief=new THREE.CanvasTexture(height);relief.anisotropy=8;
  for(const texture of [map,relief]){texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.repeat.set(2,4);}
  return {map,bumpMap:relief,bumpScale:.0015};
}

/** A recessed room behind glazing: shared atlas, no extra transparency passes. */
export function glazingSurface():THREE.CanvasTexture {
  const c=document.createElement('canvas');c.width=c.height=512;const ctx=c.getContext('2d')!;
  const room=ctx.createLinearGradient(0,0,0,512);room.addColorStop(0,'#273a40');room.addColorStop(.58,'#405657');room.addColorStop(1,'#718382');ctx.fillStyle=room;ctx.fillRect(0,0,512,512);
  // Perspective reveals make the glass read as a window with depth.
  ctx.fillStyle='#203238';ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(55,65);ctx.lineTo(55,455);ctx.lineTo(0,512);ctx.fill();
  ctx.fillStyle='#81908a';ctx.beginPath();ctx.moveTo(0,512);ctx.lineTo(55,455);ctx.lineTo(460,455);ctx.lineTo(512,512);ctx.fill();
  ctx.fillStyle='#526260';ctx.fillRect(55,65,405,92);
  for(let y=72;y<152;y+=10){ctx.fillStyle='rgba(187,193,177,.3)';ctx.fillRect(55,y,405,2);}
  ctx.fillStyle='rgba(190,210,210,.10)';ctx.beginPath();ctx.moveTo(190,0);ctx.lineTo(340,0);ctx.lineTo(512,400);ctx.lineTo(512,512);ctx.fill();
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;return t;
}
