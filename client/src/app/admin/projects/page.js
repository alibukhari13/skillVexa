import ProjectsLibrary from "@/components/dashboard/ProjectsLibrary";
import { siteConfig } from "@/config/SiteConfig";

export const metadata = { title: `Projects — ${siteConfig.name}` };

export default function Page() {
  return <ProjectsLibrary />;
}
