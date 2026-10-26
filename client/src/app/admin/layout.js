import DashboardShell from "@/components/dashboard/DashboardShell";
import { siteConfig } from "@/config/SiteConfig";

export const metadata = {
  title: `Dashboard — ${siteConfig.name}`,
  description: "Your SkillVexa learning dashboard: courses, career tracks, projects, exams, and job prep.",
};

export default function AdminLayout({ children }) {
  return <DashboardShell>{children}</DashboardShell>;
}
