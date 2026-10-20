import {bookGeometry, rangeGeometry} from './liquidity-geometry';

export function initLiquidityAnimation(root: HTMLElement) {
  const kind=root.dataset.liquidityAnimation;
  const button=root.querySelector<HTMLButtonElement>('[data-motion-toggle]')!;
  const label=root.querySelector<HTMLElement>('[data-motion-label]')!;
  const phase=root.querySelector<HTMLElement>('[data-phase]')!;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const nodes=new Map<string,SVGElement>();
  root.querySelectorAll<SVGElement>('svg [data-bid-fill],svg [data-ask-fill],svg [data-bid-line],svg [data-ask-line],svg [data-book-mid],svg [data-range-window],svg [data-position-bars],svg [data-position-outline],svg [data-range-bracket],svg [data-price-marker]').forEach(node=>{
    for(const key of Object.keys(node.dataset)) nodes.set(key,node);
  });
  const attr=(key:string,name:string,value:string|number)=>nodes.get(key)?.setAttribute(name,String(value));
  let visible=false, paused=false, frame=0, previous=0, elapsed=0, destroyed=false;
  const controller=new AbortController();
  const {signal}=controller;

  function draw() {
    if(kind==='cex'){
      const g=bookGeometry(elapsed);
      attr('bidFill','d',g.bidFill); attr('askFill','d',g.askFill);
      attr('bidLine','d',g.bidLine); attr('askLine','d',g.askLine);
      attr('bookMid','transform',`translate(${g.mid} 0)`);
    }else{
      const g=rangeGeometry(elapsed);
      attr('positionBars','d',g.bars); attr('positionOutline','d',g.outline);
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
    if(reduced.matches){elapsed=0;draw();}
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
