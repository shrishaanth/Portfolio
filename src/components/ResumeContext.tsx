import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { RESUME_HREF } from '../data/profile';

interface ResumeContextValue {
  href: string;
  viewerOpen: boolean;
  closeViewer: () => void;
  /** Opens the résumé in a new tab; falls back to the inline viewer if the popup is blocked. */
  openResume: (e: React.MouseEvent) => void;
}

const ResumeContext = createContext<ResumeContextValue | null>(null);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [viewerOpen, setViewerOpen] = useState(false);

  const value = useMemo<ResumeContextValue>(
    () => ({
      href: RESUME_HREF,
      viewerOpen,
      closeViewer: () => setViewerOpen(false),
      openResume: (e: React.MouseEvent) => {
        e.preventDefault();
        const win = window.open(RESUME_HREF, '_blank', 'noopener');
        if (!win || win.closed || typeof win.closed === 'undefined') {
          setViewerOpen(true); // popup blocked → render it on the page instead
        }
      },
    }),
    [viewerOpen],
  );

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components -- context + its hook belong together
export function useResume(): ResumeContextValue {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used within a ResumeProvider');
  return ctx;
}
