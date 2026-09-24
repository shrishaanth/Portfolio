import { useApp } from '../../context/AppContext';
import { profile } from '../../data/profile';
import Icon, { type IconName } from '../ui/Icon';
import Reveal from '../ui/Reveal';
import SectionHead from '../ui/SectionHead';
import ContactForm from './ContactForm';
import Latency from './Latency';

const CHANNELS: { icon: IconName; k: string; v: string; href?: string; external?: boolean }[] = [
  { icon: 'phone', k: 'Phone', v: profile.phone.display, href: profile.phone.href },
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
  { icon: 'pin', k: 'Based in', v: profile.location },
];

export default function Contact() {
  const { copyEmail } = useApp();

  return (
    <section id="contact" className="section contact">
      <div className="contact__halo" aria-hidden="true" />
      <div className="wrap">
        <SectionHead
          index="04"
          label="Contact"
          aside="Email is fastest"
          title={
            <>
              Got a problem that’s harder than it looks? <em>Let’s talk.</em>
            </>
          }
        />

        <Reveal className="mailbig">
          <button type="button" className="mailbig__btn" onClick={copyEmail} data-cursor="Copy">
            <span className="mailbig__addr">{profile.email}</span>
            <span className="mailbig__icon">
              <Icon name="copy" size={22} />
            </span>
          </button>
          <p className="mailbig__hint">
            Click to copy — or{' '}
            <a href={`mailto:${profile.email}`}>
              open in your mail app <Icon name="arrowUpRight" size={13} />
            </a>
          </p>
        </Reveal>

        <div className="contact__grid">
          <div className="contact__side">
            <ul className="channels">
              {CHANNELS.map((c, i) => {
                const inner = (
                  <>
                    <span className="channel__icon">
                      <Icon name={c.icon} size={17} />
                    </span>
                    <span className="channel__k">{c.k}</span>
                    <span className="channel__v">{c.v}</span>
                    {c.href && (
                      <span className="channel__go">
                        <Icon name="arrowUpRight" size={15} />
                      </span>
                    )}
                  </>
                );
                return (
                  <Reveal as="li" key={c.k} delay={i * 70}>
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
                  </Reveal>
                );
              })}
            </ul>

            <Reveal className="avail" delay={200}>
              <div className="avail__head">
                <span className="pulse pulse--mint" aria-hidden="true" /> Available · summer 2026
              </div>
              <p>
                Comfortable owning something from spec to deploy. Writes tests he’d want to inherit.
                Occasionally gets it right on the first try.
              </p>
              <Latency />
            </Reveal>
          </div>

          <Reveal delay={120} variant="scale">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
