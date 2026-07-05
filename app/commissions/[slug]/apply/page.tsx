import { notFound } from "next/navigation";
import { mockDb } from "../../../api/_data/mock-database";
import { CommissionApplicationForm } from "./CommissionApplicationForm";

type ApplicationPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return mockDb.commissionTypes.map(({ slug }) => ({ slug }));
}

export default async function CommissionApplicationPage({
  params,
}: ApplicationPageProps) {
  const { slug } = await params;
  const commissionType = mockDb.commissionTypes.find(
    (type) => type.slug === slug && type.isActive,
  );

  if (!commissionType) notFound();

  return (
    <CommissionApplicationForm
      typeName={commissionType.title}
      typeSlug={commissionType.slug}
      questions={mockDb.applicationForms[commissionType.slug] ?? []}
    />
  );
}
