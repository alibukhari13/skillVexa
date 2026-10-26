import CareerTracks from "@/components/dashboard/CareerTracks";
import { siteConfig } from "@/config/SiteConfig";

export const metadata = { title: `Career Tracks — ${siteConfig.name}` };

export default function Page() {
  return <CareerTracks />;
}
