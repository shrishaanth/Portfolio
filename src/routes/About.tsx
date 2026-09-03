import Button from '../components/Button'
import GlassCard from '../components/GlassCard'
import { ArrowUpRight, Download, iconByName } from '../components/icons'
import { focus, profile } from '../data/profile'

export default function About() {
  const { socials } = profile

  return (
    <>
      <section className="hero">
        <div className="hero__main">
          <p className="eyebrow">Portfolio — 2026</p>
          <h1 className="display hero__name">{profile.name}</h1>
          <p className="hero__role">{profile.role}</p>
          <p className="lead hero__summary">{profile.summary}</p>

          <div className="hero__actions">
            <Button href={profile.resumeUrl} download="Shrishaanth-U-Resume.pdf">
              <Download /> Download résumé
            </Button>
            <Button variant="ghost" to="/projects">
              See projects
            </Button>
          </div>

          <div className="hero__socials">
            <a className="pill" href={socials.github} target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight size={13} />
            </a>
            <a className="pill" href={socials.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <ArrowUpRight size={13} />
            </a>
            <a className="pill" href={`mailto:${profile.email}`}>
              Email <ArrowUpRight size={13} />
            </a>
          </div>
        </div>

        <div className="hero__aside">
          <div className="portrait">
            <div className="portrait__mono">SU</div>
            <div className="portrait__caption">[ your portrait ]</div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="eyebrow">What I focus on</h2>
        <div className="grid-3" style={{ marginTop: 'var(--s-4)' }}>
          {focus.map((f) => {
            const Icon = iconByName[f.icon]
            return (
              <GlassCard key={f.title} pad>
                <span className="icon-badge">
                  <Icon size={18} />
                </span>
                <h3 className="card__icon-title">{f.title}</h3>
                <p className="card__body">{f.body}</p>
              </GlassCard>
            )
          })}
        </div>
      </section>

      <section className="section">
        <GlassCard className="strip">
          <span className="strip__status">
            <span className="dot" />
            {profile.availability}
          </span>
          <span className="muted" style={{ fontSize: 14 }}>
            Based in {profile.location}
          </span>
        </GlassCard>
      </section>
    </>
  )
}
