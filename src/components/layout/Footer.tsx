import { profile } from '../../data/profile';
import { useLocalTime } from '../../hooks/useLocalTime';
import { useMagnetic } from '../../hooks/useMagnetic';
import { scrollToId } from '../../lib/scroll';
import Icon from '../ui/Icon';

export default function Footer() {
  const time = useLocalTime();
  const topRef = useMagnetic<HTMLButtonElement>(0.35);

  return (
    <footer className="foot">
      <div className="wrap">
        <a className="foot__word" href="#top" aria-label="Back to top">
          <span data-text="Shrishaanth">Shrishaanth</span>
        </a>

        <div className="foot__row">
          <span>© 2026 {profile.name}</span>
          <span className="foot__mid">
            Designed &amp; built in Coimbatore · <span className="foot__time">{time} IST</span>
          </span>
          <div className="foot__links">
            <a href={profile.socials.github.url} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={profile.socials.linkedin.url} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <button
              ref={topRef}
              type="button"
              className="foot__top"
              onClick={() => scrollToId('top')}
              aria-label="Back to top"
            >
              <Icon name="arrowUp" size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
