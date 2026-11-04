"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowDown, Pause, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { BUSINESSES } from "@/data/businesses";

const SLIDE_DURATION = 5500;

interface HeroSlide {
  business: typeof BUSINESSES[number];
  image: string;
  imageAlt: string;
}

function buildSlides(): HeroSlide[] {
  const heroImages = [
    "/images/hero_candidate_150s.jpg",
    "/images/hero_candidate_175s.jpg",
    "/images/hero_candidate_200s.jpg",
    "/images/hero_candidate_225s.jpg",
  ];

  // Preload every slide image so the crossfade never shows a broken frame
  if (typeof window !== "undefined") {
    heroImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }

  return BUSINESSES.map((business, index) => ({
    business,
    image: heroImages[index] || "/images/hero-poster.jpg",
    imageAlt: `${business.displayName} — corporate facility imagery`,
  }));
}

export function Hero() {
  const slides = buildSlides();
  const [current, setCurrent] = useState(0);
  const [pending, setPending] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [reduce, setReduce] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartTime = useRef<number | null>(null);
  const transitioningRef = useRef(false);

  // Reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const listener = (event: MediaQueryListEvent) => setReduce(event.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  // Controlled slide change: preload next image, then crossfade
  const changeTo = useCallback(
    (index: number) => {
      if (index === current || transitioningRef.current) return;
      transitioningRef.current = true;
      setPending(index);
      // After the crossfade completes, commit the new slide
      const timer = setTimeout(() => {
        setCurrent(index);
        setPending(null);
        transitioningRef.current = false;
      }, 650);
      return () => clearTimeout(timer);
    },
    [current]
  );

  const go = useCallback(
    (index: number) => {
      changeTo(((index % slides.length) + slides.length) % slides.length);
    },
    [changeTo, slides.length]
  );

  const next = useCallback(() => go(current + 1), [current, go]);
  const prev = useCallback(() => go(current - 1), [current, go]);

  // Autoplay
  useEffect(() => {
    const shouldRun = !reduce && !paused && !userPaused;
    if (!shouldRun) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setCurrent((prev) => {
        if (transitioningRef.current) return prev;
        const nextIndex = (prev + 1) % slides.length;
        transitioningRef.current = true;
        setPending(nextIndex);
        setTimeout(() => {
          setCurrent(nextIndex);
          setPending(null);
          transitioningRef.current = false;
        }, 900);
        return prev;
      });
    }, SLIDE_DURATION);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [reduce, paused, userPaused, slides.length]);

  // Hover/focus pause
  const handleMouseEnter = useCallback(() => setPaused(true), []);
  const handleMouseLeave = useCallback(() => setPaused(false), []);
  const handleFocusCapture = useCallback(() => setPaused(true), []);
  const handleBlurCapture = useCallback(() => setPaused(false), []);

  // User-initiated pause/play
  const toggleUserPause = useCallback(() => {
    setUserPaused((prev) => !prev);
  }, []);

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

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null || touchStartTime.current === null) return;
      const deltaX = e.changedTouches[0].clientX - touchStartX.current;
      const deltaTime = Date.now() - touchStartTime.current;
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

  const currentSlide = slides[current];
  const pendingSlide = pending !== null ? slides[pending] : null;
  const isTransitioning = pendingSlide !== null;

  return (
    <div
      ref={containerRef}
      className="hero"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocusCapture={handleFocusCapture}
      onBlurCapture={handleBlurCapture}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Siflon Group business divisions hero"
    >
      {/* Background images - crossfade only the media layer */}
      <div
        className="hero-images"
        role="img"
        aria-label={currentSlide.imageAlt}
        data-transitioning={isTransitioning ? "true" : "false"}
      >
        {/* Stable outgoing layer keyed on the current slide */}
        <div
          key={`slide-${current}`}
          className={`hero-image-layer${isTransitioning ? " is-out" : " is-active"}`}
          aria-hidden={isTransitioning}
        >
          <img src={currentSlide.image} alt={isTransitioning ? "" : currentSlide.imageAlt} loading="lazy" />
          <div className="hero-image-overlay" />
          <a
            href={currentSlide.business.officialWebsite ?? undefined}
            target="_blank"
            rel="noreferrer"
            className="hero-image-link"
            aria-label={`Visit ${currentSlide.business.displayName} official website`}
          >
            <span aria-hidden="true" />
          </a>
        </div>
        {/* Incoming layer, rendered only while the transition is active */}
        {pendingSlide && (
          <div
            key={`slide-${pending}`}
            className="hero-image-layer is-in"
            aria-hidden="true"
          >
            <img src={pendingSlide.image} alt={pendingSlide.imageAlt} loading="eager" />
            <div className="hero-image-overlay" />
            <a
              href={pendingSlide.business.officialWebsite ?? undefined}
              target="_blank"
              rel="noreferrer"
              className="hero-image-link"
              aria-label={`Visit ${pendingSlide.business.displayName} official website`}
            >
              <span aria-hidden="true" />
            </a>
          </div>
        )}
      </div>

      {/* Fallback for video */}
      <div className="hero-fallback" />
      <div className="hero-overlay" />

      {/* Foreground content - NOT part of crossfade, stays stable */}
      <div className="hero-content-wrapper">
        <div className="hero-content-layer">
          <div className="hero-kicker">
            <span />
            {currentSlide.business.category?.toUpperCase() ?? "SIFLON GROUP"} — {currentSlide.business.displayName.toUpperCase()}
          </div>
          <h1>One group.<br /><em>Diverse expertise.</em></h1>
          <p>{currentSlide.business.shortDescription ?? "Bringing together specialist capabilities across pharmaceuticals, animal health and advanced industrial materials."}</p>
          <div className="hero-actions">
            {currentSlide.business.officialWebsite ? (
              <a
                href={currentSlide.business.officialWebsite}
                target="_blank"
                rel="noreferrer"
                className="hero-visit-button"
                aria-label={`Visit ${currentSlide.business.displayName} official website`}
                onClick={(e) => e.stopPropagation()}
              >
                Visit {currentSlide.business.displayName} website <span>↗</span>
              </a>
            ) : (
              <button className="hero-visit-button" disabled style={{ opacity: 0.5, cursor: 'default' }}>
                Website pending verification
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom controls (static, not part of the crossfade) */}
      <div className="hero-bottom">
        <a href="#group" className="scroll-cue"><ArrowDown size={15} /> SCROLL TO EXPLORE</a>

        <div className="hero-slider-controls">
          <button
            className="hero-slider-arrow"
            aria-label="Previous business"
            onClick={prev}
          >
            <ChevronLeft size={18} />
          </button>

          <div className="hero-slider-dots" role="tablist" aria-label="Business selection">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`hero-slider-dot${index === current ? " is-active" : ""}`}
                role="tab"
                aria-label={`Show ${slides[index].business.displayName}`}
                aria-selected={index === current}
                onClick={() => go(index)}
              />
            ))}
          </div>

          <button
            className="hero-slider-arrow"
            aria-label="Next business"
            onClick={next}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <button
          className="video-toggle"
          onClick={toggleUserPause}
          aria-label={userPaused ? "Play carousel" : "Pause carousel"}
          aria-pressed={userPaused}
        >
          {userPaused ? <Play size={15} /> : <Pause size={15} />}
          <span>{userPaused ? "Play" : "Pause"}</span>
        </button>
      </div>
    </div>
  );
}