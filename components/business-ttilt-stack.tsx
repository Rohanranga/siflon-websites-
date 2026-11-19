"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BUSINESSES } from "@/data/businesses";

// #region pose math
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

type Pose = { y: number; scale: number; rx: number; rz: number; shade: number; opacity: number };

export function pose(p: number, i: number, reduced: boolean): Pose {
  const enter = i === 0 ? 1 : clamp(p - (i - 1), 0, 1);
  const depth = clamp(p - i, 0, 3);
  if (reduced)
    return { y: 0, scale: 1, rx: 0, rz: 0, shade: Math.min(depth, 1) * 0.5, opacity: enter >= 1 ? 1 : enter };
  const e = easeOut(enter);
  return {
    y: (1 - e) * 130 - depth * 3.2,
    scale: (1 - depth * 0.07) * (0.9 + 0.1 * e),
    rx: (1 - e) * 22 - depth * 9,
    rz: (1 - e) * (i % 2 ? 5 : -5),
    shade: Math.min(depth, 2) * 0.34,
    opacity: depth > 2.6 ? clamp((3 - depth) / 0.4, 0, 1) : 1,
  };
}

export const toTransform = (q: Pose) =>
  `translate3d(0,${q.y.toFixed(3)}%,0) perspective(1400px) rotateX(${q.rx.toFixed(3)}deg) rotateZ(${q.rz.toFixed(3)}deg) scale(${q.scale.toFixed(4)})`;

const pad2 = (n: number) => (n < 10 ? "0" : "") + n;
// #endregion

const CARD_IMAGES: Record<string, string> = {
  "siflon-pharma": "/images/facilities/facility_00.jpg",
  "siflon-drugs": "/images/facilities/facility_01.jpg",
  "siflon-polymers": "/images/facilities/facility_04.jpg",
  "siflon-pipes": "",
};

