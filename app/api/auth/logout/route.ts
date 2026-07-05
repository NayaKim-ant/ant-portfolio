import { cookies } from "next/headers";
import { mockDb } from "../../_data/mock-database";
import { SESSION_COOKIE } from "../../_lib/auth";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    mockDb.sessions = mockDb.sessions.filter(
      (session) => session.token !== token,
    );
  }
  cookieStore.delete(SESSION_COOKIE);
  return new Response(null, { status: 204 });
}
