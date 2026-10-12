// The four featured projects. Every figure here is taken from the project's own
// README / evaluation docs — if a number changes there, change it here too.

export interface ProjectData {
  id: string;
  name: string;
  category: string;
  /** One or two sentences: what it is and what it does. */
  lead: string;
  /** The headline number, shown large. */
  metric: { value: string; label: string };
  /** Supporting facts — how it is built and what was measured, losses included. */
  points: string[];
  stack: string[];
  source: string;
  live?: string;
  /** Which animated scene to draw in the card. */
  visual: 'graph' | 'blast' | 'board' | 'zones';
  /** Optional render in public/ (e.g. '/projects/axon.webp'); replaces the scene when set. */
  image?: string;
}

export const projects: ProjectData[] = [
  {
    id: 'codeatlas',
    name: 'CodeAtlas',
    category: 'Developer tools',
    lead:
      'Point it at a repository and get a browsable report: where to start reading, who owns ' +
      'what, which files change together, hotspots and concrete findings. It is computed from ' +
      'the code and its git history, so every number traces back to a file, line or commit.',
    metric: {
      value: '98–100%',
      label: 'of named-symbol definitions found in the top 8 search results, on two repositories',
    },
    points: [
      'Reading order ranks files by churn, reach and fan-in. On 10 held-out repositories it ' +
        'scores 0.69 against 0.67 for sorting by file size — a narrow win, reported as one.',
      'Q&A answers only from retrieved excerpts, and every citation is checked and labelled ' +
        'exact, inside an excerpt, or unsupported.',
      'The analysis engine has no framework in it, so the same code runs the web service, ' +
        'the offline CLI and the evaluation harness.',
    ],
    stack: ['Java 17', 'Spring Boot', 'Tree-sitter', 'JGit', 'PostgreSQL', 'React', 'TypeScript'],
    source: 'https://github.com/shrishaanth/CodeAtlas',
    visual: 'graph',
    live: 'https://code-atlas-app.vercel.app',
  },
  {
    id: 'axon',
    name: 'Axon',
    category: 'API tooling',
    lead:
      'API change-impact analysis. Diff tools say a change is breaking; Axon says who would ' +
      'break. It ranks the breaking changes between two OpenAPI versions by the clients that ' +
      'observed traffic shows are affected, and reports where the API has drifted from its docs.',
    metric: {
      value: '0.69',
      label: 'rank correlation with the true affected-client count, vs −0.03 for spec-only ranking',
    },
    points: [
      'A CI gate fails a pull request when an observed breaking change affects at least 10% ' +
        'of recently active clients.',
      'Ingests 4,700 events per second in batches on one laptop and one Postgres, and replays ' +
        'a million events in four minutes.',
      'Measured against oasdiff on 200 real version pairs (Stripe, GitHub, Twilio): Axon ' +
        'reports 73% of what it calls breaking. That gap is in the README.',
    ],
    stack: ['Java 17', 'Maven', 'PostgreSQL', 'OpenAPI 3', 'React', 'TypeScript', 'Docker'],
    source: 'https://github.com/shrishaanth/Axon',
    visual: 'blast',
  },
  {
    id: 'taskify',
    name: 'Taskify',
    category: 'Full-stack',
    lead:
      'Multi-tenant Kanban project management: Trello-style boards on top of two-layer access ' +
      'control, tenant isolation enforced at the database, and real-time collaboration. One ' +
      'deployment serves many organisations.',
    metric: {
      value: '761',
      label: 'automated tests — 247 server, 514 client — with tenant isolation as the top suite',
    },
    points: [
      'Every org-scoped query is filtered on the tenant at the database layer. A foreign ' +
        'resource returns 404, so its existence is never confirmed.',
      'Organisation and project roles are re-read from MongoDB on every request, so a ' +
        'demotion takes effect on the very next call.',
      'Socket.IO events reach strictly room-scoped audiences; refresh tokens rotate, can be ' +
        'revoked, and are stored hashed.',
    ],
    stack: ['TypeScript', 'React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO'],
    source: 'https://github.com/shrishaanth/Taskify.io',
    visual: 'board',
    live: 'https://taskify-io.vercel.app',
  },
  {
    id: 'surgemap',
    name: 'SurgeMap',
    category: 'Applied ML',
    lead:
      'Forecasts taxi pickups in each of New York’s 258 taxi zones 5, 15, 30 and 60 minutes ' +
      'ahead with a spatio-temporal graph neural network, then tests in a simulator whether ' +
      'pre-positioning idle vehicles on those forecasts shortens rider waits.',
    metric: {
      value: '3.3–5.9%',
      label:
        'lower RMSE than gradient boosting at every horizon, and 23–35% lower than persistence',
    },
    points: [
      'A Graph WaveNet over the directed taxi-flow graph plus an adjacency it learns itself, ' +
        'trained on four months of NYC TLC trips.',
      'Compared with four baselines fitted on the same data; every 95% block-bootstrap ' +
        'interval excludes zero.',
      'The simulator’s finding: for repositioning, a good forecast is enough. A plain ' +
        'time-of-day average performs as well as either model.',
    ],
    stack: ['Python', 'PyTorch', 'NumPy', 'Pandas', 'scikit-learn', 'Streamlit'],
    source: 'https://github.com/shrishaanth/SurgeMap',
    visual: 'zones',
  },
];
