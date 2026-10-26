"use client";

import { useMemo, useState } from "react";
import { PageContainer } from "@/components/dashboard/DashboardShell";
import DashboardCourseCard from "@/components/dashboard/DashboardCourseCard";
import { EmptyResults, FilterSidebar, SearchInput, UnderlineTabs, useFilters } from "@/components/dashboard/DashboardUI";
import { dashboardCourses, dashboardTracks } from "@/config/DashboardData";

const filterGroups = [
  {
    id: "topics",
    label: "Topics",
    options: ["Data Literacy", "Data Analysis", "Machine and Deep Learning", "AI", "Data Visualization", "Programming", "Math & Statistics", "Business Skills", "Finance Skills", "Data Engineering", "Career Development", "Spreadsheets", "Cloud Computing", "MLOps", "Soft skills"],
  },
  {
    id: "technology",
    label: "Technology",
    options: ["Python", "SQL", "R", "Excel", "Tableau", "Power BI", "Git", "Theory", "ChatGPT", "LangChain", "Apache Airflow", "LangGraph", "AWS", "GCP", "Copilot"],
  },
  { id: "level", label: "Level of difficulty", options: ["Basic", "Intermediate", "Advanced"] },
  { id: "duration", label: "Duration", options: ["1-2 hours", "3-4 hours", "5-6 hours", "7+ hours"] },
  { id: "track", label: "Career Track", options: dashboardTracks.map((track) => track.title) },
];

function matches(course, selected) {
  const any = (values, test) => !values.length || values.some(test);
  return (
    any(selected.topics, (topic) => course.topics.includes(topic)) &&
    any(selected.technology, (tech) => course.technology === tech) &&
    any(selected.level, (level) => course.level === level) &&
    any(selected.duration, (band) => course.durationBand === band) &&
    any(selected.track, (track) => course.tracks.includes(track))
  );
}

export default function CoursesLibrary() {
  const [tab, setTab] = useState("All courses");
  const [query, setQuery] = useState("");
  const { selected, toggle, clear } = useFilters(filterGroups);
  const newCount = dashboardCourses.filter((course) => course.isNew).length;
  const tabs = ["All courses", `New (${newCount})`];

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return dashboardCourses.filter(
      (course) =>
        (tab === "All courses" || course.isNew) &&
        (!q || `${course.title} ${course.instructors} ${course.technology}`.toLowerCase().includes(q)) &&
        matches(course, selected)
    );
  }, [query, selected, tab]);

  return (
    <PageContainer>
      <h1 className="mt-2 text-center text-[32px] font-semibold text-[#0F172A]">Courses Library</h1>

      <UnderlineTabs className="mt-11 max-w-[340px]" tabs={tabs} active={tab} onChange={setTab} />

      <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-[30px] desk:grid-cols-[270px_minmax(0,1fr)]">
        <div>
          <FilterSidebar groups={filterGroups} selected={selected} onToggle={toggle} onClear={clear} />
        </div>
        <div className="min-w-0">
          <SearchInput value={query} onChange={setQuery} placeholder="Search courses" />
          <p className="mb-10 mt-4 text-[16px] font-medium text-[#0F172A]">{results.length} results</p>
          {results.length ? (
            <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 desk:grid-cols-3">
              {results.map((course) => (
                <DashboardCourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <EmptyResults>No courses match your filters. Try clearing a few filters or another keyword.</EmptyResults>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
