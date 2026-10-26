"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiArrowRight, FiCheck } from "react-icons/fi";

const ICONS = "/images/quiz";
const TOTAL_QUESTIONS = 10;

// Heading parts: plain strings render navy, { accent } renders in the bold blue accent.
const questions = [
  {
    type: "age",
    heading: ["Find your ", { accent: "Job Matches" }, " in minutes."],
    subtitle: "Answer a few questions to discover the best AI and data science career path for you.",
    choices: [
      { label: "Age: 18-25", icon: "age-18-25.svg" },
      { label: "Age: 25-35", icon: "age-25-35.svg" },
      { label: "Age: 35-45", icon: "age-35-45.svg" },
      { label: "Age: 45+", icon: "age-45-plus.svg" },
    ],
  },
  {
    type: "pills",
    heading: ["What’s your ", { accent: "Background?" }],
    choices: [
      { label: "Business / Economics", icon: "computer-dollar.svg" },
      { label: "Engineering / Physics", icon: "physics.svg" },
      { label: "Social Sciences", icon: "ai-co-editing.svg" },
      { label: "Computer Science", icon: "computer-programming.svg" },
      { label: "Math / Statistics", icon: "math.svg" },
      { label: "Other", icon: "more-horizontal-circle.svg" },
    ],
  },
  {
    type: "cards",
    headingWidth: 821,
    heading: ["Can you imagine yourself ", { accent: "Writing Code" }, " as part of your job?"],
    choices: [
      { label: "I prefer no code at all", icon: "code-no-code.svg" },
      { label: "I'm okay with basic scripts", icon: "code-basic-scripts.svg" },
      { label: "I enjoy writing and running code", icon: "code-writing.svg" },
      { label: "I love coding and building systems", icon: "code-love-coding.svg" },
      { label: "I work with code and data pipelines", icon: "code-pipelines.svg" },
      { label: "I'm comfortable with complex algorithms", icon: "code-algorithms.svg" },
    ],
  },
  {
    type: "pills",
    heading: [{ accent: "How Many Hours" }, " can you dedicate weekly to learning AI and data science?"],
    choices: [
      { label: "< 8 hours", icon: "clock.svg" },
      { label: "8–10 hours", icon: "clock.svg" },
      { label: "11–20 hours", icon: "clock.svg" },
      { label: "20 hours", icon: "clock.svg" },
    ],
  },
  {
    type: "pills",
    heading: ["What kind of ", { accent: "Work" }, " sounds ", { accent: "Exciting" }, " to you?"],
    choices: [
      { label: "Making dashboards and reports", icon: "dashboard-square.svg" },
      { label: "Turning raw data into decisions", icon: "target.svg" },
      { label: "Building tools that learn and adapt", icon: "teaching.svg" },
      { label: "Creating machine learning models", icon: "3d-rotate.svg" },
      { label: "Managing large data systems", icon: "system-update.svg" },
      { label: "Finding insights in complex data", icon: "analytics.svg" },
    ],
  },
  {
    type: "pills",
    heading: ["Who do you want to ", { accent: "Work" }, " WITH MOST?"],
    choices: [
      { label: "Business teams and stakeholders", icon: "user-group.svg" },
      { label: "Clients, helping with decisions", icon: "app-window-mac.svg" },
      { label: "Fellow engineers on technical projects", icon: "license-maintenance.svg" },
      { label: "Product and AI teams", icon: "teamviewer.svg" },
      { label: "A mix of tech and data teams", icon: "database-expand.svg" },
      { label: "Research or innovation teams", icon: "folder-search.svg" },
    ],
  },
  {
    type: "cards",
    headingWidth: 821,
    heading: ["What would you ", { accent: "ENJOY" }, " DOING MOST?"],
    choices: [
      { label: "Making data easy to understand", icon: "enjoy-easy-to-understand.svg" },
      { label: "Automating and building systems", icon: "enjoy-automating.svg" },
      { label: "Analyzing trends to guide business", icon: "enjoy-trends.svg" },
      { label: "Writing complex code and models", icon: "enjoy-complex-code.svg" },
      { label: "Organizing and managing big data", icon: "enjoy-big-data.svg" },
      { label: "Solving problems with data", icon: "enjoy-solving.svg" },
    ],
  },
  {
    type: "pills",
    heading: ["Do you prefer ", { accent: "Creating" }, " or ", { accent: "Using" }, " TOOLS?"],
    choices: [
      { label: "Using tools to guide business decisions", icon: "search-focus.svg" },
      { label: "Creating tools and models", icon: "bolt.svg" },
      { label: "A mix of both", icon: "settings.svg" },
      { label: "Using tools for reporting", icon: "webcam.svg" },
      { label: "Creating tools for data flow", icon: "webhook.svg" },
      { label: "Building intelligent systems", icon: "solar-system.svg" },
    ],
  },
];

