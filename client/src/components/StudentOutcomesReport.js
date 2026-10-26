"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/SiteConfig";
import SuccessCard from "@/components/SuccessCard";
import Reveal from "@/components/Reveal";

const TESTIMONIALS = [
  {
    id: "pedro",
    title: "Industrial engineer turned project & data manager",
    quote:
      "We were losing 28% of orders to returns. After using inMind's attempt management for 6 weeks, we're at 17%. That's real money back in our pocket.",
    name: "Pedro A.",
    before: "Before 365:\nIndustrial Engineer at NIBOL",
    after: "After 365:\nData Manager at NIBOL",
    avatar: "/images/outcomes/avatar-pedro.svg",
  },
  {
    id: "sofia",
    title: "Designer who moved into a data-driven product role",
    quote:
      "Most people think that to be successful, it is necessary to have a mathematics, engineering, or computer science background. But this is a very incomplete thought.",
    name: "Sofia M.",
    before: "Before 365:\nUI/UX Designer at Tech Innovations",
    after: "After 365:\nSenior UX Designer",
    avatar: "/images/students/emily.png",
  },
  {
    id: "raj",
    title: "Career switcher who became a software engineer",
    quote:
      "I completed several career tracks, mastering tools like Scikit-Learn and TensorFlow for various analytics tasks. Now I'm applying these skills daily.",
    name: "Raj P.",
    before: "Before 365:\nFull Stack Developer at Creative Solutions",
    after: "After 365:\nSoftware Engineer",
    avatar: "/images/students/liam.png",
  },
];

const JOBS = Array.from({ length: 6 }, (_, index) => ({
  id: `job-${index}`,
  role: "Senior Data Scientist",
  path: "Career Path",
  salary: "$174,195",
}));

const STEP_CARDS = [
  {
    title: "Support",
    subtitle: "Stay on track with structured learning at every step.",
    body: "We show you how to get a job in AI without a degree. You receive a learning plan tailored to your background, goals, and schedule. Stay on track with study tools, practice exercises, and career resources that fit your schedule. Gain real experience step by step while working through courses and AI projects.",
    cta: { label: "Learn More", href: "/courses" },
    icon: "/images/outcomes/icon-support.svg",
  },
  {
    title: "Training",
    subtitle: "Learn what matters—no filler, no fluff.",
    body: "Our AI Bootcamp helps you get hired quickly. We let you step into the field with hands-on experience through exercises and live workshops, then prove your expertise with an accredited AI certificate.",
    cta: { label: "Discover curriculum", href: "/courses" },
    icon: "/images/outcomes/icon-training.svg",
  },
  {
    title: "Experience",
    subtitle: "Practice beyond the lessons.",
    body: "We show you how to get a job in AI without a degree. You receive a learning plan tailored to your background, goals, and schedule. Stay on track with study tools, practice exercises, and career resources that fit your schedule. Gain real experience step by step while working through courses and AI projects.",
    cta: { label: "See real AI and data projects", href: "/projects" },
    icon: "/images/outcomes/icon-experience.svg",
  },
  {
    title: "Positioning",
    subtitle: "AI careers are attainable with the proper career roadmap.",
    body: "We show you how to get a job in AI without a degree. You receive a learning plan tailored to your background, goals, and schedule. Stay on track with study tools, practice exercises, and career resources that fit your schedule. Gain real experience step by step while working through courses and AI projects.",
    cta: { label: "Start free now", href: "/get-started" },
    icon: "/images/outcomes/icon-positioning.svg",
  },
];

