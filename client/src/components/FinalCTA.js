import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/SiteConfig";
import Reveal from "@/components/Reveal";

export default function FinalCTA() {
  const { finalCta } = siteConfig;

  return (
    <section className="px-4 sm:px-6 lg:px-[50px] py-8 sm:py-10 lg:pb-[50px]">
      <Reveal>
        <div className="max-w-[1340px] mx-auto rounded-3xl px-6 py-12 sm:px-12 sm:py-16 lg:py-20 text-center bg-[linear-gradient(180deg,#D5E2FF_0%,#FFE6BD_100%)]">
          <h2 className="font-display text-[32px] sm:text-5xl lg:text-[64px] font-semibold leading-[1.25] lg:leading-[80px] text-[#0F172A] max-w-[682px] mx-auto">
            {finalCta.headingLead}{" "}
            <span className="text-[#2563EB]">{finalCta.headingAccent}</span>{" "}
            {finalCta.headingEnd}
          </h2>
          <p className="mt-3 max-w-[682px] mx-auto text-base leading-6 text-[#0F172A]">
            {finalCta.description}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={finalCta.primaryCta.href}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-base leading-6 font-semibold h-14 px-6 shadow-md hover:shadow-lg hover:-translate-y-[1px] transition-all duration-300"
            >
              {finalCta.primaryCta.label}
              <Image
                src="/images/icons/arrow-tr.svg"
                alt=""
                width={20}
                height={20}
                className="w-5 h-5 brightness-0 invert"
              />
            </Link>
            <Link
              href={finalCta.secondaryCta.href}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F59E0B] hover:bg-[#d97706] text-[#161616] text-base leading-6 font-semibold h-14 px-6 shadow-md hover:shadow-lg hover:-translate-y-[1px] transition-all duration-300"
            >
              {finalCta.secondaryCta.label}
              <Image
                src="/images/icons/arrow-tr.svg"
                alt=""
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
