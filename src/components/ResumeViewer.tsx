import { useEffect, useRef, useState } from 'react';
import { RESUME_EMBED } from '../data/profile';
import { useResume } from './ResumeContext';

/** Inline résumé viewer — fallback rendered when a popup blocker stops the new tab. */
export default function ResumeViewer() {
  const { viewerOpen, closeViewer } = useResume();
  const ref = useRef<HTMLDivElement | null>(null);
  // once created, the iframe stays mounted (hidden, not unmounted) so
  // reopening the panel doesn't re-fetch the PDF
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (viewerOpen) {
      setMounted(true);
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      ref.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    }
  }, [viewerOpen]);

  return (
    <div className="resume-viewer" id="resume-viewer" ref={ref} hidden={!viewerOpen}>
      <div className="resume-viewer__bar">
        <span>SHRISHAANTH-U-RESUME.PDF</span>
        <button type="button" className="resume-viewer__close" onClick={closeViewer}>
          CLOSE &times;
        </button>
      </div>
      {mounted && <iframe title="Résumé — Shrishaanth U" src={RESUME_EMBED} />}
    </div>
  );
}
