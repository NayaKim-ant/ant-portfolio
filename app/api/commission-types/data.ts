export type CommissionType = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  startingPrice: string;
  priceOptions: string[];
  turnaround: string;
  deliveryOptions: string[];
  revisions: string;
  additionalCharges: string[];
  deliverables: string[];
  notes: string[];
  samples: string[];
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
    priceOptions: ["Bust-up: $000", "Half body: $000", "Full body: $000"],
    turnaround: "2-4 weeks",
    deliveryOptions: ["Default: 14-28 days", "Quick delivery: from 7 days"],
    revisions: "Two sketch-stage revisions",
    additionalCharges: [
      "Detailed background: +$000",
      "Quick delivery: +$000",
      "Additional objects: +$000",
    ],
    deliverables: ["High-resolution PNG", "Web-sized JPG", "Simple background"],
    notes: [
      "Complex backgrounds and additional characters may affect the quote.",
      "Commercial usage is discussed separately.",
    ],
    samples: ["Illustration 01", "Illustration 02", "Illustration 03", "Illustration 04"],
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
    priceOptions: ["Pair: $000", "Additional character: +$000"],
    turnaround: "1-3 weeks",
    deliveryOptions: ["Default: 7-21 days", "Quick delivery: from 5 days"],
    revisions: "Two sketch-stage revisions",
    additionalCharges: [
      "Complex outfits: +$000",
      "Detailed props: +$000",
      "Quick delivery: +$000",
    ],
    deliverables: ["Transparent PNG", "Background-color version", "Web-sized JPG"],
    notes: [
      "The base quote includes two characters.",
      "Detailed props or outfits may affect the quote.",
    ],
    samples: ["Chibi pair 01", "Chibi pair 02", "Chibi pair 03", "Chibi pair 04"],
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
    priceOptions: ["Basic sheet: $000", "Additional view: +$000", "Expression set: +$000"],
    turnaround: "3-5 weeks",
    deliveryOptions: ["Default: 21-35 days", "Schedule confirmed after scope review"],
    revisions: "Three design-stage revisions",
    additionalCharges: [
      "Additional outfit: +$000",
      "Extra expressions: +$000",
      "Design from text only: +$000",
    ],
    deliverables: ["Full reference sheet PNG", "Individual detail crops", "Color palette"],
    notes: [
      "The final scope depends on the number of views and expressions.",
      "Existing visual references help keep the process efficient.",
    ],
    samples: ["Character sheet 01", "Character sheet 02", "Character sheet 03"],
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
    priceOptions: ["Price is calculated after discussing the scope."],
    turnaround: "Discussed after inquiry",
    deliveryOptions: ["Delivery time is agreed before work begins."],
    revisions: "Defined with the quote",
    additionalCharges: ["Any additional charges are listed in the custom quote."],
    deliverables: ["Defined for the project", "Format agreed before work begins"],
    notes: [
      "Please ask before ordering this type.",
      "Not every request can be accepted, but unusual ideas are welcome.",
    ],
    samples: ["Custom work 01", "Custom work 02", "Custom work 03"],
    custom: true,
  },
];

export function getCommissionType(slug: string) {
  return commissionTypes.find((type) => type.slug === slug);
}
