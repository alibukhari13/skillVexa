"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/SiteConfig";
import Reveal from "@/components/Reveal";

const MEGHAN_ROLE =
  "Director, Translational Medicine and Data Management at KaliVir Immunotherapeutics (Canada)";
const MATT_ROLE = "Analyst at Movement Mortgage (US)";
const EXCEL_QUOTE =
  '"My skills, particularly in Excel, have drastically improved, earning me two promotions.It requires dedication and a set schedule, but I highly recommend Data 365 for anyone looking to advance their career."';
const LONG_QUOTE =
  "In 2021, I took a pivotal step in my professional and academic life by signing up with 365DataScience. At the time, the world was still affected by the COVID-19 pandemic, with many face-to-face activities very limited. I figured I had extra time and decided to expand my knowledge. I had previously completed several introductory courses, but this program helped me connect the theory to real workplace projects, dashboards, and interviews.";
const LONG_PREVIEW =
  "In 2021, I took a pivotal step in my professional and academic life by signing up with 365DataScience. At the time, the world was still affected by the COVID-19 pandemic, with many face-to-face activities very limited. I figured I had extra time and decided to expand my knowledge. I had previously...";

const columns = [
  [
    {
      id: "meghan-v",
      type: "photo",
      name: "Meghan V.",
      role: MEGHAN_ROLE,
      quote:
        "“Data analysts are the navigators of modern business—turning streams of data into clear direction and competitive advantage. Their insights drive smarter strategies, sharper decisions, and faster growth, making analytics one of today’s most impactful careers.”",
      image: "/images/reviews/review-photo-1.png",
    },
    {
      id: "meghan-n-orange",
      type: "quote",
      name: "Meghan N.",
      role: MEGHAN_ROLE,
      initials: "MN",
      avatar: "#F59E0B",
      quote: LONG_QUOTE,
      preview: LONG_PREVIEW,
    },
    {
      id: "matt-left",
      type: "photo",
      name: "Matt M.",
      role: MATT_ROLE,
      quote: EXCEL_QUOTE,
      image: "/images/reviews/review-photo-6.png",
    },
  ],
  [
    {
      id: "meghan-n-blue",
      type: "quote",
      name: "Meghan N.",
      role: MEGHAN_ROLE,
      initials: "MN",
      avatar: "#2563EB",
      quote: LONG_QUOTE,
      preview: LONG_PREVIEW,
    },
    {
      id: "matt-mid-1",
      type: "photo",
      name: "Matt M.",
      role: MATT_ROLE,
      quote: EXCEL_QUOTE,
      image: "/images/reviews/review-photo-3.png",
    },
    {
      id: "matt-mid-2",
      type: "photo",
      name: "Matt M.",
      role: MATT_ROLE,
      quote: EXCEL_QUOTE,
      image: "/images/reviews/review-photo-5.png",
    },
  ],
  [
    {
      id: "matt-right-1",
      type: "photo",
      name: "Matt M.",
      role: MATT_ROLE,
      quote: EXCEL_QUOTE,
      image: "/images/reviews/review-photo-2.png",
    },
    {
      id: "matt-right-2",
      type: "photo",
      name: "Matt M.",
      role: MATT_ROLE,
      quote:
        "\"I completed several career tracks, mastering tools like Scikit-Learn and TensorFlow for various analytics tasks. Now, I'm applying these skills daily as a data scientist at an EV startup, significantly aided by the training and certifications from 365 Data Science.\"",
      image: "/images/reviews/review-photo-4.png",
    },
  ],
];

function PlayButton() {
  return (
    <Link
      href="/stories"
      aria-label="View story"
      className="absolute left-1/2 top-1/2 z-[2] h-[86px] w-[86px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 hover:scale-105"
    >
      <Image src="/images/reviews/play.svg" alt="" width={86} height={86} className="h-full w-full" />
    </Link>
  );
}

function QuoteBody({ review }) {
  const [open, setOpen] = useState(false);
  if (!review.preview) {
    return (
      <p className="text-xl font-medium leading-[30px] text-[#0F172A]">{review.quote}</p>
    );
  }

  return (
    <p className="text-xl font-medium leading-[30px] text-[#0F172A]">
      {open ? review.quote : review.preview}{" "}
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="font-medium text-[#2563EB] transition-colors hover:text-[#1d4ed8]"
      >
        {open ? "See Less" : "See More"}
      </button>
    </p>
  );
}

