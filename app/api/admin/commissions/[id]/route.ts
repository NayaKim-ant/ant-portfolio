import {
  CommissionStatus,
  InvoiceStatus,
  mockDb,
  timestamp,
} from "../../../_data/mock-database";
import { getAdminUser } from "../../../_lib/auth";
import { dataResponse, errorResponse, readJson } from "../../../_lib/http";

type CommissionUpdate = {
  title?: string;
  status?: CommissionStatus;
  quoteAmount?: number;
  currency?: string;
  invoiceStatus?: InvoiceStatus;
  invoiceUrl?: string;
};

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await getAdminUser();
  if (!admin) return errorResponse(403, "Admin access required", "FORBIDDEN");

  const { id } = await params;
  const commission = mockDb.commissions.find(
    (candidate) => candidate.id === id,
  );
  if (!commission) return errorResponse(404, "Commission not found", "NOT_FOUND");

  const body = await readJson<CommissionUpdate>(request);
  if (!body || Object.keys(body).length === 0) {
    return errorResponse(400, "Update payload is required", "INVALID_INPUT");
  }

  if (body.title !== undefined) commission.title = body.title;
  if (body.status !== undefined) commission.status = body.status;
  if (body.quoteAmount !== undefined) {
    commission.quoteAmount = body.quoteAmount;
  }
  if (body.currency !== undefined) commission.currency = body.currency;
  if (body.invoiceStatus !== undefined) {
    commission.invoiceStatus = body.invoiceStatus;
  }
  if (body.invoiceUrl !== undefined) commission.invoiceUrl = body.invoiceUrl;
  commission.updatedAt = timestamp();
  return dataResponse(commission);
}
