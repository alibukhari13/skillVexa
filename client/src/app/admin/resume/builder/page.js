import ResumeBuilder from "@/components/dashboard/ResumeBuilder";
import { siteConfig } from "@/config/SiteConfig";

export const metadata = { title: `Resume Builder — ${siteConfig.name}` };

export default function Page() {
  return <ResumeBuilder />;
}
