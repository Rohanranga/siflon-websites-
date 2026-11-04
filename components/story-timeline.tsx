"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { TIMELINE } from "@/data/company-timeline";

export function StoryTimeline() {
  const [active, setActive] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const handleScroll = useCallback(() => {
    if (typeof window === "undefined" || !listRef.current) return;
    const first = itemRefs.current[0];
    const last = itemRefs.current[itemRefs.current.length - 1];
    if (!first || !last) return;
    const scrollY = window.scrollY + window.innerHeight * 0.5;
    const start = first.getBoundingClientRect().top + window.scrollY;
    const end = last.getBoundingClientRect().top + window.scrollY + last.offsetHeight;
    let fraction = 0;
    if (scrollY <= start) fraction = 0;
    else if (scrollY >= end) fraction = 1;
    else fraction = (scrollY - start) / (end - start);
    setProgress(fraction * 100);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setActive(0);
      setProgress(100);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = itemRefs.current.indexOf(entry.target as HTMLLIElement);
          if (index === -1) return;
          if (entry.isIntersecting) {
            setActive(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <ol
      ref={listRef}
      className="story-timeline"
      style={{ ["--tl-progress" as string]: `${progress}%` }}
    >
      {TIMELINE.map((milestone, index) => {
        const isYearLeft = index % 2 === 0;
        return (
          <li
            key={`${milestone.year}-${index}`}
            ref={(el) => {
              itemRefs.current[index] = el;
              if (el) el.classList.add("is-visible");
            }}
            className={`story-timeline-item${isYearLeft ? " year-left" : " year-right"}`}
          >
            <span className="timeline-year">{milestone.year}</span>
            <span
              className="timeline-marker"
              data-active={active === index}
              aria-hidden="true"
            />
            <div className="timeline-body">
              <p>{milestone.event}</p>
              <span className="timeline-source">Source: {milestone.source}</span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}