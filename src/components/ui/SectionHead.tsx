import type { ReactNode } from 'react';
import Reveal from './Reveal';

/** Numbered section header: "01 ——— ABOUT" over a large display title. */
export default function SectionHead({
  index,
  label,
  title,
  aside,
}: {
  index: string;
  label: string;
  title: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <header className="shead">
      <Reveal className="shead__meta" variant="fade">
        <span className="shead__idx">{index}</span>
        <span className="shead__rule" />
        <span className="shead__label">{label}</span>
        {aside && <span className="shead__aside">{aside}</span>}
      </Reveal>
      <Reveal as="h2" className="shead__title" delay={90} variant="clip">
        {title}
      </Reveal>
    </header>
  );
}
