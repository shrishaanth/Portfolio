import { profile } from '../../data/profile';
import { useTypeOnName } from '../../hooks/useTypeOnName';
import { useResume } from '../ResumeContext';

const FULL_NAME = 'Shrishaanth U';

export default function Hero() {
  const nameRef = useTypeOnName<HTMLHeadingElement>(FULL_NAME);
  const { href: resumeHref, openResume } = useResume();

  return (
    <div className="hero">
      <div>
        <span className="badge">
          <span className="badge__pulse" />
          {profile.badge}
        </span>
        <h1 className="hero__name" ref={nameRef}>
          {FULL_NAME}
        </h1>
        <div className="rule-glow" />
        <p className="hero__blurb">{profile.blurb}</p>
        <div className="actions">
          <a
            className="btn btn--primary"
            href={resumeHref}
            target="_blank"
            rel="noreferrer"
            onClick={openResume}
          >
            VIEW R&Eacute;SUM&Eacute;
          </a>
          <a className="btn btn--ghost" href="#projects">
            PROJECTS
          </a>
        </div>
      </div>

      <div className="hero__aside">
        <div className="portrait">
          <img src="/portrait.jpg" alt={FULL_NAME} />
        </div>
        <div className="facts">
          <div>
            <span>CGPA</span>
            <span style={{ color: 'var(--accent)' }}>9.18</span>
          </div>
          <div>
            <span>LOC</span>
            <span>COIMBATORE</span>
          </div>
          <a href={profile.socials.github.url} target="_blank" rel="noreferrer">
            <span>GH</span>
            <span>/shrishaanth</span>
          </a>
          <a href={profile.socials.linkedin.url} target="_blank" rel="noreferrer">
            <span>LI</span>
            <span>/dev</span>
          </a>
        </div>
      </div>
    </div>
  );
}
