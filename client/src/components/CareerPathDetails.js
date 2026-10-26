"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  Bot,
  BrainCircuit,
  Briefcase,
  ChartColumn,
  Cpu,
  Database,
  GraduationCap,
  Landmark,
  Search,
  Sparkles,
  UserRound,
  Wrench,
  PieChart,
  Server,
} from "lucide-react";
import {
  getAllCareerPaths,
  getAllCourses,
  siteConfig,
} from "@/config/SiteConfig";
import Reveal from "@/components/Reveal";
import CourseCard from "@/components/CourseCard";
import SuccessCard from "@/components/SuccessCard";
import CoursesFAQ from "@/components/CoursesFAQ";

const sectionTabs = [
  { id: "curriculum", label: "Curriculum" },
  { id: "projects", label: "Projects" },
  { id: "certificate", label: "Certificate" },
  { id: "outcomes", label: "Student outcomes" },
  { id: "more-paths", label: "More career paths" },
];

const iconClass = "h-5 w-5 shrink-0 text-[#2563EB]";

function pathIcon(item) {
  const key = `${item.label} ${item.href}`.toLowerCase();
  const props = { className: iconClass, strokeWidth: 1.75, "aria-hidden": true };
  if (key.includes("tableau")) return <PieChart {...props} />;
  if (key.includes("power") && key.includes("bi")) return <BarChart3 {...props} />;
  if (key.includes("agent")) return <Bot {...props} />;
  if (key.includes("ai engineer") || key.includes("ai-engineer")) return <Sparkles {...props} />;
  if (key.includes("machine") || key.includes("ml ")) return <Cpu {...props} />;
  if (key.includes("quant") || key.includes("finance")) return <Landmark {...props} />;
  if (key.includes("data engineer") || key.includes("data-engineer")) return <Server {...props} />;
  if (key.includes("business") || key.includes("buisness")) return <Briefcase {...props} />;
  if (key.includes("senior")) return <BrainCircuit {...props} />;
  if (key.includes("scientist") || key.includes("sceintist")) return <Database {...props} />;
  return <ChartColumn {...props} />;
}

function VideoPreview({ src, alt, className = "" }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src={src} alt={alt} fill sizes="741px" className="object-cover" />
      <div className="absolute inset-0 bg-black/10" />
      <span className="absolute left-1/2 top-1/2 flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 backdrop-blur-[2px] transition-transform duration-300 hover:scale-105 sm:h-[86px] sm:w-[86px]">
        <Image
          src="/images/career-path/play.svg"
          alt=""
          width={86}
          height={86}
          className="h-full w-full"
        />
      </span>
    </div>
  );
}

function SectionMark() {
  return (
    <span className="mt-1 inline-flex h-3.5 w-3.5 shrink-0 rounded-[3px] bg-[#F59E0B]" aria-hidden />
  );
}

