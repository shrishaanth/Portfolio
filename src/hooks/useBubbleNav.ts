import { useEffect, useRef, useState } from 'react';
import { glideTo } from '../lib/smoothScroll';

const GLIDE_MS = 850;

export interface NavTab {
  id: string;
  href: string;
  label: string;
}

/**
 * Bubble tab indicator + slow glide-scroll: the bubble measures the active
 * tab's box and slides under it, in step with a deliberate easeInOutCubic
 * scroll on click. Scrollspy keeps it in sync while scrolling by hand, and
 * is muted for the duration of a click-driven glide so passing sections
 * can't yank the bubble mid-flight.
 */
export function useBubbleNav(tabs: NavTab[]) {
  const [activeHref, setActiveHref] = useState(tabs[0]?.href ?? '');
  const tabRefs = useRef(new Map<string, HTMLAnchorElement>());
  const bubbleRef = useRef<HTMLSpanElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const glidingRef = useRef(false);

  function registerTab(href: string) {
    return (el: HTMLAnchorElement | null) => {
      if (el) tabRefs.current.set(href, el);
      else tabRefs.current.delete(href);
    };
  }

  function moveBubble(href: string) {
    const bubble = bubbleRef.current;
    const tab = tabRefs.current.get(href);
    if (!bubble || !tab) return;
    bubble.classList.remove('is-idle');
    bubble.style.setProperty('--bx', tab.offsetLeft + 'px');
    bubble.style.setProperty('--bw', tab.offsetWidth + 'px');
  }

  useEffect(() => {
    moveBubble(activeHref);
  }, [activeHref]);

  useEffect(() => {
    moveBubble(activeHref);
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => moveBubble(activeHref));
    }
    function onResize() {
      moveBubble(activeHref);
    }
    window.addEventListener('resize', onResize);

    const sections = tabs
      .map((t) => document.querySelector(t.href))
      .filter((el): el is Element => el !== null);

    let spy: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window && sections.length) {
      spy = new IntersectionObserver(
        (entries) => {
          if (glidingRef.current) return;
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const tab = tabs.find((t) => t.href === '#' + entry.target.id);
            if (tab) setActiveHref(tab.href);
          });
        },
        { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
      );
      sections.forEach((s) => spy!.observe(s));
    }

    function onScroll() {
      if (glidingRef.current) return;
      const atBottom =
        window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 72;
      if (atBottom) setActiveHref(tabs[tabs.length - 1].href);
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      spy?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleTabClick(e: React.MouseEvent<HTMLAnchorElement>, tab: NavTab) {
    const target = document.querySelector(tab.href);
    if (!target) return;
    e.preventDefault();

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const navH = navRef.current?.offsetHeight ?? 0;
    const y = target.getBoundingClientRect().top + window.pageYOffset - navH - 16;
    history.replaceState(null, '', tab.href);

    if (reduce) {
      setActiveHref(tab.href);
      window.scrollTo(0, y);
      return;
    }

    glidingRef.current = true;
    bubbleRef.current?.style.setProperty('--bubble-dur', GLIDE_MS / 1000 + 's');
    setActiveHref(tab.href); // bubble sets off now, at glide speed
    glideTo(y, GLIDE_MS, () => {
      bubbleRef.current?.style.removeProperty('--bubble-dur');
      setTimeout(() => {
        glidingRef.current = false;
      }, 60);
    });
  }

  return { activeHref, registerTab, bubbleRef, navRef, handleTabClick };
}
