import { profile } from '../../data/profile';
import { useReveal } from '../../hooks/useReveal';

export default function ContactForm() {
  const { ref, className } = useReveal<HTMLFormElement>();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = (data.get('name') || '').toString().trim();
    const from = (data.get('email') || '').toString().trim();
    const msg = (data.get('message') || '').toString().trim();
    const subject = encodeURIComponent('Portfolio enquiry' + (name ? ' — ' + name : ''));
    const body = encodeURIComponent(msg + '\n\n— ' + name + (from ? ' (' + from + ')' : ''));
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  return (
    <form ref={ref} className={`${className} contact__form`} onSubmit={handleSubmit}>
      <label className="contact__field">
        <span>YOUR NAME</span>
        <input type="text" name="name" autoComplete="name" placeholder="Ada Lovelace" />
      </label>
      <label className="contact__field">
        <span>EMAIL ADDRESS</span>
        <input type="email" name="email" autoComplete="email" placeholder="you@example.com" />
      </label>
      <label className="contact__field">
        <span>MESSAGE</span>
        <textarea name="message" placeholder="The role or project, and what makes it hard…" />
      </label>
      <button type="submit" className="contact__send">
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m22 2-7 20-4-9-9-4Z" />
          <path d="M22 2 11 13" />
        </svg>
        SEND MESSAGE
      </button>
      <p className="contact__form-note">Opens your email client with the message pre-filled.</p>
    </form>
  );
}