const NAME_STEP = questions.length; // question 09/10
const EMAIL_STEP = questions.length + 1; // question 10/10

function Heading({ parts, width = 924 }) {
  return (
    <h1 style={{ maxWidth: width }} className="mx-auto text-center font-display text-[30px] font-semibold leading-[1.25] text-[#0F172A] sm:text-[40px] lg:text-[48px]">
      {parts.map((part, index) =>
        typeof part === "string"
          ? <span key={index}>{part}</span>
          : <span key={index} className="font-bold text-[#2563EB]">{part.accent}</span>,
      )}
    </h1>
  );
}

function ProgressBar({ question }) {
  return (
    <div className="relative mx-auto flex h-6 w-full max-w-[736px] items-center gap-4">
      <div className="h-[6px] flex-1 rounded-[24px] bg-[#EEEEEE]">
        <div className="h-full rounded-[24px] bg-[#2563EB] transition-[width] duration-300" style={{ width: `${(question / TOTAL_QUESTIONS) * 100}%` }} />
      </div>
      <span className="shrink-0 whitespace-nowrap text-[14px] font-medium text-[#0F172A] sm:text-[16px] lg:absolute lg:left-[calc(100%+16px)] lg:top-1/2 lg:-translate-y-1/2">
        Question: {String(question).padStart(2, "0")}/{TOTAL_QUESTIONS}
      </span>
    </div>
  );
}

