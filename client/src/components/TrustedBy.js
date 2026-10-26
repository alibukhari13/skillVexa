import Image from "next/image";
import { siteConfig } from "@/config/SiteConfig";
import Reveal from "@/components/Reveal";

export default function TrustedBy() {
  return (
    <section className="px-4 sm:px-6 lg:px-[50px] py-10 sm:py-12 lg:py-[79px] overflow-hidden">
      <Reveal>
        <p className="text-center text-xl leading-6 font-semibold text-[#0F172A] font-[family-name:var(--font-inter)]">
          {siteConfig.employersHeading}
        </p>
        <div className="relative mt-8 max-w-[1160px] mx-auto min-w-0 overflow-hidden">
          <div className="logos-edge-mask group min-w-0 overflow-hidden">
            <div className="flex w-max animate-marquee-ltr-slow items-center group-hover:[animation-play-state:paused]">
              {[siteConfig.employers, siteConfig.employers].map((logos, copy) => (
                <div
                  key={`logos-copy-${copy}`}
                  className="flex items-center gap-x-10 pr-10 lg:gap-x-[64px] lg:pr-[64px]"
                  aria-hidden={copy === 1}
                >
                  {logos.map((employer) => (
                    <div
                      key={`${employer.name}-${copy}`}
                      className="shrink-0 opacity-90 hover:opacity-100 transition-opacity duration-300"
                    >
                      <Image
                        src={employer.src}
                        alt={employer.name}
                        width={employer.width}
                        height={employer.height}
                        className="h-[28px] xl:h-[34px] w-auto object-contain"
                        style={{ width: "auto", height: "auto", maxHeight: 34 }}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
