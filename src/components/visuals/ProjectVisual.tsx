import type { ProjectData } from '../../data/projects';
import SceneCanvas from './SceneCanvas';
import { blastScene, boardScene, graphScene, zonesScene } from './scenes';

const SCENES = {
  graph: graphScene,
  blast: blastScene,
  board: boardScene,
  zones: zonesScene,
};

/**
 * The picture in a project card. Draws the project's animated scene, unless the
 * project has an `image` set — then that render is shown instead (see docs/imagery.md).
 */
export default function ProjectVisual({ project }: { project: ProjectData }) {
  return (
    <div
      className={project.image ? 'proj__visual proj__visual--image' : 'proj__visual'}
      aria-hidden="true"
    >
      {project.image ? (
        <img src={project.image} alt="" loading="lazy" decoding="async" />
      ) : (
        <SceneCanvas scene={SCENES[project.visual]} />
      )}
    </div>
  );
}