function AgeChoices({ choices, selected, onSelect }) {
  return (
    <div className="mx-auto mt-[50px] grid w-full max-w-[412px] grid-cols-2 gap-x-3 gap-y-5">
      {choices.map((choice) => {
        const active = selected === choice.label;
        return (
          <button
            key={choice.label}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(choice.label)}
            className={`flex h-[134px] flex-col items-center justify-center gap-2 rounded-[12px] bg-gradient-to-r from-[#D5E2FF] to-[#FFE6BD] px-4 py-4 outline-none ring-[#2563EB] transition-shadow hover:ring-2 focus-visible:ring-2 ${active ? "ring-2" : ""}`}
          >
            <Image src={`${ICONS}/${choice.icon}`} alt="" width={64} height={64} className="size-16" />
            <span className="whitespace-nowrap text-[18px] font-medium text-[#0F172A] sm:text-[20px]">{choice.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function PillChoices({ choices, selected, onSelect }) {
  // The design lays the pills out in centred rows of three.
  const rows = [];
  for (let index = 0; index < choices.length; index += 3) rows.push(choices.slice(index, index + 3));

  return (
    <div className="mx-auto mt-8 flex w-full max-w-[1215px] flex-col items-center gap-4 sm:gap-6">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {row.map((choice) => {
            const active = selected === choice.label;
            return (
              <button
                key={choice.label}
                type="button"
                aria-pressed={active}
                onClick={() => onSelect(choice.label)}
                className={`inline-flex items-center justify-center gap-[10px] rounded-[100px] border px-5 py-3 text-left transition-colors sm:px-6 sm:py-4 ${active ? "border-[#2563EB] bg-[#ECF5FF]" : "border-[#0F172A] bg-white hover:border-[#2563EB] hover:bg-[#ECF5FF]"}`}
              >
                <Image src={`${ICONS}/${choice.icon}`} alt="" width={24} height={24} className="size-6 shrink-0" />
                <span className="text-[16px] text-[#0F172A] sm:text-[18px]">{choice.label}</span>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function CardChoices({ choices, selected, onSelect }) {
  return (
    <div className="mx-auto mt-[50px] grid w-full max-w-[968px] grid-cols-1 gap-6 md:grid-flow-col md:grid-cols-2 md:grid-rows-3">
      {choices.map((choice) => {
        const active = selected === choice.label;
        return (
          <button
            key={choice.label}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(choice.label)}
            className={`flex min-h-[131px] items-center gap-[27px] rounded-[16px] bg-[#F8FAFC] py-4 pl-4 pr-5 text-left shadow-[0_0_6px_rgba(71,71,71,0.12)] ring-[#2563EB] transition-shadow hover:ring-1 ${active ? "ring-2" : ""}`}
          >
            <span className="flex h-[99px] w-[108px] shrink-0 items-center justify-center rounded-[12px] bg-gradient-to-b from-[#D5E2FF] to-[#FFE6BD]">
              <Image src={`${ICONS}/${choice.icon}`} alt="" width={50} height={50} className="size-[50px]" />
            </span>
            <span className="text-[20px] leading-normal text-[#0F172A] sm:text-[28px]">{choice.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function TextField({ icon, ...props }) {
  return (
    <label className="flex h-16 w-full items-center gap-3 rounded-[12px] border border-[#CFE6FC] bg-[#F8FAFC] px-5 focus-within:border-[#2563EB]">
      <Image src={`${ICONS}/${icon}`} alt="" width={24} height={24} className="size-6 shrink-0" />
      <input {...props} className="h-full min-w-0 flex-1 bg-transparent text-[16px] text-[#0F172A] outline-none placeholder:text-[#B9C9D9]" />
    </label>
  );
}

function PrimaryButton({ children, ...props }) {
  return (
    <button {...props} className="flex w-full items-center justify-center rounded-[48px] bg-[#F59E0B] px-8 py-4 text-[16px] font-semibold text-[#0F172A] transition-colors hover:bg-[#E99508] disabled:cursor-not-allowed disabled:opacity-60">
      {children}
    </button>
  );
}

export default function CareerQuizExperience({ fromAdmin = false }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showMatch, setShowMatch] = useState(false);

  const question = questions[step];

  function choose(answer) {
    setAnswers((current) => ({ ...current, [step]: answer }));
    // The design has no Continue button on choice steps: picking an answer moves on.
    window.setTimeout(() => setStep((current) => Math.min(current + 1, EMAIL_STEP)), 250);
  }

  function submitName(event) {
    event.preventDefault();
    if (name.trim()) setStep(EMAIL_STEP);
  }

  function submitEmail(event) {
    event.preventDefault();
    if (agreed) setShowMatch(true);
  }

  const match = (() => {
    const finalAnswer = answers[7];
    if (finalAnswer === "Creating tools for data flow") return { title: "Data Engineer", href: "/career-path/data-engineer" };
    if (finalAnswer === "Using tools for reporting") return { title: "Data Analyst", href: "/career-paths/data-analyst" };
    if (finalAnswer === "Using tools to guide business decisions") return { title: "Business Analyst", href: "/career-path/buisness-analyst" };
    if (finalAnswer === "Building intelligent systems" || finalAnswer === "Creating tools and models") return { title: "AI Engineer", href: "/career-path/ai-engineer" };
    return { title: "Data Scientist", href: "/career-path/data-sceintist" };
  })();

  function closeQuiz() {
    if (window.history.length > 1) router.back();
    else router.push(fromAdmin ? "/admin" : "/");
  }

  return (
    <main className="career-quiz-page relative min-h-screen bg-white px-4 pb-20 pt-[50px] text-[#0F172A] sm:px-8">
      <button
        type="button"
        onClick={closeQuiz}
        aria-label="Back to previous screen"
        className="absolute left-4 top-4 inline-flex h-10 items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-4 text-[14px] font-semibold text-[#344054] shadow-sm transition-colors hover:border-[#BFD3FF] hover:bg-[#F8FAFC] hover:text-[#2563EB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] sm:left-8 sm:top-6"
      >
        <FiArrowLeft className="h-4 w-4" />
        Back
      </button>
      <Link href="/" aria-label="SkillVexa home" className="mx-auto block h-[42px] w-[171px]">
        <Image src={`${ICONS}/logo-dark.svg`} alt="SkillVexa" width={171} height={42} priority className="h-[42px] w-[171px]" />
      </Link>

      <section className="mx-auto mt-[50px] w-full max-w-[1215px]" aria-live="polite">
        {!showMatch && (
          <>
            <ProgressBar question={step + 1} />
            <div className="mt-8 flex justify-center">
              <span className="rounded-[45px] bg-[#ECF5FF] px-6 py-2 text-[14px] font-medium text-[#2563EB]">5-Minute Career Quiz</span>
            </div>
          </>
        )}

        <div className="mt-8">
          {showMatch ? (
            <Heading parts={["Your Career ", { accent: "Match" }]} />
          ) : step === NAME_STEP ? (
            <Heading parts={["What's your ", { accent: "Name?" }]} />
          ) : step === EMAIL_STEP ? (
            <Heading parts={["Almost there! ", { accent: "Enter" }, " YOUR ", { accent: "Email" }]} />
          ) : (
            <Heading parts={question.heading} width={question.headingWidth} />
          )}
        </div>

        {!showMatch && question?.subtitle && (
          <p className="mx-auto mt-4 max-w-[696px] text-center text-[16px] text-[#636363]">{question.subtitle}</p>
        )}

        {!showMatch && question?.type === "age" && <AgeChoices choices={question.choices} selected={answers[step]} onSelect={choose} />}
        {!showMatch && question?.type === "pills" && <PillChoices choices={question.choices} selected={answers[step]} onSelect={choose} />}
        {!showMatch && question?.type === "cards" && <CardChoices choices={question.choices} selected={answers[step]} onSelect={choose} />}

        {!showMatch && step === NAME_STEP && (
          <form onSubmit={submitName} className="mx-auto mt-[67px] flex w-full max-w-[545px] flex-col gap-8">
            <TextField icon="user.svg" autoComplete="name" required value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter Your Name" aria-label="Your name" />
            <PrimaryButton type="submit">Continue</PrimaryButton>
          </form>
        )}

        {!showMatch && step === EMAIL_STEP && (
          <>
            <p className="mx-auto mt-3 max-w-[696px] text-center text-[16px] text-[#636363]">
              to send you a personalized career guide with real stories of how people like you landed AI and data science jobs.
            </p>
            <form onSubmit={submitEmail} className="mx-auto mt-8 flex w-full max-w-[545px] flex-col">
              <TextField icon="mail.svg" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter Email Address" aria-label="Your email" />
              <label className="mt-4 flex cursor-pointer items-center gap-[11px] text-[14px] text-[#0F172A]">
                <input type="checkbox" checked={agreed} onChange={(event) => setAgreed(event.target.checked)} className="sr-only" required />
                {agreed ? (
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#2563EB] text-white"><FiCheck size={14} /></span>
                ) : (
                  <Image src={`${ICONS}/checkbox-circle.svg`} alt="" width={24} height={24} className="size-6 shrink-0" />
                )}
                <span>
                  I agree with SkillVexa&apos;s Terms of Use and <span className="font-medium text-[#2563EB]">Privacy Policy</span>
                </span>
              </label>
              <div className="mt-8">
                <PrimaryButton type="submit">Find My Career Match</PrimaryButton>
              </div>
            </form>
          </>
        )}

        {showMatch && (
          <section role="status" className="mx-auto mt-10 max-w-[545px] rounded-[16px] bg-[#F8FAFC] px-8 py-9 text-center shadow-[0_0_6px_rgba(71,71,71,0.12)]">
            <p className="text-[14px] font-medium text-[#2563EB]">{name.trim() ? `${name.trim()}, your best match is` : "Your best match is"}</p>
            <h2 className="mt-3 font-display text-[32px] font-bold text-[#0F172A]">{match.title}</h2>
            <p className="mt-3 text-[16px] leading-6 text-[#636363]">Your answers point toward a career that brings together the work you enjoy and the skills you want to use.</p>
            <Link href={match.href} className="mt-6 inline-flex items-center gap-2 rounded-[48px] bg-[#F59E0B] px-8 py-4 text-[16px] font-semibold text-[#0F172A] transition-colors hover:bg-[#E99508]">
              Explore your career path <FiArrowRight size={16} />
            </Link>
          </section>
        )}
      </section>
    </main>
  );
}
