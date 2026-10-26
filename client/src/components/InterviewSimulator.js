"use client";

import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/SiteConfig";
import Reveal from "@/components/Reveal";
import CoursesFAQ from "@/components/CoursesFAQ";

function StartInterviewButton({ href, variant = "blue", className = "" }) {
  const styles =
    variant === "amber"
      ? "bg-[#F59E0B] text-[#0F172A] hover:bg-[#d97706]"
      : "bg-[#2563EB] text-white hover:bg-[#1d4ed8]";
  const iconFilter = variant === "blue" ? "brightness-0 invert" : "";

  return (
    <Link
      href={href}
      className={`inline-flex h-12 items-center justify-center gap-1.5 rounded-full px-8 text-base font-medium leading-6 transition-all duration-300 hover:-translate-y-[1px] hover:shadow-lg active:scale-[0.98] ${styles} ${className}`}
    >
      Start Interview Now
      <Image
        src="/images/icons/arrow-tr.svg"
        alt=""
        width={20}
        height={20}
        className={`h-5 w-5 ${iconFilter}`}
      />
    </Link>
  );
}

function HowItWorksStep({ step, index, total }) {
  const active = index === 0;

  return (
    <li className="relative flex gap-4 sm:gap-6">
      {index < total - 1 && (
        <span
          aria-hidden
          className={`absolute left-[40px] top-[88px] hidden h-[calc(100%-88px+24px)] w-2 rounded-xl sm:block ${
            index === 0 ? "bg-[#F59E0B]" : "bg-[#F8E8CE]"
          }`}
        />
      )}
      <div
        className={`relative z-[1] flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full text-[28px] font-medium leading-none text-[#161616] sm:h-[88px] sm:w-[88px] sm:text-[32px] sm:leading-[48px] ${
          active
            ? "bg-[#F59E0B]"
            : "border border-[#FFECCD] bg-[#FFF6E7]"
        }`}
      >
        {step.number}
      </div>
      <div className="min-w-0 flex-1 pb-8 sm:pb-10">
        <h3 className="font-display text-2xl font-semibold leading-8 text-[#0F172A] sm:text-[32px] sm:leading-10 lg:text-[36px] lg:leading-[45px]">
          {step.title}
        </h3>
        <p className="mt-3 max-w-[495px] font-[family-name:var(--font-inter)] text-base leading-6 text-[#636363] sm:text-lg sm:leading-6 lg:text-xl lg:leading-6">
          {step.description}
        </p>
      </div>
    </li>
  );
}

