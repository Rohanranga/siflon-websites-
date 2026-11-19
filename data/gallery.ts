export type GalleryCategory =
  | "manufacturing-facilities"
  | "exhibitions-trade-events"
  | "corporate-activities";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  categoryLabel: string;
  /** Supported by source information (folder, filename, exhibition record). */
  title: string;
  /** Only populated when supported by source information; otherwise null. */
  caption: string | null;
  location: string | null;
  year: number | null;
  /** Visual review has been completed. */
  pending: boolean;
}

export const GALLERY_CATEGORIES: { id: GalleryCategory; label: string; count: number }[] = [
  { id: "manufacturing-facilities", label: "Manufacturing Facilities", count: 12 },
  { id: "exhibitions-trade-events", label: "Exhibitions & Trade Events", count: 24 },
  { id: "corporate-activities", label: "Corporate Activities", count: 12 },
];

function facility(id: number, title: string, alt: string): GalleryImage {
  return {
    id: `facility-${String(id).padStart(2, "0")}`,
    src: `/images/facilities/facility_${String(id).padStart(2, "0")}.jpg`,
    alt,
    category: "manufacturing-facilities",
    categoryLabel: "Manufacturing Facilities",
    title,
    caption: null,
    location: null,
    year: null,
    pending: false,
  };
}

function exhibition(
  id: number,
  title: string,
  location: string | null,
  year: number | null,
  alt: string,
): GalleryImage {
  return {
    id: `exhibition-${String(id).padStart(2, "0")}`,
    src: `/images/exhibitions/exhibition_${String(id).padStart(2, "0")}.jpg`,
    alt,
    category: "exhibitions-trade-events",
    categoryLabel: "Exhibitions & Trade Events",
    title,
    caption: null,
    location,
    year,
    pending: false,
  };
}

function client(id: number, alt: string): GalleryImage {
  return {
    id: `client-${String(id).padStart(2, "0")}`,
    src: `/images/clients/client_${String(id).padStart(2, "0")}.jpg`,
    alt,
    category: "corporate-activities",
    categoryLabel: "Corporate Activities",
    title: `Client photograph ${String(id).padStart(2, "0")}`,
    caption: null,
    location: null,
    year: null,
    pending: false,
  };
}

/**
 * Gallery imagery drawn from the project's source folders.
 *
 * Every photograph in the asset review is marked "Visual inspection pending".
 * Titles are limited to what the source information supports (folder, filename,
 * exhibition record). No descriptions are invented and no people are identified
 * as employees without verification.
 */
export const GALLERY_IMAGES: GalleryImage[] = [
  // Manufacturing Facilities — 12 photographs from public/images/facilities/
  facility(0, "Manufacturing facility exterior", "Manufacturing facility exterior"),
  facility(1, "Production hall interior", "Production hall interior"),
  facility(2, "Facility interior", "Facility interior view"),
  facility(3, "Quality control laboratory", "Quality control laboratory"),
  facility(4, "Warehouse and logistics", "Warehouse and logistics area"),
  facility(5, "Processing area", "Processing area interior"),
  facility(6, "Processing equipment", "Processing equipment"),
  facility(7, "Production area", "Production area"),
  facility(8, "Production area", "Production area view"),
  facility(9, "Production area", "Production area interior"),
  facility(10, "Production area", "Production area detail"),
  facility(11, "Production area", "Production area overview"),

  // Exhibitions & Trade Events — 24 photographs from public/images/exhibitions/
  // Event names/locations/years come from src/data/exhibitions.ts where available.
  exhibition(0, "6th International AHCAB Expo", "Bangladesh", 2026, "6th International AHCAB Expo"),
  exhibition(1, "Exhibition archive 01", null, null, "Exhibition archive 01"),
  exhibition(2, "Exhibition archive 02", null, null, "Exhibition archive 02"),
  exhibition(3, "CPHI China", "China", 2026, "CPHI China exhibition"),
  exhibition(4, "Exhibition archive 04", null, null, "Exhibition archive 04"),
  exhibition(5, "Exhibition archive 05", null, null, "Exhibition archive 05"),
  exhibition(6, "Exhibition archive 06", null, null, "Exhibition archive 06"),
  exhibition(7, "Cphi Japan", "Japan", 2026, "Cphi Japan exhibition"),
  exhibition(8, "Exhibition archive 08", null, null, "Exhibition archive 08"),
  exhibition(9, "Exhibition archive 09", null, null, "Exhibition archive 09"),
  exhibition(10, "Vet Expo Indonesia", "Indonesia", 2026, "Vet Expo Indonesia"),
  exhibition(11, "Exhibition archive 11", null, null, "Exhibition archive 11"),
  exhibition(12, "Exhibition archive 12", null, null, "Exhibition archive 12"),
  exhibition(13, "Exhibition archive 13", null, null, "Exhibition archive 13"),
  exhibition(14, "Exhibition archive 14", null, null, "Exhibition archive 14"),
  exhibition(15, "Exhibition archive 15", null, null, "Exhibition archive 15"),
  exhibition(16, "Viv Select India", "India", 2026, "Viv Select India exhibition"),
  exhibition(17, "Exhibition archive 17", null, null, "Exhibition archive 17"),
  exhibition(18, "Exhibition archive 18", null, null, "Exhibition archive 18"),
  exhibition(19, "CPHI Frankfurt", "Germany", null, "CPHI Frankfurt exhibition"),
  exhibition(20, "Exhibition archive 20", null, null, "Exhibition archive 20"),
  exhibition(21, "Exhibition archive 21", null, null, "Exhibition archive 21"),
  exhibition(22, "Exhibition archive 22", null, null, "Exhibition archive 22"),
  exhibition(23, "Exhibition archive 23", null, null, "Exhibition archive 23"),

  // Corporate Activities — 12 photographs from public/images/clients/
  // Client photographs are not presented as employee portraits.
  client(0, "Client photograph 00"),
  client(1, "Client photograph 01"),
  client(2, "Client photograph 02"),
  client(3, "Client photograph 03"),
  client(4, "Client photograph 04"),
  client(5, "Client photograph 05"),
  client(6, "Client photograph 06"),
  client(7, "Client photograph 07"),
  client(8, "Client photograph 08"),
  client(9, "Client photograph 09"),
  client(10, "Client photograph 10"),
  client(11, "Client photograph 11"),
];

export function getGalleryImagesByCategory(category: GalleryCategory): GalleryImage[] {
  return GALLERY_IMAGES.filter((image) => image.category === category);
}

export function getGalleryImageById(id: string): GalleryImage | undefined {
  return GALLERY_IMAGES.find((image) => image.id === id);
}