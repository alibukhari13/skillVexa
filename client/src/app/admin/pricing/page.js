import { PricingPage } from "@/components/dashboard/AccountPages";
import { siteConfig } from "@/config/SiteConfig";

export const metadata = { title: `Pricing — ${siteConfig.name}` };

export default function Page() {
  return <PricingPage />;
}
