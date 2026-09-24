import { useEffect, useMemo, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { profile } from '../../data/profile';
import { projects } from '../../data/projects';
import { scrollToId } from '../../lib/scroll';
import Icon, { type IconName } from '../ui/Icon';

interface Command {
  id: string;
  group: 'Navigate' | 'Actions' | 'Elsewhere';
  label: string;
  hint?: string;
  icon: IconName;
  run: () => void;
}

const open = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

export default function CommandPalette() {
  const { paletteOpen, setPaletteOpen, openResume, copyEmail } = useApp();
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const commands = useMemo<Command[]>(
    () => [
      { id: 'top', group: 'Navigate', label: 'Home', icon: 'hash', run: () => scrollToId('top') },
      {
        id: 'about',
        group: 'Navigate',
        label: 'About',
        icon: 'hash',
        run: () => scrollToId('about'),
      },
      {
        id: 'work',
        group: 'Navigate',
        label: 'Selected work',
        icon: 'hash',
        run: () => scrollToId('work'),
      },
      {
        id: 'resume',
        group: 'Navigate',
        label: 'Résumé & stack',
        icon: 'hash',
        run: () => scrollToId('resume'),
      },
      {
        id: 'contact',
        group: 'Navigate',
        label: 'Contact',
        icon: 'hash',
        run: () => scrollToId('contact'),
      },
      {
        id: 'copy',
        group: 'Actions',
        label: 'Copy email address',
        hint: profile.email,
        icon: 'copy',
        run: copyEmail,
      },
      {
        id: 'cv',
        group: 'Actions',
        label: 'Open résumé',
        hint: 'PDF',
        icon: 'file',
        run: () => openResume(),
      },
      {
        id: 'mail',
        group: 'Actions',
        label: 'Write an email',
        icon: 'mail',
        run: () => (window.location.href = `mailto:${profile.email}`),
      },
      {
        id: 'gh',
        group: 'Elsewhere',
        label: 'GitHub',
        hint: profile.socials.github.handle,
        icon: 'github',
        run: () => open(profile.socials.github.url),
      },
      {
        id: 'li',
        group: 'Elsewhere',
        label: 'LinkedIn',
        hint: profile.socials.linkedin.handle,
        icon: 'linkedin',
        run: () => open(profile.socials.linkedin.url),
      },
      ...projects.map<Command>((p) => ({
        id: `src-${p.id}`,
        group: 'Elsewhere',
        label: `${p.name} — source`,
        hint: p.indexCategory.toLowerCase(),
        icon: 'arrowUpRight',
        run: () => open(p.source),
      })),
    ],
    [copyEmail, openResume],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.label} ${c.hint ?? ''} ${c.group}`.toLowerCase().includes(q),
    );
  }, [commands, query]);

  // global shortcut: ⌘K / Ctrl+K, or "/" when not typing
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.closest?.('input, textarea, [contenteditable]');
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setPaletteOpen(!paletteOpen);
      } else if (e.key === '/' && !typing && !paletteOpen) {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [paletteOpen, setPaletteOpen]);

  // open/close housekeeping: focus, scroll lock, reset
  useEffect(() => {
    if (!paletteOpen) return;
    returnFocus.current = document.activeElement as HTMLElement | null;
    setQuery('');
    setCursor(0);
    document.documentElement.classList.add('is-locked');
    requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.documentElement.classList.remove('is-locked');
      returnFocus.current?.focus?.();
    };
  }, [paletteOpen]);

  useEffect(() => setCursor(0), [query]);

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${cursor}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [cursor]);

  if (!paletteOpen) return null;

  const run = (c: Command | undefined) => {
    if (!c) return;
    setPaletteOpen(false);
    // let the dialog unmount (and focus return) before scrolling / opening
    requestAnimationFrame(() => c.run());
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCursor((c) => (results.length ? (c + 1) % results.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCursor((c) => (results.length ? (c - 1 + results.length) % results.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      run(results[cursor]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setPaletteOpen(false);
    } else if (e.key === 'Tab') {
      e.preventDefault(); // keep focus inside the dialog
    }
  };

  let lastGroup = '';

  return (
    <div
      className="palette"
      onMouseDown={(e) => e.target === e.currentTarget && setPaletteOpen(false)}
    >
      <div
        className="palette__box"
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        onKeyDown={onKeyDown}
      >
        <div className="palette__search">
          <Icon name="search" size={17} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to a section, copy email, open a repo…"
            aria-label="Search commands"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[cursor] ? `cmd-${results[cursor].id}` : undefined}
          />
          <kbd>esc</kbd>
        </div>

        <ul className="palette__list" id="palette-list" role="listbox" ref={listRef}>
          {results.length === 0 && <li className="palette__empty">Nothing matches “{query}”.</li>}
          {results.map((c, i) => {
            const header = c.group !== lastGroup ? c.group : null;
            lastGroup = c.group;
            return (
              <li key={c.id} role="presentation">
                {header && <div className="palette__group">{header}</div>}
                <div
                  id={`cmd-${c.id}`}
                  role="option"
                  aria-selected={i === cursor}
                  data-index={i}
                  className={i === cursor ? 'palette__item is-active' : 'palette__item'}
                  onMouseMove={() => setCursor(i)}
                  onClick={() => run(c)}
                >
                  <span className="palette__icon">
                    <Icon name={c.icon} size={16} />
                  </span>
                  <span className="palette__label">{c.label}</span>
                  {c.hint && <span className="palette__hint">{c.hint}</span>}
                  <Icon name="arrowRight" size={14} className="palette__go" />
                </div>
              </li>
            );
          })}
        </ul>

        <div className="palette__foot">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> move
          </span>
          <span>
            <kbd>↵</kbd> run
          </span>
          <span className="palette__foot-end">
            <kbd>/</kbd> or <kbd>⌘K</kbd> anywhere
          </span>
        </div>
      </div>
    </div>
  );
}
