export interface Exam {
  id: string;
  code: string;
  course: string;
  date: string;
  daysAway: number;
  readiness: number;
  weakTopics: { topic: string; score: number }[];
  plan: { day: string; tasks: { kind: "review" | "flashcards" | "mock" | "tutor"; label: string; minutes: number }[] }[];
}

export const exams: Exam[] = [
  {
    id: "ec22-final",
    code: "EC22",
    course: "Macroeconomics — Final",
    date: "23 May 2026",
    daysAway: 5,
    readiness: 72,
    weakTopics: [
      { topic: "IS-LM", score: 58 },
      { topic: "Liquidity preference", score: 64 },
      { topic: "Open economy", score: 71 },
      { topic: "AD-AS", score: 84 },
      { topic: "Monetary policy", score: 88 },
      { topic: "Fiscal multipliers", score: 76 },
    ],
    plan: [
      {
        day: "Today · Mon",
        tasks: [
          { kind: "review", label: "Re-read Ch. 4 notes — IS-LM", minutes: 35 },
          { kind: "flashcards", label: "Deck: IS-LM essentials (15 due)", minutes: 18 },
          { kind: "tutor", label: "Walk through liquidity preference", minutes: 20 },
        ],
      },
      {
        day: "Tue",
        tasks: [
          { kind: "review", label: "Ch. 5 — AD-AS framework", minutes: 40 },
          { kind: "flashcards", label: "Monetary policy mechanics", minutes: 20 },
        ],
      },
      {
        day: "Wed",
        tasks: [
          { kind: "mock", label: "Mock exam · 45 questions", minutes: 90 },
          { kind: "review", label: "Review wrong answers with tutor", minutes: 25 },
        ],
      },
      {
        day: "Thu",
        tasks: [
          { kind: "flashcards", label: "Full deck rapid review", minutes: 30 },
          { kind: "review", label: "Past exam papers (2024, 2025)", minutes: 60 },
        ],
      },
      {
        day: "Fri — Exam eve",
        tasks: [
          { kind: "review", label: "Light review — summary sheet", minutes: 25 },
          { kind: "tutor", label: "Last-minute Q&A session", minutes: 15 },
        ],
      },
    ],
  },
  {
    id: "ac22-mid",
    code: "AC22",
    course: "Financial Accounting — Mid",
    date: "30 May 2026",
    daysAway: 12,
    readiness: 64,
    weakTopics: [
      { topic: "Ratios", score: 52 },
      { topic: "Cash flow", score: 60 },
      { topic: "Equity", score: 78 },
      { topic: "Liabilities", score: 82 },
    ],
    plan: [],
  },
  {
    id: "lw22-mid",
    code: "LW22",
    course: "Business Law EU — Mid",
    date: "6 June 2026",
    daysAway: 19,
    readiness: 48,
    weakTopics: [
      { topic: "Article 101", score: 42 },
      { topic: "State aid", score: 50 },
      { topic: "Free movement", score: 68 },
      { topic: "EU institutions", score: 80 },
    ],
    plan: [],
  },
];
