import { createFileRoute } from "@tanstack/react-router";
import { Layers, Plus, Play } from "lucide-react";

export const Route = createFileRoute("/app/quizzes")({
  head: () => ({ meta: [{ title: "Quizzes — Uniflow" }] }),
  component: QuizzesPage,
});

const decks = [
  { code: "EC22", title: "IS-LM essentials", cards: 42, mastered: 28, due: 8 },
  { code: "EC22", title: "Monetary policy mechanics", cards: 36, mastered: 18, due: 6 },
  { code: "AC22", title: "Balance sheet ratios", cards: 54, mastered: 50, due: 2 },
  { code: "LW22", title: "EU Competition Law", cards: 28, mastered: 12, due: 14 },
];

const exams = [
  { title: "Macroeconomics — Full mock", questions: 45, time: "90 min", score: "—" },
  { title: "Macro — Chapter 3 review", questions: 20, time: "30 min", score: "92%" },
  { title: "Accounting — Mid-term sim", questions: 30, time: "60 min", score: "84%" },
];

function QuizzesPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Quizzes & Flashcards</h1>
          <p className="text-sm text-muted-foreground mt-1">Active recall, generated from your own notes.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-semibold text-sm rounded-lg shadow-[var(--shadow-primary)]">
          <Plus className="size-4" /> Generate deck
        </button>
      </header>

      <section>
        <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Flashcard decks</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {decks.map((d) => {
            const pct = Math.round((d.mastered / d.cards) * 100);
            return (
              <div key={d.title} className="p-6 bg-card border border-border rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-primary bg-primary-soft px-2 py-0.5 rounded">{d.code}</span>
                  <Layers className="size-4 text-muted-foreground" />
                </div>
                <h3 className="font-bold text-sm leading-snug min-h-[40px]">{d.title}</h3>
                <div className="mt-5 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground uppercase tracking-widest">
                    <span>{d.mastered}/{d.cards} mastered</span>
                    <span>{d.due} due</span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <button className="mt-5 w-full inline-flex items-center justify-center gap-2 py-2 text-xs font-bold border border-border rounded-lg hover:bg-secondary/60">
                  <Play className="size-3.5" /> Review {d.due}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Practice exams</h2>
        <div className="bg-card border border-border rounded-2xl divide-y divide-border overflow-hidden">
          {exams.map((e) => (
            <div key={e.title} className="px-6 py-4 flex items-center justify-between hover:bg-secondary/30 transition-colors">
              <div>
                <p className="font-semibold text-sm">{e.title}</p>
                <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mt-1">{e.questions} questions · {e.time}</p>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-sm font-mono text-primary w-16 text-right">{e.score}</span>
                <button className="px-3 py-1.5 text-xs font-bold border border-border rounded-lg hover:border-primary/40">Start</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