export default function CareerPathDetails({ path }) {
  const details = siteConfig.courseDetails;
  const [activeNav, setActiveNav] = useState("curriculum");
  const [roadmapStep, setRoadmapStep] = useState(2);
  const courses = getAllCourses().slice(0, 4);
  const projectCourses = getAllCourses().slice(0, 3);
  const otherPaths = getAllCareerPaths().filter((item) => item.slug !== path.slug);
  const stories = siteConfig.stories.items.slice(0, 2);
  const role = path.title;
  const roleLower = path.roleLower;

  const instructors = [
    {
      name: details.instructor.name,
      role: details.instructor.role,
      image: details.instructor.image,
      linkedin: details.instructor.linkedin,
    },
    {
      name: details.instructorsLine[0],
      role: "Curriculum Lead | Data Science Educator",
      image: "/images/career-path/instructor-1.png",
      linkedin: details.instructor.linkedin,
    },
    {
      name: "SkillVexa Faculty",
      role: "Industry mentors from AI, analytics, and engineering",
      image: "/images/career-path/instructor-1.png",
      linkedin: details.instructor.linkedin,
    },
  ];

  const stats = [
    {
      icon: "/images/career-path/stat-courses.svg",
      label: `Datascience & ${path.coursesCount} AI Courses`,
      value: null,
    },
    { icon: "/images/career-path/stat-online.svg", label: "Online:", value: "100%" },
    { icon: "/images/career-path/stat-content.svg", label: "Content:", value: path.hours },
    { icon: "/images/career-path/stat-level.svg", label: "Skill level:", value: path.skillLevel },
    { icon: "/images/career-path/stat-cpe.svg", label: "CPE Credits:", value: path.cpeCredits },
    { icon: "/images/career-path/stat-cert.svg", label: "Accredited", value: "Certificate" },
  ];

  const curriculumNotes = [
    `For many aspiring ${roleLower}s, the real challenge isn’t learning data—it’s figuring out where to start.`,
    `Our structured ${roleLower} roadmap shows you every next step—while giving you ways to test your skills and apply them in practice—so you build a practical ${roleLower} career path that’s truly future-proof.`,
    `Along the way, you’ll build the ${roleLower} skills employers look for, and master the essential ${roleLower} tools, including`,
    `In this ${roleLower} program, you’ll go beyond concepts by working with real datasets, building visualizations, and completing industry-based projects.`,
  ];

  const roadmapSteps = [
    {
      id: 0,
      label: "Education",
      step: "Step 1",
      icon: GraduationCap,
      body: `Start with a structured ${roleLower} curriculum that builds fundamentals first, then layers on the tools and workflows used on the job.`,
      quote: "A clear learning sequence removes the guesswork from becoming job-ready.",
    },
    {
      id: 1,
      label: "Skill",
      step: "Step 2",
      icon: Wrench,
      body: `Practice the core ${roleLower} toolkit through guided exercises, exams, and portfolio projects that prove you can apply what you learn.`,
      quote: "Employers hire people who can demonstrate skills—not just list them.",
    },
    {
      id: 2,
      label: "Branding",
      step: "Step 3",
      icon: UserRound,
      body: `Your personal brand often determines whether you get noticed before the interview. A polished resume, a strong LinkedIn profile, and a portfolio or GitHub showcase your work. Sharing dashboards, SQL queries, or visualizations shows how you turn data into impact. Employers also look for credibility—${roleLower} certifications and certificate programs help recruiters filter applicants, and with CPE credits, they signal ongoing growth.`,
      quote:
        "The real advantage lies in demonstrating flexibility in tools, reinforced by a strong portfolio and proof of continuous learning.",
    },
    {
      id: 3,
      label: "Job Search",
      step: "Step 4",
      icon: Search,
      body: `Use your projects, certificate, and interview practice to apply with confidence. You’ll know how to talk about your ${roleLower} work, quantify impact, and stand out in a competitive market.`,
      quote: "Preparation turns applications into interviews—and interviews into offers.",
    },
  ];

  const activeRoadmap = roadmapSteps[roadmapStep];

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return false;
    setActiveNav(id === "more-career-paths" ? "more-paths" : id);
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    return true;
  }, []);

  useEffect(() => {
    function hashTargetsMorePaths() {
      const hash = window.location.hash.replace(/^#/, "");
      return hash === "more-career-paths" || hash === "more-paths";
    }

    function scrollWhenReady() {
      if (!hashTargetsMorePaths()) return () => {};

      let cancelled = false;
      let lastTop = null;
      let stableFrames = 0;
      let rafId = 0;
      let correctId = 0;
      const started = Date.now();

      const tick = () => {
        if (cancelled) return;
        const el = document.getElementById("more-career-paths");
        if (!el) {
          rafId = window.requestAnimationFrame(tick);
          return;
        }
        const absTop = el.getBoundingClientRect().top + window.scrollY;
        if (lastTop != null && Math.abs(absTop - lastTop) < 2) {
          stableFrames += 1;
        } else {
          stableFrames = 0;
          lastTop = absTop;
        }
        if (stableFrames >= 3 || Date.now() - started > 2000) {
          scrollToSection("more-career-paths");
          correctId = window.setTimeout(() => {
            if (!cancelled) scrollToSection("more-career-paths");
          }, 400);
          return;
        }
        rafId = window.requestAnimationFrame(tick);
      };

      rafId = window.requestAnimationFrame(tick);
      return () => {
        cancelled = true;
        window.cancelAnimationFrame(rafId);
        window.clearTimeout(correctId);
      };
    }

    let stop = () => {};
    let pollId = 0;

    const start = () => {
      stop();
      if (hashTargetsMorePaths()) {
        stop = scrollWhenReady();
        return true;
      }
      return false;
    };

    if (!start()) {
      const began = Date.now();
      pollId = window.setInterval(() => {
        if (start() || Date.now() - began > 1500) {
          window.clearInterval(pollId);
        }
      }, 50);
    }

    window.addEventListener("hashchange", start);
    return () => {
      window.clearInterval(pollId);
      stop();
      window.removeEventListener("hashchange", start);
    };
  }, [path.slug, scrollToSection]);

  function openMorePaths(event) {
    event?.preventDefault();
    scrollToSection("more-paths");
  }

  return (
    <div className="min-w-0 bg-white">
      <section className="px-4 pt-8 sm:px-6 sm:pt-10 lg:px-[50px]">
        <div className="mx-auto w-full min-w-0 max-w-[1340px]">
          <Reveal>
            <nav className="flex items-center gap-2 text-base font-medium leading-6">
              <Link
                href="/career-paths"
                className="text-[#0F172A] transition-colors hover:text-[#2563EB]"
              >
                Career Paths
              </Link>
              <Image
                src="/images/course-details/chevron-right.svg"
                alt=""
                width={24}
                height={24}
                className="h-6 w-6"
              />
              <span className="text-[#757575]">{path.title}</span>
            </nav>
          </Reveal>

          <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,530px)_minmax(0,1fr)] lg:gap-10 xl:gap-16">
            <div>
              <Reveal>
                <span className="inline-flex min-h-[37px] max-w-full items-center rounded-full bg-[#F59E0B] px-4 py-2 text-center text-sm font-medium leading-[21px] text-[#0F172A] break-words whitespace-normal sm:px-6">
                  {path.badge}
                </span>
                <h1 className="mt-3 max-w-[416px] font-display text-[32px] font-semibold leading-[1.25] text-[#0F172A] sm:text-4xl lg:text-[48px] lg:leading-[60px]">
                  {path.headline}
                </h1>
                <div className="mt-3 inline-flex items-center rounded-lg border-[1.2px] border-[#0F172A] px-8 py-4">
                  <span className="text-xl font-medium leading-9 text-[#0F172A] sm:text-2xl">
                    {path.trackLabel}
                  </span>
                </div>
                <p className="mt-3 max-w-[530px] text-base leading-6 text-[#636363]">
                  {path.description}
                </p>
              </Reveal>

              <Reveal>
                <div className="mt-6 flex flex-col gap-6">
                  <Link
                    href="/get-started"
                    className="inline-flex h-12 w-fit items-center gap-1.5 rounded-full bg-[#2563EB] px-8 text-base font-medium leading-6 text-white transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#1d4ed8]"
                  >
                    Enroll now
                    <Image
                      src="/images/career-path/cta-arrow.svg"
                      alt=""
                      width={18}
                      height={18}
                      className="h-[18px] w-[18px]"
                    />
                  </Link>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[28px] font-semibold leading-[42px] text-[#0F172A]">
                      {path.rating}
                    </span>
                    <Image
                      src="/images/course-details/stars-row.svg"
                      alt=""
                      width={152}
                      height={28}
                      className="h-7 w-[152px]"
                    />
                    <span className="text-base font-medium leading-6 text-[#0F172A]">
                      870 reviews on
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-base font-medium leading-6 text-black">
                      Google
                      <Image
                        src="/images/course-details/google-icon.svg"
                        alt=""
                        width={16}
                        height={16}
                        className="h-4 w-4"
                      />
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal>
              <VideoPreview
                src={path.heroImage}
                alt={path.title}
                className="h-[240px] rounded-3xl sm:h-[360px] lg:h-[471px]"
              />
            </Reveal>
          </div>

          <div className="mt-10 border-t border-[#E5E5E5] pt-8">
            <Reveal>
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6 lg:justify-items-center">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center gap-3 text-center">
                    <Image src={stat.icon} alt="" width={48} height={48} className="h-12 w-12" />
                    <div>
                      <p className="text-base font-medium leading-6 text-[#161616]">{stat.label}</p>
                      {stat.value ? (
                        <p className="text-lg font-semibold leading-[27px] text-[#2563EB]">
                          {stat.value}
                        </p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="mt-12 grid items-start gap-6 xl:grid-cols-[567px_minmax(0,1fr)]">
            <Reveal>
              <article className="flex h-full flex-col gap-6 rounded-xl bg-white p-6 shadow-[0_0_12px_rgba(0,0,0,0.16)]">
                <h2 className="break-words font-display text-[32px] font-semibold leading-[50px] text-[#0F172A] lg:text-[40px]">
                  {path.jobTitle}
                </h2>
                <div className="rounded-2xl bg-[#F6F6F6] px-4 py-4 sm:px-6">
                  <div className="grid grid-cols-2 gap-4 sm:gap-8">
                    <div>
                      <p className="text-lg font-medium leading-[30px] text-[#636363] sm:text-xl">
                        Entry-Leve Salary
                      </p>
                      <p className="text-sm leading-[21px] text-[#636363]">(USD, per year)</p>
                      <p className="mt-3 text-3xl font-semibold leading-[60px] text-[#161616] sm:text-[40px]">
                        {path.salary}
                      </p>
                    </div>
                    <div className="border-l border-[#D9D9D9] pl-4 sm:pl-8">
                      <p className="text-lg font-medium leading-[30px] text-[#636363] sm:text-xl">
                        Projected job growth
                      </p>
                      <p className="text-sm leading-[21px] text-[#636363]">(next 10 years)</p>
                      <p className="mt-3 text-3xl font-semibold leading-[60px] text-[#161616] sm:text-[40px]">
                        {path.growth}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <div>
                    <div className="flex items-start gap-3">
                      <SectionMark />
                      <h3 className="text-2xl font-medium leading-9 text-[#161616]">
                        Key Responsibilities
                      </h3>
                    </div>
                    <p className="mt-2 pl-[26px] text-lg leading-[27px] text-[#636363]">
                      {path.responsibilities}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-start gap-3">
                      <SectionMark />
                      <h3 className="text-2xl font-medium leading-9 text-[#161616]">Core skills</h3>
                    </div>
                    <p className="mt-2 pl-[26px] text-lg leading-[27px] text-[#636363]">
                      {path.skills}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-start gap-3">
                      <SectionMark />
                      <h3 className="text-2xl font-medium leading-9 text-[#161616]">
                        {path.companiesLabel}
                      </h3>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-8 pl-[26px]">
                      <Image
                        src="/images/career-path/logo-google.svg"
                        alt="Google"
                        width={100}
                        height={44}
                        className="h-11 w-auto"
                      />
                      <Image
                        src="/images/career-path/logo-amazon.svg"
                        alt="Amazon"
                        width={100}
                        height={44}
                        className="h-11 w-auto"
                      />
                      <Image
                        src="/images/career-path/logo-microsoft.svg"
                        alt="Microsoft"
                        width={100}
                        height={44}
                        className="h-11 w-auto"
                      />
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>

            <Reveal>
              <div className="rounded-2xl bg-white p-4 shadow-[0_0_12px_rgba(0,0,0,0.16)] sm:p-6">
                <VideoPreview
                  src={path.previewImage}
                  alt={`${path.title} preview`}
                  className="h-[240px] rounded-2xl sm:h-[360px] lg:h-[464px]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="px-4 pt-16 sm:px-6 lg:px-[50px]">
        <div className="mx-auto w-full min-w-0 max-w-[1340px]">
          <Reveal>
            <div className="rounded-3xl bg-white px-4 py-10 shadow-[0_0_12px_rgba(0,0,0,0.16)] sm:px-10 sm:py-12">
              <h2 className="text-center font-[family-name:var(--font-inter)] text-[28px] leading-12 text-[#0F172A] sm:text-[40px] sm:leading-[48px]">
                We’re an Accredited institution
              </h2>
              <p className="mx-auto mt-3 max-w-[645px] text-center text-lg leading-[27px] text-[#636363]">
                Earn your {role} certification through an accredited program proven to deliver
                results. 100% online.
              </p>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {[
                  {
                    icon: "/images/career-path/outcome-9in10.svg",
                    iconClass: "h-[76px] w-[208px]",
                    value: "9 in 10",
                    text: "of our graduates landed a new AI and data science job after enrollment",
                  },
                  {
                    icon: "/images/career-path/outcome-94.svg",
                    iconClass: "h-20 w-20",
                    value: "94%",
                    text: "of AI and data science graduates successfully change or advance their careers",
                  },
                  {
                    icon: "/images/career-path/outcome-salary.svg",
                    iconClass: "h-[77px] w-[76px]",
                    value: "$29,000",
                    text: "average salary increase reported by graduates after completing the program",
                  },
                ].map((card) => (
                  <article
                    key={card.value}
                    className="flex flex-col items-center rounded-2xl bg-[#F8FAFC] px-6 py-6 text-center shadow-[0_0_12px_rgba(0,0,0,0.12)]"
                  >
                    <Image
                      src={card.icon}
                      alt=""
                      width={208}
                      height={80}
                      className={`${card.iconClass} object-contain`}
                    />
                    <p className="mt-5 font-display text-[40px] font-semibold leading-[50px] text-[#000C1F]">
                      {card.value}
                    </p>
                    <p className="mt-2 text-lg leading-[27px] text-[#636363]">{card.text}</p>
                  </article>
                ))}
              </div>
              <Link
                href="/stories"
                className="mt-8 flex items-center justify-center gap-2 text-base font-semibold leading-6 text-[#2563EB] transition-colors hover:text-[#1d4ed8]"
              >
                Student outcomes report
                <Image
                  src="/images/icons/arrow-tr.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-4 pt-12 sm:px-6 lg:px-[50px]">
        <div className="mx-auto w-full min-w-0 max-w-[1340px]">
          <div className="min-w-0 max-w-full overflow-x-auto overscroll-x-contain border-b border-[#E5E5E5] scrollbar-none">
            <div className="flex w-max min-w-full gap-6 lg:w-full lg:justify-between lg:gap-0">
              {sectionTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => scrollToSection(tab.id)}
                  className={`shrink-0 pb-3 text-2xl leading-9 transition-colors ${
                    activeNav === tab.id
                      ? "border-b-2 border-[#0F172A] font-medium text-[#0F172A]"
                      : "text-[#636363] hover:text-[#0F172A]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div id="curriculum" className="scroll-mt-28 pt-10">
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-display text-[32px] font-semibold leading-[60px] text-[#0F172A] lg:text-[48px]">
                  Curriculum
                </h2>
                <span className="inline-flex items-center rounded-full bg-[#ECF5FF] px-4 py-1 text-sm font-medium text-[#2563EB]">
                  CPE credits
                </span>
              </div>
            </Reveal>

            <div className="relative mt-8">
              <div className="absolute left-[calc(50%-0.5px)] top-8 hidden h-[calc(100%-80px)] w-px bg-[#293343] xl:block" />
              <div className="flex flex-col gap-10">
                {courses.map((course, index) => {
                  const note = curriculumNotes[index] || curriculumNotes[0];
                  return (
                    <Reveal key={course.id} delay={index * 80}>
                      <div className="grid items-center gap-6 xl:grid-cols-[minmax(0,507px)_64px_minmax(0,1fr)]">
                        <div>
                          <p className="text-lg leading-[27px] text-[#636363]">{note}</p>
                          {index === 2 ? (
                            <ul className="mt-4 flex flex-col gap-2">
                              {path.skillTools.map((tool) => (
                                <li key={tool} className="flex items-start gap-3">
                                  <Image
                                    src="/images/course-details/check.svg"
                                    alt=""
                                    width={20}
                                    height={20}
                                    className="mt-1 h-5 w-5 shrink-0"
                                  />
                                  <span className="text-lg leading-[27px] text-[#636363]">
                                    {tool}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                        <div className="relative z-10 hidden justify-center xl:flex">
                          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#0F172A] font-display text-xl font-semibold text-white">
                            {index + 1}
                          </span>
                        </div>
                        <article className="rounded-2xl bg-white p-5 shadow-[0_0_12px_rgba(0,0,0,0.16)]">
                          <p className="text-xs font-semibold uppercase leading-[18px] text-[#F59E0B]">
                            ONLINE COURSE
                          </p>
                          <h3 className="mt-1.5 font-display text-2xl font-semibold leading-[35px] text-[#0F172A] sm:text-[28px]">
                            {index === 0 ? details.headline : course.title}
                          </h3>
                          <p className="mt-2 text-base leading-6 text-[#636363]">
                            {index === 0
                              ? "Discover the fundamentals of data science and understand how data analysis creates business value. Learn core concepts, tools, and roles while gaining clarity on the career path and how it connects to related fields."
                              : course.description}
                          </p>
                          <Link
                            href={course.href}
                            className="mt-4 inline-flex items-center gap-2 text-base font-semibold leading-6 text-[#2563EB] transition-colors hover:text-[#1d4ed8]"
                          >
                            See Details
                            <Image
                              src="/images/icons/arrow-tr.svg"
                              alt=""
                              width={20}
                              height={20}
                              className="h-5 w-5"
                            />
                          </Link>
                        </article>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
            <a
              href="#more-paths"
              onClick={openMorePaths}
              className="mt-8 inline-block font-[family-name:var(--font-inter)] text-xl leading-6 font-semibold text-[#2563EB] transition-colors hover:text-[#1d4ed8]"
            >
              See More
            </a>
          </div>

          <div className="scroll-mt-28 pt-16">
            <Reveal>
              <h2 className="font-display text-[32px] font-semibold leading-[50px] text-[#000C1F] lg:text-[40px]">
                Your instructors
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {instructors.map((instructor, index) => (
                <Reveal key={`${instructor.name}-${index}`} delay={index * 80}>
                  <article className="flex min-w-0 flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
                    <div className="relative h-[168px] w-[170px] shrink-0 overflow-hidden rounded-xl">
                      <Image
                        src={instructor.image}
                        alt={instructor.name}
                        fill
                        sizes="170px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        <h3 className="text-2xl font-medium leading-9 text-[#161616]">
                          {instructor.name}
                        </h3>
                        <Link href={instructor.linkedin} aria-label={`${instructor.name} LinkedIn`}>
                          <Image
                            src="/images/course-details/linkedin.svg"
                            alt=""
                            width={32}
                            height={32}
                            className="h-8 w-8"
                          />
                        </Link>
                      </div>
                      <p className="mt-2 text-base leading-6 text-[#636363]">{instructor.role}</p>
                      <p className="mt-4 text-lg font-medium leading-[27px] text-[#0F172A]">
                        Worked with:{" "}
                        <span className="font-display text-xl font-semibold text-[#F59E0B]">
                          SkillVexa
                        </span>
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          <div id="projects" className="scroll-mt-28 pt-16">
            <Reveal>
              <h2 className="max-w-[700px] font-display text-[32px] font-semibold leading-[1.25] text-[#0F172A] lg:text-[40px] lg:leading-[50px]">
                A {role} career track with Real Ai projects
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {projectCourses.map((course, index) => (
                <Reveal key={course.id} delay={index * 80}>
                  <CourseCard course={course} />
                </Reveal>
              ))}
            </div>
          </div>

          <div id="certificate" className="scroll-mt-28 pt-16">
            <Reveal>
              <h2 className="max-w-[840px] font-display text-[32px] font-semibold leading-[1.25] text-[#0F172A] lg:text-[48px] lg:leading-[60px]">
                We award accredited {role} Certification
              </h2>
            </Reveal>
            <div className="mt-10 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_540px]">
              <Reveal>
                <div className="relative mx-auto h-[360px] w-full max-w-[680px] overflow-hidden sm:h-[430px]">
                  <Image
                    src="/images/career-path/certificate-1.png"
                    alt={`${role} certificate`}
                    width={498}
                    height={354}
                    className="absolute left-0 top-6 w-[72%] max-w-[498px] rounded-3xl shadow-[0_4px_19px_rgba(0,0,0,0.25)]"
                  />
                  <Image
                    src="/images/career-path/certificate-2.png"
                    alt="Certificate preview"
                    width={255}
                    height={488}
                    className="absolute right-0 top-0 w-[38%] max-w-[255px]"
                  />
                </div>
              </Reveal>
              <Reveal>
                <div className="flex flex-col gap-6">
                  <p className="text-xl leading-9 text-[#636363] sm:text-2xl">
                    Receive an accredited {role} Certificate—officially recognized by leading
                    organizations as proof that your skills align with industry standards.
                  </p>
                  <p className="text-base leading-6 text-[#636363]">
                    Notes: CPE credits are reflected per course in your official transcript, in line
                    with accreditation requirements
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          <div id="outcomes" className="scroll-mt-28 pt-16">
            <h2 className="mx-auto w-full max-w-[682px] text-center font-display text-[32px] font-semibold leading-[40px] text-[#0F172A] sm:text-[44px] sm:leading-[55px]">
              Where our {role} Career Path takes you
            </h2>
            <div className="mt-10 mx-auto grid w-full min-w-0 max-w-[520px] grid-cols-2 gap-4 sm:gap-6">
              {stories.map((story) => (
                <div key={story.name} className="min-w-0">
                  <SuccessCard story={story} compact fluid />
                </div>
              ))}
            </div>
            <Reveal>
              <Link
                href="/get-started"
                className="mt-10 inline-flex h-14 items-center gap-2 rounded-full bg-[#F59E0B] px-8 text-base font-semibold leading-6 text-[#161616] transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#d97706]"
              >
                Start Learning This Path
                <Image
                  src="/images/icons/arrow-tr.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
              </Link>
            </Reveal>
          </div>

          <div className="scroll-mt-28 pt-16">
            <Reveal>
              <h2 className="mx-auto max-w-[673px] text-center font-display text-[32px] font-semibold leading-[1.25] text-[#0F172A] sm:text-[44px] sm:leading-[55px]">
                How to become {path.roleArticle} {role}—Roadmap
              </h2>
            </Reveal>
            <div className="mt-10 grid min-w-0 gap-4 xl:grid-cols-[minmax(0,150px)_minmax(0,150px)_minmax(0,616px)_minmax(0,150px)]">
              {roadmapSteps.map((item, index) => {
                const Icon = item.icon;
                const selected = roadmapStep === index;
                if (index === 2) {
                  const ActiveIcon = activeRoadmap.icon;
                  return (
                    <Reveal key={item.id} className="min-w-0 xl:col-start-3 xl:row-start-1">
                      <article className="overflow-hidden rounded-2xl bg-white shadow-[0_0_24px_rgba(0,0,0,0.12)]">
                        <button
                          type="button"
                          onClick={() => setRoadmapStep(index)}
                          className="flex w-full items-center justify-between bg-[linear-gradient(90deg,#D5E2FF_0%,#FFE6BD_100%)] px-6 py-6 text-left"
                        >
                          <span>
                            <span className="block text-base leading-6 text-[#565656]">
                              {activeRoadmap.step}
                            </span>
                            <span className="font-display text-[32px] font-semibold leading-10 text-black">
                              {activeRoadmap.label}
                            </span>
                          </span>
                          <ActiveIcon className="h-10 w-10 text-[#0F172A]" strokeWidth={1.6} />
                        </button>
                        <div className="flex min-h-[420px] flex-col gap-6 px-6 py-8 sm:px-6">
                          <p className="text-base leading-6 text-[#636363]">{activeRoadmap.body}</p>
                          <p className="text-xl font-medium leading-[30px] text-[#0F172A]">
                            “{activeRoadmap.quote}”
                          </p>
                        </div>
                      </article>
                    </Reveal>
                  );
                }
                return (
                  <Reveal key={item.id} delay={index * 60} className="min-w-0">
                    <button
                      type="button"
                      onClick={() => setRoadmapStep(index)}
                      className={`flex h-full min-h-[220px] w-full min-w-0 flex-col items-center justify-between rounded-2xl bg-[linear-gradient(180deg,#D5E2FF_0%,#FFE6BD_100%)] px-4 py-6 text-center transition-all duration-300 hover:-translate-y-1 xl:min-h-[676px] ${
                        selected ? "ring-2 ring-[#2563EB]" : ""
                      }`}
                    >
                      <Icon className="h-10 w-10 text-[#0F172A]" strokeWidth={1.6} />
                      <span className="mt-auto">
                        <span className="block text-base leading-6 text-[#565656] [writing-mode:vertical-rl] rotate-180 xl:inline">
                          {item.step}
                        </span>
                        <span className="mt-2 block font-display text-2xl font-semibold leading-10 text-black xl:mt-0 xl:inline xl:[writing-mode:vertical-rl] xl:rotate-180 xl:text-[32px]">
                          {item.label}
                        </span>
                      </span>
                    </button>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <div id="more-career-paths" className="scroll-mt-28 pt-16">
            <div id="more-paths">
            <h2 className="font-display text-[32px] font-semibold leading-[50px] text-[#0F172A] lg:text-[40px]">
              More career paths
            </h2>
            <div className="mt-8 grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {otherPaths.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex min-w-0 items-center gap-3 rounded-xl border border-[#E8EEF5] px-3 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F8FAFC] hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#ECF5FF] transition-colors group-hover:bg-[#DBEAFE]">
                    {pathIcon(item)}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium leading-5 text-[#0F172A]">
                      {item.label}
                    </span>
                    <span className="block text-xs leading-4 text-[#636363]">Career Path</span>
                  </span>
                </Link>
              ))}
            </div>
            </div>
          </div>
        </div>
      </section>

      <CoursesFAQ />
    </div>
  );
}
