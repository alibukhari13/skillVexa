import { ChannelsPage } from "@/components/dashboard/CommunityPages";
import { siteConfig } from "@/config/SiteConfig";

export const metadata = { title: `All Channels — ${siteConfig.name}` };

export default function Page() {
  return <ChannelsPage />;
}
