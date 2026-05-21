// Typed localStorage helpers. Single source of truth for keys so we can
// swap to Lovable Cloud later without hunting strings.

export const StorageKeys = {
  interventions: "uniflow.interventions",
  plan: "uniflow.plan",
  attempts: "uniflow.attempts",
  highlights: "uniflow.highlights",
  streak: "uniflow.streak",
  flaggedLessons: "uniflow.flagged-lessons",
} as const;

export type StorageKey = (typeof StorageKeys)[keyof typeof StorageKeys];

export function readStorage<T>(key: StorageKey, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: StorageKey, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // quota / private mode: silently ignore in mock layer
  }
}

export function patchStorage<T extends object>(key: StorageKey, patch: Partial<T>, fallback: T): T {
  const current = readStorage<T>(key, fallback);
  const next = { ...current, ...patch };
  writeStorage(key, next);
  return next;
}
