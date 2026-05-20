export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
}

export interface Quiz {
  id: string;
  code: string;
  chapter: string;
  title: string;
  questions: QuizQuestion[];
  estMinutes: number;
  bestScore: number | null;
}

export const quizzes: Quiz[] = [
  {
    id: "islm-mcq",
    code: "EC22",
    chapter: "Ch. 4 · IS-LM",
    title: "IS-LM — concepts check",
    estMinutes: 10,
    bestScore: 88,
    questions: [
      {
        q: "Which policy shifts the IS curve to the right?",
        options: ["Tax increase", "Government spending increase", "Reserve ratio cut", "Open-market sale"],
        answer: 1,
      },
      {
        q: "In a liquidity trap, the LM curve is…",
        options: ["Vertical", "Horizontal", "Upward-sloping", "Backward-bending"],
        answer: 1,
      },
    ],
  },
  {
    id: "balance-mcq",
    code: "AC22",
    chapter: "Ch. 3 · Balance sheet",
    title: "Balance sheet basics",
    estMinutes: 8,
    bestScore: null,
    questions: [
      {
        q: "Which item is a current asset?",
        options: ["Goodwill", "Inventory", "Buildings", "Long-term debt"],
        answer: 1,
      },
    ],
  },
  {
    id: "comp-mcq",
    code: "LW22",
    chapter: "Ch. 3 · Competition",
    title: "EU Competition Law — basics",
    estMinutes: 12,
    bestScore: 72,
    questions: [
      {
        q: "Article 102 prohibits…",
        options: ["State aid", "Cartels", "Abuse of dominance", "Mergers above the threshold"],
        answer: 2,
      },
    ],
  },
];
