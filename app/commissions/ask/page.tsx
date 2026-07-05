import { mockDb } from "../../api/_data/mock-database";
import { AskBeforeOrdering } from "./AskBeforeOrdering";

export default function AskBeforeOrderingPage() {
  return <AskBeforeOrdering faqs={mockDb.content.commissions.faqs} />;
}
