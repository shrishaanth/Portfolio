import { useEffect, useRef } from 'react';

/** Cursor-revealed grid background: the pointer position drives --mx/--my. */
export function useCursorGrid<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const bg = ref.current;
    if (!bg) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !window.matchMedia('(hover: hover)').matches) return;

    let px = 0;
    let py = 0;
    let queued = false;

    function paint() {
      queued = false;
      bg!.style.setProperty('--mx', px + 'px');
      bg!.style.setProperty('--my', py + 'px');
    }

    function onMove(e: PointerEvent) {
      px = e.clientX;
      py = e.clientY;
      if (!bg!.classList.contains('is-live')) bg!.classList.add('is-live');
      if (!queued) {
        queued = true;
        requestAnimationFrame(paint);
      }
    }

    function onLeave() {
      bg!.classList.remove('is-live');
    }

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return ref;
}
