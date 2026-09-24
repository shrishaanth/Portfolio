import { profile } from '../../data/profile';
import { usePointerVars } from '../../hooks/usePointerVars';
import Reveal from '../ui/Reveal';

/** Duotone portrait that tilts toward the pointer and blooms into colour on hover. */
export default function PortraitCard() {
  const ref = usePointerVars<HTMLDivElement>();
  return (
    <Reveal className="portrait-wrap" variant="scale">
      <div className="portrait" ref={ref} data-cursor="Hi!">
        <img src="/portrait.jpg" alt={`Portrait of ${profile.name}`} loading="lazy" />
        <span className="portrait__glare" aria-hidden="true" />
        <div className="portrait__tag">
          <span>{profile.name}</span>
          <span>PSG Tech · M.Sc. Software Systems</span>
        </div>
      </div>
      <div className="portrait__badges" aria-hidden="true">
        <span className="float-chip float-chip--a">CGPA 9.18</span>
        <span className="float-chip float-chip--b">yr 3 / 5</span>
      </div>
    </Reveal>
  );
}
