"use client";

import { useState, useCallback, ReactNode } from "react";
import { ImageLightbox } from "./image-lightbox";

export interface GalleryGridImage {
  id: string;
  src: string;
  alt: string;
  title: string | null;
  caption: string | null;
  category: string;
  meta?: ReactNode;
  badge?: ReactNode;
}

interface GalleryGridProps {
  images: GalleryGridImage[];
  categories: { id: string; label: string }[];
  defaultCategory?: string | null;
  emptyMessage?: string;
  gridClassName?: string;
}

/** Alphabet letters A–Z */
const ALPHABET = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

/**
 * Reusable, data-driven gallery grid.
 *
 * - Category filter chips (single-select; "All" resets).
 * - Character/letter filter strip within each category view.
 * - Show-more pagination: initial batch of N items, then expand.
 * - Responsive grid with equal card heights per row.
 * - Hover zoom + overlay icon.
 * - Accessible lightbox opened on click or Enter/Space.
 * - Lazy-loaded images.
 * - Respects prefers-reduced-motion.
 */
export function GalleryGrid({
  images,
  categories,
  defaultCategory = null,
  emptyMessage = "No images are available for this category yet.",
  gridClassName = "gallery-grid",
}: GalleryGridProps) {
  const INITIAL_DISPLAY = 6;
  const [activeCategory, setActiveCategory] = useState<string | null>(defaultCategory);
  const [showCount, setShowCount] = useState(INITIAL_DISPLAY);
  const [activeChar, setActiveChar] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Reset pagination when category or char filter changes
  const handleCategoryChange = useCallback((cat: string | null) => {
    setActiveCategory(cat);
    setActiveChar(null);
    setShowCount(INITIAL_DISPLAY);
  }, []);

  const handleCharChange = useCallback((char: string | null) => {
    setActiveChar(char);
    setShowCount(INITIAL_DISPLAY);
  }, []);

  const filtered = (() => {
    let list =
      activeCategory && activeCategory !== "all"
        ? images.filter((image) => image.category === activeCategory)
        : images;
    if (activeChar) {
      list = list.filter((image) => {
        const t = image.title ?? image.alt ?? "";
        return t.charAt(0).toUpperCase() === activeChar;
      });
    }
    return list;
  })();

  const visible = filtered.slice(0, showCount);
  const hasMore = showCount < filtered.length;

  const openLightbox = useCallback(
    (index: number) => {
      setLightboxIndex(index);
      setLightboxOpen(true);
      document.body.style.overflow = "hidden";
    },
    []
  );

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  }, []);

  const lightboxImages = visible.map((image) => ({
    src: image.src,
    alt: image.alt,
    title: image.title,
    caption: image.caption,
    meta: image.meta,
    badge: image.badge,
  }));

  // Collect unique first-letter chars for current filtered set
  const availableChars = (() => {
    const set = new Set<string>();
    filtered.forEach((img) => {
      const t = (img.title ?? img.alt ?? "").trim();
      if (t) set.add(t.charAt(0).toUpperCase());
    });
    return ALPHABET.filter((c) => set.has(c));
  })();

  return (
    <>
      {/* Category filters — always visible */}
      {categories.length > 1 && (
        <div className="gallery-filters" role="tablist" aria-label="Filter gallery">
          <button
            className={`gallery-filter${activeCategory === null || activeCategory === "all" ? " is-active" : ""}`}
            onClick={() => handleCategoryChange(null)}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`gallery-filter${activeCategory === category.id ? " is-active" : ""}`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
      )}

      {/* Character filter strip — shown whenever we're in any filtered mode */}
      {(activeCategory && activeCategory !== "all") && availableChars.length > 1 && (
        <div className="gallery-char-strip" role="group" aria-label="Filter by initial character">
          <span className="gallery-char-label">A–Z:</span>
          <button
            className={`gallery-char-btn${activeChar === null ? " is-active" : ""}`}
            onClick={() => handleCharChange(null)}
            aria-pressed={!activeChar}
          >
            All
          </button>
          {availableChars.map((ch) => (
            <button
              key={ch}
              className={`gallery-char-btn${activeChar === ch ? " is-active" : ""}`}
              onClick={() => handleCharChange(ch)}
              aria-pressed={activeChar === ch}
            >
              {ch}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="gallery-empty">
          <p>{emptyMessage}</p>
        </div>
      ) : (
        <>
          <div className={gridClassName} role="list">
            {visible.map((image, index) => (
              <article
                key={image.id}
                className="gallery-card"
                role="listitem"
                onClick={() => openLightbox(index)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openLightbox(index);
                  }
                }}
              >
                <figure className="gallery-card-image">
                  <img src={image.src} alt={image.alt} loading="lazy" />
                  <div className="gallery-card-overlay">
                    <span className="gallery-card-zoom" aria-hidden>
                      ⟢
                    </span>
                  </div>
                  {image.badge}
                </figure>
                <div className="gallery-card-content">
                  <h3>{image.title ?? image.alt}</h3>
                  {image.caption && <p>{image.caption}</p>}
                  {image.meta}
                </div>
              </article>
            ))}
          </div>

          {hasMore && (
            <div className="gallery-show-more">
              <button
                className="gallery-show-more-btn"
                onClick={() => setShowCount((c) => c + INITIAL_DISPLAY)}
              >
                Show more ({filtered.length - showCount} remaining)
              </button>
            </div>
          )}
        </>
      )}

      <ImageLightbox
        open={lightboxOpen}
        images={lightboxImages}
        index={lightboxIndex}
        onClose={closeLightbox}
      />
    </>
  );
}
