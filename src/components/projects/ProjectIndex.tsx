import type { ProjectData } from '../../data/projects';

export default function ProjectIndex({
  projects,
  activeId,
}: {
  projects: ProjectData[];
  activeId: string;
}) {
  return (
    <nav className="index" aria-label="Projects">
      {projects.map((p, i) => (
        <a
          key={p.id}
          className={`index__item${p.id === activeId ? ' is-active' : ''}`}
          href={`#${p.id}`}
        >
          <span className="index__no">{String(i + 1).padStart(2, '0')}</span>
          <span>
            <span className="index__name">{p.name}</span>
            <span className="index__cat" style={{ display: 'block' }}>
              {p.indexCategory}
            </span>
          </span>
        </a>
      ))}
      <div className="index__sticky-note">STICKY</div>
    </nav>
  );
}
