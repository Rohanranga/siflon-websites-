import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MobileNav } from "./mobile-nav";

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
        <Link href="#group">The Group</Link>
        <Link href="#businesses">Our Businesses</Link>
        <Link href="#manufacturing">Manufacturing</Link>
        <Link href="/gallery">Gallery</Link>
        <Link href="/resources">Resources</Link>
        <Link href="#story">Our Story</Link>
        <Link href="#capabilities">Capabilities</Link>
        <Link href="#contact">Contact</Link>
      </nav>
      <Link className="header-cta" href="#businesses">
        Explore businesses <ArrowUpRight size={16} />
      </Link>
      <MobileNav />
    </header>
  );
}