import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles, Play, ArrowRight, Library, Dumbbell, BookOpen } from "lucide-react";
import { fadeUp, stagger } from "@/lib/motion";
import { CountUp } from "@/components/charts/CountUp";
import { exams } from "@/data/exams";
import { decks } from "@/data/decks";
import { courses } from "@/data/courses";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Dashboard — Uniflow" }] }),
  component: DashboardHome,
});

function DashboardHome() {
  const nextExam = exams[0];
  const recallDue = decks.reduce((s, d) => s + d.due, 0);

  return (
    <motion.div initial="hidden" animate="show" variants={stagger(0.08)} className="max-w-5xl mx-auto space-y-10">
      {/* Status strip */}
      <motion.header variants={fadeUp} className="flex items-end justify-between">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Monday · 18 May 2026</p>
          <h1 className="text-3xl font-extrabold tracking-tight mt-2">Good morning, Yanis.</h1>
        </div>
        <Link
          to="/app/exam/$examId"
          params={{ examId: nextExam.id }}
          className="hidden md:inline-flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-primary hover:border-primary/40"
        >
          <span className="size-1.5 rounded-full bg-primary" />
          {nextExam.course} in {nextExam.daysAway} days
          <ArrowRight className="size-3" />
        </Link>
      </motion.header>

      {/* Zone 1: Your next 90 minutes */}
      <motion.section variants={fadeUp}>
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">Your next 90 minutes</p>
        <div className="p-10 bg-foreground text-background rounded-3xl shadow-[var(--shadow-elegant)] relative overflow-hidden">
          <div className="absolute -right-24 -bottom-24 size-96 bg-primary/30 rounded-full blur-3xl" />
          <div className="relative grid grid-cols-12 gap-8 items-center">
            <div className="col-span-12 lg:col-span-8">
              <h2 className="text-3xl md:text-[2.5rem] font-extrabold tracking-tight leading-[1.05] mb-5 max-w-xl">
                Review {recallDue} flashcards · IS-LM chapter 4
              </h2>
              <p className="text-background/65 max-w-lg text-sm leading-relaxed mb-7">
                Macroeconomics is in {nextExam.daysAway} days and liquidity preference is your weakest topic. This single session moves the needle most.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/app/review"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-lg shadow-[var(--shadow-primary)]"
                >
                  <Play className="size-4 fill-current" /> Start review · {recallDue} due
                </Link>
                <Link
                  to="/app/tutor"
                  className="inline-flex items-center gap-2 px-4 py-3 text-background/80 font-semibold text-sm rounded-lg hover:bg-background/10"
                >
                  <Sparkles className="size-4" /> Ask the tutor instead
                </Link>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-4 hidden lg:block">
              <ReadinessRing pct={nextExam.readiness} label={`${nextExam.code} readiness`} />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Zone 2 + 3 */}
      <div className="grid grid-cols-12 gap-6">
        {/* Today's plan */}
        <motion.section variants={fadeUp} className="col-span-12 lg:col-span-7 p-7 bg-card border border-border rounded-3xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Today's plan</h3>
            <Link to="/app/planner" className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-primary">Planner →</Link>
          </div>
          <ul className="space-y-5">
            {[
              { time: "09:00", label: "Macro lecture · IS-LM applications", code: "EC22", kind: "lesson", to: "/app/library" },
              { time: "11:30", label: "Practice exercise · fiscal expansion", code: "EC22", kind: "practice", to: "/app/practice" },
              { time: "16:00", label: "Flashcards · 15 due", code: "EC22", kind: "review", to: "/app/practice" },
            ].map((t) => (
              <li key={t.time} className="flex items-start gap-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground w-14 pt-0.5">{t.time}</span>
                <span className={`mt-2 size-1.5 rounded-full shrink-0 ${
                  t.kind === "lesson" ? "bg-foreground" : t.kind === "practice" ? "bg-primary" : "bg-primary/40"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">{t.label}</p>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5">{t.code} · {t.kind}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Readiness */}
        <motion.section variants={fadeUp} className="col-span-12 lg:col-span-5 p-7 bg-card border border-border rounded-3xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Course readiness</h3>
            <Link to="/app/analytics" className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-primary">Progress →</Link>
          </div>
          <ul className="space-y-4">
            {courses.map((c) => (
              <li key={c.code}>
                <Link to="/app/courses/$code" params={{ code: c.code }} className="block group">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-mono text-[10px] text-primary bg-primary-soft px-1.5 py-0.5 rounded shrink-0">{c.code}</span>
                      <span className="text-sm font-semibold truncate group-hover:text-primary">{c.name}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-foreground">{c.progress}%</span>
                  </div>
                  <div className="h-1 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all" style={{ width: `${c.progress}%` }} />
                  </div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-1.5 truncate">
                    Next · {c.next}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </motion.section>
      </div>

      {/* Quick jump rail */}
      <motion.section variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <QuickCard to="/app/library" icon={Library} title="Library" body={`${courses.length} courses · faculty-curated lessons`} />
        <QuickCard to="/app/practice" icon={Dumbbell} title="Practice" body={`${recallDue} cards due · exercises & mock exams`} highlight />
        <QuickCard to="/app/tutor" icon={Sparkles} title="AI Tutor" body="Ask anything · grounded in your library" />
      </motion.section>
    </motion.div>
  );
}

function QuickCard({
  to, icon: Icon, title, body, highlight,
}: { to: string; icon: typeof BookOpen; title: string; body: string; highlight?: boolean }) {
  return (
    <Link
      to={to}
      className={`p-5 border rounded-2xl flex items-center gap-4 transition-all hover:-translate-y-0.5 ${
        highlight ? "bg-primary-soft border-primary/30" : "bg-card border-border hover:border-primary/30"
      }`}
    >
      <span className={`size-10 rounded-xl grid place-items-center ${highlight ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-bold">{title}</p>
        <p className="text-[11px] text-muted-foreground truncate">{body}</p>
      </div>
      <ArrowRight className="size-4 text-muted-foreground ml-auto" />
    </Link>
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
