"use client";

import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/SiteConfig";
import Reveal from "@/components/Reveal";


const HERO_TITLE = "Over 3M Students with a Story to Tell";
const HERO_SUBTITLE =
  "Meet students who have successfully started their data science careers after studying with 365. Get inspired to land your data science internship, or even a data industry.";

const STORY_TITLE = "Became a Data Analyst Without a STEM Degree";
const STORY_QUOTE =
  "Most people think that to be successful, it is necessary to have a mathematics, engineering, or computer science background. But this is a very incomplete thought. A lot of accomplished people in this domain come from non-STEM fields. I am one of the examples. Most people think that to be successful, it is necessary to have a mathematics, engineering, or computer science background. But this is a very incomplete thought. A lot of accomplished people in this domain come from non-STEM fields. I am one of the examples.";
const STORY_BIO =
  "Data analysts are the navigators of modern business—turning streams of data into clear direction and competitive advantage. Their insights drive smarter strategies, sharper decisions, and faster growth, making analytics one of today’s most impactful careers.";

const COURSES = [
  "Introduction to Tableau",
  "Introduction to Python",
  "Machine Learning in Python",
];

const STATS = [
  { value: "3M", label: "Students Worldwide" },
  { value: "251K", label: "Courses Completed" },
  { value: "270K", label: "Certificates Earned" },
];

const STORIES = [
  {
    id: "serhan-1",
    name: "Serhan Tanriverdi",
    image: "/images/stories/student-1.png",
    imageRight: false,
  },
  {
    id: "serhan-2",
    name: "Serhan Tanriverdi",
    image: "/images/stories/student-2.png",
    imageRight: true,
  },
  {
    id: "serhan-3",
    name: "Serhan Tanriverdi",
    image: "/images/stories/student-3.png",
    imageRight: false,
  },
  {
    id: "serhan-4",
    name: "Serhan Tanriverdi",
    image: "/images/stories/student-4.png",
    imageRight: true,
  },
];

function HeroFade({ children, className = "", delay = 0 }) {
  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className={`animate-fade-up ${className}`}
    >
      {children}
    </div>
  );
}

