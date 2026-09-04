import { useEffect, useRef } from 'react';

const HOT =
  'a,button,input,textarea,select,summary,label,[role="button"],.index__item,.contact__card,.gag-btn';

/** Custom reticle cursor (fine pointers only) — a lagging ring plus an exact dot. */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let rx = tx;
    let ry = ty;
    let ready = false;
    let raf = 0;

    function onMove(e: PointerEvent) {
      tx = e.clientX;
      ty = e.clientY;
      dot!.style.transform = `translate3d(${tx}px,${ty}px,0)`;
      if (!ready) {
        ready = true;
        rx = tx;
        ry = ty;
        document.body.classList.add('cursor-ready');
      }
    }

    function loop() {
      const k = reduce ? 1 : 0.2;
      rx += (tx - rx) * k;
      ry += (ty - ry) * k;
      ring!.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    function onOver(e: PointerEvent) {
      const target = e.target as HTMLElement | null;
      if (!target || !target.closest) return;
      const field = target.closest('input,textarea,select');
      ring!.classList.toggle('is-text', !!field);
      ring!.classList.toggle('is-hot', !field && !!target.closest(HOT));
    }
    function onDown() {
      ring!.classList.add('is-down');
    }
    function onUp() {
      ring!.classList.remove('is-down');
    }
    function onBlur() {
      document.body.classList.remove('cursor-ready');
    }
    function onFocus() {
      if (ready) document.body.classList.add('cursor-ready');
    }

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('pointerup', onUp);
    window.addEventListener('blur', onBlur);
    window.addEventListener('focus', onFocus);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('pointerup', onUp);
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  return (
    <>
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
    </>
  );
}
