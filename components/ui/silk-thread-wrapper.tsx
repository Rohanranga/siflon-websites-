"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";

interface SilkThreadWrapperProps {
  children: React.ReactElement;
  /** How far from the element, in pixels, the pointer is noticed. Default 140. */
  reach?: number;
  /** Number of threads. Default 5. */
  threads?: number;
  /** Thread color. Default inherits from parent. */
  threadColor?: string;
}

/**
 * SilkThreadWrapper - Adds the "silk thread" pointer interaction effect to any button/element.
 *
 * Wraps a child element and draws silk threads from its edges toward the pointer
 * when the pointer is within `reach` distance.
 *
 * Usage:
 *   <SilkThreadWrapper reach={120} threads={4}>
 *     <button className="my-button">Hover me</button>
 *   </SilkThreadWrapper>
 */
export const SilkThreadWrapper = React.forwardRef<HTMLSpanElement, SilkThreadWrapperProps>(
  function SilkThreadWrapper({ children, reach = 140, threads = 5, threadColor }, ref) {
    const reduced = useReducedMotion();
    const wrapperRef = React.useRef<HTMLSpanElement>(null);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const childRef = React.useRef<HTMLElement>(null);

    // Set refs on wrapper
    React.useImperativeHandle(ref, () => wrapperRef.current!);

    React.useEffect(() => {
      const wrap = wrapperRef.current;
      const cv = canvasRef.current;
      const child = childRef.current;
      const ctx = cv?.getContext("2d");
      if (reduced || !wrap || !cv || !ctx || !child) return;

      const n = Math.max(1, Math.round(threads));
      const pad = reach + 24;
      let w = 0;
      let h = 0;
      let dpr = 1;
      let ink = threadColor || "#000";
      let active = false;
      let ext = 0;
      let raf = 0;
      const pointer = { x: 0, y: 0, known: false };
      const hold = { x: 0, y: 0 };
      const list: Array<{
        pts: Array<{ x: number; y: number; px: number; py: number }>;
        lag: number;
        ax: number;
        ay: number;
        seeded: boolean;
      }> = Array.from({ length: n }, (_, i) => ({
        pts: Array.from({ length: 16 }, () => ({ x: 0, y: 0, px: 0, py: 0 })),
        lag: 0.14 + (((i * 37) % 10) / 10) * 0.22,
        ax: 0,
        ay: 0,
        seeded: false,
      }));

      const measure = () => {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = child.offsetWidth;
        h = child.offsetHeight;
        const cw = w + pad * 2;
        const ch = h + pad * 2;
        Object.assign(cv.style, { width: `${cw}px`, height: `${ch}px`, left: `${-pad}px`, top: `${-pad}px` });
        cv.width = Math.round(cw * dpr);
        cv.height = Math.round(ch * dpr);
      };

      const local = () => {
        const r = child.getBoundingClientRect();
        return {
          x: pointer.x - (r.left + r.width / 2) + pad + w / 2,
          y: pointer.y - (r.top + r.height / 2) + pad + h / 2
        };
      };

      const cap = (x: number, y: number) => {
        const r = Math.min(w, h) / 2;
        const cy = pad + h / 2;
        const cx = Math.min(Math.max(x, pad + r), pad + w - r);
        const dx = x - cx;
        const dy = y - cy;
        const d = Math.hypot(dx, dy) || 1e-6;
        return { cx, cy, r, nx: dx / d, ny: dy / d, dist: d - r };
      };

      const kick = () => {
        if (!raf) raf = requestAnimationFrame(tick);
      };

      const path = (pts: Array<{ x: number; y: number }>) => {
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let j = 1; j < pts.length - 1; j++) {
          ctx.quadraticCurveTo(pts[j].x, pts[j].y, (pts[j].x + pts[j + 1].x) / 2, (pts[j].y + pts[j + 1].y) / 2);
        }
        ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
      };

      const draw = () => {
        ctx.save();
        ctx.strokeStyle = ink;
        ctx.lineCap = "round";
        ctx.globalAlpha = 0.92;
        ctx.lineWidth = 1.15;
        for (const s of list) {
          ctx.beginPath();
          path(s.pts);
          ctx.stroke();
        }
        if (ext > 0.35) {
          ctx.lineWidth = 0.8;
          ctx.globalAlpha = 0.7 * Math.min(1, (ext - 0.35) * 3);
          for (const at of [0.55, 0.78]) {
            const j = Math.round(at * (16 - 1));
            for (let i = 0; i < list.length - 1; i++) {
              const a = list[i].pts[j];
              const b = list[i + 1].pts[j];
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.quadraticCurveTo((a.x + b.x) / 2, (a.y + b.y) / 2 + 3, b.x, b.y);
              ctx.stroke();
            }
          }
        }
        ctx.restore();
      };

      const tick = () => {
        raf = 0;
        const p = local();
        const here = cap(p.x, p.y);
        const want = pointer.known && here.dist > 1 && here.dist < reach;
        if (want && !active) ink = getComputedStyle(wrap).color || ink;
        active = want;
        if (active) {
          hold.x = p.x;
          hold.y = p.y;
        }
        ext += ((active ? 1 : 0) - ext) * (active ? 0.1 : 0.2);
        if (!active && ext < 0.003) ext = 0;

        const hc = cap(hold.x, hold.y);
        const perpX = -hc.ny;
        const perpY = hc.nx;
        const inset = Math.min(6, hc.r * 0.5);

        list.forEach((s, i) => {
          const o = i - (n - 1) / 2;
          const b = cap(hc.cx + hc.nx * (hc.r - inset) + perpX * o * 17, hc.cy + hc.ny * (hc.r - inset) + perpY * o * 17);
          const axT = b.cx + b.nx * (b.r - inset);
          const ayT = b.cy + b.ny * (b.r - inset);
          if (!s.seeded) {
            s.ax = axT;
            s.ay = ayT;
            for (const q of s.pts) {
              q.x = q.px = axT;
              q.y = q.py = ayT;
            }
            s.seeded = true;
          }
          if (active) {
            s.ax += (axT - s.ax) * 0.3;
            s.ay += (ayT - s.ay) * 0.3;
          }
          const dx = hold.x - s.ax;
          const dy = hold.y - s.ay;
          const d = Math.hypot(dx, dy) || 1e-6;
          const len = ext * Math.min(d, reach + hc.r);
          const seg = len / (16 - 1);
          const pts = s.pts;
          for (let j = 1; j < pts.length; j++) {
            const q = pts[j];
            const vx = (q.x - q.px) * 0.9;
            const vy = (q.y - q.py) * 0.9;
            q.px = q.x;
            q.py = q.y;
            q.x += vx;
            q.y += vy + 0.05 * ext;
          }
          const tip = pts[pts.length - 1];
          tip.x += (s.ax + (dx / d) * len - tip.x) * s.lag;
          tip.y += (s.ay + (dy / d) * len - tip.y) * s.lag;
          pts[0].x = pts[0].px = s.ax;
          pts[0].y = pts[0].py = s.ay;
          for (let k = 0; k < 6; k++) {
            for (let j = 1; j < pts.length; j++) {
              const a = pts[j - 1];
              const q = pts[j];
              const ex = q.x - a.x;
              const ey = q.y - a.y;
              const el = Math.hypot(ex, ey) || 1e-6;
              if (el <= seg) continue;
              const diff = (el - seg) / el;
              if (j === 1) {
                q.x -= ex * diff;
                q.y -= ey * diff;
              } else {
                a.x += ex * diff * 0.5;
                a.y += ey * diff * 0.5;
                q.x -= ex * diff * 0.5;
                q.y -= ey * diff * 0.5;
              }
            }
          }
        });

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w + pad * 2, h + pad * 2);
        if (ext > 0.01) draw();

        if (active || ext > 0) kick();
        else for (const s of list) s.seeded = false;
      };

      const onMove = (e: PointerEvent) => {
        if (e.pointerType === "touch" && e.buttons === 0) return;
        pointer.x = e.clientX;
        pointer.y = e.clientY;
        pointer.known = true;
        if (raf) return;
        const r = child.getBoundingClientRect();
        if (e.clientX > r.left - reach && e.clientX < r.right + reach && e.clientY > r.top - reach && e.clientY < r.bottom + reach) kick();
      };
      const onEnd = (e: PointerEvent) => {
        if (e.pointerType !== "touch") return;
        pointer.known = false;
        kick();
      };
      const onOut = (e: PointerEvent) => {
        if (e.relatedTarget) return;
        pointer.known = false;
        kick();
      };

      measure();
      const ro = new ResizeObserver(() => {
        measure();
        kick();
      });
      ro.observe(child);
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onMove, { passive: true });
      window.addEventListener("pointerup", onEnd, { passive: true });
      window.addEventListener("pointercancel", onEnd, { passive: true });
      document.addEventListener("pointerout", onOut, { passive: true });
      return () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerdown", onMove);
        window.removeEventListener("pointerup", onEnd);
        window.removeEventListener("pointercancel", onEnd);
        document.removeEventListener("pointerout", onOut);
      };
    }, [reduced, reach, threads, threadColor]);

    // Clone child to inject ref
    const childWithRef = React.isValidElement(children)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ? React.cloneElement(children as any, { ref: childRef })
      : children;

    return (
      <span ref={wrapperRef} className="relative isolate inline-flex">
        {!reduced && <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute -z-10" />}
        {childWithRef}
      </span>
    );
  }
);

SilkThreadWrapper.displayName = "SilkThreadWrapper";

export default SilkThreadWrapper;