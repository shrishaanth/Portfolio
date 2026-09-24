import { stats } from '../../data/profile';
import { useCountUp } from '../../hooks/useCountUp';
import { useInView } from '../../hooks/useInView';
import Reveal from '../ui/Reveal';

function Stat({ s, start, i }: { s: (typeof stats)[number]; start: boolean; i: number }) {
  const v = useCountUp(s.value, start, s.decimals ?? 0, 1500 + i * 150);
  return (
    <Reveal className="stat" delay={i * 90}>
      <span className="stat__v">
        {s.prefix && <span className="stat__affix">{s.prefix}</span>}
        {v}
        {s.suffix && <span className="stat__affix">{s.suffix}</span>}
      </span>
      <span className="stat__k">{s.label}</span>
    </Reveal>
  );
}

export default function Stats() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.35 });
  return (
    <div className="stats" ref={ref}>
      {stats.map((s, i) => (
        <Stat key={s.label} s={s} start={inView} i={i} />
      ))}
    </div>
  );
}
