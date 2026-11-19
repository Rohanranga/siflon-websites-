import { PageShell } from "@/components/page-shell";
import { BUSINESSES } from "@/data/businesses";

const PRODUCT_IMAGES: Record<string, Record<string, string>> = {
  "siflon-pharma": {
    "Triclabendazole boluses": "/images/products/siflon-pharma/triclabendazole-boluses.webp",
    "Oxyclozanide": "/images/products/siflon-pharma/oxyclozanide.webp",
    "Rafoxanide": "/images/products/siflon-pharma/rafoxanide.webp",
    "Closantel": "/images/products/siflon-pharma/closantel.webp",
    "Albendazole": "/images/products/siflon-pharma/albendazole.webp",
    "Fenbendazole": "/images/products/siflon-pharma/fenbendazole.webp",
  },
  "siflon-drugs": {
    "Halquinol": "/images/products/siflon-drugs/halquinol.webp",
    "Enrofloxacin": "/images/products/siflon-drugs/enrofloxacin.webp",
    "Niclosamide Piperazine Salt": "/images/products/siflon-drugs/niclosamide-piperazine-salt.webp",
    "Oxfendazole": "/images/products/siflon-drugs/oxfendazole.webp",
    "Toltrazuril": "/images/products/siflon-drugs/toltrazuril.webp",
    "Albendazole": "/images/products/siflon-drugs/albendazole-drugs.webp",
    "Nitroxynil": "/images/products/siflon-drugs/nitroxynil.webp",
    "Praziquantel": "/images/products/siflon-drugs/praziquantel.webp",
    "Clorsulon": "/images/products/siflon-drugs/clorsulon.webp",
    "Fenbendazole": "/images/products/siflon-drugs/fenbendazole-drugs.webp",
    "Butaphosphon": "/images/products/siflon-drugs/butaphosphon.webp",
    "Oxyclozanide": "/images/products/siflon-drugs/oxyclozanide-drugs.webp",
    "Rafoxanide": "/images/products/siflon-drugs/rafoxanide-drugs.webp",
    "Closantel Amino Compound": "/images/products/siflon-drugs/closantel-amino.webp",
    "Diiodosalicylic Acid": "/images/products/siflon-drugs/diiodosalicylic-acid.webp",
    "Closantel Base": "/images/products/siflon-drugs/closantel-base.webp",
    "Closantel Sodium": "/images/products/siflon-drugs/closantel-sodium.webp",
    "Niclosamide": "/images/products/siflon-drugs/niclosamide.webp",
    "Triclabendazole": "/images/products/siflon-drugs/triclabendazole-drugs.webp",
  },
  "siflon-polymers": {
    "PTFE lined pipes": "/images/products/siflon-polymers/ptfe-lined-pipe.webp",
    "PTFE lined bends": "/images/products/siflon-polymers/ptfe-lined-bend.webp",
    "FEP lined reducers": "/images/products/siflon-polymers/fep-lined-reducers.webp",
    "FEP lined reducing flanges": "/images/products/siflon-polymers/fep-lined-reducing-flanges.webp",
    "FEP lined tee / cross": "/images/products/siflon-polymers/fep-lined-tee-cross.webp",
    "FEP lined ball valve": "/images/products/siflon-polymers/fep-lined-ball-valve.webp",
    "FEP lined plug valve": "/images/products/siflon-polymers/fep-lined-plug-valve.webp",
    "FEP lined butterfly valve": "/images/products/siflon-polymers/fep-lined-butterfly-valve.webp",
  },
};

const PRODUCT_LINKS: Record<string, Record<string, string>> = {
  "siflon-pharma": {
    "Triclabendazole boluses": "https://www.siflonpharma.com/our-products.html#section-5",
    "Oxyclozanide": "https://www.siflonpharma.com/our-products.html#section-1",
    "Rafoxanide": "https://www.siflonpharma.com/our-products.html#section-1",
    "Closantel": "https://www.siflonpharma.com/our-products.html#section-1",
    "Albendazole": "https://www.siflonpharma.com/our-products.html#section-4",
    "Fenbendazole": "https://www.siflonpharma.com/our-products.html#section-3",
  },
  "siflon-drugs": {
    "Halquinol": "https://www.siflondrugs.com/halquinol.html",
    "Enrofloxacin": "https://www.siflondrugs.com/enrofloxacin.html",
    "Niclosamide Piperazine Salt": "https://www.siflondrugs.com/niclosamide-piperazine-salt.html",
    "Oxfendazole": "https://www.siflondrugs.com/oxfendazole.html",
    "Toltrazuril": "https://www.siflondrugs.com/toltrazuril.html",
    "Albendazole": "https://www.siflondrugs.com/albendazole.html",
    "Nitroxynil": "https://www.siflondrugs.com/nitroxynil.html",
    "Praziquantel": "https://www.siflondrugs.com/praziquantel.html",
    "Clorsulon": "https://www.siflondrugs.com/clorsulon.html",
    "Fenbendazole": "https://www.siflondrugs.com/fenbendazole.html",
    "Butaphosphon": "https://www.siflondrugs.com/butaphosphon.html",
    "Oxyclozanide": "https://www.siflondrugs.com/oxyclozanide.html",
    "Rafoxanide": "https://www.siflondrugs.com/rafoxanide.html",
    "Closantel Amino Compound": "https://www.siflondrugs.com/closantel-amino-compound.html",
    "Diiodosalicylic Acid": "https://www.siflondrugs.com/diiodosalicylic-acid.html",
    "Closantel Base": "https://www.siflondrugs.com/closantel-base.html",
    "Closantel Sodium": "https://www.siflondrugs.com/closantel-sodium.html",
    "Niclosamide": "https://www.siflondrugs.com/niclosamide.html",
    "Triclabendazole": "https://www.siflondrugs.com/triclabendazole.html",
  },
  "siflon-polymers": {
    "PTFE lined pipes": "https://siflonpolymers.com/ptfe-lined-pipe.html",
    "PTFE lined bends": "https://siflonpolymers.com/ptfe-lined-bend.html",
    "FEP lined reducers": "https://siflonpolymers.com/fep-lined-reducers.html",
    "FEP lined reducing flanges": "https://siflonpolymers.com/fep-lined-reducing-flanges.html",
    "FEP lined tee / cross": "https://siflonpolymers.com/fep-lined-tee-cross.html",
    "FEP lined ball valve": "https://siflonpolymers.com/fep-lined-ball-valve.html",
    "FEP lined plug valve": "https://siflonpolymers.com/fep-lined-plug-valve.html",
    "FEP lined butterfly valve": "https://siflonpolymers.com/fep-lined-butterfly-valve.html",
  },
};

