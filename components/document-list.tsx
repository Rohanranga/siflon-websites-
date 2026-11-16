import { FileText, Download } from "lucide-react";
import type { PublicDocument, ResourceCategory } from "@/data/resources";

interface DocumentListProps {
  documents: PublicDocument[];
  emptyMessage: string;
}

function DocumentCard({ document }: { document: PublicDocument }) {
  return (
    <article className="document-card">
      <div className="document-card-icon">
        <FileText size={28} />
      </div>
      <div className="document-category-label">{document.categoryLabel}</div>
      <h3 className="document-card-title">{document.title}</h3>
      {document.description && (
        <p className="document-card-desc">{document.description}</p>
      )}
      <div className="document-card-actions">
        <a
          href={document.href}
          target="_blank"
          rel="noreferrer"
          className="document-download-btn"
        >
          Download PDF <Download size={14} />
        </a>
        <a
          href="mailto:info@siflongroup.com?subject=Request%20Current%20Version%3A%20"
          className="document-request-link"
        >
          Request the current version
        </a>
      </div>
    </article>
  );
}

export function DocumentList({
  documents,
  emptyMessage,
}: DocumentListProps) {
  if (documents.length === 0) {
    return (
      <div className="document-empty">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="document-grid">
      {documents.map((document) => (
        <DocumentCard key={document.id} document={document} />
      ))}
    </div>
  );
}

export type { ResourceCategory };