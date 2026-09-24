import { useState } from 'react';
import { useScrollFrame } from './useScrollFrame';

/**
 * The last section (in `ids` order) whose top has crossed 40% of the
 * viewport — or null while still above the first one (the hero).
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useScrollFrame(() => {
    const probe = window.innerHeight * 0.4;
    let current: string | null = null;
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= probe) current = id;
    }
    // at the very bottom, the last section wins even if it's short
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      current = ids[ids.length - 1];
    }
    setActive(current);
  });

  return active;
}
