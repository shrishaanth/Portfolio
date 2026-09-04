import { useCursorGrid } from '../hooks/useCursorGrid';

/** Fixed, cursor-revealed grid behind the whole page. */
export default function Background() {
  const ref = useCursorGrid<HTMLDivElement>();

  return (
    <div className="bg" ref={ref} aria-hidden="true">
      <div className="bg__ambient" />
      <div className="bg__base" />
      <div className="bg__reveal" />
      <div className="bg__glow" />
    </div>
  );
}
