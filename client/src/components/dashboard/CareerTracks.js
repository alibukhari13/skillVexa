"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { FiAward, FiChevronDown, FiChevronLeft, FiChevronRight, FiPlayCircle } from "react-icons/fi";
import { PageContainer } from "@/components/dashboard/DashboardShell";
import DashboardCourseCard from "@/components/dashboard/DashboardCourseCard";
import { courseById, getTrackDetails } from "@/config/AdminContent";
import { dashboardTracks } from "@/config/DashboardData";

function TrackSlider({ track }) {
  const [expanded, setExpanded] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const rail = useRef(null);
  const courses = track.courses.map((id) => courseById[id]).filter(Boolean);
  const overview = getTrackDetails(track.id)?.overview || [];

  const updateEdges = () => {
    const el = rail.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  };
  const scroll = (direction) => {
    const el = rail.current;
    if (el) el.scrollBy({ left: direction * el.clientWidth, behavior: "smooth" });
  };

  const arrow = "grid h-[33px] w-[33px] place-items-center rounded-full border-[1.5px] transition-colors disabled:cursor-default";

  return (
    <section id={track.id} className="scroll-mt-24 rounded-[15px] bg-[#F0F0F2] px-5 py-10 sm:px-10 lg:px-[55px] lg:py-[60px] desk:px-[87px]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-[24px] font-semibold text-[#0F172A]">{track.title}</h3>
        <Link
          href={`/admin/career-tracks/${track.id}`}
          className="inline-flex h-11 min-w-[200px] items-center justify-center rounded-[5px] bg-[#2563EB] px-5 text-[16px] font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
        >
          Get Started
        </Link>
      </div>

      <div className="relative mt-[33px]">
        <div className={`space-y-4 text-[16px] leading-6 text-[#748190] ${expanded ? "" : "line-clamp-2"}`}>
          {overview.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-2 flex justify-center">
          <button type="button" onClick={() => setExpanded((value) => !value)} className="inline-flex items-center gap-1 text-[16px] font-medium text-[#2563EB]">
            {expanded ? "See Less" : "See More"}
            <FiChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      <div className="mt-[33px] flex items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[16px] text-[#0F172A]">
          <span className="inline-flex items-center gap-2"><FiPlayCircle className="h-[18px] w-[18px]" /> {courses.length} Courses</span>
          <span className="inline-flex items-center gap-2"><FiAward className="h-[18px] w-[18px]" /> {track.certificate}</span>
        </div>
        <div className="flex shrink-0 gap-3">
          <button type="button" onClick={() => scroll(-1)} disabled={atStart} aria-label="Previous courses" className={`${arrow} ${atStart ? "border-[#CBD2DC] text-[#CBD2DC]" : "border-[#0F172A] text-[#0F172A] hover:bg-[#0F172A] hover:text-white"}`}>
            <FiChevronLeft className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => scroll(1)} disabled={atEnd} aria-label="Next courses" className={`${arrow} ${atEnd ? "border-[#CBD2DC] text-[#CBD2DC]" : "border-[#0F172A] text-[#0F172A] hover:bg-[#0F172A] hover:text-white"}`}>
            <FiChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={rail}
        onScroll={updateEdges}
        className="mt-[30px] flex snap-x snap-mandatory overflow-x-auto pb-3 pt-1 scrollbar-none"
      >
        {courses.map((course) => (
          <div key={course.id} className="w-[calc(100%_+_30px)] shrink-0 snap-start pr-[30px] sm:w-[calc((100%_+_30px)/2)] lg:w-[calc((100%_+_30px)/3)]">
            <DashboardCourseCard course={{ ...course, isNew: false }} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function CareerTracks() {
  return (
    <PageContainer>
      <div className="text-center">
        <h1 className="mt-[33px] text-[32px] font-semibold leading-10 text-[#0F172A]">Career Tracks</h1>
        <p className="mx-auto mt-4 max-w-[990px] text-[18px] leading-[26px] text-[#0F172A]">
          Build the specific skills for the job you want with a selection of courses created by leading experts to help you achieve your professional goals.
        </p>
      </div>
      <div className="mt-10 flex flex-col gap-10">
        {dashboardTracks.map((track) => (
          <TrackSlider key={track.id} track={track} />
        ))}
      </div>
    </PageContainer>
  );
}
