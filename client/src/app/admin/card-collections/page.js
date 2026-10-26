import CardCollections from "@/components/dashboard/CardCollections";
import { siteConfig } from "@/config/SiteConfig";

export const metadata = { title: `Card Collections — ${siteConfig.name}` };

export default function Page() {
  return <CardCollections />;
}
