# Shrishaanth U — Portfolio

Personal portfolio, built with Vite + React 18 + TypeScript. Single page, scroll-based
navigation (no router), plain CSS with design tokens.

## Stack

- Vite + React 18 + TypeScript — no UI or animation libraries; `simple-icons` for tech marks
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

The hero, approach, about and contact sections each have a rendered image behind them, in
the empty space on the right (`public/backdrops/`, placed by `<Backdrop>`).

The Stack section is a layered diagram (frontend at the top, languages at the bottom, tools
in a side rail). One project is traced through it at a time: the skills it uses light up and
glowing links join them layer to layer. Which skills light up is derived from each project's
`stack` in `projects.ts`, matched against `skills.ts`, so there is nothing to keep in sync by hand.

Below the diagram, a grid shows every technology as a tile: its mark, name, a category tag
and the featured projects that use it. Marks come from `simple-icons` (CC0) via
`src/components/ui/TechIcon.tsx`; add a skill to `skills.ts` and map its mark there.

## Content

All copy lives in `src/data/`. The four featured projects — CodeAtlas, Axon, Taskify and
SurgeMap — are in `projects.ts`; **every figure there comes from that project's README or
evaluation docs**, so update both together.

## Structure

```
index.html              Vite entry (head meta, fonts, #root, pre-paint js-motion flag)
public/                 logo.svg, favicon.svg, og.png, robots.txt, backdrops/ — served as-is
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
    ui/                 Reveal, SectionHead, Backdrop, Logo, TechIcon, Icon
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

The site serves `public/resume.pdf`. **Don't update that file by hand.** The source of truth
is `Resume.pdf` in the private `shrishaanth/Resume` repo: a workflow there
(`.github/workflows/publish-to-portfolio.yml`) runs whenever that file changes, copies it to
`public/resume.pdf` in this repo and pushes the commit, which redeploys the site.

That workflow needs one secret in the Resume repo, `PORTFOLIO_TOKEN`: a fine-grained personal
access token limited to this repository with **Contents: Read and write**. If the token
expires, the workflow fails with a message saying so; create a new one and update the secret.
After a sync, run `git pull` here before your next local change.

## Deploy

Static build — any static host works (Vercel, Netlify, GitHub Pages, …).

- Build command: `npm run build`
- Output directory: `dist`
