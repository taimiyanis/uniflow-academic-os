import { createFileRoute } from "@tanstack/react-router";
import { Play, Coffee, Wind } from "lucide-react";

export const Route = createFileRoute("/app/focus")({
  head: () => ({ meta: [{ title: "Focus Mode — Uniflow" }] }),
  component: FocusPage,
});

function FocusPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <header className="text-center mb-12 pt-8">
        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">Focus Session</p>
        <h1 className="text-4xl font-extrabold tracking-tight">A quiet space to think.</h1>
      </header>

      <div className="bg-card border border-border rounded-[2.5rem] p-16 text-center shadow-[var(--shadow-elegant)]">
        <p className="text-[10px] font-mono uppercase tracking-widest text-primary mb-6">Macroeconomics · IS-LM Review</p>
        <div className="relative inline-grid place-items-center">
          <svg viewBox="0 0 220 220" className="size-56 -rotate-90">
            <circle cx="110" cy="110" r="100" stroke="currentColor" strokeWidth="6" fill="none" className="text-secondary" />
            <circle
              cx="110" cy="110" r="100"
              stroke="currentColor" strokeWidth="6" fill="none"
              strokeDasharray={2 * Math.PI * 100}
              strokeDashoffset={2 * Math.PI * 100 * 0.42}
              strokeLinecap="round"
              className="text-primary"
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <div>
              <p className="text-6xl font-extrabold tracking-tight tabular-nums">14:32</p>
              <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-2">deep work · 25 min preset</p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-3">
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg shadow-[var(--shadow-primary)]">
            <Play className="size-4" /> Resume
          </button>
          <button className="px-6 py-3 bg-card border border-border font-semibold rounded-lg">End session</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5 mt-8">
        <div className="p-5 bg-card border border-border rounded-2xl text-center">
          <Wind className="size-4 text-primary mx-auto mb-2" />
          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Soundscape</p>
          <p className="text-sm font-bold mt-1">Quiet library</p>
        </div>
        <div className="p-5 bg-card border border-border rounded-2xl text-center">
          <Coffee className="size-4 text-primary mx-auto mb-2" />
          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Next break</p>
          <p className="text-sm font-bold mt-1">in 14m</p>
        </div>
        <div className="p-5 bg-card border border-border rounded-2xl text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Streak</p>
          <p className="text-sm font-bold mt-1">9 days · personal best</p>
        </div>
      </div>
    </div>
  );
}
