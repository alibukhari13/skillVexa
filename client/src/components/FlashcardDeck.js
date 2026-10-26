"use client";

import Link from "next/link";
import { useState } from "react";
import { FiArrowLeft, FiCheck, FiRefreshCw, FiRotateCw } from "react-icons/fi";
import { FLASHCARDS_PROGRESS_KEY } from "@/components/FlashcardsExperience";
import { deckAuthor, flashcardDecks } from "@/config/FlashcardsData";
import { useStoredValue } from "@/lib/useStoredValue";

function DeckHeader({ deck, mode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <Link href="/study-kit/flashcards" className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#2563EB]"><FiArrowLeft className="h-4 w-4" /> All decks</Link>
        <h1 className="mt-3 font-display text-[34px] font-semibold leading-tight text-[#0F172A]">{deck.title}</h1>
        <p className="mt-1 text-[14px] text-[#626B78]">Author: {deckAuthor} · Cards: {deck.cards.length} · {deck.topic}</p>
      </div>
      {mode === "preview" ? (
        <Link href={`/study-kit/flashcards/${deck.id}/review`} className="inline-flex h-12 items-center rounded-full bg-[#2563EB] px-8 text-[15px] font-semibold text-white hover:bg-[#1D4ED8]">Start</Link>
      ) : (
        <Link href={`/study-kit/flashcards/${deck.id}`} className="inline-flex h-12 items-center rounded-full border border-[#2563EB] px-8 text-[15px] font-semibold text-[#2563EB] hover:bg-[#EFF4FF]">Preview</Link>
      )}
    </div>
  );
}

function Review({ deck }) {
  const [progress, setProgress] = useStoredValue(FLASHCARDS_PROGRESS_KEY, {});
  const all = progress || {};
  const state = all[deck.id] || { known: [], completed: false };
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [finished, setFinished] = useState(false);
  const [question, answer] = deck.cards[index];

  const record = (known) => {
    const knownList = known ? [...new Set([...state.known, index])] : state.known.filter((item) => item !== index);
    const done = index === deck.cards.length - 1;
    setProgress({ ...all, [deck.id]: { known: knownList, completed: done || state.completed } });
    setFlipped(false);
    if (done) setFinished(true);
    else setIndex(index + 1);
  };

  if (finished) {
    const knownCount = (progress?.[deck.id]?.known || []).length;
    return (
      <div className="mx-auto mt-10 max-w-[640px] rounded-[20px] bg-white p-10 text-center shadow-[0_6px_20px_rgba(15,23,42,0.08)]">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#DCFCE7] text-[#15803D]"><FiCheck className="h-7 w-7" /></span>
        <p className="mt-4 font-display text-[28px] font-semibold text-[#0F172A]">Deck finished!</p>
        <p className="mt-2 text-[15px] text-[#626B78]">You know {knownCount} of {deck.cards.length} cards.</p>
        <div className="mt-6 flex justify-center gap-3">
          <button type="button" onClick={() => { setIndex(0); setFinished(false); setFlipped(false); }} className="inline-flex h-12 items-center gap-2 rounded-full bg-[#2563EB] px-7 text-[15px] font-semibold text-white"><FiRefreshCw className="h-4 w-4" /> Review again</button>
          <Link href="/study-kit/flashcards" className="inline-flex h-12 items-center rounded-full border border-[#D5D9DF] px-7 text-[15px] font-semibold text-[#0F172A]">More decks</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 max-w-[720px]">
      <div className="flex items-center gap-4 text-[14px] text-[#626B78]">
        <span className="font-semibold text-[#0F172A]">{index + 1}/{deck.cards.length}</span>
        <span className="h-2 flex-1 overflow-hidden rounded-full bg-[#E5E7EB]"><span className="block h-full rounded-full bg-[#2563EB]" style={{ width: `${((index + 1) / deck.cards.length) * 100}%` }} /></span>
        <span>{state.known.length} known</span>
      </div>
      <button type="button" onClick={() => setFlipped((value) => !value)} aria-label={flipped ? "Show question" : "Show answer"} className="mt-6 block h-[320px] w-full [perspective:1400px]">
        <span className={`relative block h-full w-full rounded-[20px] transition-transform duration-500 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}>
          <span className="absolute inset-0 flex flex-col items-center justify-center rounded-[20px] bg-[#0F172A] px-10 text-center text-white shadow-[0_10px_30px_rgba(15,23,42,0.2)] [backface-visibility:hidden]">
            <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#93C5FD]">Question</span>
            <span className="mt-4 font-display text-[26px] font-semibold leading-snug">{question}</span>
            <span className="mt-8 inline-flex items-center gap-2 text-[13px] text-white/60"><FiRotateCw className="h-4 w-4" /> Click to flip</span>
          </span>
          <span className="absolute inset-0 flex flex-col items-center justify-center rounded-[20px] border border-[#E9EDF3] bg-white px-10 text-center text-[#0F172A] shadow-[0_10px_30px_rgba(15,23,42,0.12)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#2563EB]">Answer</span>
            <span className="mt-4 text-[20px] leading-8">{answer}</span>
          </span>
        </span>
      </button>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {flipped ? (
          <>
            <button type="button" onClick={() => record(false)} className="h-12 min-w-[170px] rounded-full border border-[#F59E0B] px-6 text-[15px] font-semibold text-[#B45309] hover:bg-[#FFF7E6]">Still learning</button>
            <button type="button" onClick={() => record(true)} className="h-12 min-w-[170px] rounded-full bg-[#2563EB] px-6 text-[15px] font-semibold text-white hover:bg-[#1D4ED8]">I know it</button>
          </>
        ) : (
          <button type="button" onClick={() => setFlipped(true)} className="h-12 min-w-[200px] rounded-full bg-[#0F172A] px-6 text-[15px] font-semibold text-white">Show answer</button>
        )}
      </div>
    </div>
  );
}

export default function FlashcardDeck({ deckId, mode = "preview" }) {
  const deck = flashcardDecks.find((item) => item.id === deckId);
  return (
    <main className="bg-[#FAFAFB] px-5 pb-24 pt-14 sm:px-8">
      <div className="mx-auto max-w-[1000px]">
        <DeckHeader deck={deck} mode={mode} />
        {mode === "review" ? (
          <Review deck={deck} />
        ) : (
          <ol className="mt-10 grid gap-4 sm:grid-cols-2">
            {deck.cards.map(([question, answer], index) => (
              <li key={question} className="rounded-[16px] border border-[#E9EDF3] bg-white p-6 shadow-[0_3px_12px_rgba(15,23,42,0.06)]">
                <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#2563EB]">Card {index + 1}</p>
                <p className="mt-2 text-[16px] font-semibold text-[#0F172A]">{question}</p>
                <p className="mt-2 text-[14px] leading-6 text-[#626B78]">{answer}</p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </main>
  );
}
