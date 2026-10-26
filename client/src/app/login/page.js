import LoginPage from "@/components/LoginPage";
import { siteConfig } from "@/config/SiteConfig";

export const metadata = {
  title: `Log in — ${siteConfig.name}`,
  description: `Log in to your ${siteConfig.name} profile.`,
};

export default function Login() {
  return <LoginPage />;
}
