import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, FileText, CheckCircle2, Circle, Dot } from "lucide-react";
import { courses } from "@/data/courses";
import { notes } from "@/data/notes";

export const Route = createFileRoute("/app/library/$code")({
  head: ({ params }) => ({ meta: [{ title: `${params.code} — Library — Uniflow` }] }),
  component: CourseLibrary,
});

function CourseLibrary() {
  const { code } = Route.useParams();
  const course = courses.find((c) => c.code === code);
  if (!course) throw notFound();
  const lessons = notes.filter((n) => n.code === code);

  return (
    <div className="max-w-5xl mx-auto">
      <Link to="/app/library" className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-primary mb-4">
        <ArrowLeft className="size-3" /> Library
      </Link>
      <header className="mb-10">
        <p className="text-[10px] font-mono uppercase tracking-widest text-primary">{course.code} · {course.professor}</p>
        <h1 className="text-3xl font-extrabold tracking-tight mt-1">{course.name}</h1>
      </header>

      <div className="grid grid-cols-12 gap-8">
        <section className="col-span-12 lg:col-span-7">
          <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Syllabus</h2>
          <ol className="space-y-2">
            {course.syllabus.map((s, i) => {
              const Icon = s.status === "done" ? CheckCircle2 : s.status === "current" ? Dot : Circle;
              return (
                <li
                  key={i}
                  className={`flex items-center gap-3 p-3 rounded-lg border ${
                    s.status === "current"
                      ? "border-primary/40 bg-primary-soft/40"
                      : "border-border bg-card"
                  }`}
                >
                  <Icon className={`size-4 ${s.status === "done" ? "text-primary" : s.status === "current" ? "text-primary" : "text-muted-foreground"}`} />
                  <span className="text-sm font-medium flex-1">{s.title}</span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{s.status}</span>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="col-span-12 lg:col-span-5">
          <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Lessons & readings</h2>
          {lessons.length === 0 ? (
            <p className="text-sm text-muted-foreground">No lessons published yet for this course.</p>
          ) : (
            <ul className="space-y-2">
              {lessons.map((n) => (
                <li key={n.id}>
                  <Link
                    to="/app/library/$code/$lessonId"
                    params={{ code: course.code, lessonId: n.id }}
                    className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card hover:border-primary/40 transition-colors"
                  >
                    <FileText className="size-4 text-muted-foreground mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{n.title}</p>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5">
                        {n.tag} · {n.words} words
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
