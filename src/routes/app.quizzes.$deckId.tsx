import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { decks } from "@/data/decks";

export const Route = createFileRoute("/app/quizzes/$deckId")({
  head: () => ({ meta: [{ title: "Review session — Uniflow" }] }),
  component: ReviewSession,
});

const grades = [
  { label: "Again", color: "bg-destructive text-destructive-foreground", key: "1" },
  { label: "Hard", color: "bg-secondary text-foreground border border-border", key: "2" },
  { label: "Good", color: "bg-primary-soft text-primary", key: "3" },
  { label: "Easy", color: "bg-primary text-primary-foreground", key: "4" },
];

function ReviewSession() {
  const { deckId } = Route.useParams();
  const deck = decks.find((d) => d.id === deckId);
  if (!deck) throw notFound();

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(false);
  const card = deck.cards[index];

  const grade = () => {
    if (index + 1 >= deck.cards.length) setDone(true);
    else { setIndex(index + 1); setFlipped(false); }
  };

  const reset = () => { setIndex(0); setFlipped(false); setDone(false); };

  if (done) {
    return (
      <div className="max-w-3xl mx-auto text-center py-16">
        <p className="text-[10px] font-mono uppercase tracking-widest text-primary mb-3">Session complete</p>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">{deck.cards.length} cards reviewed</h1>
        <p className="text-sm text-muted-foreground mb-8">Daily streak · 10 days</p>
        <div className="flex items-center justify-center gap-3">
          <button onClick={reset} className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-semibold text-sm rounded-lg">
            <RotateCcw className="size-4" /> Review again
          </button>
          <Link to="/app/quizzes" className="px-4 py-2.5 border border-border font-semibold text-sm rounded-lg">All decks</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-8">
        <Link to="/app/quizzes" className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-primary mb-3">
          <ArrowLeft className="size-3" /> All decks
        </Link>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-primary">{deck.code}</p>
            <h1 className="text-2xl font-extrabold tracking-tight mt-1">{deck.title}</h1>
          </div>
          <p className="text-xs font-mono text-muted-foreground">{index + 1} / {deck.cards.length}</p>
        </div>
        <div className="mt-4 h-1 bg-secondary rounded-full overflow-hidden">
          <div className="h-full bg-primary transition-all" style={{ width: `${((index + 1) / deck.cards.length) * 100}%` }} />
        </div>
      </header>

      <div className="relative h-80 mb-6" style={{ perspective: 1200 }}>
        <AnimatePresence mode="wait">
          <motion.button
            key={`${index}-${flipped}`}
            onClick={() => setFlipped((f) => !f)}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 90, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 w-full p-10 bg-card border border-border rounded-3xl flex flex-col items-center justify-center text-center shadow-[var(--shadow-elegant)]"
          >
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-6">{flipped ? "Answer" : "Question"}</p>
            <p className="text-2xl font-bold leading-snug max-w-xl">{flipped ? card.back : card.front}</p>
            {!flipped && <p className="text-xs text-muted-foreground mt-8">Click to reveal</p>}
          </motion.button>
        </AnimatePresence>
      </div>

      {flipped ? (
        <div className="grid grid-cols-4 gap-3">
          {grades.map((g) => (
            <button key={g.label} onClick={grade} className={`py-3 rounded-lg font-semibold text-sm ${g.color}`}>
              {g.label}<span className="block text-[10px] font-mono opacity-60 mt-0.5">{g.key}</span>
            </button>
          ))}
        </div>
      ) : (
        <button onClick={() => setFlipped(true)} className="w-full py-3 bg-foreground text-background rounded-lg font-semibold text-sm">
          Show answer (space)
        </button>
      )}
    </div>
  );
}
