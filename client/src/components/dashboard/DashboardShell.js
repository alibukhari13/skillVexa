"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpCircle,
  FiAward,
  FiBell,
  FiBookOpen,
  FiBriefcase,
  FiCheck,
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
  FiCompass,
  FiGift,
  FiHelpCircle,
  FiHome,
  FiInfo,
  FiLayers,
  FiLogOut,
  FiSearch,
  FiSettings,
  FiTrendingUp,
  FiUser,
  FiUsers,
  FiX,
} from "react-icons/fi";
import { TbBooks } from "react-icons/tb";
import { Modal, containerClass } from "@/components/dashboard/DashboardUI";
import { siteConfig } from "@/config/SiteConfig";
import { dashboardCourses, dashboardProjects, dashboardTracks } from "@/config/DashboardData";
import { setAdminSession } from "@/lib/adminSession";

export const dashboardUser = { name: "Ali Bukhari", initials: "AB", level: 1, maxLevel: 10, xp: 0, xpGoal: 60, coins: 0 };

// Mirrors the 365 learner sidebar. Items marked `external` open the public
// SkillVexa website in the same tab; everything else stays inside /admin.
export const dashboardNav = [
  { label: "Dashboard", href: "/admin", icon: FiHome },
  { label: "Learning path", href: "/admin/learning-path", icon: FiCompass, divider: true },
  { heading: "Learn" },
  { label: "Courses", href: "/admin/courses", icon: FiBookOpen },
  { label: "Career Tracks", href: "/admin/career-tracks", icon: FiTrendingUp },
  {
    label: "Resources",
    icon: TbBooks,
    divider: true,
    children: [
      { label: "Flashcards", href: "/study-kit/flashcards", external: true },
      { label: "Course notes", href: "/study-kit/course-notes", external: true },
      { label: "Infographics", href: "/study-kit/infographics", external: true },
      { label: "Coding templates", href: "/study-kit/coding-templates", external: true },
      { label: "Practice exams", href: "/study-kit/practice-exams", external: true },
    ],
  },
  { heading: "Apply" },
  { label: "Projects", href: "/admin/projects", icon: FiLayers },
  { label: "Exams", href: "/admin/exams", icon: FiCheckCircle },
  {
    label: "Job prep",
    icon: FiBriefcase,
    divider: true,
    children: [
      { label: "Career quiz", href: "/career-kit/career-quiz?source=admin", external: true },
      { label: "Career guides", href: "/career-kit/career-guides", external: true },
      { label: "Resume builder", href: "/admin/resume" },
      { label: "Interview simulator", href: "/career-kit/interview-simulator", external: true },
    ],
  },
  {
    label: "Community",
    icon: FiUsers,
    children: [
      { label: "Q&A", href: "/admin/qa-hub" },
      { label: "Channels", href: "/admin/channels" },
      { label: "Newsfeed", href: "/admin/news-feed" },
    ],
  },
  {
    label: "More",
    icon: FiInfo,
    children: [
      { label: "Leaderboard", href: "/admin/leaderboard" },
      { label: "Card collections", href: "/admin/card-collections" },
      { label: "Back to website", href: "/", external: true, endsAdminSession: true },
    ],
  },
];

const gettingStarted = [
  { label: "Complete your onboarding", xp: "+50 XP", coins: "+2" },
  { label: "Complete a lesson", xp: "+1 XP", card: "+1 card" },
  { label: "Watch 30 minutes of content", xp: "+5 XP", card: "+1 card" },
  { label: "Take a practice exam", xp: "+3 XP", card: "+1 card" },
  { label: "Fill in your resume", xp: "+50 XP", coins: "+1" },
  { label: "Keep your streak for 3 days", xp: "+2 XP/day" },
];

const profileMenu = [
  [
    { label: "My profile", href: "/admin/profile", icon: FiUser },
    { label: "My certificates", href: "/admin/certificates", icon: FiAward },
  ],
  [
    { label: "Account settings", href: "/admin/settings", icon: FiSettings },
    { label: "Support", icon: FiHelpCircle, support: true },
    { label: "Refer a friend", href: "/admin/referrals", icon: FiGift },
    { label: "Upgrade my plan", href: "/admin/pricing", icon: FiArrowUpCircle, accent: true },
  ],
];

