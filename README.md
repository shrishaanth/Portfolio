# Shrishaanth U — Portfolio

Personal portfolio, built with Vite + React 18 + TypeScript. Single page, scroll-based
navigation (no router), plain CSS with design tokens.

## Stack

- Vite + React 18 + TypeScript — no UI or animation libraries
- Plain global CSS in `src/styles/` (`tokens.css` holds the palette, type scale and easing)
- Fonts: Geist (everything) and Geist Mono (labels)
- ESLint + Prettier

## Design

Black ground, off-white and warm-grey type, hairline borders and one soft pink accent used
sparingly. Section headers are a mono label with a leading rule, then a two-tone display
title (first line in ink, second in grey).

Each project card carries an animated canvas scene in its top-right corner, tied to what the
project does (a reading order through an import graph, a blast radius, a card moving across
a board, demand pulsing across zones), in pink and orange light, with pale dust drifting over
the card. A scene can be swapped for a rendered image by setting `image` on the project — see
[docs/imagery.md](docs/imagery.md).

The hero, approach, about and contact sections each carry a render of glowing moss and
flowers on black (`public/backdrops/`, placed by `<Backdrop>`): an island and a tree as
objects on the right, and two full-width strips — one growing out of the approach cards, one
closing the page above the footer.

The Stack section is a layered diagram (frontend at the top, languages at the bottom, tools
in a side rail). One project is traced through it at a time: the skills it uses light up and
glowing links join them layer to layer. Which skills light up is derived from each project's
`stack` in `projects.ts`, matched against `skills.ts`, so there is nothing to keep in sync by hand.

## Content

All copy lives in `src/data/`. The four featured projects — CodeAtlas, Axon, Taskify and
SurgeMap — are in `projects.ts`; **every figure there comes from that project's README or
evaluation docs**, so update both together.

## Structure

```
index.html              Vite entry (head meta, fonts, #root, pre-paint js-motion flag)
public/                 og.png, robots.txt, backdrops/ (section renders) — served as-is
src/
  main.tsx              mounts <App/>, imports styles
  App.tsx               page order + overlays (command menu, toast)
  context/AppContext    toast, command menu, résumé-opening, copy-email
  data/                 profile.ts, projects.ts, skills.ts, nav.ts
  hooks/                useInView, useScrollFrame, useActiveSection, useCountUp, useLocalTime,
                        useCanvas
  lib/                  env.ts (matchMedia helpers), scroll.ts (scrollToId, copyText, clamp)
  components/
    layout/             Nav, Footer, CommandPalette, Toast, ResumeViewer
    ui/                 Reveal, SectionHead, Backdrop, Icon
    visuals/            scenes.ts (the canvas scenes), paint.ts, SceneCanvas, ProjectVisual
    sections/           Hero, Work, Approach, About, Stack, Contact
  styles/               tokens, base, layout, sections
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
