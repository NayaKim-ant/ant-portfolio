import {
  createId,
  mockDb,
  timestamp,
} from "../../../_data/mock-database";
import { getCurrentUser } from "../../../_lib/auth";
import { dataResponse, errorResponse, readJson } from "../../../_lib/http";

async function accessibleCommission(id: string) {
  const user = await getCurrentUser();
  if (!user) return { user: null, commission: null };
  const commission = mockDb.commissions.find((candidate) => candidate.id === id);
  return {
    user,
    commission:
      commission &&
      (commission.customerId === user.id || user.role === "admin")
        ? commission
        : null,
  };
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { user, commission } = await accessibleCommission(id);
  if (!user) return errorResponse(401, "Authentication required", "UNAUTHORIZED");
  if (!commission) return errorResponse(404, "Commission not found", "NOT_FOUND");

  return dataResponse(
    mockDb.messages
      .filter((message) => message.commissionId === id)
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
  );
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { user, commission } = await accessibleCommission(id);
  if (!user) return errorResponse(401, "Authentication required", "UNAUTHORIZED");
  if (!commission) return errorResponse(404, "Commission not found", "NOT_FOUND");

  const body = await readJson<{ body?: string }>(request);
  const text = body?.body?.trim();
  if (!text) return errorResponse(400, "Message body is required", "INVALID_INPUT");

  const message = {
    id: createId(),
    commissionId: id,
    inquiryId: null,
    senderId: user.id,
    senderRole: user.role,
    body: text,
    readAt: null,
    createdAt: timestamp(),
  };
  mockDb.messages.push(message);
  commission.updatedAt = message.createdAt;
  return dataResponse(message, { status: 201 });
}
