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
  description?: string;
  approved: boolean;
}

export const RESOURCE_CATEGORIES: {
  id: ResourceCategory;
  label: string;
  description: string;
}[] = [
  { id: "corporate-profile", label: "Corporate Profile & API Portfolio", description: "Company introduction, API products and technical profiles." },
  { id: "brochures", label: "Company Brochures", description: "Source brochures and published master lists." },
  { id: "product-catalogues", label: "Product Catalogues", description: "Product categories and formulation profiles." },
];

export const PUBLIC_DOCUMENTS: PublicDocument[] = [
  {
    id: "vet-api-profile",
    title: "Veterinary API profile",
    business: "Siflon Drugs",
    category: "corporate-profile",
    categoryLabel: "API PORTFOLIO",
    documentType: "PDF Document",
    availableDate: "2025",
    href: "/documents/drugs/api-profile.pdf",
    description: "Company introduction, API products and technical profiles.",
    approved: true,
  },
  {
    id: "drugs-brochure-2025",
    title: "Siflon Drugs brochure 2025",
    business: "Siflon Drugs",
    category: "brochures",
    categoryLabel: "SOURCE BROCHURE",
    documentType: "PDF Document",
    availableDate: "2025",
    href: "/documents/drugs/siflon-drugs-brochure-2025.pdf",
    description: "The current Siflon Drugs source brochure, retained with its published API master list and technical profiles.",
    approved: true,
  },
  {
    id: "formulation-catalogue",
    title: "Formulation product catalogue",
    business: "Siflon Pharma",
    category: "product-catalogues",
    categoryLabel: "ANIMAL HEALTH",
    documentType: "PDF Document",
    availableDate: "2025",
    href: "/documents/pharma/formulation-catalogue.pdf",
    description: "Product categories and formulation profiles from Siflon Pharma.",
    approved: true,
  },
  {
    id: "formulation-overview",
    title: "Formulation overview",
    business: "Siflon Pharma",
    category: "product-catalogues",
    categoryLabel: "PRODUCT DIRECTORY",
    documentType: "PDF Document",
    availableDate: "2025",
    href: "/documents/pharma/formulation-profile.pdf",
    description: "A compact overview of the formulation portfolio.",
    approved: true,
  },
];

export function getDocumentsByCategory(category: ResourceCategory): PublicDocument[] {
  return PUBLIC_DOCUMENTS.filter((document) => document.category === category);
}