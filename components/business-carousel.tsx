"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowUpRight } from "lucide-react";
import { BUSINESSES } from "@/data/businesses";

const AUTOPLAY_MS = 5500;

interface Slide {
  business: (typeof BUSINESSES)[number];
  image: string;
  imageAlt: string;
  imageStatus: string;
}

/**
 * Build slides using available facility images as representative visuals.
 * Facility images are from the company's actual facilities but have not been
 * individually verified as belonging to a specific business division.
 * When verified business-specific images become available, update the image paths.
 */
function buildSlides(): Slide[] {
  // Using facility images as representative visuals for each business
  // These are actual company facility photographs from public/images/facilities/
  const facilityImages = [
    "/images/facilities/facility_02.jpg", // Pharma - clean manufacturing facility
    "/images/facilities/facility_05.jpg", // Drugs - laboratory/factory setting
    "/images/facilities/facility_08.jpg", // Polymers - industrial piping/valves
    "/images/facilities/facility_11.jpg", // Pipes - generic industrial facility
  ];

  return BUSINESSES.map((business, index) => {
    const baseAlt = `${business.displayName} — representative facility imagery`;
    const image = facilityImages[index] || "/images/siflon-logo.jpg";

    if (business.publicationStatus === "pending") {
      return {
        business,
        image,
        imageAlt: `${baseAlt} — details pending verification`,
        imageStatus: "pending-verification",
      };
    }
    return {
      business,
      image,
      imageAlt: `${baseAlt} — pending business-specific visual review`,
      imageStatus: "pending-review",
    };
  });
}

export function BusinessCarousel() {
  const slides = buildSlides();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [reduce, setReduce] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartTime = useRef<number | null>(null);

  // Reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const listener = (event: MediaQueryListEvent) => setReduce(event.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  // Autoplay: only runs when NOT reduced-motion AND NOT user-paused AND NOT hover/focus-paused
  useEffect(() => {
    const shouldRun = !reduce && !paused && !userPaused;
    if (!shouldRun) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [reduce, paused, userPaused, slides.length]);

  // Hover/focus pause (does not affect userPaused)
  const handleMouseEnter = useCallback(() => setPaused(true), []);
  const handleMouseLeave = useCallback(() => setPaused(false), []);
  const handleFocusCapture = useCallback(() => setPaused(true), []);
  const handleBlurCapture = useCallback(() => setPaused(false), []);

  // User-initiated pause/play
  const toggleUserPause = useCallback(() => {
    setUserPaused((prev) => !prev);
  }, []);

  // Navigation
  const go = useCallback((index: number) => {
    setCurrent(((index % slides.length) + slides.length) % slides.length);
  }, [slides.length]);

  const next = useCallback(() => go(current + 1), [current, go]);
  const prev = useCallback(() => go(current - 1), [current, go]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === " " || e.key === "Enter") {
        // Space/Enter on play/pause button handled by button itself
      } else if (e.key >= "1" && e.key <= "4") {
        const idx = parseInt(e.key, 10) - 1;
        if (idx < slides.length) {
          e.preventDefault();
          go(idx);
        }
      }
    },
    [current, go, next, prev, slides.length]
  );

  // Touch/swipe support
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartTime.current = Date.now();
    },
    []
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      // Prevent scrolling while swiping horizontally
      if (touchStartX.current !== null) {
        const deltaX = e.touches[0].clientX - touchStartX.current;
        if (Math.abs(deltaX) > 10) {
          // Likely a horizontal swipe, let it be
        }
      }
    },
    []
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null || touchStartTime.current === null) return;
      const deltaX = e.changedTouches[0].clientX - touchStartX.current;
      const deltaTime = Date.now() - touchStartTime.current;
      // Swipe threshold: 50px within 300ms
      if (Math.abs(deltaX) > 50 && deltaTime < 300) {
        if (deltaX > 0) {
          prev();
        } else {
          next();
        }
      }
      touchStartX.current = null;
      touchStartTime.current = null;
    },
    [next, prev]
  );

  return (
    <div
      ref={containerRef}
      className="business-carousel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocusCapture={handleFocusCapture}
      onBlurCapture={handleBlurCapture}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Siflon Group business divisions"
    >
      <div className="bc-stage" role="region" aria-roledescription="slide" aria-live="polite">
        {slides.map((s, index) => (
          <div
            key={s.business.slug}
            className={`bc-slide${index === current ? " is-active" : ""}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${s.business.displayName} slide ${index + 1} of ${slides.length}`}
            aria-hidden={index !== current}
            tabIndex={index === current ? 0 : -1}
          >
            <div className="bc-media">
              <img src={s.image} alt={s.imageAlt} loading="lazy" />
              {s.imageStatus === "pending-verification" && (
                <span className="bc-media-badge">Image pending verification</span>
              )}
              {s.imageStatus === "pending-review" && (
                <span className="bc-media-badge">Image pending visual review</span>
              )}
            </div>
            <div className="bc-info">
              <div className="bc-head">
                <span className="bc-num">{String(index + 1).padStart(2, "0")}</span>
                <span className="bc-tag">{s.business.category ?? "Business division"}</span>
              </div>
              <h2>{s.business.displayName}</h2>
              <p>{s.business.shortDescription ?? s.business.notes}</p>
              {s.business.publicationStatus === "pending" ? (
                <span className="bc-pending">Details pending verification</span>
              ) : (
                <div className="bc-actions">
                  {s.business.officialWebsite && (
                    <a
                      href={s.business.officialWebsite}
                      target="_blank"
                      rel="noreferrer"
                      className="bc-link"
                    >
                      Visit {s.business.displayName} website <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bc-controls">
        <button
          className="bc-arrow"
          aria-label="Previous slide"
          onClick={prev}
        >
          ‹
        </button>
        <div className="bc-dots" role="tablist" aria-label="Slide navigation">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`bc-dot${index === current ? " is-active" : ""}`}
              role="tab"
              aria-label={`Go to slide ${index + 1}: ${slides[index].business.displayName}`}
              aria-selected={index === current}
              onClick={() => go(index)}
            />
          ))}
        </div>
        <button
          className="bc-arrow"
          aria-label="Next slide"
          onClick={next}
        >
          ›
        </button>
      </div>

      <button
        className="bc-play"
        aria-label={userPaused ? "Play carousel" : "Pause carousel"}
        aria-pressed={userPaused}
        onClick={toggleUserPause}
      >
        {userPaused ? "Play" : "Pause"}
      </button>
    </div>
  );
}