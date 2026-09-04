import { sysRows } from '../../data/profile';
import { useTerminalStatus } from '../../hooks/useTerminalStatus';

export default function SystemsPanel() {
  const { cmdRef, sysRef } = useTerminalStatus();

  return (
    <div className="term">
      <div className="term__cmd" ref={cmdRef}>
        $ shrishaanth --status
        <span className="term__caret" aria-hidden="true" />
      </div>
      <div className="sys" ref={sysRef}>
        {sysRows.map((row) => (
          <div className="sys__row" key={row.k}>
            <span>{row.k}</span>
            <span className={row.ok ? 'ok' : undefined}>
              {row.v}
              {row.bold && <b>{row.bold}</b>}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
