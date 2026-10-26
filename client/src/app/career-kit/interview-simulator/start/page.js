import InterviewStart from "@/components/InterviewStart";
import { siteConfig } from "@/config/SiteConfig";

export const metadata = {
  title: `Start Interview — ${siteConfig.name}`,
  description:
    "Welcome to InterviewACE. SkillVexa AI-Powered Job Interview Simulator.",
};

export default function InterviewStartPage() {
  return <InterviewStart />;
}
