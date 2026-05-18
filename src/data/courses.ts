export interface Course {
  code: string;
  name: string;
  professor: string;
  ects: number;
  progress: number;
  score: number | null;
  trend: number[];
  next: string;
  syllabus: { title: string; status: "done" | "current" | "next" | "later" }[];
}

export const courses: Course[] = [
  {
    code: "EC22",
    name: "Macroeconomics",
    professor: "Dr. A. Lefèvre",
    ects: 6,
    progress: 78,
    score: 92,
    trend: [60, 68, 72, 75, 80, 88, 92],
    next: "Chapter 4 — IS-LM Model",
    syllabus: [
      { title: "1. National accounts", status: "done" },
      { title: "2. Consumption & savings", status: "done" },
      { title: "3. Investment theory", status: "done" },
      { title: "4. IS-LM Model", status: "current" },
      { title: "5. AD-AS framework", status: "next" },
      { title: "6. Monetary policy", status: "later" },
      { title: "7. Open economy", status: "later" },
    ],
  },
  {
    code: "AC22",
    name: "Financial Accounting",
    professor: "Dr. M. Rossi",
    ects: 5,
    progress: 64,
    score: 84,
    trend: [55, 62, 70, 74, 78, 82, 84],
    next: "Balance sheet ratios",
    syllabus: [
      { title: "1. Accounting foundations", status: "done" },
      { title: "2. Income statement", status: "done" },
      { title: "3. Balance sheet", status: "current" },
      { title: "4. Cash flow statement", status: "next" },
      { title: "5. Ratios & analysis", status: "later" },
    ],
  },
  {
    code: "LW22",
    name: "Business Law EU",
    professor: "Dr. P. Müller",
    ects: 4,
    progress: 52,
    score: 76,
    trend: [70, 72, 70, 74, 75, 77, 76],
    next: "Competition Law — Article 101",
    syllabus: [
      { title: "1. EU institutions", status: "done" },
      { title: "2. Free movement", status: "done" },
      { title: "3. Competition law", status: "current" },
      { title: "4. State aid", status: "next" },
      { title: "5. Digital markets act", status: "later" },
    ],
  },
  {
    code: "MK21",
    name: "Marketing",
    professor: "Dr. C. Sato",
    ects: 5,
    progress: 41,
    score: 81,
    trend: [65, 70, 72, 75, 78, 80, 81],
    next: "Consumer behavior brief",
    syllabus: [
      { title: "1. Marketing fundamentals", status: "done" },
      { title: "2. Segmentation", status: "current" },
      { title: "3. Consumer behavior", status: "next" },
      { title: "4. Brand strategy", status: "later" },
    ],
  },
];
