import { education } from '../../data/profile';
import { skillGroups } from '../../data/skills';
import Reveal from '../Reveal';
import ResumeViewer from '../ResumeViewer';
import { useResume } from '../ResumeContext';

export default function Resume() {
  const { href: resumeHref, openResume } = useResume();

  return (
    <section id="resume" className="pane">
      <Reveal small className="sec-head">
        <span className="sec-head__label">RESUME</span>
        <a
          className="btn-sm"
          href={resumeHref}
          target="_blank"
          rel="noreferrer"
          onClick={openResume}
        >
          VIEW R&Eacute;SUM&Eacute;
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17 17 7M9 7h8v8" />
          </svg>
        </a>
      </Reveal>

      <ResumeViewer />

      <Reveal>
        <h3 className="pane__h">Education</h3>
        <div className="rows rows--edu">
          {education.map((e) => (
            <div key={e.org + e.when}>
              <span className="rows__k">{e.org}</span>
              <span className="rows__v">{e.detail}</span>
              <span className="rows__t">{e.when}</span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal style={{ marginTop: 'clamp(36px, 5vw, 52px)' }}>
        <h3 className="pane__h">Stack</h3>
        <div className="skills">
          {skillGroups.map((group) => (
            <div className="skills__row" data-cat={group.cat} key={group.cat}>
              <span className="skills__label">{group.label}</span>
              <div className="skills__chips">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
