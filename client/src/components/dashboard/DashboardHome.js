"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { FiArrowRight, FiChevronLeft, FiChevronRight, FiEdit2, FiInfo, FiLock, FiSend, FiTarget, FiZap } from "react-icons/fi";
import { DailyGoalModal, LearningPathWizard, useLearningPath } from "@/components/dashboard/AdminModals";
import { CoinIcon, PageContainer, dashboardUser } from "@/components/dashboard/DashboardShell";
import { courseById, trackById } from "@/config/AdminContent";
import { useStoredValue } from "@/lib/useStoredValue";

const WEEK_DAYS = ["M", "T", "W", "T", "F", "S", "S"];

function SectionTitle({ children, badge, info }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <h5 className="text-[20px] font-semibold text-[#3D4653]">{children}</h5>
      {badge}
      {info ? <FiInfo className="h-4 w-4 text-[#9BA3AE]" aria-label={info} /> : null}
    </div>
  );
}

function XpBadge({ children }) {
  return <span className="rounded-[4px] border border-[#2563EB] px-1.5 py-[1px] text-[11px] font-semibold text-[#2563EB]">{children}</span>;
}

function CoinBadge({ children }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-[4px] border border-[#F59E0B] px-1.5 py-[1px] text-[11px] font-semibold text-[#B7791F]">
      {children} <CoinIcon className="h-3 w-3" />
    </span>
  );
}

const arrowLinkClass = "mt-3 inline-flex items-center gap-2 text-[14px] font-semibold text-[#2563EB] transition-all hover:gap-3";

function ArrowLink({ href, onClick, children }) {
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={arrowLinkClass}>
        {children} <FiArrowRight className="h-4 w-4" />
      </button>
    );
  }
  return (
    <Link href={href} className={arrowLinkClass}>
      {children} <FiArrowRight className="h-4 w-4" />
    </Link>
  );
}

