import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/planner")({
  head: () => ({ meta: [{ title: "Planner — Uniflow" }] }),
  component: PlannerPage,
});

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const slots = [
  { day: 0, start: 9, span: 2, label: "Macro lecture", code: "EC22", kind: "lecture" },
  { day: 0, start: 14, span: 2, label: "Tutor session", code: "EC22", kind: "tutor" },
  { day: 1, start: 10, span: 1, label: "Law reading", code: "LW22", kind: "study" },
  { day: 1, start: 13, span: 3, label: "Accounting case", code: "AC22", kind: "study" },
  { day: 2, start: 9, span: 2, label: "Macro lecture", code: "EC22", kind: "lecture" },
  { day: 2, start: 15, span: 2, label: "Flashcards", code: "EC22", kind: "review" },
  { day: 3, start: 11, span: 2, label: "Marketing tutorial", code: "MK21", kind: "lecture" },
  { day: 4, start: 9, span: 4, label: "Mock exam", code: "EC22", kind: "exam" },
];

const kindStyles: Record<string, string> = {
  lecture: "bg-primary text-primary-foreground",
  tutor: "bg-foreground text-background",
  study: "bg-primary-soft text-primary border border-primary/10",
  review: "bg-secondary text-foreground border border-border",
  exam: "bg-destructive text-destructive-foreground",
};

function PlannerPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <header className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Planner</h1>
          <p className="text-sm text-muted-foreground mt-1">Week of 18 — 24 May 2026 · 4 deadlines</p>
        </div>
        <div className="flex gap-1 p-1 bg-card border border-border rounded-lg">
          {["Day", "Week", "Month"].map((t, i) => (
            <button key={t} className={`px-3 py-1.5 text-xs font-medium rounded-md ${i === 1 ? "bg-primary-soft text-primary" : "text-muted-foreground"}`}>{t}</button>
          ))}
        </div>
      </header>

      <div className="bg-card border border-border rounded-3xl overflow-hidden">
        <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-border">
          <div />
          {days.map((d, i) => (
            <div key={d} className="px-3 py-3 text-center border-l border-border">
              <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{d}</p>
              <p className={`text-sm font-bold mt-0.5 ${i === 0 ? "text-primary" : ""}`}>{18 + i}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[60px_repeat(7,1fr)]" style={{ minHeight: 600 }}>
          <div className="border-r border-border">
            {Array.from({ length: 11 }).map((_, i) => (
              <div key={i} className="h-14 px-2 text-[10px] font-mono text-muted-foreground uppercase tracking-widest text-right pt-1">
                {String(8 + i).padStart(2, "0")}:00
              </div>
            ))}
          </div>
          {days.map((_, dayIdx) => (
            <div key={dayIdx} className="border-l border-border relative" style={{ height: 11 * 56 }}>
              {Array.from({ length: 11 }).map((_, i) => (
                <div key={i} className="h-14 border-b border-border/60" />
              ))}
              {slots
                .filter((s) => s.day === dayIdx)
                .map((s) => (
                  <div
                    key={s.label}
                    className={`absolute left-1 right-1 p-2.5 rounded-lg text-[11px] font-semibold ${kindStyles[s.kind]}`}
                    style={{ top: (s.start - 8) * 56 + 4, height: s.span * 56 - 8 }}
                  >
                    <p className="font-mono text-[9px] uppercase tracking-widest opacity-75">{s.code}</p>
                    <p className="mt-0.5 leading-tight">{s.label}</p>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
