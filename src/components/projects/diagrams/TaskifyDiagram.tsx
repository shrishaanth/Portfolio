export default function TaskifyDiagram() {
  return (
    <svg
      viewBox="0 0 660 262"
      role="img"
      aria-label="Clients sync through a tenant-scoped Socket.IO room to the API, which reaches the database only past a per-request isolation check. Access tokens are short-lived; refresh tokens rotate and can be revoked."
    >
      <defs>
        <marker
          id="t-ah"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" fill="var(--faint)" />
        </marker>
      </defs>

      <rect x="16" y="46" width="94" height="32" fill="var(--panel)" stroke="var(--line-accent)" />
      <text x="63" y="66" textAnchor="middle" className="dgm-label">
        CLIENT A
      </text>
      <rect x="16" y="98" width="94" height="32" fill="var(--panel)" stroke="var(--line-accent)" />
      <text x="63" y="118" textAnchor="middle" className="dgm-label">
        CLIENT B
      </text>

      <path
        d="M114 62 L166 80"
        stroke="var(--faint)"
        fill="none"
        markerEnd="url(#t-ah)"
        markerStart="url(#t-ah)"
      />
      <path
        d="M114 114 L166 100"
        stroke="var(--faint)"
        fill="none"
        markerEnd="url(#t-ah)"
        markerStart="url(#t-ah)"
      />
      <text x="140" y="38" textAnchor="middle" className="dgm-label dgm-label--dim">
        optimistic move &#183; server reconcile
      </text>

      <rect x="170" y="54" width="150" height="64" fill="var(--panel)" stroke="var(--accent)" />
      <text x="245" y="82" textAnchor="middle" className="dgm-label dgm-label--accent">
        SOCKET.IO ROOM
      </text>
      <text x="245" y="99" textAnchor="middle" className="dgm-label dgm-label--dim">
        one per tenant
      </text>

      <path d="M322 86 L374 86" stroke="var(--faint)" fill="none" markerEnd="url(#t-ah)" />

      <rect x="378" y="60" width="86" height="52" fill="var(--panel)" stroke="var(--line-accent)" />
      <text x="421" y="90" textAnchor="middle" className="dgm-label">
        API
      </text>

      <path d="M466 86 L502 86" stroke="var(--faint)" fill="none" markerEnd="url(#t-ah)" />
      <line x1="500" y1="42" x2="500" y2="132" stroke="var(--accent)" strokeWidth="2" />
      <text x="500" y="150" textAnchor="middle" className="dgm-label dgm-label--accent">
        isolation check &#183; every request
      </text>

      <rect
        x="522"
        y="54"
        width="122"
        height="64"
        fill="var(--panel)"
        stroke="var(--line-accent)"
      />
      <text x="583" y="82" textAnchor="middle" className="dgm-label">
        DATABASE
      </text>
      <text x="583" y="99" textAnchor="middle" className="dgm-label dgm-label--dim">
        tenant id on every row
      </text>

      <line x1="16" y1="192" x2="644" y2="192" stroke="var(--line)" />
      <text x="16" y="212" className="dgm-label dgm-label--accent">
        AUTH
      </text>
      <rect
        x="66"
        y="198"
        width="158"
        height="30"
        fill="var(--panel)"
        stroke="var(--line-accent)"
      />
      <text x="145" y="217" textAnchor="middle" className="dgm-label">
        access &#183; short-lived
      </text>
      <path d="M226 213 L268 213" stroke="var(--faint)" fill="none" markerEnd="url(#t-ah)" />
      <rect x="270" y="198" width="204" height="30" fill="var(--panel)" stroke="var(--accent)" />
      <text x="372" y="217" textAnchor="middle" className="dgm-label dgm-label--accent">
        refresh &#183; rotates, revocable
      </text>
      <path
        d="M474 222 C 520 244, 230 244, 146 230"
        stroke="var(--faint)"
        fill="none"
        markerEnd="url(#t-ah)"
      />
      <text x="310" y="254" textAnchor="middle" className="dgm-label dgm-label--dim">
        new pair on every use
      </text>
    </svg>
  );
}
