export type ResourceCategory =
  | "brochures"
  | "corporate-profile"
  | "product-catalogues"
  | "pharma-documents"
  | "drugs-documents"
  | "polymers-documents"
  | "pipes-documents"
  | "certifications-quality"
  | "manufacturing-licences"
  | "registrations";

export interface PublicDocument {
  id: string;
  title: string;
  business: string;
  category: ResourceCategory;
  categoryLabel: string;
  documentType: string;
  availableDate: string;
  href: string;
  /** True when the document has been approved for public distribution. */
  approved: boolean;
}

export const RESOURCE_CATEGORIES: {
  id: ResourceCategory;
  label: string;
  description: string;
}[] = [
  { id: "brochures", label: "Company Brochures", description: "Company brochures approved for public distribution." },
  { id: "corporate-profile", label: "Corporate Profile", description: "Corporate profile documents approved for public distribution." },
  { id: "product-catalogues", label: "Product Catalogues", description: "Product catalogues approved for public distribution." },
  { id: "pharma-documents", label: "Pharma Documents", description: "Siflon Pharma documents approved for public distribution." },
  { id: "drugs-documents", label: "Drugs Documents", description: "Siflon Drugs documents approved for public distribution." },
  { id: "polymers-documents", label: "Polymers Documents", description: "Siflon Polymers documents approved for public distribution." },
  { id: "pipes-documents", label: "Pipes Documents", description: "Siflon Pipes documents approved for public distribution." },
  { id: "certifications-quality", label: "Certifications & Quality Documents", description: "Quality certifications approved for public distribution." },
  { id: "manufacturing-licences", label: "Manufacturing Licences", description: "Manufacturing licences approved for public distribution." },
  { id: "registrations", label: "Registrations and Other Documents", description: "Registrations and other documents approved for public distribution." },
];

/**
 * Public resources.
 *
 * The `public/documents/` folder structure exists for brochures, catalogues,
 * certifications, drugs, licences, pharma, pipes, polymers, profile and
 * registrations, but every one of those folders is currently empty. No
 * document has yet been approved for public distribution, so the resources
 * page shows a clean empty state per category rather than publishing
 * confidential, expired, unverified or internal documents.
 *
 * Certificates, licences and registrations held in `internal-assets/` are
 * internal only and are intentionally not listed here.
 */
export const PUBLIC_DOCUMENTS: PublicDocument[] = [];

export function getDocumentsByCategory(category: ResourceCategory): PublicDocument[] {
  return PUBLIC_DOCUMENTS.filter((document) => document.category === category);
}