"use client";

import Link from "next/link";
import { useState } from "react";
import { FiCheck, FiCopy, FiShield } from "react-icons/fi";
import { PageContainer, dashboardUser } from "@/components/dashboard/DashboardShell";
import { Toggle } from "@/components/dashboard/DashboardUI";
import { notificationCategories, settingsTabs } from "@/config/AdminContent";
import { useStoredValue } from "@/lib/useStoredValue";


const privacyGroups = [
  {
    title: "Profile Information",
    body: "Your profile shows who you follow and who follows you, your level, learning streak, leaderboard rank, benefits, collectible cards and certificates.",
    options: [["profileInternal", "Make my profile information visible to all SkillVexa users."], ["profileExternal", "Make my profile information visible to external users."]],
  },
  {
    title: "Resume",
    body: "A completed resume shows your name, email, date of birth, summary, work experience, education, certificates, skills, languages and links.",
    options: [["resumeInternal", "Make my resume visible to all SkillVexa users."], ["resumeExternal", "Make my resume visible to external users."]],
  },
  {
    title: "Talent pool",
    body: "Talent Pool shares completed resumes with employers who want to hire people learning on SkillVexa.",
    options: [["talentPool", "Make my resume visible to companies who have access to Talent Pool."]],
  },
  {
    title: "Newsfeed",
    body: "Choose whether others see your achievements in Newsfeed—new levels, collectible cards, streaks, completed collections and weekly goals.",
    options: [["newsfeed", "Make my achievements visible to all SkillVexa users in Newsfeed."]],
  },
];

const card = "rounded-[15px] bg-white p-6 shadow-[0_6px_20px_rgba(15,23,42,0.08)] sm:p-8";
const input = "h-11 w-full rounded-[6px] border border-[#D5D9DF] px-3 text-[14px] outline-none focus:border-[#2563EB] disabled:bg-[#F3F5F8] disabled:text-[#9BA3AE]";

function SaveButton({ saved, onClick, disabled }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className="inline-flex h-10 items-center gap-2 rounded-[5px] bg-[#2563EB] px-6 text-[14px] font-semibold text-white hover:bg-[#1D4ED8] disabled:opacity-50">
      {saved ? <><FiCheck className="h-4 w-4" /> Saved</> : "Save"}
    </button>
  );
}

