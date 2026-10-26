import { CertificatesPage } from "@/components/dashboard/AccountPages";
import { siteConfig } from "@/config/SiteConfig";

export const metadata = { title: `Certificates — ${siteConfig.name}` };

export default function Page() {
  return <CertificatesPage />;
}
