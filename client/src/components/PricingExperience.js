"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowRight, FiCheck, FiChevronDown, FiShield } from "react-icons/fi";
import { PageContainer } from "@/components/dashboard/DashboardShell";
import { pricingFeatures, pricingOptions } from "@/config/AdminContent";
import { siteConfig } from "@/config/SiteConfig";

const faqs = [
  ["What is included with a SkillVexa plan?", "Plans unlock the learning library, practical projects, career tracks, exams, and career-preparation resources. Your selected plan and billing period are shown before you continue."],
  ["Can I change my billing option later?", "Yes. You can choose a different plan or billing period whenever your learning needs change."],
  ["What does the 30-day guarantee mean?", "If the plan is not a fit within the first 30 days, contact SkillVexa support to ask about the money-back guarantee."],
  ["Will my annual price change next year?", "The annual price-lock guarantee keeps the renewal price consistent for eligible annual plans."],
];

function PricingContent({ dashboard }) {
  const [option, setOption] = useState("annual");
  const [secondsLeft, setSecondsLeft] = useState(71 * 60 * 60);
  const [offerExpanded, setOfferExpanded] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const plan = pricingOptions.find((item) => item.id === option) || pricingOptions[2];
  const pad = (value) => String(value).padStart(2, "0");
  const time = [
    [Math.floor(secondsLeft / 86400), "Days"],
    [Math.floor((secondsLeft % 86400) / 3600), "Hours"],
    [Math.floor((secondsLeft % 3600) / 60), "Minutes"],
    [secondsLeft % 60, "Seconds"],
  ];

  useEffect(() => {
    const timer = window.setInterval(() => setSecondsLeft((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const page = (
    <div className="mx-auto w-full max-w-[1120px]">
      <header className="mx-auto max-w-[760px] text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-[#D8E4FF] bg-[#F5F8FF] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#2563EB]"><span className="h-2 w-2 rounded-full bg-[#F59E0B]" />Learn more. Spend smarter.</p>
        <h1 className="mt-5 text-[34px] font-semibold leading-tight tracking-[-0.035em] text-[#0F172A] sm:text-[44px]">Simple plans for your next step</h1>
        <p className="mx-auto mt-4 max-w-[700px] text-[15px] leading-7 text-[#5B6472] sm:text-[17px]">Move into your dream AI and data role without putting your life on hold. Choose the learning plan that fits you, with room to change it as you grow.</p>
      </header>

      {dashboard ? <p className="mt-7 flex items-center gap-2 text-[14px] font-semibold text-[#0F172A]">Current plan: <span className="rounded-full border border-[#CBD5E1] bg-white px-3 py-1 text-[13px] font-medium">Free</span></p> : null}

      <section aria-label="Limited-time offer" className="mt-7 overflow-hidden rounded-[14px] bg-[linear-gradient(100deg,#2563EB_0%,#5B45D6_50%,#F59E0B_100%)] px-5 py-4 text-white shadow-[0_10px_24px_rgba(37,99,235,0.16)] sm:px-7">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
          <div><p className="text-[19px] font-semibold sm:text-[23px]">A little more room to grow</p><p className="mt-1 text-[13px] text-white/85">Save up to 60% on selected plans</p></div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            <div className="flex items-center gap-2.5 tabular-nums" aria-label={"Offer ends in " + time.map(([value, label]) => pad(value) + " " + label).join(", ")}>
              {time.map(([value, label], index) => <span key={label} className="flex items-center gap-2.5">{index > 0 ? <span className="text-white/60">:</span> : null}<span className="flex min-w-[34px] flex-col items-center"><span className="text-[20px] font-semibold leading-6 sm:text-[22px]">{pad(value)}</span><span className="text-[9px] uppercase tracking-wide text-white/75">{label}</span></span></span>)}
            </div>
            <button type="button" onClick={() => setOfferExpanded((value) => !value)} aria-expanded={offerExpanded} className="inline-flex h-9 items-center gap-2 rounded-full border border-white/65 px-4 text-[12px] font-semibold transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">{offerExpanded ? "Show less" : "See offer details"}<FiChevronDown className={"h-3.5 w-3.5 transition-transform " + (offerExpanded ? "rotate-180" : "")} /></button>
          </div>
        </div>
        {offerExpanded ? <p className="mt-4 max-w-[820px] border-t border-white/25 pt-4 text-[13px] leading-6 text-white/90">Get full access to the SkillVexa learning library and build practical, job-ready skills. The selected billing period and price are shown below before you continue.</p> : null}
      </section>

      <section aria-label="Choose your learning plan" className="mt-5 grid items-stretch gap-5 rounded-[18px] border border-[#DFE7F6] bg-[linear-gradient(125deg,#EAF2FF_0%,#F4F6FF_55%,#FFF7E7_100%)] p-4 sm:p-7 lg:grid-cols-[minmax(0,1fr)_370px] lg:gap-8 lg:p-8">
        <div className="py-1 sm:py-3">
          <p className="text-[23px] font-semibold tracking-[-0.02em] text-[#0F172A] sm:text-[28px]">UPGRADE <span className="text-[17px] font-medium text-[#4B5563]">to</span> {plan.label} plan</p>
          <p className="mt-3 max-w-[470px] text-[14px] leading-6 text-[#465365] sm:text-[16px]">Get full access to our online library and keep learning AI and data for your career.</p>
          <ul className="mt-6 grid gap-x-5 gap-y-3 sm:grid-cols-2">{pricingFeatures.map((feature) => <li key={feature} className="flex items-start gap-2.5 text-[13px] leading-5 text-[#253247] sm:text-[14px]"><span className="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-white text-[#2563EB] shadow-sm"><FiCheck className="h-3 w-3" /></span>{feature}</li>)}</ul>
          <div className="mt-7 flex items-center gap-2 text-[12px] font-medium text-[#435166]"><FiShield className="h-4 w-4 text-[#2563EB]" /> Clear pricing · 30-day guarantee on eligible plans</div>
        </div>

        <article className="relative mt-2 rounded-[15px] border border-[#E2E8F0] bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.12)] sm:p-6 lg:mt-0">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#F59E0B] px-4 py-1 text-[11px] font-semibold text-[#111827] shadow-sm">{plan.save ? plan.save + " selected" : "Flexible learning"}</span>
          <p className="mt-1 text-[19px] font-semibold text-[#2563EB]">{plan.label} plan</p><p className="mt-1 text-[12px] text-[#64748B]">Choose a billing option</p>
          <div className="mt-4 grid grid-cols-2 gap-1 rounded-[12px] bg-[#F1F4F8] p-1 sm:grid-cols-4">
            {pricingOptions.map((item) => <button key={item.id} type="button" onClick={() => setOption(item.id)} aria-pressed={option === item.id} className={"min-h-9 rounded-[9px] px-2 text-[11px] font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2563EB] " + (option === item.id ? "bg-[#0F172A] text-white shadow-sm" : "text-[#536174] hover:bg-white")}>{item.label}</button>)}
          </div>
          <div aria-live="polite" className="mt-5 min-h-[104px]">
            {plan.regular !== plan.price ? <p className="text-[13px] text-[#9AA4B2] line-through">${plan.regular}{plan.id !== "lifetime" ? "/month" : ""}</p> : <p className="h-5" />}
            <p className="text-[37px] font-semibold leading-none tracking-[-0.04em] text-[#0F172A]">${plan.price}<span className="ml-1 text-[14px] font-medium tracking-normal text-[#596579]">{plan.period}</span></p>
            <p className="mt-2 flex flex-wrap items-center gap-2 text-[12px] text-[#596579]">{plan.note}{plan.save ? <span className="rounded-[5px] bg-[#EFF4FF] px-2 py-1 font-semibold text-[#2563EB]">{plan.save}</span> : null}</p>
          </div>
          <Link href="/get-started" className="mt-3 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[8px] bg-[#2563EB] px-4 text-[14px] font-semibold text-white transition-colors hover:bg-[#1D4ED8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]">{plan.save ? "Get " + plan.save.replace("Save ", "") + " off" : "Start learning"}<FiArrowRight className="h-4 w-4" /></Link>
          <p className="mt-3 text-center text-[11px] text-[#748190]">Selected price and billing period shown above</p>
        </article>
      </section>

      <section className="mt-12 sm:mt-16" aria-labelledby="outcomes-heading">
        <div className="text-center"><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2563EB]">Skills that move you forward</p><h2 id="outcomes-heading" className="mt-2 text-[26px] font-semibold tracking-[-0.03em] text-[#0F172A] sm:text-[32px]">Real student outcomes</h2></div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">{siteConfig.stats.slice(0, 3).map((stat) => <div key={stat.label} className="rounded-[13px] border border-[#E8EDF5] bg-white p-5 text-center shadow-[0_4px_15px_rgba(15,23,42,0.045)]"><p className="text-[31px] font-semibold tracking-[-0.04em] text-[#2563EB]">{stat.value}</p><p className="mt-1 text-[13px] text-[#64748B]">{stat.label}</p></div>)}</div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{siteConfig.stories.items.slice(0, 3).map((story) => <article key={story.name + "-" + story.image} className="rounded-[13px] border border-[#E8EDF5] bg-white p-5 shadow-[0_4px_15px_rgba(15,23,42,0.045)]"><p className="text-[14px] font-semibold text-[#0F172A]">{story.name}</p><p className="mt-1 text-[12px] text-[#64748B]">{story.role}</p><div className="mt-4 border-t border-[#EEF1F6] pt-3 text-[12px] leading-5"><p className="text-[#748190]">Before: {story.previous}</p><p className="mt-1 font-medium text-[#2563EB]">After: {story.role}</p></div></article>)}</div>
        <div className="mt-4 text-center"><Link href="/stories" className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#2563EB] hover:text-[#1D4ED8]">Explore student stories <FiArrowRight className="h-4 w-4" /></Link></div>
      </section>

      <section className="mx-auto mt-12 max-w-[820px] sm:mt-16" aria-labelledby="pricing-faq-heading">
        <div className="text-center"><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2563EB]">Need a hand?</p><h2 id="pricing-faq-heading" className="mt-2 text-[25px] font-semibold tracking-[-0.03em] text-[#0F172A] sm:text-[30px]">Pricing questions, answered</h2></div>
        <div className="mt-5 divide-y divide-[#E6EBF2] rounded-[14px] border border-[#E6EBF2] bg-white px-5 shadow-[0_4px_16px_rgba(15,23,42,0.04)]">
          {faqs.map(([question, answer], index) => { const expanded = openFaq === index; return <div key={question}><button type="button" className="flex min-h-[58px] w-full items-center justify-between gap-4 py-4 text-left text-[13px] font-semibold text-[#172033] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2563EB]" aria-expanded={expanded} onClick={() => setOpenFaq(expanded ? null : index)}>{question}<FiChevronDown className={"h-4 w-4 shrink-0 text-[#2563EB] transition-transform " + (expanded ? "rotate-180" : "")} /></button>{expanded ? <p className="max-w-[700px] pb-4 pr-8 text-[13px] leading-6 text-[#64748B]">{answer}</p> : null}</div>; })}
        </div>
      </section>
    </div>
  );

  return dashboard ? <PageContainer className="!py-8">{page}</PageContainer> : <main className="bg-[linear-gradient(180deg,#F8FAFF_0%,#FFFFFF_340px)] px-4 py-10 sm:px-6 sm:py-14 lg:py-16"><div className="mx-auto max-w-[1200px]">{page}</div></main>;
}

export default function PricingExperience({ dashboard = false }) {
  return <PricingContent dashboard={dashboard} />;
}
