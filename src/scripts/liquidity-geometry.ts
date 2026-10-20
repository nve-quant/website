// Deterministic schematic coordinates, never financial or streamed market data.
const fixed = (n: number) => n.toFixed(2);
const ease = (n: number) => { const x=Math.max(0,Math.min(1,n)); return x*x*(3-2*x); };
// Indexed prices and sizes are generated solely for the labelled visual demonstration.
const quoteInterval = .12;
const noise = (n: number) => { const v=Math.sin(n*127.1+311.7)*43758.5453; return v-Math.floor(v); };
const indexPrice = (tick: number) => Math.round(10000+29*Math.sin(tick*.081)+17*Math.sin(tick*.193)+8*Math.sin(tick*.61)+(noise(tick)-.5)*12)/100;
export function bookGeometry(seconds: number) {
  const clock=seconds/quoteInterval, tick=Math.floor(clock), fraction=clock-tick;
  const price=indexPrice(tick), y=(value: number)=>148-(value-100)*115;
  const step=284/95;
  let line='',volume='';
  for(let i=0;i<96;i++){
    const sample=tick-95+i, x=20+(i-fraction)*step;
    line+=`${i?'L':'M'}${fixed(x)} ${fixed(y(indexPrice(sample)))}`;
    if(i%3===0){
      const h=5+noise(sample)*18;
      volume+=`M${fixed(x)} 252v-${fixed(h)}h${fixed(step*2)}v${fixed(h)}Z`;
    }
  }
  line+=`L304 ${fixed(y(price))}`;
  const levels=(side: -1|1)=>Array.from({length:5},(_,row)=>{
    const level=side===1?5-row:row+1;
    // Stagger size updates by row so the entire book does not blink together.
    const sizeTick=Math.floor((tick+row*2)/(2+row%3));
    const size=1.2+noise(sizeTick*11+level*37+side*19)*7.8;
    return {price:(price+side*(.02+(level-1)*.01)).toFixed(2),size:size.toFixed(2),width:24+size/9*146};
  });
  return {tick,price:price.toFixed(2),priceY:y(price),line,fill:`${line}V214H20Z`,volume,asks:levels(1),bids:levels(-1),spread:'.04'};
}

export function rangeGeometry(seconds: number) {
  const t=(seconds*3.2)%16;
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
