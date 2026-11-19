"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { BUSINESSES, type BusinessRecord } from "@/data/businesses";
import { HoverRevealCards, CardItem } from "@/components/ui/hover-reveal-cards";

function Preview({ business }: { business: BusinessRecord }) {
  const isPending = business.publicationStatus === "pending";
  const hasWebsite = !!business.officialWebsite;
  const image = business.images[0];

  return (
    <div className="business-preview-grid">
      <div className="business-preview-copy">
        {isPending ? (
          <>
            <span className="business-preview-tag business-preview-tag-pending">
              Pending verification
            </span>
            <h2 className="business-preview-title">{business.displayName}</h2>
            <p className="business-preview-desc">{business.notes}</p>
            <span className="business-preview-cta-disabled" aria-disabled>
              Learn more — website pending
            </span>
          </>
        ) : (
          <>
            <span className="business-preview-tag">
              {business.category ?? "Specialist business"}
            </span>
            <h2 className="business-preview-title">{business.displayName}</h2>
            {business.shortDescription && (
              <p className="business-preview-desc">{business.shortDescription}</p>
            )}
            {business.products.length > 0 && (
              <div className="business-preview-tags">
                {business.products.slice(0, 6).map((product) => (
                  <span key={product} className="business-preview-tag">
                    {product}
                  </span>
                ))}
                {business.products.length > 6 && (
                  <span className="business-preview-tag business-preview-tag-more">
                    +{business.products.length - 6} more
                  </span>
                )}
              </div>
            )}
            {hasWebsite ? (
              <a
                href={business.officialWebsite!}
                target="_blank"
                rel="noreferrer"
                className="business-preview-cta"
              >
                Learn more <ArrowUpRight size={16} />
              </a>
            ) : (
              <span className="business-preview-cta-disabled" aria-disabled>
                Learn more — website pending
              </span>
            )}
          </>
        )}
      </div>

      <div className="business-preview-media">
        {image ? (
          <img
            src={image}
            alt={`${business.displayName} facility imagery`}
            loading="lazy"
          />
        ) : (
          <div className="business-preview-media-placeholder" aria-hidden />
        )}
      </div>
    </div>
  );
}

export function BusinessSelector() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  // Default to the first published business so the preview is populated
  // immediately on mount.
  useEffect(() => {
    if (!activeSlug) {
      const first = BUSINESSES.find((b) => b.publicationStatus === "published");
      if (first) setActiveSlug(first.slug);
    }
  }, [activeSlug]);

  const active: BusinessRecord | null =
    BUSINESSES.find((b) => b.slug === activeSlug) ?? null;

  // Convert businesses to card items for hover-reveal effect
  const cardItems: CardItem[] = BUSINESSES.map((business) => ({
    id: business.slug,
    title: business.displayName,
    subtitle: business.category ?? "Specialist business",
    imageUrl: business.images[0] || "/images/siflon-gemini-logo.png",
    href: business.officialWebsite ?? undefined,
  }));

  return (
    <div className="business-selector" role="tablist" aria-label="Business selector">
      <HoverRevealCards
        items={cardItems}
        cols={4}
        height="h-80"
        cardClassName="business-reveal-card"
      />


      <div className="business-selector-preview" aria-live="polite">
        {active ? <Preview business={active} key={active.slug} /> : null}
      </div>
    </div>
  );
}