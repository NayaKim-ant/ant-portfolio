import {
  createId,
  mockDb,
  timestamp,
} from "../_data/mock-database";
import { getCurrentUser } from "../_lib/auth";
import { dataResponse, errorResponse, readJson } from "../_lib/http";

type InquiryBody = {
  subject?: string;
  firstMessage?: string;
};

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return errorResponse(401, "Authentication required", "UNAUTHORIZED");

  return dataResponse(
    mockDb.inquiries.filter((inquiry) => inquiry.customerId === user.id),
  );
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return errorResponse(401, "Authentication required", "UNAUTHORIZED");

  const body = await readJson<InquiryBody>(request);
  const now = timestamp();
  const inquiry = {
    id: createId(),
    customerId: user.id,
    subject: body?.subject?.trim() || "Commission inquiry",
    status: "open" as const,
    createdAt: now,
    updatedAt: now,
  };
  mockDb.inquiries.push(inquiry);

  if (body?.firstMessage?.trim()) {
    mockDb.messages.push({
      id: createId(),
      commissionId: null,
      inquiryId: inquiry.id,
      senderId: user.id,
      senderRole: user.role,
      body: body.firstMessage.trim(),
      readAt: null,
      createdAt: now,
    });
  }

  return dataResponse(inquiry, { status: 201 });
}
