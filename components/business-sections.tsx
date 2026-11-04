import { ArrowUpRight } from "lucide-react";
import { getPublishedBusinesses } from "@/data/businesses";

export function BusinessSections() {
  const published = getPublishedBusinesses();

  return (
    <section className="business-section" id="businesses">
      <div className="section-shell">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Our businesses</div>
            <h2>Specialist expertise.<br /><em>Distinct capabilities.</em></h2>
          </div>
          <p>Three published business divisions. Each with its own market, products and team, connected through the Siflon Group. A fourth division is pending verification.</p>
        </div>

        <div className="business-features">
          {published.map((business, index) => (
            <article className="business-feature" key={business.slug}>
              <div className="bf-num">{String(index + 1).padStart(2, "0")}</div>
              <div className="bf-body">
                <div className="bf-head">
                  <h3>{business.legalName}</h3>
                  <span className="bf-tag">{business.category}</span>
                </div>
                <p>{business.shortDescription}</p>
                <div className="bf-products">
                  {business.products.slice(0, 6).map((product) => (
                    <span key={product}>{product}</span>
                  ))}
                  {business.products.length > 6 && (
                    <span className="bf-more">+{business.products.length - 6} more</span>
                  )}
                </div>
                {business.officialWebsite && (
                  <a
                    href={business.officialWebsite}
                    target="_blank"
                    rel="noreferrer"
                    className="bf-link"
                  >
                    Visit {business.legalName} website <ArrowUpRight size={16} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="pending-note">
          <span className="pending-dot" />
          <p>
            <strong>Siflon Pipes</strong> &mdash; details are being verified before this business is
            presented publicly. Product range, legal entity and relationship to the other group
            businesses need confirmation. This business is not published on the website until
            verified.
          </p>
        </div>
      </div>
    </section>
  );
}
