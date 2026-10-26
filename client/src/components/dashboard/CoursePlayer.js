"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FiCheck,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiEdit3,
  FiFileText,
  FiFolder,
  FiLock,
  FiMaximize,
  FiPause,
  FiPlay,
  FiPlayCircle,
  FiRotateCcw,
  FiSettings,
  FiVolume2,
} from "react-icons/fi";
import { TbPin } from "react-icons/tb";
import { FocusTopBar } from "@/components/dashboard/DashboardShell";
import { Toggle } from "@/components/dashboard/DashboardUI";
import { courseById, getCourseCurriculum, practiceQuestions, sampleQuestions } from "@/config/AdminContent";
import { useStoredValue } from "@/lib/useStoredValue";

function itemIcon(item) {
  if (item.type === "lesson") return <FiPlayCircle className="h-4 w-4" />;
  if (item.type === "exercise") return <TbPin className="h-4 w-4" />;
  return <FiFileText className="h-4 w-4" />;
}

function VideoStage({ course, item, autoplay, setAutoplay }) {
  const [playing, setPlaying] = useState(false);
  const duration = item.meta.replace("Lesson - ", "").replace(" min", "");
  return (
    <div className="relative aspect-video w-full overflow-hidden bg-[#0B1220]">
      <Image src={course.image} alt="" fill loading="eager" sizes="(max-width: 1024px) 100vw, 60vw" className={`object-cover transition-opacity ${playing ? "opacity-20" : "opacity-45"}`} />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center text-white">
        <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-white/60">{course.title}</p>
        <p className="max-w-[560px] text-[22px] font-semibold leading-tight sm:text-[26px]">{item.title}</p>
        {playing ? (
          <p className="text-[14px] text-white/70">Video lessons are coming soon to SkillVexa.</p>
        ) : (
          <button type="button" onClick={() => setPlaying(true)} aria-label="Play lesson" className="grid h-16 w-16 place-items-center rounded-full bg-[#2563EB] text-white shadow-[0_10px_30px_rgba(37,99,235,0.45)] transition-transform hover:scale-105">
            <FiPlay className="ml-1 h-7 w-7" />
          </button>
        )}
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.75),rgba(0,0,0,0))] px-4 pb-3 pt-8 text-white">
        <div className="mb-2 h-1 overflow-hidden rounded-full bg-white/25"><span className="block h-full w-0 bg-[#2563EB]" /></div>
        <div className="flex items-center gap-4 text-[13px]">
          <button type="button" onClick={() => setPlaying((value) => !value)} aria-label={playing ? "Pause" : "Play"}>{playing ? <FiPause className="h-5 w-5" /> : <FiPlay className="h-5 w-5" />}</button>
          <FiRotateCcw className="h-4 w-4 opacity-80" />
          <span className="tabular-nums opacity-90">0:00/{duration}</span>
          <span className="ml-auto inline-flex items-center gap-2">
            <Toggle checked={autoplay} onChange={setAutoplay} label="Autoplay" /> Autoplay
          </span>
          <FiVolume2 className="h-4 w-4 opacity-80" />
          <span className="opacity-90">1x</span>
          <FiSettings className="h-4 w-4 opacity-80" />
          <FiMaximize className="h-4 w-4 opacity-80" />
        </div>
      </div>
    </div>
  );
}

