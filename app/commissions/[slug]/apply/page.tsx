import { notFound } from "next/navigation";
import {
  commissionTypes,
  getCommissionType,
} from "../../../api/commission-types/data";
import { CommissionApplicationForm } from "./CommissionApplicationForm";

type ApplicationPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return commissionTypes.map(({ slug }) => ({ slug }));
}

export default async function CommissionApplicationPage({
  params,
}: ApplicationPageProps) {
  const { slug } = await params;
  const commissionType = getCommissionType(slug);

  if (!commissionType) notFound();

  return (
    <CommissionApplicationForm
      typeName={commissionType.title}
      typeSlug={commissionType.slug}
    />
  );
}
