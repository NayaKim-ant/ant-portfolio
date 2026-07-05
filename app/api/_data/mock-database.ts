import { commissionTypes as seededCommissionTypes } from "../commission-types/data";

export type Role = "customer" | "admin";
export type CommissionStatus =
  | "inquiry"
  | "quote_pending"
  | "awaiting_payment"
  | "paid"
  | "sketch"
  | "in_progress"
  | "review"
  | "delivered"
  | "cancelled";
export type InvoiceStatus =
  | "not_created"
  | "pending"
  | "paid"
  | "void"
  | "refunded";

export type UserRecord = {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
};

export type CommissionTypeRecord = (typeof seededCommissionTypes)[number] & {
  id: string;
  isActive: boolean;
  displayOrder: number;
  imageUrls: string[];
};

export type CommissionRecord = {
  id: string;
  displayNumber: number;
  customerId: string;
  commissionTypeId: string | null;
  title: string;
  description: string;
  intendedUse: string;
  deadline: string | null;
  status: CommissionStatus;
  quoteAmount: number | null;
  currency: string;
  invoiceStatus: InvoiceStatus;
  invoiceUrl: string | null;
  referenceImageUrls: string[];
  createdAt: string;
  updatedAt: string;
};

export type MessageRecord = {
  id: string;
  commissionId: string | null;
  inquiryId: string | null;
  senderId: string;
  senderRole: Role;
  body: string;
  readAt: string | null;
  createdAt: string;
};

export type InquiryRecord = {
  id: string;
  customerId: string;
  subject: string;
  status: "open" | "answered" | "closed";
  createdAt: string;
  updatedAt: string;
};

export type ApplicationQuestionRecord = {
  id: string;
  number: number;
  label: string;
  helpText: string;
  inputType: "radio" | "rich_text" | "short_text" | "date";
  required: boolean;
  options: Array<{ id: string; label: string; value: string }>;
};

export type ApplicationRecord = {
  id: string;
  customerId: string;
  commissionTypeSlug: string;
  answers: Array<{
    questionId: string;
    selectedValue?: string;
    richTextHtml?: string;
    textValue?: string;
    assetIds?: string[];
  }>;
  commissionId: string;
  createdAt: string;
};

export type AssetRecord = {
  id: string;
  ownerId: string;
  fileName: string;
  contentType: string;
  fileSize: number;
  url: string;
  createdAt: string;
};

export type SiteSettingsRecord = {
  commissionsOpen: boolean;
  contactEmail: string;
  availableHours: string;
};

export type MediaAssetRecord = {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
};

export type ContentSectionRecord = {
  key: string;
  title: string;
  body: string;
  media: MediaAssetRecord[];
};

export type ProjectRecord = {
  id: string;
  slug: string;
  title: string;
  category: "original_characters" | "fanart";
  description: string;
  media: [MediaAssetRecord, MediaAssetRecord];
};

type SessionRecord = {
  token: string;
  userId: string;
  expiresAt: string;
};

type MagicLinkRecord = {
  token: string;
  userId: string;
  expiresAt: string;
};

export type MockDatabase = {
  users: UserRecord[];
  sessions: SessionRecord[];
  magicLinks: MagicLinkRecord[];
  commissionTypes: CommissionTypeRecord[];
  commissions: CommissionRecord[];
  messages: MessageRecord[];
  inquiries: InquiryRecord[];
  applications: ApplicationRecord[];
  assets: AssetRecord[];
  applicationForms: Record<string, ApplicationQuestionRecord[]>;
  settings: SiteSettingsRecord;
  content: {
    home: {
      hero: ContentSectionRecord;
      instagram: ContentSectionRecord;
      communityBody: string;
      fanMoments: MediaAssetRecord[];
      artisticWorld: ContentSectionRecord;
      commissions: ContentSectionRecord;
    };
    portfolio: {
      introduction: string;
      featuredWorks: MediaAssetRecord[];
      artisticViewpoint: ContentSectionRecord;
      workflow: ContentSectionRecord[];
      traditionalArt: ContentSectionRecord;
    };
    projects: ProjectRecord[];
    contact: {
      introduction: string;
      instagramUrl: string;
      instagramImage: MediaAssetRecord;
      email: string;
      availableHours: string;
    };
    commissions: {
      introduction: string;
      choiceHelp: string;
      notes: string;
      faqs: Array<{ question: string; answer: string }>;
    };
  };
};

