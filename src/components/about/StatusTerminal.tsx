import { useEffect, useState } from 'react';
import { sysRows } from '../../data/profile';
import { useInView } from '../../hooks/useInView';
import { prefersReducedMotion } from '../../lib/env';

const COMMAND = 'status --verbose';

/** Tiny terminal that types a command, then prints the status rows one by one. */
export default function StatusTerminal() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });
  const [typed, setTyped] = useState(0);
  const [rows, setRows] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion()) {
      setTyped(COMMAND.length);
      setRows(sysRows.length);
      return;
    }
    const timers: number[] = [];
    for (let i = 1; i <= COMMAND.length; i++) {
      timers.push(window.setTimeout(() => setTyped(i), 260 + i * 42));
    }
    const printAt = 260 + COMMAND.length * 42 + 240;
    for (let r = 1; r <= sysRows.length; r++) {
      timers.push(window.setTimeout(() => setRows(r), printAt + r * 130));
    }
    return () => timers.forEach(window.clearTimeout);
  }, [inView]);

  const done = rows === sysRows.length;

  return (
    <div className="term" ref={ref}>
      <div className="term__bar">
        <span className="term__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="term__title">~/shrishaanth — zsh</span>
      </div>
      <div className="term__body" aria-live="off">
        <div className="term__line">
          <span className="term__prompt">➜</span> <span className="term__path">~</span>{' '}
          {COMMAND.slice(0, typed)}
          {!done && <span className="term__caret" />}
        </div>
        {sysRows.slice(0, rows).map((r) => (
          <div className="term__row" key={r.k}>
            <span className="term__k">{r.k}</span>
            <span className={r.ok ? 'term__v is-ok' : 'term__v'}>
              {r.ok && <span className="term__ok">●</span>}
              {r.v}
              {r.bold && <b>{r.bold}</b>}
            </span>
          </div>
        ))}
        {done && (
          <div className="term__line">
            <span className="term__prompt">➜</span> <span className="term__path">~</span>{' '}
            <span className="term__caret" />
          </div>
        )}
      </div>
    </div>
  );
}
