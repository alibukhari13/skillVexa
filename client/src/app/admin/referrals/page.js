import { ReferralsPage } from "@/components/dashboard/AccountPages";
import { siteConfig } from "@/config/SiteConfig";

export const metadata = { title: `Referrals — ${siteConfig.name}` };

export default function Page() {
  return <ReferralsPage />;
}
