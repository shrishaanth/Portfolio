import { useEffect, useState } from 'react';
import { approach } from '../../data/profile';
import { useInView } from '../../hooks/useInView';
import { prefersReducedMotion } from '../../lib/env';
import Backdrop from '../ui/Backdrop';
import SectionHead from '../ui/SectionHead';

const STEP_MS = 3600;

/**
 * Three numbered steps. One is highlighted at a time; the highlight advances on
 * its own while the section is on screen and follows the pointer or focus instead
 * once the visitor interacts.
 */
export default function Approach() {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const { ref, inView } = useInView<HTMLOListElement>({ once: false, threshold: 0.3 });

  useEffect(() => {
    if (!inView || held || prefersReducedMotion()) return;
    const id = window.setInterval(() => setActive((n) => (n + 1) % approach.length), STEP_MS);
    return () => window.clearInterval(id);
  }, [inView, held]);

  return (
    <section id="approach" className="section">
      <div className="wrap">
        <SectionHead label="Approach" lead="How I work," tail="in three steps." />

        <Backdrop name="approach" />

        <ol
          className="steps"
          ref={ref}
          onMouseLeave={() => setHeld(false)}
          onBlur={() => setHeld(false)}
        >
          {approach.map((step, i) => (
            <li
              key={step.title}
              className={i === active ? 'card step is-active' : 'card step'}
              tabIndex={0}
              onMouseEnter={() => {
                setHeld(true);
                setActive(i);
              }}
              onFocus={() => {
                setHeld(true);
                setActive(i);
              }}
            >
              <div className="step__top">
                <span className="step__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="step__rule" aria-hidden="true" />
              </div>
              <h3 className="step__title">{step.title}</h3>
              <p className="step__sub">{step.sub}</p>
              <p className="step__body">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
