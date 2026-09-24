import { useEffect, useState } from 'react';
import { useInView } from '../../hooks/useInView';
import { prefersReducedMotion } from '../../lib/env';

const N = 28;
const W = 220;
const H = 44;
const sample = () => 9 + Math.round(Math.random() * 7 + (Math.random() < 0.08 ? 14 : 0));

/** A live-ish ping sparkline. Mostly for fun; it only ticks while on screen. */
export default function Latency() {
  const { ref, inView } = useInView<HTMLDivElement>({ once: false, threshold: 0 });
  const [data, setData] = useState<number[]>(() => Array.from({ length: N }, sample));

  useEffect(() => {
    if (!inView || prefersReducedMotion()) return;
    const id = window.setInterval(() => setData((d) => [...d.slice(1), sample()]), 1100);
    return () => window.clearInterval(id);
  }, [inView]);

  const max = 36;
  const pts = data.map((v, i) => [(i / (N - 1)) * W, H - (v / max) * H] as const);
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const area = `${line} L${W} ${H} L0 ${H} Z`;
  const [lx, ly] = pts[pts.length - 1];
  const last = data[data.length - 1];

  return (
    <div className="ping" ref={ref}>
      <div className="ping__head">
        <code>$ ping shrishaanth</code>
        <span className="ping__ok">
          200 OK · <b>{last}ms</b>
        </span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="ping-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="var(--mint)" stopOpacity="0.28" />
            <stop offset="1" stopColor="var(--mint)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#ping-fill)" />
        <path
          d={line}
          fill="none"
          stroke="var(--mint)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
        <circle cx={lx} cy={ly} r="2.5" fill="var(--mint)" />
      </svg>
    </div>
  );
}
