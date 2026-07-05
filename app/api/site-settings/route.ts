import { mockDb } from "../_data/mock-database";
import { dataResponse } from "../_lib/http";

export async function GET() {
  return dataResponse(mockDb.settings);
}
