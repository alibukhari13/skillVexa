"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiFilter,
} from "react-icons/fi";
import { PageContainer } from "@/components/dashboard/DashboardShell";
import {
  EmptyResults,
  SearchInput,
  UnderlineTabs,
  containerClass,
} from "@/components/dashboard/DashboardUI";
import {
  dashboardCourses,
  dashboardExams,
  dashboardTracks,
} from "@/config/DashboardData";
import { useStoredValue } from "@/lib/useStoredValue";

const PAGE_SIZE = 10;
const tabs = ["Practice Exams", "Course Exams", "Career Track Exams"];
const technologies = [
  "Excel",
  "Git",
  "Jupyter",
  "Power BI",
  "Python",
  "R",
  "SQL",
  "Tableau",
  "ChatGPT",
  "Theory",
  "LangChain",
  "LangGraph",
];

const courseTech = Object.fromEntries(
  dashboardCourses.map((course) => [course.title, course.technology]),
);

const groupsByTab = {
  "Practice Exams": dashboardExams.map((group) => ({
    id: group.id,
    name: group.course,
    technology: courseTech[group.course] || "Theory",
    label: "Practice exams",
    kind: "practice",
    exams: group.exams.map((exam, index) => ({
      ...exam,
      id: `${group.id}--${index + 1}`,
    })),
  })),
  "Course Exams": dashboardCourses.map((course) => ({
    id: course.id,
    name: course.title,
    technology: course.technology,
    label: "Course exams",
    kind: "course",
    exams: [{ id: `${course.id}--course`, name: "Course exam", questions: 24 }],
  })),
  "Career Track Exams": dashboardTracks.map((track) => ({
    id: track.id,
    name: track.title,
    technology: "Theory",
    label: "Career track exams",
    kind: "track",
    exams: [{ id: `${track.id}--final`, name: "Final exam", questions: 40 }],
  })),
};

function StartExamButton({ group, exam }) {
  if (group.kind === "practice") {
    return (
      <Link
        href={`/admin/exams/${exam.id}`}
        className="inline-flex h-9 items-center rounded-[5px] bg-[#2563EB] px-5 text-[14px] font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
      >
        Start Exam
      </Link>
    );
  }
  return (
    <span className="group relative inline-block">
      <button
        type="button"
        disabled
        className="h-9 cursor-not-allowed rounded-[5px] bg-[#E5E7EB] px-5 text-[14px] font-semibold text-[#9BA3AE]"
      >
        Start Exam
      </button>
      <span className="pointer-events-none absolute bottom-[calc(100%+8px)] right-0 z-10 hidden w-[240px] rounded-[8px] bg-[#0F172A] px-3 py-2 text-left text-[12px] font-normal leading-5 text-white shadow-lg group-hover:block">
        {group.kind === "course" ? (
          "Complete all lessons to unlock the course exam"
        ) : (
          <>
            <Link
              href="/admin/pricing"
              className="pointer-events-auto font-semibold text-[#60A5FA]"
            >
              Upgrade
            </Link>{" "}
            to unlock final exam and gain your career track certificate.
          </>
        )}
      </span>
    </span>
  );
}

