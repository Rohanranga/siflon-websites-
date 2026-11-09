import { ReactNode } from "react";
import { SiteHeader } from "./site-header";

interface PageShellProps {
  children: ReactNode;
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export function PageShell({ children, eyebrow, title, subtitle }: PageShellProps) {
  return (
    <main>
      <SiteHeader />
      <section className="page-hero">
        <div className="section-shell page-hero-inner">
          {eyebrow && <div className="eyebrow">{eyebrow}</div>}
          <h1>{title}</h1>
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
        </div>
      </section>
      <div className="section-shell page-body">{children}</div>
    </main>
  );
}
