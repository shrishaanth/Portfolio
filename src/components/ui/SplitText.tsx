import type { CSSProperties } from 'react';

/**
 * Splits text into masked characters that rise in on load (staggered),
 * and hop individually on hover. Screen readers get the plain string.
 */
export default function SplitText({
  text,
  className,
  baseDelay = 0,
  step = 38,
}: {
  text: string;
  className?: string;
  baseDelay?: number;
  step?: number;
}) {
  return (
    <span className={['split', className].filter(Boolean).join(' ')}>
      <span className="sr-only">{text}</span>
      {Array.from(text).map((ch, i) => (
        <span className="split__mask" aria-hidden="true" key={i}>
          <span
            className="split__ch"
            style={{ '--d': `${baseDelay + i * step}ms` } as CSSProperties}
          >
            {ch === ' ' ? ' ' : ch}
          </span>
        </span>
      ))}
    </span>
  );
}
