import { commissionTypes } from "./data";

export const dynamic = "force-static";

export async function GET() {
  return Response.json({ data: commissionTypes });
}
