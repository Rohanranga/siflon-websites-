import { PageShell } from "@/components/page-shell";
import { ResourceSection } from "@/components/resource-section";
import {
  RESOURCE_CATEGORIES,
  PUBLIC_DOCUMENTS,
  getDocumentsByCategory,
} from "@/data/resources";

const EMPTY_MESSAGES: Record<string, string> = {
  brochures:
    "No company brochures have been approved for public distribution yet.",
  "corporate-profile":
    "No corporate profile document has been approved for public distribution yet.",
  "product-catalogues":
    "No product catalogues have been approved for public distribution yet.",
  "pharma-documents":
    "No Siflon Pharma documents have been approved for public distribution yet.",
  "drugs-documents":
    "No Siflon Drugs documents have been approved for public distribution yet.",
  "polymers-documents":
    "No Siflon Polymers documents have been approved for public distribution yet.",
  "pipes-documents":
    "No Siflon Pipes documents have been approved for public distribution yet.",
  "certifications-quality":
    "No quality certifications have been approved for public distribution yet.",
  "manufacturing-licences":
    "No manufacturing licences have been approved for public distribution yet.",
  registrations:
    "No registrations or other documents have been approved for public distribution yet.",
};

export default function ResourcesPage() {
  const totalApproved = PUBLIC_DOCUMENTS.length;

  return (
    <PageShell
      eyebrow="Resources"
      title="Documents and publications."
      subtitle="Publicly available documents, publications and quality certifications for the Siflon Group businesses. Certificates, licences and registrations held internally are not published here."
    >
      <section className="resources-section">
        <div className="section-shell">
          <div className="resources-intro">
            <p>
              {totalApproved === 0
                ? "No documents have yet been approved for public distribution. The folder structure below is prepared for brochures, catalogues, certifications, licences and registrations; each category will publish documents once they are approved."
                : `${totalApproved} document${totalApproved === 1 ? "" : "s"} approved for public distribution.`}
            </p>
            <p className="resources-note">
              Certificates, manufacturing licences and registrations held in the
              internal-assets folder are confidential or internal and are not
              published on this page. Registrations and licences are not presented
              as quality certifications.
            </p>
          </div>

          {RESOURCE_CATEGORIES.map((category) => (
            <ResourceSection
              key={category.id}
              category={category.id}
              label={category.label}
              description={category.description}
              documents={getDocumentsByCategory(category.id)}
              emptyMessage={EMPTY_MESSAGES[category.id] ?? category.description}
            />
          ))}
        </div>
      </section>
    </PageShell>
  );
}