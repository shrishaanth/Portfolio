import Button from '../components/Button'
import GlassCard from '../components/GlassCard'
import { ArrowUpRight, Download } from '../components/icons'
import { education, interests, profile, skills } from '../data/profile'
import { projects } from '../data/projects'

export default function Resume() {
  return (
    <>
      <header className="page-head page-head__row" style={{ marginTop: 'var(--s-5)' }}>
        <div>
          <p className="eyebrow">Curriculum vitae</p>
          <h1 className="display page-head__title" style={{ marginTop: 'var(--s-2)' }}>
            Résumé
          </h1>
        </div>
        <Button href={profile.resumeUrl} download="Shrishaanth-U-Resume.pdf">
          <Download /> Download PDF
        </Button>
      </header>

      <div className="resume-grid">
        <div>
          <h2 className="eyebrow">Education</h2>
          <div className="timeline">
            {education.map((e, i) => (
              <div key={i} className="timeline__item">
                <div className="timeline__head">
                  <span className="timeline__title">{e.school}</span>
                  <span className="timeline__when">{e.when}</span>
                </div>
                <div className="timeline__detail">{e.detail}</div>
                <div className="timeline__meta">{e.meta}</div>
              </div>
            ))}
          </div>

          <h2 className="eyebrow" style={{ marginTop: 'var(--s-5)' }}>
            Selected projects
          </h2>
          <div className="mini-list">
            {projects.map((p) => (
              <a key={p.name} href={p.repo} target="_blank" rel="noreferrer">
                <span>
                  {p.name} <span className="muted">— {p.category}</span>
                </span>
                <ArrowUpRight size={13} />
              </a>
            ))}
          </div>

          <h2 className="eyebrow" style={{ marginTop: 'var(--s-5)' }}>
            Beyond code
          </h2>
          <div className="timeline">
            {interests.map((it) => (
              <div key={it.title} className="timeline__item">
                <div className="timeline__title">{it.title}</div>
                <div className="timeline__meta">{it.body}</div>
              </div>
            ))}
          </div>
        </div>

        <GlassCard pad as="aside">
          {skills.map((s) => (
            <div key={s.group} className="side-block">
              <div className="side-block__label">{s.group}</div>
              <div className="side-block__tags">
                {s.items.map((it) => (
                  <span key={it} className="pill">
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <div className="side-block">
            <div className="side-block__label">Location</div>
            <p className="side-block__text">{profile.location} · Open to remote</p>
          </div>

          <div className="side-block">
            <div className="side-block__label">Links</div>
            <p className="side-block__text">
              <a href={profile.socials.github} target="_blank" rel="noreferrer">
                github.com/shrishaanth
              </a>
              <br />
              <a href={profile.socials.linkedin} target="_blank" rel="noreferrer">
                linkedin.com/in/shrishaanth-dev
              </a>
            </p>
          </div>
        </GlassCard>
      </div>
    </>
  )
}
