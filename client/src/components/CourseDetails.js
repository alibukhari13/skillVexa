"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/SiteConfig";
import Reveal from "@/components/Reveal";
import SuccessCard from "@/components/SuccessCard";

const sectionTabs = [
  { id: "overview", label: "Courses Overview" },
  { id: "certificate", label: "Certificate" },
  { id: "how-it-works", label: "How it Works" },
  { id: "reviews", label: "Reviews" },
];

function VideoPreview({ src, alt, className = "" }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      <Image src={src} alt={alt} fill sizes="474px" className="object-cover" />
      <div className="absolute inset-0 bg-black/10" />
      <span className="absolute left-1/2 top-1/2 flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 backdrop-blur-[2px] transition-transform duration-300 hover:scale-105">
        <Image
          src="/images/course-details/play.svg"
          alt=""
          width={72}
          height={72}
          className="h-[72px] w-[72px]"
        />
      </span>
    </div>
  );
}

export default function CourseDetails({ course }) {
  const details = siteConfig.courseDetails;
  const [expanded, setExpanded] = useState(false);
  const [openSection, setOpenSection] = useState(0);
  const [activeNav, setActiveNav] = useState("overview");
  const [howTab, setHowTab] = useState(details.howItWorks.tabs[0].id);

  const howContent = details.howItWorks.tabs.find((tab) => tab.id === howTab);
  const rowOne = siteConfig.stories.items.slice(0, 8);
  const rowTwo = siteConfig.stories.items.slice(8, 16);
  const instructorNames = details.instructorsLine;
  const skillLevel = course.difficulty === "Beginner" ? "Basic" : course.difficulty || "Basic";

  const enrolledCount = course.enrolled || details.enrolled;

  function scrollTo(id) {
    setActiveNav(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="bg-white">
      <section className="px-4 sm:px-6 lg:px-[50px] pt-8 sm:pt-10">
        <div className="mx-auto max-w-[1340px]">
          <Reveal>
            <nav className="flex items-center gap-2 text-base leading-6 font-medium">
              <Link href="/courses" className="text-[#0F172A] hover:text-[#2563EB] transition-colors">
                Courses
              </Link>
              <Image
                src="/images/course-details/chevron-right.svg"
                alt=""
                width={24}
                height={24}
                className="h-6 w-6"
              />
              <span className="text-[#757575]">{course.title}</span>
            </nav>
          </Reveal>

          <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_567px] lg:gap-10">
            <div>
              <Reveal>
                <div className="flex flex-wrap gap-3">
                  {details.tags.map((tag) => (
                    <span
                      key={tag.label}
                      className={`inline-flex h-[37px] items-center rounded-full px-6 text-sm leading-[21px] font-medium ${
                        tag.tone === "blue"
                          ? "bg-[#ECF5FF] text-[#2563EB]"
                          : "bg-[#F5F5F5] text-[#161616]"
                      }`}
                    >
                      {course.badge && tag.tone === "blue"
                        ? course.badge.label.toUpperCase()
                        : tag.label}
                    </span>
                  ))}
                </div>

                <h1 className="mt-3 max-w-[530px] font-display text-[32px] font-semibold leading-[1.25] text-[#0F172A] sm:text-4xl lg:text-[48px] lg:leading-[60px]">
                  {course.headline}
                </h1>
                <p className="mt-3 max-w-[530px] text-base leading-6 text-[#636363]">
                  {course.heroDescription || course.description}
                </p>
                <p className="mt-4 text-base leading-6 font-medium text-[#161616]">
                  with{" "}
                  {instructorNames.map((name, index) => (
                    <span key={name}>
                      <span className="font-semibold text-[#2563EB]">{name}</span>
                      {index === 0 ? " and " : ""}
                    </span>
                  ))}
                </p>
              </Reveal>

              <Reveal>
                <div className="mt-6 flex flex-col gap-6">
                  <Link
                    href="/get-started"
                    className="inline-flex h-12 w-fit items-center gap-1.5 rounded-full bg-[#2563EB] px-8 text-base leading-6 font-medium text-white transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#1d4ed8]"
                  >
                    Start Learning Free
                    <Image
                      src="/images/course-details/cta-arrow.svg"
                      alt=""
                      width={18}
                      height={18}
                      className="h-[18px] w-[18px]"
                    />
                  </Link>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[28px] font-semibold leading-[42px] text-[#0F172A]">
                      {course.rating}
                    </span>
                    <Image
                      src="/images/course-details/stars-row.svg"
                      alt=""
                      width={152}
                      height={28}
                      className="h-7 w-[152px]"
                    />
                    <span className="text-base leading-6 font-medium text-[#0F172A]">
                      870 reviews on
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-base leading-6 font-medium text-black">
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
              <div className="relative h-[240px] overflow-hidden rounded-3xl sm:h-[320px] lg:h-[397px]">
                <Image
                  src={course.heroImage}
                  alt={course.title}
                  fill
                  sizes="567px"
                  className="object-cover"
                  priority
                />
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="mt-6 flex flex-col gap-3 text-base leading-6 font-medium text-[#0F172A] sm:flex-row sm:gap-8">
              <span className="inline-flex items-center gap-2">
                <Image
                  src="/images/course-details/icon-students.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
                {enrolledCount}
              </span>
              <span className="inline-flex items-center gap-2">
                <Image
                  src="/images/course-details/icon-globe.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
                {details.languages}
              </span>
            </div>
          </Reveal>

          <div className="mt-10 border-t border-[#E5E5E5] pt-8">
            <Reveal>
              <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:justify-items-stretch">
                {[
                  {
                    icon: "/images/course-details/stat-level.svg",
                    label: "Skill level:",
                    value: skillLevel,
                  },
                  {
                    icon: "/images/course-details/stat-duration.svg",
                    label: "Duration:",
                    value: course.duration,
                  },
                  {
                    icon: "/images/course-details/stat-cpe.svg",
                    label: "CPE Credits:",
                    value: details.cpeCredits,
                  },
                  {
                    icon: "/images/course-details/stat-cert.svg",
                    label: "Accredited",
                    value: "Certificate",
                  },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center gap-3 text-center">
                    <Image src={stat.icon} alt="" width={48} height={48} className="h-12 w-12" />
                    <div>
                      <p className="text-base leading-6 font-medium text-[#161616]">{stat.label}</p>
                      <p className="text-lg leading-[27px] font-semibold text-[#2563EB]">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 xl:grid-cols-[567px_minmax(0,1fr)]">
            <Reveal>
              <div className="rounded-2xl bg-white p-6 shadow-[0_0_12px_rgba(0,0,0,0.16)]">
                <h2 className="font-display text-[32px] font-semibold leading-[50px] text-[#0F172A] lg:text-[40px]">
                  What you learn
                </h2>
                <ul className="mt-8 flex flex-col gap-4">
                  {details.learnItems.map((item) => (
                    <li key={item} className="flex items-start gap-4">
                      <Image
                        src="/images/course-details/check.svg"
                        alt=""
                        width={24}
                        height={24}
                        className="mt-0.5 h-6 w-6 shrink-0"
                      />
                      <p className="text-lg leading-[27px] text-[#636363]">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <div className="flex flex-col gap-6">
              <Reveal>
                <div className="rounded-xl bg-white p-6 shadow-[0_0_12px_rgba(0,0,0,0.16)]">
                  <h2 className="font-display text-[32px] font-semibold leading-[50px] text-[#0F172A] lg:text-[40px]">
                    Topics
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-4">
                    {details.topics.map((topic) => (
                      <span
                        key={topic}
                        className="inline-flex h-[45px] items-center rounded-full bg-[#ECF5FF] px-6 text-sm leading-[21px] font-medium text-[#2563EB]"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="rounded-xl bg-white p-6 shadow-[0_0_12px_rgba(0,0,0,0.16)]">
                  <h2 className="font-display text-[32px] font-semibold leading-[50px] text-[#0F172A] lg:text-[40px]">
                    Your instructor
                  </h2>
                  <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-center">
                    <div className="relative h-[168px] w-[170px] shrink-0 overflow-hidden rounded-xl">
                      <Image
                        src={details.instructor.image}
                        alt={details.instructor.name}
                        fill
                        sizes="170px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-2xl leading-9 font-medium text-[#161616]">
                            {details.instructor.name}
                          </h3>
                          <Link href={details.instructor.linkedin} aria-label="LinkedIn">
                            <Image
                              src="/images/course-details/linkedin.svg"
                              alt=""
                              width={32}
                              height={32}
                              className="h-8 w-8"
                            />
                          </Link>
                        </div>
                        <p className="mt-2 text-base leading-6 text-[#636363]">
                          {details.instructor.role}
                        </p>
                      </div>
                      <Link
                        href="/contact-us"
                        className="inline-flex h-12 w-fit items-center gap-1.5 rounded-full bg-[#F59E0B] px-8 text-base leading-6 font-medium text-[#161616] transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#d97706]"
                      >
                        <Image
                          src="/images/course-details/message.svg"
                          alt=""
                          width={24}
                          height={24}
                          className="h-6 w-6"
                        />
                        Ask {details.instructor.firstName} a Question
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-[50px] pt-12">
        <div className="mx-auto max-w-[1340px]">
          <div className="min-w-0 max-w-full overflow-x-auto overscroll-x-contain border-b border-[#E5E5E5] scrollbar-none">
            <div className="flex w-max min-w-full gap-6 lg:w-full lg:justify-start lg:gap-x-[200px]">
            {sectionTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => scrollTo(tab.id)}
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

          <div id="overview" className="scroll-mt-28 pt-10">
            <Reveal>
              <h2 className="font-display text-[32px] font-semibold leading-[60px] text-[#0F172A] lg:text-[48px]">
                Course Overview
              </h2>
              <h3 className="mt-4 text-[28px] leading-[42px] font-medium text-[#0F172A]">
                Description:
              </h3>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px] leading-[23px] text-[#636363]">
                <span>CPE Credits: {details.cpeCredits}</span>
                <span className="inline-flex items-center gap-3">
                  <span className="h-[7px] w-[7px] rounded-full bg-[#D9D9D9]" />
                  Field of Study: {details.fieldOfStudy}
                </span>
                <span className="inline-flex items-center gap-3">
                  <span className="h-[7px] w-[7px] rounded-full bg-[#D9D9D9]" />
                  Delivery Method: {details.deliveryMethod}
                </span>
              </div>
              <div className="mt-6 max-w-[841px] space-y-4 text-lg leading-[27px] text-[#636363]">
                <p>{details.overviewParagraphs[0]}</p>
                {expanded ? (
                  <p>{details.overviewParagraphs[1]}</p>
                ) : (
                  <p>{details.overviewParagraphs[1]}</p>
                )}
                <button
                  type="button"
                  onClick={() => setExpanded(!expanded)}
                  className="font-[family-name:var(--font-inter)] text-xl leading-6 font-semibold text-[#2563EB] transition-colors hover:text-[#1d4ed8]"
                >
                  {expanded ? "See Less" : "See More"}
                </button>
              </div>
            </Reveal>

            <div className="mt-10 grid items-start gap-6 xl:grid-cols-[minmax(0,841px)_474px]">
              <Reveal>
                <div className="rounded-xl bg-[#F8FAFC] px-4 py-6 shadow-[0_0_12px_rgba(0,0,0,0.12)] sm:px-8 sm:py-6">
                  <div className="flex flex-wrap gap-x-10 gap-y-2 text-2xl leading-9 font-medium text-[#161616]">
                    <span>{details.curriculumStats.lessons}</span>
                    <span>{details.curriculumStats.exercises}</span>
                    <span>{details.curriculumStats.exams}</span>
                  </div>
                  <div className="mt-4 h-px bg-[#EFEFEF]" />

                  {details.curriculum.map((section, index) => {
                    const isOpen = openSection === index;
                    return (
                      <div key={section.title} className={index === 0 ? "mt-6" : "mt-5"}>
                        <button
                          type="button"
                          onClick={() => setOpenSection(isOpen ? -1 : index)}
                          className="flex w-full items-center gap-4 text-left"
                        >
                          <span className="text-[28px] leading-[42px] font-medium text-[#161616]">
                            {index + 1}.
                          </span>
                          <span className="flex-1 text-xl leading-[42px] font-medium text-[#0F172A] sm:text-[28px]">
                            {section.title}
                          </span>
                          <Image
                            src="/images/icons/chevron-down-dark.svg"
                            alt=""
                            width={32}
                            height={32}
                            className={`h-8 w-8 shrink-0 transition-transform duration-300 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <div
                          className={`grid transition-all duration-300 ${
                            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            {section.lessons?.length ? (
                              <>
                                <p className="mt-4 text-lg leading-[27px] text-[#636363]">
                                  {details.curriculumIntro}
                                </p>
                                <div className="mt-6 h-px bg-[#EFEFEF]" />
                                <ul className="mt-6 space-y-[24px]">
                                  {section.lessons.map((lesson) => (
                                    <li
                                      key={lesson.title}
                                      className="flex items-center justify-between gap-4"
                                    >
                                      <span className="inline-flex items-center gap-3 text-xl leading-[30px] font-medium text-[#161616]">
                                        {lesson.title}
                                        <Image
                                          src={
                                            lesson.icon === "pin"
                                              ? "/images/course-details/pin.svg"
                                              : "/images/course-details/lesson-play.svg"
                                          }
                                          alt=""
                                          width={25}
                                          height={25}
                                          className="h-[25px] w-[25px]"
                                        />
                                      </span>
                                      <span className="text-lg leading-[27px] font-medium text-[#2563EB]">
                                        Free
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                                <div className="mt-6 h-px bg-[#EFEFEF]" />
                              </>
                            ) : (
                              <p className="mt-3 text-base leading-6 text-[#636363]">
                                Additional lessons unlock after you start the course.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Reveal>

              <Reveal>
                <VideoPreview
                  src={course.previewImage}
                  alt={`${course.title} preview`}
                  className="h-[220px] sm:h-[293px]"
                />
              </Reveal>
            </div>
          </div>

          <div id="certificate" className="scroll-mt-28 mt-16">
            <Reveal>
              <h2 className="text-center font-display text-[32px] font-semibold leading-[60px] text-[#0F172A] lg:text-[48px]">
                Accredited Certificates
              </h2>
            </Reveal>
            <div className="mt-10 grid items-center gap-10 lg:grid-cols-[540px_minmax(0,1fr)]">
              <Reveal>
                <div className="flex flex-col gap-6">
                  {details.certificates.paragraphs.map((text) => (
                    <p key={text} className="text-xl leading-9 text-[#636363] sm:text-2xl sm:leading-9">
                      {text}
                    </p>
                  ))}
                  <Link
                    href="/courses"
                    className="inline-flex h-14 w-fit items-center gap-2 rounded-full bg-[#F59E0B] px-8 text-base leading-6 font-semibold text-[#161616] transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#d97706]"
                  >
                    Explore Courses
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
              <Reveal>
                <div className="relative mx-auto h-[360px] w-full max-w-[680px] sm:h-[430px]">
                  <Image
                    src={details.certificates.images[0]}
                    alt="Course certificate"
                    width={498}
                    height={354}
                    className="absolute left-0 top-6 w-[72%] max-w-[498px] rounded-3xl shadow-[0_4px_19px_rgba(0,0,0,0.25)]"
                  />
                  <Image
                    src={details.certificates.images[1]}
                    alt="Certificate preview"
                    width={255}
                    height={488}
                    className="absolute right-0 top-0 w-[38%] max-w-[255px]"
                  />
                </div>
              </Reveal>
            </div>
          </div>

          <div id="how-it-works" className="scroll-mt-28 mt-16">
            <Reveal>
              <h2 className="text-center font-display text-[32px] font-semibold leading-[60px] text-[#0F172A] lg:text-[48px]">
                How It Works
              </h2>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                {details.howItWorks.tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setHowTab(tab.id)}
                    className={`h-[62px] rounded-full px-8 text-xl leading-[30px] font-semibold transition-all duration-300 ${
                      howTab === tab.id
                        ? "bg-[#0F172A] text-white"
                        : "text-[#636363] hover:text-[#0F172A]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </Reveal>

            <div className="mt-10 grid items-center gap-10 lg:grid-cols-[540px_minmax(0,1fr)]">
              <Reveal>
                <div className="max-w-[540px]">
                  <h3 className="font-display text-[32px] font-semibold leading-[50px] text-[#0F172A] lg:text-[40px]">
                    {howContent.title}
                  </h3>
                  <p className="mt-3 text-[20px] leading-[33px] text-[#636363] sm:text-[22px]">
                    {howContent.body}
                  </p>
                  <Link
                    href="/courses"
                    className="mt-6 inline-flex items-center gap-3 text-xl leading-[30px] font-semibold text-[#2563EB] transition-colors hover:text-[#1d4ed8]"
                  >
                    Explore Courses
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
              <Reveal>
                <VideoPreview
                  src={howContent.image}
                  alt={howContent.title}
                  className="h-[220px] sm:h-[293px] max-w-[474px] ml-auto"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="scroll-mt-28 px-4 sm:px-6 lg:px-[50px] py-[50px] overflow-hidden">
        <Reveal>
          <h2 className="text-center font-display text-[32px] font-semibold leading-[60px] text-[#0F172A] lg:text-[48px]">
            Student Reviews
          </h2>
        </Reveal>
        <Reveal className="min-w-0 max-w-full">
          <div className="stories-edge-mask mt-8 -mx-4 min-w-0 overflow-x-auto overscroll-x-contain scrollbar-none sm:-mx-6 lg:-mx-[50px]">
            <div className="flex w-max min-w-[1100px] flex-col gap-6 px-4 lg:min-w-[1592px] lg:px-0">
              <div className="flex justify-center gap-4">
                {rowOne.map((story, index) => (
                  <div
                    key={`${story.name}-r1-${index}`}
                    className={`w-[185px] ${index === 0 || index === rowOne.length - 1 ? "animate-float-y" : ""}`}
                  >
                    <SuccessCard story={story} />
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-4">
                {rowTwo.map((story, index) => (
                  <div
                    key={`${story.name}-r2-${index}`}
                    className={`w-[185px] ${index === 0 || index === rowTwo.length - 1 ? "animate-float-y-delayed" : ""}`}
                  >
                    <SuccessCard story={story} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
