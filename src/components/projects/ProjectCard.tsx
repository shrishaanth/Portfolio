import { useRef, useState } from 'react';
import type { ProjectData } from '../../data/projects';
import Reveal from '../Reveal';
import TaskifyDiagram from './diagrams/TaskifyDiagram';
import SurgeMapDiagram from './diagrams/SurgeMapDiagram';
import SyntropyDiagram from './diagrams/SyntropyDiagram';

const DIAGRAMS = {
  taskify: TaskifyDiagram,
  surgemap: SurgeMapDiagram,
  syntropy: SyntropyDiagram,
};

const GAG_MS = 1700;

export default function ProjectCard({
  project,
  isActive,
}: {
  project: ProjectData;
  isActive: boolean;
}) {
  const Diagram = DIAGRAMS[project.diagram];
  const [gagActive, setGagActive] = useState(false);
  const gagTimer = useRef<number | undefined>(undefined);

  function handleGag() {
    setGagActive(true);
    window.clearTimeout(gagTimer.current);
    gagTimer.current = window.setTimeout(() => setGagActive(false), GAG_MS);
  }

  return (
    <Reveal
      as="article"
      id={project.id}
      className={['project', isActive ? 'is-active' : '', gagActive ? 'is-gag' : '']
        .filter(Boolean)
        .join(' ')}
    >
      <div className="project__body">
        <div className="project__head">
          <h2 className="project__name">{project.name}</h2>
          <span className="project__year">{project.year}</span>
        </div>
        <p className="project__lead">{project.lead}</p>
        <p className="project__context">{project.context}</p>
        <blockquote className="project__pull">&ldquo;{project.pull}&rdquo;</blockquote>

        <figure className="project__diagram">
          <Diagram />
          <figcaption>
            {project.figNo} &mdash; {project.figCaption}
          </figcaption>
        </figure>

        {project.gag && (
          <>
            <button type="button" className="gag-btn" onClick={handleGag}>
              try: peek past the as-of line &rarr;
            </button>
            <p className="gag-msg" hidden={!gagActive}>
              DENIED &#183; walk-forward only &#183; no lookahead, ever.
            </p>
          </>
        )}

        <div className="points">
          {project.points.map((pt) => (
            <div key={pt.n}>
              <b>{pt.n}</b>
              <p>{pt.text}</p>
            </div>
          ))}
        </div>
        <div className="tags">
          {project.tags.map((tag, i) => (
            <span data-cat={tag.cat} key={i}>
              {tag.label}
            </span>
          ))}
        </div>
        <div className="links">
          <a href={project.source} target="_blank" rel="noreferrer">
            SOURCE &rarr;
          </a>
        </div>
      </div>
    </Reveal>
  );
}
