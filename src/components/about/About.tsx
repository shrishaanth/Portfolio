import { aboutProse, focusAreas, statement } from '../../data/profile';
import type { IconName } from '../ui/Icon';
import Reveal from '../ui/Reveal';
import SectionHead from '../ui/SectionHead';
import FocusCard from './FocusCard';
import PortraitCard from './PortraitCard';
import ScrollText from './ScrollText';
import Stats from './Stats';
import StatusTerminal from './StatusTerminal';

const FOCUS_ICONS: IconName[] = ['layers', 'graph', 'pulse'];

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="wrap">
        <SectionHead
          index="01"
          label="About"
          title={
            <>
              Builds things end to end, <em>then tries to break them.</em>
            </>
          }
        />

        <div className="about__grid">
          <PortraitCard />
          <div className="about__copy">
            <Reveal as="p" className="about__lead">
              {aboutProse[0]}
            </Reveal>
            <Reveal as="p" className="about__p" delay={80}>
              {aboutProse[2]}
            </Reveal>
            <Reveal delay={160}>
              <StatusTerminal />
            </Reveal>
          </div>
        </div>

        <ScrollText text={statement} />

        <div className="focus">
          {focusAreas.map((f, i) => (
            <FocusCard key={f.k} index={i} icon={FOCUS_ICONS[i]} title={f.k} body={f.v} />
          ))}
        </div>

        <Stats />
      </div>
    </section>
  );
}
