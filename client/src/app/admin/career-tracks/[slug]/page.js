import { notFound } from "next/navigation";
import CareerTrackDetail from "@/components/dashboard/CareerTrackDetail";
import { trackById } from "@/config/AdminContent";
import { dashboardTracks } from "@/config/DashboardData";
import { siteConfig } from "@/config/SiteConfig";

export function generateStaticParams() {
  return dashboardTracks.map((track) => ({ slug: track.id }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const track = trackById[slug];
  return { title: track ? `${track.title} career track — ${siteConfig.name}` : `Career Tracks — ${siteConfig.name}` };
}

export default async function Page({ params }) {
  const { slug } = await params;
  if (!trackById[slug]) notFound();
  return <CareerTrackDetail trackId={slug} />;
}
