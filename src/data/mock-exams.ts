export interface MockExamQuestion {
  q: string;
  options: string[];
  answer: number;
  topic: string;
  section: string;
}

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
  items: MockExamQuestion[];
}

const macroItems: MockExamQuestion[] = [
  { section: "Short answers", topic: "IS-LM", q: "Which policy shifts the IS curve to the right?", options: ["Tax increase", "Government spending increase", "Reserve ratio hike", "Open-market sale"], answer: 1 },
  { section: "Short answers", topic: "Liquidity preference", q: "In a liquidity trap, the LM curve becomes…", options: ["Vertical", "Horizontal", "Steeply upward-sloping", "Backward-bending"], answer: 1 },
  { section: "Short answers", topic: "Monetary policy", q: "Open-market purchases by the central bank…", options: ["Reduce reserves", "Increase the money supply", "Raise the discount rate", "Sterilize FX"], answer: 1 },
  { section: "IS-LM exercise", topic: "IS-LM", q: "ΔG = +50, MS constant. Equilibrium effect?", options: ["Y↑, i↓", "Y↑, i↑", "Y↓, i↑", "Y unchanged"], answer: 1 },
  { section: "IS-LM exercise", topic: "Fiscal multipliers", q: "Crowding-out is strongest when…", options: ["LM is flat", "LM is vertical", "IS is vertical", "Prices are perfectly flexible"], answer: 1 },
  { section: "Policy essay", topic: "Open economy", q: "Under flexible FX, fiscal expansion primarily…", options: ["Raises Y", "Appreciates currency", "Lowers i", "Cuts trade deficit"], answer: 1 },
];

const acctItems: MockExamQuestion[] = [
  { section: "Statements", topic: "Balance sheet", q: "Which is a current asset?", options: ["Goodwill", "Inventory", "Buildings", "Long-term debt"], answer: 1 },
  { section: "Ratios", topic: "Ratios", q: "Current assets 420, current liabilities 280. Current ratio?", options: ["0.67", "1.5", "1.67", "2.0"], answer: 1 },
  { section: "Ratios", topic: "Ratios", q: "Debt-to-equity measures…", options: ["Liquidity", "Leverage", "Profitability", "Activity"], answer: 1 },
  { section: "Case", topic: "Cash flow", q: "Operating cash flow excludes…", options: ["Depreciation add-back", "Working capital change", "Net income", "Dividends paid"], answer: 3 },
];

const lawItems: MockExamQuestion[] = [
  { section: "Long-form analysis", topic: "Article 101", q: "Article 101 TFEU prohibits…", options: ["State aid", "Anti-competitive agreements", "Abuse of dominance", "Mergers above threshold"], answer: 1 },
  { section: "Long-form analysis", topic: "Article 101", q: "T-Mobile (2009) is authority for…", options: ["Single concerted practice from one meeting", "State aid notification", "EU merger remedies", "DMA gatekeeping"], answer: 0 },
  { section: "Long-form analysis", topic: "State aid", q: "Article 107(1) covers selectivity through…", options: ["Geographic scope only", "De minimis aid", "Economic advantage to undertakings", "Open tenders"], answer: 2 },
  { section: "Long-form analysis", topic: "Free movement", q: "Cassis de Dijon established…", options: ["Mutual recognition", "Direct effect of directives", "State liability", "EU citizenship rights"], answer: 0 },
];

export const mockExams: MockExam[] = [
  {
    id: "macro-full-2024",
    code: "EC22",
    course: "Macroeconomics",
    title: "2024 final — full reconstruction",
    durationMinutes: 120,
    questions: macroItems.length,
    sections: [
      { name: "Short answers", weight: 30 },
      { name: "IS-LM exercise", weight: 35 },
      { name: "Policy essay", weight: 35 },
    ],
    lastScore: null,
    attempts: 0,
    format: "Closed-book",
    items: macroItems,
  },
  {
    id: "macro-mid-2025",
    code: "EC22",
    course: "Macroeconomics",
    title: "Spring 2025 mid-term",
    durationMinutes: 60,
    questions: macroItems.slice(0, 4).length,
    sections: [
      { name: "Concept MCQ", weight: 50 },
      { name: "Numerical", weight: 50 },
    ],
    lastScore: 78,
    attempts: 2,
    format: "Closed-book",
    items: macroItems.slice(0, 4).map((it) => ({ ...it, section: it.section.includes("exercise") ? "Numerical" : "Concept MCQ" })),
  },
  {
    id: "acct-mid-2025",
    code: "AC22",
    course: "Financial Accounting",
    title: "Mid-term simulation",
    durationMinutes: 90,
    questions: acctItems.length,
    sections: [
      { name: "Statements", weight: 40 },
      { name: "Ratios", weight: 30 },
      { name: "Case", weight: 30 },
    ],
    lastScore: 84,
    attempts: 1,
    format: "Open-book",
    items: acctItems,
  },
  {
    id: "law-take-home",
    code: "LW22",
    course: "Business Law EU",
    title: "Article 101 — take-home case",
    durationMinutes: 240,
    questions: lawItems.length,
    sections: [{ name: "Long-form analysis", weight: 100 }],
    lastScore: null,
    attempts: 0,
    format: "Take-home",
    items: lawItems,
  },
];
