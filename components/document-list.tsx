import { ArrowUpRight } from "lucide-react";
import type { PublicDocument, ResourceCategory } from "@/data/resources";

interface DocumentListProps {
  documents: PublicDocument[];
  emptyMessage: string;
}

function DocumentCard({ document }: { document: PublicDocument }) {
  return (
    <article className="document-card">
      <div className="document-card-head">
        <span className="document-type">{document.documentType}</span>
        <span className="document-date">{document.availableDate}</span>
      </div>
      <h3>{document.title}</h3>
      <p className="document-business">{document.business}</p>
      <a
        href={document.href}
        target="_blank"
        rel="noreferrer"
        className="document-link"
      >
        View / Download <ArrowUpRight size={15} />
      </a>
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