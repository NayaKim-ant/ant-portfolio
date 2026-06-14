import { getCommissionType } from "../data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const commissionType = getCommissionType(slug);

  if (!commissionType) {
    return Response.json(
      { error: "Commission type not found" },
      { status: 404 },
    );
  }

  return Response.json({ data: commissionType });
}