export function BusinessTiltStack() {
  const track = useRef<HTMLDivElement>(null);
  const els = useRef<(HTMLElement | null)[]>([]);
  const shades = useRef<(HTMLDivElement | null)[]>([]);
  const countRef = useRef<HTMLSpanElement>(null);
  const railRef = useRef<HTMLSpanElement>(null);
  const headWordsRef = useRef<HTMLHeadingElement>(null);
  const n = BUSINESSES.length;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = mq.matches;
    let lastIdx = -1;
    let p = 0;

    const paint = () => {
      for (let i = 0; i < n; i++) {
        const el = els.current[i];
        if (!el) continue;
        const q = pose(p, i, reduced);
        el.style.transform = toTransform(q);
        el.style.opacity = String(q.opacity);
        const shadeEl = shades.current[i];
        if (shadeEl) shadeEl.style.opacity = String(q.shade);
      }
      const idx = Math.round(p);
      if (idx !== lastIdx && countRef.current) {
        lastIdx = idx;
        countRef.current.textContent = pad2(idx + 1);
      }
      if (railRef.current) {
        railRef.current.style.transform = `scaleX(${n > 1 ? p / (n - 1) : 1})`;
      }
    };

    const trigger = ScrollTrigger.create({
      trigger: track.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        p = self.progress * Math.max(n - 1, 0);
        paint();
      },
      snap:
        !reduced && n > 1
          ? { snapTo: 1 / (n - 1), duration: { min: 0.25, max: 0.7 }, delay: 0.08, ease: "power2.inOut" }
          : undefined,
    });

    paint();

    // Entrance animation
    const ctx = gsap.context(() => {
      if (reduced) return;
      const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
      const words = headWordsRef.current?.querySelectorAll(".tw") ?? [];
      intro.from(words, { yPercent: 110, opacity: 0, rotate: 4, duration: 1.1, stagger: 0.06 }, 0.1);
      if (els.current[0])
        intro.from(els.current[0], { yPercent: 18, rotateX: 18, scale: 0.92, opacity: 0, duration: 1.4, clearProps: "rotateX" }, 0.25);
      intro.eventCallback("onComplete", paint);
    });

    const onMotionChange = () => {
      reduced = mq.matches;
      paint();
    };
    mq.addEventListener("change", onMotionChange);

    return () => {
      mq.removeEventListener("change", onMotionChange);
      trigger.kill();
      ctx.revert();
      paint();
    };
  }, [n]);

  return (
    <div ref={track} style={{ height: `calc(100vh * ${Math.max(n, 1)})`, position: "relative", width: "100%" }}>
      <style>{CSS}</style>

      {/* Sticky stage */}
      <section className="bts-stage" aria-roledescription="carousel" aria-label="Our businesses">
        {/* Header area */}
        <header className="bts-head">
          <div className="bts-head-left">
            <p className="bts-eyebrow">OUR BUSINESSES</p>
            <h2 className="bts-h" ref={headWordsRef}>
              {HEADLINE.split(" ").map((w, i) => (
                <span key={i} className="bts-w-wrap">
                  <span className="bts-w">{w}</span>
                  {" "}
                </span>
              ))}
            </h2>
          </div>
          <div className="bts-count" aria-hidden="true">
            <b ref={countRef}>01</b>
            <span className="bts-rail-track">
              <span className="bts-rail-fill" ref={railRef} />
            </span>
            <span>/ {pad2(n)}</span>
          </div>
        </header>

        {/* Card deck */}
        <div className="bts-deck">
          {BUSINESSES.map((biz, i) => (
            <article
              key={biz.slug}
              className={`bts-card${biz.publicationStatus === "pending" ? " bts-pending" : ""}`}
              ref={(el) => {
                els.current[i] = el;
              }}
              style={{ zIndex: i + 1, ["--accent" as string]: ACCENT_COLORS[i] ?? "#253C80" }}
              aria-roledescription="slide"
              aria-label={`${pad2(i + 1)} of ${pad2(n)}: ${biz.displayName}`}
            >
              {/* Background image */}
              <img
                src={CARD_IMAGES[biz.slug] || "/images/facilities/facility_00.jpg"}
                alt={biz.displayName}
                className="bts-img"
                draggable={false}
                loading={i < 2 ? "eager" : "lazy"}
              />

              {/* Dark gradient overlay */}
              <div className="bts-overlay" />

              {/* Shade layer for cards behind active one */}
              <div
                ref={(el) => {
                  shades.current[i] = el;
                }}
                className="bts-shade"
              />

              {/* Content */}
              <div className="bts-body">
                {/* Top row */}
                <div className="bts-top">
                  <span className="bts-num">{pad2(i + 1)}</span>
                  {biz.category && (
                    <span className="bts-kick">{biz.category.toUpperCase()}</span>
                  )}
                </div>

                {/* Bottom row */}
                <div className="bts-bottom">
                  <div className="bts-copy">
                    <h3 className="bts-title">{biz.displayName}</h3>
                    {biz.shortDescription && (
                      <p className="bts-desc">{biz.shortDescription}</p>
                    )}
                  </div>
                  <div className="bts-cta-wrap">
                    {biz.publicationStatus === "published" && biz.officialWebsite ? (
                      <Link
                        href={biz.officialWebsite}
                        target="_blank"
                        rel="noreferrer"
                        className="bts-cta"
                        style={
                          { "--accent": ACCENT_COLORS[i] ?? "#253C80" } as React.CSSProperties
                        }
                      >
                        Learn more
                        <ArrowUpRight size={15} />
                      </Link>
                    ) : (
                      <span className="bts-cta-disabled">
                        {biz.publicationStatus === "pending" ? "Pending verification" : "Learn more"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

const HEADLINE = "Four divisions. One manufacturing group.";

const ACCENT_COLORS = ["#253C80", "#253C80", "#253C80", "#B58B4A"];

const CSS = `.bts-stage{position:sticky;top:0;height:100vh;display:flex;flex-direction:column;overflow:hidden;background:#F4F6F8;padding:clamp(16px,3vh,40px) clamp(5%,8vw,10%)}
.bts-head{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;margin-bottom:clamp(12px,2vh,28px);flex-shrink:0}
.bts-head-left{}
.bts-eyebrow{font:700 10px/1 ui-monospace,"SF Mono","Cascadia Mono",Menlo,monospace;letter-spacing:.22em;text-transform:uppercase;color:#477A9E;margin:0 0 10px}
.bts-h{font:600 clamp(28px,4.5vw,52px)/1.08 Manrope,Arial,sans-serif;letter-spacing:-.02em;margin:0;color:#102A43;max-width:22ch}
.bts-w-wrap{display:inline-block;overflow:hidden;padding-bottom:2px}
.bts-w{display:inline-block}
.bts-count{font:500 12px/1 ui-monospace,monospace;letter-spacing:.12em;color:#647482;display:flex;align-items:center;gap:10px;flex:none}
.bts-count b{font-weight:700;color:#102A43;font-size:22px}
.bts-rail-track{width:80px;height:2px;border-radius:2px;background:#dce3e8;overflow:hidden;display:block}
.bts-rail-fill{display:block;width:100%;height:100%;background:#253C80;transform-origin:0 50%;transform:scaleX(0);transition:none}
.bts-deck{position:relative;flex:1;min-height:0}
.bts-card{position:absolute;inset:0;border-radius:24px;overflow:hidden;transform-origin:50% 0;will-change:transform;backface-visibility:hidden;background:#0c0c0e;box-shadow:0 0 0 1px rgba(0,0,0,.06),0 50px 90px -40px rgba(8,10,20,.5),0 18px 40px -20px rgba(8,10,20,.4)}
.bts-pending .bts-card{background:#1a1a1a}
.bts-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transform:scale(1.06);pointer-events:none}
.bts-overlay{position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(6,7,12,.88) 0%,rgba(6,7,12,.55) 40%,rgba(6,7,12,0) 72%),linear-gradient(0deg,rgba(6,7,12,.72) 0%,rgba(6,7,12,0) 50%)}
.bts-shade{position:absolute;inset:0;z-index:4;background:#05060a;opacity:0;pointer-events:none}
.bts-body{position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;justify-content:space-between;padding:clamp(20px,3vw,40px)}
.bts-top{display:flex;justify-content:space-between;align-items:flex-start;gap:16px}
.bts-num{font:800 clamp(48px,7vw,100px)/.85 Manrope,sans-serif;letter-spacing:-.04em;color:rgba(255,255,255,.9);line-height:1}
.bts-kick{font:700 10px/1 ui-monospace,monospace;letter-spacing:.18em;text-transform:uppercase;padding:8px 14px;border-radius:999px;background:rgba(255,255,255,.13);border:1px solid rgba(255,255,255,.2);backdrop-filter:blur(10px);color:#fff;white-space:nowrap}
.bts-bottom{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;flex-wrap:wrap}
.bts-copy{max-width:480px}
.bts-title{font:700 clamp(24px,3.4vw,44px)/1.05 Manrope,sans-serif;letter-spacing:-.02em;margin:0 0 10px;color:#fff}
.bts-desc{font:400 15px/1.6 ui-sans-serif,system-ui,sans-serif;color:rgba(255,255,255,.82);margin:0 0 0;max-width:420px}
.bts-cta-wrap{flex:none}
.bts-cta{display:inline-flex;align-items:center;gap:8px;font:700 13px/1 Manrope,sans-serif;color:#fff;padding:14px 24px;border-radius:999px;text-decoration:none;border:none;cursor:pointer;background:var(--accent,#253C80);box-shadow:0 1px 0 rgba(255,255,255,.3) inset,0 10px 24px -10px var(--accent,#253C80);transition:transform .35s cubic-bezier(.34,1.56,.64,1),box-shadow .3s}
.bts-cta:hover{transform:translateY(-2px) scale(1.03)}
.bts-cta:focus-visible{outline:2px solid #fff;outline-offset:3px}
.bts-cta svg{transition:transform .3s ease}
.bts-cta:hover svg{transform:translate(2px,-2px)}
.bts-cta-disabled{display:inline-flex;align-items:center;gap:8px;font:700 13px/1 Manrope,sans-serif;color:rgba(255,255,255,.5);padding:14px 24px;border-radius:999px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.15);cursor:default}
@media(max-width:640px){.bts-stage{padding:12px 5%}.bts-head{flex-direction:column;align-items:flex-start;gap:12px}.bts-bottom{flex-direction:column;align-items:flex-start;gap:16px}.bts-cta-wrap{width:100%}.bts-cta,.bts-cta-disabled{width:100%;justify-content:center}.bts-desc{-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;display:-webkit-box}}
@media(prefers-reduced-motion:reduce){.bts-cta{transition:none}}
`;
