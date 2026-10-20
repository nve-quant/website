import {bookGeometry, rangeGeometry} from './liquidity-geometry';

export function initLiquidityAnimation(root: HTMLElement) {
  const kind=root.dataset.liquidityAnimation;
  const button=root.querySelector<HTMLButtonElement>('[data-motion-toggle]')!;
  const label=root.querySelector<HTMLElement>('[data-motion-label]')!;
  const phase=root.querySelector<HTMLElement>('[data-phase]')!;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const nodes=new Map<string,SVGElement>();
  root.querySelectorAll<SVGElement>('svg [data-trade-fill],svg [data-trade-line],svg [data-trade-volume],svg [data-trade-dot],svg [data-last-price],svg [data-last-price-rule],svg [data-range-window],svg [data-position-bars],svg [data-pool-bars],svg [data-position-outline],svg [data-range-bracket],svg [data-price-marker],svg [data-depth-bid-fill],svg [data-depth-ask-fill],svg [data-depth-bid-line],svg [data-depth-ask-line]').forEach(node=>{
    for(const key of Object.keys(node.dataset)) nodes.set(key,node);
  });
  const bookRows = (side: string) => Array.from(root.querySelectorAll<SVGGElement>(`[data-book-${side}]`)).map(row=>({
    depth:row.querySelector<SVGRectElement>('[data-row-depth]')!,
    price:row.querySelector<SVGTextElement>('[data-row-price]')!,
    size:row.querySelector<SVGTextElement>('[data-row-size]')!,
    own:row.querySelector<SVGCircleElement>('[data-row-own]')!,
  }));
  const asks=bookRows('ask'), bids=bookRows('bid');
  let lastQuote=-1;
  const attr=(key:string,name:string,value:string|number)=>nodes.get(key)?.setAttribute(name,String(value));
  let visible=false, paused=false, frame=0, previous=0, elapsed=0, destroyed=false;
  const controller=new AbortController();
  const {signal}=controller;
  if(kind==='cex'){
    const tabs=Array.from(root.querySelectorAll<HTMLButtonElement>('[data-market-view]'));
    const panel=root.querySelector<HTMLElement>('[data-market-panel]')!;
    const bookView=root.querySelector<SVGGElement>('[data-book-view]')!;
    const depthView=root.querySelector<SVGGElement>('[data-depth-view]')!;
    const title=root.querySelector<SVGTitleElement>('[data-chart-title]')!;
    const description=root.querySelector<SVGDescElement>('#cex-chart-description')!;
    const bookDescription=description.textContent;
    const ownLegend=root.querySelector<HTMLElement>('.legend-own')?.parentElement;
    panel.setAttribute('role','tabpanel');panel.tabIndex=0;
    panel.setAttribute('aria-labelledby',tabs[0].id);
    root.querySelector<HTMLElement>('[data-view-tabs]')!.hidden=false;
    function selectTab(tab:HTMLButtonElement){
      const depth=tab.dataset.marketView==='depth';
      tabs.forEach(item=>{item.setAttribute('aria-selected',String(item===tab));item.tabIndex=item===tab?0:-1;});
      panel.setAttribute('aria-labelledby',tab.id);
      bookView.setAttribute('display',depth?'none':'inline');
      bookView.setAttribute('aria-hidden',String(depth));
      depthView.setAttribute('display',depth?'inline':'none');
      depthView.setAttribute('aria-hidden',String(!depth));
      if(ownLegend)ownLegend.hidden=depth;
      title.textContent=`Simulated price chart and ${depth?'cumulative depth':'order book'}`;
      description.textContent=depth?'A scrolling indexed price chart and cumulative bid and ask sizes from the same five levels on each side of the simulated order book. Depth increases away from the spread; both sides use the same fixed size scale. All values are synthetic, not live market data.':bookDescription;
    }
    tabs.forEach((tab,index)=>{
      tab.addEventListener('click',()=>selectTab(tab),{signal});
      tab.addEventListener('keydown',event=>{
        const next=event.key==='Home'?0:event.key==='End'?tabs.length-1:event.key==='ArrowRight'?(index+1)%tabs.length:event.key==='ArrowLeft'?(index+tabs.length-1)%tabs.length:-1;
        if(next<0)return;
        event.preventDefault();selectTab(tabs[next]);tabs[next].focus();
      },{signal});
    });
  }

  function draw() {
    if(kind==='cex'){
      const g=bookGeometry(elapsed);
      attr('tradeFill','d',g.fill); attr('tradeLine','d',g.line);
      attr('tradeVolume','d',g.volume); attr('tradeDot','cy',g.priceY);
      attr('lastPriceRule','d',`M20 ${g.priceY}H304`);
      if(g.tick!==lastQuote){
        lastQuote=g.tick;
        attr('depthBidFill','d',g.depth.bids.fill);attr('depthAskFill','d',g.depth.asks.fill);
        attr('depthBidLine','d',g.depth.bids.line);attr('depthAskLine','d',g.depth.asks.line);
        const current=nodes.get('lastPrice'); if(current)current.textContent=g.price;
        for(const [rows,values] of [[asks,g.asks],[bids,g.bids]] as const){
          rows.forEach((row,i)=>{
            const value=values[i];
            row.depth.setAttribute('width',String(value.width));
            row.depth.setAttribute('x',String(524-value.width));
            if(row.price.textContent!==value.price)row.price.textContent=value.price;
            if(row.size.textContent!==value.size)row.size.textContent=value.size;
            row.own.setAttribute('visibility',value.ours?'visible':'hidden');
          });
        }
      }
    }else{
      const g=rangeGeometry(elapsed);
      attr('positionBars','d',g.bars); attr('positionOutline','d',g.outline);attr('poolBars','d',g.background);
      attr('rangeWindow','x',g.left);
      attr('rangeBracket','transform',`translate(${g.center} 0)`);
      attr('priceMarker','transform',`translate(${g.price} 0)`);
      if(phase.textContent!==g.phase) phase.textContent=g.phase;
    }
  }
  function tick(now:number){
    if(now-previous>=1000/30){
      if(previous) elapsed+=Math.min((now-previous)/1000,.1);
      previous=now; draw();
    }
    frame=requestAnimationFrame(tick);
  }
  function update(){
    cancelAnimationFrame(frame); frame=0; previous=0;
    const running=visible&&!paused&&!reduced.matches&&!document.hidden&&!destroyed;
    root.dataset.motion=running?'running':'paused';
    button.hidden=reduced.matches;
    if(running) frame=requestAnimationFrame(tick);
  }
  button.hidden=reduced.matches;
  button.addEventListener('click',()=>{
    paused=!paused;
    button.setAttribute('aria-pressed',String(paused));
    button.setAttribute('aria-label',`${paused?'Resume':'Pause'} ${kind==='cex'?'order book':'liquidity range'} animation`);
    label.textContent=paused?'Resume':'Pause';
    update();
  },{signal});
  reduced.addEventListener('change',()=>{
    if(reduced.matches){elapsed=0;lastQuote=-1;draw();}
    update();
  },{signal});
  document.addEventListener('visibilitychange',update,{signal});
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;update();},{threshold:.1});
  observer.observe(root);
  window.addEventListener('pagehide',event=>{
    cancelAnimationFrame(frame);
    if(event.persisted){previous=0;return;}
    destroyed=true;observer.disconnect();controller.abort();
  },{signal});
  window.addEventListener('pageshow',update,{signal});
}
