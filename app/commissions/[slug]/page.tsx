import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  commissionTypes,
  getCommissionType,
} from "../../api/commission-types/data";

type CommissionTypePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return commissionTypes.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CommissionTypePageProps): Promise<Metadata> {
  const { slug } = await params;
  const commissionType = getCommissionType(slug);

  return {
    title: commissionType
      ? `${commissionType.title} Commission | Ant`
      : "Commission Type | Ant",
    description: commissionType?.shortDescription,
  };
}

export default async function CommissionTypePage({
  params,
}: CommissionTypePageProps) {
  const { slug } = await params;
  const commissionType = getCommissionType(slug);

  if (!commissionType) notFound();

  return (
    <div className="site-shell paper-page commission-type-shell">
      <main className="commission-type-page">
        <div className="commission-detail-nav">
          <Link className="text-action" href="/commissions">
            &lt; Back to commissions
          </Link>
        </div>

        <header className="commission-type-heading">
          <p className="page-eyebrow">Commission type</p>
          <h1 className="double-leaf-title">{commissionType.title}</h1>
          <p>{commissionType.shortDescription}</p>
        </header>

        <section className="commission-type-showcase">
          <div className="commission-type-main-image">main sample image</div>
          <div className="commission-type-summary">
            <p>{commissionType.description}</p>
            <dl>
              <div>
                <dt>Starting price</dt>
                <dd>{commissionType.startingPrice}</dd>
              </div>
              <div>
                <dt>Turnaround</dt>
                <dd>{commissionType.turnaround}</dd>
              </div>
              <div>
                <dt>Revisions</dt>
                <dd>{commissionType.revisions}</dd>
              </div>
            </dl>
            <Link className="pencil-button" href="/commissions">
              {commissionType.custom
                ? "Ask about this type"
                : "Order this commission"}
            </Link>
          </div>
        </section>

        <section className="commission-type-section">
          <h2 className="leaf-heading">More examples</h2>
          <div className="commission-example-grid">
            <div>sample 01</div>
            <div>sample 02</div>
            <div>sample 03</div>
          </div>
        </section>

        <section className="commission-type-section commission-type-info-grid">
          <article>
            <h2 className="leaf-heading">What you receive</h2>
            <ul>
              {commissionType.deliverables.map((deliverable) => (
                <li key={deliverable}>{deliverable}</li>
              ))}
            </ul>
          </article>
          <article>
            <h2 className="leaf-heading">Before ordering</h2>
            <ul>
              {commissionType.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </article>
        </section>
      </main>

      <footer className="site-footer">© 2026 Ant</footer>
    </div>
  );
}
