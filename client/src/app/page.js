import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import TrustedBy from "@/components/TrustedBy";
import HowItWorks from "@/components/HowItWorks";
import PopularCourses from "@/components/PopularCourses";
import SuccessStories from "@/components/SuccessStories";
import Pricing from "@/components/Pricing";
import PortfolioProjects from "@/components/PortfolioProjects";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <TrustedBy />
      <HowItWorks />
      <PopularCourses />
      <SuccessStories />
      <Pricing />
      <PortfolioProjects />
      <FinalCTA />
    </>
  );
}
