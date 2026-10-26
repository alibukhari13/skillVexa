import { notFound } from "next/navigation";
import CareerPathDetails from "@/components/CareerPathDetails";
import FinalCTA from "@/components/FinalCTA";
import {
  getCareerPath,
  getCareerPathNavItems,
  getCareerPathSlug,
  siteConfig,
} from "@/config/SiteConfig";

export function generateStaticParams() {
  return getCareerPathNavItems().map((item) => ({ slug: getCareerPathSlug(item) }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const path = getCareerPath(slug);
  if (!path) {
    return { title: `Career Path — ${siteConfig.name}` };
  }
  return {
    title: `${path.title} — ${siteConfig.name}`,
    description: path.description,
  };
}

export default async function CareerPathDetailsPage({ params }) {
  const { slug } = await params;
  const path = getCareerPath(slug);
  if (!path) notFound();

  return (
    <>
      <CareerPathDetails key={path.slug} path={path} />
      <FinalCTA />
    </>
  );
}
