"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Group = { label: string; items: string[] };
type Pt = { x: number; y: number; z: number; name: string; g: number; ghost?: boolean };
type Shape = "circle" | "square" | "diamond" | "triangle";

const SHAPES: Shape[] = ["circle", "square", "diamond", "triangle"];
const COLORS = ["#ededed", "#c6ff3d", "#8d8d8d", "#9aa83f"]; // white, lime, grey, dim lime
const OUTLINE = [false, false, false, true];

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function gauss(r: () => number) {
  return Math.sqrt(-2 * Math.log(r() + 1e-9)) * Math.cos(2 * Math.PI * r());
}

function buildPoints(groups: Group[]): Pt[] {
  const r = rng(42);
  const centers = [
    [-0.62, -0.34, 0.3],
    [0.58, -0.4, -0.3],
    [-0.28, 0.5, -0.55],
    [0.38, 0.46, 0.5],
  ];
  const pts: Pt[] = [];
  groups.forEach((g, gi) => {
    const c = centers[gi % centers.length];
    g.items.forEach((name) => {
      pts.push({
        x: c[0] + gauss(r) * 0.2,
        y: c[1] + gauss(r) * 0.2,
        z: c[2] + gauss(r) * 0.2,
        name,
        g: gi,
      });
    });
    for (let k = 0; k < 26; k++) {
      pts.push({
        x: c[0] + gauss(r) * 0.27,
        y: c[1] + gauss(r) * 0.27,
        z: c[2] + gauss(r) * 0.27,
        name: "",
        g: gi,
        ghost: true,
      });
    }
  });
  return pts;
}

function drawShape(ctx: CanvasRenderingContext2D, s: Shape, x: number, y: number, r: number, hollow: boolean) {
  ctx.beginPath();
  if (s === "circle") ctx.arc(x, y, r, 0, Math.PI * 2);
  else if (s === "square") ctx.rect(x - r, y - r, r * 2, r * 2);
  else if (s === "diamond") {
    ctx.moveTo(x, y - r * 1.25);
    ctx.lineTo(x + r * 1.25, y);
    ctx.lineTo(x, y + r * 1.25);
    ctx.lineTo(x - r * 1.25, y);
    ctx.closePath();
  } else {
    ctx.moveTo(x, y - r * 1.2);
    ctx.lineTo(x + r * 1.15, y + r * 0.9);
    ctx.lineTo(x - r * 1.15, y + r * 0.9);
    ctx.closePath();
  }
  if (hollow) {
    ctx.lineWidth = 1.3;
    ctx.stroke();
  } else ctx.fill();
}

function Glyph({ g, size = 10 }: { g: number; size?: number }) {
  const c = COLORS[g % 4];
  const h = OUTLINE[g % 4];
  const s = SHAPES[g % 4];
  const common = { fill: h ? "none" : c, stroke: c, strokeWidth: 1.3 };
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 10 10" className="shrink-0">
      {s === "circle" && <circle cx="5" cy="5" r="3.6" {...common} />}
      {s === "square" && <rect x="1.4" y="1.4" width="7.2" height="7.2" {...common} />}
      {s === "diamond" && <path d="M5 0.6 9.4 5 5 9.4 0.6 5Z" {...common} />}
      {s === "triangle" && <path d="M5 0.8 9.3 8.8H0.7Z" {...common} />}
    </svg>
  );
}

