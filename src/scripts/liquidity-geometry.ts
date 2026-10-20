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
  }
  // Anchor bars to absolute sample IDs, never the moving window's array indices.
  // Include partially clipped bars at the left edge so they scroll out intact.
  for(let sample=tick-98;sample<=tick;sample++){
    if(sample%3!==0)continue;
    const x=20+(sample-(tick-95)-fraction)*step,h=5+noise(sample)*18;
    volume+=`M${fixed(x)} 252v-${fixed(h)}h${fixed(step*2)}v${fixed(h)}Z`;
  }
  line+=`L304 ${fixed(y(price))}`;
  const levels=(side: -1|1)=>Array.from({length:5},(_,row)=>{
    const level=side===1?5-row:row+1;
    // Stagger size updates by row so the entire book does not blink together.
    const sizeTick=Math.floor((tick+row*2)/(2+row%3));
    const size=1.2+noise(sizeTick*11+level*37+side*19)*7.8;
    return {price:(price+side*(.02+(level-1)*.01)).toFixed(2),size:size.toFixed(2),width:24+size/9*146,ours:false};
  });
  const asks=levels(1),bids=levels(-1);
  // Illustrative participation: mark the seven largest levels, leaving smaller orders unmarked.
  [...asks,...bids].sort((a,b)=>Number(b.size)-Number(a.size)).slice(0,7).forEach(row=>{row.ours=true;});
  const depthSide=(rows:typeof bids,side:-1|1)=>{
    let cumulative=0,path=`M${437+side*10} 252`;
    const points=rows.map((row,i)=>{
      cumulative+=Number(row.size);
      const x=437+side*(10+i*19),y=252-cumulative/50*174;
      path+=`${i?'H'+x:''}V${fixed(y)}`;
      return {price:Number(row.price),size:cumulative,x,y};
    });
    return {line:path,fill:`${path}V252Z`,points};
  };
  const depth={bids:depthSide(bids,-1),asks:depthSide([...asks].reverse(),1)};
  return {tick,price:price.toFixed(2),priceY:y(price),line,fill:`${line}V214H20Z`,volume,asks,bids,depth,spread:'.04'};
}

export function rangeGeometry(seconds: number) {
  const t=(seconds*3.2)%16;
  // Same path with a short illustrative lag (~188ms), not an execution-speed claim.
  const priceAt=(time:number)=>270+58*ease((time-2)/3)-104*ease((time-8)/3)+46*ease((time-13)/2);
  const price=priceAt(t),center=priceAt(t-.6);
  const left=center-88,width=176;
  // Aggregate multiple ranges: a central valley, fuller shoulders, tapered edges.
  const shoulderHeights=[22,26,34,50,76,100,116,116,100,72,46];
  const managedAt=(x:number)=>Math.abs(x-center)>=88?0:shoulderHeights[Math.floor(Math.abs(x-center)/8)];
  const poolLevels=[];
  let bars='', background='';
  for(let i=0;i<48;i++){
    const x=32+i*10;
    // Liquidity L per price interval, not cumulative depth or token value.
    // Other LP ranges form a stepped profile; pool totals include our range.
    const sample=x+3.5;
    const distance=Math.abs(sample-270);
    const other=18+(distance>=40&&distance<170?12:0)+(distance>=70&&distance<150?16:0)+(distance>=90&&distance<130?12:0);
    const managed=managedAt(sample),total=other+managed;
    poolLevels.push({x,other,managed,total});
    background+=`M${x} 236v-${total}h7v${total}Z`;
  }
  let outline=`M${fixed(left)} 236`;
  const managedLevels=[];
  for(let i=0;i<22;i++){
    const start=left+i*8,x=start+1.25;
    const h=managedAt(start+4);
    managedLevels.push({x:start+4,height:h});
    bars+=`M${fixed(x)} 236v-${h}h5.5v${h}Z`;
    outline+=`V${236-h}H${fixed(start+8)}`;
  }
  outline+='V236';
  const moving=[[2,5],[8,11],[13,15]];
  const phase=moving.some(([start])=>t>=start&&t<start+.6)?'Price moves':moving.some(([start,end])=>t>=start+.6&&t<end+.6)?'Range rebalances':'Positioned around price';
  return {price,center,left,width,bars,background,outline,phase,managedLevels,poolLevels};
}
