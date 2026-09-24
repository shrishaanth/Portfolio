import type { CSSProperties } from 'react';

/** Stagger index for a diagram group — groups fade/draw in one after another. */
export const at = (i: number) => ({ '--i': i }) as CSSProperties;
