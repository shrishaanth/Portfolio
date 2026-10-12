import { projects, type ProjectData } from '../../data/projects';
import Icon from '../ui/Icon';
import Reveal from '../ui/Reveal';
import SectionHead from '../ui/SectionHead';
import ProjectVisual from '../visuals/ProjectVisual';
import SceneCanvas from '../visuals/SceneCanvas';
import { dustScene } from '../visuals/scenes';

function ProjectCard({ project, index }: { project: ProjectData; index: number }) {
  return (
    <Reveal as="article" className="card proj" id={project.id} aria-labelledby={`${project.id}-h`}>
      <SceneCanvas scene={dustScene} className="proj__dust" />

      <div className="proj__main">
        <div className="proj__top">
          <span className="num">{String(index + 1).padStart(2, '0')}</span>
          <span className="mono">{project.category}</span>
        </div>

        <h3 className="proj__name" id={`${project.id}-h`}>
          {project.name}
        </h3>
        <p className="proj__lead">{project.lead}</p>

        <div className="proj__metric">
          <span className="proj__value">{project.metric.value}</span>
          <span className="mono">{project.metric.label}</span>
        </div>

        <ul className="tags" aria-label="Built with">
          {project.stack.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        <div className="proj__links">
          {project.live && (
            <a className="pill pill--sm" href={project.live} target="_blank" rel="noreferrer">
              Live demo <Icon name="arrowUpRight" size={14} />
            </a>
          )}
          <a
            className="pill pill--sm pill--ghost"
            href={project.source}
            target="_blank"
            rel="noreferrer"
          >
            Source <Icon name="github" size={14} />
          </a>
        </div>
      </div>

      <div className="proj__side">
        <ProjectVisual project={project} />

        <ul className="proj__points">
          {project.points.map((pt, i) => (
            <li key={i}>
              <span className="mono" aria-hidden="true">
                {String.fromCharCode(97 + i)}
              </span>
              {pt}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

export default function Work() {
  return (
    <section id="work" className="section">
      <div className="wrap">
        <SectionHead
          label="Selected work"
          lead="Four projects,"
          tail="each one measured."
          aside="Each of these ships with an evaluation: what was tested, against which baseline, and where it fell short."
        />

        <div className="projects">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
