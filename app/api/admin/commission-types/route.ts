import { createId, mockDb } from "../../_data/mock-database";
import { getAdminUser } from "../../_lib/auth";
import { dataResponse, errorResponse, readJson } from "../../_lib/http";

type CommissionTypeBody = Omit<
  (typeof mockDb.commissionTypes)[number],
  "id"
>;

export async function POST(request: Request) {
  const admin = await getAdminUser();
  if (!admin) return errorResponse(403, "Admin access required", "FORBIDDEN");

  const body = await readJson<Partial<CommissionTypeBody>>(request);
  if (!body?.slug || !body.title || !body.shortDescription || !body.description) {
    return errorResponse(
      400,
      "Slug, title, short description, and description are required",
      "INVALID_INPUT",
    );
  }
  if (mockDb.commissionTypes.some((type) => type.slug === body.slug)) {
    return errorResponse(409, "Commission type slug already exists", "SLUG_CONFLICT");
  }

  const type: (typeof mockDb.commissionTypes)[number] = {
    id: createId(),
    slug: body.slug,
    title: body.title,
    shortDescription: body.shortDescription,
    description: body.description,
    startingPrice: body.startingPrice ?? "Custom quote",
    priceOptions: body.priceOptions ?? [],
    turnaround: body.turnaround ?? "To be discussed",
    deliveryOptions: body.deliveryOptions ?? [],
    revisions: body.revisions ?? "To be discussed",
    additionalCharges: body.additionalCharges ?? [],
    deliverables: body.deliverables ?? [],
    notes: body.notes ?? [],
    samples: body.samples ?? [],
    custom: body.custom ?? false,
    isActive: body.isActive ?? true,
    displayOrder: body.displayOrder ?? mockDb.commissionTypes.length,
    imageUrls: body.imageUrls ?? [],
  };
  mockDb.commissionTypes.push(type);
  mockDb.applicationForms[type.slug] = [];
  return dataResponse(type, { status: 201 });
}
