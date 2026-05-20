import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { FeatureGrid } from "@/components/marketing/FeatureGrid";
import { InstitutionalCTA } from "@/components/marketing/InstitutionalCTA";
import { DashboardPreview } from "@/components/marketing/DashboardPreview";

export const Route = createFileRoute("/platform")({
  head: () => ({
    meta: [
      { title: "Platform — Uniflow" },
      { name: "description", content: "A faculty-curated library, practice that mirrors the exam, an AI tutor grounded in your syllabus, planner, focus mode, and analytics." },
      { property: "og:title", content: "Platform — Uniflow" },
      { property: "og:description", content: "Every tool a business school student needs, in one calm interface." },
    ],
  }),
  component: PlatformPage,
});

const deepDives = [
  {
    eyebrow: "Curated Library",
    title: "Every lesson, written for your syllabus.",
    body: "Uniflow's academic team writes each chapter in partnership with your faculty — clean prose, linked concepts, and a clear path through the semester.",
    points: ["Faculty-reviewed", "Chapter-level concept links", "One canonical reader"],
  },
  {
    eyebrow: "AI Tutor",
    title: "An academic companion, not a chatbot.",
    body: "Grounded in the same library you read from. Asks clarifying questions, breaks down case studies, and generates personalized reviews with citations back to the source lesson.",
    points: ["Library-grounded", "Citations included", "Per-chapter context"],
  },
  {
    eyebrow: "Practice",
    title: "Flashcards, quizzes, exercises, mock exams.",
    body: "Four modes that match how the exam will actually test you — calibrated to your weakest topics and your professor's past papers.",
    points: ["Spaced repetition", "Worked exercises", "Timed mock exams"],
  },
  {
    eyebrow: "Focus Mode",
    title: "Designed to reduce cognitive load.",
    body: "Pomodoro timing, ambient soundscapes, distraction blocking — engineered for the calm headspace deep work requires.",
    points: ["Pomodoro presets", "Soundscapes", "Distraction blocking"],
  },
];

function PlatformPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-primary mb-5">The Platform</p>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-balance mb-6 max-w-3xl mx-auto">
            One workspace for every part of academic life.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Notes, study, exam prep, and analytics — all unified, all calm, all focused on what to do next.
          </p>
        </section>

        <section className="max-w-7xl mx-auto px-6 pb-24">
          <DashboardPreview />
        </section>

        <FeatureGrid />

        <section className="max-w-7xl mx-auto px-6 py-24 space-y-24">
          {deepDives.map((d, i) => (
            <div key={d.title} className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}>
              <div className="md:[direction:ltr]">
                <p className="text-xs font-mono uppercase tracking-widest text-primary mb-4">{d.eyebrow}</p>
                <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-5 text-balance">{d.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">{d.body}</p>
                <ul className="space-y-2">
                  {d.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-sm">
                      <span className="size-1.5 bg-primary rounded-full" />
                      <span className="font-medium">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:[direction:ltr] aspect-[4/3] bg-card border border-border rounded-3xl p-7 shadow-[var(--shadow-card)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-soft/60 to-transparent" />
                <div className="relative h-full flex flex-col gap-3">
                  <div className="h-3 w-24 bg-foreground/15 rounded-full" />
                  <div className="h-3 w-40 bg-foreground/10 rounded-full" />
                  <div className="flex-1 grid grid-cols-3 gap-3 mt-4">
                    {Array.from({ length: 6 }).map((_, j) => (
                      <div key={j} className={`rounded-xl border border-border ${j === 0 ? "bg-primary/90" : "bg-card"}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        <InstitutionalCTA />
      </main>
      <SiteFooter />
    </div>
  );
}
