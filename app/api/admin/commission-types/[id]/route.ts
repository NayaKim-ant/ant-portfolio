import { mockDb } from "../../../_data/mock-database";
import { getAdminUser } from "../../../_lib/auth";
import { dataResponse, errorResponse, readJson } from "../../../_lib/http";

type TypeUpdate = Partial<(typeof mockDb.commissionTypes)[number]>;

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await getAdminUser();
  if (!admin) return errorResponse(403, "Admin access required", "FORBIDDEN");

  const { id } = await params;
  const type = mockDb.commissionTypes.find((candidate) => candidate.id === id);
  if (!type) return errorResponse(404, "Commission type not found", "NOT_FOUND");

  const body = await readJson<TypeUpdate>(request);
  if (!body || Object.keys(body).length === 0) {
    return errorResponse(400, "Update payload is required", "INVALID_INPUT");
  }
  if (
    body.slug &&
    mockDb.commissionTypes.some(
      (candidate) => candidate.slug === body.slug && candidate.id !== id,
    )
  ) {
    return errorResponse(409, "Commission type slug already exists", "SLUG_CONFLICT");
  }

  const previousSlug = type.slug;
  Object.assign(type, body, { id: type.id });
  if (body.slug && body.slug !== previousSlug) {
    mockDb.applicationForms[body.slug] =
      mockDb.applicationForms[previousSlug] ?? [];
    delete mockDb.applicationForms[previousSlug];
  }
  return dataResponse(type);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await getAdminUser();
  if (!admin) return errorResponse(403, "Admin access required", "FORBIDDEN");

  const { id } = await params;
  const index = mockDb.commissionTypes.findIndex(
    (candidate) => candidate.id === id,
  );
  if (index < 0) return errorResponse(404, "Commission type not found", "NOT_FOUND");

  const [removed] = mockDb.commissionTypes.splice(index, 1);
  delete mockDb.applicationForms[removed.slug];
  return new Response(null, { status: 204 });
}
