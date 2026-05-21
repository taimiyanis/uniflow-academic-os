import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Trophy, RotateCcw, BookOpen, Dumbbell, Sparkles } from "lucide-react";
import { mockExams } from "@/data/mock-exams";
import { readStorage, StorageKeys } from "@/lib/storage";
import type { AttemptsMap } from "@/lib/readiness";
import { fadeUp, stagger } from "@/lib/motion";

export const Route = createFileRoute("/app/practice/mock-exams/$id/result")({
  head: () => ({ meta: [{ title: "Mock result — Uniflow" }] }),
  component: MockResult,
});

function MockResult() {
  const { id } = Route.useParams();
  const exam = mockExams.find((m) => m.id === id);
  if (!exam) throw notFound();

  const attempts = readStorage<AttemptsMap>(StorageKeys.attempts, {});
  const list = attempts[id] ?? [];
  const latest = list[list.length - 1];

  if (!latest) {
    return (
      <div className="max-w-3xl mx-auto p-10 bg-card border border-border rounded-3xl text-center">
        <p className="text-sm text-muted-foreground">No attempt found yet.</p>
        <Link to="/app/practice/mock-exams/$id/run" params={{ id }} className="mt-4 inline-flex px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-bold">
          Start mock
        </Link>
      </div>
    );
  }

  const tone = latest.score >= 80 ? "text-primary" : latest.score >= 60 ? "text-foreground" : "text-destructive";

  return (
    <motion.div initial="hidden" animate="show" variants={stagger()} className="max-w-5xl mx-auto space-y-8">
      <motion.header variants={fadeUp} className="p-10 bg-card border border-border rounded-3xl text-center relative overflow-hidden">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 size-72 bg-primary/15 rounded-full blur-3xl" />
        <div className="relative">
          <Trophy className={`size-8 mx-auto ${tone}`} />
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-4">{exam.code} · {exam.title}</p>
          <p className={`text-7xl font-extrabold tracking-tight mt-3 ${tone}`}>{latest.score}<span className="text-2xl text-muted-foreground">%</span></p>
          <p className="text-sm text-muted-foreground mt-3">Attempt #{list.length} · {new Date(latest.takenAt).toLocaleString()}</p>
        </div>
      </motion.header>

      <motion.section variants={fadeUp} className="grid grid-cols-2 gap-5">
        <div className="p-6 bg-card border border-border rounded-2xl">
          <h3 className="text-sm font-bold mb-4">Section breakdown</h3>
          <ul className="space-y-3">
            {(latest.sectionScores ?? []).map((s) => (
              <li key={s.name}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold">{s.name}</span>
                  <span className="font-mono">{s.score}%</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${s.score}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 bg-card border border-border rounded-2xl">
          <h3 className="text-sm font-bold mb-4">Topics to revisit</h3>
          {latest.weakTopics && latest.weakTopics.length > 0 ? (
            <ul className="space-y-2">
              {latest.weakTopics.map((t) => (
                <li key={t} className="flex items-center justify-between px-3 py-2 bg-destructive/5 border border-destructive/20 rounded-lg">
                  <span className="text-sm">{t}</span>
                  <Link to="/app/tutor" search={{ topic: t }} className="text-[10px] font-mono uppercase tracking-widest text-primary hover:underline">Open with tutor →</Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">Solid coverage — no topic fell below 60%.</p>
          )}
        </div>
      </motion.section>

      <motion.section variants={fadeUp} className="flex flex-wrap gap-3">
        <Link to="/app/practice/mock-exams/$id/run" params={{ id }} className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border border-border rounded-lg hover:bg-secondary/60">
          <RotateCcw className="size-4" /> Retake
        </Link>
        <Link to="/app/library" className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border border-border rounded-lg hover:bg-secondary/60">
          <BookOpen className="size-4" /> Review lessons
        </Link>
        <Link to="/app/practice" className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border border-border rounded-lg hover:bg-secondary/60">
          <Dumbbell className="size-4" /> More practice
        </Link>
        <Link to="/app/tutor" className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-lg">
          <Sparkles className="size-4" /> Debrief with tutor
        </Link>
      </motion.section>
    </motion.div>
  );
}
