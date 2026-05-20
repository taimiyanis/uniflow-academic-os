import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Sparkles, Layers, Link2, MessageSquare } from "lucide-react";
import { notes } from "@/data/notes";
import { courses } from "@/data/courses";

export const Route = createFileRoute("/app/library/$code/$lessonId")({
  head: ({ params }) => ({ meta: [{ title: `Lesson — ${params.code} — Uniflow` }] }),
  component: LessonReader,
});

function LessonReader() {
  const { code, lessonId } = Route.useParams();
  const note = notes.find((n) => n.id === lessonId);
  const course = courses.find((c) => c.code === code);
  if (!note || !course) throw notFound();
  const related = notes.filter((n) => note.related.includes(n.id));

  return (
    <div className="max-w-6xl mx-auto">
      <Link
        to="/app/library/$code"
        params={{ code }}
        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-primary mb-4"
      >
        <ArrowLeft className="size-3" /> {course.name}
      </Link>

      <div className="grid grid-cols-12 gap-6">
        <article className="col-span-12 lg:col-span-8 p-10 bg-card border border-border rounded-3xl">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-primary bg-primary-soft px-2 py-0.5 rounded">{note.code}</span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{note.tag} · {note.words} words</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-8">{note.title}</h1>
          <div className="prose prose-sm max-w-none text-[15px] leading-relaxed text-foreground whitespace-pre-wrap">
            {note.body}
          </div>

          <div className="mt-10 pt-8 border-t border-border flex flex-wrap gap-3">
            <Link
              to="/app/practice"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-semibold text-sm rounded-lg shadow-[var(--shadow-primary)]"
            >
              <Layers className="size-4" /> Practice this chapter
            </Link>
            <Link
              to="/app/tutor"
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-border font-semibold text-sm rounded-lg hover:bg-secondary/60"
            >
              <MessageSquare className="size-4" /> Ask the tutor about this
            </Link>
          </div>

          {related.length > 0 && (
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">Related lessons</p>
              <div className="flex flex-wrap gap-2">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    to="/app/library/$code/$lessonId"
                    params={{ code: r.code, lessonId: r.id }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-secondary/60 hover:bg-primary-soft hover:text-primary rounded-lg"
                  >
                    <Link2 className="size-3" /> {r.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>

        <aside className="col-span-12 lg:col-span-4 p-6 bg-card border border-border rounded-3xl self-start space-y-5">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <h3 className="text-sm font-bold">Explain this passage</h3>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Select any text in the lesson and ask the tutor to rephrase, give an example, or check your understanding.
          </p>
          <Link
            to="/app/tutor"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 text-xs font-bold bg-primary-soft text-primary rounded-lg"
          >
            Open tutor
          </Link>
          <div className="pt-4 border-t border-border">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">In this lesson</p>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              {note.body
                .split("\n")
                .filter((l) => l.startsWith("## "))
                .map((l) => (
                  <li key={l} className="truncate">· {l.replace(/^##\s+/, "")}</li>
                ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
