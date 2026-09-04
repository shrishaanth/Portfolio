import { aboutProse, focusAreas } from '../../data/profile';
import Reveal from '../Reveal';
import Hero from '../about/Hero';
import SystemsPanel from '../about/SystemsPanel';

export default function About() {
  return (
    <section id="about">
      <Hero />

      <Reveal className="about__body">
        <div className="prose">
          <span className="eyebrow">ABOUT</span>
          {aboutProse.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="focus">
          {focusAreas.map((f) => (
            <div className="focus__item" key={f.k}>
              <span className="focus__k">{f.k}</span>
              <span className="focus__v">{f.v}</span>
            </div>
          ))}
        </div>

        <SystemsPanel />
      </Reveal>
    </section>
  );
}
