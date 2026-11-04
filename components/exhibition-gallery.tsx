"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { EXHIBITIONS } from "@/data/exhibitions";

const ALL_EXHIBITION_IMAGES = [
  "exhibition_00.jpg",
  "exhibition_01.jpg",
  "exhibition_02.jpg",
  "exhibition_03.jpg",
  "exhibition_04.jpg",
  "exhibition_05.jpg",
  "exhibition_06.jpg",
  "exhibition_07.jpg",
  "exhibition_08.jpg",
  "exhibition_09.jpg",
  "exhibition_10.jpg",
  "exhibition_11.jpg",
  "exhibition_12.jpg",
  "exhibition_13.jpg",
  "exhibition_14.jpg",
  "exhibition_15.jpg",
  "exhibition_16.jpg",
  "exhibition_17.jpg",
  "exhibition_18.jpg",
  "exhibition_19.jpg",
  "exhibition_20.jpg",
  "exhibition_21.jpg",
  "exhibition_22.jpg",
  "exhibition_23.jpg",
];

interface LightboxImage {
  src: string;
  alt: string;
  title?: string;
  location?: string;
  year?: number;
  pending: boolean;
}

const INITIAL_VISIBLE = 6;

export function ExhibitionGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<LightboxImage[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_VISIBLE);
  const [showAllLabel, setShowAllLabel] = useState<string>("SHOW ALL EVENTS");
  const lastFocused = useRef<HTMLElement | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Build lightbox images from all exhibition images
  useEffect(() => {
    const images: LightboxImage[] = ALL_EXHIBITION_IMAGES.map((filename, index) => {
      const exhibition = EXHIBITIONS[index];
      return {
        src: `/images/exhibitions/${filename}`,
        alt: exhibition?.name ?? `Exhibition archive ${index + 1}`,
        title: exhibition?.name,
        location: exhibition?.location,
        year: exhibition?.year ?? undefined,
        pending: exhibition?.verified !== true,
      };
    });
    setLightboxImages(images);
  }, []);

  const openLightbox = useCallback((index: number) => {
    lastFocused.current = document.activeElement as HTMLElement;
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
    lastFocused.current?.focus();
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      setLightboxIndex((index + lightboxImages.length) % lightboxImages.length);
    },
    [lightboxImages.length]
  );

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToSlide(lightboxIndex - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToSlide(lightboxIndex + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, lightboxIndex, goToSlide, closeLightbox]);

  // Focus trap for lightbox
  useEffect(() => {
    if (!lightboxOpen || !lightboxRef.current) return;
    const focusable = lightboxRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener("keydown", handleTab);
    return () => window.removeEventListener("keydown", handleTab);
  }, [lightboxOpen]);

  const currentImage = lightboxImages[lightboxIndex];
  const visibleImages = lightboxImages.slice(0, visibleCount);
  const hasMore = visibleCount < lightboxImages.length;

  function toggleVisible() {
    if (hasMore) {
      setVisibleCount(lightboxImages.length);
      setShowAllLabel("SHOW LESS");
    } else {
      setVisibleCount(INITIAL_VISIBLE);
      setShowAllLabel("SHOW ALL EVENTS");
    }
  }

  return (
    <>
      <div className="exhibition-section">
        <div className="section-shell">
          <div className="section-heading">
            <div>
              <div className="eyebrow">Industry presence</div>
              <h2>Participation in <em>global trade events.</em></h2>
            </div>
            <p>
              Exhibition photographs from company archives. Event names, dates and confirmed
              participation are pending independent verification and are not published as facts.
            </p>
          </div>

          <div ref={gridRef} className="exhibition-gallery-grid" role="list">
        {visibleImages.map((image, index) => {
          const exhibition = EXHIBITIONS[index];
          const isPending = image.pending;
          return (
            <article
              key={image.src}
              className="exhibition-gallery-card"
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
              <figure className="exhibition-gallery-image">
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                />
                <div className="exhibition-gallery-overlay">
                  <ZoomIn size={24} />
                </div>
                {isPending && (
                  <span className="exhibition-gallery-badge">Pending verification</span>
                )}
              </figure>
              <div className="exhibition-gallery-content">
                <div className="exhibition-gallery-head">
                  {exhibition?.location && (
                    <span className="exhibition-gallery-loc">{exhibition.location}</span>
                  )}
                  {exhibition?.year && (
                    <span className="exhibition-gallery-year">{exhibition.year}</span>
                  )}
                </div>
                <h3>{exhibition?.name ?? `Exhibition archive ${index + 1}`}</h3>
                {isPending && (
                  <p className="exhibition-gallery-note">
                    Participation details pending verification
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {lightboxImages.length > INITIAL_VISIBLE && (
        <div className="exhibition-gallery-controls">
          <button
            className="exhibition-show-all"
            onClick={toggleVisible}
            aria-expanded={!hasMore}
          >
            <span>{showAllLabel}</span>
            <span className="exhibition-show-all-arrow" aria-hidden="true">
              {hasMore ? "↑" : "↓"}
            </span>
          </button>
        </div>
      )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && currentImage && (
        <div
          ref={lightboxRef}
          className="exhibition-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Exhibition image viewer"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          <button
            className="lightbox-close"
            aria-label="Close lightbox"
            onClick={closeLightbox}
          >
            <X size={24} />
          </button>

          <button
            className="lightbox-nav lightbox-prev"
            aria-label="Previous image"
            onClick={() => goToSlide(lightboxIndex - 1)}
          >
            <ChevronLeft size={28} />
          </button>

          <figure className="lightbox-figure">
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className="lightbox-image"
            />
            <figcaption className="lightbox-caption">
              <div className="lightbox-caption-top">
                <h3>{currentImage.title ?? "Exhibition archive"}</h3>
                {currentImage.pending && (
                  <span className="lightbox-badge">Pending verification</span>
                )}
              </div>
              <div className="lightbox-caption-bottom">
                {currentImage.location && (
                  <span>{currentImage.location}</span>
                )}
                {currentImage.year && (
                  <span className="lightbox-year">{currentImage.year}</span>
                )}
              </div>
            </figcaption>
          </figure>

          <button
            className="lightbox-nav lightbox-next"
            aria-label="Next image"
            onClick={() => goToSlide(lightboxIndex + 1)}
          >
            <ChevronRight size={28} />
          </button>

          <div className="lightbox-counter">
            {lightboxIndex + 1} / {lightboxImages.length}
          </div>
        </div>
      )}
    </>
  );
}