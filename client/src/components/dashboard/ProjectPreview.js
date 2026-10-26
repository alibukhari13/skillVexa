"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiCheck, FiMessageSquare, FiZap } from "react-icons/fi";
import { NewLabel, TechIcon, containerClass } from "@/components/dashboard/DashboardUI";
import { getProjectDetails } from "@/config/AdminContent";
import { useStoredValue } from "@/lib/useStoredValue";

const levelStyles = {
  Advanced: "border-[#F87171] text-[#FCA5A5]",
  Intermediate: "border-[#FBBF24] text-[#FCD34D]",
  Basic: "border-[#4ADE80] text-[#86EFAC]",
};

export default function ProjectPreview({ projectId }) {
  const project = getProjectDetails(projectId);
  const [tab, setTab] = useState("Description");
  const [started, setStarted] = useStoredValue(`skillvexa-admin-project-${projectId}`, false);

  return (
    <div>
      <section className="relative overflow-hidden bg-[#0F172A]">
        <Image src={project.image} alt="" fill loading="eager" sizes="100vw" className="object-cover object-right opacity-70" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#0F172A_0%,rgba(15,23,42,0.92)_38%,rgba(15,23,42,0.2)_100%)]" />
        <div className={`relative ${containerClass} py-12 lg:py-16`}>
          <div className="max-w-[560px] text-white">
            <h1 className="text-[28px] font-semibold leading-tight sm:text-[34px]">{project.title}</h1>
            <p className="mt-3 flex flex-wrap items-center gap-2 text-[20px] leading-snug text-white/90">
              {project.subtitle}
              <NewLabel />
              {project.free ? <span className="rounded-full border border-[#60A5FA] bg-[#0F172A]/80 px-2.5 py-[3px] text-[11px] font-semibold">Free</span> : null}
              <span className={`inline-flex items-center gap-1 rounded-full border bg-[#0F172A]/80 px-2.5 py-[3px] text-[11px] font-semibold ${levelStyles[project.level]}`}>
                <FiZap className="h-3 w-3" /> {project.level}
              </span>
            </p>
            <p className="mt-6 flex items-center gap-2 text-[14px] font-semibold">
              Tools:
              {project.technologies.map((tech) => (
                <span key={tech} className="inline-flex items-center gap-1.5 font-normal text-white/85"><TechIcon name={tech} className="h-4 w-4" /> {tech}</span>
              ))}
            </p>
            <p className="mt-6 text-[14px] text-white/80">Type: <b className="text-white">{project.type}</b></p>
            <p className="mt-1 text-[14px] text-white/80">Duration: <b className="text-white">{project.duration}</b></p>
            {started ? (
              <span className="mt-8 inline-flex h-11 items-center gap-2 rounded-[5px] bg-[#16A34A] px-6 text-[15px] font-semibold text-white">
                <FiCheck className="h-4 w-4" /> Project started
              </span>
            ) : (
              <button type="button" onClick={() => setStarted(true)} className="mt-8 h-11 min-w-[180px] rounded-[5px] bg-[#2563EB] px-6 text-[15px] font-semibold text-white hover:bg-[#1D4ED8]">
                Start Project
              </button>
            )}
          </div>
        </div>
      </section>

      <div className={`${containerClass} py-8`}>
        <div className="flex max-w-[360px] border-b-2 border-[#D5D9DF]">
          {["Description", "Discussion"].map((name) => (
            <button key={name} type="button" onClick={() => setTab(name)} className={`-mb-[2px] flex-1 border-b-2 pb-2.5 text-[14px] font-semibold ${tab === name ? "border-[#2563EB] text-[#2563EB]" : "border-transparent text-[#748190] hover:text-[#0F172A]"}`}>
              {name}
            </button>
          ))}
        </div>

        {tab === "Description" ? (
          <div className="mt-8 max-w-[820px] space-y-8">
            {project.sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-[20px] font-semibold text-[#0F172A]">{section.title}</h2>
                {section.body?.map((paragraph) => <p key={paragraph} className="mt-3 text-[15px] leading-7 text-[#3D4653]">{paragraph}</p>)}
                {section.list ? (
                  <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-[15px] leading-7 text-[#3D4653]">
                    {section.list.map((item) => <li key={item}>{item}</li>)}
                  </ol>
                ) : null}
              </section>
            ))}
            <section>
              <h2 className="text-[20px] font-semibold text-[#0F172A]">Related courses</h2>
              <Link href="/admin/courses" className="mt-3 inline-flex text-[15px] font-semibold text-[#2563EB] hover:underline">Browse the Courses Library</Link>
            </section>
          </div>
        ) : (
          <div className="mt-10 flex max-w-[820px] flex-col items-center rounded-[12px] bg-white px-6 py-14 text-center shadow-[0_4px_14px_rgba(15,23,42,0.06)]">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-[#EFF4FF] text-[#2563EB]"><FiMessageSquare className="h-5 w-5" /></span>
            <p className="mt-4 text-[17px] font-semibold text-[#0F172A]">No discussions yet</p>
            <p className="mt-1 text-[14px] text-[#748190]">Start the project to join the conversation with other learners.</p>
            <Link href="/admin/qa-hub" className="mt-5 inline-flex h-10 items-center rounded-[5px] border border-[#2563EB] px-5 text-[14px] font-semibold text-[#2563EB] hover:bg-[#2563EB] hover:text-white">
              Ask a question
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
