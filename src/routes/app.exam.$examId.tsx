import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Layers, Sparkles, Play, Clock } from "lucide-react";
import { exams, type Exam } from "@/data/exams";
import { fadeUp, stagger } from "@/lib/motion";

export const Route = createFileRoute("/app/exam/$examId")({
  head: ({ params }) => ({ meta: [{ title: `Exam plan — Uniflow` }, { name: "description", content: `Day-by-day plan for exam ${params.examId}` }] }),
  loader: ({ params }): Exam => {
    const exam = exams.find((e) => e.id === params.examId);
    if (!exam) throw notFound();
    return exam;
  },
  component: ExamDetail,
});

const kindIcon: Record<string, any> = { review: BookOpen, flashcards: Layers, tutor: Sparkles, mock: Play };
const kindLabel: Record<string, string> = { review: "Review", flashcards: "Flashcards", tutor: "Tutor", mock: "Mock exam" };

function ExamDetail() {
  const exam = Route.useLoaderData();

  return (
    <motion.div initial="hidden" animate="show" variants={stagger()} className="max-w-7xl mx-auto space-y-8">
      <motion.header variants={fadeUp}>
        <Link to="/app/exam" className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="size-3" /> All exams
        </Link>
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-primary bg-primary-soft px-2 py-0.5 rounded">{exam.code}</span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{exam.date}</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">{exam.course}</h1>
            <p className="text-sm text-muted-foreground mt-1">{exam.daysAway} days away · {exam.plan.length} sessions planned</p>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-semibold text-sm rounded-lg shadow-[var(--shadow-primary)]">
            <Play className="size-4 fill-current" /> Start today
          </button>
        </div>
      </motion.header>

      <div className="grid grid-cols-12 gap-5">
        {/* Plan */}
        <motion.section variants={fadeUp} className="col-span-12 lg:col-span-8 p-7 bg-card border border-border rounded-3xl">
          <h2 className="text-base font-bold mb-6">Day-by-day plan</h2>
          {exam.plan.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-sm text-muted-foreground">Plan generation pending — the tutor needs more diagnostic data.</p>
              <button className="mt-4 px-4 py-2 text-xs font-bold bg-primary-soft text-primary rounded-lg">Generate plan</button>
            </div>
          ) : (
            <div className="space-y-6">
              {exam.plan.map((day, di) => (
                <div key={day.day} className="relative">
                  <div className="flex items-baseline justify-between mb-3">
                    <h3 className="text-sm font-bold">{day.day}</h3>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                      {day.tasks.reduce((s, t) => s + t.minutes, 0)} min
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {day.tasks.map((t, ti) => {
                      const Icon = kindIcon[t.kind];
                      return (
                        <li key={ti} className={`p-3 rounded-xl border flex items-center gap-3 ${di === 0 ? "border-primary/30 bg-primary-soft/40" : "border-border bg-secondary/30"}`}>
                          <div className={`size-8 rounded-lg grid place-items-center ${di === 0 ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground"}`}>
                            <Icon className="size-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{t.label}</p>
                            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{kindLabel[t.kind]}</p>
                          </div>
                          <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1"><Clock className="size-3" /> {t.minutes}m</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </motion.section>

        {/* Side: readiness + weak topics */}
        <motion.aside variants={fadeUp} className="col-span-12 lg:col-span-4 space-y-5">
          <div className="p-7 bg-card border border-border rounded-3xl text-center">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Predicted readiness</p>
            <p className="text-6xl font-extrabold tracking-tight mt-3">{exam.readiness}%</p>
            <p className="text-xs text-muted-foreground mt-2">Based on recall, study time and quiz scores</p>
            <div className="mt-5 h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${exam.readiness}%` }} />
            </div>
          </div>

          <div className="p-7 bg-card border border-border rounded-3xl">
            <h3 className="text-sm font-bold mb-5">Weakest topics</h3>
            <WeakTopicRadar topics={exam.weakTopics} />
            <ul className="mt-5 space-y-3">
              {exam.weakTopics.slice(0, 3).map((t) => (
                <li key={t.topic} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{t.topic}</span>
                  <span className={`text-xs font-mono ${t.score < 60 ? "text-destructive" : t.score < 75 ? "text-foreground" : "text-primary"}`}>{t.score}%</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.aside>
      </div>
    </motion.div>
  );
}

function WeakTopicRadar({ topics }: { topics: { topic: string; score: number }[] }) {
  const size = 200;
  const cx = size / 2;
  const cy = size / 2;
  const r = 70;
  const angles = topics.map((_, i) => (i / topics.length) * Math.PI * 2 - Math.PI / 2);
  const points = topics.map((t, i) => {
    const rad = r * (t.score / 100);
    return [cx + rad * Math.cos(angles[i]), cy + rad * Math.sin(angles[i])];
  });
  const polygon = points.map((p) => p.join(",")).join(" ");

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full">
      {[0.25, 0.5, 0.75, 1].map((s) => (
        <polygon
          key={s}
          points={topics.map((_, i) => {
            const rr = r * s;
            return [cx + rr * Math.cos(angles[i]), cy + rr * Math.sin(angles[i])].join(",");
          }).join(" ")}
          fill="none"
          stroke="currentColor"
          className="text-border"
          strokeWidth={1}
        />
      ))}
      <polygon points={polygon} fill="currentColor" fillOpacity={0.2} stroke="currentColor" strokeWidth={2} className="text-primary" />
      {topics.map((t, i) => {
        const lx = cx + (r + 14) * Math.cos(angles[i]);
        const ly = cy + (r + 14) * Math.sin(angles[i]);
        return (
          <text key={t.topic} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" className="fill-muted-foreground" fontSize={9} fontFamily="JetBrains Mono">
            {t.topic}
          </text>
        );
      })}
    </svg>
  );
}
