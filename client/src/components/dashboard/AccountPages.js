"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { FiArrowRight, FiCheck, FiChevronDown, FiCopy, FiEdit2, FiEye, FiGift, FiLock, FiMail, FiSettings, FiX, FiZap } from "react-icons/fi";
import { PageContainer, dashboardUser } from "@/components/dashboard/DashboardShell";
import { RESUME_KEY, resumeStrength } from "@/components/dashboard/ResumeBuilder";
import { CoinBadge, DarkHero, Modal, XpBadge, containerClass } from "@/components/dashboard/DashboardUI";
import { coinUses, coinWays, leaderboardFaq, levelNames, notificationCategories, referralRewards, xpWays } from "@/config/AdminContent";
import { siteConfig } from "@/config/SiteConfig";
import PricingExperience from "@/components/PricingExperience";
import { useStoredValue } from "@/lib/useStoredValue";

const darkCard = "relative overflow-hidden rounded-[15px] bg-[linear-gradient(160deg,#1E293B_0%,#0F172A_100%)] text-white shadow-[0_8px_24px_rgba(15,23,42,0.18)]";

function WayCard({ title, xp, coins, body }) {
  return (
    <div className="rounded-[12px] bg-white p-5 shadow-[0_4px_14px_rgba(15,23,42,0.08)]">
      <p className="flex flex-wrap items-center gap-2 text-[15px] font-semibold text-[#0F172A]">
        {title}
        {xp ? <XpBadge>{xp}</XpBadge> : null}
        {coins ? <CoinBadge>{coins}</CoinBadge> : null}
      </p>
      <p className="mt-2 text-[13px] leading-5 text-[#545C69]">{body}</p>
    </div>
  );
}

function EmptyHistory({ title, body }) {
  return (
    <div className="flex flex-col items-center rounded-[12px] bg-white px-6 py-12 text-center shadow-[0_4px_14px_rgba(15,23,42,0.06)]">
      <p className="text-[16px] font-semibold text-[#0F172A]">{title}</p>
      <p className="mt-1 max-w-[460px] text-[14px] text-[#748190]">{body}</p>
    </div>
  );
}

/* --------------------------------- Profile -------------------------------- */

