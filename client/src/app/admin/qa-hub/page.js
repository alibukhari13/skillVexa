import { QaHubPage } from "@/components/dashboard/CommunityPages";
import { siteConfig } from "@/config/SiteConfig";

export const metadata = { title: `Q&A Hub — ${siteConfig.name}` };

export default function Page() {
  return <QaHubPage />;
}
