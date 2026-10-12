// The stack, drawn as layers from what a user sees (top) down to the languages
// underneath (bottom). `tooling` cuts across all of them and sits in a side rail.

export const layers: { id: string; label: string; items: string[] }[] = [
  { id: 'frontend', label: 'Frontend', items: ['React', 'Vite', 'HTML & CSS'] },
  { id: 'backend', label: 'Backend', items: ['Spring Boot', 'Node.js', 'Express.js', 'Socket.IO'] },
  {
    id: 'ml',
    label: 'Data / ML',
    items: ['PyTorch', 'NumPy', 'Pandas', 'scikit-learn', 'SciPy', 'Matplotlib', 'Streamlit'],
  },
  { id: 'db', label: 'Databases', items: ['PostgreSQL', 'MongoDB', 'Oracle'] },
  {
    id: 'lang',
    label: 'Languages',
    items: ['Java', 'Python', 'TypeScript', 'JavaScript', 'C++', 'C'],
  },
];

export const tooling = { label: 'Tools', items: ['Git', 'Docker', 'Linux', 'Postman'] };

/**
 * Loose key for matching a project's stack entry to a skill here: project data
 * says "Java 17" and "Express" where this file says "Java" and "Express.js".
 */
export const skillKey = (name: string) =>
  name
    .toLowerCase()
    .replace(/\s+\d+$/, '')
    .replace(/\.js$/, '');
