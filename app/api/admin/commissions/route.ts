import {
  CommissionStatus,
  mockDb,
} from "../../_data/mock-database";
import { getAdminUser } from "../../_lib/auth";
import { dataResponse, errorResponse } from "../../_lib/http";

export async function GET(request: Request) {
  const admin = await getAdminUser();
  if (!admin) return errorResponse(403, "Admin access required", "FORBIDDEN");

  const status = new URL(request.url).searchParams.get(
    "status",
  ) as CommissionStatus | null;
  return dataResponse(
    status
      ? mockDb.commissions.filter((commission) => commission.status === status)
      : mockDb.commissions,
  );
}