export function ProfilePage() {
  const user = dashboardUser;
  const [bannerHidden, setBannerHidden] = useStoredValue("skillvexa-admin-profile-banner", false);
  const [followers, setFollowers] = useState(null);
  const [resume] = useStoredValue(RESUME_KEY, null);

  return (
    <PageContainer>
      {!bannerHidden ? (
        <div className="relative mb-5 rounded-[12px] border border-[#BFD3FF] bg-[#EFF4FF] px-5 py-4 pr-12">
          <p className="flex items-center gap-2 text-[15px] font-semibold text-[#0F172A]"><FiEye className="h-4 w-4 text-[#2563EB]" /> Who can see my profile?</p>
          <p className="mt-1 text-[13px] text-[#545C69]">
            Make sure recruiters and companies can see your resume. Manage your preferences about sharing your achievements in newsfeed in{" "}
            <Link href="/admin/settings" className="font-semibold text-[#2563EB]">Account settings</Link>.
          </p>
          <button type="button" onClick={() => setBannerHidden(true)} aria-label="Dismiss" className="absolute right-4 top-4 text-[#748190] hover:text-[#0F172A]"><FiX className="h-4 w-4" /></button>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-6 rounded-[15px] bg-white p-6 shadow-[0_6px_20px_rgba(15,23,42,0.08)] sm:p-8">
        <div className="relative">
          <span className="grid h-[110px] w-[110px] place-items-center rounded-full bg-[linear-gradient(135deg,#2563EB_0%,#0F172A_100%)] text-[36px] font-semibold text-white">{user.initials}</span>
          <Link href="/admin/settings" aria-label="Edit profile" className="absolute bottom-1 right-1 grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-[#2563EB] text-white"><FiEdit2 className="h-3.5 w-3.5" /></Link>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[22px] font-semibold text-[#0F172A]">{user.name}</p>
          <p className="mt-1 flex items-center gap-2 text-[14px] text-[#545C69]">
            <button type="button" onClick={() => setFollowers("Followers")} className="hover:text-[#2563EB]"><b>0</b> Followers</button>
            <span>•</span>
            <button type="button" onClick={() => setFollowers("Following")} className="hover:text-[#2563EB]"><b>0</b> Following</button>
          </p>
        </div>
        <Link href={resume ? "/admin/resume/builder" : "/admin/resume"} className="inline-flex h-11 items-center rounded-[5px] bg-[#2563EB] px-6 text-[15px] font-semibold text-white hover:bg-[#1D4ED8]">
          {resume ? `Resume ${resumeStrength(resume)}%` : "Build a resume"}
        </Link>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <section>
          <p className="mb-3 text-[20px] font-semibold text-[#3D4653]">Level</p>
          <Link href="/admin/xp" className={`${darkCard} flex min-h-[220px] flex-col items-center justify-center gap-3 px-6 text-center`}>
            <span className="flex items-center gap-3 text-[52px] font-medium leading-none"><span className="grid h-11 w-11 place-items-center rounded-full bg-[#2563EB]"><FiZap className="h-5 w-5" /></span>{user.level}</span>
            <span className="text-[13px] font-semibold uppercase tracking-[0.06em] text-white/70">Overall XP: {user.xp}</span>
          </Link>
        </section>
        <section>
          <p className="mb-3 text-[20px] font-semibold text-[#3D4653]">Streak</p>
          <div className={`${darkCard} flex min-h-[220px] flex-col items-center justify-center gap-3 px-6 text-center`}>
            <span className="text-[52px] font-medium leading-none">0<span className="ml-1 text-[20px]">d</span></span>
            <span className="text-[13px] font-semibold uppercase tracking-[0.06em] text-white/70">Bonus: 2 XP/day</span>
          </div>
        </section>
        <section>
          <p className="mb-3 text-[20px] font-semibold text-[#3D4653]">Weekly ranking</p>
          <div className={`${darkCard} flex min-h-[220px] flex-col items-center justify-center gap-4 px-6 text-center`}>
            <span className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/5 text-white/70"><FiLock className="h-5 w-5" /></span>
            <p className="text-[15px] font-semibold leading-6">
              <Link href="/admin/pricing" className="text-[#60A5FA] hover:underline">Upgrade</Link> to join the leaderboard and win special prizes weekly
            </p>
          </div>
        </section>
      </div>

      <Modal open={Boolean(followers)} onClose={() => setFollowers(null)} label={followers || "Followers"}>
        <div className="p-8">
          <p className="text-[22px] font-semibold">{followers}</p>
          <p className="mt-6 pb-4 text-center text-[14px] text-[#748190]">
            {followers === "Followers" ? "No one follows you yet." : "You aren't following anyone yet."} Find learners in the{" "}
            <Link href="/admin/news-feed" onClick={() => setFollowers(null)} className="font-semibold text-[#2563EB]">Newsfeed</Link>.
          </p>
        </div>
      </Modal>
    </PageContainer>
  );
}

/* ------------------------------- Certificates ------------------------------ */

export function CertificatesPage() {
  const [tab, setTab] = useState("Course Certificates");
  const isCourse = tab === "Course Certificates";
  return (
    <div>
      <DarkHero title={isCourse ? "Course Certificate" : "Career Track Certificate"}>
        Show off your new AI and data skills with a CPE-accredited certificate recognised by global institutions—and give your career a boost.
      </DarkHero>
      <PageContainer>
        <div className="flex max-w-[420px] border-b-2 border-[#D5D9DF]">
          {["Course Certificates", "Career Track Certificates"].map((name) => (
            <button key={name} type="button" onClick={() => setTab(name)} className={`-mb-[2px] flex-1 border-b-2 pb-2.5 text-[14px] font-semibold ${tab === name ? "border-[#2563EB] text-[#2563EB]" : "border-transparent text-[#748190] hover:text-[#0F172A]"}`}>
              {name}
            </button>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-center text-center">
          <p className="text-[20px] font-semibold text-[#3D4653]">{isCourse ? "Pass a Course Exam" : "Pass a Career Track Exam"}</p>
          <p className="mt-2 text-[15px] text-[#545C69]">{isCourse ? "Get a Course Certificate after successfully completing an exam" : "Get a Career Track Certificate after passing the final exam of a track"}</p>
          <Link href={isCourse ? "/admin/exams?tab=course" : "/admin/exams?tab=track"} className="mt-3 inline-flex items-center gap-2 text-[15px] font-semibold text-[#2563EB]">
            {isCourse ? "Course exams" : "Career track exams"} <FiArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </PageContainer>
    </div>
  );
}

/* ----------------------------------- XP ----------------------------------- */

export function XpPage() {
  const user = dashboardUser;
  return (
    <PageContainer>
      <p className="text-[20px] font-semibold text-[#3D4653]">Your current level</p>
      <div className="mt-4 flex gap-3 overflow-x-auto pb-2 scrollbar-none">
        {levelNames.map((name, index) => {
          const unlocked = index < user.level;
          return (
            <div key={name} className="flex w-[84px] shrink-0 flex-col items-center gap-2 text-center">
              <span className={`grid h-[72px] w-[72px] place-items-center rounded-full ${unlocked ? "bg-white text-[#2563EB] shadow-[0_6px_18px_rgba(37,99,235,0.25)]" : "bg-[#E5E7EB] text-[#9BA3AE]"}`}>
                {unlocked ? <FiZap className="h-8 w-8" /> : <FiLock className="h-5 w-5" />}
              </span>
              {unlocked ? <span className="text-[12px] font-semibold leading-4 text-[#0F172A]">{name}</span> : null}
            </div>
          );
        })}
      </div>
      <div className={`${darkCard} mt-4 p-6 sm:p-8`}>
        <p className="text-[15px] font-semibold text-white/80">Current total XP:</p>
        <p className="mt-1 text-[30px] font-medium">{user.xp} XP</p>
        <p className="mt-5 text-[20px]"><b className="text-[#93C5FD]">{user.level}/{user.maxLevel} Level</b> <span className="text-white/70">- {levelNames[user.level - 1]}</span></p>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <span className="h-2 min-w-[200px] flex-1 overflow-hidden rounded-full bg-white/15"><span className="block h-full rounded-full bg-[#2563EB]" style={{ width: `${(user.xp / user.xpGoal) * 100}%` }} /></span>
          <span className="text-[14px] font-semibold">{user.xp}/{user.xpGoal} XP</span>
          <span className="inline-flex items-center gap-1.5 rounded-[6px] bg-[#2563EB] px-3 py-2 text-[13px] font-semibold">Next level reward: +3 <Image src="/images/dashboard/single_coin.png" alt="" width={14} height={14} className="h-auto w-[14px]" /></span>
        </div>
      </div>

      <p className="mt-12 text-[20px] font-semibold text-[#3D4653]">How to generate XPs and earn coins</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {xpWays.map(([title, xp, coins, body]) => <WayCard key={title} title={title} xp={xp} coins={coins} body={body} />)}
      </div>

      <p className="mt-12 text-[20px] font-semibold text-[#3D4653]">XP generation</p>
      <div className="mt-4">
        <EmptyHistory title="No XPs generated yet" body="Level up to unlock limited card collections and take advantage of the many benefits of our program." />
      </div>
    </PageContainer>
  );
}

/* ---------------------------------- Coins --------------------------------- */

export function CoinsPage() {
  return (
    <div>
      <DarkHero
        title="My wallet"
        aside={
          <span className="flex items-center gap-3 text-[44px] font-medium text-white">
            {dashboardUser.coins}
            <Image src="/images/dashboard/icon_coins.png" alt="Coins" width={40} height={40} className="h-10 w-10 object-contain" />
          </span>
        }
      >
        Earn coins. Unlock card collections. Enjoy exciting benefits.
      </DarkHero>
      <PageContainer>
        <p className="text-[20px] font-semibold text-[#3D4653]">How to earn coins</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {coinWays.map(([title, xp, coins, body]) => <WayCard key={title} title={title} xp={xp} coins={coins} body={body} />)}
        </div>
        <p className="mt-12 text-[20px] font-semibold text-[#3D4653]">How to use coins</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {coinUses.map((item) => (
            <div key={item.title} className="flex flex-col rounded-[12px] bg-white p-6 shadow-[0_4px_14px_rgba(15,23,42,0.08)]">
              <p className="text-[16px] font-semibold text-[#0F172A]">{item.title}</p>
              <p className="mt-2 flex-1 text-[14px] text-[#545C69]">{item.body}</p>
              <Link href={item.href} className="mt-4 inline-flex items-center gap-2 text-[14px] font-semibold text-[#2563EB]">{item.cta} <FiArrowRight className="h-4 w-4" /></Link>
            </div>
          ))}
        </div>
        <p className="mt-12 text-[20px] font-semibold text-[#3D4653]">Coin generation and spending</p>
        <div className="mt-4">
          <EmptyHistory title="No coins generated yet" body="Earn coins to acquire limited card collections and enjoy some great benefits!" />
        </div>
      </PageContainer>
    </div>
  );
}

/* ------------------------------- Leaderboard ------------------------------ */

const subscribeNever = () => () => {};

function nextSunday() {
  const now = new Date();
  const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + ((7 - now.getDay()) % 7 || 7));
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function LeaderboardPage() {
  const [open, setOpen] = useState(0);
  const rankDate = useSyncExternalStore(subscribeNever, nextSunday, () => "");
  return (
    <div>
      <DarkHero
        title="Leaderboard"
        aside={
          <div className="text-center text-white">
            <p className="text-[13px] font-semibold">Weekly rank update on:</p>
            <p className="mt-2 rounded-[12px] bg-white/10 px-6 py-3 text-[22px] font-medium shadow-[0_8px_20px_rgba(0,0,0,0.25)]">{rankDate || "—"}</p>
          </div>
        }
      >
        Compete with fellow learners for great rewards. Keep learning to unlock higher leagues, climb the leaderboard and win bigger prizes every week. Your weekly XP decides your league once the rankings are out.
      </DarkHero>
      <PageContainer>
        <div className="mx-auto flex max-w-[760px] flex-col items-center rounded-[12px] border border-[#D5D9DF] bg-[#F0F0F2] px-6 py-12 text-center">
          <FiLock className="h-7 w-7 text-[#545C69]" />
          <p className="mt-3 text-[15px] font-semibold text-[#0F172A]">Leaderboard is available only for Premium subscribers</p>
          <Link href="/admin/pricing" className="mt-4 inline-flex h-10 items-center rounded-[5px] bg-[#F59E0B] px-8 text-[15px] font-semibold text-[#0F172A] hover:bg-[#E99508]">Upgrade</Link>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          <div>
            <p className="text-[22px] font-semibold text-[#0F172A]">Frequently Asked Questions</p>
            <p className="mt-3 text-[14px] text-[#545C69]">
              Can’t find what you&apos;re looking for? <a href={`mailto:${siteConfig.email}`} className="font-semibold text-[#2563EB]">Contact us</a>
            </p>
          </div>
          <ul className="divide-y divide-[#D5D9DF] border-y border-[#D5D9DF]">
            {leaderboardFaq.map(([question, answer], index) => (
              <li key={question}>
                <button type="button" onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index} className="flex w-full items-center justify-between gap-4 py-4 text-left text-[15px] font-semibold text-[#0F172A]">
                  {question}
                  <FiChevronDown className={`h-5 w-5 shrink-0 transition-transform ${open === index ? "rotate-180" : ""}`} />
                </button>
                {open === index ? <p className="pb-5 text-[14px] leading-6 text-[#545C69]">{answer}</p> : null}
              </li>
            ))}
          </ul>
        </div>
      </PageContainer>
    </div>
  );
}

/* ------------------------------ Notifications ----------------------------- */

export function NotificationsPage() {
  const [tab, setTab] = useState("Enabled");
  const [category, setCategory] = useState(notificationCategories[0]);
  return (
    <PageContainer>
      <div className="flex items-center gap-3">
        <h1 className="text-[24px] font-semibold text-[#0F172A]">Notifications</h1>
        <Link href="/admin/settings/notifications" aria-label="Notification settings" className="text-[#748190] hover:text-[#0F172A]"><FiSettings className="h-5 w-5" /></Link>
      </div>
      <div className="mt-5 flex max-w-[220px] border-b-2 border-[#D5D9DF]">
        {["Enabled", "Disabled"].map((name) => (
          <button key={name} type="button" onClick={() => setTab(name)} className={`-mb-[2px] flex-1 border-b-2 pb-2 text-[14px] font-semibold ${tab === name ? "border-[#2563EB] text-[#2563EB]" : "border-transparent text-[#748190]"}`}>{name}</button>
        ))}
      </div>
      <div className="mt-6 flex justify-end gap-2">
        <button type="button" disabled className="h-9 rounded-[5px] border border-[#E5E7EB] px-4 text-[13px] font-semibold text-[#CBD2DC]">Mark as read</button>
        <button type="button" disabled className="h-9 rounded-[5px] border border-[#E5E7EB] px-4 text-[13px] font-semibold text-[#CBD2DC]">Delete</button>
        <input type="checkbox" disabled aria-label="Select all" className="ml-2 h-4 w-4 self-center" />
      </div>
      <div className="mt-4 grid gap-6 md:grid-cols-[180px_minmax(0,1fr)]">
        <ul className="flex gap-1 overflow-x-auto md:flex-col">
          {notificationCategories.map((name) => (
            <li key={name}>
              <button type="button" onClick={() => setCategory(name)} className={`w-full rounded-[6px] px-3 py-2 text-left text-[14px] ${category === name ? "font-semibold text-[#2563EB]" : "text-[#0F172A] hover:bg-[#F3F5F8]"}`}>{name}</button>
            </li>
          ))}
        </ul>
        <p className="text-[14px] text-[#545C69]">No notifications</p>
      </div>
    </PageContainer>
  );
}

/* -------------------------------- Referrals ------------------------------- */

function InviteModal({ open, onClose }) {
  const link = `https://skillvexa.com/invite/${dashboardUser.name.toLowerCase().replace(/\s+/g, "-")}`;
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <Modal open={open} onClose={onClose} label="Invite friends">
      <div className="p-8">
        <p className="text-[22px] font-semibold">Invite friends</p>
        <p className="mt-1 text-[14px] text-[#748190]">Your friends get 50% off the Annual Plan when they join with your link.</p>
        <p className="mt-6 text-[14px] font-semibold">Share your link</p>
        <div className="mt-2 flex gap-2">
          <input readOnly value={link} className="h-11 min-w-0 flex-1 rounded-[6px] border border-[#D5D9DF] bg-[#F5F7FA] px-3 text-[14px]" />
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(link);
                setCopied(true);
              } catch {
                setCopied(false);
              }
            }}
            className="inline-flex h-11 items-center gap-2 rounded-[6px] bg-[#2563EB] px-4 text-[14px] font-semibold text-white"
          >
            {copied ? <FiCheck className="h-4 w-4" /> : <FiCopy className="h-4 w-4" />} {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <p className="mt-6 text-[14px] font-semibold">Or send an email</p>
        <form
          className="mt-2 flex gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            if (/^\S+@\S+\.\S+$/.test(email)) {
              window.location.href = `mailto:${email}?subject=${encodeURIComponent(`Join me on ${siteConfig.name}`)}&body=${encodeURIComponent(`I'm learning on ${siteConfig.name}. Use my link to get 50% off: ${link}`)}`;
              setSent(true);
            }
          }}
        >
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="friend@example.com" className="h-11 min-w-0 flex-1 rounded-[6px] border border-[#D5D9DF] px-3 text-[14px] outline-none focus:border-[#2563EB]" />
          <button type="submit" className="inline-flex h-11 items-center gap-2 rounded-[6px] border border-[#2563EB] px-4 text-[14px] font-semibold text-[#2563EB]"><FiMail className="h-4 w-4" /> Send</button>
        </form>
        {sent ? <p className="mt-2 text-[13px] text-[#15803D]">Your email app has been opened with the invitation.</p> : null}
      </div>
    </Modal>
  );
}

