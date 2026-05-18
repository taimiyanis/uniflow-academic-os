export interface Note {
  id: string;
  code: string;
  title: string;
  updated: string;
  words: number;
  tag: string;
  pinned?: boolean;
  body: string;
  related: string[];
}

export const notes: Note[] = [
  {
    id: "is-lm-ch4",
    code: "EC22",
    title: "IS-LM Model — Chapter 4",
    updated: "2h ago",
    words: 1240,
    tag: "Lecture",
    pinned: true,
    body: `# IS-LM Model — Chapter 4

The IS-LM model captures short-run equilibrium between the goods market (IS) and the money market (LM).

## The IS curve
Combinations of interest rate and output where planned investment equals planned saving. Downward sloping: lower rates → higher investment → higher output.

## The LM curve
Combinations where money demand equals money supply at given price levels. Upward sloping: higher output → more transactions demand → higher rates.

## Equilibrium
The intersection determines short-run real GDP and the interest rate. Policy moves shift the curves:
- Expansionary fiscal: IS shifts right
- Expansionary monetary: LM shifts right

## Key intuition
Under the assumption of sticky prices, both markets clear simultaneously through quantity and rate adjustments — not price.`,
    related: ["agg-demand", "monetary-policy"],
  },
  {
    id: "agg-demand",
    code: "EC22",
    title: "Aggregate Demand & Supply",
    updated: "Yesterday",
    words: 980,
    tag: "Reading",
    body: `# Aggregate Demand & Supply

AD-AS is the medium-run extension of IS-LM, allowing prices to adjust.`,
    related: ["is-lm-ch4"],
  },
  {
    id: "balance-sheet",
    code: "AC22",
    title: "Balance Sheet — Case Alpha",
    updated: "2d ago",
    words: 2110,
    tag: "Case study",
    body: `# Balance Sheet — Case Alpha

Working through Alpha Corp's FY2024 statements.`,
    related: [],
  },
  {
    id: "eu-comp",
    code: "LW22",
    title: "EU Competition Law Notes",
    updated: "3d ago",
    words: 1860,
    tag: "Lecture",
    body: `# EU Competition Law

Article 101 prohibits anti-competitive agreements between undertakings.`,
    related: [],
  },
  {
    id: "consumer",
    code: "MK21",
    title: "Consumer Behavior Brief",
    updated: "4d ago",
    words: 720,
    tag: "Brief",
    body: `# Consumer Behavior

Five stages: need recognition, search, evaluation, decision, post-purchase.`,
    related: [],
  },
  {
    id: "monetary-policy",
    code: "EC22",
    title: "Monetary Policy Mechanics",
    updated: "1 wk ago",
    words: 1490,
    tag: "Reading",
    body: `# Monetary Policy Mechanics

Central banks use open market operations, reserve requirements, and the discount rate.`,
    related: ["is-lm-ch4"],
  },
];
