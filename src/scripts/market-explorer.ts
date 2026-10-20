import type {MarketModelId} from '../data/market-model';
import type {createMarketScene} from './market-scene';

export function initMarketExplorer(root: HTMLElement) {
  const host = root.querySelector<HTMLElement>('[data-model-canvas]')!;
  const hint = root.querySelector<HTMLElement>('[data-model-hint]')!;
  const status = root.querySelector<HTMLElement>('[data-model-status]')!;
  const desktop = matchMedia('(min-width: 701px)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let scene: ReturnType<typeof createMarketScene> | undefined;
  let loading = false;
  let failed = false;
  let intersecting = false;
  let destroyed = false;
  let selection: MarketModelId = 'gold';
  const listeners = new AbortController();
  const signal = listeners.signal;

  function setReady(ready: boolean) {
    if(!ready&&document.activeElement===host){
      root.querySelector<HTMLInputElement>('input[name="market-asset"]:checked')?.focus({preventScroll:true});
    }
    root.dataset.renderer = ready ? 'ready' : 'fallback';
    host.tabIndex = ready ? 0 : -1;
    host.setAttribute('aria-hidden', String(!ready));
  }
  function rotationChanged(spinning: boolean) {
    host.setAttribute('aria-pressed', String(!spinning));
    hint.textContent = `Drag to rotate. Click to ${spinning ? 'pause' : 'resume'}.`;
  }
  async function update() {
    const enabled = desktop.matches && !reduced.matches && !failed;
    scene?.visible(enabled && intersecting && !document.hidden);
    setReady(enabled && !!scene);
    if (!enabled || !intersecting || document.hidden || scene || loading || destroyed) return;
    loading = true;
    try {
      const {createMarketScene} = await import('./market-scene');
      if (destroyed || !desktop.matches || reduced.matches || document.hidden || !intersecting) return;
      scene = createMarketScene(host, () => {
        failed = true;
        setReady(false);
      }, rotationChanged);
      scene.select(selection);
      scene.visible(intersecting && !document.hidden);
      setReady(true);
    } catch {
      failed = true;
      // The accessible, selectable SVG scene is already present if WebGL fails.
      setReady(false);
    } finally { loading = false; }
  }

  root.querySelectorAll<HTMLInputElement>('input[name="market-asset"]').forEach(input => {
    input.addEventListener('change', () => {
      if (!input.checked) return;
      selection = input.value as MarketModelId;
      scene?.select(selection);
      status.textContent = `${input.nextElementSibling?.textContent}: market explanation updated.`;
    }, {signal});
  });
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
