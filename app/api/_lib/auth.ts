import { cookies } from "next/headers";
import { mockDb, UserRecord } from "../_data/mock-database";

export const SESSION_COOKIE = "ant_session";

export async function getCurrentUser(): Promise<UserRecord | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = mockDb.sessions.find(
    (candidate) =>
      candidate.token === token &&
      new Date(candidate.expiresAt).getTime() > Date.now(),
  );
  if (!session) return null;

  return mockDb.users.find((user) => user.id === session.userId) ?? null;
}

export async function getAdminUser() {
  const user = await getCurrentUser();
  return user?.role === "admin" ? user : null;
}

export function publicUser(user: UserRecord) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
