import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../../lib/env';

/** Cycles through words with a vertical roll. Holds on the first under reduced motion. */
export default function Rotator({
  words,
  interval = 2600,
}: {
  words: string[];
  interval?: number;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion() || words.length < 2) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className="rotator">
      <span className="sr-only">{words.join(', ')}</span>
      <span className="rotator__word" key={i} aria-hidden="true">
        {words[i]}
      </span>
    </span>
  );
}
