"use client";

const INDUSTRIES = [
  "Pharmaceuticals",
  "Animal Health",
  "Fluoropolymers",
  "API Manufacturing",
  "Industrial Polymers",
  "Veterinary APIs",
  "FEP Lining",
  "PTFE Processing",
  "Antiparasitic Drugs",
  "Specialty Chemicals",
  "Pipe Lining",
  "Quality Manufacturing",
];

export function IndustriesMarquee() {
  // Duplicate for seamless loop
  const items = [...INDUSTRIES, ...INDUSTRIES];

  return (
    <div className="industries-marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((industry, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-dot" />
            {industry}
          </span>
        ))}
      </div>

      <style>{`
        .industries-marquee {
          width: 100%;
          overflow: hidden;
          border-top: 1px solid rgba(0,0,0,0.08);
          border-bottom: 1px solid rgba(0,0,0,0.08);
          padding: 18px 0;
          mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
        }
        .marquee-track {
          display: flex;
          gap: 0;
          width: max-content;
          animation: marquee-scroll 32s linear infinite;
        }
        .industries-marquee:hover .marquee-track {
          animation-play-state: paused;
        }
        .marquee-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 28px;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.45);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .marquee-dot {
          display: block;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(0,0,0,0.25);
          flex-shrink: 0;
        }
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
