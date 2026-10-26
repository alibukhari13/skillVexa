"use client";

import Image from "next/image";
import Link from "next/link";

export default function InterviewStart() {
  return (
    <div className="fixed inset-0 z-[60] min-w-0 overflow-x-hidden overflow-y-auto bg-[linear-gradient(90deg,#D5E2FF_0%,#FFE6BD_100%)]">
      <div className="mx-auto flex min-h-full min-w-0 max-w-[1440px] flex-col items-center px-4 py-10 sm:px-6 sm:pt-[50px] sm:pb-12">
        <Link
          href="/"
          className="relative h-[34px] w-[140px] shrink-0 transition-transform duration-300 hover:scale-[1.03] sm:h-[42px] sm:w-[171px]"
        >
          <Image
            src="/images/logo.svg"
            alt="SkillVexa"
            fill
            priority
            sizes="171px"
            className="object-contain"
          />
        </Link>

        <div className="mt-12 flex w-full max-w-[637px] flex-1 flex-col items-center justify-center gap-8 sm:mt-[100px] sm:flex-none sm:justify-start sm:gap-10">
          <div className="flex w-full min-w-0 flex-col items-center gap-6">
            <div className="flex w-full min-w-0 flex-col items-center gap-3">
              <h1 className="w-full text-center font-display text-[32px] font-semibold leading-10 text-[#0F172A] sm:text-4xl sm:leading-[48px] xl:text-[48px] xl:leading-[60px]">
                Welcome to
                <br />
                <span className="text-[#2563EB]">InterviewACE</span>
              </h1>
              <p className="w-full min-w-0 text-center text-sm leading-6 text-[#636363] sm:text-base">
                No more rambling or being caught off-guard by unexpected interview
                questions. Our customized HR and technical interview simulator with
                instant feedback helps you overcome interview.
              </p>
            </div>
            <p className="w-full min-w-0 text-center text-lg font-medium leading-7 text-[#2563EB] sm:text-2xl sm:leading-9">
              SkillVexa AI-Powered Job Interview Simulator
            </p>
          </div>

          <button
            type="button"
            className="inline-flex h-14 w-full max-w-[209px] items-center justify-center gap-1.5 rounded-full bg-[#F59E0B] px-8 text-base font-semibold leading-6 text-[#0F172A] transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#d97706] hover:shadow-lg active:scale-[0.98]"
          >
            Start Interview
            <Image
              src="/images/icons/arrow-tr.svg"
              alt=""
              width={20}
              height={20}
              className="h-5 w-5"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
