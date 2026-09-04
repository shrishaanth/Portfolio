import type { SkillCategory } from './skills';

export interface ProjectData {
  id: string;
  name: string;
  year: string;
  indexCategory: string; // label shown in the sticky project index
  lead: string;
  context: string;
  pull: string;
  diagram: 'taskify' | 'surgemap' | 'syntropy';
  figNo: string;
  figCaption: string;
  points: { n: string; text: string }[];
  tags: { cat: SkillCategory; label: string }[];
  source: string;
  gag?: boolean; // Syntropy's "peek at the future" easter egg
}

export const projects: ProjectData[] = [
  {
    id: 'p1',
    name: 'Taskify.io',
    year: '2025',
    indexCategory: 'FULL-STACK',
    lead:
      'Multi-tenant Kanban where every board edit syncs live across clients, with tenant ' +
      'isolation enforced at the database on every request.',
    context:
      'Built to learn multi-tenancy the hard way. The Kanban board is the easy part; the ' +
      'real work was pushing tenant isolation down to the database, so a query physically ' +
      'can’t return another tenant’s rows. Auth followed the same instinct ' +
      '— short-lived access tokens, refresh tokens that rotate on use and can be ' +
      'revoked server-side.',
    pull: 'Isolation the database enforces, not something the app remembers to check.',
    diagram: 'taskify',
    figNo: 'FIG.01',
    figCaption: 'SYNC + ISOLATION + TOKEN ROTATION',
    points: [
      { n: '01', text: 'Two-layer RBAC, re-checked on every request rather than cached at login.' },
      { n: '02', text: 'Room-scoped Socket.IO events with optimistic, server-reconciled moves.' },
      { n: '03', text: 'JWT auth with rotating, revocable refresh tokens.' },
    ],
    tags: [
      { cat: 'lang', label: 'TypeScript' },
      { cat: 'fw', label: 'React' },
      { cat: 'fw', label: 'Node' },
      { cat: 'fw', label: 'Express' },
      { cat: 'db', label: 'MongoDB' },
      { cat: 'fw', label: 'Socket.IO' },
    ],
    source: 'https://github.com/shrishaanth/Taskify.io',
  },
  {
    id: 'p2',
    name: 'SurgeMap',
    year: '2025',
    indexCategory: 'APPLIED ML',
    lead:
      'Graph neural network forecasting taxi demand across 253 NYC zones — cuts RMSE by ' +
      '3–10% against ridge regression, with the largest gains at the longest horizons.',
    context:
      'A test of whether graph structure actually helps short-horizon forecasting. It does, ' +
      'and the gap over the linear baseline is widest at 60 minutes out — far ' +
      'enough ahead that a zone’s own recent trips stop being predictive on their own. ' +
      'The convolution is custom, so message-passing follows the direction of the TLC trip graph.',
    pull: 'Neighbours matter most exactly where a zone’s own history matters least.',
    diagram: 'surgemap',
    figNo: 'FIG.02',
    figCaption: 'GRAPH → CONV → GRU → PER-ZONE HORIZONS',
    points: [
      {
        n: '01',
        text: 'Graph engine over a 253-zone NYC TLC directed graph with a custom graph convolution.',
      },
      {
        n: '02',
        text: 'A GRU reads 4-hour spatial history to emit 5 / 15 / 30 / 60-minute forecasts per zone.',
      },
      { n: '03', text: 'Benchmarked against ridge regression across every horizon.' },
    ],
    tags: [
      { cat: 'ml', label: 'PyTorch' },
      { cat: 'ml', label: 'NumPy' },
      { cat: 'ml', label: 'Pandas' },
      { cat: 'ml', label: 'scikit-learn' },
      { cat: 'ml', label: 'Matplotlib' },
    ],
    source: 'https://github.com/shrishaanth/SurgeMap',
  },
  {
    id: 'p3',
    name: 'Syntropy',
    year: '2024',
    indexCategory: 'QUANTITATIVE',
    lead:
      'Point-in-time quantitative pipeline with walk-forward backtesting and zero ' +
      'future-data leakage — the failure mode that invalidates most student quant work.',
    context:
      'Most student quant projects look good because they quietly use data from the future. ' +
      'This one is built around not doing that: every input is as-of its own timestamp, ' +
      'risk is estimated with an EWMA that only ever looks back, and the backtest walks ' +
      'forward one step at a time. The allocator is Hierarchical Risk Parity; the Streamlit ' +
      'dashboard exists so the results can be checked against plain baselines.',
    pull: 'If the backtest is allowed to see the future, the numbers mean nothing.',
    diagram: 'syntropy',
    figNo: 'FIG.03',
    figCaption: 'POINT-IN-TIME DATA → HRP → WALK-FORWARD',
    points: [
      { n: '01', text: 'Estimates time-varying risk via EWMA on a strict point-in-time basis.' },
      { n: '02', text: 'Allocates capital through a Hierarchical Risk Parity engine.' },
      { n: '03', text: 'Outputs a Streamlit dashboard for benchmarking against baselines.' },
    ],
    tags: [
      { cat: 'lang', label: 'Python' },
      { cat: 'ml', label: 'Pandas' },
      { cat: 'ml', label: 'NumPy' },
      { cat: 'ml', label: 'SciPy' },
      { cat: 'ml', label: 'Streamlit' },
      { cat: 'ml', label: 'Plotly' },
    ],
    source: 'https://github.com/shrishaanth/Syntropy',
    gag: true,
  },
];
