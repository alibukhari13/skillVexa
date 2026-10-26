"use client";

import { useSyncExternalStore } from "react";

// Remembers (per browser tab) that the visitor came from the /admin area.
// While it is active, website links that also exist in the admin area
// (Courses, Career Paths, Projects, the logo) lead back into /admin.
// Regular website visitors never open /admin, so they never see this behaviour.
const STORAGE_KEY = "skillvexa-admin-session";
const listeners = new Set();

function readSession() {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function setAdminSession(active) {
  try {
    if (active) window.sessionStorage.setItem(STORAGE_KEY, "1");
    else window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage can be unavailable (private mode); the website simply stays in normal mode.
  }
  listeners.forEach((listener) => listener());
}

export function useAdminSession() {
  return useSyncExternalStore(subscribe, readSession, () => false);
}

// Website career-path slugs -> admin career-track ids (matched by the title the website shows).
const careerTrackBySlug = {
  "data-analyst": "data-analyst",
  "data-scientist": "senior-data-scientist",
  "senior-data-scientist": "senior-data-scientist",
  "data-sceintist": "data-scientist",
  "machine-scientist": "machine-learning-scientist",
  "tableau-developer": "tableau-developer",
  "ai-engineer": "ai-engineer",
  "buisness-analyst": "business-analyst",
  "power-bi-developer": "power-bi-developer",
  "ai-agent-engineer": "ai-agent-engineer",
  "data-engineer": "data-engineer",
  "quant-finance-analyst": "quant-finance-analyst",
};

export function toAdminHref(href) {
  if (typeof href !== "string") return href;
  const [path, hash] = href.split("#");
  if (path === "/") return "/admin";
  if (path === "/courses") return "/admin/courses";
  if (path === "/projects") return "/admin/projects";
  if (path === "/career-paths") return "/admin/career-tracks";
  const careerPath = path.match(/^\/career-paths?\/([^/]+)\/?$/);
  if (careerPath) {
    const trackId = hash === "more-career-paths" ? null : careerTrackBySlug[careerPath[1]];
    return trackId ? `/admin/career-tracks/${trackId}` : "/admin/career-tracks";
  }
  return href;
}

const keepHref = (href) => href;

// Returns a function that turns a website href into the admin one when an admin session is active.
export function useSiteHref() {
  return useAdminSession() ? toAdminHref : keepHref;
}
