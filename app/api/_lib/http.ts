export function errorResponse(
  status: number,
  error: string,
  code?: string,
  details?: Record<string, unknown>,
) {
  return Response.json(
    {
      error,
      ...(code ? { code } : {}),
      ...(details ? { details } : {}),
    },
    { status },
  );
}

export async function readJson<T>(request: Request): Promise<T | null> {
  try {
    return (await request.json()) as T;
  } catch {
    return null;
  }
}

export const dataResponse = <T>(data: T, init?: ResponseInit) =>
  Response.json({ data }, init);
