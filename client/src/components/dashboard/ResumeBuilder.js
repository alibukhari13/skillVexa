"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiCheck, FiPlus, FiTrash2, FiUpload, FiX } from "react-icons/fi";
import { dashboardUser } from "@/components/dashboard/DashboardShell";
import { Modal, Toggle } from "@/components/dashboard/DashboardUI";
import { siteConfig } from "@/config/SiteConfig";
import { useStoredValue } from "@/lib/useStoredValue";

export const RESUME_KEY = "skillvexa-admin-resume";

const steps = ["Contact", "Experience", "Education", "Certificates", "Skills", "Languages", "Links", "Summary", "Terms"];

const stepCopy = {
  Contact: ["Tell employers about yourself.", "Let companies know who you are and how they can contact you."],
  Experience: ["Add your work experience.", "Start with your current or most recent role. If you have a long history, keep the positions relevant to the job you want."],
  Education: ["Add your education.", "Begin with your most recent degree and work backwards."],
  Certificates: ["Show off your certificates.", "Certificates prove you take initiative and finish what you start."],
  Skills: ["List your skills.", "Pick the skills that match the jobs you're applying for."],
  Languages: ["Which languages do you speak?", "Add every language you can use at work."],
  Links: ["Share your work.", "Link your GitHub, Kaggle, portfolio or LinkedIn profile."],
  Summary: ["Write a short summary.", "A confident two- or three-line opening helps you stand out."],
  Terms: ["Almost done!", "Choose who can see your resume."],
};

const tips = {
  Contact: ["Use a professional email address.", "Add a phone number so recruiters can reach you quickly.", "A clear, friendly photo makes your profile more personal."],
  Experience: ["Describe what you achieved, not only what you did.", "Use numbers where you can (e.g. “cut reporting time by 30%”).", "No relevant experience yet? Highlight transferable skills."],
  Education: ["Put your highest degree first.", "Skip high school if you have a university degree.", "Spell your degrees consistently (e.g. M.A., B.Sc.)."],
  Certificates: ["Start with certificates that match your target role.", "Certificates with a final exam carry more weight.", "Add the credential URL so employers can verify it."],
  Skills: ["Mirror the keywords from the job description.", "List your 3–5 strongest skills first.", "Include a few interpersonal skills as well."],
  Languages: ["Start with the language you speak best.", "Be honest about your level."],
  Links: ["Lead with links to your best projects.", "A short blog shows how you think.", "Avoid personal social media."],
  Summary: ["Include the keywords recruiters search for.", "Mention the skills you enjoy using most.", "Keep it short—three lines is plenty."],
  Terms: ["Making your resume visible helps recruiters discover you."],
};

const emptyResume = {
  photo: null,
  email: "",
  address: "",
  country: "Pakistan",
  birthDate: "",
  phone: "",
  experience: [],
  education: [],
  certificates: [],
  skills: [],
  languages: [],
  links: [],
  position: "",
  summary: "",
  external: false,
  completed: false,
};

