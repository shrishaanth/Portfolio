import { usePointerVars } from '../../hooks/usePointerVars';
import Icon, { type IconName } from '../ui/Icon';
import Reveal from '../ui/Reveal';

/** Card with a pointer-following spotlight and a glowing edge. */
export default function FocusCard({
  index,
  icon,
  title,
  body,
}: {
  index: number;
  icon: IconName;
  title: string;
  body: string;
}) {
  const ref = usePointerVars<HTMLDivElement>();
  return (
    <Reveal className="focus-card-wrap" delay={index * 110}>
      <div className="focus-card spot" ref={ref}>
        <div className="focus-card__top">
          <span className="focus-card__icon">
            <Icon name={icon} size={20} />
          </span>
          <span className="focus-card__n">0{index + 1}</span>
        </div>
        <h3 className="focus-card__k">{title}</h3>
        <p className="focus-card__v">{body}</p>
      </div>
    </Reveal>
  );
}
