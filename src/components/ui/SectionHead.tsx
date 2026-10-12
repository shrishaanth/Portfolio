import type { ReactNode } from 'react';
import Reveal from './Reveal';

/**
 * Section header: a mono label with a leading rule, then a two-tone display
 * title (first line in ink, second in grey) and an optional aside paragraph.
 */
export default function SectionHead({
  label,
  lead,
  tail,
  aside,
}: {
  label: ReactNode;
  lead: string;
  tail: string;
  aside?: string;
}) {
  return (
    <header className="shead">
      <Reveal className="label" variant="fade">
        <span className="label__rule" aria-hidden="true" />
        {label}
      </Reveal>
      <div className="shead__row">
        <Reveal as="h2" className="display" variant="clip" delay={60}>
          {lead} <span className="display__dim">{tail}</span>
        </Reveal>
        {aside && (
          <Reveal as="p" className="shead__aside" delay={140}>
            {aside}
          </Reveal>
        )}
      </div>
    </header>
  );
}
