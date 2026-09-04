export type SkillCategory = 'lang' | 'fw' | 'ml' | 'db' | 'tools';

export const skillGroups: { cat: SkillCategory; label: string; items: string[] }[] = [
  {
    cat: 'lang',
    label: 'LANGUAGES',
    items: ['Python', 'C++', 'C', 'JavaScript', 'TypeScript'],
  },
  {
    cat: 'fw',
    label: 'FRAMEWORKS',
    items: ['Node.js', 'Express.js', 'React.js', 'Socket.IO'],
  },
  {
    cat: 'ml',
    label: 'DATA / ML',
    items: [
      'PyTorch',
      'NumPy',
      'Pandas',
      'scikit-learn',
      'Matplotlib',
      'SciPy',
      'Streamlit',
      'Plotly',
    ],
  },
  {
    cat: 'db',
    label: 'DATABASES',
    items: ['MongoDB', 'Oracle'],
  },
  {
    cat: 'tools',
    label: 'PLATFORMS & TOOLS',
    items: ['Linux', 'Windows', 'Git', 'Docker', 'Postman'],
  },
];
