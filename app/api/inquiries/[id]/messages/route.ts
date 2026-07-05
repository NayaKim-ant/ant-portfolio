import {
  createId,
  mockDb,
  timestamp,
} from "../../../_data/mock-database";
import { getCurrentUser } from "../../../_lib/auth";
import { dataResponse, errorResponse, readJson } from "../../../_lib/http";

async function ownedInquiry(id: string) {
  const user = await getCurrentUser();
  if (!user) return { user: null, inquiry: null };
  const inquiry = mockDb.inquiries.find((candidate) => candidate.id === id);
  return {
    user,
    inquiry:
      inquiry &&
      (inquiry.customerId === user.id || user.role === "admin")
        ? inquiry
        : null,
  };
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { user, inquiry } = await ownedInquiry(id);
  if (!user) return errorResponse(401, "Authentication required", "UNAUTHORIZED");
  if (!inquiry) return errorResponse(404, "Inquiry not found", "NOT_FOUND");

  return dataResponse(
    mockDb.messages
      .filter((message) => message.inquiryId === id)
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
  );
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { user, inquiry } = await ownedInquiry(id);
  if (!user) return errorResponse(401, "Authentication required", "UNAUTHORIZED");
  if (!inquiry) return errorResponse(404, "Inquiry not found", "NOT_FOUND");

  const body = await readJson<{ body?: string }>(request);
  const text = body?.body?.trim();
  if (!text) return errorResponse(400, "Message body is required", "INVALID_INPUT");

  const now = timestamp();
  const message = {
    id: createId(),
    commissionId: null,
    inquiryId: id,
    senderId: user.id,
    senderRole: user.role,
    body: text,
    readAt: null,
    createdAt: now,
  };
  mockDb.messages.push(message);
  inquiry.updatedAt = now;
  return dataResponse(message, { status: 201 });
}
