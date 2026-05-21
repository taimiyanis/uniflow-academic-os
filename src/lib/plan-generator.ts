import { exams } from "@/data/exams";

export interface PlanBlock {
  day: string;       // ISO date
  start: string;     // "09:00"
  durationMinutes: number;
  examId: string;
  examCode: string;
  kind: "lesson" | "practice" | "review" | "mock";
  label: string;
  done?: boolean;
}

export interface StudyPlan {
  createdAt: number;
  hoursPerWeek: number;
  examIds: string[];
  blocks: PlanBlock[];
}

const DAY_ORDER = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const PREFERRED_SLOTS = ["09:00", "11:00", "14:00", "16:00", "18:00"];

// Deterministic mock: weight blocks toward exams with lowest readiness and closest date.
export function generatePlan(opts: { hoursPerWeek: number; examIds: string[] }): StudyPlan {
  const selected = exams.filter((e) => opts.examIds.includes(e.id));
  if (selected.length === 0) return { createdAt: Date.now(), hoursPerWeek: opts.hoursPerWeek, examIds: [], blocks: [] };

  // Weight: closer + less ready = more sessions
  const weights = selected.map((e) => {
    const urgency = Math.max(1, 30 - e.daysAway);
    const gap = Math.max(5, 100 - e.readiness);
    return { exam: e, weight: urgency * gap };
  });
  const totalWeight = weights.reduce((s, w) => s + w.weight, 0);

  const totalMinutes = opts.hoursPerWeek * 60;
  const blocks: PlanBlock[] = [];

  // 7 days; distribute blocks of 45-90 min
  const blockSize = 60;
  const totalBlocks = Math.max(7, Math.round(totalMinutes / blockSize));

  let slotIdx = 0;
  for (let i = 0; i < totalBlocks; i++) {
    const dayIdx = i % 7;
    const day = DAY_ORDER[dayIdx];
    const start = PREFERRED_SLOTS[slotIdx % PREFERRED_SLOTS.length];
    slotIdx++;

    // Pick exam by weighted round-robin
    let r = Math.random() * totalWeight;
    // deterministic seed via i — replace Math.random with linear walk
    r = ((i * 137) % Math.max(1, Math.floor(totalWeight)));
    let chosen = weights[0];
    let acc = 0;
    for (const w of weights) {
      acc += w.weight;
      if (r <= acc) { chosen = w; break; }
    }

    const kinds: PlanBlock["kind"][] = ["lesson", "practice", "review", "mock"];
    const kind = kinds[i % kinds.length];
    const labels: Record<PlanBlock["kind"], string> = {
      lesson: `Read chapter — ${chosen.exam.course}`,
      practice: `Exercises · weakest topic (${chosen.exam.weakTopics[0]?.topic ?? "core"})`,
      review: `Flashcards · ${chosen.exam.code}`,
      mock: `Mock exam section · ${chosen.exam.code}`,
    };

    blocks.push({
      day,
      start,
      durationMinutes: blockSize,
      examId: chosen.exam.id,
      examCode: chosen.exam.code,
      kind,
      label: labels[kind],
    });
  }

  return { createdAt: Date.now(), hoursPerWeek: opts.hoursPerWeek, examIds: opts.examIds, blocks };
}

export function planToICS(plan: StudyPlan): string {
  // Anchor to next Monday
  const now = new Date();
  const day = now.getDay();
  const mondayOffset = ((1 - day) + 7) % 7;
  const monday = new Date(now);
  monday.setDate(now.getDate() + mondayOffset);
  monday.setHours(0, 0, 0, 0);

  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

  const events = plan.blocks.map((b, idx) => {
    const dayIdx = DAY_ORDER.indexOf(b.day);
    const [h, m] = b.start.split(":").map(Number);
    const start = new Date(monday);
    start.setDate(monday.getDate() + dayIdx);
    start.setHours(h, m, 0, 0);
    const end = new Date(start.getTime() + b.durationMinutes * 60000);

    return [
      "BEGIN:VEVENT",
      `UID:uniflow-${b.examId}-${idx}@uniflow.app`,
      `DTSTAMP:${fmt(new Date())}`,
      `DTSTART:${fmt(start)}`,
      `DTEND:${fmt(end)}`,
      `SUMMARY:${b.label}`,
      `DESCRIPTION:Uniflow study plan — ${b.examCode} (${b.kind})`,
      "END:VEVENT",
    ].join("\r\n");
  }).join("\r\n");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Uniflow//Study Plan//EN",
    events,
    "END:VCALENDAR",
  ].join("\r\n");
}
