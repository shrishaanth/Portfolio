/** Arrowhead marker; ids must be unique per diagram. */
export function Arrow({ id }: { id: string }) {
  return (
    <marker
      id={id}
      viewBox="0 0 10 10"
      refX="8"
      refY="5"
      markerWidth="6.5"
      markerHeight="6.5"
      orient="auto-start-reverse"
    >
      <path d="M0 0 L10 5 L0 10 z" className="d-arrow" />
    </marker>
  );
}
