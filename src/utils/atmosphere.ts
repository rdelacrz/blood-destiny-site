/**
 * @fileoverview BLOOD DESTINY — atmosphere & motion (anime.js v4).
 * Embers, volumetric haze, ice shards, parallax, word reveal, route sweep.
 * Honors prefers-reduced-motion and pauses loops when the tab is hidden
 * or the host element scrolls offscreen.
 */
import { animate, createTimeline, utils } from 'animejs';
import type { JSAnimation } from 'animejs';

/** Whether the user has requested reduced motion (`prefers-reduced-motion: reduce`). */
export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Handle for a mounted, animating atmosphere effect (pause / play / tear down). */
export interface FxController {
  el?: HTMLElement;
  pause(): void;
  play(): void;
  destroy(): void;
}
/** Handle for a mounted, static atmosphere effect (teardown only). */
export interface SimpleController {
  el?: HTMLElement;
  destroy(): void;
}

const noopController = (): FxController => ({
  pause() {},
  play() {},
  destroy() {},
});

// Global loop registry: pause when tab hidden
const loops = new Set<JSAnimation>();
/** false = intentionally paused (offscreen); don't auto-resume on tab focus. */
const activeFlags = new WeakMap<JSAnimation, boolean>();

const register = (inst: JSAnimation): JSAnimation => {
  loops.add(inst);
  return inst;
};
const unregister = (inst: JSAnimation | undefined): void => {
  if (!inst) return;
  try {
    inst.pause();
  } catch {
    // already disposed
  }
  loops.delete(inst);
};

let hiddenPaused = false;
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      loops.forEach((l) => l.pause());
      hiddenPaused = true;
    } else if (hiddenPaused) {
      loops.forEach((l) => {
        if (activeFlags.get(l) !== false) l.play();
      });
      hiddenPaused = false;
    }
  });
}

const rnd = (min: number, max: number): number => Math.random() * (max - min) + min;

/** Mounts the ember / ash-field layer: small particles drifting up with sway and flicker. */
export const mountEmbers = (container: HTMLElement | null, count?: number): FxController => {
  if (!container) return noopController();
  const layer = document.createElement('div');
  layer.className = 'ember-layer';
  container.appendChild(layer);
  const insts: JSAnimation[] = [];

  if (prefersReducedMotion()) {
    // Static: a few faint, motionless embers
    for (let i = 0; i < 14; i++) {
      const e = document.createElement('span');
      e.className = 'ember';
      const s = rnd(2, 5);
      Object.assign(e.style, {
        left: rnd(2, 98) + '%',
        top: rnd(10, 95) + '%',
        width: s + 'px',
        height: s + 'px',
        opacity: rnd(0.15, 0.4),
      });
      layer.appendChild(e);
    }
    return { el: layer, pause() {}, play() {}, destroy() { layer.remove(); } };
  }

  const N = count ?? 56;
  for (let i = 0; i < N; i++) {
    const e = document.createElement('span');
    e.className = 'ember';
    const size = rnd(1.5, 5.5);
    const depth = size / 5.5; // 0..1 — bigger = closer
    Object.assign(e.style, {
      left: rnd(-2, 102) + '%',
      bottom: rnd(-8, 60) + '%',
      width: size + 'px',
      height: size + 'px',
      filter: `blur(${(1 - depth) * 1.4}px)`,
    });
    // Ice-tinted embers occasionally, for the steel motif
    if (Math.random() < 0.12) e.classList.add('ember-ice');
    layer.appendChild(e);

    const dur = rnd(7000, 16000);
    const inst = animate(e, {
      translateY: [0, rnd(-180, -460)],
      translateX: [0, rnd(-50, 50)],
      opacity: [
        { to: rnd(0.25, 0.7), duration: dur * 0.25, ease: 'inOutSine' },
        { to: 0, duration: dur * 0.45, delay: dur * 0.3, ease: 'inSine' },
      ],
      scale: [rnd(0.7, 1), rnd(0.9, 1.3)],
      duration: dur,
      delay: rnd(0, 9000),
      loop: true,
      ease: 'inOutSine',
    });
    insts.push(register(inst));
  }

  return {
    el: layer,
    pause() { insts.forEach((i) => { activeFlags.set(i, false); i.pause(); }); },
    play() { insts.forEach((i) => { activeFlags.set(i, true); i.play(); }); },
    destroy() { insts.forEach(unregister); layer.remove(); },
  };
};

