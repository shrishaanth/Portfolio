import { useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RESUME_EMBED } from '../../data/profile';
import { prefersReducedMotion } from '../../lib/env';
import Icon from '../ui/Icon';

/** Inline résumé viewer — shown only when a popup blocker stops the new tab. */
export default function ResumeViewer() {
  const { viewerOpen, closeViewer, resumeHref } = useApp();
  const ref = useRef<HTMLDivElement>(null);
  // once created, the iframe stays mounted (just hidden) so reopening doesn't refetch
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!viewerOpen) return;
    setMounted(true);
    ref.current?.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start',
    });
  }, [viewerOpen]);

  return (
    <div className="viewer" ref={ref} hidden={!viewerOpen}>
      <div className="viewer__bar">
        <span>
          <Icon name="file" size={14} /> shrishaanth-u-resume.pdf
        </span>
        <span className="viewer__actions">
          <a href={resumeHref} target="_blank" rel="noreferrer">
            Open in Drive <Icon name="arrowUpRight" size={13} />
          </a>
          <button type="button" onClick={closeViewer} aria-label="Close résumé">
            <Icon name="close" size={15} />
          </button>
        </span>
      </div>
      {mounted && <iframe title="Résumé — Shrishaanth U" src={RESUME_EMBED} />}
    </div>
  );
}
