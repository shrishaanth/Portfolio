export type ProjectCategory = 'Full-stack' | 'Machine Learning' | 'Quantitative'

export type Project = {
  name: string
  category: ProjectCategory
  year: string
  blurb: string
  highlights: string[]
  tags: string[]
  repo: string
  live?: string
}

export const projects: Project[] = [
  {
    name: 'Taskify.io',
    category: 'Full-stack',
    year: '2025',
    blurb: 'Multi-tenant Kanban app with real-time board sync and hardened auth.',
    highlights: [
      'Two-layer RBAC and DB-enforced tenant isolation, re-checked on every request.',
      'Real-time board sync via Socket.IO with room-scoped events and optimistic, server-reconciled moves.',
      'JWT auth with rotating, revocable refresh tokens.',
    ],
    tags: ['TypeScript', 'React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO'],
    repo: 'https://github.com/shrishaanth/Taskify.io',
  },
  {
    name: 'SurgeMap',
    category: 'Machine Learning',
    year: '2025',
    blurb: 'Graph neural network forecasting taxi demand across NYC zones.',
    highlights: [
      'Graph engine over a 253-zone NYC TLC directed graph with a custom graph convolution.',
      'A GRU reads 4-hour spatial history to emit 5 / 15 / 30 / 60-minute demand forecasts per zone.',
      'Cuts RMSE by 3–10% vs. ridge regression, with the largest gains at longer horizons.',
    ],
    tags: ['PyTorch', 'NumPy', 'Pandas', 'scikit-learn', 'Matplotlib'],
    repo: 'https://github.com/shrishaanth/SurgeMap',
  },
  {
    name: 'Syntropy',
    category: 'Quantitative',
    year: '2024',
    blurb: 'Point-in-time quant pipeline for risk estimation and capital allocation.',
    highlights: [
      'Estimates time-varying risk via EWMA on a strict point-in-time basis.',
      'Allocates capital through a Hierarchical Risk Parity (HRP) engine.',
      'Walk-forward backtesting with zero future-data leakage; outputs a Streamlit benchmarking dashboard.',
    ],
    tags: ['Python', 'Pandas', 'NumPy', 'SciPy', 'Streamlit', 'Plotly'],
    repo: 'https://github.com/shrishaanth/Syntropy',
  },
]

export const categories: Array<'All' | ProjectCategory> = [
  'All',
  'Full-stack',
  'Machine Learning',
  'Quantitative',
]
