"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { BUSINESSES } from "@/data/businesses";

export default function AboutPage() {
  const published = BUSINESSES.filter((b) => b.publicationStatus === "published");

  return (
    <PageShell eyebrow="Our Story" title="The Siflon Story." subtitle="An understanding of chemistry. A world of possibilities.">
      <div className="about-sections">
        {/* Our Beginnings */}
        <section className="about-beginnings">
          <div className="beginnings-content">
            <div className="eyebrow">Our Beginnings</div>
            <h2>Knowledge that<br /><em>keeps moving forward.</em></h2>
            <p>
              Founded in 1996, Siflon began as a PTFE component manufacturer before expanding into
              veterinary pharmaceuticals and animal health solutions. Over 28 years, we&apos;ve grown
              into a multi-business group serving industries across the globe.
            </p>
          </div>
        </section>

        {/* Business Divisions */}
        <section className="about-divisions">
          <div className="eyebrow">Our Companies</div>
          <h2>Four divisions.<br /><em>One manufacturing group.</em></h2>
          <div className="divisions-grid">
            {published.map((business, index) => (
              <Link key={business.slug} href={`/businesses/${business.slug}`} className="division-card">
                <span className="division-number">0{index + 1}</span>
                <h3>{business.displayName}</h3>
                <p>{business.shortDescription}</p>
                <span className="division-link">
                  Explore division <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}