function StoryPanel() {
  return (
    <div className="flex h-full min-w-0 flex-col rounded-2xl bg-white p-5 shadow-[0_0_16px_rgba(0,0,0,0.16)] transition-shadow duration-300 hover:shadow-[0_8px_28px_rgba(15,23,42,0.16)] sm:p-6 xl:min-h-[654px]">
      <h3 className="font-display text-[28px] font-semibold leading-9 text-[#0F172A] sm:text-[32px] sm:leading-10 xl:text-[40px] xl:leading-[50px]">
        {STORY_TITLE}
      </h3>

      <div className="mt-6 flex flex-col gap-4 min-[500px]:flex-row min-[500px]:items-start min-[500px]:gap-8 xl:mt-6 xl:gap-[44px]">
        <div className="flex shrink-0 flex-col items-center justify-between min-[500px]:h-[134px]">
          <p className="text-[48px] font-semibold leading-[56px] text-[#2563EB] sm:text-[56px] sm:leading-[64px] xl:text-[72px] xl:leading-[80px]">
            22
          </p>
          <p className="text-center text-base font-medium leading-6 text-[#0F172A] sm:text-lg sm:leading-[27px]">
            Courses
            <br />
            taken
          </p>
        </div>

        <div className="flex min-w-0 flex-1 flex-wrap content-start gap-x-[22px] gap-y-[14px]">
          {COURSES.map((course) => (
            <span
              key={course}
              className="inline-flex h-12 min-w-0 items-center justify-center rounded-full border border-[#0F172A] px-5 text-center text-sm font-medium leading-6 text-[#0F172A] transition-colors duration-300 hover:border-[#2563EB] hover:text-[#2563EB] max-[499px]:w-full sm:h-[58px] sm:px-[25px] sm:text-base"
            >
              {course}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-10 h-px w-full bg-[#E4E4E4] xl:mt-[50px]" />

      <Image
        src="/images/stories/quote.svg"
        alt=""
        width={40}
        height={40}
        className="mt-10 h-10 w-10 xl:mt-[50px]"
      />

      <p className="mt-6 font-[family-name:var(--font-inter)] text-base leading-6 text-[#636363] sm:text-lg sm:leading-[22px] xl:text-xl xl:leading-6">
        {STORY_QUOTE}
      </p>
    </div>
  );
}

function StoryRow({ story, delay }) {
  return (
    <Reveal delay={delay}>
      <article
        id={story.id}
        className={`flex min-w-0 scroll-mt-28 flex-col gap-5 lg:flex-row lg:items-start lg:gap-5 ${
          story.imageRight ? "lg:flex-row-reverse" : ""
        }`}
      >
        <div className="w-full min-w-0 lg:w-[40.8%] lg:max-w-[547px] lg:shrink-0">
          <div className="relative aspect-[547/408] overflow-hidden rounded-2xl">
            <Image
              src={story.image}
              alt={story.name}
              fill
              sizes="(max-width: 1023px) 100vw, 547px"
              className="object-cover transition-transform duration-700 ease-out hover:scale-[1.04]"
            />
          </div>
          <h4 className="mt-6 text-[24px] font-medium leading-8 text-[#161616] sm:text-[28px] sm:leading-10 xl:text-[32px] xl:leading-[48px]">
            {story.name}
          </h4>
          <p className="mt-3 text-base leading-6 text-[#0F172A] sm:text-lg sm:leading-[27px]">
            {STORY_BIO}
          </p>
          <Link
            href={`#${story.id}`}
            className="group mt-6 inline-flex items-center gap-2 text-base font-semibold leading-6 text-[#2563EB] transition-all duration-300 hover:text-[#1d4ed8]"
          >
            See Details
            <svg
              width="20"
              height="20"
              viewBox="0 0 40 40"
              fill="none"
              aria-hidden="true"
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              <path
                d="M10.0001 31.6666L31.6667 9.99993M10.8667 9.99993H31.6667V30.7999"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <div className="min-w-0 flex-1">
          <StoryPanel />
        </div>
      </article>
    </Reveal>
  );
}

export default function SuccessStoriesPage() {
  return (
    <div className="min-w-0 overflow-x-clip bg-white">
      <section className="relative -mt-[86px] overflow-hidden sm:-mt-[94px]">
        <div className="relative min-h-[560px] sm:min-h-[620px] xl:min-h-[677px]">
          <Image
            src="/images/reviews/hero-mosaic.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0F172A]/70" />

          <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col px-4 pb-8 pt-[130px] sm:px-6 sm:pb-10 sm:pt-[160px] lg:px-[50px] xl:min-h-[677px] xl:pb-[50px] xl:pt-[244px]">
            <HeroFade className="mx-auto flex w-full max-w-[855px] flex-col items-center gap-8 text-center">
              <div className="flex w-full flex-col items-center gap-3">
                <h1 className="font-display text-[32px] font-semibold leading-10 text-white sm:text-4xl sm:leading-[48px] xl:text-[48px] xl:leading-[60px]">
                  {HERO_TITLE}
                </h1>
                <p className="w-full text-base leading-6 text-white sm:text-lg sm:leading-[27px]">
                  {HERO_SUBTITLE}
                </p>
              </div>
              <Link
                href={`mailto:${siteConfig.email}?subject=Share%20Your%20Story`}
                className="inline-flex h-12 w-full max-w-[197px] items-center justify-center rounded-full bg-[#2563EB] px-8 text-base font-medium leading-6 text-white transition-all duration-300 hover:-translate-y-px hover:bg-[#1d4ed8]"
              >
                Share Your Story
              </Link>
            </HeroFade>

            <div className="mx-auto mt-10 flex w-full max-w-[855px] flex-col gap-3 sm:mt-12 md:flex-row md:gap-4 xl:mt-[50px] xl:justify-between xl:gap-[61px]">
              {STATS.map((stat, index) => (
                <HeroFade
                  key={stat.label}
                  delay={180 + index * 90}
                  className="min-w-0 md:flex-1 xl:w-[244px] xl:flex-none"
                >
                  <div className="flex h-auto min-h-[100px] w-full flex-col items-center justify-center rounded-xl bg-[linear-gradient(180deg,#D5E2FF_0%,#FFE6BD_100%)] px-4 py-3 sm:min-h-[110px] xl:h-[127px] xl:px-8 xl:py-3.5">
                    <p className="text-[36px] font-medium leading-[48px] text-[#0F172A] sm:text-[40px] sm:leading-[56px] xl:text-[48px] xl:leading-[72px]">
                      {stat.value}
                    </p>
                    <p className="text-center text-sm leading-5 text-[#0F172A] sm:text-base sm:leading-6 xl:text-lg xl:leading-[27px]">
                      {stat.label}
                    </p>
                  </div>
                </HeroFade>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="inspirational-stories"
        className="px-4 py-10 sm:px-6 sm:py-12 lg:px-[50px] lg:pb-16 lg:pt-[50px]"
      >
        <Reveal>
          <h2 className="mx-auto max-w-[633px] text-center font-display text-[32px] font-semibold leading-10 text-[#0F172A] sm:text-4xl sm:leading-[48px] xl:text-[48px] xl:leading-[60px]">
            Inspirational Data Science Success Stories
          </h2>
        </Reveal>

        <div className="mx-auto mt-10 flex w-full min-w-0 max-w-[1340px] flex-col gap-12 sm:mt-12 lg:mt-[87px] lg:gap-[70px]">
          {STORIES.map((story, index) => (
            <StoryRow key={story.id} story={story} delay={index * 80} />
          ))}
        </div>
      </section>
    </div>
  );
}
