import { useState } from 'react';
import { profile } from '../../data/profile';
import { useMagnetic } from '../../hooks/useMagnetic';
import Icon from '../ui/Icon';

/**
 * No backend: composes a mailto: link from the fields and hands it to the
 * visitor's mail app. The paper plane takes off on send.
 */
export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const btnRef = useMagnetic<HTMLButtonElement>(0.2);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const from = String(data.get('email') ?? '').trim();
    const msg = String(data.get('message') ?? '').trim();
    const subject = encodeURIComponent('Portfolio enquiry' + (name ? ` — ${name}` : ''));
    const body = encodeURIComponent(`${msg}\n\n— ${name}${from ? ` (${from})` : ''}`);
    setSent(true);
    window.setTimeout(() => setSent(false), 1600);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__row">
        <label className="field">
          <input type="text" name="name" autoComplete="name" placeholder=" " required />
          <span>Your name</span>
        </label>
        <label className="field">
          <input type="email" name="email" autoComplete="email" placeholder=" " />
          <span>Email address</span>
        </label>
      </div>
      <label className="field field--area">
        <textarea name="message" rows={5} placeholder=" " required />
        <span>The role or project — and what makes it hard</span>
      </label>
      <div className="form__foot">
        <p className="form__note">Opens your mail app with this pre-filled.</p>
        <button ref={btnRef} type="submit" className={sent ? 'send is-sent' : 'send'}>
          <span className="send__label">{sent ? 'Opening mail…' : 'Send message'}</span>
          <span className="send__plane">
            <Icon name="send" size={16} />
          </span>
        </button>
      </div>
    </form>
  );
}