export function ReferralsPage() {
  const [inviteOpen, setInviteOpen] = useState(false);
  return (
    <div>
      <section className="relative overflow-hidden bg-[#0F172A]">
        <Image src="/images/reviews/hero-mosaic.png" alt="" fill priority sizes="100vw" className="object-cover object-right opacity-60" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#0F172A_0%,rgba(15,23,42,0.92)_45%,rgba(15,23,42,0.25)_100%)]" />
        <div className={`relative ${containerClass} py-12 lg:py-16`}>
          <div className="max-w-[520px] text-white">
            <h1 className="text-[30px] font-semibold leading-tight sm:text-[34px]">Refer friends and family to earn <span className="text-[#93C5FD]">free lifetime access</span></h1>
            <p className="mt-4 text-[15px] leading-6 text-white/85">Know someone who would love {siteConfig.name}? When a friend subscribes for <span className="text-[#93C5FD]">1 year</span>, you both get great rewards.</p>
            <p className="mt-2 text-[15px] leading-6 text-white/85">Lots of friends? Refer 5 or more and earn <span className="text-[#93C5FD]">free lifetime access</span>.</p>
            <p className="mt-4 text-[12px] text-white/60">Please note: rewards are granted only for subscriptions made through your unique referral link.</p>
            <button type="button" onClick={() => setInviteOpen(true)} className="mt-6 h-11 rounded-[5px] bg-[#2563EB] px-6 text-[15px] font-semibold text-white hover:bg-[#1D4ED8]">Invite friends</button>
          </div>
        </div>
      </section>

      <PageContainer>
        <p className="text-[20px] font-semibold text-[#3D4653]">Good friends are hard to find but surprisingly easy to refer</p>
        <div className="mt-4 rounded-[15px] bg-white p-6 shadow-[0_6px_20px_rgba(15,23,42,0.08)] sm:p-8">
          <div className="flex flex-wrap items-center gap-6">
            <p className="text-[28px] font-semibold text-[#0F172A]">0 <span className="text-[16px] font-medium text-[#748190]">/5 friends</span></p>
            <span className="h-2 min-w-[200px] flex-1 overflow-hidden rounded-full bg-[#E5E7EB]"><span className="block h-full w-0 bg-[#2563EB]" /></span>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#FEF3C7] px-4 py-1.5 text-[12px] font-bold tracking-[0.04em] text-[#B45309]"><FiGift className="h-4 w-4" /> LIFETIME ACCESS</span>
          </div>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div>
              <p className="text-[16px] font-semibold text-[#0F172A]">How to refer friends</p>
              <ol className="mt-3 space-y-2 text-[14px] text-[#3D4653]">
                <li>1. Click the Invite friends button;</li>
                <li>2. Send your friends an email or share your link;</li>
                <li>3. When a friend subscribes through your link, you both receive rewards.</li>
              </ol>
            </div>
            <div className="space-y-2 text-[14px] leading-6 text-[#545C69]">
              <p>You can invite as many friends as you like—credit is given for friends who choose the annual plan.</p>
              <p>Friends who join through your invitation get 50% off their annual plan.</p>
            </div>
          </div>
        </div>

        <p className="mt-12 text-[20px] font-semibold text-[#3D4653]">Rewards</p>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {referralRewards.map((reward) => (
            <div key={reward.place} className="flex flex-col items-center rounded-[12px] bg-white p-5 text-center shadow-[0_4px_14px_rgba(15,23,42,0.08)]">
              <p className="text-[22px] font-semibold text-[#0F172A]">{reward.place}</p>
              <p className="text-[12px] text-[#748190]">Friend</p>
              <div className="mt-3 flex flex-1 flex-col gap-1.5">
                {reward.perks.map((perk) => <span key={perk} className="rounded-[4px] bg-[#EFF4FF] px-2 py-1 text-[10px] font-bold tracking-[0.03em] text-[#2563EB]">{perk}</span>)}
              </div>
              {reward.coins ? <span className="mt-3"><CoinBadge>{reward.coins}</CoinBadge></span> : null}
            </div>
          ))}
        </div>

        <p className="mt-12 text-[20px] font-semibold text-[#3D4653]">Invited friends</p>
        <div className="mt-4 flex flex-col items-center rounded-[12px] bg-white px-6 py-12 text-center shadow-[0_4px_14px_rgba(15,23,42,0.06)]">
          <p className="max-w-[520px] text-[14px] text-[#545C69]">Invite your friends to {siteConfig.name} and they’ll get 50% off the Annual Plan.</p>
          <button type="button" onClick={() => setInviteOpen(true)} className="mt-5 h-11 rounded-[5px] bg-[#2563EB] px-6 text-[15px] font-semibold text-white hover:bg-[#1D4ED8]">Invite friends</button>
        </div>
      </PageContainer>
      <InviteModal open={inviteOpen} onClose={() => setInviteOpen(false)} />
    </div>
  );
}

/* --------------------------------- Pricing -------------------------------- */

export function PricingPage() {
  return <PricingExperience dashboard />;
}
