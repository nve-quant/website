// Native scrolling remains available without JS. Clones make the visual loop seamless;
// only the original venue list is exposed to assistive technology.
export const wrapPosition = (position: number, period: number) => period > 0 ? ((position % period) + period) % period : 0;
export function initVenueCarousels() {
 for (const carousel of document.querySelectorAll<HTMLElement>('[data-venue-carousel]')) {
  const rail = carousel.querySelector<HTMLElement>('.venue-rail')!;
  const button = carousel.querySelector<HTMLButtonElement>('[data-venue-motion]')!;
  const originals = [...rail.children] as HTMLElement[];
  if (!originals.length) continue;
  const copies = originals.map(item => {
   const copy = item.cloneNode(true) as HTMLElement;
   copy.setAttribute('aria-hidden', 'true');
   copy.inert = true;
   rail.append(copy);
   return copy;
  });
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let period = 0, position = 0, frame = 0, last = 0;
  let visible = false, hovered = false, paused = false, dragging = false;
  let pointer = -1, previousX = 0;
  const active = () => visible && !document.hidden && !motion.matches && !paused && !hovered && !dragging && !carousel.contains(document.activeElement) && period > rail.clientWidth;
  const draw = (time: number) => {
   frame = 0;
   if (!active()) return;
   if (last) position = wrapPosition(position + Math.min(time - last, 64) * .018, period);
   last = time;
   rail.scrollLeft = position;
   frame = requestAnimationFrame(draw);
  };
  const sync = () => {
   button.hidden = motion.matches || period <= rail.clientWidth;
   button.textContent = paused ? 'Resume motion' : 'Pause motion';
   if (active() && !frame) {position = wrapPosition(rail.scrollLeft, period);last = 0;frame = requestAnimationFrame(draw);}
   else if (!active()) {cancelAnimationFrame(frame);frame = 0;last = 0;}
  };
  const measure = () => {
   period = copies[0].offsetLeft - originals[0].offsetLeft;
   position = wrapPosition(rail.scrollLeft, period);
   rail.scrollLeft = position;
   sync();
  };
  button.addEventListener('click', () => {paused = !paused;sync();});
  rail.addEventListener('pointerenter', event => {if (event.pointerType === 'mouse') {hovered = true;sync();}});
  rail.addEventListener('pointerleave', event => {if (event.pointerType === 'mouse') {hovered = false;sync();}});
  carousel.addEventListener('focusin', sync);
  carousel.addEventListener('focusout', () => queueMicrotask(sync));
  rail.addEventListener('pointerdown', event => {
   if (!event.isPrimary || event.button !== 0) return;
   dragging = true;pointer = event.pointerId;previousX = event.clientX;
   rail.setPointerCapture(pointer);rail.classList.add('is-dragging');
   if (event.pointerType === 'mouse') event.preventDefault();
   sync();
  });
  rail.addEventListener('pointermove', event => {
   if (!dragging || event.pointerId !== pointer) return;
   position = wrapPosition(rail.scrollLeft + previousX - event.clientX, period);
   rail.scrollLeft = position;previousX = event.clientX;
  });
  const release = () => {dragging = false;pointer = -1;rail.classList.remove('is-dragging');sync();};
  rail.addEventListener('pointerup', release);
  rail.addEventListener('pointercancel', release);
  rail.addEventListener('lostpointercapture', release);
  rail.addEventListener('keydown', event => {
   const delta = event.key === 'ArrowRight' ? 172 : event.key === 'ArrowLeft' ? -172 : 0;
   if (delta) {event.preventDefault();rail.scrollLeft = wrapPosition(rail.scrollLeft + delta, period);}
   if (event.key === 'Home') {event.preventDefault();rail.scrollLeft = 0;}
   if (event.key === 'End') {event.preventDefault();rail.scrollLeft = Math.max(0, period - rail.clientWidth);}
   if (event.key === ' ') {event.preventDefault();paused = !paused;sync();}
  });
  const intersection = new IntersectionObserver(entries => {visible = entries[0].isIntersecting;sync();});
  intersection.observe(rail);
  const resize = new ResizeObserver(measure);resize.observe(rail);
  document.addEventListener('visibilitychange', sync);
  motion.addEventListener('change', sync);
  window.addEventListener('pagehide', () => {visible = false;release();});
  window.addEventListener('pageshow', () => {visible = rail.getBoundingClientRect().bottom > 0 && rail.getBoundingClientRect().top < innerHeight;measure();});
  measure();
 }
}
