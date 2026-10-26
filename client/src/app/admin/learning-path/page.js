import LearningPathPage from "@/components/dashboard/LearningPathPage";
import { siteConfig } from "@/config/SiteConfig";

export const metadata = { title: `My learning path — ${siteConfig.name}` };

export default function Page() {
  return <LearningPathPage />;
}
