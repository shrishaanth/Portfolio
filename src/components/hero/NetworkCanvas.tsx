import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../../lib/env';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}
interface Pulse {
  a: number;
  b: number;
  t: number;
}

const LINK = 150;
const LINK2 = LINK * LINK;
const REACH = 220;
const INK = '243, 238, 230';
const EMBER = '255, 106, 43';

/**
 * A drifting node graph with "messages" passing along its edges — a nod to
 * the graph work in SurgeMap. Edges near the pointer light up and nodes lean
 * toward it. Pauses offscreen / in background tabs; static under reduced motion.
 */
export default function NetworkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const still = prefersReducedMotion();
    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    let edges: [number, number][] = [];
    const pulses: Pulse[] = [];
    const mouse = { x: -1e4, y: -1e4 };
    let raf = 0;
    let last = 0;
    let spawnIn = 0;
    let onScreen = true;

    const makeNode = (): Node => {
      const a = Math.random() * Math.PI * 2;
      const s = 0.06 + Math.random() * 0.12;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s,
        r: 1 + Math.random() * 1.6,
      };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.max(28, Math.min(120, Math.round((w * h) / 12500)));
      nodes = nodes.filter((n) => n.x <= w && n.y <= h).slice(0, target);
      while (nodes.length < target) nodes.push(makeNode());
      pulses.length = 0;
      if (still) draw();
    };

    const step = (dt: number) => {
      for (const n of nodes) {
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < REACH * REACH) {
          const f = (1 - Math.sqrt(d2) / REACH) * 0.00006 * dt;
          n.vx += dx * f;
          n.vy += dy * f;
        }
        // settle back toward cruising speed
        const sp = Math.hypot(n.vx, n.vy);
        if (sp > 0.22) {
          n.vx *= 0.97;
          n.vy *= 0.97;
        }
        n.x += n.vx * dt * 0.06;
        n.y += n.vy * dt * 0.06;
        if (n.x < -20) n.x = w + 20;
        else if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        else if (n.y > h + 20) n.y = -20;
      }

      spawnIn -= dt;
      if (spawnIn <= 0 && edges.length) {
        const [a, b] = edges[(Math.random() * edges.length) | 0];
        pulses.push(Math.random() < 0.5 ? { a, b, t: 0 } : { a: b, b: a, t: 0 });
        spawnIn = 260 + Math.random() * 420;
      }
      for (let i = pulses.length - 1; i >= 0; i--) {
        pulses[i].t += dt / 1100;
        if (pulses[i].t >= 1) pulses.splice(i, 1);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      edges = [];
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK2) continue;
          edges.push([i, j]);
          const fade = 1 - Math.sqrt(d2) / LINK;
          const mx = (a.x + b.x) / 2 - mouse.x;
          const my = (a.y + b.y) / 2 - mouse.y;
          const near = Math.max(0, 1 - Math.hypot(mx, my) / REACH);
          ctx.strokeStyle =
            near > 0
              ? `rgba(${EMBER}, ${(fade * (0.12 + near * 0.6)).toFixed(3)})`
              : `rgba(${INK}, ${(fade * 0.11).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        const near = Math.max(0, 1 - Math.hypot(n.x - mouse.x, n.y - mouse.y) / REACH);
        ctx.fillStyle = near > 0 ? `rgba(${EMBER}, ${0.35 + near * 0.65})` : `rgba(${INK}, 0.32)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + near * 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const p of pulses) {
        const a = nodes[p.a];
        const b = nodes[p.b];
        if (!a || !b) continue;
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const alpha = Math.sin(p.t * Math.PI);
        const g = ctx.createRadialGradient(x, y, 0, x, y, 9);
        g.addColorStop(0, `rgba(${EMBER}, ${alpha})`);
        g.addColorStop(1, `rgba(${EMBER}, 0)`);
        ctx.fillStyle = g;
        ctx.fillRect(x - 9, y - 9, 18, 18);
      }
    };

    const loop = (ts: number) => {
      const dt = Math.min(ts - (last || ts), 48);
      last = ts;
      step(dt);
      draw();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (still || raf || !onScreen || document.hidden) return;
      last = 0;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onOut = () => {
      mouse.x = mouse.y = -1e4;
    };
    const onVis = () => (document.hidden ? stop() : start());

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    io.observe(canvas);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onOut);
    document.addEventListener('visibilitychange', onVis);
    resize();
    start();
    canvas.classList.add('is-ready');

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onOut);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return <canvas className="hero__canvas" ref={ref} aria-hidden="true" />;
}
