import { useEffect, useState } from 'react';

/**
 * Tracks which project section is currently "being read" — drives both the
 * sticky project index highlight and each card's own active border. Queries
 * the DOM by id after mount rather than threading refs through the tree,
 * mirroring the original vanilla-JS scrollspy.
 */
export function useActiveProject(ids: string[]): string {
  const [activeId, setActiveId] = useState(ids[0] ?? '');

  useEffect(() => {
    if (!('IntersectionObserver' in window) || ids.length === 0) return;

    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
