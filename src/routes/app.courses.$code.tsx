import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { courses } from "@/data/courses";

export const Route = createFileRoute("/app/courses/$code")({
  head: ({ params }) => ({ meta: [{ title: `${params.code} — Uniflow` }] }),
  component: CoursePage,
});

function CoursePage() {
  const { code } = Route.useParams();
  const course = courses.find((c) => c.code === code);
  if (!course) throw notFound();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <header>
        <Link to="/app" className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="size-3" /> Workspace
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-primary bg-primary-soft px-2 py-0.5 rounded">{course.code}</span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{course.professor} · {course.ects} ECTS</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">{course.name}</h1>
        <p className="text-sm text-muted-foreground mt-1">Next up · {course.next}</p>
      </header>

      <div className="grid grid-cols-12 gap-5">
        <section className="col-span-12 lg:col-span-8 p-7 bg-card border border-border rounded-3xl">
          <h2 className="text-base font-bold mb-6">Syllabus</h2>
          <ol className="space-y-2">
            {course.syllabus.map((s) => (
              <li key={s.title} className={`flex items-center gap-3 p-3 rounded-lg border ${
                s.status === "current" ? "border-primary/30 bg-primary-soft/40" :
                s.status === "done" ? "border-border bg-secondary/30 text-muted-foreground" :
                "border-border"
              }`}>
                <span className={`size-2 rounded-full ${s.status === "done" ? "bg-primary" : s.status === "current" ? "bg-primary animate-pulse" : "bg-muted-foreground/30"}`} />
                <span className={`text-sm font-medium flex-1 ${s.status === "done" ? "line-through" : ""}`}>{s.title}</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{s.status}</span>
              </li>
            ))}
          </ol>
        </section>

        <aside className="col-span-12 lg:col-span-4 space-y-5">
          <div className="p-7 bg-card border border-border rounded-3xl">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Progress</p>
            <p className="text-4xl font-extrabold mt-2">{course.progress}%</p>
            <div className="mt-3 h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${course.progress}%` }} />
            </div>
            {course.score !== null && (
              <p className="text-xs text-muted-foreground mt-4">Avg. score · <span className="text-primary font-mono font-bold">{course.score}%</span></p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
