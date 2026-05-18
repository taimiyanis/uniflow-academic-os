export interface TutorMessage {
  role: "tutor" | "you";
  body: string;
  citations?: { note: string; id: string }[];
}

export interface TutorThread {
  id: string;
  title: string;
  course: string;
  time: string;
  messages: TutorMessage[];
}

export const tutorThreads: TutorThread[] = [
  {
    id: "is-lm-prep",
    title: "Preparing for IS-LM oral",
    course: "EC22",
    time: "14:02",
    messages: [
      {
        role: "tutor",
        body: "Good morning, Yanis. I reviewed your Chapter 4 notes overnight. Three concepts looked thin: liquidity preference, fiscal multipliers under fixed prices, and the LM curve slope. Want to start with a 10-minute primer or jump straight into practice?",
      },
      { role: "you", body: "Start with liquidity preference — explain it like I'm preparing for an oral exam." },
      {
        role: "tutor",
        body: "Got it. Liquidity preference is Keynes's theory that money demand arises from three motives: transactions (you need cash to buy things), precautionary (you hold cash for surprises), and speculative (you hold cash when you expect bond prices to fall).\n\nThe demand curve slopes down in (i, M) space: when the interest rate rises, the opportunity cost of holding cash rises, so people hold less.",
        citations: [{ note: "IS-LM Model — Chapter 4", id: "is-lm-ch4" }],
      },
    ],
  },
  {
    id: "balance-sheet",
    title: "Case Alpha — balance sheet walkthrough",
    course: "AC22",
    time: "Yesterday",
    messages: [
      { role: "you", body: "Can you walk me through Alpha Corp's working capital position?" },
      {
        role: "tutor",
        body: "Of course. Their current ratio came in at 1.62 — comfortably above 1, suggesting short-term obligations are covered. But quick ratio drops to 0.94, which hints inventory is doing a lot of the lifting.",
      },
    ],
  },
  {
    id: "eu-comp-q",
    title: "Article 101 — block exemptions",
    course: "LW22",
    time: "2 days ago",
    messages: [
      { role: "you", body: "How do block exemptions interact with Article 101(3)?" },
      {
        role: "tutor",
        body: "Block exemptions are Commission regulations that pre-clear categories of agreements meeting 101(3) criteria — efficiency gains, fair share for consumers, indispensable restrictions, no elimination of competition.",
      },
    ],
  },
];
