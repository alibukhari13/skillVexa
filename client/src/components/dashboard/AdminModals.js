"use client";

import Image from "next/image";
import { useState } from "react";
import {
  FiArrowLeft,
  FiBookOpen,
  FiBriefcase,
  FiCheck,
  FiPlus,
  FiSmile,
  FiTrendingUp,
  FiX,
  FiZap,
} from "react-icons/fi";
import { Modal, Toggle, TechIcon } from "@/components/dashboard/DashboardUI";
import {
  dailyGoals,
  getTrackDetails,
  onboardingExperience,
  onboardingGoals,
} from "@/config/AdminContent";
import { dashboardTracks } from "@/config/DashboardData";
import { siteConfig } from "@/config/SiteConfig";
import { useStoredValue } from "@/lib/useStoredValue";

/* ------------------------------ Daily goal ------------------------------ */

export function DailyGoalModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} label="Daily goal">
      <DailyGoalBody onClose={onClose} />
    </Modal>
  );
}

// Mounted only while the modal is open, so it always starts from the saved goal.
function DailyGoalBody({ onClose }) {
  const [savedGoal, setSavedGoal] = useStoredValue(
    "skillvexa-admin-daily-goal",
    null,
  );
  const [minutes, setMinutes] = useState(savedGoal?.minutes || 30);
  const [reminder, setReminder] = useState(Boolean(savedGoal?.reminder));
  const goal =
    dailyGoals.find((item) => item.minutes === minutes) || dailyGoals[0];

  return (
    <div className="px-6 pb-8 pt-10 sm:px-10">
      <p className="text-[24px] font-semibold">Daily goal</p>
      <div className="mt-6 rounded-[12px] bg-[#F5F7FA] p-5">
        <p className="text-[16px] font-medium">
          {goal.title}
          <span className="ml-2 rounded-[4px] border border-[#2563EB] px-1.5 py-[1px] text-[12px] font-semibold text-[#2563EB]">
            {goal.xp}
          </span>
        </p>
        <ul className="mt-4 grid grid-cols-3 gap-3">
          {dailyGoals.map((item) => (
            <li key={item.minutes}>
              <button
                type="button"
                onClick={() => setMinutes(item.minutes)}
                aria-pressed={minutes === item.minutes}
                className={`flex w-full flex-col items-center rounded-[10px] border-2 bg-white py-4 transition-colors ${
                  minutes === item.minutes
                    ? "border-[#2563EB] text-[#2563EB]"
                    : "border-transparent text-[#0F172A] hover:border-[#BFD3FF]"
                }`}
              >
                <span className="text-[28px] font-semibold leading-none">
                  {item.minutes}
                </span>
                <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#748190]">
                  min
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <p className="text-[14px] font-semibold">Time zone</p>
        <div className="mt-2 flex h-11 items-center justify-between rounded-[8px] border border-[#E5E7EB] bg-[#F5F7FA] px-4 text-[14px] text-[#9BA3AE]">
          (UTC+05:00) Islamabad, Karachi
        </div>
        <p className="mt-1.5 text-[12px] text-[#9BA3AE]">
          *This field is temporarily disabled. You can change this setting in 48
          hours.
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between gap-6">
        <div>
          <p className="text-[14px] font-semibold">Email reminder</p>
          <p className="text-[13px] text-[#748190]">
            Receive an email reminder and never skip a day of learning.
          </p>
        </div>
        <Toggle
          checked={reminder}
          onChange={setReminder}
          label="Email reminder"
        />
      </div>

      <div className="mt-8 flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="h-11 rounded-[5px] px-6 text-[15px] font-semibold text-[#545C69] hover:text-[#0F172A]"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => {
            setSavedGoal({ minutes, reminder });
            onClose();
          }}
          className="h-11 rounded-[5px] bg-[#2563EB] px-6 text-[15px] font-semibold text-white hover:bg-[#1D4ED8]"
        >
          Set goal
        </button>
      </div>
    </div>
  );
}

/* ------------------------- Learning path onboarding ------------------------- */

const goalIcons = [FiBriefcase, FiZap, FiTrendingUp, FiBookOpen, FiSmile];

function OptionCard({ selected, onClick, children, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex items-center gap-3 rounded-[12px] border-2 bg-white px-5 py-4 text-left text-[15px] font-medium transition-all ${
        selected
          ? "border-[#2563EB] text-[#2563EB] shadow-[0_6px_18px_rgba(37,99,235,0.15)]"
          : "border-[#E5E7EB] text-[#0F172A] hover:border-[#BFD3FF]"
      } ${className}`}
    >
      {children}
    </button>
  );
}

export function LearningPathWizard({ open, onClose, onCreate }) {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState(null);
  const [trackId, setTrackId] = useState(null);
  const [experience, setExperience] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [excluded, setExcluded] = useState([]);
  const [confirmLeave, setConfirmLeave] = useState(false);
  const track = trackId ? getTrackDetails(trackId) : null;

  const reset = () => {
    setStep(0);
    setGoal(null);
    setTrackId(null);
    setExperience(null);
    setMinutes(null);
    setExcluded([]);
    setConfirmLeave(false);
  };
  const close = () => {
    reset();
    onClose();
  };
  const requestClose = () => (step > 0 ? setConfirmLeave(true) : close());

  if (!open) return null;

  const steps = [
    {
      question: `What’s your main goal with ${siteConfig.name}?`,
      body: (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {onboardingGoals.map((label, index) => {
            const Icon = goalIcons[index];
            return (
              <OptionCard
                key={label}
                selected={goal === label}
                onClick={() => {
                  setGoal(label);
                  setStep(1);
                }}
                className="flex-col justify-center py-7 text-center lg:min-h-[150px]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[#EFF4FF] text-[#2563EB]">
                  <Icon className="h-5 w-5" />
                </span>
                {label}
              </OptionCard>
            );
          })}
        </div>
      ),
    },
    {
      question: "Which career are you most interested in exploring?",
      sub: "Let’s find the right path for you.",
      body: (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {dashboardTracks.map((item) => (
            <OptionCard
              key={item.id}
              selected={trackId === item.id}
              onClick={() => {
                setTrackId(item.id);
                setStep(2);
              }}
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#EFF4FF] text-[#2563EB]">
                <FiTrendingUp className="h-4 w-4" />
              </span>
              {item.title}
            </OptionCard>
          ))}
        </div>
      ),
    },
    {
      question: `What’s your prior experience with ${track?.title.toLowerCase() || "this field"}?`,
      sub: "We want to meet you at the right level.",
      body: (
        <div className="mx-auto grid max-w-[720px] gap-3">
          {onboardingExperience.map((label) => (
            <OptionCard
              key={label}
              selected={experience === label}
              onClick={() => {
                setExperience(label);
                setStep(3);
              }}
            >
              {label}
            </OptionCard>
          ))}
        </div>
      ),
    },
    {
      question: "How much time can you set aside daily?",
      sub: "Progress comes from consistency.",
      body: (
        <div className="mx-auto grid max-w-[560px] grid-cols-3 gap-3">
          {dailyGoals.map((item) => (
            <OptionCard
              key={item.minutes}
              selected={minutes === item.minutes}
              onClick={() => {
                setMinutes(item.minutes);
                setStep(4);
              }}
              className="flex-col justify-center py-6"
            >
              <span className="text-[30px] font-semibold leading-none">
                {item.minutes}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#748190]">
                min / day
              </span>
            </OptionCard>
          ))}
        </div>
      ),
    },
    {
      question: track
        ? `Your ${track.title} learning path`
        : "Your learning path",
      sub: "Add or remove items, then create your path. You can change it anytime.",
      body: track ? (
        <div className="mx-auto max-w-[760px]">
          <ul className="grid gap-3">
            {track.courses.map((course) => {
              const added = !excluded.includes(course.id);
              return (
                <li
                  key={course.id}
                  className="flex items-center gap-4 rounded-[12px] border border-[#E5E7EB] bg-white p-3"
                >
                  <span className="relative h-14 w-20 shrink-0 overflow-hidden rounded-[8px] bg-[#1E293B]">
                    <Image
                      src={course.image}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px] font-semibold">
                      {course.title}
                    </p>
                    <p className="flex items-center gap-2 text-[13px] text-[#748190]">
                      <TechIcon name={course.technology} className="h-4 w-4" />{" "}
                      {course.duration} of content
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setExcluded((ids) =>
                        added
                          ? [...ids, course.id]
                          : ids.filter((id) => id !== course.id),
                      )
                    }
                    className={`inline-flex h-9 shrink-0 items-center gap-1.5 rounded-[5px] px-4 text-[13px] font-semibold transition-colors ${
                      added
                        ? "bg-[#EFF4FF] text-[#2563EB]"
                        : "border border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white"
                    }`}
                  >
                    {added ? (
                      <>
                        <FiCheck className="h-4 w-4" /> Already added
                      </>
                    ) : (
                      <>
                        <FiPlus className="h-4 w-4" /> Add to path
                      </>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              disabled={excluded.length === track.courses.length}
              onClick={() => {
                onCreate({
                  trackId: track.id,
                  goal,
                  experience,
                  minutes,
                  courses: track.courses
                    .filter((course) => !excluded.includes(course.id))
                    .map((course) => course.id),
                  createdAt: new Date().toISOString(),
                });
                close();
              }}
              className="h-12 rounded-[5px] bg-[#2563EB] px-8 text-[16px] font-semibold text-white hover:bg-[#1D4ED8] disabled:opacity-50"
            >
              Create my learning path
            </button>
          </div>
        </div>
      ) : null,
    },
  ];
  const current = steps[step];

  return (
    <div
      className="fixed inset-0 z-[90] flex flex-col overflow-y-auto bg-white text-[#0F172A]"
      role="dialog"
      aria-modal="true"
      aria-label="Create your learning path"
    >
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-[#EEF0F3] px-4 sm:px-8">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#545C69] hover:text-[#0F172A]"
          >
            <FiArrowLeft className="h-4 w-4" /> Back
          </button>
        ) : (
          <span />
        )}
        <div className="flex gap-1.5">
          {steps.map((_, index) => (
            <span
              key={index}
              className={`h-1.5 w-10 rounded-full ${index <= step ? "bg-[#2563EB]" : "bg-[#E5E7EB]"}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={requestClose}
          aria-label="Close"
          className="grid h-9 w-9 place-items-center rounded-full text-[#748190] hover:bg-[#F3F5F8] hover:text-[#0F172A]"
        >
          <FiX className="h-5 w-5" />
        </button>
      </div>

      <div className="mx-auto w-full max-w-[1100px] flex-1 px-4 py-12 sm:px-8">
        {step === 0 ? (
          <p className="mb-2 text-center text-[15px] text-[#748190]">
            Welcome to {siteConfig.name}! Let&apos;s tailor your experience.
          </p>
        ) : null}
        {current.sub ? (
          <p className="mb-2 text-center text-[15px] text-[#748190]">
            {current.sub}
          </p>
        ) : null}
        <h2 className="mb-10 text-center text-[26px] font-semibold sm:text-[30px]">
          {current.question}
        </h2>
        {current.body}
      </div>

      <div className="border-t border-[#EEF0F3] px-4 py-6 sm:px-8">
        <p className="text-center text-[13px] font-medium uppercase tracking-[0.08em] text-[#748190]">
          Our graduates work at
        </p>
        <div className="mx-auto mt-4 flex max-w-[900px] flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70">
          {siteConfig.employers.map((employer) => (
            <Image
              key={employer.name}
              src={employer.src}
              alt={employer.name}
              width={employer.width}
              height={employer.height}
              className="h-7 w-auto"
            />
          ))}
        </div>
      </div>

      <Modal
        open={confirmLeave}
        onClose={() => setConfirmLeave(false)}
        label="Leave sequence"
      >
        <div className="p-8 text-center">
          <p className="text-[20px] font-semibold">
            Are you sure you want to leave this sequence?
          </p>
          <p className="mt-3 text-[14px] text-[#748190]">
            Any added items will not be saved to your learning path if you exit.
            Please confirm to proceed.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => setConfirmLeave(false)}
              className="h-11 rounded-[5px] bg-[#2563EB] px-6 text-[15px] font-semibold text-white"
            >
              Stay
            </button>
            <button
              type="button"
              onClick={close}
              className="h-11 rounded-[5px] border border-[#D5D9DF] px-6 text-[15px] font-semibold text-[#545C69] hover:text-[#0F172A]"
            >
              Leave
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export function useLearningPath() {
  return useStoredValue("skillvexa-admin-learning-path", null);
}
