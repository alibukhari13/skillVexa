import { NewsfeedPage } from "@/components/dashboard/CommunityPages";
import { siteConfig } from "@/config/SiteConfig";

export const metadata = { title: `News Feed — ${siteConfig.name}` };

export default function Page() {
  return <NewsfeedPage />;
}
