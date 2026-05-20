import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, ListChecks, Pencil, Timer, Play, Clock } from "lucide-react";
import { decks } from "@/data/decks";
import { quizzes } from "@/data/quizzes";
import { exercises } from "@/data/exercises";
import { mockExams } from "@/data/mock-exams";

export const Route = createFileRoute("/app/practice")({
  head: () => ({ meta: [{ title: "Practice — Uniflow" }] }),
  component: PracticeHub,
});

type Tab = "flashcards" | "quizzes" | "exercises" | "mocks";

const tabs: { id: Tab; label: string; icon: typeof Layers; hint: string }[] = [
  { id: "flashcards", label: "Flashcards", icon: Layers, hint: "Spaced repetition" },
  { id: "quizzes", label: "Quizzes", icon: ListChecks, hint: "Concept checks" },
  { id: "exercises", label: "Exercises", icon: Pencil, hint: "Worked problems" },
  { id: "mocks", label: "Mock exams", icon: Timer, hint: "Full timed simulations" },
];

function PracticeHub() {
  const [tab, setTab] = useState<Tab>("flashcards");

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8">
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Practice</p>
        <h1 className="text-3xl font-extrabold tracking-tight mt-2">Train the way the exam will test you.</h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-xl">
          Four practice modes, all built from your faculty's syllabus and calibrated to your weakest topics.
        </p>
      </header>

      <div className="border-b border-border mb-8">
        <nav className="flex gap-1 -mb-px overflow-x-auto">
          {tabs.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`relative px-4 py-3 text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-colors ${
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <t.icon className="size-4" />
                {t.label}
                {active && (
                  <motion.span layoutId="practice-tab" className="absolute inset-x-2 -bottom-px h-0.5 bg-primary" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {tab === "flashcards" && <Flashcards />}
          {tab === "quizzes" && <Quizzes />}
          {tab === "exercises" && <Exercises />}
          {tab === "mocks" && <Mocks />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Flashcards() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {decks.map((d) => {
        const pct = Math.round((d.mastered / (d.mastered + d.cards.length)) * 100);
        return (
          <div key={d.id} className="p-6 bg-card border border-border rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-primary bg-primary-soft px-2 py-0.5 rounded">{d.code}</span>
              <Layers className="size-4 text-muted-foreground" />
            </div>
            <h3 className="font-bold text-base leading-snug">{d.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{d.description}</p>
            <div className="mt-5 space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                <span>{d.mastered} mastered</span>
                <span>{d.due} due</span>
              </div>
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
              </div>
            </div>
            <Link
              to="/app/practice/flashcards/$deckId"
              params={{ deckId: d.id }}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 py-2 text-xs font-bold bg-foreground text-background rounded-lg hover:bg-foreground/90"
            >
              <Play className="size-3.5" /> Review {d.due}
            </Link>
          </div>
        );
      })}
    </div>
  );
}

function Quizzes() {
  return (
    <div className="bg-card border border-border rounded-2xl divide-y divide-border overflow-hidden">
      {quizzes.map((q) => (
        <div key={q.id} className="px-6 py-4 flex items-center justify-between hover:bg-secondary/30 transition-colors">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-primary bg-primary-soft px-2 py-0.5 rounded">{q.code}</span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{q.chapter}</span>
            </div>
            <p className="font-semibold text-sm mt-1.5">{q.title}</p>
            <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mt-1">
              {q.questions.length} questions · ~{q.estMinutes} min
            </p>
          </div>
          <div className="flex items-center gap-6 shrink-0">
            <div className="text-right">
              <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Best</p>
              <p className={`text-sm font-mono font-bold ${q.bestScore ? "text-primary" : "text-muted-foreground"}`}>
                {q.bestScore !== null ? `${q.bestScore}%` : "—"}
              </p>
            </div>
            <button className="px-3 py-1.5 text-xs font-bold bg-foreground text-background rounded-lg hover:bg-foreground/90">
              Start
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function Exercises() {
  return (
    <div className="space-y-4">
      {exercises.map((ex) => (
        <article key={ex.id} className="p-6 bg-card border border-border rounded-2xl">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-primary bg-primary-soft px-2 py-0.5 rounded">{ex.code}</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{ex.chapter}</span>
                <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded ${
                  ex.difficulty === "Advanced" ? "text-destructive bg-destructive/10" :
                  ex.difficulty === "Core" ? "text-foreground bg-secondary" :
                  "text-muted-foreground bg-secondary/60"
                }`}>{ex.difficulty}</span>
              </div>
              <h3 className="font-bold text-base">{ex.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{ex.prompt}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Mastery</p>
              <p className="text-2xl font-extrabold tracking-tight">{ex.mastery}<span className="text-xs text-muted-foreground">%</span></p>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground inline-flex items-center gap-1.5">
              <Clock className="size-3" /> {ex.estMinutes} min · {ex.steps.length} steps
            </span>
            <button className="px-3 py-1.5 text-xs font-bold border border-border rounded-lg hover:border-primary/40 hover:text-primary">
              Open exercise
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

function Mocks() {
  return (
    <div className="grid md:grid-cols-2 gap-5">
      {mockExams.map((m) => (
        <div key={m.id} className="p-6 bg-card border border-border rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-primary bg-primary-soft px-2 py-0.5 rounded">{m.code}</span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{m.format}</span>
          </div>
          <h3 className="font-bold text-base leading-snug">{m.title}</h3>
          <p className="text-xs text-muted-foreground mt-1">{m.course}</p>

          <div className="mt-5 grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Duration</p>
              <p className="text-sm font-extrabold tracking-tight mt-1">{m.durationMinutes}m</p>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Items</p>
              <p className="text-sm font-extrabold tracking-tight mt-1">{m.questions}</p>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Last score</p>
              <p className={`text-sm font-extrabold tracking-tight mt-1 ${m.lastScore ? "text-primary" : "text-muted-foreground"}`}>
                {m.lastScore !== null ? `${m.lastScore}%` : "—"}
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-1.5">
            {m.sections.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                <span>{s.name}</span>
                <span>{s.weight}%</span>
              </div>
            ))}
          </div>

          <button className="mt-5 w-full inline-flex items-center justify-center gap-2 py-2.5 text-xs font-bold bg-foreground text-background rounded-lg hover:bg-foreground/90">
            <Timer className="size-3.5" /> Start timed mock
          </button>
        </div>
      ))}
    </div>
  );
}