function ExamGroup({ group, open, onToggle, results }) {
  const total = group.exams.length;
  const attempted = group.exams.filter((exam) => results[exam.id]).length;
  return (
    <div className="rounded-[10px] bg-white shadow-[0_4px_14px_rgba(15,23,42,0.08)]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-4 px-6 py-6 text-left"
      >
        <h6
          title={group.name}
          className="min-w-0 flex-1 truncate text-[16px] font-semibold text-[#0F172A]"
        >
          {group.name}
        </h6>
        <span className="hidden items-center gap-4 text-[14px] text-[#0F172A] sm:flex">
          Exams attempted{" "}
          <span>
            <b>{attempted}</b>/{total}
          </span>
          <span className="h-[3px] w-[85px] rounded-full bg-[#E5E7EB]">
            <span
              className="block h-full rounded-full bg-[#2563EB]"
              style={{ width: `${(attempted / total) * 100}%` }}
            />
          </span>
        </span>
        <FiChevronDown
          className={`h-4 w-4 shrink-0 text-[#748190] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open ? (
        <div className="border-t border-[#EEF0F3] px-6 pb-5 pt-3">
          <div className="hidden grid-cols-12 gap-3 py-2 text-[12px] font-medium uppercase tracking-[0.02em] text-[#748190] md:grid">
            <span className="col-span-3">{group.label}</span>
            <span className="col-span-2">Best score</span>
            <span className="col-span-2">Total attempts</span>
            <span className="col-span-2">Questions</span>
            <span className="col-span-1">Review</span>
            <span className="col-span-2" />
          </div>
          {group.exams.map((exam) => {
            const result = results[exam.id];
            return (
              <div
                key={exam.id}
                className="grid grid-cols-2 items-center gap-3 border-t border-[#F1F2F4] py-3 text-[14px] text-[#0F172A] first:border-t-0 md:grid-cols-12"
              >
                <span className="col-span-2 font-medium md:col-span-3">
                  {exam.name}
                </span>
                <span className="md:col-span-2">
                  <span className="text-[#748190] md:hidden">Best score: </span>
                  {result ? `${result.best}%` : "-"}
                </span>
                <span className="md:col-span-2">
                  <span className="text-[#748190] md:hidden">Attempts: </span>
                  {result ? result.attempts : "-"}
                </span>
                <span className="md:col-span-2">
                  <span className="text-[#748190] md:hidden">Questions: </span>
                  {exam.questions}
                </span>
                {result ? (
                  <Link
                    href={`/admin/exams/${exam.id}/results`}
                    className="whitespace-nowrap text-[13px] font-semibold text-[#2563EB] hover:underline md:col-span-1"
                  >
                    See answers
                  </Link>
                ) : (
                  <span className="cursor-not-allowed whitespace-nowrap text-[13px] font-semibold text-[#9BA3AE] md:col-span-1">
                    See answers
                  </span>
                )}
                <span className="col-span-2 md:col-span-2 md:text-right">
                  <StartExamButton group={group} exam={exam} />
                </span>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null;
  const items = [];
  for (let i = 1; i <= pages; i += 1) {
    if (
      i === 1 ||
      i === pages ||
      Math.abs(i - page) <= 1 ||
      (page <= 3 && i <= 4)
    )
      items.push(i);
    else if (items[items.length - 1] !== "…") items.push("…");
  }
  const btn =
    "grid h-8 min-w-8 place-items-center rounded-full px-2 text-[14px] transition-colors";
  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-2"
    >
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        aria-label="Previous page"
        className={`${btn} text-[#748190] disabled:text-[#D5D9DF]`}
      >
        <FiChevronLeft />
      </button>
      {items.map((item, index) =>
        item === "…" ? (
          <span key={`gap-${index}`} className="text-[#748190]">
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            aria-current={item === page ? "page" : undefined}
            className={`${btn} ${item === page ? "font-semibold text-[#0F172A]" : "text-[#748190] hover:text-[#0F172A]"}`}
          >
            {item}
          </button>
        ),
      )}
      <button
        type="button"
        disabled={page === pages}
        onClick={() => onChange(page + 1)}
        aria-label="Next page"
        className={`${btn} text-[#748190] disabled:text-[#D5D9DF]`}
      >
        <FiChevronRight />
      </button>
    </nav>
  );
}

export default function ExamsPage({ initialTab = "practice" }) {
  const [tab, setTab] = useState(
    initialTab === "course"
      ? tabs[1]
      : initialTab === "track"
        ? tabs[2]
        : tabs[0],
  );
  const [examResults] = useStoredValue("skillvexa-admin-exam-results", {});
  const [query, setQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [draftTech, setDraftTech] = useState([]);
  const [tech, setTech] = useState([]);
  const [openIds, setOpenIds] = useState([]);
  const [page, setPage] = useState(1);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return groupsByTab[tab].filter(
      (group) =>
        (!q || group.name.toLowerCase().includes(q)) &&
        (!tech.length || tech.includes(group.technology)),
    );
  }, [query, tab, tech]);

  const pages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const visible = results.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const allOpen =
    visible.length > 0 && visible.every((group) => openIds.includes(group.id));

  const changeTab = (next) => {
    setTab(next);
    setPage(1);
    setOpenIds([]);
  };
  const toggleGroup = (id) =>
    setOpenIds((ids) =>
      ids.includes(id) ? ids.filter((value) => value !== id) : [...ids, id],
    );

  return (
    <div>
      <section className="bg-[#0F172A] bg-[linear-gradient(135deg,rgba(37,99,235,0.28)_0%,rgba(37,99,235,0)_100%)]">
        <div className={`${containerClass} py-12 lg:py-[52px]`}>
          <h1 className="text-[32px] font-semibold text-white sm:text-[38px]">
            Practice Exams
          </h1>
          <p className="mt-3 max-w-[640px] text-[15px] leading-6 text-white/75">
            Complete practice exams, master areas that need more work, and gain
            confidence in your skills.
          </p>
        </div>
      </section>

      <PageContainer className="pt-6">
        <UnderlineTabs
          className="max-w-[520px]"
          tabs={tabs}
          active={tab}
          onChange={changeTab}
        />

        <div className="mt-6 flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <SearchInput
              value={query}
              onChange={(value) => {
                setQuery(value);
                setPage(1);
              }}
              placeholder={`Search ${tab.toLowerCase()}`}
            />
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setDraftTech(tech);
                setFilterOpen((value) => !value);
              }}
              aria-expanded={filterOpen}
              className={`inline-flex h-11 items-center gap-2 rounded-[5px] border px-4 text-[14px] font-medium transition-colors ${tech.length ? "border-[#2563EB] text-[#2563EB]" : "border-[#D5D9DF] text-[#748190] hover:text-[#0F172A]"}`}
            >
              <FiFilter className="h-4 w-4" /> Filter
              {tech.length ? ` (${tech.length})` : ""}
            </button>
            {filterOpen ? (
              <div className="absolute right-0 top-[calc(100%+10px)] z-20 w-[280px] rounded-[10px] bg-white p-4 shadow-[0_12px_32px_rgba(15,23,42,0.18)]">
                <p className="text-[14px] font-semibold text-[#0F172A]">
                  Exam technology
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {technologies.map((name) => {
                    const active = draftTech.includes(name);
                    return (
                      <li key={name}>
                        <button
                          type="button"
                          aria-pressed={active}
                          onClick={() =>
                            setDraftTech((values) =>
                              active
                                ? values.filter((value) => value !== name)
                                : [...values, name],
                            )
                          }
                          className={`rounded-[4px] px-2.5 py-1 text-[13px] transition-colors ${active ? "bg-[#2563EB] text-white" : "bg-[#EEF0F3] text-[#0F172A] hover:bg-[#E2E6EC]"}`}
                        >
                          {name}
                        </button>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setDraftTech([])}
                    className="text-[13px] text-[#748190] hover:text-[#0F172A]"
                  >
                    Clear all
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTech(draftTech);
                      setPage(1);
                      setFilterOpen(false);
                    }}
                    className="h-9 rounded-[5px] bg-[#2563EB] px-5 text-[14px] font-semibold text-white hover:bg-[#1D4ED8]"
                  >
                    Apply
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          {visible.length ? (
            visible.map((group) => (
              <ExamGroup
                key={group.id}
                group={group}
                results={examResults || {}}
                open={openIds.includes(group.id)}
                onToggle={() => toggleGroup(group.id)}
              />
            ))
          ) : (
            <EmptyResults>No exams match your search.</EmptyResults>
          )}
        </div>

        {visible.length ? (
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={() =>
                setOpenIds(allOpen ? [] : visible.map((group) => group.id))
              }
              className="text-[13px] font-semibold text-[#2563EB] hover:underline"
            >
              {allOpen ? "Collapse all" : "Expand all"}
            </button>
          </div>
        ) : null}

        <div className="mt-4">
          <Pagination
            page={current}
            pages={pages}
            onChange={(value) => {
              setPage(value);
              setOpenIds([]);
            }}
          />
        </div>
      </PageContainer>
    </div>
  );
}