function General() {
  const [settings, setSettings] = useStoredValue("skillvexa-admin-settings", { name: dashboardUser.name, privacy: {} });
  const [name, setName] = useState(settings.name);
  const [privacy, setPrivacy] = useState(settings.privacy || {});
  const [savedSection, setSavedSection] = useState(null);
  const [copied, setCopied] = useState(false);
  const profileLink = `https://skillvexa.com/profile/${dashboardUser.name.toLowerCase().replace(/\s+/g, "-")}/`;

  return (
    <div className="space-y-5">
      <section className={card}>
        <p className="text-[18px] font-semibold">Personal information</p>
        <span className="mt-5 grid h-20 w-20 place-items-center rounded-full bg-[linear-gradient(135deg,#2563EB_0%,#0F172A_100%)] text-[26px] font-semibold text-white">{dashboardUser.initials}</span>
        <div className="mt-5 max-w-[460px] space-y-3">
          <label className="block">
            <input value={name} onChange={(event) => { setName(event.target.value); setSavedSection(null); }} className={input} />
            <span className="mt-1 block text-[12px] text-[#9BA3AE]">*Please add your real name. This name will be used in your resume and certification.</span>
          </label>
          <input disabled value="Email address (verified)" className={input} />
          <div className="flex justify-end">
            <SaveButton saved={savedSection === "personal"} disabled={!name.trim()} onClick={() => { setSettings({ ...settings, name: name.trim() }); setSavedSection("personal"); }} />
          </div>
        </div>
      </section>

      <section className={`${card} flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <p className="flex items-center gap-2 text-[15px] font-semibold"><FiShield className="h-4 w-4" /> SkillVexa Profile Link</p>
          <Link href="/admin/profile" className="text-[13px] text-[#2563EB] hover:underline">{profileLink}</Link>
        </div>
        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(profileLink);
              setCopied(true);
            } catch {
              setCopied(false);
            }
          }}
          className="inline-flex h-10 items-center gap-2 rounded-[5px] border border-[#D5D9DF] px-5 text-[14px] font-semibold text-[#545C69] hover:text-[#0F172A]"
        >
          {copied ? <FiCheck className="h-4 w-4" /> : <FiCopy className="h-4 w-4" />} {copied ? "Copied" : "Share"}
        </button>
      </section>

      <section className={card}>
        <p className="text-[18px] font-semibold">Time zone</p>
        <div className="mt-4 flex h-11 max-w-[460px] items-center rounded-[6px] border border-[#E5E7EB] bg-[#F5F7FA] px-3 text-[14px] text-[#9BA3AE]">(UTC+05:00) Islamabad, Karachi</div>
        <p className="mt-1.5 text-[12px] text-[#9BA3AE]">*This field is temporarily disabled. You can change this setting in 48 hours.</p>
      </section>

      <section className={card}>
        <p className="text-[18px] font-semibold">Privacy</p>
        <p className="mt-2 max-w-[640px] text-[14px] text-[#545C69]">Control who can see what you share on SkillVexa. These settings help you make the right choices for your account.</p>
        <p className="mt-6 text-[15px] font-semibold">Profile visibility <span className="ml-2 rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-[12px] text-[#15803D]">Public</span></p>
        <div className="mt-4 divide-y divide-[#EEF0F3]">
          {privacyGroups.map((group) => (
            <div key={group.title} className="py-5">
              <p className="text-[15px] font-semibold">{group.title}</p>
              <p className="mt-1 text-[13px] leading-5 text-[#748190]">{group.body}</p>
              <ul className="mt-3 space-y-3">
                {group.options.map(([key, label]) => (
                  <li key={key} className="flex items-center justify-between gap-4 text-[14px]">
                    {label}
                    <Toggle checked={Boolean(privacy[key])} onChange={(value) => { setPrivacy({ ...privacy, [key]: value }); setSavedSection(null); }} label={label} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <SaveButton saved={savedSection === "privacy"} onClick={() => { setSettings({ ...settings, privacy }); setSavedSection("privacy"); }} />
        </div>
      </section>
    </div>
  );
}

function Billing() {
  return (
    <div className="space-y-5">
      <section className={card}>
        <p className="text-[18px] font-semibold">Subscription</p>
        <p className="mt-4 text-[14px] text-[#545C69]">Current plan: <span className="ml-1 rounded-full border border-[#0F172A] px-3 py-0.5 text-[13px] font-semibold text-[#0F172A]">Free</span></p>
        <p className="mt-3 text-[14px] text-[#748190]">Upgrade to unlock every course, project, career track and the Leaderboard.</p>
        <Link href="/admin/pricing" className="mt-5 inline-flex h-10 items-center rounded-[5px] bg-[#F59E0B] px-6 text-[14px] font-semibold text-[#0F172A] hover:bg-[#E99508]">Upgrade</Link>
      </section>
      <section className={card}>
        <p className="text-[18px] font-semibold">Payment history</p>
        <p className="mt-3 text-[14px] text-[#748190]">No payments yet.</p>
      </section>
    </div>
  );
}

function Notifications() {
  const [prefs, setPrefs] = useStoredValue("skillvexa-admin-notification-prefs", {});
  return (
    <section className={card}>
      <p className="text-[18px] font-semibold">Notifications</p>
      <p className="mt-1 text-[14px] text-[#748190]">Choose which notifications you want to receive on the platform and by email.</p>
      <div className="mt-5 grid grid-cols-[minmax(0,1fr)_70px_70px] gap-y-4 text-[14px]">
        <span />
        <span className="text-center text-[12px] font-semibold uppercase text-[#748190]">Platform</span>
        <span className="text-center text-[12px] font-semibold uppercase text-[#748190]">Email</span>
        {notificationCategories.map((name) => (
          <div key={name} className="contents">
            <span className="font-medium">{name}</span>
            {["platform", "email"].map((channel) => {
              const key = `${name}-${channel}`;
              const value = prefs?.[key] ?? channel === "platform";
              return (
                <span key={channel} className="flex justify-center">
                  <Toggle checked={value} onChange={(next) => setPrefs({ ...(prefs || {}), [key]: next })} label={`${name} ${channel}`} />
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}

function Sounds() {
  const [sounds, setSounds] = useStoredValue("skillvexa-admin-sounds", { effects: true, celebrations: true });
  const options = [["effects", "Sound effects", "Play short sounds when you answer questions and complete lessons."], ["celebrations", "Celebration sounds", "Play a sound when you earn XP, coins or level up."]];
  return (
    <section className={card}>
      <p className="text-[18px] font-semibold">Sounds</p>
      <ul className="mt-5 divide-y divide-[#EEF0F3]">
        {options.map(([key, title, body]) => (
          <li key={key} className="flex items-center justify-between gap-6 py-4">
            <div>
              <p className="text-[15px] font-semibold">{title}</p>
              <p className="text-[13px] text-[#748190]">{body}</p>
            </div>
            <Toggle checked={Boolean(sounds?.[key])} onChange={(value) => setSounds({ ...(sounds || {}), [key]: value })} label={title} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function Security() {
  const [fields, setFields] = useState({ current: "", next: "", confirm: "" });
  const [message, setMessage] = useState(null);
  const submit = (event) => {
    event.preventDefault();
    if (fields.next.length < 8) return setMessage({ error: true, text: "Your new password must be at least 8 characters long." });
    if (fields.next !== fields.confirm) return setMessage({ error: true, text: "Passwords don't match." });
    setFields({ current: "", next: "", confirm: "" });
    setMessage({ error: false, text: "Password change will be available once accounts are connected." });
  };
  return (
    <form onSubmit={submit} className={card}>
      <p className="text-[18px] font-semibold">Change password</p>
      <div className="mt-5 max-w-[420px] space-y-3">
        {[["current", "Current password"], ["next", "New password"], ["confirm", "Confirm new password"]].map(([key, label]) => (
          <input key={key} type="password" autoComplete={key === "current" ? "current-password" : "new-password"} value={fields[key]} onChange={(event) => setFields({ ...fields, [key]: event.target.value })} placeholder={label} className={input} />
        ))}
        {message ? <p className={`text-[13px] ${message.error ? "text-[#B91C1C]" : "text-[#15803D]"}`}>{message.text}</p> : null}
        <div className="flex justify-end">
          <button type="submit" disabled={!fields.current || !fields.next} className="h-10 rounded-[5px] bg-[#2563EB] px-6 text-[14px] font-semibold text-white disabled:opacity-50">Update password</button>
        </div>
      </div>
    </form>
  );
}

const panels = { general: General, billing: Billing, notifications: Notifications, sounds: Sounds, security: Security };

export default function SettingsPage({ tab = "general" }) {
  const Panel = panels[tab] || General;
  const current = settingsTabs.find((item) => item.id === tab) || settingsTabs[0];
  return (
    <PageContainer>
      <div className="grid gap-8 md:grid-cols-[180px_minmax(0,760px)]">
        <nav aria-label="Settings">
          <ul className="flex gap-1 overflow-x-auto md:flex-col">
            {settingsTabs.map((item) => (
              <li key={item.id}>
                <Link href={item.href} aria-current={item.id === current.id ? "page" : undefined} className={`block whitespace-nowrap rounded-[6px] px-3 py-2 text-[14px] ${item.id === current.id ? "font-semibold text-[#2563EB]" : "text-[#0F172A] hover:bg-[#F3F5F8]"}`}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h1 className="mb-5 text-[22px] font-semibold text-[#0F172A]">{current.label}</h1>
          <Panel />
        </div>
      </div>
    </PageContainer>
  );
}
