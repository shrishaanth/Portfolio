import { useEffect, useRef } from 'react';
import { projects } from '../../data/projects';
import { useScrollFrame } from '../../hooks/useScrollFrame';
import { prefersReducedMotion } from '../../lib/env';
import { clamp } from '../../lib/scroll';
import SectionHead from '../ui/SectionHead';
import ProjectCard from './ProjectCard';

const STACK_MIN_WIDTH = 960;
const NAV_OFFSET = 92;
const PEEK = 16; // each later card sticks this much lower, so the deck's edges show

/**
 * Cards pin in turn and the next one slides over the last, which recedes.
 * Each card's sticky offset is min(nav offset, viewport − card height), so a
 * card taller than the screen pins by its bottom edge rather than being cut off.
 */
export default function Work() {
  const deckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;
    const items = Array.from(deck.children) as HTMLElement[];

    const measure = () => {
      const stack = window.innerWidth >= STACK_MIN_WIDTH;
      deck.classList.toggle('is-stacked', stack);
      items.forEach((el, i) => {
        // offsetHeight ignores the recede transform, so no measure/scale feedback
        const h = (el.firstElementChild as HTMLElement | null)?.offsetHeight ?? 0;
        const top = Math.min(NAV_OFFSET + i * PEEK, window.innerHeight - h - 24);
        el.style.setProperty('--stick', `${Math.round(top)}px`);
      });
    };

    const ro = new ResizeObserver(measure);
    items.forEach((el) => el.firstElementChild && ro.observe(el.firstElementChild));
    window.addEventListener('resize', measure);
    measure();
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  // as card i+1 rides up over card i, card i scales back and dims
  useScrollFrame(() => {
    const deck = deckRef.current;
    if (!deck || !deck.classList.contains('is-stacked') || prefersReducedMotion()) return;
    const items = Array.from(deck.children) as HTMLElement[];
    items.forEach((el, i) => {
      const next = items[i + 1];
      if (!next) return;
      const cardTop = el.getBoundingClientRect().top;
      const nextTop = next.getBoundingClientRect().top;
      const p = clamp(1 - (nextTop - cardTop) / (window.innerHeight * 0.75));
      el.style.setProperty('--cover', p.toFixed(3));
    });
  });

  return (
    <section id="work" className="section work">
      <div className="wrap">
        <SectionHead
          index="02"
          label="Selected work"
          aside={`(${String(projects.length).padStart(2, '0')})`}
          title={
            <>
              Three projects, <em>each built around one hard constraint.</em>
            </>
          }
        />

        <div className="deck" ref={deckRef}>
          {projects.map((p, i) => (
            <div className="deck__item" key={p.id} id={p.id}>
              <ProjectCard project={p} index={i} total={projects.length} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
