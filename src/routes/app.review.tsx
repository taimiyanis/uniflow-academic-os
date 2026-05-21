import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Layers, Check, X, Sparkles } from "lucide-react";
import { getReviewQueue } from "@/data/review-queue";
import { readStorage, writeStorage, StorageKeys } from "@/lib/storage";
import { fadeUp } from "@/lib/motion";

export const Route = createFileRoute("/app/review")({
  head: () => ({
    meta: [
      { title: "Today's review — Uniflow" },
      { name: "description", content: "One unified queue of due flashcards, missed quiz items, and exercises flagged for review." },
    ],
  }),
  component: ReviewPage,
});

interface StreakState {
  daysHit: string[]; // ISO YYYY-MM-DD
}

function markDayDone() {
  const today = new Date().toISOString().slice(0, 10);
  const s = readStorage<StreakState>(StorageKeys.streak, { daysHit: [] });
  if (!s.daysHit.includes(today)) {
    writeStorage(StorageKeys.streak, { daysHit: [...s.daysHit, today] });
  }
}

function ReviewPage() {
  const queue = useMemo(() => getReviewQueue(), []);
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [graded, setGraded] = useState<("right" | "wrong" | "skip")[]>([]);

  const item = queue[idx];
  const done = idx >= queue.length;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (done) return;
      if (e.key === " ") { e.preventDefault(); setRevealed((r) => !r); }
      else if (revealed && (e.key === "1" || e.key === "2" || e.key === "3")) {
        grade(e.key === "3" ? "right" : e.key === "2" ? "skip" : "wrong");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const grade = (g: "right" | "wrong" | "skip") => {
    setGraded((arr) => [...arr, g]);
    setRevealed(false);
    setIdx((i) => i + 1);
  };

  useEffect(() => {
    if (done && queue.length > 0) markDayDone();
  }, [done, queue.length]);

  if (queue.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-10 bg-card border border-border rounded-3xl text-center">
        <Sparkles className="size-6 text-primary mx-auto" />
        <h1 className="text-2xl font-extrabold mt-4">All caught up.</h1>
        <p className="text-sm text-muted-foreground mt-2">Nothing due today. Get ahead with a practice session.</p>
        <Link to="/app/practice" className="mt-6 inline-flex px-4 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-lg">
          Open practice
        </Link>
      </div>
    );
  }

  if (done) {
    const right = graded.filter((g) => g === "right").length;
    const wrong = graded.filter((g) => g === "wrong").length;
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto p-10 bg-card border border-border rounded-3xl text-center">
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Session complete</p>
        <h1 className="text-3xl font-extrabold mt-3">Nice — {right}/{queue.length} confident.</h1>
        <p className="text-sm text-muted-foreground mt-2">{wrong} items will resurface tomorrow.</p>
        <div className="mt-6 flex gap-2 justify-center">
          <Link to="/app" className="px-4 py-2.5 text-sm font-semibold border border-border rounded-lg hover:bg-secondary/60">Back to dashboard</Link>
          <Link to="/app/practice" className="px-4 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-lg">More practice</Link>
        </div>
      </motion.div>
    );
  }

  const progress = Math.round((idx / queue.length) * 100);

  return (
    <div className="max-w-3xl mx-auto">
      <motion.header variants={fadeUp} initial="hidden" animate="show" className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Today's review</p>
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{idx + 1} / {queue.length}</p>
        </div>
        <div className="h-1 bg-secondary rounded-full overflow-hidden">
          <motion.div className="h-full bg-primary" animate={{ width: `${progress}%` }} />
        </div>
      </motion.header>

      <AnimatePresence mode="wait">
        <motion.article
          key={item.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          className="p-10 bg-card border border-border rounded-3xl min-h-[360px] flex flex-col"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-primary bg-primary-soft px-2 py-0.5 rounded">{item.code}</span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground inline-flex items-center gap-1">
              <Layers className="size-3" /> {item.source}
            </span>
          </div>
          <p className="text-xl font-bold leading-snug">{item.prompt}</p>

          <AnimatePresence>
            {revealed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 pt-6 border-t border-border"
              >
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Answer</p>
                <p className="text-base leading-relaxed whitespace-pre-line">{item.answer}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-auto pt-8">
            {!revealed ? (
              <button onClick={() => setRevealed(true)} className="w-full py-3 text-sm font-bold bg-foreground text-background rounded-lg hover:bg-foreground/90">
                Reveal answer <kbd className="ml-2 text-[10px] font-mono opacity-60">space</kbd>
              </button>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                <button onClick={() => grade("wrong")} className="py-3 text-sm font-bold border border-destructive/40 text-destructive rounded-lg hover:bg-destructive/10 inline-flex items-center justify-center gap-2">
                  <X className="size-4" /> Again <kbd className="ml-1 text-[10px] font-mono opacity-60">1</kbd>
                </button>
                <button onClick={() => grade("skip")} className="py-3 text-sm font-bold border border-border rounded-lg hover:bg-secondary/60 inline-flex items-center justify-center gap-2">
                  Hard <kbd className="ml-1 text-[10px] font-mono opacity-60">2</kbd>
                </button>
                <button onClick={() => grade("right")} className="py-3 text-sm font-bold bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 inline-flex items-center justify-center gap-2">
                  <Check className="size-4" /> Got it <kbd className="ml-1 text-[10px] font-mono opacity-60">3</kbd>
                </button>
              </div>
            )}
          </div>
        </motion.article>
      </AnimatePresence>

      <div className="mt-6 text-center">
        <Link to="/app" className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-primary inline-flex items-center gap-1">
          End session <ChevronRight className="size-3" />
        </Link>
      </div>
    </div>
  );
}
