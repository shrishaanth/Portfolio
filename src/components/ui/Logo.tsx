// The S mark: three shapes on 45-degree lines. Also in public/logo.svg and public/favicon.svg.
export const LOGO_PATH =
  'M52.25 0 26.25 26 39 38.75 52.25 25.5 78.75 52H104.25Z' +
  'M12.75 39.5 102.75 129.5 52.75 179.5H27.25L77.25 129.5 0 52.25Z' +
  'M2.75 129.5H28.25L41.25 142.5 28.5 155.25Z';

/** The mark, sized by height. It is about 0.58 times as wide as it is tall. */
export default function Logo({ height = 28, className }: { height?: number; className?: string }) {
  return (
    <svg
      className={className}
      height={height}
      width={(height * 104.25) / 179.5}
      viewBox="0 0 104.25 179.5"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d={LOGO_PATH} />
    </svg>
  );
}
