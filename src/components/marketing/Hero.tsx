import { Link } from "@tanstack/react-router";
import { DashboardPreview } from "./DashboardPreview";

export function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-24 pb-28">
      <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-soft text-primary text-[11px] font-bold tracking-widest uppercase rounded-full mb-7">
          <span className="size-1.5 bg-primary rounded-full animate-pulse" />
          The Academic Operating System
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-balance leading-[1.02] mb-7">
          The curated workspace<br />for business school.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto mb-9 leading-relaxed">
          A library of lessons authored with your faculty, practice that mirrors the exam,
          and an AI tutor grounded in your syllabus — calm by design.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/app"
            className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg shadow-[var(--shadow-primary)] hover:bg-primary/90 transition-all active:scale-[0.98]"
          >
            Start studying free
          </Link>
          <Link
            to="/institutional"
            className="px-6 py-3 bg-card text-foreground font-semibold rounded-lg border border-border hover:border-primary/30 transition-colors"
          >
            For institutions →
          </Link>
        </div>
      </div>

      <DashboardPreview />
    </section>
  );
}
