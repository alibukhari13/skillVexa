import { siteConfig } from "@/config/SiteConfig";
import Reveal from "@/components/Reveal";

export default function StatsBar() {
  return (
    <section className="px-4 sm:px-6 lg:px-[50px] pb-6 lg:pb-0">
      <Reveal>
        <div className="max-w-[1340px] mx-auto bg-[#F59E0B] text-[#161616] rounded-[28px] sm:rounded-full px-6 sm:px-10 lg:px-[90px] py-7 lg:py-6 lg:h-[144px] flex items-center shadow-none">
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-6 gap-x-4 lg:gap-x-0">
            {siteConfig.stats.map((stat) => (
              <div key={stat.label} className="text-center flex flex-col items-center justify-between lg:h-24">
                <p className="text-[32px] sm:text-[40px] lg:text-[48px] font-semibold leading-[1.5] lg:leading-[72px]">
                  {stat.value}
                </p>
                <p className="text-sm sm:text-base leading-6 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
