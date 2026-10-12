import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/env';

/** Pointer position relative to the canvas: 0…1 inside it, beyond that outside. */
export interface Pointer {
  x: number;
  y: number;
}
/** Paints one frame. `t` is elapsed animation time in ms. */
export type Frame = (ctx: CanvasRenderingContext2D, t: number, pointer: Pointer) => void;
/** Builds a scene for a canvas of the given CSS size, and returns its frame painter. */
export type Scene = (w: number, h: number) => Frame;

/** A representative moment to paint when motion is turned off. */
const STILL_T = 5200;

/**
 * Runs a canvas scene: keeps the backing store matched to the element's size and
 * the display's pixel ratio, rebuilds the scene on resize, and only animates while
 * the canvas is on screen and the tab is visible. With reduced motion it paints a
 * single still frame. `scene` must be a stable reference (declare it at module level).
 */
export function useCanvas(scene: Scene) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const still = prefersReducedMotion();
    const pointer: Pointer = { x: 0.5, y: 0.5 };
    let frame: Frame | null = null;
    let w = 0;
    let h = 0;
    let t = still ? STILL_T : 0;
    let last = 0;
    let raf = 0;
    let onScreen = false;

    const paint = () => {
      if (!frame) return;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      frame(ctx, t, pointer);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      frame = scene(w, h);
      if (!raf) paint();
    };

    const loop = (ts: number) => {
      t += Math.min(ts - (last || ts), 50);
      last = ts;
      paint();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (still || raf || !onScreen || document.hidden) return;
      last = 0;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onMove = (e: PointerEvent) => {
      if (!onScreen) return;
      const r = canvas.getBoundingClientRect();
      pointer.x = (e.clientX - r.left) / r.width;
      pointer.y = (e.clientY - r.top) / r.height;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    io.observe(canvas);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    resize();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [scene]);

  return ref;
}
