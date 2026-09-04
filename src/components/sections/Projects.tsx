import { projects } from '../../data/projects';
import { useActiveProject } from '../../hooks/useActiveProject';
import Reveal from '../Reveal';
import ProjectIndex from '../projects/ProjectIndex';
import ProjectCard from '../projects/ProjectCard';

const PROJECT_IDS = projects.map((p) => p.id);

export default function Projects() {
  const activeId = useActiveProject(PROJECT_IDS);

  return (
    <section id="projects">
      <Reveal small className="sec-head">
        <span className="sec-head__label">SELECTED_WORK</span>
        <span className="sec-head__count">[ {String(projects.length).padStart(2, '0')} ]</span>
      </Reveal>

      <div className="work">
        <ProjectIndex projects={projects} activeId={activeId} />
        <div>
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} isActive={p.id === activeId} />
          ))}
        </div>
      </div>
    </section>
  );
}