function ProductCard({ name, image, link }: { name: string; image: string; link?: string }) {
  return (
    <article className="product-card">
      <div className="product-card-image">
        <img src={image} alt={name} loading="lazy" />
        <div className="product-card-overlay">
          <span className="product-card-icon" aria-hidden>✦</span>
        </div>
      </div>
      <h3 className="product-card-name">{name}</h3>
      {link && (
        <a href={link} target="_blank" rel="noreferrer" className="product-card-link">
          View on website ↗
        </a>
      )}
    </article>
  );
}

function BusinessSection({ business }: { business: typeof BUSINESSES[number] }) {
  const productImages = PRODUCT_IMAGES[business.slug] || {};
  const productLinks = PRODUCT_LINKS[business.slug] || {};

  return (
    <section className="product-business-section">
      <div className="product-business-head">
        <div>
          <h2 className="product-business-title">{business.displayName}</h2>
          {business.legalName && (
            <p className="product-business-legal">{business.legalName}</p>
          )}
          {business.category && (
            <span className="product-category-tag">{business.category}</span>
          )}
        </div>
        {business.officialWebsite && (
          <a
            href={business.officialWebsite}
            target="_blank"
            rel="noreferrer"
            className="product-website-link"
          >
            Visit website ↗
          </a>
        )}
      </div>

      {business.shortDescription && (
        <p className="product-business-desc">{business.shortDescription}</p>
      )}
      {business.detailedDescription && (
        <p className="product-business-detailed">{business.detailedDescription}</p>
      )}

      {business.products.length > 0 ? (
        <div className="product-grid">
          {business.products.map((product, idx) => (
            <ProductCard
              key={idx}
              name={product}
              image={productImages[product] || "/images/products/siflon-pharma/triclabendazole-boluses.webp"}
              link={productLinks[product]}
            />
          ))}
        </div>
      ) : (
        <p className="product-empty">No product data available for this business.</p>
      )}

      {business.services.length > 0 && (
        <div className="product-services">
          <h3 className="product-section-title">Services</h3>
          <ul className="product-list">
            {business.services.map((service, idx) => (
              <li key={idx}>{service}</li>
            ))}
          </ul>
        </div>
      )}

      <p className="product-verification-note">
        <strong>Verification:</strong>{" "}
        {business.verificationStatus === "verified"
          ? "Verified — product list, services and facilities confirmed from official sources."
          : "Pending — information is being verified and may change."}
      </p>
    </section>
  );
}

export default function ProductsPage() {
  const published = BUSINESSES.filter(
    (b) => b.publicationStatus === "published"
  );

  return (
    <PageShell
      eyebrow="Products"
      title="Product portfolio."
      subtitle="Products from Siflon Group businesses across animal health, pharmaceutical ingredients, and industrial materials."
    >
      <section className="products-section">
        <div className="section-shell">
          <div className="products-intro">
            <p>
              Each Siflon business has its own product range, markets and expertise.
              The data below is drawn from official websites, regulatory filings and
              manufacturing licences. Each business section links to its official
              website for the full product catalogue and specifications.
            </p>
          </div>

          {published.map((business) => (
            <BusinessSection key={business.slug} business={business} />
          ))}

          {BUSINESSES.filter(
            (b) => b.publicationStatus !== "published"
          ).map((business) => (
            <article key={business.slug} className="product-business-section product-pending-section">
              <div className="product-business-head">
                <div>
                  <h2 className="product-business-title">{business.displayName}</h2>
                  <span className="product-category-tag">Pending verification</span>
                </div>
              </div>
              <p className="product-business-desc">
                {business.notes || "Information for this business is pending verification."}
              </p>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}