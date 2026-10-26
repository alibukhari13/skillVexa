"use client";

import { useCallback, useSyncExternalStore } from "react";

// Small localStorage-backed state for the admin demo (learning path, daily goal,
// resume draft...). Values live only in this browser; there is no backend yet.
const listeners = new Set();

function subscribe(listener) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function readRaw(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function useStoredValue(key, fallback = null) {
  const raw = useSyncExternalStore(subscribe, () => readRaw(key), () => null);
  let value = fallback;
  if (raw) {
    try {
      value = JSON.parse(raw);
    } catch {
      value = fallback;
    }
  }

  const setValue = useCallback(
    (next) => {
      try {
        if (next === null || next === undefined) window.localStorage.removeItem(key);
        else window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // Storage unavailable (private mode): changes simply aren't remembered.
      }
      listeners.forEach((listener) => listener());
    },
    [key]
  );

  return [value, setValue];
}
