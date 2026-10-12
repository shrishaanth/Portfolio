import {
  siC,
  siCplusplus,
  siDocker,
  siExpress,
  siGit,
  siHtml5,
  siJavascript,
  siLinux,
  siMongodb,
  siNodedotjs,
  siNumpy,
  siOpenjdk,
  siPandas,
  siPostgresql,
  siPostman,
  siPython,
  siPytorch,
  siReact,
  siScikitlearn,
  siScipy,
  siSocketdotio,
  siSpringboot,
  siStreamlit,
  siTypescript,
  siVite,
} from 'simple-icons';

// Brand marks from simple-icons (CC0), keyed by the skill names in data/skills.ts.
const LOGOS: Record<string, string> = {
  Java: siOpenjdk.path,
  Python: siPython.path,
  TypeScript: siTypescript.path,
  JavaScript: siJavascript.path,
  'C++': siCplusplus.path,
  C: siC.path,
  'Spring Boot': siSpringboot.path,
  'Node.js': siNodedotjs.path,
  'Express.js': siExpress.path,
  'Socket.IO': siSocketdotio.path,
  React: siReact.path,
  Vite: siVite.path,
  'HTML & CSS': siHtml5.path,
  PyTorch: siPytorch.path,
  NumPy: siNumpy.path,
  Pandas: siPandas.path,
  'scikit-learn': siScikitlearn.path,
  SciPy: siScipy.path,
  Streamlit: siStreamlit.path,
  PostgreSQL: siPostgresql.path,
  MongoDB: siMongodb.path,
  Git: siGit.path,
  Docker: siDocker.path,
  Linux: siLinux.path,
  Postman: siPostman.path,
};

// The set has no mark for these, so they get a plain glyph: a chart and a database.
const GLYPHS: Record<string, string> = {
  Matplotlib: 'M3 3v18h18M7 15l4-5 3 3 5-7',
  Oracle:
    'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zm0 0v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
};

/** A monochrome mark for a technology. Falls back to nothing for unknown names. */
export default function TechIcon({ name, size = 30 }: { name: string; size?: number }) {
  const logo = LOGOS[name];
  const glyph = GLYPHS[name];
  if (!logo && !glyph) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {logo ? (
        <path d={logo} fill="currentColor" />
      ) : (
        <path
          d={glyph}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}
