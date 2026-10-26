"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiCheck, FiChevronLeft, FiChevronRight, FiClock, FiFileText, FiFlag, FiX } from "react-icons/fi";
import { Modal } from "@/components/dashboard/DashboardUI";
import { courseById, getPracticeExam } from "@/config/AdminContent";
import { useStoredValue } from "@/lib/useStoredValue";

function formatTime(seconds) {
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function ResultsView({ exam, attempt }) {
  const course = courseById[exam.groupId];
  const correct = exam.questions.filter((question, index) => attempt?.answers?.[index] === question.answer).length;
  const score = attempt ? Math.round((correct / exam.questions.length) * 100) : 0;
  return (
    <div className="min-h-screen bg-[#FAFAFB]">
      <header className="flex h-16 items-center justify-between bg-[#0F172A] px-4 text-white sm:px-6">
        <p className="text-[15px] font-semibold">{exam.title} · Results</p>
        <Link href="/admin/exams" className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#60A5FA]">
          <FiChevronLeft className="h-4 w-4" /> Back to exams
        </Link>
      </header>
      <div className="mx-auto max-w-[860px] px-4 py-10 sm:px-6">
        {attempt ? (
          <>
            <div className="rounded-[15px] bg-white p-8 text-center shadow-[0_6px_20px_rgba(15,23,42,0.08)]">
              <p className="text-[14px] font-semibold uppercase tracking-[0.06em] text-[#748190]">{course?.title}</p>
              <p className="mt-2 text-[56px] font-semibold leading-none text-[#0F172A]">{score}%</p>
              <p className="mt-3 text-[15px] text-[#545C69]">
                {correct} of {exam.questions.length} questions answered correctly
              </p>
              <p className={`mt-4 inline-flex rounded-full px-4 py-1.5 text-[13px] font-semibold ${score >= 60 ? "bg-[#DCFCE7] text-[#15803D]" : "bg-[#FEE2E2] text-[#B91C1C]"}`}>
                {score >= 60 ? "Great job! You passed this practice exam." : "Keep practising—review the answers below."}
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <Link href={`/admin/exams/${exam.id}`} className="inline-flex h-11 items-center rounded-[5px] border border-[#2563EB] px-6 text-[15px] font-semibold text-[#2563EB] hover:bg-[#EFF4FF]">Retake exam</Link>
                <Link href="/admin/exams" className="inline-flex h-11 items-center rounded-[5px] bg-[#2563EB] px-6 text-[15px] font-semibold text-white hover:bg-[#1D4ED8]">Back to exams</Link>
              </div>
            </div>
            <ol className="mt-8 space-y-4">
              {exam.questions.map((question, index) => {
                const answer = attempt.answers?.[index];
                return (
                  <li key={question.question} className="rounded-[12px] bg-white p-6 shadow-[0_4px_14px_rgba(15,23,42,0.06)]">
                    <p className="text-[13px] font-semibold text-[#748190]">Question {index + 1}</p>
                    <p className="mt-1 text-[16px] font-semibold text-[#0F172A]">{question.question}</p>
                    <ul className="mt-4 space-y-2">
                      {question.options.map((option, optionIndex) => {
                        const isCorrect = optionIndex === question.answer;
                        const isPicked = optionIndex === answer;
                        return (
                          <li key={option} className={`flex items-center gap-3 rounded-[8px] border px-4 py-2.5 text-[14px] ${isCorrect ? "border-[#16A34A] bg-[#F0FDF4]" : isPicked ? "border-[#DC2626] bg-[#FEF2F2]" : "border-[#E5E7EB]"}`}>
                            {isCorrect ? <FiCheck className="h-4 w-4 text-[#16A34A]" /> : isPicked ? <FiX className="h-4 w-4 text-[#DC2626]" /> : <span className="h-4 w-4" />}
                            {option}
                          </li>
                        );
                      })}
                    </ul>
                    {answer === undefined || answer === null ? <p className="mt-3 text-[13px] text-[#B45309]">Not answered</p> : null}
                  </li>
                );
              })}
            </ol>
          </>
        ) : (
          <div className="rounded-[15px] bg-white p-10 text-center shadow-[0_6px_20px_rgba(15,23,42,0.08)]">
            <p className="text-[18px] font-semibold">You haven&apos;t taken this exam yet.</p>
            <Link href={`/admin/exams/${exam.id}`} className="mt-5 inline-flex h-11 items-center rounded-[5px] bg-[#2563EB] px-6 text-[15px] font-semibold text-white">Start Exam</Link>
          </div>
        )}
      </div>
    </div>
  );
}

function ExamTaking({ exam, onFinish }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(() => exam.questions.map(() => null));
  const [flagged, setFlagged] = useState([]);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [confirmFinish, setConfirmFinish] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(exam.durationSeconds);
  const finished = useRef(false);
  const question = exam.questions[current];
  const answeredCount = answers.filter((answer) => answer !== null).length;

  const finish = useRef(() => {});
  useEffect(() => {
    finish.current = () => {
      if (finished.current) return;
      finished.current = true;
      onFinish(answers);
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((value) => {
        if (value <= 1) {
          clearInterval(timer);
          setTimeout(() => finish.current(), 0);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const choose = (index) => setAnswers((list) => list.map((value, i) => (i === current ? index : value)));

  useEffect(() => {
    function onKey(event) {
      if (event.target.closest?.("input, textarea")) return;
      const number = Number(event.key);
      if (number >= 1 && number <= question.options.length) choose(number - 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div className="min-h-screen bg-[#FAFAFB]">
      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between bg-[#0F172A] px-4 text-white sm:px-6">
        <div className="leading-tight">
          <p className="text-[12px] text-white/60">Practice Exam:</p>
          <p className="text-[15px] font-semibold">{exam.title.replace("Practice Exam: ", "")}</p>
        </div>
        <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[14px] tabular-nums ${secondsLeft < 60 ? "border-[#F87171] text-[#FCA5A5]" : "border-white/30"}`}>
          <FiClock className="h-4 w-4" /> {formatTime(secondsLeft)}
        </span>
        <button type="button" onClick={() => setReviewOpen((value) => !value)} className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#60A5FA]">
          <FiChevronLeft className="h-4 w-4" /> Review Questions
        </button>
      </header>

      <div className="mx-auto max-w-[1000px] px-4 pb-12 pt-24 sm:px-6">
        <div className="flex items-center gap-3">
          <button type="button" disabled={current === 0} onClick={() => setCurrent(current - 1)} aria-label="Previous question" className="grid h-9 w-9 place-items-center rounded-[6px] border border-[#D5D9DF] bg-white disabled:opacity-40"><FiChevronLeft /></button>
          <button type="button" disabled={current === exam.questions.length - 1} onClick={() => setCurrent(current + 1)} aria-label="Next question" className="grid h-9 w-9 place-items-center rounded-[6px] border border-[#D5D9DF] bg-white disabled:opacity-40"><FiChevronRight /></button>
          <button
            type="button"
            onClick={() => setFlagged((list) => (list.includes(current) ? list.filter((value) => value !== current) : [...list, current]))}
            aria-pressed={flagged.includes(current)}
            aria-label="Flag question"
            className={`grid h-9 w-9 place-items-center rounded-[6px] border bg-white ${flagged.includes(current) ? "border-[#F59E0B] text-[#F59E0B]" : "border-[#D5D9DF]"}`}
          >
            <FiFlag />
          </button>
          <p className="ml-3 whitespace-nowrap text-[13px] text-[#545C69]">Case 1/1 | Question {current + 1}/{exam.questions.length}</p>
          <span className="ml-2 h-1 flex-1 overflow-hidden rounded-full bg-[#E5E7EB]"><span className="block h-full bg-[#2563EB]" style={{ width: `${((current + 1) / exam.questions.length) * 100}%` }} /></span>
        </div>

        <section className="mt-5 rounded-[12px] bg-white p-6 shadow-[0_4px_14px_rgba(15,23,42,0.06)]">
          <p className="text-[14px] font-semibold text-[#0F172A]">Case 1</p>
          <p className="mt-2 text-[15px] leading-7 text-[#3D4653]">{exam.caseText}</p>
          <span className="mt-4 inline-flex items-center gap-2 rounded-[6px] bg-[#F0FDF4] px-3 py-1.5 text-[13px] font-semibold text-[#15803D]"><FiFileText className="h-4 w-4" /> {exam.attachment}</span>
        </section>

        <section className="mt-5 rounded-[12px] bg-white p-6 shadow-[0_4px_14px_rgba(15,23,42,0.06)]">
          <p className="text-[18px] text-[#748190]">Question {current + 1}</p>
          <p className="mt-2 text-[16px] leading-7 text-[#0F172A]">{question.question}</p>
          <ul className="mt-5 space-y-2.5">
            {question.options.map((option, index) => {
              const selected = answers[current] === index;
              return (
                <li key={option}>
                  <button type="button" onClick={() => choose(index)} className={`flex w-full items-center gap-3 rounded-[8px] border px-4 py-3 text-left text-[15px] shadow-sm transition-colors ${selected ? "border-[#2563EB] bg-[#EFF4FF]" : "border-[#E5E7EB] bg-white hover:border-[#BFD3FF]"}`}>
                    <span className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border-2 ${selected ? "border-[#2563EB]" : "border-[#CBD2DC]"}`}>{selected ? <span className="h-2 w-2 rounded-full bg-[#2563EB]" /> : null}</span>
                    <span className="flex-1">{option}</span>
                    <span className="text-[12px] text-[#9BA3AE]">Press <kbd className="rounded border border-[#D5D9DF] px-1.5">{index + 1}</kbd></span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 flex justify-end">
            {current < exam.questions.length - 1 ? (
              <button type="button" onClick={() => setCurrent(current + 1)} className="h-10 rounded-[5px] bg-[#2563EB] px-6 text-[14px] font-semibold text-white hover:bg-[#1D4ED8]">Next</button>
            ) : (
              <button type="button" onClick={() => setReviewOpen(true)} className="h-10 rounded-[5px] bg-[#2563EB] px-6 text-[14px] font-semibold text-white hover:bg-[#1D4ED8]">Review answers</button>
            )}
          </div>
        </section>
      </div>

      {reviewOpen ? (
        <aside className="fixed bottom-0 right-0 top-16 z-30 w-full max-w-[380px] overflow-y-auto border-l border-[#E5E7EB] bg-white p-6 shadow-[-8px_0_24px_rgba(15,23,42,0.08)]">
          <div className="flex items-center justify-between">
            <p className="text-[20px] font-semibold">Review Questions</p>
            <button type="button" onClick={() => setReviewOpen(false)} aria-label="Close review" className="grid h-8 w-8 place-items-center rounded-full text-[#748190] hover:bg-[#F3F5F8]"><FiX /></button>
          </div>
          <p className="mt-2 text-[14px] text-[#748190]">Take a final look and revisit your answers if necessary before submitting your test.</p>
          <p className="mt-6 text-[14px] font-semibold">Summary:</p>
          <ul className="mt-3 space-y-2 text-[14px]">
            <li className="flex items-center gap-3"><b className="w-6 text-[#2563EB]">{answeredCount}</b> Answered</li>
            <li className="flex items-center gap-3"><b className="w-6">{exam.questions.length - answeredCount}</b> Not Answered</li>
            <li className="flex items-center gap-3"><b className="w-6 text-[#F59E0B]">{flagged.length}</b> Flagged (answered/not answered)</li>
          </ul>
          <div className="mt-6 grid grid-cols-6 gap-2">
            {exam.questions.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setCurrent(index);
                  setReviewOpen(false);
                }}
                className={`relative h-10 rounded-[6px] border text-[14px] font-semibold ${answers[index] !== null ? "border-[#2563EB] bg-[#EFF4FF] text-[#2563EB]" : "border-[#D5D9DF] text-[#545C69]"}`}
              >
                {index + 1}
                {flagged.includes(index) ? <FiFlag className="absolute right-1 top-1 h-3 w-3 text-[#F59E0B]" /> : null}
              </button>
            ))}
          </div>
          <button type="button" onClick={() => setConfirmFinish(true)} className="mt-8 h-11 w-full rounded-[5px] bg-[#2563EB] text-[15px] font-semibold text-white hover:bg-[#1D4ED8]">Finalize</button>
          <p className="mt-2 text-center text-[12px] text-[#748190]">Submit exam on the next page</p>
        </aside>
      ) : null}

      <Modal open={confirmFinish} onClose={() => setConfirmFinish(false)} label="Submit exam">
        <div className="p-8 text-center">
          <p className="text-[20px] font-semibold">Submit your exam?</p>
          <p className="mt-3 text-[14px] text-[#748190]">
            You answered {answeredCount} of {exam.questions.length} questions. You won&apos;t be able to change your answers after submitting.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button type="button" onClick={() => setConfirmFinish(false)} className="h-11 rounded-[5px] border border-[#D5D9DF] px-6 text-[15px] font-semibold text-[#545C69]">Keep reviewing</button>
            <button type="button" onClick={() => finish.current()} className="h-11 rounded-[5px] bg-[#2563EB] px-6 text-[15px] font-semibold text-white">Submit exam</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default function ExamRunner({ examId, mode = "take" }) {
  const router = useRouter();
  const exam = getPracticeExam(examId);
  const [allResults, setAllResults] = useStoredValue("skillvexa-admin-exam-results", {});
  const results = allResults || {};

  if (mode === "results") return <ResultsView exam={exam} attempt={results[examId]?.last} />;

  return (
    <ExamTaking
      exam={exam}
      onFinish={(answers) => {
        const correct = exam.questions.filter((question, index) => answers[index] === question.answer).length;
        const score = Math.round((correct / exam.questions.length) * 100);
        const previous = results[examId];
        setAllResults({
          ...results,
          [examId]: { best: Math.max(score, previous?.best || 0), attempts: (previous?.attempts || 0) + 1, last: { answers, score } },
        });
        router.push(`/admin/exams/${examId}/results`);
      }}
    />
  );
}
