// Static content for the hero, approach, about and contact sections.
// Edit here — no markup lives in this file.

export const profile = {
  name: 'Shrishaanth U',
  role: 'Backend, developer tools & applied ML',
  availability: 'Open to internships',
  blurb:
    'Third-year CS student at PSG College of Technology. I work on backend systems, ' +
    'developer tools and applied ML — usually by building something end to end and then ' +
    'measuring whether it actually works.',
  socials: {
    github: { handle: '@shrishaanth', url: 'https://github.com/shrishaanth' },
    linkedin: { handle: 'shrishaanth-dev', url: 'https://www.linkedin.com/in/shrishaanth-dev' },
  },
  email: 'shrishaanth2024@gmail.com',
  phone: { display: '+91 70100 48373', href: 'tel:+917010048373' },
  location: 'Coimbatore, India · remote-friendly',
};

// Count-up figures under the hero. Each is sourced from a project README or the transcript.
export const stats: {
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
}[] = [
  { value: 9.18, decimals: 2, label: 'CGPA, out of 10' },
  { value: 761, label: 'automated tests in Taskify' },
  { value: 200, label: 'real API version pairs Axon was evaluated on' },
  { value: 2.9, decimals: 1, suffix: 'M', label: 'taxi trips in SurgeMap’s January 2024 data' },
];

// "How I work" — three steps, each backed by something in the projects above.
export const approach = [
  {
    title: 'Build',
    sub: 'end to end',
    body:
      'From the data model to a deployed app. CodeAtlas, Axon and Taskify each ship an API, ' +
      'a UI and a documented way to run them.',
  },
  {
    title: 'Measure',
    sub: 'against baselines',
    body:
      'A result only counts next to something simpler. SurgeMap is compared with four ' +
      'baselines; CodeAtlas’s reading order with sorting by file size.',
  },
  {
    title: 'Report',
    sub: 'the losses too',
    body:
      'When a baseline ties or wins, that goes in the write-up. Axon’s README says plainly ' +
      'where its diff falls short of an established tool.',
  },
];

export const aboutProse = [
  'I’m a third-year student in the integrated M.Sc. Software Systems programme at PSG ' +
    'College of Technology, in Coimbatore. Most of what I know I’ve picked up by building ' +
    'things end to end and then trying to break them.',
  'I’m drawn to problems where correctness is hard to fake: tenant isolation the database ' +
    'enforces on every request, a forecast that has to beat its baselines, an analysis ' +
    'whose every number traces back to a file, line or commit.',
  'Right now I’m looking for an internship in SDE, backend systems, or applied ML.',
];

export const education = [
  {
    org: 'PSG College of Technology',
    detail: 'M.Sc. Software Systems (Integrated) · CGPA 9.18 / 10',
    when: 'Present',
  },
  {
    org: 'S.B.O.A Matric. Hr. Sec. School, Coimbatore',
    detail: 'Class XII — Higher Secondary (State Board) · 95.6%',
    when: '2024',
  },
  {
    org: 'S.B.O.A Matric. Hr. Sec. School, Coimbatore',
    detail: 'Class X — SSLC (State Board) · 92.6%',
    when: '2022',
  },
];

// The résumé is public/resume.pdf. Don't edit that file here: it is copied in
// automatically from the private Resume repo whenever Resume.pdf changes there
// (see the README). The site just serves whatever is current.
export const RESUME_HREF = '/resume.pdf';
