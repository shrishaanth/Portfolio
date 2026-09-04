import { useEffect, useRef } from 'react';

/**
 * Terminal type-on for the hero name (first paint only). `fullName` is the
 * element's real text — with JS off, reduced motion, or before this effect
 * runs, the name is simply there. Otherwise it is cleared and typed back in
 * with a blinking block caret.
 *
 * The name is passed in (rather than read back from the DOM) so this stays
 * correct even under React 18 StrictMode's dev-only double-invoke of effects.
 */
export function useTypeOnName<T extends HTMLElement>(fullName: string) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const heroName = ref.current;
    if (!heroName || !fullName) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.documentElement.classList.contains('js-motion') || reduce) return;

    heroName.setAttribute('aria-label', fullName);
    heroName.textContent = '';

    const caret = document.createElement('span');
    caret.className = 'caret';
    caret.setAttribute('aria-hidden', 'true');
    heroName.appendChild(caret);

    const timers: number[] = [];
    let ci = 0;
    let done = false;

    function typeChar() {
      caret.insertAdjacentText('beforebegin', fullName.charAt(ci));
      ci++;
      if (ci < fullName.length) {
        timers.push(window.setTimeout(typeChar, 55));
      } else {
        done = true;
        timers.push(
          window.setTimeout(() => {
            if (caret.parentNode) caret.parentNode.removeChild(caret);
          }, 2400),
        );
      }
    }
    timers.push(window.setTimeout(typeChar, 420)); // a beat of just the caret, then it types

    // safety net: never leave the name blank
    timers.push(
      window.setTimeout(() => {
        if (
          (heroName.textContent ?? '').replace(/\s/g, '').length <
          fullName.replace(/\s/g, '').length
        ) {
          if (caret.parentNode) caret.parentNode.removeChild(caret);
          heroName.textContent = fullName;
        }
      }, 3600),
    );

    return () => {
      timers.forEach((t) => clearTimeout(t));
      // restore the full name so a StrictMode remount (or any future
      // remount) starts from a clean, correct string rather than whatever
      // partial state typing had reached.
      if (!done) {
        heroName.textContent = fullName;
      }
    };
  }, [fullName]);

  return ref;
}
