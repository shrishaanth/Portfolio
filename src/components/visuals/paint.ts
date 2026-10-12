// Shared drawing helpers for the project visuals: palette, a seeded RNG (so every
// layout is the same on each visit), and cheap glows drawn from a cached sprite.

export const PINK = '255, 92, 170';
export const ORANGE = '255, 156, 82';
export const HOT = '255, 226, 200';
export const DUST = '236, 232, 226';

/** Blend from pink (0) to orange (1), as an "r, g, b" string. */
export function warm(a: number): string {
  const k = Math.min(1, Math.max(0, a));
  return `255, ${Math.round(92 + (156 - 92) * k)}, ${Math.round(170 + (82 - 170) * k)}`;
}

/** mulberry32 — small deterministic PRNG. */
export function rng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let x = Math.imul(s ^ (s >>> 15), 1 | s);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

export const ease = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

const sprites = new Map<string, HTMLCanvasElement>();
function sprite(rgb: string): HTMLCanvasElement {
  let c = sprites.get(rgb);
  if (!c) {
    c = document.createElement('canvas');
    c.width = c.height = 64;
    const g = c.getContext('2d')!;
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, `rgba(${rgb}, 1)`);
    grad.addColorStop(0.22, `rgba(${rgb}, 0.42)`);
    grad.addColorStop(1, `rgba(${rgb}, 0)`);
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
    sprites.set(rgb, c);
  }
  return c;
}

/** A soft round glow of radius `r`. Far cheaper than shadowBlur. */
export function glow(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  rgb: string,
  alpha = 1,
): void {
  if (alpha <= 0 || r <= 0) return;
  ctx.globalAlpha = Math.min(1, alpha);
  ctx.drawImage(sprite(rgb), x - r, y - r, r * 2, r * 2);
  ctx.globalAlpha = 1;
}

/** Strokes the current path as a glowing line: a wide faint pass under a thin bright one. */
export function glowStroke(ctx: CanvasRenderingContext2D, rgb: string, alpha: number, width = 1.2) {
  ctx.lineWidth = width * 5;
  ctx.strokeStyle = `rgba(${rgb}, ${alpha * 0.16})`;
  ctx.stroke();
  ctx.lineWidth = width;
  ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
  ctx.stroke();
}
