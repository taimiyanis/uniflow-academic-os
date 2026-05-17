import { createFileRoute } from "@tanstack/react-router";
import { Plus, Search, FileText } from "lucide-react";

export const Route = createFileRoute("/app/notes")({
  head: () => ({ meta: [{ title: "Smart Notes — Uniflow" }] }),
  component: NotesPage,
});

const notebooks = [
  { code: "EC22", title: "IS-LM Model — Chapter 4", updated: "2h ago", words: 1240, tag: "Lecture", pinned: true },
  { code: "EC22", title: "Aggregate Demand & Supply", updated: "Yesterday", words: 980, tag: "Reading" },
  { code: "AC22", title: "Balance Sheet — Case Alpha", updated: "2d ago", words: 2110, tag: "Case study" },
  { code: "LW22", title: "EU Competition Law Notes", updated: "3d ago", words: 1860, tag: "Lecture" },
  { code: "MK21", title: "Consumer Behavior Brief", updated: "4d ago", words: 720, tag: "Brief" },
  { code: "EC22", title: "Monetary Policy Mechanics", updated: "1 wk ago", words: 1490, tag: "Reading" },
];

function NotesPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <header className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Smart Notes</h1>
          <p className="text-sm text-muted-foreground mt-1">A clean editor that links concepts across your courses.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-semibold text-sm rounded-lg shadow-[var(--shadow-primary)]">
          <Plus className="size-4" /> New note
        </button>
      </header>

      <div className="mb-6 flex gap-3">
        <div className="flex-1 h-10 px-3 flex items-center gap-2.5 bg-card border border-border rounded-lg">
          <Search className="size-4 text-muted-foreground" />
          <input className="flex-1 bg-transparent text-sm outline-none" placeholder="Search notes, tags, courses..." />
        </div>
        <div className="flex gap-1 p-1 bg-card border border-border rounded-lg">
          {["All", "Lectures", "Cases", "Briefs"].map((t, i) => (
            <button key={t} className={`px-3 py-1.5 text-xs font-medium rounded-md ${i === 0 ? "bg-primary-soft text-primary" : "text-muted-foreground hover:text-foreground"}`}>{t}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {notebooks.map((n) => (
          <article key={n.title} className={`p-6 bg-card border rounded-2xl hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)] transition-all ${n.pinned ? "border-primary/40 ring-1 ring-primary/10" : "border-border"}`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-primary bg-primary-soft px-2 py-0.5 rounded">{n.code}</span>
              <FileText className="size-4 text-muted-foreground" />
            </div>
            <h3 className="font-bold text-base leading-snug">{n.title}</h3>
            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-[11px] font-mono text-muted-foreground uppercase tracking-widest">
              <span>{n.tag}</span>
              <span>{n.words} words · {n.updated}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
