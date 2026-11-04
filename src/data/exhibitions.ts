export interface ExhibitionRecord {
  id: string;
  name: string;
  location: string;
  year: number | null;
  verified: boolean;
  sourceImage: string | null;
  notes: string;
}

export const EXHIBITIONS: ExhibitionRecord[] = [
  {
    id: "ahcab-2026",
    name: "6th International AHCAB Expo",
    location: "Bangladesh",
    year: 2026,
    verified: false,
    sourceImage: "exhibition_00.jpg",
    notes: "Event name and year taken from source folder name. Exact dates have not been verified.",
  },
  {
    id: "cphi-china-2026",
    name: "CPHI China",
    location: "China",
    year: 2026,
    verified: false,
    sourceImage: "exhibition_03.jpg",
    notes: "Event name and year taken from source folder name. Exact dates have not been verified.",
  },
  {
    id: "cphi-japan-2026",
    name: "Cphi Japan",
    location: "Japan",
    year: 2026,
    verified: false,
    sourceImage: "exhibition_07.jpg",
    notes: "Event name and year taken from source folder name. Exact dates have not been verified.",
  },
  {
    id: "vet-expo-indonesia-2026",
    name: "Vet Expo Indonesia",
    location: "Indonesia",
    year: 2026,
    verified: false,
    sourceImage: "exhibition_10.jpg",
    notes: "Event name and year taken from source folder name. Exact dates have not been verified.",
  },
  {
    id: "viv-select-india-2026",
    name: "Viv Select India",
    location: "India",
    year: 2026,
    verified: false,
    sourceImage: "exhibition_16.jpg",
    notes: "Event name and year taken from source folder name. Exact dates have not been verified.",
  },
  {
    id: "cphi-frankfurt",
    name: "CPHI Frankfurt",
    location: "Germany",
    year: null,
    verified: false,
    sourceImage: "exhibition_19.jpg",
    notes: "Event name taken from source folder name. Year has not been verified.",
  },
];
