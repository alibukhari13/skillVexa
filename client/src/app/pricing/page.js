import PricingExperience from "@/components/PricingExperience";
import { siteConfig } from "@/config/SiteConfig";

export const metadata = {
  title: "Pricing — " + siteConfig.name,
  description: "Choose a " + siteConfig.name + " learning plan that fits your goals.",
};

export default function PricingPage() {
  return <PricingExperience />;
}
