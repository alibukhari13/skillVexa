import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/SiteConfig";
import Reveal from "@/components/Reveal";

export default function HowItWorks() {
  const { howItWorks } = siteConfig;

  return (
    <section className="px-4 sm:px-6 lg:px-[50px] py-8 sm:py-10">
      <div className="max-w-[1340px] mx-auto">
        <Reveal>
          <h2 className="text-center font-display text-[32px] sm:text-4xl lg:text-[48px] font-semibold leading-[60px] text-[#0F172A]">
            {howItWorks.heading}
          </h2>
        </Reveal>

        <div className="mt-[50px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[9px]">
          {howItWorks.steps.map((step, index) => (
            <Reveal key={step.id} delay={index * 80}>
              <article
                className={`h-[252px] rounded-2xl border border-[#E3F1FF] bg-[#F8FAFC] px-[14px] py-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)] ${
                  index === 0 || index === howItWorks.steps.length - 1
                    ? "animate-float-y"
                    : ""
                }`}
              >
                <div className="flex flex-col items-center justify-between h-full gap-8">
                  <Image
                    src={step.icon}
                    alt=""
                    width={80}
                    height={80}
                    className="w-20 h-20 object-contain"
                  />
                  <div className="flex flex-col gap-3">
                    <h3 className="font-display text-2xl leading-[30px] font-bold text-[#0F172A]">
                      {step.title}
                    </h3>
                    <p className="text-base leading-6 text-[#636363]">
                      {step.description}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-[50px] flex justify-center">
            <Link
              href={howItWorks.cta.href}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F59E0B] hover:bg-[#d97706] text-[#161616] text-base leading-6 font-semibold h-14 px-8 shadow-md hover:shadow-lg hover:-translate-y-[1px] transition-all duration-300"
            >
              {howItWorks.cta.label}
              <Image
                src="/images/icons/arrow-tr.svg"
                alt=""
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