function ExerciseStage({ item }) {
  const question = practiceQuestions[item.index % practiceQuestions.length];
  const [picked, setPicked] = useState(null);
  const [checked, setChecked] = useState(false);
  return (
    <div className="min-h-[360px] bg-white p-6 sm:p-10">
      <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-[#748190]">{item.title} · {item.meta}</p>
      <p className="mt-3 text-[18px] font-semibold text-[#0F172A]">{question.question}</p>
      <ul className="mt-5 space-y-2.5">
        {question.options.map((option, index) => {
          const correct = checked && index === question.answer;
          const wrong = checked && picked === index && index !== question.answer;
          return (
            <li key={option}>
              <button
                type="button"
                disabled={checked}
                onClick={() => setPicked(index)}
                className={`flex w-full items-center gap-3 rounded-[8px] border px-4 py-3 text-left text-[15px] transition-colors ${
                  correct ? "border-[#16A34A] bg-[#F0FDF4]" : wrong ? "border-[#DC2626] bg-[#FEF2F2]" : picked === index ? "border-[#2563EB] bg-[#EFF4FF]" : "border-[#E5E7EB] hover:border-[#BFD3FF]"
                }`}
              >
                <span className={`h-4 w-4 shrink-0 rounded-full border-2 ${picked === index ? "border-[#2563EB] bg-[#2563EB]" : "border-[#CBD2DC]"}`} />
                {option}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="mt-6 flex items-center gap-4">
        {checked ? (
          <>
            <p className={`text-[14px] font-semibold ${picked === question.answer ? "text-[#16A34A]" : "text-[#DC2626]"}`}>{picked === question.answer ? "Correct! Well done." : "Not quite—the correct answer is highlighted."}</p>
            <button type="button" onClick={() => { setPicked(null); setChecked(false); }} className="text-[14px] font-semibold text-[#2563EB]">Try again</button>
          </>
        ) : (
          <button type="button" disabled={picked === null} onClick={() => setChecked(true)} className="h-10 rounded-[5px] bg-[#2563EB] px-6 text-[14px] font-semibold text-white disabled:opacity-50">
            Check answer
          </button>
        )}
      </div>
    </div>
  );
}

function ExamStage({ item, courseId, number }) {
  const isPractice = item.type === "practice";
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center bg-white p-8 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-full bg-[#EFF4FF] text-[#2563EB]">{isPractice ? <FiFileText className="h-6 w-6" /> : <FiLock className="h-6 w-6" />}</span>
      <p className="mt-4 text-[22px] font-semibold text-[#0F172A]">{item.title}</p>
      <p className="mt-1 text-[15px] text-[#545C69]">{item.meta}</p>
      {isPractice ? (
        <Link href={`/admin/exams/${courseId}--${number}`} className="mt-6 inline-flex h-11 items-center rounded-[5px] bg-[#2563EB] px-7 text-[15px] font-semibold text-white hover:bg-[#1D4ED8]">
          Start Exam
        </Link>
      ) : (
        <>
          <button type="button" disabled className="mt-6 h-11 cursor-not-allowed rounded-[5px] bg-[#E5E7EB] px-7 text-[15px] font-semibold text-[#9BA3AE]">Start Exam</button>
          <p className="mt-3 text-[13px] text-[#748190]">Complete all lessons to unlock the course exam</p>
        </>
      )}
    </div>
  );
}

function CurriculumPanel({ sections, currentId, completed, onSelect }) {
  const currentSection = sections.find((section) => section.items.some((item) => item.id === currentId))?.number;
  const [openSections, setOpenSections] = useState(() => [currentSection || 1]);
  const toggle = (number) => setOpenSections((list) => (list.includes(number) ? list.filter((value) => value !== number) : [...list, number]));
  return (
    <div className="divide-y divide-[#E5E7EB]">
      {sections.map((section) => {
        const open = openSections.includes(section.number);
        const done = section.items.every((item) => completed.includes(item.id));
        return (
          <div key={section.number}>
            <button type="button" onClick={() => toggle(section.number)} aria-expanded={open} className="flex w-full items-start gap-3 px-5 py-4 text-left">
              <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${done ? "border-[#2563EB] bg-[#2563EB] text-white" : "border-[#545C69]"}`}>{done ? <FiCheck className="h-3 w-3" /> : null}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-[16px] font-semibold text-[#0F172A]">{section.number}. {section.title}</span>
                <span className="text-[13px] text-[#748190]">{section.duration}</span>
              </span>
              <FiChevronDown className={`mt-1 h-4 w-4 shrink-0 text-[#748190] transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            {open ? (
              <ul className="pb-2">
                {section.items.map((item) => {
                  const active = item.id === currentId;
                  const isDone = completed.includes(item.id);
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => onSelect(item.id)}
                        className={`flex w-full items-start gap-3 px-5 py-3 pl-9 text-left transition-colors ${active ? "bg-[#E8EEFB]" : "hover:bg-[#F5F7FA]"}`}
                      >
                        <span className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border-[1.5px] ${isDone ? "border-[#2563EB] bg-[#2563EB] text-white" : "border-[#545C69]"}`}>{isDone ? <FiCheck className="h-2.5 w-2.5" /> : null}</span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[14px] text-[#0F172A]">{item.title}</span>
                          <span className="mt-1 inline-flex items-center gap-1.5 text-[12px] text-[#545C69]">{itemIcon(item)} {item.meta}</span>
                        </span>
                        {item.resources ? (
                          <span className="mt-1 inline-flex shrink-0 items-center gap-1 rounded-[5px] border border-[#545C69] px-2 py-1 text-[11px] text-[#0F172A]">
                            <FiFolder className="h-3 w-3" /> Resources
                          </span>
                        ) : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export default function CoursePlayer({ courseId }) {
  const course = courseById[courseId];
  const sections = useMemo(() => getCourseCurriculum(course), [course]);
  const items = useMemo(() => sections.flatMap((section) => section.items), [sections]);
  const lessons = items.filter((item) => item.type === "lesson");
  const [currentId, setCurrentId] = useState(items[0].id);
  const [progress, setProgress] = useStoredValue(`skillvexa-admin-course-${courseId}`, { completed: [], notes: [] });
  const completed = progress.completed || [];
  const notes = progress.notes || [];
  const [panelOpen, setPanelOpen] = useState(true);
  const [panelTab, setPanelTab] = useState("Curriculum");
  const [bottomTab, setBottomTab] = useState("Resources");
  const [noteDraft, setNoteDraft] = useState(null);
  const [autoplay, setAutoplay] = useState(false);
  const currentIndex = items.findIndex((item) => item.id === currentId);
  const current = items[currentIndex];
  const practiceNumber = items.filter((item, index) => item.type === "practice" && index <= currentIndex).length;
  const lessonsDone = lessons.filter((item) => completed.includes(item.id)).length;
  const relatedQuestions = sampleQuestions.filter((question) => question.course === course.title);

  const goNext = () => {
    if (!completed.includes(current.id)) setProgress({ ...progress, completed: [...completed, current.id] });
    if (currentIndex < items.length - 1) setCurrentId(items[currentIndex + 1].id);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFB] pt-16">
      <FocusTopBar backHref="/admin/courses" title={course.title} progress={<><b className="text-white">{lessonsDone}</b>/{lessons.length} <span className="text-[#60A5FA]">lectures</span></>} />
      <div className="flex flex-col lg:flex-row">
        <main className="min-w-0 flex-1">
          {current.type === "lesson" ? (
            <VideoStage key={current.id} course={course} item={current} autoplay={autoplay} setAutoplay={setAutoplay} />
          ) : current.type === "exercise" ? (
            <ExerciseStage key={current.id} item={current} />
          ) : (
            <ExamStage item={current} courseId={courseId} number={practiceNumber} />
          )}

          <div className="px-4 py-5 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex border-b-2 border-[#D5D9DF]">
                {["Resources", "My notes"].map((tab) => (
                  <button key={tab} type="button" onClick={() => setBottomTab(tab)} className={`-mb-[2px] min-w-[140px] border-b-2 px-6 pb-2.5 text-[14px] font-semibold ${bottomTab === tab ? "border-[#2563EB] text-[#2563EB]" : "border-transparent text-[#748190] hover:text-[#0F172A]"}`}>
                    {tab}
                  </button>
                ))}
              </div>
              <button type="button" onClick={() => { setBottomTab("My notes"); setNoteDraft(""); }} className="inline-flex h-10 items-center gap-2 rounded-[5px] border border-[#545C69] px-4 text-[14px] font-semibold text-[#0F172A] hover:bg-white">
                <FiEdit3 className="h-4 w-4" /> Add note
              </button>
            </div>

            <div className="min-h-[120px] py-5">
              {bottomTab === "Resources" ? (
                current.resources ? (
                  <p className="inline-flex items-center gap-2.5 text-[15px] text-[#0F172A]"><FiFileText className="h-5 w-5 text-[#DC2626]" /> {course.title} - Course Notes.pdf</p>
                ) : (
                  <p className="text-[14px] text-[#748190]">There are no resources for this item.</p>
                )
              ) : (
                <div className="space-y-3">
                  {noteDraft !== null ? (
                    <div className="rounded-[10px] border border-[#D5D9DF] bg-white p-3">
                      <textarea autoFocus value={noteDraft} onChange={(event) => setNoteDraft(event.target.value)} rows={3} placeholder={`Note for "${current.title}"`} className="w-full resize-none text-[14px] outline-none" />
                      <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => setNoteDraft(null)} className="h-9 px-4 text-[13px] font-semibold text-[#545C69]">Cancel</button>
                        <button
                          type="button"
                          disabled={!noteDraft.trim()}
                          onClick={() => {
                            setProgress({ ...progress, notes: [{ id: Date.now(), itemTitle: current.title, text: noteDraft.trim() }, ...notes] });
                            setNoteDraft(null);
                          }}
                          className="h-9 rounded-[5px] bg-[#2563EB] px-4 text-[13px] font-semibold text-white disabled:opacity-50"
                        >
                          Save note
                        </button>
                      </div>
                    </div>
                  ) : null}
                  {notes.length ? (
                    notes.map((note) => (
                      <div key={note.id} className="rounded-[10px] bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.06)]">
                        <p className="text-[12px] font-semibold text-[#748190]">{note.itemTitle}</p>
                        <p className="mt-1 whitespace-pre-wrap text-[14px] text-[#0F172A]">{note.text}</p>
                        <button type="button" onClick={() => setProgress({ ...progress, notes: notes.filter((item) => item.id !== note.id) })} className="mt-2 text-[12px] font-semibold text-[#B91C1C]">Delete</button>
                      </div>
                    ))
                  ) : noteDraft === null ? (
                    <p className="text-[14px] text-[#748190]">You haven&apos;t taken any notes yet. Click “Add note” to save your thoughts while learning.</p>
                  ) : null}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3">
              {currentIndex > 0 ? (
                <button type="button" onClick={() => setCurrentId(items[currentIndex - 1].id)} className="inline-flex h-10 items-center gap-1.5 rounded-[5px] border border-[#D5D9DF] px-4 text-[14px] font-semibold text-[#545C69]">
                  <FiChevronLeft className="h-4 w-4" /> Previous
                </button>
              ) : null}
              <button type="button" onClick={goNext} disabled={currentIndex === items.length - 1} className="inline-flex h-10 items-center gap-1.5 rounded-[5px] bg-[#2563EB] px-5 text-[14px] font-semibold text-white hover:bg-[#1D4ED8] disabled:opacity-50">
                Next <FiChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </main>

        <aside className={`relative border-l border-[#E5E7EB] bg-white transition-[width] lg:sticky lg:top-16 lg:h-[calc(100vh-64px)] ${panelOpen ? "lg:w-[440px]" : "lg:w-0"}`}>
          <button
            type="button"
            onClick={() => setPanelOpen((value) => !value)}
            aria-label={panelOpen ? "Hide course content" : "Show course content"}
            className="absolute -left-9 top-4 hidden h-12 w-9 place-items-center rounded-l-[8px] border border-r-0 border-[#E5E7EB] bg-white text-[#545C69] lg:grid"
          >
            {panelOpen ? <FiChevronRight className="h-4 w-4" /> : <FiChevronLeft className="h-4 w-4" />}
          </button>
          <div className={`flex h-full flex-col ${panelOpen ? "" : "lg:hidden"}`}>
            <div className="flex items-center gap-5 border-b border-[#E5E7EB] px-5 py-3">
              {["Curriculum", "Q&A", "Transcript"].map((tab) => (
                <button key={tab} type="button" onClick={() => setPanelTab(tab)} className={`text-[15px] font-semibold ${panelTab === tab ? "text-[#0F172A]" : "text-[#9BA3AE] hover:text-[#545C69]"}`}>
                  {tab}
                </button>
              ))}
              <button type="button" className="ml-auto inline-flex h-8 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-[5px] border border-[#545C69] px-3 text-[12px] text-[#0F172A]">
                <FiDownload className="h-3.5 w-3.5" /> Download all resources
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {panelTab === "Curriculum" ? (
                <CurriculumPanel sections={sections} currentId={currentId} completed={completed} onSelect={setCurrentId} />
              ) : panelTab === "Q&A" ? (
                <div className="p-5">
                  <Link href="/admin/qa-hub" className="inline-flex h-10 items-center rounded-[5px] bg-[#2563EB] px-5 text-[14px] font-semibold text-white">Ask a question</Link>
                  {relatedQuestions.length ? (
                    <ul className="mt-5 space-y-3">
                      {relatedQuestions.map((question) => (
                        <li key={question.id} className="rounded-[10px] border border-[#E5E7EB] p-4">
                          <p className="text-[14px] font-semibold text-[#0F172A]">{question.title}</p>
                          <p className="mt-1 text-[13px] text-[#545C69]">{question.excerpt}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-5 text-[14px] text-[#748190]">No questions have been asked about this course yet. Be the first!</p>
                  )}
                </div>
              ) : (
                <div className="space-y-4 p-5 text-[14px] leading-7 text-[#3D4653]">
                  <p className="font-semibold text-[#0F172A]">{current.title}</p>
                  {current.type === "lesson" ? (
                    <>
                      <p>Welcome back! In this lesson we look at {current.title.toLowerCase()} and why it matters for your work with data.</p>
                      <p>We start with a simple definition, walk through a short example, and finish with the questions you should ask whenever you meet this topic in a real project.</p>
                      <p>When you are ready, use the Next button to continue—or take notes along the way so you can revisit the key ideas later.</p>
                    </>
                  ) : (
                    <p className="text-[#748190]">Transcripts are available for video lessons only.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
