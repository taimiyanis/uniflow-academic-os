export interface AtRiskStudent {
  id: string;
  name: string;
  program: string;
  signal: "engagement" | "recall" | "deadlines";
  detail: string;
  action: string;
  severity: "low" | "med" | "high";
}

export const atRiskStudents: AtRiskStudent[] = [
  { id: "1", name: "M. Chen", program: "MIM B2", signal: "engagement", detail: "−68% study hours over 14 days", action: "Schedule check-in", severity: "high" },
  { id: "2", name: "L. Dupont", program: "BBA B3", signal: "recall", detail: "Recall accuracy dropped from 84% → 51%", action: "Offer tutor session", severity: "high" },
  { id: "3", name: "S. Ali", program: "MSc Fin", signal: "deadlines", detail: "Missed 3 deadlines in 2 weeks", action: "Send academic advisor note", severity: "med" },
  { id: "4", name: "T. Bauer", program: "MIM B1", signal: "engagement", detail: "−42% study hours", action: "Auto-nudge", severity: "med" },
  { id: "5", name: "K. Tanaka", program: "MSc Mkt", signal: "recall", detail: "Macro recall declining for 3 weeks", action: "Recommend deck refresh", severity: "low" },
  { id: "6", name: "P. Romano", program: "BBA B2", signal: "deadlines", detail: "2 missed deadlines", action: "Auto-nudge", severity: "low" },
  { id: "7", name: "A. Novak", program: "MIM B2", signal: "engagement", detail: "Zero logins in 9 days", action: "Schedule check-in", severity: "high" },
];

export interface Faculty {
  id: string;
  name: string;
  students: number;
  adoption: number;
  engagement: number;
  atRisk: number;
}

export const faculties: Faculty[] = [
  { id: "bba", name: "BBA Program", students: 1240, adoption: 96, engagement: 78, atRisk: 24 },
  { id: "mim", name: "Master in Management", students: 820, adoption: 91, engagement: 74, atRisk: 19 },
  { id: "msc-fin", name: "MSc Finance", students: 410, adoption: 88, engagement: 71, atRisk: 11 },
  { id: "msc-mkt", name: "MSc Marketing", students: 360, adoption: 84, engagement: 69, atRisk: 9 },
  { id: "emba", name: "Executive MBA", students: 354, adoption: 72, engagement: 61, atRisk: 14 },
];

// --- Cohort metrics (Phase 1: cohort comparison) ---

export interface CohortMetrics {
  facultyId: string;
  readiness: number;        // 0-100 average exam readiness
  engagementTrend: number[]; // 9-month sparkline
  readinessTrend: number[];
  contentCoverage: number;  // % lessons opened
  practiceFrequency: number; // avg sessions / student / week
  tutorUsage: number;        // % students who used tutor 30d
  yoyAdoption: number;       // % delta vs last year
  yoyEngagement: number;
}

export const cohortMetrics: Record<string, CohortMetrics> = {
  bba: {
    facultyId: "bba",
    readiness: 74,
    engagementTrend: [62, 65, 68, 72, 71, 74, 76, 77, 78],
    readinessTrend: [40, 48, 55, 60, 64, 68, 71, 73, 74],
    contentCoverage: 81,
    practiceFrequency: 3.4,
    tutorUsage: 64,
    yoyAdoption: 12,
    yoyEngagement: 8,
  },
  mim: {
    facultyId: "mim",
    readiness: 71,
    engagementTrend: [58, 62, 65, 68, 70, 72, 73, 74, 74],
    readinessTrend: [42, 50, 56, 61, 65, 68, 70, 71, 71],
    contentCoverage: 76,
    practiceFrequency: 3.1,
    tutorUsage: 58,
    yoyAdoption: 9,
    yoyEngagement: 6,
  },
  "msc-fin": {
    facultyId: "msc-fin",
    readiness: 79,
    engagementTrend: [60, 63, 66, 68, 70, 70, 71, 71, 71],
    readinessTrend: [52, 58, 64, 68, 72, 74, 76, 78, 79],
    contentCoverage: 88,
    practiceFrequency: 4.2,
    tutorUsage: 71,
    yoyAdoption: 15,
    yoyEngagement: 11,
  },
  "msc-mkt": {
    facultyId: "msc-mkt",
    readiness: 66,
    engagementTrend: [55, 58, 60, 62, 64, 66, 67, 68, 69],
    readinessTrend: [38, 44, 50, 54, 58, 61, 63, 65, 66],
    contentCoverage: 70,
    practiceFrequency: 2.7,
    tutorUsage: 49,
    yoyAdoption: 6,
    yoyEngagement: 4,
  },
  emba: {
    facultyId: "emba",
    readiness: 58,
    engagementTrend: [48, 50, 52, 55, 57, 58, 60, 61, 61],
    readinessTrend: [30, 36, 42, 47, 50, 53, 55, 57, 58],
    contentCoverage: 54,
    practiceFrequency: 1.8,
    tutorUsage: 32,
    yoyAdoption: -3,
    yoyEngagement: -1,
  },
};

// --- Content signals (Phase 1: content health) ---

export interface ContentSignal {
  lessonId: string;
  code: string;
  title: string;
  chapter: string;
  passRate: number;       // % quiz pass rate
  dropOff: number;        // % students who opened but didn't finish
  tutorHits: number;      // # of "ask tutor" prompts about this lesson
  views: number;
  trend: "up" | "down" | "flat";
}

export const contentSignals: ContentSignal[] = [
  { lessonId: "is-lm-ch4", code: "EC22", title: "IS-LM Model — Chapter 4", chapter: "Ch. 4", passRate: 48, dropOff: 31, tutorHits: 287, views: 1842, trend: "down" },
  { lessonId: "art101-101", code: "LW22", title: "Article 101 TFEU — concerted practice", chapter: "Ch. 3", passRate: 52, dropOff: 28, tutorHits: 214, views: 1320, trend: "down" },
  { lessonId: "ratios-ch5", code: "AC22", title: "Liquidity ratios", chapter: "Ch. 5", passRate: 71, dropOff: 18, tutorHits: 122, views: 1604, trend: "flat" },
  { lessonId: "stp-ch2", code: "MK21", title: "Segmentation–Targeting–Positioning", chapter: "Ch. 2", passRate: 64, dropOff: 22, tutorHits: 156, views: 1488, trend: "flat" },
  { lessonId: "agg-demand", code: "EC22", title: "Aggregate demand foundations", chapter: "Ch. 3", passRate: 81, dropOff: 12, tutorHits: 64, views: 1721, trend: "up" },
  { lessonId: "monetary-policy", code: "EC22", title: "Monetary policy transmission", chapter: "Ch. 5", passRate: 58, dropOff: 24, tutorHits: 189, views: 1390, trend: "down" },
  { lessonId: "balance-ch3", code: "AC22", title: "Balance sheet basics", chapter: "Ch. 3", passRate: 86, dropOff: 9, tutorHits: 41, views: 1655, trend: "up" },
];

// --- Intervention workflow types (Phase 1.3) ---

export type InterventionStatus = "new" | "contacted" | "resolved";

export interface InterventionRecord {
  studentId: string;
  status: InterventionStatus;
  advisor?: string;
  note?: string;
  updatedAt: number;
}

export const advisors = [
  "Dr. Marchand",
  "Dr. Schmidt",
  "Prof. Lefèvre",
  "Prof. Okafor",
  "Ms. Romano (Academic Affairs)",
];
