import { skillGroups } from '../../data/skills';

const ITEMS = skillGroups.flatMap((g) => g.items.map((label) => ({ label, cat: g.cat })));

/** Endless, hover-pausable band of the stack. Content is doubled for a seamless loop. */
export default function Marquee() {
  const run = (hidden: boolean) => (
    <ul className="marquee__run" aria-hidden={hidden || undefined}>
      {ITEMS.map((it, i) => (
        <li key={i} className={i % 2 ? 'is-outline' : undefined} data-cat={it.cat}>
          {it.label}
          <span className="marquee__star" aria-hidden="true">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee" role="region" aria-label="Tech stack">
      <div className="marquee__track">
        {run(false)}
        {run(true)}
      </div>
    </div>
  );
}
