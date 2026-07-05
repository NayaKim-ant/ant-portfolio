import {
  createId,
  mockDb,
  timestamp,
} from "../../_data/mock-database";
import { errorResponse, readJson } from "../../_lib/http";

type MagicLinkBody = {
  name?: string;
  email?: string;
};

export async function POST(request: Request) {
  const body = await readJson<MagicLinkBody>(request);
  const name = body?.name?.trim();
  const email = body?.email?.trim().toLowerCase();

  if (!name || !email || !email.includes("@")) {
    return errorResponse(400, "A valid name and email are required", "INVALID_INPUT");
  }

  let user = mockDb.users.find((candidate) => candidate.email === email);
  if (!user) {
    const now = timestamp();
    user = {
      id: createId(),
      name,
      email,
      role: email === "admin@ant.local" ? "admin" : "customer",
      createdAt: now,
      updatedAt: now,
    };
    mockDb.users.push(user);
  }

  const token = createId();
  mockDb.magicLinks = mockDb.magicLinks.filter(
    (candidate) => candidate.userId !== user.id,
  );
  mockDb.magicLinks.push({
    token,
    userId: user.id,
    expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
  });

  return Response.json(
    {
      message: "Authentication email sent",
      debugToken: token,
    },
    { status: 202 },
  );
}
