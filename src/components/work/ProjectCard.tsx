import { useId, useRef, useState, type CSSProperties } from 'react';
import type { ProjectData } from '../../data/projects';
import { useInView } from '../../hooks/useInView';
import { usePointerVars } from '../../hooks/usePointerVars';
import Icon from '../ui/Icon';
import SurgeMapDiagram from './diagrams/SurgeMapDiagram';
import SyntropyDiagram from './diagrams/SyntropyDiagram';
import TaskifyDiagram from './diagrams/TaskifyDiagram';

const DIAGRAMS = {
  taskify: TaskifyDiagram,
  surgemap: SurgeMapDiagram,
  syntropy: SyntropyDiagram,
};

const GAG_MS = 1800;

export default function ProjectCard({
  project,
  index,
  total,
}: {
  project: ProjectData;
  index: number;
  total: number;
}) {
  const Diagram = DIAGRAMS[project.diagram];
  const spotRef = usePointerVars<HTMLDivElement>();
  const { ref: viewRef, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });
  const [storyOpen, setStoryOpen] = useState(false);
  const [gag, setGag] = useState(false);
  const gagTimer = useRef<number | undefined>(undefined);
  const storyId = useId();

  const peek = () => {
    setGag(true);
    window.clearTimeout(gagTimer.current);
    gagTimer.current = window.setTimeout(() => setGag(false), GAG_MS);
  };

  return (
    <article
      className={['proj', inView && 'is-in', gag && 'is-gag'].filter(Boolean).join(' ')}
      style={{ '--hue': project.hue } as CSSProperties}
      aria-labelledby={`${project.id}-name`}
    >
      <div className="proj__card spot" ref={spotRef}>
        <div className="proj__body" ref={viewRef}>
          <header className="proj__top">
            <span className="proj__num">
              {String(index + 1).padStart(2, '0')}
              <span>/{String(total).padStart(2, '0')}</span>
            </span>
            <span className="proj__cat">{project.indexCategory}</span>
            <span className="proj__year">{project.year}</span>
          </header>

          <div className="proj__grid">
            <div className="proj__text">
              <h3 className="proj__name" id={`${project.id}-name`}>
                {project.name}
              </h3>
              <p className="proj__lead">{project.lead}</p>

              <ol className="proj__points">
                {project.points.map((pt) => (
                  <li key={pt.n}>
                    <span>{pt.n}</span>
                    {pt.text}
                  </li>
                ))}
              </ol>

              <ul className="proj__tags" aria-label="Built with">
                {project.tags.map((t) => (
                  <li key={t.label} data-cat={t.cat}>
                    {t.label}
                  </li>
                ))}
              </ul>

              <div className="proj__actions">
                <a
                  className="proj__src"
                  href={project.source}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="GitHub"
                >
                  View source
                  <span className="proj__src-icon">
                    <Icon name="arrowUpRight" size={15} />
                  </span>
                </a>
                <button
                  type="button"
                  className={storyOpen ? 'proj__more is-open' : 'proj__more'}
                  aria-expanded={storyOpen}
                  aria-controls={storyId}
                  onClick={() => setStoryOpen((o) => !o)}
                >
                  {storyOpen ? 'Less' : 'The story'}
                  <Icon name="plus" size={14} />
                </button>
              </div>

              <div className={storyOpen ? 'proj__story is-open' : 'proj__story'} id={storyId}>
                <div>
                  <p>{project.context}</p>
                </div>
              </div>
            </div>

            <figure className="proj__fig">
              <div className="proj__fig-bar">
                <span>{project.figNo}</span>
                <span>{project.figCaption}</span>
              </div>
              <div className="proj__fig-canvas">
                <Diagram />
              </div>
              <blockquote className="proj__pull">
                <span aria-hidden="true">“</span>
                {project.pull}
              </blockquote>
              {project.gag && (
                <div className="gag">
                  <button type="button" className="gag__btn" onClick={peek}>
                    Try peeking past the as-of line →
                  </button>
                  <span className="gag__msg" role="status">
                    {gag ? 'DENIED · walk-forward only · no lookahead, ever.' : ''}
                  </span>
                </div>
              )}
            </figure>
          </div>
        </div>
      </div>
    </article>
  );
}
