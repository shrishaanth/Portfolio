# Shrishaanth U — Portfolio

Personal portfolio, built with Vite + React 18 + TypeScript. Single page, scroll-based
navigation (no router), plain CSS with design tokens.

## Stack

- Vite + React 18 + TypeScript
- Plain CSS (`src/styles/tokens.css` for design tokens, `src/styles/global.css` for
  everything else) — kept global rather than CSS Modules, since a lot of the styling
  relies on cross-component selectors (`.js-motion .reveal`, `[data-cat]`,
  `.project.is-gag .y-future`, …) that module scoping would break
- ESLint + Prettier

## Structure

```
index.html            Vite entry (head meta, #root, module script)
public/                og.png, robots.txt — served as-is
src/
  main.tsx             mounts <App/>, imports global styles
  App.tsx              top-level layout: background, cursor, nav, sections, footer
  styles/              tokens.css (design tokens) + global.css (everything else)
  data/                static content — profile.ts, projects.ts, skills.ts
  hooks/                the page's interactions (reveal-on-scroll, bubble nav +
                        glide-scroll, cursor-revealed grid, custom cursor, hero
                        type-on, terminal status panel, active-project scrollspy)
  lib/                  smoothScroll.ts (easing), env.ts (matchMedia helpers)
  components/           Nav, Footer, Background, Cursor, ClickRipple, Reveal, …
    about/               Hero, SystemsPanel
    projects/            ProjectIndex, ProjectCard, diagrams/ (hand-authored SVGs)
    contact/             ContactForm, LatencyChart
    sections/            About, Projects, Resume, Contact — one per <section>
```

## Commands

```bash
npm install       # first time
npm run dev       # local dev server
npm run build     # type-check + production build → dist/
npm run preview   # serve the production build locally
npm run lint       # ESLint
npm run format     # Prettier — writes
npm run format:check
```

## Résumé

The résumé PDF is **not** committed to this repo — it's hosted on Google Drive
("anyone with the link") and referenced by `RESUME_ID` in
[`src/data/profile.ts`](src/data/profile.ts). To update it, use Drive's
"Manage versions" to replace the file in place (keeps the same id, so no code
change needed), or swap `RESUME_ID` for a new file's id.

## Deploy

Static build — any static host works (Vercel, Netlify, GitHub Pages, …).

- Build command: `npm run build`
- Output directory: `dist`
