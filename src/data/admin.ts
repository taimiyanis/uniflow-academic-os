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
