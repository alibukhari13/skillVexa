import { LeaderboardPage } from "@/components/dashboard/AccountPages";
import { siteConfig } from "@/config/SiteConfig";

export const metadata = { title: `Leaderboard — ${siteConfig.name}` };

export default function Page() {
  return <LeaderboardPage />;
}
