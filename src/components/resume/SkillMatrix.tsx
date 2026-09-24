import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { projects } from '../../data/projects';
import { skillGroups, type SkillCategory } from '../../data/skills';

type Filter = 'all' | SkillCategory;

// project tags say "React" where the stack says "React.js" — compare loosely
const norm = (s: string) => s.toLowerCase().replace(/\.js$/, '');

const usedIn = new Map<string, string[]>();
for (const p of projects) {
  for (const t of p.tags) {
    const k = norm(t.label);
    usedIn.set(k, [...(usedIn.get(k) ?? []), p.name]);
  }
}

const SHORT: Record<SkillCategory, string> = {
  lang: 'Languages',
  fw: 'Frameworks',
  ml: 'Data / ML',
  db: 'Databases',
  tools: 'Tools',
};

/**
 * Filterable stack. Each chip knows which projects on this page use it —
 * hover (or focus) to see them.
 */
export default function SkillMatrix() {
  const [filter, setFilter] = useState<Filter>('all');
  const tabsRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);

  const skills = useMemo(
    () =>
      skillGroups.flatMap((g) =>
        g.items.map((label) => ({ label, cat: g.cat, projects: usedIn.get(norm(label)) ?? [] })),
      ),
    [],
  );

  useLayoutEffect(() => {
    const place = () => {
      const btn = tabsRef.current?.querySelector<HTMLElement>(`[data-f="${filter}"]`);
      const pill = pillRef.current;
      if (!btn || !pill) return;
      pill.style.width = `${btn.offsetWidth}px`;
      pill.style.transform = `translateX(${btn.offsetLeft}px)`;
    };
    place();
    window.addEventListener('resize', place);
    document.fonts?.ready.then(place);
    return () => window.removeEventListener('resize', place);
  }, [filter]);

  const filters: Filter[] = ['all', ...skillGroups.map((g) => g.cat)];

  return (
    <div className="matrix">
      <div className="matrix__tabs" ref={tabsRef} role="toolbar" aria-label="Filter stack">
        <span className="matrix__pill" ref={pillRef} aria-hidden="true" />
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            data-f={f}
            data-cat={f === 'all' ? undefined : f}
            aria-pressed={filter === f}
            className={filter === f ? 'is-on' : undefined}
            onClick={() => setFilter(f)}
          >
            {f !== 'all' && <i aria-hidden="true" />}
            {f === 'all' ? 'Everything' : SHORT[f]}
          </button>
        ))}
      </div>

      <ul className="matrix__grid">
        {skills.map((s, i) => {
          const on = filter === 'all' || filter === s.cat;
          return (
            <li
              key={s.label}
              className={on ? 'skill' : 'skill is-off'}
              data-cat={s.cat}
              style={{ '--i': i } as React.CSSProperties}
              tabIndex={on ? 0 : -1}
              aria-label={
                s.projects.length ? `${s.label} — used in ${s.projects.join(', ')}` : s.label
              }
            >
              <span className="skill__name">{s.label}</span>
              {s.projects.length > 0 && (
                <span className="skill__count" aria-hidden="true">
                  {s.projects.length}
                </span>
              )}
              <span className="skill__tip" aria-hidden="true">
                {s.projects.length ? (
                  <>Used in {s.projects.join(' · ')}</>
                ) : (
                  'Coursework & tinkering'
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
