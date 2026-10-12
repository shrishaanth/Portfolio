# Imagery

The site uses two kinds of picture: rendered images behind sections, and animated scenes
drawn in code (`src/components/visuals/scenes.ts`) inside the project cards.

## Section backdrops

Four renders of glowing moss, ferns and flowers on black, one per section:

| Section  | File                             | Kind   | Placement                                   |
| -------- | -------------------------------- | ------ | ------------------------------------------- |
| Hero     | `public/backdrops/hero.webp`     | object | floating island, right of the headline      |
| Approach | `public/backdrops/approach.webp` | strip  | full width, growing out of the three cards  |
| About    | `public/backdrops/about.webp`    | object | tree, right of the heading                  |
| Contact  | `public/backdrops/contact.webp`  | strip  | full width along the bottom of the section  |

Each is placed by `<Backdrop name="…" />` in its section and positioned by the
`.backdrop--<name>` rule in `src/styles/sections.css`. The images are blended in "screen"
mode, so their black background disappears and only the light shows.

**Replacing one.** Put the new full-size image in `design/renders/`, crop away the empty black
around the subject, export as WebP (quality ~82) over the file in `public/backdrops/`, and
update its pixel size in `SIZES` at the top of `src/components/ui/Backdrop.tsx`.

**Prompts used** (each followed by the shared style below):

- Hero, 16:9 — a single small floating island of dark rock seen from the side, overgrown with
  glowing moss and trailing vines, in the right third of the frame, the rest empty black
- Approach, 3:1 — a long panoramic strip of overgrown terrain seen from the side, mossy mounds
  and peaks with wildflowers along the top, full width, a flat straight bottom edge
- About, 16:9 — a single glowing tree with a twisting trunk and a wide canopy of blossoms,
  roots trailing below, in the right third of the frame, the rest empty black
- Contact, 3:1 — a low distant horizon of glowing grasses and wildflowers, sparse and
  delicate, full width along the very bottom of the frame

Shared style: glowing bioluminescent moss, ferns and tiny wildflowers, colours shifting from
moss green through warm orange to hot pink, fine detailed foliage, macro 3D render, soft
volumetric glow, floating in a pure #000000 black void, no ground plane, no sky, no text.

The full-size PNG originals are in `design/renders/` (not in git, not shipped).

## Project cards

The project cards use animated canvas scenes rather than renders. A card can be switched to a
render as described below.

## Using a render in a project card

1. Save the image in `public/projects/`, e.g. `public/projects/axon.webp`.
2. In `src/data/projects.ts`, add `image` to that project:

   ```ts
   visual: 'blast',
   image: '/projects/axon.webp',
   ```

That's all. The card fades the image into black on its left and bottom edges, so the picture
does not need a clean edge there. Remove the `image` line to go back to the animated scene.

**What makes an image work here**

- Pure black background (`#000`), with the subject glowing out of it. Anything lighter shows
  as a visible rectangle.
- Subject towards the **top-right**; the left third and the bottom third get faded out.
- Landscape, about 16:9. 1600 × 900 is plenty. Export as WebP (or AVIF), under ~250 KB.
- The same palette on all four: hot pink and orange light on black.

## Prompts

Written for an image generator (Midjourney, DALL·E, Firefly, …). They share one style block so
the four images look like a set; only the subject changes.

**Shared style** — append to every prompt:

> floating in a pure black void, glowing neon pink and warm orange bioluminescent filaments,
> fine fibre-optic strands and tiny particles of light, macro 3D render, shallow depth of
> field, volumetric glow, highly detailed, dark and minimal, subject in the upper right,
> lots of empty black space on the left and bottom, 16:9, no text, no logos

**CodeAtlas** — a codebase, mapped

> A floating island of dark rock seen from the side, its surface covered in a dense network of
> glowing roots and branching paths that connect small points of light, one single path lit
> brighter than the rest winding from the base to the top

**Axon** — one change, and everything it reaches

> A single bright seed of light on the left with glowing filaments fanning out from it through
> a few junctions to many small buds on the right, some strands solid and bright orange, others
> faint dotted pink, like a nervous system or a root system branching

**Taskify** — a shared board, kept in sync

> Several thin translucent glass slabs floating in rows like tiles on a tilted plane, each
> outlined in glowing pink light, one slab lifted above the others and lit orange with a soft
> ring of light rippling outward beneath it

**SurgeMap** — demand moving through a city

> A long narrow island of dark terrain like a city seen from above at night, covered in a
> lattice of glowing threads connecting small nodes, some districts pulsing bright orange and
> others dim pink, tiny motes of light travelling along the threads

If the results come back too busy, add `sparse, restrained, mostly black`. If they come back
with a grey or blue background, add `background is pure #000000 black`.
