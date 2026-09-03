import { useMemo, useState } from 'react'
import GlassCard from '../components/GlassCard'
import { ArrowUpRight, ImageIcon } from '../components/icons'
import { categories, projects } from '../data/projects'

export default function Projects() {
  const [filter, setFilter] = useState<(typeof categories)[number]>('All')

  const shown = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  )

  return (
    <>
      <header className="page-head">
        <p className="eyebrow">Selected work</p>
        <div className="page-head__row">
          <h1 className="display page-head__title">Projects</h1>
          <p className="page-head__note">
            Things I&rsquo;ve built while learning — real-time systems, machine learning and
            quantitative pipelines. Source is on GitHub.
          </p>
        </div>

        <div className="filters">
          {categories.map((c) => (
            <button
              key={c}
              className={'chip' + (filter === c ? ' chip--active' : '')}
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
            >
              {c}
            </button>
          ))}
        </div>
      </header>

      <div className="projects-grid">
        {shown.map((p) => (
          <GlassCard key={p.name} className="project-card">
            <div className="project-card__media">
              <ImageIcon />
              <span>[ project image ]</span>
            </div>
            <div className="project-card__inner">
              <div className="project-card__top">
                <h2 className="project-card__name">{p.name}</h2>
                <span className="project-card__year">{p.year}</span>
              </div>
              <p className="project-card__blurb">{p.blurb}</p>
              <ul className="project-card__highlights">
                {p.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
              <div className="project-card__tags">
                {p.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
              <div className="project-card__links">
                <a
                  className="link-row"
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer"
                >
                  Code <ArrowUpRight size={13} />
                </a>
                {p.live && (
                  <a
                    className="link-row muted"
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live <ArrowUpRight size={13} />
                  </a>
                )}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </>
  )
}
