import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/SiteConfig";
import Reveal from "@/components/Reveal";

export default function Pricing() {
  const { pricing } = siteConfig;

  return (
    <section id="pricing" className="bg-[#F8FAFC] px-4 sm:px-6 lg:px-[50px] py-[50px] sm:py-[60px]">
      <div className="max-w-[1340px] mx-auto">
        <Reveal>
          <div className="text-center max-w-[1024px] mx-auto">
            <h2 className="font-display text-[32px] sm:text-4xl lg:text-[48px] font-semibold leading-[60px] text-[#0F172A]">
              {pricing.headingLead}
              <br />
              <span className="text-[#2563EB]">{pricing.headingAccent}</span>
            </h2>
            <p className="mt-3 max-w-[600px] mx-auto text-base leading-6 text-[#636363]">
              {pricing.description}
            </p>
          </div>
        </Reveal>

        <div className="mt-[50px] grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          {pricing.plans.map((plan, index) => {
            const isOuter = index === 0 || index === pricing.plans.length - 1;

            return (
              <Reveal key={plan.id} delay={index * 90}>
                <article
                  className={`relative h-full min-h-[596px] flex flex-col rounded-xl bg-white p-6 shadow-[0_0_24px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_44px_rgba(15,23,42,0.12)] ${
                    plan.featured
                      ? "border-2 border-[#2563EB]"
                      : "border border-[#E3F1FF]"
                  } ${isOuter ? "animate-float-y" : ""}`}
                >
                  {plan.badge ? (
                    <span className="absolute -top-[22px] left-1/2 -translate-x-1/2 rounded-full bg-[#2563EB] text-white text-base leading-[21px] font-medium px-4 h-[45px] inline-flex items-center shadow-[0_0_24px_rgba(0,0,0,0.12)]">
                      {plan.badge}
                    </span>
                  ) : null}

                  <div className="flex items-center gap-4">
                    <Image
                      src={plan.icon}
                      alt=""
                      width={63}
                      height={63}
                      className="w-[63px] h-[63px] object-contain"
                    />
                    <h3 className="font-display text-[30px] leading-[38px] font-bold text-[#161616]">
                      {plan.name}
                    </h3>
                  </div>

                  <p className="mt-5 text-lg leading-[27px] text-[#5A5A5A]">{plan.caption}</p>

                  <div className="mt-5 h-px w-full bg-[#E5E7EB]" />

                  <div className="mt-6 flex items-end justify-between gap-3">
                    <div className="flex items-end gap-1.5">
                      <span className="text-[40px] leading-[60px] font-semibold text-[#2563EB]">
                        {plan.price}
                      </span>
                      {plan.period ? (
                        <span className="mb-3 text-base leading-6 font-medium text-[#5A5A5A]">
                          {plan.period}
                        </span>
                      ) : null}
                    </div>
                    {plan.note ? (
                      <p className="mb-3 text-sm leading-[21px] font-medium text-[#161616] text-right max-w-[8rem]">
                        {plan.note}
                      </p>
                    ) : null}
                  </div>

                  <p className="mt-6 font-display text-2xl leading-[30px] font-bold text-[#161616]">
                    {plan.includesLabel}
                  </p>
                  <ul className="mt-5 space-y-3 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-lg leading-[27px] text-[#5A5A5A]">
                        <Image
                          src="/images/icons/check.svg"
                          alt=""
                          width={24}
                          height={24}
                          className="w-6 h-6 shrink-0"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={plan.cta.href}
                    className={`mt-8 inline-flex items-center justify-center w-full rounded-[42px] text-xl leading-[30px] font-medium h-[62px] transition-all duration-300 hover:-translate-y-[1px] ${
                      plan.cta.variant === "blue"
                        ? "bg-[#2563EB] hover:bg-[#1d4ed8] text-white"
                        : "bg-[#F59E0B] hover:bg-[#d97706] text-[#0F172A] border border-[#E3F1FF]"
                    }`}
                  >
                    {plan.cta.label}
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
