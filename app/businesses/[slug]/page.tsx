import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BUSINESSES, getBusinessBySlug, type BusinessRecord } from "@/data/businesses";
import { BusinessPageClient } from "./business-page-client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BUSINESSES.map((business) => ({
    slug: business.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const business = getBusinessBySlug(resolvedParams.slug);
  if (!business) {
    return { title: "Not Found" };
  }
  return {
    title: `${business.displayName} | Siflon Group`,
    description: business.shortDescription ?? `Learn about ${business.displayName}, a division of Siflon Group.`,
  };
}

export default async function BusinessPage({ params }: PageProps) {
  const resolvedParams = await params;
  const business = getBusinessBySlug(resolvedParams.slug);

  if (!business) {
    notFound();
  }

  return <BusinessPageClient business={business} />;
}