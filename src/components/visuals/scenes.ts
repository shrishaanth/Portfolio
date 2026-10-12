import type { Scene } from '../../hooks/useCanvas';
import { clamp01, DUST, ease, glow, glowStroke, HOT, ORANGE, PINK, rng, warm } from './paint';

/* ------------------------------------------------------------------ *
 *  CodeAtlas — an import graph in layers, with a "reading order"
 *  lighting up one file at a time, foundations first.
 * ------------------------------------------------------------------ */
export const graphScene: Scene = (w, h) => {
  const rand = rng(11);
  const layers = [3, 5, 6, 5, 3];
  const nodes: { x: number; y: number; layer: number; phase: number }[] = [];
  layers.forEach((count, layer) => {
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: w * (0.16 + (0.7 * layer) / (layers.length - 1)) + (rand() - 0.5) * w * 0.05,
        y: h * (0.14 + (0.72 * (i + 0.5)) / count) + (rand() - 0.5) * h * 0.07,
        layer,
        phase: rand() * Math.PI * 2,
      });
    }
  });

  // every file imports one or two files from the layer below it
  const edges: [number, number][] = [];
  nodes.forEach((n, i) => {
    if (n.layer === 0) return;
    const below = nodes.map((m, j) => (m.layer === n.layer - 1 ? j : -1)).filter((j) => j >= 0);
    const first = below[Math.floor(rand() * below.length)];
    edges.push([first, i]);
    const second = below[Math.floor(rand() * below.length)];
    if (second !== first && rand() < 0.6) edges.push([second, i]);
  });

  // the reading order: one chain from the foundation layer up to the entry point
  const path: number[] = [];
  let at = nodes.findIndex((n) => n.layer === layers.length - 1);
  path.unshift(at);
  while (nodes[at].layer > 0) {
    at = edges.find(([, to]) => to === at)![0];
    path.unshift(at);
  }

  const STEP = 950;
  const cycle = (path.length + 2.5) * STEP;

  return (ctx, t) => {
    ctx.globalCompositeOperation = 'lighter';
    const pos = nodes.map((n) => ({
      x: n.x + Math.sin(t / 1900 + n.phase) * 3,
      y: n.y + Math.cos(t / 2300 + n.phase) * 3,
    }));
    const progress = (t % cycle) / STEP;
    const fade = clamp01((cycle / STEP - progress) / 1.2);

    const curve = (a: number, b: number, upTo = 1) => {
      const p = pos[a];
      const q = pos[b];
      const cx = (p.x + q.x) / 2;
      const cy = (p.y + q.y) / 2 - (q.x - p.x) * 0.12;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      for (let s = 1; s <= 14; s++) {
        const k = (s / 14) * upTo;
        const u = 1 - k;
        ctx.lineTo(
          u * u * p.x + 2 * u * k * cx + k * k * q.x,
          u * u * p.y + 2 * u * k * cy + k * k * q.y,
        );
      }
    };

    for (const [a, b] of edges) {
      curve(a, b);
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${PINK}, 0.3)`;
      ctx.stroke();
    }
    for (let k = 0; k < path.length - 1; k++) {
      const lit = clamp01(progress - k - 0.4);
      if (lit <= 0) continue;
      curve(path[k], path[k + 1], ease(lit));
      glowStroke(ctx, ORANGE, 0.95 * fade, 1.6);
    }

    nodes.forEach((_, i) => {
      const order = path.indexOf(i);
      const lit = order >= 0 ? clamp01(progress - order + 0.4) * fade : 0;
      const { x, y } = pos[i];
      glow(ctx, x, y, 13 + lit * 16, lit > 0 ? ORANGE : PINK, 0.62 + lit * 0.38);
      glow(ctx, x, y, 3.5, lit > 0 ? HOT : PINK, 0.9);
    });
  };
};

/* ------------------------------------------------------------------ *
 *  Axon — blast radius. A change fires; the operations it touches and
 *  the clients behind them light up. Solid = observed in traffic,
 *  dashed = only potentially affected (the README's central caveat).
 * ------------------------------------------------------------------ */
export const blastScene: Scene = (w, h) => {
  const rand = rng(5);
  const column = (x: number, n: number, pad: number) =>
    Array.from({ length: n }, (_, i) => ({
      x: w * x,
      y: h * (pad + ((1 - 2 * pad) * (i + 0.5)) / n),
    }));
  const changes = column(0.2, 3, 0.2);
  const ops = column(0.52, 5, 0.1);
  const clients = column(0.84, 8, 0.06);

  const touches = [[0, 1], [2], [3, 4]];
  const callers = ops.map(() => {
    const out: { client: number; observed: boolean }[] = [];
    clients.forEach((_, c) => {
      if (rand() < 0.42) out.push({ client: c, observed: rand() < 0.55 });
    });
    return out.length ? out : [{ client: Math.floor(rand() * clients.length), observed: true }];
  });

  const PERIOD = 3400;

  return (ctx, t) => {
    ctx.globalCompositeOperation = 'lighter';
    const active = Math.floor(t / PERIOD) % changes.length;
    const p = (t % PERIOD) / PERIOD;
    const out = clamp01((1 - p) / 0.14); // fade the whole burst out at the end
    const reach1 = ease(clamp01(p / 0.26));
    const reach2 = ease(clamp01((p - 0.24) / 0.3));

    const line = (a: { x: number; y: number }, b: { x: number; y: number }, upTo = 1) => {
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      const mx = (a.x + b.x) / 2;
      const steps = 16;
      for (let s = 1; s <= steps; s++) {
        const k = (s / steps) * upTo;
        const u = 1 - k;
        // cubic with horizontal handles, so links leave and arrive level
        const x = u * u * u * a.x + 3 * u * u * k * mx + 3 * u * k * k * mx + k * k * k * b.x;
        const y = u * u * u * a.y + 3 * u * u * k * a.y + 3 * u * k * k * b.y + k * k * k * b.y;
        ctx.lineTo(x, y);
      }
    };

    // the whole dependency structure, dim
    ctx.lineWidth = 1;
    ctx.strokeStyle = `rgba(${PINK}, 0.11)`;
    touches.forEach((list, c) => list.forEach((o) => (line(changes[c], ops[o]), ctx.stroke())));
    callers.forEach((list, o) =>
      list.forEach((l) => (line(ops[o], clients[l.client]), ctx.stroke())),
    );

    // the active change's blast radius
    const hit = new Map<number, boolean>();
    for (const o of touches[active]) {
      line(changes[active], ops[o], reach1);
      glowStroke(ctx, ORANGE, 0.9 * out, 1.5);
      for (const l of callers[o]) {
        if (reach2 > 0) {
          ctx.setLineDash(l.observed ? [] : [4, 5]);
          line(ops[o], clients[l.client], reach2);
          glowStroke(ctx, l.observed ? ORANGE : PINK, (l.observed ? 0.9 : 0.6) * out, 1.3);
          ctx.setLineDash([]);
        }
        hit.set(l.client, (hit.get(l.client) ?? false) || l.observed);
      }
    }

    changes.forEach((c, i) => {
      const on = i === active ? out : 0;
      glow(ctx, c.x, c.y, 12 + on * 16, on ? ORANGE : PINK, 0.45 + on * 0.55);
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(Math.PI / 4);
      ctx.fillStyle = `rgba(${on ? HOT : PINK}, 0.95)`;
      ctx.fillRect(-4, -4, 8, 8);
      ctx.restore();
    });
    ops.forEach((o, i) => {
      const on = touches[active].includes(i) ? reach1 * out : 0;
      glow(ctx, o.x, o.y, 9 + on * 12, on ? ORANGE : PINK, 0.45 + on * 0.5);
      glow(ctx, o.x, o.y, 3.5, on ? HOT : PINK, 0.9);
    });
    clients.forEach((c, i) => {
      const observed = hit.get(i);
      const on = observed === undefined ? 0 : reach2 * out;
      const rgb = on ? (observed ? ORANGE : PINK) : PINK;
      glow(ctx, c.x, c.y, 7 + on * (observed ? 15 : 8), rgb, 0.35 + on * 0.6);
      glow(ctx, c.x, c.y, 3, on && observed ? HOT : PINK, 0.85);
    });
  };
};

/* ------------------------------------------------------------------ *
 *  Taskify — a Kanban board seen at an angle. One card moves between
 *  columns and a ripple goes out as the move syncs to everyone else.
 * ------------------------------------------------------------------ */
export const boardScene: Scene = (w, h) => {
  const stacks = [3, 2, 3, 1];
  const colW = Math.min(w * 0.155, 100);
  const gap = colW * 0.16;
  const cardH = colW * 0.36;
  const cardGap = cardH * 0.34;
  const total = stacks.length * colW + (stacks.length - 1) * gap;
  const colX = (c: number) => -total / 2 + c * (colW + gap);
  const slotY = (s: number) => -cardH * 2.2 + s * (cardH + cardGap);

  // the travelling card visits one free slot per column, then loops
  const stops = stacks.map((n, c) => ({ x: colX(c), y: slotY(n) }));
  const REST = 1500;
  const MOVE = 950;
  const LEG = REST + MOVE;

  return (ctx, t) => {
    ctx.globalCompositeOperation = 'lighter';
    ctx.save();
    ctx.translate(w * 0.5, h * 0.54);
    ctx.transform(1, -0.16, 0.34, 0.86, 0, 0); // tilt the board away from the viewer

    const box = (x: number, y: number, bw: number, bh: number) => {
      ctx.beginPath();
      ctx.roundRect(x, y, bw, bh, 4);
    };

    stacks.forEach((n, c) => {
      const x = colX(c);
      // column header rule and its frame
      ctx.beginPath();
      ctx.moveTo(x, slotY(0) - cardGap * 1.4);
      ctx.lineTo(x + colW * 0.5, slotY(0) - cardGap * 1.4);
      glowStroke(ctx, PINK, 0.55, 1.4);
      box(x - gap * 0.3, slotY(0) - cardGap * 2.6, colW + gap * 0.6, cardH * 5.9);
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${PINK}, 0.14)`;
      ctx.stroke();

      for (let s = 0; s < n; s++) {
        box(x, slotY(s), colW, cardH);
        ctx.fillStyle = `rgba(${PINK}, 0.045)`;
        ctx.fill();
        glowStroke(ctx, PINK, 0.42, 1);
        // a line of "text" on the card
        ctx.beginPath();
        ctx.moveTo(x + colW * 0.12, slotY(s) + cardH * 0.5);
        ctx.lineTo(x + colW * (0.45 + ((c + s) % 3) * 0.12), slotY(s) + cardH * 0.5);
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = `rgba(${PINK}, 0.3)`;
        ctx.stroke();
      }
    });

    const leg = Math.floor(t / LEG) % stops.length;
    const local = t % LEG;
    const from = stops[leg];
    const to = stops[(leg + 1) % stops.length];
    const k = ease(clamp01((local - REST) / MOVE));
    const x = from.x + (to.x - from.x) * k;
    // lift the card off the board mid-move
    const y = from.y + (to.y - from.y) * k - Math.sin(k * Math.PI) * cardH * 0.9;

    // ripple from where the card last landed
    const since = local / 1200;
    if (since < 1) {
      ctx.beginPath();
      ctx.ellipse(
        from.x + colW / 2,
        from.y + cardH / 2,
        colW * (0.5 + since * 1.1),
        cardH * (0.7 + since * 1.6),
        0,
        0,
        Math.PI * 2,
      );
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = `rgba(${ORANGE}, ${0.55 * (1 - since)})`;
      ctx.stroke();
    }

    glow(ctx, x + colW / 2, y + cardH / 2, colW * 0.95, ORANGE, 0.34);
    box(x, y, colW, cardH);
    ctx.fillStyle = `rgba(${ORANGE}, 0.16)`;
    ctx.fill();
    glowStroke(ctx, ORANGE, 1, 1.5);
    ctx.beginPath();
    ctx.moveTo(x + colW * 0.12, y + cardH * 0.5);
    ctx.lineTo(x + colW * 0.62, y + cardH * 0.5);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = `rgba(${HOT}, 0.85)`;
    ctx.stroke();

    ctx.restore();
  };
};

