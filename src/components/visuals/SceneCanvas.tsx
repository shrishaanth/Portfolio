import { useCanvas, type Scene } from '../../hooks/useCanvas';

/** A decorative canvas running one scene. Size it with CSS; it fills its box. */
export default function SceneCanvas({ scene, className }: { scene: Scene; className?: string }) {
  const ref = useCanvas(scene);
  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