const ids = {
  customer: "10000000-0000-4000-8000-000000000001",
  admin: "10000000-0000-4000-8000-000000000002",
  illustration: "20000000-0000-4000-8000-000000000001",
  chibi: "20000000-0000-4000-8000-000000000002",
  sheet: "20000000-0000-4000-8000-000000000003",
  custom: "20000000-0000-4000-8000-000000000004",
};

const media = (id: string, alt: string): MediaAssetRecord => ({
  id,
  url: `https://example.com/placeholders/${id}.jpg`,
  alt,
  width: 1200,
  height: 900,
});

const section = (
  key: string,
  title: string,
  body: string,
): ContentSectionRecord => ({
  key,
  title,
  body,
  media: [media(`media-${key}`, `${title} placeholder`)],
});

function createMockDatabase(): MockDatabase {
  const now = new Date().toISOString();
  const typeIds = [ids.illustration, ids.chibi, ids.sheet, ids.custom];
  const commissionTypes = seededCommissionTypes.map((type, index) => ({
    ...type,
    id: typeIds[index],
    isActive: true,
    displayOrder: index,
    imageUrls: type.samples.map(
      (_, sampleIndex) =>
        `https://example.com/placeholders/${type.slug}-${sampleIndex + 1}.jpg`,
    ),
  }));

  const commonQuestions: ApplicationQuestionRecord[] = [
    {
      id: "30000000-0000-4000-8000-000000000001",
      number: 1,
      label: "Choose a placeholder option",
      helpText: "This question will be configured by the admin.",
      inputType: "radio",
      required: true,
      options: [
        { id: "option-a", label: "Placeholder option A", value: "option-a" },
        { id: "option-b", label: "Placeholder option B", value: "option-b" },
      ],
    },
    {
      id: "30000000-0000-4000-8000-000000000002",
      number: 2,
      label: "Describe your request and attach references",
      helpText: "Rich text and uploaded images are accepted.",
      inputType: "rich_text",
      required: true,
      options: [],
    },
    {
      id: "30000000-0000-4000-8000-000000000003",
      number: 3,
      label: "Preferred delivery date",
      helpText: "The final schedule is confirmed with Ant.",
      inputType: "date",
      required: false,
      options: [],
    },
  ];

  return {
    users: [
      {
        id: ids.customer,
        name: "Aphid",
        email: "aphid@example.com",
        role: "customer",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: ids.admin,
        name: "Ant",
        email: "admin@ant.local",
        role: "admin",
        createdAt: now,
        updatedAt: now,
      },
    ],
    sessions: [],
    magicLinks: [],
    commissionTypes,
    commissions: [
      {
        id: "40000000-0000-4000-8000-000000000003",
        displayNumber: 3,
        customerId: ids.customer,
        commissionTypeId: ids.illustration,
        title: "Illustration",
        description: "Seeded commission for the My Page mock.",
        intendedUse: "Personal",
        deadline: null,
        status: "in_progress",
        quoteAmount: 10000,
        currency: "USD",
        invoiceStatus: "pending",
        invoiceUrl: null,
        referenceImageUrls: [],
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "40000000-0000-4000-8000-000000000002",
        displayNumber: 2,
        customerId: ids.customer,
        commissionTypeId: ids.chibi,
        title: "Chibi pair",
        description: "A completed seeded commission.",
        intendedUse: "Personal",
        deadline: null,
        status: "delivered",
        quoteAmount: 8000,
        currency: "USD",
        invoiceStatus: "paid",
        invoiceUrl: null,
        referenceImageUrls: [],
        createdAt: now,
        updatedAt: now,
      },
    ],
    messages: [
      {
        id: "60000000-0000-4000-8000-000000000001",
        commissionId: "40000000-0000-4000-8000-000000000003",
        inquiryId: null,
        senderId: ids.admin,
        senderRole: "admin",
        body: "Hello! I received your references.",
        readAt: now,
        createdAt: now,
      },
      {
        id: "60000000-0000-4000-8000-000000000002",
        commissionId: "40000000-0000-4000-8000-000000000003",
        inquiryId: null,
        senderId: ids.customer,
        senderRole: "customer",
        body: "Thank you. Let me know if you need anything else.",
        readAt: now,
        createdAt: now,
      },
    ],
    inquiries: [],
    applications: [],
    assets: [],
    applicationForms: Object.fromEntries(
      commissionTypes.map((type) => [
        type.slug,
        commonQuestions.map((question) => ({ ...question })),
      ]),
    ),
    settings: {
      commissionsOpen: true,
      contactEmail: "contact@example.com",
      availableHours: "Weekdays, 10:00-18:00 KST",
    },
    content: {
      home: {
        hero: section("hero", "Ant", "Have you seen"),
        instagram: section(
          "instagram",
          "Instagram account",
          "Instagram description placeholder text.",
        ),
        communityBody:
          "Community moments and stories placeholder text. Replace this with your own memories later.",
        fanMoments: [media("fan-moment-1", "Fan moment placeholder")],
        artisticWorld: {
          ...section(
            "artistic-world",
            "Ant's artistic world",
            "Artistic-world placeholder text.",
          ),
          media: [1, 2, 3, 4].map((number) =>
            media(`artistic-world-${number}`, `Artwork placeholder ${number}`),
          ),
        },
        commissions: section(
          "commissions",
          "Commissions",
          "Commission introduction placeholder text.",
        ),
      },
      portfolio: {
        introduction: "Portfolio introduction placeholder text.",
        featuredWorks: [
          media("featured-1", "Featured artwork one"),
          media("featured-2", "Featured artwork two"),
          media("featured-3", "Featured artwork three"),
        ],
        artisticViewpoint: section(
          "viewpoint",
          "Artistic viewpoint",
          "Artistic viewpoint placeholder text.",
        ),
        workflow: [
          section("workflow-1", "Sketch", "Workflow step placeholder."),
          section("workflow-2", "Color", "Workflow step placeholder."),
          section("workflow-3", "Finish", "Workflow step placeholder."),
        ],
        traditionalArt: section(
          "traditional",
          "Traditional art & crafts",
          "Traditional-art placeholder text.",
        ),
      },
      projects: [
        {
          id: "50000000-0000-4000-8000-000000000001",
          slug: "original-character-placeholder",
          title: "Original character placeholder",
          category: "original_characters",
          description: "Project description placeholder.",
          media: [
            media("project-1-left", "Original character artwork left page"),
            media("project-1-right", "Original character artwork right page"),
          ],
        },
        {
          id: "50000000-0000-4000-8000-000000000002",
          slug: "fanart-placeholder",
          title: "Fanart placeholder",
          category: "fanart",
          description: "Project description placeholder.",
          media: [
            media("project-2-left", "Fanart artwork left page"),
            media("project-2-right", "Fanart artwork right page"),
          ],
        },
      ],
      contact: {
        introduction: "Contact introduction placeholder text.",
        instagramUrl: "https://instagram.com/",
        instagramImage: media("instagram-contact", "Instagram placeholder"),
        email: "contact@example.com",
        availableHours: "Weekdays, 10:00-18:00 KST",
      },
      commissions: {
        introduction:
          "Commission introduction placeholder text. Replace this with availability and ordering details.",
        choiceHelp:
          "Choice guidance placeholder text. Explain how visitors can ask for help choosing a type.",
        notes:
          "Notes and disclaimers placeholder text. Add prices, turnaround, revisions, usage rights, refunds, and delivery details.",
        faqs: [
          {
            question: "What should I prepare before asking?",
            answer: "A short idea, references, intended use, and preferred deadline.",
          },
          {
            question: "Can I ask for a custom type?",
            answer: "Yes. Describe the format and I will tell you whether it is possible.",
          },
          {
            question: "How is the final price decided?",
            answer: "It depends on complexity, usage, timing, and requested additions.",
          },
          {
            question: "Can I ask without ordering afterward?",
            answer: "Of course. An inquiry does not commit you to an order.",
          },
          {
            question: "When will Ant reply?",
            answer: "Reply-time and available-hour details will be written here.",
          },
        ],
      },
    },
  };
}

const globalForMockDb = globalThis as typeof globalThis & {
  __antPortfolioMockDb?: MockDatabase;
};

export const mockDb =
  globalForMockDb.__antPortfolioMockDb ?? createMockDatabase();

if (process.env.NODE_ENV !== "production") {
  globalForMockDb.__antPortfolioMockDb = mockDb;
}

export const createId = () => crypto.randomUUID();
export const timestamp = () => new Date().toISOString();