/* ------------------------------------------------------------------ *
 *  SurgeMap — taxi zones as a graph. Demand rises and falls in waves
 *  (pink = quiet, orange = surging) while trips flow along the edges.
 * ------------------------------------------------------------------ */
export const zonesScene: Scene = (w, h) => {
  const rand = rng(23);
  const rows = 5;
  const cols = 10;
  const index = new Map<string, number>();
  const zones: { x: number; y: number; u: number }[] = [];
  const angle = -0.42;
  const sx = (w * 0.86) / cols;
  const sy = (h * 0.94) / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // trim the corners into a long, island-like outline
      const edge = Math.min(c, cols - 1 - c);
      if ((r === 0 || r === rows - 1) && edge < 2) continue;
      if (rand() < 0.07) continue;
      const gx = (c - (cols - 1) / 2) * sx + (rand() - 0.5) * sx * 0.5;
      const gy = (r - (rows - 1) / 2) * sy * 0.62 + (rand() - 0.5) * sy * 0.32;
      index.set(`${r},${c}`, zones.length);
      zones.push({
        x: w * 0.52 + gx * Math.cos(angle) - gy * Math.sin(angle),
        y: h * 0.5 + gx * Math.sin(angle) + gy * Math.cos(angle),
        u: c / cols + r * 0.07,
      });
    }
  }

  const edges: [number, number][] = [];
  index.forEach((i, key) => {
    const [r, c] = key.split(',').map(Number);
    const right = index.get(`${r},${c + 1}`);
    const down = index.get(`${r + 1},${c}`);
    if (right !== undefined) edges.push([i, right]);
    if (down !== undefined) edges.push([i, down]);
  });
  const outgoing = zones.map((_, i) => edges.filter(([a, b]) => a === i || b === i));

  // trips: each walks from zone to neighbouring zone, forever
  const TRIP = 1300;
  const trips = Array.from({ length: 16 }, () => {
    const from = Math.floor(rand() * zones.length);
    return { from, to: from, start: -rand() * TRIP, seed: rand() };
  });
  const hop = (trip: (typeof trips)[number], now: number) => {
    const options = outgoing[trip.to];
    trip.from = trip.to;
    if (options.length) {
      const [a, b] = options[Math.floor(rand() * options.length)];
      trip.to = a === trip.from ? b : a;
    }
    trip.start = now;
  };

  return (ctx, t) => {
    ctx.globalCompositeOperation = 'lighter';
    const demand = zones.map(
      (z) => 0.5 + 0.34 * Math.sin(z.u * 7 - t / 1100) + 0.16 * Math.sin(z.u * 17 + t / 700),
    );

    for (const [a, b] of edges) {
      const level = (demand[a] + demand[b]) / 2;
      ctx.beginPath();
      ctx.moveTo(zones[a].x, zones[a].y);
      ctx.lineTo(zones[b].x, zones[b].y);
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${warm(level)}, ${0.16 + level * 0.3})`;
      ctx.stroke();
    }

    zones.forEach((z, i) => {
      const d = clamp01(demand[i]);
      glow(ctx, z.x, z.y, 9 + d * d * 26, warm(d), 0.38 + d * 0.6);
      glow(ctx, z.x, z.y, 2.6 + d * 1.6, d > 0.72 ? HOT : warm(d), 0.9);
    });

    for (const trip of trips) {
      let k = (t - trip.start) / TRIP;
      if (k >= 1) {
        hop(trip, t);
        k = 0;
      }
      if (trip.from === trip.to || k < 0) continue;
      const a = zones[trip.from];
      const b = zones[trip.to];
      const e = ease(k);
      glow(ctx, a.x + (b.x - a.x) * e, a.y + (b.y - a.y) * e, 5, HOT, 0.75 * Math.sin(k * Math.PI));
    }
  };
};

/* ------------------------------------------------------------------ *
 *  Dust — pale specks drifting across a card, shifting slightly with
 *  the pointer so nearer ones move more.
 * ------------------------------------------------------------------ */
export const dustScene: Scene = (w, h) => {
  const rand = rng(Math.round(w * 3 + h));
  const count = Math.round(Math.min(64, Math.max(18, (w * h) / 11000)));
  const specks = Array.from({ length: count }, () => {
    const depth = rand();
    return {
      x: rand(),
      y: rand(),
      r: 0.6 + depth * 1.9,
      alpha: 0.1 + depth * 0.34,
      vx: (rand() - 0.5) * 0.000006,
      vy: -(0.000003 + rand() * 0.000007),
      depth,
      phase: rand() * Math.PI * 2,
    };
  });
  const wrap = (v: number) => ((v % 1) + 1) % 1;
  let px = 0;
  let py = 0;

  return (ctx, t, pointer) => {
    // ease toward the pointer so the parallax never jumps
    px += (Math.min(1.5, Math.max(-0.5, pointer.x)) - 0.5 - px) * 0.04;
    py += (Math.min(1.5, Math.max(-0.5, pointer.y)) - 0.5 - py) * 0.04;
    for (const s of specks) {
      const x = wrap(s.x + s.vx * t) * w - px * s.depth * 26;
      const y = wrap(s.y + s.vy * t) * h - py * s.depth * 26;
      ctx.beginPath();
      ctx.arc(x, y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${DUST}, ${s.alpha * (0.65 + 0.35 * Math.sin(t / 1400 + s.phase))})`;
      ctx.fill();
    }
  };
};
