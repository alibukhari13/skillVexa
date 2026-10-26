"use client";

import { useEffect, useState } from "react";
import { FaAws, FaGitAlt, FaPython, FaRProject } from "react-icons/fa";
import { FiChevronUp, FiSearch, FiX, FiZap } from "react-icons/fi";
import { PiMicrosoftExcelLogo, PiOpenAiLogo } from "react-icons/pi";
import { SiApacheairflow, SiGithubcopilot, SiGooglecloud, SiLangchain, SiLanggraph, SiMysql } from "react-icons/si";
import { TbChartDots3, TbHexagons } from "react-icons/tb";

function TableauIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M11.2 2h1.6v3.2H16v1.5h-3.2v3.2h-1.6V6.7H8V5.2h3.2zM5.4 7.6h1.2v2.5h2.5v1.2H6.6v2.5H5.4v-2.5H2.9v-1.2h2.5zm12 0h1.2v2.5h2.5v1.2h-2.5v2.5h-1.2v-2.5h-2.5v-1.2h2.5zM11 9.8h2v3.4h3.4v2H13v3.4h-2v-3.4H7.6v-2H11zm-5.6 7.8h1.2v2.5h2.5v1.2H6.6V24H5.4v-2.7H2.9v-1.2h2.5zm12 0h1.2v2.5h2.5v1.2h-2.5V24h-1.2v-2.7h-2.5v-1.2h2.5z" />
    </svg>
  );
}

function PowerBiIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <rect x="4" y="12" width="4" height="9" rx="1" />
      <rect x="10" y="7" width="4" height="14" rx="1" />
      <rect x="16" y="3" width="4" height="18" rx="1" />
    </svg>
  );
}

const techIcons = {
  Python: FaPython,
  SQL: SiMysql,
  R: FaRProject,
  Excel: PiMicrosoftExcelLogo,
  Tableau: TableauIcon,
  "Power BI": PowerBiIcon,
  Git: FaGitAlt,
  ChatGPT: PiOpenAiLogo,
  LangChain: SiLangchain,
  LangGraph: SiLanggraph,
  "Apache Airflow": SiApacheairflow,
  AWS: FaAws,
  GCP: SiGooglecloud,
  Copilot: SiGithubcopilot,
  Theory: TbChartDots3,
  Multiple: TbHexagons,
};

// 365 container: 90% wide on laptops, 1170px max on wide screens.
export const containerClass = "mx-auto w-full max-w-[1170px] px-4 sm:px-6 lg:w-[90%] lg:px-0 desk:w-full";

export function TechIcon({ name, className = "h-6 w-6" }) {
  const Icon = techIcons[name] || TbChartDots3;
  return <Icon className={className} aria-label={name} />;
}

export function NewLabel() {
  return (
    <span className="inline-flex items-center gap-1 rounded-[5px] bg-[#2563EB] px-2 py-1.5 text-[12px] font-semibold uppercase leading-4 text-white">
      <FiZap className="h-3 w-3" />
      New
    </span>
  );
}

function Star({ fill }) {
  return (
    <span className="relative inline-block h-[15px] w-[15px]">
      <svg viewBox="0 0 20 20" className="absolute inset-0 h-full w-full text-[#E5E7EB]" fill="currentColor">
        <path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6L10 15l-5.4 3 1.2-6L1.3 7.8l6.1-.7z" />
      </svg>
      <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
        <svg viewBox="0 0 20 20" className="h-[15px] w-[15px] text-[#F59E0B]" fill="currentColor">
          <path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6L10 15l-5.4 3 1.2-6L1.3 7.8l6.1-.7z" />
        </svg>
      </span>
    </span>
  );
}

export function Rating({ rating, reviews }) {
  const value = Number(rating) || 0;
  return (
    <div className="flex h-7 items-center gap-1.5 text-[14px]">
      <span className="font-semibold text-[#0F172A]">{rating}/5</span>
      <span className="flex items-center gap-[2px]">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} fill={Math.max(0, Math.min(1, value - i))} />
        ))}
      </span>
      {reviews ? <span className="text-[#748190]">({reviews})</span> : null}
    </div>
  );
}

export function SearchInput({ value, onChange, placeholder }) {
  return (
    <label className="flex h-10 w-full items-center gap-3 rounded-full border border-[#F0F0F2] bg-white pl-5 pr-4 text-[#748190] transition-colors focus-within:border-[#2563EB]">
      <FiSearch className="h-5 w-5 shrink-0" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="min-w-0 flex-1 bg-transparent text-[18px] text-[#16191D] outline-none placeholder:text-[#9BA3AE]"
      />
    </label>
  );
}

