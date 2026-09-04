import { useEffect, useRef } from 'react';

/**
 * The "$ shrishaanth --status" line types itself in once it scrolls into
 * view, then reveals the systems panel as its "output".
 */
export function useTerminalStatus() {
  const cmdRef = useRef<HTMLDivElement | null>(null);
  const sysRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const term = cmdRef.current;
    const sys = sysRef.current;
    if (!term || !sys) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const jsMotion = document.documentElement.classList.contains('js-motion');

    if (!jsMotion || reduce) {
      sys.classList.add('is-in');
      return;
    }

    const termCaret = term.querySelector<HTMLElement>('.term__caret');
    const cmd = (term.textContent || '').trim();
    let termStarted = false;
    const timers: number[] = [];

    function runTerm() {
      if (termStarted || !term) return;
      termStarted = true;
      while (term.firstChild && term.firstChild !== termCaret) {
        term.removeChild(term.firstChild);
      }
      let ti = 0;
      function step() {
        if (termCaret) termCaret.insertAdjacentText('beforebegin', cmd.charAt(ti));
        ti++;
        if (ti < cmd.length) {
          timers.push(window.setTimeout(step, 45));
        } else {
          sys?.classList.add('is-in');
          timers.push(
            window.setTimeout(() => {
              if (termCaret && termCaret.parentNode) termCaret.parentNode.removeChild(termCaret);
            }, 1600),
          );
        }
      }
      step();
    }

    let termIO: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      termIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              runTerm();
              termIO?.disconnect();
            }
          });
        },
        { rootMargin: '0px 0px -20% 0px', threshold: 0.1 },
      );
      termIO.observe(term);
    } else {
      runTerm();
    }
    // safety net: reveal the panel even if the observer never fires
    timers.push(
      window.setTimeout(() => {
        if (!termStarted) runTerm();
      }, 6000),
    );

    return () => {
      termIO?.disconnect();
      timers.forEach((t) => clearTimeout(t));
    };
  }, []);

  return { cmdRef, sysRef };
}