function ReviewCard({ review, delay }) {
  if (review.type === "quote") {
    return (
      <Reveal delay={delay}>
        <article className="min-w-0 rounded-xl bg-white p-4 shadow-[0_0_12px_rgba(0,0,0,0.16)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_28px_rgba(15,23,42,0.14)]">
          <div className="flex items-start gap-3">
            <span
              className="inline-flex h-[94px] w-[94px] shrink-0 items-center justify-center rounded-full text-[32px] font-medium leading-[48px] text-white"
              style={{ backgroundColor: review.avatar }}
            >
              {review.initials}
            </span>
            <div className="min-w-0 pt-1">
              <h3 className="text-[32px] font-medium leading-[48px] text-[#161616]">{review.name}</h3>
              <p className="truncate text-lg leading-[27px] text-[#636363]">{review.role}</p>
            </div>
          </div>
          <div className="mt-4">
            <QuoteBody review={review} />
          </div>
        </article>
      </Reveal>
    );
  }

  return (
    <Reveal delay={delay}>
      <article className="min-w-0 overflow-hidden rounded-xl bg-white shadow-[0_0_12px_rgba(0,0,0,0.16)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_28px_rgba(15,23,42,0.14)]">
        <div className="relative h-[300px] overflow-hidden sm:h-[380px] xl:h-[461px]">
          <Image
            src={review.image}
            alt={review.name}
            fill
            sizes="(max-width: 768px) 100vw, 433px"
            className="object-cover transition-transform duration-700 ease-out hover:scale-[1.04]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[273px] bg-[linear-gradient(360deg,#000000_0%,rgba(51,51,51,0.5)_50%,rgba(102,102,102,0)_100%)]" />
          <PlayButton />
          <div className="absolute inset-x-0 bottom-0 z-[2] px-4 pb-5">
            <h3 className="text-[28px] font-medium leading-10 text-white sm:text-[32px] sm:leading-[48px]">
              {review.name}
            </h3>
            <p className="truncate text-base leading-6 text-white sm:text-lg sm:leading-[27px]">
              {review.role}
            </p>
          </div>
        </div>
        <div className="px-4 py-5">
          <QuoteBody review={review} />
        </div>
      </article>
    </Reveal>
  );
}

export default function ReviewsPage() {
  const logos = [
    siteConfig.employers.find((item) => item.name === "Facebook"),
    siteConfig.employers.find((item) => item.name === "Google"),
    siteConfig.employers.find((item) => item.name === "YouTube"),
    siteConfig.employers.find((item) => item.name === "Facebook"),
    siteConfig.employers.find((item) => item.name === "Pinterest"),
    siteConfig.employers.find((item) => item.name === "Webflow"),
    siteConfig.employers.find((item) => item.name === "Facebook"),
  ].filter(Boolean);

  return (
    <div className="min-w-0 bg-white">
      <section className="relative -mt-[86px] overflow-hidden sm:-mt-[94px]">
        <div className="relative min-h-[560px] sm:min-h-[620px] xl:min-h-[676px]">
          <Image
            src="/images/reviews/hero-mosaic.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0F172A]/70" />

          <div className="relative z-10 mx-auto flex min-h-[560px] w-full max-w-[1440px] flex-col justify-between px-4 pb-8 pt-[140px] sm:min-h-[620px] sm:px-6 sm:pt-[160px] lg:px-[50px] xl:min-h-[676px] xl:pt-[189px] xl:pb-10">
            <div className="mx-auto flex max-w-[771px] flex-col items-center gap-8 text-center">
              <div className="flex flex-col items-center gap-3">
                <h1 className="font-display text-[32px] font-semibold leading-10 text-white sm:text-4xl sm:leading-[48px] xl:text-[48px] xl:leading-[60px]">
                  Real Stories. Real Success.
                </h1>
                <p className="max-w-[771px] text-base leading-6 text-white sm:text-lg sm:leading-[27px]">
                  Meet 3,000,000+ learners who achieve their career goals with us. Want to share
                  your success story in our 365 Data Science reviews? We&apos;d love to hear from you!
                </p>
              </div>
              <Link
                href="/stories"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#2563EB] px-8 text-base font-medium leading-6 text-white transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#1d4ed8]"
              >
                Share Your Story
              </Link>
            </div>

            <div className="mt-10">
              <p className="text-center font-[family-name:var(--font-inter)] text-lg font-semibold leading-6 text-white sm:text-xl">
                Our Graduates Work at
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:justify-between lg:gap-x-10">
                {logos.map((logo, index) => (
                  <Image
                    key={`${logo.name}-${index}`}
                    src={logo.src}
                    alt={logo.name}
                    width={logo.width}
                    height={logo.height}
                    className="h-7 w-auto brightness-0 invert sm:h-[34px]"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-12 lg:px-[50px] lg:py-16">
        <div className="mx-auto grid w-full min-w-0 max-w-[1340px] grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex min-w-0 flex-col gap-5">
              {column.map((review, index) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  delay={columnIndex * 80 + index * 70}
                />
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
