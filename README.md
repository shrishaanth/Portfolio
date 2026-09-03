# Personal Portfolio — Shrishaanth U

Dark, warm "ember-glass" portfolio. Vite + React + TypeScript, plain CSS.

## Tabs

- **About** — intro, focus areas, availability
- **Projects** — Taskify.io, SurgeMap, Syntropy (filterable by category)
- **Résumé** — education, selected projects, skills; downloads `public/Shrishaanth-U-Resume.pdf`
- **Contact** — links + a form that opens a pre-filled email

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build      # type-checks, then bundles to dist/
npm run preview    # serve the production build locally
```

## Deploy

Push to GitHub, then import into **Vercel** or **Netlify** — both are configured for
SPA routing (`vercel.json` / `public/_redirects`). Build command `npm run build`,
output directory `dist`.

## Where things live

| Path | What |
| --- | --- |
| `src/data/profile.ts` | name, role, summary, education, skills, interests |
| `src/data/projects.ts` | project list + categories |
| `src/styles/tokens.css` | colors, type, spacing, radii |
| `src/styles/global.css` | reset, layout, nav, buttons, `.glass` surface |
| `src/styles/routes.css` | per-page layout |
| `src/components/` | `Nav`, `GlassCard`, `Button`, `icons` |
| `design/` | original design-canvas drafts (`*.dc.html`, `canvas.json`) |
| `public/Shrishaanth-U-Resume.pdf` | résumé download |

## To personalise

- Replace `[ your portrait ]` placeholder in `src/routes/About.tsx` / `.portrait` with a real photo.
- Add real screenshots to project cards (`.project-card__media` in `src/routes/Projects.tsx`).
- Swap the résumé PDF in `public/`.