// Routes that take over the whole screen in 365 (course player, exam, resume builder).
function isFocusRoute(pathname) {
  return /^\/admin\/courses\/[^/]+/.test(pathname) || /^\/admin\/exams\/[^/]+/.test(pathname) || pathname.startsWith("/admin/resume/builder");
}

function isActive(pathname, href) {
  if (!href) return false;
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function useClickOutside(onOutside, active = true) {
  const ref = useRef(null);
  const handler = useRef(onOutside);
  useEffect(() => {
    handler.current = onOutside;
  });
  useEffect(() => {
    if (!active) return undefined;
    function handle(event) {
      if (ref.current && !ref.current.contains(event.target)) handler.current();
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [active]);
  return ref;
}

export function CoinIcon({ className = "h-[18px] w-[16px]" }) {
  return (
    <svg viewBox="0 0 18 21" fill="none" className={className} aria-hidden="true">
      <path d="M9.1 8.7c4.47 0 8.1-1.61 8.1-3.6S13.57 1.5 9.1 1.5 1 3.11 1 5.1s3.63 3.6 8.1 3.6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1 5.1v10.8c0 1.98 3.6 3.6 8.1 3.6s8.1-1.62 8.1-3.6V5.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17.2 10.5c0 1.98-3.6 3.6-8.1 3.6S1 12.48 1 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlatformSwitch() {
  const [platform, setPlatform] = useState("Data Science");
  return (
    <div className="flex h-9 items-center rounded-full bg-white/10 p-1 text-[12px] font-medium">
      {["Data Science", "Finance"].map((name) => (
        <button
          key={name}
          type="button"
          onClick={() => setPlatform(name)}
          aria-pressed={platform === name}
          className={`h-7 rounded-full px-3 transition-colors ${platform === name ? "bg-[#2563EB] text-white" : "text-white/60 hover:text-white"}`}
        >
          {name}
        </button>
      ))}
    </div>
  );
}

function GettingStarted() {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false), open);
  return (
    <div ref={ref} className="relative hidden lg:block">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex h-9 items-center gap-2 rounded-full bg-[linear-gradient(90deg,#F59E0B_0%,#FBBF24_55%,#FCD34D_100%)] pl-3.5 pr-1.5 text-[13px] font-semibold text-[#0F172A]"
      >
        Getting started <span className="font-medium">(0/{gettingStarted.length})</span>
        <span className="rounded-full border border-[#0F172A]/30 bg-white/40 px-2 py-0.5 text-[11px] font-semibold">+ 50 XP</span>
      </button>
      {open ? (
        <div className="absolute left-0 top-[calc(100%+12px)] z-50 w-[320px] rounded-[12px] bg-white p-3 text-[#0F172A] shadow-[0_12px_32px_rgba(15,23,42,0.18)]">
          {gettingStarted.map((task) => (
            <div key={task.label} className="flex items-start gap-3 rounded-[8px] px-2 py-2.5 hover:bg-[#F5F7FA]">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[#CBD2DC] text-transparent">
                <FiCheck className="h-3 w-3" />
              </span>
              <div className="min-w-0">
                <p className="text-[14px] leading-5">{task.label}</p>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] font-semibold">
                  <span className="rounded-[4px] border border-[#2563EB] px-1.5 py-[1px] text-[#2563EB]">{task.xp}</span>
                  {task.coins ? (
                    <span className="inline-flex items-center gap-1 rounded-[4px] border border-[#F59E0B] px-1.5 py-[1px] text-[#B7791F]">
                      {task.coins} <CoinIcon className="h-3 w-3" />
                    </span>
                  ) : null}
                  {task.card ? <span className="rounded-[4px] border border-[#CBD2DC] px-1.5 py-[1px] text-[#545C69]">{task.card}</span> : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

const searchIndex = [
  ...dashboardCourses.map((course) => ({ type: "Course", title: course.title, href: `/admin/courses/${course.id}` })),
  ...dashboardTracks.map((track) => ({ type: "Career track", title: track.title, href: `/admin/career-tracks/${track.id}` })),
  ...dashboardProjects.map((project) => ({ type: "Project", title: project.title, href: `/admin/projects/${project.id}` })),
];

function SearchBar({ open, onClose }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return searchIndex.filter((item) => item.title.toLowerCase().includes(q)).slice(0, 8);
  }, [query]);

  if (!open) return null;
  return (
    <div className="fixed left-4 right-4 top-[72px] z-50 sm:absolute sm:left-auto sm:right-0 sm:top-[calc(100%+14px)] sm:w-[420px]">
      <input
        autoFocus
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => event.key === "Escape" && onClose()}
        placeholder="Search the platform..."
        className="h-11 w-full rounded-[10px] bg-white px-4 text-[14px] text-[#0F172A] shadow-[0_12px_32px_rgba(15,23,42,0.18)] outline-none placeholder:text-[#9BA3AE]"
      />
      {query.trim() ? (
        <div className="mt-2 max-h-[360px] overflow-y-auto rounded-[10px] bg-white py-2 text-[14px] shadow-[0_12px_32px_rgba(15,23,42,0.18)]">
          {results.length ? (
            results.map((item) => (
              <Link key={item.href} href={item.href} onClick={onClose} className="flex items-center justify-between gap-3 px-4 py-2 text-[#0F172A] hover:bg-[#F5F7FA]">
                <span className="truncate">{item.title}</span>
                <span className="shrink-0 text-[12px] text-[#748190]">{item.type}</span>
              </Link>
            ))
          ) : (
            <p className="px-4 py-2 text-[13px] text-[#748190]">Sorry, but nothing matched your filter.</p>
          )}
        </div>
      ) : null}
    </div>
  );
}

function NotificationsPanel({ onClose }) {
  return (
    <div className="fixed bottom-0 right-0 top-16 z-50 w-full max-w-[404px] bg-white/80 px-6 pb-14 pt-6 text-[#0F172A] shadow-[0_4px_15px_rgba(0,0,0,0.15)] backdrop-blur-[15px]">
      <div className="flex items-center justify-between pb-5 pr-2">
        <h5 className="text-[20px] font-medium">Notifications</h5>
        <Link href="/admin/notifications" onClick={onClose} className="inline-flex items-center gap-1.5 text-[16px] font-semibold text-[#2563EB]">
          See all <FiArrowRight className="h-5 w-5" />
        </Link>
      </div>
      <p className="mt-8 text-center text-[14px] text-[#748190]">No new notifications</p>
    </div>
  );
}

function ReportBugModal({ open, onClose }) {
  const [sent, setSent] = useState(false);
  const [text, setText] = useState("");
  const close = () => {
    onClose();
    setSent(false);
    setText("");
  };
  return (
    <Modal open={open} onClose={close} label="Report a bug">
      <div className="p-8">
        <p className="text-[22px] font-semibold">Report a bug</p>
        {sent ? (
          <p className="mt-4 text-[15px] leading-6 text-[#545C69]">Thank you! Our team will look into it as soon as possible.</p>
        ) : (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (text.trim()) setSent(true);
            }}
          >
            <p className="mt-2 text-[14px] text-[#748190]">Tell us what went wrong and where. Screenshots help, too.</p>
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              rows={5}
              placeholder="Describe the issue..."
              className="mt-5 w-full resize-none rounded-[8px] border border-[#D5D9DF] p-3 text-[14px] outline-none focus:border-[#2563EB]"
            />
            <div className="mt-5 flex justify-end gap-3">
              <button type="button" onClick={close} className="h-10 rounded-[5px] px-5 text-[15px] font-semibold text-[#545C69] hover:text-[#0F172A]">Cancel</button>
              <button type="submit" disabled={!text.trim()} className="h-10 rounded-[5px] bg-[#2563EB] px-5 text-[15px] font-semibold text-white disabled:opacity-50">Send</button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}

function ProfileMenu({ onNavigate, onReportBug }) {
  const [supportOpen, setSupportOpen] = useState(false);
  const item = "flex w-full items-center gap-3 px-4 py-2 text-left text-[14px] transition-colors hover:bg-[#EFF4FF] hover:font-semibold hover:text-[#2563EB]";
  return (
    <div className="absolute right-0 top-[calc(100%+14px)] z-50 w-[230px] rounded-[12px] bg-white py-2 text-[#545C69] shadow-[0_12px_32px_rgba(15,23,42,0.18)]">
      {profileMenu.map((group, index) => (
        <ul key={index} className="mb-2 border-b border-[#E5E7EB] pb-2">
          {group.map(({ label, href, icon: Icon, accent, support }) => (
            <li key={label} className="relative">
              {support ? (
                <>
                  <button type="button" onClick={() => setSupportOpen((value) => !value)} aria-expanded={supportOpen} className={`${item} ${supportOpen ? "bg-[#EFF4FF] font-semibold text-[#2563EB]" : ""}`}>
                    <Icon className="h-4 w-4" />
                    <span className="flex-1">{label}</span>
                    <FiChevronRight className="h-4 w-4 text-[#9BA3AE]" />
                  </button>
                  {supportOpen ? (
                    <ul className="absolute bottom-0 right-[calc(100%+8px)] w-[212px] overflow-hidden rounded-[10px] bg-white py-2 shadow-[0_4px_8px_rgba(0,0,0,0.1)] max-sm:right-0 max-sm:top-full max-sm:bottom-auto">
                      <li>
                        <a href={`mailto:${siteConfig.email}`} className={item}>Help Center</a>
                      </li>
                      <li>
                        <button type="button" onClick={() => { setSupportOpen(false); onReportBug(); }} className={item}>Report a bug</button>
                      </li>
                    </ul>
                  ) : null}
                </>
              ) : (
                <Link href={href} onClick={onNavigate} className={`${item} ${accent ? "text-[#D97706]" : ""}`}>
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      ))}
      <Link href="/" onClick={() => { setAdminSession(false); onNavigate(); }} className={item}>
        <FiLogOut className="h-4 w-4" />
        Log out
      </Link>
    </div>
  );
}

function HeaderActions({ menu, setMenu }) {
  const user = dashboardUser;
  const [bugOpen, setBugOpen] = useState(false);
  const ref = useClickOutside(() => setMenu(null), Boolean(menu) && menu !== "notifications");
  const toggle = (name) => setMenu((current) => (current === name ? null : name));
  const iconButton = "grid h-9 w-9 place-items-center rounded-full text-[#9BA3AE] hover:bg-white/10 hover:text-white";

  return (
    <nav ref={ref} className="flex items-center gap-2 sm:gap-4">
      <Link href="/admin/xp" className="hidden items-center gap-3 text-[13px] xl:flex">
        <span className="text-white/60"><b className="font-semibold text-white">{user.level}</b>/{user.maxLevel} Level</span>
        <span className="relative h-2 w-[120px] overflow-hidden rounded-full bg-white/15">
          <span className="absolute inset-y-0 left-0 rounded-full bg-[#2563EB]" style={{ width: `${(user.xp / user.xpGoal) * 100}%` }} />
        </span>
        <span className="text-white/60"><b className="font-semibold text-white">{user.xp}</b>/{user.xpGoal} <span className="font-semibold text-[#60A5FA]">XP</span></span>
      </Link>
      <span className="hidden h-8 w-px bg-white/15 xl:block" />
      <Link href="/admin/coins" className="hidden items-center gap-1.5 text-[14px] font-semibold sm:flex">
        {user.coins}
        <Image src="/images/dashboard/icon_coins.png" alt="Coins" width={22} height={22} className="h-[22px] w-[22px] object-contain" />
      </Link>

      <div className="relative">
        <button type="button" onClick={() => toggle("search")} aria-label="Search" aria-expanded={menu === "search"} className={iconButton}>
          <FiSearch className="h-5 w-5" />
        </button>
        <SearchBar open={menu === "search"} onClose={() => setMenu(null)} />
      </div>

      <button type="button" onClick={() => toggle("notifications")} aria-label="Notifications" aria-expanded={menu === "notifications"} className={`${iconButton} ${menu === "notifications" ? "bg-white/10 text-white" : ""}`}>
        <FiBell className="h-5 w-5" />
      </button>
      {menu === "notifications" ? <NotificationsPanel onClose={() => setMenu(null)} /> : null}

      <div className="relative">
        <button type="button" onClick={() => toggle("profile")} aria-label="Profile menu" aria-expanded={menu === "profile"} className="grid h-9 w-9 place-items-center rounded-full bg-[#2563EB] text-[13px] font-semibold text-white ring-2 ring-white/15 hover:ring-white/40">
          {user.initials}
        </button>
        {menu === "profile" ? <ProfileMenu onNavigate={() => setMenu(null)} onReportBug={() => { setMenu(null); setBugOpen(true); }} /> : null}
      </div>

      <Link href="/admin/pricing" className="hidden h-10 items-center rounded-[5px] bg-[#F59E0B] px-5 text-[15px] font-semibold text-[#0F172A] transition-colors hover:bg-[#E99508] sm:inline-flex">
        Upgrade
      </Link>
      <ReportBugModal open={bugOpen} onClose={() => setBugOpen(false)} />
    </nav>
  );
}

function TopBar({ onToggleSidebar, sidebarOpen, menu, setMenu }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between gap-4 bg-[#0F172A] px-4 text-white sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3 lg:gap-5">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label={sidebarOpen ? "Close menu" : "Open menu"}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-white/80 hover:bg-white/10 hover:text-white desk:hidden"
        >
          {sidebarOpen ? <FiX className="h-5 w-5" /> : <span className="flex w-[18px] flex-col gap-[4px]"><span className="h-[2px] rounded bg-current" /><span className="h-[2px] rounded bg-current" /><span className="h-[2px] rounded bg-current" /></span>}
        </button>
        <Link href="/admin/learning-path" className="relative block h-[30px] w-[122px] shrink-0">
          <Image src="/images/logo.svg" alt={`${siteConfig.name} Logo`} fill loading="eager" sizes="122px" className="object-contain object-left" />
        </Link>
        <div className="hidden md:block">
          <PlatformSwitch />
        </div>
        <GettingStarted />
      </div>
      <HeaderActions menu={menu} setMenu={setMenu} />
    </header>
  );
}

// Header used by full-screen pages such as the course player.
export function FocusTopBar({ backHref = "/admin", title, progress }) {
  const [menu, setMenu] = useState(null);
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between gap-4 bg-[#0F172A] pr-4 text-white sm:pr-6 lg:pr-8">
      <div className="flex min-w-0 items-center">
        <Link href={backHref} aria-label="Back" className="grid h-16 w-16 shrink-0 place-items-center border-r border-white/10 text-white/70 hover:text-white">
          <FiArrowLeft className="h-5 w-5" />
        </Link>
        <Link href="/admin/learning-path" className="relative ml-5 hidden h-[26px] w-[106px] shrink-0 sm:block">
          <Image src="/images/logo.svg" alt={`${siteConfig.name} Logo`} fill sizes="106px" className="object-contain object-left" />
        </Link>
        {title ? <p className="ml-6 truncate text-[15px] font-semibold">{title}</p> : null}
        {progress ? <p className="ml-4 hidden shrink-0 text-[13px] text-white/60 md:block">{progress}</p> : null}
      </div>
      <HeaderActions menu={menu} setMenu={setMenu} />
    </header>
  );
}

function NavRow({ item, active, collapsed, open, onClick }) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      title={item.label}
      aria-expanded={item.children ? open : undefined}
      aria-current={!item.children && active ? "page" : undefined}
      className={`group flex h-8 w-full items-center gap-3 rounded-[6px] px-3 text-left text-[14px] transition-colors ${
        active || open ? "bg-[#EFF4FF] font-semibold text-[#2563EB]" : "text-[#0F172A] hover:bg-[#F3F5F8]"
      } ${collapsed ? "desk:justify-center desk:px-0" : ""}`}
    >
      <Icon className={`h-[18px] w-[18px] shrink-0 ${active || open ? "text-[#2563EB]" : "text-[#545C69]"}`} />
      <span className={`min-w-0 flex-1 truncate ${collapsed ? "desk:hidden" : ""}`}>{item.label}</span>
      {item.children ? <FiChevronRight className={`h-4 w-4 shrink-0 text-[#9BA3AE] ${collapsed ? "desk:hidden" : ""}`} /> : null}
    </button>
  );
}

function GroupFlyout({ item, pathname, onClose, onNavigate }) {
  const router = useRouter();
  const go = (child) => {
    if (child.endsAdminSession) setAdminSession(false);
    onNavigate();
    router.push(child.href);
  };
  return (
    <div className="max-desk:fixed max-desk:inset-x-0 max-desk:bottom-0 max-desk:top-16 max-desk:z-10 max-desk:w-[240px] max-desk:bg-white max-desk:px-2 max-desk:pt-3 desk:absolute desk:left-[calc(100%+8px)] desk:top-0 desk:w-[212px] desk:overflow-hidden desk:rounded-[10px] desk:bg-white desk:py-2 desk:shadow-[0_4px_8px_rgba(0,0,0,0.1)]">
      <button type="button" onClick={onClose} className="mb-2 flex w-full items-center gap-3 px-3 py-2 text-[12px] font-semibold uppercase text-[#748190] desk:hidden">
        <FiChevronLeft className="h-4 w-4" /> {item.label}
      </button>
      <ul className="flex flex-col gap-0.5 px-2">
        {item.children.map((child) => {
          const selected = isActive(pathname, child.href) && !child.external;
          return (
            <li key={child.href}>
              <a
                href={child.href}
                onClick={(event) => {
                  event.preventDefault();
                  go(child);
                }}
                aria-current={selected ? "page" : undefined}
                className={`block rounded-[6px] px-3 py-2 text-[14px] transition-colors ${
                  selected ? "bg-[#EFF4FF] font-semibold text-[#2563EB]" : "text-[#0F172A] hover:bg-[#EFF4FF] hover:font-semibold hover:text-[#2563EB]"
                }`}
              >
                {child.label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Sidebar({ pathname, collapsed: collapsedSetting, canToggle, onCollapse, mobileOpen, onNavigate }) {
  const router = useRouter();
  // Only one dropdown is open at a time; it closes on outside click and on navigation.
  const [openGroup, setOpenGroup] = useState(null);
  const [openedOn, setOpenedOn] = useState(pathname);
  if (openedOn !== pathname) {
    setOpenedOn(pathname);
    setOpenGroup(null);
  }
  const ref = useClickOutside(() => setOpenGroup(null), Boolean(openGroup));
  // Like 365: a collapsed sidebar expands over the content while one of its dropdowns is open.
  const collapsed = collapsedSetting && !openGroup;

  return (
    <>
      {mobileOpen ? <button type="button" aria-label="Close menu" onClick={onNavigate} className="fixed inset-0 top-16 z-30 bg-[#0F172A]/40 desk:hidden" /> : null}
      <nav
        ref={ref}
        aria-label="Dashboard"
        className={`fixed bottom-0 left-0 top-16 z-40 flex w-[240px] flex-col bg-white shadow-[0_4px_8px_rgba(0,0,0,0.1)] transition-[transform,width] duration-300 desk:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${collapsed ? "rounded-br-[20px] desk:w-[44px] desk:rounded-none" : "rounded-br-[20px] desk:w-[212px]"}`}
      >
        {canToggle ? (
          <button
            type="button"
            onClick={onCollapse}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="absolute -right-4 top-4 z-50 hidden h-8 w-8 items-center justify-center rounded-full border border-[#DCE3EE] bg-white text-[#64748B] shadow-[0_2px_8px_rgba(15,23,42,0.12)] transition-all duration-200 hover:border-[#BFD3FF] hover:bg-[#F8FAFC] hover:text-[#2563EB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] desk:flex"
          >
            <FiChevronLeft className={`h-4 w-4 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`} />
          </button>
        ) : null}
        <div className="flex-1 overflow-y-auto py-2 scrollbar-none desk:overflow-visible">
          <div className="px-4 pb-3 pt-1 md:hidden">
            <div className="rounded-full bg-[#0F172A] p-1"><PlatformSwitch /></div>
          </div>
          {dashboardNav.map((item) => {
            if (item.heading) {
              return (
                <p key={item.heading} className={`px-5 pb-1 pt-2 text-[12px] font-semibold uppercase text-[#748190] ${collapsed ? "desk:hidden" : ""}`}>
                  {item.heading}
                </p>
              );
            }
            const childActive = item.children?.some((child) => !child.external && isActive(pathname, child.href));
            const active = item.href ? isActive(pathname, item.href) : childActive;
            const open = openGroup === item.label;
            return (
              <div key={item.label} className={`relative py-1 ${collapsed ? "px-2 desk:px-1" : "px-2"} ${item.divider ? "mb-2 border-b border-[#D5D9DF] pb-2" : ""}`}>
                <NavRow
                  item={item}
                  active={active}
                  open={open}
                  collapsed={collapsed}
                  onClick={() => {
                    if (item.children) {
                      setOpenGroup(open ? null : item.label);
                    } else {
                      onNavigate();
                      router.push(item.href);
                    }
                  }}
                />
                {item.children && open ? (
                  <GroupFlyout item={item} pathname={pathname} onClose={() => setOpenGroup(null)} onNavigate={onNavigate} />
                ) : null}
              </div>
            );
          })}
        </div>
      </nav>
    </>
  );
}

export default function DashboardShell({ children }) {
  const pathname = usePathname() || "/admin";
  const [collapsed, setCollapsed] = useState(false);
  const [menu, setMenu] = useState(null);
  // The mobile drawer remembers the route it was opened on, so navigating closes it.
  const [openedOn, setOpenedOn] = useState(null);
  const mobileOpen = openedOn === pathname;
  const [menuRoute, setMenuRoute] = useState(pathname);
  if (menuRoute !== pathname) {
    setMenuRoute(pathname);
    setMenu(null);
  }

  // Mark this browser tab as an admin session so website pages opened from the
  // sidebar (Resources, Job prep, ...) link back into /admin.
  useEffect(() => {
    setAdminSession(true);
  }, []);

  // Channels have their own menu, so the main sidebar stays collapsed there (as on 365).
  const isChannelRoute = pathname.startsWith("/admin/channels");
  const sidebarCollapsed = collapsed || isChannelRoute;

  if (isFocusRoute(pathname)) {
    return <div className="dashboard-root min-h-screen bg-[#FAFAFB] text-[#0F172A]">{children}</div>;
  }

  return (
    <div className="dashboard-root min-h-screen bg-[#FAFAFB] text-[#0F172A]">
      <TopBar sidebarOpen={mobileOpen} onToggleSidebar={() => setOpenedOn(mobileOpen ? null : pathname)} menu={menu} setMenu={setMenu} />
      <Sidebar
        pathname={pathname}
        collapsed={sidebarCollapsed}
        canToggle={!isChannelRoute}
        onCollapse={() => setCollapsed((value) => !value)}
        mobileOpen={mobileOpen}
        onNavigate={() => setOpenedOn(null)}
      />
      <div className={`min-w-0 pt-16 transition-[padding] duration-300 ${sidebarCollapsed ? "desk:pl-[44px]" : "desk:pl-[212px]"}`}>{children}</div>
    </div>
  );
}

export function PageContainer({ children, className = "" }) {
  return <div className={`${containerClass} py-8 ${className}`}>{children}</div>;
}
