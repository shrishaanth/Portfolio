import { useApp } from '../../context/AppContext';
import { usePointerVars } from '../../hooks/usePointerVars';
import Icon from '../ui/Icon';
import Reveal from '../ui/Reveal';
import SectionHead from '../ui/SectionHead';
import ResumeViewer from './ResumeViewer';
import SkillMatrix from './SkillMatrix';
import Timeline from './Timeline';

export default function Resume() {
  const { resumeHref, openResume } = useApp();
  const cardRef = usePointerVars<HTMLAnchorElement>();

  return (
    <section id="resume" className="section resume">
      <div className="wrap">
        <SectionHead
          index="03"
          label="Résumé"
          title={
            <>
              The short version, <em>on one page.</em>
            </>
          }
        />

        <div className="resume__grid">
          <Reveal variant="scale">
            <a
              ref={cardRef}
              className="cv spot"
              href={resumeHref}
              target="_blank"
              rel="noreferrer"
              onClick={openResume}
            >
              <div className="cv__paper" aria-hidden="true">
                <span className="cv__line cv__line--h" />
                <span className="cv__line" />
                <span className="cv__line cv__line--s" />
                <span className="cv__gap" />
                <span className="cv__line cv__line--h2" />
                <span className="cv__line" />
                <span className="cv__line" />
                <span className="cv__line cv__line--s" />
                <span className="cv__gap" />
                <span className="cv__line cv__line--h2" />
                <span className="cv__line" />
                <span className="cv__line cv__line--m" />
              </div>
              <div className="cv__meta">
                <span className="cv__kicker">
                  <Icon name="file" size={14} /> PDF · Google Drive
                </span>
                <span className="cv__title">Read the résumé</span>
                <span className="cv__go">
                  Open <Icon name="arrowUpRight" size={15} />
                </span>
              </div>
            </a>
          </Reveal>

          <div>
            <Reveal as="h3" className="subhead" variant="fade">
              Education
            </Reveal>
            <Timeline />
          </div>
        </div>

        <ResumeViewer />

        <div className="resume__stack">
          <Reveal as="h3" className="subhead" variant="fade">
            Stack <span>— hover a skill to see where it shipped</span>
          </Reveal>
          <Reveal delay={80}>
            <SkillMatrix />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
