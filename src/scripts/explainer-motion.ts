// CSS owns the animation. This controller gates it by visibility and user preference.
export function initExplainerMotion(root: HTMLElement) {
 const button = root.querySelector<HTMLButtonElement>('[data-explainer-toggle]')!;
 const preference = matchMedia('(prefers-reduced-motion: reduce)');
 let visible = false, paused = false, suspended = false;
 const sync = () => {
  root.toggleAttribute('data-running',visible && !paused && !suspended && !document.hidden && !preference.matches);
  button.hidden = preference.matches;
  button.textContent = paused ? 'Resume motion' : 'Pause motion';
  button.setAttribute('aria-pressed', String(paused));
 };
 const observer = new IntersectionObserver(entries => {visible = entries.some(entry => entry.isIntersecting);sync();});
 observer.observe(root);
 button.addEventListener('click', () => {paused = !paused;sync();});
 preference.addEventListener('change',sync);
 document.addEventListener('visibilitychange',sync);
 window.addEventListener('pagehide',() => {suspended = true;sync();});
 window.addEventListener('pageshow',() => {suspended = false;sync();});
 sync();
}
