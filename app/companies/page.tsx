import { PageShell } from "@/components/page-shell";
import { Building2 } from "lucide-react";
import { BUSINESSES } from "@/data/businesses";
import Link from "next/link";

export default function CompaniesPage() {
  const published = BUSINESSES.filter((b) => b.publicationStatus === "published");

  return (
    <PageShell eyebrow="Companies" title="Our business divisions." subtitle="Specialist companies across pharmaceuticals, animal health, industrial materials and irrigation systems.">
      <section className="companies-section">
        <div className="section-shell">
          <div className="companies-grid">
            {published.map((business, index) => (
              <Link key={business.slug} href={`/businesses/${business.slug}`} className="company-card">
                <span className="company-number">0{index + 1}</span>
                <Building2 size={24} className="company-icon" aria-hidden />
                <h3>{business.displayName}</h3>
                <p className="company-category">{business.category}</p>
                <p className="company-desc">{business.shortDescription}</p>
                <span className="company-link">
                  Learn more <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}