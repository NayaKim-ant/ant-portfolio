import { mockDb } from "../_data/mock-database";
import { dataResponse } from "../_lib/http";

export async function GET() {
  const types = mockDb.commissionTypes
    .filter((type) => type.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return dataResponse(types);
}
