import { useApp } from '../../context/AppContext';
import { profile } from '../../data/profile';
import { useLocalTime } from '../../hooks/useLocalTime';
import Backdrop from '../ui/Backdrop';
import Icon, { type IconName } from '../ui/Icon';
import Reveal from '../ui/Reveal';
import ResumeViewer from '../layout/ResumeViewer';

const CHANNELS: { icon: IconName; k: string; v: string; href?: string; external?: boolean }[] = [
  {
    icon: 'github',
    k: 'GitHub',
    v: profile.socials.github.handle,
    href: profile.socials.github.url,
    external: true,
  },
  {
    icon: 'linkedin',
    k: 'LinkedIn',
    v: profile.socials.linkedin.handle,
    href: profile.socials.linkedin.url,
    external: true,
  },
  { icon: 'phone', k: 'Phone', v: profile.phone.display, href: profile.phone.href },
  { icon: 'pin', k: 'Based in', v: profile.location },
];

export default function Contact() {
  const { copyEmail, resumeHref, openResume } = useApp();
  const time = useLocalTime();

  return (
    <section id="contact" className="section contact dots">
      <Backdrop name="contact" />
      <div className="wrap">
        <Reveal className="contact__status" variant="fade">
          <span className="live">
            <span className="live__dot" aria-hidden="true" />
            {profile.availability}
          </span>
          <span className="mono">{time} IST</span>
        </Reveal>

        <Reveal as="h2" className="display display--hero" variant="clip" delay={60}>
          Got a hard problem? <span className="display__dim">Let’s talk.</span>
        </Reveal>

        <div className="contact__grid">
          <Reveal className="contact__main" delay={120}>
            <button type="button" className="mail" onClick={copyEmail}>
              <span className="mail__addr">{profile.email}</span>
              <span className="mail__hint mono">
                <Icon name="copy" size={14} /> Click to copy
              </span>
            </button>

            <div className="contact__actions">
              <a className="pill" href={`mailto:${profile.email}`}>
                Write an email <Icon name="arrowUpRight" size={15} />
              </a>
              <a
                className="pill pill--ghost"
                href={resumeHref}
                target="_blank"
                rel="noreferrer"
                onClick={openResume}
              >
                Résumé <Icon name="file" size={15} />
              </a>
            </div>
          </Reveal>

          <Reveal as="ul" className="channels" delay={200}>
            {CHANNELS.map((c) => {
              const inner = (
                <>
                  <span className="channel__k mono">{c.k}</span>
                  <span className="channel__v">{c.v}</span>
                  <Icon name={c.href ? 'arrowUpRight' : c.icon} size={15} className="channel__go" />
                </>
              );
              return (
                <li key={c.k}>
                  {c.href ? (
                    <a
                      className="channel"
                      href={c.href}
                      {...(c.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="channel">{inner}</div>
                  )}
                </li>
              );
            })}
          </Reveal>
        </div>

        <ResumeViewer />
      </div>
    </section>
  );
}
