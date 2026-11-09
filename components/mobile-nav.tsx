"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const LINKS = [
  { label: "Gallery", href: "/gallery" },
  { label: "Products", href: "/products" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const focusable = panelRef.current?.querySelector<HTMLElement>(
      "a[href], button:not([disabled])"
    );
    focusable?.focus();
    return () => { previous?.focus?.(); };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        className="mobile-menu"
        aria-label="Menu"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X size={18} /> : <span aria-hidden>☰</span>}
      </button>
      {open && (
        <div className="mobile-nav-backdrop" onClick={() => setOpen(false)} />
      )}
      <div
        id="mobile-nav"
        ref={panelRef}
        className={`mobile-nav-panel${open ? " is-open" : ""}`}
        aria-hidden={!open}
      >
        <nav aria-label="Mobile navigation">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}