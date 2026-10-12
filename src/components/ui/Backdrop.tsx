// Intrinsic pixel sizes of the files in public/backdrops/, so the browser can
// reserve the right space before each image loads.
const SIZES = {
  hero: [836, 940],
  about: [896, 1024],
  approach: [2172, 390],
  contact: [2172, 284],
} as const;

/**
 * A decorative render for a section. `name` is a file in public/backdrops/
 * (without extension) and also picks the placement: `hero` and `about` are
 * objects floating on the right, `approach` and `contact` are wide strips.
 * See the `.backdrop--<name>` rules in sections.css.
 */
export default function Backdrop({
  name,
  eager = false,
}: {
  name: keyof typeof SIZES;
  /** Load immediately rather than lazily — for the one above the fold. */
  eager?: boolean;
}) {
  const [width, height] = SIZES[name];
  return (
    <div className={`backdrop backdrop--${name}`} aria-hidden="true">
      <img
        src={`/backdrops/${name}.webp`}
        alt=""
        width={width}
        height={height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
  );
}
