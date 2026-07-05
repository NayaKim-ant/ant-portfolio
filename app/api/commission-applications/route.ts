import {
  createId,
  mockDb,
  timestamp,
} from "../_data/mock-database";
import { getCurrentUser } from "../_lib/auth";
import { dataResponse, errorResponse, readJson } from "../_lib/http";

type ApplicationBody = {
  commissionTypeSlug?: string;
  answers?: Array<{
    questionId?: string;
    selectedValue?: string;
    richTextHtml?: string;
    textValue?: string;
    assetIds?: string[];
  }>;
};

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return errorResponse(401, "Authentication required", "UNAUTHORIZED");
  if (!mockDb.settings.commissionsOpen) {
    return errorResponse(409, "Commissions are closed", "COMMISSIONS_CLOSED");
  }

  const body = await readJson<ApplicationBody>(request);
  const type = mockDb.commissionTypes.find(
    (candidate) =>
      candidate.slug === body?.commissionTypeSlug && candidate.isActive,
  );
  const questions = body?.commissionTypeSlug
    ? mockDb.applicationForms[body.commissionTypeSlug]
    : null;
  if (!type || !questions || !Array.isArray(body?.answers)) {
    return errorResponse(400, "Application is invalid", "INVALID_INPUT");
  }

  const answeredIds = new Set(
    body.answers
      .map((answer) => answer.questionId)
      .filter((id): id is string => Boolean(id)),
  );
  const missingRequired = questions.some(
    (question) => question.required && !answeredIds.has(question.id),
  );
  if (missingRequired) {
    return errorResponse(
      400,
      "Required application answers are missing",
      "MISSING_ANSWERS",
    );
  }

  const now = timestamp();
  const commissionId = createId();
  const commission = {
    id: commissionId,
    displayNumber:
      Math.max(0, ...mockDb.commissions.map((item) => item.displayNumber)) + 1,
    customerId: user.id,
    commissionTypeId: type.id,
    title: type.title,
    description: "Created from a commission application.",
    intendedUse: "",
    deadline: null,
    status: "inquiry" as const,
    quoteAmount: null,
    currency: "USD",
    invoiceStatus: "not_created" as const,
    invoiceUrl: null,
    referenceImageUrls: body.answers.flatMap((answer) =>
      (answer.assetIds ?? [])
        .map((assetId) => mockDb.assets.find((asset) => asset.id === assetId))
        .filter((asset) => asset?.ownerId === user.id)
        .map((asset) => asset!.url),
    ),
    createdAt: now,
    updatedAt: now,
  };
  mockDb.commissions.push(commission);
  mockDb.applications.push({
    id: createId(),
    customerId: user.id,
    commissionTypeSlug: type.slug,
    answers: body.answers.map((answer) => ({
      questionId: answer.questionId ?? "",
      selectedValue: answer.selectedValue,
      richTextHtml: answer.richTextHtml,
      textValue: answer.textValue,
      assetIds: answer.assetIds,
    })),
    commissionId,
    createdAt: now,
  });

  return dataResponse(commission, { status: 201 });
}
