import { profile } from '../../data/profile';
import Reveal from '../Reveal';
import LatencyChart from '../contact/LatencyChart';
import ContactForm from '../contact/ContactForm';

export default function Contact() {
  return (
    <section id="contact" className="pane">
      <Reveal small className="sec-head">
        <span className="sec-head__label">CONTACT</span>
        <span className="sec-head__count">EMAIL IS FASTEST</span>
      </Reveal>

      <Reveal as="p" className="contact__intro">
        Open to SDE, backend-systems and applied-ML internships for summer 2026. If you&rsquo;ve got
        a problem that&rsquo;s harder than it looks &mdash; real-time, forecasting, anything with a
        strict correctness bar &mdash; I&rsquo;d like to hear about it.
      </Reveal>

      <div className="contact__grid">
        <Reveal className="contact__col">
          <p className="contact__label">DIRECT</p>

          <a className="contact__card" data-cat="db" href={`mailto:${profile.email}`}>
            <span className="contact__icon">
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="5" width="18" height="14" rx="1" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </span>
            <span>
              <span className="contact__k">EMAIL</span>
              <span className="contact__v">{profile.email}</span>
            </span>
          </a>

          <a className="contact__card" data-cat="fw" href={profile.phone.href}>
            <span className="contact__icon">
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .6 3.6 1 1 0 0 1-.25 1z" />
              </svg>
            </span>
            <span>
              <span className="contact__k">PHONE</span>
              <span className="contact__v">{profile.phone.display}</span>
            </span>
          </a>

          <div className="contact__card" data-cat="lang">
            <span className="contact__icon">
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 21s-7-6.3-7-11a7 7 0 1 1 14 0c0 4.7-7 11-7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
            </span>
            <span>
              <span className="contact__k">LOCATION</span>
              <span className="contact__v">{profile.location}</span>
            </span>
          </div>

          <p className="contact__label">SOCIAL</p>
          <div className="contact__socials">
            <a
              className="contact__card"
              data-cat="tools"
              href={profile.socials.github.url}
              target="_blank"
              rel="noreferrer"
            >
              <span className="contact__icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-4 1.4-4-2.2-6-2.6m12 5v-3.4a3 3 0 0 0-.8-2.3c2.7-.3 5.5-1.3 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.5 2.6 5.5 2.9 5.5 2.9a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.3c0 4.6 2.8 5.7 5.5 6a3 3 0 0 0-.8 2.3V21" />
                </svg>
              </span>
              <span>
                <span className="contact__k">GITHUB</span>
                <span className="contact__v">{profile.socials.github.handle}</span>
              </span>
            </a>
            <a
              className="contact__card"
              data-cat="ml"
              href={profile.socials.linkedin.url}
              target="_blank"
              rel="noreferrer"
            >
              <span className="contact__icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="1" />
                  <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 10v7" />
                </svg>
              </span>
              <span>
                <span className="contact__k">LINKEDIN</span>
                <span className="contact__v">{profile.socials.linkedin.handle}</span>
              </span>
            </a>
          </div>

          <div className="contact__status">
            <div className="contact__status-head">
              <span className="dot" /> AVAILABLE
            </div>
            <p>
              Comfortable owning something from spec to deploy. Writes tests he&rsquo;d want to
              inherit. Occasionally gets it right on the first try.
            </p>
            <div className="contact__ping">$ ping shrishaanth &#183; 200 OK</div>
            <LatencyChart />
          </div>
        </Reveal>

        <ContactForm />
      </div>
    </section>
  );
}
