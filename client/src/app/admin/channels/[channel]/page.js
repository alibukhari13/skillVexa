import { notFound } from "next/navigation";
import { ChannelDetail } from "@/components/dashboard/CommunityPages";
import { channels } from "@/config/AdminContent";
import { siteConfig } from "@/config/SiteConfig";

export function generateStaticParams() {
  return channels.map((channel) => ({ channel: channel.id }));
}

export async function generateMetadata({ params }) {
  const { channel } = await params;
  return { title: `#${channel} — ${siteConfig.name}` };
}

export default async function Page({ params }) {
  const { channel } = await params;
  if (!channels.some((item) => item.id === channel)) notFound();
  return <ChannelDetail channelId={channel} />;
}