/** Mounts the volumetric red haze: three soft drifting / pulsing blobs. */
export const mountHaze = (container: HTMLElement | null): FxController => {
  if (!container) return noopController();
  const layer = document.createElement('div');
  layer.className = 'haze-layer';
  const blobs = [
    { cls: 'haze-blob haze-a', x: '18%', y: '62%' },
    { cls: 'haze-blob haze-b', x: '78%', y: '30%' },
    { cls: 'haze-blob haze-c', x: '52%', y: '85%' },
  ];
  const els = blobs.map((b) => {
    const d = document.createElement('div');
    d.className = b.cls;
    d.style.left = b.x;
    d.style.top = b.y;
    layer.appendChild(d);
    return d;
  });
  container.appendChild(layer);

  if (prefersReducedMotion()) {
    return { el: layer, pause() {}, play() {}, destroy() { layer.remove(); } };
  }

  const insts = els.map((d, i) =>
    register(
      animate(d, {
        translateX: [{ to: rnd(-60, 60), duration: rnd(14000, 22000) }],
        translateY: [{ to: rnd(-50, 50), duration: rnd(16000, 24000) }],
        scale: [{ to: rnd(1.05, 1.4), duration: rnd(12000, 20000) }],
        opacity: [{ to: rnd(0.35, 0.7), duration: rnd(9000, 14000) }],
        alternate: true,
        loop: true,
        delay: i * 800,
        ease: 'inOutSine',
      }),
    ),
  );

  return {
    el: layer,
    pause() { insts.forEach((i) => { activeFlags.set(i, false); i.pause(); }); },
    play() { insts.forEach((i) => { activeFlags.set(i, true); i.play(); }); },
    destroy() { insts.forEach(unregister); layer.remove(); },
  };
};

/** Mounts the ice-shard layer, used for Fuyumi / ice-accent detail surfaces. */
export const mountShards = (container: HTMLElement | null, count?: number): SimpleController => {
  if (!container) return { destroy() {} };
  const layer = document.createElement('div');
  layer.className = 'shard-layer';
  container.appendChild(layer);
  const reduced = prefersReducedMotion();
  const N = reduced ? 5 : count ?? 9;
  const insts: JSAnimation[] = [];
  for (let i = 0; i < N; i++) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 40 120');
    svg.classList.add('shard');
    const w = rnd(10, 26);
    Object.assign(svg.style, {
      left: rnd(4, 92) + '%',
      top: rnd(6, 80) + '%',
      width: w + 'px',
      height: w * 3 + 'px',
      opacity: rnd(0.08, 0.22),
    });
    svg.innerHTML = '<polygon points="20,0 34,46 24,120 16,120 6,46" fill="url(#iceg)"/>';
    layer.appendChild(svg);
    if (reduced) continue;
    insts.push(
      register(
        animate(svg, {
          translateY: [0, rnd(-26, 26)],
          rotate: [rnd(-8, 8), rnd(-8, 8)],
          opacity: [rnd(0.06, 0.14), rnd(0.18, 0.32)],
          duration: rnd(6000, 11000),
          delay: rnd(0, 4000),
          alternate: true,
          loop: true,
          ease: 'inOutSine',
        }),
      ),
    );
  }
  // Shared gradient def
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  defs.setAttribute('width', '0');
  defs.setAttribute('height', '0');
  defs.style.position = 'absolute';
  defs.innerHTML =
    '<defs><linearGradient id="iceg" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#cfeaff"/><stop offset="1" stop-color="#3A6B8C"/>' +
    '</linearGradient></defs>';
  layer.appendChild(defs);
  return { el: layer, destroy() { insts.forEach(unregister); layer.remove(); } };
};

