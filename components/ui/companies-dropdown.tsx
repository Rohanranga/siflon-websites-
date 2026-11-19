"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Building2, ChevronDown, ExternalLink } from "lucide-react";
import { SilkThreadWrapper } from "./silk-thread-wrapper";

interface CompanyLink {
  label: string;
  href: string;
}

const COMPANIES = [
  { label: "Siflon Drugs", href: "/businesses/siflon-drugs" },
  { label: "Siflon Polymers", href: "/businesses/siflon-polymers" },
  { label: "Siflon Pharma", href: "/businesses/siflon-pharma" },
  { label: "Siflon Pipes", href: "/businesses/siflon-pipes" },
];

// Shared dropdown component that can be used in both header and hero
export function CompaniesDropdown() {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    // Check if we're moving to the dropdown menu
    const relatedTarget = e.relatedTarget as HTMLElement | null;
    if (relatedTarget && relatedTarget.closest(".nav-dropdown-menu")) {
      return; // Don't close if moving to the dropdown menu
    }
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
      onMouseLeave={handleMouseLeave}
    >
      <SilkThreadWrapper reach={120} threads={4} threadColor="#253C80">
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
      </SilkThreadWrapper>
      {open && (
        <ul className="nav-dropdown-menu" role="menu" onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); setOpen(true); }}>
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
            <Link href="/about" className="nav-dropdown-item nav-dropdown-explore" onClick={() => setOpen(false)}>
              Explore the group →
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

// Shared dropdown component that can be used in both header and hero
export function CompaniesDropdownHero() {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    // Check if we're moving to the dropdown menu
    const relatedTarget = e.relatedTarget as HTMLElement | null;
    if (relatedTarget && relatedTarget.closest(".nav-dropdown-menu")) {
      return; // Don't close if moving to the dropdown menu
    }
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
      onMouseLeave={handleMouseLeave}
    >
      <SilkThreadWrapper reach={180} threads={6} threadColor="#253C80">
        <button
          className="hero-companies-button"
          aria-haspopup="true"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="hero-companies-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
              <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
              <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
            </svg>
          </span>
          <span>Our Companies</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </SilkThreadWrapper>
      {open && (
        <ul className="nav-dropdown-menu" role="menu" onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); setOpen(true); }}>
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
            <Link href="/about" className="nav-dropdown-item nav-dropdown-explore" onClick={() => setOpen(false)}>
              Explore the group →
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}