const COMPARE_ROWS = [
  {
    label: "Time to job-ready",
    online: "No clear path to employment",
    skillvexa: "< 1 year",
    university: "4+ years",
  },
  {
    label: "Structure",
    online: "Often unstructured",
    skillvexa: "Job prep bundles with clear learning paths",
    university: "Rigid curriculum, not personalized",
  },
  {
    label: "Flexibility",
    online: "Self-paced",
    skillvexa: "100% self-paced\nLearn break possible",
    university: "Fixed schedule",
  },
  {
    label: "Practice",
    online: "Often unstructured",
    skillvexa: "Job prep bundles with clear learning paths",
    university: "Rigid curriculum, not personalized",
  },
  {
    label: "Support",
    online: "Often unstructured",
    skillvexa: "Job prep bundles with clear learning paths",
    university: "Rigid curriculum, not personalized",
  },
  {
    label: "Career services",
    online: "Often unstructured",
    skillvexa: "Job prep bundles with clear learning paths",
    university: "Rigid curriculum, not personalized",
  },
];

function OrangeCta({ href, children, className = "" }) {
  return (
    <Link
      href={href}
      className={`inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#F59E0B] px-6 text-base font-semibold leading-6 text-[#161616] transition-all duration-300 hover:-translate-y-px hover:bg-[#d97706] ${className}`}
    >
      {children}
      <svg width="20" height="20" viewBox="0 0 40 40" fill="none" aria-hidden="true" className="h-5 w-5">
        <path
          d="M10.0001 31.6666L31.6667 9.99993M10.8667 9.99993H31.6667V30.7999"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}

function NavArrow({ direction, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#0F172A] bg-white transition-all duration-300 hover:border-[#2563EB] hover:text-[#2563EB]"
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        {direction === "left" ? (
          <>
            <path d="M8 16H24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M14 22C14 22 8 17.5 8 16C8 14.5 14 10 14 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </>
        ) : (
          <>
            <path d="M24 16H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M18 10C18 10 24 14.5 24 16C24 17.5 18 22 18 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </>
        )}
      </svg>
    </button>
  );
}

function JobCard() {
  return (
    <article className="w-[270px] shrink-0 overflow-hidden rounded-xl bg-white shadow-[0_0_12px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(15,23,42,0.12)]">
      <div className="h-3 bg-[linear-gradient(90deg,#D5E2FF_0%,#FFE6BD_100%)]" />
      <div className="px-3 pt-4">
        <Image src="/images/outcomes/job-logo.svg" alt="" width={32} height={32} className="h-8 w-8" />
        <h3 className="mt-2 text-xl font-medium leading-[30px] text-[#000C1F]">Senior Data Scientist</h3>
        <p className="font-[family-name:var(--font-inter)] text-base leading-[19px] text-[#636363]">Career Path</p>
      </div>
      <div className="mt-4 flex items-center justify-between bg-[linear-gradient(90deg,#D5E2FF_0%,#FFE6BD_100%)] px-3 py-2.5">
        <p className="font-[family-name:var(--font-inter)] text-base leading-[19px] text-[#636363]">Average Salary:</p>
        <p className="text-2xl font-medium leading-9 text-[#000C1F]">$174,195</p>
      </div>
    </article>
  );
}

export default function StudentOutcomesReport() {
  const { stories, hero, employers } = siteConfig;
  const rowOne = stories.items.slice(0, 8);
  const rowTwo = stories.items.slice(8, 16);
  const employerLogos = [...employers, employers[0]].slice(0, 6);

  const [slide, setSlide] = useState(0);
  const jobsRef = useRef(null);
  const testimonial = TESTIMONIALS[slide];

  function scrollJobs(direction) {
    jobsRef.current?.scrollBy({ left: direction * 290, behavior: "smooth" });
  }

  return (
    <div className="min-w-0 overflow-x-clip bg-white">
      <section className="px-4 pb-12 pt-8 sm:px-6 sm:pt-10 lg:px-[50px] lg:pb-16 lg:pt-14">
        <div className="mx-auto grid w-full min-w-0 max-w-[1340px] items-center gap-10 lg:grid-cols-[minmax(0,564px)_minmax(0,529px)] lg:justify-between lg:gap-12">
          <Reveal>
            <p className="text-[28px] font-semibold leading-10 text-[#2563EB] sm:text-[32px] sm:leading-[48px]">
              How to get a job in AI?
            </p>
            <h1 className="mt-4 font-display text-[32px] font-semibold leading-10 text-[#0F172A] sm:text-4xl sm:leading-[48px] xl:mt-4 xl:text-[48px] xl:leading-[60px]">
              See real outcomes from our graduates
            </h1>
            <div className="mt-8 flex flex-col gap-6">
              <Link
                href="#results"
                className="inline-flex h-12 w-full max-w-[251px] items-center justify-center gap-1.5 rounded-full bg-[#2563EB] px-8 text-base font-medium leading-6 text-white transition-all duration-300 hover:-translate-y-px hover:bg-[#1d4ed8]"
              >
                Download full report
                <Image src="/images/outcomes/download.svg" alt="" width={18} height={18} className="h-[18px] w-[18px]" />
              </Link>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[28px] font-semibold leading-[42px] text-[#0F172A]">{hero.rating}</span>
                <Image src="/images/icons/stars.svg" alt="5 star rating" width={152} height={28} className="h-7 w-[152px]" />
                <span className="text-base font-medium leading-6 text-[#0F172A]">
                  {hero.reviews} {hero.reviewsLabel}
                </span>
                <span className="inline-flex items-center gap-1.5 text-base font-medium leading-6 text-black">
                  Google
                  <Image src="/images/icons/google-g.svg" alt="" width={16} height={16} className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120} className="min-w-0">
            <div className="relative mx-auto aspect-[529/471] w-full max-w-[529px] overflow-hidden rounded-3xl">
              <Image
                src="/images/outcomes/hero.png"
                alt="SkillVexa graduates"
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 529px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-[50px] lg:py-[50px]">
        <Reveal>
          <h2 className="text-center font-display text-[32px] font-semibold leading-10 text-[#0F172A] sm:text-4xl sm:leading-[48px] xl:text-[48px] xl:leading-[60px]">
            Real student Stories
          </h2>
        </Reveal>
        <Reveal className="min-w-0 max-w-full">
          <div className="stories-edge-mask mt-10 min-w-0 w-full max-w-full overflow-x-auto overscroll-x-contain scrollbar-none sm:mt-[50px]">
            <div className="flex w-max min-w-full flex-col gap-6 lg:min-w-[1592px]">
              <div className="flex justify-center gap-4">
                {rowOne.map((story, index) => (
                  <div
                    key={`${story.name}-row1-${index}`}
                    className={`w-[185px] ${index === 0 || index === rowOne.length - 1 ? "animate-float-y" : ""}`}
                  >
                    <SuccessCard story={story} />
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-4">
                {rowTwo.map((story, index) => (
                  <div
                    key={`${story.name}-row2-${index}`}
                    className={`w-[185px] ${index === 0 || index === rowTwo.length - 1 ? "animate-float-y-delayed" : ""}`}
                  >
                    <SuccessCard story={story} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <div className="mt-10 flex justify-center">
            <OrangeCta href="/stories">Start your success story</OrangeCta>
          </div>
        </Reveal>
      </section>

      <section id="results" className="scroll-mt-28 px-4 py-10 sm:px-6 lg:px-[50px] lg:py-16">
        <Reveal>
          <h2 className="text-center font-display text-[32px] font-semibold leading-10 text-[#0F172A] sm:text-4xl sm:leading-[48px] xl:text-[48px] xl:leading-[60px]">
            Real student Results
          </h2>
          <p className="mx-auto mt-3 max-w-[786px] text-center text-base leading-6 text-[#636363] sm:text-lg sm:leading-[27px]">
            We believe in backing up our credibility statements with real data. To better explain to
            prospective learners how to get a job in AI, we analyzed the enrollment activity and
            LinkedIn profiles of 500 of our most engaged learners.
          </p>
        </Reveal>
        <div className="mx-auto mt-10 grid w-full min-w-0 max-w-[1200px] gap-6 md:grid-cols-2 xl:grid-cols-3">
          <Reveal>
            <article className="flex h-full flex-col items-center rounded-2xl bg-[#F8FAFC] px-6 py-6 text-center shadow-[0_0_12px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1">
              <Image src="/images/career-path/outcome-9in10.svg" alt="" width={208} height={76} className="h-[76px] w-[208px] object-contain" />
              <p className="mt-5 font-display text-[40px] font-semibold leading-[50px] text-[#000C1F]">9 in 10</p>
              <p className="mt-2 text-lg leading-[27px] text-[#636363]">
                of our graduates landed a new AI and data science job after enrollment
              </p>
            </article>
          </Reveal>
          <Reveal delay={80}>
            <article className="flex h-full flex-col items-center rounded-2xl bg-[#F8FAFC] px-6 py-6 text-center shadow-[0_0_12px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1">
              <Image src="/images/career-path/outcome-94.svg" alt="" width={80} height={80} className="h-20 w-20 object-contain" />
              <p className="mt-5 font-display text-[40px] font-semibold leading-[50px] text-[#000C1F]">94%</p>
              <p className="mt-2 text-lg leading-[27px] text-[#636363]">
                of AI and data science graduates successfully change or advance their careers
              </p>
            </article>
          </Reveal>
          <Reveal delay={160} className="md:col-span-2 xl:col-span-1">
            <article className="flex h-full flex-col rounded-3xl bg-[#F8FAFC] px-5 py-6 shadow-[0_0_12px_rgba(0,0,0,0.12)]">
              <h3 className="text-center font-display text-2xl font-bold leading-[30px] text-[#2563EB]">
                Our graduates work at:
              </h3>
              <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5">
                {employerLogos.map((logo, index) => (
                  <div key={`${logo.name}-${index}`} className="flex h-[50px] items-center justify-center">
                    <Image src={logo.src} alt={logo.name} width={logo.width} height={logo.height} className="h-8 w-auto max-w-[150px] object-contain" />
                  </div>
                ))}
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-[50px] lg:pb-16">
        <Reveal>
          <h2 className="mx-auto max-w-[669px] text-center text-[22px] font-semibold leading-8 text-[#0F172A] sm:text-[26px] sm:leading-[39px]">
            {testimonial.title}
          </h2>
        </Reveal>
        <div className="mx-auto mt-8 flex w-full min-w-0 max-w-[980px] items-center gap-4 sm:gap-8">
          <div className="hidden sm:block">
            <NavArrow
              direction="left"
              label="Previous story"
              onClick={() => setSlide((current) => (current === 0 ? TESTIMONIALS.length - 1 : current - 1))}
            />
          </div>
          <Reveal className="min-w-0 flex-1">
            <article className="rounded-2xl bg-white p-5 shadow-[0_0_16px_rgba(0,0,0,0.16)] sm:p-8">
              <Image src="/images/outcomes/quote.svg" alt="" width={40} height={40} className="h-10 w-10" />
              <p className="mt-6 font-[family-name:var(--font-inter)] text-base leading-6 text-[#636363] sm:text-xl sm:leading-6">
                {testimonial.quote}
              </p>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xl font-semibold leading-8 text-[#0F172A] sm:text-2xl sm:leading-9">{testimonial.name}</p>
                  <div className="mt-2 grid gap-4 min-[480px]:grid-cols-2 min-[480px]:gap-10">
                    <p className="whitespace-pre-line text-base font-medium leading-6 text-[#565656]">{testimonial.before}</p>
                    <p className="whitespace-pre-line text-base font-semibold leading-6 text-[#2563EB]">{testimonial.after}</p>
                  </div>
                </div>
                <div className="relative h-[76px] w-[76px] shrink-0 overflow-hidden rounded-full">
                  <Image src={testimonial.avatar} alt={testimonial.name} fill sizes="76px" className="object-cover" />
                </div>
              </div>
              <Link
                href="/stories"
                className="group mt-5 ml-auto flex w-fit items-center gap-3 text-lg font-medium leading-[27px] text-[#0F172A] transition-colors hover:text-[#2563EB]"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#0F172A] transition-transform duration-300 group-hover:scale-105">
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
                    <path d="M11.2 5.6L1.6 0.2C0.4 -0.5 0 1.1 0 2.2v9.6c0 1.1 0.4 2.7 1.6 2L11.2 8.4c1.2-.7 1.2-2.1 0-2.8z" fill="white" />
                  </svg>
                </span>
                View Story
              </Link>
            </article>
          </Reveal>
          <div className="hidden sm:block">
            <NavArrow
              direction="right"
              label="Next story"
              onClick={() => setSlide((current) => (current === TESTIMONIALS.length - 1 ? 0 : current + 1))}
            />
          </div>
        </div>
        <div className="mt-6 flex items-center justify-center gap-4 sm:hidden">
          <NavArrow
            direction="left"
            label="Previous story"
            onClick={() => setSlide((current) => (current === 0 ? TESTIMONIALS.length - 1 : current - 1))}
          />
          <NavArrow
            direction="right"
            label="Next story"
            onClick={() => setSlide((current) => (current === TESTIMONIALS.length - 1 ? 0 : current + 1))}
          />
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {TESTIMONIALS.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Show story ${index + 1}`}
              onClick={() => setSlide(index)}
              className={`h-3 w-3 rounded-full transition-colors duration-300 ${
                index === slide ? "bg-[#2563EB]" : "bg-[#D9D9D9]"
              }`}
            />
          ))}
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-[50px] lg:pb-16">
        <Reveal>
          <h2 className="text-center font-display text-[32px] font-semibold leading-10 text-[#0F172A] sm:text-4xl sm:leading-[48px] xl:text-[48px] xl:leading-[60px]">
            Our Graduates New Jobs
          </h2>
        </Reveal>
        <Reveal className="min-w-0">
          <div
            ref={jobsRef}
            className="mt-10 flex min-w-0 gap-5 overflow-x-auto overscroll-x-contain pb-4 scrollbar-none"
          >
            {JOBS.map((job) => (
              <JobCard key={job.id} />
            ))}
          </div>
        </Reveal>
        <div className="mt-8 flex justify-center gap-6">
          <NavArrow direction="left" label="Previous jobs" onClick={() => scrollJobs(-1)} />
          <NavArrow direction="right" label="Next jobs" onClick={() => scrollJobs(1)} />
        </div>
        <Reveal>
          <div className="mt-10 flex justify-center">
            <OrangeCta href="#results">Student Outcomes Reports</OrangeCta>
          </div>
        </Reveal>
      </section>

      <section id="step" className="scroll-mt-28 px-4 py-10 sm:px-6 lg:px-[50px] lg:pb-16">
        <Reveal>
          <h2 className="mx-auto max-w-[889px] text-center font-display text-[32px] font-semibold leading-10 text-[#0F172A] sm:text-4xl sm:leading-[48px] xl:text-[48px] xl:leading-[60px]">
            Why our online AI certificate program Works
          </h2>
          <p className="mx-auto mt-4 max-w-[916px] text-center font-[family-name:var(--font-inter)] text-base leading-6 text-[#636363] sm:text-xl sm:leading-6">
            What sets 365 Data Science apart isn’t just the content—it’s the way we guide our
            learners through a smooth transition into AI and data science. The STEP™ method
            positions us as one of the top online courses for learning AI, where we promote
            sustainable pacing with practical study tools and resources. All this—with the added
            flexibility—makes it possible for our graduates to achieve great things.
          </p>
          <h3 className="mt-10 text-center font-display text-[32px] font-semibold leading-10 text-[#0F172A] sm:text-4xl sm:leading-[48px] xl:mt-12 xl:text-[48px] xl:leading-[60px]">
            The STEP™ method
          </h3>
          <div className="mx-auto mt-6 w-full max-w-[456px]">
            <Image
              src="/images/outcomes/step-letters.png"
              alt="S T E P"
              width={456}
              height={72}
              className="h-auto w-full"
            />
          </div>
        </Reveal>
        <div className="mx-auto mt-10 grid w-full min-w-0 max-w-[1340px] gap-5 lg:grid-cols-2">
          {STEP_CARDS.map((card, index) => (
            <Reveal key={card.title} delay={index * 70}>
              <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl bg-white shadow-[0_0_12px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(15,23,42,0.12)]">
                <div className="flex items-start justify-between gap-4 bg-[linear-gradient(90deg,#D5E2FF_0%,#FFE6BD_100%)] px-6 py-6">
                  <div className="min-w-0">
                    <h4 className="font-display text-[28px] font-semibold leading-10 text-black sm:text-[32px] sm:leading-10">
                      {card.title}
                    </h4>
                    <p className="mt-1 text-base leading-6 text-[#565656]">{card.subtitle}</p>
                  </div>
                  <Image src={card.icon} alt="" width={49} height={49} className="h-12 w-12 shrink-0" />
                </div>
                <div className="flex flex-1 flex-col px-6 py-6">
                  <p className="font-[family-name:var(--font-inter)] text-lg leading-[22px] text-[#636363]">{card.body}</p>
                  <div className="mt-6">
                    <OrangeCta href={card.cta.href}>{card.cta.label}</OrangeCta>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="compare" className="scroll-mt-28 px-4 py-10 sm:px-6 lg:px-[50px] lg:pb-16">
        <Reveal>
          <h2 className="mx-auto max-w-[1114px] text-center font-display text-[28px] font-semibold leading-9 text-[#0F172A] sm:text-4xl sm:leading-[48px] xl:text-[48px] xl:leading-[60px]">
            Self-study plan vs online courses vs university?
          </h2>
        </Reveal>

        <div className="mx-auto mt-10 hidden min-w-0 max-w-[1340px] lg:block">
          <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-5">
            <div />
            {[
              { title: "Online courses", icon: "/images/outcomes/icon-online.svg" },
              { title: "SkillVexa Self-study Plan", icon: "/images/outcomes/icon-self-study.svg", featured: true },
              { title: "Traditional universities", icon: "/images/outcomes/icon-university.svg" },
            ].map((col) => (
              <div
                key={col.title}
                className={`overflow-hidden rounded-xl text-center shadow-[0_0_16px_rgba(0,0,0,0.16)] ${
                  col.featured ? "bg-white" : "bg-white"
                }`}
              >
                <div className={`flex flex-col items-center gap-3 px-4 py-8 ${col.featured ? "bg-[linear-gradient(90deg,#D5E2FF_0%,#FFE6BD_100%)]" : ""}`}>
                  <Image src={col.icon} alt="" width={47} height={47} className="h-12 w-12" />
                  <p className="font-display text-[22px] font-semibold leading-8 text-black xl:text-[26px] xl:leading-10">
                    {col.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {COMPARE_ROWS.map((row, index) => (
            <div
              key={row.label}
              className={`mt-0 grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-5 ${
                index === 0 ? "mt-6" : "mt-4"
              }`}
            >
              <p className="flex items-center font-display text-xl font-semibold leading-8 text-[#0F172A]">{row.label}</p>
              <p className="rounded-xl bg-white px-5 py-6 text-center text-base leading-6 text-[#636363] shadow-[0_0_16px_rgba(0,0,0,0.08)]">{row.online}</p>
              <p className="whitespace-pre-line rounded-xl bg-white px-5 py-6 text-center text-base font-medium leading-6 text-[#0F172A] shadow-[0_0_16px_rgba(0,0,0,0.08)]">
                {row.skillvexa}
              </p>
              <p className="rounded-xl bg-white px-5 py-6 text-center text-base leading-6 text-[#636363] shadow-[0_0_16px_rgba(0,0,0,0.08)]">{row.university}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 grid min-w-0 max-w-[720px] gap-5 lg:hidden">
          {[
            { key: "online", title: "Online courses", icon: "/images/outcomes/icon-online.svg", featured: false },
            { key: "skillvexa", title: "SkillVexa Self-study Plan", icon: "/images/outcomes/icon-self-study.svg", featured: true },
            { key: "university", title: "Traditional universities", icon: "/images/outcomes/icon-university.svg", featured: false },
          ].map((col) => (
            <Reveal key={col.key}>
              <article className="overflow-hidden rounded-xl bg-white shadow-[0_0_16px_rgba(0,0,0,0.16)]">
                <div className={`flex flex-col items-center gap-3 px-4 py-8 ${col.featured ? "bg-[linear-gradient(90deg,#D5E2FF_0%,#FFE6BD_100%)]" : ""}`}>
                  <Image src={col.icon} alt="" width={47} height={47} className="h-12 w-12" />
                  <p className="text-center font-display text-2xl font-semibold leading-8 text-black">{col.title}</p>
                </div>
                <div className="flex flex-col gap-4 px-5 py-6">
                  {COMPARE_ROWS.map((row) => (
                    <div key={row.label}>
                      <p className="font-display text-lg font-semibold leading-7 text-[#0F172A]">{row.label}</p>
                      <p className="mt-1 whitespace-pre-line text-base leading-6 text-[#636363]">{row[col.key]}</p>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-10 flex justify-center">
            <OrangeCta href="#results">Student Outcomes Reports</OrangeCta>
          </div>
        </Reveal>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-[50px] lg:pb-16">
        <div className="mx-auto grid w-full min-w-0 max-w-[1340px] items-center gap-10 lg:grid-cols-[minmax(0,589px)_minmax(0,680px)] lg:justify-between">
          <Reveal>
            <h2 className="font-display text-[32px] font-semibold leading-10 text-[#0F172A] sm:text-4xl sm:leading-[48px] xl:text-[48px] xl:leading-[60px]">
              How to get a job in AI Fast
            </h2>
            <p className="mt-3 font-[family-name:var(--font-inter)] text-lg leading-[22px] text-[#636363]">
              Learn AI and data science on your own terms in a beginner-friendly environment—designed
              for busy lives.
            </p>
            <ul className="mt-6 flex flex-col gap-4">
              {[
                { label: "100% online, self-paced", icon: "/images/outcomes/check.svg" },
                { label: "CPE-approved AI certification", icon: "/images/outcomes/perk-cert.svg" },
                { label: "No IT or STEM background required", icon: "/images/outcomes/perk-stem.svg" },
              ].map((item) => (
                <li key={item.label} className="flex items-center gap-5">
                  <Image src={item.icon} alt="" width={28} height={28} className="h-7 w-7 shrink-0" />
                  <span className="font-[family-name:var(--font-inter)] text-lg font-medium leading-6 text-[#0F172A] sm:text-xl sm:leading-6">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <OrangeCta href="/get-started">Free Start</OrangeCta>
            </div>
          </Reveal>
          <Reveal delay={100} className="min-w-0">
            <div className="relative mx-auto aspect-[680/488] w-full max-w-[680px]">
              <Image
                src="/images/outcomes/device-phone.png"
                alt=""
                width={255}
                height={488}
                className="absolute left-0 top-0 z-[1] h-full w-auto max-h-full object-contain"
              />
              <Image
                src="/images/outcomes/device-laptop.png"
                alt="SkillVexa learning on desktop"
                width={498}
                height={354}
                className="absolute right-0 top-[1%] z-[2] w-[73%] rounded-3xl object-contain shadow-[0_4px_19px_rgba(0,0,0,0.25)]"
              />
              <Image
                src="/images/outcomes/device-badge.svg"
                alt=""
                width={95}
                height={125}
                className="absolute bottom-[12%] left-[39%] z-[3] w-[14%] max-w-[95px]"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
