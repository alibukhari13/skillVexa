"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/SiteConfig";
import CourseCard from "@/components/CourseCard";
import Reveal from "@/components/Reveal";

function FilterSelect({ filter, value, onChange, open, onToggle }) {
  const isWide = filter.id === "difficulty";

  return (
    <div
      className={`relative w-full ${
        isWide ? "sm:w-[232px]" : "sm:w-[187px]"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full h-[46px] rounded-lg border border-[#0F172A] bg-white px-[17px] flex items-center justify-between gap-4 text-base leading-6 font-medium text-[#0F172A] whitespace-nowrap transition-all duration-200 hover:bg-[#F8FAFC]"
        aria-expanded={open}
      >
        <span className="truncate">{value || filter.label}</span>
        <Image
          src="/images/icons/chevron-down-dark.svg"
          alt=""
          width={24}
          height={24}
          className={`w-6 h-6 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`absolute left-0 right-0 top-[calc(100%+6px)] z-20 overflow-hidden rounded-xl border border-[#E3F1FF] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.1)] transition-all duration-200 origin-top ${
          open ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
        }`}
      >
        <button
          type="button"
          onClick={() => onChange("")}
          className="w-full text-left px-4 py-2.5 text-sm text-[#636363] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors"
        >
          All {filter.label}
        </button>
        {filter.options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
              value === option
                ? "bg-[#ECF5FF] text-[#2563EB] font-medium"
                : "text-[#0F172A] hover:bg-[#F8FAFC]"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function CoursesCatalog() {
  const { coursesPage } = siteConfig;
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [filters, setFilters] = useState({});
  const [openFilter, setOpenFilter] = useState(null);
  const barRef = useRef(null);

  useEffect(() => {
    function onClick(event) {
      if (barRef.current && !barRef.current.contains(event.target)) {
        setOpenFilter(null);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return coursesPage.catalog.filter((course) => {
      const matchesQuery =
        !q ||
        course.title.toLowerCase().includes(q) ||
        course.description.toLowerCase().includes(q);
      const matchesTopic = !filters.topic || course.topic === filters.topic;
      const matchesTech =
        !filters.technology || course.technology === filters.technology;
      const matchesDifficulty =
        !filters.difficulty || course.difficulty === filters.difficulty;
      const matchesDuration =
        !filters.duration || course.durationBand === filters.duration;
      const matchesTrack = !filters.track || course.track === filters.track;
      return (
        matchesQuery &&
        matchesTopic &&
        matchesTech &&
        matchesDifficulty &&
        matchesDuration &&
        matchesTrack
      );
    });
  }, [coursesPage.catalog, query, filters]);

  function submitSearch(event) {
    event.preventDefault();
    setQuery(draft);
  }

  return (
    <section className="px-4 sm:px-6 lg:px-[50px] pt-10 sm:pt-14">
      <div className="max-w-[1340px] mx-auto">
        <Reveal>
          <div className="max-w-[603px] mx-auto text-center">
            <h1 className="font-display text-[32px] sm:text-4xl lg:text-[48px] font-semibold leading-[1.25] lg:leading-[60px] text-[#0F172A]">
              {coursesPage.headingLead}{" "}
              <span className="text-[#2563EB]">{coursesPage.headingAccent}</span>
            </h1>
            <p className="mt-3 text-base leading-6 text-[#636363]">
              {coursesPage.description}
            </p>
          </div>
        </Reveal>

        <Reveal>
          <form
            onSubmit={submitSearch}
            className="mt-8 sm:mt-10 mx-auto w-full max-w-[740px] h-[60px] sm:h-[68px] rounded-[60px] border border-[#E9E9E9] bg-white pl-5 pr-2 sm:pl-[25px] sm:pr-2.5 flex items-center gap-3"
          >
            <Image
              src="/images/icons/search.svg"
              alt=""
              width={24}
              height={24}
              className="w-6 h-6 shrink-0"
            />
            <input
              type="search"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder={coursesPage.searchPlaceholder}
              className="flex-1 min-w-0 bg-transparent text-lg leading-[27px] text-[#0F172A] placeholder:text-[#A2B1C2] outline-none"
            />
            <button
              type="submit"
              className="shrink-0 h-11 sm:h-12 px-6 sm:w-[121px] rounded-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-base leading-6 font-medium transition-all duration-300 hover:-translate-y-[1px] active:scale-95"
            >
              {coursesPage.searchCta}
            </button>
          </form>
        </Reveal>

        <div
          ref={barRef}
          className="mt-10 sm:mt-12 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 xl:gap-5"
        >
          <p className="relative z-[1] text-[28px] sm:text-[32px] leading-[48px] font-medium text-[#0F172A] shrink-0 whitespace-nowrap">
            {results.length} {coursesPage.resultLabel}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:flex xl:flex-nowrap xl:items-center xl:justify-end gap-3 xl:gap-3 min-w-0">
            {coursesPage.filters.map((filter) => (
              <FilterSelect
                key={filter.id}
                filter={filter}
                value={filters[filter.id] || ""}
                open={openFilter === filter.id}
                onToggle={() =>
                  setOpenFilter(openFilter === filter.id ? null : filter.id)
                }
                onChange={(value) => {
                  setFilters((current) => ({ ...current, [filter.id]: value }));
                  setOpenFilter(null);
                }}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-x-5 xl:gap-y-12">
          {results.map((course, index) => (
            <Reveal key={course.id} delay={Math.min(index * 60, 240)} className="min-w-0 overflow-visible">
              <CourseCard
                course={course}
                float={index % 5 === 0}
              />
            </Reveal>
          ))}
        </div>

        {results.length === 0 ? (
          <p className="mt-16 text-center text-[#636363] text-base">
            No courses match your search. Try a different keyword or filter.
          </p>
        ) : null}
      </div>
    </section>
  );
}
