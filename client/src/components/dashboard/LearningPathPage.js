"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiCalendar, FiClock, FiSend, FiTrash2 } from "react-icons/fi";
import { LearningPathWizard, useLearningPath } from "@/components/dashboard/AdminModals";
import { PageContainer } from "@/components/dashboard/DashboardShell";
import { Modal, TechIcon } from "@/components/dashboard/DashboardUI";
import { courseById, trackById } from "@/config/AdminContent";

function formatDeadline(createdAt, index, minutesPerDay, hours) {
  // Spread items over time based on the daily goal: hours of content / minutes per day.
  const start = new Date(createdAt);
  const daysPerItem = Math.max(2, Math.ceil((hours * 60) / (minutesPerDay || 30)));
  const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + daysPerItem * (index + 1));
  return date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
}

function PathView({ path, onRecreate, onDelete }) {
  const track = trackById[path.trackId];
  const courses = path.courses.map((id) => courseById[id]).filter(Boolean);
  return (
    <PageContainer>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-[#748190]">My learning path</p>
          <h1 className="mt-1 text-[28px] font-semibold text-[#0F172A]">{track?.title}</h1>
          <p className="mt-1 text-[14px] text-[#545C69]">
            {courses.length} items · {path.minutes || 30} min/day · Automatic deadlines
          </p>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={onDelete} className="inline-flex h-10 items-center gap-2 rounded-[5px] border border-[#D5D9DF] px-4 text-[14px] font-semibold text-[#545C69] hover:text-[#B91C1C]">
            <FiTrash2 className="h-4 w-4" /> Delete
          </button>
          <button type="button" onClick={onRecreate} className="inline-flex h-10 items-center gap-2 rounded-[5px] bg-[#2563EB] px-5 text-[14px] font-semibold text-white hover:bg-[#1D4ED8]">
            <FiSend className="h-4 w-4" /> Recreate
          </button>
        </div>
      </div>

      <div className="mt-6 h-2 overflow-hidden rounded-full bg-[#E5E7EB]">
        <span className="block h-full w-0 rounded-full bg-[#2563EB]" />
      </div>
      <p className="mt-2 text-[13px] text-[#748190]">0% completed</p>

      <ol className="relative mt-8 space-y-4 before:absolute before:bottom-6 before:left-[11px] before:top-6 before:w-px before:bg-[#D5D9DF]">
        {courses.map((course, index) => (
          <li key={course.id} className="relative flex gap-5">
            <span className={`relative z-10 mt-6 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 bg-white ${index === 0 ? "border-[#2563EB]" : "border-[#CBD2DC]"}`}>
              {index === 0 ? <span className="h-2.5 w-2.5 rounded-full bg-[#2563EB]" /> : null}
            </span>
            <Link href={`/admin/courses/${course.id}`} className="flex min-w-0 flex-1 items-center gap-4 rounded-[12px] bg-white p-3 shadow-[0_4px_14px_rgba(15,23,42,0.08)] transition-shadow hover:shadow-[0_10px_28px_rgba(15,23,42,0.14)]">
              <span className="relative h-16 w-24 shrink-0 overflow-hidden rounded-[8px] bg-[#1E293B]">
                <Image src={course.image} alt="" fill sizes="96px" className="object-cover" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#748190]">Course</p>
                <p className="truncate text-[15px] font-semibold text-[#0F172A]">{course.title}</p>
                <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-[#545C69]">
                  <span className="inline-flex items-center gap-1.5"><TechIcon name={course.technology} className="h-4 w-4" /> {course.technology}</span>
                  <span className="inline-flex items-center gap-1.5"><FiClock className="h-4 w-4" /> {course.duration}</span>
                </p>
              </div>
              <span className={`hidden shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold sm:inline-flex ${index === 0 ? "bg-[#EFF4FF] text-[#2563EB]" : "bg-[#F3F5F8] text-[#545C69]"}`}>
                <FiCalendar className="h-3.5 w-3.5" /> {formatDeadline(path.createdAt, index, path.minutes, parseInt(course.duration, 10) || 1)}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </PageContainer>
  );
}

export default function LearningPathPage() {
  const [path, setPath] = useLearningPath();
  const [wizardOpen, setWizardOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <>
      {path ? (
        <PathView path={path} onRecreate={() => setWizardOpen(true)} onDelete={() => setConfirmDelete(true)} />
      ) : (
        <PageContainer className="flex min-h-[calc(100vh-64px)] items-center">
          <div className="grid w-full items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,540px)]">
            <div className="max-w-[560px]">
              <h1 className="text-[22px] font-semibold text-[#0F172A]">Create Your Learning Path</h1>
              <p className="mt-4 text-[16px] leading-[1.7] text-[#3D4653]">
                Create a path with auto-generated deadlines and earn XPs for completing items on time. Alternatively, you can build your path by
                adding courses, projects, skills, and career tracks, then arrange them according to your preferences.
              </p>
              <button
                type="button"
                onClick={() => setWizardOpen(true)}
                className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-[5px] bg-[#2563EB] px-8 text-[16px] font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
              >
                <FiSend className="h-[18px] w-[18px]" /> Create
              </button>
            </div>
            <Image src="/images/dashboard/clp_empty.webp" alt="Learning path preview" width={600} height={500} priority className="mx-auto h-auto w-full max-w-[540px]" />
          </div>
        </PageContainer>
      )}

      <LearningPathWizard open={wizardOpen} onClose={() => setWizardOpen(false)} onCreate={setPath} />
      <Modal open={confirmDelete} onClose={() => setConfirmDelete(false)} label="Delete learning path">
        <div className="p-8 text-center">
          <p className="text-[20px] font-semibold">Delete your learning path?</p>
          <p className="mt-3 text-[14px] text-[#748190]">Your course progress stays—only the path and its deadlines are removed.</p>
          <div className="mt-6 flex justify-center gap-3">
            <button type="button" onClick={() => setConfirmDelete(false)} className="h-11 rounded-[5px] border border-[#D5D9DF] px-6 text-[15px] font-semibold text-[#545C69]">Keep path</button>
            <button
              type="button"
              onClick={() => {
                setPath(null);
                setConfirmDelete(false);
              }}
              className="h-11 rounded-[5px] bg-[#B91C1C] px-6 text-[15px] font-semibold text-white"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
