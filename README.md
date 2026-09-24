# Shrishaanth U — Portfolio

Personal portfolio, built with Vite + React 18 + TypeScript. Single page, scroll-based
navigation (no router), plain CSS with design tokens.

## Stack

- Vite + React 18 + TypeScript — no UI or animation libraries; every interaction is
  hand-rolled (IntersectionObserver, rAF, CSS transitions)
- Plain global CSS split by area in `src/styles/` (`tokens.css` holds the palette, type
  scale, radii and easing curves). Global rather than CSS Modules because a lot of the
  styling keys off cross-component state classes (`.js-motion`, `.is-in`, `[data-cat]`, …)
- Fonts: Inter Tight (display), Instrument Serif (italic accents), JetBrains Mono (labels)
- ESLint + Prettier

## Design

"Ember": warm near-black ink, cream type, a single hot accent (`--accent`), plus one hue per
project and per skill category. Hierarchy runs giant name → numbered section heads
(`01 — About`) → display titles with a serif-italic turn → body copy.

Interactions, all of which respect `prefers-reduced-motion`:

- **Hero** — a live node graph on `<canvas>` passing "messages" along its edges (a nod to
  SurgeMap); it leans toward the cursor and pauses offscreen. Letter-by-letter name reveal,
  portrait pill, rotating interests.
- **Chrome** — floating nav with a sliding pill that tracks hover/active and hides on scroll
  down; scroll progress bar; custom cursor with contextual labels (fine pointers only);
  command palette on `⌘K` / `Ctrl+K` / `/`; toasts; film grain.
- **About** — tilting duotone portrait, a terminal that types its status, a statement whose
  words light up as you scroll, spotlight focus cards, count-up stats.
- **Work** — project cards pin and stack as you scroll (the covered card recedes); diagrams
  draw in group by group with flowing edges; expandable back-story; the Syntropy
  "peek at the future" easter egg.
- **Résumé** — résumé card, a timeline whose spine draws on scroll, a filterable skill
  matrix that shows which projects use each skill.
- **Contact** — click-to-copy email, channel rows, a live-ish ping sparkline, and a
  floating-label form that composes a `mailto:`.

## Structure

```
index.html              Vite entry (head meta, fonts, #root, pre-paint js-motion flag)
public/                 og.png, portrait.jpg, robots.txt — served as-is
src/
  main.tsx              mounts <App/>, imports styles
  App.tsx               page order + global overlays (palette, toast, cursor, grain)
  context/AppContext    toast, command palette, résumé-opening, copy-email
  data/                 all copy — profile.ts, projects.ts, skills.ts
  hooks/                useInView, useScrollFrame, useActiveSection, useMagnetic,
                        usePointerVars, useCountUp, useLocalTime
  lib/                  env.ts (matchMedia helpers), scroll.ts (scrollToId, copyText, clamp)
  components/
    layout/             Nav, Footer, Cursor, ScrollProgress, CommandPalette, Toast
    ui/                 Reveal, SplitText, SectionHead, MagneticLink, Marquee, Icon
    hero/               Hero, NetworkCanvas, Rotator
    about/              About, PortraitCard, StatusTerminal, ScrollText, FocusCard, Stats
    work/               Work (stacking deck), ProjectCard, diagrams/ (hand-authored SVG)
    resume/             Resume, Timeline, SkillMatrix, ResumeViewer
    contact/            Contact, ContactForm, Latency
  styles/               tokens, base, layout, hero, about, work, resume, contact
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
