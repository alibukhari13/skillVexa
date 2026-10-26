import ReviewsPage from "@/components/ReviewsPage";
import FinalCTA from "@/components/FinalCTA";
import { siteConfig } from "@/config/SiteConfig";

export const metadata = {
  title: `Reviews — ${siteConfig.name}`,
  description:
    "Meet learners who achieved their career goals with SkillVexa. Read real student reviews and success stories.",
};

export default function Reviews() {
  return (
    <>
      <ReviewsPage />
      <FinalCTA />
    </>
  );
}
