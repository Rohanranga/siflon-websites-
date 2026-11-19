"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X, Home, Image, Package, FolderKanban, MapPin, Building2, ChevronDown, ExternalLink,
} from "lucide-react";
import { LiquidNavbar, NimbusIcons } from "@/components/ui/liquid-glass-navbar";

const NAV_LINKS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Products", href: "/products", icon: Package },
  { label: "Gallery", href: "/gallery", icon: Image },
];

const MORE_LINKS = [
  { label: "Resources", href: "/resources", icon: FolderKanban },
  { label: "Locations", href: "/locations", icon: MapPin },
];

// Map paths to active nav index
function getActiveIndex(pathname: string): number {
  if (pathname === "/") return 0;
  if (pathname.startsWith("/products")) return 1;
  if (pathname.startsWith("/gallery")) return 2;
  if (pathname.startsWith("/resources")) return 3;
  if (pathname.startsWith("/locations")) return 4;
  return 0;
}

export function SiteHeader() {
  const pathname = usePathname();
  const activeIndex = getActiveIndex(pathname);

  return (
    <header className="site-header">
      <Link className="header-logo-link" href="/" aria-label="Siflon Group home">
        <img
          className="header-logo"
          src="/images/siflon-gemini-logo.png"
          alt="Siflon Group"
          width="195"
          height="65"
        />
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        <LiquidNavbar
          tone="light"
          active={activeIndex}
          items={[
            { label: "Home", icon: NimbusIcons.home, fx: "glow", href: "/" },
            { label: "Products", icon: NimbusIcons.box, fx: "pop", href: "/products" },
            { label: "Gallery", icon: NimbusIcons.image, fx: "wave", href: "/gallery" },
            { label: "Resources", icon: NimbusIcons.folder, fx: "spin", href: "/resources" },
            { label: "Locations", icon: NimbusIcons.pin, fx: "drop", href: "/locations" },
          ]}
        />
      </nav>
      <MobileNav />
    </header>
  );
}

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
                <Icon size={16} aria-hidden />
                {link.label}
              </a>
            );
          })}
          {MORE_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
                <Icon size={16} aria-hidden />
                {link.label}
              </a>
            );
          })}
        </nav>
      </div>
    </>
  );
}