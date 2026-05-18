export interface Card {
  front: string;
  back: string;
}

export interface Deck {
  id: string;
  code: string;
  title: string;
  description: string;
  cards: Card[];
  mastered: number;
  due: number;
}

export const decks: Deck[] = [
  {
    id: "is-lm",
    code: "EC22",
    title: "IS-LM essentials",
    description: "Core concepts from Chapter 4 — IS-LM model.",
    mastered: 28,
    due: 8,
    cards: [
      { front: "What does the IS curve represent?", back: "Combinations of interest rate and output where planned investment equals planned saving. Downward sloping." },
      { front: "What does the LM curve represent?", back: "Combinations where money demand equals money supply. Upward sloping in (Y, i) space." },
      { front: "What shifts the IS curve right?", back: "Expansionary fiscal policy: higher government spending or tax cuts." },
      { front: "What shifts the LM curve right?", back: "Expansionary monetary policy: an increase in the money supply." },
      { front: "Define liquidity preference.", back: "Keynes's theory that money demand has three motives: transactions, precautionary, and speculative." },
      { front: "What assumption makes IS-LM short-run?", back: "Sticky prices. Markets clear via quantity and rate adjustments rather than price." },
      { front: "Effect of an oil shock on IS-LM?", back: "Shifts AS, which in the IS-LM framework typically reduces output and raises rates." },
      { front: "What is the liquidity trap?", back: "When rates are so low that monetary policy loses traction — LM curve becomes horizontal." },
    ],
  },
  {
    id: "monetary",
    code: "EC22",
    title: "Monetary policy mechanics",
    description: "Tools and transmission channels.",
    mastered: 18,
    due: 6,
    cards: [
      { front: "Three central bank tools?", back: "Open market operations, reserve requirements, discount rate." },
      { front: "What is QE?", back: "Large-scale asset purchases used when rates approach zero." },
      { front: "Define inflation targeting.", back: "Central bank framework committing to a public inflation target (typically ~2%)." },
    ],
  },
  {
    id: "balance",
    code: "AC22",
    title: "Balance sheet ratios",
    description: "Liquidity, solvency, and profitability.",
    mastered: 50,
    due: 2,
    cards: [
      { front: "Current ratio formula?", back: "Current assets / Current liabilities. >1 means short-term liquidity." },
      { front: "Debt-to-equity?", back: "Total liabilities / shareholders' equity. Measures financial leverage." },
    ],
  },
  {
    id: "eu-comp-deck",
    code: "LW22",
    title: "EU Competition Law",
    description: "Articles 101 & 102 essentials.",
    mastered: 12,
    due: 14,
    cards: [
      { front: "What does Article 101 prohibit?", back: "Anti-competitive agreements between undertakings affecting trade between Member States." },
      { front: "What does Article 102 prohibit?", back: "Abuse of a dominant position within the internal market." },
    ],
  },
];
