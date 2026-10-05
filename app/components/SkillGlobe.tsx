"use client";

import { useEffect, useMemo, useRef } from "react";

type Group = { label: string; items: string[] };

export const GROUP_COLORS = ["#6ee7b7", "#7dd3fc", "#fcd34d", "#c4b5fd", "#fda4af"];

const AUTO_SPEED = 0.0035;
const LAT_LINES = 7;
const LON_LINES = 10;
const SEGMENTS = 64;

export default function SkillGlobe({ groups }: { groups: Group[] }) {
  const box = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const nodes = useRef<(HTMLLIElement | null)[]>([]);

  const points = useMemo(() => {
    const flat = groups.flatMap((g, gi) =>
      g.items.map((label) => ({ label, color: GROUP_COLORS[gi % GROUP_COLORS.length] })),
    );
    const n = flat.length;
    const golden = Math.PI * (3 - Math.sqrt(5));
    return flat.map((item, i) => {
      const y = n === 1 ? 0 : 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      return { ...item, x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
    });
  }, [groups]);

  useEffect(() => {
    const el = box.current;
    const cv = canvas.current;
    if (!el || !cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let yaw = 0.4;
    let pitch = 0.3;
    let velYaw = reduced ? 0 : AUTO_SPEED;
    let velPitch = 0;
    let dragging = false;
    let hovering = false;
    let lastX = 0;
    let lastY = 0;
    let raf = 0;
    let dpr = 1;
    let W = 0;
    let H = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = el.clientWidth;
      H = el.clientHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
      cv.style.width = `${W}px`;
      cv.style.height = `${H}px`;
    };

    const rotate = (x: number, y: number, z: number, cy: number, sy: number, cp: number, sp: number) => {
      const x1 = x * cy + z * sy;
      const z1 = -x * sy + z * cy;
      return { x: x1, y: y * cp - z1 * sp, z: y * sp + z1 * cp };
    };

    const render = () => {
      const radius = Math.max(80, Math.min(W * 0.36, H / 2 - 44));
      const cx = W / 2;
      const cyy = H / 2;
      const cy = Math.cos(yaw);
      const sy = Math.sin(yaw);
      const cp = Math.cos(pitch);
      const sp = Math.sin(pitch);

      // Wireframe sphere behind the skills
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const glow = ctx.createRadialGradient(cx, cyy, radius * 0.1, cx, cyy, radius * 1.15);
      glow.addColorStop(0, "rgba(52,211,153,0.10)");
      glow.addColorStop(0.7, "rgba(52,211,153,0.04)");
      glow.addColorStop(1, "rgba(52,211,153,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cyy, radius * 1.15, 0, Math.PI * 2);
      ctx.fill();

      ctx.lineWidth = 1;
      const strokeCurve = (fn: (t: number) => [number, number, number]) => {
        let prev: { x: number; y: number; z: number } | null = null;
        for (let s = 0; s <= SEGMENTS; s++) {
          const [x, y, z] = fn(s / SEGMENTS);
          const p = rotate(x, y, z, cy, sy, cp, sp);
          if (prev) {
            const depth = (p.z + prev.z) / 4 + 0.5;
            ctx.strokeStyle = `rgba(110,231,183,${(0.04 + depth * 0.2).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(cx + prev.x * radius, cyy + prev.y * radius);
            ctx.lineTo(cx + p.x * radius, cyy + p.y * radius);
            ctx.stroke();
          }
          prev = p;
        }
      };
      for (let i = 1; i <= LAT_LINES; i++) {
        const lat = (i / (LAT_LINES + 1)) * Math.PI - Math.PI / 2;
        strokeCurve((t) => [Math.cos(lat) * Math.cos(t * Math.PI * 2), Math.sin(lat), Math.cos(lat) * Math.sin(t * Math.PI * 2)]);
      }
      for (let i = 0; i < LON_LINES; i++) {
        const lon = (i / LON_LINES) * Math.PI;
        strokeCurve((t) => {
          const a = t * Math.PI * 2;
          return [Math.cos(a) * Math.cos(lon), Math.sin(a), Math.cos(a) * Math.sin(lon)];
        });
      }

      // Skill chips
      points.forEach((p, i) => {
        const node = nodes.current[i];
        if (!node) return;
        const r = rotate(p.x, p.y, p.z, cy, sy, cp, sp);
        const depth = (r.z + 1) / 2; // 0 back .. 1 front
        const scale = 0.6 + depth * 0.55;
        node.style.transform = `translate(-50%, -50%) translate(${(r.x * radius).toFixed(1)}px, ${(r.y * radius).toFixed(1)}px) scale(${scale.toFixed(3)})`;
        node.style.opacity = String(0.25 + depth * 0.75);
        node.style.zIndex = String(Math.round(depth * 100));
      });
    };

    const tick = () => {
      if (!dragging) {
        const target = reduced || hovering ? 0 : AUTO_SPEED;
        velYaw += (target - velYaw) * 0.05;
        velPitch *= 0.92;
      }
      yaw += velYaw;
      pitch = Math.max(-1.1, Math.min(1.1, pitch + velPitch));
      render();
      raf = requestAnimationFrame(tick);
    };

    const down = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      velYaw = (e.clientX - lastX) * 0.006;
      velPitch = -(e.clientY - lastY) * 0.004;
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const up = () => {
      dragging = false;
    };
    const enter = () => {
      hovering = true;
    };
    const leave = () => {
      hovering = false;
    };

    const ro = new ResizeObserver(() => {
      resize();
      render();
    });
    ro.observe(el);
    resize();
    render();
    raf = requestAnimationFrame(tick);

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
    };
  }, [points]);

  return (
    <div>
      <div
        ref={box}
        aria-label="Interactive skill globe. Drag to rotate."
        className="relative mx-auto h-[23rem] w-full max-w-5xl cursor-grab select-none touch-pan-y active:cursor-grabbing sm:h-[38rem]"
      >
        <canvas ref={canvas} aria-hidden className="pointer-events-none absolute inset-0" />
        <ul className="absolute inset-0 m-0 list-none p-0">
          {points.map((p, i) => (
            <li
              key={`${p.label}-${i}`}
              ref={(n) => {
                nodes.current[i] = n;
              }}
              style={{ borderColor: `${p.color}66`, color: p.color, opacity: 0 }}
              className="absolute left-1/2 top-1/2 whitespace-nowrap rounded-full border bg-stone-950/75 px-2 py-0.5 text-[11px] font-medium will-change-transform sm:px-3.5 sm:py-1.5 sm:text-sm"
            >
              {p.label}
            </li>
          ))}
        </ul>
      </div>

      <ul className="mt-2 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-stone-300">
        {groups.map((g, gi) => (
          <li key={g.label} className="flex items-center gap-2">
            <span
              aria-hidden
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: GROUP_COLORS[gi % GROUP_COLORS.length] }}
            />
            {g.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
