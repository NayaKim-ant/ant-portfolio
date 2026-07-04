import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  commissionTypes,
  getCommissionType,
} from "../../api/commission-types/data";
import { BackButton } from "../../components/BackButton";
import { CommissionSamplesCarousel } from "../../components/CommissionSamplesCarousel";

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
      <main className="type-details-page">
        <header className="type-details-heading">
          <h1>{commissionType.title} type</h1>
          <BackButton href="/commissions" />
        </header>

        <CommissionSamplesCarousel
          title={commissionType.title}
          samples={commissionType.samples}
        />

        <Link
          className="type-order-button"
          href={`/commissions/${commissionType.slug}/apply`}
        >
          Order
        </Link>

        <p className="type-short-description">
          {commissionType.shortDescription}
        </p>

        <section className="type-info-section">
          <h2 className="leaf-heading">Price</h2>
          <ul>
            {commissionType.priceOptions.map((option) => (
              <li key={option}>{option}</li>
            ))}
          </ul>
        </section>

        <section className="type-info-section">
          <h2 className="leaf-heading">Delivery time</h2>
          <ul>
            {commissionType.deliveryOptions.map((option) => (
              <li key={option}>{option}</li>
            ))}
          </ul>
        </section>

        <section className="type-info-section">
          <h2 className="leaf-heading">Additional charge</h2>
          <ul>
            {commissionType.additionalCharges.map((charge) => (
              <li key={charge}>{charge}</li>
            ))}
          </ul>
        </section>

        <section className="type-info-section">
          <h2 className="leaf-heading">Description</h2>
          <p>{commissionType.description}</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere, sem at tincidunt feugiat, neque erat tristique libero, at
            viverra massa mauris vitae justo.
          </p>
        </section>

        <section className="type-info-section">
          <h2 className="leaf-heading">Notes &amp; disclaimers</h2>
          <ul>
            {commissionType.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <p>Revisions: {commissionType.revisions}</p>
        </section>
      </main>

      <footer className="site-footer">© 2026 Ant</footer>
    </div>
  );
}
