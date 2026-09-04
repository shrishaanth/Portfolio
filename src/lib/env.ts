// Small matchMedia helpers shared by the interaction hooks. Each reads the
// media query once at call time — none of the original vanilla-JS behaviour
// listened for the query changing mid-session, so neither do these.

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function canHover(): boolean {
  return window.matchMedia('(hover: hover)').matches;
}

export function hasFinePointer(): boolean {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}
