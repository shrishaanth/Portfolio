// Deliberate, unhurried glide — easeInOutCubic over a fixed duration,
// used by the nav's click-to-scroll (never by the browser's native smooth
// scroll, which is too fast for the bubble to visibly keep pace with).

export function glideTo(targetY: number, duration: number, done?: () => void): void {
  const startY = window.pageYOffset;
  const delta = targetY - startY;
  if (Math.abs(delta) < 2) {
    done?.();
    return;
  }
  let t0: number | null = null;
  function frame(ts: number) {
    if (t0 === null) t0 = ts;
    const p = Math.min((ts - t0) / duration, 1);
    const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
    window.scrollTo(0, startY + delta * e);
    if (p < 1) requestAnimationFrame(frame);
    else done?.();
  }
  requestAnimationFrame(frame);
}
