import { ProfilePage } from "@/components/dashboard/AccountPages";
import { siteConfig } from "@/config/SiteConfig";

export const metadata = { title: `My profile — ${siteConfig.name}` };

export default function Page() {
  return <ProfilePage />;
}
