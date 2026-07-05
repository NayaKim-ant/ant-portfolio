import {
  createId,
  mockDb,
  timestamp,
} from "../../_data/mock-database";
import { getCurrentUser } from "../../_lib/auth";
import { dataResponse, errorResponse, readJson } from "../../_lib/http";

type UploadBody = {
  fileName?: string;
  contentType?: string;
  fileSize?: number;
};

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return errorResponse(401, "Authentication required", "UNAUTHORIZED");

  const body = await readJson<UploadBody>(request);
  if (
    !body?.fileName ||
    !body.contentType?.startsWith("image/") ||
    !body.fileSize ||
    body.fileSize > 10 * 1024 * 1024
  ) {
    return errorResponse(
      400,
      "A valid image under 10 MB is required",
      "INVALID_UPLOAD",
    );
  }

  const assetId = createId();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
  const url = `https://example.com/mock-uploads/${assetId}/${encodeURIComponent(
    body.fileName,
  )}`;
  mockDb.assets.push({
    id: assetId,
    ownerId: user.id,
    fileName: body.fileName,
    contentType: body.contentType,
    fileSize: body.fileSize,
    url,
    createdAt: timestamp(),
  });

  return dataResponse({
    assetId,
    uploadUrl: `${url}?mock-presigned=true`,
    expiresAt,
  });
}
