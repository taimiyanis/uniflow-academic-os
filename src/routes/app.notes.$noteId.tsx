import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Sparkles, Wand2, Link2, FileQuestion } from "lucide-react";
import { notes } from "@/data/notes";

export const Route = createFileRoute("/app/notes/$noteId")({
  head: ({ params }) => ({ meta: [{ title: `Note — Uniflow` }, { name: "description", content: `Note ${params.noteId}` }] }),
  component: NoteEditor,
});

function NoteEditor() {
  const { noteId } = Route.useParams();
  const note = notes.find((n) => n.id === noteId);
  if (!note) throw notFound();
  const related = notes.filter((n) => note.related.includes(n.id));

  return (
    <div className="max-w-7xl mx-auto">
      <Link to="/app/notes" className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-primary mb-4">
        <ArrowLeft className="size-3" /> All notes
      </Link>
      <div className="grid grid-cols-12 gap-5">
        <article className="col-span-12 lg:col-span-8 p-8 bg-card border border-border rounded-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-primary bg-primary-soft px-2 py-0.5 rounded">{note.code}</span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{note.tag} · {note.words} words · {note.updated}</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-6">{note.title}</h1>
          <div contentEditable suppressContentEditableWarning className="prose prose-sm max-w-none text-sm leading-relaxed text-foreground whitespace-pre-wrap outline-none focus:outline-none">
            {note.body}
          </div>
          {related.length > 0 && (
            <div className="mt-10 pt-6 border-t border-border">
              <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">Related notes</p>
              <div className="flex flex-wrap gap-2">
                {related.map((r) => (
                  <Link key={r.id} to="/app/notes/$noteId" params={{ noteId: r.id }} className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-secondary/60 hover:bg-primary-soft hover:text-primary rounded-lg">
                    <Link2 className="size-3" /> {r.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>

        <aside className="col-span-12 lg:col-span-4 p-6 bg-card border border-border rounded-3xl space-y-5 self-start">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <h3 className="text-sm font-bold">AI assist</h3>
          </div>
          <ul className="space-y-2">
            {[
              { icon: Wand2, label: "Summarize this note" },
              { icon: FileQuestion, label: "Generate flashcards" },
              { icon: Link2, label: "Find related concepts" },
              { icon: Sparkles, label: "Ask about selection" },
            ].map((a) => (
              <li key={a.label}>
                <button className="w-full flex items-center gap-2.5 text-left text-sm p-3 rounded-lg border border-border hover:bg-secondary/60">
                  <a.icon className="size-4 text-primary" /> {a.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="pt-4 border-t border-border">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Tutor preview</p>
            <p className="text-sm text-muted-foreground leading-relaxed">Ready to summarize this note in 5 bullets, or to generate a 10-card spaced-repetition deck.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
