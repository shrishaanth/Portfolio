export const profile = {
  name: 'Shrishaanth U',
  role: 'Computer Science Student & Full-stack Developer',
  location: 'Coimbatore, India',
  email: 'shrishaanth2024@gmail.com',
  phone: '+91 70100 48373',
  resumeUrl: '/Shrishaanth-U-Resume.pdf',
  summary:
    'Computer Science student learning full-stack development and algorithmic problem solving through hands-on projects involving real-time and high-performance systems.',
  availability: 'Open to internships and collaborative projects',
  socials: {
    github: 'https://github.com/shrishaanth',
    linkedin: 'https://www.linkedin.com/in/shrishaanth-dev',
  },
}

export type FocusArea = { icon: 'code' | 'grid' | 'pen'; title: string; body: string }

export const focus: FocusArea[] = [
  {
    icon: 'code',
    title: 'Full-stack Development',
    body: 'TypeScript, React, Node.js and Express — complete apps with real-time sync, hardened auth and clean data models.',
  },
  {
    icon: 'grid',
    title: 'Algorithms & Problem Solving',
    body: 'C++ and Python for data-structure-heavy problems, graph algorithms and performance-sensitive code.',
  },
  {
    icon: 'pen',
    title: 'Real-time & High-performance Systems',
    body: 'Socket.IO board sync, graph neural nets for forecasting, and quantitative pipelines with no data leakage.',
  },
]

export type EducationEntry = {
  school: string
  detail: string
  meta: string
  when: string
}

export const education: EducationEntry[] = [
  {
    school: 'PSG College of Technology',
    detail: 'M.Sc. Software Systems (Integrated)',
    meta: 'CGPA 9.18 / 10',
    when: 'Present',
  },
  {
    school: 'S.B.O.A Matric. Hr. Sec. School, Coimbatore',
    detail: 'Class XII — Higher Secondary (State Board)',
    meta: '95.6%',
    when: '2024',
  },
  {
    school: 'S.B.O.A Matric. Hr. Sec. School, Coimbatore',
    detail: 'Class X — SSLC (State Board)',
    meta: '92.6%',
    when: '2022',
  },
]

export type SkillGroup = { group: string; items: string[] }

export const skills: SkillGroup[] = [
  { group: 'Languages', items: ['Python', 'C++', 'C', 'JavaScript', 'TypeScript'] },
  { group: 'Frameworks', items: ['Node.js', 'Express.js', 'React.js', 'Socket.IO'] },
  {
    group: 'Data & ML',
    items: ['PyTorch', 'NumPy', 'Pandas', 'scikit-learn', 'Matplotlib', 'SciPy', 'Streamlit', 'Plotly'],
  },
  { group: 'Databases', items: ['MongoDB', 'Oracle'] },
  { group: 'Platforms & Tools', items: ['Linux', 'Git', 'Docker', 'Postman'] },
]

export type Interest = { title: string; body: string }

export const interests: Interest[] = [
  {
    title: 'Drawing',
    body: 'Freehand pencil sketching — studying light, shadow and proportion in everyday objects.',
  },
  {
    title: 'Photography',
    body: 'Casual photography — capturing everyday scenes and exploring composition and lighting.',
  },
]
