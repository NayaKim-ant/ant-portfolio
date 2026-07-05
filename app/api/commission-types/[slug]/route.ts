import { mockDb } from "../../_data/mock-database";
import { dataResponse, errorResponse } from "../../_lib/http";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const commissionType = mockDb.commissionTypes.find(
    (type) => type.slug === slug && type.isActive,
  );

  if (!commissionType) {
    return errorResponse(404, "Commission type not found", "NOT_FOUND");
  }

  return dataResponse(commissionType);
}
