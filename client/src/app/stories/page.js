import SuccessStoriesPage from "@/components/SuccessStoriesPage";
import FinalCTA from "@/components/FinalCTA";
import { siteConfig } from "@/config/SiteConfig";

export const metadata = {
  title: `Success Stories — ${siteConfig.name}`,
  description:
    "Meet students who have successfully started their data science careers after studying with SkillVexa. Get inspired by real success stories.",
};

export default function Stories() {
  return (
    <>
      <SuccessStoriesPage />
      <FinalCTA />
    </>
  );
}
