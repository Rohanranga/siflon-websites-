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

/**
 * Reusable, data-driven gallery grid.
 *
 * - Category filter chips (single-select; "All" resets).
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
  const [activeCategory, setActiveCategory] = useState<string | null>(defaultCategory);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filtered =
    activeCategory && activeCategory !== "all"
      ? images.filter((image) => image.category === activeCategory)
      : images;

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

  const lightboxImages = filtered.map((image) => ({
    src: image.src,
    alt: image.alt,
    title: image.title,
    caption: image.caption,
    meta: image.meta,
    badge: image.badge,
  }));

  return (
    <>
      {categories.length > 1 && (
        <div className="gallery-filters" role="tablist" aria-label="Filter gallery">
          <button
            className={`gallery-filter${activeCategory === null || activeCategory === "all" ? " is-active" : ""}`}
            onClick={() => setActiveCategory(null)}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`gallery-filter${activeCategory === category.id ? " is-active" : ""}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="gallery-empty">
          <p>{emptyMessage}</p>
        </div>
      ) : (
        <div className={gridClassName} role="list">
          {filtered.map((image, index) => (
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
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                />
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