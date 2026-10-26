import ResumePage from "@/components/dashboard/ResumePage";
import { siteConfig } from "@/config/SiteConfig";

export const metadata = { title: `Profile Resume — ${siteConfig.name}` };

export default function Page() {
  return <ResumePage />;
}
