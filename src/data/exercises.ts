export interface ExerciseStep {
  prompt: string;
  reveal: string;
}

export interface Exercise {
  id: string;
  code: string;
  chapter: string;
  title: string;
  difficulty: "Intro" | "Core" | "Advanced";
  estMinutes: number;
  mastery: number; // 0-100
  prompt: string;
  steps: ExerciseStep[];
}

export const exercises: Exercise[] = [
  {
    id: "islm-shift",
    code: "EC22",
    chapter: "Ch. 4 · IS-LM",
    title: "Fiscal expansion under fixed prices",
    difficulty: "Core",
    estMinutes: 12,
    mastery: 62,
    prompt:
      "Government spending rises by 50bn while the central bank holds the money supply constant. Derive the impact on output and the interest rate using the IS-LM framework.",
    steps: [
      { prompt: "Which curve shifts and in which direction?", reveal: "The IS curve shifts right by the multiplier × ΔG." },
      { prompt: "How does the LM curve respond?", reveal: "The LM curve does not shift — money supply is held constant." },
      { prompt: "What is the equilibrium effect?", reveal: "Output rises, interest rate rises, partial crowding-out of investment." },
    ],
  },
  {
    id: "balance-ratios",
    code: "AC22",
    chapter: "Ch. 5 · Ratios",
    title: "Compute Alpha Corp's current ratio",
    difficulty: "Intro",
    estMinutes: 8,
    mastery: 84,
    prompt:
      "Alpha Corp reports current assets of €420m and current liabilities of €280m. Compute the current ratio and interpret short-term liquidity.",
    steps: [
      { prompt: "Formula?", reveal: "Current ratio = Current assets / Current liabilities." },
      { prompt: "Calculation?", reveal: "420 / 280 = 1.5." },
      { prompt: "Interpretation?", reveal: "Comfortable short-term liquidity; €1.50 of assets per €1 of obligations." },
    ],
  },
  {
    id: "art101-case",
    code: "LW22",
    chapter: "Ch. 3 · Competition",
    title: "Article 101(1) — concerted practice",
    difficulty: "Advanced",
    estMinutes: 18,
    mastery: 41,
    prompt:
      "Three EU carriers exchange pricing intentions through a common booking platform. Assess whether this falls within Article 101(1) TFEU.",
    steps: [
      { prompt: "What are the constitutive elements of 101(1)?", reveal: "Agreement / decision / concerted practice between undertakings affecting trade and restricting competition." },
      { prompt: "Does information exchange qualify?", reveal: "Yes — coordination via a third party meets the concerted-practice test (T-Mobile, 2009)." },
      { prompt: "Possible defenses?", reveal: "101(3) block exemption is unlikely; consumer-benefit threshold not met." },
    ],
  },
  {
    id: "segmentation-brief",
    code: "MK21",
    chapter: "Ch. 2 · Segmentation",
    title: "Build a STP brief for a D2C launch",
    difficulty: "Core",
    estMinutes: 15,
    mastery: 55,
    prompt: "Outline a Segmentation–Targeting–Positioning brief for a new sustainable sportswear D2C brand entering France.",
    steps: [
      { prompt: "Pick two segmentation axes.", reveal: "Behavioral (training frequency) × Psychographic (sustainability salience)." },
      { prompt: "Targeting strategy?", reveal: "Concentrated: high-frequency, sustainability-driven 25–35 urban professionals." },
      { prompt: "Positioning statement?", reveal: "Performance you can wear with a clear conscience — the sportswear that ages with you." },
    ],
  },
];
