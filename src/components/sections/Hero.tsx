import { useApp } from '../../context/AppContext';
import { profile, stats } from '../../data/profile';
import { useCountUp } from '../../hooks/useCountUp';
import { useInView } from '../../hooks/useInView';
import Backdrop from '../ui/Backdrop';
import Icon from '../ui/Icon';

function Stat({ s, start, i }: { s: (typeof stats)[number]; start: boolean; i: number }) {
  const v = useCountUp(s.value, start, s.decimals ?? 0, 1300 + i * 120);
  return (
    <div className="stat">
      {/* dt first for valid markup; CSS flips the order so the number sits on top */}
      <dt className="stat__k">{s.label}</dt>
      <dd className="stat__v">
        {v}
        {s.suffix}
      </dd>
    </div>
  );
}

export default function Hero() {
  const { resumeHref, openResume } = useApp();
  const { ref, inView } = useInView<HTMLDListElement>({ threshold: 0.2 });

  return (
    <section id="top" className="hero gridlines">
      <Backdrop name="branches" eager />
      <div className="wrap hero__body">
        <p className="label intro" style={{ '--d': '100ms' } as React.CSSProperties}>
          <span className="label__rule" aria-hidden="true" />
          {profile.name} — {profile.role}
        </p>

        <h1 className="display display--hero">
          <span className="rise">
            <span style={{ '--d': '180ms' } as React.CSSProperties}>I build software,</span>
          </span>
          <span className="rise display__dim">
            <span style={{ '--d': '280ms' } as React.CSSProperties}>then measure it.</span>
          </span>
        </h1>

        <div className="hero__sub intro" style={{ '--d': '520ms' } as React.CSSProperties}>
          <p className="hero__lede">{profile.blurb}</p>
          <div className="hero__actions">
            <a className="pill" href="#work">
              View work <Icon name="arrowDown" size={15} />
            </a>
            <a
              className="pill pill--ghost"
              href={resumeHref}
              target="_blank"
              rel="noreferrer"
              onClick={openResume}
            >
              Résumé <Icon name="arrowUpRight" size={15} />
            </a>
          </div>
        </div>
      </div>

      <dl className="wrap stats intro" ref={ref} style={{ '--d': '700ms' } as React.CSSProperties}>
        {stats.map((s, i) => (
          <Stat key={s.label} s={s} start={inView} i={i} />
        ))}
      </dl>
    </section>
  );
}
