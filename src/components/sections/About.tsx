import { aboutProse, education } from '../../data/profile';
import Backdrop from '../ui/Backdrop';
import Reveal from '../ui/Reveal';
import SectionHead from '../ui/SectionHead';

export default function About() {
  return (
    <section id="about" className="section">
      <Backdrop name="about" />
      <div className="wrap">
        <SectionHead label="About" lead="Third-year student," tail="Software Systems." />

        <div className="about">
          <div className="about__prose">
            <Reveal as="p" className="about__lead">
              {aboutProse[0]}
            </Reveal>
            {aboutProse.slice(1).map((p, i) => (
              <Reveal as="p" key={i} delay={80 + i * 80}>
                {p}
              </Reveal>
            ))}
          </div>

          <Reveal className="about__edu" delay={120}>
            <h3 className="mono">Education</h3>
            <ol className="rows">
              {education.map((e) => (
                <li key={e.org + e.when}>
                  <span className="rows__when mono">{e.when}</span>
                  <span className="rows__main">
                    <span className="rows__org">{e.org}</span>
                    <span className="rows__detail">{e.detail}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
