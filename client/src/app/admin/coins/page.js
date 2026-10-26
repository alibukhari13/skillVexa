import { CoinsPage } from "@/components/dashboard/AccountPages";
import { siteConfig } from "@/config/SiteConfig";

export const metadata = { title: `My wallet — ${siteConfig.name}` };

export default function Page() {
  return <CoinsPage />;
}