/** One element driven by {@link mountParallax}: `depth` scales pointer offset, `scrollFactor` scales scroll. */
export interface ParallaxLayer {
  el: HTMLElement | null;
  depth: number;
  scrollFactor?: number;
}
/** Mounts pointer + scroll parallax, translating each layer at its own rate. */
export const mountParallax = (host: HTMLElement | null, layers: ParallaxLayer[]): SimpleController => {
  if (!host || prefersReducedMotion()) return { destroy() {} };
  let px = 0,
    py = 0,
    sy = 0;
  let raf: number | null = null;
  const apply = (): void => {
    raf = null;
    layers.forEach(({ el, depth, scrollFactor }) => {
      if (!el) return;
      const tx = px * depth;
      const ty = py * depth + sy * (scrollFactor ?? 0);
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    });
  };
  const schedule = (): void => {
    if (raf === null) raf = requestAnimationFrame(apply);
  };
  const onMove = (e: PointerEvent): void => {
    const r = host.getBoundingClientRect();
    px = ((e.clientX - r.left) / r.width - 0.5) * 2;
    py = ((e.clientY - r.top) / r.height - 0.5) * 2;
    schedule();
  };
  const onScroll = (): void => {
    sy = window.scrollY;
    schedule();
  };
  host.addEventListener('pointermove', onMove);
  window.addEventListener('scroll', onScroll, { passive: true });
  return {
    destroy() {
      host.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    },
  };
};

/** Pauses an atmosphere controller while `targetEl` is offscreen and plays it when visible. */
export const pauseWhenOffscreen = (
  targetEl: HTMLElement | null,
  controller: FxController,
): SimpleController => {
  if (!targetEl) return { destroy() {} };
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) controller.play();
        else controller.pause();
      });
    },
    { threshold: 0.01 },
  );
  io.observe(targetEl);
  return { destroy() { io.disconnect(); } };
};

/** Options for {@link revealWords}: per-word `stagger` and initial `delay`, both in ms. */
export interface RevealWordsOptions {
  stagger?: number;
  delay?: number;
}
/** Splits an element's text into words and staggers a fade-up reveal (CSS-transition driven). */
export const revealWords = (el: HTMLElement | null, opt: RevealWordsOptions = {}): void => {
  if (!el) return;
  const words = (el.textContent ?? '').trim().split(/\s+/);
  el.textContent = '';
  el.classList.add('word-wrap');
  const staggerMs = opt.stagger ?? 55;
  const start = opt.delay ?? 0;
  const spans: HTMLSpanElement[] = words.map((w, i) => {
    const outer = document.createElement('span');
    outer.className = 'word';
    const inner = document.createElement('span');
    inner.className = 'word-i';
    inner.textContent = w;
    inner.style.transitionDelay = (start + i * staggerMs) / 1000 + 's';
    outer.appendChild(inner);
    el.appendChild(outer);
    el.appendChild(document.createTextNode(' '));
    return inner;
  });
  if (prefersReducedMotion()) {
    spans.forEach((s) => s.classList.add('is-in'));
    return;
  }
  // Trigger on next macrotask (frozen-rAF safe)
  window.setTimeout(() => spans.forEach((s) => s.classList.add('is-in')), 40);
};

/** Plays the crimson route-sweep wipe between route changes. */
export const routeSweep = (): void => {
  if (prefersReducedMotion()) return;
  const el = document.getElementById('route-sweep');
  if (!el) return;
  utils.remove(el);
  el.style.transformOrigin = 'left center';
  const tl = createTimeline();
  tl.add(el, { scaleX: [0, 1], duration: 360, ease: 'inQuart' }).add(el, {
    scaleX: [1, 0],
    duration: 420,
    delay: 60,
    ease: 'outQuart',
    onBegin: () => {
      el.style.transformOrigin = 'right center';
    },
  });
};
