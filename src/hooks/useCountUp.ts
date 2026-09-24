import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../lib/env';

/** Eases from 0 to `target` once `start` flips true. */
export function useCountUp(target: number, start: boolean, decimals = 0, duration = 1600): string {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (prefersReducedMotion() || target === 0) {
      setValue(target);
      return;
    }
    let raf = 0;
    let t0: number | null = null;
    const frame = (ts: number) => {
      if (t0 === null) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);

  return value.toFixed(decimals);
}
