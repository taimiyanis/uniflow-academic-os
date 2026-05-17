import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/analytics")({
  head: () => ({ meta: [{ title: "Performance — Uniflow" }] }),
  component: AnalyticsPage,
});

const weeks = [40, 55, 48, 62, 70, 65, 78, 82, 75, 88, 92, 87];
const courses = [
  { code: "EC22", name: "Macroeconomics", score: 92, trend: "+4" },
  { code: "AC22", name: "Financial Accounting", score: 84, trend: "+2" },
  { code: "LW22", name: "Business Law EU", score: 76, trend: "−1" },
  { code: "MK21", name: "Marketing", score: 81, trend: "+3" },
];

function AnalyticsPage() {
  const max = Math.max(...weeks);
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight">Performance</h1>
        <p className="text-sm text-muted-foreground mt-1">A calm view of where you stand and where to invest next.</p>
      </header>

      <div className="grid grid-cols-12 gap-5">
        {[
          { label: "Avg. quiz score", value: "87%", sub: "+5pts vs last month" },
          { label: "Study time", value: "62h", sub: "this month" },
          { label: "Recall accuracy", value: "91%", sub: "spaced repetition" },
          { label: "Focus streak", value: "9d", sub: "personal best" },
        ].map((s) => (
          <div key={s.label} className="col-span-6 lg:col-span-3 p-6 bg-card border border-border rounded-2xl">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{s.label}</p>
            <p className="text-3xl font-extrabold mt-3">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-8 p-7 bg-card border border-border rounded-3xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-base font-bold">Weekly quiz score</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Last 12 weeks</p>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-primary bg-primary-soft px-2 py-1 rounded">↑ trending</span>
          </div>
          <div className="flex items-end justify-between h-56 gap-2">
            {weeks.map((w, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-secondary rounded-t-md relative" style={{ height: `${(w / max) * 100}%` }}>
                  <div className={`absolute inset-0 rounded-t-md ${i === weeks.length - 2 ? "bg-primary" : "bg-foreground/15"}`} />
                </div>
                <span className="text-[10px] font-mono text-muted-foreground">w{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 p-7 bg-card border border-border rounded-3xl">
          <h2 className="text-base font-bold mb-6">By course</h2>
          <ul className="space-y-5">
            {courses.map((c) => (
              <li key={c.code}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-primary bg-primary-soft px-1.5 py-0.5 rounded">{c.code}</span>
                    <span className="text-sm font-semibold">{c.name}</span>
                  </div>
                  <span className="text-sm font-mono">{c.score}<span className={`ml-2 text-[10px] ${c.trend.startsWith("+") ? "text-primary" : "text-muted-foreground"}`}>{c.trend}</span></span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${c.score}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
