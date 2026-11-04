"use client";

import { ArrowUpRight, Building, Package, MapPin, Award, Globe } from "lucide-react";
import Link from "next/link";
import { BUSINESSES, type BusinessRecord } from "@/data/businesses";

interface BusinessPageClientProps {
  business: BusinessRecord;
}

export function BusinessPageClient({ business }: BusinessPageClientProps) {
  const isPending = business.publicationStatus === "pending";
  const relatedBusinesses = BUSINESSES.filter((b) => b.slug !== business.slug);

  return (
    <main className="business-page">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Siflon Group home">
          <span className="brand-mark">S</span>
          <span className="brand-copy"><strong>SIFLON</strong><small>GROUP</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="/#group">The Group</Link>
          <Link href="/#businesses">Our Businesses</Link>
          <Link href="/#manufacturing">Manufacturing</Link>
          <Link href="/#story">Our Story</Link>
          <Link href="/#capabilities">Capabilities</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
        <Link className="header-cta" href="/#businesses">Explore businesses <ArrowUpRight size={16} /></Link>
      </header>

      <section className="business-hero" style={{ backgroundColor: "var(--navy)" }}>
        <div className="business-hero-overlay" />
        <div className="business-hero-content section-shell">
          <nav className="business-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Siflon Group</Link>
            <span aria-hidden="true">/</span>
            <Link href="/#businesses">Our Businesses</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{business.displayName}</span>
          </nav>
          {isPending && (
            <span className="business-pending-badge">
              Information pending verification
            </span>
          )}
          <h1>{business.displayName}</h1>
          <p className="business-tagline">
            {business.category ? business.category : "Business details pending verification"}
          </p>
          {business.officialWebsite && (
            <a
              href={business.officialWebsite}
              target="_blank"
              rel="noreferrer"
              className="business-website-link"
            >
              Visit official website <ArrowUpRight size={16} />
            </a>
          )}
        </div>
      </section>

      {business.detailedDescription && (
        <section className="business-intro section-shell">
          <h2>About {business.displayName}</h2>
          <div className="business-intro-content">
            <p>{business.detailedDescription}</p>
          </div>
        </section>
      )}

      {(business.products.length > 0 || business.services.length > 0) && (
        <section className="business-offerings section-shell" style={{ backgroundColor: "var(--paper)" }}>
          <div className="section-heading">
            <div>
              <div className="eyebrow">What we do</div>
              <h2>Products & capabilities</h2>
            </div>
          </div>
          <div className="business-offerings-grid">
            {business.products.length > 0 && (
              <div className="business-offerings-column">
                <h3>
                  <Package size={20} />
                  Products
                </h3>
                <ul>
                  {business.products.map((product, index) => (
                    <li key={index}>{product}</li>
                  ))}
                </ul>
              </div>
            )}
            {business.services.length > 0 && (
              <div className="business-offerings-column">
                <h3>
                  <Award size={20} />
                  Services
                </h3>
                <ul>
                  {business.services.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {business.facilities.length > 0 && (
        <section className="business-facilities section-shell">
          <div className="section-heading">
            <div>
              <div className="eyebrow">Manufacturing</div>
              <h2>Facilities</h2>
            </div>
          </div>
          <div className="business-facilities-list">
            {business.facilities.map((facility, index) => (
              <article key={index} className="business-facility-card">
                <MapPin size={20} />
                <div>
                  <h3>Manufacturing facility</h3>
                  <p>{facility}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {business.images.length > 0 && (
        <section className="business-gallery section-shell" style={{ backgroundColor: "var(--paper)" }}>
          <div className="section-heading">
            <div>
              <div className="eyebrow">Image gallery</div>
              <h2>Visual overview</h2>
            </div>
          </div>
          <div className="business-gallery-grid">
            {business.images.map((image, index) => (
              <figure key={index} className="business-gallery-image">
                <img src={image} alt={`${business.displayName} facility ${index + 1}`} loading="lazy" />
              </figure>
            ))}
          </div>
        </section>
      )}

      {!isPending && business.officialWebsite && (
        <section className="business-contact section-shell">
          <div className="business-contact-card">
            <div>
              <h2>Connect with {business.displayName}</h2>
              <p>Visit the official website for detailed product information, certifications and direct contact options.</p>
            </div>
            <a
              href={business.officialWebsite}
              target="_blank"
              rel="noreferrer"
              className="business-contact-button"
            >
              <Globe size={18} />
              Visit {business.displayName} website
              <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
      )}

      {isPending && (
        <section className="business-contact section-shell">
          <div className="business-contact-card business-pending-card">
            <Building size={24} />
            <div>
              <h2>Information pending verification</h2>
              <p>
                {business.notes}
              </p>
              <p>
                No product range, legal entity name, facility location or contact details have been verified.
                This business is presented in a clearly marked pending state and no details have been invented.
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="business-related section-shell" style={{ backgroundColor: "var(--paper)" }}>
        <div className="section-heading">
          <div>
            <div className="eyebrow">Related businesses</div>
            <h2>Other Siflon divisions</h2>
          </div>
        </div>
        <div className="business-related-grid">
          {relatedBusinesses.map((related) => (
            <Link
              key={related.slug}
              href={`/businesses/${related.slug}`}
              className={`business-related-card${related.publicationStatus === "pending" ? " pending" : ""}`}
            >
              <h3>{related.displayName}</h3>
              <p>{related.category ?? "Business details pending verification"}</p>
              {related.publicationStatus === "pending" && (
                <span className="related-pending-tag">Pending verification</span>
              )}
            </Link>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-shell">
          <div className="footer-bottom">
            <span>&copy; {new Date().getFullYear()} Siflon Group.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}