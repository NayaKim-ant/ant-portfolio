import Link from "next/link";
import { mockDb } from "../../api/_data/mock-database";
import { BackButton } from "../../components/BackButton";
import { CommissionTypeCards } from "../../components/CommissionTypeCards";

export default function OrderCommissionPage() {
  const commissionTypes = mockDb.commissionTypes
    .filter((type) => type.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div className="site-shell paper-page">
      <main className="order-commission-page">
        <div className="subpage-title-row">
          <header className="order-heading">
            <h1>Glad that you want to order!</h1>
            <p>Check out the types:</p>
          </header>
          <BackButton href="/commissions" />
        </div>

        <section className="order-types-section">
          <h2 className="leaf-heading">Types available</h2>
          <CommissionTypeCards commissionTypes={commissionTypes} />
        </section>

        <section className="order-undecided">
          <p>Or if you can&apos;t decide yet:</p>
          <Link className="outline-pencil-button" href="/commissions/ask">
            Ask before ordering
          </Link>
        </section>
      </main>

      <footer className="site-footer">© 2026 Ant</footer>
    </div>
  );
}
