import { useApp } from '../../context/AppContext';
import { interests, profile } from '../../data/profile';
import { useLocalTime } from '../../hooks/useLocalTime';
import Icon from '../ui/Icon';
import MagneticLink from '../ui/MagneticLink';
import SplitText from '../ui/SplitText';
import NetworkCanvas from './NetworkCanvas';
import Rotator from './Rotator';

export default function Hero() {
  const { resumeHref, openResume } = useApp();
  const time = useLocalTime();

  return (
    <section id="top" className="hero">
      <NetworkCanvas />
      <div className="hero__glow" aria-hidden="true" />

      <div className="wrap hero__inner">
        <div className="hero__meta intro" style={{ '--d': '0ms' } as React.CSSProperties}>
          <span className="chip chip--live">
            <span className="pulse" aria-hidden="true" />
            Open to internships · Summer 2026
          </span>
          <span className="hero__meta-r">
            Coimbatore, IN <span className="hero__sep">/</span> {time} IST
          </span>
        </div>

        <h1 className="hero__title">
          <span className="hero__line">
            <SplitText text="Shrishaanth" baseDelay={120} />
          </span>
          <span className="hero__line hero__line--2">
            <SplitText text="U." className="hero__u" baseDelay={560} />
            <span className="hero__role intro" style={{ '--d': '820ms' } as React.CSSProperties}>
              CS student building <br />
              <Rotator words={interests} />
            </span>
          </span>
        </h1>

        <div className="hero__foot">
          <p className="hero__lede intro" style={{ '--d': '900ms' } as React.CSSProperties}>
            {profile.blurb}
          </p>

          <div className="hero__actions intro" style={{ '--d': '1000ms' } as React.CSSProperties}>
            <MagneticLink href="#work" variant="primary">
              See selected work
              <Icon name="arrowDown" size={16} />
            </MagneticLink>
            <MagneticLink
              href={resumeHref}
              target="_blank"
              rel="noreferrer"
              onClick={openResume}
              variant="ghost"
            >
              Résumé
              <Icon name="arrowUpRight" size={16} />
            </MagneticLink>
          </div>
        </div>
      </div>

      <a className="hero__scroll" href="#about" aria-label="Scroll to about">
        <span className="hero__scroll-track">
          <span className="hero__scroll-thumb" />
        </span>
        Scroll
      </a>
    </section>
  );
}
