import { useRef } from 'react';
import { education } from '../../data/profile';
import { useScrollFrame } from '../../hooks/useScrollFrame';
import { clamp } from '../../lib/scroll';
import Reveal from '../ui/Reveal';

/** Education timeline; its spine draws down as you scroll past it. */
export default function Timeline() {
  const ref = useRef<HTMLOListElement>(null);

  useScrollFrame(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = clamp((window.innerHeight * 0.7 - r.top) / r.height);
    el.style.setProperty('--draw', p.toFixed(3));
  });

  return (
    <ol className="timeline" ref={ref}>
      {education.map((e, i) => (
        <Reveal as="li" className="timeline__item" key={e.org + e.when} delay={i * 110}>
          <span className="timeline__dot" aria-hidden="true" />
          <span className="timeline__when">{e.when}</span>
          <h4 className="timeline__org">{e.org}</h4>
          <p className="timeline__detail">{e.detail}</p>
        </Reveal>
      ))}
    </ol>
  );
}
