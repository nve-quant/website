// Deterministic schematic coordinates, never financial or streamed market data.
const fixed = (n: number) => n.toFixed(2);
const ease = (n: number) => { const x=Math.max(0,Math.min(1,n)); return x*x*(3-2*x); };
export function bookGeometry(seconds: number) {
  const mid = 270 + 9 * Math.sin(seconds * .34);
  const gap = 12 + 2 * Math.sin(seconds * .53);
  function side(direction: -1 | 1) {
    const start=mid+direction*gap;
    const edge=direction<0?32:508;
    let y=228;
    let line=`M${fixed(start)} ${y}`;
    for(let i=1;i<=24;i++){
      // Positive increments preserve cumulative depth as price moves away from the spread.
      y-=2.4+i*.12+(1+Math.sin(i*.31+seconds*1.05+direction))*1.5
        +(i===7||i===17?8+5*Math.sin(seconds*.74+i+direction):0);
      const x=start+(edge-start)*i/24;
      line+=`H${fixed(x)}V${fixed(y)}`;
    }
    return {line,fill:`${line}V236H${fixed(start)}Z`};
  }
  const bid=side(-1), ask=side(1);
  return {mid,bidLine:bid.line,bidFill:bid.fill,askLine:ask.line,askFill:ask.fill};
}

export function rangeGeometry(seconds: number) {
  const t=seconds%16;
  // Price moves first; allocation follows after a deliberate observation period.
  const price=270+58*ease((t-2)/3)-104*ease((t-8)/3)+46*ease((t-13)/2);
  const center=270+58*ease((t-5)/2)-104*ease((t-11)/2)+46*ease((t-15));
  let bars='', background='';
  for(let i=0;i<48;i++){
    const x=32+i*10;
    const base=17+72*Math.exp(-Math.pow((x-260)/158,2)) + 7*Math.sin(i*.68);
    background+=`M${x} 236v-${fixed(base)}h7v${fixed(base)}Z`;
  }
  for(let i=0;i<22;i++){
    const x=center-86+i*8;
    const h= i<3||i>18?55:i<6||i>15?91:137;
    bars+=`M${fixed(x)} 236v-${h}h5.5v${h}Z`;
  }
  const left=center-88, width=176;
  const outline=`M${fixed(left)} 236V181h24v-36h24v-46h80v46h24v36h24v55`;
  const phase=t<2?'Positioned around price':t<5?'Price moves':t<7?'Ranges rebalance':t<8?'Positioned around price':t<11?'Price moves':t<13?'Ranges rebalance':t<15?'Price moves':'Ranges rebalance';
  return {price,center,left,width,bars,background,outline,phase};
}
