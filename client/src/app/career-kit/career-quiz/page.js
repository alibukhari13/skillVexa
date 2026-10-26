import CareerQuizExperience from "@/components/CareerQuizExperience";

export const metadata = {
  title: "Career Quiz — SkillVexa",
  description: "Discover a career path in data and AI with the SkillVexa career quiz.",
};

export default async function CareerQuizPage({ searchParams }) {
  const { source } = await searchParams;
  return <CareerQuizExperience fromAdmin={source === "admin"} />;
}
