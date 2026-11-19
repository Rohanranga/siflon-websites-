import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { ExpandedFooter } from "@/components/expanded-footer";

export const metadata: Metadata = {
  title: "Siflon Group | Diverse Expertise. One Group.",
  description: "Discover Siflon Group's specialist businesses across pharmaceuticals, animal health and advanced industrial materials.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="sr-only focus-visible focus-md:focus-in-block">
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main">
          {children}
        </main>
        <ExpandedFooter />
      </body>
    </html>
  );
}