"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X, Home, Image, Package, FolderKanban, MapPin, Building2, ChevronDown, ExternalLink,
} from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Products", href: "/products", icon: Package },
  { label: "Gallery", href: "/gallery", icon: Image },
];

const MORE_LINKS = [
  { label: "Resources", href: "/resources", icon: FolderKanban },
  { label: "Locations", href: "/locations", icon: MapPin },
];

interface CompanyLink {
  label: string;
  href: string;
}

const COMPANIES: CompanyLink[] = [
  { label: "Siflon Drugs", href: "/businesses/siflon-drugs" },
  { label: "Siflon Polymers", href: "/businesses/siflon-polymers" },
  { label: "Siflon Pharma", href: "/businesses/siflon-pharma" },
  { label: "Siflon Pipes", href: "/businesses/siflon-pipes" },
];

export function SiteHeader() {
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
        {NAV_LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <Link key={link.href} href={link.href} className="nav-link">
              <Icon size={15} aria-hidden />
              {link.label}
            </Link>
          );
        })}
        {/* Resources & Locations */}
        {MORE_LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <Link key={link.href} href={link.href} className="nav-link">
              <Icon size={15} aria-hidden />
              {link.label}
            </Link>
          );
        })}
        {/* Companies dropdown */}
        <CompaniesDropdown />
      </nav>
      <MobileNav />
    </header>
  );
}

function CompaniesDropdown() {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className="nav-dropdown"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseEnter}
    >
      <button
        className="nav-link nav-dropdown-toggle"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <Building2 size={15} aria-hidden />
        Our Companies
        <ChevronDown size={12} className={`dropdown-chevron${open ? " is-open" : ""}`} />
      </button>
      {open && (
        <ul className="nav-dropdown-menu" role="menu">
          {COMPANIES.map((company) => (
            <li key={company.href} role="none">
              <Link
                href={company.href}
                className="nav-dropdown-item"
                onClick={() => setOpen(false)}
                role="menuitem"
              >
                {company.label}
                <ExternalLink size={11} aria-hidden />
              </Link>
            </li>
          ))}
          <li role="menuitem">
            <Link href="/about" className="nav-dropdown-item nav-dropdown-explore">
              Explore the group →
            </Link>
          </li>
        </ul>
      )}
    </div>
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
          {/* Companies mobile submenu */}
          <MobileCompaniesList onClose={() => setOpen(false)} />
        </nav>
      </div>
    </>
  );
}

function MobileCompaniesList({ onClose }: { onClose: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mobile-companies-group">
      <button
        className="mobile-companies-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <Building2 size={16} aria-hidden />
        Our Companies
        <ChevronDown size={14} className={`mobile-dropdown-chevron${open ? " is-open" : ""}`} />
      </button>
      {open && (
        <div className="mobile-companies-sub">
          {COMPANIES.map((c) => (
            <a key={c.href} href={c.href} onClick={onClose}>
              {c.label}
            </a>
          ))}
          <a href="/about" onClick={onClose}>Explore the group</a>
        </div>
      )}
    </div>
  );
}