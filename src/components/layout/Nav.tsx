import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useScrollFrame } from '../../hooks/useScrollFrame';
import Icon from '../ui/Icon';

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'resume', label: 'Résumé' },
  { id: 'contact', label: 'Contact' },
] as const;
const IDS = LINKS.map((l) => l.id);

export default function Nav() {
  const { setPaletteOpen } = useApp();
  const active = useActiveSection(IDS);
  const [hovered, setHovered] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const trackRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);

  // hide on the way down, return on the way up
  useScrollFrame(() => {
    const y = window.scrollY;
    setScrolled(y > 24);
    if (Math.abs(y - lastY.current) > 6) {
      setHidden(y > lastY.current && y > 240);
      lastY.current = y;
    }
  });

  // the pill tracks the hovered link, falling back to the active one
  const target = hovered ?? active;
  const placePill = useCallback(() => {
    const pill = pillRef.current;
    const link = target
      ? trackRef.current?.querySelector<HTMLElement>(`[data-id="${target}"]`)
      : null;
    if (!pill) return;
    if (!link) {
      pill.style.opacity = '0';
      return;
    }
    pill.style.opacity = '1';
    pill.style.width = `${link.offsetWidth}px`;
    pill.style.transform = `translateX(${link.offsetLeft}px)`;
  }, [target]);

  useLayoutEffect(() => {
    placePill();
    window.addEventListener('resize', placePill);
    document.fonts?.ready.then(placePill);
    return () => window.removeEventListener('resize', placePill);
  }, [placePill]);

  return (
    <header
      className={['nav', hidden && 'is-hidden', scrolled && 'is-scrolled']
        .filter(Boolean)
        .join(' ')}
    >
      <a className="nav__logo" href="#top" aria-label="Shrishaanth U — back to top">
        <span className="nav__mono">SU</span>
        <span className="nav__dot" />
      </a>

      <nav aria-label="Primary" className="nav__track" ref={trackRef}>
        <span className="nav__pill" ref={pillRef} aria-hidden="true" />
        <ul className="nav__links" onMouseLeave={() => setHovered(null)}>
          {LINKS.map((l, i) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                data-id={l.id}
                className={active === l.id ? 'is-active' : undefined}
                aria-current={active === l.id ? 'location' : undefined}
                onMouseEnter={() => setHovered(l.id)}
                onFocus={() => setHovered(l.id)}
                onBlur={() => setHovered(null)}
              >
                <span className="nav__num">0{i + 1}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="nav__end">
        <button
          type="button"
          className="nav__cmd"
          onClick={() => setPaletteOpen(true)}
          aria-label="Open command menu"
        >
          <Icon name="search" size={14} />
          <kbd>⌘K</kbd>
        </button>
        <a className="nav__cta" href="#contact">
          <span className="nav__status" aria-hidden="true" />
          Let’s talk
        </a>
      </div>
    </header>
  );
}
