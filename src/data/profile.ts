// Static content for the hero, about and contact sections.
// Edit here — no markup lives in this file.

export const profile = {
  name: 'Shrishaanth U',
  badge: 'OPEN — SUMMER 2026',
  blurb:
    'Third-year CS student at PSG College of Technology. I work on real-time ' +
    'systems, applied ML and quantitative pipelines — usually by building ' +
    'something end to end and then trying to break it.',
  facts: [
    { k: 'CGPA', v: '9.18', accent: true },
    { k: 'LOC', v: 'COIMBATORE' },
  ],
  socials: {
    github: { handle: '@shrishaanth', url: 'https://github.com/shrishaanth' },
    linkedin: { handle: 'shrishaanth-dev', url: 'https://www.linkedin.com/in/shrishaanth-dev' },
  },
  email: 'shrishaanth2024@gmail.com',
  phone: { display: '+91 70100 48373', href: 'tel:+917010048373' },
  location: 'Coimbatore, India · remote-friendly',
};

export const aboutProse = [
  'I’m a third-year student in the integrated M.Sc. Software Systems ' +
    'programme at PSG College of Technology, in Coimbatore. Most of what I know ' +
    'I’ve picked up by building things end to end and then trying to break them.',
  'I’m drawn to systems where correctness is hard to fake — a board ' +
    'where tenant isolation is enforced by the database on every request, a demand ' +
    'forecast that has to beat a linear baseline, a backtest that isn’t allowed ' +
    'to see the future. The interesting part is usually the part that resists shortcuts.',
  'Right now I’m looking for a summer 2026 internship in SDE, backend ' + 'systems, or applied ML.',
];

export const focusAreas = [
  {
    k: 'FULL-STACK',
    v: 'TypeScript, React, Node. Auth, real-time sync, and data models that hold up under multi-tenancy.',
  },
  {
    k: 'APPLIED ML',
    v: 'PyTorch and the scientific-Python stack. Graph networks, sequence models, and evaluation that doesn’t cheat.',
  },
  {
    k: 'SYSTEMS & QUANT',
    v: 'C++ and Python for the performance-sensitive parts. Point-in-time data, walk-forward testing, no leakage.',
  },
];

export const sysRows: { k: string; v: string; bold?: string; ok?: boolean }[] = [
  { k: 'year', v: 'third of five · integrated M.Sc.' },
  { k: 'uptime', v: '~3 yrs · ', bold: 'minor outages during exams' },
  { k: 'open PRs', v: '3 · all mine' },
  { k: 'availability', v: 'summer 2026 · SDE / backend / applied ML', ok: true },
  { k: 'location', v: 'Coimbatore, India · remote-friendly' },
  { k: 'coffee→code', v: 'conversion nominal' },
];

export const education = [
  {
    org: 'PSG COLLEGE OF TECHNOLOGY',
    detail: 'M.Sc. Software Systems (Integrated) · CGPA 9.18 / 10',
    when: 'PRESENT',
  },
  {
    org: 'S.B.O.A MATRIC. HR. SEC. SCHOOL, COIMBATORE',
    detail: 'Class XII — Higher Secondary (State Board) · 95.6%',
    when: '2024',
  },
  {
    org: 'S.B.O.A MATRIC. HR. SEC. SCHOOL, COIMBATORE',
    detail: 'Class X — SSLC (State Board) · 92.6%',
    when: '2022',
  },
];

// Résumé is hosted off-repo (Google Drive, "anyone with the link") — deliberately
// not committed here. Swap RESUME_ID for a new file's id to update the link;
// with Drive's "Manage versions" you can replace the PDF and keep the same id.
export const RESUME_ID = '1Gpt30T3k-4t7LPenap52BrzmcGAnOGeZ';
export const RESUME_HREF = `https://drive.google.com/file/d/${RESUME_ID}/view`;
export const RESUME_EMBED = `https://drive.google.com/file/d/${RESUME_ID}/preview`;
