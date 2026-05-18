import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { GraduationCap, ChevronRight } from "lucide-react";
import { exams } from "@/data/exams";
import { fadeUp, stagger } from "@/lib/motion";

export const Route = createFileRoute("/app/exam/")({
  head: () => ({ meta: [{ title: "Exam Prep — Uniflow" }] }),
  component: ExamList,
});

function ExamList() {
  return (
    <motion.div initial="hidden" animate="show" variants={stagger()} className="max-w-7xl mx-auto space-y-8">
      <motion.header variants={fadeUp}>
        <h1 className="text-3xl font-extrabold tracking-tight">Exam Prep</h1>
        <p className="text-sm text-muted-foreground mt-1">Predicted readiness for every upcoming exam, with a day-by-day plan to close the gap.</p>
      </motion.header>

      <motion.div variants={fadeUp} className="space-y-3">
        {exams.map((e) => (
          <Link
            key={e.id}
            to="/app/exam/$examId"
            params={{ examId: e.id }}
            className="block p-6 bg-card border border-border rounded-2xl hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)] transition-all group"
          >
            <div className="grid grid-cols-12 gap-6 items-center">
              <div className="col-span-12 md:col-span-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-primary bg-primary-soft px-2 py-0.5 rounded">{e.code}</span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{e.date}</span>
                </div>
                <h3 className="text-lg font-bold">{e.course}</h3>
              </div>
              <div className="col-span-6 md:col-span-2 text-center">
                <p className="text-3xl font-extrabold tracking-tight">{e.daysAway}</p>
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">days away</p>
              </div>
              <div className="col-span-6 md:col-span-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">readiness</span>
                  <span className={`text-sm font-mono font-bold ${e.readiness > 70 ? "text-primary" : e.readiness > 50 ? "text-foreground" : "text-destructive"}`}>{e.readiness}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className={`h-full ${e.readiness > 70 ? "bg-primary" : e.readiness > 50 ? "bg-foreground/60" : "bg-destructive"}`} style={{ width: `${e.readiness}%` }} />
                </div>
              </div>
              <div className="col-span-12 md:col-span-1 grid place-items-end">
                <ChevronRight className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          </Link>
        ))}
      </motion.div>

      <motion.div variants={fadeUp} className="p-8 bg-foreground text-background rounded-3xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <GraduationCap className="size-8 text-primary" />
          <div>
            <p className="font-bold">Add a custom exam</p>
            <p className="text-sm text-background/60">Set a date and Uniflow will build the plan.</p>
          </div>
        </div>
        <button className="px-4 py-2.5 bg-primary text-primary-foreground font-semibold text-sm rounded-lg">New exam</button>
      </motion.div>
    </motion.div>
  );
}
