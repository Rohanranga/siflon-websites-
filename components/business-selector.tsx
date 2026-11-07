"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { BUSINESSES, type BusinessRecord } from "@/data/businesses";

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

  return (
    <div className="business-selector" role="tablist" aria-label="Business selector">
      <div className="business-selector-cards">
        {BUSINESSES.map((business) => {
          const isActive = business.slug === activeSlug;
          return (
            <button
              key={business.slug}
              type="button"
              className={`business-selector-card${isActive ? " is-active" : ""}${business.publicationStatus === "pending" ? " is-pending" : ""}`}
              aria-pressed={isActive}
              onClick={() => setActiveSlug(business.slug)}
            >
              <span className="business-selector-name">{business.displayName}</span>
              <span className="business-selector-arrow">
                <ChevronDown size={16} />
              </span>
              {isActive && (
                <span className="business-selector-pointer" aria-hidden />
              )}
            </button>
          );
        })}
      </div>

      <div className="business-selector-preview" aria-live="polite">
        {active ? <Preview business={active} key={active.slug} /> : null}
      </div>
    </div>
  );
}