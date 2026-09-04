import { useEffect } from 'react';

/**
 * A couple of easter eggs with no visual footprint of their own:
 * a console message for anyone who opens devtools, and a tab-title change
 * when you wander off to another tab.
 */
export default function GlobalEffects() {
  useEffect(() => {
    try {
      const mono = 'font-family:ui-monospace,Menlo,monospace;font-size:12px;line-height:1.7;';
      console.log('%c$ whoami', mono + 'color:#3D7BFF;font-weight:700');
      console.log(
        '%cshrishaanth — third-year cs student. you opened the console.\n' +
          'that is a very good sign or a very bad meeting.\n\n' +
          'stack:      the one in the resume, minus the ones i only used once\n' +
          'uptime:     since ~2021, minor outages during exams\n' +
          'looking for: a summer 2026 internship where the constraints are the fun part\n' +
          'reach me:   shrishaanth2024@gmail.com',
        mono + 'color:#8FB4FF',
      );
      console.log(
        '%c// no analytics on this page. the only person tracking you is me, right now, in this log.',
        mono + 'color:#4A4A60',
      );
    } catch {
      /* console-less environment, carry on */
    }
  }, []);

  useEffect(() => {
    const realTitle = document.title;
    function onVisibilityChange() {
      document.title = document.hidden ? '[ process suspended ] ' + realTitle : realTitle;
    }
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      document.title = realTitle;
    };
  }, []);

  return null;
}
