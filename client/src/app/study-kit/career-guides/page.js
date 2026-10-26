import { redirect } from "next/navigation";

export const metadata = {
  title: "Data and AI Career Guides — SkillVexa",
  description: "Practical career guidance for data and AI roles.",
};

export default function CareerGuidesPage() {
  redirect("/career-kit/career-guides");
}
