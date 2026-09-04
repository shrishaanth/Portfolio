import { useEffect } from 'react';

const RINGS: [delay: number, radius: number][] = [
  [0, 30],
  [140, 22],
  [280, 15],
];

/** Click ripple: three concentric rings spreading outward through the grid. */
export default function ClickRipple() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    let lastRipple = 0;
    function onDown(e: PointerEvent) {
      const target = e.target as HTMLElement | null;
      if (target?.closest?.('a,button,input,textarea,select,label,summary')) return;
      const now = Date.now();
      if (now - lastRipple < 180) return; // throttle bursts
      lastRipple = now;
      const cx = e.clientX;
      const cy = e.clientY;
      RINGS.forEach(([delay, r]) => {
        const ring = document.createElement('div');
        ring.className = 'bg__ripple';
        ring.style.left = cx + 'px';
        ring.style.top = cy + 'px';
        ring.style.setProperty('--r', String(r));
        ring.style.animationDelay = delay + 'ms';
        document.body.appendChild(ring);
        ring.addEventListener('animationend', () => ring.remove());
        setTimeout(() => {
          if (ring.parentNode) ring.remove();
        }, 2200);
      });
    }

    document.addEventListener('pointerdown', onDown, { passive: true });
    return () => document.removeEventListener('pointerdown', onDown);
  }, []);

  return null;
}
