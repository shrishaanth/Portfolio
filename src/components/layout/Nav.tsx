import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { sections } from '../../data/nav';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useScrollFrame } from '../../hooks/useScrollFrame';
import Logo from '../ui/Logo';

const IDS = sections.map((s) => s.id);

/** Full-width bar at the top of the page that tightens into a bordered, floating bar on scroll. */
export default function Nav() {
  const { resumeHref, openResume, setPaletteOpen } = useApp();
  const active = useActiveSection(IDS);
  const [scrolled, setScrolled] = useState(false);

  useScrollFrame(() => setScrolled(window.scrollY > 40));

  return (
    <header className={scrolled ? 'nav is-scrolled' : 'nav'}>
      <div className="nav__bar">
        <a className="nav__brand" href="#top" aria-label="Shrishaanth U — back to top">
          <Logo height={26} />
          <span className="nav__word">
            SHRISHAANTH <span>U</span>
          </span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          <ul>
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={active === s.id ? 'is-active' : undefined}
                  aria-current={active === s.id ? 'location' : undefined}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__end">
          <a
            className="nav__text"
            href={resumeHref}
            target="_blank"
            rel="noreferrer"
            onClick={openResume}
          >
            Résumé
          </a>
          {/* on small screens the section links collapse into the command menu */}
          <button type="button" className="nav__menu" onClick={() => setPaletteOpen(true)}>
            Menu
          </button>
          <a className="pill pill--sm" href="#contact">
            Get in touch
          </a>
        </div>
      </div>
    </header>
  );
}
