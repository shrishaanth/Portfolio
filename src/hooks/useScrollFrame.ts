import { useEffect, useRef } from 'react';

/**
 * Runs `cb` at most once per animation frame while the page scrolls or
 * resizes (and once on mount). The latest `cb` is always used.
 */
export function useScrollFrame(cb: () => void): void {
  const cbRef = useRef(cb);
  useEffect(() => {
    cbRef.current = cb;
  });

  useEffect(() => {
    let raf = 0;
    const run = () => {
      raf = 0;
      cbRef.current();
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(run);
    };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);
}
