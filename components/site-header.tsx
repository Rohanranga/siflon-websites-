import Link from "next/link";
import { Home, Image, Package } from "lucide-react";
import { MobileNav } from "./mobile-nav";

const NAV_LINKS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Gallery", href: "/gallery", icon: Image },
  { label: "Products", href: "/products", icon: Package },
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
      </nav>
      <MobileNav />
    </header>
  );
}