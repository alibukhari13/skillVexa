import { notFound } from "next/navigation";
import ProjectPreview from "@/components/dashboard/ProjectPreview";
import { projectById } from "@/config/AdminContent";
import { dashboardProjects } from "@/config/DashboardData";
import { siteConfig } from "@/config/SiteConfig";

export function generateStaticParams() {
  return dashboardProjects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projectById[slug];
  return { title: project ? `${project.title} — ${siteConfig.name}` : `Projects — ${siteConfig.name}` };
}

export default async function Page({ params }) {
  const { slug } = await params;
  if (!projectById[slug]) notFound();
  return <ProjectPreview projectId={slug} />;
}
