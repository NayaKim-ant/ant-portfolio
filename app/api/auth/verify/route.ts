import { cookies } from "next/headers";
import {
  createId,
  mockDb,
} from "../../_data/mock-database";
import { publicUser, SESSION_COOKIE } from "../../_lib/auth";
import { dataResponse, errorResponse, readJson } from "../../_lib/http";

export async function POST(request: Request) {
  const body = await readJson<{ token?: string }>(request);
  if (!body?.token) {
    return errorResponse(400, "Token is required", "INVALID_INPUT");
  }

  const magicLink = mockDb.magicLinks.find(
    (candidate) =>
      candidate.token === body.token &&
      new Date(candidate.expiresAt).getTime() > Date.now(),
  );
  if (!magicLink) {
    return errorResponse(401, "Magic link is invalid or expired", "INVALID_TOKEN");
  }

  const user = mockDb.users.find(
    (candidate) => candidate.id === magicLink.userId,
  );
  if (!user) {
    return errorResponse(401, "Magic link user no longer exists", "INVALID_TOKEN");
  }

  const sessionToken = createId();
  mockDb.sessions.push({
    token: sessionToken,
    userId: user.id,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  });
  mockDb.magicLinks = mockDb.magicLinks.filter(
    (candidate) => candidate.token !== body.token,
  );

  (await cookies()).set(SESSION_COOKIE, sessionToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });

  return dataResponse(publicUser(user));
}