export function resumeStrength(resume) {
  if (!resume) return 0;
  const checks = [
    Boolean(resume.email),
    Boolean(resume.phone),
    resume.experience?.length > 0,
    resume.education?.length > 0,
    resume.certificates?.length > 0,
    resume.skills?.length > 0,
    resume.languages?.length > 0,
    resume.links?.length > 0,
    Boolean(resume.summary),
    Boolean(resume.photo),
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}

const inputClass = "h-11 w-full rounded-[6px] border border-[#D5D9DF] bg-white px-3 text-[14px] text-[#0F172A] outline-none placeholder:text-[#9BA3AE] focus:border-[#2563EB] disabled:bg-[#F3F5F8] disabled:text-[#9BA3AE]";

function Field({ hint, children }) {
  return (
    <label className="block">
      {children}
      {hint ? <span className="mt-1 block text-[12px] text-[#9BA3AE]">{hint}</span> : null}
    </label>
  );
}

function StrengthRing({ value }) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  return (
    <svg viewBox="0 0 80 80" className="h-20 w-20 shrink-0">
      <circle cx="40" cy="40" r={radius} fill="none" stroke="#E5E7EB" strokeWidth="6" />
      <circle cx="40" cy="40" r={radius} fill="none" stroke="#2563EB" strokeWidth="6" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - value / 100)} transform="rotate(-90 40 40)" />
      <text x="40" y="45" textAnchor="middle" className="fill-[#0F172A] text-[16px] font-semibold">{value}%</text>
    </svg>
  );
}
function ListEditor({ items, onChange, fields, emptyLabel, renderItem }) {
  const blank = Object.fromEntries(fields.map((field) => [field.name, field.type === "checkbox" ? false : ""]));
  const [draft, setDraft] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const requiredFilled = fields.filter((field) => field.required).every((field) => String(draft?.[field.name] || "").trim());

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="flex items-start justify-between gap-4 rounded-[10px] border border-[#E5E7EB] p-4">
          <div className="min-w-0 text-[14px]">{renderItem(item)}</div>
          <button type="button" onClick={() => setDeleting(index)} aria-label="Delete" className="text-[#9BA3AE] hover:text-[#B91C1C]"><FiTrash2 className="h-4 w-4" /></button>
        </div>
      ))}
      {draft ? (
        <div className="space-y-3 rounded-[10px] border border-[#BFD3FF] bg-[#F8FAFF] p-4">
          {fields.map((field) =>
            field.type === "checkbox" ? (
              <label key={field.name} className="flex items-center gap-2 text-[14px]">
                <input type="checkbox" checked={draft[field.name]} onChange={(event) => setDraft({ ...draft, [field.name]: event.target.checked })} className="h-4 w-4 accent-[#2563EB]" />
                {field.label}
              </label>
            ) : field.type === "textarea" ? (
              <Field key={field.name} hint={field.hint}>
                <textarea rows={3} value={draft[field.name]} onChange={(event) => setDraft({ ...draft, [field.name]: event.target.value })} placeholder={field.label} className={`${inputClass} h-auto py-2`} />
              </Field>
            ) : field.type === "select" ? (
              <select key={field.name} value={draft[field.name]} onChange={(event) => setDraft({ ...draft, [field.name]: event.target.value })} className={inputClass}>
                <option value="">{field.label}</option>
                {field.options.map((option) => <option key={option}>{option}</option>)}
              </select>
            ) : (
              <Field key={field.name} hint={field.hint}>
                <input
                  value={draft[field.name]}
                  disabled={field.disabledWhen && draft[field.disabledWhen]}
                  onChange={(event) => setDraft({ ...draft, [field.name]: event.target.value })}
                  placeholder={field.label}
                  className={inputClass}
                />
              </Field>
            )
          )}
          <div className="flex justify-end gap-2 pt-1">
            <button type="button" onClick={() => setDraft(null)} className="h-9 px-4 text-[13px] font-semibold text-[#545C69]">Cancel</button>
            <button
              type="button"
              disabled={!requiredFilled}
              onClick={() => {
                onChange([...items, draft]);
                setDraft(null);
              }}
              className="h-9 rounded-[5px] bg-[#2563EB] px-4 text-[13px] font-semibold text-white disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <button type="button" onClick={() => setDraft(blank)} className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#2563EB]">
          <FiPlus className="h-4 w-4" /> {items.length ? "Add another" : emptyLabel}
        </button>
      )}

      <Modal open={deleting !== null} onClose={() => setDeleting(null)} label="Delete entry">
        <div className="p-8 text-center">
          <p className="text-[20px] font-semibold">Are you sure you want to delete this information?</p>
          <p className="mt-3 text-[14px] text-[#748190]">You won’t be able to retrieve this information once you delete it.</p>
          <div className="mt-6 flex justify-center gap-3">
            <button type="button" onClick={() => setDeleting(null)} className="h-11 rounded-[5px] bg-[#2563EB] px-6 text-[15px] font-semibold text-white">Keep info</button>
            <button
              type="button"
              onClick={() => {
                onChange(items.filter((_, index) => index !== deleting));
                setDeleting(null);
              }}
              className="h-11 rounded-[5px] border border-[#D5D9DF] px-6 text-[15px] font-semibold text-[#545C69]"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function ChipInput({ items, onChange, placeholder, validate }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const add = () => {
    const text = value.trim();
    if (!text) return;
    const problem = validate?.(text);
    if (problem) {
      setError(problem);
      return;
    }
    onChange([...items, text]);
    setValue("");
    setError("");
  };
  return (
    <div>
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setError("");
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              add();
            }
          }}
          placeholder={placeholder}
          className={inputClass}
        />
        <button type="button" onClick={add} className="h-11 shrink-0 rounded-[6px] bg-[#2563EB] px-4 text-[14px] font-semibold text-white">Add</button>
      </div>
      {error ? <p className="mt-1.5 text-[12px] text-[#B91C1C]">{error}</p> : null}
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="inline-flex items-center gap-1.5 rounded-full bg-[#EFF4FF] px-3 py-1.5 text-[13px] font-medium text-[#2563EB]">
            {item}
            <button type="button" onClick={() => onChange(items.filter((entry) => entry !== item))} aria-label={`Remove ${item}`}><FiX className="h-3.5 w-3.5" /></button>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ResumeBuilder() {
  const [stored, setStored] = useStoredValue(RESUME_KEY, null);
  const resume = { ...emptyResume, ...(stored || {}) };
  const [stepIndex, setStepIndex] = useState(0);
  const [photoError, setPhotoError] = useState("");
  const step = steps[stepIndex];
  const update = (patch) => setStored({ ...resume, ...patch });
  const strength = resumeStrength(resume);
  const emailValid = !resume.email || /^\S+@\S+\.\S+$/.test(resume.email);

  if (resume.completed) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#FAFAFB] px-4 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-[#DCFCE7] text-[#15803D]"><FiCheck className="h-8 w-8" /></span>
        <p className="mt-5 text-[28px] font-semibold text-[#0F172A]">Congratulations!</p>
        <p className="mt-2 text-[16px] text-[#545C69]">Your profile is completed! Resume strength: {strength}%</p>
        <div className="mt-6 flex gap-3">
          <button type="button" onClick={() => { update({ completed: false }); setStepIndex(0); }} className="h-11 rounded-[5px] border border-[#2563EB] px-6 text-[15px] font-semibold text-[#2563EB]">Edit resume</button>
          <Link href="/admin/profile" className="inline-flex h-11 items-center rounded-[5px] bg-[#2563EB] px-6 text-[15px] font-semibold text-white">Go to my profile</Link>
        </div>
      </div>
    );
  }

  const body = {
    Contact: (
      <div className="space-y-4">
        <div className="flex items-center gap-5">
          <span className="relative grid h-[72px] w-[72px] shrink-0 place-items-center overflow-hidden rounded-full bg-[#E5E7EB] text-[22px] font-semibold text-[#545C69]">
            {resume.photo ? <Image src={resume.photo} alt="" fill unoptimized className="object-cover" /> : dashboardUser.initials}
          </span>
          <div>
            <label className="inline-flex cursor-pointer items-center gap-2 text-[14px] font-semibold text-[#2563EB]">
              <FiUpload className="h-4 w-4" /> Upload photo
              <input
                type="file"
                accept="image/png,image/jpeg"
                className="sr-only"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  if (!["image/png", "image/jpeg"].includes(file.type)) return setPhotoError("Please upload a JPG or PNG file");
                  if (file.size > 2 * 1024 * 1024) return setPhotoError("Please upload a file less than 2MB in size");
                  const reader = new FileReader();
                  reader.onload = () => {
                    setPhotoError("");
                    update({ photo: reader.result });
                  };
                  reader.readAsDataURL(file);
                }}
              />
            </label>
            <p className="mt-1 text-[12px] text-[#9BA3AE]">Make sure your face is centered and takes up half the space.</p>
            {photoError ? <p className="mt-1 text-[12px] text-[#B91C1C]">{photoError}</p> : null}
          </div>
        </div>
        <Field hint="*You can change your name in settings"><input disabled value={dashboardUser.name} className={inputClass} /></Field>
        <Field hint={emailValid ? "e.g. user@mailprovider.com" : "Please enter a valid email address"}>
          <input type="email" value={resume.email} onChange={(event) => update({ email: event.target.value })} placeholder="Email" className={`${inputClass} ${emailValid ? "" : "border-[#DC2626]"}`} />
        </Field>
        <Field hint="e.g. 1590 Grand Ave, NY 11378"><input value={resume.address} onChange={(event) => update({ address: event.target.value })} placeholder="Address (optional)" className={inputClass} /></Field>
        <select value={resume.country} onChange={(event) => update({ country: event.target.value })} className={inputClass}>
          {["Pakistan", "India", "United Arab Emirates", "Saudi Arabia", "United Kingdom", "United States", "Canada", "Germany", "Other"].map((country) => <option key={country}>{country}</option>)}
        </select>
        <Field hint="e.g. Jul 23 1992"><input value={resume.birthDate} onChange={(event) => update({ birthDate: event.target.value })} placeholder="Date of birth (optional)" className={inputClass} /></Field>
        <Field hint="e.g. +92 312 1234567"><input value={resume.phone} onChange={(event) => update({ phone: event.target.value })} placeholder="Phone (optional)" className={inputClass} /></Field>
      </div>
    ),
    Experience: (
      <ListEditor
        items={resume.experience}
        onChange={(experience) => update({ experience })}
        emptyLabel="Add work experience"
        fields={[
          { name: "title", label: "Job Title", hint: "e.g. Data Scientist", required: true },
          { name: "company", label: "Company", hint: "e.g. Google", required: true },
          { name: "location", label: "Location", hint: "e.g. Lahore, Pakistan" },
          { name: "start", label: "Start Date", hint: "e.g. Jul 2018" },
          { name: "current", label: "I'm in this job right now", type: "checkbox" },
          { name: "end", label: "End Date", disabledWhen: "current" },
          { name: "description", label: "What did you do?", type: "textarea" },
        ]}
        renderItem={(item) => (
          <>
            <p className="font-semibold">{item.title} · {item.company}</p>
            <p className="text-[#748190]">{[item.location, item.start && `${item.start} – ${item.current ? "Present" : item.end || ""}`].filter(Boolean).join(" · ")}</p>
          </>
        )}
      />
    ),
    Education: (
      <ListEditor
        items={resume.education}
        onChange={(education) => update({ education })}
        emptyLabel="Add education"
        fields={[
          { name: "school", label: "School Name", hint: "e.g. University of the Punjab", required: true },
          { name: "level", label: "Level of education", type: "select", options: ["Bachelor's", "Master's", "PhD", "Diploma", "Other"] },
          { name: "field", label: "Field of study", hint: "e.g. Data science" },
          { name: "start", label: "Start Date", hint: "e.g. Sep 2019" },
          { name: "current", label: "I'm in this university right now", type: "checkbox" },
          { name: "graduation", label: "Graduation Date", disabledWhen: "current" },
        ]}
        renderItem={(item) => (
          <>
            <p className="font-semibold">{item.school}</p>
            <p className="text-[#748190]">{[item.level, item.field].filter(Boolean).join(" · ")}</p>
          </>
        )}
      />
    ),
    Certificates: (
      <ListEditor
        items={resume.certificates}
        onChange={(certificates) => update({ certificates })}
        emptyLabel="Add certificate"
        fields={[
          { name: "name", label: "Certificate name", hint: "e.g. Data analysis with Excel pivot tables", required: true },
          { name: "issuer", label: "Issuing organization", hint: `e.g. ${siteConfig.name}` },
          { name: "credentialId", label: "Credential ID", hint: "e.g. V2E49SDBZ2" },
          { name: "url", label: "Credential URL", hint: "e.g. https://skillvexa.com/verify/V2E49SDBZ2" },
        ]}
        renderItem={(item) => (
          <>
            <p className="font-semibold">{item.name}</p>
            <p className="text-[#748190]">{item.issuer}</p>
          </>
        )}
      />
    ),
    Skills: <ChipInput items={resume.skills} onChange={(skills) => update({ skills })} placeholder="Start typing to add the skill (e.g. Machine Learning)" />,
    Languages: (
      <ChipInput
        items={resume.languages}
        onChange={(languages) => update({ languages })}
        placeholder="Language (e.g. English)"
        validate={(text) => (resume.languages.some((item) => item.toLowerCase() === text.toLowerCase()) ? "This language already exists in your list!" : "")}
      />
    ),
    Links: <ChipInput items={resume.links} onChange={(links) => update({ links })} placeholder="Link (e.g. www.linkedin.com/in/your-name)" />,
    Summary: (
      <div className="space-y-4">
        <input value={resume.position} onChange={(event) => update({ position: event.target.value })} placeholder="Desired position" className={inputClass} />
        <textarea rows={6} value={resume.summary} onChange={(event) => update({ summary: event.target.value })} placeholder="Short summary" className={`${inputClass} h-auto py-2`} />
      </div>
    ),
    Terms: (
      <div className="flex items-start justify-between gap-6 rounded-[10px] border border-[#E5E7EB] p-5">
        <div>
          <p className="text-[15px] font-semibold">I agree that external users can see my resume.</p>
          <p className="mt-1 text-[13px] text-[#748190]">Reach more potential employers by letting recruiters on our platform see your resume.</p>
        </div>
        <Toggle checked={resume.external} onChange={(external) => update({ external })} label="Resume visible to external users" />
      </div>
    ),
  }[step];

  return (
    <div className="min-h-screen bg-[#FAFAFB]">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-6 border-b border-[#E5E7EB] bg-white px-4 sm:px-6">
        <Link href="/admin/resume" className="relative hidden h-[26px] w-[106px] shrink-0 sm:block">
          <Image src="/images/logo.svg" alt={`${siteConfig.name} Logo`} fill sizes="106px" className="object-contain object-left" />
        </Link>
        <ol className="flex flex-1 items-start gap-1 overflow-x-auto scrollbar-none">
          {steps.map((name, index) => (
            <li key={name} className="min-w-[78px] flex-1">
              <button type="button" onClick={() => setStepIndex(index)} className="flex w-full flex-col items-center gap-1.5">
                <span className={`text-[12px] font-semibold ${index === stepIndex ? "text-[#0F172A]" : "text-[#9BA3AE]"}`}>{name}</span>
                <span className={`h-2 w-2 rounded-full ${index <= stepIndex ? "bg-[#2563EB]" : "bg-[#D5D9DF]"}`} />
              </button>
            </li>
          ))}
        </ol>
        <Link href="/admin/resume" aria-label="Close resume builder" className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[#748190] hover:bg-[#F3F5F8]"><FiX className="h-5 w-5" /></Link>
      </header>

      <div className="mx-auto grid max-w-[1100px] gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <section className="rounded-[12px] bg-white p-6 shadow-[0_4px_14px_rgba(15,23,42,0.06)] sm:p-8">
          <h1 className="text-[20px] font-semibold text-[#0F172A]">{stepCopy[step][0]}</h1>
          <p className="mt-1 text-[14px] text-[#748190]">{stepCopy[step][1]}</p>
          <div className="mt-6">{body}</div>
          <div className="mt-8 flex justify-between">
            {stepIndex > 0 ? (
              <button type="button" onClick={() => setStepIndex(stepIndex - 1)} className="h-11 rounded-[5px] border border-[#D5D9DF] px-6 text-[15px] font-semibold text-[#545C69]">Back</button>
            ) : <span />}
            {stepIndex < steps.length - 1 ? (
              <button type="button" disabled={!emailValid} onClick={() => setStepIndex(stepIndex + 1)} className="h-11 rounded-[5px] bg-[#2563EB] px-8 text-[15px] font-semibold text-white hover:bg-[#1D4ED8] disabled:opacity-50">Next</button>
            ) : (
              <button type="button" onClick={() => update({ completed: true })} className="h-11 rounded-[5px] bg-[#2563EB] px-8 text-[15px] font-semibold text-white hover:bg-[#1D4ED8]">Finish</button>
            )}
          </div>
        </section>

        <aside className="h-fit rounded-[12px] bg-white p-6 shadow-[0_4px_14px_rgba(15,23,42,0.06)]">
          <div className="flex items-center gap-4">
            <StrengthRing value={strength} />
            <div>
              <p className="text-[15px] font-semibold text-[#0F172A]">Your Resume Strength</p>
              <p className="mt-1 text-[13px] text-[#748190]">Fill in all fields to complete your resume and make it shine.</p>
            </div>
          </div>
          <p className="mt-6 text-[14px] font-semibold text-[#0F172A]">Tips and Best Practices</p>
          <ul className="mt-3 space-y-2.5">
            {tips[step].map((tip) => (
              <li key={tip} className="flex items-start gap-2.5 text-[13px] leading-5 text-[#545C69]">
                <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#2563EB]" /> {tip}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
