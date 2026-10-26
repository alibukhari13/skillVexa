import { notFound } from "next/navigation";
import SettingsPage from "@/components/dashboard/SettingsPage";
import { settingsTabs } from "@/config/AdminContent";
import { siteConfig } from "@/config/SiteConfig";

export function generateStaticParams() {
  return settingsTabs.map((item) => ({ tab: item.id === "general" ? [] : [item.id] }));
}

export async function generateMetadata({ params }) {
  const { tab } = await params;
  const current = settingsTabs.find((item) => item.id === (tab?.[0] || "general"));
  return { title: `Settings - ${current?.label || "General"} — ${siteConfig.name}` };
}

export default async function Page({ params }) {
  const { tab } = await params;
  const id = tab?.[0] || "general";
  if ((tab && tab.length > 1) || !settingsTabs.some((item) => item.id === id)) notFound();
  return <SettingsPage tab={id} />;
}
