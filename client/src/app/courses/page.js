import CoursesCatalog from "@/components/CoursesCatalog";
import CoursesFAQ from "@/components/CoursesFAQ";
import FinalCTA from "@/components/FinalCTA";
import { siteConfig } from "@/config/SiteConfig";

export const metadata = {
  title: `Courses — ${siteConfig.name}`,
  description: siteConfig.coursesPage.description,
};

export default function CoursesPage() {
  return (
    <>
      <CoursesCatalog />
      <CoursesFAQ />
      <FinalCTA />
    </>
  );
}
