export interface Milestone {
  year: number;
  event: string;
  verified: boolean;
  source: string;
}

export const TIMELINE: Milestone[] = [
  {
    year: 1996,
    event: "Siflon Drugs and Pharmaceuticals Private Limited founded by Mr. R. Ananthaiah.",
    verified: true,
    source: "siflondrugs.com",
  },
  {
    year: 1996,
    event: "Siflon Polymers Private Limited established by R. Ananthaiah.",
    verified: true,
    source: "siflonpolymers.com",
  },
  {
    year: 2006,
    event: "Siflon Pharma Private Limited started as a subsidiary of Siflon Group.",
    verified: true,
    source: "siflonpharma.com",
  },
  {
    year: 2022,
    event: "A Form-25 amendment recorded the name change of M/s. Siflon Drugs to M/s. Siflon Pharma Private Limited, effective 27 May 2022. This is a licensing record and does not confirm that the two businesses are currently a single legal entity.",
    verified: true,
    source: "DRUG MANUFACTURING LICENSE Form-25 amendment",
  },
];
