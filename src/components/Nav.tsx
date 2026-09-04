import { useBubbleNav, type NavTab } from '../hooks/useBubbleNav';

const TABS: NavTab[] = [
  { id: 'about', href: '#about', label: 'ABOUT' },
  { id: 'projects', href: '#projects', label: 'PROJECTS' },
  { id: 'resume', href: '#resume', label: 'RESUME' },
  { id: 'contact', href: '#contact', label: 'CONTACT' },
];

export default function Nav() {
  const { activeHref, registerTab, bubbleRef, navRef, handleTabClick } = useBubbleNav(TABS);

  return (
    <header className="nav" ref={navRef as React.Ref<HTMLElement>}>
      <div className="wrap nav__inner">
        <a className="brand" href="#about">
          <span className="brand__dot" />
          SHRISHAANTH_U
        </a>
        <nav className="nav__tabs" aria-label="Primary">
          <span className="nav__bubble is-idle" ref={bubbleRef} aria-hidden="true" />
          {TABS.map((tab) => {
            const isActive = tab.href === activeHref;
            return (
              <a
                key={tab.href}
                href={tab.href}
                ref={registerTab(tab.href)}
                className={isActive ? 'is-active' : undefined}
                aria-current={isActive ? 'page' : undefined}
                onClick={(e) => handleTabClick(e, tab)}
              >
                {tab.label}
              </a>
            );
          })}
        </nav>
        <span className="nav__ver">v2026.1</span>
      </div>
    </header>
  );
}
