import { Arrow } from './shared';
import { at } from './stagger';

const NODES: [number, number][] = [
  [52, 74],
  [120, 52],
  [176, 92],
  [150, 168],
  [70, 186],
];

export default function SurgeMapDiagram() {
  const ah = 'url(#s-ah)';
  return (
    <svg
      className="diagram"
      viewBox="0 0 660 264"
      role="img"
      aria-label="A directed zone graph feeds a custom graph convolution and a GRU that reads four hours of history, emitting demand forecasts at 5, 15, 30 and 60 minutes. The RMSE gain over ridge regression widens with the horizon."
    >
      <defs>
        <Arrow id="s-ah" />
      </defs>

      <text className="d-text d-text--dim" x="20" y="26">
        253-ZONE TLC DIRECTED GRAPH · abstracted
      </text>

      <g className="d-g" style={at(0)}>
        {[
          'M52 74 L120 52',
          'M120 52 L176 92',
          'M52 74 L96 132',
          'M96 132 L176 92',
          'M176 92 L150 168',
          'M96 132 L150 168',
          'M150 168 L70 186',
          'M70 186 L52 74',
        ].map((d) => (
          <path key={d} className="d-edge" d={d} markerEnd={ah} />
        ))}
        <path className="d-edge d-edge--hot d-edge--flow" d="M120 52 L96 132" markerEnd={ah} />
        <path className="d-edge d-edge--hot d-edge--flow" d="M176 92 L96 132" markerEnd={ah} />
        {NODES.map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} className="d-node" cx={cx} cy={cy} r="6" />
        ))}
        <circle className="d-node d-node--hot" cx="96" cy="132" r="7" />
        <text className="d-text d-text--hot" x="112" y="136">
          zone i
        </text>
      </g>

      <g className="d-g" style={at(1)}>
        <path className="d-edge d-edge--flow" d="M210 120 L246 120" markerEnd={ah} />
        <rect className="d-box d-box--hot" x="248" y="86" width="128" height="34" />
        <text className="d-text d-text--hot" x="312" y="107" textAnchor="middle">
          GRAPH CONV
        </text>
        <path className="d-edge d-edge--flow" d="M312 120 L312 140" markerEnd={ah} />
        <rect className="d-box" x="248" y="142" width="128" height="34" />
        <text className="d-text" x="312" y="163" textAnchor="middle">
          GRU · reads 4h
        </text>
      </g>

      <g className="d-g" style={at(2)}>
        <path className="d-edge d-edge--flow" d="M378 130 L408 130" markerEnd={ah} />
        {['05', '15', '30', '60'].map((m, i) => (
          <g key={m}>
            <rect
              className={i === 3 ? 'd-box d-box--hot' : 'd-box'}
              x="410"
              y={60 + i * 32}
              width="86"
              height="26"
            />
            <text
              className={i === 3 ? 'd-text d-text--hot' : 'd-text'}
              x="453"
              y={77 + i * 32}
              textAnchor="middle"
            >
              {m} MIN
            </text>
          </g>
        ))}
      </g>

      <g className="d-g" style={at(3)}>
        <line className="d-rule" x1="524" y1="188" x2="636" y2="188" />
        {[
          [528, 18],
          [556, 30],
          [584, 44],
          [612, 62],
        ].map(([x, hgt], i) => (
          <rect
            key={x}
            className="d-bar"
            x={x}
            y={188 - hgt}
            width="16"
            height={hgt}
            style={{ '--o': 0.25 + i * 0.25, '--bi': i } as React.CSSProperties}
          />
        ))}
        <text className="d-text d-text--dim" x="524" y="208">
          RMSE gain vs. ridge
        </text>
        <text className="d-text d-text--dim" x="524" y="222">
          3–10%, widening
        </text>
        <text className="d-text d-text--dim" x="524" y="236">
          with horizon
        </text>
      </g>
    </svg>
  );
}
