import { useRef, useState } from 'react';
import { useScrollFrame } from '../../hooks/useScrollFrame';
import { prefersReducedMotion } from '../../lib/env';
import { clamp } from '../../lib/scroll';

/**
 * A statement whose words light up one by one as it scrolls through the
 * viewport. Words wrapped in *asterisks* light up in the accent colour.
 */
export default function ScrollText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(' ');
  const [lit, setLit] = useState(() => (prefersReducedMotion() ? words.length : 0));

  useScrollFrame(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    // 0 when the block's top sits at 85% of the viewport, 1 when its bottom reaches 45%
    const p = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.4));
    setLit(Math.round(p * words.length));
  });

  return (
    <p className="scrolltext" ref={ref}>
      <span className="sr-only">{text.replace(/\*/g, '')}</span>
      {words.map((w, i) => {
        const accent = w.startsWith('*');
        const clean = w.replace(/\*/g, '');
        return (
          <span
            key={i}
            aria-hidden="true"
            className={['scrolltext__w', i < lit && 'is-lit', accent && 'is-accent']
              .filter(Boolean)
              .join(' ')}
          >
            {clean}{' '}
          </span>
        );
      })}
    </p>
  );
}
