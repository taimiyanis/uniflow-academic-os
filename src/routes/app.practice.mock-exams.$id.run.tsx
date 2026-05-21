import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Clock, Flag, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { mockExams } from "@/data/mock-exams";
import { readStorage, writeStorage, StorageKeys } from "@/lib/storage";
import type { AttemptsMap, MockAttempt } from "@/lib/readiness";

export const Route = createFileRoute("/app/practice/mock-exams/$id/run")({
  head: ({ params }) => ({ meta: [{ title: `Mock exam — Uniflow` }, { name: "description", content: `Timed mock exam runtime ${params.id}` }] }),
  component: MockRun,
});

function MockRun() {
  const { id } = Route.useParams();
  const exam = mockExams.find((m) => m.id === id);
  const navigate = useNavigate();
  if (!exam) throw notFound();

  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [active, setActive] = useState(0);
  const deadline = useMemo(() => Date.now() + exam.durationMinutes * 60_000, [exam.id]);
  const [remaining, setRemaining] = useState(deadline - Date.now());

  useEffect(() => {
    const t = setInterval(() => setRemaining(deadline - Date.now()), 500);
    return () => clearInterval(t);
  }, [deadline]);

  useEffect(() => {
    if (remaining <= 0) submit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining]);

  const total = exam.items.length;
  const answered = Object.values(answers).filter((v) => v !== null && v !== undefined).length;
  const item = exam.items[active];

  const toggleFlag = () => {
    const next = new Set(flagged);
    next.has(active) ? next.delete(active) : next.add(active);
    setFlagged(next);
  };

  const submit = () => {
    const correct = exam.items.reduce((s, q, i) => s + (answers[i] === q.answer ? 1 : 0), 0);
    const score = Math.round((correct / total) * 100);

    // Per-section + weak topics
    const sectionMap: Record<string, { correct: number; total: number }> = {};
    const topicMap: Record<string, { correct: number; total: number }> = {};
    exam.items.forEach((q, i) => {
      sectionMap[q.section] ??= { correct: 0, total: 0 };
      sectionMap[q.section].total++;
      topicMap[q.topic] ??= { correct: 0, total: 0 };
      topicMap[q.topic].total++;
      if (answers[i] === q.answer) {
        sectionMap[q.section].correct++;
        topicMap[q.topic].correct++;
      }
    });
    const sectionScores = Object.entries(sectionMap).map(([name, v]) => ({
      name, score: Math.round((v.correct / v.total) * 100),
    }));
    const weakTopics = Object.entries(topicMap)
      .filter(([, v]) => v.correct / v.total < 0.6)
      .map(([t]) => t);

    const attempt: MockAttempt = { examId: exam.id, score, takenAt: Date.now(), sectionScores, weakTopics };
    const all = readStorage<AttemptsMap>(StorageKeys.attempts, {});
    all[exam.id] = [...(all[exam.id] ?? []), attempt];
    writeStorage(StorageKeys.attempts, all);

    navigate({ to: "/app/practice/mock-exams/$id/result", params: { id: exam.id } });
  };

  const mm = Math.max(0, Math.floor(remaining / 60000));
  const ss = Math.max(0, Math.floor((remaining % 60000) / 1000));
  const lowTime = remaining < 5 * 60_000;

  return (
    <div className="max-w-6xl mx-auto">
      <header className="sticky top-14 z-20 -mx-8 px-8 py-4 bg-background/95 backdrop-blur border-b border-border flex items-center justify-between">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{exam.code} · {exam.title}</p>
          <p className="text-sm font-bold mt-0.5">{item.section}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-sm font-bold ${lowTime ? "bg-destructive/15 text-destructive" : "bg-secondary"}`}>
            <Clock className="size-4" />
            {String(mm).padStart(2, "0")}:{String(ss).padStart(2, "0")}
          </div>
          <p className="text-xs font-mono text-muted-foreground">{answered}/{total} answered</p>
          <button onClick={submit} className="px-4 py-2 text-xs font-bold bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
            Submit
          </button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6 mt-8">
        <main className="col-span-12 lg:col-span-9 p-8 bg-card border border-border rounded-3xl">
          <div className="flex items-center justify-between mb-6">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Question {active + 1} of {total}</p>
            <button onClick={toggleFlag} className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg ${flagged.has(active) ? "bg-primary-soft text-primary" : "text-muted-foreground hover:bg-secondary/60"}`}>
              <Flag className="size-3.5" /> {flagged.has(active) ? "Flagged" : "Flag for review"}
            </button>
          </div>
          <h2 className="text-xl font-bold leading-snug mb-6">{item.q}</h2>
          <div className="space-y-2">
            {item.options.map((opt, idx) => {
              const chosen = answers[active] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setAnswers((a) => ({ ...a, [active]: idx }))}
                  className={`w-full text-left p-4 rounded-xl border text-sm transition-colors ${
                    chosen ? "border-primary bg-primary-soft text-foreground" : "border-border hover:bg-secondary/40"
                  }`}
                >
                  <span className="font-mono text-xs text-muted-foreground mr-3">{String.fromCharCode(65 + idx)}.</span>
                  {opt}
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={() => setActive((a) => Math.max(0, a - 1))}
              disabled={active === 0}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border border-border rounded-lg disabled:opacity-40 hover:bg-secondary/60"
            >
              <ChevronLeft className="size-3.5" /> Previous
            </button>
            <button
              onClick={() => setActive((a) => Math.min(total - 1, a + 1))}
              disabled={active === total - 1}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border border-border rounded-lg disabled:opacity-40 hover:bg-secondary/60"
            >
              Next <ChevronRight className="size-3.5" />
            </button>
          </div>
        </main>

        <aside className="col-span-12 lg:col-span-3 p-5 bg-card border border-border rounded-3xl self-start">
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">Navigator</p>
          <div className="grid grid-cols-5 gap-1.5">
            {exam.items.map((_, i) => {
              const ans = answers[i] !== null && answers[i] !== undefined;
              const flag = flagged.has(i);
              const isActive = i === active;
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`size-8 grid place-items-center text-[11px] font-mono font-semibold rounded transition-colors ${
                    isActive ? "ring-2 ring-primary" : ""
                  } ${flag ? "bg-primary-soft text-primary" : ans ? "bg-foreground text-background" : "bg-secondary text-muted-foreground hover:bg-secondary/80"}`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
          <div className="mt-5 pt-5 border-t border-border space-y-2 text-[11px] font-mono text-muted-foreground">
            <p className="flex items-center gap-2"><span className="size-2 rounded bg-foreground" /> Answered</p>
            <p className="flex items-center gap-2"><span className="size-2 rounded bg-primary-soft" /> Flagged</p>
            <p className="flex items-center gap-2"><span className="size-2 rounded bg-secondary" /> Unanswered</p>
          </div>
          <button onClick={submit} className="mt-5 w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold bg-primary text-primary-foreground rounded-lg">
            <Check className="size-3.5" /> Submit exam
          </button>
        </aside>
      </div>
    </div>
  );
}
