import Link from "next/link";
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
        <Link href="/gallery">Gallery</Link>
        <Link href="/products">Products</Link>
      </nav>
      <MobileNav />
    </header>
  );
}