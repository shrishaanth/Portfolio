import { useEffect, useRef } from 'react';
import { hasFinePointer } from '../lib/env';

/**
 * Writes the pointer position inside an element to CSS vars:
 * --mx / --my in px (for spotlights) and --px / --py in -0.5…0.5 (for tilt).
 */
export function usePointerVars<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer()) return;

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);
      el.style.setProperty('--px', (x / r.width - 0.5).toFixed(3));
      el.style.setProperty('--py', (y / r.height - 0.5).toFixed(3));
    };
    const leave = () => {
      el.style.setProperty('--px', '0');
      el.style.setProperty('--py', '0');
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, []);

  return ref;
}
