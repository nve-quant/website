import type {MarketModelId} from '../data/market-model';
import type {createMarketScene} from './market-scene';

export function initMarketExplorer(root: HTMLElement) {
  const host = root.querySelector<HTMLElement>('[data-model-canvas]')!;
  const controls = root.querySelector<HTMLElement>('.model-controls')!;
  const spin = root.querySelector<HTMLButtonElement>('[data-spin]')!;
  const status = root.querySelector<HTMLElement>('[data-model-status]')!;
  const desktop = matchMedia('(min-width: 701px)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let scene: ReturnType<typeof createMarketScene> | undefined;
  let loading = false;
  let failed = false;
  let intersecting = false;
  let destroyed = false;
  let selection: MarketModelId = 'gold';
  let spinning = false;
  const listeners = new AbortController();
  const signal = listeners.signal;

  function stopSpin() {
    spinning = false;
    scene?.spin(false);
    spin.setAttribute('aria-pressed', 'false');
    spin.textContent = 'Rotate model';
  }
  async function update() {
    const enabled = desktop.matches && !reduced.matches && !failed;
    scene?.visible(enabled && intersecting && !document.hidden);
    controls.hidden = !enabled || !scene;
    root.dataset.renderer = enabled && scene ? 'ready' : 'fallback';
    if (!enabled) stopSpin();
    if (!enabled || !intersecting || document.hidden || scene || loading || destroyed) return;
    loading = true;
    try {
      const {createMarketScene} = await import('./market-scene');
      if (destroyed || !desktop.matches || reduced.matches || document.hidden || !intersecting) return;
      scene = createMarketScene(host, () => {
        failed = true;
        root.dataset.renderer = 'fallback';
        controls.hidden = true;
        stopSpin();
      });
      scene.select(selection);
      scene.visible(intersecting && !document.hidden);
      controls.hidden = false;
      root.dataset.renderer = 'ready';
    } catch {
      failed = true;
      // The accessible, selectable SVG scene is already present if WebGL fails.
      root.dataset.renderer = 'fallback';
      controls.hidden = true;
    } finally { loading = false; }
  }

  root.querySelectorAll<HTMLInputElement>('input[name="market-asset"]').forEach(input => {
    input.addEventListener('change', () => {
      if (!input.checked) return;
      selection = input.value as MarketModelId;
      stopSpin();
      scene?.select(selection);
      status.textContent = `${input.nextElementSibling?.textContent}: market explanation updated.`;
    }, {signal});
  });
  root.querySelectorAll<HTMLButtonElement>('[data-rotate]').forEach(button => {
    button.addEventListener('click', () => {stopSpin(); scene?.rotate(Number(button.dataset.rotate) * Math.PI / 5);}, {signal});
  });
  spin.addEventListener('click', () => {
    spinning = !spinning;
    spin.setAttribute('aria-pressed', String(spinning));
    spin.textContent = spinning ? 'Pause rotation' : 'Rotate model';
    scene?.spin(spinning);
  }, {signal});
  desktop.addEventListener('change', update, {signal});
  reduced.addEventListener('change', update, {signal});
  document.addEventListener('visibilitychange', update, {signal});
  const observer = new IntersectionObserver(entries => {
    intersecting = entries[0].isIntersecting;
    void update();
  }, {rootMargin:'100px'});
  observer.observe(host);
  window.addEventListener('pagehide', (event) => {
    if (event.persisted) { scene?.visible(false); return; }
    destroyed = true;
    observer.disconnect(); listeners.abort(); scene?.dispose();
  }, {signal});
  window.addEventListener('pageshow', () => {void update();}, {signal});
}
