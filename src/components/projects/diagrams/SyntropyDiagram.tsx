export default function SyntropyDiagram() {
  return (
    <svg
      viewBox="0 0 660 250"
      role="img"
      aria-label="A time axis with an as-of marker: only data to its left is used. An EWMA lookback window feeds a Hierarchical Risk Parity allocator, and the whole window walks forward one step at a time, never seeing the future."
    >
      <defs>
        <marker
          id="y-ah"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6.5"
          markerHeight="6.5"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" fill="var(--faint)" />
        </marker>
        <pattern
          id="y-hatch"
          width="7"
          height="7"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="7" stroke="var(--line-accent)" strokeWidth="1" />
        </pattern>
      </defs>

      {/* time axis */}
      <rect
        x="118"
        y="46"
        width="302"
        height="26"
        fill="var(--panel)"
        stroke="var(--line-accent)"
      />
      <rect
        className="y-future"
        x="420"
        y="46"
        width="222"
        height="26"
        fill="url(#y-hatch)"
        stroke="var(--line)"
      />
      <line x1="20" y1="72" x2="642" y2="72" stroke="var(--line-accent)" />
      <line x1="420" y1="34" x2="420" y2="118" stroke="var(--accent)" strokeWidth="2" />
      <text x="420" y="28" textAnchor="middle" className="dgm-label dgm-label--accent">
        as-of t
      </text>
      <text x="128" y="63" className="dgm-label">
        used &#183; as-of each timestamp
      </text>
      <text x="432" y="63" className="dgm-label dgm-label--dim">
        future &mdash; masked
      </text>

      {/* lookback bracket */}
      <path d="M118 84 L118 92 L418 92 L418 84" fill="none" stroke="var(--faint)" />
      <text x="268" y="107" textAnchor="middle" className="dgm-label dgm-label--dim">
        EWMA lookback &#183; backward only
      </text>

      {/* pipeline */}
      <path d="M268 112 L268 130" stroke="var(--faint)" fill="none" markerEnd="url(#y-ah)" />
      <rect x="150" y="132" width="150" height="30" fill="var(--panel)" stroke="var(--accent)" />
      <text x="225" y="151" textAnchor="middle" className="dgm-label dgm-label--accent">
        HRP ALLOCATOR
      </text>
      <path d="M300 147 L340 147" stroke="var(--faint)" fill="none" markerEnd="url(#y-ah)" />
      <rect
        x="342"
        y="132"
        width="110"
        height="30"
        fill="var(--panel)"
        stroke="var(--line-accent)"
      />
      <text x="397" y="151" textAnchor="middle" className="dgm-label">
        positions
      </text>

      {/* walk forward */}
      <line x1="20" y1="196" x2="642" y2="196" stroke="var(--line)" />
      <text x="20" y="216" className="dgm-label dgm-label--accent">
        WALK FORWARD
      </text>
      <rect
        x="150"
        y="204"
        width="150"
        height="16"
        fill="var(--panel)"
        stroke="var(--line-accent)"
      />
      <rect
        x="230"
        y="224"
        width="150"
        height="16"
        fill="var(--panel)"
        stroke="var(--line-accent)"
      />
      <rect x="310" y="244" width="150" height="4" fill="var(--panel)" stroke="var(--accent)" />
      <path d="M304 212 L226 232" stroke="var(--faint)" fill="none" markerEnd="url(#y-ah)" />
      <path d="M384 232 L306 246" stroke="var(--faint)" fill="none" markerEnd="url(#y-ah)" />
      <text x="470" y="230" className="dgm-label dgm-label--dim">
        one step at a time
      </text>
    </svg>
  );
}