export function UnderlineTabs({ tabs, active, onChange, className = "" }) {
  return (
    <div className={`flex overflow-x-auto border-b-2 border-[#D5D9DF] scrollbar-none ${className}`} role="tablist">
      {tabs.map((tab) => {
        const selected = tab === active;
        return (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(tab)}
            className={`-mb-[2px] h-[38px] shrink-0 border-b-2 px-6 text-[16px] font-medium transition-colors sm:min-w-[170px] ${
              selected ? "border-[#2563EB] text-[#2563EB]" : "border-transparent text-[#748190] hover:text-[#0F172A]"
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}

const VISIBLE_OPTIONS = 5;

function FilterGroup({ group, selected, onToggle }) {
  const [open, setOpen] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const options = showAll ? group.options : group.options.slice(0, VISIBLE_OPTIONS);

  return (
    <div className="pb-8">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-left text-[16px] text-[#545C69]"
      >
        {group.label}
        <FiChevronUp className={`h-4 w-4 text-[#748190] transition-transform ${open ? "" : "rotate-180"}`} />
      </button>
      {open ? (
        <>
          <ul className="mt-3 flex flex-col gap-1">
            {options.map((option) => {
              const active = selected.includes(option);
              return (
                <li key={option}>
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => onToggle(group.id, option)}
                    className={`h-10 w-full rounded-[5px] px-3 text-left text-[14px] font-medium transition-colors ${
                      active ? "bg-[#2563EB] text-white" : "bg-[#E6E7E9] text-[#545C69] hover:bg-[#DCDFE3] hover:text-[#0F172A]"
                    }`}
                  >
                    {option}
                  </button>
                </li>
              );
            })}
          </ul>
          {group.options.length > VISIBLE_OPTIONS ? (
            <button
              type="button"
              onClick={() => setShowAll((value) => !value)}
              className="mt-3 text-[14px] text-[#748190] hover:text-[#2563EB]"
            >
              {showAll ? "Show less" : "Show more"}
            </button>
          ) : null}
        </>
      ) : null}
    </div>
  );
}

export function FilterSidebar({ groups, selected, onToggle, onClear }) {
  const hasSelection = Object.values(selected).some((values) => values.length);
  return (
    <aside className="w-full">
      <div className="mb-[30px] flex items-center justify-between">
        <p className="text-[16px] text-[#545C69]">Filter by</p>
        {hasSelection ? (
          <button type="button" onClick={onClear} className="text-[13px] font-medium text-[#2563EB] hover:underline">
            Clear all
          </button>
        ) : null}
      </div>
      {groups.map((group) => (
        <FilterGroup key={group.id} group={group} selected={selected[group.id] || []} onToggle={onToggle} />
      ))}
    </aside>
  );
}

// Shared filter state helper: { groupId: [selected options] }
export function useFilters(groups) {
  const empty = () => Object.fromEntries(groups.map((group) => [group.id, []]));
  const [selected, setSelected] = useState(empty);
  const toggle = (groupId, option) =>
    setSelected((current) => {
      const values = current[groupId] || [];
      return {
        ...current,
        [groupId]: values.includes(option) ? values.filter((value) => value !== option) : [...values, option],
      };
    });
  return { selected, toggle, clear: () => setSelected(empty()) };
}

export function EmptyResults({ children }) {
  return (
    <div className="rounded-[10px] bg-white px-6 py-14 text-center text-[15px] text-[#748190] shadow-[0_4px_12px_rgba(15,23,42,0.06)]">
      {children}
    </div>
  );
}

export function Modal({ open, onClose, children, className = "max-w-[570px]", label }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto bg-[#0F172A]/60 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div role="dialog" aria-modal="true" aria-label={label} className={`relative my-auto w-full rounded-[15px] bg-white text-[#0F172A] shadow-[0_20px_50px_rgba(15,23,42,0.3)] ${className}`}>
        <button type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 z-10 grid h-8 w-8 place-items-center rounded-full text-[#748190] hover:bg-[#F3F5F8] hover:text-[#0F172A]">
          <FiX className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  );
}

export function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? "bg-[#2563EB]" : "bg-[#CBD2DC]"}`}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-[left] ${checked ? "left-[22px]" : "left-0.5"}`} />
    </button>
  );
}

export function DarkHero({ title, children, aside }) {
  return (
    <section className="bg-[#0F172A] bg-[linear-gradient(135deg,rgba(37,99,235,0.28)_0%,rgba(37,99,235,0)_100%)]">
      <div className={`${containerClass} flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between lg:py-[52px]`}>
        <div className="max-w-[640px]">
          <h1 className="text-[32px] font-semibold text-white sm:text-[38px]">{title}</h1>
          {children ? <div className="mt-3 text-[15px] leading-6 text-white/75">{children}</div> : null}
        </div>
        {aside}
      </div>
    </section>
  );
}

export function XpBadge({ children }) {
  return <span className="rounded-[4px] border border-[#2563EB] px-1.5 py-[1px] text-[11px] font-semibold text-[#2563EB]">{children}</span>;
}

export function CoinBadge({ children }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-[4px] border border-[#F59E0B] px-1.5 py-[1px] text-[11px] font-semibold text-[#B7791F]">
      {children}
      <svg viewBox="0 0 18 21" fill="none" className="h-3 w-3" aria-hidden="true">
        <path d="M9.1 8.7c4.47 0 8.1-1.61 8.1-3.6S13.57 1.5 9.1 1.5 1 3.11 1 5.1s3.63 3.6 8.1 3.6Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M1 5.1v10.8c0 1.98 3.6 3.6 8.1 3.6s8.1-1.62 8.1-3.6V5.1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M17.2 10.5c0 1.98-3.6 3.6-8.1 3.6S1 12.48 1 10.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </span>
  );
}

export function Avatar({ name, size = "h-10 w-10", className = "" }) {
  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const palette = ["#2563EB", "#F59E0B", "#10B981", "#8B5CF6", "#EF4444", "#0EA5E9"];
  const color = palette[name.length % palette.length];
  return (
    <span className={`grid shrink-0 place-items-center rounded-full text-[13px] font-semibold text-white ${size} ${className}`} style={{ backgroundColor: color }}>
      {initials}
    </span>
  );
}
