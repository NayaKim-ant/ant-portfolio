export type CommissionType = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  startingPrice: string;
  turnaround: string;
  revisions: string;
  deliverables: string[];
  notes: string[];
  custom: boolean;
};

export const commissionTypes: CommissionType[] = [
  {
    slug: "illustration",
    title: "Illustration",
    shortDescription:
      "A polished illustration focused on one character and a simple setting.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. This type is suited to finished character artwork, gifts, profile pieces, and personal display.",
    startingPrice: "$000",
    turnaround: "2-4 weeks",
    revisions: "Two sketch-stage revisions",
    deliverables: ["High-resolution PNG", "Web-sized JPG", "Simple background"],
    notes: [
      "Complex backgrounds and additional characters may affect the quote.",
      "Commercial usage is discussed separately.",
    ],
    custom: false,
  },
  {
    slug: "chibi-pair",
    title: "Chibi pair",
    shortDescription:
      "Two simplified characters with expressive poses and soft details.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. This option works well for friends, couples, character pairs, and small celebratory illustrations.",
    startingPrice: "$000",
    turnaround: "1-3 weeks",
    revisions: "Two sketch-stage revisions",
    deliverables: ["Transparent PNG", "Background-color version", "Web-sized JPG"],
    notes: [
      "The base quote includes two characters.",
      "Detailed props or outfits may affect the quote.",
    ],
    custom: false,
  },
  {
    slug: "character-sheet",
    title: "Character sheet",
    shortDescription:
      "A reference-focused layout showing a character from several angles.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Character sheets can collect design notes, expressions, outfit details, and color references in one place.",
    startingPrice: "$000",
    turnaround: "3-5 weeks",
    revisions: "Three design-stage revisions",
    deliverables: ["Full reference sheet PNG", "Individual detail crops", "Color palette"],
    notes: [
      "The final scope depends on the number of views and expressions.",
      "Existing visual references help keep the process efficient.",
    ],
    custom: false,
  },
  {
    slug: "custom-type",
    title: "Custom type",
    shortDescription:
      "For an artwork idea that does not fit the listed commission types.",
    description:
      "Tell me about the format, subject, intended use, deadline, and any unusual materials or dimensions. I will suggest a scope and prepare a custom quote.",
    startingPrice: "Custom quote",
    turnaround: "Discussed after inquiry",
    revisions: "Defined with the quote",
    deliverables: ["Defined for the project", "Format agreed before work begins"],
    notes: [
      "Please ask before ordering this type.",
      "Not every request can be accepted, but unusual ideas are welcome.",
    ],
    custom: true,
  },
];

export function getCommissionType(slug: string) {
  return commissionTypes.find((type) => type.slug === slug);
}
