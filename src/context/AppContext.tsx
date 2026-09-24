import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { RESUME_HREF, profile } from '../data/profile';
import { copyText } from '../lib/scroll';

interface Toast {
  id: number;
  message: string;
}

interface AppContextValue {
  toast: Toast | null;
  notify: (message: string) => void;

  paletteOpen: boolean;
  setPaletteOpen: (open: boolean) => void;

  resumeHref: string;
  viewerOpen: boolean;
  closeViewer: () => void;
  /** Opens the résumé in a new tab; falls back to the inline viewer if a popup blocker steps in. */
  openResume: (e?: React.MouseEvent) => void;

  copyEmail: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const toastTimer = useRef<number | undefined>(undefined);

  const notify = useCallback((message: string) => {
    setToast({ id: Date.now(), message });
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2400);
  }, []);

  const openResume = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    // no 'noopener' feature string: with it, window.open always returns null
    const win = window.open(RESUME_HREF, '_blank');
    if (win) win.opener = null;
    else setViewerOpen(true);
  }, []);

  const copyEmail = useCallback(() => {
    copyText(profile.email).then((ok) =>
      notify(ok ? 'Email copied to clipboard' : `Couldn’t copy — it’s ${profile.email}`),
    );
  }, [notify]);

  const value = useMemo<AppContextValue>(
    () => ({
      toast,
      notify,
      paletteOpen,
      setPaletteOpen,
      resumeHref: RESUME_HREF,
      viewerOpen,
      closeViewer: () => setViewerOpen(false),
      openResume,
      copyEmail,
    }),
    [toast, notify, paletteOpen, viewerOpen, openResume, copyEmail],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components -- context + its hook belong together
export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within an AppProvider');
  return ctx;
}
