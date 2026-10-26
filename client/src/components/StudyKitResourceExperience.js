"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

const resourceTypes = [
  { name: "All", href: "/study-kit", icon: "/images/study-kit/icon-all.svg" },
  { name: "Course Notes", href: "/study-kit/course-notes", icon: "/images/study-kit/icon-course-notes.svg" },
  { name: "Templates", href: "/study-kit/coding-templates", icon: "/images/study-kit/icon-templates.svg" },
  { name: "Infographics", href: "/study-kit/infographics", icon: "/images/study-kit/icon-infographics.svg" },
  { name: "Career Guides", href: "/career-kit/career-guides", icon: "/images/study-kit/icon-career-guides.svg" },
  { name: "Practice Exams", href: "/study-kit/practice-exams", icon: "/images/study-kit/icon-practice-exams.svg" },
];

const guide = (n) => `/images/study-kit/career-guide-${n}.png`;
const templateCover = "/images/study-kit/template-cover.png";
const infographicCovers = [templateCover, guide(4), guide(3), guide(2), guide(6), guide(5), templateCover, guide(4), guide(3)];
const careerCovers = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(guide);
const practiceCovers = Array(9).fill(templateCover);
const commonCovers = [
  "/images/courses/data-science.png",
  "/images/courses/data-visualization.png",
  "/images/courses/data-analytics.jpg",
  "/images/courses/artificial-intelligence.png",
  "/images/courses/python.png",
  "/images/courses/machine-learning.png",
  "/images/courses/web-development.png",
  "/images/courses/cloud-computing.png",
  "/images/courses/cybersecurity.png",
];

const configs = {
  all: {
    selected: "All",
    title: "Skill Vexa Resources Center",
    search: "Search Resources",
  },
  "course-notes": {
    selected: "Course Notes",
    tag: "COURSE NOTES",
    covers: [guide(2), guide(4), templateCover],
    topics: ["Python", "SQL", "Theory"],
    titles: ["Intro to Python Course Notes", "SQL Fundamentals Course Notes", "Intro to AI Course Notes"],
    descriptions: [
      "Variables, loops, functions and the core data structures you need before starting any data project—summarised in clear, printable notes.",
      "SELECT, filtering, joins and aggregations explained step by step, with short queries you can run as you read.",
      "The key ideas behind artificial intelligence, machine learning and neural networks, explained in plain language with simple examples.",
    ],
  },
  infographics: {
    selected: "Infographics",
    title: "Data Science and AI Infographics",
    search: "Search Infographics",
    intro: "Save yourself hours of browsing the internet and reading fragmented, outdated information. Our meticulously curated data and AI career guides assist you at every stage of your journey, providing the knowledge, support, and expert advice to find a job that aligns with your needs and interests.",
    filters: ["All", "Python", "Excel", "SQL", "Theory"],
    tag: "INFOGRAPHICS",
    covers: infographicCovers,
    topics: Array(9).fill("Python"),
    titles: Array(9).fill("Intro to AI Course Notes"),
    descriptions: Array(9).fill("Set yourself up for success in artificial intelligence with our AI Interview Guide—a comprehensive collection of AI interview questions to help you excel and land your dream role. This guide is tailored to help you prepare with confidence."),
  },
  "career-guides": {
    selected: "Career Guides",
    title: "Data and AI Career Guides",
    search: "Search Career Guides",
    intro: "Save yourself hours of browsing the internet and reading fragmented, outdated information. Our meticulously curated data and AI career guides assist you at every stage of your journey, providing the knowledge, support, and expert advice to find a job that aligns with your needs and interests.",
    filters: [],
    tag: "CAREER GUIDES",
    covers: careerCovers,
    rowGap: "lg:gap-y-[60px]",
    topics: Array(9).fill("Artificial Intelligence"),
    titles: Array(9).fill("AI Interview Guide"),
    descriptions: Array(9).fill("Set yourself up for success in artificial intelligence with our AI Interview Guide—a comprehensive collection of AI interview questions to help you excel and land your dream role. This guide is tailored to help you prepare with confidence."),
  },
  "coding-templates": {
    selected: "Templates",
    title: "Data Science Templates",
    search: "Search Templates",
    intro: "Speed up your work with ready-to-use Python, SQL and Excel templates from SkillVexa instructors. Each one solves a common task—so you can stop starting from scratch and spend your time on the analysis that matters.",
    filters: ["All", "Python", "Excel", "SQL", "Theory"],
    tag: "TEMPLATES",
    covers: Array(9).fill(templateCover),
    topics: ["Excel", "Python", "Python", "SQL", "Python", "Theory", "Excel", "SQL", "Theory"],
    titles: [
      "15 Ways to Visualize Revenue",
      "Data Selection with pandas",
      "Indexing with .iloc[] and .loc[]",
      "Joining Tables in SQL",
      "Descriptive Statistics in Python",
      "Statistics Formula Sheet",
      "Pivot Table Dashboard",
      "Window Functions Cheat Sheet",
      "Machine Learning Glossary",
    ],
    descriptions: [
      "An Excel workbook with fifteen revenue charts—from simple columns to waterfall and Pareto charts. Paste in your numbers and pick the view that tells your story best.",
      "A notebook that shows how to select rows, columns and subsets from a DataFrame, with short examples you can copy straight into your own projects.",
      "Learn the difference between position-based and label-based indexing in pandas with side-by-side examples and common mistakes to avoid.",
      "Ready-made SQL queries for INNER, LEFT, RIGHT and FULL joins, with sample tables so you can see exactly which rows each join returns.",
      "Get a quick overview of any dataset with describe(), value counts and grouped summaries—all in one reusable notebook.",
      "Every core statistics formula on one page—mean, variance, confidence intervals and hypothesis tests—with a plain-English note on when to use each.",
      "A clean Excel dashboard built on pivot tables and slicers. Swap in your data and get an interactive report in minutes.",
      "Ranking, running totals and moving averages with SQL window functions—explained with short, practical examples.",
      "Clear, one-line definitions of the machine learning terms you will meet most often, from overfitting to cross-validation, grouped by topic.",
    ],
  },
  "practice-exams": {
    selected: "Practice Exams",
    title: "Data Science Practice Exams",
    search: "Search Practice Exams",
    intro: "Save yourself hours of browsing the internet and reading fragmented, outdated information. Our meticulously curated data and AI career guides assist you at every stage of your journey, providing the knowledge, support, and expert advice to find a job that aligns with your needs and interests.",
    filters: ["All", "Python", "Excel", "SQL", "Theory"],
    tag: "PRACTICE EXAMS",
    covers: practiceCovers,
    topics: Array(9).fill("Python"),
    titles: Array(9).fill("Intro to AI Course Notes"),
    descriptions: Array(9).fill("Set yourself up for success in artificial intelligence with our AI Interview Guide—a comprehensive collection of AI interview questions to help you excel and land your dream role. This guide is tailored to help you prepare with confidence."),
  },
};

