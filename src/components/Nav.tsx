import { Link, NavLink } from 'react-router-dom'

const tabs = [
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/resume', label: 'Résumé' },
  { to: '/contact', label: 'Contact' },
]

export default function Nav() {
  return (
    <header className="nav">
      <Link to="/about" className="nav__brand">
        <span className="nav__monogram">SU</span>
        <span className="nav__name">Shrishaanth U</span>
      </Link>

      <nav className="nav__tabs" aria-label="Primary">
        {tabs.map((t) => (
          <NavLink
            key={t.to}
            to={t.to}
            className={({ isActive }) => 'nav__tab' + (isActive ? ' nav__tab--active' : '')}
          >
            {t.label}
          </NavLink>
        ))}
      </nav>

      <Link to="/contact" className="btn btn--ghost nav__cta">
        Let&rsquo;s talk
      </Link>
    </header>
  )
}
