import { useEffect, useRef } from 'react';
import { hasFinePointer, prefersReducedMotion } from '../../lib/env';

const INTERACTIVE = 'a, button, [role="button"], label, summary, [data-cursor]';

/**
 * Two-part cursor: a dot pinned to the pointer and a ring that trails it.
 * The ring swells over interactive elements and shows a label for elements
 * carrying data-cursor="…". Fine pointers only; the native cursor stays in
 * text fields.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!hasFinePointer()) return;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;
    const root = document.documentElement;
    root.classList.add('has-cursor');

    const ease = prefersReducedMotion() ? 1 : 0.18;
    const pos = { x: -100, y: -100 };
    const lag = { x: -100, y: -100 };
    let raf = 0;
    let visible = false;

    const tick = () => {
      lag.x += (pos.x - lag.x) * ease;
      lag.y += (pos.y - lag.y) * ease;
      dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      ring.style.transform = `translate3d(${lag.x}px, ${lag.y}px, 0)`;
      raf =
        Math.abs(pos.x - lag.x) + Math.abs(pos.y - lag.y) > 0.1 ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!visible) {
        visible = true;
        lag.x = pos.x;
        lag.y = pos.y;
        root.classList.add('cursor-on');
      }
      kick();
    };

    const over = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const typing = target?.closest('input, textarea, select');
      const hit = target?.closest<HTMLElement>(INTERACTIVE);
      const text = hit?.dataset.cursor ?? '';
      root.classList.toggle('cursor-hover', !!hit && !typing);
      root.classList.toggle('cursor-text', !!typing);
      root.classList.toggle('cursor-label', !!text);
      label.textContent = text;
    };

    const leave = () => {
      visible = false;
      root.classList.remove('cursor-on');
    };
    const down = () => root.classList.add('cursor-down');
    const up = () => root.classList.remove('cursor-down');

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over);
    document.documentElement.addEventListener('pointerleave', leave);
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove(
        'has-cursor',
        'cursor-on',
        'cursor-hover',
        'cursor-text',
        'cursor-label',
      );
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      document.documentElement.removeEventListener('pointerleave', leave);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
    };
  }, []);

  return (
    <div className="cursor" aria-hidden="true">
      <div className="cursor__ring" ref={ringRef}>
        <span className="cursor__label" ref={labelRef} />
      </div>
      <div className="cursor__dot" ref={dotRef} />
    </div>
  );
}
