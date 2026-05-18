import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Flame, TrendingUp, Sparkles, Play, GraduationCap, Calendar, NotebookPen } from "lucide-react";
import { fadeUp, stagger } from "@/lib/motion";
import { CountUp } from "@/components/charts/CountUp";
import { Sparkline } from "@/components/charts/Sparkline";
import { exams } from "@/data/exams";
import { notes } from "@/data/notes";
import { decks } from "@/data/decks";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Dashboard — Uniflow" }] }),
  component: DashboardHome,
});

function DashboardHome() {
  const next = exams[0];
  const recallDue = decks.reduce((s, d) => s + d.due, 0);

  return (
    <motion.div initial="hidden" animate="show" variants={stagger(0.08)} className="max-w-7xl mx-auto space-y-8">
      <motion.header variants={fadeUp} className="flex items-end justify-between">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Monday · 18 May 2026</p>
          <h1 className="text-3xl font-extrabold tracking-tight mt-2">Good morning, Yanis</h1>
        </div>
        <Link to="/app/exam" className="text-xs font-mono uppercase tracking-widest text-primary hover:underline">All exams →</Link>
      </motion.header>

      {/* Hero: Next Action */}
      <motion.section variants={fadeUp}>
        <div className="p-8 bg-foreground text-background rounded-3xl shadow-[var(--shadow-elegant)] relative overflow-hidden">
          <div className="absolute -right-24 -bottom-24 size-96 bg-primary/30 rounded-full blur-3xl" />
          <div className="absolute -right-10 -top-20 size-72 bg-primary/15 rounded-full blur-2xl" />
          <div className="relative grid grid-cols-12 gap-8 items-center">
            <div className="col-span-12 lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-background/10 text-background/80 text-[10px] font-mono uppercase tracking-widest rounded-full mb-5">
                <span className="size-1.5 bg-primary rounded-full" />
                What to do next
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 max-w-2xl">
                Start a 35-min IS-LM review.
              </h2>
              <p className="text-background/65 max-w-xl text-sm leading-relaxed mb-6">
                Macroeconomics exam is in 5 days. Liquidity preference is your weakest topic — your tutor prepared a focused session and 15 due flashcards.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link to="/app/exam/$examId" params={{ examId: next.id }} className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-semibold text-sm rounded-lg shadow-[var(--shadow-primary)]">
                  <Play className="size-4 fill-current" /> Start today's session
                </Link>
                <Link to="/app/tutor" className="inline-flex items-center gap-2 px-4 py-2.5 bg-background/10 text-background font-semibold text-sm rounded-lg hover:bg-background/15">
                  <Sparkles className="size-4" /> Ask tutor instead
                </Link>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-4 hidden lg:block">
              <ReadinessRing pct={next.readiness} label="Macro readiness" />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Exam countdown strip */}
      <motion.section variants={fadeUp}>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Upcoming exams</h2>
          <Link to="/app/exam" className="text-xs font-mono text-primary uppercase tracking-widest">Open exam prep →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {exams.map((e) => (
            <Link
              key={e.id}
              to="/app/exam/$examId"
              params={{ examId: e.id }}
              className="p-5 bg-card border border-border rounded-2xl hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)] transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-primary bg-primary-soft px-2 py-0.5 rounded">{e.code}</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{e.date}</span>
              </div>
              <p className="font-bold text-sm leading-snug">{e.course}</p>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-2xl font-extrabold tracking-tight">{e.daysAway}<span className="text-xs text-muted-foreground font-medium ml-1">days</span></p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">readiness</span>
                  <span className={`text-sm font-mono font-bold ${e.readiness > 70 ? "text-primary" : e.readiness > 50 ? "text-foreground" : "text-destructive"}`}>{e.readiness}%</span>
                </div>
              </div>
              <div className="mt-2 h-1 bg-secondary rounded-full overflow-hidden">
                <div className={`h-full ${e.readiness > 70 ? "bg-primary" : e.readiness > 50 ? "bg-foreground/60" : "bg-destructive"}`} style={{ width: `${e.readiness}%` }} />
              </div>
            </Link>
          ))}
        </div>
      </motion.section>

      {/* Three modules */}
      <div className="grid grid-cols-12 gap-5">
        <motion.div variants={fadeUp} className="col-span-12 lg:col-span-4 p-6 bg-card border border-border rounded-3xl">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2"><Calendar className="size-4 text-primary" /><h3 className="text-sm font-bold">Today's plan</h3></div>
            <Link to="/app/planner" className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-primary">Planner →</Link>
          </div>
          <ul className="space-y-3">
            {[
              { time: "09:00", label: "Macro lecture", code: "EC22", kind: "lecture" },
              { time: "11:30", label: "IS-LM review", code: "EC22", kind: "study" },
              { time: "14:00", label: "Tutor session", code: "EC22", kind: "tutor" },
              { time: "16:00", label: "Flashcards · 15 due", code: "EC22", kind: "review" },
            ].map((t) => (
              <li key={t.time} className="flex items-center gap-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground w-12">{t.time}</span>
                <span className={`size-1.5 rounded-full ${t.kind === "lecture" ? "bg-primary" : t.kind === "tutor" ? "bg-foreground" : "bg-primary/40"}`} />
                <span className="text-sm font-medium flex-1">{t.label}</span>
                <span className="text-[10px] font-mono text-muted-foreground">{t.code}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={fadeUp} className="col-span-12 lg:col-span-4 p-6 bg-card border border-border rounded-3xl">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2"><Sparkles className="size-4 text-primary" /><h3 className="text-sm font-bold">Recall queue</h3></div>
            <Link to="/app/quizzes" className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-primary">All decks →</Link>
          </div>
          <p className="text-4xl font-extrabold tracking-tight"><CountUp value={recallDue} /></p>
          <p className="text-xs text-muted-foreground mt-1">cards due across {decks.length} decks</p>
          <div className="mt-5 space-y-2">
            {decks.slice(0, 3).map((d) => (
              <Link key={d.id} to="/app/quizzes/$deckId" params={{ deckId: d.id }} className="flex items-center justify-between text-xs py-1.5 hover:text-primary">
                <span className="truncate font-medium">{d.title}</span>
                <span className="font-mono text-muted-foreground">{d.due}</span>
              </Link>
            ))}
          </div>
          <Link to="/app/quizzes/$deckId" params={{ deckId: decks[0].id }} className="mt-5 w-full inline-flex items-center justify-center gap-2 py-2 text-xs font-bold bg-primary-soft text-primary rounded-lg hover:bg-primary-soft/80">
            <Play className="size-3.5" /> Start review
          </Link>
        </motion.div>

        <motion.div variants={fadeUp} className="col-span-12 lg:col-span-4 p-6 bg-card border border-border rounded-3xl">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2"><NotebookPen className="size-4 text-primary" /><h3 className="text-sm font-bold">Recent notes</h3></div>
            <Link to="/app/notes" className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-primary">All notes →</Link>
          </div>
          <ul className="space-y-3">
            {notes.slice(0, 4).map((n) => (
              <li key={n.id}>
                <Link to="/app/notes/$noteId" params={{ noteId: n.id }} className="flex items-center gap-3 hover:text-primary">
                  <span className="font-mono text-[10px] text-primary bg-primary-soft px-1.5 py-0.5 rounded">{n.code}</span>
                  <span className="text-sm font-medium truncate flex-1">{n.title}</span>
                  <span className="text-[10px] font-mono text-muted-foreground">{n.updated}</span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Stats row */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon={Clock} label="Study time · week" value={14.2} suffix="h" trend={[8, 9, 11, 10, 12, 13, 14]} />
        <StatCard icon={Flame} label="Focus streak" value={9} suffix=" days" trend={[3, 4, 5, 6, 7, 8, 9]} />
        <StatCard icon={TrendingUp} label="Avg. quiz score" value={87} suffix="%" trend={[70, 75, 78, 82, 84, 86, 87]} />
        <StatCard icon={GraduationCap} label="Recall accuracy" value={91} suffix="%" trend={[80, 83, 85, 87, 88, 90, 91]} />
      </motion.div>
    </motion.div>
  );
}

function StatCard({ icon: Icon, label, value, suffix, trend }: { icon: any; label: string; value: number; suffix?: string; trend: number[] }) {
  return (
    <div className="p-5 bg-card border border-border rounded-2xl">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{label}</p>
        <Icon className="size-3.5 text-muted-foreground" />
      </div>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-extrabold tracking-tight"><CountUp value={value} decimals={value % 1 !== 0 ? 1 : 0} suffix={suffix} /></p>
        <Sparkline data={trend} width={56} height={20} className="text-primary" />
      </div>
    </div>
  );
}

function ReadinessRing({ pct, label }: { pct: number; label: string }) {
  const r = 56;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <div className="relative size-44 mx-auto">
      <svg viewBox="0 0 140 140" className="size-full -rotate-90">
        <circle cx="70" cy="70" r={r} stroke="currentColor" strokeWidth="10" fill="none" className="text-background/10" />
        <circle cx="70" cy="70" r={r} stroke="currentColor" strokeWidth="10" fill="none" strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round" className="text-primary transition-all duration-1000" />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <p className="text-4xl font-extrabold tracking-tight"><CountUp value={pct} suffix="%" /></p>
          <p className="text-[10px] font-mono uppercase tracking-widest text-background/60 mt-1">{label}</p>
        </div>
      </div>
    </div>
  );
}

// Keep ArrowUpRight import used
void ArrowUpRight;
