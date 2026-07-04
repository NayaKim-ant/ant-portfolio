import Link from "next/link";
import { commissionTypes } from "../api/commission-types/data";

export function CommissionTypeCards() {
  return (
    <div className="commission-type-list">
      {commissionTypes.map((type, index) => (
        <article className="commission-type-card" key={type.slug}>
          <div className="commission-type-image">
            {index === commissionTypes.length - 1 ? "your idea" : "sample"}
          </div>
          <div>
            <h3>{type.title}</h3>
            <p>{type.shortDescription}</p>
            <Link className="text-action" href={`/commissions/${type.slug}`}>
              View more or buy this type
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
