"use client";

import Image from "next/image";
import Link from "next/link";
import { PageContainer } from "@/components/dashboard/DashboardShell";
import { RESUME_KEY, resumeStrength } from "@/components/dashboard/ResumeBuilder";
import { useStoredValue } from "@/lib/useStoredValue";

export default function ResumePage() {
  const [resume] = useStoredValue(RESUME_KEY, null);
  const strength = resumeStrength(resume);
  const label = resume ? (resume.completed ? "Edit Your Resume" : "Continue Your Resume") : "Build Your Resume";

  return (
    <PageContainer className="py-10">
      <div className="mx-auto max-w-[850px]">
        <h1 className="text-[20px] font-semibold text-[#0F172A]">Profile Information</h1>
        <div className="mt-4 grid overflow-hidden rounded-[10px] border border-[#E5E7EB] bg-white md:grid-cols-2">
          <div className="px-8 pb-10 pt-10 sm:px-[50px] sm:pt-[50px]">
            <h2 className="text-[16px] font-semibold text-[#0F172A]">Create a Professional Resume In Minutes</h2>
            <p className="mt-3 text-[17px] leading-[1.6] text-[#3D4653]">Create a sharp and effective resume that makes recruiters call.</p>
            <p className="mt-4 text-[17px] leading-[1.6] text-[#3D4653]">Fill your information in just a few minutes and start landing job interviews!</p>
            {resume ? <p className="mt-5 text-[14px] font-semibold text-[#2563EB]">Resume strength: {strength}%</p> : null}
            <Link
              href="/admin/resume/builder"
              className="mt-6 inline-flex h-10 items-center rounded-[5px] border border-[#2563EB] bg-[#2563EB] px-5 text-[16px] font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
            >
              {label}
            </Link>
          </div>
          <div className="flex items-center justify-center bg-[#F0F0F2] px-8 py-10">
            <Image
              src="/images/dashboard/resume_example.png"
              alt="Resume example"
              width={340}
              height={440}
              priority
              className="h-auto w-full max-w-[310px] rounded-[4px] shadow-[0_10px_24px_rgba(15,23,42,0.18)]"
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
