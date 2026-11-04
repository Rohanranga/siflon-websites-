"use client";

import { useState, useCallback, useEffect } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { BUSINESSES } from "@/data/businesses";

export function BusinessSelector() {
  const [pinnedSlug, setPinnedSlug] = useState<string | null>(null);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  // Close pinned card on Escape
  useEffect(() => {
    if (!pinnedSlug) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPinnedSlug(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pinnedSlug]);

  // On mobile there is no hover; clear the hover state on touch devices
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover)").matches) {
      setHoveredSlug(null);
    }
  }, []);

  const togglePin = useCallback((slug: string) => {
    setPinnedSlug((prev) => (prev === slug ? null : slug));
  }, []);

  // Priority: pinned card wins, otherwise the card under the pointer wins.
  const visibleSlug = pinnedSlug ?? hoveredSlug;

  return (
    <div className="business-selector" role="tablist" aria-label="Business selector">
      {BUSINESSES.map((business) => {
        const isExpanded = business.slug === visibleSlug;
        const isPending = business.publicationStatus === "pending";
        return (
          <div
            key={business.slug}
            className={`business-selector-card${isExpanded ? " is-expanded" : ""}${isPending ? " is-pending" : ""}`}
            role="tab"
            aria-expanded={isExpanded}
            aria-controls={`business-selector-panel-${business.slug}`}
            onMouseEnter={() => {
              if (!pinnedSlug) setHoveredSlug(business.slug);
            }}
            onMouseLeave={() => {
              if (!pinnedSlug) setHoveredSlug(null);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                togglePin(business.slug);
              }
            }}
          >
            <button
              className="business-selector-head"
              aria-expanded={isExpanded}
              onClick={() => togglePin(business.slug)}
            >
              <span className="business-selector-name">{business.displayName}</span>
              <span className="business-selector-arrow">
                <ChevronDown size={16} />
              </span>
            </button>

            <div
              id={`business-selector-panel-${business.slug}`}
              className="business-selector-panel"
              aria-hidden={!isExpanded}
            >
              {isPending ? (
                <div className="business-selector-pending">
                  <span className="business-selector-pending-tag">Pending verification</span>
                  <p>{business.notes}</p>
                </div>
              ) : (
                <div className="business-selector-body">
                  {business.images.length > 0 && (
                    <div className="business-selector-image-wrap">
                      <img
                        src={business.images[0]}
                        alt={`${business.displayName} facility imagery`}
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="business-selector-meta">
                    <span className="business-selector-tag">{business.category}</span>
                    {business.legalName && (
                      <span className="business-selector-legal">{business.legalName}</span>
                    )}
                  </div>
                  {business.shortDescription && (
                    <p className="business-selector-desc">{business.shortDescription}</p>
                  )}
                  {business.products.length > 0 && (
                    <div className="business-selector-products">
                      {business.products.slice(0, 6).map((product) => (
                        <span key={product} className="business-selector-product">
                          {product}
                        </span>
                      ))}
                      {business.products.length > 6 && (
                        <span className="business-selector-product business-selector-product-more">
                          +{business.products.length - 6} more
                        </span>
                      )}
                    </div>
                  )}
                  {business.officialWebsite && (
                    <a
                      href={business.officialWebsite}
                      target="_blank"
                      rel="noreferrer"
                      className="business-selector-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Visit official website <ArrowUpRight size={15} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}