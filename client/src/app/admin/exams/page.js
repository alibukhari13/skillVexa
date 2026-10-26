import ExamsPage from "@/components/dashboard/ExamsPage";
import { siteConfig } from "@/config/SiteConfig";

export const metadata = { title: `Practice Exams — ${siteConfig.name}` };

export default async function Page({ searchParams }) {
  const { tab } = await searchParams;
  return <ExamsPage initialTab={typeof tab === "string" ? tab : "practice"} />;
}
