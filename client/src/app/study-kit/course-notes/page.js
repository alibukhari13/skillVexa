import CourseNotesExperience from "@/components/CourseNotesExperience";
import { siteConfig } from "@/config/SiteConfig";

export const metadata = {
  title: `Course Notes — ${siteConfig.name}`,
  description: "Clear, practical study notes for Python, Excel, SQL, and data science fundamentals.",
};

export default function CourseNotesPage() {
  return <CourseNotesExperience />;
}
