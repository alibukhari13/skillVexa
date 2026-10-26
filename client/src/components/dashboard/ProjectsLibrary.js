"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FiZap } from "react-icons/fi";
import { PageContainer } from "@/components/dashboard/DashboardShell";
import { EmptyResults, FilterSidebar, NewLabel, SearchInput, TechIcon, UnderlineTabs, useFilters } from "@/components/dashboard/DashboardUI";
import { dashboardProjects } from "@/config/DashboardData";

const tabs = ["All projects", "New", "Not started", "In progress", "Completed"];

const filterGroups = [
  { id: "technology", label: "Technology", options: ["Python", "SQL", "R", "Excel", "Tableau", "Power BI"] },
  { id: "topic", label: "Topics", options: ["Data Analysis", "Statistics", "Excel", "Data Processing", "Data Visualization"] },
  { id: "type", label: "Project type", options: ["Practice", "Course", "Career Track", "Skill Track"] },
  { id: "level", label: "Difficulty", options: ["Basic", "Intermediate", "Advanced"] },
  { id: "duration", label: "Duration", options: ["< 3 hours", "3-10 hours", "> 10 hours"] },
  { id: "free", label: "Free", options: ["Free projects"] },
];

const levelStyles = {
  Advanced: "border-[#F87171] text-[#FCA5A5]",
  Intermediate: "border-[#FBBF24] text-[#FCD34D]",
  Basic: "border-[#4ADE80] text-[#86EFAC]",
};

function ProjectCard({ project }) {
  return (
    <Link href={`/admin/projects/${project.id}`} className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[10px] bg-white shadow-[0_4px_14px_rgba(15,23,42,0.08)] transition-shadow duration-300 hover:shadow-[0_10px_28px_rgba(15,23,42,0.16)]">
      <div className="relative aspect-[1.4] w-full overflow-hidden bg-[#1E293B]">
        <Image src={project.image} alt={project.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 300px" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {project.free ? (
              <span className="rounded-full border border-[#60A5FA] bg-[#0F172A]/80 px-2.5 py-[3px] text-[11px] font-semibold text-white">Free</span>
            ) : null}
            <span className={`inline-flex items-center gap-1 rounded-full border bg-[#0F172A]/80 px-2.5 py-[3px] text-[11px] font-semibold ${levelStyles[project.level]}`}>
              <FiZap className="h-3 w-3" /> {project.level}
            </span>
          </div>
          <span className="flex gap-1.5 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
            {project.technologies.map((tech) => (
              <TechIcon key={tech} name={tech} className="h-6 w-6" />
            ))}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
        {project.isNew ? <div className="mb-2"><NewLabel /></div> : null}
        <h2 title={project.title} className="line-clamp-2 text-[15px] font-semibold leading-[1.35] text-[#0F172A]">{project.title}</h2>
        <div className="mt-auto space-y-1 pt-5 text-[13px] text-[#0F172A]">
          <p>Type: <span className="font-semibold">{project.type}</span></p>
          <p>Duration: <span className="font-semibold">{project.duration}</span></p>
        </div>
      </div>
    </Link>
  );
}

export default function ProjectsLibrary() {
  const [tab, setTab] = useState(tabs[0]);
  const [query, setQuery] = useState("");
  const { selected, toggle, clear } = useFilters(filterGroups);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const any = (values, test) => !values.length || values.some(test);
    return dashboardProjects.filter((project) => {
      const tabOk =
        tab === "All projects" ||
        (tab === "New" && project.isNew) ||
        (tab === "Not started" && project.status === "Not Started") ||
        (tab === "In progress" && project.status === "In Progress") ||
        (tab === "Completed" && project.status === "Completed");
      return (
        tabOk &&
        (!q || project.title.toLowerCase().includes(q)) &&
        any(selected.technology, (tech) => project.technologies.includes(tech)) &&
        any(selected.topic, (topic) => project.topic === topic) &&
        any(selected.type, (type) => project.type.toLowerCase().startsWith(type.toLowerCase())) &&
        any(selected.level, (level) => project.level === level) &&
        any(selected.duration, (band) => project.durationBand === band) &&
        any(selected.free, () => project.free)
      );
    });
  }, [query, selected, tab]);

  return (
    <PageContainer>
      <h1 className="mt-2 text-center text-[32px] font-semibold text-[#0F172A]">Data Science Projects</h1>
      <UnderlineTabs className="mt-11 max-w-[850px]" tabs={tabs} active={tab} onChange={setTab} />

      <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-[30px] desk:grid-cols-[270px_minmax(0,1fr)]">
        <div>
          <FilterSidebar groups={filterGroups} selected={selected} onToggle={toggle} onClear={clear} />
        </div>
        <div className="min-w-0">
          <SearchInput value={query} onChange={setQuery} placeholder="Search projects" />
          <p className="mb-10 mt-4 text-[16px] font-medium text-[#0F172A]">{results.length} results</p>
          {results.length ? (
            <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 desk:grid-cols-3">
              {results.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <EmptyResults>
              {tab === "In progress" || tab === "Completed"
                ? `You don't have any ${tab.toLowerCase()} projects yet. Start a project to see it here.`
                : "No projects match your filters. Try clearing a few filters or another keyword."}
            </EmptyResults>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
