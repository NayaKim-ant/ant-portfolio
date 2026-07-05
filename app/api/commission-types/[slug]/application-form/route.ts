import { mockDb } from "../../../_data/mock-database";
import { dataResponse, errorResponse } from "../../../_lib/http";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const type = mockDb.commissionTypes.find(
    (candidate) => candidate.slug === slug && candidate.isActive,
  );
  const questions = mockDb.applicationForms[slug];

  if (!type || !questions) {
    return errorResponse(404, "Application form not found", "NOT_FOUND");
  }

  return dataResponse({
    commissionTypeSlug: slug,
    title: `Ordering ${type.title} type`,
    questions,
  });
}
