"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface LightboxImage {
  src: string;
  alt: string;
  title?: string | null;
  caption?: string | null;
  meta?: ReactNode;
  badge?: ReactNode;
}

interface ImageLightboxProps {
  open: boolean;
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  label?: string;
}

/**
 * Accessible, keyboard-friendly image lightbox.
 *
 * Re-mounted on every open so internal state (current index) is seeded from
 * the prop without a state-sync cycle. Focus trap, Escape, arrow-key and
 * background-scroll-lock follow the same pattern used by the exhibition
 * gallery.
 */
export function ImageLightbox({
  open,
  images,
  index,
  onClose,
  label = "Image viewer",
}: ImageLightboxProps) {
  const [current, setCurrent] = useState(index);
  const lastFocused = useRef<HTMLElement | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  // Reset to the requested index whenever the lightbox opens.
  useEffect(() => {
    if (open) setCurrent(index);
  }, [open, index]);

  const close = useCallback(() => {
    document.body.style.overflow = "";
    lastFocused.current?.focus?.();
    onClose();
  }, [onClose]);

  const goTo = useCallback(
    (next: number) => {
      if (images.length === 0) return;
      setCurrent(((next % images.length) + images.length) % images.length);
    },
    [images.length]
  );

  // Keyboard navigation + focus trap
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(current - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(current + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, current, goTo, close]);

  useEffect(() => {
    if (!open || !lightboxRef.current) return;
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
  }, [open]);

  if (!open || images.length === 0) return null;

  const image = images[current];

  return (
    <div
      ref={lightboxRef}
      className="image-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <button
        className="lightbox-close"
        aria-label="Close lightbox"
        onClick={close}
      >
        <X size={24} />
      </button>

      {images.length > 1 && (
        <>
          <button
            className="lightbox-nav lightbox-prev"
            aria-label="Previous image"
            onClick={() => goTo(current - 1)}
          >
            <ChevronLeft size={28} />
          </button>
          <button
            className="lightbox-nav lightbox-next"
            aria-label="Next image"
            onClick={() => goTo(current + 1)}
          >
            <ChevronRight size={28} />
          </button>
        </>
      )}

      <figure className="lightbox-figure">
        <img
          src={image.src}
          alt={image.alt}
          className="lightbox-image"
        />
        <figcaption className="lightbox-caption">
          <div className="lightbox-caption-top">
            {image.title && <h3>{image.title}</h3>}
            {image.badge}
          </div>
          <div className="lightbox-caption-bottom">
            {image.caption && <span>{image.caption}</span>}
            {image.meta}
          </div>
        </figcaption>
      </figure>

      <div className="lightbox-counter">
        {current + 1} / {images.length}
      </div>
    </div>
  );
}