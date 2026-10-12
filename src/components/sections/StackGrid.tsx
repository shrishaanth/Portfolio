import { projects } from '../../data/projects';
import { layers, skillKey, tooling } from '../../data/skills';
import Reveal from '../ui/Reveal';
import TechIcon from '../ui/TechIcon';

// which featured projects use each skill, by loose key
const usedIn = new Map<string, string[]>();
for (const p of projects) {
  for (const entry of p.stack) {
    const key = skillKey(entry);
    usedIn.set(key, [...(usedIn.get(key) ?? []), p.name]);
  }
}

// short tag shown in each tile's corner
const TAGS: Record<string, string> = {
  lang: 'Language',
  backend: 'Backend',
  frontend: 'Frontend',
  ml: 'Data / ML',
  db: 'Database',
};
// languages first, then down the stack
const ORDER = ['lang', 'backend', 'frontend', 'ml', 'db'];

const tiles = [
  ...ORDER.flatMap((id) => {
    const layer = layers.find((l) => l.id === id)!;
    return layer.items.map((name) => ({ name, tag: TAGS[id] }));
  }),
  ...tooling.items.map((name) => ({ name, tag: 'Tool' })),
].map((t) => ({ ...t, projects: usedIn.get(skillKey(t.name)) ?? [] }));

/** Every technology as a tile: mark, name, category, and where it was used. */
export default function StackGrid() {
  // move each tile's spotlight to the pointer
  const onPointerMove = (e: React.PointerEvent<HTMLUListElement>) => {
    const tile = (e.target as Element).closest<HTMLElement>('.tile');
    if (!tile) return;
    const r = tile.getBoundingClientRect();
    tile.style.setProperty('--mx', `${e.clientX - r.left}px`);
    tile.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <div className="grid-stack">
      <Reveal className="label" variant="fade">
        <span className="label__rule" aria-hidden="true" />
        Everything, at a glance
        <span className="grid-stack__count mono">{tiles.length} technologies</span>
      </Reveal>

      <Reveal as="ul" className="tiles" onPointerMove={onPointerMove}>
        {tiles.map((t) => (
          <li className="tile" key={t.name}>
            <span className="tile__tag">{t.tag}</span>
            <span className="tile__icon">
              <TechIcon name={t.name} />
            </span>
            <span className="tile__name">{t.name}</span>
            <span className="tile__used mono">
              {t.projects.length ? t.projects.join(' · ') : 'Other work & coursework'}
            </span>
          </li>
        ))}
      </Reveal>
    </div>
  );
}
