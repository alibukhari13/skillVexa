import { NotificationsPage } from "@/components/dashboard/AccountPages";
import { siteConfig } from "@/config/SiteConfig";

export const metadata = { title: `Notifications — ${siteConfig.name}` };

export default function Page() {
  return <NotificationsPage />;
}
