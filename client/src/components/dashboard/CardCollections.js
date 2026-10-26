"use client";

import Link from "next/link";
import { useState } from "react";
import { FiGift, FiLock } from "react-icons/fi";
import { PageContainer } from "@/components/dashboard/DashboardShell";
import { DarkHero } from "@/components/dashboard/DashboardUI";
import { cardCollections } from "@/config/AdminContent";

function initials(name) {
  return name
    .split(/[\s-]+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function CardCollections() {
  const [tab, setTab] = useState("Collections");
  const [selectedId, setSelectedId] = useState(cardCollections[0].id);
  const collection = cardCollections.find((item) => item.id === selectedId);
  const locked = Boolean(collection.requirement);

  return (
    <div>
      <DarkHero title="Card collections">
        Collect cards that celebrate the pioneers of mathematics, statistics, computer science and more. Unlock hidden benefits and own exclusive, limited-edition cards.
      </DarkHero>
      <PageContainer>
        <div className="flex max-w-[300px] border-b-2 border-[#D5D9DF]">
          {["Collections", "My cards"].map((name) => (
            <button key={name} type="button" onClick={() => setTab(name)} className={`-mb-[2px] flex-1 border-b-2 pb-2.5 text-[14px] font-semibold ${tab === name ? "border-[#2563EB] text-[#2563EB]" : "border-transparent text-[#748190] hover:text-[#0F172A]"}`}>
              {name}
            </button>
          ))}
        </div>

        {tab === "My cards" ? (
          <div className="mt-10 flex flex-col items-center rounded-[12px] bg-white px-6 py-14 text-center shadow-[0_4px_14px_rgba(15,23,42,0.06)]">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-[#EFF4FF] text-[#2563EB]"><FiGift className="h-5 w-5" /></span>
            <p className="mt-4 text-[17px] font-semibold text-[#0F172A]">You don&apos;t have any cards yet</p>
            <p className="mt-1 max-w-[420px] text-[14px] text-[#748190]">Earn coins by learning every day, then use them to buy cards from your collections.</p>
            <Link href="/admin/coins" className="mt-5 inline-flex h-10 items-center rounded-[5px] bg-[#2563EB] px-5 text-[14px] font-semibold text-white">How to earn coins</Link>
          </div>
        ) : (
          <>
            <ul className="mt-8 flex gap-6 overflow-x-auto pb-2 scrollbar-none">
              {cardCollections.map((item) => (
                <li key={item.id} className="w-[110px] shrink-0">
                  <button type="button" onClick={() => setSelectedId(item.id)} className="flex w-full flex-col items-center gap-2 text-center">
                    <span className={`grid h-[96px] w-[96px] place-items-center rounded-full bg-gradient-to-br text-[22px] font-bold text-white ${item.gradient} ${item.requirement ? "grayscale" : ""} ${selectedId === item.id ? "ring-4 ring-[#2563EB] ring-offset-2" : ""}`}>
                      {initials(item.title.replace("Pioneers of ", ""))}
                    </span>
                    <span className="text-[13px] font-semibold leading-4 text-[#0F172A]">{item.title}</span>
                    {item.requirement ? (
                      <span className="inline-flex items-center gap-1 rounded-[4px] border border-[#F87171] px-1.5 py-0.5 text-[10px] font-semibold text-[#DC2626]"><FiLock className="h-2.5 w-2.5" /> {item.requirement}</span>
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div className="rounded-[12px] bg-white p-6 shadow-[0_4px_14px_rgba(15,23,42,0.08)]">
                <p className="text-[14px] font-semibold text-[#545C69]">Collection progress</p>
                <p className="mt-2 text-[30px] font-semibold text-[#0F172A]">0 <span className="text-[15px] font-medium text-[#748190]">/{collection.cards.length} cards acquired</span></p>
                <span className="mt-3 block h-2 overflow-hidden rounded-full bg-[#E5E7EB]"><span className="block h-full w-0 bg-[#2563EB]" /></span>
              </div>
              <div className="rounded-[12px] bg-white p-6 shadow-[0_4px_14px_rgba(15,23,42,0.08)]">
                <p className="text-[14px] font-semibold text-[#545C69]">Collection benefit</p>
                <p className="mt-2 text-[18px] font-semibold text-[#0F172A]">{collection.benefit || "Exclusive collection reward"}</p>
                <p className="mt-1 text-[13px] font-semibold text-[#B45309]">Benefit status: Locked</p>
                <p className="mt-2 text-[13px] leading-5 text-[#545C69]">{collection.benefitBody || `Complete the ${collection.title} collection to unlock its reward.`}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {collection.cards.map((item) => (
                <article key={item.name} className="overflow-hidden rounded-[12px] bg-white shadow-[0_4px_14px_rgba(15,23,42,0.08)]">
                  <div className={`relative grid aspect-[4/5] place-items-center bg-gradient-to-br text-white ${collection.gradient} ${locked ? "grayscale" : ""}`}>
                    <span className="text-[48px] font-bold opacity-90">{initials(item.name)}</span>
                    {locked ? <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-black/30"><FiLock className="h-4 w-4" /></span> : null}
                  </div>
                  <div className="p-4">
                    <p className="text-[15px] font-semibold text-[#0F172A]">{item.name}</p>
                    <p className="text-[12px] text-[#748190]">{collection.title}</p>
                    {item.benefit ? (
                      <>
                        <p className="mt-3 text-[13px] text-[#3D4653]">Benefit: <b>{item.benefit}</b></p>
                        <p className="text-[13px] text-[#3D4653]">Units left: ∞</p>
                        <p className="mt-3 rounded-[6px] bg-[#F5F7FA] px-3 py-2 text-[12px] text-[#545C69]">Unlock: {item.task}</p>
                      </>
                    ) : (
                      <p className="mt-3 rounded-[6px] bg-[#F5F7FA] px-3 py-2 text-[12px] text-[#545C69]">{collection.requirement}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </PageContainer>
    </div>
  );
}
