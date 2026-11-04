export type VerificationStatus =
  | "verified"
  | "pending-verification"
  | "unavailable";

export interface BusinessRecord {
  slug: string;
  displayName: string;
  legalName: string | null;
  shortDescription: string | null;
  detailedDescription: string | null;
  category: string | null;
  officialWebsite: string | null;
  products: string[];
  services: string[];
  facilities: string[];
  images: string[];
  verificationStatus: VerificationStatus;
  publicationStatus: "published" | "pending";
  notes: string;
}

export const BUSINESSES: BusinessRecord[] = [
  {
    slug: "siflon-pharma",
    displayName: "Siflon Pharma",
    legalName: "Siflon Pharma Private Limited",
    shortDescription:
      "A veterinary and animal-health manufacturing business serving sheep, goat, cattle, swine, poultry and companion animals.",
    detailedDescription:
      "Siflon Pharma Private Limited is a subsidiary of Siflon Group and a manufacturer of veterinary and animal-health products. Its manufacturing site is located at Sy.No.25-4, Rachanapalli (V), Anantapur District, Andhra Pradesh, India. The business holds a Drugs and Cosmetics Act 1940 manufacturing licence (Form-25) and WHO-GMP certification for export purposes.",
    category: "Animal health",
    officialWebsite: "https://siflonpharma.com/",
    products: [
      "Triclabendazole boluses",
      "Oxyclozanide",
      "Rafoxanide",
      "Closantel",
      "Albendazole",
      "Fenbendazole",
    ],
    services: [
      "Veterinary drug manufacturing",
      "Animal feed supplement manufacturing",
      "API and intermediate manufacturing",
      "Export supply",
    ],
    facilities: [
      "Sy.No.25-4, Rachanapalli (V), Anantapur District, Andhra Pradesh, India",
    ],
    images: [
      "/images/facilities/facility_00.jpg",
      "/images/facilities/facility_02.jpg",
      "/images/facilities/facility_05.jpg",
    ],
    verificationStatus: "verified",
    publicationStatus: "published",
    notes:
      "Legal entity is distinct from Siflon Drugs and Pharmaceuticals Private Limited. Product list is derived from the Form-25 licence and WHO-GMP certificate; a full product list requires review of the licence appendix.",
  },
  {
    slug: "siflon-drugs",
    displayName: "Siflon Drugs",
    legalName: "Siflon Drugs and Pharmaceuticals Private Limited",
    shortDescription:
      "A pharmaceutical ingredient business founded in 1996, producing veterinary active pharmaceutical ingredients.",
    detailedDescription:
      "Siflon Drugs and Pharmaceuticals Private Limited was founded in 1996 by Mr. R. Ananthaiah and originally operated as a PTFE component manufacturer. The business is described on its official website as a producer of veterinary active pharmaceutical ingredients. Its registered facility is located at Plot No. 20 & 21, ALEAP Industrial Estate, Gajularamaram, Hyderabad, Telangana, India.",
    category: "Pharmaceutical ingredients",
    officialWebsite: "https://www.siflondrugs.com/",
    products: [
      "Halquinol",
      "Enrofloxacin",
      "Niclosamide Piperazine Salt",
      "Oxfendazole",
      "Toltrazuril",
      "Albendazole",
      "Nitroxynil",
      "Praziquantel",
      "Clorsulon",
      "Fenbendazole",
      "Butaphosphon",
      "Oxyclozanide",
      "Rafoxanide",
      "Closantel Amino Compound",
      "Diiodosalicylic Acid",
      "Closantel Base",
      "Closantel Sodium",
      "Niclosamide",
      "Triclabendazole",
    ],
    services: [
      "Veterinary API manufacturing",
      "Export supply",
    ],
    facilities: [
      "Plot No. 20 & 21, ALEAP Industrial Estate, Gajularamaram, Hyderabad, Telangana, India",
    ],
    images: [
      "/images/facilities/facility_01.jpg",
      "/images/facilities/facility_03.jpg",
      "/images/facilities/facility_07.jpg",
    ],
    verificationStatus: "verified",
    publicationStatus: "published",
    notes:
      "Legal entity is distinct from Siflon Pharma Private Limited. Product list is taken from the official website. The claim of being the world's largest producer of Oxyclozanide is stated on the official website but has not been independently verified.",
  },
  {
    slug: "siflon-polymers",
    displayName: "Siflon Polymers",
    legalName: "Siflon Polymers Private Limited",
    shortDescription:
      "A manufacturer of PTFE and FEP lined pipes, bends and valves for demanding industrial applications.",
    detailedDescription:
      "Siflon Polymers Private Limited was established in 1996 by R. Ananthaiah. The business manufactures fluoropolymer-lined industrial components including PTFE-lined and FEP-lined pipes, bends and valves for industrial applications requiring corrosion resistance.",
    category: "Industrial materials",
    officialWebsite: "https://siflonpolymers.com/",
    products: [
      "PTFE lined pipes",
      "FEP lined pipes",
      "Lined bends",
      "Lined valves",
    ],
    services: [
      "Fluoropolymer-lined component manufacturing",
      "Industrial supply",
    ],
    facilities: [],
    images: [
      "/images/facilities/facility_04.jpg",
      "/images/facilities/facility_06.jpg",
      "/images/facilities/facility_08.jpg",
    ],
    verificationStatus: "verified",
    publicationStatus: "published",
    notes:
      "Facility location has not been verified. Product range is taken from the official website.",
  },
  {
    slug: "siflon-pipes",
    displayName: "Siflon Pipes",
    legalName: null,
    shortDescription: null,
    detailedDescription: null,
    category: null,
    officialWebsite: null,
    products: [],
    services: [],
    facilities: [],
    images: [],
    verificationStatus: "pending-verification",
    publicationStatus: "pending",
    notes:
      "Siflon Pipes business information is pending verification. The official website at siflonpipes.com could not be accessed due to an expired TLS certificate. No product range, legal entity name, facility location or contact details have been verified. This business is presented in a clearly marked pending state and no details have been invented.",
  },
];

export function getBusinessBySlug(slug: string): BusinessRecord | undefined {
  return BUSINESSES.find((business) => business.slug === slug);
}

export function getPublishedBusinesses(): BusinessRecord[] {
  return BUSINESSES.filter((business) => business.publicationStatus === "published");
}
