import CoursesLibrary from "@/components/dashboard/CoursesLibrary";
import { siteConfig } from "@/config/SiteConfig";

export const metadata = { title: `Courses Library — ${siteConfig.name}` };

export default function Page() {
  return <CoursesLibrary />;
}
