import { mockDb } from "../../_data/mock-database";
import { getAdminUser } from "../../_lib/auth";
import { dataResponse, errorResponse, readJson } from "../../_lib/http";

type SettingsBody = {
  commissionsOpen?: boolean;
  contactEmail?: string;
  availableHours?: string;
};

export async function GET() {
  const admin = await getAdminUser();
  if (!admin) return errorResponse(403, "Admin access required", "FORBIDDEN");
  return dataResponse(mockDb.settings);
}

export async function PATCH(request: Request) {
  const admin = await getAdminUser();
  if (!admin) return errorResponse(403, "Admin access required", "FORBIDDEN");

  const body = await readJson<SettingsBody>(request);
  if (!body || Object.keys(body).length === 0) {
    return errorResponse(400, "At least one setting is required", "INVALID_INPUT");
  }
  if (typeof body.commissionsOpen === "boolean") {
    mockDb.settings.commissionsOpen = body.commissionsOpen;
  }
  if (body.contactEmail) mockDb.settings.contactEmail = body.contactEmail;
  if (body.availableHours) {
    mockDb.settings.availableHours = body.availableHours;
  }
  return dataResponse(mockDb.settings);
}
