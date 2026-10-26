"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FiArrowUpRight, FiChevronDown, FiChevronUp, FiSearch } from "react-icons/fi";
import { deckAuthor, flashcardDecks, flashcardsFaq } from "@/config/FlashcardsData";
import { useStoredValue } from "@/lib/useStoredValue";

export const FLASHCARDS_PROGRESS_KEY = "skillvexa-flashcards-progress";

const sizeBands = [
  { label: "<6 Cards", test: (count) => count < 6 },
  { label: "6-7 Cards", test: (count) => count >= 6 && count <= 7 },
  { label: ">7 Cards", test: (count) => count > 7 },
];

function FilterGroup({ title, options, selected, onToggle }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-[#E5E7EB] pb-6 pt-5 first:pt-0 last:border-b-0">
      <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} className="flex w-full items-center justify-between text-left text-[15px] font-medium text-[#0F172A]">
        {title}
        <FiChevronUp className={`h-4 w-4 text-[#748190] transition-transform ${open ? "" : "rotate-180"}`} />
      </button>
      {open ? (
        <ul className="mt-3 flex flex-col gap-1">
          {options.map((option) => (
            <li key={option}>
              <button
                type="button"
                aria-pressed={selected.includes(option)}
                onClick={() => onToggle(option)}
                className={`w-full rounded-[4px] px-3 py-[7px] text-left text-[13px] transition-colors ${selected.includes(option) ? "bg-[#2563EB] font-medium text-white" : "bg-[#EEF0F3] text-[#0F172A] hover:bg-[#E2E6EC]"}`}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function DeckCard({ deck }) {
  const info = (
    <p className="flex items-center justify-center gap-2 text-[14px]">
      <span><span className="opacity-75">Author:</span> {deckAuthor}</span>
      <span className="h-1 w-1 rounded-full bg-current" />
      <span><span className="opacity-75">Cards:</span> {deck.cards.length}</span>
    </p>
  );
  return (
    <article className="group h-[220px] [perspective:1200px]">
      <div className="relative h-full w-full rounded-[16px] transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 overflow-hidden rounded-[16px] bg-[#0F172A] text-white shadow-[0_6px_20px_rgba(15,23,42,0.18)] [backface-visibility:hidden]">
          <Image src={deck.image} alt="" fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover opacity-45" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.2)_0%,rgba(15,23,42,0.85)_100%)]" />
          <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
            <h2 className="font-display text-[24px] font-semibold leading-tight">{deck.title}</h2>
          </div>
          <div className="absolute inset-x-0 bottom-5 text-white/90">{info}</div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-[16px] border border-[#E9EDF3] bg-white px-6 text-center text-[#0F172A] shadow-[0_6px_20px_rgba(15,23,42,0.12)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="font-display text-[20px] font-semibold">{deck.title}</p>
          <div className="text-[#626B78]">{info}</div>
          <div className="flex gap-3">
            <Link href={`/study-kit/flashcards/${deck.id}/review`} className="inline-flex h-11 min-w-[110px] items-center justify-center rounded-full bg-[#2563EB] px-6 text-[14px] font-semibold text-white hover:bg-[#1D4ED8]">Start</Link>
            <Link href={`/study-kit/flashcards/${deck.id}`} className="inline-flex h-11 min-w-[110px] items-center justify-center rounded-full border border-[#2563EB] px-6 text-[14px] font-semibold text-[#2563EB] hover:bg-[#EFF4FF]">Preview</Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function FlashcardsExperience() {
  const [tab, setTab] = useState("All decks");
  const [query, setQuery] = useState("");
  const [topics, setTopics] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [faqOpen, setFaqOpen] = useState(0);
  const [progress] = useStoredValue(FLASHCARDS_PROGRESS_KEY, {});
  const topicOptions = [...new Set(flashcardDecks.map((deck) => deck.topic))];
  const toggle = (setter) => (value) => setter((list) => (list.includes(value) ? list.filter((item) => item !== value) : [...list, value]));

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return flashcardDecks.filter((deck) => {
      const state = progress?.[deck.id];
      const tabOk = tab === "All decks" || (tab === "Completed" ? state?.completed : state && !state.completed);
      const sizeOk = !sizes.length || sizeBands.some((band) => sizes.includes(band.label) && band.test(deck.cards.length));
      return tabOk && sizeOk && (!topics.length || topics.includes(deck.topic)) && (!q || deck.title.toLowerCase().includes(q));
    });
  }, [progress, query, sizes, tab, topics]);

  return (
    <main className="flashcards-page bg-[#FAFAFB]">
      <section className="px-5 pb-10 pt-14 text-center sm:px-8">
        <h1 className="font-display text-[38px] font-medium leading-[1.2] tracking-[-0.025em] text-[#0F172A] sm:text-[42px]">Data Science Flashcards</h1>
        <p className="mx-auto mt-4 max-w-[620px] text-[15px] leading-[22px] text-[#626B78]">Learn the key ideas of data science, AI and analytics in minutes. Pick a deck, test yourself and track what you know.</p>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 pb-20 sm:px-8">
        <div className="flex max-w-[420px] border-b-2 border-[#D5D9DF]">
          {["All decks", "In progress", "Completed"].map((name) => (
            <button key={name} type="button" onClick={() => setTab(name)} className={`-mb-[2px] flex-1 border-b-2 pb-2.5 text-[14px] font-semibold ${tab === name ? "border-[#2563EB] text-[#2563EB]" : "border-transparent text-[#748190] hover:text-[#0F172A]"}`}>
              {name}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[270px_minmax(0,1fr)] lg:gap-8">
          <aside>
            <p className="mb-5 text-[15px] text-[#0F172A]">Filter by</p>
            <FilterGroup title="Topics" options={topicOptions} selected={topics} onToggle={toggle(setTopics)} />
            <FilterGroup title="Deck Size" options={sizeBands.map((band) => band.label)} selected={sizes} onToggle={toggle(setSizes)} />
          </aside>
          <div className="min-w-0">
            <label className="flex h-11 items-center gap-3 rounded-full border border-[#E5E7EB] bg-white px-5 text-[#748190] focus-within:border-[#2563EB]">
              <FiSearch className="h-[18px] w-[18px]" />
              <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search decks" aria-label="Search decks" className="min-w-0 flex-1 bg-transparent text-[15px] text-[#0F172A] outline-none placeholder:text-[#9BA3AE]" />
            </label>
            <p className="mb-4 mt-4 text-[14px] font-medium text-[#0F172A]">{results.length} results</p>
            {results.length ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {results.map((deck) => <DeckCard key={deck.id} deck={deck} />)}
              </div>
            ) : (
              <p className="rounded-[16px] bg-white px-6 py-12 text-center text-[15px] text-[#626B78]">
                {tab === "All decks" ? "No decks match your filters." : `You don't have any ${tab.toLowerCase()} decks yet.`}
              </p>
            )}
          </div>
        </div>

        <section className="mt-24 grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
          <div>
            <h2 className="font-display text-[30px] font-semibold leading-tight text-[#0F172A]">Frequently Asked Questions</h2>
          </div>
          <ul className="divide-y divide-[#D5D9DF] border-y border-[#D5D9DF]">
            {flashcardsFaq.map(([question, answer], index) => (
              <li key={question}>
                <button type="button" onClick={() => setFaqOpen(faqOpen === index ? -1 : index)} aria-expanded={faqOpen === index} className="flex w-full items-center justify-between gap-4 py-5 text-left text-[16px] font-semibold text-[#0F172A]">
                  {question}
                  <FiChevronDown className={`h-5 w-5 shrink-0 transition-transform ${faqOpen === index ? "rotate-180" : ""}`} />
                </button>
                {faqOpen === index ? <p className="pb-5 text-[15px] leading-6 text-[#626B78]">{answer}</p> : null}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-24 rounded-[24px] bg-[linear-gradient(118deg,#DCE6FF_0%,#F4F0E9_53%,#FFE4B2_100%)] px-6 py-14 text-center sm:px-10 sm:py-16">
          <h2 className="mx-auto max-w-[560px] font-display text-[40px] font-medium leading-[1.12] tracking-[-0.025em] text-[#0F172A] sm:text-[48px]">Your Next <span className="text-[#2563EB]">Skill Starts</span><br />Here</h2>
          <p className="mx-auto mt-5 max-w-[560px] text-[14px] leading-5 text-[#252B35]">Build real-world skills, follow personalized career paths, and prepare for the opportunities of tomorrow all in one place.</p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/get-started" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#2563EB] px-6 text-[14px] font-medium text-white hover:bg-[#1D4ED8]">Start Learning Free <FiArrowUpRight size={16} /></Link>
            <Link href="/courses" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#F59E0B] px-6 text-[14px] font-medium text-[#111827] hover:bg-[#E99508]">Explore Courses <FiArrowUpRight size={16} /></Link>
          </div>
        </section>
      </section>
    </main>
  );
}
