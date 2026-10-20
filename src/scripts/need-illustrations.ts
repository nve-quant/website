export function initNeedIllustrations(section:HTMLElement) {
 const diagrams=section.querySelectorAll<SVGElement>('[data-need-diagram]');
 const button=section.querySelector<HTMLButtonElement>('[data-need-toggle]')!;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let visible=false,paused=false,suspended=false;
 const update=()=>{
  const running=visible&&!paused&&!suspended&&!document.hidden&&!reduced.matches;
  diagrams.forEach(diagram=>diagram.toggleAttribute('data-running',running));
  button.hidden=reduced.matches;
  button.setAttribute('aria-pressed',String(paused));
  button.textContent=paused?'Resume illustrations':'Pause illustrations';
 };
 const observer=new IntersectionObserver(entries=>{
  visible=entries.some(entry=>entry.isIntersecting);update();
 });
 observer.observe(section);
 button.addEventListener('click',()=>{paused=!paused;update();});
 reduced.addEventListener('change',update);
 document.addEventListener('visibilitychange',update);
 window.addEventListener('pagehide',()=>{suspended=true;update();});
 window.addEventListener('pageshow',()=>{suspended=false;update();});
 update();
}
