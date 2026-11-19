import GlassFolder, { type FolderFile, type FolderArt } from "@/components/ui/glass-folder-cards";
import type { PublicDocument, ResourceCategory } from "@/data/resources";

interface ResourceSectionProps {
  category: ResourceCategory;
  label: string;
  description: string;
  documents: PublicDocument[];
  emptyMessage: string;
}

const ART_BY_CATEGORY: Record<ResourceCategory, FolderArt> = {
  "corporate-profile": "aurora",
  brochures: "dusk",
  "product-catalogues": "ember",
  "pharma-documents": "verdant",
  "drugs-documents": "glacier",
  "polymers-documents": "aurora",
  "pipes-documents": "none",
  "certifications-quality": "dusk",
  "manufacturing-licences": "ember",
  registrations: "none",
};

function toFolderFile(doc: PublicDocument): FolderFile {
  return {
    name: doc.title,
    meta: doc.documentType,
    href: doc.href,
  };
}

export function ResourceSection({
  category,
  label,
  description,
  documents,
  emptyMessage,
}: ResourceSectionProps) {
  const art = ART_BY_CATEGORY[category] ?? "none";
  const files: FolderFile[] = documents.map(toFolderFile);

  if (documents.length === 0) {
    return (
      <section className="resource-section" id={`resources-${category}`}>
        <div className="resource-section-head">
          <div>
            <span className="resource-count">
              0 documents
            </span>
            <h2>{label}</h2>
          </div>
          <p>{description}</p>
        </div>
        <div className="document-empty">
          <p>{emptyMessage}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="resource-section" id={`resources-${category}`}>
      <div className="resource-section-head">
        <div>
          <span className="resource-count">
            {documents.length} {documents.length === 1 ? "document" : "documents"}
          </span>
          <h2>{label}</h2>
        </div>
        <p>{description}</p>
      </div>
      <div className="resource-folder-wrap">
        <GlassFolder
          label={label}
          meta={`${documents.length} ${documents.length === 1 ? "document" : "documents"}`}
          art={art}
          tone="light"
          action="none"
          labelPlacement="top-left"
          files={files}
          width={320}
        />
      </div>
    </section>
  );
}