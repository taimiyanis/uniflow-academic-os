import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Overview — Uniflow Institutional" }] }),
  component: AdminOverview,
});

const kpis = [
  { label: "Active students", value: "3,184", delta: "+4.2%", up: true },
  { label: "Weekly study hours", value: "42,910", delta: "+12.8%", up: true },
  { label: "AI tutor sessions", value: "8,720", delta: "+18.5%", up: true },
  { label: "Avg. exam score", value: "82.4%", delta: "+3.1pts", up: true },
];

const weeks = [42, 48, 51, 55, 58, 62, 60, 67, 71, 75, 78, 82];
const cohorts = ["BBA1", "BBA2", "BBA3", "M1", "M2", "MSc Fin", "MSc Mkt", "MBA"];

const programs = [
  { name: "BBA Program", students: 1240, adoption: 96 },
  { name: "Master in Mgmt.", students: 820, adoption: 91 },
  { name: "MSc Finance", students: 410, adoption: 88 },
  { name: "MSc Marketing", students: 360, adoption: 84 },
  { name: "Executive MBA", students: 354, adoption: 72 },
];

const flags = [
  { type: "AI content", title: "Quiz draft flagged for review", course: "EC22", time: "2h ago", level: "low" },
  { type: "Source", title: "External PDF awaiting approval", course: "AC22", time: "5h ago", level: "med" },
  { type: "AI content", title: "Tutor answer reported by 3 students", course: "LW22", time: "1d ago", level: "high" },
];

function AdminOverview() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight">Institutional overview</h1>
        <p className="text-sm text-muted-foreground mt-1">ESCP BIM · Fall 2025/2026 · last updated 14:02 CET</p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((k) => (
          <div key={k.label} className="p-6 bg-card border border-border rounded-2xl">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{k.label}</p>
            <p className="text-3xl font-extrabold mt-3 tracking-tight">{k.value}</p>
            <div className="flex items-center gap-1 mt-2 text-xs font-mono">
              {k.up ? <ArrowUpRight className="size-3.5 text-primary" /> : <ArrowDownRight className="size-3.5 text-destructive" />}
              <span className={k.up ? "text-primary" : "text-destructive"}>{k.delta}</span>
              <span className="text-muted-foreground ml-1">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-5">
        {/* Engagement chart */}
        <div className="col-span-12 lg:col-span-8 p-7 bg-card border border-border rounded-3xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold">Student engagement</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Weekly active hours · last 12 weeks</p>
            </div>
            <div className="flex gap-1 p-1 bg-secondary rounded-lg">
              {["1M", "3M", "6M", "1Y"].map((t, i) => (
                <button key={t} className={`px-2.5 py-1 text-[11px] font-medium rounded ${i === 1 ? "bg-card shadow-sm" : "text-muted-foreground"}`}>{t}</button>
              ))}
            </div>
          </div>
          <EngagementChart data={weeks} />
        </div>

        {/* Adoption */}
        <div className="col-span-12 lg:col-span-4 p-7 bg-card border border-border rounded-3xl">
          <h2 className="text-base font-bold mb-6">Adoption by program</h2>
          <ul className="space-y-5">
            {programs.map((p) => (
              <li key={p.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold">{p.name}</span>
                  <span className="text-xs font-mono text-muted-foreground">{p.students.toLocaleString()} · {p.adoption}%</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${p.adoption}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5">
        {/* Cohort heatmap */}
        <div className="col-span-12 lg:col-span-7 p-7 bg-card border border-border rounded-3xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold">Cohort activity heatmap</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Active hours · 8 cohorts × 12 weeks</p>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              <span>low</span>
              <div className="flex gap-0.5">
                {[0.1, 0.3, 0.5, 0.7, 0.9].map((o) => (
                  <div key={o} className="size-3 rounded-sm" style={{ backgroundColor: `oklch(0.55 0.22 264 / ${o})` }} />
                ))}
              </div>
              <span>high</span>
            </div>
          </div>
          <div className="space-y-1.5">
            {cohorts.map((c, ri) => (
              <div key={c} className="flex items-center gap-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground w-14">{c}</span>
                <div className="flex-1 grid grid-cols-12 gap-1">
                  {Array.from({ length: 12 }).map((_, ci) => {
                    const intensity = 0.15 + (((ri * 7 + ci * 11) % 9) / 12) + (ci > 8 ? 0.2 : 0);
                    const clamped = Math.min(0.95, intensity);
                    return <div key={ci} className="h-6 rounded" style={{ backgroundColor: `oklch(0.55 0.22 264 / ${clamped})` }} />;
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content moderation */}
        <div className="col-span-12 lg:col-span-5 p-7 bg-card border border-border rounded-3xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-bold">Content moderation</h2>
            <span className="text-[10px] font-mono uppercase tracking-widest text-primary bg-primary-soft px-2 py-1 rounded">3 open</span>
          </div>
          <ul className="space-y-3">
            {flags.map((f) => (
              <li key={f.title} className="p-4 border border-border rounded-xl hover:bg-secondary/30 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{f.type} · {f.course}</span>
                  <LevelBadge level={f.level} />
                </div>
                <p className="text-sm font-semibold">{f.title}</p>
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-1">{f.time}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function LevelBadge({ level }: { level: string }) {
  const map: Record<string, string> = {
    low: "bg-secondary text-muted-foreground",
    med: "bg-primary-soft text-primary",
    high: "bg-destructive/15 text-destructive",
  };
  return <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded ${map[level]}`}>{level}</span>;
}

function EngagementChart({ data }: { data: number[] }) {
  const w = 800;
  const h = 220;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 20) - 10;
    return [x, y] as const;
  });
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ");
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-56" preserveAspectRatio="none">
        <defs>
          <linearGradient id="eng" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" className="text-primary" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" className="text-primary" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#eng)" />
        <path d={path} fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary" />
        {points.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" className="fill-card stroke-primary" strokeWidth="2" />
        ))}
      </svg>
      <div className="flex justify-between mt-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        {data.map((_, i) => <span key={i}>w{i + 1}</span>)}
      </div>
    </div>
  );
}
