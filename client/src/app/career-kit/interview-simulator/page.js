import InterviewSimulator from "@/components/InterviewSimulator";
import { siteConfig } from "@/config/SiteConfig";

export const metadata = {
  title: `Interview Simulator — ${siteConfig.name}`,
  description:
    "Open AI-powered tool for mock interview practice with speech-to-text. Land your dream job with Interview ACE.",
};

export default function InterviewSimulatorPage() {
  return <InterviewSimulator />;
}
