import { useState, type FormEvent } from 'react'
import GlassCard from '../components/GlassCard'
import { ArrowUpRight } from '../components/icons'
import { profile } from '../data/profile'

const links = [
  { label: 'GitHub', value: 'github.com/shrishaanth', href: profile.socials.github },
  { label: 'LinkedIn', value: 'in/shrishaanth-dev', href: profile.socials.linkedin },
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
]

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio enquiry from ${name || 'someone'}`)
    const body = encodeURIComponent(`${message}\n\n— ${name}${email ? ` (${email})` : ''}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return (
    <>
      <header className="page-head">
        <p className="eyebrow">Contact</p>
        <h1 className="display page-head__title" style={{ marginTop: 'var(--s-3)', maxWidth: 720 }}>
          Let&rsquo;s build something good together
        </h1>
        <p className="lead" style={{ maxWidth: 520, marginTop: 'var(--s-3)' }}>
          Have a project in mind, an internship, or just want to say hi? Send a note and I&rsquo;ll
          reply within a day or two.
        </p>
      </header>

      <div className="contact-grid">
        <div>
          <a className="contact-email" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>

          <div className="contact-links">
            {links.map((l) => {
              const external = l.href.startsWith('http')
              return (
                <a
                  key={l.label}
                  href={l.href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                >
                  <span>{l.label}</span>
                  <span>
                    {l.value} <ArrowUpRight size={13} />
                  </span>
                </a>
              )
            })}
          </div>

          <div className="contact-avail">
            <span className="dot" />
            {profile.availability} · {profile.location}
          </div>
        </div>

        <GlassCard className="form">
          <form onSubmit={onSubmit}>
            <div className="field">
              <label htmlFor="c-name">Name</label>
              <input
                id="c-name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="c-email">Email</label>
              <input
                id="c-email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="c-message">Message</label>
              <textarea
                id="c-message"
                placeholder="Tell me a little about the project…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn--primary form__submit">
              Send message
            </button>
          </form>
        </GlassCard>
      </div>

      <footer className="footer">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>Built with React, TypeScript &amp; Vite</span>
      </footer>
    </>
  )
}
