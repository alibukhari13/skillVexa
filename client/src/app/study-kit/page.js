import StudyKitResourceExperience from "@/components/StudyKitResourceExperience";

export const metadata = {
  title: "Resources Center — SkillVexa",
  description: "Course notes, templates, infographics, career guides and practice exams in one place.",
};

export default function StudyKitPage() {
  return <StudyKitResourceExperience kind="all" />;
}
