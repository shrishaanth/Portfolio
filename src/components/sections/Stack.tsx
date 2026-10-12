import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { projects } from '../../data/projects';
import { layers, skillKey, tooling } from '../../data/skills';
import { useInView } from '../../hooks/useInView';
import { prefersReducedMotion } from '../../lib/env';
import SectionHead from '../ui/SectionHead';
import StackGrid from './StackGrid';

const AUTO_MS = 4200;

interface Anchor {
  x: number;
  top: number;
  bottom: number;
}

/** A vertical S-curve from the bottom of one skill to the top of another. */
function linkPath(a: Anchor, b: Anchor): string {
  const mid = ((a.bottom + b.top) / 2).toFixed(1);
  const ax = a.x.toFixed(1);
  const bx = b.x.toFixed(1);
  return `M${ax} ${a.bottom.toFixed(1)} C${ax} ${mid}, ${bx} ${mid}, ${bx} ${b.top.toFixed(1)}`;
}

/**
 * The stack as a layered diagram. One project is "traced" at a time: the skills it
 * uses light up and glowing links thread them together from layer to layer. The trace
 * advances on its own while the section is on screen, and follows the visitor's choice
 * once they hover, focus or click a project.
 */
export default function Stack() {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const [links, setLinks] = useState<string[]>([]);
  const { ref: boxRef, inView } = useInView<HTMLDivElement>({ once: false, threshold: 0.2 });

  const used = useMemo(() => new Set(projects[active].stack.map(skillKey)), [active]);
  const isOn = (skill: string) => used.has(skillKey(skill));

  useEffect(() => {
    if (!inView || held || prefersReducedMotion()) return;
    const id = window.setInterval(() => setActive((n) => (n + 1) % projects.length), AUTO_MS);
    return () => window.clearInterval(id);
  }, [inView, held]);

  // measure the lit skills and join each layer's to the next layer that has any
  useLayoutEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    const measure = () => {
      const origin = box.getBoundingClientRect();
      const rows = Array.from(box.querySelectorAll<HTMLElement>('[data-layer]'))
        .map((layer) =>
          Array.from(layer.querySelectorAll<HTMLElement>('.skill.is-on')).map((el): Anchor => {
            const r = el.getBoundingClientRect();
            return {
              x: r.left + r.width / 2 - origin.left,
              top: r.top - origin.top,
              bottom: r.bottom - origin.top,
            };
          }),
        )
        .filter((row) => row.length > 0);

      const nearest = (from: Anchor, row: Anchor[]) =>
        row.reduce((best, c) => (Math.abs(c.x - from.x) < Math.abs(best.x - from.x) ? c : best));

      const paths = new Set<string>();
      for (let i = 0; i < rows.length - 1; i++) {
        const upper = rows[i];
        const lower = rows[i + 1];
        // every skill gets at least one link, in both directions
        upper.forEach((a) => paths.add(linkPath(a, nearest(a, lower))));
        lower.forEach((b) => paths.add(linkPath(nearest(b, upper), b)));
      }
      setLinks(Array.from(paths));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(box);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [active, boxRef]);

  const pick = (i: number) => {
    setHeld(true);
    setActive(i);
  };

  return (
    <section id="stack" className="section">
      <div className="wrap">
        <SectionHead
          label="Stack"
          lead="What I"
          tail="work with."
          aside="Drawn in layers, from what a user sees down to the languages underneath. Pick a project to trace what it runs on."
        />

        <div
          className="trace"
          role="group"
          aria-label="Trace a project through the stack"
          onMouseLeave={() => setHeld(false)}
        >
          <span className="mono">Trace</span>
          {projects.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className={i === active ? 'trace__btn is-active' : 'trace__btn'}
              aria-pressed={i === active}
              onMouseEnter={() => pick(i)}
              onFocus={() => pick(i)}
              onClick={() => pick(i)}
            >
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              {p.name}
            </button>
          ))}
        </div>

        <div className="arch" ref={boxRef}>
          <svg className="arch__links" aria-hidden="true">
            {/* keyed by project so the links redraw from scratch on each change */}
            <g key={active}>
              {links.map((d) => (
                <g key={d}>
                  <path className="link" d={d} pathLength={1} />
                  <path className="link__flow" d={d} />
                </g>
              ))}
            </g>
          </svg>

          <div className="arch__layers">
            {layers.map((layer, i) => (
              <div className="layer" data-layer={layer.id} key={layer.id}>
                <div className="layer__head">
                  <span className="num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mono">{layer.label}</h3>
                </div>
                <ul className="layer__skills">
                  {layer.items.map((item) => (
                    <li key={item} className={isOn(item) ? 'skill is-on' : 'skill'}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="arch__rail">
            <div className="layer__head">
              <span className="num">+</span>
              <h3 className="mono">{tooling.label}</h3>
            </div>
            <ul className="layer__skills">
              {tooling.items.map((item) => (
                <li key={item} className={isOn(item) ? 'skill is-on' : 'skill'}>
                  {item}
                </li>
              ))}
            </ul>
            <p className="arch__note mono">Across every layer</p>
          </div>
        </div>

        <StackGrid />

        <p className="sr-only" aria-live="polite">
          {projects[active].name} uses {projects[active].stack.join(', ')}.
        </p>
      </div>
    </section>
  );
}
