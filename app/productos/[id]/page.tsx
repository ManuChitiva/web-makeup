import { redirect } from "next/navigation";

type PageProps = { params: Promise<{ id: string }> };

export default async function LegacyProductPage({ params }: PageProps) {
  const { id } = await params;
  redirect(`/servicios/${encodeURIComponent(id)}`);
}
