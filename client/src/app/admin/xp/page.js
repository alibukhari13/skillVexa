import { XpPage } from "@/components/dashboard/AccountPages";
import { siteConfig } from "@/config/SiteConfig";

export const metadata = { title: `XP — ${siteConfig.name}` };

export default function Page() {
  return <XpPage />;
}
