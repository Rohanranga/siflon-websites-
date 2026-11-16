"use client";

const ROW_1 = [
  "Pharmaceutical Manufacturing",
  "Healthcare Supply Chains",
  "Polymer Manufacturing",
  "Industrial Infrastructure",
];

const ROW_2 = [
  "Manufacturing Partners",
  "Process Engineering",
  "Industrial Procurement",
  "Quality & Production",
];

export function IndustriesMarquee() {
  return (
    <section className="industries-section" aria-label="Industries We Serve">
      <div className="section-shell industries-header">
        <div className="eyebrow centered">INDUSTRIES WE SERVE</div>
        <h2 className="industries-title">
          Built for industries<br />
          <em className="serif-italic">that make things happen.</em>
        </h2>
        <p className="industries-desc">
          Across pharmaceuticals, polymers and industrial piping, Siflon Group brings
          manufacturing expertise and engineering capabilities to diverse industries.
        </p>
      </div>

      <div className="marquee-wrapper" aria-hidden="true">
        {/* Row 1: Right to Left */}
        <div className="marquee-row marquee-rtl">
          <div className="marquee-content">
            {ROW_1.concat(ROW_1, ROW_1, ROW_1).map((label, idx) => (
              <span key={`r1-${idx}`} className="marquee-item">
                <span className="marquee-text">{label}</span>
                <span className="marquee-star">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* Row 2: Left to Right */}
        <div className="marquee-row marquee-ltr">
          <div className="marquee-content">
            {ROW_2.concat(ROW_2, ROW_2, ROW_2).map((label, idx) => (
              <span key={`r2-${idx}`} className="marquee-item">
                <span className="marquee-text">{label}</span>
                <span className="marquee-star">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}