import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock, Flame, TrendingUp, CheckCircle2, Circle } from "lucide-react";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [{ title: "Dashboard — Uniflow" }],
  }),
  component: DashboardHome,
});

function DashboardHome() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome */}
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Good morning, Yanis</h1>
          <p className="text-sm text-muted-foreground mt-1">B2 · ESCP BIM · Fall 2025/2026</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Macroeconomics exam</p>
          <p className="text-2xl font-extrabold mt-1">5 <span className="text-sm text-muted-foreground font-medium">days away</span></p>
        </div>
      </header>

      {/* Top row: AI tutor (8) + Progress ring (4) */}
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-8 p-8 bg-primary text-primary-foreground rounded-3xl shadow-[var(--shadow-primary)] relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 size-64 bg-primary-foreground/10 rounded-full" />
          <div className="absolute -right-20 -top-20 size-72 bg-primary-foreground/5 rounded-full" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-primary-foreground/15 text-primary-foreground text-[10px] font-mono uppercase tracking-widest rounded-full mb-5">
              <span className="size-1.5 bg-primary-foreground rounded-full" />
              AI Tutor
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight mb-3 max-w-md">
              Ask anything about your courses.
            </h2>
            <p className="text-primary-foreground/75 max-w-md text-sm leading-relaxed mb-6">
              Explanations, quizzes, scheduled review sessions — for every course in your B2.
            </p>
            <Link to="/app/tutor" className="inline-flex items-center gap-2 px-4 py-2.5 bg-card text-primary font-semibold text-sm rounded-lg hover:bg-card/90">
              Open Tutor <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 p-7 bg-card border border-border rounded-3xl flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Course progress</p>
            <span className="text-[10px] font-mono text-primary bg-primary-soft px-2 py-0.5 rounded">+4% wk</span>
          </div>
          <div className="flex items-center gap-5 flex-1">
            <ProgressRing pct={68} />
            <div>
              <p className="text-3xl font-extrabold">7<span className="text-muted-foreground text-base font-medium">/10</span></p>
              <p className="text-xs text-muted-foreground mt-1">courses active</p>
              <p className="text-xs font-medium text-primary mt-3">Chapter 4 · IS-LM Model</p>
            </div>
          </div>
        </div>
      </div>

      {/* Second row: This week (8) + Quick stats (4) */}
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-8 p-7 bg-card border border-border rounded-3xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold">This week</h3>
              <p className="text-xs text-muted-foreground mt-0.5">4 open tasks</p>
            </div>
            <Link to="/app/planner" className="text-xs font-mono text-primary uppercase tracking-widest">Open planner →</Link>
          </div>
          <ul className="space-y-1">
            {[
              { done: false, label: "Finish exercises set 3", tag: "AC22", due: "Today" },
              { done: false, label: "Review past exam paper", tag: "LW22", due: "Tue" },
              { done: false, label: "Prepare IS-LM diagram notes", tag: "EC22", due: "Wed" },
              { done: true, label: "Submit marketing brief draft", tag: "MK21", due: "Done" },
            ].map((t) => (
              <li key={t.label} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary/40 transition-colors">
                {t.done ? <CheckCircle2 className="size-4 text-primary" /> : <Circle className="size-4 text-muted-foreground" />}
                <span className={`text-sm flex-1 ${t.done ? "line-through text-muted-foreground" : "font-medium"}`}>{t.label}</span>
                <span className="text-[10px] font-mono text-primary bg-primary-soft px-2 py-0.5 rounded">{t.tag}</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground w-12 text-right">{t.due}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-5">
          <StatCard icon={Clock} label="Study time · week" value="14h 12m" sub="+2h vs last week" />
          <StatCard icon={Flame} label="Focus streak" value="9 days" sub="Personal best" />
          <StatCard icon={TrendingUp} label="Avg. quiz score" value="87%" sub="Macro · 92%" />
        </div>
      </div>

      {/* Courses grid */}
      <section>
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="text-xl font-bold">Your courses</h2>
          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">5 active</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { code: "EC22", name: "Macroeconomics", status: "Active", active: true },
            { code: "AC22", name: "Financial Accounting", status: "Active" },
            { code: "MA22", name: "Mathematics 2", status: "Coming soon", coming: true },
            { code: "LW22", name: "Business Law EU", status: "Active" },
            { code: "MK21", name: "Marketing", status: "Coming soon", coming: true },
          ].map((c) => (
            <div
              key={c.code}
              className={`p-5 rounded-2xl border bg-card transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)] ${
                c.active ? "border-primary/40 ring-1 ring-primary/20" : "border-border"
              }`}
            >
              <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{c.code}</p>
              <p className="font-bold mt-2 text-sm leading-tight">{c.name}</p>
              <div className="mt-4">
                <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded ${
                  c.coming
                    ? "bg-secondary text-muted-foreground"
                    : c.active
                      ? "bg-primary-soft text-primary"
                      : "bg-secondary text-foreground"
                }`}>
                  <span className={`size-1.5 rounded-full ${c.coming ? "bg-muted-foreground" : "bg-primary"}`} />
                  {c.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub }: { icon: any; label: string; value: string; sub: string }) {
  return (
    <div className="p-5 bg-card border border-border rounded-2xl">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{label}</p>
        <Icon className="size-3.5 text-muted-foreground" />
      </div>
      <p className="text-2xl font-extrabold">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{sub}</p>
    </div>
  );
}

function ProgressRing({ pct }: { pct: number }) {
  const r = 36;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <div className="relative size-24 shrink-0">
      <svg viewBox="0 0 100 100" className="size-full -rotate-90">
        <circle cx="50" cy="50" r={r} stroke="currentColor" strokeWidth="8" fill="none" className="text-secondary" />
        <circle
          cx="50" cy="50" r={r}
          stroke="currentColor" strokeWidth="8" fill="none"
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
          className="text-primary transition-all"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="text-lg font-extrabold">{pct}%</span>
      </div>
    </div>
  );
}
