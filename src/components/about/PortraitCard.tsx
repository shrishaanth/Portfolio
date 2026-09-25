import { profile } from '../../data/profile';
import { usePointerVars } from '../../hooks/usePointerVars';
import Reveal from '../ui/Reveal';

/** Greyscale portrait that tilts toward the pointer and turns to colour on hover. */
export default function PortraitCard() {
  const ref = usePointerVars<HTMLDivElement>();
  return (
    <Reveal className="portrait-wrap" variant="scale">
      <div className="portrait" ref={ref}>
        <img src="/portrait.jpg" alt={`Portrait of ${profile.name}`} loading="lazy" />
        <span className="portrait__glare" aria-hidden="true" />
        <div className="portrait__tag">
          <span>{profile.name}</span>
          <span>PSG Tech · M.Sc. Software Systems</span>
        </div>
      </div>
    </Reveal>
  );
}