function LearningPathSummary({ path, onRecreate }) {
  const track = trackById[path.trackId];
  const courses = path.courses.map((id) => courseById[id]).filter(Boolean);
  const next = courses[0];
  return (
    <div className="rounded-[15px] bg-white px-6 py-8 shadow-[0_6px_20px_rgba(15,23,42,0.08)] sm:px-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-[#748190]">{track?.title} path</p>
          <h4 className="mt-1 text-[22px] font-semibold text-[#0F172A]">{courses.length} items · 0% completed</h4>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={onRecreate} className="h-10 rounded-[5px] border border-[#D5D9DF] px-4 text-[14px] font-semibold text-[#545C69] hover:text-[#0F172A]">Recreate</button>
          <Link href="/admin/learning-path" className="inline-flex h-10 items-center rounded-[5px] bg-[#2563EB] px-5 text-[14px] font-semibold text-white hover:bg-[#1D4ED8]">View path</Link>
        </div>
      </div>
      {next ? (
        <Link href={`/admin/courses/${next.id}`} className="mt-6 flex items-center gap-4 rounded-[12px] border border-[#E5E7EB] p-3 transition-colors hover:border-[#BFD3FF]">
          <span className="relative h-14 w-20 shrink-0 overflow-hidden rounded-[8px] bg-[#1E293B]">
            <Image src={next.image} alt="" fill sizes="80px" className="object-cover" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-semibold uppercase text-[#2563EB]">Up next</p>
            <p className="truncate text-[15px] font-semibold text-[#0F172A]">{next.title}</p>
          </div>
          <FiArrowRight className="h-5 w-5 text-[#2563EB]" />
        </Link>
      ) : null}
    </div>
  );
}

const darkCard = "relative overflow-hidden rounded-[15px] bg-[linear-gradient(160deg,#1E293B_0%,#0F172A_100%)] text-white shadow-[0_8px_24px_rgba(15,23,42,0.18)]";

function IconBubble({ children }) {
  return <span className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/5 text-white/70">{children}</span>;
}

const subscribeToNothing = () => () => {};

function StreakCalendar() {
  // Today's date is read on the client only so the server render never disagrees with the visitor's timezone.
  const todayKey = useSyncExternalStore(subscribeToNothing, () => new Date().toDateString(), () => null);
  const [monthOffset, setMonthOffset] = useState(0);
  if (!todayKey) return <div className="h-[270px] w-full max-w-[270px]" />;

  const today = new Date(todayKey);
  const view = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  const offset = (view.getDay() + 6) % 7; // Monday-first
  const cells = [...Array(offset).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  const isToday = (day) => day && monthOffset === 0 && day === today.getDate();
  const shift = (delta) => setMonthOffset((current) => current + delta);

  return (
    <div className="w-full max-w-[270px]">
      <div className="mb-3 flex items-center justify-between text-[13px] text-white/60">
        <button type="button" onClick={() => shift(-1)} aria-label="Previous month" className="grid h-7 w-7 place-items-center rounded-full hover:bg-white/10 hover:text-white"><FiChevronLeft className="h-4 w-4" /></button>
        <span>{view.toLocaleString("en-US", { month: "long", year: "numeric" })}</span>
        <button type="button" onClick={() => shift(1)} aria-label="Next month" className="grid h-7 w-7 place-items-center rounded-full hover:bg-white/10 hover:text-white"><FiChevronRight className="h-4 w-4" /></button>
      </div>
      <div className="grid grid-cols-7 gap-y-1.5 text-center text-[13px]">
        {WEEK_DAYS.map((day, index) => <span key={index} className="pb-1 text-[11px] text-white/40">{day}</span>)}
        {cells.map((day, index) => (
          <span key={index} className={`mx-auto grid h-8 w-8 place-items-center rounded-[5px] ${isToday(day) ? "border-2 border-white font-semibold" : "text-white/90"}`}>
            {day || ""}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function DashboardHome() {
  const user = dashboardUser;
  const [goalOpen, setGoalOpen] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [path, setPath] = useLearningPath();
  const [dailyGoal] = useStoredValue("skillvexa-admin-daily-goal", null);
  return (
    <PageContainer>
      <div className="grid gap-x-[30px] gap-y-8 lg:grid-cols-12">
        <section className="lg:col-span-7">
          <SectionTitle>My Profile</SectionTitle>
          <div className="flex min-h-[214px] items-center gap-5 rounded-[15px] bg-white px-6 py-7 shadow-[0_6px_20px_rgba(15,23,42,0.08)] sm:px-10">
            <div className="relative shrink-0">
              <span className="grid h-[88px] w-[88px] place-items-center rounded-full bg-[linear-gradient(135deg,#2563EB_0%,#0F172A_100%)] text-[30px] font-semibold text-white sm:h-[150px] sm:w-[150px] sm:text-[44px]">
                {user.initials}
              </span>
              <button type="button" aria-label="Edit profile picture" className="absolute bottom-2 right-2 grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-[#2563EB] text-white">
                <FiEdit2 className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="min-w-0">
              <h5 className="truncate text-[22px] font-semibold text-[#0F172A] sm:text-[26px]">{user.name}</h5>
              <div className="mt-2 flex items-center gap-2.5 whitespace-nowrap text-[15px] text-[#0F172A] sm:text-[17px]">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#EFF4FF] text-[#2563EB]"><FiZap className="h-[18px] w-[18px]" /></span>
                Level {user.level} <span className="text-[#9BA3AE]">•</span> {user.xp} XP
              </div>
            </div>
          </div>
          <ArrowLink href="/admin/profile">See my profile</ArrowLink>
        </section>

        <section className="lg:col-span-5">
          <SectionTitle badge={<span className="flex gap-1.5"><XpBadge>+50 XP</XpBadge><CoinBadge>+1</CoinBadge></span>} info="Fill in your resume to earn XP and coins">My Resume</SectionTitle>
          <div className="flex min-h-[214px] flex-col justify-center rounded-[15px] bg-white px-6 py-7 shadow-[0_6px_20px_rgba(15,23,42,0.08)] sm:px-8">
            <div className="flex items-center gap-5">
              <span className="relative grid h-[104px] w-[104px] shrink-0 place-items-center overflow-hidden rounded-full border-2 border-dashed border-[#CBD2DC] bg-[#F7F8FA]">
                <Image src="/images/dashboard/resume_example.png" alt="" width={70} height={90} className="h-[78px] w-auto rounded-[3px] object-contain shadow-sm" />
              </span>
              <div>
                <p className="text-[16px] font-semibold text-[#0F172A]">Resume not started</p>
                <p className="mt-1 text-[13px] leading-5 text-[#748190]">Complete your resume to be included in our talent pool database shown to potential employers.</p>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <span className="h-2.5 flex-1 rounded-full bg-[#E5E7EB]" />
              <span className="inline-flex items-center gap-2 text-[13px] font-medium text-[#545C69]"><FiLock className="h-4 w-4" /> Show resume to companies</span>
            </div>
          </div>
          <ArrowLink href="/admin/resume">Build a resume</ArrowLink>
        </section>
      </div>

      <div className="mt-10 grid gap-x-[30px] gap-y-8 md:grid-cols-2 lg:grid-cols-12">
        <section className="md:col-span-2 lg:col-span-6">
          <SectionTitle badge={<XpBadge>+2 XP/day</XpBadge>} info="Learn every day to keep your streak">Streak</SectionTitle>
          <div className={`${darkCard} flex min-h-[330px] flex-col items-center gap-8 px-6 py-8 sm:flex-row sm:justify-around`}>
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-3">
                <IconBubble><FiZap className="h-5 w-5" /></IconBubble>
                <span className="text-[64px] font-medium leading-none">0<span className="ml-1 align-bottom text-[22px]">d</span></span>
              </div>
              <p className="mt-5 max-w-[190px] text-[15px] leading-6 text-white/90">
                <Link href="/admin/courses" className="font-semibold text-[#60A5FA] hover:underline">Start learning</Link> to gain better rewards
              </p>
            </div>
            <span className="hidden h-[220px] w-px bg-white/10 sm:block" />
            <StreakCalendar />
          </div>
        </section>

        <section className="lg:col-span-3">
          <SectionTitle badge={<CoinBadge>+X</CoinBadge>}>Weekly ranking</SectionTitle>
          <div className={`${darkCard} flex min-h-[330px] flex-col items-center justify-center gap-6 px-8 text-center`}>
            <IconBubble><FiLock className="h-5 w-5" /></IconBubble>
            <p className="text-[16px] font-semibold leading-6">
              <Link href="/admin/pricing" className="text-[#60A5FA] hover:underline">Upgrade</Link> to join the leaderboard and win special prizes weekly
            </p>
          </div>
          <ArrowLink href="/admin/leaderboard">Go to Leaderboard</ArrowLink>
        </section>

        <section className="lg:col-span-3">
          <SectionTitle info="Pick how many minutes you want to learn each day">Daily goal</SectionTitle>
          <div className={`${darkCard} flex min-h-[330px] flex-col items-center justify-center gap-6 px-8 text-center`}>
            <IconBubble><FiTarget className="h-5 w-5" /></IconBubble>
            {dailyGoal ? (
              <p className="text-[16px] font-semibold leading-6">
                <span className="block text-[44px] font-medium leading-none">{dailyGoal.minutes}<span className="ml-1 text-[18px]">min</span></span>
                <span className="mt-3 block text-white/80">0 of {dailyGoal.minutes} minutes learned today</span>
              </p>
            ) : (
              <p className="text-[16px] font-semibold leading-6">Set your daily goal and gain daily XP</p>
            )}
          </div>
          <ArrowLink onClick={() => setGoalOpen(true)}>{dailyGoal ? "Change daily goal" : "Set daily goal"}</ArrowLink>
        </section>
      </div>

      <section className="mt-10">
        <SectionTitle>My learning path</SectionTitle>
        {path ? <LearningPathSummary path={path} onRecreate={() => setWizardOpen(true)} /> : (
        <div className="grid items-center gap-8 rounded-[15px] bg-white px-6 py-10 shadow-[0_6px_20px_rgba(15,23,42,0.08)] sm:px-10 md:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:min-h-[465px]">
          <div>
            <h4 className="text-[24px] font-semibold text-[#0F172A]">Create a personalized learning path</h4>
            <p className="mt-3 max-w-[560px] text-[16px] leading-7 text-[#545C69]">
              Embark on a journey of professional transformation with our career paths, or simply learn a valuable new skill!
            </p>
            <button type="button" onClick={() => setWizardOpen(true)} className="mt-7 inline-flex h-11 min-w-[200px] items-center justify-center gap-2 rounded-[5px] bg-[#2563EB] px-6 text-[16px] font-semibold text-white transition-colors hover:bg-[#1D4ED8]">
              <FiSend className="h-[18px] w-[18px]" /> Create
            </button>
          </div>
          <Image src="/images/dashboard/clp_empty.webp" alt="Learning path preview" width={520} height={420} className="mx-auto h-auto w-full max-w-[420px]" />
        </div>
        )}
      </section>
      <DailyGoalModal open={goalOpen} onClose={() => setGoalOpen(false)} />
      <LearningPathWizard open={wizardOpen} onClose={() => setWizardOpen(false)} onCreate={setPath} />
    </PageContainer>
  );
}