function ResourceCard({ item, config }) {
  return (
    <article className="group flex h-full min-w-0 flex-col gap-5 rounded-[20px] bg-white px-3 pb-5 pt-3 shadow-[0_0_8px_rgba(0,0,0,0.12)] transition-shadow duration-300 hover:shadow-[0_12px_28px_rgba(15,23,42,0.16)]">
      <div className="relative h-[220px] w-full shrink-0 overflow-hidden rounded-[16px] bg-[#EAF0FA] sm:h-[247px]">
        <Image src={item.image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 410px" className="object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="rounded-[32px] bg-[#E6EEFF] px-6 py-2.5 text-[14px] font-medium uppercase leading-6 text-[#2563EB] sm:text-[16px]">{config.tag}</span>
        <span className="rounded-[32px] bg-[#E6EEFF] px-6 py-2.5 text-[14px] font-medium uppercase leading-6 text-[#2563EB] sm:text-[16px]">{item.topic}</span>
      </div>
      <div className="flex flex-1 flex-col gap-5">
        <div className="flex flex-col gap-3">
          <h2 className="font-display text-[22px] font-bold leading-[30px] text-[#0F172A] sm:text-[24px]">{item.title}</h2>
          <p className="line-clamp-4 h-[98px] text-[15px] leading-6 text-[#636363] sm:text-[16px]">{item.description}</p>
        </div>
        <span className="mt-auto inline-flex self-start items-center gap-2 text-[16px] font-semibold leading-6 text-[#2563EB] transition-colors hover:text-[#1D4ED8]">
          Learn More <Image src="/images/icons/arrow-tr.svg" alt="" width={20} height={20} className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}

function StudyKitHero({ config, query, onQueryChange }) {
  return (
    <section className="bg-[#0F172A] text-white">
      <div className="mx-auto max-w-[1440px] px-4 pb-[50px] pt-[140px] text-center sm:px-8 lg:px-[50px] lg:pt-[150px]">
        <div className="mx-auto flex max-w-[550px] flex-col items-center gap-3 sm:inline-flex sm:min-h-[180px] sm:max-w-none sm:min-w-[550px]">
          <h1 className="font-display text-[34px] font-semibold leading-tight text-white sm:whitespace-nowrap sm:text-[48px] sm:leading-[60px]">{config.title}</h1>
          <p className="text-[16px] leading-[27px] text-white sm:w-0 sm:min-w-full sm:text-[18px]">At 365 Data Science, we support you in pursuing your goals and finding a career that fits your needs. Understand the plethora of data and AI jobs and what it takes to succeed in today&apos;s job market.</p>
        </div>
        <form onSubmit={(event) => event.preventDefault()} role="search" className="mx-auto mt-6 flex h-[60px] w-full max-w-[593px] items-center gap-3 rounded-[50px] bg-white py-1.5 pl-6 pr-1.5 text-left sm:pl-8">
          <input type="search" value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder={config.search} aria-label={config.search} className="min-w-0 flex-1 bg-transparent text-[16px] text-[#0F172A] outline-none placeholder:text-[#9BA1AA] sm:text-[18px]" />
          <button type="submit" className="h-12 shrink-0 rounded-[48px] bg-[#2563EB] px-6 text-[16px] font-medium text-white transition-colors hover:bg-[#1D4ED8] sm:px-8">Search</button>
        </form>
        <nav aria-label="Study kit resources" className="mx-auto mt-[50px] flex max-w-[1145px] gap-8 overflow-x-auto scrollbar-none lg:justify-between lg:gap-4">
          {resourceTypes.map(({ name, href, icon }) => {
            const active = config.selected === name;
            return (
              <Link key={name} href={href} aria-current={active ? "page" : undefined} className={`group flex shrink-0 flex-col items-center gap-3 text-center transition-colors ${active ? "text-[#F59E0B]" : "text-white hover:text-[#F59E0B]"}`}>
                <span className={`grid h-[72px] w-[72px] place-items-center rounded-full transition-colors sm:h-[86px] sm:w-[86px] ${active ? "bg-[#F59E0B]" : "bg-[#1C263D] group-hover:bg-[#26334F]"}`}>
                  <Image src={icon} alt="" width={40} height={40} className="h-8 w-8 sm:h-10 sm:w-10" />
                </span>
                <span className="whitespace-nowrap text-[16px] leading-6 sm:text-[22px] sm:leading-[33px]">{name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </section>
  );
}

function SkillCta() {
  return (
    <section className="flex flex-col items-center gap-8 rounded-[24px] bg-gradient-to-b from-[#D5E2FF] to-[#FFE6BD] px-6 py-14 text-center sm:px-10 lg:pb-[50px] lg:pt-20">
      <div className="flex flex-col items-center gap-3 text-[#0F172A]">
        <h2 className="max-w-[682px] font-display text-[40px] font-semibold leading-[1.25] sm:text-[52px] lg:text-[64px]">Your Next <span className="font-bold text-[#2563EB]">Skill Starts</span> Here</h2>
        <p className="max-w-[575px] text-[16px]">Build real-world skills, follow personalized career paths, and prepare for the opportunities of tomorrow all in one place.</p>
      </div>
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <Link href="/get-started" className="inline-flex items-center justify-center gap-2 rounded-[48px] bg-[#2563EB] px-6 py-4 text-[16px] font-semibold text-white transition-colors hover:bg-[#1D4ED8]">Start Learning Free <FiArrowUpRight size={20} /></Link>
        <Link href="/career-paths" className="inline-flex items-center justify-center gap-2 rounded-[48px] bg-[#F59E0B] px-6 py-4 text-[16px] font-semibold text-[#161616] transition-colors hover:bg-[#E99508]">Explore Career Paths <FiArrowUpRight size={20} /></Link>
      </div>
    </section>
  );
}

const allSections = [
  { kind: "course-notes", heading: "Course Notes", link: "All Course Notes", href: "/study-kit/course-notes", description: "Course notes are the perfect complementary online data science study materials. They help you grasp fundamental concepts, refresh your memory when preparing for exams, and get a taste of our learning style." },
  { kind: "coding-templates", heading: "Templates", link: "All Templates", href: "/study-kit/coding-templates", description: "Ready-to-use Python, SQL and Excel templates that solve common data tasks, so you can skip the setup and spend your time on the analysis that matters." },
  { kind: "infographics", heading: "Infographics", link: "All Infographics", href: "/study-kit/infographics", description: "Visual one-page summaries of key data science and AI concepts. Perfect for quick revision, sharing with your team, or pinning next to your desk." },
  { kind: "career-guides", heading: "Career Guides", link: "All Career Guides", href: "/career-kit/career-guides", description: "Practical guides to data and AI careers, from choosing a role and building a portfolio to preparing for interviews and landing your first job." },
  { kind: "practice-exams", heading: "Practice Exams", link: "All Practice Exams", href: "/study-kit/practice-exams", description: "Test what you know with timed practice exams in Python, SQL, Excel and statistics, and see exactly where to focus before the real thing." },
];

function itemsFor(kind) {
  const config = configs[kind];
  return config.titles.map((title, index) => ({ id: `${kind}-${index}`, title, topic: config.topics[index], description: config.descriptions[index], image: config.covers?.[index] ?? commonCovers[index] }));
}

function matchesQuery(item, query) {
  return `${item.title} ${item.topic} ${item.description}`.toLowerCase().includes(query.trim().toLowerCase());
}

function ResourcesCenter({ config }) {
  const [query, setQuery] = useState("");
  const sections = useMemo(() => allSections.map((section) => ({ ...section, items: itemsFor(section.kind).filter((item) => matchesQuery(item, query)).slice(0, 3) })).filter((section) => section.items.length), [query]);

  return (
    <main className="study-kit-page">
      <StudyKitHero config={config} query={query} onQueryChange={setQuery} />
      <section className="bg-white px-4 pb-16 pt-12 sm:px-8 lg:px-[50px] lg:pt-[106px]">
        <div className="mx-auto flex max-w-[1340px] flex-col gap-16 lg:gap-20">
          {sections.length ? sections.map((section) => (
            <section key={section.kind} aria-labelledby={`${section.kind}-heading`}>
              <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
                <h2 id={`${section.kind}-heading`} className="font-display text-[34px] font-semibold leading-tight text-[#0F172A] sm:text-[48px] sm:leading-[60px]">{section.heading}</h2>
                <Link href={section.href} className="group inline-flex items-center gap-2 text-[16px] font-semibold leading-[27px] text-[#2563EB] transition-colors hover:text-[#1D4ED8] sm:text-[18px]">
                  {section.link}
                  <Image src="/images/icons/arrow-tr.svg" alt="" width={20} height={20} className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
              <p className="mt-3 text-[17px] text-[#0F172A] sm:text-[20px] lg:text-[22px] lg:leading-[33px]">{section.description}</p>
              <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-[50px] lg:grid-cols-3">
                {section.items.map((item) => <ResourceCard key={item.id} item={item} config={configs[section.kind]} />)}
              </div>
            </section>
          )) : (
            <p className="rounded-2xl bg-[#F6F8FB] px-6 py-12 text-center text-[#636363]">No resources match your search. Try another keyword or topic.</p>
          )}
          <SkillCta />
        </div>
      </section>
    </main>
  );
}

export default function StudyKitResourceExperience({ kind }) {
  const config = configs[kind];
  if (kind === "all") return <ResourcesCenter config={config} />;
  return <ResourceList kind={kind} config={config} />;
}

function ResourceList({ kind, config }) {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const items = useMemo(() => itemsFor(kind), [kind]);
  const visibleItems = useMemo(() => items.filter((item) => (filter === "All" || item.topic === filter) && matchesQuery(item, query)), [filter, items, query]);

  return (
    <main className="study-kit-page">
      <StudyKitHero config={config} query={query} onQueryChange={setQuery} />
      <section className="bg-white px-4 pb-16 pt-12 sm:px-8 lg:px-[50px] lg:pt-20">
        <div className="mx-auto max-w-[1340px]">
          {config.filters.length > 0 && <div className="mb-10 flex items-center gap-8 overflow-x-auto scrollbar-none sm:justify-center lg:mb-[50px] lg:gap-20" role="group" aria-label={`Filter ${config.selected} by topic`}>
            {config.filters.map((item) => (
              <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)} className={`shrink-0 whitespace-nowrap text-[17px] font-semibold leading-[30px] transition-colors sm:text-[20px] ${filter === item ? "rounded-[45px] bg-[#0F172A] px-10 py-4 text-white" : "py-4 text-[#636363] hover:text-[#2563EB]"}`}>
                {item}
              </button>
            ))}
          </div>}
          <p className="text-[17px] text-[#0F172A] sm:text-[20px] lg:min-h-[99px] lg:text-[22px] lg:leading-[33px]">{config.intro}</p>
          {visibleItems.length ? (
            <div className={`mt-10 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:mt-[50px] lg:grid-cols-3 ${config.rowGap ?? "lg:gap-y-[50px]"}`}>
              {visibleItems.map((item) => <ResourceCard key={item.id} item={item} config={config} />)}
            </div>
          ) : (
            <p className="mt-14 rounded-2xl bg-[#F6F8FB] px-6 py-12 text-center text-[#636363]">No resources match your search. Try another keyword or topic.</p>
          )}
          <div className="mt-16 lg:mt-20">
            <SkillCta />
          </div>
        </div>
      </section>
    </main>
  );
}
