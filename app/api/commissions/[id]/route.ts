import { mockDb } from "../../_data/mock-database";
import { getCurrentUser } from "../../_lib/auth";
import { dataResponse, errorResponse } from "../../_lib/http";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return errorResponse(401, "Authentication required", "UNAUTHORIZED");

  const { id } = await params;
  const commission = mockDb.commissions.find(
    (candidate) => candidate.id === id,
  );
  if (!commission) return errorResponse(404, "Commission not found", "NOT_FOUND");
  if (commission.customerId !== user.id && user.role !== "admin") {
    return errorResponse(403, "Commission access denied", "FORBIDDEN");
  }
  return dataResponse(commission);
}
