import { Arrow } from './shared';
import { at } from './stagger';

export default function TaskifyDiagram() {
  const ah = 'url(#t-ah)';
  return (
    <svg
      className="diagram"
      viewBox="0 0 660 262"
      role="img"
      aria-label="Clients sync through a tenant-scoped Socket.IO room to the API, which reaches the database only past a per-request isolation check. Access tokens are short-lived; refresh tokens rotate and can be revoked."
    >
      <defs>
        <Arrow id="t-ah" />
      </defs>

      <g className="d-g" style={at(0)}>
        <rect className="d-box" x="16" y="46" width="94" height="32" />
        <text className="d-text" x="63" y="66" textAnchor="middle">
          CLIENT A
        </text>
        <rect className="d-box" x="16" y="98" width="94" height="32" />
        <text className="d-text" x="63" y="118" textAnchor="middle">
          CLIENT B
        </text>
      </g>

      <g className="d-g" style={at(1)}>
        <path className="d-edge d-edge--flow" d="M114 62 L166 80" markerEnd={ah} markerStart={ah} />
        <path
          className="d-edge d-edge--flow"
          d="M114 114 L166 100"
          markerEnd={ah}
          markerStart={ah}
        />
        <text className="d-text d-text--dim" x="140" y="38" textAnchor="middle">
          optimistic move · server reconcile
        </text>
      </g>

      <g className="d-g" style={at(2)}>
        <rect className="d-box d-box--hot" x="170" y="54" width="150" height="64" />
        <text className="d-text d-text--hot" x="245" y="82" textAnchor="middle">
          SOCKET.IO ROOM
        </text>
        <text className="d-text d-text--dim" x="245" y="99" textAnchor="middle">
          one per tenant
        </text>
      </g>

      <g className="d-g" style={at(3)}>
        <path className="d-edge d-edge--flow" d="M322 86 L374 86" markerEnd={ah} />
        <rect className="d-box" x="378" y="60" width="86" height="52" />
        <text className="d-text" x="421" y="90" textAnchor="middle">
          API
        </text>
        <path className="d-edge d-edge--flow" d="M466 86 L502 86" markerEnd={ah} />
      </g>

      <g className="d-g" style={at(4)}>
        <line className="d-gate" x1="500" y1="42" x2="500" y2="132" />
        <text className="d-text d-text--hot" x="500" y="150" textAnchor="middle">
          isolation check · every request
        </text>
      </g>

      <g className="d-g" style={at(5)}>
        <rect className="d-box" x="512" y="54" width="140" height="64" />
        <text className="d-text" x="582" y="82" textAnchor="middle">
          DATABASE
        </text>
        <text className="d-text d-text--dim" x="582" y="99" textAnchor="middle">
          tenant id on every row
        </text>
      </g>

      <g className="d-g" style={at(6)}>
        <line className="d-rule" x1="16" y1="192" x2="644" y2="192" />
        <text className="d-text d-text--hot" x="16" y="212">
          AUTH
        </text>
        <rect className="d-box" x="66" y="198" width="158" height="30" />
        <text className="d-text" x="145" y="217" textAnchor="middle">
          access · short-lived
        </text>
        <path className="d-edge" d="M226 213 L268 213" markerEnd={ah} />
        <rect className="d-box d-box--hot" x="270" y="198" width="204" height="30" />
        <text className="d-text d-text--hot" x="372" y="217" textAnchor="middle">
          refresh · rotates, revocable
        </text>
        <path
          className="d-edge d-edge--flow"
          d="M474 222 C 520 244, 230 244, 146 230"
          markerEnd={ah}
        />
        <text className="d-text d-text--dim" x="310" y="254" textAnchor="middle">
          new pair on every use
        </text>
      </g>
    </svg>
  );
}
