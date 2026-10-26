import SignupPage from "@/components/SignupPage";
import { siteConfig } from "@/config/SiteConfig";

export const metadata = {
  title: `Sign up — ${siteConfig.name}`,
  description: `Create your free ${siteConfig.name} account. Start learning for free—no credit card required.`,
};

export default function Signup() {
  return <SignupPage />;
}
