import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Download, TrendingUp, TrendingDown } from "lucide-react";
import { faculties, cohortMetrics } from "@/data/admin";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/adoption")({
  head: () => ({ meta: [{ title: "Adoption — Uniflow Institutional" }] }),
  component: AdoptionPage,
});

function YoYChip({ delta }: { delta: number }) {
  const positive = delta >= 0;
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest ${
      positive ? "bg-primary-soft text-primary" : "bg-destructive/10 text-destructive"
    }`}>
      {positive ? <TrendingUp className="size-2.5" /> : <TrendingDown className="size-2.5" />}
      {positive ? "+" : ""}{delta}% YoY
    </span>
  );
}

const months = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];
const series = {
  BBA: [320, 510, 720, 880, 940, 1010, 1080, 1140, 1184],
  MIM: [180, 320, 480, 600, 690, 740, 770, 800, 820],
  MSc: [80, 140, 220, 310, 380, 470, 540, 620, 770],
};

function AdoptionPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Adoption</h1>
          <p className="text-sm text-muted-foreground mt-1">Active student counts across the 2025/2026 academic year.</p>
        </div>
        <button onClick={() => toast.success("Adoption report exported")} className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold border border-border rounded-lg hover:bg-secondary/60">
          <Download className="size-3.5" /> Export
        </button>
      </header>

      <div className="p-7 bg-card border border-border rounded-3xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-base font-bold">Active students by program</h2>
          <div className="flex gap-4 text-[10px] font-mono uppercase tracking-widest">
            <Legend color="oklch(0.55 0.22 264)" label="BBA" />
            <Legend color="oklch(0.55 0.22 264 / 0.55)" label="MIM" />
            <Legend color="oklch(0.55 0.22 264 / 0.25)" label="MSc" />
          </div>
        </div>

        <div className="flex items-end h-72 gap-3">
          {months.map((m, i) => (
            <div key={m} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex flex-col-reverse h-full justify-end">
                <div className="w-full bg-primary rounded-t" style={{ height: `${(series.BBA[i] / 1200) * 60}%` }} />
                <div className="w-full bg-primary/55" style={{ height: `${(series.MIM[i] / 1200) * 60}%` }} />
                <div className="w-full bg-primary/25 rounded-t" style={{ height: `${(series.MSc[i] / 1200) * 60}%` }} />
              </div>
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{m}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {[
          { label: "Programs onboarded", value: "8/8" },
          { label: "Faculty enabled", value: "147" },
          { label: "SSO sign-in rate", value: "98.4%" },
        ].map((s) => (
          <div key={s.label} className="p-6 bg-card border border-border rounded-2xl">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{s.label}</p>
            <p className="text-3xl font-extrabold mt-3">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="p-7 bg-card border border-border rounded-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-base font-bold">Faculty drill-down</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Click a row to inspect cohort engagement and interventions.</p>
          </div>
        </div>
        <ul className="space-y-2">
          {faculties.map((f) => (
            <li key={f.id}>
              <Link
                to="/admin/cohort/$facultyId"
                params={{ facultyId: f.id }}
                className="flex items-center gap-4 p-4 border border-border rounded-xl hover:bg-secondary/30 hover:border-primary/30 transition-colors group"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{f.name}</p>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{f.students.toLocaleString()} students · {f.atRisk} at-risk</p>
                </div>
                <div className="w-48">
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
                    <span>adoption</span><span className="text-foreground">{f.adoption}%</span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${f.adoption}%` }} />
                  </div>
                </div>
                <ChevronRight className="size-4 text-muted-foreground group-hover:text-primary" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-muted-foreground">
      <span className="size-2.5 rounded" style={{ backgroundColor: color }} />
      <span>{label}</span>
    </div>
  );
}
