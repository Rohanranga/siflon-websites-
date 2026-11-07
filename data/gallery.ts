export type GalleryCategory =
  | "facilities"
  | "exhibitions"
  | "clients"
  | "people";

export interface GalleryImage {
  id: string;
  category: GalleryCategory;
  filename: string;
  path: string;
  width: number;
  height: number;
  altText: string;
  caption: string | null;
  suitableForPublicDisplay: boolean;
  visualReviewStatus: "pending";
  assignedSection: string | null;
}

export const GALLERY: GalleryImage[] = [];