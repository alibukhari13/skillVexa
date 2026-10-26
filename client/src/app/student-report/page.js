import StudentOutcomesReport from "@/components/StudentOutcomesReport";
import CoursesFAQ from "@/components/CoursesFAQ";
import FinalCTA from "@/components/FinalCTA";
import { siteConfig } from "@/config/SiteConfig";

export const metadata = {
  title: `Student Outcomes Report — ${siteConfig.name}`,
  description:
    "See real outcomes from SkillVexa graduates. Explore student stories, career results, and the STEP method behind our AI and data science programs.",
};

export default function StudentReport() {
  return (
    <>
      <StudentOutcomesReport />
      <CoursesFAQ />
      <FinalCTA />
    </>
  );
}
