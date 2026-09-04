import { useEffect, useRef, useState } from 'react';

/**
 * Scroll-reveal: toggles both ways so a block glides up + fades in as it
 * enters the viewport and drops back to hidden once it has left, re-arming
 * every time you scroll back to it (see .js-motion .reveal in global.css).
 */
export function useReveal<T extends HTMLElement>(small = false) {
  const ref = useRef<T | null>(null);
  const [isIn, setIsIn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      setIsIn(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setIsIn(entry.isIntersecting));
      },
      // start the entrance a little before the block is fully on screen,
      // and re-arm once it is ~15% past either edge
      { rootMargin: '-8% 0px -15% 0px', threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const className = ['reveal', small ? 'reveal--sm' : '', isIn ? 'is-in' : '']
    .filter(Boolean)
    .join(' ');

  return { ref, isIn, className };
}
