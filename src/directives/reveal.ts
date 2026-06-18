/* =====================================================================
   v-reveal — scroll-into-view fade/slide reveal (CSS-transition driven)
   value: { y?, delay?, stagger?, sel? } — sel = child selector to stagger.
   ===================================================================== */
import type { Directive } from 'vue';
import { prefersReducedMotion } from '@/composables/atmosphere';

export interface RevealOptions {
  /** Initial Y offset in px (defaults to the CSS --rv-y of 26px). */
  y?: number;
  /** Delay before the first element reveals, in ms. */
  delay?: number;
  /** Per-child stagger, in ms. */
  stagger?: number;
  /** Child selector to stagger; when omitted the bound element reveals. */
  sel?: string;
}

interface RevealState {
  io?: IntersectionObserver;
  timer?: number;
}
const states = new WeakMap<HTMLElement, RevealState>();

export const reveal: Directive<HTMLElement, RevealOptions | undefined> = {
  mounted(el, binding) {
    const opt = binding.value ?? {};
    const list: HTMLElement[] = opt.sel
      ? Array.from(el.querySelectorAll<HTMLElement>(opt.sel))
      : [el];
    const staggerMs = opt.stagger ?? 70;
    const start = opt.delay ?? 0;

    list.forEach((n, i) => {
      n.classList.add('reveal');
      if (opt.y != null) n.style.setProperty('--rv-y', opt.y + 'px');
      n.style.transitionDelay = (start + i * staggerMs) / 1000 + 's';
    });

    const revealAll = (): void => list.forEach((n) => n.classList.add('is-in'));

    if (prefersReducedMotion()) {
      revealAll();
      return;
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            revealAll();
            obs.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    // safety: guarantee visibility even if IO never fires (offscreen/frozen)
    const timer = window.setTimeout(revealAll, 2000);
    states.set(el, { io, timer });
  },
  unmounted(el) {
    const s = states.get(el);
    if (s?.io) s.io.disconnect();
    if (s?.timer) clearTimeout(s.timer);
    states.delete(el);
  },
};
