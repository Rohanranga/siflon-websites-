import { DocumentList } from "./document-list";
import type { PublicDocument, ResourceCategory } from "@/data/resources";

interface ResourceSectionProps {
  category: ResourceCategory;
  label: string;
  description: string;
  documents: PublicDocument[];
  emptyMessage: string;
}

export function ResourceSection({
  category,
  label,
  description,
  documents,
  emptyMessage,
}: ResourceSectionProps) {
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
      <DocumentList documents={documents} emptyMessage={emptyMessage} />
    </section>
  );
}