export default function SkillsExplorer({ groups }: { groups: Group[] }) {
  const pts = useMemo(() => buildPoints(groups), [groups]);
  const labelled = useMemo(() => pts.filter((p) => !p.ghost), [pts]);
  const [active, setActive] = useState<string | null>(null);
  const [cluster, setCluster] = useState<number | null>(null);
  const activeRef = useRef<string | null>(null);
  const clusterRef = useRef<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const redraw = useRef<() => void>(() => {});

  useEffect(() => {
    activeRef.current = active;
    clusterRef.current = cluster;
    redraw.current();
  }, [active, cluster]);

  const groupOf = useCallback(
    (name: string | null) => (name ? (labelled.find((p) => p.name === name)?.g ?? null) : null),
    [labelled],
  );

  useEffect(() => {
    const wrap = wrapRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0,
      h = 0,
      dpr = 1;
    let yaw = 0.5,
      pitch = -0.28;
    let vel = 0;
    let dragging = false;
    let last = { x: 0, y: 0 };
    let moved = 0;
    let raf = 0;
    let visible = true;
    let proj: { p: Pt; sx: number; sy: number; s: number; d: number }[] = [];
    let hoverName: string | null = null;
    let lastT = performance.now();

    const project = (x: number, y: number, z: number) => {
      const cy = Math.cos(yaw),
        sy = Math.sin(yaw),
        cp = Math.cos(pitch),
        sp = Math.sin(pitch);
      const x1 = x * cy + z * sy;
      const z1 = -x * sy + z * cy;
      const y1 = y * cp - z1 * sp;
      const z2 = y * sp + z1 * cp;
      const f = 2.6 / (2.6 + z2);
      const scale = Math.min(w * 0.4, h * 0.44);
      return { sx: w / 2 + x1 * f * scale, sy: h / 2 + y1 * f * scale, d: z2, s: f };
    };

    const compact = () => w < 640;

    function draw() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const act = activeRef.current;
      const cl = clusterRef.current;
      const cur = hoverName ?? act;
      const curG = cur ? groupOf(cur) : null;
      const focusG = cl ?? curG;

      proj = pts.map((p) => {
        const q = project(p.x, p.y, p.z);
        return { p, sx: q.sx, sy: q.sy, s: q.s, d: q.d };
      });
      const order = [...proj].sort((a, b) => b.d - a.d);
      const base = Math.max(3.5, Math.min(w, 900) / 150);

      // cluster rings
      groups.forEach((g, gi) => {
        const m = proj.filter((q) => q.p.g === gi && !q.p.ghost);
        if (!m.length || compact()) return;
        const cx = m.reduce((a, q) => a + q.sx, 0) / m.length;
        const cyy = m.reduce((a, q) => a + q.sy, 0) / m.length;
        const rad = Math.max(...m.map((q) => Math.hypot(q.sx - cx, q.sy - cyy))) + 26;
        ctx.save();
        ctx.setLineDash([2, 5]);
        ctx.strokeStyle = COLORS[gi % 4];
        ctx.globalAlpha = focusG === null ? 0.22 : focusG === gi ? 0.5 : 0.06;
        ctx.beginPath();
        ctx.arc(cx, cyy, rad, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      });

      const labels: { q: (typeof proj)[number]; a: number }[] = [];
      for (const q of order) {
        const depth = 0.4 + 0.6 * Math.max(0, Math.min(1, (1.1 - q.d) / 2.2));
        let a = q.p.ghost ? depth * 0.35 : depth;
        const isAct = !q.p.ghost && q.p.name === cur;
        if (focusG !== null && q.p.g !== focusG) a *= 0.14;
        else if (cur && !isAct && !q.p.ghost) a *= 0.45;
        const r = (q.p.ghost ? base * 0.45 : base) * q.s * (isAct ? 1.5 : 1);
        const col = COLORS[q.p.g % 4];
        ctx.globalAlpha = Math.min(1, a);
        ctx.fillStyle = col;
        ctx.strokeStyle = col;
        if (q.p.ghost) {
          ctx.beginPath();
          ctx.arc(q.sx, q.sy, r, 0, Math.PI * 2);
          ctx.fill();
        } else {
          drawShape(ctx, SHAPES[q.p.g % 4], q.sx, q.sy, r, OUTLINE[q.p.g % 4]);
          labels.push({ q, a: Math.min(1, a) });
        }
      }
      ctx.globalAlpha = 1;

      // labels
      const showAll = !compact();
      ctx.font = `${compact() ? 10 : 11}px var(--font-dm-mono), monospace`;
      for (const { q, a } of labels) {
        if (q.p.name === cur) continue;
        if (!showAll && !(focusG !== null && q.p.g === focusG)) continue;
        ctx.globalAlpha = a * 0.75;
        ctx.fillStyle = "#ededed";
        ctx.fillText(q.p.name, q.sx + base * q.s + 5, q.sy + 3.5);
      }
      ctx.globalAlpha = 1;

      // active tag overlay
      const tag = tagRef.current;
      const aq = cur ? proj.find((q) => q.p.name === cur && !q.p.ghost) : null;
      if (tag) {
        if (aq) {
          const flip = aq.sx > w - 230;
          tag.style.opacity = "1";
          tag.style.transform = `translate(${aq.sx}px, ${aq.sy}px)`;
          const lab = tag.querySelector("[data-skill]");
          const cat = tag.querySelector("[data-cat]");
          if (lab) lab.textContent = aq.p.name;
          if (cat) cat.textContent = groups[aq.p.g]?.label ?? "";
          const box = tag.firstElementChild as HTMLElement;
          box.style.transform = flip ? "translate(calc(-100% - 16px), -50%)" : "translate(16px, -50%)";
        } else tag.style.opacity = "0";
      }
    }

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      w = r.width;
      h = r.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      draw();
    };

    redraw.current = draw;

    const tick = (t: number) => {
      const dt = Math.min(0.05, (t - lastT) / 1000);
      lastT = t;
      if (!dragging) {
        yaw += vel * dt + (hoverName || activeRef.current ? 0 : 0.09 * dt);
        vel *= 0.94;
      }
      draw();
      if (visible) raf = requestAnimationFrame(tick);
    };

    const pick = (x: number, y: number) => {
      let best: string | null = null,
        bd = (compact() ? 26 : 20) ** 2;
      for (const q of proj) {
        if (q.p.ghost) continue;
        const d = (q.sx - x) ** 2 + (q.sy - y) ** 2;
        if (d < bd) {
          bd = d;
          best = q.p.name;
        }
      }
      return best;
    };

    const local = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const down = (e: PointerEvent) => {
      dragging = true;
      moved = 0;
      last = { x: e.clientX, y: e.clientY };
      vel = 0;
      canvas.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      const l = local(e);
      if (dragging) {
        const dx = e.clientX - last.x,
          dy = e.clientY - last.y;
        moved += Math.abs(dx) + Math.abs(dy);
        yaw += dx * 0.008;
        pitch = Math.max(-1.1, Math.min(1.1, pitch - dy * 0.006));
        vel = dx * 0.32;
        last = { x: e.clientX, y: e.clientY };
        if (reduce) draw();
      } else if (e.pointerType === "mouse") {
        const n = pick(l.x, l.y);
        if (n !== hoverName) {
          hoverName = n;
          canvas.style.cursor = n ? "pointer" : "grab";
          if (reduce) draw();
        }
      }
    };
    const up = (e: PointerEvent) => {
      dragging = false;
      if (moved < 6) {
        const l = local(e);
        setActive(pick(l.x, l.y));
      }
      if (reduce) draw();
    };
    const leave = () => {
      if (hoverName) {
        hoverName = null;
        if (reduce) draw();
      }
    };

    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", up);
    canvas.addEventListener("pointerleave", leave);

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    let io: IntersectionObserver | undefined;
    if (!reduce) {
      io = new IntersectionObserver(([en]) => {
        const was = visible;
        visible = en.isIntersecting;
        if (visible && !was) {
          lastT = performance.now();
          raf = requestAnimationFrame(tick);
        }
      });
      io.observe(wrap);
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io?.disconnect();
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", up);
      canvas.removeEventListener("pointerleave", leave);
    };
  }, [pts, groups, groupOf]);

  const total = labelled.length;

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
        <p className="label">
          <span className="text-accent">embedding space</span> / illustrative layout, not a trained embedding
        </p>
        <p className="label" aria-hidden>
          dim: 3 &nbsp; points: {total} &nbsp; clusters: {groups.length}
        </p>
      </div>

      <div className="mt-8">
        <div
          ref={wrapRef}
          className="relative h-[420px] w-full overflow-hidden sm:h-[520px] lg:h-[620px]"
        >
          <canvas
            ref={canvasRef}
            role="img"
            aria-label={`Interactive 3D scatter plot of ${total} skills in ${groups.length} clusters. The same content is listed below.`}
            className="absolute inset-0 h-full w-full cursor-grab active:cursor-grabbing"
            style={{ touchAction: "pan-y" }}
          />
          <div
            ref={tagRef}
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 opacity-0 transition-opacity duration-150"
          >
            <div className="absolute left-0 top-0 whitespace-nowrap border border-accent bg-bg px-2 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-fg">
              <span data-skill className="text-accent" />
              <span className="mx-2 text-muted">/</span>
              <span data-cat className="text-muted" />
            </div>
          </div>
          <p className="label pointer-events-none absolute bottom-3 left-4" aria-hidden>
            drag to rotate
          </p>
          <p className="label pointer-events-none absolute bottom-3 right-4 hidden sm:block" aria-hidden>
            clustered by category
          </p>
        </div>
      </div>

      <ul className="mt-5 flex flex-wrap gap-x-7 gap-y-2" aria-label="Clusters">
        {groups.map((g, i) => (
          <li
            key={g.label}
            onMouseEnter={() => setCluster(i)}
            onMouseLeave={() => setCluster(null)}
            className="label flex items-center gap-2 text-fg"
          >
            <Glyph g={i} />
            <span>c{i}</span>
            <span className="text-muted">{g.label}</span>
            <span className="text-muted">n={g.items.length}</span>
          </li>
        ))}
      </ul>

      <div className="mt-20 border-t border-line">
        {groups.map((g, i) => (
          <section
            key={g.label}
            aria-labelledby={`cat-${i}`}
            className="grid gap-4 border-b border-line py-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10 md:py-10"
            onMouseEnter={() => setCluster(i)}
            onMouseLeave={() => setCluster(null)}
          >
            <div>
              <p className="label flex items-center gap-2">
                <Glyph g={i} />
                <span>c{i}</span>
              </p>
              <h2 id={`cat-${i}`} className="font-display mt-3 text-3xl text-fg sm:text-4xl">
                {g.label}
              </h2>
            </div>
            <ul className="flex flex-wrap items-baseline gap-y-2 font-mono text-[13px] leading-7 sm:text-sm">
              {g.items.map((it, k) => (
                <li key={it} className="flex items-baseline">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(it)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(it)}
                    onBlur={() => setActive(null)}
                    className={`cursor-default text-left transition-colors hover:text-accent focus-visible:text-accent ${
                      active === it ? "text-accent" : "text-fg/85"
                    }`}
                  >
                    {it}
                  </button>
                  {k < g.items.length - 1 && (
                    <span aria-hidden className="mx-2 text-line-strong">
                      ,
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
