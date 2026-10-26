"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiAward, FiBarChart2, FiBookOpen, FiCheck, FiClock, FiPlay, FiPlus, FiWifi } from "react-icons/fi";
import { TbCertificate } from "react-icons/tb";
import { PageContainer } from "@/components/dashboard/DashboardShell";
import { Modal, NewLabel, TechIcon } from "@/components/dashboard/DashboardUI";
import { getCourseDescription, getTrackDetails } from "@/config/AdminContent";
import { dashboardCourses, dashboardProjects, dashboardTracks } from "@/config/DashboardData";
import { useStoredValue } from "@/lib/useStoredValue";

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="flex flex-col items-center text-center text-[18px] leading-[23px] text-[#0F172A]">
      <Icon className="mb-3 h-6 w-6 text-[#0F172A]" strokeWidth={1.5} />
      <span>{label}</span>
      <span className="mt-1.5 font-semibold">{value}</span>
    </div>
  );
}

function ElectivePicker({ open, onClose, onPick, exclude }) {
  const options = dashboardCourses.filter((course) => !exclude.includes(course.id)).slice(0, 12);
  return (
    <Modal open={open} onClose={onClose} className="max-w-[640px]" label="Select an elective course">
      <div className="p-6 sm:p-8">
        <p className="text-[22px] font-semibold">Select an elective course</p>
        <p className="mt-1 text-[14px] text-[#748190]">Pick a course that matches your interests. You can change it later.</p>
        <ul className="mt-5 max-h-[420px] space-y-2 overflow-y-auto pr-1">
          {options.map((course) => (
            <li key={course.id}>
              <button type="button" onClick={() => onPick(course.id)} className="flex w-full items-center gap-3 rounded-[10px] border border-[#E5E7EB] p-2.5 text-left hover:border-[#2563EB]">
                <span className="relative h-12 w-16 shrink-0 overflow-hidden rounded-[6px] bg-[#1E293B]">
                  <Image src={course.image} alt="" fill sizes="64px" className="object-cover" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px] font-semibold">{course.title}</span>
                  <span className="text-[12px] text-[#748190]">{course.duration} · {course.technology}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
}

export default function CareerTrackDetail({ trackId }) {
  const track = getTrackDetails(trackId);
  const [enrolled, setEnrolled] = useStoredValue(`skillvexa-admin-track-${trackId}`, null);
  const [pickerSlot, setPickerSlot] = useState(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const electives = enrolled?.electives || [null, null];
  const host = track.courses[0];
  const relatedTech = new Set(track.courses.map((course) => course.technology));
  const relatedProjects = dashboardProjects.filter((project) => project.technologies.some((tech) => relatedTech.has(tech))).slice(0, 6);
  const otherTracks = dashboardTracks.filter((item) => item.id !== track.id);
  const firstName = track.title.toLowerCase();

  return (
    <>
      <PageContainer className="pt-10">
        <section className="grid items-center gap-8 md:grid-cols-[225px_minmax(0,1fr)] lg:grid-cols-12 lg:gap-[30px]">
          <button type="button" onClick={() => setVideoOpen(true)} className="group relative h-[317px] w-full max-w-[225px] overflow-hidden rounded-[12px] bg-[#1E293B] text-left lg:col-span-3 lg:col-start-2 lg:mx-auto">
            <Image src={host.image} alt="" fill sizes="300px" className="object-cover" />
            <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0)_40%,rgba(15,23,42,0.85)_100%)]" />
            <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[#0F172A] transition-transform group-hover:scale-110">
              <FiPlay className="ml-0.5 h-6 w-6" />
            </span>
            <span className="absolute bottom-4 left-4 text-[13px] font-semibold text-white">{host.instructors.split(",")[0]}</span>
          </button>
          <div className="lg:col-span-7">
            <p className="text-[32px] leading-10 text-[#0F172A]">How to become a</p>
            <h1 className="mt-1 text-[38px] font-bold uppercase leading-[45px] text-[#0F172A]">{track.title}</h1>
            <p className="mt-1 text-[24px] uppercase leading-[30px] text-[#0F172A]">Career Track</p>
            <p className="mt-6 max-w-[565px] text-[16px] leading-[27px] text-[#0F172A]">
              Launch your {firstName} career—get job-ready with expert-led courses, hands-on projects, and an accredited certificate that sets you apart.
            </p>
            {enrolled ? (
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link href={`/admin/courses/${host.id}`} className="inline-flex h-10 w-[224px] items-center justify-center rounded-[5px] bg-[#2563EB] px-5 text-[16px] font-semibold text-white hover:bg-[#1D4ED8]">
                  Continue learning
                </Link>
                <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#15803D]"><FiCheck className="h-4 w-4" /> Enrolled</span>
              </div>
            ) : (
              <button type="button" onClick={() => setEnrolled({ electives: [null, null] })} className="mt-7 h-10 w-[224px] rounded-[5px] bg-[#2563EB] px-5 text-[16px] font-semibold text-white hover:bg-[#1D4ED8]">
                Enroll now
              </button>
            )}
          </div>
        </section>

        <div className="mt-10 grid grid-cols-2 gap-6 border-t border-[#ABAFB5] pt-9 sm:grid-cols-3 lg:grid-cols-6">
          <Stat icon={FiBookOpen} label={`${track.courseCount} AI & data`} value="science courses" />
          <Stat icon={FiWifi} label="100%" value="online" />
          <Stat icon={FiClock} label="Content:" value={`${track.hours} hours`} />
          <Stat icon={FiBarChart2} label="Skill level:" value={track.level} />
          <Stat icon={TbCertificate} label="CPE credits" value="available" />
          <Stat icon={FiAward} label="Accredited" value="certificate" />
        </div>

        <div className="mt-[70px] grid gap-[30px] lg:grid-cols-12">
          <section className="lg:col-span-5">
            <h2 className="text-[24px] font-semibold leading-[30px] text-[#0F172A]">Overview</h2>
            <div className="mt-10 space-y-4 text-[16px] leading-6 text-[#0F172A]">
              {track.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p>Along the way, you&apos;ll build the {firstName} skills employers look for and master tools including:</p>
            </div>
            <ul className="mt-4 space-y-3">
              {track.skills.map((skill) => (
                <li key={skill} className="flex items-start gap-3 text-[16px] leading-[27px] text-[#0F172A]">
                  <FiCheck className="mt-1.5 h-4 w-4 shrink-0 text-[#2563EB]" /> {skill}
                </li>
              ))}
            </ul>
          </section>

          <section className="lg:col-span-7">
            <div className="flex items-center justify-between">
              <h2 className="text-[24px] font-semibold leading-[30px] text-[#0F172A]">Curriculum</h2>
              <span className="inline-flex items-center gap-2 text-[18px] text-[#0F172A]"><TbCertificate className="h-5 w-5" /> CPE credits</span>
            </div>
            <ol className="relative mt-10 space-y-[30px] before:absolute before:bottom-8 before:left-[21px] before:top-8 before:w-0.5 before:bg-[#CBD2DC]">
              {track.curriculum.map(({ course, optional }) => (
                <li key={course.id} className="relative flex gap-5">
                  <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#0F172A] text-white">
                    <TechIcon name={course.technology} className="h-5 w-5" />
                  </span>
                  <Link href={`/admin/courses/${course.id}`} className="min-w-0 flex-1 rounded-[12px] bg-white p-6 shadow-[0_4px_15px_rgba(0,12,31,0.25)] transition-shadow hover:shadow-[0_8px_24px_rgba(0,12,31,0.3)]">
                    <span className={`rounded-[4px] p-1.5 text-[12px] font-semibold uppercase leading-[15px] ${optional ? "bg-[#293343]/20 text-[#0F172A]/80" : "bg-[#DBEAFE] text-[#1D4ED8]"}`}>
                      {optional ? "Optional" : "Required"}
                    </span>
                    <h3 className="mt-4 text-[21px] font-semibold leading-[30px] text-[#0F172A]">{course.title}</h3>
                    <p className="mt-2 text-[16px] leading-6 text-[#3D4653]">{getCourseDescription(course)}</p>
                  </Link>
                </li>
              ))}
              {electives.map((electiveId, slot) => {
                const course = electiveId ? dashboardCourses.find((item) => item.id === electiveId) : null;
                return (
                  <li key={`elective-${slot}`} className="relative flex gap-5">
                    <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-dashed border-[#94A3B8] bg-[#FAFAFB] text-[#545C69]">
                      <FiPlus className="h-5 w-5" />
                    </span>
                    <div className="flex min-w-0 flex-1 flex-wrap items-center justify-between gap-3 rounded-[10px] border-2 border-dashed border-[#CBD2DC] bg-white/60 p-5">
                      <div>
                        <span className="rounded-[4px] bg-[#FEF3C7] px-2 py-[3px] text-[10px] font-semibold uppercase tracking-[0.04em] text-[#B45309]">Elective</span>
                        <h3 className="mt-3 text-[17px] font-semibold text-[#0F172A]">{course ? course.title : "Select an elective course"}</h3>
                      </div>
                      <button
                        type="button"
                        disabled={!enrolled}
                        title={enrolled ? undefined : "Enroll in the track to choose electives"}
                        onClick={() => setPickerSlot(slot)}
                        className="h-9 rounded-[5px] border border-[#2563EB] px-4 text-[13px] font-semibold text-[#2563EB] hover:bg-[#2563EB] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-[#2563EB]"
                      >
                        {course ? "Change" : "Choose course"}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        </div>

        {relatedProjects.length ? (
          <section className="mt-16">
            <h2 className="text-[22px] font-semibold text-[#0F172A]">Related projects</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {relatedProjects.map((project) => (
                <Link key={project.id} href={`/admin/projects/${project.id}`} className="group overflow-hidden rounded-[10px] bg-white shadow-[0_4px_14px_rgba(15,23,42,0.08)] hover:shadow-[0_10px_28px_rgba(15,23,42,0.14)]">
                  <span className="relative block aspect-[2] overflow-hidden bg-[#1E293B]">
                    <Image src={project.image} alt="" fill sizes="360px" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                    <span className="absolute left-3 top-3 rounded-full bg-[#0F172A]/80 px-2.5 py-[3px] text-[11px] font-semibold text-white">{project.level}</span>
                  </span>
                  <span className="block p-4">
                    <NewLabel />
                    <span className="mt-2 block text-[15px] font-semibold text-[#0F172A]">{project.title}</span>
                    <span className="mt-2 block text-[13px] text-[#545C69]">Type: <b>{project.type}</b></span>
                    <span className="block text-[13px] text-[#545C69]">Duration: <b>{project.duration}</b></span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-16">
          <h2 className="text-[22px] font-semibold text-[#0F172A]">More career tracks</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {otherTracks.map((item) => (
              <Link key={item.id} href={`/admin/career-tracks/${item.id}`} className="rounded-[10px] bg-white p-5 shadow-[0_4px_14px_rgba(15,23,42,0.08)] transition-shadow hover:shadow-[0_10px_28px_rgba(15,23,42,0.14)]">
                <span className="block text-[16px] font-semibold text-[#0F172A]">{item.title}</span>
                <span className="mt-1.5 line-clamp-2 block text-[14px] leading-6 text-[#545C69]">{getTrackDetails(item.id)?.summary}</span>
              </Link>
            ))}
          </div>
        </section>
      </PageContainer>

      <ElectivePicker
        open={pickerSlot !== null}
        onClose={() => setPickerSlot(null)}
        exclude={[...track.courses.map((course) => course.id), ...electives.filter(Boolean)]}
        onPick={(courseId) => {
          const next = [...electives];
          next[pickerSlot] = courseId;
          setEnrolled({ ...enrolled, electives: next });
          setPickerSlot(null);
        }}
      />
      <Modal open={videoOpen} onClose={() => setVideoOpen(false)} className="max-w-[860px] overflow-hidden" label={`${track.title} introduction`}>
        <div className="relative aspect-video bg-[#0F172A]">
          <Image src={host.image} alt="" fill sizes="860px" className="object-cover opacity-40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center text-white">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-white/15"><FiPlay className="ml-1 h-7 w-7" /></span>
            <p className="text-[18px] font-semibold">{track.title} career track — introduction</p>
            <p className="text-[14px] text-white/70">Video coming soon</p>
          </div>
        </div>
      </Modal>
    </>
  );
}
