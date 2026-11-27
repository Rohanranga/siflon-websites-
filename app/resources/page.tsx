"use client"

import GlassFolder from "@/components/ui/glass-folder-cards"

export default function ResourcesPage() {
  return (
    <div
      className="relative flex w-full flex-col items-center justify-center overflow-hidden px-6 py-20"
      style={{ minHeight: "100svh" }}
    >
      {/* subtle dot grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1.1px, transparent 1.4px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* heading */}
      <div className="relative mb-16 text-center">
        <p className="mb-3 font-mono text-[11px] tracking-[0.2em] uppercase opacity-50">Resources</p>
        <h1 className="text-4xl font-medium tracking-tight" style={{ letterSpacing: "-0.025em" }}>
          Documents & Publications
        </h1>
        <p className="mt-4 max-w-xl text-base opacity-60 leading-relaxed">
          Publicly available documents, publications and quality certifications for the Siflon Group businesses.
          Hover to preview · Click to open.
        </p>
      </div>

      {/* folder grid */}
      <div className="relative grid max-w-[1180px] grid-cols-1 items-end justify-items-center gap-x-14 gap-y-16 md:grid-cols-2 xl:grid-cols-4">
        <GlassFolder
          label="Siflon Pharma"
          meta="Brochures & Profiles"
          art="aurora"
          seed={3}
          action="none"
          labelPlacement="bottom-left"
          appearDelay={0}
          files={[
            { name: "Company Brochure", meta: "PDF · 2024", href: "/documents/pharma/company-brochure.pdf" },
            { name: "Product Portfolio", meta: "PDF · 4.2 MB", href: "/documents/pharma/product-portfolio.pdf" },
            { name: "API Profiles", meta: "PDF · 1.8 MB", href: "/documents/pharma/api-profiles.pdf" },
          ]}
        />

        <GlassFolder
          label="Siflon Drugs"
          meta="API & Technical Docs"
          art="ember"
          seed={7}
          tone="dark"
          action="none"
          labelPlacement="bottom-left"
          appearDelay={120}
          files={[
            { name: "API Dossier", meta: "PDF · 3.1 MB", href: "/documents/drugs/api-dossier.pdf" },
            { name: "Drug Master File", meta: "PDF · 2024", href: "/documents/drugs/drug-master-file.pdf" },
            { name: "Stability Data", meta: "PDF · 890 KB", href: "/documents/drugs/stability-data.pdf" },
          ]}
        />

        <GlassFolder
          label="Siflon Polymers"
          meta="Technical Specifications"
          art="verdant"
          seed={11}
          action="none"
          labelPlacement="bottom-left"
          appearDelay={240}
          files={[
            { name: "Product Catalogue", meta: "PDF · 5.4 MB", href: "/documents/polymers/product-catalogue.pdf" },
            { name: "Technical Datasheet", meta: "PDF · 1.1 MB", href: "/documents/polymers/technical-datasheet.pdf" },
            { name: "MSDS Sheets", meta: "PDF · 2.6 MB", href: "/documents/polymers/msds-sheets.pdf" },
          ]}
        />

        <GlassFolder
          label="Corporate"
          meta="Group Documents"
          art="dusk"
          seed={5}
          tone="dark"
          action="none"
          labelPlacement="bottom-left"
          appearDelay={360}
          files={[
            { name: "Corporate Profile", meta: "PDF · 2024", href: "/documents/corporate/corporate-profile.pdf" },
            { name: "Quality Policy", meta: "PDF · 480 KB", href: "/documents/corporate/quality-policy.pdf" },
            { name: "Certifications", meta: "PDF · 1.3 MB", href: "/documents/corporate/certifications.pdf" },
          ]}
        />
      </div>

      <p className="relative mt-16 font-mono text-[11px] tracking-[0.18em] opacity-40 uppercase">
        Hover to lean · Click to open
      </p>
    </div>
  )
}