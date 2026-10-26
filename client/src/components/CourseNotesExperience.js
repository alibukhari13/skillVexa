"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FiArrowUpRight,
  FiBookOpen,
  FiColumns,
  FiFileText,
  FiPieChart,
  FiSearch,
  FiTarget,
  FiX,
} from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";

const resourceTypes = [
  { name: "All", href: "/study-kit", icon: FiFileText },
  { name: "Course Notes", href: "/study-kit/course-notes", icon: FiBookOpen },
  { name: "Templates", href: "/study-kit/coding-templates", icon: FiColumns },
  { name: "Infographics", href: "/study-kit/infographics", icon: FiPieChart },
  { name: "Career Guides", href: "/career-kit/career-guides", icon: FiTarget },
  { name: "Practice Exams", href: "/study-kit/practice-exams", icon: FaGraduationCap },
];

const topics = ["All", "Python", "Excel", "SQL", "Theory"];
const covers = [
  "/images/interview/video-cover.png",
  "/images/reviews/hero-mosaic.png",
  "/images/outcomes/hero.png",
  "/images/interview/hero.png",
  "/images/interview/how-it-works.png",
  "/images/outcomes/device-phone.png",
  "/images/interview/video-cover.png",
  "/images/reviews/hero-mosaic.png",
  "/images/outcomes/hero.png",
];
const notes = covers.map((image, index) => ({
  id: `course-note-${index + 1}`,
  image,
  topic: ["Python", "Python", "Python", "Python", "Python", "Python", "Python", "Python", "Python"][index],
}));

const noteDescription =
  "Set yourself up for success in artificial intelligence with our AI Interview Guide—a comprehensive collection of AI interview questions to help you excel and land your dream role. This guide is tailored to help you prepare with confidence.";

function NoteCard({ note, onOpen }) {
  return (
    <article className="group flex h-full min-w-0 flex-col rounded-[18px] border border-[#E9EDF3] bg-white p-3 shadow-[0_3px_12px_rgba(15,23,42,0.09)] transition-shadow duration-300 hover:shadow-[0_12px_28px_rgba(15,23,42,0.14)] lg:min-h-[600px]">
      <button type="button" onClick={onOpen} className="relative block aspect-[1.64] w-full overflow-hidden rounded-[12px] bg-[#EAF0FA]" aria-label="Preview Intro to AI Course Notes">
        <Image src={note.image} alt="" fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
      </button>
      <div className="flex flex-1 flex-col px-0.5 pb-1 pt-3">
        <div className="flex flex-col items-start gap-2">
          <span className="rounded-full bg-[#E9EFFF] px-3 py-[6px] text-[11px] font-medium leading-4 text-[#2563EB]">COURSE NOTES</span>
          <span className="rounded-full bg-[#E9EFFF] px-3 py-[6px] text-[11px] font-medium leading-4 text-[#2563EB]">{note.topic.toUpperCase()}</span>
        </div>
        <h2 className="mt-3 font-display text-[20px] font-semibold leading-[1.25] text-[#111827]">Intro to AI Course Notes</h2>
        <p className="mt-2 line-clamp-4 text-[14px] leading-[1.45] text-[#626B78]">{noteDescription}</p>
        <button type="button" onClick={onOpen} className="mt-auto inline-flex items-center gap-2 pt-4 text-[14px] font-semibold text-[#2563EB] transition-colors hover:text-[#1D4ED8]">Learn More <FiArrowUpRight size={17} /></button>
      </div>
    </article>
  );
}

function NotePreview({ note, onClose }) {
  if (!note) return null;
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-[#0F172A]/70 px-4 py-8 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="note-preview-title" className="relative w-full max-w-[640px] overflow-hidden rounded-[20px] bg-white shadow-2xl">
        <button type="button" onClick={onClose} aria-label="Close notes preview" className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-[#0F172A] shadow-md hover:bg-[#F2F5FA]"><FiX size={19} /></button>
        <div className="relative aspect-[1.8] w-full bg-[#EAF0FA]"><Image src={note.image} alt="" fill sizes="640px" className="object-cover" /></div>
        <div className="p-6 sm:p-8">
          <span className="rounded-full bg-[#E9EFFF] px-3 py-1.5 text-xs font-semibold text-[#2563EB]">COURSE NOTES · {note.topic.toUpperCase()}</span>
          <h2 id="note-preview-title" className="mt-4 font-display text-2xl font-semibold text-[#0F172A]">Intro to AI Course Notes</h2>
          <p className="mt-3 text-sm leading-6 text-[#626B78]">{noteDescription}</p>
          <Link href="/courses/machine-learning" onClick={onClose} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1D4ED8]">Explore related course <FiArrowUpRight size={16} /></Link>
        </div>
      </section>
    </div>
  );
}

