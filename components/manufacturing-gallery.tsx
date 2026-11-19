"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { HoverRevealCards, CardItem } from "@/components/ui/hover-reveal-cards";

interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryRow {
  image: GalleryImage;
  imageSide: "left" | "right";
  number: string;
  category: string;
  heading: string;
  description: string;
  details?: string[];
}

interface ManufacturingGalleryProps {
  images: GalleryImage[];
  rows?: GalleryRow[];
}

const ROW_COLORS = [
  "#4FB7E8",
  "#477A9E",
  "#5FA8B8",
  "#3E6B8A",
  "#6BB3C8",
];

function buildRows(images: GalleryImage[], rows?: GalleryRow[]): GalleryRow[] {
  if (rows && rows.length > 0) {
    return rows.map((row, index) => ({
      ...row,
      image: row.image ?? { src: images[index]?.src ?? "", alt: row.heading },
      imageSide: row.imageSide ?? (index % 2 === 0 ? "left" : "right"),
      number: row.number ?? String(index + 1).padStart(2, "0"),
    }));
  }
  return images.map((image, index) => ({
    image,
    imageSide: index % 2 === 0 ? "left" : "right",
    number: String(index + 1).padStart(2, "0"),
    category: "Manufacturing facility",
    heading: image.alt,
    description:
      "Representative facility imagery from the Siflon Group production sites. " +
      "Specific facility and business association are pending verification.",
  }));
}

export function ManufacturingGallery({ images, rows }: ManufacturingGalleryProps) {
  const galleryRows = buildRows(images, rows);
  const [visibleCount, setVisibleCount] = useState(4);
  const [active, setActive] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [lineColor, setLineColor] = useState(ROW_COLORS[0]);
  const rowRefs = useRef<(HTMLElement | null)[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);

  const visibleRows = galleryRows.slice(0, visibleCount);

  const handleScroll = useCallback(() => {
    if (typeof window === "undefined") return;
    const first = rowRefs.current[0];
    const last = rowRefs.current[visibleRows.length - 1];
    if (!first || !last) return;
    const scrollY = window.scrollY + window.innerHeight * 0.5;
    const start = first.getBoundingClientRect().top + window.scrollY;
    const end = last.getBoundingClientRect().top + window.scrollY + last.offsetHeight;
    let fraction = 0;
    if (scrollY <= start) fraction = 0;
    else if (scrollY >= end) fraction = 1;
    else fraction = (scrollY - start) / (end - start);
    setProgress(fraction * 100);
  }, [visibleRows.length]);

  // Update the active row and line colour as rows enter view
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setActive(0);
      setProgress(100);
      setLineColor(ROW_COLORS[0]);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = rowRefs.current.indexOf(entry.target as HTMLElement);
          if (index === -1) return;
          if (entry.isIntersecting) {
            setActive(index);
            setLineColor(ROW_COLORS[index % ROW_COLORS.length]);
          }
        });
      },
      { threshold: 0.45 }
    );

    rowRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, visibleRows.length]);

  if (galleryRows.length === 0) {
    return (
      <div className="gallery-empty">
        <p>Manufacturing photographs are pending visual review before publication.</p>
      </div>
    );
  }

  const timelineStyle = {
    "--mfg-progress": `${progress}%`,
    "--mfg-line-color": lineColor,
  } as React.CSSProperties;

  const showMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, galleryRows.length));
  };

  // Convert visible rows to card items for hover-reveal effect
  const cardItems: CardItem[] = visibleRows.map((row) => ({
    id: `mfg-${row.number}`,
    title: row.heading,
    subtitle: row.category,
    imageUrl: row.image.src,
  }));

  return (
    <div className="mfg-gallery-wrapper">
      <div ref={timelineRef} className="mfg-timeline">
        <div
          className="mfg-timeline-line"
          aria-hidden="true"
          style={timelineStyle}
        >
          <span className="mfg-timeline-glow" />
        </div>
        <div className="mfg-rows">
          {visibleRows.map((row, index) => {
            const imageSide = row.imageSide ?? (index % 2 === 0 ? "left" : "right");
            return (
              <article
                key={row.number}
                ref={(el) => {
                  rowRefs.current[index] = el;
                }}
                className={`mfg-row mfg-${imageSide}`}
              >
                <div
                  className="mfg-timeline-node"
                  data-active={active === index}
                  aria-hidden="true"
                />
                <figure className="mfg-image">
                  <img
                    src={row.image.src}
                    alt={row.image.alt}
                    loading="lazy"
                  />
                  <span className="mfg-image-cap">{row.image.alt}</span>
                </figure>
                <div className="mfg-content">
                  <div className="mfg-head">
                    <span className="mfg-num">{row.number}</span>
                    <span className="mfg-tag">{row.category}</span>
                  </div>
                  <h3>{row.heading}</h3>
                  <p className="mfg-desc">{row.description}</p>
                  {row.details && row.details.length > 0 && (
                    <ul className="mfg-details">
                      {row.details.map((detail, detailIndex) => (
                        <li key={detailIndex}>{detail}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Hover-reveal card grid for manufacturing images */}
      <HoverRevealCards
        items={cardItems}
        cols={4}
        height="h-72"
        cardClassName="mfg-reveal-card"
      />

      {visibleCount < galleryRows.length && (
        <div className="gallery-show-more">
          <button className="gallery-show-more-btn" onClick={showMore}>
            Show more facilities <ChevronDown size={18} />
          </button>
        </div>
      )}
    </div>
  );
}