import { Arrow } from './shared';
import { at } from './stagger';

export default function SyntropyDiagram() {
  const ah = 'url(#y-ah)';
  return (
    <svg
      className="diagram"
      viewBox="0 0 660 256"
      role="img"
      aria-label="A time axis with an as-of marker: only data to its left is used. An EWMA lookback window feeds a Hierarchical Risk Parity allocator, and the whole window walks forward one step at a time, never seeing the future."
    >
      <defs>
        <Arrow id="y-ah" />
        <pattern
          id="y-hatch"
          width="7"
          height="7"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line className="d-hatch" x1="0" y1="0" x2="0" y2="7" />
        </pattern>
      </defs>

      <g className="d-g" style={at(0)}>
        <rect className="d-box" x="118" y="46" width="302" height="26" />
        <rect className="d-future" x="420" y="46" width="222" height="26" fill="url(#y-hatch)" />
        <line className="d-rule" x1="20" y1="72" x2="642" y2="72" />
        <text className="d-text" x="128" y="63">
          used · as-of each timestamp
        </text>
        <text className="d-text d-text--dim d-future-label" x="432" y="63">
          future — masked
        </text>
      </g>

      <g className="d-g" style={at(1)}>
        <line className="d-gate" x1="420" y1="34" x2="420" y2="118" />
        <text className="d-text d-text--hot" x="420" y="28" textAnchor="middle">
          as-of t
        </text>
        <path className="d-edge" d="M118 84 L118 92 L418 92 L418 84" />
        <text className="d-text d-text--dim" x="268" y="107" textAnchor="middle">
          EWMA lookback · backward only
        </text>
      </g>

      <g className="d-g" style={at(2)}>
        <path className="d-edge d-edge--flow" d="M268 112 L268 130" markerEnd={ah} />
        <rect className="d-box d-box--hot" x="150" y="132" width="150" height="30" />
        <text className="d-text d-text--hot" x="225" y="151" textAnchor="middle">
          HRP ALLOCATOR
        </text>
        <path className="d-edge d-edge--flow" d="M300 147 L340 147" markerEnd={ah} />
        <rect className="d-box" x="342" y="132" width="110" height="30" />
        <text className="d-text" x="397" y="151" textAnchor="middle">
          positions
        </text>
      </g>

      <g className="d-g" style={at(3)}>
        <line className="d-rule" x1="20" y1="196" x2="642" y2="196" />
        <text className="d-text d-text--hot" x="20" y="216">
          WALK FORWARD
        </text>
        <g className="d-walk">
          <rect className="d-box" x="150" y="204" width="150" height="14" />
          <rect className="d-box" x="230" y="222" width="150" height="14" />
          <rect className="d-box d-box--hot" x="310" y="240" width="150" height="14" />
        </g>
        <path className="d-edge" d="M304 211 L226 229" markerEnd={ah} />
        <path className="d-edge" d="M384 229 L306 247" markerEnd={ah} />
        <text className="d-text d-text--dim" x="474" y="236">
          one step at a time
        </text>
      </g>
    </svg>
  );
}