export default function InterviewSimulator() {
  const page = siteConfig.interviewSimulator;
  const { finalCta } = siteConfig;

  return (
    <div className="min-w-0 bg-white">
      <section className="relative -mt-[86px] overflow-hidden sm:-mt-[94px] bg-[linear-gradient(90deg,#D5E2FF_0%,#FFE6BD_100%)]">
        <div className="mx-auto grid min-h-[560px] w-full max-w-[1440px] items-center gap-10 px-4 pb-14 pt-[140px] sm:min-h-[620px] sm:px-6 sm:pt-[160px] lg:grid-cols-[minmax(0,530px)_minmax(0,549px)] lg:justify-between lg:gap-8 lg:px-[50px] xl:min-h-[670px] xl:pt-[205px] xl:pb-[113px]">
          <div className="animate-fade-up max-w-[530px]">
            <h1 className="font-display text-[32px] font-semibold leading-10 text-[#0F172A] sm:text-4xl sm:leading-[48px] xl:text-[48px] xl:leading-[60px]">
              {page.hero.title}
            </h1>
            <p className="mt-3 text-base leading-6 text-[#636363]">
              {page.hero.description}
            </p>
            <p className="mt-4 text-base font-medium leading-6 text-[#161616]">
              <span className="text-[#2563EB]">Open AI</span>
              -powered tool for mock interview practice with speech-to-text.
            </p>
            <StartInterviewButton href={page.hero.cta.href} className="mt-8 h-12 w-full max-w-[245px] font-medium sm:w-[245px]" />
          </div>

          <div className="animate-fade-up relative mx-auto w-full max-w-[549px] lg:mx-0 lg:justify-self-end" style={{ animationDelay: "120ms" }}>
            <div className="relative aspect-[549/332] overflow-hidden rounded-2xl">
              <Image
                src={page.hero.image}
                alt="Interview ACE coding workspace"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 549px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-[50px]">
        <div className="mx-auto max-w-[1340px]">
          <Reveal>
            <div className="mx-auto max-w-[995px] text-center">
              <h2 className="font-display text-[32px] font-semibold leading-10 text-[#0F172A] sm:text-4xl sm:leading-[48px] xl:text-[48px] xl:leading-[60px]">
                {page.companies.heading}
              </h2>
              <p className="mx-auto mt-3 max-w-[869px] text-base leading-6 text-[#636363] sm:text-lg sm:leading-[27px]">
                {page.companies.description}
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-[46px] lg:gap-y-6">
            {page.companies.logos.map((logo, index) => (
              <Reveal key={logo.src} delay={index * 40}>
                <div className="relative aspect-[300/176] overflow-hidden rounded-xl transition-transform duration-300 hover:-translate-y-1">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 300px"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 sm:pb-16 lg:px-[50px]">
        <Reveal>
          <button
            type="button"
            aria-label="Play interview preview"
            className="group relative mx-auto block w-full max-w-[1340px] overflow-hidden rounded-[24px] sm:rounded-[32px] focus:outline-none"
          >
            <span className="relative block aspect-[1340/564] w-full">
              <Image
                src={page.video.src}
                alt="Interview practice preview"
                fill
                sizes="(max-width: 1440px) 100vw, 1340px"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <span className="absolute inset-0 bg-[#0F172A]/10 transition-colors duration-300 group-hover:bg-[#0F172A]/20" />
              <span className="absolute left-1/2 top-1/2 flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(15,23,42,0.24)] transition-transform duration-300 group-hover:scale-110 sm:h-[100px] sm:w-[100px]">
                <Image
                  src={page.video.playIcon}
                  alt=""
                  width={42}
                  height={42}
                  className="h-8 w-8 sm:h-[42px] sm:w-[42px]"
                />
              </span>
            </span>
          </button>
        </Reveal>
      </section>

      <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-[50px]">
        <Reveal>
          <h2 className="text-center text-xl font-medium leading-8 text-[#161616] sm:text-2xl sm:leading-9">
            {page.stats.heading}
          </h2>
          <div className="mx-auto mt-8 flex max-w-[828px] flex-col items-stretch justify-center gap-4 sm:flex-row sm:flex-wrap sm:gap-8 lg:gap-12">
            {page.stats.items.map((item) => (
              <div
                key={item.label}
                className="flex min-h-[127px] flex-1 flex-col items-center justify-center rounded-xl bg-[linear-gradient(90deg,#D5E2FF_0%,#FFE6BD_100%)] px-4 py-3.5 text-center transition-transform duration-300 hover:-translate-y-1 sm:min-w-[200px] sm:max-w-[244px]"
              >
                <p className="text-[40px] font-medium leading-[60px] text-[#0F172A] sm:text-[48px] sm:leading-[72px]">
                  {item.value}
                </p>
                <p className="text-base leading-6 text-[#0F172A] sm:text-lg sm:leading-[27px]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="how-it-works" className="scroll-mt-28 bg-[#F8FAFC] px-4 py-16 sm:px-6 sm:py-20 lg:px-[50px]">
        <div className="mx-auto max-w-[1340px]">
          <Reveal>
            <h2 className="mx-auto max-w-[702px] text-center font-display text-[32px] font-semibold leading-10 text-[#0F172A] sm:text-4xl sm:leading-[48px] xl:text-[48px] xl:leading-[60px]">
              How Does <span className="text-[#2563EB]">InterviewAce</span> Work?
            </h2>
          </Reveal>

          <div className="mt-10 grid items-start gap-10 lg:mt-12 lg:grid-cols-[minmax(0,658px)_minmax(0,567px)] lg:justify-between lg:gap-8">
            <div>
              <ol className="min-w-0">
                {page.howItWorks.steps.map((step, index) => (
                  <Reveal key={step.number} delay={index * 80}>
                    <HowItWorksStep
                      step={step}
                      index={index}
                      total={page.howItWorks.steps.length}
                    />
                  </Reveal>
                ))}
              </ol>
              <Reveal delay={320}>
                <StartInterviewButton
                  href={page.howItWorks.cta.href}
                  variant="amber"
                  className="h-14 w-full max-w-[248px] px-8 font-semibold sm:w-[248px]"
                />
              </Reveal>
            </div>

            <Reveal delay={160} className="mx-auto w-full max-w-[567px] lg:mx-0 lg:justify-self-end">
              <div className="relative aspect-[567/462] overflow-hidden rounded-3xl">
                <Image
                  src={page.howItWorks.image}
                  alt="Interview questionnaire preview"
                  fill
                  sizes="(max-width: 1024px) 100vw, 567px"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-[50px]">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <h2 className="text-center font-display text-[32px] font-semibold leading-10 text-[#0F172A] sm:text-4xl sm:leading-[48px] xl:text-[48px] xl:leading-[60px]">
              {page.gains.heading}
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-x-6 xl:gap-y-6">
            {page.gains.items.map((item, index) => (
              <Reveal key={item.title} delay={index * 70}>
                <article className="flex h-full min-h-[280px] flex-col items-center rounded-2xl bg-[#F8FAFC] px-6 py-6 shadow-[0_0_12px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_28px_rgba(15,23,42,0.12)] sm:min-h-[320px]">
                  <Image
                    src={item.icon}
                    alt=""
                    width={76}
                    height={76}
                    className="h-[76px] w-[76px]"
                  />
                  <h3 className="mt-5 text-center font-display text-xl font-semibold leading-[30px] text-[#000C1F] sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-center text-base leading-6 text-[#636363] sm:text-lg sm:leading-[27px]">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CoursesFAQ />

      <section className="px-4 sm:px-6 lg:px-[50px] py-8 sm:py-10 lg:pb-[50px]">
        <Reveal>
          <div className="mx-auto max-w-[1340px] rounded-3xl bg-[linear-gradient(180deg,#D5E2FF_0%,#FFE6BD_100%)] px-6 py-12 text-center sm:px-12 sm:py-16 lg:py-20">
            <h2 className="mx-auto max-w-[682px] font-display text-[32px] font-semibold leading-[1.25] text-[#0F172A] sm:text-5xl lg:text-[64px] lg:leading-[80px]">
              {page.cta.heading}
            </h2>
            <p className="mx-auto mt-3 max-w-[575px] text-base leading-6 text-[#0F172A]">
              {page.cta.description}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={finalCta.primaryCta.href}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#2563EB] px-6 text-base font-semibold leading-6 text-white shadow-md transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#1d4ed8] hover:shadow-lg"
              >
                {finalCta.primaryCta.label}
                <Image
                  src="/images/icons/arrow-tr.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5 brightness-0 invert"
                />
              </Link>
              <Link
                href={finalCta.secondaryCta.href}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#F59E0B] px-6 text-base font-semibold leading-6 text-[#161616] shadow-md transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#d97706] hover:shadow-lg"
              >
                {finalCta.secondaryCta.label}
                <Image
                  src="/images/icons/arrow-tr.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
