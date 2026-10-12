import { useApp } from '../../context/AppContext';
import { sections } from '../../data/nav';
import { profile } from '../../data/profile';
import { scrollToId } from '../../lib/scroll';
import Icon from '../ui/Icon';
import Logo from '../ui/Logo';

export default function Footer() {
  const { setPaletteOpen } = useApp();

  return (
    <footer className="foot">
      <div className="wrap foot__grid">
        <div>
          <a className="nav__brand" href="#top">
            <Logo height={26} />
            <span className="nav__word">
              SHRISHAANTH <span>U</span>
            </span>
          </a>
          <p className="foot__note">{profile.role}. Based in Coimbatore, India.</p>
        </div>

        <ul className="foot__col" aria-label="Sections">
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`}>{s.label}</a>
            </li>
          ))}
        </ul>

        <ul className="foot__col" aria-label="Elsewhere">
          <li>
            <a href={profile.socials.github.url} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href={profile.socials.linkedin.url} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={`mailto:${profile.email}`}>Email</a>
          </li>
        </ul>
      </div>

      <div className="wrap foot__base">
        <span>© 2026 {profile.name}</span>
        <button type="button" className="foot__kbd" onClick={() => setPaletteOpen(true)}>
          <kbd>⌘K</kbd> command menu
        </button>
        <button type="button" className="foot__top" onClick={() => scrollToId('top')}>
          Back to top <Icon name="arrowUp" size={14} />
        </button>
      </div>
    </footer>
  );
}
