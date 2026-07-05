import { errorResponse } from "../../_lib/http";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return errorResponse(400, "Stripe signature is required", "INVALID_SIGNATURE");
  }

  await request.text();
  return Response.json({
    received: true,
    note: "Mock webhook accepted. Signature verification is added with Stripe.",
  });
}
