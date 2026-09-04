export default function SurgeMapDiagram() {
  return (
    <svg
      viewBox="0 0 660 264"
      role="img"
      aria-label="A directed zone graph feeds a custom graph convolution and a GRU that reads four hours of history, emitting demand forecasts at 5, 15, 30 and 60 minutes. The RMSE gain over ridge regression widens with the horizon."
    >
      <defs>
        <marker
          id="s-ah"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6.5"
          markerHeight="6.5"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" fill="var(--faint)" />
        </marker>
      </defs>

      <text x="20" y="26" className="dgm-label dgm-label--dim">
        253-ZONE TLC DIRECTED GRAPH &#183; abstracted
      </text>

      {/* directed zone graph */}
      <g stroke="var(--faint)" fill="none" markerEnd="url(#s-ah)">
        <path d="M52 74 L120 52" />
        <path d="M120 52 L176 92" />
        <path d="M52 74 L96 132" />
        <path d="M96 132 L176 92" />
        <path d="M176 92 L150 168" />
        <path d="M96 132 L150 168" />
        <path d="M150 168 L70 186" />
        <path d="M70 186 L52 74" />
      </g>
      <g className="flow" stroke="var(--accent)" fill="none" markerEnd="url(#s-ah)">
        <path d="M120 52 L96 132" />
        <path d="M176 92 L96 132" />
      </g>
      <g fill="var(--bg)" stroke="var(--dim)">
        <circle cx="52" cy="74" r="6" />
        <circle cx="120" cy="52" r="6" />
        <circle cx="176" cy="92" r="6" />
        <circle cx="150" cy="168" r="6" />
        <circle cx="70" cy="186" r="6" />
      </g>
      <circle cx="96" cy="132" r="7" fill="var(--accent)" stroke="none" />
      <text x="112" y="136" className="dgm-label dgm-label--accent">
        zone i
      </text>

      <path d="M210 120 L246 120" stroke="var(--faint)" fill="none" markerEnd="url(#s-ah)" />

      <rect x="248" y="86" width="128" height="34" fill="var(--panel)" stroke="var(--accent)" />
      <text x="312" y="107" textAnchor="middle" className="dgm-label dgm-label--accent">
        GRAPH CONV
      </text>
      <path d="M312 120 L312 140" stroke="var(--faint)" fill="none" markerEnd="url(#s-ah)" />
      <rect
        x="248"
        y="142"
        width="128"
        height="34"
        fill="var(--panel)"
        stroke="var(--line-accent)"
      />
      <text x="312" y="163" textAnchor="middle" className="dgm-label">
        GRU &#183; reads 4h
      </text>

      <path d="M378 130 L408 130" stroke="var(--faint)" fill="none" markerEnd="url(#s-ah)" />

      {/* horizons */}
      <rect x="410" y="60" width="86" height="26" fill="var(--panel)" stroke="var(--line-accent)" />
      <text x="453" y="77" textAnchor="middle" className="dgm-label">
        05 MIN
      </text>
      <rect x="410" y="92" width="86" height="26" fill="var(--panel)" stroke="var(--line-accent)" />
      <text x="453" y="109" textAnchor="middle" className="dgm-label">
        15 MIN
      </text>
      <rect
        x="410"
        y="124"
        width="86"
        height="26"
        fill="var(--panel)"
        stroke="var(--line-accent)"
      />
      <text x="453" y="141" textAnchor="middle" className="dgm-label">
        30 MIN
      </text>
      <rect x="410" y="156" width="86" height="26" fill="var(--panel)" stroke="var(--accent)" />
      <text x="453" y="173" textAnchor="middle" className="dgm-label dgm-label--accent">
        60 MIN
      </text>

      {/* rmse gain bars */}
      <line x1="524" y1="188" x2="636" y2="188" stroke="var(--line-accent)" />
      <rect x="528" y="170" width="16" height="18" fill="var(--dim)" />
      <rect x="556" y="158" width="16" height="30" fill="var(--faint)" />
      <rect x="584" y="144" width="16" height="44" fill="var(--muted)" />
      <rect x="612" y="126" width="16" height="62" fill="var(--accent)" />
      <text x="524" y="208" className="dgm-label dgm-label--dim">
        RMSE gain vs. ridge
      </text>
      <text x="524" y="222" className="dgm-label dgm-label--dim">
        3&#8211;10%, widening with horizon
      </text>
    </svg>
  );
}
