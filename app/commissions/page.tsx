import { mockDb } from "../api/_data/mock-database";
import { CommissionsExperience } from "./CommissionsExperience";
import type {
  CommissionMessageView,
  CommissionViewRecord,
} from "./CommissionsExperience";

export default function Commissions() {
  const customer = mockDb.users.find((user) => user.role === "customer");
  const commissionTypes = mockDb.commissionTypes
    .filter((type) => type.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);
  const typeNames = new Map(
    mockDb.commissionTypes.map((type) => [type.id, type.title]),
  );
  const commissions: CommissionViewRecord[] = mockDb.commissions
    .filter((commission) => commission.customerId === customer?.id)
    .map((commission) => ({
      id: String(commission.displayNumber).padStart(3, "0"),
      title: commission.title,
      status: humanize(commission.status),
      type: commission.commissionTypeId
        ? (typeNames.get(commission.commissionTypeId) ?? "Custom")
        : "Custom",
      quote:
        commission.quoteAmount === null
          ? "Not quoted"
          : new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: commission.currency,
            }).format(commission.quoteAmount / 100),
      invoice: humanize(commission.invoiceStatus),
      current: !["delivered", "cancelled"].includes(commission.status),
    }));
  const activeCommission = mockDb.commissions.find(
    (commission) => commission.customerId === customer?.id && commission.status === "in_progress",
  );
  const initialMessages: CommissionMessageView[] = mockDb.messages
    .filter((message) => message.commissionId === activeCommission?.id)
    .map((message) => ({
      from: message.senderRole === "admin" ? "admin" : "user",
      text: message.body,
    }));

  return (
    <CommissionsExperience
      commissionTypes={commissionTypes}
      commissions={commissions}
      initialMessages={initialMessages}
      content={mockDb.content.commissions}
      commissionsOpen={mockDb.settings.commissionsOpen}
    />
  );
}

function humanize(value: string) {
  const text = value.replaceAll("_", " ");
  return text.charAt(0).toUpperCase() + text.slice(1);
}
