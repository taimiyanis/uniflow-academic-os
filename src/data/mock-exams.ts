export interface MockExam {
  id: string;
  code: string;
  course: string;
  title: string;
  durationMinutes: number;
  questions: number;
  sections: { name: string; weight: number }[];
  lastScore: number | null;
  attempts: number;
  format: "Closed-book" | "Open-book" | "Take-home";
}

export const mockExams: MockExam[] = [
  {
    id: "macro-full-2024",
    code: "EC22",
    course: "Macroeconomics",
    title: "2024 final — full reconstruction",
    durationMinutes: 120,
    questions: 45,
    sections: [
      { name: "Short answers", weight: 30 },
      { name: "IS-LM exercise", weight: 35 },
      { name: "Policy essay", weight: 35 },
    ],
    lastScore: null,
    attempts: 0,
    format: "Closed-book",
  },
  {
    id: "macro-mid-2025",
    code: "EC22",
    course: "Macroeconomics",
    title: "Spring 2025 mid-term",
    durationMinutes: 60,
    questions: 25,
    sections: [
      { name: "Concept MCQ", weight: 50 },
      { name: "Numerical", weight: 50 },
    ],
    lastScore: 78,
    attempts: 2,
    format: "Closed-book",
  },
  {
    id: "acct-mid-2025",
    code: "AC22",
    course: "Financial Accounting",
    title: "Mid-term simulation",
    durationMinutes: 90,
    questions: 30,
    sections: [
      { name: "Statements", weight: 40 },
      { name: "Ratios", weight: 30 },
      { name: "Case", weight: 30 },
    ],
    lastScore: 84,
    attempts: 1,
    format: "Open-book",
  },
  {
    id: "law-take-home",
    code: "LW22",
    course: "Business Law EU",
    title: "Article 101 — take-home case",
    durationMinutes: 240,
    questions: 4,
    sections: [{ name: "Long-form analysis", weight: 100 }],
    lastScore: null,
    attempts: 0,
    format: "Take-home",
  },
];
