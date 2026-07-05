import {
  CommissionStatus,
  createId,
  mockDb,
  timestamp,
} from "../_data/mock-database";
import { getCurrentUser } from "../_lib/auth";
import { dataResponse, errorResponse, readJson } from "../_lib/http";

type CommissionBody = {
  commissionTypeId?: string;
  commissionTypeSlug?: string;
  title?: string;
  description?: string;
  intendedUse?: string;
  deadline?: string;
  referenceImageUrls?: string[];
};

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user) return errorResponse(401, "Authentication required", "UNAUTHORIZED");

  const status = new URL(request.url).searchParams.get(
    "status",
  ) as CommissionStatus | null;
  const commissions = mockDb.commissions.filter(
    (commission) =>
      commission.customerId === user.id &&
      (!status || commission.status === status),
  );
  return dataResponse(commissions);
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return errorResponse(401, "Authentication required", "UNAUTHORIZED");
  if (!mockDb.settings.commissionsOpen) {
    return errorResponse(409, "Commissions are closed", "COMMISSIONS_CLOSED");
  }

  const body = await readJson<CommissionBody>(request);
  const title = body?.title?.trim();
  const description = body?.description?.trim();
  if (!body || !title || !description) {
    return errorResponse(400, "Title and description are required", "INVALID_INPUT");
  }

  const type =
    mockDb.commissionTypes.find(
      (candidate) => candidate.id === body.commissionTypeId,
    ) ??
    mockDb.commissionTypes.find(
      (candidate) => candidate.slug === body?.commissionTypeSlug,
    );
  if ((body.commissionTypeId || body.commissionTypeSlug) && !type?.isActive) {
    return errorResponse(409, "Commission type is unavailable", "TYPE_UNAVAILABLE");
  }

  const now = timestamp();
  const commission = {
    id: createId(),
    displayNumber:
      Math.max(0, ...mockDb.commissions.map((item) => item.displayNumber)) + 1,
    customerId: user.id,
    commissionTypeId: type?.id ?? null,
    title,
    description,
    intendedUse: body.intendedUse?.trim() ?? "",
    deadline: body.deadline ?? null,
    status: "inquiry" as const,
    quoteAmount: null,
    currency: "USD",
    invoiceStatus: "not_created" as const,
    invoiceUrl: null,
    referenceImageUrls: body.referenceImageUrls ?? [],
    createdAt: now,
    updatedAt: now,
  };
  mockDb.commissions.push(commission);
  return dataResponse(commission, { status: 201 });
}
