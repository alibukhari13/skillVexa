"use client";

import Link from "next/link";
import { useAdminSession, useSiteHref } from "@/lib/adminSession";
import {
  BarChart3,
  Bot,
  BrainCircuit,
  Briefcase,
  ChartColumn,
  Cpu,
  Database,
  Landmark,
  PieChart,
  Server,
  Sparkles,
} from "lucide-react";

const SEE_ALL_HREF = "/career-paths/data-analyst#more-career-paths";

function onSeeAllClick(onSelect) {
  onSelect?.();
  if (typeof window === "undefined") return;
  if (window.location.pathname !== "/career-paths/data-analyst") return;
  window.requestAnimationFrame(() => {
    const el = document.getElementById("more-career-paths");
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  });
}

const iconClass = "h-[22px] w-[22px] shrink-0 text-[#2563EB]";
const iconProps = { className: iconClass, strokeWidth: 1.75, "aria-hidden": true };

function pathIcon(item) {
  const key = `${item.label} ${item.href}`.toLowerCase();
  if (key.includes("tableau")) return <PieChart {...iconProps} />;
  if (key.includes("power") && key.includes("bi")) return <BarChart3 {...iconProps} />;
  if (key.includes("agent")) return <Bot {...iconProps} />;
  if (key.includes("ai engineer") || key.includes("ai-engineer")) return <Sparkles {...iconProps} />;
  if (key.includes("machine") || key.includes("ml ")) return <Cpu {...iconProps} />;
  if (key.includes("quant") || key.includes("finance")) return <Landmark {...iconProps} />;
  if (key.includes("data engineer") || key.includes("data-engineer")) return <Server {...iconProps} />;
  if (key.includes("business") || key.includes("buisness")) return <Briefcase {...iconProps} />;
  if (key.includes("senior")) return <BrainCircuit {...iconProps} />;
  if (key.includes("scientist") || key.includes("sceintist")) return <Database {...iconProps} />;
  return <ChartColumn {...iconProps} />;
}

export default function CareerPathsMenu({ items, open, onSelect, variant = "desktop" }) {
  const adminSession = useAdminSession();
  const siteHref = useSiteHref();
  // In an admin session "See all" opens the admin Career Tracks page, so it should scroll normally.
  const seeAllScroll = adminSession ? undefined : false;
  if (variant === "mobile") {
    return (
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="mt-2 max-h-[min(60vh,420px)] overflow-y-auto rounded-2xl border border-white/10 bg-[#0F172A] p-2">
            {items.map((item) => (
              <Link
                key={item.href}
                href={siteHref(item.href)}
                onClick={onSelect}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-gray-200 transition-colors duration-200 hover:bg-white/5 hover:text-white"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ECF5FF]">
                  {pathIcon(item)}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium leading-5">{item.label}</span>
                  <span className="block text-xs leading-4 text-gray-400">Career Path</span>
                </span>
              </Link>
            ))}
            <Link
              href={siteHref(SEE_ALL_HREF)}
              scroll={seeAllScroll}
              onClick={() => onSeeAllClick(onSelect)}
              className="mt-1 flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-[#F59E0B] transition-colors hover:bg-white/5"
            >
              See all career paths
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`absolute left-0 right-0 top-full z-40 pt-3 transition-all duration-300 ease-out ${
        open
          ? "visible translate-y-0 opacity-100"
          : "invisible pointer-events-none -translate-y-2 opacity-0"
      }`}
      aria-hidden={!open}
      inert={!open}
    >
      <div className="mx-auto max-w-[1040px] overflow-hidden rounded-[18px] border border-white/10 bg-[#0F172A] shadow-[0_16px_40px_rgba(15,23,42,0.12)]">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
          <p className="font-display text-base font-semibold leading-6 text-white">Career Paths</p>
          <Link
            href={siteHref(SEE_ALL_HREF)}
            scroll={seeAllScroll}
            onClick={() => onSeeAllClick(onSelect)}
            className="inline-flex items-center gap-1.5 text-sm font-medium leading-5 text-[#2563EB] transition-colors hover:text-[#1d4ed8]"
          >
            See all
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M3.125 10H16.875" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path
                d="M11.25 4.375L16.875 10L11.25 15.625"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <ul className="grid grid-cols-3 gap-x-2 gap-y-0.5 p-3">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={siteHref(item.href)}
                onClick={onSelect}
                className="group/item flex items-center gap-2.5 rounded-xl px-2.5 py-2 transition-colors duration-200 hover:bg-white/5"
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#ECF5FF] transition-colors duration-200 group-hover/item:bg-[#DBEAFE]">
                  {pathIcon(item)}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium leading-5 text-white">
                    {item.label}
                  </span>
                  <span className="block text-xs leading-4 text-white/60">Career Path</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