export default function CourseNotesExperience() {
  const [topic, setTopic] = useState("All");
  const [query, setQuery] = useState("");
  const [preview, setPreview] = useState(null);

  const visibleNotes = useMemo(() => {
    const search = query.trim().toLowerCase();
    return notes.filter((note) => {
      const matchesTopic = topic === "All" || note.topic === topic;
      const matchesSearch = !search || `intro to ai course notes python course notes ${noteDescription}`.toLowerCase().includes(search);
      return matchesTopic && matchesSearch;
    });
  }, [query, topic]);

  return (
    <main className="course-notes-page">
      <section className="bg-[#0F172A] text-white">
        <div className="mx-auto max-w-[1440px] px-5 pb-16 pt-[160px] text-center sm:px-8 lg:px-6">
          <h1 className="font-display text-[38px] font-medium leading-[1.2] tracking-[-0.025em] text-white sm:text-[42px]">Data Science Course Notes</h1>
          <p className="mx-auto mt-4 max-w-[610px] text-[15px] leading-[22px] text-[#F1F3F8]">
            At 365 Data Science, we support you in pursuing your goals and finding a career that fits your needs. Understand the plethora of data and AI jobs and what it takes to succeed in today&apos;s job market.
          </p>
          <form onSubmit={(event) => event.preventDefault()} role="search" className="mx-auto mt-[60px] flex h-[60px] w-full max-w-[600px] items-center gap-3 rounded-full bg-white p-1.5 pl-7 text-left">
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Course Notes" aria-label="Search Course Notes" className="min-w-0 flex-1 bg-transparent text-[15px] text-[#252B35] outline-none placeholder:text-[#9BA1AA]" />
            <button type="submit" className="h-full min-w-[120px] rounded-full bg-[#2563EB] px-7 text-[14px] font-medium text-white transition-colors hover:bg-[#1D4ED8]">Search</button>
          </form>
          <nav aria-label="Study kit resources" className="mx-auto mt-12 flex max-w-[1160px] justify-between gap-2 overflow-x-auto scrollbar-none">
            {resourceTypes.map(({ name, href, icon: Icon }) => {
              const selected = name === "Course Notes";
              return <Link key={name} href={href} aria-current={selected ? "page" : undefined} className={`flex min-w-[112px] shrink-0 flex-col items-center gap-3 text-center transition-colors ${selected ? "text-[#F59E0B]" : "text-white hover:text-[#F59E0B]"}`}>
                <span className={`grid h-[72px] w-[72px] place-items-center rounded-full ${selected ? "bg-[#F59E0B] text-white" : "bg-[#17243B] text-white"}`}><Icon size={28} strokeWidth={1.7} /></span>
                <span className="whitespace-nowrap text-[14px] leading-5">{name}</span>
              </Link>;
            })}
          </nav>
        </div>
      </section>

      <section id="notes" className="bg-white px-6 pb-10 pt-20 sm:px-8 lg:px-6">
        <div className="mx-auto max-w-[1392px]">
          <div className="flex justify-center gap-8 sm:gap-10" role="group" aria-label="Filter notes by topic">
            {topics.map((item) => <button key={item} type="button" aria-pressed={topic === item} onClick={() => setTopic(item)} className={topic === item ? "h-[56px] min-w-[108px] rounded-full bg-[#111827] px-7 text-[15px] font-medium text-white" : "h-[56px] px-1 text-[15px] font-semibold text-[#4B4B4B] transition-colors hover:text-[#2563EB]"}>{item}</button>)}
          </div>
          <p className="mt-[60px] text-[15px] leading-[22px] text-[#272D36]">Save yourself hours of browsing the internet and reading fragmented, outdated information. Our meticulously curated data and AI career guides assist you at every stage of your journey, providing the knowledge, support, and expert advice to find a job that aligns with your needs and interests.</p>
          {visibleNotes.length ? <div className="mt-[60px] grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {visibleNotes.map((note) => <NoteCard key={note.id} note={note} onOpen={() => setPreview(note)} />)}
          </div> : <p className="mt-14 rounded-2xl bg-[#F6F8FB] px-6 py-12 text-center text-[#626B78]">No course notes match that search. Try another keyword or topic.</p>}
          <section className="mt-[300px] rounded-[24px] bg-[linear-gradient(118deg,#DCE6FF_0%,#F4F0E9_53%,#FFE4B2_100%)] px-6 py-14 text-center sm:px-10 sm:py-16">
            <h2 className="mx-auto max-w-[560px] font-display text-[40px] font-medium leading-[1.12] tracking-[-0.025em] text-[#0F172A] sm:text-[48px]">Your Next <span className="text-[#2563EB]">Skill Starts</span><br />Here</h2>
            <p className="mx-auto mt-5 max-w-[560px] text-[14px] leading-5 text-[#252B35]">Build real-world skills, follow personalized career paths, and prepare for the opportunities of tomorrow all in one place.</p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/get-started" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#2563EB] px-6 text-[14px] font-medium text-white transition-colors hover:bg-[#1D4ED8]">Start Learning Free <FiArrowUpRight size={16} /></Link>
              <Link href="/career-paths" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#F59E0B] px-6 text-[14px] font-medium text-[#111827] transition-colors hover:bg-[#E99508]">Explore Career Paths <FiArrowUpRight size={16} /></Link>
            </div>
          </section>
        </div>
      </section>
      <NotePreview note={preview} onClose={() => setPreview(null)} />
    </main>
  );
}
