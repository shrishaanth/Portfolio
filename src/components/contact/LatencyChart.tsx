const BARS = [
  { x: 8, y: 49, h: 7 },
  { x: 40, y: 36, h: 20 },
  { x: 72, y: 20, h: 36 },
  { x: 104, y: 12, h: 44 },
  { x: 136, y: 26, h: 30 },
  { x: 168, y: 37, h: 19 },
  { x: 200, y: 44, h: 12 },
  { x: 232, y: 48, h: 8 },
  { x: 264, y: 51, h: 5 },
];

export default function LatencyChart() {
  return (
    <figure className="latency">
      <svg
        viewBox="0 0 300 74"
        role="img"
        aria-label="Reply-latency histogram: right-skewed, median around 12 hours, 99th percentile around 48 hours."
      >
        <line x1="6" y1="56" x2="288" y2="56" stroke="var(--line-accent)" />
        {BARS.map((b, i) => (
          <rect className="bar" key={i} x={b.x} y={b.y} width="28" height={b.h} />
        ))}
        <line className="tick" x1="120" y1="6" x2="120" y2="60" />
        <text className="tlabel" x="120" y="72" textAnchor="middle">
          p50
        </text>
        <line className="tick tick--p99" x1="250" y1="6" x2="250" y2="60" />
        <text className="tlabel tlabel--p99" x="250" y="72" textAnchor="middle">
          p99
        </text>
      </svg>
      <figcaption>
        reply latency &#183; p50 &asymp; 12h &#183; p99 &asymp; 48h &#183; exam weeks excluded
      </figcaption>
    </figure>
  );
}
