import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import { courses } from "@/data/courses";
import { notes } from "@/data/notes";
import { fadeUp, stagger } from "@/lib/motion";

export const Route = createFileRoute("/app/library")({
  head: () => ({ meta: [{ title: "Library — Uniflow" }] }),
  component: LibraryIndex,
});

function LibraryIndex() {
  return (
    <motion.div initial="hidden" animate="show" variants={stagger(0.06)} className="max-w-6xl mx-auto">
      <motion.header variants={fadeUp} className="mb-10">
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Curated by Uniflow · in partnership with your faculty</p>
        <h1 className="text-3xl font-extrabold tracking-tight mt-2">Library</h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-xl">
          Every lesson, reading, and case for your semester — written by the Uniflow team and reviewed by your professors.
        </p>
      </motion.header>

      <motion.div variants={stagger(0.05)} className="grid md:grid-cols-2 gap-5">
        {courses.map((c) => {
          const lessons = notes.filter((n) => n.code === c.code);
          return (
            <motion.div key={c.code} variants={fadeUp}>
              <Link
                to="/app/library/$code"
                params={{ code: c.code }}
                className="block p-6 bg-card border border-border rounded-2xl hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)] transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-primary">{c.code}</p>
                    <h2 className="text-lg font-bold mt-1">{c.name}</h2>
                    <p className="text-xs text-muted-foreground mt-1">{c.professor}</p>
                  </div>
                  <BookOpen className="size-5 text-muted-foreground" />
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
                  <span>{c.syllabus.length} chapters · {lessons.length} lessons</span>
                  <span className="inline-flex items-center gap-1 text-primary">Open <ArrowRight className="size-3" /></span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
