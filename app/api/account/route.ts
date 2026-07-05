import { mockDb, timestamp } from "../_data/mock-database";
import { getCurrentUser, publicUser } from "../_lib/auth";
import { dataResponse, errorResponse, readJson } from "../_lib/http";

type AccountUpdate = {
  name?: string;
  email?: string;
};

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return errorResponse(401, "Authentication required", "UNAUTHORIZED");
  return dataResponse(publicUser(user));
}

export async function PATCH(request: Request) {
  const user = await getCurrentUser();
  if (!user) return errorResponse(401, "Authentication required", "UNAUTHORIZED");

  const body = await readJson<AccountUpdate>(request);
  const name = body?.name?.trim();
  const email = body?.email?.trim().toLowerCase();
  if (!name && !email) {
    return errorResponse(400, "Name or email is required", "INVALID_INPUT");
  }
  if (email && !email.includes("@")) {
    return errorResponse(400, "Email is invalid", "INVALID_INPUT");
  }
  if (
    email &&
    mockDb.users.some(
      (candidate) => candidate.email === email && candidate.id !== user.id,
    )
  ) {
    return errorResponse(409, "Email is already in use", "EMAIL_CONFLICT");
  }

  if (name) user.name = name;
  if (email) user.email = email;
  user.updatedAt = timestamp();
  return dataResponse(publicUser(user));
}
