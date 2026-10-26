import { siteConfig } from "@/config/SiteConfig";
import SuccessCard from "@/components/SuccessCard";
import Reveal from "@/components/Reveal";

export default function SuccessStories() {
  const { stories } = siteConfig;
  const rowOne = stories.items.slice(0, 8);
  const rowTwo = stories.items.slice(8, 16);

  return (
    <section className="px-4 sm:px-6 lg:px-[50px] py-[50px] overflow-hidden">
      <div className="max-w-[1024px] mx-auto text-center">
        <Reveal>
          <h2 className="font-display text-[32px] sm:text-4xl lg:text-[48px] font-semibold leading-[60px] text-[#0F172A]">
            {stories.headingLead}{" "}
            <span className="text-[#2563EB]">{stories.headingAccent}</span>
          </h2>
          <p className="mt-3 max-w-[600px] mx-auto text-base leading-6 text-[#636363]">
            {stories.description}
          </p>
        </Reveal>
      </div>

      <Reveal className="min-w-0 max-w-full">
        <div className="stories-edge-mask mt-[50px] min-w-0 w-full max-w-full overflow-hidden">
          <div className="flex min-w-0 w-full flex-col gap-6">
            <div className="group min-w-0 overflow-hidden">
              <div className="flex w-max animate-marquee-ltr group-hover:[animation-play-state:paused]">
                {[rowOne, rowOne].map((row, copy) => (
                  <div
                    key={`row1-copy-${copy}`}
                    className="flex gap-4 pr-4"
                    aria-hidden={copy === 1}
                  >
                    {row.map((story, index) => (
                      <div
                        key={`${story.name}-row1-${copy}-${index}`}
                        className={`w-[185px] shrink-0 ${index === 0 || index === row.length - 1 ? "animate-float-y" : ""}`}
                      >
                        <SuccessCard story={story} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="group min-w-0 overflow-hidden">
              <div className="flex w-max animate-marquee-ltr group-hover:[animation-play-state:paused]">
                {[rowTwo, rowTwo].map((row, copy) => (
                  <div
                    key={`row2-copy-${copy}`}
                    className="flex gap-4 pr-4"
                    aria-hidden={copy === 1}
                  >
                    {row.map((story, index) => (
                      <div
                        key={`${story.name}-row2-${copy}-${index}`}
                        className={`w-[185px] shrink-0 ${index === 0 || index === row.length - 1 ? "animate-float-y-delayed" : ""}`}
                      >
                        <SuccessCard story={story} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
