"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FiAtSign, FiBookOpen, FiBookmark, FiEye, FiFilter, FiHash, FiHeart, FiMessageCircle, FiMessageSquare, FiMoreVertical, FiSearch, FiSend, FiThumbsUp, FiZap } from "react-icons/fi";
import { TbArrowsSort } from "react-icons/tb";
import { PageContainer, dashboardUser } from "@/components/dashboard/DashboardShell";
import { Avatar, DarkHero, Modal, SearchInput } from "@/components/dashboard/DashboardUI";
import { channelMessages, channels, newsfeedPosts, popularQuestions, sampleQuestions, topLearners } from "@/config/AdminContent";
import { dashboardCourses } from "@/config/DashboardData";
import { useStoredValue } from "@/lib/useStoredValue";

/* --------------------------------- Q&A Hub --------------------------------- */

function AskQuestionModal({ open, onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [body, setBody] = useState("");
  const reset = () => {
    setTitle("");
    setCourse("");
    setBody("");
  };
  return (
    <Modal open={open} onClose={() => { reset(); onClose(); }} className="max-w-[640px]" label="Ask a question">
      <form
        className="p-6 sm:p-8"
        onSubmit={(event) => {
          event.preventDefault();
          if (!title.trim() || !body.trim()) return;
          onSubmit({ title: title.trim(), course, excerpt: body.trim() });
          reset();
          onClose();
        }}
      >
        <p className="text-[22px] font-semibold">Ask a question</p>
        <p className="mt-1 text-[14px] text-[#748190]">Be specific and mention the lesson or exercise you&apos;re stuck on.</p>
        <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Question title" className="mt-5 h-11 w-full rounded-[6px] border border-[#D5D9DF] px-3 text-[14px] outline-none focus:border-[#2563EB]" />
        <select value={course} onChange={(event) => setCourse(event.target.value)} className="mt-3 h-11 w-full rounded-[6px] border border-[#D5D9DF] px-3 text-[14px] outline-none focus:border-[#2563EB]">
          <option value="">Related course (optional)</option>
          {dashboardCourses.map((item) => <option key={item.id}>{item.title}</option>)}
        </select>
        <textarea value={body} onChange={(event) => setBody(event.target.value)} rows={5} placeholder="Describe your question..." className="mt-3 w-full resize-none rounded-[6px] border border-[#D5D9DF] p-3 text-[14px] outline-none focus:border-[#2563EB]" />
        <div className="mt-5 flex justify-end">
          <button type="submit" disabled={!title.trim() || !body.trim()} className="h-11 rounded-[5px] bg-[#2563EB] px-6 text-[15px] font-semibold text-white disabled:opacity-50">Post question</button>
        </div>
      </form>
    </Modal>
  );
}

const sortOptions = ["Newest", "Most viewed", "Unanswered"];

export function QaHubPage() {
  const [query, setQuery] = useState("");
  const [askOpen, setAskOpen] = useState(false);
  const [menu, setMenu] = useState(null);
  const [courseFilter, setCourseFilter] = useState("");
  const [sort, setSort] = useState(sortOptions[0]);
  const [myQuestions, setMyQuestions] = useStoredValue("skillvexa-admin-questions", []);
  const all = useMemo(() => [...(myQuestions || []), ...sampleQuestions], [myQuestions]);
  const courses = [...new Set(sampleQuestions.map((question) => question.course))];
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = all.filter((item) => (!q || `${item.title} ${item.excerpt}`.toLowerCase().includes(q)) && (!courseFilter || item.course === courseFilter));
    if (sort === "Most viewed") list = [...list].sort((a, b) => b.views - a.views);
    if (sort === "Unanswered") list = list.filter((item) => item.answers === 0);
    return list;
  }, [all, query, courseFilter, sort]);

  return (
    <div>
      <DarkHero
        title="Q&A Hub"
        aside={<button type="button" onClick={() => setAskOpen(true)} className="h-11 shrink-0 rounded-[5px] bg-[#2563EB] px-6 text-[15px] font-semibold text-white hover:bg-[#1D4ED8]">Ask a question</button>}
      >
        Get help from instructors, connect with fellow learners and have fun while you grow your data skills. Please follow our community guidelines.
      </DarkHero>
      <PageContainer>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <div className="min-w-[220px] flex-1"><SearchInput value={query} onChange={setQuery} placeholder="Q&A searching..." /></div>
              <div className="relative">
                <button type="button" onClick={() => setMenu(menu === "filter" ? null : "filter")} className={`inline-flex h-11 items-center gap-2 rounded-[5px] border px-4 text-[14px] font-medium ${courseFilter ? "border-[#2563EB] text-[#2563EB]" : "border-[#D5D9DF] text-[#545C69]"}`}>
                  <FiFilter className="h-4 w-4" /> Filter
                </button>
                {menu === "filter" ? (
                  <div className="absolute right-0 top-[calc(100%+8px)] z-20 w-[280px] rounded-[10px] bg-white p-2 shadow-[0_12px_32px_rgba(15,23,42,0.18)]">
                    {["", ...courses].map((item) => (
                      <button key={item || "all"} type="button" onClick={() => { setCourseFilter(item); setMenu(null); }} className={`block w-full rounded-[6px] px-3 py-2 text-left text-[13px] hover:bg-[#F5F7FA] ${courseFilter === item ? "font-semibold text-[#2563EB]" : ""}`}>{item || "All courses"}</button>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="relative">
                <button type="button" onClick={() => setMenu(menu === "sort" ? null : "sort")} className="inline-flex h-11 items-center gap-2 rounded-[5px] border border-[#D5D9DF] px-4 text-[14px] font-medium text-[#545C69]">
                  <TbArrowsSort className="h-4 w-4" /> Sort
                </button>
                {menu === "sort" ? (
                  <div className="absolute right-0 top-[calc(100%+8px)] z-20 w-[180px] rounded-[10px] bg-white p-2 shadow-[0_12px_32px_rgba(15,23,42,0.18)]">
                    {sortOptions.map((item) => (
                      <button key={item} type="button" onClick={() => { setSort(item); setMenu(null); }} className={`block w-full rounded-[6px] px-3 py-2 text-left text-[13px] hover:bg-[#F5F7FA] ${sort === item ? "font-semibold text-[#2563EB]" : ""}`}>{item}</button>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
            <p className="mb-4 mt-5 text-[14px] font-semibold">{results.length} results</p>
            <ul className="space-y-3">
              {results.map((item) => (
                <li key={item.id} className="rounded-[10px] bg-white p-5 shadow-[0_4px_14px_rgba(15,23,42,0.08)]">
                  <div className="flex items-center gap-3">
                    <Avatar name={item.author} size="h-8 w-8" />
                    <span className="text-[13px] font-semibold text-[#2563EB]">{item.author}</span>
                    {item.badge ? <span className="rounded-[4px] bg-[#FEF3C7] px-2 py-0.5 text-[11px] font-semibold text-[#B45309]">{item.badge}</span> : null}
                    <span className="ml-auto inline-flex items-center gap-3 text-[13px] text-[#545C69]">
                      <span className="inline-flex items-center gap-1">{item.votes} <FiThumbsUp className="h-3.5 w-3.5" /></span>
                      <span className="inline-flex items-center gap-1">{item.answers} <FiMessageSquare className="h-3.5 w-3.5" /></span>
                    </span>
                  </div>
                  <p className="mt-3 text-[15px] font-semibold text-[#0F172A]">{item.title}</p>
                  <p className="mt-1 line-clamp-1 text-[13px] text-[#545C69]">{item.excerpt}</p>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[12px] text-[#748190]">
                    <span>{item.course || "General"}</span>
                    <span className="inline-flex items-center gap-3">
                      {item.lastAnswered ? <span>Last answered: {item.lastAnswered}</span> : null}
                      <span className="inline-flex items-center gap-1"><FiEye className="h-3.5 w-3.5" /> {item.views} views</span>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <aside className="h-fit rounded-[12px] bg-[#F0F0F2] p-4">
            <p className="text-[13px] font-semibold text-[#545C69]">Popular questions</p>
            <ul className="mt-3 space-y-3">
              {popularQuestions.map((item) => (
                <li key={item.title} className="rounded-[10px] bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.06)]">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="font-semibold text-[#2563EB] underline">{item.author}</span>
                    <span className="inline-flex items-center gap-2 text-[#545C69]">{item.votes} <FiThumbsUp className="h-3 w-3" /> {item.answers} <FiMessageSquare className="h-3 w-3" /></span>
                  </div>
                  <p className="mt-2 text-[13px] font-semibold text-[#0F172A]">{item.title}</p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </PageContainer>
      <AskQuestionModal
        open={askOpen}
        onClose={() => setAskOpen(false)}
        onSubmit={(question) => setMyQuestions([{ ...question, id: `mine-${Date.now()}`, author: dashboardUser.name, votes: 0, answers: 0, views: 0, lastAnswered: null }, ...(myQuestions || [])])}
      />
    </div>
  );
}

/* --------------------------------- Channels -------------------------------- */

function useJoinedChannels() {
  const [joined, setJoined] = useStoredValue("skillvexa-admin-channels", null);
  const list = joined || channels.filter((channel) => channel.joined).map((channel) => channel.id);
  return [list, setJoined];
}

const channelGradients = ["from-[#2563EB] to-[#0F172A]", "from-[#F59E0B] to-[#B45309]", "from-[#10B981] to-[#0F766E]", "from-[#8B5CF6] to-[#4C1D95]", "from-[#0EA5E9] to-[#1E3A8A]"];

function channelGradient(id) {
  return channelGradients[channels.findIndex((channel) => channel.id === id) % channelGradients.length];
}

// Dark channel menu that sits next to the collapsed admin sidebar (365 layout: 266px wide).
function ChannelsSidebar({ joined, activeId }) {
  const icons = [
    { label: "All channels", href: "/admin/channels", icon: FiHash, active: !activeId },
    { label: "Mentions", icon: FiAtSign },
    { label: "Saved messages", icon: FiBookmark },
    { label: "Channel rules", icon: FiBookOpen },
  ];
  return (
    <aside className="bg-[#293343] px-3 pb-6 pt-4 text-[#ABAFB5] lg:fixed lg:bottom-0 lg:left-0 desk:left-[44px] lg:top-16 lg:z-20 lg:w-[266px] lg:overflow-y-auto lg:rounded-br-[20px]">
      <div className="flex gap-2.5">
        {icons.map(({ label, href, icon: Icon, active }) =>
          href ? (
            <Link key={label} href={href} title={label} aria-label={label} className={`grid h-10 w-10 place-items-center rounded-[10px] ${active ? "bg-[#FDE68A] text-[#0F172A]" : "text-[#ABAFB5] hover:bg-white/10 hover:text-white"}`}>
              <Icon className="h-5 w-5" />
            </Link>
          ) : (
            <button key={label} type="button" title={`${label} (coming soon)`} aria-label={label} className="grid h-10 w-10 place-items-center rounded-[10px] text-[#ABAFB5] hover:bg-white/10 hover:text-white">
              <Icon className="h-5 w-5" />
            </button>
          )
        )}
      </div>
      <p className="mt-6 px-2 text-[16px] uppercase">My channels</p>
      <ul className="mt-2">
        {joined.map((id) => (
          <li key={id}>
            <Link href={`/admin/channels/${id}`} className={`block rounded-[5px] p-2 text-[16px] font-medium leading-4 ${activeId === id ? "bg-white/10 text-white" : "hover:bg-white/5 hover:text-white"}`}>
              # {id}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function ChannelsPage() {
  const [joined, setJoined] = useJoinedChannels();
  const [query, setQuery] = useState("");
  const [onlyJoined, setOnlyJoined] = useState(false);
  const visible = channels.filter((channel) => channel.name.includes(query.trim().toLowerCase()) && (!onlyJoined || joined.includes(channel.id)));
  const toggle = (id) => setJoined(joined.includes(id) ? joined.filter((item) => item !== id) : [...joined, id]);

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <ChannelsSidebar joined={joined} />
      <div className="min-w-0 lg:pl-[266px]">
        <section className="flex items-center justify-between gap-6 bg-[#FFF1DC] p-[30px]">
          <div className="max-w-[770px]">
            <h1 className="text-[28px] font-semibold text-[#D97706]">All Channels</h1>
            <p className="mt-5 text-[16px] font-semibold text-[#0F172A]">Discover all channels.</p>
            <p className="mt-4 max-w-[723px] text-[14px] leading-[22px] text-[#0F172A]">Here is a list of all the open channels you can join (or rejoin) anytime. Use the filter to quickly find what you’re looking for, or type a specific name in the search field.</p>
          </div>
          <span className="mr-6 hidden h-[120px] w-[120px] shrink-0 place-items-center rounded-full border-2 border-dashed border-[#F59E0B] text-[#F59E0B] sm:grid">
            <span className="grid h-[84px] w-[84px] place-items-center rounded-full bg-[#FDE68A] text-[#D97706]"><FiHash className="h-11 w-11" /></span>
          </span>
        </section>
        <div className="px-[30px] pb-10 pt-6">
          <div className="flex items-center gap-4">
            <label className="flex h-12 min-w-0 flex-1 items-center gap-3 rounded-full border border-[#E5E7EB] bg-white px-4 text-[#748190] focus-within:border-[#2563EB]">
              <FiSearch className="h-5 w-5 shrink-0" />
              <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search channels" aria-label="Search channels" className="min-w-0 flex-1 bg-transparent text-[18px] text-[#16191D] outline-none placeholder:text-[#9BA3AE]" />
            </label>
            <button type="button" onClick={() => setOnlyJoined((value) => !value)} aria-pressed={onlyJoined} className={`inline-flex h-10 w-[100px] shrink-0 items-center justify-center gap-2 rounded-[5px] border text-[16px] font-semibold ${onlyJoined ? "border-[#2563EB] text-[#2563EB]" : "border-[#ABAFB5] text-[#ABAFB5] hover:text-[#545C69]"}`}>
              <FiFilter className="h-4 w-4" /> {onlyJoined ? "Joined" : "Filter"}
            </button>
          </div>
          <ul className="mt-6 space-y-4">
            {visible.map((channel) => {
              const isJoined = joined.includes(channel.id);
              return (
                <li key={channel.id} className="flex items-start gap-5 border-b border-[#E6E7E9] pb-4">
                  <span className={`grid h-[54px] w-[54px] shrink-0 place-items-center rounded-[10px] bg-gradient-to-br text-white ${channelGradient(channel.id)}`}><FiHash className="h-6 w-6" /></span>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2 text-[18px] font-medium leading-[26px] text-[#0F172A]">
                      <Link href={`/admin/channels/${channel.id}`} className="hover:text-[#2563EB]"># {channel.name}</Link>
                      {isJoined ? <span className="inline-flex items-center gap-1 text-[13px] font-medium text-[#2563EB]"><span className="h-1 w-1 rounded-full bg-[#2563EB]" /> Joined</span> : null}
                    </p>
                    <p className="mt-1 truncate pr-6 text-[14px] leading-[23px] text-[#545C69]">{channel.body}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggle(channel.id)}
                    className={`mt-[7px] h-10 w-[100px] shrink-0 rounded-[5px] border text-[16px] font-semibold transition-colors ${isJoined ? "border-[#ABAFB5] text-[#ABAFB5] hover:text-[#545C69]" : "border-[#2563EB] bg-[#2563EB] text-white hover:bg-[#1D4ED8]"}`}
                  >
                    {isJoined ? "Leave" : "Join"}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function ChannelDetail({ channelId }) {
  const channel = channels.find((item) => item.id === channelId);
  const [joined, setJoined] = useJoinedChannels();
  const [stored, setStored] = useStoredValue(`skillvexa-admin-channel-${channelId}`, []);
  const [draft, setDraft] = useState("");
  const messages = [...(channelMessages[channelId] || []), ...(stored || [])];
  const isJoined = joined.includes(channelId);

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <ChannelsSidebar joined={joined} activeId={channelId} />
      <div className="flex min-h-[calc(100vh-64px)] min-w-0 flex-col lg:pl-[266px]">
        <div className="flex items-center gap-4 border-b border-[#E5E7EB] bg-white px-[30px] py-4">
          <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-[10px] bg-gradient-to-br text-white ${channelGradient(channelId)}`}><FiHash className="h-5 w-5" /></span>
          <div className="min-w-0 flex-1">
            <p className="text-[18px] font-medium text-[#0F172A]"># {channel.name}</p>
            <p className="truncate text-[14px] text-[#545C69]">{channel.body}</p>
          </div>
          <button type="button" onClick={() => setJoined(isJoined ? joined.filter((item) => item !== channelId) : [...joined, channelId])} className={`h-10 w-[100px] shrink-0 rounded-[5px] border text-[16px] font-semibold ${isJoined ? "border-[#ABAFB5] text-[#ABAFB5]" : "border-[#2563EB] bg-[#2563EB] text-white"}`}>
            {isJoined ? "Leave" : "Join"}
          </button>
        </div>
        <ul className="flex-1 space-y-6 px-[30px] py-8">
          {messages.length ? messages.map((message, index) => (
            <li key={index} className="flex gap-3">
              <Avatar name={message.author} size="h-10 w-10" />
              <div>
                <p className="text-[15px]"><b className="font-semibold">{message.author}</b> <span className="ml-1 text-[12px] text-[#9BA3AE]">{message.time}</span></p>
                <p className="mt-1 text-[15px] leading-6 text-[#3D4653]">{message.text}</p>
              </div>
            </li>
          )) : <li className="text-center text-[14px] text-[#748190]">No messages yet. Say hello!</li>}
        </ul>
        <form
          className="sticky bottom-0 flex gap-3 border-t border-[#E5E7EB] bg-white px-[30px] py-4"
          onSubmit={(event) => {
            event.preventDefault();
            if (!draft.trim()) return;
            setStored([...(stored || []), { author: dashboardUser.name, time: "Just now", text: draft.trim() }]);
            setDraft("");
          }}
        >
          <input value={draft} onChange={(event) => setDraft(event.target.value)} disabled={!isJoined} placeholder={isJoined ? `Message #${channel.name}` : "Join the channel to send messages"} className="h-12 min-w-0 flex-1 rounded-full border border-[#D5D9DF] px-5 text-[15px] outline-none focus:border-[#2563EB] disabled:bg-[#F3F5F8]" />
          <button type="submit" disabled={!isJoined || !draft.trim()} aria-label="Send" className="grid h-12 w-12 place-items-center rounded-full bg-[#2563EB] text-white disabled:opacity-50"><FiSend className="h-5 w-5" /></button>
        </form>
      </div>
    </div>
  );
}

/* --------------------------------- Newsfeed -------------------------------- */

function PostBody({ post }) {
  return (
    <div className="mt-4 flex items-center gap-4 rounded-[12px] bg-[linear-gradient(135deg,#1E293B_0%,#0F172A_100%)] p-5 text-white">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-[#2563EB]"><FiZap className="h-5 w-5" /></span>
      <div>
        <p className="text-[13px] text-white/70">{post.title}</p>
        <p className="text-[22px] font-semibold leading-tight">{post.value}</p>
        <p className="text-[13px] text-[#93C5FD]">{post.detail}</p>
      </div>
    </div>
  );
}

export function NewsfeedPage() {
  const [state, setState] = useStoredValue("skillvexa-admin-newsfeed", { likes: [], following: [], comments: {}, posts: [] });
  const feed = state || { likes: [], following: [], comments: {}, posts: [] };
  const [draft, setDraft] = useState("");
  const [commenting, setCommenting] = useState(null);
  const [comment, setComment] = useState("");
  const posts = [...(feed.posts || []), ...newsfeedPosts];
  const save = (patch) => setState({ ...feed, ...patch });
  const toggleIn = (list, value) => (list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);

  return (
    <PageContainer>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          <form
            className="rounded-[15px] bg-white p-5 shadow-[0_6px_20px_rgba(15,23,42,0.08)]"
            onSubmit={(event) => {
              event.preventDefault();
              if (!draft.trim()) return;
              save({ posts: [{ id: `mine-${Date.now()}`, author: dashboardUser.name, time: "Just now", type: "text", text: draft.trim() }, ...(feed.posts || [])] });
              setDraft("");
            }}
          >
            <div className="flex items-center gap-3">
              <Avatar name={dashboardUser.name} size="h-9 w-9" />
              <p className="text-[14px] font-semibold">{dashboardUser.name}</p>
            </div>
            <div className="mt-3 flex gap-2">
              <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Share an update with the community..." className="h-11 min-w-0 flex-1 rounded-full border border-[#E5E7EB] bg-[#F5F7FA] px-4 text-[14px] outline-none focus:border-[#2563EB]" />
              <button type="submit" disabled={!draft.trim()} className="h-11 rounded-full bg-[#2563EB] px-5 text-[14px] font-semibold text-white disabled:opacity-50">Post</button>
            </div>
          </form>

          {posts.map((post) => {
            const liked = feed.likes.includes(post.id);
            const following = feed.following.includes(post.author);
            const comments = feed.comments?.[post.id] || [];
            const mine = post.author === dashboardUser.name;
            return (
              <article key={post.id} className="rounded-[15px] bg-white p-5 shadow-[0_6px_20px_rgba(15,23,42,0.08)]">
                <div className="flex items-center gap-3">
                  <Avatar name={post.author} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[14px] font-semibold">{post.author} {post.badge ? <span className="ml-1 rounded-[4px] bg-[#FEF3C7] px-1.5 py-0.5 text-[10px] font-semibold text-[#B45309]">{post.badge}</span> : null}</p>
                    <p className="text-[12px] text-[#9BA3AE]">{post.time}</p>
                  </div>
                  {!mine ? (
                    <button type="button" onClick={() => save({ following: toggleIn(feed.following, post.author) })} className="text-[13px] font-semibold text-[#2563EB]">{following ? "Following" : "Follow +"}</button>
                  ) : null}
                  <FiMoreVertical className="h-4 w-4 text-[#9BA3AE]" />
                </div>
                {post.type === "text" ? <p className="mt-4 text-[14px] text-[#3D4653]">{post.text}</p> : <PostBody post={post} />}
                <div className="mt-4 grid grid-cols-2 border-t border-[#EEF0F3] pt-3 text-[13px]">
                  <button type="button" onClick={() => save({ likes: toggleIn(feed.likes, post.id) })} className={`inline-flex items-center justify-center gap-2 ${liked ? "font-semibold text-[#DC2626]" : "text-[#545C69]"}`}>
                    <FiHeart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} /> Like
                  </button>
                  <button type="button" onClick={() => { setCommenting(commenting === post.id ? null : post.id); setComment(""); }} className="inline-flex items-center justify-center gap-2 text-[#545C69]">
                    <FiMessageCircle className="h-4 w-4" /> Comment{comments.length ? ` (${comments.length})` : ""}
                  </button>
                </div>
                {comments.length ? (
                  <ul className="mt-3 space-y-2">
                    {comments.map((text, index) => <li key={index} className="rounded-[8px] bg-[#F5F7FA] px-3 py-2 text-[13px]"><b>{dashboardUser.name}</b> {text}</li>)}
                  </ul>
                ) : null}
                {commenting === post.id ? (
                  <form
                    className="mt-3 flex gap-2"
                    onSubmit={(event) => {
                      event.preventDefault();
                      if (!comment.trim()) return;
                      save({ comments: { ...(feed.comments || {}), [post.id]: [...comments, comment.trim()] } });
                      setComment("");
                      setCommenting(null);
                    }}
                  >
                    <input autoFocus value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Write a comment..." className="h-10 min-w-0 flex-1 rounded-full border border-[#E5E7EB] px-4 text-[13px] outline-none focus:border-[#2563EB]" />
                    <button type="submit" className="h-10 rounded-full bg-[#2563EB] px-4 text-[13px] font-semibold text-white">Send</button>
                  </form>
                ) : null}
              </article>
            );
          })}
        </div>

        <aside className="h-fit rounded-[15px] bg-white p-5 shadow-[0_6px_20px_rgba(15,23,42,0.08)]">
          <p className="flex items-center gap-2 text-[15px] font-semibold text-[#545C69]">Monthly top 30 learners</p>
          <ul className="mt-4 divide-y divide-[#EEF0F3]">
            {topLearners.map((learner) => {
              const following = feed.following.includes(learner.name);
              return (
                <li key={learner.name} className="flex items-center gap-3 py-3">
                  <Avatar name={learner.name} size="h-9 w-9" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-semibold">{learner.name}</p>
                    <p className="text-[12px] text-[#2563EB]">XP {learner.xp}</p>
                  </div>
                  <button type="button" onClick={() => save({ following: toggleIn(feed.following, learner.name) })} className="text-[13px] font-semibold text-[#2563EB]">{following ? "Following" : "Follow +"}</button>
                </li>
              );
            })}
          </ul>
          <Link href="/admin/leaderboard" className="mt-2 inline-flex text-[13px] font-semibold text-[#2563EB]">See all</Link>
        </aside>
      </div>
    </PageContainer>
  );
}
