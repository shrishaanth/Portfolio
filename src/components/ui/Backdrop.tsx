/**
 * A decorative render behind a section's content, in the empty space on its right.
 * `name` is a file in public/backdrops/ (without extension) and also picks the
 * placement: see the `.backdrop--<name>` rules in sections.css.
 */
export default function Backdrop({
  name,
  eager = false,
}: {
  name: 'branches' | 'tiles' | 'lattice' | 'island';
  /** Load immediately rather than lazily — for the one above the fold. */
  eager?: boolean;
}) {
  return (
    <div className={`backdrop backdrop--${name}`} aria-hidden="true">
      <img
        src={`/backdrops/${name}.webp`}
        alt=""
        width={1600}
        height={900}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
  );
}
